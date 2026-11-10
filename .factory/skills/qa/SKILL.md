---
name: qa
description: >
  Run QA tests for Pulse Fitness. Analyzes the git diff to determine affected areas,
  runs the relevant browser flows as an anonymous visitor, and generates diff-targeted tests.
  Uses droid-control for browser interaction, capture, and verification.
  Use when testing PRs, releases, or smoke testing the site.
---

# QA Orchestrator

**SCOPE: This skill performs manual/functional QA only -- verifying that the application actually works by interacting with it as a real user would in a browser. Do NOT run or report on CI checks, linting, oxlint, typecheck, `npm test`, Vitest, or any static analysis. Those are handled by `.github/workflows/ci.yml`.**

## Step 1: Load Configuration

Read `.factory/skills/qa/config.yaml` for the environment URL, start command, persona, and app definitions.

For every affected interactive app, invoke the `droid-control` skill before interacting with the app. Follow its routing tables:

- Load the target driver selected for the app (`browser-use` for the web app).
- Use the Capture and Verify stages on every run.
- Load Compose only when both `video_evidence: true` and `droid_control.compose: true`.
- When `droid_control.compose: false`, never invoke Compose. Keep raw captures and text snapshots as evidence.

Treat `video_evidence` and `droid_control.compose` as runtime toggles. Read them from config on every run; do not cache or assume their values.

## Step 2: Determine Target Environment

Use `default_target` from config (`local`) unless the user specifies otherwise. The site has no deployed or preview environments: always test the checked-out branch through the local dev server described in the `qa-web` sub-skill. Never fall back to a remote URL.

## Step 3: Analyze Git Diff

Determine what changed. In CI, diff against the PR base: `git diff --name-only "origin/${BASE_REF:-main}...HEAD"` (fall back to `git diff --name-only origin/main...HEAD`). Locally, use `git diff --name-only main...HEAD` plus any uncommitted changes.

Map changed files to apps using `path_patterns` in config.yaml.

Files that don't match ANY app's path_patterns (e.g., `.factory/**`, `.github/**`, `README.md`, `AGENTS.md`, `.oxlintrc.json`) are NOT associated with any app. Do NOT run app test flows for them.

For each affected app:

- Run ONLY that app's flows that the diff touches, from its sub-skill
- Generate ADDITIONAL targeted tests based on the specific changes in the diff

If NO app is affected by the diff (e.g., docs-only, CI-only, or QA-skill-only changes), report as INCONCLUSIVE: "No app code changed -- QA not applicable for this diff." Do NOT run any app flows. Still write the report with exactly one numbered result row (`| 1 | No app code changed | - | - | :grey_question: INCONCLUSIVE | ... |`); the CI gate rejects a report without result rows.

If the only changed app files are tests (`src/test/**`), report INCONCLUSIVE with "Test-only change -- no user-facing behavior changed."

## Step 4: Pre-flight Checks (app-specific only)

Run pre-flight checks ONLY for affected apps:

- Dependencies installed (`node_modules` exists; otherwise run `npm ci`)
- Dev server starts and responds at the `url` from config (see `qa-web`)
- `droid-control@factory-plugins` is active and `agent-browser` works (`agent-browser doctor --offline --quick`; run `agent-browser install` only if doctor reports Chrome missing)
- `ffmpeg` is available when `video_evidence: true` (browser recordings are lost without it)
- Compose prerequisites from the droid-control skill (`cargo`, `ffmpeg`, `ffprobe`; the renderer builds on first use) only when `droid_control.compose: true`

When Compose is on, let the droid-control Compose stage resolve its own plugin root and build its renderer. Never install Compose dependencies when Compose is off.

If a pre-flight check fails, report the affected flows as BLOCKED with the specific error and remediation steps.

## Step 5: Execute Diff-Relevant Flows Only

For each affected app, read its sub-skill from `.factory/skills/qa-<app-name>/SKILL.md`.

The sub-skill contains a MENU of available test flows. You must:

1. Read the diff carefully and identify which flows are relevant to the change
2. Run those flows PLUS adjacent flows that verify the change integrates correctly (e.g., a new footer link: check it renders, navigates, and that the header nav still works)
3. Do NOT run completely unrelated flows (e.g., a footer-only change does not need the class schedule flow)
4. If no existing flow covers the change, write a NEW ad-hoc test that directly verifies the changed behavior
5. Do NOT run unit tests, lint, typecheck, or any automated test suite. Interact with the app as a real user would.

## Step 6: Evidence Capture

After each significant test step, capture evidence. Use **text snapshots as primary evidence** -- they render inline in the PR comment with no image hosting issues.

For the web app (agent-browser):

- Use the `droid-control` web route; let its browser-use atom own browser mechanics and its Capture atom own the recording lifecycle.
- Generate a unique `RUN_ID` and run-scoped browser session as droid-control requires.
- Capture the page's accessibility tree or rendered text as text evidence.
- Save screenshot files to `./qa-results/$RUN_ID/` for the artifact upload.
- With `video_evidence: false`, or when an upload fails: do NOT embed `![image](url)` markdown in the report. Mention the filename and note it's available in the downloadable artifacts.

**Video evidence (when `video_evidence: true` in config.yaml):**

1. Follow the droid-control Capture atom for recording start, interactions, recording stop, and raw-output verification. Use a 1280x720 viewport (single layout).
2. Record exactly one video per flow. Do NOT record one video for the whole run.
3. If `droid_control.compose: false`, keep the raw WebM. Upload it only after verifying it is a playable, non-empty video.
4. If `droid_control.compose: true`, Compose ONE flow per run: the most change-specific one. Rendering takes several times the video length, and the CI step has a fixed time limit. Every other flow keeps its raw WebM (handled as in item 3). For the chosen flow, hand the raw recording to the droid-control Compose atom and render `./qa-results/$RUN_ID/<flow-slug>.mp4`.
   - Use a `single` layout and pass the literal `"preset": "factory"` to Compose.
   - The `factory` preset is implementation-owned, not configuration. Do not use any other Compose preset.
   - Trim dead time, add a concise title card, and use annotations only when they clarify the proof.
   - Keep the final edited video at 60 seconds or less.
   - Verify the MP4 with the Compose atom's finalization checks before upload.
5. Verify the selected evidence file exists and is non-empty. If capture or Compose fails, retry that stage once; if it still fails, fall back to text evidence and keep any raw capture in `./qa-results/`.
6. Upload each recording through GitHub's user-attachments endpoint (undocumented; verify against the live response):

   ```bash
   REPO_ID="${REPO_ID:-$(gh api "repos/$GITHUB_REPOSITORY" --jq .id)}"
   curl -sS --fail-with-body --request POST \
     --header "Authorization: Bearer $QA_EVIDENCE_TOKEN" \
     --header "Content-Type: application/octet-stream" \
     --header "Accept: application/json" \
     --header "X-GitHub-Api-Version: 2022-11-28" \
     "https://uploads.github.com/user-attachments/assets?name=<evidence-file>&content_type=<url-encoded-content-type>&repository_id=$REPO_ID" \
     --data-binary "@./qa-results/$RUN_ID/<evidence-file>" \
   | jq -e '.url'
   ```

   Token rule: the endpoint accepts only **classic** PATs with `repo` scope (or OAuth user tokens). Failure signatures:

   - **404** with a valid `repository_id`: installation token (`GITHUB_TOKEN` or a GitHub App token). Use the `QA_EVIDENCE_TOKEN` PAT.
   - **403 `Resource not accessible by personal access token`**: fine-grained PAT. Re-mint as a classic PAT.
   - **403 `Resource protected by organization SAML enforcement`**: authorize the classic PAT for the org via "Configure SSO".

   Use the raw video's filename and MIME type (`video/webm`) for raw recordings, and `<flow-slug>.mp4` with `video/mp4` for the composed flow. If `QA_EVIDENCE_TOKEN` is empty, skip uploads and use text evidence.

7. Place each returned `url` on its own line with nothing else on that line. NEVER wrap a video URL in `![name](url)`; that stops GitHub from rendering the player.
8. Put the embed line in the Evidence section of the report, directly under the flow's label.
9. Screenshots (`.png`) can be uploaded the same way; screenshots DO use image markdown (`![name](asset-url)`).
10. Never embed a link you have not verified came back from the upload API.

Evidence quality rules:

- Focus on the RELEVANT content. Trim snapshots to the meaningful part.
- Label each snapshot clearly: what it shows and why it matters for the test.
- NEVER embed broken image links.
- The workflow uploads everything in `./qa-results/` as a downloadable artifact.

## Step 7: Test Quality Gate

1. CHANGE-SPECIFIC FIRST. At least half your tests should verify the new or changed behavior itself.
2. INTEGRATION TESTS ARE VALID. Verify the change integrates with existing features (navigation, layout, adjacent sections).
3. NO UNRELATED FLOWS.
4. NO AUTOMATED TEST SUITES. Do NOT run vitest, `npm test`, `npm run lint`, or `npm run build`.
5. NEGATIVE TESTS. Include at least 1 test of error handling or a boundary condition related to the change (unknown route, narrow viewport, repeated clicks, keyboard-only navigation).
6. INTERACTIVE TESTING. Click, scroll, and navigate as a real visitor.
7. INCONCLUSIVE IF UNSURE. If you cannot articulate what the PR changes, mark INCONCLUSIVE rather than PASS.

## Step 8: Handle Failures

**Never silently skip a flow. If a flow cannot complete, report it as BLOCKED with what was tried and how the user can fix it.** Then continue to the next flow -- never abort the entire run for a single failure.

## Step 9: Generate Report

Write the report to `./qa-results/report.md` using `.factory/skills/qa/REPORT-TEMPLATE.md`.

- Start with the `## QA Report` heading followed by the test results table.
- Number every result row in the first column (1, 2, 3...). Result column MUST use: :white_check_mark: PASS, :x: FAIL, :no_entry: BLOCKED, :warning: FLAKY, :grey_question: INCONCLUSIVE. The CI gate fails the required check on any FAIL or BLOCKED row, so use them only for real failures and blocks, and don't write the words FAIL or BLOCKED in the Notes of a passing row.
- Keep it CONCISE: the table, a short "Action Required" section (if any), and collapsed evidence.
- Do NOT include a behavioral change summary, an info metadata table, or verbose explanations of the diff.
- Do NOT report setup steps (installing, starting the dev server, launching the browser) as test rows.
- Put ALL evidence in a single collapsed `<details>` block.
- Web evidence: accessibility tree / rendered text snapshots as labeled fenced code blocks. With video evidence, each uploaded video URL goes on its own bare line under its flow label; screenshots use `![name](asset-url)`. For any flow whose upload failed, reference the artifact filename instead.

## Step 10: Suggest Skill Updates (Failure Learning)

`failure_learning` in config.yaml is `suggest_in_report`: include suggestions in the report only, and do NOT write `qa-results/skill-updates.json`.

After generating the report, check whether any BLOCKED or FAIL result revealed a **testing environment insight** that would help future QA runs (e.g., "the dev server needs `--host 127.0.0.1` in CI", "Chromium needs `agent-browser install` on fresh runners"). Do NOT suggest fixes for bad selectors, typos, or behavior changes expected from the PR, or for failures already in the sub-skill's Known Failure Modes.

If there are genuinely new insights, append:

## Suggested Skill Updates (N issues found)

| #   | Severity        | File     | Issue               | Fix Prompt                                                                           |
| --- | --------------- | -------- | ------------------- | ------------------------------------------------------------------------------------ |
| 1   | <emoji> <level> | `<file>` | <short description> | <details><summary>Copy</summary><br>`<full droid prompt to fix the issue>`</details> |

Severity levels: `🔴 Breaking` (fails every run), `🟡 Degraded` (intermittent or suboptimal), `🔵 Info` (new knowledge, no failures). Each Fix Prompt must be a self-contained instruction Droid can run when pasted, naming the target file (e.g. `.factory/skills/qa-web/SKILL.md` → Known Failure Modes).

If there are no new insights, omit this section entirely.

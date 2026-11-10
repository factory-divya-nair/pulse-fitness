import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer.tsx'
import Header from './components/Header.tsx'
import Classes from './pages/Classes.tsx'
import Home from './pages/Home.tsx'
import Locations from './pages/Locations.tsx'
import Memberships from './pages/Memberships.tsx'
import NotFound from './pages/NotFound.tsx'

export default function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/memberships" element={<Memberships />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

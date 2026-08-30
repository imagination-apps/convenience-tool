import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { ProStatusProvider } from './context/ProStatusContext'
import ConverterPage from './pages/ConverterPage'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Tokushoho from './pages/Tokushoho'

export default function App() {
  return (
    <BrowserRouter>
      <ProStatusProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<ConverterPage />} />
            <Route path="/tokushoho" element={<Tokushoho />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Route>
        </Routes>
      </ProStatusProvider>
    </BrowserRouter>
  )
}

import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useProStatusContext } from '../context/ProStatusContext'

export default function Layout() {
  const { isPro, openProModal } = useProStatusContext()

  return (
    <div className="flex min-h-screen flex-col">
      <Header isPro={isPro} onGoPro={openProModal} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

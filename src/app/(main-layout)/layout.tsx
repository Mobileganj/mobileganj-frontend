import { ReactNode } from "react"
import Header from "@/components/shared/main/Header"
import Footer from "@/components/shared/main/Footer"
import FloatingContact from "@/components/shared/main/FloatingContact"
import BottomNav from "@/components/shared/BottomNav"

const MainLayout = ({ children, authModal, cartModal }: { children: ReactNode; authModal: ReactNode; cartModal: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <Footer />
      <FloatingContact />
      <BottomNav />
      {authModal}
      {cartModal}
    </div>
  )
}

export default MainLayout
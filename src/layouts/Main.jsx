import { Outlet } from "react-router-dom"
import Footer from "../componnets/Footer"
import Navbar from "../componnets/Navbar/Navbar"
import HomePro from "../componnets/Products/HomePro"

const Main = () => {
  return (
    <div className="">
      <Navbar/>
      <Outlet></Outlet>
      <Footer/>
    </div>
  )
}

export default Main

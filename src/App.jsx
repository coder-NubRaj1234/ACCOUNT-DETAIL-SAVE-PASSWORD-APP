import { useState } from 'react'
import './App.css'
import Navbar  from './components/Navbar'
import Manager from "./components/Manager"
import Footer  from './components/Footer'
import { ToastContainer, toast } from "react-toastify";

function App() {

  return (
    <>
    <Navbar />
    <ToastContainer />
   < Manager />
   <Footer />
    </>
  )
}

export default App

import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import Header from './components/Nav/Header'
import Categories from './components/Categories'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer/Footer'


const App = () => {
  return (
    <>
      <Header />
      {/* <Categories /> */}
      <section className=''>
        <>
          <Outlet />
        </>
      </section>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
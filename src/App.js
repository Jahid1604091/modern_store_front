import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Categories from './components/Categories'
import { Toaster } from 'react-hot-toast'


const App = () => {
  return (
    <>
      <Header />
      <Categories />
      <main className='py-2'>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
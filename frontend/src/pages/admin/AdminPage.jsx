import React from 'react'
import Sidebar from './Sidebar'
import Home from './Home'
import Header from './Header'

function AdminPage() {
  return (
    <div className='grid-container'>
        <Header />
        <Sidebar />
        <Home />
    </div>
  )
}

export default AdminPage
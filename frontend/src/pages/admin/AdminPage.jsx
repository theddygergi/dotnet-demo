import React from 'react'
import Sidebar from './Sidebar'
import Home from './Home'

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
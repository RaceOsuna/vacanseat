import './Layout.css'
import { useState } from 'react'


export default function Header({children, selectedDate, setSelectedDate, setShowForm, showForm, setResToEdit, setOpenSearchBar, setSearchParams}) {

  const handleGoBack = () => {
    setShowForm(prev => !prev)
    setResToEdit(null)
  }
  
  const handlOpenSearchBar = () => {
    setSearchParams('')
    setOpenSearchBar(prev => !prev)
  }

  return (
    <div className='layout'>
      <nav>
        <div className='logo'>
          <h2>Grande Station</h2>
        </div>
        {!showForm && <div className='nav-items'>
          <i className="fa-solid fa-lg fa-magnifying-glass search" onClick={handlOpenSearchBar}></i>
          <input className='calendar' type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}/>
          <i className="fa-solid fa-plus fa-lg add" onClick={() => setShowForm(prev => !prev)}></i>
        </div>}
        {showForm && <div className='menu-items'>
          <i className="fa-solid fa-circle-left fa-xl back-arrow" onClick={handleGoBack}></i>
        </div>}
      </nav>
      <main>
        {children}
      </main>
    </div>
  )
}

import './Layout.css'
import { useState } from 'react'


export default function Header({children, selectedDate, setSelectedDate}) {

  const [showDatepicker, setShowDatepicker] = useState(false)

  return (
    <div className='layout'>
      <nav>
        <div className='logo'>
          <h2>Grande Station</h2>
        </div>
        <div className='nav-items'>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input className='calander' type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}/>
          <i className="fa-solid fa-plus add"></i>
        </div>
      </nav>
      <main>
        {children}
      </main>
    </div>
  )
}

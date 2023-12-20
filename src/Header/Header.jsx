import './Header.css'
import { useState } from 'react'

export default function Header({children}) {

  const [showDatepicker, setShowDatepicker] = useState(false)

  return (
    <div className='layout'>
      <nav>
        <div>
          <h2>Grande Station</h2>
        </div>
        <div>
          <i className="fa-solid fa-magnifying-glass"></i>
          <i className="fa-regular fa-calendar"></i>
          <i className="fa-solid fa-plus"></i>
        </div>
      </nav>
      <main>
        {children}
      </main>
    </div>
  )
}

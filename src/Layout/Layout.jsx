import './Layout.css'
import { scrollToTop } from '../utils'


export default function Header({children, selectedDate, setSelectedDate, setShowForm, showForm, setResToEdit, setOpenSearchBar, setSearchParams, openSearchBar}) {

  const handleGoBack = () => {
    setShowForm(prev => !prev)
    setResToEdit(null)
  }
  
  const handlOpenSearchBar = () => {
    setSearchParams('')
    setOpenSearchBar(prev => !prev)
    scrollToTop()
  }

  const handleShowForm = () => {
    setShowForm(prev => !prev)
    if(openSearchBar) {
      setOpenSearchBar(prev => !prev)
      setSearchParams('')
    }
  }

  return (
    <div className='layout'>
      <nav>
        <div className='logo'>
          <h2>Grande Station</h2>
        </div>
        {!showForm && <div className='nav-items'>
          {!openSearchBar && <i className="fa-solid fa-lg fa-magnifying-glass-plus search" onClick={handlOpenSearchBar}></i>}
          {openSearchBar &&<i className="fa-solid fa-lg fa-magnifying-glass-minus search" onClick={handlOpenSearchBar}></i>}
          {/* <i className="fa-solid fa-lg fa-magnifying-glass-plus search" onClick={handlOpenSearchBar}></i> */}
          <input className='calendar' type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}/>
          <i className="fa-solid fa-plus fa-lg add" onClick={handleShowForm}></i>
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

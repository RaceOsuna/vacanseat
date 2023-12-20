import './Header.css'

export default function Header({children}) {
  return (
    <div className='layout'>
      <nav>
        <div>
          <h2>Grande Station</h2>
        </div>
        <div>
          <i class="fa-solid fa-magnifying-glass"></i>
          <i class="fa-regular fa-calendar"></i>
          <i class="fa-solid fa-plus"></i>
        </div>
      </nav>
      <main>
        {children}
      </main>
    </div>
  )
}

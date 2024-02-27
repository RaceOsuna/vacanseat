import './Reservations.css';
import ResCard from './ResCard';
import ToggleEdit from '../ToggleEdit/ToggleEdit';

export default function Reservations({ resData, selectedDate, deleteReservation, setResToEdit, setShowForm, openSearchBar, searchParams, setSearchParams }) {

  const filteredResData = searchParams ? 
  resData.filter(res => res.name.toLowerCase().includes(searchParams.toLocaleLowerCase())) :
  resData.filter(res => {
    return new Date(res.date).toISOString().split('T')[0] === selectedDate
  }).sort((a, b) => {
    return a.time.split('-')[1] - b.time.split('-')[1]
  })

  console.log(filteredResData)
 
  const displayReservations = filteredResData.map(res => {
    return (
      <ToggleEdit key={res.docId}>
        <ResCard res={res} deleteReservation={deleteReservation} setResToEdit={setResToEdit} setShowForm={setShowForm}/>
      </ToggleEdit>
    )
  })

  return (
    <div className='reservations-container'>
      {openSearchBar &&
      <div className='searchbar'>
        <label htmlFor="searchbar"></label>
        <input autoFocus type="text" name="searchbar" value={searchParams} onChange={(e) => setSearchParams(e.target.value)}/>
        <button onClick={() => setSearchParams('')}>clear</button>
      </div>}
      {!displayReservations.length ? <p className='no-res-banner'>No Reservations</p> : displayReservations}
    </div>
  )
}

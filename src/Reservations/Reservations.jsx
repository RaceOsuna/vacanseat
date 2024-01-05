import './Reservations.css';
import ResCard from './ResCard';
import ToggleEdit from '../ToggleEdit/ToggleEdit';

export default function Reservations({ resData, selectedDate, deleteReservation, setResToEdit, setShowForm }) {

  const filteredResData = resData.filter(res => {
    return new Date(res.date).toISOString().split('T')[0] === selectedDate
  }).sort((a, b) => {
    console.log(a.time.split('-')[1])
    return a.time.split('-')[1] - b.time.split('-')[1]
  })

  console.log(filteredResData)
 
  const displayReservations = filteredResData.map(res => {
    return (
      <ToggleEdit>
        <ResCard key={res.docId} res={res} deleteReservation={deleteReservation} setResToEdit={setResToEdit} setShowForm={setShowForm}/>
      </ToggleEdit>
    )
  })

  return (
    <div className='reservations-container'>
      {displayReservations}
    </div>
  )
}

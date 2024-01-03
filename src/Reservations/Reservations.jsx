import './Reservations.css';
import ResCard from './ResCard';
import ToggleEdit from '../ToggleEdit/ToggleEdit';

export default function Reservations({ resData, selectedDate, deleteReservation }) {

  const filteredResData = resData.filter(res => new Date(res.date).toISOString().split('T')[0] === selectedDate)
  
  const displayReservations = filteredResData.map(res => {
    return (
      <ToggleEdit>
        <ResCard key={res.docId} res={res} deleteReservation={deleteReservation} />
      </ToggleEdit>
    )
  })

  return (
    <div className='reservations-container'>
      {displayReservations}
    </div>
  )
}

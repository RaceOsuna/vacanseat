import './Reservations.css';
import ResCard from './ResCard';

export default function Reservations({ resData }) {

  const displayReservations = resData.map(res => {
    return <ResCard res={res} />
  })

  return (
    <div className='reservationss-container'>
      {displayReservations}
    </div>
  )
}

import './Reservations.css';
import ResCard from './ResCard';
import { useState } from 'react';

export default function Reservations({ resData }) {
  
  const today = new Date().toLocaleDateString();

  const [selectedDate, setSelectedDate] = useState(today)

  const filteredResData = resData.filter(res => new Date(res.date).toLocaleDateString() === today)
  console.log(filteredResData)
  const displayReservations = filteredResData.map(res => {
    return <ResCard res={res} />
  })

  return (
    <div className='reservationss-container'>
      {displayReservations}
    </div>
  )
}

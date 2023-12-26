import './Reservations.css';
import ResCard from './ResCard';
import { useState } from 'react';

export default function Reservations({ resData, selectedDate }) {

  const filteredResData = resData.filter(res => new Date(res.date).toISOString().split('T')[0] === selectedDate)
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

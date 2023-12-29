import './Reservations.css';
import ResCard from './ResCard';
import { useState } from 'react';

export default function Reservations({ resData, selectedDate }) {

  const filteredResData = resData.filter(res => new Date(res.date).toISOString().split('T')[0] === selectedDate)
  
  const displayReservations = filteredResData.map(res => {
    return <ResCard key={res.docId} res={res} />
  })

  return (
    <div className='reservationss-container'>
      {displayReservations}
    </div>
  )
}

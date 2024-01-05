import './Reservations.css';
import ResCard from './ResCard';
import ToggleEdit from '../ToggleEdit/ToggleEdit';
import { useState } from 'react';

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
      <ToggleEdit>
        <ResCard key={res.docId} res={res} deleteReservation={deleteReservation} setResToEdit={setResToEdit} setShowForm={setShowForm}/>
      </ToggleEdit>
    )
  })

  return (
    <div className='reservations-container'>
      {openSearchBar &&
      <div className='searchbar'>
        <label htmlFor="searchbar"></label>
        <input type="text" name="searchbar" value={searchParams} onChange={(e) => setSearchParams(e.target.value)}/>
        <button onClick={() => setSearchParams('')}>clear</button>
      </div>}
      {displayReservations}
    </div>
  )
}

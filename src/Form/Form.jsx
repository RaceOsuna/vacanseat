import React from 'react'
import './form.css'
import { useState } from 'react'
import { timeSlots } from '../timeSlots'

export default function Form({addReservation, selectedDate, resToEdit, setResToEdit, setShowForm, setDoc, doc, myCollection}) {

  const [formData, setFormData] = useState(resToEdit || {
    date: selectedDate,
    name: '',
    time: '',
    partySize: '',
    phoneNumber: ''
  })
  console.log(formData.time)
  const reservalableTimes = timeSlots.map((time, index) => (
    <option key={time} value={time === 'select time' ? '' : `${time}-${index + 1}`}>{time}</option>
  ))

  const handleChange = (event) => {
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    } )
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (Object.values(formData).some(value => value === '' || formData.phoneNumber.length !== 10)) {
      console.log('error')
      return
    }

    addReservation(event,formData)
    setFormData({
      date: selectedDate,
      name: '',
      time: '',
      partySize: '',
      phoneNumber: ''
    })
    setShowForm(prev => !prev)
  }

  const cancelEdit = (event) => {
    event.preventDefault()
    setResToEdit(null)
    setShowForm(false)
  }

  const updateReservation = async(event) => {
    event.preventDefault()
    console.log(formData.docId)
    await setDoc(doc(myCollection, formData.docId), {
        ...formData
      });
      setShowForm(prev => !prev)
      setResToEdit(null)
  }

  return (
    <>
    {resToEdit && 
    <div className='edit-banner'>
      <h3>Edit Resservation</h3>
    </div>}

    <form>
      <label htmlFor='date'></label>
      <input type='date' name='date' value={formData.date} onChange={handleChange} required />

      <label htmlFor="name"></label>
      <input type='text' name='name' value={formData.name} placeholder='name' onChange={handleChange} required />

      <label htmlFor='time'></label>
      <select name='time' value={formData.time} onChange={handleChange} required >
        {reservalableTimes}
      </select>

      <label htmlFor='partySiize'></label>
      <select name='partySize' value={formData.partySize} onChange={handleChange} required >
        <option value=''>party size</option>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
        <option value='6'>6</option>
        <option value='7'>7</option>
        <option value='8'>8</option>
        <option value='9'>9</option>
        <option value='10'>10</option>
        <option value='11'>11</option>
        <option value='12'>12</option>
      </select>

      <label htmlFor="phoneNumber" ></label>
      <input type="tel" name='phoneNumber' value={formData.phoneNumber} placeholder='phone number' minLength={10} maxLength={10} onChange={handleChange} required/>

      {!resToEdit &&<button className='submit-button' onClick={handleSubmit}>Book</button>}
      {resToEdit &&
      <div className='edit-buttons'>
        <button className='submit-button' onClick={updateReservation}>Submit</button>
        <button className='cancel-button' onClick={cancelEdit}>Cancel</button>
      </div>} 
    </form>
    </>
  )
}
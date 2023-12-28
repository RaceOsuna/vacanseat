import React from 'react'
import './form.css'
import { useState } from 'react'
import { timeSlots } from '../timeSlots'

export default function Form({addReservation, selectedDate}) {
  
  const [formData, setFormData] = useState({
    date: selectedDate,
    name: '',
    time: '',
    partySize: '',
    phoneNumber: ''
  })

  const reservalableTimes = timeSlots.map(time => (
    <option key={time} value={time === 'select time' ? '' : time}>{time}</option>
  ))

  console.log(formData)

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

    if (Object.values(formData).some(value => value === '')) {
      console.log('error')
      return
    }

    addReservation(event,formData)
  }

  return (
    <form>
      <label for='date'></label>
      <input type='date' name='date' value={formData.date} onChange={handleChange} />

      <label htmlFor="name"></label>
      <input type='text' name='name' value={formData.name} placeholder='name' onChange={handleChange} />

      <label for='time'></label>
      <select name='time' value={formData.time} onChange={handleChange} >
        {reservalableTimes}
      </select>

      <label for='partySiize'></label>
      <select name='partySize' value={formData.partySize} onChange={handleChange} >
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

      <label for="phoneNumber" ></label>
      <input type="tel" name='phoneNumber' value={formData.phoneNumber} placeholder='phone number' minLength={10} maxLength={10} onChange={handleChange}/>

      <button onClick={handleSubmit}>Book</button>
    </form>
  )
}
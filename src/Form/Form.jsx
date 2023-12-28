import React from 'react'
import './form.css'
import { useState } from 'react'
import { timeSlots } from '../timeSlots'

export default function Form() {
  
  const [formData, setFormData] = useState({
    date: '',
    name: '',
    time: '',
    partySize: '',
    phoneNumber: ''
  })

  const reservalableTimes = timeSlots.map(time => (
    <option value={time}>{time}</option>
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

  return (
    <form>
      <label for='date'></label>
      <input type='date' name='date' value={formData.date} onChange={handleChange} />

      <label htmlFor="name"></label>
      <input type='text' name='name' value={formData.name} placeholder='name' onChange={handleChange} />

      <label for='time'></label>
      <select name='time' value={formData.time} onChange={handleChange} >{reservalableTimes}</select>

      <label for='partySiize'></label>
      <select name='partySize' value={formData.partySize} onChange={handleChange} >
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
      <input type="tel" name='phoneNumber' placeholder='phone number' pattern='[0-9]{3}-[0-9]{2}-[0-9]{3}' minLength={10} maxLength={10} />

      <button>Book</button>
    </form>
  )
}
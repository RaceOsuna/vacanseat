import React from 'react'
import './form.css'
import { useState } from 'react'
import { timeSlots } from '../timeSlots'
import { scrollToTop } from '../utils'

export default function Form({addReservation, selectedDate, resToEdit, setResToEdit, setShowForm, setDoc, doc, myCollection}) {

  const [customPartySize, setCustomPartySize] = useState(false)

  const [formData, setFormData] = useState(resToEdit || {
    date: selectedDate,
    name: '',
    time: '',
    partySize: '',
    customParty: '',
    phoneNumber: '',
    notes: ''
  })

  const [formError, setFormError] = useState({
    date: selectedDate,
    name: '',
    time: '',
    partySize: '',
    customParty: '',
    phoneNumber: '',
    notes: ''
  })

  const reservalableTimes = timeSlots.map((time, index) => (
    <option key={time} value={time === 'select time' ? '' : `${time}-${index + 1}`}>{time}</option>
  ))

  const handleChange = (event) => {
    if (event.target.name === 'partySize' && event.target.value === 'custom') {
      setCustomPartySize(true)
      setFormError(prev => ({...prev, partySize: ''}))
    } else if (event.target.name === 'partySize' && event.target.value !== 'custom') {
      setCustomPartySize(false)
      setFormData(prev => ({...prev, customParty: ''}))
      setFormError(prev => ({...prev, customParty: ''}))
    }
      setFormData(prevFormData => {
        return {
          ...prevFormData,
          [event.target.name]: event.target.value
        }
      })
  }

  const handleCustomPartySize = (event) => {
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    const keys = Object.keys(formData).filter(key => key !== 'notes')

    if (keys.some(key => formData[key] === '' || formData.phoneNumber.length !== 10)) {
      
      keys.forEach(key => {
        if (formData[key] === '') {
          return setFormError(prev => ({...prev, [key]: 'error'}))
        }
        if (key === 'phoneNumber' && formData.phoneNumber.length !== 10) {
          return setFormError(prev => ({...prev, [key]: 'error'}))
        }
        if (key !== '') {
          return setFormError(prev => ({...prev, [key]: ''}))
        }
      })
      return
    }

    addReservation(event,formData)
    setFormData({
      date: selectedDate,
      name: '',
      time: '',
      partySize: '',
      customParty: '',
      phoneNumber: ''
    })
    setShowForm(prev => !prev)
    scrollToTop()
  }

  const cancelEdit = (event) => {
    event.preventDefault()
    setResToEdit(null)
    setShowForm(false)
    scrollToTop()
  }

  const updateReservation = async(event) => {
    event.preventDefault()
    await setDoc(doc(myCollection, formData.docId), {
        ...formData
      });
      setShowForm(prev => !prev)
      setResToEdit(null)
      scrollToTop()
  }

  return (
    <>
    {resToEdit && 
    <div className='edit-banner'>
      <h3>Edit Reservation</h3>
    </div>}

    <form>
      <label htmlFor='date'></label>
      <input type='date' name='date' value={formData.date} onChange={handleChange} required />

      {formError.name && 
      <div className='error-message'>
        <p>please provide a name</p>
      </div>}
      <label htmlFor="name"></label>
      <input type='text' name='name' value={formData.name} placeholder='name' onChange={handleChange} required />

      {formError.time && 
      <div className='error-message'>
        <p>please select a time</p>
      </div>}
      <label htmlFor='time'></label>
      <select name='time' value={formData.time} onChange={handleChange} required >
        {reservalableTimes}
      </select>

      {formError.partySize && 
      <div className='error-message'>
        <p>please specify party size</p>
      </div>}
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
        <option value='custom'>custom</option>
      </select>

      {/* {formError.customParty === 0 && 
      <div className='error-message'>
        <p>please set cutom party size</p>
      </div>} */}
      {customPartySize && !resToEdit && <input type="number" name='customParty' min={13} value={formData.customParty} onChange={handleCustomPartySize}/>}
      
      {resToEdit && customPartySize && <input type="number" name='customParty' min={13} value={formData.customParty} onChange={handleCustomPartySize}/>}

      {formError.phoneNumber && 
      <div className='error-message'>
        <p>please provide a ten digit phone number</p>
      </div>}
      <label htmlFor="phoneNumber" ></label>
      <input type="tel" name='phoneNumber' value={formData.phoneNumber} placeholder='phone number' minLength={10} maxLength={10} onChange={handleChange} required/>

      <label htmlFor="notes"></label>
      <textarea name="notes" cols="30" rows="3" placeholder='Reservation Notes...' value={formData.notes} onChange={handleChange}></textarea>

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
import './Reservations.css';
import { useContext, useState } from 'react';
import { EditContext } from '../ToggleEdit/ToggleEdit';
import { formatDate } from '../utils';

export default function ResCard({res, deleteReservation, setResToEdit, setShowForm}) {
  console.log(formatDate(res.date))
  const {edit, setEdit} = useContext(EditContext)

  const [showNotes, setShowNotes] = useState(false)
 
  const phoneFormat = (input) => {
      return input.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  }
  
  const formattedPhone = phoneFormat(res.phoneNumber)

  const toggleEditCard = () => {
    setEdit(prev => !prev)
    if (showNotes) {
      setShowNotes(prev => !prev)
    }
  }

  const handleDelete = () => {
    deleteReservation(res.docId)
    setEdit(prev => !prev)
  }

  const handleEdit = () => {
    setResToEdit({...res})
    setShowForm(prev => !prev)
  }

  return (
    <>
      {!edit && 
      <div className='reservation-card' id={res.docId}>
        <div className='grip-dots button' onClick={toggleEditCard}>
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </div>
        <div className='contact'>
          <div>
            <div className='time-size'>
              <p>{res.time.split('-')[0]}</p>
              <i className="fa-solid fa-people-group fa-xs"></i>
              <p>{res.partySize === 'custom' ? res.customParty : res.partySize}</p>
            </div>
            <h4>{res.name}</h4>
          </div>
        </div>
        <div className='details'>
            <p>{new Date(formatDate(res.date)).toDateString().split('202')[0]}</p>
            <p>{formattedPhone}</p>
            {res.notes && <p onClick={() => setShowNotes(prev => !prev)}>notes {showNotes ? '⬇' : '⬅'}</p>}   
        </div>
      </div>}
      {edit &&
      <div className='edit-card'>
        <div className='x button' onClick={() => setEdit(prev => !prev)}>
          <p>close</p>
        </div>
        <div className='confirm button'>
          <i className="fa-solid fa-check-double fa-xl"></i>
        </div>
        <div className='edit button' onClick={handleEdit}>
          <i className="fa-regular fa-pen-to-square fa-xl"></i>
        </div>
        <div className='cancel button' onClick={handleDelete}>
          <i className="fa-regular fa-trash-can fa-xl"></i>
        </div>
      </div>}
      {showNotes &&
      <div className='notes'>
        <p>{res.notes}</p>
      </div>}
    </>
  )
}

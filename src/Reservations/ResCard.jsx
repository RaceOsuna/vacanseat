import './Reservations.css';
import { useContext } from 'react';
import { EditContext } from '../ToggleEdit/ToggleEdit';

export default function ResCard({res, deleteReservation}) {

  const {edit, setEdit} = useContext(EditContext)
  
  const phoneFormat = (input) => {
      return input.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  }
  
  const formattedPhone = phoneFormat(res.phoneNumber)

  const handleDelete = () => {
    deleteReservation(res.docId)
    setEdit(prev => !prev)
  }

  return (
    <>
      {!edit && 
      <div className='reservation-card' id={res.docId}>
        <div className='grip-dots button' onClick={() => setEdit(prev => !prev)}>
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </div>
        <div className='contact'>
          <div>
            <div className='time-size'>
              <p>{res.time}</p>
              <i className="fa-solid fa-people-group fa-xs"></i>
              <p>{res.partySize}</p>
            </div>
            <h4>{res.name}</h4>
          </div>
        </div>
        <div className='details'>
          <p>{formattedPhone}</p>
          {res.notes &&
            <details>
            <summary>notes</summary>
          </details>}
        </div>
      </div>}
      {edit &&
      <div className='edit-card'>
        <div className='x button' onClick={() => setEdit(prev => !prev)}>
          <p>close</p>
        </div>
        <div className='confirm button'>
          <i class="fa-solid fa-check-double fa-xl"></i>
        </div>
        <div className='edit button'>
          <i class="fa-regular fa-pen-to-square fa-xl"></i>
        </div>
        <div className='cancel button' onClick={handleDelete}>
          <i class="fa-regular fa-trash-can fa-xl"></i>
        </div>
      </div>}
    </>
  )
}

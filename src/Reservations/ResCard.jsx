import './Reservations.css';
import { useContext } from 'react';
import { EditContext } from '../ToggleEdit/ToggleEdit';

export default function ResCard(props) {

  const {edit, setEdit} = useContext(EditContext)

  console.log(edit)
  
  const phoneFormat = (input) => {
    // if(typeof(input) !== 'string') input = input.toString()
    if(input.length === 10){
      return input.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    } else if(input.length < 10) {
      return 'was not supplied enough numbers please pass a 10 digit number'
    } else if(input.length > 10) {
      return 'was supplied too many numbers please pass a 10 digit number'
    }else{
      return 'something went wrong'
    }
  }
  
  const formattedPhone = phoneFormat(props.res.phoneNumber)

  return (
    <>
      {!edit && 
      <div className='reservation-card' id={props.res.docId}>
        <div className='grip-dots' onClick={() => setEdit(prev => !prev)}>
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </div>
        <div className='contact'>
          <div>
            <div className='time-size'>
              <p>{props.res.time}</p>
              <i className="fa-solid fa-people-group fa-xs"></i>
              <p>{props.res.partySize}</p>
            </div>
            <h4>{props.res.name}</h4>
          </div>
        </div>
        <div className='details'>
          <p>{formattedPhone}</p>
          {props.res.notes &&
            <details>
            <summary>notes</summary>
          </details>}
        </div>
      </div>}
      {edit &&
      <div className='edit-card'>
        <div className='x button' onClick={() => setEdit(prev => !prev)}>
          {/* <i className="fa-solid fa-x fa-xs"></i> */}
          <p>close</p>
        </div>
        <div className='confirm button'>
          <i class="fa-solid fa-check-double fa-xl"></i>
        </div>
        <div className='edit button'>
          <i class="fa-regular fa-pen-to-square fa-xl"></i>
        </div>
        <div className='cancel button'>
          <i class="fa-regular fa-trash-can fa-xl"></i>
        </div>
      </div>}
    </>
  )
}

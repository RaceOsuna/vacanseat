import './Reservations.css';

export default function ResCard(props) {
  
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
    <div key={props.res.name} className='reservation-card'>
      <div className='grip-dots'>
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </div>
      <div className='contact'>
        <div>
          <p>7:00</p>
          <h4>{props.res.name}</h4>
        </div>
      </div>
      <div className='details'>
          <p>{formattedPhone}</p>
          <p>notes</p>
      </div>
      <div className='party-size'>
        {props.res.partySize}
      </div>
    </div>
  )
}

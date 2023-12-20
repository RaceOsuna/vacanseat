import './Reservations.css';

export default function ResCard({name, phone, date, partySize, notes, isComplete}) {
  return (
    <div className='reservation-card'>
      <div>{date}</div>
      <div>
        <h4>{name}</h4>
        <p>{phone}</p>
      </div>
      <div>{partySize}</div>
    </div>
  )
}

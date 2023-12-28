import { useEffect, useState } from 'react'

import { initializeApp } from "firebase/app";
import { collection, doc, setDoc, getFirestore, getDocs, documentId} from "firebase/firestore"
import { firebaseConfig } from './firebaseConfig';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Reservations from './Reservations/Reservations';
import Layout from './Layout/Layout';
import Form from './Form/Form';

function App() {

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const myCollection = collection(db, 'reservations')

const [resData, setResData] = useState([])
const [resCount, setResCount] = useState(resData.length)

const today = new Date().toLocaleDateString();
const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

const [showForm, setShowForm] = useState(false)

console.log(selectedDate)

const getData = async() => {
  const snaps = await getDocs(myCollection)
  let reservs = [];
  snaps.forEach(snap => {
    reservs.push(snap.data())
  })
  setResData(reservs)
  setResCount(reservs.length)
}

const addReservation = async(event, data) => {
  event.preventDefault()
  await setDoc(doc(myCollection), {
    ...data
  });
  setResCount(prev => prev += 1)
}

useEffect(() => {
  getData()
}, [resCount])

console.log('here', resData)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='app'>
        <Layout selectedDate={selectedDate} setSelectedDate={setSelectedDate} setShowForm={setShowForm}>
          {!showForm && <Reservations resData={resData} selectedDate={selectedDate} />}
          {showForm && <Form addReservation={addReservation} selectedDate={selectedDate} />}
        </Layout>
      </div>
    </LocalizationProvider>
  )
}

export default App

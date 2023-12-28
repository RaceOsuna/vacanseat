import { useEffect, useState } from 'react'

import { initializeApp } from "firebase/app";
import { collection, doc, addDoc, getFirestore, getDocs} from "firebase/firestore"
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

useEffect(() => {
  getData()
}, [resCount])

console.log('here', resData)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='app'>
        <Layout selectedDate={selectedDate} setSelectedDate={setSelectedDate}>
          {!showForm && <Reservations resData={resData} selectedDate={selectedDate} />}
          {showForm && <Form />}
        </Layout>
      </div>
    </LocalizationProvider>
  )
}

export default App

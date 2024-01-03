import { useEffect, useState } from 'react'

import { initializeApp } from "firebase/app";
import { collection, doc, setDoc, getFirestore, getDocs, documentId} from "firebase/firestore"
import { firebaseConfig } from './firebaseConfig';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Reservations from './Reservations/Reservations';
import Layout from './Layout/Layout';
import Form from './Form/Form';
import ToggleEdit from './ToggleEdit/ToggleEdit';

function App() {

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const myCollection = collection(db, 'reservations')

const [resData, setResData] = useState([])
const [resCount, setResCount] = useState(resData.length)

// const today = new Date()
const [selectedDate, setSelectedDate] = useState(new Date(new Date().toLocaleDateString()).toISOString().split('T')[0])

const [showForm, setShowForm] = useState(false)

const getData = async() => {
  const snaps = await getDocs(myCollection)
  
  let reservs = [];
  snaps.forEach(snap => {
    reservs.push([snap.data(), snap.id])
  })

  let reducedReservs = reservs.reduce((acc, curr) => {
    curr[0].docId = curr[1]
    acc.push(curr[0])
    return acc
  }, [])

  setResData(reducedReservs)
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

  return (
      <div className='app'>
        <Layout selectedDate={selectedDate} setSelectedDate={setSelectedDate} setShowForm={setShowForm} showForm={showForm}>
          {!showForm && <Reservations resData={resData} selectedDate={selectedDate} />}
          {showForm && <Form addReservation={addReservation} selectedDate={selectedDate} />}
          {/* <ToggleEdit></ToggleEdit> */}
        </Layout>
      </div>
  )
}

export default App

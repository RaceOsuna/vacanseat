import { useEffect, useState } from 'react'

import { initializeApp } from "firebase/app";
import { collection, doc, setDoc, getFirestore, getDocs, deleteDoc, onSnapshot} from "firebase/firestore"
import { firebaseConfig } from './firebaseConfig';
import Reservations from './Reservations/Reservations';
import Layout from './Layout/Layout';
import Form from './Form/Form';

function App() {

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const myCollection = collection(db, 'reservations')

const [resData, setResData] = useState([])
const [resCount, setResCount] = useState(resData.length)
const [selectedDate, setSelectedDate] = useState(new Date(new Date().toLocaleDateString()).toISOString().split('T')[0])
const [showForm, setShowForm] = useState(false)
const [resToEdit, setResToEdit] = useState(null)
const [openSearchBar, setOpenSearchBar] = useState(false)
const [searchParams, setSearchParams] = useState('')

useEffect(() => {
  onSnapshot(myCollection, (snapshot) => {
    let reservs = []
    snapshot.forEach(item => {
      let task = {
        ...item.data(),
        docId: item.id
      }
      reservs = [task, ...reservs]
    })
    setResData(reservs)
  })
}, [])

const addReservation = async(event, data) => {
  event.preventDefault()
  await setDoc(doc(myCollection), {
    ...data
  });
  setResCount(prev => prev += 1)
}

const deleteReservation = async(id) => {
  await deleteDoc(doc(myCollection, id));
}

  return (
    <div className='app'>
      <Layout selectedDate={selectedDate} setSelectedDate={setSelectedDate} setShowForm={setShowForm} showForm={showForm} setResToEdit={setResToEdit} setOpenSearchBar={setOpenSearchBar} setSearchParams={setSearchParams} openSearchBar={openSearchBar}>
        {!showForm && <Reservations resData={resData} selectedDate={selectedDate} deleteReservation={deleteReservation} setResToEdit={setResToEdit} setShowForm={setShowForm} openSearchBar={openSearchBar} searchParams={searchParams} setSearchParams={setSearchParams}/>}
        {showForm && <Form addReservation={addReservation} selectedDate={selectedDate} resToEdit={resToEdit} setResToEdit={setResToEdit} setShowForm={setShowForm} setDoc={setDoc} doc={doc} myCollection={myCollection}/>}
      </Layout>
    </div>
  )
}

export default App

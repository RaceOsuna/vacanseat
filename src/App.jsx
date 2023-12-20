import { useEffect, useState } from 'react'

import { initializeApp } from "firebase/app";
import { collection, doc, addDoc, getFirestore, getDocs} from "firebase/firestore"
import { firebaseConfig } from './firebaseConfig';
import Reservations from './Reservations/Reservations';
import Header from './Header/Header';

function App() {

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const myCollection = collection(db, 'reservations')

const [resData, setResData] = useState([])
const [resCount, setResCount] = useState(resData.length)


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

console.log(resData)
console.log(resCount)
console.log(new Date('2023/12/23').toLocaleDateString())
  return (
    <div className='app'>
      <Header>
        <Reservations resData={resData} />
      </Header>
    </div>
  )
}

export default App

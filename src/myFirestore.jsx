import { initializeApp } from "firebase/app";
import { collection, doc, setDoc, getFirestore, getDocs} from "firebase/firestore"
import { firebaseConfig } from './firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const myCollection = collection(db, 'reservations')

const getReservations = async() => {
  const snaps = await getDocs(myCollection)
  
  let reservs = [];
  snaps.forEach(snap => {
    reservs.push([snap.data(), snap.id])
  })

  const reducedReservs = reservs.reduce((acc, curr) => {
    curr[0].docId = curr[1]
    acc.push(curr[0])
    return acc
  }, [])

  return reducedReservs
}

const addReservation = async(event, data) => {
  event.preventDefault()
  await setDoc(doc(myCollection), {
    ...data
  });
}

const data = getReservations()

export { data, addReservation }

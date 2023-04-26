const { initializeApp } = require("firebase/app");
const { getFirestore, addDoc, collection, getDocs,updateDoc } = require('firebase/firestore');
// Import the functions you need from the SDKs you need

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLfPQGx6SNi8TXKRFgRIVC48DgGZzjbQs",
  authDomain: "bling-bling-b3dae.firebaseapp.com",
  projectId: "bling-bling-b3dae",
  storageBucket: "bling-bling-b3dae.appspot.com",
  messagingSenderId: "863118589589",
  appId: process.env.APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore()
const data = collection(firestore, "list")

async function addUser({ firstname,lastname, email ,tel, status, place}) {
  try {
    const docRef = await addDoc(data, {
      firstname,
      lastname,
      email,
      tel,
      status,
      place,
      scanned: false,
      scanCount: 0
    });
    console.log('Document ajouté avec l\'ID : ', docRef.id);
    return docRef.id;
  }
  catch (error) {
    console.log('Erreur lors de l\'ajout du document : ', error);
  }
}

 function getAllData(req,res) {
  getDocs(data)
  .then((querySnapshot) => {
    const documents = querySnapshot.docs.map((doc) =>{

      // arr.push({id: doc.id,data:doc.data()})
        return {id: doc.id,...doc.data()};
    });
    // console.log(documents);
    res.status(200).json(documents)

  }).catch((error) => {
      console.log('Erreur lors de la récupération des documents : ', error);
    });
}
module.exports.addUser = addUser;
module.exports.getAllData = getAllData;
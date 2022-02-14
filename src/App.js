import { useEffect } from 'react';
import Navbar from './components/Navbar';
import './index.css';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom'
import Home from './pages/home';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyBjdQ7eFk1mBCFQGomzGBVQDN17WFYQVok",
  authDomain: "icrc-attend.firebaseapp.com",
  projectId: "icrc-attend",
  storageBucket: "icrc-attend.appspot.com",
  messagingSenderId: "953233861572",
  appId: "1:953233861572:web:58d2e6b53f179c9ad99291",
  measurementId: "G-HMSZ34BK75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();

function App() {

  const read = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  }

  useEffect(() => {
    read()
    return () => {
      // cleanup
    };
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' 
            element={<Home />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

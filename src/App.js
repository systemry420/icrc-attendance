import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import './index.css';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom'
import Home from './pages/home';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import Login from './pages/Login';
import Team from './pages/admin/Team';
import Table from './pages/admin/Table';

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
export const db = getDatabase(app);

function App() {
  const [schedule, setSchedule] = useState([]);

  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' 
            element={<Home />}></Route>
          <Route path='/login' 
            element={<Login />}></Route>
          <Route path='/team' 
            element={<Team />}></Route>
          <Route path='/table'
            element={<Table />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

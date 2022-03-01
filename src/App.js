import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import Login from './pages/login';
import Team from './pages/admin/Team';
import Table from './pages/admin/Table';
import AdminLogin from './pages/AdminLogin'
import LanguageProvider from './contexts/LanguageContext'
import LanguageContext from './contexts/LanguageContext'
import { useContext } from 'react'

const firebaseConfig = {
  apiKey: "AIzaSyBjdQ7eFk1mBCFQGomzGBVQDN17WFYQVok",
  authDomain: "icrc-attend.firebaseapp.com",
  databaseURL: "https://icrc-attend-default-rtdb.firebaseio.com",
  projectId: "icrc-attend",
  storageBucket: "icrc-attend.appspot.com",
  messagingSenderId: "953233861572",
  appId: "1:953233861572:web:15547fcf7d6581f0d99291",
  measurementId: "G-3RR4L3B4MG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

function App() {

  const languageCtx = useContext(LanguageContext);
  console.log(languageCtx);
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route exact path='/home' 
            element={<Home />}></Route>
          <Route path='/admin-login' 
            element={<AdminLogin />}></Route>
          <Route path='/team' 
            element={<Team />}></Route>
          <Route path='/table'
            element={<Table />}></Route>
          <Route path='*'
            element={<Login />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;

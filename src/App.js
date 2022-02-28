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
  apiKey: "AIzaSyAmwvHW806lTUQCwi1hU7Zhm6Unabu8LGU",
  authDomain: "drr305-0.firebaseapp.com",
  projectId: "drr305-0",
  storageBucket: "drr305-0.appspot.com",
  messagingSenderId: "406102692288",
  appId: "1:406102692288:web:cc737992a04c231ed93825",
  measurementId: "G-ZDXFLCHGPJ"
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

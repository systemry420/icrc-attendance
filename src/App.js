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
import { ThemeProvider, ThemeCtx } from './contexts/ThemeCtx';

const firebaseConfig = {
  apiKey: "AIzaSyAmwvHW806lTUQCwi1hU7Zhm6Unabu8LGU",
  authDomain: "drr305-0.firebaseapp.com",
  databaseURL: "https://drr305-0-default-rtdb.firebaseio.com",
  projectId: "drr305-0",
  storageBucket: "drr305-0.appspot.com",
  messagingSenderId: "406102692288",
  appId: "1:406102692288:web:cc737992a04c231ed93825",
  measurementId: "G-ZDXFLCHGPJ"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

function App() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}

function Main () {
  const themeCtx = useContext(ThemeCtx);

  return (
    <div>
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
    </div>
  )
}

export default App;

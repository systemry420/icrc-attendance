import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import Login from './pages/login';
import Team from './pages/admin/Team';
import Table from './pages/admin/Table';
import AdminLogin from './pages/AdminLogin'

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
export const db = getDatabase(app);

function App() {

  return (
    <>
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
    </>
  );
}

export default App;

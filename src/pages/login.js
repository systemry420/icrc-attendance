import React, { useState, useEffect } from "react";
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../App'
import Navbar from "../components/Navbar";
import '../index.css';
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [team, setTeam] = useState([])
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    for (let i = 0; i < team.length; i++) {
      const member = team[i]['data'];
      if (member.code === name && member.password === password) {
        navigate('/')
        break;
      }
      else {
        alert('error')
      }
    }
    
    setName('')
    setPassword('')
  }

  const readTeam = async () => {
    const list = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      const member = {data: doc.data()}
      list.push(member)
    });
    setTeam(list)
  }

  useEffect(() => {
    readTeam()
    return () => {
    };
  }, []);
  
  return (
    <>
      <Navbar />
      <div className="container">
      <div className="fill-form form-box">
      <h1>Title</h1>
        <form className="col-lg-6 col-md-6 col-sm-12">
            <div className="mt-4">
              <input
                id="name"
                autoComplete="false"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type='text' />
            </div>

            <div className="mt-4">
              <input
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                type='password' />
            </div>

            <div className="mt-4">
              <input 
                type='submit'
                onClick={handleSubmit}
                value='Login' />
            </div>
        </form>

      </div>
    </div>
    </>
  );
}

export default Login;

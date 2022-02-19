import React, { useState, useEffect } from "react";
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../App'
import '../index.css';
import { useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'
import { Link } from 'react-router-dom'

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
        localStorage.setItem('user', JSON.stringify(member))
        // save to localstorage
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
      {/* <Navbar /> */}
      <div className="container p-2">
      <div className="fill-form form-box">
        <div className="row">
          <div className="justify-center align-middle text-center col-lg-6 p-3 m-2">
            <img 
            style={{width: '45%', margin: '.2em auto'}}
            src={logo} alt='LRC' />
          </div>
        <form className="text-center col-lg-6 col-md-6 col-sm-12">
            <h1>Login as team member</h1>
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
              <div>
              <input 
                type='submit'
                onClick={handleSubmit}
                value='Login' />
              </div>
              <div className="mt-4">
              <Link 
                to={'/'}>
                  Admin Login</Link>
              </div>
            </div>
        </form>
        </div>

      </div>
    </div>
    </>
  );
}

export default Login;

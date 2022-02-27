import React, { useReducer, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png'
import { LanguageReducer, languageState } from '../reducers/Language';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons'

function Navbar({message, pages = [] }) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [state, dispatch] = useReducer(LanguageReducer, languageState)
  const navigate = useNavigate()

  const switchLanguage = () => {
    dispatch({type: 'SWITCH_LANGUAGE'})
  }

  const logout = () => {
    navigate('/login')
    try {
      let admin = JSON.parse(localStorage.getItem('admin'))
      let user = JSON.parse(localStorage.getItem('user'))
      if (admin) {
        localStorage.removeItem('admin')
      }
      if (user) {
        localStorage.removeItem('user')
      }
    } catch(e) {
        console.log(e);
    }
  }
  
  return (
    <nav>
      <ul>
        <img src={logo} alt="lrc" style={{'width': '65px'}} />
        <span>{message ? message : '' }</span>
        {pages.length > 0 && pages.map((page) => {
          return(
            <li style={{'width': `calc(100% / ${pages.length}`}} key={page}>
                <Link className='navlink' to={`/${page}`}>
                    {page}
                </Link>
            </li>
          )
        })}

        <span className='dropdown'>
          <span onClick={() => setShowDropdown(!showDropdown)} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className='dropdown-toggle' aria-labelledby="dropdownMenuButton" type='button'>
            <FontAwesomeIcon icon={faCog} style={{fontSize: '1.4em', color: 'Navy'}} />
          </span>
          {showDropdown && <div className='dropdown-menu' style={{display: 'block', position: 'absolute', right: '0px'}}>
            {/* <button className='dropdown-item' onClick={switchLanguage}>
              Change Language
            </button> */}
            <button className='dropdown-item' onClick={logout}>
              Logout
            </button>
          </div>}
        </span>
      </ul>
    </nav>
  );
}

export default Navbar
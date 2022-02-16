import React, { useReducer } from 'react'
import { Link } from 'react-router-dom';
import logo from '../images/logo.png'
import { LanguageReducer, languageState } from '../reducers/Language';

function Navbar({ pages = [] }) {

  const [state, dispatch] = useReducer(LanguageReducer, languageState)

  const switchLanguage = () => {
    dispatch({type: 'SWITCH_LANGUAGE'})
  }
  
  return (
    <nav>
      <ul>
        <img src={logo} alt="lrc" style={{'width': '65px'}} />
        {pages.length > 0 && pages.map((page) => {
          return(
            <li style={{'width': `calc(100% / ${pages.length}`}} key={page}>
                <Link className='navlink' to={`/${page}`}>
                    {page}
                </Link>
            </li>
          )
        })}
        <span onClick={switchLanguage}>EN/AR</span>
      </ul>
    </nav>
  );
}

export default Navbar
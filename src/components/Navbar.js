import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../images/logo.png'

function Navbar({ pages = [] }) {
  
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
      </ul>
    </nav>
  );
}

export default Navbar
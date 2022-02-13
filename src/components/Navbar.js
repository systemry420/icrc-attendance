import React from 'react'
import { Link } from 'react-router-dom';

function Navbar({ }) {
    const pages = [
        'home', 'schedule', 'jjj'
    ]
  return (
    <nav>
      <ul>
        {pages.map((page) => {
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
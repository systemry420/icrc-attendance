import React from 'react'
import { Link } from 'react-router-dom';

function Navbar({ pages = [] }) {
  
  return (
    <nav>
      <ul>
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
import React from 'react';

function List({ list }) {
    return (
      <div className="mb-5 col-lg-6 justify-center align-center">
        <h1>List</h1>
        {list.length > 0 ? (
          <ul className='list-group'>
            {list.map((day, idx) => {
              return (
                <li 
                    className="py-3 list-group-item d-flex justify-content-between" 
                    key={idx}>
                  {day}
                  <span className='remove-btn text-danger'>X</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <h3>No dates has been selected</h3>
        )}
      </div>
    );
}

export default List;
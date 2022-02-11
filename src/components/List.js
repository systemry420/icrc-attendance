import React from 'react';

function List({ list }) {
    console.log(list);
    return (
      <div className="container mt-3">
        <h1>List</h1>
        {list.length > 0 ? (
          <ul>
            {list.map((day, idx) => {
              return <li key={idx}>{day}</li>;
            })}
          </ul>
        ) : (
          <h1>SHit</h1>
        )}
      </div>
    );
}

export default List;
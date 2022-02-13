import React from 'react'

function Table() {
  return (
    <div className="p-2">
      <div className="row">
        <h1 className='col-6'>Table</h1>
        <input className='col-6' type='button' value='Download' />
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <td>Person 1</td>
              <td>Person 2</td>
              <td>Person 3</td>
              <td>Person 4</td>
              <td>Person 4</td>
              <td>Person 4</td>
              <td>Person 4</td>
              <td>Person 4</td>
              <td>Person 4</td>
              <td>Person 4</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Person 1</td>
              <td>Person 2</td>
              <td>Person 3</td>
              <td>Person 4</td>
              <td>Person 4</td>
              <td>Person 4</td>
              <td>Person 4</td>
              <td>Person 4</td>
              <td>Person 4</td>
              <td>Person 4</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
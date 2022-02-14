import { collection, getDocs } from 'firebase/firestore';
import React, {useState, useEffect } from 'react'
import { db } from "../../App";
function Table() {
  const [teamList, setTeamList] = useState([]);

  const readList = async () => {
    const list = [];
    const querySnapshot = await getDocs(collection(db, 'users'))
    querySnapshot.forEach(doc => {
      const member = { id: doc.id, data: doc.data() }
      list.push(member)
    })
    setTeamList(list)
  }

  useEffect(() => {
    readList();
    return () => {
    };
  }, []);

  return (
    <div className="p-2">
      <div className="row p-2">
        <h1 className='col-4'>Table</h1>
        <input className='col-4' type='button' value='Download' />
      </div>
      <div className="table-responsive p-2">
        <table className="table p-2">
          <thead>
            <tr>
              {teamList.length > 0 && teamList.map(member => {
                return <td>{member.data.name}</td>
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Day 1</td>
              <td>Day 2</td>
              <td>Day 3</td>
              <td>Day 4</td>
              <td>Day 4</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
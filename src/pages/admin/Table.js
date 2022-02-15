import { collection, collectionGroup, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, {useState, useEffect } from 'react'
import { db } from "../../App";
import Navbar from '../../components/Navbar';
function Table() {
  const [teamList, setTeamList] = useState([]);

  const readList = async () => {
    const list = [];
    const usersQuery = await getDocs(collection(db, 'users'))
    usersQuery.forEach(async doc => {
      const member = { id: doc.id, data: doc.data() };
        // console.log(member);
      list.push(member)
    })
    setTeamList(list)

    const scheduleQuery = collection(db, 'schedule/2_2022/u1')
    const querySnapshot = await getDocs(scheduleQuery);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
    });
  }

  useEffect(() => {
    readList();
    return () => {
    };
  }, []);

  return (
   <>
      <Navbar />
     <div className="p-3">
      <div className="row p-2">
        <h1 className='col-5'>Table</h1>
        <input className='col-5' type='button' value='Download' />
      </div>
      <div className="table-responsive p-2">
        <table className="table p-2">
          <thead>
            <tr>
              {teamList.length > 0 && teamList.map(member => {
                return (
                  <td key={member.id}>
                    {member.data.name}
                  </td>
                )
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <ul>
                  <li>Day 1</li>
                  <li>Day 1</li>
                  <li>Day 1</li>
                </ul>
              </td>
              <td>Day 2</td>
              <td>Day 3</td>
              <td>Day 4</td>
              <td>Day 4</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
   </>
  );
}

export default Table;
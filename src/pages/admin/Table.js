import { collection, getDocs, getDoc, doc, query, where } from 'firebase/firestore';
import React, {useState, useEffect } from 'react'
import { db } from "../../App";
import Navbar from '../../components/Navbar';
function Table() {
  const [teamList, setTeamList] = useState([]);
  const [datesList, setDatesList] = useState([]);

  const readList = async () => {
    setTeamList([])
    const list = [], fullList = [];
    const usersQuery = await getDocs(collection(db, 'users'))
    usersQuery.forEach(async doc => {
      const member = { id: doc.id, data: doc.data() };
      list.push(member)
    })
    setTeamList(list)
  }

  const readSchedule = async (user = {code: 'LRC1'}) => {
    setDatesList([])
    const query = await getDoc(doc(db, `schedule/2_2022/${user.code}/${user.code}`))
    console.log(query.data()['data']);
    const dates = Object.keys(query.data()['data']).map(key => {
      return query.data()['data'][key]
    })
    setDatesList([...datesList, {
      user, dates
    }])

    console.log(datesList);
  }

  useEffect(() => {
    readList();
    readSchedule()
    return () => {
      setTeamList([])
      setDatesList([])
    };
  }, []);

  return (
   <>
      <Navbar />
     <div className="container p-3">
      <div className="row p-2">
        <h1 className='col-6'>Table</h1>
        <input className='col-4' type='button' value='Download' />
      </div>
      <div className="table-responsive p-2">
        <table className="table table-stripped p-2">
          <thead>
            {datesList.length > 0 && datesList.map(data => {
              return (
                <tr key={data.user.code}>
                  <th>
                    {data.user.code}
                  </th>
                  {data.dates.length > 0 && data.dates.map((date, idx) => {
                      return (
                        <td key={date.id}>{date.day + date.day}</td>
                      )
                  })}
                </tr>
              )
            })}
          </thead>
        </table>
      </div>
    </div>
   </>
  );
}

export default Table;
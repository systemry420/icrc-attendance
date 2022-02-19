import { collection, getDocs, getDoc, doc, query, where } from 'firebase/firestore';
import React, {useState, useEffect } from 'react'
import { db } from "../../App";
import Navbar from '../../components/Navbar';
function Table() {
  const [teamList, setTeamList] = useState([]);
  const [datesList, setDatesList] = useState([]);

  const readList = async () => {
    setTeamList([])
    const list = [];
    const usersQuery = await getDocs(collection(db, 'users'))
    usersQuery.forEach(async doc => {
      const member = { id: doc.id, ...doc.data() };
      list.push(member)
    })
    // console.log(list);
    setTeamList(list)
  }

  const readSchedule = async () => {
    setDatesList([])
    teamList.forEach((user) => {
      console.log(user);
      getDoc(doc(db, `schedule/2_2022/${user.code}/${user.code}`))
      .then(query => {
        console.log(query.data()['data']);
        const dates = Object.keys(query.data()['data']).map(key => {
          return query.data()['data'][key] 
        })
        setDatesList(prev => {
          return [...prev, {
            user, dates
          }]
        })
      })
    })
  }

  useEffect(() => {
    readList();
    readSchedule()
    return () => {
      setTeamList([])
      setDatesList([])
    };
  }, []);

  let team = datesList.length && datesList.map(obj => {
    const { user, dates } = obj;
    let userJSX = <th>{user.code}</th>
    return(
      <tr key={user.name}>
        {userJSX}
        {dates.map(date => {
          return (
            <td key={date.id}>{date.day}</td>
          )
        })}  
      </tr>
    )
  })


  console.log(team);

  return (
   <>
      <Navbar />
     <div className="container p-3">
      <div className="row p-2">
        <h1 className='col-6'>Table</h1>
        <input className='col-4' type='button' value='Download' />
      </div>
      <div className="table-responsive-sm p-2">
        <table className="table table-striped table-bordered p-2">
          <thead>
            <tr>
              <th>Name</th>
              <th>Dates</th>
            </tr>
          </thead>
          <tbody>
            {team.length === 0 && <h1>No data</h1>}
            {team.length > 0 && team}
          </tbody>
        </table>
      </div>
    </div>
   </>
  );
}

export default Table;
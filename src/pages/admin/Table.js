import { collection, getDocs, getDoc, doc, query, where, collectionGroup, documentId } from 'firebase/firestore';
import React, {useState, useEffect } from 'react'
import { db } from "../../App";
import Navbar from '../../components/Navbar';
import TableToExcel from '@linways/table-to-excel'
import Calendar from '../../components/Calendar';

const Table = () => {
  const [scheduleList, setScheduleList] = useState([]);
  const [daysList, setDaysList] = useState([]);
  const pages = ['team', 'table'];

  const readSchedule = async () => {
    let usersList = [];
    setDaysList(getDaysInMonth(1, 2022));
    for (let i = 0; i < daysList.length; i++) {
      const day = daysList[i];
      const querySnap = await getDocs(collection(db, `schedule/2_2022/${day.id}`))

      usersList = []
      // eslint-disable-next-line no-loop-func
      querySnap.forEach(document => {
        usersList.push(document.data())
      })

      // eslint-disable-next-line no-loop-func
      setScheduleList(prev => {
        return [...prev, {day, users: usersList}]
      }); 
      
    }
    usersList = [] 
  }

  function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1); 
    var days = [];
    while (date.getMonth() === month) {
      // console.log(new Date(date).getTime().toString());
      days.push(
        {string: new Date(date).toString().substring(0, new Date(date).toString().indexOf(year)), 
          id: new Date(date).getTime().toString()
        });
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  useEffect(() => {
    readSchedule()
    return () => {
      setScheduleList([])
      setDaysList([])
    };
  }, []); 

  console.log(scheduleList);

  // let team = scheduleList.length && scheduleList.map(obj => {
  //   const { day, users } = obj;
  //   let userJSX = (
  //     <>
  //     <th data-a-h="center"
  //       data-b-a-s='thin'
  //       data-a-v="middle">{day.day.id}</th>
  //     <th data-a-h="center"
  //       data-b-a-s='thin'
  //       data-a-v="middle">{day.day.id}</th>
  //     </>
  //   )
  //   return(
  //     <tr data-height='40' key={day.day.id}>
  //       {userJSX}
  //       {users.map(user => {
  //         return (
  //           <td 
  //           data-a-h="center"
  //           data-a-v="middle"
  //           data-b-a-s='thin'
  //           data-t='d'
  //             key={user.code}>{user.name || ''}</td>
  //         )
  //       })}  
  //     </tr>
  //   )
  // })

  const convertTable = () => {
    TableToExcel.convert(document.getElementById('table1'), {
      name: 'table_2_2022.xlsx',
      sheet: {
        name: 'Sheet 2_2022'
      }
    })
  }

  return (
   <>
      <Navbar pages={pages} />
     <div className="container p-2">
      <div className="row">
        <h1 className='col-6'>Table</h1>
        <input 
          className='col-4' 
          onClick={convertTable}
          type='button' value='Download' />
      </div>
      <div className="table-responsive m-2">
      <table id="table1" className='table table-responsive table-bordered'>
        <tbody>
          {/* {team} */}
          {scheduleList.map(workday => {
            return (
              <tr key={workday.day.id}>
                <th style={{ width: "65px", border: "1px solid lightgray" }}>
                  {workday.day.string}
                </th>
                  {workday.users.map(user => {
                      return (
                        <td 
                        data-a-h="center"
                        data-a-v="middle"
                        data-b-a-s='thin'
                        data-t='d'
                          key={user.code}>{user.name || ''}</td>
                      )
                  })}  
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <table
          data-a-ltr='true'
          data-a-h='left'
         id='table1' className="table table-striped table-bordered p-2">
          <thead>
            <tr></tr>
            <tr data-height='45'>
              <th  
                data-a-h="center"
                data-a-v="middle" 
                data-b-a-s='thin'
                data-f-bold='true'>Code</th>
              <th  
                data-a-h="center"
                data-a-v="middle" 
                data-b-a-s='thin'
                data-f-bold='true'>Name</th>
              <th 
                data-a-h="center"
                data-a-v="middle" 
                data-b-a-s='thin'
                data-f-bold='true'>Dates</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {team.length === 0 && <h1>No data</h1>}
            </tr>
            {team.length > 0 && team}
          </tbody>
        </table> */}
      </div>
    </div>
   </>
  );
}

export default Table;
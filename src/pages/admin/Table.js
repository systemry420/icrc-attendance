import { collection, getDocs, getDoc, doc, query, where } from 'firebase/firestore';
import React, {useState, useEffect } from 'react'
import { db } from "../../App";
import Navbar from '../../components/Navbar';
import TableToExcel from '@linways/table-to-excel'
import Calendar from '../../components/Calendar';

function Table() {
  const [teamList, setTeamList] = useState([]);
  const [datesList, setDatesList] = useState([]);
  const [daysList, setDaysList] = useState([]);
  const pages = ['team', 'table'];

  const readSchedule = async () => {
    setDatesList([])
    const list = JSON.parse(localStorage.getItem('teamList'));
    setTeamList(list);

    setDaysList(getDaysInMonth(1, 2022));

    teamList.forEach((user) => {
      getDoc(doc(db, `schedule/2_2022/${user.code}/${user.code}`))
      .then(query => {
        // console.log(query.data()['data']);
        // const dates = Object.keys(query.data()['data']).map(key => {
        //   return query.data()['data'][key] 
        // })

        // console.log(dates);
        // setDatesList(prev => {
        //   return [...prev, {
        //     user, dates
        //   }]
        // })
      })
    })
  }

  function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date).toString().substring(0, new Date(date).toString().indexOf(year)));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  useEffect(() => {
    readSchedule()
    return () => {
      // setTeamList([])
      // setDatesList([])
    };
  }, []);

  let team = datesList.length && datesList.map(obj => {
    const { user, dates } = obj;
    let userJSX = (
      <>
      <th data-a-h="center"
        data-b-a-s='thin'
        data-a-v="middle">{user.code}</th>
      <th data-a-h="center"
        data-b-a-s='thin'
        data-a-v="middle">{user.name}</th>
      </>
    )
    return(
      <tr data-height='40' key={user.name}>
        {userJSX}
        {dates.map(date => {
          return (
            <td 
            data-a-h="center"
            data-a-v="middle"
            data-b-a-s='thin'
            data-t='d'
              key={date.id}>{date.day || ''}</td>
          )
        })}  
      </tr>
    )
  })

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
      <table className='table table-responsive table-bordered'>
          {daysList.map(day => {
            return (
              <tr key={day}>
                <th style={{ width: "65px", border: "1px solid lightgray" }}>
                  {day}
                </th>
                <td style={{ border: "1px solid lightgray" }}>
                  abc
                </td>
              </tr>
            );
          })}
      </table>
      {/* </table>
        <table
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
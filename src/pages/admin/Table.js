import React, {useState, useEffect } from 'react'
import { db } from "../../App";
import Navbar from '../../components/Navbar';
import TableToExcel from '@linways/table-to-excel'
import { onValue, ref } from 'firebase/database' 

const Table = () => {
  const [scheduleList, setScheduleList] = useState([]);
  const [daysList, setDaysList] = useState([]);
  const pages = ['team', 'table'];
  const teamList = JSON.parse(localStorage.getItem('teamList'));
  const [dailyList, setDailyList] = useState([]);

  const readSchedule = async () => {
    setDaysList(getDaysInMonth(1, 2022))
    let list, users;
    onValue(ref(db, `schedule/2_2022`), snapshot => {
      const days = snapshot.val()
      list = Object.keys(days).map(key => {
        users = Object.keys(days[key]).map(k => {
          return days[key][k]
        })
        return {day: key, users}
      }) 
      setDailyList(list);
    })
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


  let team = daysList.map(day => {
    let dayJSX = (
      <th data-a-h="center"
        data-b-a-s='thin'
        data-a-v="middle" key={'th' + day.id}>{day.string}</th>
    )
    return(
      <tr data-height='40' key={'tr' + day.id}>
        {dayJSX}
        {dailyList.map(item => {
          return item['users'].map(user => {
            if (item.day === day.id) {
              return (
                <td
                  data-a-h="center"
                  data-a-v="middle"
                  data-b-a-s="thin"
                  data-t="d"
                  key={user.code}
                  >
                  {user.name || ". "}
                </td>
              );
            }
          })
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
      <div className="container p-3">
        <div className="row">
          <h1 className="col-6">Table</h1>
          <input
            className="col-4"
            onClick={convertTable}
            type="button"
            value="Download"
          />
        </div>
        <div className="table-responsive m-2">
          <table id="table1" className="table table-responsive table-bordered">
            <tbody>{team}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Table;
import React, {useState, useEffect } from 'react'
import { db } from "../../App";
import Navbar from '../../components/Navbar';
import TableToExcel from '@linways/table-to-excel'
import { onValue, ref } from 'firebase/database' 
import Calendar from '../../components/Calendar';

const Table = () => {
  const [daysList, setDaysList] = useState([]);
  const pages = ['table', 'team'];
  const [dailyList, setDailyList] = useState([]);
  const [monthID, setMonthID] = useState(`${+(new Date().getMonth()).toString()}_${+new Date().getFullYear()}`)

  const readSchedule = () => {
    setDaysList(getDaysInMonth(+monthID.split('_')[0], +monthID.split('_')[1]))
    localStorage.setItem('daysList', JSON.stringify(daysList))
    
    let daily = localStorage.getItem('dailyList')
    if (daily) {
      setDailyList(JSON.parse(daily))
    } else {
      let list, users;
      try {
        onValue(ref(db, `schedule/${monthID}`), async snapshot => {
          const days = await snapshot.val()
          if (days) {
            list = Object.keys(days).map(key => {
              users = Object.keys(days[key]).map(k => {
                return days[key][k]
              })
              return {day: key, users}
            }) 
            setDailyList(list);
            localStorage.setItem('daylyList', JSON.stringify(list))
          }
        })
      } catch (e) {}
    }
  }

  function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1); 
    var days = [];
    while (date.getMonth() === month) {
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
      setDaysList([])
    };
  }, [monthID]); 

  const convertTable = () => {
    TableToExcel.convert(document.getElementById('table1'), {
      name: `table_${monthID}.xlsx`,
      sheet: {
        name: 'Sheet 2_2022'
      }
    })
  }

  const onSelectDay = (date) => {
    let d = `${(new Date(date).getMonth()).toString()}_${new Date(date).getFullYear()}`
    setMonthID(d)
  }

  let team = daysList.map(day => {
    let dayJSX = (
      <th 
        style={{ position: 'sticky' }}
        data-a-h="center"
        data-b-a-s='thin'
        data-a-v="middle" key={'th' + day.id}>
          <div style={{display: 'inline-block', position: 'sticky'}}>
            {day.string}
          </div>
        </th>
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
                  data-height='100'
                  key={user.code}
                  >
                  {user.name}
                </td>
              );
            }
          })
        })}  
      </tr>
    )
  })

  return (
    <>
      <Navbar pages={pages} />
      <div className="container p-3">
      <Calendar 
        maxDetail='year'
        onSelectDay={onSelectDay} 
        />
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
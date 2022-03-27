import React, {useState, useEffect } from 'react'
import { db } from "../../App";
import Navbar from '../../components/Navbar';
import TableToExcel from '@linways/table-to-excel'
import { onValue, ref } from 'firebase/database' 
import Calendar from '../../components/Calendar';
import moment from 'moment'

const Table = () => {
  const [daysList, setDaysList] = useState([]);
  const pages = ['table', 'team'];
  const [dailyList, setDailyList] = useState([]);

  useEffect(() => {
    readSchedule(new Date())
    return () => {
      // setDaysList([])
      // setDailyList([])
      // setMonthID('')
      readSchedule(new Date())
    };
  }, []);

  const readSchedule = (date) => {
    let monthID = `${(date.getMonth()).toString()}_${(date).getFullYear()}`
    setDaysList(getDaysInMonth(date.getMonth(), date.getFullYear()))
    // localStorage.setItem(`daysList${'monthID'}`, JSON.stringify(daysList))
    
    // let daily = localStorage.getItem(`daysList${'monthID'}`)
    // if (daily) {
    //   setDailyList(JSON.parse(daily))
    // } else {
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
            // localStorage.setItem(`daysList${'monthID'}`, JSON.stringify(list))
          }
        })
      } catch (e) {}
    // }
  }

  const getDaysInMonth = (month, year) => {
    var date = new Date(year, month, 1); 
    var days = [];
    while ((date.getMonth()) === month) {
      const formattedDay = moment(date).format('dddd D')

      days.push(
        {string: formattedDay, 
          id: moment(date).format('DMMYYYY')
        });
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  const convertTable = () => {
    TableToExcel.convert(document.getElementById('table1'), {
      name: `${moment().format('MMMM-YYYY')}.xlsx`,
    })
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
      <tr data-height='30' key={'tr' + day.id}>
        {dayJSX}
        {(dailyList.length > 0) && dailyList.map((item, idx) => {
          return item['users'] && item['users'].map(user => {
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
        onSelectDay={readSchedule} 
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
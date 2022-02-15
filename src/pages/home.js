import { setLogLevel } from 'firebase/firestore';
import React, { useState } from 'react'
import Calendar from '../components/Calendar';
import List from '../components/List';
import Navbar from '../components/Navbar';

function Home() {
  const pages = [
    'home', 'schedule', 'jjj'
  ];
  const [list, setList] = useState([]);

  const onSelectDay = (day) => {
    const selectedDay = new Date(day).toString();
    const formattedDay = selectedDay.substring(0, selectedDay.indexOf('00'))

    const selectedDate = { id: new Date(formattedDay).getTime(), day: formattedDay}

    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      if (element.id === selectedDate.id) {
        return;
      }
    }
    setList([...list, selectedDate])
    console.log(list);
  }

  const removeDate = (id) => {
    // TODO: alert
    const removed = list.filter(d => d.id !== id);
    setList(removed)
  }

  const saveSchedule = () => {
    console.log('fire');
  }

  return (
    <>
      <Navbar pages={pages} />
      <div className="container">
        <div className='row'>
          <Calendar list={list} onSelectDay={onSelectDay}/>
          <List list={list} saveSchedule={saveSchedule} removeDate={removeDate} />
        </div>
      </div>
    </>
  );
}

export default Home;
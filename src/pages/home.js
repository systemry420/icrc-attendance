import React, { useState } from 'react'
import Calendar from '../components/Calendar';
import List from '../components/List';

function Home() {
  const [list, setList] = useState([]);

  const onSelectDay = (day) => {
    const selectedDay = new Date(day).toString();
    const formattedDay = selectedDay.substring(0, selectedDay.indexOf('00'))
    console.log(
      formattedDay
    );
    setList([...list, formattedDay])
  }

  return (
    <div className="container">
      <div className='row'>
        <Calendar list={list} onSelectDay={onSelectDay}/>
        <List list={list} />
      </div>
    </div>
  );
}

export default Home;
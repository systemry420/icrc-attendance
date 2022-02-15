import React, { useState } from 'react'
import Calendar from '../components/Calendar';
import List from '../components/List';
import Navbar from '../components/Navbar';
import { addDoc, collection, setDoc, doc } from "firebase/firestore";
import { db } from '../App'

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

  const saveSchedule = async () => {
    if (list.length === 0) {
      return;
    }
    const obj = Object.assign({}, list)
    
    console.log(obj);
    try {
      // grab month and user id 
      const scheduleRef = collection(db, 'schedule');

      const monthID = `${(new Date().getMonth() + 1).toString()}_${new Date().getFullYear()}`
      setDoc(doc(scheduleRef, monthID + '/' + 'u2/u2'),
         {id: 'u1', data: obj})
        .then((doc) => {
          console.log('added', doc);
        })

        // disable button
    } catch (e) {
      console.error("Error adding document: ", e);
    }
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
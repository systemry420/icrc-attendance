import React, { useState, useEffect } from 'react'
import Calendar from '../components/Calendar';
import List from '../components/List';
import Navbar from '../components/Navbar';
import { getDocs, collection, setDoc, doc } from "firebase/firestore";
import { db } from '../App'

function Home() {
  const [user, setUser] = useState({});
  const [list, setList] = useState([]);
  const monthID = `${(new Date().getMonth() + 1).toString()}_${new Date().getFullYear()}`

  const onSelectDay = (day) => {
    const selectedDate = formatDate(day)
    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      if (element.id === selectedDate.id) {
        return;
      }
    }
    setList([...list, selectedDate])
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
    try {
      // grab month from CAL
      const scheduleRef = collection(db, 'schedule');
      setDoc(doc(scheduleRef, monthID + `/${user.code}/${user.code}`),
         { data: obj})
        .then((doc) => {
          console.log('added', doc);
        })
        // disable button
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const readSchedule = async () => {
    const member = JSON.parse(localStorage.getItem('user'))
    setUser(member)
    const daysList = []
    try {
      const scheduleQuery = collection(db, `schedule/${monthID}/${member.code}`)
      const querySnapshot = await getDocs(scheduleQuery);
      querySnapshot.forEach((doc) => {
          const obj = doc.data()['data']
          Object.keys(obj).forEach(d => {
            daysList.push(obj[d])
          })
      });
      setList(daysList);
        // disable button or confirm
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }

  useEffect(() => {
    readSchedule()
    return () => {
    };
  }, []);

  function formatDate(day) {
    const selectedDay = new Date(day).toString();
    const formattedDay = selectedDay.substring(0, selectedDay.indexOf('00'))
    return { id: new Date(formattedDay).getTime(), day: formattedDay}
  }

  return (
    <>
      <Navbar message={`Welcome ${user.name} `}/>
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
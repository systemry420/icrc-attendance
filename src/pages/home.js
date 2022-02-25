import React, { useState, useEffect, useReducer } from 'react'
import Calendar from '../components/Calendar';
import List from '../components/List';
import Navbar from '../components/Navbar';
import { getDocs, collection, setDoc, doc, updateDoc, addDoc } from "firebase/firestore";
import { db } from '../App'
import { LanguageReducer, languageState as lang } from '../reducers/Language';
import Dialog from '../components/Dialog';
import Snackbar from '../components/Snackbar';
import { ref, set, onValue, push, child, update } from "firebase/database";

function Home() {
  const [language, dispatch] = useReducer(LanguageReducer, lang)
  const [user, setUser] = useState({});
  const [list, setList] = useState([]);
  const [toBeRemoved, setToBeRemoved] = useState([]);
  const monthID = `${(new Date().getMonth() + 1).toString()}_${new Date().getFullYear()}`

  useEffect(() => {
    readSchedule()
    return () => {
    };
  }, []);

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
    const toBeRemoved = list.filter(d => d.id === id);
    const updatedList = list.filter(d => d.id !== id);
    setToBeRemoved(toBeRemoved)
    setList(updatedList)
  }

  const saveSchedule = () => {
    if (list.length === 0) {
      return;
    }
    let updates = {}
    toBeRemoved.forEach(day => {
      updates = {...updates,
        [`users/${user.code}/dates/${monthID}/${day.id}`]: null,
        [`schedule/${monthID}/${day.id}/${user.code}`]: null
      }
    })
    list.forEach(day => {
      updates = {...updates,
        [`users/${user.code}/dates/${monthID}/${day.id}`]: day,
        [`schedule/${monthID}/${day.id}/${user.code}`]: user
      }
    })
    update(ref(db), updates).then(res => {
      console.log(res, 'updated');
    })
  }

  const readSchedule = () => {
    let daysList = [];
    setList([])
    const member = JSON.parse(localStorage.getItem('user'))
    setUser(member)
    onValue(ref(db, `users/${member.code}/dates/${monthID}`), snapshot => {
      const days = snapshot.val()
      if (days) {
        daysList = (Object.keys(days).map(key => {
          return days[key]
        }))
      }
      setList(daysList);
    })
  }

  function formatDate(day) {
    const selectedDay = new Date(day).toString();
    const formattedDay = selectedDay.substring(0, selectedDay.indexOf('00'))
    return { id: new Date(formattedDay).getTime(), day: formattedDay}
  }

  return (
    <>
      {/* <Dialog /> */}
      <Navbar message={`Welcome ${user.name} `}/>
      <div className="container">
        <div className='row'>
          <Calendar language={language} list={list} onSelectDay={onSelectDay}/>
          <List language={language} list={list} saveSchedule={saveSchedule} removeDate={removeDate} />
          {/* <Snackbar show={'false'} /> */}
        </div>
      </div>
    </>
  );
}

export default Home;
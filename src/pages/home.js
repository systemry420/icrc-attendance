import React, { useState, useEffect, useReducer } from 'react'
import Calendar from '../components/Calendar';
import List from '../components/List';
import Navbar from '../components/Navbar';
import { db } from '../App'
import { LanguageReducer, languageState as lang } from '../reducers/Language';
import Snackbar from '../components/Snackbar';
import { ref, onValue, update } from "firebase/database";
import moment from 'moment'

function Home() {
  const [language, dispatch] = useReducer(LanguageReducer, lang)
  const [user, setUser] = useState({});
  const [list, setList] = useState([]);
  const [toBeRemoved, setToBeRemoved] = useState([]);
  const monthID = `${(new Date().getMonth()).toString()}_${new Date().getFullYear()}`
  const [shake, setShake] = useState(false);
  const [toast, setToast] = useState('');


  useEffect(() => {
    readSchedule()
    return () => {
    };
  }, []);

  const onSelectDay = (day) => {
    setShake(true)
    const selectedDate = formatDate(day)
    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      if (element.id === selectedDate.id) {
        return;
      }
    }
    setList([...list, selectedDate])
  }

  function formatDate(day) {
    const formattedDay = moment(day).format('dddd D')
    const id = moment(day).format('DMMYYYY')
    return { id, day: formattedDay}
  }

  const removeDate = (id) => {
    setShake(true)
    const removedItem = list.find(d => d.id === id);
    const updatedList = list.filter(d => d.id !== id);
    setToBeRemoved(prev => [...prev, removedItem])
    setList(updatedList)
  }

  const saveSchedule = () => {
    let updates = {}
    setShake(false)

    if (list.length > 0) {
      list.forEach(day => {
        updates = {...updates,
          [`users_dates/${user.code}/dates/${monthID}/${day.id}`]: day,
          [`schedule/${monthID}/${day.id}/${user.code}`]: user
        }
      })
    } 

    toBeRemoved.forEach(day => {
      updates = {...updates,
        [`users_dates/${user.code}/dates/${monthID}/${day.id}`]: null,
        [`schedule/${monthID}/${day.id}/${user.code}`]: null
      }
    })

    update(ref(db), updates).then(res => {
      setToast('Schedule updated')
      setTimeout(() => {
        setToast('')
      }, 3000);
    })
  }

  const readSchedule = () => {
    let daysList = [];
    setList([])
    const member = JSON.parse(localStorage.getItem('user'))
    setUser(member)
    try {
      onValue(ref(db, `users_dates/${member.code}/dates/${monthID}`), snapshot => {
        const days = snapshot.val()
        if (days) {
          daysList = (Object.keys(days).map(key => {
            return days[key]
          }))
          setList(daysList);
        } else {
          setList([])
        }
        // cache
      })
    } catch (e) { }

    setToBeRemoved([])
  }

  return (
    <>
      <Navbar message={` ${user.name} `}/>
      <div className="container">
        <div className='row'>
          <Snackbar pos="middle-center" message={toast} />
          <Calendar showNavigation={false} language={language} list={list} onSelectDay={onSelectDay}/>
          <List shake={shake} language={language} list={list} saveSchedule={saveSchedule} removeDate={removeDate} />
        </div>
      </div>
    </>
  );
}

export default Home;
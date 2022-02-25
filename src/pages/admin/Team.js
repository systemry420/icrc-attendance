import { useState, useEffect, useRef } from "react";
import TeamList from "./TeamList";
import Navbar from '../../components/Navbar';
import Form from "./Form";
import { 
  collection, 
  getDocs, 
  deleteDoc, doc } from "firebase/firestore"; 
import { db } from '../../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { ref, set, push, child, onValue, remove } from "firebase/database";


const Team = () => {
  const [showForm, setShowForm] = useState(false);
  const [teamList, setTeamList] = useState([]);
  const [addIcon, setAddIcon] = useState(faPlus);
  const pages = ['team', 'table'];

  const addMember = (member) => {
    set(ref(db, 'users/' + member.code), member)
      .then(() => {
        console.log('user added');
      })
  }

  const removeMember = (code) => {
    set(ref(db, 'users/' + code), null)
    .then(() => {
      console.log('user removed');
    })
    readTeam()
  }

  const readTeam = () => {
    let list = []
    onValue(ref(db, 'users'), snapshot => {
      if (snapshot.val()) {
        list = Object.keys(snapshot.val()).map(key => {
          return snapshot.val()[key]
        })
      }
      setTeamList(list)
    })
  }

  useEffect(() => {
    readTeam()
    return () => {
    };
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
    addIcon === faPlus ? setAddIcon(faArrowUp) : setAddIcon(faPlus)
  }

  return (
    <>
      <Navbar pages={pages} />
      <div className="container p-lg-4 p-sm-2">
      <div className="fill-form form-box">
        <div className="row">
          <div className="col-2">
            <button 
              className="button"
              onClick={() => toggleForm()}
              style={{
                'fontSize': '1.3em',
                'height': '2em',
                'padding': '0',
                'width':'2em',
                'border': 'none',
                'alignItems': 'center',
                'alignContent': 'center',
                'verticalAlign': 'middle',
                'borderRadius': '50%',
                'outline': 'none'
                }}>
                  <FontAwesomeIcon icon={addIcon} />
                </button>
          </div>
          <div className="col-6">
            <h1>Add Member</h1>
          </div>
          {
            showForm ? (
              <Form id={teamList.length} addMember={addMember} />
            ) : ('')
          }

          <TeamList 
            removeMember={removeMember} 
            className='col-6' 
            teamList={teamList} />
        </div>
      </div>
    </div>
    </>
  );
}

export default Team;

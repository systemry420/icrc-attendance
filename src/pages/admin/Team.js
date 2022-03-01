import { useState, useEffect } from "react";
import TeamList from "./TeamList";
import Navbar from '../../components/Navbar';
import Form from "./Form";
import { db } from '../../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { ref, set, onValue } from "firebase/database";
import Snackbar from "../../components/Snackbar";

const Team = () => {
  const [showForm, setShowForm] = useState(false);
  const [teamList, setTeamList] = useState([]);
  const [addIcon, setAddIcon] = useState(faPlus);
  const pages = ['table', 'team'];
  const [toast, setToast] = useState("");

  const addMember = (member) => {
    set(ref(db, 'users/' + member.code), member)
      .then(() => {
        readTeam()
      }).then(() => {
        setToast('New member added')
        setTimeout(() => {
          setToast('')
        }, 3000);
      })
  }

  const removeMember = (code) => {
    // set(ref(db, 'users/' + code), null)
    // .then(() => {
    //   readTeam()
    // }).then(() => {
    //   setToast('Member removed')
    //   setTimeout(() => {
    //     setToast('')
    //   }, 3000);
    // })
    removeMemberSchedule(code)
  }

  const removeMemberSchedule = code => {
    // let list = JSON.parse(daysList)
    // list.forEach(day => {
    //   updates = {...updates,
    //     [`users_dates/${code}/dates/${monthID}/${day.id}`]: null,
    //     [`schedule/${monthID}/${day.id}/${code}`]: null
    //   }
    // })
    try {
      let monthsList = []
      onValue(ref(db, 'schedule'), snapshot => {
        if (snapshot.val()) {
          monthsList = Object.keys(snapshot.val()).map(key => {
            console.log(key);
            return snapshot.val()[key]
          })

          monthsList.forEach(monthDays => {
            console.log(monthDays);
          })
        }
      })
    } catch(e) {}
  }

  const readTeam = () => {
    let team = localStorage.getItem('teamList')
    if (team) {
      setTeamList(JSON.parse(team))
    } else {
      let list = []
      try {
        onValue(ref(db, 'users'), snapshot => {
          if (snapshot.val()) {
            list = Object.keys(snapshot.val()).map(key => {
              return snapshot.val()[key]
            })
          }
          setTeamList(list)
          localStorage.setItem('teamList', JSON.stringify(list))
        })
      } catch(e) {}
    }
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
      <Snackbar message={toast} />
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
              <Form
               list={teamList} addMember={addMember} />
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

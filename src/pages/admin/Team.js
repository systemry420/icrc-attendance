import { useState, useEffect } from "react";
import TeamList from "./TeamList";
import Navbar from '../../components/Navbar';
import Form from "./Form";
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, doc } from "firebase/firestore"; 
import { db } from '../../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowUp } from '@fortawesome/free-solid-svg-icons'

function Team() {
  const [showForm, setShowForm] = useState(false);
  const [teamList, setTeamList] = useState([]);
  const [addIcon, setAddIcon] = useState(faPlus);
  const pages = ['team', 'table'];

  const addMember = async (member) => {
    try {
      const docRef = await addDoc(collection(db, `users`), member);
      console.log("Document written with ID: ", docRef.id);
      // setTeamList([...teamList, {...member, id: docRef.id}])
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const removeMember = async (id) => {
    try {
      deleteDoc(doc(db, `users`, id)).then(() => {
        console.log('deleted');
        // remove corresponding schedule
      })
    } catch (e) {
    }
  }

  useEffect(() => {
    readTeam()
    return () => {
    };
  }, [teamList]);

  const readTeam = async () => {
    const list = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      const member = { id: doc.id, data: doc.data() }
      list.push(member)
    });
    setTeamList(list)
    localStorage.setItem('teamList', JSON.stringify(teamList));
  }

  const toggleForm = () => {
    setShowForm(!showForm);
    addIcon === faPlus ? setAddIcon(faArrowUp) : setAddIcon(faPlus)
  }

  return (
    <>
      <Navbar pages={pages} />
      <div className="container p-4">
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

import { useState, useEffect } from "react";
import List from "./TeamList";
import Navbar from '../../components/Navbar';
import Form from "./Form";
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { db } from '../../App'

function Team() {
  const [showForm, setShowForm] = useState(false);
  const [teamList, setTeamList] = useState([]);

  const addMember = async (member) => {
    try {
      const docRef = await addDoc(collection(db, "users"), member);
      console.log("Document written with ID: ", docRef.id);
      // setTeamList([...teamList, {...member, id: docRef.id}])
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const readTeam = async () => {
    const list = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      const member = { id: doc.id, data: doc.data() }
      list.push(member)
    });
    setTeamList(list)
  }

  const removeMember = (id) => {
    console.log(id);
  }

  useEffect(() => {
    readTeam()
    return () => {
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="container p-4">
      <div className="fill-form form-box">
        <div className="row">
          <div className="col-8">
            <h1>Add Member</h1>
          </div>
          <div className="col-4">
            <button 
              onClick={() => setShowForm(!showForm)}
              style={{
                'fontSize': '2em',
                'height': '1.5em',
                'padding': '0',
                'width':'1.5em',
                'border': 'none',
                'alignItems': 'center',
                'alignContent': 'center',
                'verticalAlign': 'middle',
                'borderRadius': '50%'
                }}>
                  <span  style={{'height': '0', 'padding': '0'}}>+</span> 
                </button>
          </div>
          {
            showForm ? (
              <Form addMember={addMember} />
            ) : ('')
          }

          <List 
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

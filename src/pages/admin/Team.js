import { useState } from "react";
import List from "./TeamList";
import Navbar from '../../components/Navbar';
import Form from "./Form";
function Team() {
  const [showForm, setShowForm] = useState(false);
  const [teamList, setTeamList] = useState([]);

  const addMember = (member) => {
    setTeamList([...teamList, member])
    console.log(teamList);
  };

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
              <Form className='col-6' addMember={addMember} />
            ) : ('')
          }

          <List className='col-6' teamList={teamList} />
        </div>
      </div>
    </div>
    </>
  );
}

export default Team;

import React, { useState } from "react";

function Team() {
  const [showForm, setShowForm] = useState(false);
  const [teamList, setTeamList] = useState([]);

  const addMember = (member) => {
    setTeamList([...teamList, member])
    console.log(teamList);
  };

  return (
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
  );
}

const Form = ({ addMember }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    const member = {name, phone};
    addMember(member);
    setName('')
    setPhone('')
  }

  return (
    <form className="col-lg-6 col-md-6 col-sm-12">
    <div className="mt-4">
      <input
        id="name"
        autoComplete="false"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      />
    </div>
    <div className="mt-4">
      <input
        id="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        type="phone"
      />
    </div>

    <div className="mt-4">
      <input type="submit" onClick={handleSubmit} value="Add" />
    </div>
  </form>
  )
}

const List = ({ teamList }) => {
  return (
    <div className="col-lg-6 col-md-6 col-sm-12">
        <hr style={{'margin': '1em'}}/>
       <h1>List</h1>
        {teamList.length > 0 ? (
          <ul className='list-group'>
            {teamList.map((member, idx) => {
              return (
                <li 
                    className="py-3 list-group-item d-flex justify-content-between" 
                    key={idx}>
                  {member.name}
                  <span className='remove-btn text-danger'>X</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <h3>No member has been added</h3>
        )}
    </div>
  )
}
export default Team;

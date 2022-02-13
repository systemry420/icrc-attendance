import React, { useState } from "react";

function Team() {


  return (
    <div className="container p-4">
      <div className="fill-form form-box">
        <div className="row">
          <div className="col-6">
            <h1>Add Member</h1>
          </div>
          <div className="col-6">
            <input style={{'font-size': '2em', 'padding': '0', 'width': '1.5em'}} type="button" value="+" />
          </div>

          <Form />
        </div>
       
      </div>
    </div>
  );
}

const Form = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {};

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

const List = () => {
  
}
export default Team;

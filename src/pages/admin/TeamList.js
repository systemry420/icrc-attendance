import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";
import { Animated } from "react-animated-css";
import Dialog from '../../components/Dialog';
import React, {useState} from 'react'

const TeamList = ({ teamList, removeMember }) => {
  const [dialog, setDialog] = useState(false);
  const [codeToRemove, setCodeToRemove] = useState('');

  const showDialog = (code) => {
    setDialog(true)
    setCodeToRemove(code)
  }

  return (
    <div className="col-lg-6 col-md-6 col-sm-12">
      <Dialog show={dialog} 
        handleCancel={() => setDialog(false)} 
        handleOk={() => {
          removeMember(codeToRemove)
          setDialog(false)
        }} 
        message={'This action will delete all related data. Proceed?'} 
        title={'Delete user?'} />

      <hr style={{ margin: "1em" }} />
      <h1>Team List</h1>
      {teamList.length > 0 ? (
        <ul className="list-group">
          {teamList.map((member, idx) => {
            return (
              <ListItem
                showDialog={showDialog}
                key={member.code}
                member={member}
              />
            );
          })}
        </ul>
      ) : (
        <h3>No members have been added</h3>
      )}
    </div>
  );
};

const ListItem = ({ member, showDialog }) => {
  return (
    <>
      <li
        className="py-3 list-group-item d-flex justify-content-between"
        key={member.code}
      >
        <span>
          <FontAwesomeIcon icon={faHashtag} />
          {" " + member.code}
        </span>
        <span>{member.name}</span>
        <span>{member.phone}</span>
        <span
          onClick={() => showDialog(member.code)}
          className="remove-btn text-danger"
        >
          <FontAwesomeIcon icon={faXmark} />
        </span>
      </li>
    </>
  );
};

export default TeamList;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faUser,
  faMobile,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";
import { Animated } from "react-animated-css";

const TeamList = ({ teamList, removeMember }) => {
  return (
    <div className="col-lg-6 col-md-6 col-sm-12">
      <hr style={{ margin: "1em" }} />
      <h1>Team List</h1>
      {teamList.length > 0 ? (
        <ul className="list-group">
          {teamList.map((member, idx) => {
            return (
              <ListItem
                removeMember={removeMember}
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

const ListItem = ({ member, removeMember }) => {
  return (
    <Animated
      key={member.code}
      removeMember={removeMember}
      animationInDuration={500}
      animationOut="slideOutUp"
      animationIn="slideInDown"
    >
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
          onClick={() => removeMember(member.code)}
          className="remove-btn text-danger"
        >
          <FontAwesomeIcon icon={faXmark} />
        </span>
      </li>
    </Animated>
  );
};

export default TeamList;

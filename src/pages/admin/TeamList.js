import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const TeamList = ({ teamList, removeMember }) => {
  return (
    <div className="col-lg-6 col-md-6 col-sm-12">
      <hr style={{ margin: "1em" }} />
      <h1>List</h1>
      {teamList.length > 0 ? (
        <ul className="list-group">
          {teamList.map((member) => {
            return (
              <li
                className="py-3 list-group-item d-flex justify-content-between"
                key={member.id}
              >
                {member.data.name} - {member.data.phone}
                <span 
                  onClick={()=> removeMember(member.id)}
                  className="remove-btn text-danger">
                    <FontAwesomeIcon icon={faXmark} />
                  </span>
              </li>
            );
          })}
        </ul>
      ) : (
        <h3>No member has been added</h3>
      )}
    </div>
  );
};

export default TeamList;
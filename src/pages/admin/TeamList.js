const List = ({ teamList = []}) => {
  return (
    <div className="col-lg-6 col-md-6 col-sm-12">
      <hr style={{ margin: "1em" }} />
      <h1>List</h1>
      {teamList.length > 0 ? (
        <ul className="list-group">
          {teamList.map((member, idx) => {
            return (
              <li
                className="py-3 list-group-item d-flex justify-content-between"
                key={idx}
              >
                {member.name}
                <span className="remove-btn text-danger">X</span>
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

export default List;
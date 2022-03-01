import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function List({ shake, list, removeDate, saveSchedule, language }) {

  return (
    <div className="mb-5 col-lg-6 justify-center align-center">
      <div className="row">
        <div className="col-8">
          <h1>List</h1>
        </div>
        <div className="col-4">
          <input
            type="button"
            onClick={() => saveSchedule()}
            value={'Save'}
            style={{ padding: ".4em" }}
            className={`button ${shake ? 'shake' : ''}`}
          />
        </div>
      </div>

      {list.length > 0 ? (
        <ul className="list-group">
          {list.map((day, idx) => {
            return (
              <li
                className="py-3 list-group-item d-flex justify-content-between"
                key={day.id}
              >
                {day.day}
                <span
                  onClick={() => removeDate(day.id)}
                  className="remove-btn text-danger"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </span>
              </li>
            );
          })}
        </ul>
      ) : (
        <h3>No dates has been selected</h3>
      )}
    </div>
  );
}

export default List;

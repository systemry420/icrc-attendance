import React, { useState } from 'react';
import {Calendar as Cal } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../index.css';


function Calendar({ onSelectDay, list }){
  const [selectedDates, setSelectedDates] = useState(new Date());

  const handleSelection = (date) => {

    onSelectDay(date)
  };

  return (
    <div className='mt-1 mb-4 col-lg-6 justify-center align-center'>
      {/* <h1>Calendar</h1> */}
      <Cal 
        value={selectedDates} 
        onClickDay={handleSelection}
      />
    </div>
  );
}

export default Calendar
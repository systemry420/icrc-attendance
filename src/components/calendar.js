import React, { useState } from 'react';
import {Calendar as Cal} from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


function Calendar(){
  const [selectedDates, setSelectedDates] = useState(new Date());

  const handleSelection = (date) => {

    console.log(date);
  };

  return (
    <div className='container'>
      <h1>Calendar</h1>
      <Cal 
        value={selectedDates} 
        defaultValue={'2-10-2022'}
        onClickDay={handleSelection}
         />
    </div>
  );
}

export default Calendar
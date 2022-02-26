import React, { useState } from 'react';
import {Calendar as Cal } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../index.css';


function Calendar({ onSelectDay, maxDetail = 'month' }){
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className='mt-1 mb-4 col-12 justify-center align-center'>
      <h1>Calendar</h1>
      <Cal 
        className="w-100"
        value={selectedDate} 
        onChange={(value) => onSelectDay(value)}
        maxDetail={maxDetail}
      />
    </div>
  );
}

export default Calendar
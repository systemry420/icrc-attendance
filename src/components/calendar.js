import React, { useState } from 'react';
import {Calendar as Cal } from 'react-calendar';
import moment from 'moment'

import 'react-calendar/dist/Calendar.css';
import '../index.css';


function Calendar({ min, max, showNavigation, onSelectDay, maxDetail = 'month' }){
  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <div className='mt-1 mb-4 col-12 justify-center align-center'>
      <Cal 
        className="w-100"
        value={selectedDate} 
        showNavigation={showNavigation}
        minDate={min}
        maxDate={max}
        onChange={(value) => onSelectDay(value)}
        // showNeighboringMonth={false}
        maxDetail={maxDetail}
      />
    </div>
  );
}

export default Calendar
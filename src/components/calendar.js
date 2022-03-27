import React, { useState } from 'react';
import {Calendar as Cal } from 'react-calendar';
import moment from 'moment'

import 'react-calendar/dist/Calendar.css';
import '../index.css';


function Calendar({ showNavigation, onSelectDay, maxDetail = 'month' }){
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className='mt-1 mb-4 col-12 justify-center align-center'>
      <h1>{moment(new Date()).format('MMMM')}</h1>
      <Cal 
        className="w-100"
        value={selectedDate} 
        showNavigation={showNavigation}
        onChange={(value) => onSelectDay(value)}
        showNeighboringMonth={false}
        maxDetail={maxDetail}
      />
    </div>
  );
}

export default Calendar
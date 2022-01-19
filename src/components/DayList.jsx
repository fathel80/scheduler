import React from 'react';
import DayListItem from './DayListItem';

const DayList = (props) => {
  const {days, value, onChange} = props;

  const listItems = days.map((day) => 
    <DayListItem 
      key={day.id}
      name={day.name} 
      spots={day.spots} 
      selected={day.name === value}
      setDay={(e) => onChange(day.name)}  
    />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
 
export default DayList;
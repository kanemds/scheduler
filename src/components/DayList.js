import React from "react";
import DayListItem from "./DayListItem";


export default function DayList(props){
  const day = props.value && props.value.length >= 1 && props.value.map((day) => {
    return (
      <DayListItem 
        key= {day.id}
        name={day.name} 
        spots={props.spots[day.id]} 
        selected={day.name === props.selected}
        setDay={props.onChange} 
      />
      )
  })

  return(
    <ul>
     {day}
    </ul>
  )
}
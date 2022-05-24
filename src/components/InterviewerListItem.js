import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {

  const classes = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  })

  const setInterviewer= () => {
    return props.setInterviewer(props.id)
  } 

  return (
  <li 
    className={classes}
    onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      { props.selected && props.name }  
  </li>
  );
}

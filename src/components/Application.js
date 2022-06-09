/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment" 
import { getAppointmentsForDay, getInterview, getInterviewersForDay }from "../helpers/selectors";
import useApplicationData from "hooks/useApplicationData";


// state,
// setDay,
// bookInterview,
// cancelInterview

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const selectedDay = state.days.find((day) => day.name === state.day)
  let availableInterviewers = []
  if (selectedDay) {
    availableInterviewers = selectedDay.interviewers.map((interviewerId) => {
      return state.interviewers[interviewerId]
    })
  }

  const interviewers = Object.keys(state.interviewers).map((id) => {
    return state.interviewers[id]
  })
  const appointment = dailyAppointments.map((appointment, index) => {
    const interview = getInterview(state, appointment.interview);
    if (interview) {

      interview.interviewers = dailyInterviewers[index]
    }
    return (
      <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        availableInterviewers={availableInterviewers}
      />
    )
  }) 


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        { state.days && (<DayList
          value={state.days}
          selected={state.day}
          spots={state.spots}
          onChange={setDay}
        /> )}
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointment}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

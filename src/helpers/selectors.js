function getAppointmentsForDay  (state, day) {
  const selectedDay = state.days.find((item) => item.name === day)
  if (!selectedDay) {
    return []
  }
  const { appointments } = selectedDay
  const list = appointments.map((id) => state.appointments[id])
  return list
}

 function getInterview(state, interview) {
  if (interview) {
    const interviewer = state.interviewers[interview.interviewer]
    return {
      ...interview,
      interviewer
    }
  }
  return null
}



export {getAppointmentsForDay , getInterview }
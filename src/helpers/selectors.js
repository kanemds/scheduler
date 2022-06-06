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

function getInterviewersForDay  (state, day) {
  const appointments = getAppointmentsForDay(state, day)
  const interviewerIds = []
  for (const appointment of appointments) {
    if (appointment.interview) {
      interviewerIds.push(appointment.interview.interviewer)
    } else {
      interviewerIds.push(null)
    }
  } 

  const interviewers = interviewerIds.map((id) => {
    if (id) {
      return state.interviewers[id]
    } else {
      return null
    }
  })
  return interviewers
}


export {getAppointmentsForDay , getInterview, getInterviewersForDay}
export const getAppointmentsForDay = (state, day) => {
  const selectedDay = state.days.find((item) => item.name === day)
  if (!selectedDay) {
    return []
  }
  const { appointments } = selectedDay
  const list = appointments.map((id) => state.appointments[id])
  return list
}

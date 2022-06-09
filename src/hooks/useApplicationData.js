import axios from "axios";
import { useEffect, useState } from "react";

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    spots: {}
  });
 
  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        const temp = {        
          ...state, appointments,         
        }
        setState({...temp, spots: getSpots(temp)})
      })
  }

  function getSpots(state) {
    const spots = state.days.reduce((acc, day) => {        
      const empty = day.appointments.filter((id) => {
        return state.appointments[id].interview === null
      })
      return {...acc, [day.id]: empty.length}          
    }, {})
    return spots 
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function updateSchedule(update) {
    if (state.days.length === 0 || update) {
      Promise.all([
        axios.get('http://localhost:8001/api/days'),
        axios.get('http://localhost:8001/api/appointments'),
        axios.get('http://localhost:8001/api/interviewers')
      ])
      .then((all) => {
        setState(prev => ({
          ...prev,
          days:all[0].data,
          appointments:all[1].data,
          interviewers:all[2].data,
          spots: getSpots({days: all[0].data, appointments: all[1].data }) 
        }))
      })
    }
  }

function cancelInterview(id){
  return bookInterview(id, { student: "", interview: null }).then(() => {
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
  })
  .then(()=> {
    updateSchedule(true)
  })
}


  useEffect(()=>{
    updateSchedule()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[updateSchedule])

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
} 
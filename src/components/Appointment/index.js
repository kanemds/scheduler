import React from 'react'
import "./styles.scss"
import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import useVisualMode from '../../hooks/useVisualMode'
import Form from './Form'
import Confirm from'./Confirm'


export default function Appointment(props) {
  const EMPTY = "EMPTY"
  const SHOW = "SHOW"
  const CREATE = "CREATE"
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const {
    id,
    time,
    interview,
    bookInterview,
    availableInterviewers
  } = props

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    bookInterview(id, interview)
    transition(SHOW)
  }

  function cancelInterview(){
    bookInterview(id, null)
    transition(EMPTY)
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && 
        <Form 
          cancel={back} 
          save={save}
          bookInterview={bookInterview}
          availableInterviewers={availableInterviewers}          
        />
      }
      {mode === CONFIRM && 
        <Confirm 
          onCancel={back} 
          cancelInterview={cancelInterview}
        />
        }
      {mode === EDIT && 
        <Form 
          student={interview.student}
          interviewer={interview.interviewer.id}
          cancel={back} 
          save={save}
          bookInterview={bookInterview}
          availableInterviewers={availableInterviewers} 
        />}
    </article>

    )
}
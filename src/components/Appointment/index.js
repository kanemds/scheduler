import React from 'react'
import "./styles.scss"
import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import useVisualMode from '../../hooks/useVisualMode'
import Form from './Form'
import Confirm from'./Confirm'
import Error from './Error'
import Status from './Status'

// await somepromisefunc().catch()
export default function Appointment(props) {
  const EMPTY = "EMPTY"
  const SHOW = "SHOW"
  const CREATE = "CREATE"
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT"
  const SAVING = "SAVING"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"
  const DELETING = "DELETING"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const {
    id,
    time,
    interview,
    bookInterview,
    cancelInterview,
    availableInterviewers
  } = props

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);

    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  function destroy() {
    transition(DELETING, true);
    
    cancelInterview(id)
     .then(() => transition(EMPTY))
     .catch(error => transition(ERROR_DELETE, true));
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
          onSave={save}
          bookInterview={bookInterview}
          availableInterviewers={availableInterviewers}          
        />
      }
      {mode === CONFIRM && 
        <Confirm 
          onCancel={back} 
          cancelInterview={destroy}
        />
        }
      {mode === EDIT && 
        <Form 
          student={interview.student}
          interviewer={interview && interview.interviewer && interview.interviewer.id}
          cancel={back} 
          onSave={save}
          bookInterview={bookInterview}
          availableInterviewers={availableInterviewers} 
        />}
        {mode === ERROR_SAVE &&
          <Error onClose={back} />
        }
        {mode === ERROR_DELETE &&
          <Error onClose={back} />
        }        
        {mode === DELETING &&
          <Status message={DELETING} />
        }  
        {mode === SAVING &&
          <Status message={SAVING} />
        }                
    </article>

    )
}
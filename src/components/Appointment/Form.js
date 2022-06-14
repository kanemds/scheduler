import React, { useState } from "react"
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  const {
    cancel,
    onSave,
    availableInterviewers
  } = props


  const reset = () => {
    setInterviewer(null)
    setStudent("")
    // return undefined
  }

  const save = () => {
    onSave(student, interviewer)
  }

  const onCancel = () => {
    reset()
    cancel()
  } 

  function validate() {
    let errors = 0
    if (student === "") {
      setError("Student name cannot be blank");
      errors += 1
    }
    if (interviewer === null) {
      setError("please select an interviewer");
      errors += 1
    }
  
    if (errors === 0) {
      save()
    }
  }

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()} >
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value={student}
        onChange={(event) => setStudent(event.target.value)}
        data-testid="student-name-input"
      />
     
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList      
      interviewers={availableInterviewers}      
      value={interviewer}
      onChange={setInterviewer}      
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={onCancel}>Cancel</Button>
      <Button confirm onClick={validate}>Save</Button>
    </section>
  </section>
</main>
  );
}
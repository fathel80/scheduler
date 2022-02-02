import React, { useState } from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';

const Form = (props) => {
  
  //  {STUDENT, INTERVIEWER, INTERVIERS, ONSAVE, ONCANCEL}
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState('')

  const reset = () => {
    setStudent("")
    setInterviewer(null)
    setError(null)
  }

  const cancel = () => {
    reset()
    props.onCancel()
  }
  
//FORM VALIDATION
function validate() {
  if(student === '') {
    setError('student name cannot be blank')
    return
  }

  if(!interviewer) {
    setError('Interviewer cannot be blank')
    return
  }
  
  setError(null)
  props.onSave(student, interviewer)
}


  return(
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          value={student}
          onChange={(e) => setStudent(e.target.value)}
          data-testid='student-name-input'
        /> 
      </form>
      {error && <section className="appointment__validation">{error}</section>}
      <InterviewerList 
        interviewers={props.interviewers}
        value={interviewer}
        onChange={setInterviewer}
      />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button onClick={cancel} danger >Cancel</Button>
        <Button onClick={() => validate()} confirm >Save</Button>
      </section>
    </section>
  </main>
  )
}

export default Form;
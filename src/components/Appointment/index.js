import React from "react";
// import Appointment from "components/Appointment";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status"
import useVisualMode from "hooks/useVisualMode"


export default function Appointment(props) {
  const { time, interview, interviewers, bookInterview} = props
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVING = "SAVING"

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const save = function(name, interviewer) {
    transition(SAVING, true);

    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING)

    bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(err => console.log(err.message));
  };

  return(
    <article className="appointment">
      <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => back(EMPTY)}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
    </article>
  );
}
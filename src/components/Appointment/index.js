import React from "react";
// import Appointment from "components/Appointment";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status"
import Confirm from "./Confirm"
import useVisualMode from "hooks/useVisualMode"


export default function Appointment(props) {
  const { time, interview, interviewers, bookInterview, cancelInterview} = props
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT"

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const onAdd= () => {transition(CREATE)}
  const onCancel = () => back()

  const onSave = function(name, interviewer) {
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

  const onDelete = function(name, interviewer) {
    transition(CONFIRM, true);
  }

  const onConfirm = function(name, interviewer) {
    transition(DELETING, true);

    const interview = {
      student: name,
      interviewer
    };

    transition(DELETING)

    cancelInterview(props.id, interview)
      .then(() => transition(EMPTY))
      .catch(err => console.log(err.message));
  }

  const onEdit = function() {
    transition(EDIT)
  }

  return(
    <article className="appointment">
      <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={onCancel}
          onSave={onSave}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          onCancel={onCancel}
          onConfirm={onConfirm}
          message = "Are you sure you would like to delete?"
        />)}
      {mode === EDIT && (
        <Form
          student={interview.student}
          interviewer={interview.interviewer}
          interviewers={interviewers}
          onCancel={onCancel}
          onSave={onSave}
        />
      )}
    </article>
  );
}
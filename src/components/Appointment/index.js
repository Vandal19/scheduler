import React, {useEffect} from "react";
// import Appointment from "components/Appointment";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status"
import Confirm from "./Confirm"
import Error from "./Error"
import useVisualMode from "hooks/useVisualMode"


export default function Appointment(props) {
  const { time, interview, interviewers, bookInterview} = props
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT"
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';
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
      .catch(err => transition(ERROR_SAVE, true));
  }

  const onDelete = function() {
    transition(CONFIRM);
  }

  const onConfirm = function() {
    transition(DELETING, true);

    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((err) => transition(ERROR_DELETE, true));
  }

  const onEdit = function() {
    transition(EDIT)
  }

  useEffect(() => {
    if (interview && mode === EMPTY) {
     transition(SHOW);
    }
    if (interview === null && mode === SHOW) {
     transition(EMPTY);
    }
   }, [interview, transition, mode]);

  return(
    <article data-testid="appointment" className="appointment">
      <Header time={time}/>
      {mode === EMPTY && !interview && <Empty onAdd={onAdd} />}
      {mode === SHOW && interview && (
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
      {mode === ERROR_SAVE && (
        <Error
          onClose={onCancel}
          message = "Error Saving Appointment"
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          onClose={onCancel}
          message = "Error Deleting Appointment"
        />
      )}
    </article>
  );
}
import React, { useState } from "react";
import "components/Appointment/styles.scss";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer?.id || null);
  const [error, setError] = useState("");
  const { interviewers, onSave, onCancel } = props;

  const reset = function () {
    setStudent("");
    setError("");
    setInterviewer(null);
  };

  const cancel = function () {
    reset();
    onCancel();
  };

  const validate = () => {
    if (student === "") {
      setError("student name cannot be blank");
      return;
    }

    if (interviewer === null) {
      setError("please select an interviewer");
      return;
    }
    setError(null);
    onSave(student, interviewer);
  };
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}

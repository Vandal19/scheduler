import React from "react";
import "components/Appointment/styles.scss";

export default function Show(props) {
  const { student, interviewer, onEdit, onDelete } = props;

  return (
    <main className="appointment__card appointment__card--show">
      <section className="appointment__card-left">
        <h2 className="text--regular">{student}</h2>
        <section className="interviewer">
          <h4 className="text--light">Interviewer</h4>
          <h3 className="text--regular">{interviewer.name}</h3>
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <img
            className="appointment__actions-button"
            src="images/edit.png"
            onClick={onEdit}
            alt="edit"
          />
          <img
            className="appointment__actions-button"
            src="images/trash.png"
            onClick={onDelete}
            alt="delete"
          />
        </section>
      </section>
    </main>
  );
}

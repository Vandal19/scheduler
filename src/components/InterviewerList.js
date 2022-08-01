import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss"
import PropTypes from 'prop-types'

function InterviewerList(props) {
  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
      key={interviewer.id}
      {...interviewer}
      selected={interviewer.id === props.value}
      setInterviewer={() => props.onChange(interviewer.id)}
      />
    )
  })

  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  }

  return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
      {interviewers}
    </ul>
  </section>
  )

}
export default InterviewerList
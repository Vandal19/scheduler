export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find((appt) => appt.name === day);
  let appointments = [];

  if (selectedDay) {
    appointments = selectedDay.appointments.map((id) => state.appointments[id]);
  }
  return appointments;
}

export function getInterview(state, interview) {
  if (interview) {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer],
    };
  }
  return null;
}

export function getInterviewersForDay(state, day) {
  const selectedDay = state.days.find((x) => x.name === day);
  let interviewers = [];

  if (selectedDay) {
    interviewers = selectedDay.interviewers.map((id) => state.interviewers[id]);
  }
  return interviewers;
}

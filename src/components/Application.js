import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment"
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  const [ state, setState ] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  /* Using the Spread Operator method to create new object with all of the existing keys of state */
  // const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days}))

  /* Using Object.assign to merge objects. */
  const setDay = day => setState(Object.assign({}, state, {day}))
  // const setDays = days => setState(prev => (Object.assign({}, prev, {days})))

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
        // console.log(all)
        console.log(all[2].data)
        setState(prev => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }))
    }).catch((error) => console.log(error.message));
  }, [])

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day)

  const bookInterview = (id, interview) => {
    console.log(id, interview);
    const appointment = {...state.appointments[id], interview: {...interview}};
    const appointments = {...state.appointments, [id]: appointment};

    return new Promise((resolve, reject) =>  {
      axios.put(`/api/appointments/${id}`, {interview})
        .then(() => {
          setState({...state, appointments});
          resolve();
      }).catch(err => {
          console.log(err.message);
          reject();
      });
    });
  };

  const cancelInterview = (id) => {
    const appointment = {...state.appointments[id], interview: null};
    const appointments = {...state.appointments, [id]: appointment};

    return new Promise((resolve, reject) => {
      axios.delete(`/api/appointments/${id}`)
        .then(() => {
          setState({...state, appointments});
          resolve();
        }).catch(err => {
          console.log(err.message);
          reject();
        });
    });
  };

  const appointmentsArray = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  })


  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsArray}
      </section>
    </main>
  );
}

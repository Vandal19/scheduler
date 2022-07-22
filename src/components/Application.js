import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment"
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {
  const [ state, setState ] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);


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
    ]).then((all) => {
        // console.log(all)
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data}))
      });
  })



  const appointmentsArray = Object.values(dailyAppointments).map(appointment => {
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
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

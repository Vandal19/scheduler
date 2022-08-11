import { useReducer, useEffect } from "react";
import axios from "axios";

import reducer, {
  // eslint-disable-next-line
  SET_DAY,
  // eslint-disable-next-line
  SET_APPLICATION_DATA,
  // eslint-disable-next-line
  SET_INTERVIEW,
} from "reducers/application";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then((all) => {
        console.log(all[2].data);
        dispatch({
          type: SET_APPLICATION_DATA,
          value: {
            days: all[0].data,
            appointments: all[1].data,
            interviewers: all[2].data,
          },
        });
      })
      .catch((error) => console.log(error.message));
  }, []);

  const setDay = (day) => dispatch({ type: SET_DAY, value: day });

  const bookInterview = (id, interview) => {
    console.log(id, interview);
    return new Promise((resolve, reject) => {
      axios
        .put(`/api/appointments/${id}`, { interview })
        .then(() => {
          dispatch({ type: SET_INTERVIEW, id, interview });
          resolve();
        })
        .catch((err) => {
          console.log(err?.message ? err.message : err);
          reject();
        });
    });
  };

  const cancelInterview = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/api/appointments/${id}`)
        .then(() => {
          dispatch({ type: SET_INTERVIEW, id, interview: null });
          resolve();
        })
        .catch((err) => {
          console.log(err?.message ? err.message : err);
          reject();
        });
    });
  };

  useEffect(() => {
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    webSocket.onopen = function (event) {
      webSocket.send("ping!");
    };

    webSocket.onmessage = function (event) {
      webSocket.send("Message received", event.data);
      const data = JSON.parse(event.data);

      if (data.type === "SET_INTERVIEW") {
        dispatch({
          type: SET_INTERVIEW,
          id: data.id,
          interview: data.interview,
        });
      }
    };
    return () => {
      webSocket.close();
    };
  }, []);
  return { state, setDay, bookInterview, cancelInterview };
}

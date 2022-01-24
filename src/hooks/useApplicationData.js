import axios from "axios";
import React, { useReducer, useEffect } from "react";

export default function useApplicationData(initial) {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.value };
      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.value.days,
          appointments: action.value.appointments,
          interviewers: action.value.interviewers,
        };
      case SET_INTERVIEW:
        const appointment = {
          ...state.appointments[action.id],
          interview: action.interview && { ...action.interview },
        };

        const appointments = {
          ...state.appointments,
          [action.id]: appointment,
        };

        function updateSpotsForDay(days, appointments, day) {
          let spotsRemaining = 0;
          days.forEach((element) => {
            if (element.name === day) {
              element.appointments.forEach((microElement) => {
                for (let key in appointments) {
                  if (key == microElement) {
                    if (appointments[key].interview === null) {
                      spotsRemaining++;
                    }
                  }
                }
              });
            }
          });
          const newDays = state.days.map(day => day.name === state.day ? {...day,spots:spotsRemaining} : day)
          return newDays
        }
        let spots = updateSpotsForDay(state.days, appointments, state.day)

        return { ...state, appointments: appointments, days:spots };
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => dispatch({ type: SET_DAY, value: day });

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      console.log(all);
      dispatch({
        type: SET_APPLICATION_DATA,
        value: {
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        },
      });
    });
  }, []);

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, {interview}).then(() => {
      dispatch({ type:SET_INTERVIEW, interview, id});
    });
  }

  function cancelInterview(id) {
    
    return axios.delete(`/api/appointments/${id}`).then(() => {
      dispatch({ type:SET_INTERVIEW, interview: null, id});

    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
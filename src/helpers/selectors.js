export function getAppointmentsForDay(state, day) {
  const daysArray = [];
  const days = state.days;
  const appointments = state.appointments;

  days.map((dayObj) => {
    if (dayObj.name === day) {
      const aptArr = dayObj.appointments;
      return aptArr.map((app) => {
        return daysArray.push(appointments[app]);
      });
    }
  });
  return daysArray;
}

export function getInterviewersForDay(state, day) {
  const intArray = [];
  const days = state.days;
  const interviewers = state.interviewers;

  days.map((dayObj) => {
    if (dayObj.name === day) {
      const intArry = dayObj.interviewers;

      return intArry.map((int) => {
        return intArray.push(interviewers[int]);
      });
    }
  });
  return intArray;
}

export function getInterview(state, interview) {
  if (!interview) return null;

  const student = interview.student;
  const intId = interview.interviewer;

  const interviewer = state.interviewers[intId];

  if (interviewer) {
    return {
      student,
      interviewer,
    };
  }
}

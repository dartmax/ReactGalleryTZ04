import React, {
  useEffect,
  useMemo,
  useReducer,
} from "react";
import {CalculateClockAngle} from "./calculateClockAngle";


const initialState = {seconds: 0, minutes: 0, hours: 0};

function reducer(state, action) {
  switch (action.type){
    case 'SECONDS_INCREMENT': {
      const { payload } = action;
      let newMinutes = payload === 60 ? state.minutes + 1 : state.minutes;
      let newHours = newMinutes === 60 ? state.hours + 1 : state.hours;
      return{
        ...state,
        seconds: payload,
        minutes: newMinutes,
        hours: newHours,
      }
    }
  }
}

export default function useClock() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {seconds, minutes, hours} = state;

  useEffect(() => {
    setTimeout(() => {
      dispatch({type: 'SECONDS_INCREMENT', payload: seconds < 59 ? seconds +1 : 0})
    }, 100);
  }, [seconds]);

  const secondAngle = CalculateClockAngle(seconds, "seconds");
  const minuteAngle = useMemo(() => {CalculateClockAngle(minutes, "minutes"
  )}, [minutes]);
  const hoursAngle = useMemo(() => {CalculateClockAngle(hours, "hours"
  )}, [hours]);

  return {...state, minutes, seconds, hours, secondAngle, minuteAngle, hoursAngle}
}
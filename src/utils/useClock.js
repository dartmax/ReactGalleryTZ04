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
      return{
        ...state,
        seconds: payload,
      }
    }
    case 'MINUTES_INCREMENT': {
      const { payload } = action;
      return{
        ...state,
        minutes: payload,
      }
    }
    case 'HOURS_INCREMENT': {
      const { payload } = action;
      return{
        ...state,
        hours: payload,
      }
    }
  }
}

export default function useClock() {
  const [state, dispatch] = useReducer(reducer, initialState);
  let {seconds, minutes, hours} = state;

  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: 'SECONDS_INCREMENT',
        payload: seconds < 59 ? seconds + 1 : 0,
      })
    }, 1000);
    if (seconds === 59){
      setTimeout(() => {
        dispatch({
        type: 'MINUTES_INCREMENT',
        payload: minutes < 59 ? minutes + 1 : 0,
      })
    }, 1000);
      if (minutes === 59){
        setTimeout(() => {
          dispatch({
            type: 'HOURS_INCREMENT',
            payload: hours < 12 ? hours + 1 : 0,
          })
        }, 1000);
      }
    }
  }, [seconds, minutes, hours]);

  const secondAngle = useMemo(() => CalculateClockAngle(seconds, "seconds"),[seconds]);
  const minuteAngle = useMemo(() => CalculateClockAngle(minutes, "minutes"),[minutes]);
  const hoursAngle = useMemo(() => CalculateClockAngle(hours, "hours"),[hours]);

  return {...state, minutes, seconds, hours, secondAngle, minuteAngle, hoursAngle}
}
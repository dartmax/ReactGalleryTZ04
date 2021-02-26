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
        minutes: state.minutes,
        hours: state.hours,
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
        minutes: seconds > 59 ? minutes + 1 : 0,
        hours: minutes > 59 ? hours + 1 : 0,
      })
    }, 100);
  }, [seconds, minutes, hours]);

  const secondAngle = CalculateClockAngle(seconds, "seconds");
  const minuteAngle = useMemo(() => {CalculateClockAngle(minutes, "minutes"
  )}, [minutes]);
  const hoursAngle = useMemo(() => {CalculateClockAngle(hours, "hours"
  )}, [hours]);

  return {...state, minutes, seconds, hours, secondAngle, minuteAngle, hoursAngle}
}
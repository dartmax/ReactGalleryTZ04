import React, {
  createContext,
} from "react";
import useClock from "../utils/useClock";

export const ClockContext = createContext({});

export function ClockProvider({ children }){
  const {seconds, minutes, hours, secondAngle, minuteAngle, hoursAngle} = useClock();
  return <ClockContext.Provider value={{seconds, minutes, hours, secondAngle, minuteAngle, hoursAngle}}>{children}</ClockContext.Provider>
}
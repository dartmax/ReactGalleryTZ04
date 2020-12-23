import React, {
  createContext,
} from "react";
import useClock from "../utils/useClock";

export const ClockContext = createContext({});

export function ClockProvider({ children }){
  const {minutes, seconds, hours, secondAngle, minuteAngle} = useClock();
  return <ClockContext.Provider value={{minutes, seconds, hours, secondAngle, minuteAngle}}>{children}</ClockContext.Provider>
}
import React, {useContext} from "react";
import {TimeContext} from "./ClockCenter";

function ClockRight() {
  const {minutes, seconds} = useContext(TimeContext);
  return(
    <div className="clock-number-wrapper">
      {minutes}m : {seconds}s
    </div>
  )
}

export default ClockRight;
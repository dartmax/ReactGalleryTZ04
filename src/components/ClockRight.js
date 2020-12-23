import React, {useContext} from "react";
import {ClockContext} from "../state/timeProvider";

function ClockRight() {
  const {hours, minutes, seconds} = useContext(ClockContext);
  return(
    <div className="clock-number-wrapper">
      {hours} : {minutes} : {seconds}
    </div>
  )
}

export default ClockRight;
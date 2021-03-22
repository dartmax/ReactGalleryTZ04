export function CalculateClockAngle(value, type) {
  // console.log("CalculateClockAngle", value, type)

  let angle = 0;
  switch (type){
    case "seconds": {
      angle = 360 * (value / 60);
      return angle;
    }
    case "minutes": {
      angle = 360 * (value / 60);
      return angle;
    }
    case "hours": {
      angle = 360 * (value / 12)
      return angle;
    }
    default:
      break;
  }
  return angle;
}


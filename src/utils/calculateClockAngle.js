export function CalculateClockAngle( value, type) {
  console.log("CalculateClockAngle", value, type)
  let angle = 0;
  switch (type){
    case "minutes":
    case "seconds": {
      angle = 360 * (value / 60);
      break;
    }
    case "hours": {
      angle = 360 * (value / 12)
    }
  }
  return angle;
}
import React from "react";
import Chart from "./Components/Chart";

export const data = [
  [0, 0],
  [200, 200],
  [400, 120],
  [600, 300],
  [800, 80],
  [1000, 190],
  [1200, 60],
]

const Graphics = () => {
  return(
    <div className="content">
      <div className="chart">
        <div className="canvas" style={{border: '1px solid black'}}>
          <Chart data={data}/>
        </div>
      </div>
    </div>
  )
}

export default Graphics;
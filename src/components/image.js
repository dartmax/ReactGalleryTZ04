import React from "react";

const Image = (props) => {
  return(
    <div>
      <div>{props.image_id}</div>
      <div>
        {props.image}
      </div>
    </div>
  )
}

export default Image;
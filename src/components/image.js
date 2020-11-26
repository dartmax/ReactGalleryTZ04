import React from "react";

const Image = (images) => {
  const { src, image_id } = images;
  return(
    <div>
      <div>{image_id}</div>
      <div>
        <img src={src} alt={image_id} />
      </div>
    </div>
  )
}

export default Image;
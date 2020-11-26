import React from "react";
import {useSelector} from 'react-redux'
import {getImages} from "../redux/images-selectors"
import Image from "./image"

const GalleryAppComponent = () => {
  const images = useSelector(getImages)
  const { src, image_id } = images;
  return(
    <div>
      <div>Gallery App</div>
      <div>
      {images.map(i => <Image key={image_id[i]} image={src[i]}
      /> )}
      </div>
    </div>
  )
}

export default GalleryAppComponent;
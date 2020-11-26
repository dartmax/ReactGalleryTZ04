import React, {useEffect} from "react";
import {useSelector} from 'react-redux'
import Image from "./image"
import {getImagesAPI} from "../api/getImages-api"
import {getImagesUrl} from "../redux/images-reducer";

const GalleryAppComponent = () => {
  let images = useSelector(getImagesUrl)
  debugger;

  useEffect(() => {
    images = getImagesUrl()
    console.log("-> images", images);
  }, [images])


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
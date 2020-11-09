import React from "react";
import {useSelector} from 'react-redux'
import {getImages} from "../redux/images-selectors"
import Image from "./image"

const GalleryAppComponent = (props) => {
  const images = useSelector(getImages)

  return(
    <div>
      <div>Gallery App</div>
      <div>
      {images.map(i => <Image key={i.id}
                            image={props.image_id}

      /> )}
      </div>
    </div>
  )
}

export default GalleryAppComponent;
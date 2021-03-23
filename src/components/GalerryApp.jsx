import React from "react";
import {useSelector} from 'react-redux'
import Image from "./image"
import {getImages} from "../redux/images-selectors";
import {Col, Row} from "antd";

const GalleryAppComponent = () => {
  const images = useSelector(getImages)


  // let dispatch = useDispatch()
  // const history = useHistory()

  // useEffect(() => {
  //   dispatch(getImagesUrl());
  // }, [])

  return (
    <Col>
      <Row className="px-4 mx-4 pb-4 mb-4 text-center">Gallery App</Row>
      <Row className="d-flex text-center">
        {images.map(i => (<Image key={i.image_id} src={i.src} image_id={i.image_id} alt={i.image_id}
        />))}
      </Row>
    </Col>
  )
}

export default GalleryAppComponent;
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import Image from "./image"

import {getImagesAPI} from "../api/getImages-api"
import {getImagesUrl} from "../redux/images-reducer";
import {getImages} from "../redux/images-selectors";
import {useHistory} from "react-router";
import {Col, Row} from "antd";
import ClockCenter from "./ClockCenter";

const GalleryAppComponent = () => {
  const images = useSelector(getImages)


  // let dispatch = useDispatch()
  // const history = useHistory()

  // useEffect(() => {
  //   dispatch(getImagesUrl());
  // }, [])

  console.log("images 222", images);

  return (
    <Col>
      <Row className="px-4 mx-4 pb-4 mb-4">Gallery App</Row>
      <Row className="d-flex">
        {images.map(i => (<Image key={i.image_id} image_id={i.image_id} src={i.src}
        />))}
      </Row>
      <Row>
        <ClockCenter/>
      </Row>
    </Col>
  )
}

export default GalleryAppComponent;
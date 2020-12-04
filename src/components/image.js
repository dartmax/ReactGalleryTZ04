import React from "react";
import {Col, Row} from "antd";

const Image = ({
   image_id: imageId,
   src,
}) => {
  return(
    <Col xs="12" sm="12" md="12" lg="6" className="mb-3" key={imageId}>
      <Row>
        <img src={src} alt={imageId} className="mx-auto px-3" />
      </Row>
      <Row>{imageId}</Row>
    </Col>
  )
}

export default Image;
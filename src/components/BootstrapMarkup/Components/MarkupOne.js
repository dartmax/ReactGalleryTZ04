import React from "react";
import "../markup.scss";

const MarkupOne = () => {
  return(
    <div className="container-first" id="grid">
      <a href="Link">Link</a>
      <div className="block first">1</div>
      <div className="block" id="central_block">
        <ul>
          <li>Elem <a href="twoo">2</a>1</li>
          <li>Elem 1</li>
          <li>Elem 1</li>
          <li>Elem 1</li>
          <li>Elem 1</li>
        </ul>
        <a href="tree">Text</a>
      </div>
      <div className="block">3</div>
    </div>
  )
}

export default MarkupOne;
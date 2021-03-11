import React from "react";
import "./Badge.scss"
import classnames from "classnames";

const Badge = ({ color, onClick, className }) => (
  <div
    onClick={onClick}
    className={classnames('badge', {[`badge--${color}`] : color}, className)}> </div>
)
export default Badge;
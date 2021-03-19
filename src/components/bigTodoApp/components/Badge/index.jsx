import React from "react";
import "./Badge.scss"
import classnames from "classnames";

const Badge = ({ color, onClick, className }) => (
    <i
      onClick={onClick}
      className={color && classnames('badge', {[`badge--${color}`]: color}, className)}
    > </i>
)
export default Badge;
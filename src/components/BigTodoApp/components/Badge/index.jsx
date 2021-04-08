import React from "react";
import "./Badge.scss"
import classNames from "classnames";

const Badge = ({ color, onClick, className }) => (
    <i
      onClick={onClick}
      className={color && classNames('badge', {[`badge--${color.name}`]: color}, className)}

    > </i>
)
export default Badge;
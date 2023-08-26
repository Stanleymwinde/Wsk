// Svg.js
import React from "react";

const Svg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg" 
    width={props.width || "16"}
    height={props.height || "16"}
    fill={props.fill || "currentColor"}
    className={props.className || "w-5 h-5"}
    viewBox="0 0 16 16"
  >
    {/* Your SVG path data goes here */}
    {/* For example: */}
    {/* <path d="M8 0L0 8h3v8h10V8h3L8 0z" /> */}
  </svg>
);

export default Svg;

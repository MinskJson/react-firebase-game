import React from "react";
import './Slots.css';

const Slots = (props) => {
  console.log(props)
  return <div className="slots">
    <div className="slots__cards">
      {props.children}
    </div>
  </div>
}

export {
  Slots
}
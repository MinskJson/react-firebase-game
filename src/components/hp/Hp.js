import React from "react";
import { Icon } from "antd";
import './Hp.css';

const Hp = ({hp}) => {
  const hearts = new Array(hp.total).fill(0);
  return <div className="card__hearts">
    {hearts.map((e, index) => <Icon
      key={index}
      theme={index < hp.current ? "filled": undefined}
      type="heart" />)}
  </div>
}

export {
  Hp,
}
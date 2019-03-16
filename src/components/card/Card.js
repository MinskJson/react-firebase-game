import React from "react";
import {Hp} from '../hp/Hp';
import './Card.css';

/**
 * name: string
 * hp: {
 *  total: number,
 *  current: number,
 * }
 * power: number
 */
const Card = ({name, hp, power}) => {
  return <div className="card">
    <div className="card__name">{name}(<b>{power}</b>)</div>
    <Hp hp={hp} />
  </div>
}

export {
  Card
}
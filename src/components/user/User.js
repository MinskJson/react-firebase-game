import React from "react";
import { Button } from 'antd';
import {Hp} from '../hp/Hp';

import './User.css';

/**
 * name: string
 * cards: [],
 * slots: [],
 * hp: {
 *  total: number,
 *  current: number,
 * }
 */
const User = ({user, onPush}) => {
  const onPushClick = () => {
    onPush && onPush(user, user.cards[0]);
  }

  return <div className="user">
    <div className="user__name">{user.name}</div>
    <div className="user__cards">
      <Button
        disabled={user.cards.length === 0}
        onClick={onPushClick}>
        Push Card ({user.cards.length})
      </Button>
    </div>
    <Hp hp={user.hp} />
  </div>
}

export {
  User
}
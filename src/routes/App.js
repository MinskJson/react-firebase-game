import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

import { User } from '../components/user/User';
import { Slots } from '../components/slots/Slots';
import { Card } from '../components/card/Card';

import { fireDB } from '../api/firebase';

const getFakeCard = () => {
  return {
    id: Math.random(),
    name: "Joe Doe",
    hp: {
      total: 10,
      current: Math.floor(Math.random() * 1000) % 10,
    },
    power:5
  }
}

const App = ({userOne, userTwo, onChange, onRoundStart, turn}) => {

  console.log(userOne, userTwo);
  const onDataPush = (user, card) => {
    onChange(user, {
      cards: user.cards.filter(e => e.id !== card.id),
      slots: [card, ...user.slots]
    })
  }

  return <div className="app">
    <div className="app_user-one">
      <div>
        <User user={userOne} onPush={onDataPush} />
        {turn ? 'Мой ход' : undefined}
      </div>
      <Slots>
        {userOne.slots.map(e => <Card key={e.id} {...e} />)}
      </Slots>
    </div>
    <div className="app_card-mid">
      <Button onClick={onRoundStart}>Go</Button>
    </div>
    <div className="app_user-two">
      <Slots>
        {userTwo.slots.map(e => <Card key={e.id} {...e} />)}
      </Slots>
      <div>
        <User user={userTwo} onPush={onDataPush} />
        {!turn ? 'Мой ход' : undefined}
      </div>
    </div>
  </div>
}

const ComponentUserData = ({currentUser, oponent, onChange}) => {
  const [isEnd, setIsEnd] = useState(false);

  const [isFirst, setIsFirst] = useState(true);

  const onRoundStart = () => {
    let first = isFirst ? currentUser : oponent;
    let second = isFirst ? oponent : currentUser;

    const totalCardHp = second.slots.reduce((res, card) => res + card.hp.current, 0);
    let attackPowerHp = first.slots.reduce((res, card) => res + card.hp.current, 0);
    let newHp = second.hp;

    if (totalCardHp < attackPowerHp) {
      const userHPleft = Math.abs(totalCardHp - attackPowerHp);
      newHp.current -= userHPleft;

      if (newHp.current <= 0) {
        return setIsEnd(true);
      }
    }

    const newSlots = second.slots.reduce((result, card) => {
      if (attackPowerHp > card.hp.current) {
        attackPowerHp -= card.hp.current;
        return result;
      } else {
        if (attackPowerHp >= 0) {
          card.hp.current -= attackPowerHp;
          attackPowerHp = 0;
        }
        result.push(Object.assign({}, card));
      }
      return result;
    },[]);

    onChange(second, {
      hp: newHp,
      slots: newSlots,
    });

    setIsFirst(!isFirst);
  }

  return !isEnd ? <App
    userOne={currentUser}
    turn={isFirst}
    userTwo={oponent}
    onChange={onChange}
    onRoundStart={onRoundStart}
  /> : <div>'GameOwer'</div>
}

const Room = () => {
  const [isGameOn, setIsGameOn] = useState(false);
  const [oponent, setOponent] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  useEffect(()=> {
    const obj = fireDB.ref(`users`).push();
    localStorage.setItem('key', obj.key);
    fireDB.ref(`users/${obj.key}`).set({
      id: obj.key,
      name: "Joe Doe",
      cards: [getFakeCard(), getFakeCard(), getFakeCard(), getFakeCard(), getFakeCard(), getFakeCard(), getFakeCard(), getFakeCard()],
      slots: [],
      hp: {
        total: 10,
        current: 10,
      }
    });

    window.addEventListener('unload', () => {
      fireDB.ref(`users/${obj.key}`).remove();
    });
  }, []);

  useEffect(() => {
    fireDB.ref(`users`).on('value', snapshot => {
      const userId = localStorage.getItem('key');
      const usersObject = snapshot.val();
      if (Object.keys(usersObject).length > 1) {
        const oponentId = oponent.id || Object.keys(usersObject).filter(e => e.id !== userId)[0]
        oponentId && setOponent(Object.assign({}, usersObject[oponentId], {slots: usersObject[oponentId] || []}));

        setIsGameOn(true);
      }

      userId && setCurrentUser(Object.assign({}, usersObject[userId], {slots: usersObject[userId].slots || []}));
    });
  });

  const onChange = (user, change) => {
    fireDB.ref(`users/${user.id}`).update(change)
  };

  console.log(currentUser, oponent);

  return isGameOn && oponent && currentUser ? <ComponentUserData
    curruntUser={currentUser}
    opponent={oponent}
    onChange={onChange}
  /> : <span>Waiting...</span>
}

export default Room;

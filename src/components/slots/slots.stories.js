import React, {useState} from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from 'antd';

import { Slots } from './Slots';
import { Card } from '../card/Card';

const getFakeCard = () => {
  return {
    name: "Joe Doe" + Date.now(),
    hp: {
      total: 10,
      current: Math.floor(Math.random() * 1000) % 10,
    },
    power:5
  }
}
const EmulateSlots = () => {
  const [cards, setCards] = useState([]);
  const onAddClicked = ()=> {
    action(cards);
    setCards([getFakeCard(),...cards]);
  };
  return <div>
    <Button onClick={onAddClicked}>Add</Button>
    <Slots>
      {cards.map(e => <Card key={e.name} {...e} />)}
    </Slots>
  </div>
}
storiesOf('Slots', module)
  .add('Slots with power', () => <EmulateSlots />);

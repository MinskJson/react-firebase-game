import React, {useState} from 'react';

import { storiesOf } from '@storybook/react';

import { User } from './User';

storiesOf('User', module)
  .add('User with power', () => <User user={{
    name: "Joe Doe",
    cards: [{name: 'x'}],
    hp: {
      total: 10,
      current: 5,
    }
  }} />);

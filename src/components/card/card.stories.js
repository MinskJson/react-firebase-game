import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Card } from './Card';

storiesOf('Card', module)
  .add('card with power', () => <Card name="Joe Doe" hp={{total: 10, current: 5}} power={5} />);

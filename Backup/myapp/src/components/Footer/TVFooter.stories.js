import React from 'react';
import { withInfo } from '@storybook/addon-info';

import { storiesOf } from '@storybook/react';

import { TVFooter } from './TVFooter';

storiesOf('tv/components/Footer/TVFooter', module).add(
  'with one item',
  withInfo()(() => {
    return (
      <TVFooter
        config={{
          copyright: 'copyright value',
          title: 'title value',
          tvStaticMenu: [
            {
              displayText: 'Foo'
            }
          ]
        }}
      />
    );
  })
);

import React, { Component } from 'react';
import { withForwardFocus } from 'vdkweb-navigation';
import { FocusButton, LayoutX } from 'vdkweb-tv-ui';
import theme from '#/views/views.scss';

const textArr = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'del',
  'space',
  'enter'
];

const layout = `a     b  c  d  e  f   g
                h     i  j  k  l  m   n
                o     p  q  r  s  t   u
                v     w  x  y  z  del space
                enter .  .  .  .  .   .`;

class TVTest extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  handleChange(value) {
    if (value === 'space') {
      this.setState({ value: `${this.state.value} ` });
    } else if (value === 'del') {
      if (this.state.value) {
        this.setState({ value: this.state.value.slice(0, -1) });
      }
    } else if (value === 'enter') {
      alert(this.state.value); // eslint-disable-line no-alert
    } else {
      this.setState({ value: this.state.value + value });
    }
  }

  createKey(text) {
    return (
      <FocusButton
        key={text}
        style={{ width: '42px', float: 'left' }}
        children={text}
        nav={{ id: text }}
        onClick={() => {
          this.handleChange(text);
        }}
      />
    );
  }

  render() {
    return (
      <div className={theme.pageContent}>
        <input type="text" value={this.state.value} />
        <LayoutX
          style={{ position: 'relative', width: '300px' }}
          nav={{ id: 'keyboard' }}
          layout={layout}
        >
          {textArr.map(text => this.createKey(text))}
        </LayoutX>
      </div>
    );
  }
}

export default withForwardFocus({
  Component: TVTest,
  forwardFocus: 'a'
});

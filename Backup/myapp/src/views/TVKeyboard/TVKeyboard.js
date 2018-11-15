import React, { Component } from 'react';
import {
  FocusDiv,
  FocusInput,
  FocusButton,
  FocusKeyboard,
  KeyboardLayouts,
  Page
} from 'vdkweb-tv-ui';
import theme from '#/views/views.scss';

const INPUT = {
  USER_NAME: 'username',
  PASSWORD: 'password'
};

const PAGE_NAV_ID = 'keyboardPage';
const KB_CONT_NAV_ID = 'keyboardContainer';

class TVKeyboard extends Component {
  constructor(props) {
    super(props);

    // Default to username
    this.state = {
      [INPUT.USER_NAME]: '',
      [INPUT.PASSWORD]: '',
      currentInput: INPUT.USER_NAME,
      currentLayout: Object.keys(KeyboardLayouts)[0] // lowercase
    };
  }

  handleVirtualKeyClick = newChar => {
    console.log(`New char entered: ${newChar}`);
    const { currentInput } = this.state;
    const { FEATURE_KEY: KEY } = KeyboardLayouts[this.state.currentLayout];

    if (newChar === KEY.ENTER.value) {
      console.log(
        `Current focus: ${currentInput}, value: ${this.state[currentInput]}`
      );
      return;
    }

    this.setState(prevState => {
      const inputValue =
        newChar === KEY.BACKSPACE.value
          ? prevState[currentInput].slice(0, -1)
          : prevState[currentInput] + newChar;

      return { [currentInput]: inputValue };
    });
  };

  switchLayout = () => {
    this.setState(prevState => {
      const layoutArr = Object.keys(KeyboardLayouts);
      const newLayoutIndex =
        (layoutArr.indexOf(prevState.currentLayout) + 1) % layoutArr.length;
      return { currentLayout: layoutArr[newLayoutIndex] };
    });
  };

  selectUsername = () => {
    this.setState({ currentInput: INPUT.USER_NAME });
  };

  selectPassword = () => {
    this.setState({ currentInput: INPUT.PASSWORD });
  };

  render() {
    const { username, password } = this.state;
    return (
      <Page
        className={theme.pageContent}
        nav={{
          id: PAGE_NAV_ID,
          nextdown: 'footermenu',
          nextup: 'TVVikimapMenu',
          forwardFocus: KB_CONT_NAV_ID
        }}
      >
        <FocusDiv
          nav={{
            id: KB_CONT_NAV_ID,
            parent: PAGE_NAV_ID,
            nextright: 'button--switch-layout',
            forwardFocus: 'keyboard'
          }}
        >
          <FocusInput
            value={username}
            nav={{
              id: 'input--username',
              parent: KB_CONT_NAV_ID,
              nextright: 'input--password',
              nextdown: 'keyboard'
            }}
            onClick={() => {
              this.selectUsername();
            }}
            style={{ display: 'inline-block' }}
          />

          <FocusInput
            value={password}
            nav={{
              id: 'input--password',
              parent: KB_CONT_NAV_ID,
              nextleft: 'input--username',
              nextdown: 'keyboard'
            }}
            isPassword
            onClick={() => {
              this.selectPassword();
            }}
            style={{ display: 'inline-block' }}
          />

          <FocusKeyboard
            nav={{
              id: 'keyboard',
              parent: KB_CONT_NAV_ID,
              nextup: 'input--username'
            }}
            layout={KeyboardLayouts[this.state.currentLayout]}
            onVirtualKeyClick={this.handleVirtualKeyClick}
          />
        </FocusDiv>
        <FocusButton
          nav={{
            id: 'button--switch-layout',
            nextleft: KB_CONT_NAV_ID,
            parent: PAGE_NAV_ID
          }}
          onClick={this.switchLayout}
          children={`Current Layout: ${this.state.currentLayout}, switch?`}
        />
      </Page>
    );
  }
}

export default TVKeyboard;

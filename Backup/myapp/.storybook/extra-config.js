import React from 'react';
import T from 'prop-types';
import { addDecorator } from '@storybook/react';
import { connect } from 'react-redux';
import { actions as navActions } from 'vdkweb-navigation';
import { environment, CONSTANT } from 'xdk3';

const { UP, DOWN, LEFT, RIGHT, OK } = CONSTANT.KEY;

const KEY_EVENT_PREFIX = 'device:vkey:';

class KeyEventsHandler extends React.Component {
  componentDidMount() {
    environment.addEventListener(environment.SYSTEM.KEYDOWN, ({ id }) => {
      switch (id) {
        case UP.id:
        case DOWN.id:
        case LEFT.id:
        case RIGHT.id: {
          const direction = `next${id.substring(KEY_EVENT_PREFIX.length)}`;
          this.props.dispatch(navActions.navigateFocus(direction));
          break;
        }
        case OK.id:
          this.props.dispatch(navActions.click());
          break;
        default:
          break;
      }
    });
  }

  componentWillUnmount() {
    environment.removeEventListener(environment.SYSTEM.KEYDOWN);
  }

  render() {
    return this.props.story();
  }
}

KeyEventsHandler.propTypes = {
  dispatch: T.func,
  story: T.func
};

const EnhancedKeyEventsHandler = connect()(KeyEventsHandler);

export default () =>
  addDecorator(story => {
    return <EnhancedKeyEventsHandler story={story} />;
  });

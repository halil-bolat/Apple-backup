import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { Spinner } from 'vdkweb-ui';
import { actions as navActions } from 'vdkweb-navigation';
import { pageRedux, setPageDefaultActions } from 'vdkweb-tv-ui';
import { system, environment, platform, CONSTANT } from 'xdk3';

import { appHistory } from '#/config/history';
import modules from '#/redux/modules';
import withConfig from '#/containers/utils/withConfig';
import logger from '#/utils/logger';
import { Maintenance } from '#/views';

import theme from './app.scss';

const MAINTENANCE = 'maintenance';

const mapStateToProps = state => {
  const data = modules.status.selectors.getRootSelector()(state);

  if (!data || !data.content || data.__isFetching) {
    return {
      loaded: false,
      isLoading: data ? data.__isFetching : false
    };
  }

  return {
    status: data.content,
    loaded: true
  };
};

const mapDispatchToProps = dispatch => ({
  getDataAction: () => dispatch(modules.status.actions.getData())
});

// The entry point of your application. This is where
// you can control rendering based on received application
// status or configurations.
class TVAppContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      platform: 'web'
    };
  }

  componentWillMount() {
    this.tvInit();

    const { getDataAction, isLoading } = this.props;
    if (isLoading) {
      return;
    }

    return getDataAction();
  }

  tvInit() {
    const { actions: pageActions } = pageRedux;
    const { dispatch } = this.props;
    const { UP, DOWN, LEFT, RIGHT, OK, BACK, EXIT } = CONSTANT.KEY;
    const KEY_EVENT_PREFIX = 'device:vkey:';

    setPageDefaultActions({
      backAction: () => {
        appHistory.goBack();
      },
      exitAction: () => {
        // As system.exit would trigger XDK Exception in case it is not implemented for the platform,
        // we will catch this to avoid aborting unexpectedly
        try {
          system.exit();
        } catch (e) {
          console.warn(e);
        }
      }
    });

    environment.addEventListener(environment.DEVICE.ONLOAD, () => {
      logger.info(`XDK device onload, platform: ${platform}`);
      this.setState({
        platform
      });
    });

    environment.addEventListener(environment.SYSTEM.KEYDOWN, ({ id }) => {
      switch (id) {
        case UP.id:
        case DOWN.id:
        case LEFT.id:
        case RIGHT.id: {
          const direction = `next${id.substring(KEY_EVENT_PREFIX.length)}`;
          dispatch(navActions.navigateFocus(direction));
          break;
        }
        case OK.id:
          dispatch(navActions.click());
          break;
        case BACK.id:
          dispatch(pageActions.pageBack());
          break;
        case EXIT.id:
          dispatch(pageActions.pageExit());
          break;
        default:
          break;
      }
    });
  }

  render() {
    const { children, status, config } = this.props;

    // If we haven't yet received an application status, we'll
    // simply return an empty div.
    // Can preferably be replaced with a SplashScreen component.
    if (!status) {
      return <Spinner />;
    }

    // If we're in maintenance mode, we'll display
    // the given message or fall back to a default one.
    if (status.status === MAINTENANCE) {
      return <Maintenance message={status.message} />;
    }

    // We require the configuration to have been
    // provided before we render the actual app content.
    // If we don't have it yet we simply display the spinner.
    // Can preferably be replaced with a SplashScreen component.
    if (!config) {
      return <Spinner />;
    }

    // At this point we have both an active status and
    // a configuration object. Let's render the app!

    return (
      <div className={`${theme.root} ${this.state.platform}`}>{children}</div>
    );
  }
}

TVAppContent.propTypes = {
  children: T.node,
  status: T.object,
  config: T.object,
  isLoading: T.bool,
  getDataAction: T.func
};

const ConnectedAppContent = connect(
  mapStateToProps,
  mapDispatchToProps
)(TVAppContent);

// Finally also make sure that the app configuration is requested
// for the AppEntry. This enables us to get e.g. Accedo One configs
// before we actually render any app content.
export default withConfig(ConnectedAppContent);

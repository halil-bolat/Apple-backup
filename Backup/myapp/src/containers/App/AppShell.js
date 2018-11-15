import React, { Component } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import config from '#/config';
import reduxModules from '#/redux/modules';
import AppContent from '#/containers/App/TVAppContent';

const { title, titleTemplate, meta } = config.app.head;
const { actions } = reduxModules.lifecycle;

// An application shell for listening to mount
// events and trigger appropriate lifecycle
// actions for your app. These would typically
// be used for analytics and similar.
class AppShell extends Component {
  componentWillMount() {
    this.appStart();
  }

  componentWillUnmount() {
    this.appQuit();
  }

  appStart() {
    this.props.dispatch(actions.appStart());
  }

  appQuit() {
    this.props.dispatch(actions.appQuit());
  }
  render() {
    return (
      <div>
        <Helmet
          defaultTitle={title}
          titleTemplate={titleTemplate}
          meta={meta}
          style={[
            {
              type: 'text/css',
              cssText: `
                body, html {
                    width: 100%;
                    height: 100%;
                }
            `
            }
          ]}
        />
        <AppContent {...this.props} />
      </div>
    );
  }
}

AppShell.propTypes = {
  dispatch: T.func
};

export default connect()(AppShell);

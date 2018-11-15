import React from 'react';
import { connect } from 'react-redux';
import modules from '#/redux/modules';

const withConfig = Component => {
  const mapStateToProps = state => {
    const data = modules.config.selectors.getRootSelector()(state);

    if (data && data.__isError) {
      return {
        failedToLoad: data.content
      };
    }

    if (!data || !data.content || data.__isFetching) {
      return {
        loaded: false,
        isLoading: data ? data.__isFetching : false
      };
    }

    return {
      config: data.content,
      loaded: true
    };
  };

  class ConfigLoader extends React.Component {
    static loadData({ dispatch, isLoading }) {
      if (isLoading) {
        return;
      }

      return dispatch(modules.config.actions.getData());
    }

    componentWillMount() {
      return ConfigLoader.loadData(this.props);
    }

    // eslint-disable-next-line class-methods-use-this
    componentWillReceiveProps(nextProps) {
      return ConfigLoader.loadData(nextProps);
    }

    retryLoad() {
      this.props.dispatch(modules.config.actions.retry());
    }

    render() {
      return <Component onRetry={this.retryLoad.bind(this)} {...this.props} />;
    }
  }

  return connect(mapStateToProps)(ConfigLoader);
};

export default withConfig;

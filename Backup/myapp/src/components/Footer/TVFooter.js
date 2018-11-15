import React from 'react';
import { PropTypes as T } from 'prop-types';
import { connect } from 'react-redux';
import { FocusMenu, pageRedux } from 'vdkweb-tv-ui';
import withConfig from '#/containers/utils/withConfig';
import theme from '#/components/Footer/footer.scss';

export const TVFooter = ({ config, focusCurrentPage }) => {
  if (!config) {
    return <div className={theme.footer} />;
  }

  return (
    <div className={theme.footer}>
      <FocusMenu
        nav={{
          id: 'footermenu',
          useLastFocus: true,
          // Press `UP` in footmenu will focus to the current page
          internal: {
            nextup: () => focusCurrentPage()
          }
        }}
        items={config.tvStaticMenu}
      />
      <div className={theme.copyright}>
        {config.copyright} - {config.title}
      </div>
    </div>
  );
};

TVFooter.propTypes = {
  config: T.object,
  focusCurrentPage: T.func
};

const FooterWithFocus = connect(
  null,
  dispatch => ({
    focusCurrentPage: () => dispatch(pageRedux.actions.pageFocusCurrent())
  })
)(TVFooter);

export default withConfig(FooterWithFocus);

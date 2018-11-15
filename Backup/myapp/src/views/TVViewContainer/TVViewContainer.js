import React from 'react';
import T from 'prop-types';
import { renderRoutes } from 'react-router-config';
import Header from '#/components/Header/TVHeader';
import Footer from '#/components/Footer/TVFooter';
import styles from '#/views/views.scss';

const TVViewContainer = ({ route }) => (
  <div className={styles.viewport}>
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>{renderRoutes(route.routes)}</div>
      <Footer />
    </div>
  </div>
);

TVViewContainer.contextTypes = {
  router: T.object,
  location: T.object,
  children: T.node
};

export default TVViewContainer;

import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';

import logo from '#/static/images/logo.png';
import withConfig from '#/containers/utils/withConfig';
import VikimapMenu from '#/containers/Menu/TVVikimapMenu';

import theme from './tvHeader.scss';

export const TVHeader = ({ config = {} }) => {
  const { title = '', vikimap } = config;
  return (
    <div className={theme.expanded}>
      <Link to="/">
        <img src={logo} className={theme.logo} alt="" />
      </Link>
      <span className={theme.logoTitle}>{title}</span>
      <span className={theme.container}>
        <VikimapMenu id={vikimap.mainMenuId} />
      </span>
    </div>
  );
};

TVHeader.propTypes = {
  config: T.object
};

export default withConfig(TVHeader);

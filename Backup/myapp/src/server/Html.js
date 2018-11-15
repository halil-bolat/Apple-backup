/* eslint-disable react/no-danger */

import React from 'react';
import T from 'prop-types';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 *
 * @returns {Html} Renderable HTML
 */
const Html = ({ assets, component, store }) => {
  const content = component ? ReactDOM.renderToString(component) : '';
  const head = Helmet.rewind();

  return (
    <html lang="en-US">
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}

        <link rel="shortcut icon" href="/favicon.ico" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />

        {/* styles (will be present only in production with webpack extract text plugin) */}
        {assets &&
          assets.styles &&
          Object.keys(assets.styles).map((style, key) => (
            <link
              href={assets.styles[style]}
              key={key}
              media="screen, projection"
              rel="stylesheet"
              type="text/css"
              charSet="UTF-8"
            />
          ))}
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        {store ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__data=${serialize(store.getState())};`
            }}
            charSet="UTF-8"
          />
        ) : (
          ''
        )}

        {assets.javascript.vendor ? (
          <script src={assets.javascript.vendor} charSet="UTF-8" />
        ) : (
          ''
        )}
        <script src={assets.javascript.client} charSet="UTF-8" />
      </body>
    </html>
  );
};

Html.propTypes = {
  assets: T.object,
  component: T.node,
  store: T.object
};

export default Html;

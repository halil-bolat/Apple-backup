import React, { Component } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { models } from 'vdkweb-vikimap/lib/ui';
import kebabCase from 'lodash/kebabCase';
import { FocusMenu, pageRedux } from 'vdkweb-tv-ui';
import modules from '#/redux/modules';
import vikimapMenuTheme from './tvVikimapMenu.scss';



const mainMenuItems = [
  {
    displayText: 'Home',
    id: 0,
    title: 'Menu Item Home',
    __isError: false,
    menuItems: [],
    icon: []
  },
  {
    displayText: 'Movies',
    id: 1,
    alias: 'dynamic-movie-menu',
    __isError: false,
    menuItems: [],
    icon: []
  }
]



const getTargetForMenuItem = item => {
  if (item.page && item.page.alias) {
    return `/${item.page.alias}`;
  }

  return `/${kebabCase(item.displayText)}`;
};

const mapMenuItem = item => {
  const { displayText, menuItems = [] } = item;
  console.log(displayText);

  const menuItem = {
    displayText,
    to: item.to || getTargetForMenuItem(item),
    items: menuItems.map(mapMenuItem),
    icon: item.icon && item.icon[0] ? item.icon[0].fileUrl : null
  };
  return menuItem;
};



const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps;
  const entry = modules.vikimap.selectors.getMenuById(state, id);

  // If no entry is found, set 'loaded' to false
  // to signal that we're in loading state.
  if (!entry || !(entry.id || entry.content) || entry.__isError) {
    return {
      entryId: id,
      loaded: false,
      failedToLoad: !!(entry && entry.__isError),
      errorMessage: entry && entry.content ? entry.content.message : ''
    };
  }

  // If no entry information is found set 'loaded' to true
  // to signal that the entry has been loaded.
  // Also propagate the entry to the props.
  return {
    entry,
    entryId: id,
    loaded: true,
    error: entry.__isError
  };
};

const mapDispatchToProps = dispatch => ({
  focusCurrentPage: () => dispatch(pageRedux.actions.pageFocusCurrent()),
  fetchMenu: entryId => dispatch(modules.vikimap.actions.fetchMenu(entryId))
});

class TVVikimapMenu extends Component {
  componentWillMount() {
    const { fetchMenu, entryId } = this.props;
    fetchMenu(entryId);
  }

  render() {
    const {
      theme = vikimapMenuTheme,
      entry,
      loaded,
      nav,
      focusCurrentPage,
      ...others
    } = this.props;
    const { items, staticItems = [] } = entry;
    console.log(items);
    return !loaded ? (
      <div>Loading ...</div>
    ) : (
      <FocusMenu
        className={theme.mainMenuNav}
        loaded={loaded}
        items={mainMenuItems ? mainMenuItems.concat(staticItems).map(mapMenuItem) : []}
        theme={theme}
        nav={{
          id: 'TVVikimapMenu',
          useLastFocus: true,
          internal: {
            nextdown: focusCurrentPage
          },
          ...nav
        }}
        {...others}
      />
    );
  }
}

TVVikimapMenu.defaultProps = {
  entry: {},
  nav: {}
};

TVVikimapMenu.propTypes = {
  entry: T.shape({
    items: T.arrayOf(models.MenuItem),
    staticItems: T.array
  }),
  loaded: T.bool,
  nav: T.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TVVikimapMenu);




// import React, { Component } from 'react';
// import T from 'prop-types';
// import { connect } from 'react-redux';
// import { models } from 'vdkweb-vikimap/lib/ui';
// import { FocusMenu } from 'vdkweb-tv-ui';
// import vikimapMenuTheme from './tvVikimapMenu.scss';





// const mapMenuItem = item => {
//   const displayText = [ 
//     {displayText: 'hello'},
//     {displayText: 'bye'}
//   ];
//   console.log('displayText', item);
//   console.log('item',  item);
//   const menuItem = {
//     displayText
//   };
  
//   console.log(menuItem);
//   return menuItem;
// };




// class TVVikimapMenu extends Component {
  
 
//   render() {
//     const {
//       theme = vikimapMenuTheme,
//       nav,
//       focusCurrentPage,
//       ...others
//     } = this.props;
//     const rItems = mapMenuItem().displayText;
//     console.log('hellooooooo', rItems);
//     const realItems = rItems.map(mapMenuItem);
//     console.log('realItems', realItems);
//     return (
//       <FocusMenu
//         className={theme.mainMenuNav}
//         items={realItems}
//         theme={theme}
//         nav={{
//           id: 'TVVikimapMenu',
//           useLastFocus: true,
//           internal: {
//             nextdown: focusCurrentPage
//           },
//           ...nav
//         }}
//         {...others}
//       />
//     );
//   }
// }

// TVVikimapMenu.defaultProps = {
//   entry: {},
//   nav: {}
// };

// TVVikimapMenu.propTypes = {
//   entry: T.shape({
//     items: T.arrayOf(models.MenuItem),
//     staticItems: T.array
//   }),
//   loaded: T.bool,
//   nav: T.object
// };

// export default connect(
// )(TVVikimapMenu);

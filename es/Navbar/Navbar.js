function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { Navbar as BSNavbar } from 'react-bootstrap';
import defaultLogo from '../images/MarkLogic-Powered-By.png';
import UserInfo from './UserInfo';

var Navbar = function Navbar(_ref) {
  var logo = _ref.logo,
      title = _ref.title,
      children = _ref.children,
      withoutUser = _ref.withoutUser,
      props = _objectWithoutProperties(_ref, ['logo', 'title', 'children', 'withoutUser']);

  return React.createElement(
    BSNavbar,
    { fluid: true },
    React.createElement(
      BSNavbar.Header,
      null,
      React.createElement(
        BSNavbar.Brand,
        null,
        React.createElement(
          'a',
          { href: '/', className: 'navbar-left' },
          React.createElement('img', { src: logo || defaultLogo })
        )
      ),
      React.createElement(
        BSNavbar.Brand,
        null,
        React.createElement(
          'a',
          { href: '/' },
          title
        )
      ),
      React.createElement(BSNavbar.Toggle, null)
    ),
    React.createElement(
      BSNavbar.Collapse,
      null,
      children,
      !withoutUser && React.createElement(UserInfo, props)
    )
  );
};

Navbar.propTypes = process.env.NODE_ENV !== "production" ? {
  title: PropTypes.string,
  withoutUser: PropTypes.bool
} : {};

export default Navbar;
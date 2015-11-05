import React from 'react';
import { Link, RouteHandler } from 'react-router';
import { IntlMixin } from 'react-intl';

const Menu = React.createClass({
  mixins: [IntlMixin],

  render() {
    return (
      <nav>
        <ul>
          <li><Link to="/">{this.getIntlMessage('menu-languages')}</Link></li>
          <li><Link to="/map">{this.getIntlMessage('menu-map')}</Link></li>
          <li><Link to="/about">{this.getIntlMessage('menu-about')}</Link></li>
        </ul>
        <RouteHandler />
      </nav>
    );
  },
});

module.exports = Menu;

import React from 'react';
import { IntlMixin, FormattedHTMLMessage } from 'react-intl';

import Menu from './Menu.jsx';

const About = React.createClass({
  mixins: [IntlMixin],

  render() {
    return (
      <section className={'container'}>
        <div className={'row'}>
          <header className={'col-md-12'}>
            <h1>{this.getIntlMessage('about-title')}</h1>
          </header>
        </div>
        <div className={'row'}>
          <div className={'col-md-10'}>
            <p>
              <FormattedHTMLMessage message={this.getIntlMessage('about-content')} />
            </p>
            <p>
              <FormattedHTMLMessage message={this.getIntlMessage('about-contributing-code')} />
            </p>
          </div>
          <div className={'col-md-2'}>
            <Menu />
          </div>
        </div>
      </section>
    );
  },
});

module.exports = About;

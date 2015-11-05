import React from 'react';
import { IntlMixin } from 'react-intl';
const request = require('superagent');

import Menu from './Menu.jsx';

const Home = React.createClass({
  mixins: [IntlMixin],

  getInitialState() {
    return {
      availableLanguages: [],
    };
  },

  componentDidMount() {
    this.fetchLanguageOptions();
  },

  fetchLanguageOptions() {
    request
      .get('/api/languages')
      .end((err, res) => {
        if (err) {
          return;
        }

        this.setState({
          availableLanguages: res.body,
        });
      });
  },

  renderLanguageOptions() {
    const languages = this.state.availableLanguages;

    return languages.map((language) => {
      return (
        <li key={language.code}>
          <a href={'?lang=' + language.code}>{language.name}</a>
        </li>
      );
    });
  },

  render() {
    return (
      <section className={'container'}>
        <div className={'row'}>
          <header className={'col-md-12'}>
            <h1>{this.getIntlMessage('home-title')}</h1>
          </header>
        </div>
        <div className={'row'}>
          <div className={'col-md-10 language-options'}>
            <p>
              {this.getIntlMessage('home-content-language-select')}
            </p>
            <ul>
              {this.renderLanguageOptions()}
              </ul>
          </div>
          <div className={'col-md-2'}>
            <Menu />
          </div>
        </div>
      </section>
    );
  },
});

module.exports = Home;

require('./stylesheets/main.scss');

import React from 'react';
import Router from 'react-router';
import routes from './Routes.jsx';
const locales = require('./utils/locales');
const re = /[a-z]{2}-[A-Z]{2}/i;

Router.run(routes, Router.HistoryLocation, (Handler, state) => {
  const path = state.path;
  const lang = path.match(re);
  let locale = 'en';

  if (lang) {
    locale = lang[0];
  }

  let translations = locales[locale] ? locales[locale] : locales.locale['en']; // eslint-disable-line dot-notation
  translations = Object.assign(locales['en'], translations); // eslint-disable-line dot-notation

  const intlData = {
    locales: [locale],
    messages: translations,
  };

  React.render(
    <Handler {...intlData} />,
    document.querySelector('#app')
  );
});

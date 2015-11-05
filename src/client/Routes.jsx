import React from 'react';
import { Route } from 'react-router';

const Home = require('./components/Home.jsx');
const MapView = require('./components/MapView.jsx');
const About = require('./components/About.jsx');

const routes = (
  <Route>
    <Route name="home" path="/" handler={Home} />
    <Route name="map" path="/map" handler={MapView} />
    <Route name="about" path="/about" handler={About} />
  </Route>
);

module.exports = routes;

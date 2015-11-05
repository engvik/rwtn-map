import async from 'async';
import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { IntlMixin } from 'react-intl';
const request = require('superagent');

import Menu from './Menu.jsx';

const MapView = React.createClass({
  mixins: [IntlMixin],

  getInitialState() {
    return {
      renderMap: false,
      mapData: [],
      mapMarkerType: 'all',
      mapMarkers: [],
      mapMarkerTypes: [],
    };
  },

  componentDidMount() {
    this.fetchMapData();
  },

  fetchMapData() {
    async.waterfall([
      (callback) => {
        request
          .get('/api/map')
          .end((err, res) => {
            if (err) {
              return callback(err);
            }

            const mapData = res.body;
            const mapView = mapData.shift();
            const state = {
              renderMap: true,
              mapView: mapView.start,
              mapMarkers: mapData,
              mapData: mapData,
            };

            callback(null, state);
          });
      },
      (state, callback) => {
        request
          .get('/api/map/types')
          .end((err, res) => {
            if (err) {
              return callback(err);
            }

            state.mapMarkerTypes = res.body;
            callback(null, state);
          });
      },
    ], (err, state) => {
      if (err) {
        return;
      }

      this.setState(state);
    });
  },

  mapMarkerTypeHandler(type) {
    this.setState({
      mapMarkerType: type,
      mapMarkers: this.state.mapData,
    });
  },

  searchHandler(ev) {
    const needle = ev.target.value;
    const mapData = this.state.mapData;

    if (needle === '') {
      this.setState({
        mapMarkerType: 'all',
        mapMarkers: this.state.mapData,
      });

      return;
    }

    const markers = mapData
                      .filter((marker) => {
                        const text = this.getIntlMessage(marker.localeKey);

                        if (marker.type.indexOf(needle) > -1
                         || text.indexOf(needle) > -1) {
                          return true;
                        }

                        return false;
                      });

    this.setState({
      mapMarkerType: 'all',
      mapMarkers: markers,
    });
  },

  renderMarkers(type) {
    const mapMarkers = this.state.mapMarkers;

    if (mapMarkers === 0) {
      return false;
    }

    return mapMarkers
            .filter((marker) => {
              if (type === 'all') {
                return true;
              }

              if (marker.type === type) {
                return true;
              }

              return false;
            })
            .map((marker) => {
              return (
                <Marker
                  key={marker.coordinates.join(',')}
                  position={marker.coordinates}
                >
                  <Popup>
                    <span>{this.getIntlMessage('test')}</span>
                  </Popup>
                </Marker>
              );
            });
  },

  renderMap() {
    if (!this.state.renderMap) {
      return false;
    }

    const position = this.state.mapView;

    return (
      <Map center={position} zoom={13}>
      <TileLayer
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' // eslint-disable-line jsx-quotes
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {this.renderMarkers(this.state.mapMarkerType)}
    </Map>
    );
  },

  renderMarkerTypes() {
    return this.state.mapMarkerTypes.map((type) => {
      return (
        <li key={type} onClick={this.mapMarkerTypeHandler.bind(this, type)}>
          {this.getIntlMessage('map-menu-filter-' + type)}
        </li>
      );
    });
  },

  renderSearchField() {
    return (
      <div>
        <h3>{this.getIntlMessage('map-menu-search-title')}</h3>
        <input type="text" ref="searchField" onChange={this.searchHandler} />
      </div>
    );
  },

  render() {
    return (
      <section className={'container'}>
        <div className={'row'}>
          <header className={'col-md-12'}>
            <h1>{this.getIntlMessage('map-title')}</h1>
          </header>
        </div>
        <div className={'row'}>
          <div className={'col-md-10'}>
            {this.renderMap()}
          </div>
          <div className={'col-md-2 map-menu'}>
            <Menu />
            {this.renderSearchField()}
            <h3>{this.getIntlMessage('map-filter-type')}</h3>
            <ul>
              <li key={'all'} onClick={this.mapMarkerTypeHandler.bind(this, 'all')}>
                {this.getIntlMessage('map-menu-filter-all')}
              </li>
              {this.renderMarkerTypes()}
            </ul>
          </div>
        </div>
      </section>
    );
  },
});

module.exports = MapView;

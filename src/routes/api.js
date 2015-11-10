import express from 'express';
const _ = require('highland'); // eslint-disable-line id-length
const router = express.Router(); // eslint-disable-line new-cap
const availableLanguages = require('../../config/languages.json');
const mapData = require('../../config/map.json');

router.get('/languages', (req, res) => {
  res.json(availableLanguages);
});

router.get('/map', (req, res) => {
  res.json(mapData);
});

router.get('/map/types', (req, res) => {
  _(mapData)
    .pluck('type')
    .compact()
    .sort()
    .toArray((xs) => res.json(xs));
});

module.exports = router;

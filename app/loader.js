'use strict';
// Import Algolia
const algoliasearch = require('algoliasearch');
// Algolia API Credentials -- Stored in config.js. See config-sample.json for format; obviously these are hidden for my safety!
const apiConfig = require('./config.json');
// Local files used for data
const talks = require('../data/tedtalks/talks.json');
const speakers = require('../data/tedtalks/speakers.json');
const playlists = require('../data/tedtalks/playlists.json');

// Initialize Algolia API
const client = algoliasearch('L1292YARWK', apiConfig.AdminAPIKey);

// Import records
client.initIndex('TEDTalks_talks').saveObjects(talks);
client.initIndex('TEDTalks_speakers').saveObjects(speakers);
client.initIndex('TEDTalks_playlists').saveObjects(playlists);
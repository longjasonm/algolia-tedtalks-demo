'use strict';
// Import Algolia
const algoliasearch = require('algoliasearch');
// Algolia API Credentials -- Stored in config.json. See config-sample.json for format; obviously these are hidden for my safety!
const { adminAPI } = require('./config.json');
// Local files used for data
const talks = require('../data/tedtalks/talks.json');
const speakers = require('../data/tedtalks/speakers.json');
const playlists = require('../data/tedtalks/playlists.json');
// Settings files for replica indicies
const talks_viewed_count_desc_settings = require('../data/tedtalks/talks_viewed_count_desc_settings.json');

// Initialize Algolia API
const client = algoliasearch('L1292YARWK', adminAPI);

// Import records
client.initIndex('TEDTalks_talks').saveObjects(talks);
client.initIndex('TEDTalks_speakers').saveObjects(speakers);
client.initIndex('TEDTalks_playlists').saveObjects(playlists);

// Create replica indicies for the talks index and import their settings
client.initIndex('talks_viewed_count_desc').setSettings(talks_viewed_count_desc_settings);
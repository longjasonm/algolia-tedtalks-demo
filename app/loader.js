'use strict';
// Import Algolia
import algoliasearch from 'algoliasearch';
// Algolia API Credentials -- Stored in config.json. See config-sample.json for format; obviously these are hidden for my safety!
import { adminAPI } from './config.json';
// Local files used for data
import talks from '../data/tedtalks/talks.json';
import speakers from '../data/tedtalks/speakers.json';
import playlists from '../data/tedtalks/playlists.json';

// Initialize Algolia API
const client = algoliasearch('L1292YARWK', adminAPI);

// Import records
client.initIndex('TEDTalks_talks').saveObjects(talks);
client.initIndex('TEDTalks_speakers').saveObjects(speakers);
client.initIndex('TEDTalks_playlists').saveObjects(playlists);
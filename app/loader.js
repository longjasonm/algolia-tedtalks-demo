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
const talks_settings = require('../data/tedtalks/talks_settings.json');
const talks_beautiful_rating_desc_settings = require('../data/tedtalks/talks_beautiful_rating_desc_settings.json');
const talks_courageous_rating_desc_settings = require('../data/tedtalks/talks_courageous_rating_desc_settings.json');
const talks_fascinating_rating_desc_settings = require('../data/tedtalks/talks_fascinating_rating_desc_settings.json');
const talks_funny_rating_desc_settings = require('../data/tedtalks/talks_funny_rating_desc_settings.json');
const talks_informative_rating_desc_settings = require('../data/tedtalks/talks_informative_rating_desc_settings.json');
const talks_ingenious_rating_desc_settings = require('../data/tedtalks/talks_ingenious_rating_desc_settings.json');
const talks_inspiring_rating_desc_settings = require('../data/tedtalks/talks_inspiring_rating_desc_settings.json');
const talks_jaw_droping_rating_desc_settings = require('../data/tedtalks/talks_jaw_droping_rating_desc_settings.json');
const talks_persuasive_rating_desc_settings = require('../data/tedtalks/talks_persuasive_rating_desc_settings.json');
const talks_popularity_score_desc_settings = require('../data/tedtalks/talks_popularity_score_desc_settings.json');
const talks_viewed_count_desc_settings = require('../data/tedtalks/talks_viewed_count_desc_settings.json');

// Initialize Algolia API
const client = algoliasearch('L1292YARWK', adminAPI);

// Import records
client.initIndex('TEDTalks_talks').saveObjects(talks);
client.initIndex('TEDTalks_speakers').saveObjects(speakers);
client.initIndex('TEDTalks_playlists').saveObjects(playlists);

const mainIndex = client.initIndex('TEDTalks_talks');

// Import settings for primary index
mainIndex.setSettings(talks_settings);

const replicas = [
    'talks_beautiful_rating_desc',
    'talks_courageous_rating_desc',
    'talks_fascinating_rating_desc',
    'talks_funny_rating_desc',
    'talks_informative_rating_desc',
    'talks_ingenious_rating_desc',
    'talks_inspiring_rating_desc',
    'talks_jaw_droping_rating_desc',
    'talks_persuasive_rating_desc',
    'talks_popularity_score_desc',
    'talks_viewed_count_desc'
]

const settings = [
    talks_beautiful_rating_desc_settings,
    talks_courageous_rating_desc_settings,
    talks_fascinating_rating_desc_settings,
    talks_funny_rating_desc_settings,
    talks_informative_rating_desc_settings,
    talks_ingenious_rating_desc_settings,
    talks_inspiring_rating_desc_settings,
    talks_jaw_droping_rating_desc_settings,
    talks_persuasive_rating_desc_settings,
    talks_popularity_score_desc_settings,
    talks_viewed_count_desc_settings
]

// Create replica indicies for the talks index and import their settings
client.initIndex('talks_viewed_count_desc').setSettings(talks_viewed_count_desc_settings);
client.initIndex('talks_popularity_score_desc').setSettings(talks_popularity_score_desc_settings);

// Create all other replicas...decided to update settings via dashboard.
mainIndex.setSettings({
    replicas: replicas
});

function updateAllSettings(indicies, settings) {
    for (let i = 0; i < indicies.length; i++) {
        const element = indicies[i];
        client.initIndex(element).setSettings(settings[i]);
    }
}

updateAllSettings(replicas, settings);

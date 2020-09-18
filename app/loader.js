'use strict';
// Import Algolia
const algoliasearch = require('algoliasearch');
// Algolia API Credentials -- Stored in config.json. See config-sample.json for format; obviously these are hidden for my safety!
const { adminAPI } = require('./config.json');
// Local files used for data
const talks = require('../data/tedtalks/talks.json');
const speakers = require('../data/tedtalks/speakers.json');
const playlists = require('../data/tedtalks/playlists.json');
const speakers_with_talks = require('../data/speakers_with_talks.json');
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
const playlists_settings = require('../data/tedtalks/playlists_settings.json');
const speakers_settings = require('../data/tedtalks/speakers_settings.json');

// Initialize Algolia API
const client = algoliasearch('L1292YARWK', adminAPI);

// Import records
client.initIndex('TEDTalks_talks').saveObjects(talks);
client.initIndex('TEDTalks_speakers').saveObjects(speakers);
client.initIndex('TEDTalks_playlists').saveObjects(playlists);
client.initIndex('speakers_with_talks').saveObjects(speakers_with_talks);

const mainIndex = client.initIndex('TEDTalks_talks');

// Import settings for primary index
mainIndex.setSettings(talks_settings);

// Import settings for replicas and initialize them if not there already.

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
];

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

// Import configuration is down for some reason during demo build, so going to upload settings here.
client.initIndex('TEDTalks_speakers').setSettings(speakers_settings);
client.initIndex('speakers_with_talks').setSettings(speakers_settings);
client.initIndex('TEDTalks_playlists').setSettings(playlists_settings);
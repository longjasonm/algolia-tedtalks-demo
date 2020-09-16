'use strict';

import algoliasearch from 'algoliasearch';
import instantsearch from 'instantsearch.js';
import { searchAPI } from './config.json';

const searchClient = algoliasearch('L1292YARWK', searchAPI);

const searchTalks = instantsearch({
  indexName: 'TEDTalks_talks',
  searchClient,
});

//

searchTalks.addWidgets([
  searchBox({
    container: "#searchbox"
  }),

  hits({
    container: "#hits"
  })
]);

search.start();
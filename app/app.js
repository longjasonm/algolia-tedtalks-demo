


aa('init', {
  appId: 'JINA8T7GLB',
  apiKey: 'cccd3ff2b3aaa504c5028daee311d2ea',
});

// Since search-insights@2.0.0, cookie is not used for anonymous user token.
// If you wish to continue, you can pass `useCookie: true`.
aa('init', {
  appId: 'JINA8T7GLB',
  apiKey: 'cccd3ff2b3aaa504c5028daee311d2ea',
  useCookie: true,
})


const searchClient = algoliasearch('JINA8T7GLB', 'cccd3ff2b3aaa504c5028daee311d2ea');

const searchTalks = instantsearch({
  indexName: 'TEDTalks_talks',
  searchClient,
  routing: true,
});

searchTalks.addWidgets([
  instantsearch.widgets.searchBox({
    container: "#searchbox",
    cssClasses: {
      input: 'form-control form-control-lg search-box'
    },
    placeholder: 'Search by title, description, speaker, event or topic...',
    showReset: false,
    showSubmit: false,
    autofocus: true
  }),

  instantsearch.widgets.configure({
    hitsPerPage: 24,
    enablePersonalization: true,
    clickAnalytics: true
  }),

  instantsearch.widgets.clearRefinements({
    container: '#clear-refinements',
    cssClasses: {
      button: 'btn btn-secondary btn-sm btn-block my-2',
      disabled: 'btn btn-secondary btn-sm btn-block btn-disabled mb-2'
    },
    templates: {
      resetLabel: 'Clear your selections'
    },
  }),

  instantsearch.widgets.sortBy({
    container: '#sort-by',
    items: [{
      label: '🆕 Newest',
      value: 'TEDTalks_talks'
    },
    {
      label: '😍 Beautiful',
      value: 'talks_beautiful_rating_desc'
    },
    {
      label: '🦁 Courageous',
      value: 'talks_courageous_rating_desc'
    },
    {
      label: '🧐 Fascinating',
      value: 'talks_fascinating_rating_desc'
    },
    {
      label: '😂 Funniest',
      value: 'talks_funny_rating_desc'
    },
    {
      label: '🤓 Informative',
      value: 'talks_informative_rating_desc'
    },
    {
      label: '🤯 Ingenious',
      value: 'talks_ingenious_rating_desc'
    },
    {
      label: '🤩 Inspiring',
      value: 'talks_inspiring_rating_desc'
    },
    {
      label: '😲 Jaw Dropping',
      value: 'talks_jaw_droping_rating_desc'
    },
    {
      label: '😏 Persuasive',
      value: 'talks_persuasive_rating_desc'
    },
    {
      label: '😎 Popular',
      value: 'talks_popularity_score_desc'
    },
    {
      label: '📺 Most Viewed',
      value: 'talks_viewed_count_desc'
    }
    ],
    cssClasses: {
      select: 'form-control'
    }
  }),

  instantsearch.widgets.refinementList({
    container: '#refinements-tags',
    attribute: 'tags',
    cssClasses: {
      labelText: 'animate-searchable',
      count: 'count badge badge-pill badge-light border'
    },
    limit: 50
  }),

  instantsearch.widgets.refinementList({
    container: '#refinements-event_name',
    attribute: 'event_name',
    cssClasses: {
      count: 'count badge badge-pill badge-light border'
    }
  }),

  instantsearch.widgets.refinementList({
    container: '#refinements-languages',
    attribute: 'languages',
    cssClasses: {
      count: 'count badge badge-pill badge-light border'
    }
  }),

  instantsearch.widgets.refinementList({
    container: '#refinements-speakers',
    attribute: 'speakers',
    cssClasses: {
      labelText: 'animate-searchable',
      count: 'count badge badge-pill badge-light border'
    },
    limit: 25
  }),

  /* instantsearch.widgets.refinementList({
    container: '#refinements-duration_range',
    attribute: 'duration_range',
    cssClasses: {
      count: 'count badge badge-pill badge-light border'
    }
  }), */

  instantsearch.widgets.poweredBy({
    container: '#powered-by'
  }),

  instantsearch.widgets.currentRefinements({
    container: "#current-refinements",
    cssClasses: {
      root: 'mb-3',
      item: 'd-inline-block',
      label: 'badge badge-pill',
      category: 'tag badge badge-pill badge-secondary ml-1',
      delete: 'badge badge-light ml-1'
    }
  }),

  instantsearch.widgets.infiniteHits({
    container: "#hits",
    cssClasses: {
      item: 'col-md-6 col-lg-4 col-xl-3 mb-4',
      list: 'row',
      loadMore: 'btn btn-lg btn-outline-custom btn-block mb-5',
      disabledLoadMore: 'btn btn-lg btn-outline-custom btn-disabled'
    },
    templates: {
      item(hit, bindEvent) {
        return `
        <div class="vid-card h-100">
          <div class="vid-card-wrap">
          <div class="vid-card-img-top">
            <a href="#" title="Link to ${hit.name}" data-toggle="modal" data-target="#modal-${hit.objectID}" ${bindEvent('click', hit, 'Video Result Click')}>
              <img src="${hit.image_url}" alt="${hit.name} Video Thumbnail" class="img-fluid" ${bindEvent('click', hit, 'Video Result Click')} />
            </a>
            <div class="vid-card-body p-3">
          <a href="#" title="Link to ${hit.name}" data-toggle="modal" data-target="#modal-${hit.objectID}" class="stretched-link" ${bindEvent('click', hit, 'Video Result Click')}>
            <h4 class="hit-name" ${bindEvent('click', hit, 'Video Result Click')}>${instantsearch.highlight({ attribute: 'name', hit })}</a></h4>
            <small><em><ul class="list-inline">
              ${hit.speakers.map(speaker => {
          return `<li class="list-inline-item">${speaker}</li>`
        }).join('')}
             </ul></em></small>
         <small>Posted: ${hit.date}</small>
            </div>
          </div>
          
          </div>
          </div>
        </div>
        <div class="modal fade" id="modal-${hit.objectID}" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true" data-slug="${hit.slug}">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="ModalLabel">${instantsearch.highlight({ attribute: 'name', hit })}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div class="row pb-3">
        <div class="col-sm-6 align-self-center"><div class="video-wrap"><a href="https://www.ted.com/talks/${hit.slug}" ${bindEvent('conversion', hit, 'Video Played')}><div class="play-btn" ${bindEvent('conversion', hit, 'Video Played')}></div><img src="${hit.image_url}" alt="${hit.name} Video Thumbnail" class="img-fluid" ${bindEvent('conversion', hit, 'Video Played')} /></a></div></div>
        <div class="col-sm-6">
      <p class="hit-description">${instantsearch.highlight({ attribute: 'description', hit })}</p>
      <p class="text-muted">Presented by: 
      <ul class="list-unstyled">
      ${hit.speakers.map(speaker => {
          return `
        <li><a href="?TEDTalks_talks%5BrefinementList%5D%5Bspeakers%5D%5B0%5D=${speaker}" title="More by this speaker">${speaker}</a></li>
      `}).join('')}
      </ul></p>
      <p class="text-muted">Event: <a href="?TEDTalks_talks%5BrefinementList%5D%5Bspeakers%5D%5B0%5D=${hit.event_name}">${hit.event_name}</a></p>
      <small>Views: ${hit.viewed_count}</small>
      <div class="tag-wrapper">
      ${hit.tags.map(tag => {
            return `
      <a href="?TEDTalks_talks%5BrefinementList%5D%5Btags%5D%5B0%5D=${tag}" class="tag badge badge-pill badge-secondary">${tag}</a>
      `}).join('')}
      </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-light btn-sm" data-dismiss="modal">Close</button>
        <a href="https://www.ted.com/talks/${hit.slug}" role="button" class="btn btn-custom btn-sm" ${bindEvent('conversion', hit, 'Video Played')}>Watch this Talk</a>
      </div>
    </div>
  </div>
</div>
      `
      }
    },
    transformItems(items) {
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return items.map(item => ({
        ...item,
        date: monthNames[new Date(item.date * 1000).getMonth()] + ` ` + new Date(item.date * 1000).getFullYear()
      }));
    },
  }),


]);

searchTalks.start();

let observe;
searchTalks.on('render', () => {
  if (!observe) {
    const showMoreButton = document.querySelector('.ais-InfiniteHits-loadMore');
    observe = new IntersectionObserver((entries) => { entries.forEach(entry => { entry.intersectionRatio > 0.5 ? showMoreButton.click() : null }) });
    observe.observe(showMoreButton);
  }

  function toProperCase(str) {
    let arr = str.split(' ');
    arr = arr.map(sub => sub.charAt(0).toUpperCase() + sub.substr(1));
    return arr.join(' ');
  }

  const searchNodes = document.querySelectorAll('.animate-searchable');
  const searchArray = [...searchNodes];
  let searchTerms = [];
  searchArray.forEach((term) => { searchTerms.push(toProperCase(term.innerText)) });



  const searchBar = document.querySelector('.search-box');

  const MIN_ANIMATION_DELAY = 50;
  const MAX_ANIMATION_DELAY = 90;

  const getRandomDelayBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  const setPlaceholder = (inputNode, placeholder) => {
    inputNode.setAttribute("placeholder", `Try searching for: ${placeholder}`);
  };

  const animateLetters = (currentLetters, remainingLetters, inputNode) => {
    if (!remainingLetters.length) {
      return;
    }

    currentLetters.push(remainingLetters.shift());

    setTimeout(() => {
      setPlaceholder(inputNode, currentLetters.join(''));
      animateLetters(currentLetters, remainingLetters, inputNode);
    }, getRandomDelayBetween(MIN_ANIMATION_DELAY, MAX_ANIMATION_DELAY));
  };

  const animatePlaceholder = (inputNode, placeholder) => {
    animateLetters([], placeholder ? placeholder.split('') : 'topics, speakers, etc.', inputNode);
  };

  const timer = setInterval(() => { animatePlaceholder(searchBar, searchTerms[getRandomDelayBetween(0, searchTerms.length - 1)]) }, 6000);

  searchBar.addEventListener('input', () => {
    clearInterval(timer)
  }, { once: true });
});

// Speakers

const searchSpeakers = instantsearch({
  indexName: 'speakers_with_talks',
  searchClient,
  routing: true
});

searchSpeakers.addWidgets([
  instantsearch.widgets.searchBox({
    container: "#speakers-searchbox",
    cssClasses: {
      input: 'form-control form-control-lg'
    },
    placeholder: 'Search for a speaker or one of their talks...',
    showReset: false,
    showSubmit: false,
    autofocus: true
  }),

  instantsearch.widgets.configure({
    hitsPerPage: 24,
    enablePersonalization: true,
  }),

  instantsearch.widgets.clearRefinements({
    container: '#clear-refinements',
    cssClasses: {
      button: 'btn btn-secondary btn-sm btn-block my-2',
      disabled: 'btn btn-secondary btn-sm btn-block btn-disabled mb-2'
    },
    templates: {
      resetLabel: 'Clear your selections'
    },
  }),

  instantsearch.widgets.poweredBy({
    container: '#speakers-powered-by'
  }),

  instantsearch.widgets.currentRefinements({
    container: "#speakers-current-refinements",
    cssClasses: {
      root: 'mb-3',
      item: 'd-inline-block',
      label: 'badge badge-pill',
      category: 'tag badge badge-pill badge-secondary ml-1',
      delete: 'badge badge-light ml-1'
    }
  }),

  instantsearch.widgets.infiniteHits({
    container: "#speakers-hits",
    cssClasses: {
      item: 'col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4',
      list: 'row',
      loadMore: 'btn btn-lg btn-outline-custom btn-block mb-5',
      disabledLoadMore: 'btn btn-lg btn-outline-custom btn-disabled'
    },
    templates: {
      item: `
      <div class="card speaker-hit  h-100">
            <div class="card-img-top"><a href="https://www.ted.com/speakers/{{slug}}"><img src="{{image_url}}" alt="{{name}}" class="card-img" /></a></div>
              <div class="card-body">
                <h4><a href="https://www.ted.com/speakers/{{slug}}">{{#helpers.highlight}}{"attribute" : "name"}{{/helpers.highlight}}</a></h4>
                <p><em>{{description}}</em></p>
                <p><b>Talks:</b></p>
                <ul>
                {{#talks}}
                  <li><a href="https://www.ted.com/talks/{{slug}}">{{name}}</a></li>
                {{/talks}}
                </ul>
            </div>
        </div>
      </div>

      `
    }
  })
])

searchSpeakers.start();

// Playlists

const searchPlaylists = instantsearch({
  indexName: 'TEDTalks_playlists',
  searchClient,
  routing: true
});

searchPlaylists.addWidgets([
  instantsearch.widgets.searchBox({
    container: "#playlists-searchbox",
    cssClasses: {
      input: 'form-control form-control-lg'
    },
    placeholder: 'Search Playlists...',
    showReset: false,
    showSubmit: false,
    autofocus: true
  }),

  instantsearch.widgets.configure({
    hitsPerPage: 24,
    enablePersonalization: true,
  }),

  instantsearch.widgets.clearRefinements({
    container: '#clear-refinements',
    cssClasses: {
      button: 'btn btn-secondary btn-sm btn-block my-2',
      disabled: 'btn btn-secondary btn-sm btn-block btn-disabled mb-2'
    },
    templates: {
      resetLabel: 'Clear your selections'
    },
  }),

  instantsearch.widgets.poweredBy({
    container: '#playlists-powered-by'
  }),

  instantsearch.widgets.currentRefinements({
    container: "#playlists-current-refinements",
    cssClasses: {
      root: 'mb-3',
      item: 'd-inline-block',
      label: 'badge badge-pill',
      category: 'tag badge badge-pill badge-secondary ml-1',
      delete: 'badge badge-light ml-1'
    }
  }),

  instantsearch.widgets.infiniteHits({
    container: "#playlists-hits",
    cssClasses: {
      item: 'col-12 mb-3',
      list: 'row',
      loadMore: 'btn btn-lg btn-outline-custom btn-block mb-5',
      disabledLoadMore: 'btn btn-lg btn-outline-custom btn-disabled'
    },
    templates: {
      item: `
      <div class="card playlist-hit h-100">
              <div class="card-body">
                <h5><a href="https://www.ted.com/playlists/{{slug}}" class="stretched-link">{{#helpers.highlight}}{"attribute" : "title"}{{/helpers.highlight}}</a></h5>
                <p><em>{{description}}</em></p>
            </div>
        </div>
      </div>

      `
    }
  })
])

searchPlaylists.start();

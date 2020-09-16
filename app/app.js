import algoliasearch from 'algoliasearch';
import instantsearch from 'instantsearch.js';
import {
  searchBox,
  configure,
  clearRefinements,
  sortBy,
  refinementList,
  infiniteHits,
  poweredBy,
  currentRefinements
} from 'instantsearch.js/es/widgets'

const searchClient = algoliasearch('L1292YARWK', '71cf36ea528d375a21804d918d0c5ed4');

const searchTalks = instantsearch({
  indexName: 'TEDTalks_talks',
  searchClient,
});

searchTalks.addWidgets([
  searchBox({
    container: "#searchbox",
    cssClasses:{
      input: 'form-control'
    },
    placeholder: 'Search by title, description, speaker, event or topic...',
    showReset: false,
    showSubmit: false
  }),

  configure({
    hitsPerPage: 24,
    enablePersonalization: true,
  }),

  clearRefinements({
    container: '#clear-refinements',
    cssClasses: {
      button: 'btn btn-secondary btn-sm btn-block my-2',
      disabled: 'btn btn-secondary btn-sm btn-block btn-disabled mb-2'
    },
    templates:{
      resetLabel: 'Clear your selections'
    },
  }),

  sortBy({
    container: '#sort-by',
    items: [
      { label: 'Newest', value: 'TEDTalks_talks' },
      { label: 'Most Viewed', value: 'talks_viewed_count_desc' },
      { label: 'Most Popular', value: 'talks_popularity_score_desc'}
    ],
    cssClasses:{
      select: 'form-control'
    }
  }),

  refinementList({
    container: '#refinements-tags',
    attribute: 'tags',
    cssClasses: {
      count: 'count badge badge-pill badge-light border'
    }
  }),

  refinementList({
    container: '#refinements-event_name',
    attribute: 'event_name',
    cssClasses: {
      count: 'count badge badge-pill badge-light border'
    }
  }),

  refinementList({
    container: '#refinements-languages',
    attribute: 'languages',
    cssClasses: {
      count: 'count badge badge-pill badge-light border'
    }
  }),

  refinementList({
    container: '#refinements-speakers',
    attribute: 'speakers',
    cssClasses: {
      count: 'count badge badge-pill badge-light border'
    }
  }),

  refinementList({
    container: '#refinements-duration_range',
    attribute: 'duration_range',
    cssClasses: {
      count: 'count badge badge-pill badge-light border'
    }
  }),

  poweredBy({
    container: '#powered-by'
  }),

  currentRefinements({
    container: "#current-refinements",
    cssClasses: {
      root: 'mb-3',
      item: 'd-inline-block',
      label: 'badge badge-pill',
      category: 'tag badge badge-pill badge-secondary ml-1',
      delete: 'badge badge-light ml-1'
    }
  }),

  // Decided to do infiniteHits widget instead.
/*   pagination({
    container: '#pagination',
    cssClasses: {
      root: 'd-flex justify-content-center mb-5',
      list: 'btn-group',
      item: 'btn btn-sm btn-outline-primary px-3',
      selectedItem: 'btn btn-sm btn-primary px-3',
    },
      showFirst: false,
      showLast: false,
      showNext: false,
      showPrevious: false
  }), */

  // TODO: Add moment.js for relative date filtering

  infiniteHits({
    container: "#hits",
    cssClasses: {
      item: 'col-sm-4 col-md-3 col-lg-2 mb-4',
      list: 'row',
      loadMore: 'btn btn-lg btn-outline-primary btn-block',
      disabledLoadMore: 'btn btn-lg btn-outline-primary btn-disabled'
    },
    templates: {
      item: `

        <div class="card h-100">
          <div class="card-wrap">
          <div class="card-img-top">
            <a href="#" title="Link to {{name}}" data-toggle="modal" data-target="#modal-{{objectID}}">
              <img src="{{image_url}}" alt="{{name}} Video Thumbnail" class="img-fluid" />
            </a>
          </div>
          <div class="card-body">
          <a href="#" title="Link to {{name}}" data-toggle="modal" data-target="#modal-{{objectID}}"><h4 class="hit-name">{{#helpers.highlight}}{"attribute" : "name"}{{/helpers.highlight}}</a>
            </div>
          </div>
          </div>
        </div>
        <div class="modal fade" id="modal-{{objectID}}" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true" data-slug="{{slug}}">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="ModalLabel">{{#helpers.highlight}}{"attribute" : "name"}{{/helpers.highlight}} <small class="text-muted">Presented by: {{#speakers}}
        {{.}}
      {{/speakers}}</small></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div class="row pb-3">
        <div class="col-sm-4 align-self-center"><a href="https://www.ted.com/talks/{{slug}}"></a><img src="{{image_url}}" alt="{{name}} Video Thumbnail" class="img-fluid" /></a></div>
        <div class="col-sm-8">
      <p class="hit-description">{{#helpers.highlight}}{"attribute" : "description"}{{/helpers.highlight}}</p>
      <small>Views: {{viewed_count}}</small>
      <div class="tag-wrapper">
      {{#tags}}
        <span class="tag badge badge-pill badge-secondary">{{.}}</span>
      {{/tags}}
      </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-light btn-sm" data-dismiss="modal">Close</button>
        <a href="https://www.ted.com/talks/{{slug}}" role="button" class="btn btn-primary btn-sm">Watch this Talk</a>
      </div>
    </div>
  </div>
</div>
      `
    }
  }),


]);

searchTalks.start();
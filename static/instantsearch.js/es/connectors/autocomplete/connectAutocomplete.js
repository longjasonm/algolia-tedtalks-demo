function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import escapeHits, { TAG_PLACEHOLDER } from '../../lib/escape-highlight';
import { checkRendering, createDocumentationMessageGenerator, createSendEventForHits, noop, warning } from '../../lib/utils';
var withUsage = createDocumentationMessageGenerator({
  name: 'autocomplete',
  connector: true
});

var connectAutocomplete = function connectAutocomplete(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  checkRendering(renderFn, withUsage());
  return function (widgetParams) {
    var _ref = widgetParams || {},
        _ref$escapeHTML = _ref.escapeHTML,
        escapeHTML = _ref$escapeHTML === void 0 ? true : _ref$escapeHTML;

    process.env.NODE_ENV === 'development' ? warning(!widgetParams.indices, "\nThe option `indices` has been removed from the Autocomplete connector.\n\nThe indices to target are now inferred from the widgets tree.\n".concat(Array.isArray(widgetParams.indices) ? "\nAn alternative would be:\n\nconst autocomplete = connectAutocomplete(renderer);\n\nsearch.addWidgets([\n  ".concat(widgetParams.indices.map(function (_ref2) {
      var value = _ref2.value;
      return "index({ indexName: '".concat(value, "' }),");
    }).join('\n  '), "\n  autocomplete()\n]);\n") : '', "\n      ")) : void 0;
    var connectorState = {};
    return {
      $$type: 'ais.autocomplete',
      init: function init(_ref3) {
        var instantSearchInstance = _ref3.instantSearchInstance,
            helper = _ref3.helper;

        connectorState.refine = function (query) {
          helper.setQuery(query).search();
        };

        renderFn({
          widgetParams: widgetParams,
          currentRefinement: helper.state.query || '',
          indices: [],
          refine: connectorState.refine,
          instantSearchInstance: instantSearchInstance
        }, true);
      },
      render: function render(_ref4) {
        var _this = this;

        var helper = _ref4.helper,
            scopedResults = _ref4.scopedResults,
            instantSearchInstance = _ref4.instantSearchInstance;
        var indices = scopedResults.map(function (scopedResult) {
          // We need to escape the hits because highlighting
          // exposes HTML tags to the end-user.
          scopedResult.results.hits = escapeHTML ? escapeHits(scopedResult.results.hits) : scopedResult.results.hits;
          var sendEvent = createSendEventForHits({
            instantSearchInstance: instantSearchInstance,
            index: scopedResult.results.index,
            widgetType: _this.$$type
          });
          sendEvent('view', scopedResult.results.hits);
          return {
            indexId: scopedResult.indexId,
            indexName: scopedResult.results.index,
            hits: scopedResult.results.hits,
            results: scopedResult.results,
            sendEvent: sendEvent
          };
        });
        renderFn({
          widgetParams: widgetParams,
          currentRefinement: helper.state.query || '',
          indices: indices,
          refine: connectorState.refine,
          instantSearchInstance: instantSearchInstance
        }, false);
      },
      getWidgetState: function getWidgetState(uiState, _ref5) {
        var searchParameters = _ref5.searchParameters;
        var query = searchParameters.query || '';

        if (query === '' || uiState && uiState.query === query) {
          return uiState;
        }

        return _objectSpread({}, uiState, {
          query: query
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref6) {
        var uiState = _ref6.uiState;
        var parameters = {
          query: uiState.query || ''
        };

        if (!escapeHTML) {
          return searchParameters.setQueryParameters(parameters);
        }

        return searchParameters.setQueryParameters(_objectSpread({}, parameters, {}, TAG_PLACEHOLDER));
      },
      dispose: function dispose(_ref7) {
        var state = _ref7.state;
        unmountFn();
        var stateWithoutQuery = state.setQueryParameter('query', undefined);

        if (!escapeHTML) {
          return stateWithoutQuery;
        }

        return stateWithoutQuery.setQueryParameters(Object.keys(TAG_PLACEHOLDER).reduce(function (acc, key) {
          return _objectSpread({}, acc, _defineProperty({}, key, undefined));
        }, {}));
      }
    };
  };
};

export default connectAutocomplete;
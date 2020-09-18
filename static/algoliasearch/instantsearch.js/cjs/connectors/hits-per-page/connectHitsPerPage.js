"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../lib/utils");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'hits-per-page',
  connector: true
});

var connectHitsPerPage = function connectHitsPerPage(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.noop;
  (0, _utils.checkRendering)(renderFn, withUsage());
  return function (widgetParams) {
    var _ref = widgetParams || {},
        userItems = _ref.items,
        _ref$transformItems = _ref.transformItems,
        transformItems = _ref$transformItems === void 0 ? function (items) {
      return items;
    } : _ref$transformItems;

    var items = userItems;

    if (!Array.isArray(items)) {
      throw new Error(withUsage('The `items` option expects an array of objects.'));
    }

    var defaultItems = items.filter(function (item) {
      return item.default === true;
    });

    if (defaultItems.length === 0) {
      throw new Error(withUsage("A default value must be specified in `items`."));
    }

    if (defaultItems.length > 1) {
      throw new Error(withUsage('More than one default value is specified in `items`.'));
    }

    var defaultItem = defaultItems[0];

    var normalizeItems = function normalizeItems(_ref2) {
      var hitsPerPage = _ref2.hitsPerPage;
      return items.map(function (item) {
        return _objectSpread({}, item, {
          isRefined: Number(item.value) === Number(hitsPerPage)
        });
      });
    };

    var connectorState = {};
    return {
      $$type: 'ais.hitsPerPage',
      init: function init(_ref3) {
        var helper = _ref3.helper,
            createURL = _ref3.createURL,
            state = _ref3.state,
            instantSearchInstance = _ref3.instantSearchInstance;
        var isCurrentInOptions = items.some(function (item) {
          return Number(state.hitsPerPage) === Number(item.value);
        });

        connectorState.setHitsPerPage = function (value) {
          return !value && value !== 0 ? helper.setQueryParameter('hitsPerPage', undefined).search() : helper.setQueryParameter('hitsPerPage', value).search();
        };

        if (!isCurrentInOptions) {
          process.env.NODE_ENV === 'development' ? (0, _utils.warning)(state.hitsPerPage !== undefined, "\n`hitsPerPage` is not defined.\nThe option `hitsPerPage` needs to be set using the `configure` widget.\n\nLearn more: https://www.algolia.com/doc/api-reference/widgets/hits-per-page/js/\n            ") : void 0;
          process.env.NODE_ENV === 'development' ? (0, _utils.warning)(false, "\nThe `items` option of `hitsPerPage` does not contain the \"hits per page\" value coming from the state: ".concat(state.hitsPerPage, ".\n\nYou may want to add another entry to the `items` option with this value.")) : void 0;
          items = [// The helper will convert the empty string to `undefined`.
          {
            value: '',
            label: ''
          }].concat(_toConsumableArray(items));
        }

        connectorState.createURLFactory = function (helperState) {
          return function (value) {
            return createURL(helperState.setQueryParameter('hitsPerPage', !value && value !== 0 ? undefined : value));
          };
        };

        renderFn({
          items: transformItems(normalizeItems(state)),
          refine: connectorState.setHitsPerPage,
          createURL: connectorState.createURLFactory(helper.state),
          hasNoResults: true,
          widgetParams: widgetParams,
          instantSearchInstance: instantSearchInstance
        }, true);
      },
      render: function render(_ref4) {
        var state = _ref4.state,
            results = _ref4.results,
            instantSearchInstance = _ref4.instantSearchInstance;
        var hasNoResults = results.nbHits === 0;
        renderFn({
          items: transformItems(normalizeItems(state)),
          refine: connectorState.setHitsPerPage,
          createURL: connectorState.createURLFactory(state),
          hasNoResults: hasNoResults,
          widgetParams: widgetParams,
          instantSearchInstance: instantSearchInstance
        }, false);
      },
      dispose: function dispose(_ref5) {
        var state = _ref5.state;
        unmountFn();
        return state.setQueryParameter('hitsPerPage', undefined);
      },
      getWidgetState: function getWidgetState(uiState, _ref6) {
        var searchParameters = _ref6.searchParameters;
        var hitsPerPage = searchParameters.hitsPerPage;

        if (hitsPerPage === undefined || hitsPerPage === defaultItem.value) {
          return uiState;
        }

        return _objectSpread({}, uiState, {
          hitsPerPage: hitsPerPage
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref7) {
        var uiState = _ref7.uiState;
        return searchParameters.setQueryParameters({
          hitsPerPage: uiState.hitsPerPage || defaultItem.value
        });
      }
    };
  };
};

var _default = connectHitsPerPage;
exports.default = _default;
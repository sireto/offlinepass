(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jotai-tanstack-query'), require('jotai')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jotai-tanstack-query', 'jotai'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.jotaiQuery = {}, global.jotaiTanstackQuery, global.jotai));
})(this, (function (exports, jotaiTanstackQuery, jotai) { 'use strict';

  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }

  function atomWithQuery(createQuery, getQueryClient) {
    if (getQueryClient === void 0) {
      getQueryClient = function getQueryClient(get) {
        return get(jotaiTanstackQuery.queryClientAtom);
      };
    }
    console.warn('[DEPRECATED] use `jotai-tanstack-query` instead.');
    var getOptions = function getOptions(get) {
      return _extends({
        staleTime: 200
      }, typeof createQuery === 'function' ? createQuery(get) : createQuery);
    };
    var _atomsWithQuery = jotaiTanstackQuery.atomsWithQuery(getOptions, getQueryClient),
      dataAtom = _atomsWithQuery[0];
    return jotai.atom(function (get) {
      var options = getOptions(get);
      if (options.enabled === false) {
        var queryClient = getQueryClient(get);
        return queryClient.getQueryData(options.queryKey);
      }
      return get(dataAtom);
    }, function (_get, set, action) {
      if (action.type === 'refetch') {
        return set(dataAtom, {
          type: 'refetch',
          force: true
        });
      }
    });
  }

  function atomWithInfiniteQuery(createQuery, getQueryClient) {
    if (getQueryClient === void 0) {
      getQueryClient = function getQueryClient(get) {
        return get(jotaiTanstackQuery.queryClientAtom);
      };
    }
    console.warn('[DEPRECATED] use `jotai-tanstack-query` instead.');
    var getOptions = function getOptions(get) {
      return _extends({
        staleTime: 200
      }, typeof createQuery === 'function' ? createQuery(get) : createQuery);
    };
    var _atomsWithInfiniteQue = jotaiTanstackQuery.atomsWithInfiniteQuery(getOptions, getQueryClient),
      dataAtom = _atomsWithInfiniteQue[0];
    return jotai.atom(function (get) {
      var options = getOptions(get);
      if (options.enabled === false) {
        var queryClient = getQueryClient(get);
        return queryClient.getQueryData(options.queryKey);
      }
      return get(dataAtom);
    }, function (_get, set, action) {
      if (action.type === 'refetch') {
        return set(dataAtom, {
          type: 'refetch',
          force: true,
          options: action.payload
        });
      }
      return set(dataAtom, action);
    });
  }

  Object.defineProperty(exports, 'queryClientAtom', {
    enumerable: true,
    get: function () { return jotaiTanstackQuery.queryClientAtom; }
  });
  exports.atomWithInfiniteQuery = atomWithInfiniteQuery;
  exports.atomWithQuery = atomWithQuery;

}));

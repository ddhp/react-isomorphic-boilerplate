/**
 * this module defines all entry and route mapping
 * when server app starts
 *
 */
import { getMatchedRoute } from '../routes/utils';
import MainRouteComponent, { getRoutes as getMainRoutes } from '../routes/main';
import AnotherEntryRouteComponent, { getRoutes as getAnotherEntryRoutes } from '../routes/anotherEntry';
import mainReducer from '../reducers/main';
import anotherEntryReducer from '../reducers/anotherEntry';

// you have to exactly know and config this manually here
// to set all possible routes from src/routes
export const entryRouteInfos = [
  getMainRoutes(),
  // other entry
  getAnotherEntryRoutes(),
];

// telling which Route Component for which entry name
export const entryRouteComponentMap = {
  main: MainRouteComponent,
  // other component map
  'another-entry': AnotherEntryRouteComponent,
};

// set up reducer for entry
export const entryReducerMap = {
  main: mainReducer,
  'another-entry': anotherEntryReducer,
};

/**
 * get entry and route info by path
 * @param {string} path - path use currently visiting
 * @returns {object} result
 * @property {string} result.entry - entry name path belongs to
 * @property {array} result.routes - routes info
 * @property {object} result.route - matched route
 *
 */
export function getEntryAndRoute(path) {
  // first element of infos as default result
  let result = entryRouteInfos[0];
  let hasMatched = false;

  entryRouteInfos.some((routeInfo) => {
    // 3rd param is isIgnore404
    // ignore it to avoid matching 404
    const matched = getMatchedRoute(path, routeInfo, true);
    if (matched) {
      result = {
        entry: routeInfo.entry,
        routes: routeInfo.routes,
        route: matched,
      };
      hasMatched = true;
    }
    return matched;
  });

  // if not matched set route with not ignoring matching 404
  if (!hasMatched) {
    result.route = getMatchedRoute(path, result);
  }
  return result;
}

export default module.exports;

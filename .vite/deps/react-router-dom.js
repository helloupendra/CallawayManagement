import {
  Action,
  LocationContext,
  MemoryRouter,
  Navigate,
  NavigationContext,
  Outlet,
  Route,
  RouteContext,
  Router,
  Routes,
  createBrowserHistory,
  createHashHistory,
  createPath,
  createRoutesFromChildren,
  generatePath,
  matchPath,
  matchRoutes,
  parsePath,
  renderMatches,
  resolvePath,
  useHref,
  useInRouterContext,
  useLocation,
  useMatch,
  useNavigate,
  useNavigationType,
  useOutlet,
  useOutletContext,
  useParams,
  useResolvedPath,
  useRoutes
} from "./chunk-C5H5GZPR.js";
import "./chunk-CDGJA232.js";
import {
  require_react
} from "./chunk-2RGQL2JM.js";
import {
  __toESM
} from "./chunk-2LSFTFF7.js";

// node_modules/react-router-dom/index.js
var import_react = __toESM(require_react());
function _extends() {
  _extends = Object.assign || function(target) {
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
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
var _excluded = ["onClick", "reloadDocument", "replace", "state", "target", "to"];
var _excluded2 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "children"];
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined")
      console.warn(message);
    try {
      throw new Error(message);
    } catch (e) {
    }
  }
}
function BrowserRouter(_ref) {
  let {
    basename,
    children,
    window
  } = _ref;
  let historyRef = (0, import_react.useRef)();
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory({
      window
    });
  }
  let history = historyRef.current;
  let [state, setState] = (0, import_react.useState)({
    action: history.action,
    location: history.location
  });
  (0, import_react.useLayoutEffect)(() => history.listen(setState), [history]);
  return (0, import_react.createElement)(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
function HashRouter(_ref2) {
  let {
    basename,
    children,
    window
  } = _ref2;
  let historyRef = (0, import_react.useRef)();
  if (historyRef.current == null) {
    historyRef.current = createHashHistory({
      window
    });
  }
  let history = historyRef.current;
  let [state, setState] = (0, import_react.useState)({
    action: history.action,
    location: history.location
  });
  (0, import_react.useLayoutEffect)(() => history.listen(setState), [history]);
  return (0, import_react.createElement)(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
function HistoryRouter(_ref3) {
  let {
    basename,
    children,
    history
  } = _ref3;
  const [state, setState] = (0, import_react.useState)({
    action: history.action,
    location: history.location
  });
  (0, import_react.useLayoutEffect)(() => history.listen(setState), [history]);
  return (0, import_react.createElement)(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
if (true) {
  HistoryRouter.displayName = "unstable_HistoryRouter";
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
var Link = (0, import_react.forwardRef)(function LinkWithRef(_ref4, ref) {
  let {
    onClick,
    reloadDocument,
    replace = false,
    state,
    target,
    to
  } = _ref4, rest = _objectWithoutPropertiesLoose(_ref4, _excluded);
  let href = useHref(to);
  let internalOnClick = useLinkClickHandler(to, {
    replace,
    state,
    target
  });
  function handleClick(event) {
    if (onClick)
      onClick(event);
    if (!event.defaultPrevented && !reloadDocument) {
      internalOnClick(event);
    }
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    (0, import_react.createElement)("a", _extends({}, rest, {
      href,
      onClick: handleClick,
      ref,
      target
    }))
  );
});
if (true) {
  Link.displayName = "Link";
}
var NavLink = (0, import_react.forwardRef)(function NavLinkWithRef(_ref5, ref) {
  let {
    "aria-current": ariaCurrentProp = "page",
    caseSensitive = false,
    className: classNameProp = "",
    end = false,
    style: styleProp,
    to,
    children
  } = _ref5, rest = _objectWithoutPropertiesLoose(_ref5, _excluded2);
  let location = useLocation();
  let path = useResolvedPath(to);
  let locationPathname = location.pathname;
  let toPathname = path.pathname;
  if (!caseSensitive) {
    locationPathname = locationPathname.toLowerCase();
    toPathname = toPathname.toLowerCase();
  }
  let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(toPathname.length) === "/";
  let ariaCurrent = isActive ? ariaCurrentProp : void 0;
  let className;
  if (typeof classNameProp === "function") {
    className = classNameProp({
      isActive
    });
  } else {
    className = [classNameProp, isActive ? "active" : null].filter(Boolean).join(" ");
  }
  let style = typeof styleProp === "function" ? styleProp({
    isActive
  }) : styleProp;
  return (0, import_react.createElement)(Link, _extends({}, rest, {
    "aria-current": ariaCurrent,
    className,
    ref,
    style,
    to
  }), typeof children === "function" ? children({
    isActive
  }) : children);
});
if (true) {
  NavLink.displayName = "NavLink";
}
function useLinkClickHandler(to, _temp) {
  let {
    target,
    replace: replaceProp,
    state
  } = _temp === void 0 ? {} : _temp;
  let navigate = useNavigate();
  let location = useLocation();
  let path = useResolvedPath(to);
  return (0, import_react.useCallback)((event) => {
    if (event.button === 0 && // Ignore everything but left clicks
    (!target || target === "_self") && // Let browser handle "target=_blank" etc.
    !isModifiedEvent(event)) {
      event.preventDefault();
      let replace = !!replaceProp || createPath(location) === createPath(path);
      navigate(to, {
        replace,
        state
      });
    }
  }, [location, navigate, path, replaceProp, state, target, to]);
}
function useSearchParams(defaultInit) {
  true ? warning(typeof URLSearchParams !== "undefined", "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params\n\nIf you're unsure how to load polyfills, we recommend you check out https://polyfill.io/v3/ which provides some recommendations about how to load polyfills only for users that need them, instead of for every user.") : void 0;
  let defaultSearchParamsRef = (0, import_react.useRef)(createSearchParams(defaultInit));
  let location = useLocation();
  let searchParams = (0, import_react.useMemo)(() => {
    let searchParams2 = createSearchParams(location.search);
    for (let key of defaultSearchParamsRef.current.keys()) {
      if (!searchParams2.has(key)) {
        defaultSearchParamsRef.current.getAll(key).forEach((value) => {
          searchParams2.append(key, value);
        });
      }
    }
    return searchParams2;
  }, [location.search]);
  let navigate = useNavigate();
  let setSearchParams = (0, import_react.useCallback)((nextInit, navigateOptions) => {
    navigate("?" + createSearchParams(nextInit), navigateOptions);
  }, [navigate]);
  return [searchParams, setSearchParams];
}
function createSearchParams(init) {
  if (init === void 0) {
    init = "";
  }
  return new URLSearchParams(typeof init === "string" || Array.isArray(init) || init instanceof URLSearchParams ? init : Object.keys(init).reduce((memo, key) => {
    let value = init[key];
    return memo.concat(Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]);
  }, []));
}
export {
  BrowserRouter,
  HashRouter,
  Link,
  MemoryRouter,
  NavLink,
  Navigate,
  Action as NavigationType,
  Outlet,
  Route,
  Router,
  Routes,
  LocationContext as UNSAFE_LocationContext,
  NavigationContext as UNSAFE_NavigationContext,
  RouteContext as UNSAFE_RouteContext,
  createPath,
  createRoutesFromChildren,
  createSearchParams,
  generatePath,
  matchPath,
  matchRoutes,
  parsePath,
  renderMatches,
  resolvePath,
  HistoryRouter as unstable_HistoryRouter,
  useHref,
  useInRouterContext,
  useLinkClickHandler,
  useLocation,
  useMatch,
  useNavigate,
  useNavigationType,
  useOutlet,
  useOutletContext,
  useParams,
  useResolvedPath,
  useRoutes,
  useSearchParams
};
/*! Bundled license information:

react-router-dom/index.js:
  (**
   * React Router DOM v6.3.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)
*/
//# sourceMappingURL=react-router-dom.js.map

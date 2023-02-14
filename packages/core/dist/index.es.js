var vv = Object.defineProperty;
var mv = (e, t, r) => t in e ? vv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var pe = (e, t, r) => (mv(e, typeof t != "symbol" ? t + "" : t, r), r);
import * as b from "react";
import ye, { useState as ne, createContext as jr, memo as Pr, useContext as An, useMemo as ir, useRef as Ft, useEffect as _e, useCallback as X, isValidElement as yv, createElement as qu } from "react";
/**
 * @remix-run/router v1.2.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function Oo() {
  return Oo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Oo.apply(this, arguments);
}
var It;
(function(e) {
  e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
})(It || (It = {}));
const Ju = "popstate";
function gv(e) {
  e === void 0 && (e = {});
  function t(n, o) {
    let {
      pathname: i,
      search: a,
      hash: s
    } = n.location;
    return va(
      "",
      {
        pathname: i,
        search: a,
        hash: s
      },
      o.state && o.state.usr || null,
      o.state && o.state.key || "default"
    );
  }
  function r(n, o) {
    return typeof o == "string" ? o : _r(o);
  }
  return Ev(t, r, null, e);
}
function M(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function bv() {
  return Math.random().toString(36).substr(2, 8);
}
function Ku(e) {
  return {
    usr: e.state,
    key: e.key
  };
}
function va(e, t, r, n) {
  return r === void 0 && (r = null), Oo({
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: ""
  }, typeof t == "string" ? Tr(t) : t, {
    state: r,
    key: t && t.key || n || bv()
  });
}
function _r(e) {
  let {
    pathname: t = "/",
    search: r = "",
    hash: n = ""
  } = e;
  return r && r !== "?" && (t += r.charAt(0) === "?" ? r : "?" + r), n && n !== "#" && (t += n.charAt(0) === "#" ? n : "#" + n), t;
}
function Tr(e) {
  let t = {};
  if (e) {
    let r = e.indexOf("#");
    r >= 0 && (t.hash = e.substr(r), e = e.substr(0, r));
    let n = e.indexOf("?");
    n >= 0 && (t.search = e.substr(n), e = e.substr(0, n)), e && (t.pathname = e);
  }
  return t;
}
function wv(e) {
  let t = typeof window < "u" && typeof window.location < "u" && window.location.origin !== "null" ? window.location.origin : window.location.href, r = typeof e == "string" ? e : _r(e);
  return M(t, "No window.location.(origin|href) available to create URL for href: " + r), new URL(r, t);
}
function Ev(e, t, r, n) {
  n === void 0 && (n = {});
  let {
    window: o = document.defaultView,
    v5Compat: i = !1
  } = n, a = o.history, s = It.Pop, u = null;
  function l() {
    s = It.Pop, u && u({
      action: s,
      location: d.location
    });
  }
  function f(h, m) {
    s = It.Push;
    let y = va(d.location, h, m);
    r && r(y, h);
    let _ = Ku(y), j = d.createHref(y);
    try {
      a.pushState(_, "", j);
    } catch {
      o.location.assign(j);
    }
    i && u && u({
      action: s,
      location: d.location
    });
  }
  function p(h, m) {
    s = It.Replace;
    let y = va(d.location, h, m);
    r && r(y, h);
    let _ = Ku(y), j = d.createHref(y);
    a.replaceState(_, "", j), i && u && u({
      action: s,
      location: d.location
    });
  }
  let d = {
    get action() {
      return s;
    },
    get location() {
      return e(o, a);
    },
    listen(h) {
      if (u)
        throw new Error("A history only accepts one active listener");
      return o.addEventListener(Ju, l), u = h, () => {
        o.removeEventListener(Ju, l), u = null;
      };
    },
    createHref(h) {
      return t(o, h);
    },
    encodeLocation(h) {
      let m = wv(typeof h == "string" ? h : _r(h));
      return {
        pathname: m.pathname,
        search: m.search,
        hash: m.hash
      };
    },
    push: f,
    replace: p,
    go(h) {
      return a.go(h);
    }
  };
  return d;
}
var Gu;
(function(e) {
  e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error";
})(Gu || (Gu = {}));
function _v(e, t, r) {
  r === void 0 && (r = "/");
  let n = typeof t == "string" ? Tr(t) : t, o = sp(n.pathname || "/", r);
  if (o == null)
    return null;
  let i = ip(e);
  Ov(i);
  let a = null;
  for (let s = 0; a == null && s < i.length; ++s)
    a = Nv(
      i[s],
      Iv(o)
    );
  return a;
}
function ip(e, t, r, n) {
  t === void 0 && (t = []), r === void 0 && (r = []), n === void 0 && (n = "");
  let o = (i, a, s) => {
    let u = {
      relativePath: s === void 0 ? i.path || "" : s,
      caseSensitive: i.caseSensitive === !0,
      childrenIndex: a,
      route: i
    };
    u.relativePath.startsWith("/") && (M(u.relativePath.startsWith(n), 'Absolute route path "' + u.relativePath + '" nested under path ' + ('"' + n + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), u.relativePath = u.relativePath.slice(n.length));
    let l = Je([n, u.relativePath]), f = r.concat(u);
    i.children && i.children.length > 0 && (M(
      i.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + l + '".')
    ), ip(i.children, t, f, l)), !(i.path == null && !i.index) && t.push({
      path: l,
      score: Av(l, i.index),
      routesMeta: f
    });
  };
  return e.forEach((i, a) => {
    var s;
    if (i.path === "" || !((s = i.path) != null && s.includes("?")))
      o(i, a);
    else
      for (let u of ap(i.path))
        o(i, a, u);
  }), t;
}
function ap(e) {
  let t = e.split("/");
  if (t.length === 0)
    return [];
  let [r, ...n] = t, o = r.endsWith("?"), i = r.replace(/\?$/, "");
  if (n.length === 0)
    return o ? [i, ""] : [i];
  let a = ap(n.join("/")), s = [];
  return s.push(...a.map((u) => u === "" ? i : [i, u].join("/"))), o && s.push(...a), s.map((u) => e.startsWith("/") && u === "" ? "/" : u);
}
function Ov(e) {
  e.sort((t, r) => t.score !== r.score ? r.score - t.score : Cv(t.routesMeta.map((n) => n.childrenIndex), r.routesMeta.map((n) => n.childrenIndex)));
}
const Sv = /^:\w+$/, xv = 3, Rv = 2, jv = 1, Pv = 10, Tv = -2, Yu = (e) => e === "*";
function Av(e, t) {
  let r = e.split("/"), n = r.length;
  return r.some(Yu) && (n += Tv), t && (n += Rv), r.filter((o) => !Yu(o)).reduce((o, i) => o + (Sv.test(i) ? xv : i === "" ? jv : Pv), n);
}
function Cv(e, t) {
  return e.length === t.length && e.slice(0, -1).every((n, o) => n === t[o]) ? e[e.length - 1] - t[t.length - 1] : 0;
}
function Nv(e, t) {
  let {
    routesMeta: r
  } = e, n = {}, o = "/", i = [];
  for (let a = 0; a < r.length; ++a) {
    let s = r[a], u = a === r.length - 1, l = o === "/" ? t : t.slice(o.length) || "/", f = Dv({
      path: s.relativePath,
      caseSensitive: s.caseSensitive,
      end: u
    }, l);
    if (!f)
      return null;
    Object.assign(n, f.params);
    let p = s.route;
    i.push({
      params: n,
      pathname: Je([o, f.pathname]),
      pathnameBase: $v(Je([o, f.pathnameBase])),
      route: p
    }), f.pathnameBase !== "/" && (o = Je([o, f.pathnameBase]));
  }
  return i;
}
function uI(e, t) {
  t === void 0 && (t = {});
  let r = e;
  return r.endsWith("*") && r !== "*" && !r.endsWith("/*") && (We(!1, 'Route path "' + r + '" will be treated as if it were ' + ('"' + r.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + r.replace(/\*$/, "/*") + '".')), r = r.replace(/\*$/, "/*")), r.replace(/^:(\w+)/g, (n, o) => (M(t[o] != null, 'Missing ":' + o + '" param'), t[o])).replace(/\/:(\w+)/g, (n, o) => (M(t[o] != null, 'Missing ":' + o + '" param'), "/" + t[o])).replace(/(\/?)\*/, (n, o, i, a) => {
    const s = "*";
    return t[s] == null ? a === "/*" ? "/" : "" : "" + o + t[s];
  });
}
function Dv(e, t) {
  typeof e == "string" && (e = {
    path: e,
    caseSensitive: !1,
    end: !0
  });
  let [r, n] = Lv(e.path, e.caseSensitive, e.end), o = t.match(r);
  if (!o)
    return null;
  let i = o[0], a = i.replace(/(.)\/+$/, "$1"), s = o.slice(1);
  return {
    params: n.reduce((l, f, p) => {
      if (f === "*") {
        let d = s[p] || "";
        a = i.slice(0, i.length - d.length).replace(/(.)\/+$/, "$1");
      }
      return l[f] = Fv(s[p] || "", f), l;
    }, {}),
    pathname: i,
    pathnameBase: a,
    pattern: e
  };
}
function Lv(e, t, r) {
  t === void 0 && (t = !1), r === void 0 && (r = !0), We(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
  let n = [], o = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^$?{}|()[\]]/g, "\\$&").replace(/\/:(\w+)/g, (a, s) => (n.push(s), "/([^\\/]+)"));
  return e.endsWith("*") ? (n.push("*"), o += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? o += "\\/*$" : e !== "" && e !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, t ? void 0 : "i"), n];
}
function Iv(e) {
  try {
    return decodeURI(e);
  } catch (t) {
    return We(!1, 'The URL path "' + e + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + t + ").")), e;
  }
}
function Fv(e, t) {
  try {
    return decodeURIComponent(e);
  } catch (r) {
    return We(!1, 'The value for the URL param "' + t + '" will not be decoded because' + (' the string "' + e + '" is a malformed URL segment. This is probably') + (" due to a bad percent encoding (" + r + ").")), e;
  }
}
function sp(e, t) {
  if (t === "/")
    return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let r = t.endsWith("/") ? t.length - 1 : t.length, n = e.charAt(r);
  return n && n !== "/" ? null : e.slice(r) || "/";
}
function We(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function kv(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: r,
    search: n = "",
    hash: o = ""
  } = typeof e == "string" ? Tr(e) : e;
  return {
    pathname: r ? r.startsWith("/") ? r : Uv(r, t) : t,
    search: Bv(n),
    hash: Mv(o)
  };
}
function Uv(e, t) {
  let r = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((o) => {
    o === ".." ? r.length > 1 && r.pop() : o !== "." && r.push(o);
  }), r.length > 1 ? r.join("/") : "/";
}
function Ci(e, t, r, n) {
  return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(n) + "].  Please separate it out to the ") + ("`to." + r + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function up(e) {
  return e.filter((t, r) => r === 0 || t.route.path && t.route.path.length > 0);
}
function cp(e, t, r, n) {
  n === void 0 && (n = !1);
  let o;
  typeof e == "string" ? o = Tr(e) : (o = Oo({}, e), M(!o.pathname || !o.pathname.includes("?"), Ci("?", "pathname", "search", o)), M(!o.pathname || !o.pathname.includes("#"), Ci("#", "pathname", "hash", o)), M(!o.search || !o.search.includes("#"), Ci("#", "search", "hash", o)));
  let i = e === "" || o.pathname === "", a = i ? "/" : o.pathname, s;
  if (n || a == null)
    s = r;
  else {
    let p = t.length - 1;
    if (a.startsWith("..")) {
      let d = a.split("/");
      for (; d[0] === ".."; )
        d.shift(), p -= 1;
      o.pathname = d.join("/");
    }
    s = p >= 0 ? t[p] : "/";
  }
  let u = kv(o, s), l = a && a !== "/" && a.endsWith("/"), f = (i || a === ".") && r.endsWith("/");
  return !u.pathname.endsWith("/") && (l || f) && (u.pathname += "/"), u;
}
const Je = (e) => e.join("/").replace(/\/\/+/g, "/"), $v = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"), Bv = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, Mv = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e;
class zv {
  constructor(t, r, n, o) {
    o === void 0 && (o = !1), this.status = t, this.statusText = r || "", this.internal = o, n instanceof Error ? (this.data = n.toString(), this.error = n) : this.data = n;
  }
}
function Vv(e) {
  return e instanceof zv;
}
const Wv = ["post", "put", "patch", "delete"];
[...Wv];
/**
 * React Router v6.6.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function ma() {
  return ma = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ma.apply(this, arguments);
}
function Hv(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
const lp = typeof Object.is == "function" ? Object.is : Hv, {
  useState: qv,
  useEffect: Jv,
  useLayoutEffect: Kv,
  useDebugValue: Gv
} = b;
let Xu = !1, Zu = !1;
function Yv(e, t, r) {
  process.env.NODE_ENV !== "production" && (Xu || "startTransition" in b && (Xu = !0, console.error("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release.")));
  const n = t();
  if (process.env.NODE_ENV !== "production" && !Zu) {
    const a = t();
    lp(n, a) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), Zu = !0);
  }
  const [{
    inst: o
  }, i] = qv({
    inst: {
      value: n,
      getSnapshot: t
    }
  });
  return Kv(() => {
    o.value = n, o.getSnapshot = t, Ni(o) && i({
      inst: o
    });
  }, [e, n, t]), Jv(() => (Ni(o) && i({
    inst: o
  }), e(() => {
    Ni(o) && i({
      inst: o
    });
  })), [e]), Gv(n), n;
}
function Ni(e) {
  const t = e.getSnapshot, r = e.value;
  try {
    const n = t();
    return !lp(r, n);
  } catch {
    return !0;
  }
}
function Xv(e, t, r) {
  return t();
}
const Zv = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Qv = !Zv, em = Qv ? Xv : Yv;
"useSyncExternalStore" in b && ((e) => e.useSyncExternalStore)(b);
const fp = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (fp.displayName = "DataStaticRouterContext");
const xs = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (xs.displayName = "DataRouter");
const Cn = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (Cn.displayName = "DataRouterState");
const Rs = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (Rs.displayName = "Await");
const Vt = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (Vt.displayName = "Navigation");
const Nn = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (Nn.displayName = "Location");
const Ie = /* @__PURE__ */ b.createContext({
  outlet: null,
  matches: []
});
process.env.NODE_ENV !== "production" && (Ie.displayName = "Route");
const js = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (js.displayName = "RouteError");
function tm(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t;
  Ar() || (process.env.NODE_ENV !== "production" ? M(
    !1,
    "useHref() may be used only in the context of a <Router> component."
  ) : M(!1));
  let {
    basename: n,
    navigator: o
  } = b.useContext(Vt), {
    hash: i,
    pathname: a,
    search: s
  } = Jo(e, {
    relative: r
  }), u = a;
  return n !== "/" && (u = a === "/" ? n : Je([n, a])), o.createHref({
    pathname: u,
    search: s,
    hash: i
  });
}
function Ar() {
  return b.useContext(Nn) != null;
}
function et() {
  return Ar() || (process.env.NODE_ENV !== "production" ? M(
    !1,
    "useLocation() may be used only in the context of a <Router> component."
  ) : M(!1)), b.useContext(Nn).location;
}
function qo() {
  Ar() || (process.env.NODE_ENV !== "production" ? M(
    !1,
    "useNavigate() may be used only in the context of a <Router> component."
  ) : M(!1));
  let {
    basename: e,
    navigator: t
  } = b.useContext(Vt), {
    matches: r
  } = b.useContext(Ie), {
    pathname: n
  } = et(), o = JSON.stringify(up(r).map((s) => s.pathnameBase)), i = b.useRef(!1);
  return b.useEffect(() => {
    i.current = !0;
  }), b.useCallback(function(s, u) {
    if (u === void 0 && (u = {}), process.env.NODE_ENV !== "production" && We(i.current, "You should call navigate() in a React.useEffect(), not when your component is first rendered."), !i.current)
      return;
    if (typeof s == "number") {
      t.go(s);
      return;
    }
    let l = cp(s, JSON.parse(o), n, u.relative === "path");
    e !== "/" && (l.pathname = l.pathname === "/" ? e : Je([e, l.pathname])), (u.replace ? t.replace : t.push)(l, u.state, u);
  }, [e, t, o, n]);
}
const pp = /* @__PURE__ */ b.createContext(null);
function cI() {
  return b.useContext(pp);
}
function rm(e) {
  let t = b.useContext(Ie).outlet;
  return t && /* @__PURE__ */ b.createElement(pp.Provider, {
    value: e
  }, t);
}
function lI() {
  let {
    matches: e
  } = b.useContext(Ie), t = e[e.length - 1];
  return t ? t.params : {};
}
function Jo(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t, {
    matches: n
  } = b.useContext(Ie), {
    pathname: o
  } = et(), i = JSON.stringify(up(n).map((a) => a.pathnameBase));
  return b.useMemo(() => cp(e, JSON.parse(i), o, r === "path"), [e, i, o, r]);
}
function nm(e, t) {
  Ar() || (process.env.NODE_ENV !== "production" ? M(
    !1,
    "useRoutes() may be used only in the context of a <Router> component."
  ) : M(!1));
  let {
    navigator: r
  } = b.useContext(Vt), n = b.useContext(Cn), {
    matches: o
  } = b.useContext(Ie), i = o[o.length - 1], a = i ? i.params : {}, s = i ? i.pathname : "/", u = i ? i.pathnameBase : "/", l = i && i.route;
  if (process.env.NODE_ENV !== "production") {
    let j = l && l.path || "";
    fm(s, !l || j.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + s + '" (under <Route path="' + j + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + j + '"> to <Route ') + ('path="' + (j === "/" ? "*" : j + "/*") + '">.'));
  }
  let f = et(), p;
  if (t) {
    var d;
    let j = typeof t == "string" ? Tr(t) : t;
    u === "/" || (d = j.pathname) != null && d.startsWith(u) || (process.env.NODE_ENV !== "production" ? M(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + u + '" ') + ('but pathname "' + j.pathname + '" was given in the `location` prop.')) : M(!1)), p = j;
  } else
    p = f;
  let h = p.pathname || "/", m = u === "/" ? h : h.slice(u.length) || "/", y = _v(e, {
    pathname: m
  });
  process.env.NODE_ENV !== "production" && (process.env.NODE_ENV !== "production" && We(l || y != null, 'No routes matched location "' + p.pathname + p.search + p.hash + '" '), process.env.NODE_ENV !== "production" && We(y == null || y[y.length - 1].route.element !== void 0, 'Matched leaf route at location "' + p.pathname + p.search + p.hash + '" does not have an element. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.'));
  let _ = sm(y && y.map((j) => Object.assign({}, j, {
    params: Object.assign({}, a, j.params),
    pathname: Je([
      u,
      r.encodeLocation ? r.encodeLocation(j.pathname).pathname : j.pathname
    ]),
    pathnameBase: j.pathnameBase === "/" ? u : Je([
      u,
      r.encodeLocation ? r.encodeLocation(j.pathnameBase).pathname : j.pathnameBase
    ])
  })), o, n || void 0);
  return t && _ ? /* @__PURE__ */ b.createElement(Nn.Provider, {
    value: {
      location: ma({
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default"
      }, p),
      navigationType: It.Pop
    }
  }, _) : _;
}
function om() {
  let e = lm(), t = Vv(e) ? e.status + " " + e.statusText : e instanceof Error ? e.message : JSON.stringify(e), r = e instanceof Error ? e.stack : null, n = "rgba(200,200,200, 0.5)", o = {
    padding: "0.5rem",
    backgroundColor: n
  }, i = {
    padding: "2px 4px",
    backgroundColor: n
  };
  return /* @__PURE__ */ b.createElement(b.Fragment, null, /* @__PURE__ */ b.createElement("h2", null, "Unhandled Thrown Error!"), /* @__PURE__ */ b.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, t), r ? /* @__PURE__ */ b.createElement("pre", {
    style: o
  }, r) : null, /* @__PURE__ */ b.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ b.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ b.createElement("code", {
    style: i
  }, "errorElement"), " props on ", /* @__PURE__ */ b.createElement("code", {
    style: i
  }, "<Route>")));
}
class im extends b.Component {
  constructor(t) {
    super(t), this.state = {
      location: t.location,
      error: t.error
    };
  }
  static getDerivedStateFromError(t) {
    return {
      error: t
    };
  }
  static getDerivedStateFromProps(t, r) {
    return r.location !== t.location ? {
      error: t.error,
      location: t.location
    } : {
      error: t.error || r.error,
      location: r.location
    };
  }
  componentDidCatch(t, r) {
    console.error("React Router caught the following error during render", t, r);
  }
  render() {
    return this.state.error ? /* @__PURE__ */ b.createElement(Ie.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ b.createElement(js.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function am(e) {
  let {
    routeContext: t,
    match: r,
    children: n
  } = e, o = b.useContext(fp);
  return o && r.route.errorElement && (o._deepestRenderedBoundaryId = r.route.id), /* @__PURE__ */ b.createElement(Ie.Provider, {
    value: t
  }, n);
}
function sm(e, t, r) {
  if (t === void 0 && (t = []), e == null)
    if (r != null && r.errors)
      e = r.matches;
    else
      return null;
  let n = e, o = r == null ? void 0 : r.errors;
  if (o != null) {
    let i = n.findIndex((a) => a.route.id && (o == null ? void 0 : o[a.route.id]));
    i >= 0 || (process.env.NODE_ENV !== "production" ? M(!1, "Could not find a matching route for the current errors: " + o) : M(!1)), n = n.slice(0, Math.min(n.length, i + 1));
  }
  return n.reduceRight((i, a, s) => {
    let u = a.route.id ? o == null ? void 0 : o[a.route.id] : null, l = r ? a.route.errorElement || /* @__PURE__ */ b.createElement(om, null) : null, f = t.concat(n.slice(0, s + 1)), p = () => /* @__PURE__ */ b.createElement(am, {
      match: a,
      routeContext: {
        outlet: i,
        matches: f
      }
    }, u ? l : a.route.element !== void 0 ? a.route.element : i);
    return r && (a.route.errorElement || s === 0) ? /* @__PURE__ */ b.createElement(im, {
      location: r.location,
      component: l,
      error: u,
      children: p(),
      routeContext: {
        outlet: null,
        matches: f
      }
    }) : p();
  }, null);
}
var Qu;
(function(e) {
  e.UseRevalidator = "useRevalidator";
})(Qu || (Qu = {}));
var Or;
(function(e) {
  e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator";
})(Or || (Or = {}));
function dp(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function Ps(e) {
  let t = b.useContext(Cn);
  return t || (process.env.NODE_ENV !== "production" ? M(!1, dp(e)) : M(!1)), t;
}
function um(e) {
  let t = b.useContext(Ie);
  return t || (process.env.NODE_ENV !== "production" ? M(!1, dp(e)) : M(!1)), t;
}
function cm(e) {
  let t = um(e), r = t.matches[t.matches.length - 1];
  return r.route.id || (process.env.NODE_ENV !== "production" ? M(!1, e + ' can only be used on routes that contain a unique "id"') : M(!1)), r.route.id;
}
function fI() {
  return Ps(Or.UseNavigation).navigation;
}
function pI() {
  let e = Ps(Or.UseActionData);
  return b.useContext(Ie) || (process.env.NODE_ENV !== "production" ? M(!1, "useActionData must be used inside a RouteContext") : M(!1)), Object.values((e == null ? void 0 : e.actionData) || {})[0];
}
function lm() {
  var e;
  let t = b.useContext(js), r = Ps(Or.UseRouteError), n = cm(Or.UseRouteError);
  return t || ((e = r.errors) == null ? void 0 : e[n]);
}
function dI() {
  let e = b.useContext(Rs);
  return e == null ? void 0 : e._data;
}
function hI() {
  let e = b.useContext(Rs);
  return e == null ? void 0 : e._error;
}
const ec = {};
function fm(e, t, r) {
  !t && !ec[e] && (ec[e] = !0, process.env.NODE_ENV !== "production" && We(!1, r));
}
function vI(e) {
  let {
    to: t,
    replace: r,
    state: n,
    relative: o
  } = e;
  Ar() || (process.env.NODE_ENV !== "production" ? M(
    !1,
    "<Navigate> may be used only in the context of a <Router> component."
  ) : M(!1)), process.env.NODE_ENV !== "production" && We(!b.useContext(Vt).static, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
  let i = b.useContext(Cn), a = qo();
  return b.useEffect(() => {
    i && i.navigation.state !== "idle" || a(t, {
      replace: r,
      state: n,
      relative: o
    });
  }), null;
}
function pm(e) {
  return rm(e.context);
}
function So(e) {
  process.env.NODE_ENV !== "production" ? M(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.") : M(!1);
}
function dm(e) {
  let {
    basename: t = "/",
    children: r = null,
    location: n,
    navigationType: o = It.Pop,
    navigator: i,
    static: a = !1
  } = e;
  Ar() && (process.env.NODE_ENV !== "production" ? M(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.") : M(!1));
  let s = t.replace(/^\/*/, "/"), u = b.useMemo(() => ({
    basename: s,
    navigator: i,
    static: a
  }), [s, i, a]);
  typeof n == "string" && (n = Tr(n));
  let {
    pathname: l = "/",
    search: f = "",
    hash: p = "",
    state: d = null,
    key: h = "default"
  } = n, m = b.useMemo(() => {
    let y = sp(l, s);
    return y == null ? null : {
      pathname: y,
      search: f,
      hash: p,
      state: d,
      key: h
    };
  }, [s, l, f, p, d, h]);
  return process.env.NODE_ENV !== "production" && We(m != null, '<Router basename="' + s + '"> is not able to match the URL ' + ('"' + l + f + p + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), m == null ? null : /* @__PURE__ */ b.createElement(Vt.Provider, {
    value: u
  }, /* @__PURE__ */ b.createElement(Nn.Provider, {
    children: r,
    value: {
      location: m,
      navigationType: o
    }
  }));
}
function hm(e) {
  let {
    children: t,
    location: r
  } = e, n = b.useContext(xs), o = n && !t ? n.router.routes : ya(t);
  return nm(o, r);
}
var tc;
(function(e) {
  e[e.pending = 0] = "pending", e[e.success = 1] = "success", e[e.error = 2] = "error";
})(tc || (tc = {}));
new Promise(() => {
});
function ya(e, t) {
  t === void 0 && (t = []);
  let r = [];
  return b.Children.forEach(e, (n, o) => {
    if (!/* @__PURE__ */ b.isValidElement(n))
      return;
    if (n.type === b.Fragment) {
      r.push.apply(r, ya(n.props.children, t));
      return;
    }
    n.type !== So && (process.env.NODE_ENV !== "production" ? M(!1, "[" + (typeof n.type == "string" ? n.type : n.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>") : M(!1)), !n.props.index || !n.props.children || (process.env.NODE_ENV !== "production" ? M(!1, "An index route cannot have child routes.") : M(!1));
    let i = [...t, o], a = {
      id: n.props.id || i.join("-"),
      caseSensitive: n.props.caseSensitive,
      element: n.props.element,
      index: n.props.index,
      path: n.props.path,
      loader: n.props.loader,
      action: n.props.action,
      errorElement: n.props.errorElement,
      hasErrorBoundary: n.props.errorElement != null,
      shouldRevalidate: n.props.shouldRevalidate,
      handle: n.props.handle
    };
    n.props.children && (a.children = ya(n.props.children, i)), r.push(a);
  }), r;
}
/**
 * React Router DOM v6.6.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function Yt() {
  return Yt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Yt.apply(this, arguments);
}
function Ts(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), o, i;
  for (i = 0; i < n.length; i++)
    o = n[i], !(t.indexOf(o) >= 0) && (r[o] = e[o]);
  return r;
}
const to = "get", Di = "application/x-www-form-urlencoded";
function Ko(e) {
  return e != null && typeof e.tagName == "string";
}
function vm(e) {
  return Ko(e) && e.tagName.toLowerCase() === "button";
}
function mm(e) {
  return Ko(e) && e.tagName.toLowerCase() === "form";
}
function ym(e) {
  return Ko(e) && e.tagName.toLowerCase() === "input";
}
function gm(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function bm(e, t) {
  return e.button === 0 && (!t || t === "_self") && !gm(e);
}
function ga(e) {
  return e === void 0 && (e = ""), new URLSearchParams(typeof e == "string" || Array.isArray(e) || e instanceof URLSearchParams ? e : Object.keys(e).reduce((t, r) => {
    let n = e[r];
    return t.concat(Array.isArray(n) ? n.map((o) => [r, o]) : [[r, n]]);
  }, []));
}
function wm(e, t) {
  let r = ga(e);
  for (let n of t.keys())
    r.has(n) || t.getAll(n).forEach((o) => {
      r.append(n, o);
    });
  return r;
}
function Em(e, t, r) {
  let n, o, i, a;
  if (mm(e)) {
    let f = r.submissionTrigger;
    n = r.method || e.getAttribute("method") || to, o = r.action || e.getAttribute("action") || t, i = r.encType || e.getAttribute("enctype") || Di, a = new FormData(e), f && f.name && a.append(f.name, f.value);
  } else if (vm(e) || ym(e) && (e.type === "submit" || e.type === "image")) {
    let f = e.form;
    if (f == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    n = r.method || e.getAttribute("formmethod") || f.getAttribute("method") || to, o = r.action || e.getAttribute("formaction") || f.getAttribute("action") || t, i = r.encType || e.getAttribute("formenctype") || f.getAttribute("enctype") || Di, a = new FormData(f), e.name && a.append(e.name, e.value);
  } else {
    if (Ko(e))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    if (n = r.method || to, o = r.action || t, i = r.encType || Di, e instanceof FormData)
      a = e;
    else if (a = new FormData(), e instanceof URLSearchParams)
      for (let [f, p] of e)
        a.append(f, p);
    else if (e != null)
      for (let f of Object.keys(e))
        a.append(f, e[f]);
  }
  let {
    protocol: s,
    host: u
  } = window.location;
  return {
    url: new URL(o, s + "//" + u),
    method: n.toLowerCase(),
    encType: i,
    formData: a
  };
}
const _m = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset"], Om = ["aria-current", "caseSensitive", "className", "end", "style", "to", "children"], Sm = ["reloadDocument", "replace", "method", "action", "onSubmit", "fetcherKey", "routeId", "relative"];
function mI(e) {
  let {
    basename: t,
    children: r,
    window: n
  } = e, o = b.useRef();
  o.current == null && (o.current = gv({
    window: n,
    v5Compat: !0
  }));
  let i = o.current, [a, s] = b.useState({
    action: i.action,
    location: i.location
  });
  return b.useLayoutEffect(() => i.listen(s), [i]), /* @__PURE__ */ b.createElement(dm, {
    basename: t,
    children: r,
    location: a.location,
    navigationType: a.action,
    navigator: i
  });
}
process.env.NODE_ENV;
const hp = /* @__PURE__ */ b.forwardRef(function(t, r) {
  let {
    onClick: n,
    relative: o,
    reloadDocument: i,
    replace: a,
    state: s,
    target: u,
    to: l,
    preventScrollReset: f
  } = t, p = Ts(t, _m), d = tm(l, {
    relative: o
  }), h = Tm(l, {
    replace: a,
    state: s,
    target: u,
    preventScrollReset: f,
    relative: o
  });
  function m(y) {
    n && n(y), y.defaultPrevented || h(y);
  }
  return /* @__PURE__ */ b.createElement("a", Yt({}, p, {
    href: d,
    onClick: i ? n : m,
    ref: r,
    target: u
  }));
});
process.env.NODE_ENV !== "production" && (hp.displayName = "Link");
const xm = /* @__PURE__ */ b.forwardRef(function(t, r) {
  let {
    "aria-current": n = "page",
    caseSensitive: o = !1,
    className: i = "",
    end: a = !1,
    style: s,
    to: u,
    children: l
  } = t, f = Ts(t, Om), p = Jo(u, {
    relative: f.relative
  }), d = et(), h = b.useContext(Cn), {
    navigator: m
  } = b.useContext(Vt), y = m.encodeLocation ? m.encodeLocation(p).pathname : p.pathname, _ = d.pathname, j = h && h.navigation && h.navigation.location ? h.navigation.location.pathname : null;
  o || (_ = _.toLowerCase(), j = j ? j.toLowerCase() : null, y = y.toLowerCase());
  let L = _ === y || !a && _.startsWith(y) && _.charAt(y.length) === "/", w = j != null && (j === y || !a && j.startsWith(y) && j.charAt(y.length) === "/"), O = L ? n : void 0, D;
  typeof i == "function" ? D = i({
    isActive: L,
    isPending: w
  }) : D = [i, L ? "active" : null, w ? "pending" : null].filter(Boolean).join(" ");
  let N = typeof s == "function" ? s({
    isActive: L,
    isPending: w
  }) : s;
  return /* @__PURE__ */ b.createElement(hp, Yt({}, f, {
    "aria-current": O,
    className: D,
    ref: r,
    style: N,
    to: u
  }), typeof l == "function" ? l({
    isActive: L,
    isPending: w
  }) : l);
});
process.env.NODE_ENV !== "production" && (xm.displayName = "NavLink");
const Rm = /* @__PURE__ */ b.forwardRef((e, t) => /* @__PURE__ */ b.createElement(vp, Yt({}, e, {
  ref: t
})));
process.env.NODE_ENV !== "production" && (Rm.displayName = "Form");
const vp = /* @__PURE__ */ b.forwardRef((e, t) => {
  let {
    reloadDocument: r,
    replace: n,
    method: o = to,
    action: i,
    onSubmit: a,
    fetcherKey: s,
    routeId: u,
    relative: l
  } = e, f = Ts(e, Sm), p = Am(s, u), d = o.toLowerCase() === "get" ? "get" : "post", h = mp(i, {
    relative: l
  }), m = (y) => {
    if (a && a(y), y.defaultPrevented)
      return;
    y.preventDefault();
    let _ = y.nativeEvent.submitter, j = (_ == null ? void 0 : _.getAttribute("formmethod")) || o;
    p(_ || y.currentTarget, {
      method: j,
      replace: n,
      relative: l
    });
  };
  return /* @__PURE__ */ b.createElement("form", Yt({
    ref: t,
    method: d,
    action: h,
    onSubmit: r ? a : m
  }, f));
});
process.env.NODE_ENV !== "production" && (vp.displayName = "FormImpl");
process.env.NODE_ENV;
var ba;
(function(e) {
  e.UseScrollRestoration = "useScrollRestoration", e.UseSubmitImpl = "useSubmitImpl", e.UseFetcher = "useFetcher";
})(ba || (ba = {}));
var rc;
(function(e) {
  e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration";
})(rc || (rc = {}));
function jm(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function Pm(e) {
  let t = b.useContext(xs);
  return t || (process.env.NODE_ENV !== "production" ? M(!1, jm(e)) : M(!1)), t;
}
function Tm(e, t) {
  let {
    target: r,
    replace: n,
    state: o,
    preventScrollReset: i,
    relative: a
  } = t === void 0 ? {} : t, s = qo(), u = et(), l = Jo(e, {
    relative: a
  });
  return b.useCallback((f) => {
    if (bm(f, r)) {
      f.preventDefault();
      let p = n !== void 0 ? n : _r(u) === _r(l);
      s(e, {
        replace: p,
        state: o,
        preventScrollReset: i,
        relative: a
      });
    }
  }, [u, s, l, n, o, r, e, i, a]);
}
function yI(e) {
  process.env.NODE_ENV !== "production" && Cm(typeof URLSearchParams < "u", "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params\n\nIf you're unsure how to load polyfills, we recommend you check out https://polyfill.io/v3/ which provides some recommendations about how to load polyfills only for users that need them, instead of for every user.");
  let t = b.useRef(ga(e)), r = et(), n = b.useMemo(() => wm(r.search, t.current), [r.search]), o = qo(), i = b.useCallback((a, s) => {
    const u = ga(typeof a == "function" ? a(n) : a);
    o("?" + u, s);
  }, [o, n]);
  return [n, i];
}
function Am(e, t) {
  let {
    router: r
  } = Pm(ba.UseSubmitImpl), n = mp();
  return b.useCallback(function(o, i) {
    if (i === void 0 && (i = {}), typeof document > "u")
      throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
    let {
      method: a,
      encType: s,
      formData: u,
      url: l
    } = Em(o, n, i), f = l.pathname + l.search, p = {
      replace: i.replace,
      formData: u,
      formMethod: a,
      formEncType: s
    };
    e ? (t == null && (process.env.NODE_ENV !== "production" ? M(!1, "No routeId available for useFetcher()") : M(!1)), r.fetch(e, t, f, p)) : r.navigate(f, p);
  }, [n, r, e, t]);
}
function mp(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t, {
    basename: n
  } = b.useContext(Vt), o = b.useContext(Ie);
  o || (process.env.NODE_ENV !== "production" ? M(!1, "useFormAction must be used inside a RouteContext") : M(!1));
  let [i] = o.matches.slice(-1), a = Yt({}, Jo(e || ".", {
    relative: r
  })), s = et();
  if (e == null && (a.search = s.search, a.hash = s.hash, i.route.index)) {
    let u = new URLSearchParams(a.search);
    u.delete("index"), a.search = u.toString() ? "?" + u.toString() : "";
  }
  return (!e || e === ".") && i.route.index && (a.search = a.search ? a.search.replace(/^\?/, "?index&") : "?index"), n !== "/" && (a.pathname = a.pathname === "/" ? n : Je([n, a.pathname])), _r(a);
}
function gI(e) {
  b.useEffect(() => (window.addEventListener("beforeunload", e), () => {
    window.removeEventListener("beforeunload", e);
  }), [e]);
}
function Cm(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
var Nm = typeof global == "object" && global && global.Object === Object && global;
const yp = Nm;
var Dm = typeof self == "object" && self && self.Object === Object && self, Lm = yp || Dm || Function("return this")();
const Fe = Lm;
var Im = Fe.Symbol;
const kt = Im;
var gp = Object.prototype, Fm = gp.hasOwnProperty, km = gp.toString, rn = kt ? kt.toStringTag : void 0;
function Um(e) {
  var t = Fm.call(e, rn), r = e[rn];
  try {
    e[rn] = void 0;
    var n = !0;
  } catch {
  }
  var o = km.call(e);
  return n && (t ? e[rn] = r : delete e[rn]), o;
}
var $m = Object.prototype, Bm = $m.toString;
function Mm(e) {
  return Bm.call(e);
}
var zm = "[object Null]", Vm = "[object Undefined]", nc = kt ? kt.toStringTag : void 0;
function ar(e) {
  return e == null ? e === void 0 ? Vm : zm : nc && nc in Object(e) ? Um(e) : Mm(e);
}
function Ut(e) {
  return e != null && typeof e == "object";
}
var Wm = "[object Symbol]";
function Go(e) {
  return typeof e == "symbol" || Ut(e) && ar(e) == Wm;
}
function Hm(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, o = Array(n); ++r < n; )
    o[r] = t(e[r], r, e);
  return o;
}
var qm = Array.isArray;
const Ce = qm;
var Jm = 1 / 0, oc = kt ? kt.prototype : void 0, ic = oc ? oc.toString : void 0;
function bp(e) {
  if (typeof e == "string")
    return e;
  if (Ce(e))
    return Hm(e, bp) + "";
  if (Go(e))
    return ic ? ic.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -Jm ? "-0" : t;
}
var Km = /\s/;
function Gm(e) {
  for (var t = e.length; t-- && Km.test(e.charAt(t)); )
    ;
  return t;
}
var Ym = /^\s+/;
function Xm(e) {
  return e && e.slice(0, Gm(e) + 1).replace(Ym, "");
}
function Ne(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var ac = 0 / 0, Zm = /^[-+]0x[0-9a-f]+$/i, Qm = /^0b[01]+$/i, ey = /^0o[0-7]+$/i, ty = parseInt;
function sc(e) {
  if (typeof e == "number")
    return e;
  if (Go(e))
    return ac;
  if (Ne(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = Ne(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = Xm(e);
  var r = Qm.test(e);
  return r || ey.test(e) ? ty(e.slice(2), r ? 2 : 8) : Zm.test(e) ? ac : +e;
}
function As(e) {
  return e;
}
var ry = "[object AsyncFunction]", ny = "[object Function]", oy = "[object GeneratorFunction]", iy = "[object Proxy]";
function Cs(e) {
  if (!Ne(e))
    return !1;
  var t = ar(e);
  return t == ny || t == oy || t == ry || t == iy;
}
var ay = Fe["__core-js_shared__"];
const Li = ay;
var uc = function() {
  var e = /[^.]+$/.exec(Li && Li.keys && Li.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function sy(e) {
  return !!uc && uc in e;
}
var uy = Function.prototype, cy = uy.toString;
function sr(e) {
  if (e != null) {
    try {
      return cy.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var ly = /[\\^$.*+?()[\]{}|]/g, fy = /^\[object .+?Constructor\]$/, py = Function.prototype, dy = Object.prototype, hy = py.toString, vy = dy.hasOwnProperty, my = RegExp(
  "^" + hy.call(vy).replace(ly, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function yy(e) {
  if (!Ne(e) || sy(e))
    return !1;
  var t = Cs(e) ? my : fy;
  return t.test(sr(e));
}
function gy(e, t) {
  return e == null ? void 0 : e[t];
}
function ur(e, t) {
  var r = gy(e, t);
  return yy(r) ? r : void 0;
}
var by = ur(Fe, "WeakMap");
const wa = by;
var cc = Object.create, wy = function() {
  function e() {
  }
  return function(t) {
    if (!Ne(t))
      return {};
    if (cc)
      return cc(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}();
const Ey = wy;
function _y(e, t, r) {
  switch (r.length) {
    case 0:
      return e.call(t);
    case 1:
      return e.call(t, r[0]);
    case 2:
      return e.call(t, r[0], r[1]);
    case 3:
      return e.call(t, r[0], r[1], r[2]);
  }
  return e.apply(t, r);
}
function Oy() {
}
function Sy(e, t) {
  var r = -1, n = e.length;
  for (t || (t = Array(n)); ++r < n; )
    t[r] = e[r];
  return t;
}
var xy = 800, Ry = 16, jy = Date.now;
function Py(e) {
  var t = 0, r = 0;
  return function() {
    var n = jy(), o = Ry - (n - r);
    if (r = n, o > 0) {
      if (++t >= xy)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function Ty(e) {
  return function() {
    return e;
  };
}
var Ay = function() {
  try {
    var e = ur(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
const xo = Ay;
var Cy = xo ? function(e, t) {
  return xo(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Ty(t),
    writable: !0
  });
} : As;
const Ny = Cy;
var Dy = Py(Ny);
const Ly = Dy;
function Iy(e, t, r, n) {
  for (var o = e.length, i = r + (n ? 1 : -1); n ? i-- : ++i < o; )
    if (t(e[i], i, e))
      return i;
  return -1;
}
function Fy(e) {
  return e !== e;
}
function ky(e, t, r) {
  for (var n = r - 1, o = e.length; ++n < o; )
    if (e[n] === t)
      return n;
  return -1;
}
function Uy(e, t, r) {
  return t === t ? ky(e, t, r) : Iy(e, Fy, r);
}
function $y(e, t) {
  var r = e == null ? 0 : e.length;
  return !!r && Uy(e, t, 0) > -1;
}
var By = 9007199254740991, My = /^(?:0|[1-9]\d*)$/;
function Ns(e, t) {
  var r = typeof e;
  return t = t ?? By, !!t && (r == "number" || r != "symbol" && My.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function Yo(e, t, r) {
  t == "__proto__" && xo ? xo(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
function Dn(e, t) {
  return e === t || e !== e && t !== t;
}
var zy = Object.prototype, Vy = zy.hasOwnProperty;
function Wy(e, t, r) {
  var n = e[t];
  (!(Vy.call(e, t) && Dn(n, r)) || r === void 0 && !(t in e)) && Yo(e, t, r);
}
function Hy(e, t, r, n) {
  var o = !r;
  r || (r = {});
  for (var i = -1, a = t.length; ++i < a; ) {
    var s = t[i], u = n ? n(r[s], e[s], s, r, e) : void 0;
    u === void 0 && (u = e[s]), o ? Yo(r, s, u) : Wy(r, s, u);
  }
  return r;
}
var lc = Math.max;
function qy(e, t, r) {
  return t = lc(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var n = arguments, o = -1, i = lc(n.length - t, 0), a = Array(i); ++o < i; )
      a[o] = n[t + o];
    o = -1;
    for (var s = Array(t + 1); ++o < t; )
      s[o] = n[o];
    return s[t] = r(a), _y(e, this, s);
  };
}
function Jy(e, t) {
  return Ly(qy(e, t, As), e + "");
}
var Ky = 9007199254740991;
function Ds(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Ky;
}
function Xo(e) {
  return e != null && Ds(e.length) && !Cs(e);
}
function Gy(e, t, r) {
  if (!Ne(r))
    return !1;
  var n = typeof t;
  return (n == "number" ? Xo(r) && Ns(t, r.length) : n == "string" && t in r) ? Dn(r[t], e) : !1;
}
function Yy(e) {
  return Jy(function(t, r) {
    var n = -1, o = r.length, i = o > 1 ? r[o - 1] : void 0, a = o > 2 ? r[2] : void 0;
    for (i = e.length > 3 && typeof i == "function" ? (o--, i) : void 0, a && Gy(r[0], r[1], a) && (i = o < 3 ? void 0 : i, o = 1), t = Object(t); ++n < o; ) {
      var s = r[n];
      s && e(t, s, n, i);
    }
    return t;
  });
}
var Xy = Object.prototype;
function Ls(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || Xy;
  return e === r;
}
function Zy(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var Qy = "[object Arguments]";
function fc(e) {
  return Ut(e) && ar(e) == Qy;
}
var wp = Object.prototype, eg = wp.hasOwnProperty, tg = wp.propertyIsEnumerable, rg = fc(function() {
  return arguments;
}()) ? fc : function(e) {
  return Ut(e) && eg.call(e, "callee") && !tg.call(e, "callee");
};
const Ro = rg;
function ng() {
  return !1;
}
var Ep = typeof exports == "object" && exports && !exports.nodeType && exports, pc = Ep && typeof module == "object" && module && !module.nodeType && module, og = pc && pc.exports === Ep, dc = og ? Fe.Buffer : void 0, ig = dc ? dc.isBuffer : void 0, ag = ig || ng;
const jo = ag;
var sg = "[object Arguments]", ug = "[object Array]", cg = "[object Boolean]", lg = "[object Date]", fg = "[object Error]", pg = "[object Function]", dg = "[object Map]", hg = "[object Number]", vg = "[object Object]", mg = "[object RegExp]", yg = "[object Set]", gg = "[object String]", bg = "[object WeakMap]", wg = "[object ArrayBuffer]", Eg = "[object DataView]", _g = "[object Float32Array]", Og = "[object Float64Array]", Sg = "[object Int8Array]", xg = "[object Int16Array]", Rg = "[object Int32Array]", jg = "[object Uint8Array]", Pg = "[object Uint8ClampedArray]", Tg = "[object Uint16Array]", Ag = "[object Uint32Array]", K = {};
K[_g] = K[Og] = K[Sg] = K[xg] = K[Rg] = K[jg] = K[Pg] = K[Tg] = K[Ag] = !0;
K[sg] = K[ug] = K[wg] = K[cg] = K[Eg] = K[lg] = K[fg] = K[pg] = K[dg] = K[hg] = K[vg] = K[mg] = K[yg] = K[gg] = K[bg] = !1;
function Cg(e) {
  return Ut(e) && Ds(e.length) && !!K[ar(e)];
}
function Ng(e) {
  return function(t) {
    return e(t);
  };
}
var _p = typeof exports == "object" && exports && !exports.nodeType && exports, pn = _p && typeof module == "object" && module && !module.nodeType && module, Dg = pn && pn.exports === _p, Ii = Dg && yp.process, Lg = function() {
  try {
    var e = pn && pn.require && pn.require("util").types;
    return e || Ii && Ii.binding && Ii.binding("util");
  } catch {
  }
}();
const hc = Lg;
var vc = hc && hc.isTypedArray, Ig = vc ? Ng(vc) : Cg;
const Is = Ig;
var Fg = Object.prototype, kg = Fg.hasOwnProperty;
function Op(e, t) {
  var r = Ce(e), n = !r && Ro(e), o = !r && !n && jo(e), i = !r && !n && !o && Is(e), a = r || n || o || i, s = a ? Zy(e.length, String) : [], u = s.length;
  for (var l in e)
    (t || kg.call(e, l)) && !(a && (l == "length" || o && (l == "offset" || l == "parent") || i && (l == "buffer" || l == "byteLength" || l == "byteOffset") || Ns(l, u))) && s.push(l);
  return s;
}
function Sp(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var Ug = Sp(Object.keys, Object);
const $g = Ug;
var Bg = Object.prototype, Mg = Bg.hasOwnProperty;
function zg(e) {
  if (!Ls(e))
    return $g(e);
  var t = [];
  for (var r in Object(e))
    Mg.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
function Fs(e) {
  return Xo(e) ? Op(e) : zg(e);
}
function Vg(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var Wg = Object.prototype, Hg = Wg.hasOwnProperty;
function qg(e) {
  if (!Ne(e))
    return Vg(e);
  var t = Ls(e), r = [];
  for (var n in e)
    n == "constructor" && (t || !Hg.call(e, n)) || r.push(n);
  return r;
}
function xp(e) {
  return Xo(e) ? Op(e, !0) : qg(e);
}
var Jg = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Kg = /^\w*$/;
function ks(e, t) {
  if (Ce(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || Go(e) ? !0 : Kg.test(e) || !Jg.test(e) || t != null && e in Object(t);
}
var Gg = ur(Object, "create");
const vn = Gg;
function Yg() {
  this.__data__ = vn ? vn(null) : {}, this.size = 0;
}
function Xg(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var Zg = "__lodash_hash_undefined__", Qg = Object.prototype, eb = Qg.hasOwnProperty;
function tb(e) {
  var t = this.__data__;
  if (vn) {
    var r = t[e];
    return r === Zg ? void 0 : r;
  }
  return eb.call(t, e) ? t[e] : void 0;
}
var rb = Object.prototype, nb = rb.hasOwnProperty;
function ob(e) {
  var t = this.__data__;
  return vn ? t[e] !== void 0 : nb.call(t, e);
}
var ib = "__lodash_hash_undefined__";
function ab(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = vn && t === void 0 ? ib : t, this;
}
function Xt(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Xt.prototype.clear = Yg;
Xt.prototype.delete = Xg;
Xt.prototype.get = tb;
Xt.prototype.has = ob;
Xt.prototype.set = ab;
function sb() {
  this.__data__ = [], this.size = 0;
}
function Zo(e, t) {
  for (var r = e.length; r--; )
    if (Dn(e[r][0], t))
      return r;
  return -1;
}
var ub = Array.prototype, cb = ub.splice;
function lb(e) {
  var t = this.__data__, r = Zo(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : cb.call(t, r, 1), --this.size, !0;
}
function fb(e) {
  var t = this.__data__, r = Zo(t, e);
  return r < 0 ? void 0 : t[r][1];
}
function pb(e) {
  return Zo(this.__data__, e) > -1;
}
function db(e, t) {
  var r = this.__data__, n = Zo(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
function tt(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
tt.prototype.clear = sb;
tt.prototype.delete = lb;
tt.prototype.get = fb;
tt.prototype.has = pb;
tt.prototype.set = db;
var hb = ur(Fe, "Map");
const mn = hb;
function vb() {
  this.size = 0, this.__data__ = {
    hash: new Xt(),
    map: new (mn || tt)(),
    string: new Xt()
  };
}
function mb(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function Qo(e, t) {
  var r = e.__data__;
  return mb(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
function yb(e) {
  var t = Qo(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function gb(e) {
  return Qo(this, e).get(e);
}
function bb(e) {
  return Qo(this, e).has(e);
}
function wb(e, t) {
  var r = Qo(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
function rt(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
rt.prototype.clear = vb;
rt.prototype.delete = yb;
rt.prototype.get = gb;
rt.prototype.has = bb;
rt.prototype.set = wb;
var Eb = "Expected a function";
function Us(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Eb);
  var r = function() {
    var n = arguments, o = t ? t.apply(this, n) : n[0], i = r.cache;
    if (i.has(o))
      return i.get(o);
    var a = e.apply(this, n);
    return r.cache = i.set(o, a) || i, a;
  };
  return r.cache = new (Us.Cache || rt)(), r;
}
Us.Cache = rt;
var _b = 500;
function Ob(e) {
  var t = Us(e, function(n) {
    return r.size === _b && r.clear(), n;
  }), r = t.cache;
  return t;
}
var Sb = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, xb = /\\(\\)?/g, Rb = Ob(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(Sb, function(r, n, o, i) {
    t.push(o ? i.replace(xb, "$1") : n || r);
  }), t;
});
const jb = Rb;
function Pb(e) {
  return e == null ? "" : bp(e);
}
function Rp(e, t) {
  return Ce(e) ? e : ks(e, t) ? [e] : jb(Pb(e));
}
var Tb = 1 / 0;
function ei(e) {
  if (typeof e == "string" || Go(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -Tb ? "-0" : t;
}
function jp(e, t) {
  t = Rp(t, e);
  for (var r = 0, n = t.length; e != null && r < n; )
    e = e[ei(t[r++])];
  return r && r == n ? e : void 0;
}
function Ab(e, t, r) {
  var n = e == null ? void 0 : jp(e, t);
  return n === void 0 ? r : n;
}
function Cb(e, t) {
  for (var r = -1, n = t.length, o = e.length; ++r < n; )
    e[o + r] = t[r];
  return e;
}
var Nb = Sp(Object.getPrototypeOf, Object);
const Pp = Nb;
var Db = "[object Object]", Lb = Function.prototype, Ib = Object.prototype, Tp = Lb.toString, Fb = Ib.hasOwnProperty, kb = Tp.call(Object);
function Ub(e) {
  if (!Ut(e) || ar(e) != Db)
    return !1;
  var t = Pp(e);
  if (t === null)
    return !0;
  var r = Fb.call(t, "constructor") && t.constructor;
  return typeof r == "function" && r instanceof r && Tp.call(r) == kb;
}
function $b() {
  this.__data__ = new tt(), this.size = 0;
}
function Bb(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
function Mb(e) {
  return this.__data__.get(e);
}
function zb(e) {
  return this.__data__.has(e);
}
var Vb = 200;
function Wb(e, t) {
  var r = this.__data__;
  if (r instanceof tt) {
    var n = r.__data__;
    if (!mn || n.length < Vb - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new rt(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
function Me(e) {
  var t = this.__data__ = new tt(e);
  this.size = t.size;
}
Me.prototype.clear = $b;
Me.prototype.delete = Bb;
Me.prototype.get = Mb;
Me.prototype.has = zb;
Me.prototype.set = Wb;
var Ap = typeof exports == "object" && exports && !exports.nodeType && exports, mc = Ap && typeof module == "object" && module && !module.nodeType && module, Hb = mc && mc.exports === Ap, yc = Hb ? Fe.Buffer : void 0, gc = yc ? yc.allocUnsafe : void 0;
function qb(e, t) {
  if (t)
    return e.slice();
  var r = e.length, n = gc ? gc(r) : new e.constructor(r);
  return e.copy(n), n;
}
function Jb(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, o = 0, i = []; ++r < n; ) {
    var a = e[r];
    t(a, r, e) && (i[o++] = a);
  }
  return i;
}
function Kb() {
  return [];
}
var Gb = Object.prototype, Yb = Gb.propertyIsEnumerable, bc = Object.getOwnPropertySymbols, Xb = bc ? function(e) {
  return e == null ? [] : (e = Object(e), Jb(bc(e), function(t) {
    return Yb.call(e, t);
  }));
} : Kb;
const Zb = Xb;
function Qb(e, t, r) {
  var n = t(e);
  return Ce(e) ? n : Cb(n, r(e));
}
function wc(e) {
  return Qb(e, Fs, Zb);
}
var ew = ur(Fe, "DataView");
const Ea = ew;
var tw = ur(Fe, "Promise");
const _a = tw;
var rw = ur(Fe, "Set");
const br = rw;
var Ec = "[object Map]", nw = "[object Object]", _c = "[object Promise]", Oc = "[object Set]", Sc = "[object WeakMap]", xc = "[object DataView]", ow = sr(Ea), iw = sr(mn), aw = sr(_a), sw = sr(br), uw = sr(wa), qt = ar;
(Ea && qt(new Ea(new ArrayBuffer(1))) != xc || mn && qt(new mn()) != Ec || _a && qt(_a.resolve()) != _c || br && qt(new br()) != Oc || wa && qt(new wa()) != Sc) && (qt = function(e) {
  var t = ar(e), r = t == nw ? e.constructor : void 0, n = r ? sr(r) : "";
  if (n)
    switch (n) {
      case ow:
        return xc;
      case iw:
        return Ec;
      case aw:
        return _c;
      case sw:
        return Oc;
      case uw:
        return Sc;
    }
  return t;
});
const Rc = qt;
var cw = Fe.Uint8Array;
const Po = cw;
function lw(e) {
  var t = new e.constructor(e.byteLength);
  return new Po(t).set(new Po(e)), t;
}
function fw(e, t) {
  var r = t ? lw(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
function pw(e) {
  return typeof e.constructor == "function" && !Ls(e) ? Ey(Pp(e)) : {};
}
var dw = "__lodash_hash_undefined__";
function hw(e) {
  return this.__data__.set(e, dw), this;
}
function vw(e) {
  return this.__data__.has(e);
}
function yn(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.__data__ = new rt(); ++t < r; )
    this.add(e[t]);
}
yn.prototype.add = yn.prototype.push = hw;
yn.prototype.has = vw;
function mw(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
    if (t(e[r], r, e))
      return !0;
  return !1;
}
function Cp(e, t) {
  return e.has(t);
}
var yw = 1, gw = 2;
function Np(e, t, r, n, o, i) {
  var a = r & yw, s = e.length, u = t.length;
  if (s != u && !(a && u > s))
    return !1;
  var l = i.get(e), f = i.get(t);
  if (l && f)
    return l == t && f == e;
  var p = -1, d = !0, h = r & gw ? new yn() : void 0;
  for (i.set(e, t), i.set(t, e); ++p < s; ) {
    var m = e[p], y = t[p];
    if (n)
      var _ = a ? n(y, m, p, t, e, i) : n(m, y, p, e, t, i);
    if (_ !== void 0) {
      if (_)
        continue;
      d = !1;
      break;
    }
    if (h) {
      if (!mw(t, function(j, L) {
        if (!Cp(h, L) && (m === j || o(m, j, r, n, i)))
          return h.push(L);
      })) {
        d = !1;
        break;
      }
    } else if (!(m === y || o(m, y, r, n, i))) {
      d = !1;
      break;
    }
  }
  return i.delete(e), i.delete(t), d;
}
function bw(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n, o) {
    r[++t] = [o, n];
  }), r;
}
function $s(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n) {
    r[++t] = n;
  }), r;
}
var ww = 1, Ew = 2, _w = "[object Boolean]", Ow = "[object Date]", Sw = "[object Error]", xw = "[object Map]", Rw = "[object Number]", jw = "[object RegExp]", Pw = "[object Set]", Tw = "[object String]", Aw = "[object Symbol]", Cw = "[object ArrayBuffer]", Nw = "[object DataView]", jc = kt ? kt.prototype : void 0, Fi = jc ? jc.valueOf : void 0;
function Dw(e, t, r, n, o, i, a) {
  switch (r) {
    case Nw:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case Cw:
      return !(e.byteLength != t.byteLength || !i(new Po(e), new Po(t)));
    case _w:
    case Ow:
    case Rw:
      return Dn(+e, +t);
    case Sw:
      return e.name == t.name && e.message == t.message;
    case jw:
    case Tw:
      return e == t + "";
    case xw:
      var s = bw;
    case Pw:
      var u = n & ww;
      if (s || (s = $s), e.size != t.size && !u)
        return !1;
      var l = a.get(e);
      if (l)
        return l == t;
      n |= Ew, a.set(e, t);
      var f = Np(s(e), s(t), n, o, i, a);
      return a.delete(e), f;
    case Aw:
      if (Fi)
        return Fi.call(e) == Fi.call(t);
  }
  return !1;
}
var Lw = 1, Iw = Object.prototype, Fw = Iw.hasOwnProperty;
function kw(e, t, r, n, o, i) {
  var a = r & Lw, s = wc(e), u = s.length, l = wc(t), f = l.length;
  if (u != f && !a)
    return !1;
  for (var p = u; p--; ) {
    var d = s[p];
    if (!(a ? d in t : Fw.call(t, d)))
      return !1;
  }
  var h = i.get(e), m = i.get(t);
  if (h && m)
    return h == t && m == e;
  var y = !0;
  i.set(e, t), i.set(t, e);
  for (var _ = a; ++p < u; ) {
    d = s[p];
    var j = e[d], L = t[d];
    if (n)
      var w = a ? n(L, j, d, t, e, i) : n(j, L, d, e, t, i);
    if (!(w === void 0 ? j === L || o(j, L, r, n, i) : w)) {
      y = !1;
      break;
    }
    _ || (_ = d == "constructor");
  }
  if (y && !_) {
    var O = e.constructor, D = t.constructor;
    O != D && "constructor" in e && "constructor" in t && !(typeof O == "function" && O instanceof O && typeof D == "function" && D instanceof D) && (y = !1);
  }
  return i.delete(e), i.delete(t), y;
}
var Uw = 1, Pc = "[object Arguments]", Tc = "[object Array]", Kn = "[object Object]", $w = Object.prototype, Ac = $w.hasOwnProperty;
function Bw(e, t, r, n, o, i) {
  var a = Ce(e), s = Ce(t), u = a ? Tc : Rc(e), l = s ? Tc : Rc(t);
  u = u == Pc ? Kn : u, l = l == Pc ? Kn : l;
  var f = u == Kn, p = l == Kn, d = u == l;
  if (d && jo(e)) {
    if (!jo(t))
      return !1;
    a = !0, f = !1;
  }
  if (d && !f)
    return i || (i = new Me()), a || Is(e) ? Np(e, t, r, n, o, i) : Dw(e, t, u, r, n, o, i);
  if (!(r & Uw)) {
    var h = f && Ac.call(e, "__wrapped__"), m = p && Ac.call(t, "__wrapped__");
    if (h || m) {
      var y = h ? e.value() : e, _ = m ? t.value() : t;
      return i || (i = new Me()), o(y, _, r, n, i);
    }
  }
  return d ? (i || (i = new Me()), kw(e, t, r, n, o, i)) : !1;
}
function Bs(e, t, r, n, o) {
  return e === t ? !0 : e == null || t == null || !Ut(e) && !Ut(t) ? e !== e && t !== t : Bw(e, t, r, n, Bs, o);
}
var Mw = 1, zw = 2;
function Vw(e, t, r, n) {
  var o = r.length, i = o, a = !n;
  if (e == null)
    return !i;
  for (e = Object(e); o--; ) {
    var s = r[o];
    if (a && s[2] ? s[1] !== e[s[0]] : !(s[0] in e))
      return !1;
  }
  for (; ++o < i; ) {
    s = r[o];
    var u = s[0], l = e[u], f = s[1];
    if (a && s[2]) {
      if (l === void 0 && !(u in e))
        return !1;
    } else {
      var p = new Me();
      if (n)
        var d = n(l, f, u, e, t, p);
      if (!(d === void 0 ? Bs(f, l, Mw | zw, n, p) : d))
        return !1;
    }
  }
  return !0;
}
function Dp(e) {
  return e === e && !Ne(e);
}
function Ww(e) {
  for (var t = Fs(e), r = t.length; r--; ) {
    var n = t[r], o = e[n];
    t[r] = [n, o, Dp(o)];
  }
  return t;
}
function Lp(e, t) {
  return function(r) {
    return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
  };
}
function Hw(e) {
  var t = Ww(e);
  return t.length == 1 && t[0][2] ? Lp(t[0][0], t[0][1]) : function(r) {
    return r === e || Vw(r, e, t);
  };
}
function qw(e, t) {
  return e != null && t in Object(e);
}
function Jw(e, t, r) {
  t = Rp(t, e);
  for (var n = -1, o = t.length, i = !1; ++n < o; ) {
    var a = ei(t[n]);
    if (!(i = e != null && r(e, a)))
      break;
    e = e[a];
  }
  return i || ++n != o ? i : (o = e == null ? 0 : e.length, !!o && Ds(o) && Ns(a, o) && (Ce(e) || Ro(e)));
}
function Kw(e, t) {
  return e != null && Jw(e, t, qw);
}
var Gw = 1, Yw = 2;
function Xw(e, t) {
  return ks(e) && Dp(t) ? Lp(ei(e), t) : function(r) {
    var n = Ab(r, e);
    return n === void 0 && n === t ? Kw(r, e) : Bs(t, n, Gw | Yw);
  };
}
function Zw(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function Qw(e) {
  return function(t) {
    return jp(t, e);
  };
}
function eE(e) {
  return ks(e) ? Zw(ei(e)) : Qw(e);
}
function Ip(e) {
  return typeof e == "function" ? e : e == null ? As : typeof e == "object" ? Ce(e) ? Xw(e[0], e[1]) : Hw(e) : eE(e);
}
function tE(e) {
  return function(t, r, n) {
    for (var o = -1, i = Object(t), a = n(t), s = a.length; s--; ) {
      var u = a[e ? s : ++o];
      if (r(i[u], u, i) === !1)
        break;
    }
    return t;
  };
}
var rE = tE();
const Fp = rE;
function nE(e, t) {
  return e && Fp(e, t, Fs);
}
var oE = function() {
  return Fe.Date.now();
};
const ki = oE;
var iE = "Expected a function", aE = Math.max, sE = Math.min;
function uE(e, t, r) {
  var n, o, i, a, s, u, l = 0, f = !1, p = !1, d = !0;
  if (typeof e != "function")
    throw new TypeError(iE);
  t = sc(t) || 0, Ne(r) && (f = !!r.leading, p = "maxWait" in r, i = p ? aE(sc(r.maxWait) || 0, t) : i, d = "trailing" in r ? !!r.trailing : d);
  function h(N) {
    var U = n, I = o;
    return n = o = void 0, l = N, a = e.apply(I, U), a;
  }
  function m(N) {
    return l = N, s = setTimeout(j, t), f ? h(N) : a;
  }
  function y(N) {
    var U = N - u, I = N - l, $ = t - U;
    return p ? sE($, i - I) : $;
  }
  function _(N) {
    var U = N - u, I = N - l;
    return u === void 0 || U >= t || U < 0 || p && I >= i;
  }
  function j() {
    var N = ki();
    if (_(N))
      return L(N);
    s = setTimeout(j, y(N));
  }
  function L(N) {
    return s = void 0, d && n ? h(N) : (n = o = void 0, a);
  }
  function w() {
    s !== void 0 && clearTimeout(s), l = 0, n = u = o = s = void 0;
  }
  function O() {
    return s === void 0 ? a : L(ki());
  }
  function D() {
    var N = ki(), U = _(N);
    if (n = arguments, o = this, u = N, U) {
      if (s === void 0)
        return m(u);
      if (p)
        return clearTimeout(s), s = setTimeout(j, t), h(u);
    }
    return s === void 0 && (s = setTimeout(j, t)), a;
  }
  return D.cancel = w, D.flush = O, D;
}
function Oa(e, t, r) {
  (r !== void 0 && !Dn(e[t], r) || r === void 0 && !(t in e)) && Yo(e, t, r);
}
function cE(e) {
  return Ut(e) && Xo(e);
}
function Sa(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function lE(e) {
  return Hy(e, xp(e));
}
function fE(e, t, r, n, o, i, a) {
  var s = Sa(e, r), u = Sa(t, r), l = a.get(u);
  if (l) {
    Oa(e, r, l);
    return;
  }
  var f = i ? i(s, u, r + "", e, t, a) : void 0, p = f === void 0;
  if (p) {
    var d = Ce(u), h = !d && jo(u), m = !d && !h && Is(u);
    f = u, d || h || m ? Ce(s) ? f = s : cE(s) ? f = Sy(s) : h ? (p = !1, f = qb(u, !0)) : m ? (p = !1, f = fw(u, !0)) : f = [] : Ub(u) || Ro(u) ? (f = s, Ro(s) ? f = lE(s) : (!Ne(s) || Cs(s)) && (f = pw(u))) : p = !1;
  }
  p && (a.set(u, f), o(f, u, n, i, a), a.delete(u)), Oa(e, r, f);
}
function kp(e, t, r, n, o) {
  e !== t && Fp(t, function(i, a) {
    if (o || (o = new Me()), Ne(i))
      fE(e, t, a, r, kp, n, o);
    else {
      var s = n ? n(Sa(e, a), i, a + "", e, t, o) : void 0;
      s === void 0 && (s = i), Oa(e, a, s);
    }
  }, xp);
}
function pE(e, t, r) {
  for (var n = -1, o = e == null ? 0 : e.length; ++n < o; )
    if (r(t, e[n]))
      return !0;
  return !1;
}
function dE(e, t) {
  var r = {};
  return t = Ip(t), nE(e, function(n, o, i) {
    Yo(r, o, t(n, o, i));
  }), r;
}
var hE = Yy(function(e, t, r) {
  kp(e, t, r);
});
const vE = hE;
var mE = 1 / 0, yE = br && 1 / $s(new br([, -0]))[1] == mE ? function(e) {
  return new br(e);
} : Oy;
const gE = yE;
var bE = 200;
function wE(e, t, r) {
  var n = -1, o = $y, i = e.length, a = !0, s = [], u = s;
  if (r)
    a = !1, o = pE;
  else if (i >= bE) {
    var l = t ? null : gE(e);
    if (l)
      return $s(l);
    a = !1, o = Cp, u = new yn();
  } else
    u = t ? [] : s;
  e:
    for (; ++n < i; ) {
      var f = e[n], p = t ? t(f) : f;
      if (f = r || f !== 0 ? f : 0, a && p === p) {
        for (var d = u.length; d--; )
          if (u[d] === p)
            continue e;
        t && u.push(p), s.push(f);
      } else
        o(u, p, r) || (u !== s && u.push(p), s.push(f));
    }
  return s;
}
function EE(e, t) {
  return e && e.length ? wE(e, Ip(t)) : [];
}
var xa = /* @__PURE__ */ ((e) => (e.Json = "application/json", e.UrlEncoded = "application/x-www-form-urlencoded", e))(xa || {});
class _E {
  constructor() {
    pe(this, "listeners");
    this.listeners = {};
  }
  trigger(t, ...r) {
    var n;
    (n = this.listeners[t]) == null || n.map((o) => o(...r));
  }
  on(t, r) {
    var n;
    return this.listeners[t] ? (n = this.listeners[t]) == null || n.push(r) : this.listeners[t] = [r], () => {
      this.off(t, r);
    };
  }
  off(t, r) {
    var n, o;
    if (this.listeners[t]) {
      const i = (n = this.listeners[t]) == null ? void 0 : n.findIndex((a) => a === r);
      i && i > -1 && ((o = this.listeners[t]) == null || o.splice(i, 1));
    } else
      throw new Error(`${this} is doesn't have event "${String(t)}"`);
  }
}
function Cc(e) {
  for (const t in e)
    Object.prototype.hasOwnProperty.call(e, t) && e[t] === void 0 && delete e[t];
  return e;
}
function bI(e) {
  for (const t in e)
    Object.prototype.hasOwnProperty.call(e, t) && delete e[t];
  return e;
}
function wI(e) {
  for (const t in e)
    Object.prototype.hasOwnProperty.call(e, t) && (e[t] = void 0);
  return e;
}
const EI = /(^[0-9]{9,16}$)\b/g, _I = /^[a-z0-9\-\d@._]+$/, OI = /^(?=.*[a-z])(?=.*?[A-Z])(?=.*[@$!%*#?&])[a-zA-Z@$!%*#?&\d]{8,32}$/g;
function SI(e) {
  return !/[^\x00-\x7F]/.test(e);
}
const Ra = (e, t = "", r = new FormData()) => (Object.keys(e).forEach((n) => {
  const o = t !== "" ? t + "." + n : n, i = e[n];
  Array.isArray(i) ? i.forEach((a, s) => {
    typeof a == "object" ? a instanceof File ? r.append(o, a) : r = Ra(a, o + `[${s}]`, r) : r.append(o, a);
  }) : typeof i == "object" ? i instanceof File ? r.append(o, i) : r = Ra(i, o, r) : r.append(o, i);
}), r), To = (e, t = "", r = new URLSearchParams()) => (Object.keys(e).forEach((n) => {
  const o = t !== "" ? t + "." + n : n, i = e[n];
  Array.isArray(i) ? i.forEach((a, s) => {
    typeof a == "object" ? r = To(a, o + `[${s}]`, r) : r.append(o, a);
  }) : typeof i == "object" ? r = To(i, o, r) : r.append(o, i);
}), r);
class OE {
  constructor() {
    pe(this, "modeEnv");
    pe(this, "subdomain");
  }
  setConfig({ modeEnv: t, subdomain: r }) {
    this.modeEnv = t || void 0, this.subdomain = r || void 0;
  }
  getConfig() {
    return {
      modEnv: this.modeEnv,
      subdomain: this.subdomain
    };
  }
}
const ja = new OE();
class Up {
  getToken(t) {
    if (this.getPrefix())
      return localStorage.getItem(`${this.getPrefix()}_${t}`) || "";
  }
  setToken(t, r) {
    if (this.getPrefix())
      return localStorage.setItem(`${this.getPrefix()}_${t}`, r);
  }
  getPrefix() {
    const t = ja.getConfig().modEnv, r = ja.getConfig().subdomain;
    return !t || !r ? "" : `${t}_${r}`;
  }
}
const ro = new Up(), xI = new Up();
function RI(e, t) {
  return new Proxy(e, {
    set(r, n, o) {
      return r[n] = o, t(r), !0;
    }
  });
}
function Nc(e) {
  let t = "";
  const r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n = r.length;
  for (let o = 0; o < e; o++)
    t += r.charAt(Math.floor(Math.random() * n));
  return t;
}
function $p(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Bp } = Object.prototype, { getPrototypeOf: Ms } = Object, zs = ((e) => (t) => {
  const r = Bp.call(t);
  return e[r] || (e[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), nt = (e) => (e = e.toLowerCase(), (t) => zs(t) === e), ti = (e) => (t) => typeof t === e, { isArray: Cr } = Array, gn = ti("undefined");
function SE(e) {
  return e !== null && !gn(e) && e.constructor !== null && !gn(e.constructor) && Zt(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Mp = nt("ArrayBuffer");
function xE(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Mp(e.buffer), t;
}
const RE = ti("string"), Zt = ti("function"), zp = ti("number"), Vs = (e) => e !== null && typeof e == "object", jE = (e) => e === !0 || e === !1, no = (e) => {
  if (zs(e) !== "object")
    return !1;
  const t = Ms(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, PE = nt("Date"), TE = nt("File"), AE = nt("Blob"), CE = nt("FileList"), NE = (e) => Vs(e) && Zt(e.pipe), DE = (e) => {
  const t = "[object FormData]";
  return e && (typeof FormData == "function" && e instanceof FormData || Bp.call(e) === t || Zt(e.toString) && e.toString() === t);
}, LE = nt("URLSearchParams"), IE = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Ln(e, t, { allOwnKeys: r = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let n, o;
  if (typeof e != "object" && (e = [e]), Cr(e))
    for (n = 0, o = e.length; n < o; n++)
      t.call(null, e[n], n, e);
  else {
    const i = r ? Object.getOwnPropertyNames(e) : Object.keys(e), a = i.length;
    let s;
    for (n = 0; n < a; n++)
      s = i[n], t.call(null, e[s], s, e);
  }
}
function Vp(e, t) {
  t = t.toLowerCase();
  const r = Object.keys(e);
  let n = r.length, o;
  for (; n-- > 0; )
    if (o = r[n], t === o.toLowerCase())
      return o;
  return null;
}
const Wp = typeof self > "u" ? typeof global > "u" ? globalThis : global : self, Hp = (e) => !gn(e) && e !== Wp;
function Pa() {
  const { caseless: e } = Hp(this) && this || {}, t = {}, r = (n, o) => {
    const i = e && Vp(t, o) || o;
    no(t[i]) && no(n) ? t[i] = Pa(t[i], n) : no(n) ? t[i] = Pa({}, n) : Cr(n) ? t[i] = n.slice() : t[i] = n;
  };
  for (let n = 0, o = arguments.length; n < o; n++)
    arguments[n] && Ln(arguments[n], r);
  return t;
}
const FE = (e, t, r, { allOwnKeys: n } = {}) => (Ln(t, (o, i) => {
  r && Zt(o) ? e[i] = $p(o, r) : e[i] = o;
}, { allOwnKeys: n }), e), kE = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), UE = (e, t, r, n) => {
  e.prototype = Object.create(t.prototype, n), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), r && Object.assign(e.prototype, r);
}, $E = (e, t, r, n) => {
  let o, i, a;
  const s = {};
  if (t = t || {}, e == null)
    return t;
  do {
    for (o = Object.getOwnPropertyNames(e), i = o.length; i-- > 0; )
      a = o[i], (!n || n(a, e, t)) && !s[a] && (t[a] = e[a], s[a] = !0);
    e = r !== !1 && Ms(e);
  } while (e && (!r || r(e, t)) && e !== Object.prototype);
  return t;
}, BE = (e, t, r) => {
  e = String(e), (r === void 0 || r > e.length) && (r = e.length), r -= t.length;
  const n = e.indexOf(t, r);
  return n !== -1 && n === r;
}, ME = (e) => {
  if (!e)
    return null;
  if (Cr(e))
    return e;
  let t = e.length;
  if (!zp(t))
    return null;
  const r = new Array(t);
  for (; t-- > 0; )
    r[t] = e[t];
  return r;
}, zE = ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Ms(Uint8Array)), VE = (e, t) => {
  const n = (e && e[Symbol.iterator]).call(e);
  let o;
  for (; (o = n.next()) && !o.done; ) {
    const i = o.value;
    t.call(e, i[0], i[1]);
  }
}, WE = (e, t) => {
  let r;
  const n = [];
  for (; (r = e.exec(t)) !== null; )
    n.push(r);
  return n;
}, HE = nt("HTMLFormElement"), qE = (e) => e.toLowerCase().replace(
  /[_-\s]([a-z\d])(\w*)/g,
  function(r, n, o) {
    return n.toUpperCase() + o;
  }
), Dc = (({ hasOwnProperty: e }) => (t, r) => e.call(t, r))(Object.prototype), JE = nt("RegExp"), qp = (e, t) => {
  const r = Object.getOwnPropertyDescriptors(e), n = {};
  Ln(r, (o, i) => {
    t(o, i, e) !== !1 && (n[i] = o);
  }), Object.defineProperties(e, n);
}, KE = (e) => {
  qp(e, (t, r) => {
    if (Zt(e) && ["arguments", "caller", "callee"].indexOf(r) !== -1)
      return !1;
    const n = e[r];
    if (Zt(n)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + r + "'");
      });
    }
  });
}, GE = (e, t) => {
  const r = {}, n = (o) => {
    o.forEach((i) => {
      r[i] = !0;
    });
  };
  return Cr(e) ? n(e) : n(String(e).split(t)), r;
}, YE = () => {
}, XE = (e, t) => (e = +e, Number.isFinite(e) ? e : t), ZE = (e) => {
  const t = new Array(10), r = (n, o) => {
    if (Vs(n)) {
      if (t.indexOf(n) >= 0)
        return;
      if (!("toJSON" in n)) {
        t[o] = n;
        const i = Cr(n) ? [] : {};
        return Ln(n, (a, s) => {
          const u = r(a, o + 1);
          !gn(u) && (i[s] = u);
        }), t[o] = void 0, i;
      }
    }
    return n;
  };
  return r(e, 0);
}, S = {
  isArray: Cr,
  isArrayBuffer: Mp,
  isBuffer: SE,
  isFormData: DE,
  isArrayBufferView: xE,
  isString: RE,
  isNumber: zp,
  isBoolean: jE,
  isObject: Vs,
  isPlainObject: no,
  isUndefined: gn,
  isDate: PE,
  isFile: TE,
  isBlob: AE,
  isRegExp: JE,
  isFunction: Zt,
  isStream: NE,
  isURLSearchParams: LE,
  isTypedArray: zE,
  isFileList: CE,
  forEach: Ln,
  merge: Pa,
  extend: FE,
  trim: IE,
  stripBOM: kE,
  inherits: UE,
  toFlatObject: $E,
  kindOf: zs,
  kindOfTest: nt,
  endsWith: BE,
  toArray: ME,
  forEachEntry: VE,
  matchAll: WE,
  isHTMLForm: HE,
  hasOwnProperty: Dc,
  hasOwnProp: Dc,
  reduceDescriptors: qp,
  freezeMethods: KE,
  toObjectSet: GE,
  toCamelCase: qE,
  noop: YE,
  toFiniteNumber: XE,
  findKey: Vp,
  global: Wp,
  isContextDefined: Hp,
  toJSONObject: ZE
};
function z(e, t, r, n, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), r && (this.config = r), n && (this.request = n), o && (this.response = o);
}
S.inherits(z, Error, {
  toJSON: function() {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: S.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const Jp = z.prototype, Kp = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
].forEach((e) => {
  Kp[e] = { value: e };
});
Object.defineProperties(z, Kp);
Object.defineProperty(Jp, "isAxiosError", { value: !0 });
z.from = (e, t, r, n, o, i) => {
  const a = Object.create(Jp);
  return S.toFlatObject(e, a, function(u) {
    return u !== Error.prototype;
  }, (s) => s !== "isAxiosError"), z.call(a, e.message, t, r, n, o), a.cause = e, a.name = e.name, i && Object.assign(a, i), a;
};
var QE = typeof self == "object" ? self.FormData : window.FormData;
const e_ = QE;
function Ta(e) {
  return S.isPlainObject(e) || S.isArray(e);
}
function Gp(e) {
  return S.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Lc(e, t, r) {
  return e ? e.concat(t).map(function(o, i) {
    return o = Gp(o), !r && i ? "[" + o + "]" : o;
  }).join(r ? "." : "") : t;
}
function t_(e) {
  return S.isArray(e) && !e.some(Ta);
}
const r_ = S.toFlatObject(S, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function n_(e) {
  return e && S.isFunction(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator];
}
function ri(e, t, r) {
  if (!S.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new (e_ || FormData)(), r = S.toFlatObject(r, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(y, _) {
    return !S.isUndefined(_[y]);
  });
  const n = r.metaTokens, o = r.visitor || f, i = r.dots, a = r.indexes, u = (r.Blob || typeof Blob < "u" && Blob) && n_(t);
  if (!S.isFunction(o))
    throw new TypeError("visitor must be a function");
  function l(m) {
    if (m === null)
      return "";
    if (S.isDate(m))
      return m.toISOString();
    if (!u && S.isBlob(m))
      throw new z("Blob is not supported. Use a Buffer instead.");
    return S.isArrayBuffer(m) || S.isTypedArray(m) ? u && typeof Blob == "function" ? new Blob([m]) : Buffer.from(m) : m;
  }
  function f(m, y, _) {
    let j = m;
    if (m && !_ && typeof m == "object") {
      if (S.endsWith(y, "{}"))
        y = n ? y : y.slice(0, -2), m = JSON.stringify(m);
      else if (S.isArray(m) && t_(m) || S.isFileList(m) || S.endsWith(y, "[]") && (j = S.toArray(m)))
        return y = Gp(y), j.forEach(function(w, O) {
          !(S.isUndefined(w) || w === null) && t.append(
            a === !0 ? Lc([y], O, i) : a === null ? y : y + "[]",
            l(w)
          );
        }), !1;
    }
    return Ta(m) ? !0 : (t.append(Lc(_, y, i), l(m)), !1);
  }
  const p = [], d = Object.assign(r_, {
    defaultVisitor: f,
    convertValue: l,
    isVisitable: Ta
  });
  function h(m, y) {
    if (!S.isUndefined(m)) {
      if (p.indexOf(m) !== -1)
        throw Error("Circular reference detected in " + y.join("."));
      p.push(m), S.forEach(m, function(j, L) {
        (!(S.isUndefined(j) || j === null) && o.call(
          t,
          j,
          S.isString(L) ? L.trim() : L,
          y,
          d
        )) === !0 && h(j, y ? y.concat(L) : [L]);
      }), p.pop();
    }
  }
  if (!S.isObject(e))
    throw new TypeError("data must be an object");
  return h(e), t;
}
function Ic(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(n) {
    return t[n];
  });
}
function Ws(e, t) {
  this._pairs = [], e && ri(e, this, t);
}
const Yp = Ws.prototype;
Yp.append = function(t, r) {
  this._pairs.push([t, r]);
};
Yp.toString = function(t) {
  const r = t ? function(n) {
    return t.call(this, n, Ic);
  } : Ic;
  return this._pairs.map(function(o) {
    return r(o[0]) + "=" + r(o[1]);
  }, "").join("&");
};
function o_(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Xp(e, t, r) {
  if (!t)
    return e;
  const n = r && r.encode || o_, o = r && r.serialize;
  let i;
  if (o ? i = o(t, r) : i = S.isURLSearchParams(t) ? t.toString() : new Ws(t, r).toString(n), i) {
    const a = e.indexOf("#");
    a !== -1 && (e = e.slice(0, a)), e += (e.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return e;
}
class i_ {
  constructor() {
    this.handlers = [];
  }
  use(t, r, n) {
    return this.handlers.push({
      fulfilled: t,
      rejected: r,
      synchronous: n ? n.synchronous : !1,
      runWhen: n ? n.runWhen : null
    }), this.handlers.length - 1;
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    S.forEach(this.handlers, function(n) {
      n !== null && t(n);
    });
  }
}
const Fc = i_, Zp = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, a_ = typeof URLSearchParams < "u" ? URLSearchParams : Ws, s_ = FormData, u_ = (() => {
  let e;
  return typeof navigator < "u" && ((e = navigator.product) === "ReactNative" || e === "NativeScript" || e === "NS") ? !1 : typeof window < "u" && typeof document < "u";
})(), c_ = (() => typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), Ue = {
  isBrowser: !0,
  classes: {
    URLSearchParams: a_,
    FormData: s_,
    Blob
  },
  isStandardBrowserEnv: u_,
  isStandardBrowserWebWorkerEnv: c_,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function l_(e, t) {
  return ri(e, new Ue.classes.URLSearchParams(), Object.assign({
    visitor: function(r, n, o, i) {
      return Ue.isNode && S.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function f_(e) {
  return S.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function p_(e) {
  const t = {}, r = Object.keys(e);
  let n;
  const o = r.length;
  let i;
  for (n = 0; n < o; n++)
    i = r[n], t[i] = e[i];
  return t;
}
function Qp(e) {
  function t(r, n, o, i) {
    let a = r[i++];
    const s = Number.isFinite(+a), u = i >= r.length;
    return a = !a && S.isArray(o) ? o.length : a, u ? (S.hasOwnProp(o, a) ? o[a] = [o[a], n] : o[a] = n, !s) : ((!o[a] || !S.isObject(o[a])) && (o[a] = []), t(r, n, o[a], i) && S.isArray(o[a]) && (o[a] = p_(o[a])), !s);
  }
  if (S.isFormData(e) && S.isFunction(e.entries)) {
    const r = {};
    return S.forEachEntry(e, (n, o) => {
      t(f_(n), o, r, 0);
    }), r;
  }
  return null;
}
const d_ = {
  "Content-Type": void 0
};
function h_(e, t, r) {
  if (S.isString(e))
    try {
      return (t || JSON.parse)(e), S.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (r || JSON.stringify)(e);
}
const ni = {
  transitional: Zp,
  adapter: ["xhr", "http"],
  transformRequest: [function(t, r) {
    const n = r.getContentType() || "", o = n.indexOf("application/json") > -1, i = S.isObject(t);
    if (i && S.isHTMLForm(t) && (t = new FormData(t)), S.isFormData(t))
      return o && o ? JSON.stringify(Qp(t)) : t;
    if (S.isArrayBuffer(t) || S.isBuffer(t) || S.isStream(t) || S.isFile(t) || S.isBlob(t))
      return t;
    if (S.isArrayBufferView(t))
      return t.buffer;
    if (S.isURLSearchParams(t))
      return r.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let s;
    if (i) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return l_(t, this.formSerializer).toString();
      if ((s = S.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
        const u = this.env && this.env.FormData;
        return ri(
          s ? { "files[]": t } : t,
          u && new u(),
          this.formSerializer
        );
      }
    }
    return i || o ? (r.setContentType("application/json", !1), h_(t)) : t;
  }],
  transformResponse: [function(t) {
    const r = this.transitional || ni.transitional, n = r && r.forcedJSONParsing, o = this.responseType === "json";
    if (t && S.isString(t) && (n && !this.responseType || o)) {
      const a = !(r && r.silentJSONParsing) && o;
      try {
        return JSON.parse(t);
      } catch (s) {
        if (a)
          throw s.name === "SyntaxError" ? z.from(s, z.ERR_BAD_RESPONSE, this, null, this.response) : s;
      }
    }
    return t;
  }],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: Ue.classes.FormData,
    Blob: Ue.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*"
    }
  }
};
S.forEach(["delete", "get", "head"], function(t) {
  ni.headers[t] = {};
});
S.forEach(["post", "put", "patch"], function(t) {
  ni.headers[t] = S.merge(d_);
});
const Hs = ni, v_ = S.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), m_ = (e) => {
  const t = {};
  let r, n, o;
  return e && e.split(`
`).forEach(function(a) {
    o = a.indexOf(":"), r = a.substring(0, o).trim().toLowerCase(), n = a.substring(o + 1).trim(), !(!r || t[r] && v_[r]) && (r === "set-cookie" ? t[r] ? t[r].push(n) : t[r] = [n] : t[r] = t[r] ? t[r] + ", " + n : n);
  }), t;
}, kc = Symbol("internals");
function nn(e) {
  return e && String(e).trim().toLowerCase();
}
function oo(e) {
  return e === !1 || e == null ? e : S.isArray(e) ? e.map(oo) : String(e);
}
function y_(e) {
  const t = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(e); )
    t[n[1]] = n[2];
  return t;
}
function g_(e) {
  return /^[-_a-zA-Z]+$/.test(e.trim());
}
function Uc(e, t, r, n) {
  if (S.isFunction(n))
    return n.call(this, t, r);
  if (S.isString(t)) {
    if (S.isString(n))
      return t.indexOf(n) !== -1;
    if (S.isRegExp(n))
      return n.test(t);
  }
}
function b_(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, r, n) => r.toUpperCase() + n);
}
function w_(e, t) {
  const r = S.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(e, n + r, {
      value: function(o, i, a) {
        return this[n].call(this, t, o, i, a);
      },
      configurable: !0
    });
  });
}
let oi = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, r, n) {
    const o = this;
    function i(s, u, l) {
      const f = nn(u);
      if (!f)
        throw new Error("header name must be a non-empty string");
      const p = S.findKey(o, f);
      (!p || o[p] === void 0 || l === !0 || l === void 0 && o[p] !== !1) && (o[p || u] = oo(s));
    }
    const a = (s, u) => S.forEach(s, (l, f) => i(l, f, u));
    return S.isPlainObject(t) || t instanceof this.constructor ? a(t, r) : S.isString(t) && (t = t.trim()) && !g_(t) ? a(m_(t), r) : t != null && i(r, t, n), this;
  }
  get(t, r) {
    if (t = nn(t), t) {
      const n = S.findKey(this, t);
      if (n) {
        const o = this[n];
        if (!r)
          return o;
        if (r === !0)
          return y_(o);
        if (S.isFunction(r))
          return r.call(this, o, n);
        if (S.isRegExp(r))
          return r.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, r) {
    if (t = nn(t), t) {
      const n = S.findKey(this, t);
      return !!(n && (!r || Uc(this, this[n], n, r)));
    }
    return !1;
  }
  delete(t, r) {
    const n = this;
    let o = !1;
    function i(a) {
      if (a = nn(a), a) {
        const s = S.findKey(n, a);
        s && (!r || Uc(n, n[s], s, r)) && (delete n[s], o = !0);
      }
    }
    return S.isArray(t) ? t.forEach(i) : i(t), o;
  }
  clear() {
    return Object.keys(this).forEach(this.delete.bind(this));
  }
  normalize(t) {
    const r = this, n = {};
    return S.forEach(this, (o, i) => {
      const a = S.findKey(n, i);
      if (a) {
        r[a] = oo(o), delete r[i];
        return;
      }
      const s = t ? b_(i) : String(i).trim();
      s !== i && delete r[i], r[s] = oo(o), n[s] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const r = /* @__PURE__ */ Object.create(null);
    return S.forEach(this, (n, o) => {
      n != null && n !== !1 && (r[o] = t && S.isArray(n) ? n.join(", ") : n);
    }), r;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, r]) => t + ": " + r).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...r) {
    const n = new this(t);
    return r.forEach((o) => n.set(o)), n;
  }
  static accessor(t) {
    const n = (this[kc] = this[kc] = {
      accessors: {}
    }).accessors, o = this.prototype;
    function i(a) {
      const s = nn(a);
      n[s] || (w_(o, a), n[s] = !0);
    }
    return S.isArray(t) ? t.forEach(i) : i(t), this;
  }
};
oi.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent"]);
S.freezeMethods(oi.prototype);
S.freezeMethods(oi);
const Ke = oi;
function Ui(e, t) {
  const r = this || Hs, n = t || r, o = Ke.from(n.headers);
  let i = n.data;
  return S.forEach(e, function(s) {
    i = s.call(r, i, o.normalize(), t ? t.status : void 0);
  }), o.normalize(), i;
}
function ed(e) {
  return !!(e && e.__CANCEL__);
}
function In(e, t, r) {
  z.call(this, e ?? "canceled", z.ERR_CANCELED, t, r), this.name = "CanceledError";
}
S.inherits(In, z, {
  __CANCEL__: !0
});
const E_ = null;
function __(e, t, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? e(r) : t(new z(
    "Request failed with status code " + r.status,
    [z.ERR_BAD_REQUEST, z.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
    r.config,
    r.request,
    r
  ));
}
const O_ = Ue.isStandardBrowserEnv ? function() {
  return {
    write: function(r, n, o, i, a, s) {
      const u = [];
      u.push(r + "=" + encodeURIComponent(n)), S.isNumber(o) && u.push("expires=" + new Date(o).toGMTString()), S.isString(i) && u.push("path=" + i), S.isString(a) && u.push("domain=" + a), s === !0 && u.push("secure"), document.cookie = u.join("; ");
    },
    read: function(r) {
      const n = document.cookie.match(new RegExp("(^|;\\s*)(" + r + ")=([^;]*)"));
      return n ? decodeURIComponent(n[3]) : null;
    },
    remove: function(r) {
      this.write(r, "", Date.now() - 864e5);
    }
  };
}() : function() {
  return {
    write: function() {
    },
    read: function() {
      return null;
    },
    remove: function() {
    }
  };
}();
function S_(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function x_(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function td(e, t) {
  return e && !S_(t) ? x_(e, t) : t;
}
const R_ = Ue.isStandardBrowserEnv ? function() {
  const t = /(msie|trident)/i.test(navigator.userAgent), r = document.createElement("a");
  let n;
  function o(i) {
    let a = i;
    return t && (r.setAttribute("href", a), a = r.href), r.setAttribute("href", a), {
      href: r.href,
      protocol: r.protocol ? r.protocol.replace(/:$/, "") : "",
      host: r.host,
      search: r.search ? r.search.replace(/^\?/, "") : "",
      hash: r.hash ? r.hash.replace(/^#/, "") : "",
      hostname: r.hostname,
      port: r.port,
      pathname: r.pathname.charAt(0) === "/" ? r.pathname : "/" + r.pathname
    };
  }
  return n = o(window.location.href), function(a) {
    const s = S.isString(a) ? o(a) : a;
    return s.protocol === n.protocol && s.host === n.host;
  };
}() : function() {
  return function() {
    return !0;
  };
}();
function j_(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function P_(e, t) {
  e = e || 10;
  const r = new Array(e), n = new Array(e);
  let o = 0, i = 0, a;
  return t = t !== void 0 ? t : 1e3, function(u) {
    const l = Date.now(), f = n[i];
    a || (a = l), r[o] = u, n[o] = l;
    let p = i, d = 0;
    for (; p !== o; )
      d += r[p++], p = p % e;
    if (o = (o + 1) % e, o === i && (i = (i + 1) % e), l - a < t)
      return;
    const h = f && l - f;
    return h ? Math.round(d * 1e3 / h) : void 0;
  };
}
function $c(e, t) {
  let r = 0;
  const n = P_(50, 250);
  return (o) => {
    const i = o.loaded, a = o.lengthComputable ? o.total : void 0, s = i - r, u = n(s), l = i <= a;
    r = i;
    const f = {
      loaded: i,
      total: a,
      progress: a ? i / a : void 0,
      bytes: s,
      rate: u || void 0,
      estimated: u && a && l ? (a - i) / u : void 0,
      event: o
    };
    f[t ? "download" : "upload"] = !0, e(f);
  };
}
const T_ = typeof XMLHttpRequest < "u", A_ = T_ && function(e) {
  return new Promise(function(r, n) {
    let o = e.data;
    const i = Ke.from(e.headers).normalize(), a = e.responseType;
    let s;
    function u() {
      e.cancelToken && e.cancelToken.unsubscribe(s), e.signal && e.signal.removeEventListener("abort", s);
    }
    S.isFormData(o) && (Ue.isStandardBrowserEnv || Ue.isStandardBrowserWebWorkerEnv) && i.setContentType(!1);
    let l = new XMLHttpRequest();
    if (e.auth) {
      const h = e.auth.username || "", m = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
      i.set("Authorization", "Basic " + btoa(h + ":" + m));
    }
    const f = td(e.baseURL, e.url);
    l.open(e.method.toUpperCase(), Xp(f, e.params, e.paramsSerializer), !0), l.timeout = e.timeout;
    function p() {
      if (!l)
        return;
      const h = Ke.from(
        "getAllResponseHeaders" in l && l.getAllResponseHeaders()
      ), y = {
        data: !a || a === "text" || a === "json" ? l.responseText : l.response,
        status: l.status,
        statusText: l.statusText,
        headers: h,
        config: e,
        request: l
      };
      __(function(j) {
        r(j), u();
      }, function(j) {
        n(j), u();
      }, y), l = null;
    }
    if ("onloadend" in l ? l.onloadend = p : l.onreadystatechange = function() {
      !l || l.readyState !== 4 || l.status === 0 && !(l.responseURL && l.responseURL.indexOf("file:") === 0) || setTimeout(p);
    }, l.onabort = function() {
      l && (n(new z("Request aborted", z.ECONNABORTED, e, l)), l = null);
    }, l.onerror = function() {
      n(new z("Network Error", z.ERR_NETWORK, e, l)), l = null;
    }, l.ontimeout = function() {
      let m = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
      const y = e.transitional || Zp;
      e.timeoutErrorMessage && (m = e.timeoutErrorMessage), n(new z(
        m,
        y.clarifyTimeoutError ? z.ETIMEDOUT : z.ECONNABORTED,
        e,
        l
      )), l = null;
    }, Ue.isStandardBrowserEnv) {
      const h = (e.withCredentials || R_(f)) && e.xsrfCookieName && O_.read(e.xsrfCookieName);
      h && i.set(e.xsrfHeaderName, h);
    }
    o === void 0 && i.setContentType(null), "setRequestHeader" in l && S.forEach(i.toJSON(), function(m, y) {
      l.setRequestHeader(y, m);
    }), S.isUndefined(e.withCredentials) || (l.withCredentials = !!e.withCredentials), a && a !== "json" && (l.responseType = e.responseType), typeof e.onDownloadProgress == "function" && l.addEventListener("progress", $c(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && l.upload && l.upload.addEventListener("progress", $c(e.onUploadProgress)), (e.cancelToken || e.signal) && (s = (h) => {
      l && (n(!h || h.type ? new In(null, e, l) : h), l.abort(), l = null);
    }, e.cancelToken && e.cancelToken.subscribe(s), e.signal && (e.signal.aborted ? s() : e.signal.addEventListener("abort", s)));
    const d = j_(f);
    if (d && Ue.protocols.indexOf(d) === -1) {
      n(new z("Unsupported protocol " + d + ":", z.ERR_BAD_REQUEST, e));
      return;
    }
    l.send(o || null);
  });
}, io = {
  http: E_,
  xhr: A_
};
S.forEach(io, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const C_ = {
  getAdapter: (e) => {
    e = S.isArray(e) ? e : [e];
    const { length: t } = e;
    let r, n;
    for (let o = 0; o < t && (r = e[o], !(n = S.isString(r) ? io[r.toLowerCase()] : r)); o++)
      ;
    if (!n)
      throw n === !1 ? new z(
        `Adapter ${r} is not supported by the environment`,
        "ERR_NOT_SUPPORT"
      ) : new Error(
        S.hasOwnProp(io, r) ? `Adapter '${r}' is not available in the build` : `Unknown adapter '${r}'`
      );
    if (!S.isFunction(n))
      throw new TypeError("adapter is not a function");
    return n;
  },
  adapters: io
};
function $i(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new In(null, e);
}
function Bc(e) {
  return $i(e), e.headers = Ke.from(e.headers), e.data = Ui.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), C_.getAdapter(e.adapter || Hs.adapter)(e).then(function(n) {
    return $i(e), n.data = Ui.call(
      e,
      e.transformResponse,
      n
    ), n.headers = Ke.from(n.headers), n;
  }, function(n) {
    return ed(n) || ($i(e), n && n.response && (n.response.data = Ui.call(
      e,
      e.transformResponse,
      n.response
    ), n.response.headers = Ke.from(n.response.headers))), Promise.reject(n);
  });
}
const Mc = (e) => e instanceof Ke ? e.toJSON() : e;
function Sr(e, t) {
  t = t || {};
  const r = {};
  function n(l, f, p) {
    return S.isPlainObject(l) && S.isPlainObject(f) ? S.merge.call({ caseless: p }, l, f) : S.isPlainObject(f) ? S.merge({}, f) : S.isArray(f) ? f.slice() : f;
  }
  function o(l, f, p) {
    if (S.isUndefined(f)) {
      if (!S.isUndefined(l))
        return n(void 0, l, p);
    } else
      return n(l, f, p);
  }
  function i(l, f) {
    if (!S.isUndefined(f))
      return n(void 0, f);
  }
  function a(l, f) {
    if (S.isUndefined(f)) {
      if (!S.isUndefined(l))
        return n(void 0, l);
    } else
      return n(void 0, f);
  }
  function s(l, f, p) {
    if (p in t)
      return n(l, f);
    if (p in e)
      return n(void 0, l);
  }
  const u = {
    url: i,
    method: i,
    data: i,
    baseURL: a,
    transformRequest: a,
    transformResponse: a,
    paramsSerializer: a,
    timeout: a,
    timeoutMessage: a,
    withCredentials: a,
    adapter: a,
    responseType: a,
    xsrfCookieName: a,
    xsrfHeaderName: a,
    onUploadProgress: a,
    onDownloadProgress: a,
    decompress: a,
    maxContentLength: a,
    maxBodyLength: a,
    beforeRedirect: a,
    transport: a,
    httpAgent: a,
    httpsAgent: a,
    cancelToken: a,
    socketPath: a,
    responseEncoding: a,
    validateStatus: s,
    headers: (l, f) => o(Mc(l), Mc(f), !0)
  };
  return S.forEach(Object.keys(e).concat(Object.keys(t)), function(f) {
    const p = u[f] || o, d = p(e[f], t[f], f);
    S.isUndefined(d) && p !== s || (r[f] = d);
  }), r;
}
const rd = "1.2.1", qs = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  qs[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const zc = {};
qs.transitional = function(t, r, n) {
  function o(i, a) {
    return "[Axios v" + rd + "] Transitional option '" + i + "'" + a + (n ? ". " + n : "");
  }
  return (i, a, s) => {
    if (t === !1)
      throw new z(
        o(a, " has been removed" + (r ? " in " + r : "")),
        z.ERR_DEPRECATED
      );
    return r && !zc[a] && (zc[a] = !0, console.warn(
      o(
        a,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), t ? t(i, a, s) : !0;
  };
};
function N_(e, t, r) {
  if (typeof e != "object")
    throw new z("options must be an object", z.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(e);
  let o = n.length;
  for (; o-- > 0; ) {
    const i = n[o], a = t[i];
    if (a) {
      const s = e[i], u = s === void 0 || a(s, i, e);
      if (u !== !0)
        throw new z("option " + i + " must be " + u, z.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0)
      throw new z("Unknown option " + i, z.ERR_BAD_OPTION);
  }
}
const Aa = {
  assertOptions: N_,
  validators: qs
}, Nt = Aa.validators;
let Ao = class {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new Fc(),
      response: new Fc()
    };
  }
  request(t, r) {
    typeof t == "string" ? (r = r || {}, r.url = t) : r = t || {}, r = Sr(this.defaults, r);
    const { transitional: n, paramsSerializer: o, headers: i } = r;
    n !== void 0 && Aa.assertOptions(n, {
      silentJSONParsing: Nt.transitional(Nt.boolean),
      forcedJSONParsing: Nt.transitional(Nt.boolean),
      clarifyTimeoutError: Nt.transitional(Nt.boolean)
    }, !1), o !== void 0 && Aa.assertOptions(o, {
      encode: Nt.function,
      serialize: Nt.function
    }, !0), r.method = (r.method || this.defaults.method || "get").toLowerCase();
    let a;
    a = i && S.merge(
      i.common,
      i[r.method]
    ), a && S.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (m) => {
        delete i[m];
      }
    ), r.headers = Ke.concat(a, i);
    const s = [];
    let u = !0;
    this.interceptors.request.forEach(function(y) {
      typeof y.runWhen == "function" && y.runWhen(r) === !1 || (u = u && y.synchronous, s.unshift(y.fulfilled, y.rejected));
    });
    const l = [];
    this.interceptors.response.forEach(function(y) {
      l.push(y.fulfilled, y.rejected);
    });
    let f, p = 0, d;
    if (!u) {
      const m = [Bc.bind(this), void 0];
      for (m.unshift.apply(m, s), m.push.apply(m, l), d = m.length, f = Promise.resolve(r); p < d; )
        f = f.then(m[p++], m[p++]);
      return f;
    }
    d = s.length;
    let h = r;
    for (p = 0; p < d; ) {
      const m = s[p++], y = s[p++];
      try {
        h = m(h);
      } catch (_) {
        y.call(this, _);
        break;
      }
    }
    try {
      f = Bc.call(this, h);
    } catch (m) {
      return Promise.reject(m);
    }
    for (p = 0, d = l.length; p < d; )
      f = f.then(l[p++], l[p++]);
    return f;
  }
  getUri(t) {
    t = Sr(this.defaults, t);
    const r = td(t.baseURL, t.url);
    return Xp(r, t.params, t.paramsSerializer);
  }
};
S.forEach(["delete", "get", "head", "options"], function(t) {
  Ao.prototype[t] = function(r, n) {
    return this.request(Sr(n || {}, {
      method: t,
      url: r,
      data: (n || {}).data
    }));
  };
});
S.forEach(["post", "put", "patch"], function(t) {
  function r(n) {
    return function(i, a, s) {
      return this.request(Sr(s || {}, {
        method: t,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: i,
        data: a
      }));
    };
  }
  Ao.prototype[t] = r(), Ao.prototype[t + "Form"] = r(!0);
});
const ao = Ao;
let nd = class {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let r;
    this.promise = new Promise(function(i) {
      r = i;
    });
    const n = this;
    this.promise.then((o) => {
      if (!n._listeners)
        return;
      let i = n._listeners.length;
      for (; i-- > 0; )
        n._listeners[i](o);
      n._listeners = null;
    }), this.promise.then = (o) => {
      let i;
      const a = new Promise((s) => {
        n.subscribe(s), i = s;
      }).then(o);
      return a.cancel = function() {
        n.unsubscribe(i);
      }, a;
    }, t(function(i, a, s) {
      n.reason || (n.reason = new In(i, a, s), r(n.reason));
    });
  }
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const r = this._listeners.indexOf(t);
    r !== -1 && this._listeners.splice(r, 1);
  }
  static source() {
    let t;
    return {
      token: new nd(function(o) {
        t = o;
      }),
      cancel: t
    };
  }
};
const D_ = nd;
function L_(e) {
  return function(r) {
    return e.apply(null, r);
  };
}
function I_(e) {
  return S.isObject(e) && e.isAxiosError === !0;
}
function od(e) {
  const t = new ao(e), r = $p(ao.prototype.request, t);
  return S.extend(r, ao.prototype, t, { allOwnKeys: !0 }), S.extend(r, t, null, { allOwnKeys: !0 }), r.create = function(o) {
    return od(Sr(e, o));
  }, r;
}
const se = od(Hs);
se.Axios = ao;
se.CanceledError = In;
se.CancelToken = D_;
se.isCancel = ed;
se.VERSION = rd;
se.toFormData = ri;
se.AxiosError = z;
se.Cancel = se.CanceledError;
se.all = function(t) {
  return Promise.all(t);
};
se.spread = L_;
se.isAxiosError = I_;
se.mergeConfig = Sr;
se.AxiosHeaders = Ke;
se.formToJSON = (e) => Qp(S.isHTMLForm(e) ? new FormData(e) : e);
se.default = se;
const id = se, {
  Axios: AI,
  AxiosError: F_,
  CanceledError: CI,
  isCancel: NI,
  CancelToken: DI,
  VERSION: LI,
  all: II,
  Cancel: FI,
  isAxiosError: kI,
  spread: UI,
  toFormData: $I,
  AxiosHeaders: BI,
  formToJSON: MI,
  mergeConfig: zI
} = id;
var Ca = function(e, t) {
  return Ca = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
    r.__proto__ = n;
  } || function(r, n) {
    for (var o in n)
      Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
  }, Ca(e, t);
};
function ii(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  Ca(e, t);
  function r() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
}
function Na(e) {
  var t = typeof Symbol == "function" && Symbol.iterator, r = t && e[t], n = 0;
  if (r)
    return r.call(e);
  if (e && typeof e.length == "number")
    return {
      next: function() {
        return e && n >= e.length && (e = void 0), { value: e && e[n++], done: !e };
      }
    };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function Co(e, t) {
  var r = typeof Symbol == "function" && e[Symbol.iterator];
  if (!r)
    return e;
  var n = r.call(e), o, i = [], a;
  try {
    for (; (t === void 0 || t-- > 0) && !(o = n.next()).done; )
      i.push(o.value);
  } catch (s) {
    a = { error: s };
  } finally {
    try {
      o && !o.done && (r = n.return) && r.call(n);
    } finally {
      if (a)
        throw a.error;
    }
  }
  return i;
}
function No(e, t, r) {
  if (r || arguments.length === 2)
    for (var n = 0, o = t.length, i; n < o; n++)
      (i || !(n in t)) && (i || (i = Array.prototype.slice.call(t, 0, n)), i[n] = t[n]);
  return e.concat(i || Array.prototype.slice.call(t));
}
function Ge(e) {
  return typeof e == "function";
}
function Js(e) {
  var t = function(n) {
    Error.call(n), n.stack = new Error().stack;
  }, r = e(t);
  return r.prototype = Object.create(Error.prototype), r.prototype.constructor = r, r;
}
var Bi = Js(function(e) {
  return function(r) {
    e(this), this.message = r ? r.length + ` errors occurred during unsubscription:
` + r.map(function(n, o) {
      return o + 1 + ") " + n.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = r;
  };
});
function Da(e, t) {
  if (e) {
    var r = e.indexOf(t);
    0 <= r && e.splice(r, 1);
  }
}
var ai = function() {
  function e(t) {
    this.initialTeardown = t, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return e.prototype.unsubscribe = function() {
    var t, r, n, o, i;
    if (!this.closed) {
      this.closed = !0;
      var a = this._parentage;
      if (a)
        if (this._parentage = null, Array.isArray(a))
          try {
            for (var s = Na(a), u = s.next(); !u.done; u = s.next()) {
              var l = u.value;
              l.remove(this);
            }
          } catch (y) {
            t = { error: y };
          } finally {
            try {
              u && !u.done && (r = s.return) && r.call(s);
            } finally {
              if (t)
                throw t.error;
            }
          }
        else
          a.remove(this);
      var f = this.initialTeardown;
      if (Ge(f))
        try {
          f();
        } catch (y) {
          i = y instanceof Bi ? y.errors : [y];
        }
      var p = this._finalizers;
      if (p) {
        this._finalizers = null;
        try {
          for (var d = Na(p), h = d.next(); !h.done; h = d.next()) {
            var m = h.value;
            try {
              Vc(m);
            } catch (y) {
              i = i ?? [], y instanceof Bi ? i = No(No([], Co(i)), Co(y.errors)) : i.push(y);
            }
          }
        } catch (y) {
          n = { error: y };
        } finally {
          try {
            h && !h.done && (o = d.return) && o.call(d);
          } finally {
            if (n)
              throw n.error;
          }
        }
      }
      if (i)
        throw new Bi(i);
    }
  }, e.prototype.add = function(t) {
    var r;
    if (t && t !== this)
      if (this.closed)
        Vc(t);
      else {
        if (t instanceof e) {
          if (t.closed || t._hasParent(this))
            return;
          t._addParent(this);
        }
        (this._finalizers = (r = this._finalizers) !== null && r !== void 0 ? r : []).push(t);
      }
  }, e.prototype._hasParent = function(t) {
    var r = this._parentage;
    return r === t || Array.isArray(r) && r.includes(t);
  }, e.prototype._addParent = function(t) {
    var r = this._parentage;
    this._parentage = Array.isArray(r) ? (r.push(t), r) : r ? [r, t] : t;
  }, e.prototype._removeParent = function(t) {
    var r = this._parentage;
    r === t ? this._parentage = null : Array.isArray(r) && Da(r, t);
  }, e.prototype.remove = function(t) {
    var r = this._finalizers;
    r && Da(r, t), t instanceof e && t._removeParent(this);
  }, e.EMPTY = function() {
    var t = new e();
    return t.closed = !0, t;
  }(), e;
}(), ad = ai.EMPTY;
function sd(e) {
  return e instanceof ai || e && "closed" in e && Ge(e.remove) && Ge(e.add) && Ge(e.unsubscribe);
}
function Vc(e) {
  Ge(e) ? e() : e.unsubscribe();
}
var Ks = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1
}, La = {
  setTimeout: function(e, t) {
    for (var r = [], n = 2; n < arguments.length; n++)
      r[n - 2] = arguments[n];
    var o = La.delegate;
    return o != null && o.setTimeout ? o.setTimeout.apply(o, No([e, t], Co(r))) : setTimeout.apply(void 0, No([e, t], Co(r)));
  },
  clearTimeout: function(e) {
    var t = La.delegate;
    return ((t == null ? void 0 : t.clearTimeout) || clearTimeout)(e);
  },
  delegate: void 0
};
function k_(e) {
  La.setTimeout(function() {
    throw e;
  });
}
function Wc() {
}
var Gn = null;
function so(e) {
  if (Ks.useDeprecatedSynchronousErrorHandling) {
    var t = !Gn;
    if (t && (Gn = { errorThrown: !1, error: null }), e(), t) {
      var r = Gn, n = r.errorThrown, o = r.error;
      if (Gn = null, n)
        throw o;
    }
  } else
    e();
}
var ud = function(e) {
  ii(t, e);
  function t(r) {
    var n = e.call(this) || this;
    return n.isStopped = !1, r ? (n.destination = r, sd(r) && r.add(n)) : n.destination = M_, n;
  }
  return t.create = function(r, n, o) {
    return new Ia(r, n, o);
  }, t.prototype.next = function(r) {
    this.isStopped || this._next(r);
  }, t.prototype.error = function(r) {
    this.isStopped || (this.isStopped = !0, this._error(r));
  }, t.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, t.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, e.prototype.unsubscribe.call(this), this.destination = null);
  }, t.prototype._next = function(r) {
    this.destination.next(r);
  }, t.prototype._error = function(r) {
    try {
      this.destination.error(r);
    } finally {
      this.unsubscribe();
    }
  }, t.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, t;
}(ai), U_ = Function.prototype.bind;
function Mi(e, t) {
  return U_.call(e, t);
}
var $_ = function() {
  function e(t) {
    this.partialObserver = t;
  }
  return e.prototype.next = function(t) {
    var r = this.partialObserver;
    if (r.next)
      try {
        r.next(t);
      } catch (n) {
        Yn(n);
      }
  }, e.prototype.error = function(t) {
    var r = this.partialObserver;
    if (r.error)
      try {
        r.error(t);
      } catch (n) {
        Yn(n);
      }
    else
      Yn(t);
  }, e.prototype.complete = function() {
    var t = this.partialObserver;
    if (t.complete)
      try {
        t.complete();
      } catch (r) {
        Yn(r);
      }
  }, e;
}(), Ia = function(e) {
  ii(t, e);
  function t(r, n, o) {
    var i = e.call(this) || this, a;
    if (Ge(r) || !r)
      a = {
        next: r ?? void 0,
        error: n ?? void 0,
        complete: o ?? void 0
      };
    else {
      var s;
      i && Ks.useDeprecatedNextContext ? (s = Object.create(r), s.unsubscribe = function() {
        return i.unsubscribe();
      }, a = {
        next: r.next && Mi(r.next, s),
        error: r.error && Mi(r.error, s),
        complete: r.complete && Mi(r.complete, s)
      }) : a = r;
    }
    return i.destination = new $_(a), i;
  }
  return t;
}(ud);
function Yn(e) {
  k_(e);
}
function B_(e) {
  throw e;
}
var M_ = {
  closed: !0,
  next: Wc,
  error: B_,
  complete: Wc
}, z_ = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function V_(e) {
  return e;
}
function W_(e) {
  return e.length === 0 ? V_ : e.length === 1 ? e[0] : function(r) {
    return e.reduce(function(n, o) {
      return o(n);
    }, r);
  };
}
var Do = function() {
  function e(t) {
    t && (this._subscribe = t);
  }
  return e.prototype.lift = function(t) {
    var r = new e();
    return r.source = this, r.operator = t, r;
  }, e.prototype.subscribe = function(t, r, n) {
    var o = this, i = q_(t) ? t : new Ia(t, r, n);
    return so(function() {
      var a = o, s = a.operator, u = a.source;
      i.add(s ? s.call(i, u) : u ? o._subscribe(i) : o._trySubscribe(i));
    }), i;
  }, e.prototype._trySubscribe = function(t) {
    try {
      return this._subscribe(t);
    } catch (r) {
      t.error(r);
    }
  }, e.prototype.forEach = function(t, r) {
    var n = this;
    return r = Hc(r), new r(function(o, i) {
      var a = new Ia({
        next: function(s) {
          try {
            t(s);
          } catch (u) {
            i(u), a.unsubscribe();
          }
        },
        error: i,
        complete: o
      });
      n.subscribe(a);
    });
  }, e.prototype._subscribe = function(t) {
    var r;
    return (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(t);
  }, e.prototype[z_] = function() {
    return this;
  }, e.prototype.pipe = function() {
    for (var t = [], r = 0; r < arguments.length; r++)
      t[r] = arguments[r];
    return W_(t)(this);
  }, e.prototype.toPromise = function(t) {
    var r = this;
    return t = Hc(t), new t(function(n, o) {
      var i;
      r.subscribe(function(a) {
        return i = a;
      }, function(a) {
        return o(a);
      }, function() {
        return n(i);
      });
    });
  }, e.create = function(t) {
    return new e(t);
  }, e;
}();
function Hc(e) {
  var t;
  return (t = e ?? Ks.Promise) !== null && t !== void 0 ? t : Promise;
}
function H_(e) {
  return e && Ge(e.next) && Ge(e.error) && Ge(e.complete);
}
function q_(e) {
  return e && e instanceof ud || H_(e) && sd(e);
}
var J_ = Js(function(e) {
  return function() {
    e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), Fa = function(e) {
  ii(t, e);
  function t() {
    var r = e.call(this) || this;
    return r.closed = !1, r.currentObservers = null, r.observers = [], r.isStopped = !1, r.hasError = !1, r.thrownError = null, r;
  }
  return t.prototype.lift = function(r) {
    var n = new qc(this, this);
    return n.operator = r, n;
  }, t.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new J_();
  }, t.prototype.next = function(r) {
    var n = this;
    so(function() {
      var o, i;
      if (n._throwIfClosed(), !n.isStopped) {
        n.currentObservers || (n.currentObservers = Array.from(n.observers));
        try {
          for (var a = Na(n.currentObservers), s = a.next(); !s.done; s = a.next()) {
            var u = s.value;
            u.next(r);
          }
        } catch (l) {
          o = { error: l };
        } finally {
          try {
            s && !s.done && (i = a.return) && i.call(a);
          } finally {
            if (o)
              throw o.error;
          }
        }
      }
    });
  }, t.prototype.error = function(r) {
    var n = this;
    so(function() {
      if (n._throwIfClosed(), !n.isStopped) {
        n.hasError = n.isStopped = !0, n.thrownError = r;
        for (var o = n.observers; o.length; )
          o.shift().error(r);
      }
    });
  }, t.prototype.complete = function() {
    var r = this;
    so(function() {
      if (r._throwIfClosed(), !r.isStopped) {
        r.isStopped = !0;
        for (var n = r.observers; n.length; )
          n.shift().complete();
      }
    });
  }, t.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(t.prototype, "observed", {
    get: function() {
      var r;
      return ((r = this.observers) === null || r === void 0 ? void 0 : r.length) > 0;
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype._trySubscribe = function(r) {
    return this._throwIfClosed(), e.prototype._trySubscribe.call(this, r);
  }, t.prototype._subscribe = function(r) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(r), this._innerSubscribe(r);
  }, t.prototype._innerSubscribe = function(r) {
    var n = this, o = this, i = o.hasError, a = o.isStopped, s = o.observers;
    return i || a ? ad : (this.currentObservers = null, s.push(r), new ai(function() {
      n.currentObservers = null, Da(s, r);
    }));
  }, t.prototype._checkFinalizedStatuses = function(r) {
    var n = this, o = n.hasError, i = n.thrownError, a = n.isStopped;
    o ? r.error(i) : a && r.complete();
  }, t.prototype.asObservable = function() {
    var r = new Do();
    return r.source = this, r;
  }, t.create = function(r, n) {
    return new qc(r, n);
  }, t;
}(Do), qc = function(e) {
  ii(t, e);
  function t(r, n) {
    var o = e.call(this) || this;
    return o.destination = r, o.source = n, o;
  }
  return t.prototype.next = function(r) {
    var n, o;
    (o = (n = this.destination) === null || n === void 0 ? void 0 : n.next) === null || o === void 0 || o.call(n, r);
  }, t.prototype.error = function(r) {
    var n, o;
    (o = (n = this.destination) === null || n === void 0 ? void 0 : n.error) === null || o === void 0 || o.call(n, r);
  }, t.prototype.complete = function() {
    var r, n;
    (n = (r = this.destination) === null || r === void 0 ? void 0 : r.complete) === null || n === void 0 || n.call(r);
  }, t.prototype._subscribe = function(r) {
    var n, o;
    return (o = (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(r)) !== null && o !== void 0 ? o : ad;
  }, t;
}(Fa), K_ = Js(function(e) {
  return function() {
    e(this), this.name = "EmptyError", this.message = "no elements in sequence";
  };
});
function zi(e, t) {
  var r = typeof t == "object";
  return new Promise(function(n, o) {
    var i = !1, a;
    e.subscribe({
      next: function(s) {
        a = s, i = !0;
      },
      error: o,
      complete: function() {
        i ? n(a) : r ? n(t.defaultValue) : o(new K_());
      }
    });
  });
}
class Gs {
  constructor(t) {
    pe(this, "config");
    pe(this, "axios");
    t && (this.config = t), this.axios = id.create(this.config);
  }
  get interceptors() {
    return this.axios.interceptors;
  }
  static create(t) {
    return new Gs(t);
  }
  request(t) {
    return new Do((r) => {
      const n = new AbortController();
      let o, i;
      return t.uploadProgressSubscriber && (o = (a) => {
        t.uploadProgressSubscriber && t.uploadProgressSubscriber.next(a);
      }), t.downloadProgressSubscriber && (i = (a) => {
        t.downloadProgressSubscriber && t.downloadProgressSubscriber.next(a);
      }), this.axios.request({
        ...t,
        onUploadProgress: o,
        onDownloadProgress: i,
        signal: n.signal
      }).then((a) => {
        r.next(a), r.complete(), t.uploadProgressSubscriber && t.uploadProgressSubscriber.complete(), t.downloadProgressSubscriber && t.downloadProgressSubscriber.complete();
      }).catch((a) => {
        r.error(a), t.uploadProgressSubscriber && t.uploadProgressSubscriber.error(a);
      }), () => {
        n.abort();
      };
    });
  }
  get(t, r) {
    return this.request({
      url: t,
      method: "GET",
      ...r
    });
  }
  delete(t, r) {
    return this.request({
      url: t,
      method: "DELETE",
      ...r
    });
  }
  post(t, r, n) {
    return this.request({
      url: t,
      data: r,
      method: "POST",
      ...n
    });
  }
  put(t, r, n) {
    return this.request({
      url: t,
      data: r,
      method: "PUT",
      ...n
    });
  }
  patch(t, r, n) {
    return this.request({
      url: t,
      data: r,
      method: "PATCH",
      ...n
    });
  }
}
function G_(e) {
  return Gs.create({
    baseURL: e
  });
}
const re = class {
  constructor(t, r) {
    pe(this, "axiosInstance");
    pe(this, "defaultConfig", {
      contentType: "json",
      cache: !1
    });
    pe(this, "tokenType");
    this.axiosInstance = G_(t), this.setupInterceptor(), r && (this.defaultConfig = {
      ...this.defaultConfig,
      ...r
    });
  }
  static setAuthorizationTokenType(t) {
    re.tokenType = t;
  }
  static setGlobalParams(t) {
    re.globalParams = {
      ...re.globalParams,
      ...t
    };
  }
  static setGlobalData(t) {
    re.globalData = {
      ...re.globalData,
      ...t
    };
  }
  static setGlobalHeaders(t) {
    re.globalHeaders = {
      ...re.globalHeaders,
      ...t
    };
  }
  static addInterceptor(t) {
    return re.interceptors.add(t), () => {
      re.removeInterceptor(t);
    };
  }
  static removeInterceptor(t) {
    re.interceptors.delete(t);
  }
  setAuthorizationTokenType(t) {
    this.tokenType = t;
  }
  getTokenType(t) {
    return t.tokenType !== void 0 ? t.tokenType : this.tokenType !== void 0 ? this.tokenType : re.tokenType;
  }
  setupInterceptor() {
    this.axiosInstance.interceptors.request.use(
      async (t) => {
        if (t = await this.useRequestInterceptors(t), t = vE({}, this.defaultConfig, t), t.headers = {
          ...t.headers,
          ...re.globalHeaders,
          "Content-Type": t.contentType === "formData" ? !1 : t.contentType === "urlEncoded" ? xa.UrlEncoded : xa.Json
        }, !t.preparedData) {
          if ((typeof t.cache < "u" ? t.cache : this.defaultConfig.cache) === !1 && (t.headers["Cache-Control"] = "no-cache", t.params = {
            ...t.params,
            axios_timestamp: Date.now()
          }), t.params = To(
            Cc({
              ...t.params,
              ...re.globalParams
            })
          ), t.data = {
            ...t.data,
            ...re.globalData
          }, Cc(t.data), JSON.stringify(t.data) === "{}")
            t.data = void 0;
          else
            switch (t.contentType) {
              case "formData":
                t.data = Ra(t.data);
                break;
              case "urlEncoded":
                t.data = To(t.data);
            }
          t.preparedData = !0;
        }
        const r = this.getTokenType(t), n = r ? ro.getToken(r) : null;
        return n && (t.headers.Authorization = "Bearer " + n), t;
      },
      (t) => {
        console.log(t);
      }
    ), this.axiosInstance.interceptors.response.use(
      (t) => this.useSuccessResponseInterceptor(t),
      async (t) => {
        const r = await this.useErrorResponseInterceptor(t);
        return r instanceof Error ? Promise.reject(r) : r;
      }
    );
  }
  async useRequestInterceptors(t) {
    for (const r of re.interceptors)
      r.request && (t = await r.request(t));
    return t;
  }
  async useErrorResponseInterceptor(t) {
    for (const r of re.interceptors)
      if (r.response && r.response.error)
        try {
          t = await r.response.error(t, this.axiosInstance);
        } catch {
          return t;
        }
    return t;
  }
  async useSuccessResponseInterceptor(t) {
    for (const r of re.interceptors)
      r.response && r.response.success && (t = await r.response.success(t));
    return t;
  }
  request(t) {
    return this.axiosInstance.request(t);
  }
  post(t, r, n) {
    return this.axiosInstance.post(t, r, n);
  }
  put(t, r, n) {
    return this.axiosInstance.put(t, r, n);
  }
  patch(t, r, n) {
    return this.axiosInstance.patch(t, r, n);
  }
  get(t, r, n) {
    return this.axiosInstance.get(t, {
      ...n,
      params: r
    });
  }
  delete(t, r, n) {
    return this.axiosInstance.delete(t, {
      ...n,
      params: r
    });
  }
};
let ke = re;
pe(ke, "tokenType", "base_token"), pe(ke, "globalParams", {}), pe(ke, "globalData", {}), pe(ke, "globalHeaders", {}), pe(ke, "interceptors", /* @__PURE__ */ new Set());
var bn = {}, Y_ = {
  get exports() {
    return bn;
  },
  set exports(e) {
    bn = e;
  }
}, mr = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Vi, Jc;
function cd() {
  if (Jc)
    return Vi;
  Jc = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, r = Object.prototype.propertyIsEnumerable;
  function n(i) {
    if (i == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(i);
  }
  function o() {
    try {
      if (!Object.assign)
        return !1;
      var i = new String("abc");
      if (i[5] = "de", Object.getOwnPropertyNames(i)[0] === "5")
        return !1;
      for (var a = {}, s = 0; s < 10; s++)
        a["_" + String.fromCharCode(s)] = s;
      var u = Object.getOwnPropertyNames(a).map(function(f) {
        return a[f];
      });
      if (u.join("") !== "0123456789")
        return !1;
      var l = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(f) {
        l[f] = f;
      }), Object.keys(Object.assign({}, l)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Vi = o() ? Object.assign : function(i, a) {
    for (var s, u = n(i), l, f = 1; f < arguments.length; f++) {
      s = Object(arguments[f]);
      for (var p in s)
        t.call(s, p) && (u[p] = s[p]);
      if (e) {
        l = e(s);
        for (var d = 0; d < l.length; d++)
          r.call(s, l[d]) && (u[l[d]] = s[l[d]]);
      }
    }
    return u;
  }, Vi;
}
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Kc;
function X_() {
  if (Kc)
    return mr;
  Kc = 1, cd();
  var e = ye, t = 60103;
  if (mr.Fragment = 60107, typeof Symbol == "function" && Symbol.for) {
    var r = Symbol.for;
    t = r("react.element"), mr.Fragment = r("react.fragment");
  }
  var n = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = Object.prototype.hasOwnProperty, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function a(s, u, l) {
    var f, p = {}, d = null, h = null;
    l !== void 0 && (d = "" + l), u.key !== void 0 && (d = "" + u.key), u.ref !== void 0 && (h = u.ref);
    for (f in u)
      o.call(u, f) && !i.hasOwnProperty(f) && (p[f] = u[f]);
    if (s && s.defaultProps)
      for (f in u = s.defaultProps, u)
        p[f] === void 0 && (p[f] = u[f]);
    return { $$typeof: t, type: s, key: d, ref: h, props: p, _owner: n.current };
  }
  return mr.jsx = a, mr.jsxs = a, mr;
}
var Wi = {};
/** @license React v17.0.2
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Gc;
function Z_() {
  return Gc || (Gc = 1, function(e) {
    process.env.NODE_ENV !== "production" && function() {
      var t = ye, r = cd(), n = 60103, o = 60106;
      e.Fragment = 60107;
      var i = 60108, a = 60114, s = 60109, u = 60110, l = 60112, f = 60113, p = 60120, d = 60115, h = 60116, m = 60121, y = 60122, _ = 60117, j = 60129, L = 60131;
      if (typeof Symbol == "function" && Symbol.for) {
        var w = Symbol.for;
        n = w("react.element"), o = w("react.portal"), e.Fragment = w("react.fragment"), i = w("react.strict_mode"), a = w("react.profiler"), s = w("react.provider"), u = w("react.context"), l = w("react.forward_ref"), f = w("react.suspense"), p = w("react.suspense_list"), d = w("react.memo"), h = w("react.lazy"), m = w("react.block"), y = w("react.server.block"), _ = w("react.fundamental"), w("react.scope"), w("react.opaque.id"), j = w("react.debug_trace_mode"), w("react.offscreen"), L = w("react.legacy_hidden");
      }
      var O = typeof Symbol == "function" && Symbol.iterator, D = "@@iterator";
      function N(c) {
        if (c === null || typeof c != "object")
          return null;
        var v = O && c[O] || c[D];
        return typeof v == "function" ? v : null;
      }
      var U = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function I(c) {
        {
          for (var v = arguments.length, g = new Array(v > 1 ? v - 1 : 0), E = 1; E < v; E++)
            g[E - 1] = arguments[E];
          $("error", c, g);
        }
      }
      function $(c, v, g) {
        {
          var E = U.ReactDebugCurrentFrame, A = E.getStackAddendum();
          A !== "" && (v += "%s", g = g.concat([A]));
          var C = g.map(function(T) {
            return "" + T;
          });
          C.unshift("Warning: " + v), Function.prototype.apply.call(console[c], console, C);
        }
      }
      var Z = !1;
      function oe(c) {
        return !!(typeof c == "string" || typeof c == "function" || c === e.Fragment || c === a || c === j || c === i || c === f || c === p || c === L || Z || typeof c == "object" && c !== null && (c.$$typeof === h || c.$$typeof === d || c.$$typeof === s || c.$$typeof === u || c.$$typeof === l || c.$$typeof === _ || c.$$typeof === m || c[0] === y));
      }
      function Lr(c, v, g) {
        var E = v.displayName || v.name || "";
        return c.displayName || (E !== "" ? g + "(" + E + ")" : g);
      }
      function lt(c) {
        return c.displayName || "Context";
      }
      function H(c) {
        if (c == null)
          return null;
        if (typeof c.tag == "number" && I("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue."), typeof c == "function")
          return c.displayName || c.name || null;
        if (typeof c == "string")
          return c;
        switch (c) {
          case e.Fragment:
            return "Fragment";
          case o:
            return "Portal";
          case a:
            return "Profiler";
          case i:
            return "StrictMode";
          case f:
            return "Suspense";
          case p:
            return "SuspenseList";
        }
        if (typeof c == "object")
          switch (c.$$typeof) {
            case u:
              var v = c;
              return lt(v) + ".Consumer";
            case s:
              var g = c;
              return lt(g._context) + ".Provider";
            case l:
              return Lr(c, c.render, "ForwardRef");
            case d:
              return H(c.type);
            case m:
              return H(c._render);
            case h: {
              var E = c, A = E._payload, C = E._init;
              try {
                return H(C(A));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var le = 0, ft, pt, dt, ht, vt, mt, yt;
      function gt() {
      }
      gt.__reactDisabledLog = !0;
      function Ir() {
        {
          if (le === 0) {
            ft = console.log, pt = console.info, dt = console.warn, ht = console.error, vt = console.group, mt = console.groupCollapsed, yt = console.groupEnd;
            var c = {
              configurable: !0,
              enumerable: !0,
              value: gt,
              writable: !0
            };
            Object.defineProperties(console, {
              info: c,
              log: c,
              warn: c,
              error: c,
              group: c,
              groupCollapsed: c,
              groupEnd: c
            });
          }
          le++;
        }
      }
      function Fr() {
        {
          if (le--, le === 0) {
            var c = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: r({}, c, {
                value: ft
              }),
              info: r({}, c, {
                value: pt
              }),
              warn: r({}, c, {
                value: dt
              }),
              error: r({}, c, {
                value: ht
              }),
              group: r({}, c, {
                value: vt
              }),
              groupCollapsed: r({}, c, {
                value: mt
              }),
              groupEnd: r({}, c, {
                value: yt
              })
            });
          }
          le < 0 && I("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var Oe = U.ReactCurrentDispatcher, Se;
      function ge(c, v, g) {
        {
          if (Se === void 0)
            try {
              throw Error();
            } catch (A) {
              var E = A.stack.trim().match(/\n( *(at )?)/);
              Se = E && E[1] || "";
            }
          return `
` + Se + c;
        }
      }
      var xe = !1, be;
      {
        var kr = typeof WeakMap == "function" ? WeakMap : Map;
        be = new kr();
      }
      function bt(c, v) {
        if (!c || xe)
          return "";
        {
          var g = be.get(c);
          if (g !== void 0)
            return g;
        }
        var E;
        xe = !0;
        var A = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var C;
        C = Oe.current, Oe.current = null, Ir();
        try {
          if (v) {
            var T = function() {
              throw Error();
            };
            if (Object.defineProperty(T.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(T, []);
              } catch (J) {
                E = J;
              }
              Reflect.construct(c, [], T);
            } else {
              try {
                T.call();
              } catch (J) {
                E = J;
              }
              c.call(T.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (J) {
              E = J;
            }
            c();
          }
        } catch (J) {
          if (J && E && typeof J.stack == "string") {
            for (var P = J.stack.split(`
`), B = E.stack.split(`
`), F = P.length - 1, k = B.length - 1; F >= 1 && k >= 0 && P[F] !== B[k]; )
              k--;
            for (; F >= 1 && k >= 0; F--, k--)
              if (P[F] !== B[k]) {
                if (F !== 1 || k !== 1)
                  do
                    if (F--, k--, k < 0 || P[F] !== B[k]) {
                      var q = `
` + P[F].replace(" at new ", " at ");
                      return typeof c == "function" && be.set(c, q), q;
                    }
                  while (F >= 1 && k >= 0);
                break;
              }
          }
        } finally {
          xe = !1, Oe.current = C, Fr(), Error.prepareStackTrace = A;
        }
        var te = c ? c.displayName || c.name : "", Ct = te ? ge(te) : "";
        return typeof c == "function" && be.set(c, Ct), Ct;
      }
      function wt(c, v, g) {
        return bt(c, !1);
      }
      function Ur(c) {
        var v = c.prototype;
        return !!(v && v.isReactComponent);
      }
      function we(c, v, g) {
        if (c == null)
          return "";
        if (typeof c == "function")
          return bt(c, Ur(c));
        if (typeof c == "string")
          return ge(c);
        switch (c) {
          case f:
            return ge("Suspense");
          case p:
            return ge("SuspenseList");
        }
        if (typeof c == "object")
          switch (c.$$typeof) {
            case l:
              return wt(c.render);
            case d:
              return we(c.type, v, g);
            case m:
              return wt(c._render);
            case h: {
              var E = c, A = E._payload, C = E._init;
              try {
                return we(C(A), v, g);
              } catch {
              }
            }
          }
        return "";
      }
      var Et = {}, _t = U.ReactDebugCurrentFrame;
      function Ee(c) {
        if (c) {
          var v = c._owner, g = we(c.type, c._source, v ? v.type : null);
          _t.setExtraStackFrame(g);
        } else
          _t.setExtraStackFrame(null);
      }
      function $r(c, v, g, E, A) {
        {
          var C = Function.call.bind(Object.prototype.hasOwnProperty);
          for (var T in c)
            if (C(c, T)) {
              var P = void 0;
              try {
                if (typeof c[T] != "function") {
                  var B = Error((E || "React class") + ": " + g + " type `" + T + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof c[T] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw B.name = "Invariant Violation", B;
                }
                P = c[T](v, T, E, g, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (F) {
                P = F;
              }
              P && !(P instanceof Error) && (Ee(A), I("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", E || "React class", g, T, typeof P), Ee(null)), P instanceof Error && !(P.message in Et) && (Et[P.message] = !0, Ee(A), I("Failed %s type: %s", g, P.message), Ee(null));
            }
        }
      }
      var fe = U.ReactCurrentOwner, Re = Object.prototype.hasOwnProperty, Br = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, Ot, St, je;
      je = {};
      function Mr(c) {
        if (Re.call(c, "ref")) {
          var v = Object.getOwnPropertyDescriptor(c, "ref").get;
          if (v && v.isReactWarning)
            return !1;
        }
        return c.ref !== void 0;
      }
      function zr(c) {
        if (Re.call(c, "key")) {
          var v = Object.getOwnPropertyDescriptor(c, "key").get;
          if (v && v.isReactWarning)
            return !1;
        }
        return c.key !== void 0;
      }
      function Vr(c, v) {
        if (typeof c.ref == "string" && fe.current && v && fe.current.stateNode !== v) {
          var g = H(fe.current.type);
          je[g] || (I('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', H(fe.current.type), c.ref), je[g] = !0);
        }
      }
      function Wr(c, v) {
        {
          var g = function() {
            Ot || (Ot = !0, I("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", v));
          };
          g.isReactWarning = !0, Object.defineProperty(c, "key", {
            get: g,
            configurable: !0
          });
        }
      }
      function Hr(c, v) {
        {
          var g = function() {
            St || (St = !0, I("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", v));
          };
          g.isReactWarning = !0, Object.defineProperty(c, "ref", {
            get: g,
            configurable: !0
          });
        }
      }
      var qr = function(c, v, g, E, A, C, T) {
        var P = {
          $$typeof: n,
          type: c,
          key: v,
          ref: g,
          props: T,
          _owner: C
        };
        return P._store = {}, Object.defineProperty(P._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(P, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: E
        }), Object.defineProperty(P, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: A
        }), Object.freeze && (Object.freeze(P.props), Object.freeze(P)), P;
      };
      function Jr(c, v, g, E, A) {
        {
          var C, T = {}, P = null, B = null;
          g !== void 0 && (P = "" + g), zr(v) && (P = "" + v.key), Mr(v) && (B = v.ref, Vr(v, A));
          for (C in v)
            Re.call(v, C) && !Br.hasOwnProperty(C) && (T[C] = v[C]);
          if (c && c.defaultProps) {
            var F = c.defaultProps;
            for (C in F)
              T[C] === void 0 && (T[C] = F[C]);
          }
          if (P || B) {
            var k = typeof c == "function" ? c.displayName || c.name || "Unknown" : c;
            P && Wr(T, k), B && Hr(T, k);
          }
          return qr(c, P, B, A, E, fe.current, T);
        }
      }
      var Pe = U.ReactCurrentOwner, xt = U.ReactDebugCurrentFrame;
      function ee(c) {
        if (c) {
          var v = c._owner, g = we(c.type, c._source, v ? v.type : null);
          xt.setExtraStackFrame(g);
        } else
          xt.setExtraStackFrame(null);
      }
      var Te;
      Te = !1;
      function Ae(c) {
        return typeof c == "object" && c !== null && c.$$typeof === n;
      }
      function Rt() {
        {
          if (Pe.current) {
            var c = H(Pe.current.type);
            if (c)
              return `

Check the render method of \`` + c + "`.";
          }
          return "";
        }
      }
      function Kr(c) {
        {
          if (c !== void 0) {
            var v = c.fileName.replace(/^.*[\\\/]/, ""), g = c.lineNumber;
            return `

Check your code at ` + v + ":" + g + ".";
          }
          return "";
        }
      }
      var jt = {};
      function Gr(c) {
        {
          var v = Rt();
          if (!v) {
            var g = typeof c == "string" ? c : c.displayName || c.name;
            g && (v = `

Check the top-level render call using <` + g + ">.");
          }
          return v;
        }
      }
      function Pt(c, v) {
        {
          if (!c._store || c._store.validated || c.key != null)
            return;
          c._store.validated = !0;
          var g = Gr(v);
          if (jt[g])
            return;
          jt[g] = !0;
          var E = "";
          c && c._owner && c._owner !== Pe.current && (E = " It was passed a child from " + H(c._owner.type) + "."), ee(c), I('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', g, E), ee(null);
        }
      }
      function Tt(c, v) {
        {
          if (typeof c != "object")
            return;
          if (Array.isArray(c))
            for (var g = 0; g < c.length; g++) {
              var E = c[g];
              Ae(E) && Pt(E, v);
            }
          else if (Ae(c))
            c._store && (c._store.validated = !0);
          else if (c) {
            var A = N(c);
            if (typeof A == "function" && A !== c.entries)
              for (var C = A.call(c), T; !(T = C.next()).done; )
                Ae(T.value) && Pt(T.value, v);
          }
        }
      }
      function Yr(c) {
        {
          var v = c.type;
          if (v == null || typeof v == "string")
            return;
          var g;
          if (typeof v == "function")
            g = v.propTypes;
          else if (typeof v == "object" && (v.$$typeof === l || v.$$typeof === d))
            g = v.propTypes;
          else
            return;
          if (g) {
            var E = H(v);
            $r(g, c.props, "prop", E, c);
          } else if (v.PropTypes !== void 0 && !Te) {
            Te = !0;
            var A = H(v);
            I("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", A || "Unknown");
          }
          typeof v.getDefaultProps == "function" && !v.getDefaultProps.isReactClassApproved && I("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Xr(c) {
        {
          for (var v = Object.keys(c.props), g = 0; g < v.length; g++) {
            var E = v[g];
            if (E !== "children" && E !== "key") {
              ee(c), I("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", E), ee(null);
              break;
            }
          }
          c.ref !== null && (ee(c), I("Invalid attribute `ref` supplied to `React.Fragment`."), ee(null));
        }
      }
      function At(c, v, g, E, A, C) {
        {
          var T = oe(c);
          if (!T) {
            var P = "";
            (c === void 0 || typeof c == "object" && c !== null && Object.keys(c).length === 0) && (P += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var B = Kr(A);
            B ? P += B : P += Rt();
            var F;
            c === null ? F = "null" : Array.isArray(c) ? F = "array" : c !== void 0 && c.$$typeof === n ? (F = "<" + (H(c.type) || "Unknown") + " />", P = " Did you accidentally export a JSX literal instead of a component?") : F = typeof c, I("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", F, P);
          }
          var k = Jr(c, v, g, A, C);
          if (k == null)
            return k;
          if (T) {
            var q = v.children;
            if (q !== void 0)
              if (E)
                if (Array.isArray(q)) {
                  for (var te = 0; te < q.length; te++)
                    Tt(q[te], c);
                  Object.freeze && Object.freeze(q);
                } else
                  I("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
              else
                Tt(q, c);
          }
          return c === e.Fragment ? Xr(k) : Yr(k), k;
        }
      }
      function Zr(c, v, g) {
        return At(c, v, g, !0);
      }
      function Qr(c, v, g) {
        return At(c, v, g, !1);
      }
      var en = Qr, tn = Zr;
      e.jsx = en, e.jsxs = tn;
    }();
  }(Wi)), Wi;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = X_() : e.exports = Z_();
})(Y_);
const cr = bn.Fragment, Q = bn.jsx, ka = bn.jsxs, VI = (e = () => {
}) => {
  const [t, r] = ne(!1);
  t || (e(), r(!0));
};
var Q_ = Object.defineProperty, eO = (e, t, r) => t in e ? Q_(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, de = (e, t, r) => (eO(e, typeof t != "symbol" ? t + "" : t, r), r);
/**
 * @remix-run/router v1.2.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function Ua() {
  return Ua = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ua.apply(this, arguments);
}
var Yc;
(function(e) {
  e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
})(Yc || (Yc = {}));
function ve(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function $a(e) {
  let {
    pathname: t = "/",
    search: r = "",
    hash: n = ""
  } = e;
  return r && r !== "?" && (t += r.charAt(0) === "?" ? r : "?" + r), n && n !== "#" && (t += n.charAt(0) === "#" ? n : "#" + n), t;
}
function ld(e) {
  let t = {};
  if (e) {
    let r = e.indexOf("#");
    r >= 0 && (t.hash = e.substr(r), e = e.substr(0, r));
    let n = e.indexOf("?");
    n >= 0 && (t.search = e.substr(n), e = e.substr(0, n)), e && (t.pathname = e);
  }
  return t;
}
var Xc;
(function(e) {
  e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error";
})(Xc || (Xc = {}));
function tO(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function rO(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: r,
    search: n = "",
    hash: o = ""
  } = typeof e == "string" ? ld(e) : e;
  return {
    pathname: r ? r.startsWith("/") ? r : nO(r, t) : t,
    search: oO(n),
    hash: iO(o)
  };
}
function nO(e, t) {
  let r = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((n) => {
    n === ".." ? r.length > 1 && r.pop() : n !== "." && r.push(n);
  }), r.length > 1 ? r.join("/") : "/";
}
function Hi(e, t, r, n) {
  return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(n) + "].  Please separate it out to the ") + ("`to." + r + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function fd(e) {
  return e.filter((t, r) => r === 0 || t.route.path && t.route.path.length > 0);
}
function pd(e, t, r, n) {
  n === void 0 && (n = !1);
  let o;
  typeof e == "string" ? o = ld(e) : (o = Ua({}, e), ve(!o.pathname || !o.pathname.includes("?"), Hi("?", "pathname", "search", o)), ve(!o.pathname || !o.pathname.includes("#"), Hi("#", "pathname", "hash", o)), ve(!o.search || !o.search.includes("#"), Hi("#", "search", "hash", o)));
  let i = e === "" || o.pathname === "", a = i ? "/" : o.pathname, s;
  if (n || a == null)
    s = r;
  else {
    let p = t.length - 1;
    if (a.startsWith("..")) {
      let d = a.split("/");
      for (; d[0] === ".."; )
        d.shift(), p -= 1;
      o.pathname = d.join("/");
    }
    s = p >= 0 ? t[p] : "/";
  }
  let u = rO(o, s), l = a && a !== "/" && a.endsWith("/"), f = (i || a === ".") && r.endsWith("/");
  return !u.pathname.endsWith("/") && (l || f) && (u.pathname += "/"), u;
}
const Ys = (e) => e.join("/").replace(/\/\/+/g, "/"), oO = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, iO = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e;
"useSyncExternalStore" in b && ((e) => e.useSyncExternalStore)(b);
const aO = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (aO.displayName = "DataStaticRouterContext");
const dd = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (dd.displayName = "DataRouter");
const hd = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (hd.displayName = "DataRouterState");
const sO = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (sO.displayName = "Await");
const Fn = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (Fn.displayName = "Navigation");
const Xs = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (Xs.displayName = "Location");
const kn = /* @__PURE__ */ b.createContext({
  outlet: null,
  matches: []
});
process.env.NODE_ENV !== "production" && (kn.displayName = "Route");
const uO = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (uO.displayName = "RouteError");
function cO(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t;
  Zs() || (process.env.NODE_ENV !== "production" ? ve(
    !1,
    "useHref() may be used only in the context of a <Router> component."
  ) : ve(!1));
  let {
    basename: n,
    navigator: o
  } = b.useContext(Fn), {
    hash: i,
    pathname: a,
    search: s
  } = si(e, {
    relative: r
  }), u = a;
  return n !== "/" && (u = a === "/" ? n : Ys([n, a])), o.createHref({
    pathname: u,
    search: s,
    hash: i
  });
}
function Zs() {
  return b.useContext(Xs) != null;
}
function Un() {
  return Zs() || (process.env.NODE_ENV !== "production" ? ve(
    !1,
    "useLocation() may be used only in the context of a <Router> component."
  ) : ve(!1)), b.useContext(Xs).location;
}
function lO() {
  Zs() || (process.env.NODE_ENV !== "production" ? ve(
    !1,
    "useNavigate() may be used only in the context of a <Router> component."
  ) : ve(!1));
  let {
    basename: e,
    navigator: t
  } = b.useContext(Fn), {
    matches: r
  } = b.useContext(kn), {
    pathname: n
  } = Un(), o = JSON.stringify(fd(r).map((a) => a.pathnameBase)), i = b.useRef(!1);
  return b.useEffect(() => {
    i.current = !0;
  }), b.useCallback(function(a, s) {
    if (s === void 0 && (s = {}), process.env.NODE_ENV !== "production" && tO(i.current, "You should call navigate() in a React.useEffect(), not when your component is first rendered."), !i.current)
      return;
    if (typeof a == "number") {
      t.go(a);
      return;
    }
    let u = pd(a, JSON.parse(o), n, s.relative === "path");
    e !== "/" && (u.pathname = u.pathname === "/" ? e : Ys([e, u.pathname])), (s.replace ? t.replace : t.push)(u, s.state, s);
  }, [e, t, o, n]);
}
const fO = /* @__PURE__ */ b.createContext(null);
function pO(e) {
  let t = b.useContext(kn).outlet;
  return t && /* @__PURE__ */ b.createElement(fO.Provider, {
    value: e
  }, t);
}
function si(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t, {
    matches: n
  } = b.useContext(kn), {
    pathname: o
  } = Un(), i = JSON.stringify(fd(n).map((a) => a.pathnameBase));
  return b.useMemo(() => pd(e, JSON.parse(i), o, r === "path"), [e, i, o, r]);
}
var Zc;
(function(e) {
  e.UseRevalidator = "useRevalidator";
})(Zc || (Zc = {}));
var Qc;
(function(e) {
  e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator";
})(Qc || (Qc = {}));
function dO(e) {
  return pO(e.context);
}
var el;
(function(e) {
  e[e.pending = 0] = "pending", e[e.success = 1] = "success", e[e.error = 2] = "error";
})(el || (el = {}));
new Promise(() => {
});
/**
 * React Router DOM v6.6.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function Qt() {
  return Qt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Qt.apply(this, arguments);
}
function Qs(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), o, i;
  for (i = 0; i < n.length; i++)
    o = n[i], !(t.indexOf(o) >= 0) && (r[o] = e[o]);
  return r;
}
const uo = "get", qi = "application/x-www-form-urlencoded";
function ui(e) {
  return e != null && typeof e.tagName == "string";
}
function hO(e) {
  return ui(e) && e.tagName.toLowerCase() === "button";
}
function vO(e) {
  return ui(e) && e.tagName.toLowerCase() === "form";
}
function mO(e) {
  return ui(e) && e.tagName.toLowerCase() === "input";
}
function yO(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function gO(e, t) {
  return e.button === 0 && (!t || t === "_self") && !yO(e);
}
function bO(e, t, r) {
  let n, o, i, a;
  if (vO(e)) {
    let l = r.submissionTrigger;
    n = r.method || e.getAttribute("method") || uo, o = r.action || e.getAttribute("action") || t, i = r.encType || e.getAttribute("enctype") || qi, a = new FormData(e), l && l.name && a.append(l.name, l.value);
  } else if (hO(e) || mO(e) && (e.type === "submit" || e.type === "image")) {
    let l = e.form;
    if (l == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    n = r.method || e.getAttribute("formmethod") || l.getAttribute("method") || uo, o = r.action || e.getAttribute("formaction") || l.getAttribute("action") || t, i = r.encType || e.getAttribute("formenctype") || l.getAttribute("enctype") || qi, a = new FormData(l), e.name && a.append(e.name, e.value);
  } else {
    if (ui(e))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    if (n = r.method || uo, o = r.action || t, i = r.encType || qi, e instanceof FormData)
      a = e;
    else if (a = new FormData(), e instanceof URLSearchParams)
      for (let [l, f] of e)
        a.append(l, f);
    else if (e != null)
      for (let l of Object.keys(e))
        a.append(l, e[l]);
  }
  let {
    protocol: s,
    host: u
  } = window.location;
  return {
    url: new URL(o, s + "//" + u),
    method: n.toLowerCase(),
    encType: i,
    formData: a
  };
}
const wO = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset"], EO = ["aria-current", "caseSensitive", "className", "end", "style", "to", "children"], _O = ["reloadDocument", "replace", "method", "action", "onSubmit", "fetcherKey", "routeId", "relative"];
process.env.NODE_ENV;
const vd = /* @__PURE__ */ b.forwardRef(function(e, t) {
  let {
    onClick: r,
    relative: n,
    reloadDocument: o,
    replace: i,
    state: a,
    target: s,
    to: u,
    preventScrollReset: l
  } = e, f = Qs(e, wO), p = cO(u, {
    relative: n
  }), d = jO(u, {
    replace: i,
    state: a,
    target: s,
    preventScrollReset: l,
    relative: n
  });
  function h(m) {
    r && r(m), m.defaultPrevented || d(m);
  }
  return /* @__PURE__ */ b.createElement("a", Qt({}, f, {
    href: p,
    onClick: o ? r : h,
    ref: t,
    target: s
  }));
});
process.env.NODE_ENV !== "production" && (vd.displayName = "Link");
const OO = /* @__PURE__ */ b.forwardRef(function(e, t) {
  let {
    "aria-current": r = "page",
    caseSensitive: n = !1,
    className: o = "",
    end: i = !1,
    style: a,
    to: s,
    children: u
  } = e, l = Qs(e, EO), f = si(s, {
    relative: l.relative
  }), p = Un(), d = b.useContext(hd), {
    navigator: h
  } = b.useContext(Fn), m = h.encodeLocation ? h.encodeLocation(f).pathname : f.pathname, y = p.pathname, _ = d && d.navigation && d.navigation.location ? d.navigation.location.pathname : null;
  n || (y = y.toLowerCase(), _ = _ ? _.toLowerCase() : null, m = m.toLowerCase());
  let j = y === m || !i && y.startsWith(m) && y.charAt(m.length) === "/", L = _ != null && (_ === m || !i && _.startsWith(m) && _.charAt(m.length) === "/"), w = j ? r : void 0, O;
  typeof o == "function" ? O = o({
    isActive: j,
    isPending: L
  }) : O = [o, j ? "active" : null, L ? "pending" : null].filter(Boolean).join(" ");
  let D = typeof a == "function" ? a({
    isActive: j,
    isPending: L
  }) : a;
  return /* @__PURE__ */ b.createElement(vd, Qt({}, l, {
    "aria-current": w,
    className: O,
    ref: t,
    style: D,
    to: s
  }), typeof u == "function" ? u({
    isActive: j,
    isPending: L
  }) : u);
});
process.env.NODE_ENV !== "production" && (OO.displayName = "NavLink");
const SO = /* @__PURE__ */ b.forwardRef((e, t) => /* @__PURE__ */ b.createElement(md, Qt({}, e, {
  ref: t
})));
process.env.NODE_ENV !== "production" && (SO.displayName = "Form");
const md = /* @__PURE__ */ b.forwardRef((e, t) => {
  let {
    reloadDocument: r,
    replace: n,
    method: o = uo,
    action: i,
    onSubmit: a,
    fetcherKey: s,
    routeId: u,
    relative: l
  } = e, f = Qs(e, _O), p = PO(s, u), d = o.toLowerCase() === "get" ? "get" : "post", h = yd(i, {
    relative: l
  }), m = (y) => {
    if (a && a(y), y.defaultPrevented)
      return;
    y.preventDefault();
    let _ = y.nativeEvent.submitter, j = (_ == null ? void 0 : _.getAttribute("formmethod")) || o;
    p(_ || y.currentTarget, {
      method: j,
      replace: n,
      relative: l
    });
  };
  return /* @__PURE__ */ b.createElement("form", Qt({
    ref: t,
    method: d,
    action: h,
    onSubmit: r ? a : m
  }, f));
});
process.env.NODE_ENV !== "production" && (md.displayName = "FormImpl");
process.env.NODE_ENV;
var Ba;
(function(e) {
  e.UseScrollRestoration = "useScrollRestoration", e.UseSubmitImpl = "useSubmitImpl", e.UseFetcher = "useFetcher";
})(Ba || (Ba = {}));
var tl;
(function(e) {
  e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration";
})(tl || (tl = {}));
function xO(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function RO(e) {
  let t = b.useContext(dd);
  return t || (process.env.NODE_ENV !== "production" ? ve(!1, xO(e)) : ve(!1)), t;
}
function jO(e, t) {
  let {
    target: r,
    replace: n,
    state: o,
    preventScrollReset: i,
    relative: a
  } = t === void 0 ? {} : t, s = lO(), u = Un(), l = si(e, {
    relative: a
  });
  return b.useCallback((f) => {
    if (gO(f, r)) {
      f.preventDefault();
      let p = n !== void 0 ? n : $a(u) === $a(l);
      s(e, {
        replace: p,
        state: o,
        preventScrollReset: i,
        relative: a
      });
    }
  }, [u, s, l, n, o, r, e, i, a]);
}
function PO(e, t) {
  let {
    router: r
  } = RO(Ba.UseSubmitImpl), n = yd();
  return b.useCallback(function(o, i) {
    if (i === void 0 && (i = {}), typeof document > "u")
      throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
    let {
      method: a,
      encType: s,
      formData: u,
      url: l
    } = bO(o, n, i), f = l.pathname + l.search, p = {
      replace: i.replace,
      formData: u,
      formMethod: a,
      formEncType: s
    };
    e ? (t == null && (process.env.NODE_ENV !== "production" ? ve(!1, "No routeId available for useFetcher()") : ve(!1)), r.fetch(e, t, f, p)) : r.navigate(f, p);
  }, [n, r, e, t]);
}
function yd(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t, {
    basename: n
  } = b.useContext(Fn), o = b.useContext(kn);
  o || (process.env.NODE_ENV !== "production" ? ve(!1, "useFormAction must be used inside a RouteContext") : ve(!1));
  let [i] = o.matches.slice(-1), a = Qt({}, si(e || ".", {
    relative: r
  })), s = Un();
  if (e == null && (a.search = s.search, a.hash = s.hash, i.route.index)) {
    let u = new URLSearchParams(a.search);
    u.delete("index"), a.search = u.toString() ? "?" + u.toString() : "";
  }
  return (!e || e === ".") && i.route.index && (a.search = a.search ? a.search.replace(/^\?/, "?index&") : "?index"), n !== "/" && (a.pathname = a.pathname === "/" ? n : Ys([n, a.pathname])), $a(a);
}
var TO = typeof global == "object" && global && global.Object === Object && global;
const gd = TO;
var AO = typeof self == "object" && self && self.Object === Object && self, CO = gd || AO || Function("return this")();
const He = CO;
var NO = He.Symbol;
const $t = NO;
var bd = Object.prototype, DO = bd.hasOwnProperty, LO = bd.toString, on = $t ? $t.toStringTag : void 0;
function IO(e) {
  var t = DO.call(e, on), r = e[on];
  try {
    e[on] = void 0;
    var n = !0;
  } catch {
  }
  var o = LO.call(e);
  return n && (t ? e[on] = r : delete e[on]), o;
}
var FO = Object.prototype, kO = FO.toString;
function UO(e) {
  return kO.call(e);
}
var $O = "[object Null]", BO = "[object Undefined]", rl = $t ? $t.toStringTag : void 0;
function lr(e) {
  return e == null ? e === void 0 ? BO : $O : rl && rl in Object(e) ? IO(e) : UO(e);
}
function Bt(e) {
  return e != null && typeof e == "object";
}
var MO = "[object Symbol]";
function eu(e) {
  return typeof e == "symbol" || Bt(e) && lr(e) == MO;
}
function zO(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, o = Array(n); ++r < n; )
    o[r] = t(e[r], r, e);
  return o;
}
var VO = Array.isArray;
const De = VO;
var WO = 1 / 0, nl = $t ? $t.prototype : void 0, ol = nl ? nl.toString : void 0;
function wd(e) {
  if (typeof e == "string")
    return e;
  if (De(e))
    return zO(e, wd) + "";
  if (eu(e))
    return ol ? ol.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -WO ? "-0" : t;
}
function Wt(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
function tu(e) {
  return e;
}
var HO = "[object AsyncFunction]", qO = "[object Function]", JO = "[object GeneratorFunction]", KO = "[object Proxy]";
function ru(e) {
  if (!Wt(e))
    return !1;
  var t = lr(e);
  return t == qO || t == JO || t == HO || t == KO;
}
var GO = He["__core-js_shared__"];
const Ji = GO;
var il = function() {
  var e = /[^.]+$/.exec(Ji && Ji.keys && Ji.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function YO(e) {
  return !!il && il in e;
}
var XO = Function.prototype, ZO = XO.toString;
function fr(e) {
  if (e != null) {
    try {
      return ZO.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var QO = /[\\^$.*+?()[\]{}|]/g, e0 = /^\[object .+?Constructor\]$/, t0 = Function.prototype, r0 = Object.prototype, n0 = t0.toString, o0 = r0.hasOwnProperty, i0 = RegExp(
  "^" + n0.call(o0).replace(QO, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function a0(e) {
  if (!Wt(e) || YO(e))
    return !1;
  var t = ru(e) ? i0 : e0;
  return t.test(fr(e));
}
function s0(e, t) {
  return e == null ? void 0 : e[t];
}
function pr(e, t) {
  var r = s0(e, t);
  return a0(r) ? r : void 0;
}
var u0 = pr(He, "WeakMap");
const Ma = u0;
var al = Object.create, c0 = function() {
  function e() {
  }
  return function(t) {
    if (!Wt(t))
      return {};
    if (al)
      return al(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}();
const l0 = c0;
function f0(e, t, r) {
  switch (r.length) {
    case 0:
      return e.call(t);
    case 1:
      return e.call(t, r[0]);
    case 2:
      return e.call(t, r[0], r[1]);
    case 3:
      return e.call(t, r[0], r[1], r[2]);
  }
  return e.apply(t, r);
}
function p0() {
}
function d0(e, t) {
  var r = -1, n = e.length;
  for (t || (t = Array(n)); ++r < n; )
    t[r] = e[r];
  return t;
}
var h0 = 800, v0 = 16, m0 = Date.now;
function y0(e) {
  var t = 0, r = 0;
  return function() {
    var n = m0(), o = v0 - (n - r);
    if (r = n, o > 0) {
      if (++t >= h0)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function g0(e) {
  return function() {
    return e;
  };
}
var b0 = function() {
  try {
    var e = pr(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
const Lo = b0;
var w0 = Lo ? function(e, t) {
  return Lo(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: g0(t),
    writable: !0
  });
} : tu;
const E0 = w0;
var _0 = y0(E0);
const O0 = _0;
function S0(e, t, r, n) {
  for (var o = e.length, i = r + (n ? 1 : -1); n ? i-- : ++i < o; )
    if (t(e[i], i, e))
      return i;
  return -1;
}
function x0(e) {
  return e !== e;
}
function R0(e, t, r) {
  for (var n = r - 1, o = e.length; ++n < o; )
    if (e[n] === t)
      return n;
  return -1;
}
function j0(e, t, r) {
  return t === t ? R0(e, t, r) : S0(e, x0, r);
}
function P0(e, t) {
  var r = e == null ? 0 : e.length;
  return !!r && j0(e, t, 0) > -1;
}
var T0 = 9007199254740991, A0 = /^(?:0|[1-9]\d*)$/;
function nu(e, t) {
  var r = typeof e;
  return t = t ?? T0, !!t && (r == "number" || r != "symbol" && A0.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function ou(e, t, r) {
  t == "__proto__" && Lo ? Lo(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
function $n(e, t) {
  return e === t || e !== e && t !== t;
}
var C0 = Object.prototype, N0 = C0.hasOwnProperty;
function D0(e, t, r) {
  var n = e[t];
  (!(N0.call(e, t) && $n(n, r)) || r === void 0 && !(t in e)) && ou(e, t, r);
}
function L0(e, t, r, n) {
  var o = !r;
  r || (r = {});
  for (var i = -1, a = t.length; ++i < a; ) {
    var s = t[i], u = n ? n(r[s], e[s], s, r, e) : void 0;
    u === void 0 && (u = e[s]), o ? ou(r, s, u) : D0(r, s, u);
  }
  return r;
}
var sl = Math.max;
function I0(e, t, r) {
  return t = sl(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var n = arguments, o = -1, i = sl(n.length - t, 0), a = Array(i); ++o < i; )
      a[o] = n[t + o];
    o = -1;
    for (var s = Array(t + 1); ++o < t; )
      s[o] = n[o];
    return s[t] = r(a), f0(e, this, s);
  };
}
function F0(e, t) {
  return O0(I0(e, t, tu), e + "");
}
var k0 = 9007199254740991;
function iu(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= k0;
}
function ci(e) {
  return e != null && iu(e.length) && !ru(e);
}
function U0(e, t, r) {
  if (!Wt(r))
    return !1;
  var n = typeof t;
  return (n == "number" ? ci(r) && nu(t, r.length) : n == "string" && t in r) ? $n(r[t], e) : !1;
}
function $0(e) {
  return F0(function(t, r) {
    var n = -1, o = r.length, i = o > 1 ? r[o - 1] : void 0, a = o > 2 ? r[2] : void 0;
    for (i = e.length > 3 && typeof i == "function" ? (o--, i) : void 0, a && U0(r[0], r[1], a) && (i = o < 3 ? void 0 : i, o = 1), t = Object(t); ++n < o; ) {
      var s = r[n];
      s && e(t, s, n, i);
    }
    return t;
  });
}
var B0 = Object.prototype;
function au(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || B0;
  return e === r;
}
function M0(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var z0 = "[object Arguments]";
function ul(e) {
  return Bt(e) && lr(e) == z0;
}
var Ed = Object.prototype, V0 = Ed.hasOwnProperty, W0 = Ed.propertyIsEnumerable, H0 = ul(function() {
  return arguments;
}()) ? ul : function(e) {
  return Bt(e) && V0.call(e, "callee") && !W0.call(e, "callee");
};
const Io = H0;
function q0() {
  return !1;
}
var _d = typeof exports == "object" && exports && !exports.nodeType && exports, cl = _d && typeof module == "object" && module && !module.nodeType && module, J0 = cl && cl.exports === _d, ll = J0 ? He.Buffer : void 0, K0 = ll ? ll.isBuffer : void 0, G0 = K0 || q0;
const Fo = G0;
var Y0 = "[object Arguments]", X0 = "[object Array]", Z0 = "[object Boolean]", Q0 = "[object Date]", eS = "[object Error]", tS = "[object Function]", rS = "[object Map]", nS = "[object Number]", oS = "[object Object]", iS = "[object RegExp]", aS = "[object Set]", sS = "[object String]", uS = "[object WeakMap]", cS = "[object ArrayBuffer]", lS = "[object DataView]", fS = "[object Float32Array]", pS = "[object Float64Array]", dS = "[object Int8Array]", hS = "[object Int16Array]", vS = "[object Int32Array]", mS = "[object Uint8Array]", yS = "[object Uint8ClampedArray]", gS = "[object Uint16Array]", bS = "[object Uint32Array]", G = {};
G[fS] = G[pS] = G[dS] = G[hS] = G[vS] = G[mS] = G[yS] = G[gS] = G[bS] = !0;
G[Y0] = G[X0] = G[cS] = G[Z0] = G[lS] = G[Q0] = G[eS] = G[tS] = G[rS] = G[nS] = G[oS] = G[iS] = G[aS] = G[sS] = G[uS] = !1;
function wS(e) {
  return Bt(e) && iu(e.length) && !!G[lr(e)];
}
function ES(e) {
  return function(t) {
    return e(t);
  };
}
var Od = typeof exports == "object" && exports && !exports.nodeType && exports, dn = Od && typeof module == "object" && module && !module.nodeType && module, _S = dn && dn.exports === Od, Ki = _S && gd.process, OS = function() {
  try {
    var e = dn && dn.require && dn.require("util").types;
    return e || Ki && Ki.binding && Ki.binding("util");
  } catch {
  }
}();
const fl = OS;
var pl = fl && fl.isTypedArray, SS = pl ? ES(pl) : wS;
const su = SS;
var xS = Object.prototype, RS = xS.hasOwnProperty;
function Sd(e, t) {
  var r = De(e), n = !r && Io(e), o = !r && !n && Fo(e), i = !r && !n && !o && su(e), a = r || n || o || i, s = a ? M0(e.length, String) : [], u = s.length;
  for (var l in e)
    (t || RS.call(e, l)) && !(a && (l == "length" || o && (l == "offset" || l == "parent") || i && (l == "buffer" || l == "byteLength" || l == "byteOffset") || nu(l, u))) && s.push(l);
  return s;
}
function xd(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var jS = xd(Object.keys, Object);
const PS = jS;
var TS = Object.prototype, AS = TS.hasOwnProperty;
function CS(e) {
  if (!au(e))
    return PS(e);
  var t = [];
  for (var r in Object(e))
    AS.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
function Rd(e) {
  return ci(e) ? Sd(e) : CS(e);
}
function NS(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var DS = Object.prototype, LS = DS.hasOwnProperty;
function IS(e) {
  if (!Wt(e))
    return NS(e);
  var t = au(e), r = [];
  for (var n in e)
    n == "constructor" && (t || !LS.call(e, n)) || r.push(n);
  return r;
}
function jd(e) {
  return ci(e) ? Sd(e, !0) : IS(e);
}
var FS = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, kS = /^\w*$/;
function uu(e, t) {
  if (De(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || eu(e) ? !0 : kS.test(e) || !FS.test(e) || t != null && e in Object(t);
}
var US = pr(Object, "create");
const wn = US;
function $S() {
  this.__data__ = wn ? wn(null) : {}, this.size = 0;
}
function BS(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var MS = "__lodash_hash_undefined__", zS = Object.prototype, VS = zS.hasOwnProperty;
function WS(e) {
  var t = this.__data__;
  if (wn) {
    var r = t[e];
    return r === MS ? void 0 : r;
  }
  return VS.call(t, e) ? t[e] : void 0;
}
var HS = Object.prototype, qS = HS.hasOwnProperty;
function JS(e) {
  var t = this.__data__;
  return wn ? t[e] !== void 0 : qS.call(t, e);
}
var KS = "__lodash_hash_undefined__";
function GS(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = wn && t === void 0 ? KS : t, this;
}
function er(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
er.prototype.clear = $S;
er.prototype.delete = BS;
er.prototype.get = WS;
er.prototype.has = JS;
er.prototype.set = GS;
function YS() {
  this.__data__ = [], this.size = 0;
}
function li(e, t) {
  for (var r = e.length; r--; )
    if ($n(e[r][0], t))
      return r;
  return -1;
}
var XS = Array.prototype, ZS = XS.splice;
function QS(e) {
  var t = this.__data__, r = li(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : ZS.call(t, r, 1), --this.size, !0;
}
function ex(e) {
  var t = this.__data__, r = li(t, e);
  return r < 0 ? void 0 : t[r][1];
}
function tx(e) {
  return li(this.__data__, e) > -1;
}
function rx(e, t) {
  var r = this.__data__, n = li(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
function ot(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
ot.prototype.clear = YS;
ot.prototype.delete = QS;
ot.prototype.get = ex;
ot.prototype.has = tx;
ot.prototype.set = rx;
var nx = pr(He, "Map");
const En = nx;
function ox() {
  this.size = 0, this.__data__ = {
    hash: new er(),
    map: new (En || ot)(),
    string: new er()
  };
}
function ix(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function fi(e, t) {
  var r = e.__data__;
  return ix(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
function ax(e) {
  var t = fi(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function sx(e) {
  return fi(this, e).get(e);
}
function ux(e) {
  return fi(this, e).has(e);
}
function cx(e, t) {
  var r = fi(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
function it(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
it.prototype.clear = ox;
it.prototype.delete = ax;
it.prototype.get = sx;
it.prototype.has = ux;
it.prototype.set = cx;
var lx = "Expected a function";
function cu(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(lx);
  var r = function() {
    var n = arguments, o = t ? t.apply(this, n) : n[0], i = r.cache;
    if (i.has(o))
      return i.get(o);
    var a = e.apply(this, n);
    return r.cache = i.set(o, a) || i, a;
  };
  return r.cache = new (cu.Cache || it)(), r;
}
cu.Cache = it;
var fx = 500;
function px(e) {
  var t = cu(e, function(n) {
    return r.size === fx && r.clear(), n;
  }), r = t.cache;
  return t;
}
var dx = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, hx = /\\(\\)?/g, vx = px(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(dx, function(r, n, o, i) {
    t.push(o ? i.replace(hx, "$1") : n || r);
  }), t;
});
const mx = vx;
function yx(e) {
  return e == null ? "" : wd(e);
}
function Pd(e, t) {
  return De(e) ? e : uu(e, t) ? [e] : mx(yx(e));
}
var gx = 1 / 0;
function pi(e) {
  if (typeof e == "string" || eu(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -gx ? "-0" : t;
}
function Td(e, t) {
  t = Pd(t, e);
  for (var r = 0, n = t.length; e != null && r < n; )
    e = e[pi(t[r++])];
  return r && r == n ? e : void 0;
}
function bx(e, t, r) {
  var n = e == null ? void 0 : Td(e, t);
  return n === void 0 ? r : n;
}
function wx(e, t) {
  for (var r = -1, n = t.length, o = e.length; ++r < n; )
    e[o + r] = t[r];
  return e;
}
var Ex = xd(Object.getPrototypeOf, Object);
const Ad = Ex;
var _x = "[object Object]", Ox = Function.prototype, Sx = Object.prototype, Cd = Ox.toString, xx = Sx.hasOwnProperty, Rx = Cd.call(Object);
function jx(e) {
  if (!Bt(e) || lr(e) != _x)
    return !1;
  var t = Ad(e);
  if (t === null)
    return !0;
  var r = xx.call(t, "constructor") && t.constructor;
  return typeof r == "function" && r instanceof r && Cd.call(r) == Rx;
}
function Px() {
  this.__data__ = new ot(), this.size = 0;
}
function Tx(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
function Ax(e) {
  return this.__data__.get(e);
}
function Cx(e) {
  return this.__data__.has(e);
}
var Nx = 200;
function Dx(e, t) {
  var r = this.__data__;
  if (r instanceof ot) {
    var n = r.__data__;
    if (!En || n.length < Nx - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new it(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
function ze(e) {
  var t = this.__data__ = new ot(e);
  this.size = t.size;
}
ze.prototype.clear = Px;
ze.prototype.delete = Tx;
ze.prototype.get = Ax;
ze.prototype.has = Cx;
ze.prototype.set = Dx;
var Nd = typeof exports == "object" && exports && !exports.nodeType && exports, dl = Nd && typeof module == "object" && module && !module.nodeType && module, Lx = dl && dl.exports === Nd, hl = Lx ? He.Buffer : void 0, vl = hl ? hl.allocUnsafe : void 0;
function Ix(e, t) {
  if (t)
    return e.slice();
  var r = e.length, n = vl ? vl(r) : new e.constructor(r);
  return e.copy(n), n;
}
function Fx(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, o = 0, i = []; ++r < n; ) {
    var a = e[r];
    t(a, r, e) && (i[o++] = a);
  }
  return i;
}
function kx() {
  return [];
}
var Ux = Object.prototype, $x = Ux.propertyIsEnumerable, ml = Object.getOwnPropertySymbols, Bx = ml ? function(e) {
  return e == null ? [] : (e = Object(e), Fx(ml(e), function(t) {
    return $x.call(e, t);
  }));
} : kx;
const Mx = Bx;
function zx(e, t, r) {
  var n = t(e);
  return De(e) ? n : wx(n, r(e));
}
function yl(e) {
  return zx(e, Rd, Mx);
}
var Vx = pr(He, "DataView");
const za = Vx;
var Wx = pr(He, "Promise");
const Va = Wx;
var Hx = pr(He, "Set");
const wr = Hx;
var gl = "[object Map]", qx = "[object Object]", bl = "[object Promise]", wl = "[object Set]", El = "[object WeakMap]", _l = "[object DataView]", Jx = fr(za), Kx = fr(En), Gx = fr(Va), Yx = fr(wr), Xx = fr(Ma), Jt = lr;
(za && Jt(new za(new ArrayBuffer(1))) != _l || En && Jt(new En()) != gl || Va && Jt(Va.resolve()) != bl || wr && Jt(new wr()) != wl || Ma && Jt(new Ma()) != El) && (Jt = function(e) {
  var t = lr(e), r = t == qx ? e.constructor : void 0, n = r ? fr(r) : "";
  if (n)
    switch (n) {
      case Jx:
        return _l;
      case Kx:
        return gl;
      case Gx:
        return bl;
      case Yx:
        return wl;
      case Xx:
        return El;
    }
  return t;
});
const Ol = Jt;
var Zx = He.Uint8Array;
const ko = Zx;
function Qx(e) {
  var t = new e.constructor(e.byteLength);
  return new ko(t).set(new ko(e)), t;
}
function e1(e, t) {
  var r = t ? Qx(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
function t1(e) {
  return typeof e.constructor == "function" && !au(e) ? l0(Ad(e)) : {};
}
var r1 = "__lodash_hash_undefined__";
function n1(e) {
  return this.__data__.set(e, r1), this;
}
function o1(e) {
  return this.__data__.has(e);
}
function _n(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.__data__ = new it(); ++t < r; )
    this.add(e[t]);
}
_n.prototype.add = _n.prototype.push = n1;
_n.prototype.has = o1;
function i1(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
    if (t(e[r], r, e))
      return !0;
  return !1;
}
function Dd(e, t) {
  return e.has(t);
}
var a1 = 1, s1 = 2;
function Ld(e, t, r, n, o, i) {
  var a = r & a1, s = e.length, u = t.length;
  if (s != u && !(a && u > s))
    return !1;
  var l = i.get(e), f = i.get(t);
  if (l && f)
    return l == t && f == e;
  var p = -1, d = !0, h = r & s1 ? new _n() : void 0;
  for (i.set(e, t), i.set(t, e); ++p < s; ) {
    var m = e[p], y = t[p];
    if (n)
      var _ = a ? n(y, m, p, t, e, i) : n(m, y, p, e, t, i);
    if (_ !== void 0) {
      if (_)
        continue;
      d = !1;
      break;
    }
    if (h) {
      if (!i1(t, function(j, L) {
        if (!Dd(h, L) && (m === j || o(m, j, r, n, i)))
          return h.push(L);
      })) {
        d = !1;
        break;
      }
    } else if (!(m === y || o(m, y, r, n, i))) {
      d = !1;
      break;
    }
  }
  return i.delete(e), i.delete(t), d;
}
function u1(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n, o) {
    r[++t] = [o, n];
  }), r;
}
function lu(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n) {
    r[++t] = n;
  }), r;
}
var c1 = 1, l1 = 2, f1 = "[object Boolean]", p1 = "[object Date]", d1 = "[object Error]", h1 = "[object Map]", v1 = "[object Number]", m1 = "[object RegExp]", y1 = "[object Set]", g1 = "[object String]", b1 = "[object Symbol]", w1 = "[object ArrayBuffer]", E1 = "[object DataView]", Sl = $t ? $t.prototype : void 0, Gi = Sl ? Sl.valueOf : void 0;
function _1(e, t, r, n, o, i, a) {
  switch (r) {
    case E1:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case w1:
      return !(e.byteLength != t.byteLength || !i(new ko(e), new ko(t)));
    case f1:
    case p1:
    case v1:
      return $n(+e, +t);
    case d1:
      return e.name == t.name && e.message == t.message;
    case m1:
    case g1:
      return e == t + "";
    case h1:
      var s = u1;
    case y1:
      var u = n & c1;
      if (s || (s = lu), e.size != t.size && !u)
        return !1;
      var l = a.get(e);
      if (l)
        return l == t;
      n |= l1, a.set(e, t);
      var f = Ld(s(e), s(t), n, o, i, a);
      return a.delete(e), f;
    case b1:
      if (Gi)
        return Gi.call(e) == Gi.call(t);
  }
  return !1;
}
var O1 = 1, S1 = Object.prototype, x1 = S1.hasOwnProperty;
function R1(e, t, r, n, o, i) {
  var a = r & O1, s = yl(e), u = s.length, l = yl(t), f = l.length;
  if (u != f && !a)
    return !1;
  for (var p = u; p--; ) {
    var d = s[p];
    if (!(a ? d in t : x1.call(t, d)))
      return !1;
  }
  var h = i.get(e), m = i.get(t);
  if (h && m)
    return h == t && m == e;
  var y = !0;
  i.set(e, t), i.set(t, e);
  for (var _ = a; ++p < u; ) {
    d = s[p];
    var j = e[d], L = t[d];
    if (n)
      var w = a ? n(L, j, d, t, e, i) : n(j, L, d, e, t, i);
    if (!(w === void 0 ? j === L || o(j, L, r, n, i) : w)) {
      y = !1;
      break;
    }
    _ || (_ = d == "constructor");
  }
  if (y && !_) {
    var O = e.constructor, D = t.constructor;
    O != D && "constructor" in e && "constructor" in t && !(typeof O == "function" && O instanceof O && typeof D == "function" && D instanceof D) && (y = !1);
  }
  return i.delete(e), i.delete(t), y;
}
var j1 = 1, xl = "[object Arguments]", Rl = "[object Array]", Xn = "[object Object]", P1 = Object.prototype, jl = P1.hasOwnProperty;
function T1(e, t, r, n, o, i) {
  var a = De(e), s = De(t), u = a ? Rl : Ol(e), l = s ? Rl : Ol(t);
  u = u == xl ? Xn : u, l = l == xl ? Xn : l;
  var f = u == Xn, p = l == Xn, d = u == l;
  if (d && Fo(e)) {
    if (!Fo(t))
      return !1;
    a = !0, f = !1;
  }
  if (d && !f)
    return i || (i = new ze()), a || su(e) ? Ld(e, t, r, n, o, i) : _1(e, t, u, r, n, o, i);
  if (!(r & j1)) {
    var h = f && jl.call(e, "__wrapped__"), m = p && jl.call(t, "__wrapped__");
    if (h || m) {
      var y = h ? e.value() : e, _ = m ? t.value() : t;
      return i || (i = new ze()), o(y, _, r, n, i);
    }
  }
  return d ? (i || (i = new ze()), R1(e, t, r, n, o, i)) : !1;
}
function fu(e, t, r, n, o) {
  return e === t ? !0 : e == null || t == null || !Bt(e) && !Bt(t) ? e !== e && t !== t : T1(e, t, r, n, fu, o);
}
var A1 = 1, C1 = 2;
function N1(e, t, r, n) {
  var o = r.length, i = o, a = !n;
  if (e == null)
    return !i;
  for (e = Object(e); o--; ) {
    var s = r[o];
    if (a && s[2] ? s[1] !== e[s[0]] : !(s[0] in e))
      return !1;
  }
  for (; ++o < i; ) {
    s = r[o];
    var u = s[0], l = e[u], f = s[1];
    if (a && s[2]) {
      if (l === void 0 && !(u in e))
        return !1;
    } else {
      var p = new ze();
      if (n)
        var d = n(l, f, u, e, t, p);
      if (!(d === void 0 ? fu(f, l, A1 | C1, n, p) : d))
        return !1;
    }
  }
  return !0;
}
function Id(e) {
  return e === e && !Wt(e);
}
function D1(e) {
  for (var t = Rd(e), r = t.length; r--; ) {
    var n = t[r], o = e[n];
    t[r] = [n, o, Id(o)];
  }
  return t;
}
function Fd(e, t) {
  return function(r) {
    return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
  };
}
function L1(e) {
  var t = D1(e);
  return t.length == 1 && t[0][2] ? Fd(t[0][0], t[0][1]) : function(r) {
    return r === e || N1(r, e, t);
  };
}
function I1(e, t) {
  return e != null && t in Object(e);
}
function F1(e, t, r) {
  t = Pd(t, e);
  for (var n = -1, o = t.length, i = !1; ++n < o; ) {
    var a = pi(t[n]);
    if (!(i = e != null && r(e, a)))
      break;
    e = e[a];
  }
  return i || ++n != o ? i : (o = e == null ? 0 : e.length, !!o && iu(o) && nu(a, o) && (De(e) || Io(e)));
}
function k1(e, t) {
  return e != null && F1(e, t, I1);
}
var U1 = 1, $1 = 2;
function B1(e, t) {
  return uu(e) && Id(t) ? Fd(pi(e), t) : function(r) {
    var n = bx(r, e);
    return n === void 0 && n === t ? k1(r, e) : fu(t, n, U1 | $1);
  };
}
function M1(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function z1(e) {
  return function(t) {
    return Td(t, e);
  };
}
function V1(e) {
  return uu(e) ? M1(pi(e)) : z1(e);
}
function W1(e) {
  return typeof e == "function" ? e : e == null ? tu : typeof e == "object" ? De(e) ? B1(e[0], e[1]) : L1(e) : V1(e);
}
function H1(e) {
  return function(t, r, n) {
    for (var o = -1, i = Object(t), a = n(t), s = a.length; s--; ) {
      var u = a[e ? s : ++o];
      if (r(i[u], u, i) === !1)
        break;
    }
    return t;
  };
}
var q1 = H1();
const J1 = q1;
function Wa(e, t, r) {
  (r !== void 0 && !$n(e[t], r) || r === void 0 && !(t in e)) && ou(e, t, r);
}
function K1(e) {
  return Bt(e) && ci(e);
}
function Ha(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function G1(e) {
  return L0(e, jd(e));
}
function Y1(e, t, r, n, o, i, a) {
  var s = Ha(e, r), u = Ha(t, r), l = a.get(u);
  if (l) {
    Wa(e, r, l);
    return;
  }
  var f = i ? i(s, u, r + "", e, t, a) : void 0, p = f === void 0;
  if (p) {
    var d = De(u), h = !d && Fo(u), m = !d && !h && su(u);
    f = u, d || h || m ? De(s) ? f = s : K1(s) ? f = d0(s) : h ? (p = !1, f = Ix(u, !0)) : m ? (p = !1, f = e1(u, !0)) : f = [] : jx(u) || Io(u) ? (f = s, Io(s) ? f = G1(s) : (!Wt(s) || ru(s)) && (f = t1(u))) : p = !1;
  }
  p && (a.set(u, f), o(f, u, n, i, a), a.delete(u)), Wa(e, r, f);
}
function kd(e, t, r, n, o) {
  e !== t && J1(t, function(i, a) {
    if (o || (o = new ze()), Wt(i))
      Y1(e, t, a, r, kd, n, o);
    else {
      var s = n ? n(Ha(e, a), i, a + "", e, t, o) : void 0;
      s === void 0 && (s = i), Wa(e, a, s);
    }
  }, jd);
}
function X1(e, t, r) {
  for (var n = -1, o = e == null ? 0 : e.length; ++n < o; )
    if (r(t, e[n]))
      return !0;
  return !1;
}
var Z1 = $0(function(e, t, r) {
  kd(e, t, r);
});
const Q1 = Z1;
var eR = 1 / 0, tR = wr && 1 / lu(new wr([, -0]))[1] == eR ? function(e) {
  return new wr(e);
} : p0;
const rR = tR;
var nR = 200;
function oR(e, t, r) {
  var n = -1, o = P0, i = e.length, a = !0, s = [], u = s;
  if (r)
    a = !1, o = X1;
  else if (i >= nR) {
    var l = t ? null : rR(e);
    if (l)
      return lu(l);
    a = !1, o = Dd, u = new _n();
  } else
    u = t ? [] : s;
  e:
    for (; ++n < i; ) {
      var f = e[n], p = t ? t(f) : f;
      if (f = r || f !== 0 ? f : 0, a && p === p) {
        for (var d = u.length; d--; )
          if (u[d] === p)
            continue e;
        t && u.push(p), s.push(f);
      } else
        o(u, p, r) || (u !== s && u.push(p), s.push(f));
    }
  return s;
}
function iR(e, t) {
  return e && e.length ? oR(e, W1(t)) : [];
}
var qa = /* @__PURE__ */ ((e) => (e.Json = "application/json", e.UrlEncoded = "application/x-www-form-urlencoded", e))(qa || {});
class aR {
  constructor() {
    de(this, "listeners"), this.listeners = {};
  }
  trigger(t, ...r) {
    var n;
    (n = this.listeners[t]) == null || n.map((o) => o(...r));
  }
  on(t, r) {
    var n;
    return this.listeners[t] ? (n = this.listeners[t]) == null || n.push(r) : this.listeners[t] = [r], () => {
      this.off(t, r);
    };
  }
  off(t, r) {
    var n, o;
    if (this.listeners[t]) {
      const i = (n = this.listeners[t]) == null ? void 0 : n.findIndex((a) => a === r);
      i && i > -1 && ((o = this.listeners[t]) == null || o.splice(i, 1));
    } else
      throw new Error(`${this} is doesn't have event "${String(t)}"`);
  }
}
function Pl(e) {
  for (const t in e)
    Object.prototype.hasOwnProperty.call(e, t) && e[t] === void 0 && delete e[t];
  return e;
}
const Ja = (e, t = "", r = new FormData()) => (Object.keys(e).forEach((n) => {
  const o = t !== "" ? t + "." + n : n, i = e[n];
  Array.isArray(i) ? i.forEach((a, s) => {
    typeof a == "object" ? a instanceof File ? r.append(o, a) : r = Ja(a, o + `[${s}]`, r) : r.append(o, a);
  }) : typeof i == "object" ? i instanceof File ? r.append(o, i) : r = Ja(i, o, r) : r.append(o, i);
}), r), Uo = (e, t = "", r = new URLSearchParams()) => (Object.keys(e).forEach((n) => {
  const o = t !== "" ? t + "." + n : n, i = e[n];
  Array.isArray(i) ? i.forEach((a, s) => {
    typeof a == "object" ? r = Uo(a, o + `[${s}]`, r) : r.append(o, a);
  }) : typeof i == "object" ? r = Uo(i, o, r) : r.append(o, i);
}), r);
class sR {
  constructor() {
    de(this, "modeEnv"), de(this, "subdomain");
  }
  setConfig({ modeEnv: t, subdomain: r }) {
    this.modeEnv = t || void 0, this.subdomain = r || void 0;
  }
  getConfig() {
    return {
      modEnv: this.modeEnv,
      subdomain: this.subdomain
    };
  }
}
const Tl = new sR();
class uR {
  getToken(t) {
    if (this.getPrefix())
      return localStorage.getItem(`${this.getPrefix()}_${t}`) || "";
  }
  setToken(t, r) {
    if (this.getPrefix())
      return localStorage.setItem(`${this.getPrefix()}_${t}`, r);
  }
  getPrefix() {
    const t = Tl.getConfig().modEnv, r = Tl.getConfig().subdomain;
    return !t || !r ? "" : `${t}_${r}`;
  }
}
const cR = new uR();
function Ud(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: $d } = Object.prototype, { getPrototypeOf: pu } = Object, du = ((e) => (t) => {
  const r = $d.call(t);
  return e[r] || (e[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), at = (e) => (e = e.toLowerCase(), (t) => du(t) === e), di = (e) => (t) => typeof t === e, { isArray: Nr } = Array, On = di("undefined");
function lR(e) {
  return e !== null && !On(e) && e.constructor !== null && !On(e.constructor) && tr(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Bd = at("ArrayBuffer");
function fR(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Bd(e.buffer), t;
}
const pR = di("string"), tr = di("function"), Md = di("number"), hu = (e) => e !== null && typeof e == "object", dR = (e) => e === !0 || e === !1, co = (e) => {
  if (du(e) !== "object")
    return !1;
  const t = pu(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, hR = at("Date"), vR = at("File"), mR = at("Blob"), yR = at("FileList"), gR = (e) => hu(e) && tr(e.pipe), bR = (e) => {
  const t = "[object FormData]";
  return e && (typeof FormData == "function" && e instanceof FormData || $d.call(e) === t || tr(e.toString) && e.toString() === t);
}, wR = at("URLSearchParams"), ER = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Bn(e, t, { allOwnKeys: r = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let n, o;
  if (typeof e != "object" && (e = [e]), Nr(e))
    for (n = 0, o = e.length; n < o; n++)
      t.call(null, e[n], n, e);
  else {
    const i = r ? Object.getOwnPropertyNames(e) : Object.keys(e), a = i.length;
    let s;
    for (n = 0; n < a; n++)
      s = i[n], t.call(null, e[s], s, e);
  }
}
function zd(e, t) {
  t = t.toLowerCase();
  const r = Object.keys(e);
  let n = r.length, o;
  for (; n-- > 0; )
    if (o = r[n], t === o.toLowerCase())
      return o;
  return null;
}
const Vd = typeof self > "u" ? typeof global > "u" ? globalThis : global : self, Wd = (e) => !On(e) && e !== Vd;
function Ka() {
  const { caseless: e } = Wd(this) && this || {}, t = {}, r = (n, o) => {
    const i = e && zd(t, o) || o;
    co(t[i]) && co(n) ? t[i] = Ka(t[i], n) : co(n) ? t[i] = Ka({}, n) : Nr(n) ? t[i] = n.slice() : t[i] = n;
  };
  for (let n = 0, o = arguments.length; n < o; n++)
    arguments[n] && Bn(arguments[n], r);
  return t;
}
const _R = (e, t, r, { allOwnKeys: n } = {}) => (Bn(t, (o, i) => {
  r && tr(o) ? e[i] = Ud(o, r) : e[i] = o;
}, { allOwnKeys: n }), e), OR = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), SR = (e, t, r, n) => {
  e.prototype = Object.create(t.prototype, n), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), r && Object.assign(e.prototype, r);
}, xR = (e, t, r, n) => {
  let o, i, a;
  const s = {};
  if (t = t || {}, e == null)
    return t;
  do {
    for (o = Object.getOwnPropertyNames(e), i = o.length; i-- > 0; )
      a = o[i], (!n || n(a, e, t)) && !s[a] && (t[a] = e[a], s[a] = !0);
    e = r !== !1 && pu(e);
  } while (e && (!r || r(e, t)) && e !== Object.prototype);
  return t;
}, RR = (e, t, r) => {
  e = String(e), (r === void 0 || r > e.length) && (r = e.length), r -= t.length;
  const n = e.indexOf(t, r);
  return n !== -1 && n === r;
}, jR = (e) => {
  if (!e)
    return null;
  if (Nr(e))
    return e;
  let t = e.length;
  if (!Md(t))
    return null;
  const r = new Array(t);
  for (; t-- > 0; )
    r[t] = e[t];
  return r;
}, PR = ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && pu(Uint8Array)), TR = (e, t) => {
  const r = (e && e[Symbol.iterator]).call(e);
  let n;
  for (; (n = r.next()) && !n.done; ) {
    const o = n.value;
    t.call(e, o[0], o[1]);
  }
}, AR = (e, t) => {
  let r;
  const n = [];
  for (; (r = e.exec(t)) !== null; )
    n.push(r);
  return n;
}, CR = at("HTMLFormElement"), NR = (e) => e.toLowerCase().replace(
  /[_-\s]([a-z\d])(\w*)/g,
  function(t, r, n) {
    return r.toUpperCase() + n;
  }
), Al = (({ hasOwnProperty: e }) => (t, r) => e.call(t, r))(Object.prototype), DR = at("RegExp"), Hd = (e, t) => {
  const r = Object.getOwnPropertyDescriptors(e), n = {};
  Bn(r, (o, i) => {
    t(o, i, e) !== !1 && (n[i] = o);
  }), Object.defineProperties(e, n);
}, LR = (e) => {
  Hd(e, (t, r) => {
    if (tr(e) && ["arguments", "caller", "callee"].indexOf(r) !== -1)
      return !1;
    const n = e[r];
    if (tr(n)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + r + "'");
      });
    }
  });
}, IR = (e, t) => {
  const r = {}, n = (o) => {
    o.forEach((i) => {
      r[i] = !0;
    });
  };
  return Nr(e) ? n(e) : n(String(e).split(t)), r;
}, FR = () => {
}, kR = (e, t) => (e = +e, Number.isFinite(e) ? e : t), UR = (e) => {
  const t = new Array(10), r = (n, o) => {
    if (hu(n)) {
      if (t.indexOf(n) >= 0)
        return;
      if (!("toJSON" in n)) {
        t[o] = n;
        const i = Nr(n) ? [] : {};
        return Bn(n, (a, s) => {
          const u = r(a, o + 1);
          !On(u) && (i[s] = u);
        }), t[o] = void 0, i;
      }
    }
    return n;
  };
  return r(e, 0);
}, x = {
  isArray: Nr,
  isArrayBuffer: Bd,
  isBuffer: lR,
  isFormData: bR,
  isArrayBufferView: fR,
  isString: pR,
  isNumber: Md,
  isBoolean: dR,
  isObject: hu,
  isPlainObject: co,
  isUndefined: On,
  isDate: hR,
  isFile: vR,
  isBlob: mR,
  isRegExp: DR,
  isFunction: tr,
  isStream: gR,
  isURLSearchParams: wR,
  isTypedArray: PR,
  isFileList: yR,
  forEach: Bn,
  merge: Ka,
  extend: _R,
  trim: ER,
  stripBOM: OR,
  inherits: SR,
  toFlatObject: xR,
  kindOf: du,
  kindOfTest: at,
  endsWith: RR,
  toArray: jR,
  forEachEntry: TR,
  matchAll: AR,
  isHTMLForm: CR,
  hasOwnProperty: Al,
  hasOwnProp: Al,
  reduceDescriptors: Hd,
  freezeMethods: LR,
  toObjectSet: IR,
  toCamelCase: NR,
  noop: FR,
  toFiniteNumber: kR,
  findKey: zd,
  global: Vd,
  isContextDefined: Wd,
  toJSONObject: UR
};
function V(e, t, r, n, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), r && (this.config = r), n && (this.request = n), o && (this.response = o);
}
x.inherits(V, Error, {
  toJSON: function() {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: x.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const qd = V.prototype, Jd = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
].forEach((e) => {
  Jd[e] = { value: e };
});
Object.defineProperties(V, Jd);
Object.defineProperty(qd, "isAxiosError", { value: !0 });
V.from = (e, t, r, n, o, i) => {
  const a = Object.create(qd);
  return x.toFlatObject(e, a, function(s) {
    return s !== Error.prototype;
  }, (s) => s !== "isAxiosError"), V.call(a, e.message, t, r, n, o), a.cause = e, a.name = e.name, i && Object.assign(a, i), a;
};
var $R = typeof self == "object" ? self.FormData : window.FormData;
const BR = $R;
function Ga(e) {
  return x.isPlainObject(e) || x.isArray(e);
}
function Kd(e) {
  return x.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Cl(e, t, r) {
  return e ? e.concat(t).map(function(n, o) {
    return n = Kd(n), !r && o ? "[" + n + "]" : n;
  }).join(r ? "." : "") : t;
}
function MR(e) {
  return x.isArray(e) && !e.some(Ga);
}
const zR = x.toFlatObject(x, {}, null, function(e) {
  return /^is[A-Z]/.test(e);
});
function VR(e) {
  return e && x.isFunction(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator];
}
function hi(e, t, r) {
  if (!x.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new (BR || FormData)(), r = x.toFlatObject(r, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(h, m) {
    return !x.isUndefined(m[h]);
  });
  const n = r.metaTokens, o = r.visitor || l, i = r.dots, a = r.indexes, s = (r.Blob || typeof Blob < "u" && Blob) && VR(t);
  if (!x.isFunction(o))
    throw new TypeError("visitor must be a function");
  function u(h) {
    if (h === null)
      return "";
    if (x.isDate(h))
      return h.toISOString();
    if (!s && x.isBlob(h))
      throw new V("Blob is not supported. Use a Buffer instead.");
    return x.isArrayBuffer(h) || x.isTypedArray(h) ? s && typeof Blob == "function" ? new Blob([h]) : Buffer.from(h) : h;
  }
  function l(h, m, y) {
    let _ = h;
    if (h && !y && typeof h == "object") {
      if (x.endsWith(m, "{}"))
        m = n ? m : m.slice(0, -2), h = JSON.stringify(h);
      else if (x.isArray(h) && MR(h) || x.isFileList(h) || x.endsWith(m, "[]") && (_ = x.toArray(h)))
        return m = Kd(m), _.forEach(function(j, L) {
          !(x.isUndefined(j) || j === null) && t.append(
            a === !0 ? Cl([m], L, i) : a === null ? m : m + "[]",
            u(j)
          );
        }), !1;
    }
    return Ga(h) ? !0 : (t.append(Cl(y, m, i), u(h)), !1);
  }
  const f = [], p = Object.assign(zR, {
    defaultVisitor: l,
    convertValue: u,
    isVisitable: Ga
  });
  function d(h, m) {
    if (!x.isUndefined(h)) {
      if (f.indexOf(h) !== -1)
        throw Error("Circular reference detected in " + m.join("."));
      f.push(h), x.forEach(h, function(y, _) {
        (!(x.isUndefined(y) || y === null) && o.call(
          t,
          y,
          x.isString(_) ? _.trim() : _,
          m,
          p
        )) === !0 && d(y, m ? m.concat(_) : [_]);
      }), f.pop();
    }
  }
  if (!x.isObject(e))
    throw new TypeError("data must be an object");
  return d(e), t;
}
function Nl(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(r) {
    return t[r];
  });
}
function vu(e, t) {
  this._pairs = [], e && hi(e, this, t);
}
const Gd = vu.prototype;
Gd.append = function(e, t) {
  this._pairs.push([e, t]);
};
Gd.toString = function(e) {
  const t = e ? function(r) {
    return e.call(this, r, Nl);
  } : Nl;
  return this._pairs.map(function(r) {
    return t(r[0]) + "=" + t(r[1]);
  }, "").join("&");
};
function WR(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Yd(e, t, r) {
  if (!t)
    return e;
  const n = r && r.encode || WR, o = r && r.serialize;
  let i;
  if (o ? i = o(t, r) : i = x.isURLSearchParams(t) ? t.toString() : new vu(t, r).toString(n), i) {
    const a = e.indexOf("#");
    a !== -1 && (e = e.slice(0, a)), e += (e.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return e;
}
class HR {
  constructor() {
    this.handlers = [];
  }
  use(t, r, n) {
    return this.handlers.push({
      fulfilled: t,
      rejected: r,
      synchronous: n ? n.synchronous : !1,
      runWhen: n ? n.runWhen : null
    }), this.handlers.length - 1;
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    x.forEach(this.handlers, function(r) {
      r !== null && t(r);
    });
  }
}
const Dl = HR, Xd = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, qR = typeof URLSearchParams < "u" ? URLSearchParams : vu, JR = FormData, KR = (() => {
  let e;
  return typeof navigator < "u" && ((e = navigator.product) === "ReactNative" || e === "NativeScript" || e === "NS") ? !1 : typeof window < "u" && typeof document < "u";
})(), GR = (() => typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), $e = {
  isBrowser: !0,
  classes: {
    URLSearchParams: qR,
    FormData: JR,
    Blob
  },
  isStandardBrowserEnv: KR,
  isStandardBrowserWebWorkerEnv: GR,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function YR(e, t) {
  return hi(e, new $e.classes.URLSearchParams(), Object.assign({
    visitor: function(r, n, o, i) {
      return $e.isNode && x.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function XR(e) {
  return x.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function ZR(e) {
  const t = {}, r = Object.keys(e);
  let n;
  const o = r.length;
  let i;
  for (n = 0; n < o; n++)
    i = r[n], t[i] = e[i];
  return t;
}
function Zd(e) {
  function t(r, n, o, i) {
    let a = r[i++];
    const s = Number.isFinite(+a), u = i >= r.length;
    return a = !a && x.isArray(o) ? o.length : a, u ? (x.hasOwnProp(o, a) ? o[a] = [o[a], n] : o[a] = n, !s) : ((!o[a] || !x.isObject(o[a])) && (o[a] = []), t(r, n, o[a], i) && x.isArray(o[a]) && (o[a] = ZR(o[a])), !s);
  }
  if (x.isFormData(e) && x.isFunction(e.entries)) {
    const r = {};
    return x.forEachEntry(e, (n, o) => {
      t(XR(n), o, r, 0);
    }), r;
  }
  return null;
}
const QR = {
  "Content-Type": void 0
};
function ej(e, t, r) {
  if (x.isString(e))
    try {
      return (t || JSON.parse)(e), x.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (r || JSON.stringify)(e);
}
const vi = {
  transitional: Xd,
  adapter: ["xhr", "http"],
  transformRequest: [function(e, t) {
    const r = t.getContentType() || "", n = r.indexOf("application/json") > -1, o = x.isObject(e);
    if (o && x.isHTMLForm(e) && (e = new FormData(e)), x.isFormData(e))
      return n && n ? JSON.stringify(Zd(e)) : e;
    if (x.isArrayBuffer(e) || x.isBuffer(e) || x.isStream(e) || x.isFile(e) || x.isBlob(e))
      return e;
    if (x.isArrayBufferView(e))
      return e.buffer;
    if (x.isURLSearchParams(e))
      return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
    let i;
    if (o) {
      if (r.indexOf("application/x-www-form-urlencoded") > -1)
        return YR(e, this.formSerializer).toString();
      if ((i = x.isFileList(e)) || r.indexOf("multipart/form-data") > -1) {
        const a = this.env && this.env.FormData;
        return hi(
          i ? { "files[]": e } : e,
          a && new a(),
          this.formSerializer
        );
      }
    }
    return o || n ? (t.setContentType("application/json", !1), ej(e)) : e;
  }],
  transformResponse: [function(e) {
    const t = this.transitional || vi.transitional, r = t && t.forcedJSONParsing, n = this.responseType === "json";
    if (e && x.isString(e) && (r && !this.responseType || n)) {
      const o = !(t && t.silentJSONParsing) && n;
      try {
        return JSON.parse(e);
      } catch (i) {
        if (o)
          throw i.name === "SyntaxError" ? V.from(i, V.ERR_BAD_RESPONSE, this, null, this.response) : i;
      }
    }
    return e;
  }],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: $e.classes.FormData,
    Blob: $e.classes.Blob
  },
  validateStatus: function(e) {
    return e >= 200 && e < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*"
    }
  }
};
x.forEach(["delete", "get", "head"], function(e) {
  vi.headers[e] = {};
});
x.forEach(["post", "put", "patch"], function(e) {
  vi.headers[e] = x.merge(QR);
});
const mu = vi, tj = x.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), rj = (e) => {
  const t = {};
  let r, n, o;
  return e && e.split(`
`).forEach(function(i) {
    o = i.indexOf(":"), r = i.substring(0, o).trim().toLowerCase(), n = i.substring(o + 1).trim(), !(!r || t[r] && tj[r]) && (r === "set-cookie" ? t[r] ? t[r].push(n) : t[r] = [n] : t[r] = t[r] ? t[r] + ", " + n : n);
  }), t;
}, Ll = Symbol("internals");
function an(e) {
  return e && String(e).trim().toLowerCase();
}
function lo(e) {
  return e === !1 || e == null ? e : x.isArray(e) ? e.map(lo) : String(e);
}
function nj(e) {
  const t = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(e); )
    t[n[1]] = n[2];
  return t;
}
function oj(e) {
  return /^[-_a-zA-Z]+$/.test(e.trim());
}
function Il(e, t, r, n) {
  if (x.isFunction(n))
    return n.call(this, t, r);
  if (x.isString(t)) {
    if (x.isString(n))
      return t.indexOf(n) !== -1;
    if (x.isRegExp(n))
      return n.test(t);
  }
}
function ij(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, r, n) => r.toUpperCase() + n);
}
function aj(e, t) {
  const r = x.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(e, n + r, {
      value: function(o, i, a) {
        return this[n].call(this, t, o, i, a);
      },
      configurable: !0
    });
  });
}
let mi = class {
  constructor(e) {
    e && this.set(e);
  }
  set(e, t, r) {
    const n = this;
    function o(a, s, u) {
      const l = an(s);
      if (!l)
        throw new Error("header name must be a non-empty string");
      const f = x.findKey(n, l);
      (!f || n[f] === void 0 || u === !0 || u === void 0 && n[f] !== !1) && (n[f || s] = lo(a));
    }
    const i = (a, s) => x.forEach(a, (u, l) => o(u, l, s));
    return x.isPlainObject(e) || e instanceof this.constructor ? i(e, t) : x.isString(e) && (e = e.trim()) && !oj(e) ? i(rj(e), t) : e != null && o(t, e, r), this;
  }
  get(e, t) {
    if (e = an(e), e) {
      const r = x.findKey(this, e);
      if (r) {
        const n = this[r];
        if (!t)
          return n;
        if (t === !0)
          return nj(n);
        if (x.isFunction(t))
          return t.call(this, n, r);
        if (x.isRegExp(t))
          return t.exec(n);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, t) {
    if (e = an(e), e) {
      const r = x.findKey(this, e);
      return !!(r && (!t || Il(this, this[r], r, t)));
    }
    return !1;
  }
  delete(e, t) {
    const r = this;
    let n = !1;
    function o(i) {
      if (i = an(i), i) {
        const a = x.findKey(r, i);
        a && (!t || Il(r, r[a], a, t)) && (delete r[a], n = !0);
      }
    }
    return x.isArray(e) ? e.forEach(o) : o(e), n;
  }
  clear() {
    return Object.keys(this).forEach(this.delete.bind(this));
  }
  normalize(e) {
    const t = this, r = {};
    return x.forEach(this, (n, o) => {
      const i = x.findKey(r, o);
      if (i) {
        t[i] = lo(n), delete t[o];
        return;
      }
      const a = e ? ij(o) : String(o).trim();
      a !== o && delete t[o], t[a] = lo(n), r[a] = !0;
    }), this;
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    const t = /* @__PURE__ */ Object.create(null);
    return x.forEach(this, (r, n) => {
      r != null && r !== !1 && (t[n] = e && x.isArray(r) ? r.join(", ") : r);
    }), t;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([e, t]) => e + ": " + t).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(e) {
    return e instanceof this ? e : new this(e);
  }
  static concat(e, ...t) {
    const r = new this(e);
    return t.forEach((n) => r.set(n)), r;
  }
  static accessor(e) {
    const t = (this[Ll] = this[Ll] = {
      accessors: {}
    }).accessors, r = this.prototype;
    function n(o) {
      const i = an(o);
      t[i] || (aj(r, o), t[i] = !0);
    }
    return x.isArray(e) ? e.forEach(n) : n(e), this;
  }
};
mi.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent"]);
x.freezeMethods(mi.prototype);
x.freezeMethods(mi);
const Ye = mi;
function Yi(e, t) {
  const r = this || mu, n = t || r, o = Ye.from(n.headers);
  let i = n.data;
  return x.forEach(e, function(a) {
    i = a.call(r, i, o.normalize(), t ? t.status : void 0);
  }), o.normalize(), i;
}
function Qd(e) {
  return !!(e && e.__CANCEL__);
}
function Mn(e, t, r) {
  V.call(this, e ?? "canceled", V.ERR_CANCELED, t, r), this.name = "CanceledError";
}
x.inherits(Mn, V, {
  __CANCEL__: !0
});
const sj = null;
function uj(e, t, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? e(r) : t(new V(
    "Request failed with status code " + r.status,
    [V.ERR_BAD_REQUEST, V.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
    r.config,
    r.request,
    r
  ));
}
const cj = $e.isStandardBrowserEnv ? function() {
  return {
    write: function(e, t, r, n, o, i) {
      const a = [];
      a.push(e + "=" + encodeURIComponent(t)), x.isNumber(r) && a.push("expires=" + new Date(r).toGMTString()), x.isString(n) && a.push("path=" + n), x.isString(o) && a.push("domain=" + o), i === !0 && a.push("secure"), document.cookie = a.join("; ");
    },
    read: function(e) {
      const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
      return t ? decodeURIComponent(t[3]) : null;
    },
    remove: function(e) {
      this.write(e, "", Date.now() - 864e5);
    }
  };
}() : function() {
  return {
    write: function() {
    },
    read: function() {
      return null;
    },
    remove: function() {
    }
  };
}();
function lj(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function fj(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function eh(e, t) {
  return e && !lj(t) ? fj(e, t) : t;
}
const pj = $e.isStandardBrowserEnv ? function() {
  const e = /(msie|trident)/i.test(navigator.userAgent), t = document.createElement("a");
  let r;
  function n(o) {
    let i = o;
    return e && (t.setAttribute("href", i), i = t.href), t.setAttribute("href", i), {
      href: t.href,
      protocol: t.protocol ? t.protocol.replace(/:$/, "") : "",
      host: t.host,
      search: t.search ? t.search.replace(/^\?/, "") : "",
      hash: t.hash ? t.hash.replace(/^#/, "") : "",
      hostname: t.hostname,
      port: t.port,
      pathname: t.pathname.charAt(0) === "/" ? t.pathname : "/" + t.pathname
    };
  }
  return r = n(window.location.href), function(o) {
    const i = x.isString(o) ? n(o) : o;
    return i.protocol === r.protocol && i.host === r.host;
  };
}() : function() {
  return function() {
    return !0;
  };
}();
function dj(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function hj(e, t) {
  e = e || 10;
  const r = new Array(e), n = new Array(e);
  let o = 0, i = 0, a;
  return t = t !== void 0 ? t : 1e3, function(s) {
    const u = Date.now(), l = n[i];
    a || (a = u), r[o] = s, n[o] = u;
    let f = i, p = 0;
    for (; f !== o; )
      p += r[f++], f = f % e;
    if (o = (o + 1) % e, o === i && (i = (i + 1) % e), u - a < t)
      return;
    const d = l && u - l;
    return d ? Math.round(p * 1e3 / d) : void 0;
  };
}
function Fl(e, t) {
  let r = 0;
  const n = hj(50, 250);
  return (o) => {
    const i = o.loaded, a = o.lengthComputable ? o.total : void 0, s = i - r, u = n(s), l = i <= a;
    r = i;
    const f = {
      loaded: i,
      total: a,
      progress: a ? i / a : void 0,
      bytes: s,
      rate: u || void 0,
      estimated: u && a && l ? (a - i) / u : void 0,
      event: o
    };
    f[t ? "download" : "upload"] = !0, e(f);
  };
}
const vj = typeof XMLHttpRequest < "u", mj = vj && function(e) {
  return new Promise(function(t, r) {
    let n = e.data;
    const o = Ye.from(e.headers).normalize(), i = e.responseType;
    let a;
    function s() {
      e.cancelToken && e.cancelToken.unsubscribe(a), e.signal && e.signal.removeEventListener("abort", a);
    }
    x.isFormData(n) && ($e.isStandardBrowserEnv || $e.isStandardBrowserWebWorkerEnv) && o.setContentType(!1);
    let u = new XMLHttpRequest();
    if (e.auth) {
      const d = e.auth.username || "", h = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
      o.set("Authorization", "Basic " + btoa(d + ":" + h));
    }
    const l = eh(e.baseURL, e.url);
    u.open(e.method.toUpperCase(), Yd(l, e.params, e.paramsSerializer), !0), u.timeout = e.timeout;
    function f() {
      if (!u)
        return;
      const d = Ye.from(
        "getAllResponseHeaders" in u && u.getAllResponseHeaders()
      ), h = {
        data: !i || i === "text" || i === "json" ? u.responseText : u.response,
        status: u.status,
        statusText: u.statusText,
        headers: d,
        config: e,
        request: u
      };
      uj(function(m) {
        t(m), s();
      }, function(m) {
        r(m), s();
      }, h), u = null;
    }
    if ("onloadend" in u ? u.onloadend = f : u.onreadystatechange = function() {
      !u || u.readyState !== 4 || u.status === 0 && !(u.responseURL && u.responseURL.indexOf("file:") === 0) || setTimeout(f);
    }, u.onabort = function() {
      u && (r(new V("Request aborted", V.ECONNABORTED, e, u)), u = null);
    }, u.onerror = function() {
      r(new V("Network Error", V.ERR_NETWORK, e, u)), u = null;
    }, u.ontimeout = function() {
      let d = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
      const h = e.transitional || Xd;
      e.timeoutErrorMessage && (d = e.timeoutErrorMessage), r(new V(
        d,
        h.clarifyTimeoutError ? V.ETIMEDOUT : V.ECONNABORTED,
        e,
        u
      )), u = null;
    }, $e.isStandardBrowserEnv) {
      const d = (e.withCredentials || pj(l)) && e.xsrfCookieName && cj.read(e.xsrfCookieName);
      d && o.set(e.xsrfHeaderName, d);
    }
    n === void 0 && o.setContentType(null), "setRequestHeader" in u && x.forEach(o.toJSON(), function(d, h) {
      u.setRequestHeader(h, d);
    }), x.isUndefined(e.withCredentials) || (u.withCredentials = !!e.withCredentials), i && i !== "json" && (u.responseType = e.responseType), typeof e.onDownloadProgress == "function" && u.addEventListener("progress", Fl(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && u.upload && u.upload.addEventListener("progress", Fl(e.onUploadProgress)), (e.cancelToken || e.signal) && (a = (d) => {
      u && (r(!d || d.type ? new Mn(null, e, u) : d), u.abort(), u = null);
    }, e.cancelToken && e.cancelToken.subscribe(a), e.signal && (e.signal.aborted ? a() : e.signal.addEventListener("abort", a)));
    const p = dj(l);
    if (p && $e.protocols.indexOf(p) === -1) {
      r(new V("Unsupported protocol " + p + ":", V.ERR_BAD_REQUEST, e));
      return;
    }
    u.send(n || null);
  });
}, fo = {
  http: sj,
  xhr: mj
};
x.forEach(fo, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const yj = {
  getAdapter: (e) => {
    e = x.isArray(e) ? e : [e];
    const { length: t } = e;
    let r, n;
    for (let o = 0; o < t && (r = e[o], !(n = x.isString(r) ? fo[r.toLowerCase()] : r)); o++)
      ;
    if (!n)
      throw n === !1 ? new V(
        `Adapter ${r} is not supported by the environment`,
        "ERR_NOT_SUPPORT"
      ) : new Error(
        x.hasOwnProp(fo, r) ? `Adapter '${r}' is not available in the build` : `Unknown adapter '${r}'`
      );
    if (!x.isFunction(n))
      throw new TypeError("adapter is not a function");
    return n;
  },
  adapters: fo
};
function Xi(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Mn(null, e);
}
function kl(e) {
  return Xi(e), e.headers = Ye.from(e.headers), e.data = Yi.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), yj.getAdapter(e.adapter || mu.adapter)(e).then(function(t) {
    return Xi(e), t.data = Yi.call(
      e,
      e.transformResponse,
      t
    ), t.headers = Ye.from(t.headers), t;
  }, function(t) {
    return Qd(t) || (Xi(e), t && t.response && (t.response.data = Yi.call(
      e,
      e.transformResponse,
      t.response
    ), t.response.headers = Ye.from(t.response.headers))), Promise.reject(t);
  });
}
const Ul = (e) => e instanceof Ye ? e.toJSON() : e;
function xr(e, t) {
  t = t || {};
  const r = {};
  function n(l, f, p) {
    return x.isPlainObject(l) && x.isPlainObject(f) ? x.merge.call({ caseless: p }, l, f) : x.isPlainObject(f) ? x.merge({}, f) : x.isArray(f) ? f.slice() : f;
  }
  function o(l, f, p) {
    if (x.isUndefined(f)) {
      if (!x.isUndefined(l))
        return n(void 0, l, p);
    } else
      return n(l, f, p);
  }
  function i(l, f) {
    if (!x.isUndefined(f))
      return n(void 0, f);
  }
  function a(l, f) {
    if (x.isUndefined(f)) {
      if (!x.isUndefined(l))
        return n(void 0, l);
    } else
      return n(void 0, f);
  }
  function s(l, f, p) {
    if (p in t)
      return n(l, f);
    if (p in e)
      return n(void 0, l);
  }
  const u = {
    url: i,
    method: i,
    data: i,
    baseURL: a,
    transformRequest: a,
    transformResponse: a,
    paramsSerializer: a,
    timeout: a,
    timeoutMessage: a,
    withCredentials: a,
    adapter: a,
    responseType: a,
    xsrfCookieName: a,
    xsrfHeaderName: a,
    onUploadProgress: a,
    onDownloadProgress: a,
    decompress: a,
    maxContentLength: a,
    maxBodyLength: a,
    beforeRedirect: a,
    transport: a,
    httpAgent: a,
    httpsAgent: a,
    cancelToken: a,
    socketPath: a,
    responseEncoding: a,
    validateStatus: s,
    headers: (l, f) => o(Ul(l), Ul(f), !0)
  };
  return x.forEach(Object.keys(e).concat(Object.keys(t)), function(l) {
    const f = u[l] || o, p = f(e[l], t[l], l);
    x.isUndefined(p) && f !== s || (r[l] = p);
  }), r;
}
const th = "1.2.1", yu = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  yu[e] = function(r) {
    return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const $l = {};
yu.transitional = function(e, t, r) {
  function n(o, i) {
    return "[Axios v" + th + "] Transitional option '" + o + "'" + i + (r ? ". " + r : "");
  }
  return (o, i, a) => {
    if (e === !1)
      throw new V(
        n(i, " has been removed" + (t ? " in " + t : "")),
        V.ERR_DEPRECATED
      );
    return t && !$l[i] && ($l[i] = !0, console.warn(
      n(
        i,
        " has been deprecated since v" + t + " and will be removed in the near future"
      )
    )), e ? e(o, i, a) : !0;
  };
};
function gj(e, t, r) {
  if (typeof e != "object")
    throw new V("options must be an object", V.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(e);
  let o = n.length;
  for (; o-- > 0; ) {
    const i = n[o], a = t[i];
    if (a) {
      const s = e[i], u = s === void 0 || a(s, i, e);
      if (u !== !0)
        throw new V("option " + i + " must be " + u, V.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0)
      throw new V("Unknown option " + i, V.ERR_BAD_OPTION);
  }
}
const Ya = {
  assertOptions: gj,
  validators: yu
}, Dt = Ya.validators;
let $o = class {
  constructor(e) {
    this.defaults = e, this.interceptors = {
      request: new Dl(),
      response: new Dl()
    };
  }
  request(e, t) {
    typeof e == "string" ? (t = t || {}, t.url = e) : t = e || {}, t = xr(this.defaults, t);
    const { transitional: r, paramsSerializer: n, headers: o } = t;
    r !== void 0 && Ya.assertOptions(r, {
      silentJSONParsing: Dt.transitional(Dt.boolean),
      forcedJSONParsing: Dt.transitional(Dt.boolean),
      clarifyTimeoutError: Dt.transitional(Dt.boolean)
    }, !1), n !== void 0 && Ya.assertOptions(n, {
      encode: Dt.function,
      serialize: Dt.function
    }, !0), t.method = (t.method || this.defaults.method || "get").toLowerCase();
    let i;
    i = o && x.merge(
      o.common,
      o[t.method]
    ), i && x.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (h) => {
        delete o[h];
      }
    ), t.headers = Ye.concat(i, o);
    const a = [];
    let s = !0;
    this.interceptors.request.forEach(function(h) {
      typeof h.runWhen == "function" && h.runWhen(t) === !1 || (s = s && h.synchronous, a.unshift(h.fulfilled, h.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function(h) {
      u.push(h.fulfilled, h.rejected);
    });
    let l, f = 0, p;
    if (!s) {
      const h = [kl.bind(this), void 0];
      for (h.unshift.apply(h, a), h.push.apply(h, u), p = h.length, l = Promise.resolve(t); f < p; )
        l = l.then(h[f++], h[f++]);
      return l;
    }
    p = a.length;
    let d = t;
    for (f = 0; f < p; ) {
      const h = a[f++], m = a[f++];
      try {
        d = h(d);
      } catch (y) {
        m.call(this, y);
        break;
      }
    }
    try {
      l = kl.call(this, d);
    } catch (h) {
      return Promise.reject(h);
    }
    for (f = 0, p = u.length; f < p; )
      l = l.then(u[f++], u[f++]);
    return l;
  }
  getUri(e) {
    e = xr(this.defaults, e);
    const t = eh(e.baseURL, e.url);
    return Yd(t, e.params, e.paramsSerializer);
  }
};
x.forEach(["delete", "get", "head", "options"], function(e) {
  $o.prototype[e] = function(t, r) {
    return this.request(xr(r || {}, {
      method: e,
      url: t,
      data: (r || {}).data
    }));
  };
});
x.forEach(["post", "put", "patch"], function(e) {
  function t(r) {
    return function(n, o, i) {
      return this.request(xr(i || {}, {
        method: e,
        headers: r ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: n,
        data: o
      }));
    };
  }
  $o.prototype[e] = t(), $o.prototype[e + "Form"] = t(!0);
});
const po = $o;
let rh = class {
  constructor(e) {
    if (typeof e != "function")
      throw new TypeError("executor must be a function.");
    let t;
    this.promise = new Promise(function(n) {
      t = n;
    });
    const r = this;
    this.promise.then((n) => {
      if (!r._listeners)
        return;
      let o = r._listeners.length;
      for (; o-- > 0; )
        r._listeners[o](n);
      r._listeners = null;
    }), this.promise.then = (n) => {
      let o;
      const i = new Promise((a) => {
        r.subscribe(a), o = a;
      }).then(n);
      return i.cancel = function() {
        r.unsubscribe(o);
      }, i;
    }, e(function(n, o, i) {
      r.reason || (r.reason = new Mn(n, o, i), t(r.reason));
    });
  }
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  subscribe(e) {
    if (this.reason) {
      e(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(e) : this._listeners = [e];
  }
  unsubscribe(e) {
    if (!this._listeners)
      return;
    const t = this._listeners.indexOf(e);
    t !== -1 && this._listeners.splice(t, 1);
  }
  static source() {
    let e;
    return {
      token: new rh(function(t) {
        e = t;
      }),
      cancel: e
    };
  }
};
const bj = rh;
function wj(e) {
  return function(t) {
    return e.apply(null, t);
  };
}
function Ej(e) {
  return x.isObject(e) && e.isAxiosError === !0;
}
function nh(e) {
  const t = new po(e), r = Ud(po.prototype.request, t);
  return x.extend(r, po.prototype, t, { allOwnKeys: !0 }), x.extend(r, t, null, { allOwnKeys: !0 }), r.create = function(n) {
    return nh(xr(e, n));
  }, r;
}
const ue = nh(mu);
ue.Axios = po;
ue.CanceledError = Mn;
ue.CancelToken = bj;
ue.isCancel = Qd;
ue.VERSION = th;
ue.toFormData = hi;
ue.AxiosError = V;
ue.Cancel = ue.CanceledError;
ue.all = function(e) {
  return Promise.all(e);
};
ue.spread = wj;
ue.isAxiosError = Ej;
ue.mergeConfig = xr;
ue.AxiosHeaders = Ye;
ue.formToJSON = (e) => Zd(x.isHTMLForm(e) ? new FormData(e) : e);
ue.default = ue;
const _j = ue;
var Xa = function(e, t) {
  return Xa = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
    r.__proto__ = n;
  } || function(r, n) {
    for (var o in n)
      Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
  }, Xa(e, t);
};
function yi(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  Xa(e, t);
  function r() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
}
function Za(e) {
  var t = typeof Symbol == "function" && Symbol.iterator, r = t && e[t], n = 0;
  if (r)
    return r.call(e);
  if (e && typeof e.length == "number")
    return {
      next: function() {
        return e && n >= e.length && (e = void 0), { value: e && e[n++], done: !e };
      }
    };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function Qa(e, t) {
  var r = typeof Symbol == "function" && e[Symbol.iterator];
  if (!r)
    return e;
  var n = r.call(e), o, i = [], a;
  try {
    for (; (t === void 0 || t-- > 0) && !(o = n.next()).done; )
      i.push(o.value);
  } catch (s) {
    a = { error: s };
  } finally {
    try {
      o && !o.done && (r = n.return) && r.call(n);
    } finally {
      if (a)
        throw a.error;
    }
  }
  return i;
}
function es(e, t, r) {
  if (r || arguments.length === 2)
    for (var n = 0, o = t.length, i; n < o; n++)
      (i || !(n in t)) && (i || (i = Array.prototype.slice.call(t, 0, n)), i[n] = t[n]);
  return e.concat(i || Array.prototype.slice.call(t));
}
function Xe(e) {
  return typeof e == "function";
}
function gu(e) {
  var t = function(n) {
    Error.call(n), n.stack = new Error().stack;
  }, r = e(t);
  return r.prototype = Object.create(Error.prototype), r.prototype.constructor = r, r;
}
var Zi = gu(function(e) {
  return function(t) {
    e(this), this.message = t ? t.length + ` errors occurred during unsubscription:
` + t.map(function(r, n) {
      return n + 1 + ") " + r.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = t;
  };
});
function ts(e, t) {
  if (e) {
    var r = e.indexOf(t);
    0 <= r && e.splice(r, 1);
  }
}
var gi = function() {
  function e(t) {
    this.initialTeardown = t, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return e.prototype.unsubscribe = function() {
    var t, r, n, o, i;
    if (!this.closed) {
      this.closed = !0;
      var a = this._parentage;
      if (a)
        if (this._parentage = null, Array.isArray(a))
          try {
            for (var s = Za(a), u = s.next(); !u.done; u = s.next()) {
              var l = u.value;
              l.remove(this);
            }
          } catch (y) {
            t = { error: y };
          } finally {
            try {
              u && !u.done && (r = s.return) && r.call(s);
            } finally {
              if (t)
                throw t.error;
            }
          }
        else
          a.remove(this);
      var f = this.initialTeardown;
      if (Xe(f))
        try {
          f();
        } catch (y) {
          i = y instanceof Zi ? y.errors : [y];
        }
      var p = this._finalizers;
      if (p) {
        this._finalizers = null;
        try {
          for (var d = Za(p), h = d.next(); !h.done; h = d.next()) {
            var m = h.value;
            try {
              Bl(m);
            } catch (y) {
              i = i ?? [], y instanceof Zi ? i = es(es([], Qa(i)), Qa(y.errors)) : i.push(y);
            }
          }
        } catch (y) {
          n = { error: y };
        } finally {
          try {
            h && !h.done && (o = d.return) && o.call(d);
          } finally {
            if (n)
              throw n.error;
          }
        }
      }
      if (i)
        throw new Zi(i);
    }
  }, e.prototype.add = function(t) {
    var r;
    if (t && t !== this)
      if (this.closed)
        Bl(t);
      else {
        if (t instanceof e) {
          if (t.closed || t._hasParent(this))
            return;
          t._addParent(this);
        }
        (this._finalizers = (r = this._finalizers) !== null && r !== void 0 ? r : []).push(t);
      }
  }, e.prototype._hasParent = function(t) {
    var r = this._parentage;
    return r === t || Array.isArray(r) && r.includes(t);
  }, e.prototype._addParent = function(t) {
    var r = this._parentage;
    this._parentage = Array.isArray(r) ? (r.push(t), r) : r ? [r, t] : t;
  }, e.prototype._removeParent = function(t) {
    var r = this._parentage;
    r === t ? this._parentage = null : Array.isArray(r) && ts(r, t);
  }, e.prototype.remove = function(t) {
    var r = this._finalizers;
    r && ts(r, t), t instanceof e && t._removeParent(this);
  }, e.EMPTY = function() {
    var t = new e();
    return t.closed = !0, t;
  }(), e;
}(), oh = gi.EMPTY;
function ih(e) {
  return e instanceof gi || e && "closed" in e && Xe(e.remove) && Xe(e.add) && Xe(e.unsubscribe);
}
function Bl(e) {
  Xe(e) ? e() : e.unsubscribe();
}
var ah = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1
}, Oj = {
  setTimeout: function(e, t) {
    for (var r = [], n = 2; n < arguments.length; n++)
      r[n - 2] = arguments[n];
    return setTimeout.apply(void 0, es([e, t], Qa(r)));
  },
  clearTimeout: function(e) {
    return clearTimeout(e);
  },
  delegate: void 0
};
function Sj(e) {
  Oj.setTimeout(function() {
    throw e;
  });
}
function Ml() {
}
function ho(e) {
  e();
}
var sh = function(e) {
  yi(t, e);
  function t(r) {
    var n = e.call(this) || this;
    return n.isStopped = !1, r ? (n.destination = r, ih(r) && r.add(n)) : n.destination = Pj, n;
  }
  return t.create = function(r, n, o) {
    return new rs(r, n, o);
  }, t.prototype.next = function(r) {
    this.isStopped || this._next(r);
  }, t.prototype.error = function(r) {
    this.isStopped || (this.isStopped = !0, this._error(r));
  }, t.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, t.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, e.prototype.unsubscribe.call(this), this.destination = null);
  }, t.prototype._next = function(r) {
    this.destination.next(r);
  }, t.prototype._error = function(r) {
    try {
      this.destination.error(r);
    } finally {
      this.unsubscribe();
    }
  }, t.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, t;
}(gi), xj = Function.prototype.bind;
function Qi(e, t) {
  return xj.call(e, t);
}
var Rj = function() {
  function e(t) {
    this.partialObserver = t;
  }
  return e.prototype.next = function(t) {
    var r = this.partialObserver;
    if (r.next)
      try {
        r.next(t);
      } catch (n) {
        Zn(n);
      }
  }, e.prototype.error = function(t) {
    var r = this.partialObserver;
    if (r.error)
      try {
        r.error(t);
      } catch (n) {
        Zn(n);
      }
    else
      Zn(t);
  }, e.prototype.complete = function() {
    var t = this.partialObserver;
    if (t.complete)
      try {
        t.complete();
      } catch (r) {
        Zn(r);
      }
  }, e;
}(), rs = function(e) {
  yi(t, e);
  function t(r, n, o) {
    var i = e.call(this) || this, a;
    if (Xe(r) || !r)
      a = {
        next: r ?? void 0,
        error: n ?? void 0,
        complete: o ?? void 0
      };
    else {
      var s;
      i && ah.useDeprecatedNextContext ? (s = Object.create(r), s.unsubscribe = function() {
        return i.unsubscribe();
      }, a = {
        next: r.next && Qi(r.next, s),
        error: r.error && Qi(r.error, s),
        complete: r.complete && Qi(r.complete, s)
      }) : a = r;
    }
    return i.destination = new Rj(a), i;
  }
  return t;
}(sh);
function Zn(e) {
  Sj(e);
}
function jj(e) {
  throw e;
}
var Pj = {
  closed: !0,
  next: Ml,
  error: jj,
  complete: Ml
}, Tj = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function Aj(e) {
  return e;
}
function Cj(e) {
  return e.length === 0 ? Aj : e.length === 1 ? e[0] : function(t) {
    return e.reduce(function(r, n) {
      return n(r);
    }, t);
  };
}
var ns = function() {
  function e(t) {
    t && (this._subscribe = t);
  }
  return e.prototype.lift = function(t) {
    var r = new e();
    return r.source = this, r.operator = t, r;
  }, e.prototype.subscribe = function(t, r, n) {
    var o = this, i = Dj(t) ? t : new rs(t, r, n);
    return ho(function() {
      var a = o, s = a.operator, u = a.source;
      i.add(s ? s.call(i, u) : u ? o._subscribe(i) : o._trySubscribe(i));
    }), i;
  }, e.prototype._trySubscribe = function(t) {
    try {
      return this._subscribe(t);
    } catch (r) {
      t.error(r);
    }
  }, e.prototype.forEach = function(t, r) {
    var n = this;
    return r = zl(r), new r(function(o, i) {
      var a = new rs({
        next: function(s) {
          try {
            t(s);
          } catch (u) {
            i(u), a.unsubscribe();
          }
        },
        error: i,
        complete: o
      });
      n.subscribe(a);
    });
  }, e.prototype._subscribe = function(t) {
    var r;
    return (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(t);
  }, e.prototype[Tj] = function() {
    return this;
  }, e.prototype.pipe = function() {
    for (var t = [], r = 0; r < arguments.length; r++)
      t[r] = arguments[r];
    return Cj(t)(this);
  }, e.prototype.toPromise = function(t) {
    var r = this;
    return t = zl(t), new t(function(n, o) {
      var i;
      r.subscribe(function(a) {
        return i = a;
      }, function(a) {
        return o(a);
      }, function() {
        return n(i);
      });
    });
  }, e.create = function(t) {
    return new e(t);
  }, e;
}();
function zl(e) {
  var t;
  return (t = e ?? ah.Promise) !== null && t !== void 0 ? t : Promise;
}
function Nj(e) {
  return e && Xe(e.next) && Xe(e.error) && Xe(e.complete);
}
function Dj(e) {
  return e && e instanceof sh || Nj(e) && ih(e);
}
var Lj = gu(function(e) {
  return function() {
    e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), Ij = function(e) {
  yi(t, e);
  function t() {
    var r = e.call(this) || this;
    return r.closed = !1, r.currentObservers = null, r.observers = [], r.isStopped = !1, r.hasError = !1, r.thrownError = null, r;
  }
  return t.prototype.lift = function(r) {
    var n = new Vl(this, this);
    return n.operator = r, n;
  }, t.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new Lj();
  }, t.prototype.next = function(r) {
    var n = this;
    ho(function() {
      var o, i;
      if (n._throwIfClosed(), !n.isStopped) {
        n.currentObservers || (n.currentObservers = Array.from(n.observers));
        try {
          for (var a = Za(n.currentObservers), s = a.next(); !s.done; s = a.next()) {
            var u = s.value;
            u.next(r);
          }
        } catch (l) {
          o = { error: l };
        } finally {
          try {
            s && !s.done && (i = a.return) && i.call(a);
          } finally {
            if (o)
              throw o.error;
          }
        }
      }
    });
  }, t.prototype.error = function(r) {
    var n = this;
    ho(function() {
      if (n._throwIfClosed(), !n.isStopped) {
        n.hasError = n.isStopped = !0, n.thrownError = r;
        for (var o = n.observers; o.length; )
          o.shift().error(r);
      }
    });
  }, t.prototype.complete = function() {
    var r = this;
    ho(function() {
      if (r._throwIfClosed(), !r.isStopped) {
        r.isStopped = !0;
        for (var n = r.observers; n.length; )
          n.shift().complete();
      }
    });
  }, t.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(t.prototype, "observed", {
    get: function() {
      var r;
      return ((r = this.observers) === null || r === void 0 ? void 0 : r.length) > 0;
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype._trySubscribe = function(r) {
    return this._throwIfClosed(), e.prototype._trySubscribe.call(this, r);
  }, t.prototype._subscribe = function(r) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(r), this._innerSubscribe(r);
  }, t.prototype._innerSubscribe = function(r) {
    var n = this, o = this, i = o.hasError, a = o.isStopped, s = o.observers;
    return i || a ? oh : (this.currentObservers = null, s.push(r), new gi(function() {
      n.currentObservers = null, ts(s, r);
    }));
  }, t.prototype._checkFinalizedStatuses = function(r) {
    var n = this, o = n.hasError, i = n.thrownError, a = n.isStopped;
    o ? r.error(i) : a && r.complete();
  }, t.prototype.asObservable = function() {
    var r = new ns();
    return r.source = this, r;
  }, t.create = function(r, n) {
    return new Vl(r, n);
  }, t;
}(ns), Vl = function(e) {
  yi(t, e);
  function t(r, n) {
    var o = e.call(this) || this;
    return o.destination = r, o.source = n, o;
  }
  return t.prototype.next = function(r) {
    var n, o;
    (o = (n = this.destination) === null || n === void 0 ? void 0 : n.next) === null || o === void 0 || o.call(n, r);
  }, t.prototype.error = function(r) {
    var n, o;
    (o = (n = this.destination) === null || n === void 0 ? void 0 : n.error) === null || o === void 0 || o.call(n, r);
  }, t.prototype.complete = function() {
    var r, n;
    (n = (r = this.destination) === null || r === void 0 ? void 0 : r.complete) === null || n === void 0 || n.call(r);
  }, t.prototype._subscribe = function(r) {
    var n, o;
    return (o = (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(r)) !== null && o !== void 0 ? o : oh;
  }, t;
}(Ij);
gu(function(e) {
  return function() {
    e(this), this.name = "EmptyError", this.message = "no elements in sequence";
  };
});
class bu {
  constructor(t) {
    de(this, "config"), de(this, "axios"), t && (this.config = t), this.axios = _j.create(this.config);
  }
  get interceptors() {
    return this.axios.interceptors;
  }
  static create(t) {
    return new bu(t);
  }
  request(t) {
    return new ns((r) => {
      const n = new AbortController();
      let o, i;
      return t.uploadProgressSubscriber && (o = (a) => {
        t.uploadProgressSubscriber && t.uploadProgressSubscriber.next(a);
      }), t.downloadProgressSubscriber && (i = (a) => {
        t.downloadProgressSubscriber && t.downloadProgressSubscriber.next(a);
      }), this.axios.request({
        ...t,
        onUploadProgress: o,
        onDownloadProgress: i,
        signal: n.signal
      }).then((a) => {
        r.next(a), r.complete(), t.uploadProgressSubscriber && t.uploadProgressSubscriber.complete(), t.downloadProgressSubscriber && t.downloadProgressSubscriber.complete();
      }).catch((a) => {
        r.error(a), t.uploadProgressSubscriber && t.uploadProgressSubscriber.error(a);
      }), () => {
        n.abort();
      };
    });
  }
  get(t, r) {
    return this.request({
      url: t,
      method: "GET",
      ...r
    });
  }
  delete(t, r) {
    return this.request({
      url: t,
      method: "DELETE",
      ...r
    });
  }
  post(t, r, n) {
    return this.request({
      url: t,
      data: r,
      method: "POST",
      ...n
    });
  }
  put(t, r, n) {
    return this.request({
      url: t,
      data: r,
      method: "PUT",
      ...n
    });
  }
  patch(t, r, n) {
    return this.request({
      url: t,
      data: r,
      method: "PATCH",
      ...n
    });
  }
}
function Fj(e) {
  return bu.create({
    baseURL: e
  });
}
const ie = class {
  constructor(e, t) {
    de(this, "axiosInstance"), de(this, "defaultConfig", {
      contentType: "json",
      cache: !1
    }), de(this, "tokenType"), this.axiosInstance = Fj(e), this.setupInterceptor(), t && (this.defaultConfig = {
      ...this.defaultConfig,
      ...t
    });
  }
  static setAuthorizationTokenType(e) {
    ie.tokenType = e;
  }
  static setGlobalParams(e) {
    ie.globalParams = {
      ...ie.globalParams,
      ...e
    };
  }
  static setGlobalData(e) {
    ie.globalData = {
      ...ie.globalData,
      ...e
    };
  }
  static setGlobalHeaders(e) {
    ie.globalHeaders = {
      ...ie.globalHeaders,
      ...e
    };
  }
  static addInterceptor(e) {
    return ie.interceptors.add(e), () => {
      ie.removeInterceptor(e);
    };
  }
  static removeInterceptor(e) {
    ie.interceptors.delete(e);
  }
  setAuthorizationTokenType(e) {
    this.tokenType = e;
  }
  getTokenType(e) {
    return e.tokenType !== void 0 ? e.tokenType : this.tokenType !== void 0 ? this.tokenType : ie.tokenType;
  }
  setupInterceptor() {
    this.axiosInstance.interceptors.request.use(
      async (e) => {
        if (e = await this.useRequestInterceptors(e), e = Q1({}, this.defaultConfig, e), e.headers = {
          ...e.headers,
          ...ie.globalHeaders,
          "Content-Type": e.contentType === "formData" ? !1 : e.contentType === "urlEncoded" ? qa.UrlEncoded : qa.Json
        }, !e.preparedData) {
          if ((typeof e.cache < "u" ? e.cache : this.defaultConfig.cache) === !1 && (e.headers["Cache-Control"] = "no-cache", e.params = {
            ...e.params,
            axios_timestamp: Date.now()
          }), e.params = Uo(
            Pl({
              ...e.params,
              ...ie.globalParams
            })
          ), e.data = {
            ...e.data,
            ...ie.globalData
          }, Pl(e.data), JSON.stringify(e.data) === "{}")
            e.data = void 0;
          else
            switch (e.contentType) {
              case "formData":
                e.data = Ja(e.data);
                break;
              case "urlEncoded":
                e.data = Uo(e.data);
            }
          e.preparedData = !0;
        }
        const t = this.getTokenType(e), r = t ? cR.getToken(t) : null;
        return r && (e.headers.Authorization = "Bearer " + r), e;
      },
      (e) => {
        console.log(e);
      }
    ), this.axiosInstance.interceptors.response.use(
      (e) => this.useSuccessResponseInterceptor(e),
      async (e) => {
        const t = await this.useErrorResponseInterceptor(e);
        return t instanceof Error ? Promise.reject(t) : t;
      }
    );
  }
  async useRequestInterceptors(e) {
    for (const t of ie.interceptors)
      t.request && (e = await t.request(e));
    return e;
  }
  async useErrorResponseInterceptor(e) {
    for (const t of ie.interceptors)
      if (t.response && t.response.error)
        try {
          e = await t.response.error(e, this.axiosInstance);
        } catch {
          return e;
        }
    return e;
  }
  async useSuccessResponseInterceptor(e) {
    for (const t of ie.interceptors)
      t.response && t.response.success && (e = await t.response.success(e));
    return e;
  }
  request(e) {
    return this.axiosInstance.request(e);
  }
  post(e, t, r) {
    return this.axiosInstance.post(e, t, r);
  }
  put(e, t, r) {
    return this.axiosInstance.put(e, t, r);
  }
  patch(e, t, r) {
    return this.axiosInstance.patch(e, t, r);
  }
  get(e, t, r) {
    return this.axiosInstance.get(e, {
      ...r,
      params: t
    });
  }
  delete(e, t, r) {
    return this.axiosInstance.delete(e, {
      ...r,
      params: t
    });
  }
};
let sn = ie;
de(sn, "tokenType", "base_token"), de(sn, "globalParams", {}), de(sn, "globalData", {}), de(sn, "globalHeaders", {}), de(sn, "interceptors", /* @__PURE__ */ new Set());
var Sn = {}, kj = {
  get exports() {
    return Sn;
  },
  set exports(e) {
    Sn = e;
  }
}, yr = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var ea, Wl;
function uh() {
  if (Wl)
    return ea;
  Wl = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, r = Object.prototype.propertyIsEnumerable;
  function n(i) {
    if (i == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(i);
  }
  function o() {
    try {
      if (!Object.assign)
        return !1;
      var i = new String("abc");
      if (i[5] = "de", Object.getOwnPropertyNames(i)[0] === "5")
        return !1;
      for (var a = {}, s = 0; s < 10; s++)
        a["_" + String.fromCharCode(s)] = s;
      var u = Object.getOwnPropertyNames(a).map(function(f) {
        return a[f];
      });
      if (u.join("") !== "0123456789")
        return !1;
      var l = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(f) {
        l[f] = f;
      }), Object.keys(Object.assign({}, l)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return ea = o() ? Object.assign : function(i, a) {
    for (var s, u = n(i), l, f = 1; f < arguments.length; f++) {
      s = Object(arguments[f]);
      for (var p in s)
        t.call(s, p) && (u[p] = s[p]);
      if (e) {
        l = e(s);
        for (var d = 0; d < l.length; d++)
          r.call(s, l[d]) && (u[l[d]] = s[l[d]]);
      }
    }
    return u;
  }, ea;
}
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Hl;
function Uj() {
  if (Hl)
    return yr;
  Hl = 1, uh();
  var e = ye, t = 60103;
  if (yr.Fragment = 60107, typeof Symbol == "function" && Symbol.for) {
    var r = Symbol.for;
    t = r("react.element"), yr.Fragment = r("react.fragment");
  }
  var n = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = Object.prototype.hasOwnProperty, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function a(s, u, l) {
    var f, p = {}, d = null, h = null;
    l !== void 0 && (d = "" + l), u.key !== void 0 && (d = "" + u.key), u.ref !== void 0 && (h = u.ref);
    for (f in u)
      o.call(u, f) && !i.hasOwnProperty(f) && (p[f] = u[f]);
    if (s && s.defaultProps)
      for (f in u = s.defaultProps, u)
        p[f] === void 0 && (p[f] = u[f]);
    return { $$typeof: t, type: s, key: d, ref: h, props: p, _owner: n.current };
  }
  return yr.jsx = a, yr.jsxs = a, yr;
}
var ql = {};
/** @license React v17.0.2
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Jl;
function $j() {
  return Jl || (Jl = 1, function(e) {
    process.env.NODE_ENV !== "production" && function() {
      var t = ye, r = uh(), n = 60103, o = 60106;
      e.Fragment = 60107;
      var i = 60108, a = 60114, s = 60109, u = 60110, l = 60112, f = 60113, p = 60120, d = 60115, h = 60116, m = 60121, y = 60122, _ = 60117, j = 60129, L = 60131;
      if (typeof Symbol == "function" && Symbol.for) {
        var w = Symbol.for;
        n = w("react.element"), o = w("react.portal"), e.Fragment = w("react.fragment"), i = w("react.strict_mode"), a = w("react.profiler"), s = w("react.provider"), u = w("react.context"), l = w("react.forward_ref"), f = w("react.suspense"), p = w("react.suspense_list"), d = w("react.memo"), h = w("react.lazy"), m = w("react.block"), y = w("react.server.block"), _ = w("react.fundamental"), w("react.scope"), w("react.opaque.id"), j = w("react.debug_trace_mode"), w("react.offscreen"), L = w("react.legacy_hidden");
      }
      var O = typeof Symbol == "function" && Symbol.iterator, D = "@@iterator";
      function N(c) {
        if (c === null || typeof c != "object")
          return null;
        var v = O && c[O] || c[D];
        return typeof v == "function" ? v : null;
      }
      var U = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function I(c) {
        {
          for (var v = arguments.length, g = new Array(v > 1 ? v - 1 : 0), E = 1; E < v; E++)
            g[E - 1] = arguments[E];
          $("error", c, g);
        }
      }
      function $(c, v, g) {
        {
          var E = U.ReactDebugCurrentFrame, A = E.getStackAddendum();
          A !== "" && (v += "%s", g = g.concat([A]));
          var C = g.map(function(T) {
            return "" + T;
          });
          C.unshift("Warning: " + v), Function.prototype.apply.call(console[c], console, C);
        }
      }
      var Z = !1;
      function oe(c) {
        return !!(typeof c == "string" || typeof c == "function" || c === e.Fragment || c === a || c === j || c === i || c === f || c === p || c === L || Z || typeof c == "object" && c !== null && (c.$$typeof === h || c.$$typeof === d || c.$$typeof === s || c.$$typeof === u || c.$$typeof === l || c.$$typeof === _ || c.$$typeof === m || c[0] === y));
      }
      function Lr(c, v, g) {
        var E = v.displayName || v.name || "";
        return c.displayName || (E !== "" ? g + "(" + E + ")" : g);
      }
      function lt(c) {
        return c.displayName || "Context";
      }
      function H(c) {
        if (c == null)
          return null;
        if (typeof c.tag == "number" && I("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue."), typeof c == "function")
          return c.displayName || c.name || null;
        if (typeof c == "string")
          return c;
        switch (c) {
          case e.Fragment:
            return "Fragment";
          case o:
            return "Portal";
          case a:
            return "Profiler";
          case i:
            return "StrictMode";
          case f:
            return "Suspense";
          case p:
            return "SuspenseList";
        }
        if (typeof c == "object")
          switch (c.$$typeof) {
            case u:
              var v = c;
              return lt(v) + ".Consumer";
            case s:
              var g = c;
              return lt(g._context) + ".Provider";
            case l:
              return Lr(c, c.render, "ForwardRef");
            case d:
              return H(c.type);
            case m:
              return H(c._render);
            case h: {
              var E = c, A = E._payload, C = E._init;
              try {
                return H(C(A));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var le = 0, ft, pt, dt, ht, vt, mt, yt;
      function gt() {
      }
      gt.__reactDisabledLog = !0;
      function Ir() {
        {
          if (le === 0) {
            ft = console.log, pt = console.info, dt = console.warn, ht = console.error, vt = console.group, mt = console.groupCollapsed, yt = console.groupEnd;
            var c = {
              configurable: !0,
              enumerable: !0,
              value: gt,
              writable: !0
            };
            Object.defineProperties(console, {
              info: c,
              log: c,
              warn: c,
              error: c,
              group: c,
              groupCollapsed: c,
              groupEnd: c
            });
          }
          le++;
        }
      }
      function Fr() {
        {
          if (le--, le === 0) {
            var c = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: r({}, c, {
                value: ft
              }),
              info: r({}, c, {
                value: pt
              }),
              warn: r({}, c, {
                value: dt
              }),
              error: r({}, c, {
                value: ht
              }),
              group: r({}, c, {
                value: vt
              }),
              groupCollapsed: r({}, c, {
                value: mt
              }),
              groupEnd: r({}, c, {
                value: yt
              })
            });
          }
          le < 0 && I("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var Oe = U.ReactCurrentDispatcher, Se;
      function ge(c, v, g) {
        {
          if (Se === void 0)
            try {
              throw Error();
            } catch (A) {
              var E = A.stack.trim().match(/\n( *(at )?)/);
              Se = E && E[1] || "";
            }
          return `
` + Se + c;
        }
      }
      var xe = !1, be;
      {
        var kr = typeof WeakMap == "function" ? WeakMap : Map;
        be = new kr();
      }
      function bt(c, v) {
        if (!c || xe)
          return "";
        {
          var g = be.get(c);
          if (g !== void 0)
            return g;
        }
        var E;
        xe = !0;
        var A = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var C;
        C = Oe.current, Oe.current = null, Ir();
        try {
          if (v) {
            var T = function() {
              throw Error();
            };
            if (Object.defineProperty(T.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(T, []);
              } catch (J) {
                E = J;
              }
              Reflect.construct(c, [], T);
            } else {
              try {
                T.call();
              } catch (J) {
                E = J;
              }
              c.call(T.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (J) {
              E = J;
            }
            c();
          }
        } catch (J) {
          if (J && E && typeof J.stack == "string") {
            for (var P = J.stack.split(`
`), B = E.stack.split(`
`), F = P.length - 1, k = B.length - 1; F >= 1 && k >= 0 && P[F] !== B[k]; )
              k--;
            for (; F >= 1 && k >= 0; F--, k--)
              if (P[F] !== B[k]) {
                if (F !== 1 || k !== 1)
                  do
                    if (F--, k--, k < 0 || P[F] !== B[k]) {
                      var q = `
` + P[F].replace(" at new ", " at ");
                      return typeof c == "function" && be.set(c, q), q;
                    }
                  while (F >= 1 && k >= 0);
                break;
              }
          }
        } finally {
          xe = !1, Oe.current = C, Fr(), Error.prepareStackTrace = A;
        }
        var te = c ? c.displayName || c.name : "", Ct = te ? ge(te) : "";
        return typeof c == "function" && be.set(c, Ct), Ct;
      }
      function wt(c, v, g) {
        return bt(c, !1);
      }
      function Ur(c) {
        var v = c.prototype;
        return !!(v && v.isReactComponent);
      }
      function we(c, v, g) {
        if (c == null)
          return "";
        if (typeof c == "function")
          return bt(c, Ur(c));
        if (typeof c == "string")
          return ge(c);
        switch (c) {
          case f:
            return ge("Suspense");
          case p:
            return ge("SuspenseList");
        }
        if (typeof c == "object")
          switch (c.$$typeof) {
            case l:
              return wt(c.render);
            case d:
              return we(c.type, v, g);
            case m:
              return wt(c._render);
            case h: {
              var E = c, A = E._payload, C = E._init;
              try {
                return we(C(A), v, g);
              } catch {
              }
            }
          }
        return "";
      }
      var Et = {}, _t = U.ReactDebugCurrentFrame;
      function Ee(c) {
        if (c) {
          var v = c._owner, g = we(c.type, c._source, v ? v.type : null);
          _t.setExtraStackFrame(g);
        } else
          _t.setExtraStackFrame(null);
      }
      function $r(c, v, g, E, A) {
        {
          var C = Function.call.bind(Object.prototype.hasOwnProperty);
          for (var T in c)
            if (C(c, T)) {
              var P = void 0;
              try {
                if (typeof c[T] != "function") {
                  var B = Error((E || "React class") + ": " + g + " type `" + T + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof c[T] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw B.name = "Invariant Violation", B;
                }
                P = c[T](v, T, E, g, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (F) {
                P = F;
              }
              P && !(P instanceof Error) && (Ee(A), I("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", E || "React class", g, T, typeof P), Ee(null)), P instanceof Error && !(P.message in Et) && (Et[P.message] = !0, Ee(A), I("Failed %s type: %s", g, P.message), Ee(null));
            }
        }
      }
      var fe = U.ReactCurrentOwner, Re = Object.prototype.hasOwnProperty, Br = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, Ot, St, je;
      je = {};
      function Mr(c) {
        if (Re.call(c, "ref")) {
          var v = Object.getOwnPropertyDescriptor(c, "ref").get;
          if (v && v.isReactWarning)
            return !1;
        }
        return c.ref !== void 0;
      }
      function zr(c) {
        if (Re.call(c, "key")) {
          var v = Object.getOwnPropertyDescriptor(c, "key").get;
          if (v && v.isReactWarning)
            return !1;
        }
        return c.key !== void 0;
      }
      function Vr(c, v) {
        if (typeof c.ref == "string" && fe.current && v && fe.current.stateNode !== v) {
          var g = H(fe.current.type);
          je[g] || (I('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', H(fe.current.type), c.ref), je[g] = !0);
        }
      }
      function Wr(c, v) {
        {
          var g = function() {
            Ot || (Ot = !0, I("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", v));
          };
          g.isReactWarning = !0, Object.defineProperty(c, "key", {
            get: g,
            configurable: !0
          });
        }
      }
      function Hr(c, v) {
        {
          var g = function() {
            St || (St = !0, I("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", v));
          };
          g.isReactWarning = !0, Object.defineProperty(c, "ref", {
            get: g,
            configurable: !0
          });
        }
      }
      var qr = function(c, v, g, E, A, C, T) {
        var P = {
          $$typeof: n,
          type: c,
          key: v,
          ref: g,
          props: T,
          _owner: C
        };
        return P._store = {}, Object.defineProperty(P._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(P, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: E
        }), Object.defineProperty(P, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: A
        }), Object.freeze && (Object.freeze(P.props), Object.freeze(P)), P;
      };
      function Jr(c, v, g, E, A) {
        {
          var C, T = {}, P = null, B = null;
          g !== void 0 && (P = "" + g), zr(v) && (P = "" + v.key), Mr(v) && (B = v.ref, Vr(v, A));
          for (C in v)
            Re.call(v, C) && !Br.hasOwnProperty(C) && (T[C] = v[C]);
          if (c && c.defaultProps) {
            var F = c.defaultProps;
            for (C in F)
              T[C] === void 0 && (T[C] = F[C]);
          }
          if (P || B) {
            var k = typeof c == "function" ? c.displayName || c.name || "Unknown" : c;
            P && Wr(T, k), B && Hr(T, k);
          }
          return qr(c, P, B, A, E, fe.current, T);
        }
      }
      var Pe = U.ReactCurrentOwner, xt = U.ReactDebugCurrentFrame;
      function ee(c) {
        if (c) {
          var v = c._owner, g = we(c.type, c._source, v ? v.type : null);
          xt.setExtraStackFrame(g);
        } else
          xt.setExtraStackFrame(null);
      }
      var Te;
      Te = !1;
      function Ae(c) {
        return typeof c == "object" && c !== null && c.$$typeof === n;
      }
      function Rt() {
        {
          if (Pe.current) {
            var c = H(Pe.current.type);
            if (c)
              return `

Check the render method of \`` + c + "`.";
          }
          return "";
        }
      }
      function Kr(c) {
        {
          if (c !== void 0) {
            var v = c.fileName.replace(/^.*[\\\/]/, ""), g = c.lineNumber;
            return `

Check your code at ` + v + ":" + g + ".";
          }
          return "";
        }
      }
      var jt = {};
      function Gr(c) {
        {
          var v = Rt();
          if (!v) {
            var g = typeof c == "string" ? c : c.displayName || c.name;
            g && (v = `

Check the top-level render call using <` + g + ">.");
          }
          return v;
        }
      }
      function Pt(c, v) {
        {
          if (!c._store || c._store.validated || c.key != null)
            return;
          c._store.validated = !0;
          var g = Gr(v);
          if (jt[g])
            return;
          jt[g] = !0;
          var E = "";
          c && c._owner && c._owner !== Pe.current && (E = " It was passed a child from " + H(c._owner.type) + "."), ee(c), I('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', g, E), ee(null);
        }
      }
      function Tt(c, v) {
        {
          if (typeof c != "object")
            return;
          if (Array.isArray(c))
            for (var g = 0; g < c.length; g++) {
              var E = c[g];
              Ae(E) && Pt(E, v);
            }
          else if (Ae(c))
            c._store && (c._store.validated = !0);
          else if (c) {
            var A = N(c);
            if (typeof A == "function" && A !== c.entries)
              for (var C = A.call(c), T; !(T = C.next()).done; )
                Ae(T.value) && Pt(T.value, v);
          }
        }
      }
      function Yr(c) {
        {
          var v = c.type;
          if (v == null || typeof v == "string")
            return;
          var g;
          if (typeof v == "function")
            g = v.propTypes;
          else if (typeof v == "object" && (v.$$typeof === l || v.$$typeof === d))
            g = v.propTypes;
          else
            return;
          if (g) {
            var E = H(v);
            $r(g, c.props, "prop", E, c);
          } else if (v.PropTypes !== void 0 && !Te) {
            Te = !0;
            var A = H(v);
            I("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", A || "Unknown");
          }
          typeof v.getDefaultProps == "function" && !v.getDefaultProps.isReactClassApproved && I("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Xr(c) {
        {
          for (var v = Object.keys(c.props), g = 0; g < v.length; g++) {
            var E = v[g];
            if (E !== "children" && E !== "key") {
              ee(c), I("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", E), ee(null);
              break;
            }
          }
          c.ref !== null && (ee(c), I("Invalid attribute `ref` supplied to `React.Fragment`."), ee(null));
        }
      }
      function At(c, v, g, E, A, C) {
        {
          var T = oe(c);
          if (!T) {
            var P = "";
            (c === void 0 || typeof c == "object" && c !== null && Object.keys(c).length === 0) && (P += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var B = Kr(A);
            B ? P += B : P += Rt();
            var F;
            c === null ? F = "null" : Array.isArray(c) ? F = "array" : c !== void 0 && c.$$typeof === n ? (F = "<" + (H(c.type) || "Unknown") + " />", P = " Did you accidentally export a JSX literal instead of a component?") : F = typeof c, I("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", F, P);
          }
          var k = Jr(c, v, g, A, C);
          if (k == null)
            return k;
          if (T) {
            var q = v.children;
            if (q !== void 0)
              if (E)
                if (Array.isArray(q)) {
                  for (var te = 0; te < q.length; te++)
                    Tt(q[te], c);
                  Object.freeze && Object.freeze(q);
                } else
                  I("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
              else
                Tt(q, c);
          }
          return c === e.Fragment ? Xr(k) : Yr(k), k;
        }
      }
      function Zr(c, v, g) {
        return At(c, v, g, !0);
      }
      function Qr(c, v, g) {
        return At(c, v, g, !1);
      }
      var en = Qr, tn = Zr;
      e.jsx = en, e.jsxs = tn;
    }();
  }(ql)), ql;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = Uj() : e.exports = $j();
})(kj);
const ch = Sn.Fragment, vo = Sn.jsx;
Sn.jsxs;
var Bj = Object.defineProperty, Mj = (e, t, r) => t in e ? Bj(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, he = (e, t, r) => (Mj(e, typeof t != "symbol" ? t + "" : t, r), r);
/**
 * @remix-run/router v1.2.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function os() {
  return os = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, os.apply(this, arguments);
}
var Kl;
(function(e) {
  e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
})(Kl || (Kl = {}));
function me(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function is(e) {
  let {
    pathname: t = "/",
    search: r = "",
    hash: n = ""
  } = e;
  return r && r !== "?" && (t += r.charAt(0) === "?" ? r : "?" + r), n && n !== "#" && (t += n.charAt(0) === "#" ? n : "#" + n), t;
}
function lh(e) {
  let t = {};
  if (e) {
    let r = e.indexOf("#");
    r >= 0 && (t.hash = e.substr(r), e = e.substr(0, r));
    let n = e.indexOf("?");
    n >= 0 && (t.search = e.substr(n), e = e.substr(0, n)), e && (t.pathname = e);
  }
  return t;
}
var Gl;
(function(e) {
  e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error";
})(Gl || (Gl = {}));
function zj(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function Vj(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: r,
    search: n = "",
    hash: o = ""
  } = typeof e == "string" ? lh(e) : e;
  return {
    pathname: r ? r.startsWith("/") ? r : Wj(r, t) : t,
    search: Hj(n),
    hash: qj(o)
  };
}
function Wj(e, t) {
  let r = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((n) => {
    n === ".." ? r.length > 1 && r.pop() : n !== "." && r.push(n);
  }), r.length > 1 ? r.join("/") : "/";
}
function ta(e, t, r, n) {
  return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(n) + "].  Please separate it out to the ") + ("`to." + r + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function fh(e) {
  return e.filter((t, r) => r === 0 || t.route.path && t.route.path.length > 0);
}
function ph(e, t, r, n) {
  n === void 0 && (n = !1);
  let o;
  typeof e == "string" ? o = lh(e) : (o = os({}, e), me(!o.pathname || !o.pathname.includes("?"), ta("?", "pathname", "search", o)), me(!o.pathname || !o.pathname.includes("#"), ta("#", "pathname", "hash", o)), me(!o.search || !o.search.includes("#"), ta("#", "search", "hash", o)));
  let i = e === "" || o.pathname === "", a = i ? "/" : o.pathname, s;
  if (n || a == null)
    s = r;
  else {
    let p = t.length - 1;
    if (a.startsWith("..")) {
      let d = a.split("/");
      for (; d[0] === ".."; )
        d.shift(), p -= 1;
      o.pathname = d.join("/");
    }
    s = p >= 0 ? t[p] : "/";
  }
  let u = Vj(o, s), l = a && a !== "/" && a.endsWith("/"), f = (i || a === ".") && r.endsWith("/");
  return !u.pathname.endsWith("/") && (l || f) && (u.pathname += "/"), u;
}
const wu = (e) => e.join("/").replace(/\/\/+/g, "/"), Hj = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, qj = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e;
"useSyncExternalStore" in b && ((e) => e.useSyncExternalStore)(b);
const Jj = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (Jj.displayName = "DataStaticRouterContext");
const dh = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (dh.displayName = "DataRouter");
const hh = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (hh.displayName = "DataRouterState");
const Kj = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (Kj.displayName = "Await");
const zn = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (zn.displayName = "Navigation");
const Eu = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (Eu.displayName = "Location");
const Vn = /* @__PURE__ */ b.createContext({
  outlet: null,
  matches: []
});
process.env.NODE_ENV !== "production" && (Vn.displayName = "Route");
const Gj = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (Gj.displayName = "RouteError");
function Yj(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t;
  _u() || (process.env.NODE_ENV !== "production" ? me(
    !1,
    "useHref() may be used only in the context of a <Router> component."
  ) : me(!1));
  let {
    basename: n,
    navigator: o
  } = b.useContext(zn), {
    hash: i,
    pathname: a,
    search: s
  } = bi(e, {
    relative: r
  }), u = a;
  return n !== "/" && (u = a === "/" ? n : wu([n, a])), o.createHref({
    pathname: u,
    search: s,
    hash: i
  });
}
function _u() {
  return b.useContext(Eu) != null;
}
function Wn() {
  return _u() || (process.env.NODE_ENV !== "production" ? me(
    !1,
    "useLocation() may be used only in the context of a <Router> component."
  ) : me(!1)), b.useContext(Eu).location;
}
function Xj() {
  _u() || (process.env.NODE_ENV !== "production" ? me(
    !1,
    "useNavigate() may be used only in the context of a <Router> component."
  ) : me(!1));
  let {
    basename: e,
    navigator: t
  } = b.useContext(zn), {
    matches: r
  } = b.useContext(Vn), {
    pathname: n
  } = Wn(), o = JSON.stringify(fh(r).map((a) => a.pathnameBase)), i = b.useRef(!1);
  return b.useEffect(() => {
    i.current = !0;
  }), b.useCallback(function(a, s) {
    if (s === void 0 && (s = {}), process.env.NODE_ENV !== "production" && zj(i.current, "You should call navigate() in a React.useEffect(), not when your component is first rendered."), !i.current)
      return;
    if (typeof a == "number") {
      t.go(a);
      return;
    }
    let u = ph(a, JSON.parse(o), n, s.relative === "path");
    e !== "/" && (u.pathname = u.pathname === "/" ? e : wu([e, u.pathname])), (s.replace ? t.replace : t.push)(u, s.state, s);
  }, [e, t, o, n]);
}
const Zj = /* @__PURE__ */ b.createContext(null);
function Qj(e) {
  let t = b.useContext(Vn).outlet;
  return t && /* @__PURE__ */ b.createElement(Zj.Provider, {
    value: e
  }, t);
}
function bi(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t, {
    matches: n
  } = b.useContext(Vn), {
    pathname: o
  } = Wn(), i = JSON.stringify(fh(n).map((a) => a.pathnameBase));
  return b.useMemo(() => ph(e, JSON.parse(i), o, r === "path"), [e, i, o, r]);
}
var Yl;
(function(e) {
  e.UseRevalidator = "useRevalidator";
})(Yl || (Yl = {}));
var Xl;
(function(e) {
  e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator";
})(Xl || (Xl = {}));
function eP(e) {
  return Qj(e.context);
}
var Zl;
(function(e) {
  e[e.pending = 0] = "pending", e[e.success = 1] = "success", e[e.error = 2] = "error";
})(Zl || (Zl = {}));
new Promise(() => {
});
/**
 * React Router DOM v6.6.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function rr() {
  return rr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, rr.apply(this, arguments);
}
function Ou(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), o, i;
  for (i = 0; i < n.length; i++)
    o = n[i], !(t.indexOf(o) >= 0) && (r[o] = e[o]);
  return r;
}
const mo = "get", ra = "application/x-www-form-urlencoded";
function wi(e) {
  return e != null && typeof e.tagName == "string";
}
function tP(e) {
  return wi(e) && e.tagName.toLowerCase() === "button";
}
function rP(e) {
  return wi(e) && e.tagName.toLowerCase() === "form";
}
function nP(e) {
  return wi(e) && e.tagName.toLowerCase() === "input";
}
function oP(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function iP(e, t) {
  return e.button === 0 && (!t || t === "_self") && !oP(e);
}
function aP(e, t, r) {
  let n, o, i, a;
  if (rP(e)) {
    let l = r.submissionTrigger;
    n = r.method || e.getAttribute("method") || mo, o = r.action || e.getAttribute("action") || t, i = r.encType || e.getAttribute("enctype") || ra, a = new FormData(e), l && l.name && a.append(l.name, l.value);
  } else if (tP(e) || nP(e) && (e.type === "submit" || e.type === "image")) {
    let l = e.form;
    if (l == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    n = r.method || e.getAttribute("formmethod") || l.getAttribute("method") || mo, o = r.action || e.getAttribute("formaction") || l.getAttribute("action") || t, i = r.encType || e.getAttribute("formenctype") || l.getAttribute("enctype") || ra, a = new FormData(l), e.name && a.append(e.name, e.value);
  } else {
    if (wi(e))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    if (n = r.method || mo, o = r.action || t, i = r.encType || ra, e instanceof FormData)
      a = e;
    else if (a = new FormData(), e instanceof URLSearchParams)
      for (let [l, f] of e)
        a.append(l, f);
    else if (e != null)
      for (let l of Object.keys(e))
        a.append(l, e[l]);
  }
  let {
    protocol: s,
    host: u
  } = window.location;
  return {
    url: new URL(o, s + "//" + u),
    method: n.toLowerCase(),
    encType: i,
    formData: a
  };
}
const sP = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset"], uP = ["aria-current", "caseSensitive", "className", "end", "style", "to", "children"], cP = ["reloadDocument", "replace", "method", "action", "onSubmit", "fetcherKey", "routeId", "relative"];
process.env.NODE_ENV;
const vh = /* @__PURE__ */ b.forwardRef(function(e, t) {
  let {
    onClick: r,
    relative: n,
    reloadDocument: o,
    replace: i,
    state: a,
    target: s,
    to: u,
    preventScrollReset: l
  } = e, f = Ou(e, sP), p = Yj(u, {
    relative: n
  }), d = hP(u, {
    replace: i,
    state: a,
    target: s,
    preventScrollReset: l,
    relative: n
  });
  function h(m) {
    r && r(m), m.defaultPrevented || d(m);
  }
  return /* @__PURE__ */ b.createElement("a", rr({}, f, {
    href: p,
    onClick: o ? r : h,
    ref: t,
    target: s
  }));
});
process.env.NODE_ENV !== "production" && (vh.displayName = "Link");
const lP = /* @__PURE__ */ b.forwardRef(function(e, t) {
  let {
    "aria-current": r = "page",
    caseSensitive: n = !1,
    className: o = "",
    end: i = !1,
    style: a,
    to: s,
    children: u
  } = e, l = Ou(e, uP), f = bi(s, {
    relative: l.relative
  }), p = Wn(), d = b.useContext(hh), {
    navigator: h
  } = b.useContext(zn), m = h.encodeLocation ? h.encodeLocation(f).pathname : f.pathname, y = p.pathname, _ = d && d.navigation && d.navigation.location ? d.navigation.location.pathname : null;
  n || (y = y.toLowerCase(), _ = _ ? _.toLowerCase() : null, m = m.toLowerCase());
  let j = y === m || !i && y.startsWith(m) && y.charAt(m.length) === "/", L = _ != null && (_ === m || !i && _.startsWith(m) && _.charAt(m.length) === "/"), w = j ? r : void 0, O;
  typeof o == "function" ? O = o({
    isActive: j,
    isPending: L
  }) : O = [o, j ? "active" : null, L ? "pending" : null].filter(Boolean).join(" ");
  let D = typeof a == "function" ? a({
    isActive: j,
    isPending: L
  }) : a;
  return /* @__PURE__ */ b.createElement(vh, rr({}, l, {
    "aria-current": w,
    className: O,
    ref: t,
    style: D,
    to: s
  }), typeof u == "function" ? u({
    isActive: j,
    isPending: L
  }) : u);
});
process.env.NODE_ENV !== "production" && (lP.displayName = "NavLink");
const fP = /* @__PURE__ */ b.forwardRef((e, t) => /* @__PURE__ */ b.createElement(mh, rr({}, e, {
  ref: t
})));
process.env.NODE_ENV !== "production" && (fP.displayName = "Form");
const mh = /* @__PURE__ */ b.forwardRef((e, t) => {
  let {
    reloadDocument: r,
    replace: n,
    method: o = mo,
    action: i,
    onSubmit: a,
    fetcherKey: s,
    routeId: u,
    relative: l
  } = e, f = Ou(e, cP), p = vP(s, u), d = o.toLowerCase() === "get" ? "get" : "post", h = yh(i, {
    relative: l
  }), m = (y) => {
    if (a && a(y), y.defaultPrevented)
      return;
    y.preventDefault();
    let _ = y.nativeEvent.submitter, j = (_ == null ? void 0 : _.getAttribute("formmethod")) || o;
    p(_ || y.currentTarget, {
      method: j,
      replace: n,
      relative: l
    });
  };
  return /* @__PURE__ */ b.createElement("form", rr({
    ref: t,
    method: d,
    action: h,
    onSubmit: r ? a : m
  }, f));
});
process.env.NODE_ENV !== "production" && (mh.displayName = "FormImpl");
process.env.NODE_ENV;
var as;
(function(e) {
  e.UseScrollRestoration = "useScrollRestoration", e.UseSubmitImpl = "useSubmitImpl", e.UseFetcher = "useFetcher";
})(as || (as = {}));
var Ql;
(function(e) {
  e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration";
})(Ql || (Ql = {}));
function pP(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function dP(e) {
  let t = b.useContext(dh);
  return t || (process.env.NODE_ENV !== "production" ? me(!1, pP(e)) : me(!1)), t;
}
function hP(e, t) {
  let {
    target: r,
    replace: n,
    state: o,
    preventScrollReset: i,
    relative: a
  } = t === void 0 ? {} : t, s = Xj(), u = Wn(), l = bi(e, {
    relative: a
  });
  return b.useCallback((f) => {
    if (iP(f, r)) {
      f.preventDefault();
      let p = n !== void 0 ? n : is(u) === is(l);
      s(e, {
        replace: p,
        state: o,
        preventScrollReset: i,
        relative: a
      });
    }
  }, [u, s, l, n, o, r, e, i, a]);
}
function vP(e, t) {
  let {
    router: r
  } = dP(as.UseSubmitImpl), n = yh();
  return b.useCallback(function(o, i) {
    if (i === void 0 && (i = {}), typeof document > "u")
      throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
    let {
      method: a,
      encType: s,
      formData: u,
      url: l
    } = aP(o, n, i), f = l.pathname + l.search, p = {
      replace: i.replace,
      formData: u,
      formMethod: a,
      formEncType: s
    };
    e ? (t == null && (process.env.NODE_ENV !== "production" ? me(!1, "No routeId available for useFetcher()") : me(!1)), r.fetch(e, t, f, p)) : r.navigate(f, p);
  }, [n, r, e, t]);
}
function yh(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t, {
    basename: n
  } = b.useContext(zn), o = b.useContext(Vn);
  o || (process.env.NODE_ENV !== "production" ? me(!1, "useFormAction must be used inside a RouteContext") : me(!1));
  let [i] = o.matches.slice(-1), a = rr({}, bi(e || ".", {
    relative: r
  })), s = Wn();
  if (e == null && (a.search = s.search, a.hash = s.hash, i.route.index)) {
    let u = new URLSearchParams(a.search);
    u.delete("index"), a.search = u.toString() ? "?" + u.toString() : "";
  }
  return (!e || e === ".") && i.route.index && (a.search = a.search ? a.search.replace(/^\?/, "?index&") : "?index"), n !== "/" && (a.pathname = a.pathname === "/" ? n : wu([n, a.pathname])), is(a);
}
var mP = typeof global == "object" && global && global.Object === Object && global;
const gh = mP;
var yP = typeof self == "object" && self && self.Object === Object && self, gP = gh || yP || Function("return this")();
const qe = gP;
var bP = qe.Symbol;
const Mt = bP;
var bh = Object.prototype, wP = bh.hasOwnProperty, EP = bh.toString, un = Mt ? Mt.toStringTag : void 0;
function _P(e) {
  var t = wP.call(e, un), r = e[un];
  try {
    e[un] = void 0;
    var n = !0;
  } catch {
  }
  var o = EP.call(e);
  return n && (t ? e[un] = r : delete e[un]), o;
}
var OP = Object.prototype, SP = OP.toString;
function xP(e) {
  return SP.call(e);
}
var RP = "[object Null]", jP = "[object Undefined]", ef = Mt ? Mt.toStringTag : void 0;
function dr(e) {
  return e == null ? e === void 0 ? jP : RP : ef && ef in Object(e) ? _P(e) : xP(e);
}
function zt(e) {
  return e != null && typeof e == "object";
}
var PP = "[object Symbol]";
function Su(e) {
  return typeof e == "symbol" || zt(e) && dr(e) == PP;
}
function TP(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, o = Array(n); ++r < n; )
    o[r] = t(e[r], r, e);
  return o;
}
var AP = Array.isArray;
const Le = AP;
var CP = 1 / 0, tf = Mt ? Mt.prototype : void 0, rf = tf ? tf.toString : void 0;
function wh(e) {
  if (typeof e == "string")
    return e;
  if (Le(e))
    return TP(e, wh) + "";
  if (Su(e))
    return rf ? rf.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -CP ? "-0" : t;
}
function Ht(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
function xu(e) {
  return e;
}
var NP = "[object AsyncFunction]", DP = "[object Function]", LP = "[object GeneratorFunction]", IP = "[object Proxy]";
function Ru(e) {
  if (!Ht(e))
    return !1;
  var t = dr(e);
  return t == DP || t == LP || t == NP || t == IP;
}
var FP = qe["__core-js_shared__"];
const na = FP;
var nf = function() {
  var e = /[^.]+$/.exec(na && na.keys && na.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function kP(e) {
  return !!nf && nf in e;
}
var UP = Function.prototype, $P = UP.toString;
function hr(e) {
  if (e != null) {
    try {
      return $P.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var BP = /[\\^$.*+?()[\]{}|]/g, MP = /^\[object .+?Constructor\]$/, zP = Function.prototype, VP = Object.prototype, WP = zP.toString, HP = VP.hasOwnProperty, qP = RegExp(
  "^" + WP.call(HP).replace(BP, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function JP(e) {
  if (!Ht(e) || kP(e))
    return !1;
  var t = Ru(e) ? qP : MP;
  return t.test(hr(e));
}
function KP(e, t) {
  return e == null ? void 0 : e[t];
}
function vr(e, t) {
  var r = KP(e, t);
  return JP(r) ? r : void 0;
}
var GP = vr(qe, "WeakMap");
const ss = GP;
var of = Object.create, YP = function() {
  function e() {
  }
  return function(t) {
    if (!Ht(t))
      return {};
    if (of)
      return of(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}();
const XP = YP;
function ZP(e, t, r) {
  switch (r.length) {
    case 0:
      return e.call(t);
    case 1:
      return e.call(t, r[0]);
    case 2:
      return e.call(t, r[0], r[1]);
    case 3:
      return e.call(t, r[0], r[1], r[2]);
  }
  return e.apply(t, r);
}
function QP() {
}
function eT(e, t) {
  var r = -1, n = e.length;
  for (t || (t = Array(n)); ++r < n; )
    t[r] = e[r];
  return t;
}
var tT = 800, rT = 16, nT = Date.now;
function oT(e) {
  var t = 0, r = 0;
  return function() {
    var n = nT(), o = rT - (n - r);
    if (r = n, o > 0) {
      if (++t >= tT)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function iT(e) {
  return function() {
    return e;
  };
}
var aT = function() {
  try {
    var e = vr(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
const Bo = aT;
var sT = Bo ? function(e, t) {
  return Bo(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: iT(t),
    writable: !0
  });
} : xu;
const uT = sT;
var cT = oT(uT);
const lT = cT;
function fT(e, t, r, n) {
  for (var o = e.length, i = r + (n ? 1 : -1); n ? i-- : ++i < o; )
    if (t(e[i], i, e))
      return i;
  return -1;
}
function pT(e) {
  return e !== e;
}
function dT(e, t, r) {
  for (var n = r - 1, o = e.length; ++n < o; )
    if (e[n] === t)
      return n;
  return -1;
}
function hT(e, t, r) {
  return t === t ? dT(e, t, r) : fT(e, pT, r);
}
function vT(e, t) {
  var r = e == null ? 0 : e.length;
  return !!r && hT(e, t, 0) > -1;
}
var mT = 9007199254740991, yT = /^(?:0|[1-9]\d*)$/;
function ju(e, t) {
  var r = typeof e;
  return t = t ?? mT, !!t && (r == "number" || r != "symbol" && yT.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function Pu(e, t, r) {
  t == "__proto__" && Bo ? Bo(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
function Hn(e, t) {
  return e === t || e !== e && t !== t;
}
var gT = Object.prototype, bT = gT.hasOwnProperty;
function wT(e, t, r) {
  var n = e[t];
  (!(bT.call(e, t) && Hn(n, r)) || r === void 0 && !(t in e)) && Pu(e, t, r);
}
function ET(e, t, r, n) {
  var o = !r;
  r || (r = {});
  for (var i = -1, a = t.length; ++i < a; ) {
    var s = t[i], u = n ? n(r[s], e[s], s, r, e) : void 0;
    u === void 0 && (u = e[s]), o ? Pu(r, s, u) : wT(r, s, u);
  }
  return r;
}
var af = Math.max;
function _T(e, t, r) {
  return t = af(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var n = arguments, o = -1, i = af(n.length - t, 0), a = Array(i); ++o < i; )
      a[o] = n[t + o];
    o = -1;
    for (var s = Array(t + 1); ++o < t; )
      s[o] = n[o];
    return s[t] = r(a), ZP(e, this, s);
  };
}
function OT(e, t) {
  return lT(_T(e, t, xu), e + "");
}
var ST = 9007199254740991;
function Tu(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= ST;
}
function Ei(e) {
  return e != null && Tu(e.length) && !Ru(e);
}
function xT(e, t, r) {
  if (!Ht(r))
    return !1;
  var n = typeof t;
  return (n == "number" ? Ei(r) && ju(t, r.length) : n == "string" && t in r) ? Hn(r[t], e) : !1;
}
function RT(e) {
  return OT(function(t, r) {
    var n = -1, o = r.length, i = o > 1 ? r[o - 1] : void 0, a = o > 2 ? r[2] : void 0;
    for (i = e.length > 3 && typeof i == "function" ? (o--, i) : void 0, a && xT(r[0], r[1], a) && (i = o < 3 ? void 0 : i, o = 1), t = Object(t); ++n < o; ) {
      var s = r[n];
      s && e(t, s, n, i);
    }
    return t;
  });
}
var jT = Object.prototype;
function Au(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || jT;
  return e === r;
}
function PT(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var TT = "[object Arguments]";
function sf(e) {
  return zt(e) && dr(e) == TT;
}
var Eh = Object.prototype, AT = Eh.hasOwnProperty, CT = Eh.propertyIsEnumerable, NT = sf(function() {
  return arguments;
}()) ? sf : function(e) {
  return zt(e) && AT.call(e, "callee") && !CT.call(e, "callee");
};
const Mo = NT;
function DT() {
  return !1;
}
var _h = typeof exports == "object" && exports && !exports.nodeType && exports, uf = _h && typeof module == "object" && module && !module.nodeType && module, LT = uf && uf.exports === _h, cf = LT ? qe.Buffer : void 0, IT = cf ? cf.isBuffer : void 0, FT = IT || DT;
const zo = FT;
var kT = "[object Arguments]", UT = "[object Array]", $T = "[object Boolean]", BT = "[object Date]", MT = "[object Error]", zT = "[object Function]", VT = "[object Map]", WT = "[object Number]", HT = "[object Object]", qT = "[object RegExp]", JT = "[object Set]", KT = "[object String]", GT = "[object WeakMap]", YT = "[object ArrayBuffer]", XT = "[object DataView]", ZT = "[object Float32Array]", QT = "[object Float64Array]", eA = "[object Int8Array]", tA = "[object Int16Array]", rA = "[object Int32Array]", nA = "[object Uint8Array]", oA = "[object Uint8ClampedArray]", iA = "[object Uint16Array]", aA = "[object Uint32Array]", Y = {};
Y[ZT] = Y[QT] = Y[eA] = Y[tA] = Y[rA] = Y[nA] = Y[oA] = Y[iA] = Y[aA] = !0;
Y[kT] = Y[UT] = Y[YT] = Y[$T] = Y[XT] = Y[BT] = Y[MT] = Y[zT] = Y[VT] = Y[WT] = Y[HT] = Y[qT] = Y[JT] = Y[KT] = Y[GT] = !1;
function sA(e) {
  return zt(e) && Tu(e.length) && !!Y[dr(e)];
}
function uA(e) {
  return function(t) {
    return e(t);
  };
}
var Oh = typeof exports == "object" && exports && !exports.nodeType && exports, hn = Oh && typeof module == "object" && module && !module.nodeType && module, cA = hn && hn.exports === Oh, oa = cA && gh.process, lA = function() {
  try {
    var e = hn && hn.require && hn.require("util").types;
    return e || oa && oa.binding && oa.binding("util");
  } catch {
  }
}();
const lf = lA;
var ff = lf && lf.isTypedArray, fA = ff ? uA(ff) : sA;
const Cu = fA;
var pA = Object.prototype, dA = pA.hasOwnProperty;
function Sh(e, t) {
  var r = Le(e), n = !r && Mo(e), o = !r && !n && zo(e), i = !r && !n && !o && Cu(e), a = r || n || o || i, s = a ? PT(e.length, String) : [], u = s.length;
  for (var l in e)
    (t || dA.call(e, l)) && !(a && (l == "length" || o && (l == "offset" || l == "parent") || i && (l == "buffer" || l == "byteLength" || l == "byteOffset") || ju(l, u))) && s.push(l);
  return s;
}
function xh(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var hA = xh(Object.keys, Object);
const vA = hA;
var mA = Object.prototype, yA = mA.hasOwnProperty;
function gA(e) {
  if (!Au(e))
    return vA(e);
  var t = [];
  for (var r in Object(e))
    yA.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
function Rh(e) {
  return Ei(e) ? Sh(e) : gA(e);
}
function bA(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var wA = Object.prototype, EA = wA.hasOwnProperty;
function _A(e) {
  if (!Ht(e))
    return bA(e);
  var t = Au(e), r = [];
  for (var n in e)
    n == "constructor" && (t || !EA.call(e, n)) || r.push(n);
  return r;
}
function jh(e) {
  return Ei(e) ? Sh(e, !0) : _A(e);
}
var OA = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, SA = /^\w*$/;
function Nu(e, t) {
  if (Le(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || Su(e) ? !0 : SA.test(e) || !OA.test(e) || t != null && e in Object(t);
}
var xA = vr(Object, "create");
const xn = xA;
function RA() {
  this.__data__ = xn ? xn(null) : {}, this.size = 0;
}
function jA(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var PA = "__lodash_hash_undefined__", TA = Object.prototype, AA = TA.hasOwnProperty;
function CA(e) {
  var t = this.__data__;
  if (xn) {
    var r = t[e];
    return r === PA ? void 0 : r;
  }
  return AA.call(t, e) ? t[e] : void 0;
}
var NA = Object.prototype, DA = NA.hasOwnProperty;
function LA(e) {
  var t = this.__data__;
  return xn ? t[e] !== void 0 : DA.call(t, e);
}
var IA = "__lodash_hash_undefined__";
function FA(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = xn && t === void 0 ? IA : t, this;
}
function nr(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
nr.prototype.clear = RA;
nr.prototype.delete = jA;
nr.prototype.get = CA;
nr.prototype.has = LA;
nr.prototype.set = FA;
function kA() {
  this.__data__ = [], this.size = 0;
}
function _i(e, t) {
  for (var r = e.length; r--; )
    if (Hn(e[r][0], t))
      return r;
  return -1;
}
var UA = Array.prototype, $A = UA.splice;
function BA(e) {
  var t = this.__data__, r = _i(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : $A.call(t, r, 1), --this.size, !0;
}
function MA(e) {
  var t = this.__data__, r = _i(t, e);
  return r < 0 ? void 0 : t[r][1];
}
function zA(e) {
  return _i(this.__data__, e) > -1;
}
function VA(e, t) {
  var r = this.__data__, n = _i(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
function st(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
st.prototype.clear = kA;
st.prototype.delete = BA;
st.prototype.get = MA;
st.prototype.has = zA;
st.prototype.set = VA;
var WA = vr(qe, "Map");
const Rn = WA;
function HA() {
  this.size = 0, this.__data__ = {
    hash: new nr(),
    map: new (Rn || st)(),
    string: new nr()
  };
}
function qA(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function Oi(e, t) {
  var r = e.__data__;
  return qA(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
function JA(e) {
  var t = Oi(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function KA(e) {
  return Oi(this, e).get(e);
}
function GA(e) {
  return Oi(this, e).has(e);
}
function YA(e, t) {
  var r = Oi(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
function ut(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
ut.prototype.clear = HA;
ut.prototype.delete = JA;
ut.prototype.get = KA;
ut.prototype.has = GA;
ut.prototype.set = YA;
var XA = "Expected a function";
function Du(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(XA);
  var r = function() {
    var n = arguments, o = t ? t.apply(this, n) : n[0], i = r.cache;
    if (i.has(o))
      return i.get(o);
    var a = e.apply(this, n);
    return r.cache = i.set(o, a) || i, a;
  };
  return r.cache = new (Du.Cache || ut)(), r;
}
Du.Cache = ut;
var ZA = 500;
function QA(e) {
  var t = Du(e, function(n) {
    return r.size === ZA && r.clear(), n;
  }), r = t.cache;
  return t;
}
var eC = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, tC = /\\(\\)?/g, rC = QA(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(eC, function(r, n, o, i) {
    t.push(o ? i.replace(tC, "$1") : n || r);
  }), t;
});
const nC = rC;
function oC(e) {
  return e == null ? "" : wh(e);
}
function Ph(e, t) {
  return Le(e) ? e : Nu(e, t) ? [e] : nC(oC(e));
}
var iC = 1 / 0;
function Si(e) {
  if (typeof e == "string" || Su(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -iC ? "-0" : t;
}
function Th(e, t) {
  t = Ph(t, e);
  for (var r = 0, n = t.length; e != null && r < n; )
    e = e[Si(t[r++])];
  return r && r == n ? e : void 0;
}
function aC(e, t, r) {
  var n = e == null ? void 0 : Th(e, t);
  return n === void 0 ? r : n;
}
function sC(e, t) {
  for (var r = -1, n = t.length, o = e.length; ++r < n; )
    e[o + r] = t[r];
  return e;
}
var uC = xh(Object.getPrototypeOf, Object);
const Ah = uC;
var cC = "[object Object]", lC = Function.prototype, fC = Object.prototype, Ch = lC.toString, pC = fC.hasOwnProperty, dC = Ch.call(Object);
function hC(e) {
  if (!zt(e) || dr(e) != cC)
    return !1;
  var t = Ah(e);
  if (t === null)
    return !0;
  var r = pC.call(t, "constructor") && t.constructor;
  return typeof r == "function" && r instanceof r && Ch.call(r) == dC;
}
function vC() {
  this.__data__ = new st(), this.size = 0;
}
function mC(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
function yC(e) {
  return this.__data__.get(e);
}
function gC(e) {
  return this.__data__.has(e);
}
var bC = 200;
function wC(e, t) {
  var r = this.__data__;
  if (r instanceof st) {
    var n = r.__data__;
    if (!Rn || n.length < bC - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new ut(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
function Ve(e) {
  var t = this.__data__ = new st(e);
  this.size = t.size;
}
Ve.prototype.clear = vC;
Ve.prototype.delete = mC;
Ve.prototype.get = yC;
Ve.prototype.has = gC;
Ve.prototype.set = wC;
var Nh = typeof exports == "object" && exports && !exports.nodeType && exports, pf = Nh && typeof module == "object" && module && !module.nodeType && module, EC = pf && pf.exports === Nh, df = EC ? qe.Buffer : void 0, hf = df ? df.allocUnsafe : void 0;
function _C(e, t) {
  if (t)
    return e.slice();
  var r = e.length, n = hf ? hf(r) : new e.constructor(r);
  return e.copy(n), n;
}
function OC(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, o = 0, i = []; ++r < n; ) {
    var a = e[r];
    t(a, r, e) && (i[o++] = a);
  }
  return i;
}
function SC() {
  return [];
}
var xC = Object.prototype, RC = xC.propertyIsEnumerable, vf = Object.getOwnPropertySymbols, jC = vf ? function(e) {
  return e == null ? [] : (e = Object(e), OC(vf(e), function(t) {
    return RC.call(e, t);
  }));
} : SC;
const PC = jC;
function TC(e, t, r) {
  var n = t(e);
  return Le(e) ? n : sC(n, r(e));
}
function mf(e) {
  return TC(e, Rh, PC);
}
var AC = vr(qe, "DataView");
const us = AC;
var CC = vr(qe, "Promise");
const cs = CC;
var NC = vr(qe, "Set");
const Er = NC;
var yf = "[object Map]", DC = "[object Object]", gf = "[object Promise]", bf = "[object Set]", wf = "[object WeakMap]", Ef = "[object DataView]", LC = hr(us), IC = hr(Rn), FC = hr(cs), kC = hr(Er), UC = hr(ss), Kt = dr;
(us && Kt(new us(new ArrayBuffer(1))) != Ef || Rn && Kt(new Rn()) != yf || cs && Kt(cs.resolve()) != gf || Er && Kt(new Er()) != bf || ss && Kt(new ss()) != wf) && (Kt = function(e) {
  var t = dr(e), r = t == DC ? e.constructor : void 0, n = r ? hr(r) : "";
  if (n)
    switch (n) {
      case LC:
        return Ef;
      case IC:
        return yf;
      case FC:
        return gf;
      case kC:
        return bf;
      case UC:
        return wf;
    }
  return t;
});
const _f = Kt;
var $C = qe.Uint8Array;
const Vo = $C;
function BC(e) {
  var t = new e.constructor(e.byteLength);
  return new Vo(t).set(new Vo(e)), t;
}
function MC(e, t) {
  var r = t ? BC(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
function zC(e) {
  return typeof e.constructor == "function" && !Au(e) ? XP(Ah(e)) : {};
}
var VC = "__lodash_hash_undefined__";
function WC(e) {
  return this.__data__.set(e, VC), this;
}
function HC(e) {
  return this.__data__.has(e);
}
function jn(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.__data__ = new ut(); ++t < r; )
    this.add(e[t]);
}
jn.prototype.add = jn.prototype.push = WC;
jn.prototype.has = HC;
function qC(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
    if (t(e[r], r, e))
      return !0;
  return !1;
}
function Dh(e, t) {
  return e.has(t);
}
var JC = 1, KC = 2;
function Lh(e, t, r, n, o, i) {
  var a = r & JC, s = e.length, u = t.length;
  if (s != u && !(a && u > s))
    return !1;
  var l = i.get(e), f = i.get(t);
  if (l && f)
    return l == t && f == e;
  var p = -1, d = !0, h = r & KC ? new jn() : void 0;
  for (i.set(e, t), i.set(t, e); ++p < s; ) {
    var m = e[p], y = t[p];
    if (n)
      var _ = a ? n(y, m, p, t, e, i) : n(m, y, p, e, t, i);
    if (_ !== void 0) {
      if (_)
        continue;
      d = !1;
      break;
    }
    if (h) {
      if (!qC(t, function(j, L) {
        if (!Dh(h, L) && (m === j || o(m, j, r, n, i)))
          return h.push(L);
      })) {
        d = !1;
        break;
      }
    } else if (!(m === y || o(m, y, r, n, i))) {
      d = !1;
      break;
    }
  }
  return i.delete(e), i.delete(t), d;
}
function GC(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n, o) {
    r[++t] = [o, n];
  }), r;
}
function Lu(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n) {
    r[++t] = n;
  }), r;
}
var YC = 1, XC = 2, ZC = "[object Boolean]", QC = "[object Date]", eN = "[object Error]", tN = "[object Map]", rN = "[object Number]", nN = "[object RegExp]", oN = "[object Set]", iN = "[object String]", aN = "[object Symbol]", sN = "[object ArrayBuffer]", uN = "[object DataView]", Of = Mt ? Mt.prototype : void 0, ia = Of ? Of.valueOf : void 0;
function cN(e, t, r, n, o, i, a) {
  switch (r) {
    case uN:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case sN:
      return !(e.byteLength != t.byteLength || !i(new Vo(e), new Vo(t)));
    case ZC:
    case QC:
    case rN:
      return Hn(+e, +t);
    case eN:
      return e.name == t.name && e.message == t.message;
    case nN:
    case iN:
      return e == t + "";
    case tN:
      var s = GC;
    case oN:
      var u = n & YC;
      if (s || (s = Lu), e.size != t.size && !u)
        return !1;
      var l = a.get(e);
      if (l)
        return l == t;
      n |= XC, a.set(e, t);
      var f = Lh(s(e), s(t), n, o, i, a);
      return a.delete(e), f;
    case aN:
      if (ia)
        return ia.call(e) == ia.call(t);
  }
  return !1;
}
var lN = 1, fN = Object.prototype, pN = fN.hasOwnProperty;
function dN(e, t, r, n, o, i) {
  var a = r & lN, s = mf(e), u = s.length, l = mf(t), f = l.length;
  if (u != f && !a)
    return !1;
  for (var p = u; p--; ) {
    var d = s[p];
    if (!(a ? d in t : pN.call(t, d)))
      return !1;
  }
  var h = i.get(e), m = i.get(t);
  if (h && m)
    return h == t && m == e;
  var y = !0;
  i.set(e, t), i.set(t, e);
  for (var _ = a; ++p < u; ) {
    d = s[p];
    var j = e[d], L = t[d];
    if (n)
      var w = a ? n(L, j, d, t, e, i) : n(j, L, d, e, t, i);
    if (!(w === void 0 ? j === L || o(j, L, r, n, i) : w)) {
      y = !1;
      break;
    }
    _ || (_ = d == "constructor");
  }
  if (y && !_) {
    var O = e.constructor, D = t.constructor;
    O != D && "constructor" in e && "constructor" in t && !(typeof O == "function" && O instanceof O && typeof D == "function" && D instanceof D) && (y = !1);
  }
  return i.delete(e), i.delete(t), y;
}
var hN = 1, Sf = "[object Arguments]", xf = "[object Array]", Qn = "[object Object]", vN = Object.prototype, Rf = vN.hasOwnProperty;
function mN(e, t, r, n, o, i) {
  var a = Le(e), s = Le(t), u = a ? xf : _f(e), l = s ? xf : _f(t);
  u = u == Sf ? Qn : u, l = l == Sf ? Qn : l;
  var f = u == Qn, p = l == Qn, d = u == l;
  if (d && zo(e)) {
    if (!zo(t))
      return !1;
    a = !0, f = !1;
  }
  if (d && !f)
    return i || (i = new Ve()), a || Cu(e) ? Lh(e, t, r, n, o, i) : cN(e, t, u, r, n, o, i);
  if (!(r & hN)) {
    var h = f && Rf.call(e, "__wrapped__"), m = p && Rf.call(t, "__wrapped__");
    if (h || m) {
      var y = h ? e.value() : e, _ = m ? t.value() : t;
      return i || (i = new Ve()), o(y, _, r, n, i);
    }
  }
  return d ? (i || (i = new Ve()), dN(e, t, r, n, o, i)) : !1;
}
function Iu(e, t, r, n, o) {
  return e === t ? !0 : e == null || t == null || !zt(e) && !zt(t) ? e !== e && t !== t : mN(e, t, r, n, Iu, o);
}
var yN = 1, gN = 2;
function bN(e, t, r, n) {
  var o = r.length, i = o, a = !n;
  if (e == null)
    return !i;
  for (e = Object(e); o--; ) {
    var s = r[o];
    if (a && s[2] ? s[1] !== e[s[0]] : !(s[0] in e))
      return !1;
  }
  for (; ++o < i; ) {
    s = r[o];
    var u = s[0], l = e[u], f = s[1];
    if (a && s[2]) {
      if (l === void 0 && !(u in e))
        return !1;
    } else {
      var p = new Ve();
      if (n)
        var d = n(l, f, u, e, t, p);
      if (!(d === void 0 ? Iu(f, l, yN | gN, n, p) : d))
        return !1;
    }
  }
  return !0;
}
function Ih(e) {
  return e === e && !Ht(e);
}
function wN(e) {
  for (var t = Rh(e), r = t.length; r--; ) {
    var n = t[r], o = e[n];
    t[r] = [n, o, Ih(o)];
  }
  return t;
}
function Fh(e, t) {
  return function(r) {
    return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
  };
}
function EN(e) {
  var t = wN(e);
  return t.length == 1 && t[0][2] ? Fh(t[0][0], t[0][1]) : function(r) {
    return r === e || bN(r, e, t);
  };
}
function _N(e, t) {
  return e != null && t in Object(e);
}
function ON(e, t, r) {
  t = Ph(t, e);
  for (var n = -1, o = t.length, i = !1; ++n < o; ) {
    var a = Si(t[n]);
    if (!(i = e != null && r(e, a)))
      break;
    e = e[a];
  }
  return i || ++n != o ? i : (o = e == null ? 0 : e.length, !!o && Tu(o) && ju(a, o) && (Le(e) || Mo(e)));
}
function SN(e, t) {
  return e != null && ON(e, t, _N);
}
var xN = 1, RN = 2;
function jN(e, t) {
  return Nu(e) && Ih(t) ? Fh(Si(e), t) : function(r) {
    var n = aC(r, e);
    return n === void 0 && n === t ? SN(r, e) : Iu(t, n, xN | RN);
  };
}
function PN(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function TN(e) {
  return function(t) {
    return Th(t, e);
  };
}
function AN(e) {
  return Nu(e) ? PN(Si(e)) : TN(e);
}
function CN(e) {
  return typeof e == "function" ? e : e == null ? xu : typeof e == "object" ? Le(e) ? jN(e[0], e[1]) : EN(e) : AN(e);
}
function NN(e) {
  return function(t, r, n) {
    for (var o = -1, i = Object(t), a = n(t), s = a.length; s--; ) {
      var u = a[e ? s : ++o];
      if (r(i[u], u, i) === !1)
        break;
    }
    return t;
  };
}
var DN = NN();
const LN = DN;
function ls(e, t, r) {
  (r !== void 0 && !Hn(e[t], r) || r === void 0 && !(t in e)) && Pu(e, t, r);
}
function IN(e) {
  return zt(e) && Ei(e);
}
function fs(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function FN(e) {
  return ET(e, jh(e));
}
function kN(e, t, r, n, o, i, a) {
  var s = fs(e, r), u = fs(t, r), l = a.get(u);
  if (l) {
    ls(e, r, l);
    return;
  }
  var f = i ? i(s, u, r + "", e, t, a) : void 0, p = f === void 0;
  if (p) {
    var d = Le(u), h = !d && zo(u), m = !d && !h && Cu(u);
    f = u, d || h || m ? Le(s) ? f = s : IN(s) ? f = eT(s) : h ? (p = !1, f = _C(u, !0)) : m ? (p = !1, f = MC(u, !0)) : f = [] : hC(u) || Mo(u) ? (f = s, Mo(s) ? f = FN(s) : (!Ht(s) || Ru(s)) && (f = zC(u))) : p = !1;
  }
  p && (a.set(u, f), o(f, u, n, i, a), a.delete(u)), ls(e, r, f);
}
function kh(e, t, r, n, o) {
  e !== t && LN(t, function(i, a) {
    if (o || (o = new Ve()), Ht(i))
      kN(e, t, a, r, kh, n, o);
    else {
      var s = n ? n(fs(e, a), i, a + "", e, t, o) : void 0;
      s === void 0 && (s = i), ls(e, a, s);
    }
  }, jh);
}
function UN(e, t, r) {
  for (var n = -1, o = e == null ? 0 : e.length; ++n < o; )
    if (r(t, e[n]))
      return !0;
  return !1;
}
var $N = RT(function(e, t, r) {
  kh(e, t, r);
});
const BN = $N;
var MN = 1 / 0, zN = Er && 1 / Lu(new Er([, -0]))[1] == MN ? function(e) {
  return new Er(e);
} : QP;
const VN = zN;
var WN = 200;
function HN(e, t, r) {
  var n = -1, o = vT, i = e.length, a = !0, s = [], u = s;
  if (r)
    a = !1, o = UN;
  else if (i >= WN) {
    var l = t ? null : VN(e);
    if (l)
      return Lu(l);
    a = !1, o = Dh, u = new jn();
  } else
    u = t ? [] : s;
  e:
    for (; ++n < i; ) {
      var f = e[n], p = t ? t(f) : f;
      if (f = r || f !== 0 ? f : 0, a && p === p) {
        for (var d = u.length; d--; )
          if (u[d] === p)
            continue e;
        t && u.push(p), s.push(f);
      } else
        o(u, p, r) || (u !== s && u.push(p), s.push(f));
    }
  return s;
}
function qN(e, t) {
  return e && e.length ? HN(e, CN(t)) : [];
}
var ps = /* @__PURE__ */ ((e) => (e.Json = "application/json", e.UrlEncoded = "application/x-www-form-urlencoded", e))(ps || {});
class JN {
  constructor() {
    he(this, "listeners"), this.listeners = {};
  }
  trigger(t, ...r) {
    var n;
    (n = this.listeners[t]) == null || n.map((o) => o(...r));
  }
  on(t, r) {
    var n;
    return this.listeners[t] ? (n = this.listeners[t]) == null || n.push(r) : this.listeners[t] = [r], () => {
      this.off(t, r);
    };
  }
  off(t, r) {
    var n, o;
    if (this.listeners[t]) {
      const i = (n = this.listeners[t]) == null ? void 0 : n.findIndex((a) => a === r);
      i && i > -1 && ((o = this.listeners[t]) == null || o.splice(i, 1));
    } else
      throw new Error(`${this} is doesn't have event "${String(t)}"`);
  }
}
function jf(e) {
  for (const t in e)
    Object.prototype.hasOwnProperty.call(e, t) && e[t] === void 0 && delete e[t];
  return e;
}
const ds = (e, t = "", r = new FormData()) => (Object.keys(e).forEach((n) => {
  const o = t !== "" ? t + "." + n : n, i = e[n];
  Array.isArray(i) ? i.forEach((a, s) => {
    typeof a == "object" ? a instanceof File ? r.append(o, a) : r = ds(a, o + `[${s}]`, r) : r.append(o, a);
  }) : typeof i == "object" ? i instanceof File ? r.append(o, i) : r = ds(i, o, r) : r.append(o, i);
}), r), Wo = (e, t = "", r = new URLSearchParams()) => (Object.keys(e).forEach((n) => {
  const o = t !== "" ? t + "." + n : n, i = e[n];
  Array.isArray(i) ? i.forEach((a, s) => {
    typeof a == "object" ? r = Wo(a, o + `[${s}]`, r) : r.append(o, a);
  }) : typeof i == "object" ? r = Wo(i, o, r) : r.append(o, i);
}), r);
class KN {
  constructor() {
    he(this, "modeEnv"), he(this, "subdomain");
  }
  setConfig({ modeEnv: t, subdomain: r }) {
    this.modeEnv = t || void 0, this.subdomain = r || void 0;
  }
  getConfig() {
    return {
      modEnv: this.modeEnv,
      subdomain: this.subdomain
    };
  }
}
const Pf = new KN();
class GN {
  getToken(t) {
    if (this.getPrefix())
      return localStorage.getItem(`${this.getPrefix()}_${t}`) || "";
  }
  setToken(t, r) {
    if (this.getPrefix())
      return localStorage.setItem(`${this.getPrefix()}_${t}`, r);
  }
  getPrefix() {
    const t = Pf.getConfig().modEnv, r = Pf.getConfig().subdomain;
    return !t || !r ? "" : `${t}_${r}`;
  }
}
const YN = new GN();
function Uh(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: $h } = Object.prototype, { getPrototypeOf: Fu } = Object, ku = ((e) => (t) => {
  const r = $h.call(t);
  return e[r] || (e[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), ct = (e) => (e = e.toLowerCase(), (t) => ku(t) === e), xi = (e) => (t) => typeof t === e, { isArray: Dr } = Array, Pn = xi("undefined");
function XN(e) {
  return e !== null && !Pn(e) && e.constructor !== null && !Pn(e.constructor) && or(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Bh = ct("ArrayBuffer");
function ZN(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Bh(e.buffer), t;
}
const QN = xi("string"), or = xi("function"), Mh = xi("number"), Uu = (e) => e !== null && typeof e == "object", eD = (e) => e === !0 || e === !1, yo = (e) => {
  if (ku(e) !== "object")
    return !1;
  const t = Fu(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, tD = ct("Date"), rD = ct("File"), nD = ct("Blob"), oD = ct("FileList"), iD = (e) => Uu(e) && or(e.pipe), aD = (e) => {
  const t = "[object FormData]";
  return e && (typeof FormData == "function" && e instanceof FormData || $h.call(e) === t || or(e.toString) && e.toString() === t);
}, sD = ct("URLSearchParams"), uD = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function qn(e, t, { allOwnKeys: r = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let n, o;
  if (typeof e != "object" && (e = [e]), Dr(e))
    for (n = 0, o = e.length; n < o; n++)
      t.call(null, e[n], n, e);
  else {
    const i = r ? Object.getOwnPropertyNames(e) : Object.keys(e), a = i.length;
    let s;
    for (n = 0; n < a; n++)
      s = i[n], t.call(null, e[s], s, e);
  }
}
function zh(e, t) {
  t = t.toLowerCase();
  const r = Object.keys(e);
  let n = r.length, o;
  for (; n-- > 0; )
    if (o = r[n], t === o.toLowerCase())
      return o;
  return null;
}
const Vh = typeof self > "u" ? typeof global > "u" ? globalThis : global : self, Wh = (e) => !Pn(e) && e !== Vh;
function hs() {
  const { caseless: e } = Wh(this) && this || {}, t = {}, r = (n, o) => {
    const i = e && zh(t, o) || o;
    yo(t[i]) && yo(n) ? t[i] = hs(t[i], n) : yo(n) ? t[i] = hs({}, n) : Dr(n) ? t[i] = n.slice() : t[i] = n;
  };
  for (let n = 0, o = arguments.length; n < o; n++)
    arguments[n] && qn(arguments[n], r);
  return t;
}
const cD = (e, t, r, { allOwnKeys: n } = {}) => (qn(t, (o, i) => {
  r && or(o) ? e[i] = Uh(o, r) : e[i] = o;
}, { allOwnKeys: n }), e), lD = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), fD = (e, t, r, n) => {
  e.prototype = Object.create(t.prototype, n), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), r && Object.assign(e.prototype, r);
}, pD = (e, t, r, n) => {
  let o, i, a;
  const s = {};
  if (t = t || {}, e == null)
    return t;
  do {
    for (o = Object.getOwnPropertyNames(e), i = o.length; i-- > 0; )
      a = o[i], (!n || n(a, e, t)) && !s[a] && (t[a] = e[a], s[a] = !0);
    e = r !== !1 && Fu(e);
  } while (e && (!r || r(e, t)) && e !== Object.prototype);
  return t;
}, dD = (e, t, r) => {
  e = String(e), (r === void 0 || r > e.length) && (r = e.length), r -= t.length;
  const n = e.indexOf(t, r);
  return n !== -1 && n === r;
}, hD = (e) => {
  if (!e)
    return null;
  if (Dr(e))
    return e;
  let t = e.length;
  if (!Mh(t))
    return null;
  const r = new Array(t);
  for (; t-- > 0; )
    r[t] = e[t];
  return r;
}, vD = ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Fu(Uint8Array)), mD = (e, t) => {
  const r = (e && e[Symbol.iterator]).call(e);
  let n;
  for (; (n = r.next()) && !n.done; ) {
    const o = n.value;
    t.call(e, o[0], o[1]);
  }
}, yD = (e, t) => {
  let r;
  const n = [];
  for (; (r = e.exec(t)) !== null; )
    n.push(r);
  return n;
}, gD = ct("HTMLFormElement"), bD = (e) => e.toLowerCase().replace(
  /[_-\s]([a-z\d])(\w*)/g,
  function(t, r, n) {
    return r.toUpperCase() + n;
  }
), Tf = (({ hasOwnProperty: e }) => (t, r) => e.call(t, r))(Object.prototype), wD = ct("RegExp"), Hh = (e, t) => {
  const r = Object.getOwnPropertyDescriptors(e), n = {};
  qn(r, (o, i) => {
    t(o, i, e) !== !1 && (n[i] = o);
  }), Object.defineProperties(e, n);
}, ED = (e) => {
  Hh(e, (t, r) => {
    if (or(e) && ["arguments", "caller", "callee"].indexOf(r) !== -1)
      return !1;
    const n = e[r];
    if (or(n)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + r + "'");
      });
    }
  });
}, _D = (e, t) => {
  const r = {}, n = (o) => {
    o.forEach((i) => {
      r[i] = !0;
    });
  };
  return Dr(e) ? n(e) : n(String(e).split(t)), r;
}, OD = () => {
}, SD = (e, t) => (e = +e, Number.isFinite(e) ? e : t), xD = (e) => {
  const t = new Array(10), r = (n, o) => {
    if (Uu(n)) {
      if (t.indexOf(n) >= 0)
        return;
      if (!("toJSON" in n)) {
        t[o] = n;
        const i = Dr(n) ? [] : {};
        return qn(n, (a, s) => {
          const u = r(a, o + 1);
          !Pn(u) && (i[s] = u);
        }), t[o] = void 0, i;
      }
    }
    return n;
  };
  return r(e, 0);
}, R = {
  isArray: Dr,
  isArrayBuffer: Bh,
  isBuffer: XN,
  isFormData: aD,
  isArrayBufferView: ZN,
  isString: QN,
  isNumber: Mh,
  isBoolean: eD,
  isObject: Uu,
  isPlainObject: yo,
  isUndefined: Pn,
  isDate: tD,
  isFile: rD,
  isBlob: nD,
  isRegExp: wD,
  isFunction: or,
  isStream: iD,
  isURLSearchParams: sD,
  isTypedArray: vD,
  isFileList: oD,
  forEach: qn,
  merge: hs,
  extend: cD,
  trim: uD,
  stripBOM: lD,
  inherits: fD,
  toFlatObject: pD,
  kindOf: ku,
  kindOfTest: ct,
  endsWith: dD,
  toArray: hD,
  forEachEntry: mD,
  matchAll: yD,
  isHTMLForm: gD,
  hasOwnProperty: Tf,
  hasOwnProp: Tf,
  reduceDescriptors: Hh,
  freezeMethods: ED,
  toObjectSet: _D,
  toCamelCase: bD,
  noop: OD,
  toFiniteNumber: SD,
  findKey: zh,
  global: Vh,
  isContextDefined: Wh,
  toJSONObject: xD
};
function W(e, t, r, n, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), r && (this.config = r), n && (this.request = n), o && (this.response = o);
}
R.inherits(W, Error, {
  toJSON: function() {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: R.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const qh = W.prototype, Jh = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
].forEach((e) => {
  Jh[e] = { value: e };
});
Object.defineProperties(W, Jh);
Object.defineProperty(qh, "isAxiosError", { value: !0 });
W.from = (e, t, r, n, o, i) => {
  const a = Object.create(qh);
  return R.toFlatObject(e, a, function(s) {
    return s !== Error.prototype;
  }, (s) => s !== "isAxiosError"), W.call(a, e.message, t, r, n, o), a.cause = e, a.name = e.name, i && Object.assign(a, i), a;
};
var RD = typeof self == "object" ? self.FormData : window.FormData;
const jD = RD;
function vs(e) {
  return R.isPlainObject(e) || R.isArray(e);
}
function Kh(e) {
  return R.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Af(e, t, r) {
  return e ? e.concat(t).map(function(n, o) {
    return n = Kh(n), !r && o ? "[" + n + "]" : n;
  }).join(r ? "." : "") : t;
}
function PD(e) {
  return R.isArray(e) && !e.some(vs);
}
const TD = R.toFlatObject(R, {}, null, function(e) {
  return /^is[A-Z]/.test(e);
});
function AD(e) {
  return e && R.isFunction(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator];
}
function Ri(e, t, r) {
  if (!R.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new (jD || FormData)(), r = R.toFlatObject(r, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(h, m) {
    return !R.isUndefined(m[h]);
  });
  const n = r.metaTokens, o = r.visitor || l, i = r.dots, a = r.indexes, s = (r.Blob || typeof Blob < "u" && Blob) && AD(t);
  if (!R.isFunction(o))
    throw new TypeError("visitor must be a function");
  function u(h) {
    if (h === null)
      return "";
    if (R.isDate(h))
      return h.toISOString();
    if (!s && R.isBlob(h))
      throw new W("Blob is not supported. Use a Buffer instead.");
    return R.isArrayBuffer(h) || R.isTypedArray(h) ? s && typeof Blob == "function" ? new Blob([h]) : Buffer.from(h) : h;
  }
  function l(h, m, y) {
    let _ = h;
    if (h && !y && typeof h == "object") {
      if (R.endsWith(m, "{}"))
        m = n ? m : m.slice(0, -2), h = JSON.stringify(h);
      else if (R.isArray(h) && PD(h) || R.isFileList(h) || R.endsWith(m, "[]") && (_ = R.toArray(h)))
        return m = Kh(m), _.forEach(function(j, L) {
          !(R.isUndefined(j) || j === null) && t.append(
            a === !0 ? Af([m], L, i) : a === null ? m : m + "[]",
            u(j)
          );
        }), !1;
    }
    return vs(h) ? !0 : (t.append(Af(y, m, i), u(h)), !1);
  }
  const f = [], p = Object.assign(TD, {
    defaultVisitor: l,
    convertValue: u,
    isVisitable: vs
  });
  function d(h, m) {
    if (!R.isUndefined(h)) {
      if (f.indexOf(h) !== -1)
        throw Error("Circular reference detected in " + m.join("."));
      f.push(h), R.forEach(h, function(y, _) {
        (!(R.isUndefined(y) || y === null) && o.call(
          t,
          y,
          R.isString(_) ? _.trim() : _,
          m,
          p
        )) === !0 && d(y, m ? m.concat(_) : [_]);
      }), f.pop();
    }
  }
  if (!R.isObject(e))
    throw new TypeError("data must be an object");
  return d(e), t;
}
function Cf(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(r) {
    return t[r];
  });
}
function $u(e, t) {
  this._pairs = [], e && Ri(e, this, t);
}
const Gh = $u.prototype;
Gh.append = function(e, t) {
  this._pairs.push([e, t]);
};
Gh.toString = function(e) {
  const t = e ? function(r) {
    return e.call(this, r, Cf);
  } : Cf;
  return this._pairs.map(function(r) {
    return t(r[0]) + "=" + t(r[1]);
  }, "").join("&");
};
function CD(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Yh(e, t, r) {
  if (!t)
    return e;
  const n = r && r.encode || CD, o = r && r.serialize;
  let i;
  if (o ? i = o(t, r) : i = R.isURLSearchParams(t) ? t.toString() : new $u(t, r).toString(n), i) {
    const a = e.indexOf("#");
    a !== -1 && (e = e.slice(0, a)), e += (e.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return e;
}
class ND {
  constructor() {
    this.handlers = [];
  }
  use(t, r, n) {
    return this.handlers.push({
      fulfilled: t,
      rejected: r,
      synchronous: n ? n.synchronous : !1,
      runWhen: n ? n.runWhen : null
    }), this.handlers.length - 1;
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    R.forEach(this.handlers, function(r) {
      r !== null && t(r);
    });
  }
}
const Nf = ND, Xh = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, DD = typeof URLSearchParams < "u" ? URLSearchParams : $u, LD = FormData, ID = (() => {
  let e;
  return typeof navigator < "u" && ((e = navigator.product) === "ReactNative" || e === "NativeScript" || e === "NS") ? !1 : typeof window < "u" && typeof document < "u";
})(), FD = (() => typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), Be = {
  isBrowser: !0,
  classes: {
    URLSearchParams: DD,
    FormData: LD,
    Blob
  },
  isStandardBrowserEnv: ID,
  isStandardBrowserWebWorkerEnv: FD,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function kD(e, t) {
  return Ri(e, new Be.classes.URLSearchParams(), Object.assign({
    visitor: function(r, n, o, i) {
      return Be.isNode && R.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function UD(e) {
  return R.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function $D(e) {
  const t = {}, r = Object.keys(e);
  let n;
  const o = r.length;
  let i;
  for (n = 0; n < o; n++)
    i = r[n], t[i] = e[i];
  return t;
}
function Zh(e) {
  function t(r, n, o, i) {
    let a = r[i++];
    const s = Number.isFinite(+a), u = i >= r.length;
    return a = !a && R.isArray(o) ? o.length : a, u ? (R.hasOwnProp(o, a) ? o[a] = [o[a], n] : o[a] = n, !s) : ((!o[a] || !R.isObject(o[a])) && (o[a] = []), t(r, n, o[a], i) && R.isArray(o[a]) && (o[a] = $D(o[a])), !s);
  }
  if (R.isFormData(e) && R.isFunction(e.entries)) {
    const r = {};
    return R.forEachEntry(e, (n, o) => {
      t(UD(n), o, r, 0);
    }), r;
  }
  return null;
}
const BD = {
  "Content-Type": void 0
};
function MD(e, t, r) {
  if (R.isString(e))
    try {
      return (t || JSON.parse)(e), R.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (r || JSON.stringify)(e);
}
const ji = {
  transitional: Xh,
  adapter: ["xhr", "http"],
  transformRequest: [function(e, t) {
    const r = t.getContentType() || "", n = r.indexOf("application/json") > -1, o = R.isObject(e);
    if (o && R.isHTMLForm(e) && (e = new FormData(e)), R.isFormData(e))
      return n && n ? JSON.stringify(Zh(e)) : e;
    if (R.isArrayBuffer(e) || R.isBuffer(e) || R.isStream(e) || R.isFile(e) || R.isBlob(e))
      return e;
    if (R.isArrayBufferView(e))
      return e.buffer;
    if (R.isURLSearchParams(e))
      return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
    let i;
    if (o) {
      if (r.indexOf("application/x-www-form-urlencoded") > -1)
        return kD(e, this.formSerializer).toString();
      if ((i = R.isFileList(e)) || r.indexOf("multipart/form-data") > -1) {
        const a = this.env && this.env.FormData;
        return Ri(
          i ? { "files[]": e } : e,
          a && new a(),
          this.formSerializer
        );
      }
    }
    return o || n ? (t.setContentType("application/json", !1), MD(e)) : e;
  }],
  transformResponse: [function(e) {
    const t = this.transitional || ji.transitional, r = t && t.forcedJSONParsing, n = this.responseType === "json";
    if (e && R.isString(e) && (r && !this.responseType || n)) {
      const o = !(t && t.silentJSONParsing) && n;
      try {
        return JSON.parse(e);
      } catch (i) {
        if (o)
          throw i.name === "SyntaxError" ? W.from(i, W.ERR_BAD_RESPONSE, this, null, this.response) : i;
      }
    }
    return e;
  }],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: Be.classes.FormData,
    Blob: Be.classes.Blob
  },
  validateStatus: function(e) {
    return e >= 200 && e < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*"
    }
  }
};
R.forEach(["delete", "get", "head"], function(e) {
  ji.headers[e] = {};
});
R.forEach(["post", "put", "patch"], function(e) {
  ji.headers[e] = R.merge(BD);
});
const Bu = ji, zD = R.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), VD = (e) => {
  const t = {};
  let r, n, o;
  return e && e.split(`
`).forEach(function(i) {
    o = i.indexOf(":"), r = i.substring(0, o).trim().toLowerCase(), n = i.substring(o + 1).trim(), !(!r || t[r] && zD[r]) && (r === "set-cookie" ? t[r] ? t[r].push(n) : t[r] = [n] : t[r] = t[r] ? t[r] + ", " + n : n);
  }), t;
}, Df = Symbol("internals");
function cn(e) {
  return e && String(e).trim().toLowerCase();
}
function go(e) {
  return e === !1 || e == null ? e : R.isArray(e) ? e.map(go) : String(e);
}
function WD(e) {
  const t = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(e); )
    t[n[1]] = n[2];
  return t;
}
function HD(e) {
  return /^[-_a-zA-Z]+$/.test(e.trim());
}
function Lf(e, t, r, n) {
  if (R.isFunction(n))
    return n.call(this, t, r);
  if (R.isString(t)) {
    if (R.isString(n))
      return t.indexOf(n) !== -1;
    if (R.isRegExp(n))
      return n.test(t);
  }
}
function qD(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, r, n) => r.toUpperCase() + n);
}
function JD(e, t) {
  const r = R.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(e, n + r, {
      value: function(o, i, a) {
        return this[n].call(this, t, o, i, a);
      },
      configurable: !0
    });
  });
}
let Pi = class {
  constructor(e) {
    e && this.set(e);
  }
  set(e, t, r) {
    const n = this;
    function o(a, s, u) {
      const l = cn(s);
      if (!l)
        throw new Error("header name must be a non-empty string");
      const f = R.findKey(n, l);
      (!f || n[f] === void 0 || u === !0 || u === void 0 && n[f] !== !1) && (n[f || s] = go(a));
    }
    const i = (a, s) => R.forEach(a, (u, l) => o(u, l, s));
    return R.isPlainObject(e) || e instanceof this.constructor ? i(e, t) : R.isString(e) && (e = e.trim()) && !HD(e) ? i(VD(e), t) : e != null && o(t, e, r), this;
  }
  get(e, t) {
    if (e = cn(e), e) {
      const r = R.findKey(this, e);
      if (r) {
        const n = this[r];
        if (!t)
          return n;
        if (t === !0)
          return WD(n);
        if (R.isFunction(t))
          return t.call(this, n, r);
        if (R.isRegExp(t))
          return t.exec(n);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, t) {
    if (e = cn(e), e) {
      const r = R.findKey(this, e);
      return !!(r && (!t || Lf(this, this[r], r, t)));
    }
    return !1;
  }
  delete(e, t) {
    const r = this;
    let n = !1;
    function o(i) {
      if (i = cn(i), i) {
        const a = R.findKey(r, i);
        a && (!t || Lf(r, r[a], a, t)) && (delete r[a], n = !0);
      }
    }
    return R.isArray(e) ? e.forEach(o) : o(e), n;
  }
  clear() {
    return Object.keys(this).forEach(this.delete.bind(this));
  }
  normalize(e) {
    const t = this, r = {};
    return R.forEach(this, (n, o) => {
      const i = R.findKey(r, o);
      if (i) {
        t[i] = go(n), delete t[o];
        return;
      }
      const a = e ? qD(o) : String(o).trim();
      a !== o && delete t[o], t[a] = go(n), r[a] = !0;
    }), this;
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    const t = /* @__PURE__ */ Object.create(null);
    return R.forEach(this, (r, n) => {
      r != null && r !== !1 && (t[n] = e && R.isArray(r) ? r.join(", ") : r);
    }), t;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([e, t]) => e + ": " + t).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(e) {
    return e instanceof this ? e : new this(e);
  }
  static concat(e, ...t) {
    const r = new this(e);
    return t.forEach((n) => r.set(n)), r;
  }
  static accessor(e) {
    const t = (this[Df] = this[Df] = {
      accessors: {}
    }).accessors, r = this.prototype;
    function n(o) {
      const i = cn(o);
      t[i] || (JD(r, o), t[i] = !0);
    }
    return R.isArray(e) ? e.forEach(n) : n(e), this;
  }
};
Pi.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent"]);
R.freezeMethods(Pi.prototype);
R.freezeMethods(Pi);
const Ze = Pi;
function aa(e, t) {
  const r = this || Bu, n = t || r, o = Ze.from(n.headers);
  let i = n.data;
  return R.forEach(e, function(a) {
    i = a.call(r, i, o.normalize(), t ? t.status : void 0);
  }), o.normalize(), i;
}
function Qh(e) {
  return !!(e && e.__CANCEL__);
}
function Jn(e, t, r) {
  W.call(this, e ?? "canceled", W.ERR_CANCELED, t, r), this.name = "CanceledError";
}
R.inherits(Jn, W, {
  __CANCEL__: !0
});
const KD = null;
function GD(e, t, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? e(r) : t(new W(
    "Request failed with status code " + r.status,
    [W.ERR_BAD_REQUEST, W.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
    r.config,
    r.request,
    r
  ));
}
const YD = Be.isStandardBrowserEnv ? function() {
  return {
    write: function(e, t, r, n, o, i) {
      const a = [];
      a.push(e + "=" + encodeURIComponent(t)), R.isNumber(r) && a.push("expires=" + new Date(r).toGMTString()), R.isString(n) && a.push("path=" + n), R.isString(o) && a.push("domain=" + o), i === !0 && a.push("secure"), document.cookie = a.join("; ");
    },
    read: function(e) {
      const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
      return t ? decodeURIComponent(t[3]) : null;
    },
    remove: function(e) {
      this.write(e, "", Date.now() - 864e5);
    }
  };
}() : function() {
  return {
    write: function() {
    },
    read: function() {
      return null;
    },
    remove: function() {
    }
  };
}();
function XD(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function ZD(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function ev(e, t) {
  return e && !XD(t) ? ZD(e, t) : t;
}
const QD = Be.isStandardBrowserEnv ? function() {
  const e = /(msie|trident)/i.test(navigator.userAgent), t = document.createElement("a");
  let r;
  function n(o) {
    let i = o;
    return e && (t.setAttribute("href", i), i = t.href), t.setAttribute("href", i), {
      href: t.href,
      protocol: t.protocol ? t.protocol.replace(/:$/, "") : "",
      host: t.host,
      search: t.search ? t.search.replace(/^\?/, "") : "",
      hash: t.hash ? t.hash.replace(/^#/, "") : "",
      hostname: t.hostname,
      port: t.port,
      pathname: t.pathname.charAt(0) === "/" ? t.pathname : "/" + t.pathname
    };
  }
  return r = n(window.location.href), function(o) {
    const i = R.isString(o) ? n(o) : o;
    return i.protocol === r.protocol && i.host === r.host;
  };
}() : function() {
  return function() {
    return !0;
  };
}();
function eL(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function tL(e, t) {
  e = e || 10;
  const r = new Array(e), n = new Array(e);
  let o = 0, i = 0, a;
  return t = t !== void 0 ? t : 1e3, function(s) {
    const u = Date.now(), l = n[i];
    a || (a = u), r[o] = s, n[o] = u;
    let f = i, p = 0;
    for (; f !== o; )
      p += r[f++], f = f % e;
    if (o = (o + 1) % e, o === i && (i = (i + 1) % e), u - a < t)
      return;
    const d = l && u - l;
    return d ? Math.round(p * 1e3 / d) : void 0;
  };
}
function If(e, t) {
  let r = 0;
  const n = tL(50, 250);
  return (o) => {
    const i = o.loaded, a = o.lengthComputable ? o.total : void 0, s = i - r, u = n(s), l = i <= a;
    r = i;
    const f = {
      loaded: i,
      total: a,
      progress: a ? i / a : void 0,
      bytes: s,
      rate: u || void 0,
      estimated: u && a && l ? (a - i) / u : void 0,
      event: o
    };
    f[t ? "download" : "upload"] = !0, e(f);
  };
}
const rL = typeof XMLHttpRequest < "u", nL = rL && function(e) {
  return new Promise(function(t, r) {
    let n = e.data;
    const o = Ze.from(e.headers).normalize(), i = e.responseType;
    let a;
    function s() {
      e.cancelToken && e.cancelToken.unsubscribe(a), e.signal && e.signal.removeEventListener("abort", a);
    }
    R.isFormData(n) && (Be.isStandardBrowserEnv || Be.isStandardBrowserWebWorkerEnv) && o.setContentType(!1);
    let u = new XMLHttpRequest();
    if (e.auth) {
      const d = e.auth.username || "", h = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
      o.set("Authorization", "Basic " + btoa(d + ":" + h));
    }
    const l = ev(e.baseURL, e.url);
    u.open(e.method.toUpperCase(), Yh(l, e.params, e.paramsSerializer), !0), u.timeout = e.timeout;
    function f() {
      if (!u)
        return;
      const d = Ze.from(
        "getAllResponseHeaders" in u && u.getAllResponseHeaders()
      ), h = {
        data: !i || i === "text" || i === "json" ? u.responseText : u.response,
        status: u.status,
        statusText: u.statusText,
        headers: d,
        config: e,
        request: u
      };
      GD(function(m) {
        t(m), s();
      }, function(m) {
        r(m), s();
      }, h), u = null;
    }
    if ("onloadend" in u ? u.onloadend = f : u.onreadystatechange = function() {
      !u || u.readyState !== 4 || u.status === 0 && !(u.responseURL && u.responseURL.indexOf("file:") === 0) || setTimeout(f);
    }, u.onabort = function() {
      u && (r(new W("Request aborted", W.ECONNABORTED, e, u)), u = null);
    }, u.onerror = function() {
      r(new W("Network Error", W.ERR_NETWORK, e, u)), u = null;
    }, u.ontimeout = function() {
      let d = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
      const h = e.transitional || Xh;
      e.timeoutErrorMessage && (d = e.timeoutErrorMessage), r(new W(
        d,
        h.clarifyTimeoutError ? W.ETIMEDOUT : W.ECONNABORTED,
        e,
        u
      )), u = null;
    }, Be.isStandardBrowserEnv) {
      const d = (e.withCredentials || QD(l)) && e.xsrfCookieName && YD.read(e.xsrfCookieName);
      d && o.set(e.xsrfHeaderName, d);
    }
    n === void 0 && o.setContentType(null), "setRequestHeader" in u && R.forEach(o.toJSON(), function(d, h) {
      u.setRequestHeader(h, d);
    }), R.isUndefined(e.withCredentials) || (u.withCredentials = !!e.withCredentials), i && i !== "json" && (u.responseType = e.responseType), typeof e.onDownloadProgress == "function" && u.addEventListener("progress", If(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && u.upload && u.upload.addEventListener("progress", If(e.onUploadProgress)), (e.cancelToken || e.signal) && (a = (d) => {
      u && (r(!d || d.type ? new Jn(null, e, u) : d), u.abort(), u = null);
    }, e.cancelToken && e.cancelToken.subscribe(a), e.signal && (e.signal.aborted ? a() : e.signal.addEventListener("abort", a)));
    const p = eL(l);
    if (p && Be.protocols.indexOf(p) === -1) {
      r(new W("Unsupported protocol " + p + ":", W.ERR_BAD_REQUEST, e));
      return;
    }
    u.send(n || null);
  });
}, bo = {
  http: KD,
  xhr: nL
};
R.forEach(bo, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const oL = {
  getAdapter: (e) => {
    e = R.isArray(e) ? e : [e];
    const { length: t } = e;
    let r, n;
    for (let o = 0; o < t && (r = e[o], !(n = R.isString(r) ? bo[r.toLowerCase()] : r)); o++)
      ;
    if (!n)
      throw n === !1 ? new W(
        `Adapter ${r} is not supported by the environment`,
        "ERR_NOT_SUPPORT"
      ) : new Error(
        R.hasOwnProp(bo, r) ? `Adapter '${r}' is not available in the build` : `Unknown adapter '${r}'`
      );
    if (!R.isFunction(n))
      throw new TypeError("adapter is not a function");
    return n;
  },
  adapters: bo
};
function sa(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Jn(null, e);
}
function Ff(e) {
  return sa(e), e.headers = Ze.from(e.headers), e.data = aa.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), oL.getAdapter(e.adapter || Bu.adapter)(e).then(function(t) {
    return sa(e), t.data = aa.call(
      e,
      e.transformResponse,
      t
    ), t.headers = Ze.from(t.headers), t;
  }, function(t) {
    return Qh(t) || (sa(e), t && t.response && (t.response.data = aa.call(
      e,
      e.transformResponse,
      t.response
    ), t.response.headers = Ze.from(t.response.headers))), Promise.reject(t);
  });
}
const kf = (e) => e instanceof Ze ? e.toJSON() : e;
function Rr(e, t) {
  t = t || {};
  const r = {};
  function n(l, f, p) {
    return R.isPlainObject(l) && R.isPlainObject(f) ? R.merge.call({ caseless: p }, l, f) : R.isPlainObject(f) ? R.merge({}, f) : R.isArray(f) ? f.slice() : f;
  }
  function o(l, f, p) {
    if (R.isUndefined(f)) {
      if (!R.isUndefined(l))
        return n(void 0, l, p);
    } else
      return n(l, f, p);
  }
  function i(l, f) {
    if (!R.isUndefined(f))
      return n(void 0, f);
  }
  function a(l, f) {
    if (R.isUndefined(f)) {
      if (!R.isUndefined(l))
        return n(void 0, l);
    } else
      return n(void 0, f);
  }
  function s(l, f, p) {
    if (p in t)
      return n(l, f);
    if (p in e)
      return n(void 0, l);
  }
  const u = {
    url: i,
    method: i,
    data: i,
    baseURL: a,
    transformRequest: a,
    transformResponse: a,
    paramsSerializer: a,
    timeout: a,
    timeoutMessage: a,
    withCredentials: a,
    adapter: a,
    responseType: a,
    xsrfCookieName: a,
    xsrfHeaderName: a,
    onUploadProgress: a,
    onDownloadProgress: a,
    decompress: a,
    maxContentLength: a,
    maxBodyLength: a,
    beforeRedirect: a,
    transport: a,
    httpAgent: a,
    httpsAgent: a,
    cancelToken: a,
    socketPath: a,
    responseEncoding: a,
    validateStatus: s,
    headers: (l, f) => o(kf(l), kf(f), !0)
  };
  return R.forEach(Object.keys(e).concat(Object.keys(t)), function(l) {
    const f = u[l] || o, p = f(e[l], t[l], l);
    R.isUndefined(p) && f !== s || (r[l] = p);
  }), r;
}
const tv = "1.2.1", Mu = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  Mu[e] = function(r) {
    return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Uf = {};
Mu.transitional = function(e, t, r) {
  function n(o, i) {
    return "[Axios v" + tv + "] Transitional option '" + o + "'" + i + (r ? ". " + r : "");
  }
  return (o, i, a) => {
    if (e === !1)
      throw new W(
        n(i, " has been removed" + (t ? " in " + t : "")),
        W.ERR_DEPRECATED
      );
    return t && !Uf[i] && (Uf[i] = !0, console.warn(
      n(
        i,
        " has been deprecated since v" + t + " and will be removed in the near future"
      )
    )), e ? e(o, i, a) : !0;
  };
};
function iL(e, t, r) {
  if (typeof e != "object")
    throw new W("options must be an object", W.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(e);
  let o = n.length;
  for (; o-- > 0; ) {
    const i = n[o], a = t[i];
    if (a) {
      const s = e[i], u = s === void 0 || a(s, i, e);
      if (u !== !0)
        throw new W("option " + i + " must be " + u, W.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0)
      throw new W("Unknown option " + i, W.ERR_BAD_OPTION);
  }
}
const ms = {
  assertOptions: iL,
  validators: Mu
}, Lt = ms.validators;
let Ho = class {
  constructor(e) {
    this.defaults = e, this.interceptors = {
      request: new Nf(),
      response: new Nf()
    };
  }
  request(e, t) {
    typeof e == "string" ? (t = t || {}, t.url = e) : t = e || {}, t = Rr(this.defaults, t);
    const { transitional: r, paramsSerializer: n, headers: o } = t;
    r !== void 0 && ms.assertOptions(r, {
      silentJSONParsing: Lt.transitional(Lt.boolean),
      forcedJSONParsing: Lt.transitional(Lt.boolean),
      clarifyTimeoutError: Lt.transitional(Lt.boolean)
    }, !1), n !== void 0 && ms.assertOptions(n, {
      encode: Lt.function,
      serialize: Lt.function
    }, !0), t.method = (t.method || this.defaults.method || "get").toLowerCase();
    let i;
    i = o && R.merge(
      o.common,
      o[t.method]
    ), i && R.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (h) => {
        delete o[h];
      }
    ), t.headers = Ze.concat(i, o);
    const a = [];
    let s = !0;
    this.interceptors.request.forEach(function(h) {
      typeof h.runWhen == "function" && h.runWhen(t) === !1 || (s = s && h.synchronous, a.unshift(h.fulfilled, h.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function(h) {
      u.push(h.fulfilled, h.rejected);
    });
    let l, f = 0, p;
    if (!s) {
      const h = [Ff.bind(this), void 0];
      for (h.unshift.apply(h, a), h.push.apply(h, u), p = h.length, l = Promise.resolve(t); f < p; )
        l = l.then(h[f++], h[f++]);
      return l;
    }
    p = a.length;
    let d = t;
    for (f = 0; f < p; ) {
      const h = a[f++], m = a[f++];
      try {
        d = h(d);
      } catch (y) {
        m.call(this, y);
        break;
      }
    }
    try {
      l = Ff.call(this, d);
    } catch (h) {
      return Promise.reject(h);
    }
    for (f = 0, p = u.length; f < p; )
      l = l.then(u[f++], u[f++]);
    return l;
  }
  getUri(e) {
    e = Rr(this.defaults, e);
    const t = ev(e.baseURL, e.url);
    return Yh(t, e.params, e.paramsSerializer);
  }
};
R.forEach(["delete", "get", "head", "options"], function(e) {
  Ho.prototype[e] = function(t, r) {
    return this.request(Rr(r || {}, {
      method: e,
      url: t,
      data: (r || {}).data
    }));
  };
});
R.forEach(["post", "put", "patch"], function(e) {
  function t(r) {
    return function(n, o, i) {
      return this.request(Rr(i || {}, {
        method: e,
        headers: r ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: n,
        data: o
      }));
    };
  }
  Ho.prototype[e] = t(), Ho.prototype[e + "Form"] = t(!0);
});
const wo = Ho;
let rv = class {
  constructor(e) {
    if (typeof e != "function")
      throw new TypeError("executor must be a function.");
    let t;
    this.promise = new Promise(function(n) {
      t = n;
    });
    const r = this;
    this.promise.then((n) => {
      if (!r._listeners)
        return;
      let o = r._listeners.length;
      for (; o-- > 0; )
        r._listeners[o](n);
      r._listeners = null;
    }), this.promise.then = (n) => {
      let o;
      const i = new Promise((a) => {
        r.subscribe(a), o = a;
      }).then(n);
      return i.cancel = function() {
        r.unsubscribe(o);
      }, i;
    }, e(function(n, o, i) {
      r.reason || (r.reason = new Jn(n, o, i), t(r.reason));
    });
  }
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  subscribe(e) {
    if (this.reason) {
      e(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(e) : this._listeners = [e];
  }
  unsubscribe(e) {
    if (!this._listeners)
      return;
    const t = this._listeners.indexOf(e);
    t !== -1 && this._listeners.splice(t, 1);
  }
  static source() {
    let e;
    return {
      token: new rv(function(t) {
        e = t;
      }),
      cancel: e
    };
  }
};
const aL = rv;
function sL(e) {
  return function(t) {
    return e.apply(null, t);
  };
}
function uL(e) {
  return R.isObject(e) && e.isAxiosError === !0;
}
function nv(e) {
  const t = new wo(e), r = Uh(wo.prototype.request, t);
  return R.extend(r, wo.prototype, t, { allOwnKeys: !0 }), R.extend(r, t, null, { allOwnKeys: !0 }), r.create = function(n) {
    return nv(Rr(e, n));
  }, r;
}
const ce = nv(Bu);
ce.Axios = wo;
ce.CanceledError = Jn;
ce.CancelToken = aL;
ce.isCancel = Qh;
ce.VERSION = tv;
ce.toFormData = Ri;
ce.AxiosError = W;
ce.Cancel = ce.CanceledError;
ce.all = function(e) {
  return Promise.all(e);
};
ce.spread = sL;
ce.isAxiosError = uL;
ce.mergeConfig = Rr;
ce.AxiosHeaders = Ze;
ce.formToJSON = (e) => Zh(R.isHTMLForm(e) ? new FormData(e) : e);
ce.default = ce;
const cL = ce;
var ys = function(e, t) {
  return ys = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
    r.__proto__ = n;
  } || function(r, n) {
    for (var o in n)
      Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
  }, ys(e, t);
};
function Ti(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  ys(e, t);
  function r() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
}
function gs(e) {
  var t = typeof Symbol == "function" && Symbol.iterator, r = t && e[t], n = 0;
  if (r)
    return r.call(e);
  if (e && typeof e.length == "number")
    return {
      next: function() {
        return e && n >= e.length && (e = void 0), { value: e && e[n++], done: !e };
      }
    };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function bs(e, t) {
  var r = typeof Symbol == "function" && e[Symbol.iterator];
  if (!r)
    return e;
  var n = r.call(e), o, i = [], a;
  try {
    for (; (t === void 0 || t-- > 0) && !(o = n.next()).done; )
      i.push(o.value);
  } catch (s) {
    a = { error: s };
  } finally {
    try {
      o && !o.done && (r = n.return) && r.call(n);
    } finally {
      if (a)
        throw a.error;
    }
  }
  return i;
}
function ws(e, t, r) {
  if (r || arguments.length === 2)
    for (var n = 0, o = t.length, i; n < o; n++)
      (i || !(n in t)) && (i || (i = Array.prototype.slice.call(t, 0, n)), i[n] = t[n]);
  return e.concat(i || Array.prototype.slice.call(t));
}
function Qe(e) {
  return typeof e == "function";
}
function zu(e) {
  var t = function(n) {
    Error.call(n), n.stack = new Error().stack;
  }, r = e(t);
  return r.prototype = Object.create(Error.prototype), r.prototype.constructor = r, r;
}
var ua = zu(function(e) {
  return function(t) {
    e(this), this.message = t ? t.length + ` errors occurred during unsubscription:
` + t.map(function(r, n) {
      return n + 1 + ") " + r.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = t;
  };
});
function Es(e, t) {
  if (e) {
    var r = e.indexOf(t);
    0 <= r && e.splice(r, 1);
  }
}
var Ai = function() {
  function e(t) {
    this.initialTeardown = t, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return e.prototype.unsubscribe = function() {
    var t, r, n, o, i;
    if (!this.closed) {
      this.closed = !0;
      var a = this._parentage;
      if (a)
        if (this._parentage = null, Array.isArray(a))
          try {
            for (var s = gs(a), u = s.next(); !u.done; u = s.next()) {
              var l = u.value;
              l.remove(this);
            }
          } catch (y) {
            t = { error: y };
          } finally {
            try {
              u && !u.done && (r = s.return) && r.call(s);
            } finally {
              if (t)
                throw t.error;
            }
          }
        else
          a.remove(this);
      var f = this.initialTeardown;
      if (Qe(f))
        try {
          f();
        } catch (y) {
          i = y instanceof ua ? y.errors : [y];
        }
      var p = this._finalizers;
      if (p) {
        this._finalizers = null;
        try {
          for (var d = gs(p), h = d.next(); !h.done; h = d.next()) {
            var m = h.value;
            try {
              $f(m);
            } catch (y) {
              i = i ?? [], y instanceof ua ? i = ws(ws([], bs(i)), bs(y.errors)) : i.push(y);
            }
          }
        } catch (y) {
          n = { error: y };
        } finally {
          try {
            h && !h.done && (o = d.return) && o.call(d);
          } finally {
            if (n)
              throw n.error;
          }
        }
      }
      if (i)
        throw new ua(i);
    }
  }, e.prototype.add = function(t) {
    var r;
    if (t && t !== this)
      if (this.closed)
        $f(t);
      else {
        if (t instanceof e) {
          if (t.closed || t._hasParent(this))
            return;
          t._addParent(this);
        }
        (this._finalizers = (r = this._finalizers) !== null && r !== void 0 ? r : []).push(t);
      }
  }, e.prototype._hasParent = function(t) {
    var r = this._parentage;
    return r === t || Array.isArray(r) && r.includes(t);
  }, e.prototype._addParent = function(t) {
    var r = this._parentage;
    this._parentage = Array.isArray(r) ? (r.push(t), r) : r ? [r, t] : t;
  }, e.prototype._removeParent = function(t) {
    var r = this._parentage;
    r === t ? this._parentage = null : Array.isArray(r) && Es(r, t);
  }, e.prototype.remove = function(t) {
    var r = this._finalizers;
    r && Es(r, t), t instanceof e && t._removeParent(this);
  }, e.EMPTY = function() {
    var t = new e();
    return t.closed = !0, t;
  }(), e;
}(), ov = Ai.EMPTY;
function iv(e) {
  return e instanceof Ai || e && "closed" in e && Qe(e.remove) && Qe(e.add) && Qe(e.unsubscribe);
}
function $f(e) {
  Qe(e) ? e() : e.unsubscribe();
}
var av = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1
}, lL = {
  setTimeout: function(e, t) {
    for (var r = [], n = 2; n < arguments.length; n++)
      r[n - 2] = arguments[n];
    return setTimeout.apply(void 0, ws([e, t], bs(r)));
  },
  clearTimeout: function(e) {
    return clearTimeout(e);
  },
  delegate: void 0
};
function fL(e) {
  lL.setTimeout(function() {
    throw e;
  });
}
function Bf() {
}
function Eo(e) {
  e();
}
var sv = function(e) {
  Ti(t, e);
  function t(r) {
    var n = e.call(this) || this;
    return n.isStopped = !1, r ? (n.destination = r, iv(r) && r.add(n)) : n.destination = vL, n;
  }
  return t.create = function(r, n, o) {
    return new _s(r, n, o);
  }, t.prototype.next = function(r) {
    this.isStopped || this._next(r);
  }, t.prototype.error = function(r) {
    this.isStopped || (this.isStopped = !0, this._error(r));
  }, t.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, t.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, e.prototype.unsubscribe.call(this), this.destination = null);
  }, t.prototype._next = function(r) {
    this.destination.next(r);
  }, t.prototype._error = function(r) {
    try {
      this.destination.error(r);
    } finally {
      this.unsubscribe();
    }
  }, t.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, t;
}(Ai), pL = Function.prototype.bind;
function ca(e, t) {
  return pL.call(e, t);
}
var dL = function() {
  function e(t) {
    this.partialObserver = t;
  }
  return e.prototype.next = function(t) {
    var r = this.partialObserver;
    if (r.next)
      try {
        r.next(t);
      } catch (n) {
        eo(n);
      }
  }, e.prototype.error = function(t) {
    var r = this.partialObserver;
    if (r.error)
      try {
        r.error(t);
      } catch (n) {
        eo(n);
      }
    else
      eo(t);
  }, e.prototype.complete = function() {
    var t = this.partialObserver;
    if (t.complete)
      try {
        t.complete();
      } catch (r) {
        eo(r);
      }
  }, e;
}(), _s = function(e) {
  Ti(t, e);
  function t(r, n, o) {
    var i = e.call(this) || this, a;
    if (Qe(r) || !r)
      a = {
        next: r ?? void 0,
        error: n ?? void 0,
        complete: o ?? void 0
      };
    else {
      var s;
      i && av.useDeprecatedNextContext ? (s = Object.create(r), s.unsubscribe = function() {
        return i.unsubscribe();
      }, a = {
        next: r.next && ca(r.next, s),
        error: r.error && ca(r.error, s),
        complete: r.complete && ca(r.complete, s)
      }) : a = r;
    }
    return i.destination = new dL(a), i;
  }
  return t;
}(sv);
function eo(e) {
  fL(e);
}
function hL(e) {
  throw e;
}
var vL = {
  closed: !0,
  next: Bf,
  error: hL,
  complete: Bf
}, mL = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function yL(e) {
  return e;
}
function gL(e) {
  return e.length === 0 ? yL : e.length === 1 ? e[0] : function(t) {
    return e.reduce(function(r, n) {
      return n(r);
    }, t);
  };
}
var Os = function() {
  function e(t) {
    t && (this._subscribe = t);
  }
  return e.prototype.lift = function(t) {
    var r = new e();
    return r.source = this, r.operator = t, r;
  }, e.prototype.subscribe = function(t, r, n) {
    var o = this, i = wL(t) ? t : new _s(t, r, n);
    return Eo(function() {
      var a = o, s = a.operator, u = a.source;
      i.add(s ? s.call(i, u) : u ? o._subscribe(i) : o._trySubscribe(i));
    }), i;
  }, e.prototype._trySubscribe = function(t) {
    try {
      return this._subscribe(t);
    } catch (r) {
      t.error(r);
    }
  }, e.prototype.forEach = function(t, r) {
    var n = this;
    return r = Mf(r), new r(function(o, i) {
      var a = new _s({
        next: function(s) {
          try {
            t(s);
          } catch (u) {
            i(u), a.unsubscribe();
          }
        },
        error: i,
        complete: o
      });
      n.subscribe(a);
    });
  }, e.prototype._subscribe = function(t) {
    var r;
    return (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(t);
  }, e.prototype[mL] = function() {
    return this;
  }, e.prototype.pipe = function() {
    for (var t = [], r = 0; r < arguments.length; r++)
      t[r] = arguments[r];
    return gL(t)(this);
  }, e.prototype.toPromise = function(t) {
    var r = this;
    return t = Mf(t), new t(function(n, o) {
      var i;
      r.subscribe(function(a) {
        return i = a;
      }, function(a) {
        return o(a);
      }, function() {
        return n(i);
      });
    });
  }, e.create = function(t) {
    return new e(t);
  }, e;
}();
function Mf(e) {
  var t;
  return (t = e ?? av.Promise) !== null && t !== void 0 ? t : Promise;
}
function bL(e) {
  return e && Qe(e.next) && Qe(e.error) && Qe(e.complete);
}
function wL(e) {
  return e && e instanceof sv || bL(e) && iv(e);
}
var EL = zu(function(e) {
  return function() {
    e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), _L = function(e) {
  Ti(t, e);
  function t() {
    var r = e.call(this) || this;
    return r.closed = !1, r.currentObservers = null, r.observers = [], r.isStopped = !1, r.hasError = !1, r.thrownError = null, r;
  }
  return t.prototype.lift = function(r) {
    var n = new zf(this, this);
    return n.operator = r, n;
  }, t.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new EL();
  }, t.prototype.next = function(r) {
    var n = this;
    Eo(function() {
      var o, i;
      if (n._throwIfClosed(), !n.isStopped) {
        n.currentObservers || (n.currentObservers = Array.from(n.observers));
        try {
          for (var a = gs(n.currentObservers), s = a.next(); !s.done; s = a.next()) {
            var u = s.value;
            u.next(r);
          }
        } catch (l) {
          o = { error: l };
        } finally {
          try {
            s && !s.done && (i = a.return) && i.call(a);
          } finally {
            if (o)
              throw o.error;
          }
        }
      }
    });
  }, t.prototype.error = function(r) {
    var n = this;
    Eo(function() {
      if (n._throwIfClosed(), !n.isStopped) {
        n.hasError = n.isStopped = !0, n.thrownError = r;
        for (var o = n.observers; o.length; )
          o.shift().error(r);
      }
    });
  }, t.prototype.complete = function() {
    var r = this;
    Eo(function() {
      if (r._throwIfClosed(), !r.isStopped) {
        r.isStopped = !0;
        for (var n = r.observers; n.length; )
          n.shift().complete();
      }
    });
  }, t.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(t.prototype, "observed", {
    get: function() {
      var r;
      return ((r = this.observers) === null || r === void 0 ? void 0 : r.length) > 0;
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype._trySubscribe = function(r) {
    return this._throwIfClosed(), e.prototype._trySubscribe.call(this, r);
  }, t.prototype._subscribe = function(r) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(r), this._innerSubscribe(r);
  }, t.prototype._innerSubscribe = function(r) {
    var n = this, o = this, i = o.hasError, a = o.isStopped, s = o.observers;
    return i || a ? ov : (this.currentObservers = null, s.push(r), new Ai(function() {
      n.currentObservers = null, Es(s, r);
    }));
  }, t.prototype._checkFinalizedStatuses = function(r) {
    var n = this, o = n.hasError, i = n.thrownError, a = n.isStopped;
    o ? r.error(i) : a && r.complete();
  }, t.prototype.asObservable = function() {
    var r = new Os();
    return r.source = this, r;
  }, t.create = function(r, n) {
    return new zf(r, n);
  }, t;
}(Os), zf = function(e) {
  Ti(t, e);
  function t(r, n) {
    var o = e.call(this) || this;
    return o.destination = r, o.source = n, o;
  }
  return t.prototype.next = function(r) {
    var n, o;
    (o = (n = this.destination) === null || n === void 0 ? void 0 : n.next) === null || o === void 0 || o.call(n, r);
  }, t.prototype.error = function(r) {
    var n, o;
    (o = (n = this.destination) === null || n === void 0 ? void 0 : n.error) === null || o === void 0 || o.call(n, r);
  }, t.prototype.complete = function() {
    var r, n;
    (n = (r = this.destination) === null || r === void 0 ? void 0 : r.complete) === null || n === void 0 || n.call(r);
  }, t.prototype._subscribe = function(r) {
    var n, o;
    return (o = (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(r)) !== null && o !== void 0 ? o : ov;
  }, t;
}(_L);
zu(function(e) {
  return function() {
    e(this), this.name = "EmptyError", this.message = "no elements in sequence";
  };
});
class Vu {
  constructor(t) {
    he(this, "config"), he(this, "axios"), t && (this.config = t), this.axios = cL.create(this.config);
  }
  get interceptors() {
    return this.axios.interceptors;
  }
  static create(t) {
    return new Vu(t);
  }
  request(t) {
    return new Os((r) => {
      const n = new AbortController();
      let o, i;
      return t.uploadProgressSubscriber && (o = (a) => {
        t.uploadProgressSubscriber && t.uploadProgressSubscriber.next(a);
      }), t.downloadProgressSubscriber && (i = (a) => {
        t.downloadProgressSubscriber && t.downloadProgressSubscriber.next(a);
      }), this.axios.request({
        ...t,
        onUploadProgress: o,
        onDownloadProgress: i,
        signal: n.signal
      }).then((a) => {
        r.next(a), r.complete(), t.uploadProgressSubscriber && t.uploadProgressSubscriber.complete(), t.downloadProgressSubscriber && t.downloadProgressSubscriber.complete();
      }).catch((a) => {
        r.error(a), t.uploadProgressSubscriber && t.uploadProgressSubscriber.error(a);
      }), () => {
        n.abort();
      };
    });
  }
  get(t, r) {
    return this.request({
      url: t,
      method: "GET",
      ...r
    });
  }
  delete(t, r) {
    return this.request({
      url: t,
      method: "DELETE",
      ...r
    });
  }
  post(t, r, n) {
    return this.request({
      url: t,
      data: r,
      method: "POST",
      ...n
    });
  }
  put(t, r, n) {
    return this.request({
      url: t,
      data: r,
      method: "PUT",
      ...n
    });
  }
  patch(t, r, n) {
    return this.request({
      url: t,
      data: r,
      method: "PATCH",
      ...n
    });
  }
}
function OL(e) {
  return Vu.create({
    baseURL: e
  });
}
const ae = class {
  constructor(e, t) {
    he(this, "axiosInstance"), he(this, "defaultConfig", {
      contentType: "json",
      cache: !1
    }), he(this, "tokenType"), this.axiosInstance = OL(e), this.setupInterceptor(), t && (this.defaultConfig = {
      ...this.defaultConfig,
      ...t
    });
  }
  static setAuthorizationTokenType(e) {
    ae.tokenType = e;
  }
  static setGlobalParams(e) {
    ae.globalParams = {
      ...ae.globalParams,
      ...e
    };
  }
  static setGlobalData(e) {
    ae.globalData = {
      ...ae.globalData,
      ...e
    };
  }
  static setGlobalHeaders(e) {
    ae.globalHeaders = {
      ...ae.globalHeaders,
      ...e
    };
  }
  static addInterceptor(e) {
    return ae.interceptors.add(e), () => {
      ae.removeInterceptor(e);
    };
  }
  static removeInterceptor(e) {
    ae.interceptors.delete(e);
  }
  setAuthorizationTokenType(e) {
    this.tokenType = e;
  }
  getTokenType(e) {
    return e.tokenType !== void 0 ? e.tokenType : this.tokenType !== void 0 ? this.tokenType : ae.tokenType;
  }
  setupInterceptor() {
    this.axiosInstance.interceptors.request.use(
      async (e) => {
        if (e = await this.useRequestInterceptors(e), e = BN({}, this.defaultConfig, e), e.headers = {
          ...e.headers,
          ...ae.globalHeaders,
          "Content-Type": e.contentType === "formData" ? !1 : e.contentType === "urlEncoded" ? ps.UrlEncoded : ps.Json
        }, !e.preparedData) {
          if ((typeof e.cache < "u" ? e.cache : this.defaultConfig.cache) === !1 && (e.headers["Cache-Control"] = "no-cache", e.params = {
            ...e.params,
            axios_timestamp: Date.now()
          }), e.params = Wo(
            jf({
              ...e.params,
              ...ae.globalParams
            })
          ), e.data = {
            ...e.data,
            ...ae.globalData
          }, jf(e.data), JSON.stringify(e.data) === "{}")
            e.data = void 0;
          else
            switch (e.contentType) {
              case "formData":
                e.data = ds(e.data);
                break;
              case "urlEncoded":
                e.data = Wo(e.data);
            }
          e.preparedData = !0;
        }
        const t = this.getTokenType(e), r = t ? YN.getToken(t) : null;
        return r && (e.headers.Authorization = "Bearer " + r), e;
      },
      (e) => {
        console.log(e);
      }
    ), this.axiosInstance.interceptors.response.use(
      (e) => this.useSuccessResponseInterceptor(e),
      async (e) => {
        const t = await this.useErrorResponseInterceptor(e);
        return t instanceof Error ? Promise.reject(t) : t;
      }
    );
  }
  async useRequestInterceptors(e) {
    for (const t of ae.interceptors)
      t.request && (e = await t.request(e));
    return e;
  }
  async useErrorResponseInterceptor(e) {
    for (const t of ae.interceptors)
      if (t.response && t.response.error)
        try {
          e = await t.response.error(e, this.axiosInstance);
        } catch {
          return e;
        }
    return e;
  }
  async useSuccessResponseInterceptor(e) {
    for (const t of ae.interceptors)
      t.response && t.response.success && (e = await t.response.success(e));
    return e;
  }
  request(e) {
    return this.axiosInstance.request(e);
  }
  post(e, t, r) {
    return this.axiosInstance.post(e, t, r);
  }
  put(e, t, r) {
    return this.axiosInstance.put(e, t, r);
  }
  patch(e, t, r) {
    return this.axiosInstance.patch(e, t, r);
  }
  get(e, t, r) {
    return this.axiosInstance.get(e, {
      ...r,
      params: t
    });
  }
  delete(e, t, r) {
    return this.axiosInstance.delete(e, {
      ...r,
      params: t
    });
  }
};
let ln = ae;
he(ln, "tokenType", "base_token"), he(ln, "globalParams", {}), he(ln, "globalData", {}), he(ln, "globalHeaders", {}), he(ln, "interceptors", /* @__PURE__ */ new Set());
var Tn = {}, SL = {
  get exports() {
    return Tn;
  },
  set exports(e) {
    Tn = e;
  }
}, gr = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var la, Vf;
function uv() {
  if (Vf)
    return la;
  Vf = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, r = Object.prototype.propertyIsEnumerable;
  function n(i) {
    if (i == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(i);
  }
  function o() {
    try {
      if (!Object.assign)
        return !1;
      var i = new String("abc");
      if (i[5] = "de", Object.getOwnPropertyNames(i)[0] === "5")
        return !1;
      for (var a = {}, s = 0; s < 10; s++)
        a["_" + String.fromCharCode(s)] = s;
      var u = Object.getOwnPropertyNames(a).map(function(f) {
        return a[f];
      });
      if (u.join("") !== "0123456789")
        return !1;
      var l = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(f) {
        l[f] = f;
      }), Object.keys(Object.assign({}, l)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return la = o() ? Object.assign : function(i, a) {
    for (var s, u = n(i), l, f = 1; f < arguments.length; f++) {
      s = Object(arguments[f]);
      for (var p in s)
        t.call(s, p) && (u[p] = s[p]);
      if (e) {
        l = e(s);
        for (var d = 0; d < l.length; d++)
          r.call(s, l[d]) && (u[l[d]] = s[l[d]]);
      }
    }
    return u;
  }, la;
}
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Wf;
function xL() {
  if (Wf)
    return gr;
  Wf = 1, uv();
  var e = ye, t = 60103;
  if (gr.Fragment = 60107, typeof Symbol == "function" && Symbol.for) {
    var r = Symbol.for;
    t = r("react.element"), gr.Fragment = r("react.fragment");
  }
  var n = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = Object.prototype.hasOwnProperty, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function a(s, u, l) {
    var f, p = {}, d = null, h = null;
    l !== void 0 && (d = "" + l), u.key !== void 0 && (d = "" + u.key), u.ref !== void 0 && (h = u.ref);
    for (f in u)
      o.call(u, f) && !i.hasOwnProperty(f) && (p[f] = u[f]);
    if (s && s.defaultProps)
      for (f in u = s.defaultProps, u)
        p[f] === void 0 && (p[f] = u[f]);
    return { $$typeof: t, type: s, key: d, ref: h, props: p, _owner: n.current };
  }
  return gr.jsx = a, gr.jsxs = a, gr;
}
var Hf = {};
/** @license React v17.0.2
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qf;
function RL() {
  return qf || (qf = 1, function(e) {
    process.env.NODE_ENV !== "production" && function() {
      var t = ye, r = uv(), n = 60103, o = 60106;
      e.Fragment = 60107;
      var i = 60108, a = 60114, s = 60109, u = 60110, l = 60112, f = 60113, p = 60120, d = 60115, h = 60116, m = 60121, y = 60122, _ = 60117, j = 60129, L = 60131;
      if (typeof Symbol == "function" && Symbol.for) {
        var w = Symbol.for;
        n = w("react.element"), o = w("react.portal"), e.Fragment = w("react.fragment"), i = w("react.strict_mode"), a = w("react.profiler"), s = w("react.provider"), u = w("react.context"), l = w("react.forward_ref"), f = w("react.suspense"), p = w("react.suspense_list"), d = w("react.memo"), h = w("react.lazy"), m = w("react.block"), y = w("react.server.block"), _ = w("react.fundamental"), w("react.scope"), w("react.opaque.id"), j = w("react.debug_trace_mode"), w("react.offscreen"), L = w("react.legacy_hidden");
      }
      var O = typeof Symbol == "function" && Symbol.iterator, D = "@@iterator";
      function N(c) {
        if (c === null || typeof c != "object")
          return null;
        var v = O && c[O] || c[D];
        return typeof v == "function" ? v : null;
      }
      var U = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function I(c) {
        {
          for (var v = arguments.length, g = new Array(v > 1 ? v - 1 : 0), E = 1; E < v; E++)
            g[E - 1] = arguments[E];
          $("error", c, g);
        }
      }
      function $(c, v, g) {
        {
          var E = U.ReactDebugCurrentFrame, A = E.getStackAddendum();
          A !== "" && (v += "%s", g = g.concat([A]));
          var C = g.map(function(T) {
            return "" + T;
          });
          C.unshift("Warning: " + v), Function.prototype.apply.call(console[c], console, C);
        }
      }
      var Z = !1;
      function oe(c) {
        return !!(typeof c == "string" || typeof c == "function" || c === e.Fragment || c === a || c === j || c === i || c === f || c === p || c === L || Z || typeof c == "object" && c !== null && (c.$$typeof === h || c.$$typeof === d || c.$$typeof === s || c.$$typeof === u || c.$$typeof === l || c.$$typeof === _ || c.$$typeof === m || c[0] === y));
      }
      function Lr(c, v, g) {
        var E = v.displayName || v.name || "";
        return c.displayName || (E !== "" ? g + "(" + E + ")" : g);
      }
      function lt(c) {
        return c.displayName || "Context";
      }
      function H(c) {
        if (c == null)
          return null;
        if (typeof c.tag == "number" && I("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue."), typeof c == "function")
          return c.displayName || c.name || null;
        if (typeof c == "string")
          return c;
        switch (c) {
          case e.Fragment:
            return "Fragment";
          case o:
            return "Portal";
          case a:
            return "Profiler";
          case i:
            return "StrictMode";
          case f:
            return "Suspense";
          case p:
            return "SuspenseList";
        }
        if (typeof c == "object")
          switch (c.$$typeof) {
            case u:
              var v = c;
              return lt(v) + ".Consumer";
            case s:
              var g = c;
              return lt(g._context) + ".Provider";
            case l:
              return Lr(c, c.render, "ForwardRef");
            case d:
              return H(c.type);
            case m:
              return H(c._render);
            case h: {
              var E = c, A = E._payload, C = E._init;
              try {
                return H(C(A));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var le = 0, ft, pt, dt, ht, vt, mt, yt;
      function gt() {
      }
      gt.__reactDisabledLog = !0;
      function Ir() {
        {
          if (le === 0) {
            ft = console.log, pt = console.info, dt = console.warn, ht = console.error, vt = console.group, mt = console.groupCollapsed, yt = console.groupEnd;
            var c = {
              configurable: !0,
              enumerable: !0,
              value: gt,
              writable: !0
            };
            Object.defineProperties(console, {
              info: c,
              log: c,
              warn: c,
              error: c,
              group: c,
              groupCollapsed: c,
              groupEnd: c
            });
          }
          le++;
        }
      }
      function Fr() {
        {
          if (le--, le === 0) {
            var c = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: r({}, c, {
                value: ft
              }),
              info: r({}, c, {
                value: pt
              }),
              warn: r({}, c, {
                value: dt
              }),
              error: r({}, c, {
                value: ht
              }),
              group: r({}, c, {
                value: vt
              }),
              groupCollapsed: r({}, c, {
                value: mt
              }),
              groupEnd: r({}, c, {
                value: yt
              })
            });
          }
          le < 0 && I("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var Oe = U.ReactCurrentDispatcher, Se;
      function ge(c, v, g) {
        {
          if (Se === void 0)
            try {
              throw Error();
            } catch (A) {
              var E = A.stack.trim().match(/\n( *(at )?)/);
              Se = E && E[1] || "";
            }
          return `
` + Se + c;
        }
      }
      var xe = !1, be;
      {
        var kr = typeof WeakMap == "function" ? WeakMap : Map;
        be = new kr();
      }
      function bt(c, v) {
        if (!c || xe)
          return "";
        {
          var g = be.get(c);
          if (g !== void 0)
            return g;
        }
        var E;
        xe = !0;
        var A = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var C;
        C = Oe.current, Oe.current = null, Ir();
        try {
          if (v) {
            var T = function() {
              throw Error();
            };
            if (Object.defineProperty(T.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(T, []);
              } catch (J) {
                E = J;
              }
              Reflect.construct(c, [], T);
            } else {
              try {
                T.call();
              } catch (J) {
                E = J;
              }
              c.call(T.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (J) {
              E = J;
            }
            c();
          }
        } catch (J) {
          if (J && E && typeof J.stack == "string") {
            for (var P = J.stack.split(`
`), B = E.stack.split(`
`), F = P.length - 1, k = B.length - 1; F >= 1 && k >= 0 && P[F] !== B[k]; )
              k--;
            for (; F >= 1 && k >= 0; F--, k--)
              if (P[F] !== B[k]) {
                if (F !== 1 || k !== 1)
                  do
                    if (F--, k--, k < 0 || P[F] !== B[k]) {
                      var q = `
` + P[F].replace(" at new ", " at ");
                      return typeof c == "function" && be.set(c, q), q;
                    }
                  while (F >= 1 && k >= 0);
                break;
              }
          }
        } finally {
          xe = !1, Oe.current = C, Fr(), Error.prepareStackTrace = A;
        }
        var te = c ? c.displayName || c.name : "", Ct = te ? ge(te) : "";
        return typeof c == "function" && be.set(c, Ct), Ct;
      }
      function wt(c, v, g) {
        return bt(c, !1);
      }
      function Ur(c) {
        var v = c.prototype;
        return !!(v && v.isReactComponent);
      }
      function we(c, v, g) {
        if (c == null)
          return "";
        if (typeof c == "function")
          return bt(c, Ur(c));
        if (typeof c == "string")
          return ge(c);
        switch (c) {
          case f:
            return ge("Suspense");
          case p:
            return ge("SuspenseList");
        }
        if (typeof c == "object")
          switch (c.$$typeof) {
            case l:
              return wt(c.render);
            case d:
              return we(c.type, v, g);
            case m:
              return wt(c._render);
            case h: {
              var E = c, A = E._payload, C = E._init;
              try {
                return we(C(A), v, g);
              } catch {
              }
            }
          }
        return "";
      }
      var Et = {}, _t = U.ReactDebugCurrentFrame;
      function Ee(c) {
        if (c) {
          var v = c._owner, g = we(c.type, c._source, v ? v.type : null);
          _t.setExtraStackFrame(g);
        } else
          _t.setExtraStackFrame(null);
      }
      function $r(c, v, g, E, A) {
        {
          var C = Function.call.bind(Object.prototype.hasOwnProperty);
          for (var T in c)
            if (C(c, T)) {
              var P = void 0;
              try {
                if (typeof c[T] != "function") {
                  var B = Error((E || "React class") + ": " + g + " type `" + T + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof c[T] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw B.name = "Invariant Violation", B;
                }
                P = c[T](v, T, E, g, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (F) {
                P = F;
              }
              P && !(P instanceof Error) && (Ee(A), I("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", E || "React class", g, T, typeof P), Ee(null)), P instanceof Error && !(P.message in Et) && (Et[P.message] = !0, Ee(A), I("Failed %s type: %s", g, P.message), Ee(null));
            }
        }
      }
      var fe = U.ReactCurrentOwner, Re = Object.prototype.hasOwnProperty, Br = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, Ot, St, je;
      je = {};
      function Mr(c) {
        if (Re.call(c, "ref")) {
          var v = Object.getOwnPropertyDescriptor(c, "ref").get;
          if (v && v.isReactWarning)
            return !1;
        }
        return c.ref !== void 0;
      }
      function zr(c) {
        if (Re.call(c, "key")) {
          var v = Object.getOwnPropertyDescriptor(c, "key").get;
          if (v && v.isReactWarning)
            return !1;
        }
        return c.key !== void 0;
      }
      function Vr(c, v) {
        if (typeof c.ref == "string" && fe.current && v && fe.current.stateNode !== v) {
          var g = H(fe.current.type);
          je[g] || (I('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', H(fe.current.type), c.ref), je[g] = !0);
        }
      }
      function Wr(c, v) {
        {
          var g = function() {
            Ot || (Ot = !0, I("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", v));
          };
          g.isReactWarning = !0, Object.defineProperty(c, "key", {
            get: g,
            configurable: !0
          });
        }
      }
      function Hr(c, v) {
        {
          var g = function() {
            St || (St = !0, I("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", v));
          };
          g.isReactWarning = !0, Object.defineProperty(c, "ref", {
            get: g,
            configurable: !0
          });
        }
      }
      var qr = function(c, v, g, E, A, C, T) {
        var P = {
          $$typeof: n,
          type: c,
          key: v,
          ref: g,
          props: T,
          _owner: C
        };
        return P._store = {}, Object.defineProperty(P._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(P, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: E
        }), Object.defineProperty(P, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: A
        }), Object.freeze && (Object.freeze(P.props), Object.freeze(P)), P;
      };
      function Jr(c, v, g, E, A) {
        {
          var C, T = {}, P = null, B = null;
          g !== void 0 && (P = "" + g), zr(v) && (P = "" + v.key), Mr(v) && (B = v.ref, Vr(v, A));
          for (C in v)
            Re.call(v, C) && !Br.hasOwnProperty(C) && (T[C] = v[C]);
          if (c && c.defaultProps) {
            var F = c.defaultProps;
            for (C in F)
              T[C] === void 0 && (T[C] = F[C]);
          }
          if (P || B) {
            var k = typeof c == "function" ? c.displayName || c.name || "Unknown" : c;
            P && Wr(T, k), B && Hr(T, k);
          }
          return qr(c, P, B, A, E, fe.current, T);
        }
      }
      var Pe = U.ReactCurrentOwner, xt = U.ReactDebugCurrentFrame;
      function ee(c) {
        if (c) {
          var v = c._owner, g = we(c.type, c._source, v ? v.type : null);
          xt.setExtraStackFrame(g);
        } else
          xt.setExtraStackFrame(null);
      }
      var Te;
      Te = !1;
      function Ae(c) {
        return typeof c == "object" && c !== null && c.$$typeof === n;
      }
      function Rt() {
        {
          if (Pe.current) {
            var c = H(Pe.current.type);
            if (c)
              return `

Check the render method of \`` + c + "`.";
          }
          return "";
        }
      }
      function Kr(c) {
        {
          if (c !== void 0) {
            var v = c.fileName.replace(/^.*[\\\/]/, ""), g = c.lineNumber;
            return `

Check your code at ` + v + ":" + g + ".";
          }
          return "";
        }
      }
      var jt = {};
      function Gr(c) {
        {
          var v = Rt();
          if (!v) {
            var g = typeof c == "string" ? c : c.displayName || c.name;
            g && (v = `

Check the top-level render call using <` + g + ">.");
          }
          return v;
        }
      }
      function Pt(c, v) {
        {
          if (!c._store || c._store.validated || c.key != null)
            return;
          c._store.validated = !0;
          var g = Gr(v);
          if (jt[g])
            return;
          jt[g] = !0;
          var E = "";
          c && c._owner && c._owner !== Pe.current && (E = " It was passed a child from " + H(c._owner.type) + "."), ee(c), I('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', g, E), ee(null);
        }
      }
      function Tt(c, v) {
        {
          if (typeof c != "object")
            return;
          if (Array.isArray(c))
            for (var g = 0; g < c.length; g++) {
              var E = c[g];
              Ae(E) && Pt(E, v);
            }
          else if (Ae(c))
            c._store && (c._store.validated = !0);
          else if (c) {
            var A = N(c);
            if (typeof A == "function" && A !== c.entries)
              for (var C = A.call(c), T; !(T = C.next()).done; )
                Ae(T.value) && Pt(T.value, v);
          }
        }
      }
      function Yr(c) {
        {
          var v = c.type;
          if (v == null || typeof v == "string")
            return;
          var g;
          if (typeof v == "function")
            g = v.propTypes;
          else if (typeof v == "object" && (v.$$typeof === l || v.$$typeof === d))
            g = v.propTypes;
          else
            return;
          if (g) {
            var E = H(v);
            $r(g, c.props, "prop", E, c);
          } else if (v.PropTypes !== void 0 && !Te) {
            Te = !0;
            var A = H(v);
            I("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", A || "Unknown");
          }
          typeof v.getDefaultProps == "function" && !v.getDefaultProps.isReactClassApproved && I("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Xr(c) {
        {
          for (var v = Object.keys(c.props), g = 0; g < v.length; g++) {
            var E = v[g];
            if (E !== "children" && E !== "key") {
              ee(c), I("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", E), ee(null);
              break;
            }
          }
          c.ref !== null && (ee(c), I("Invalid attribute `ref` supplied to `React.Fragment`."), ee(null));
        }
      }
      function At(c, v, g, E, A, C) {
        {
          var T = oe(c);
          if (!T) {
            var P = "";
            (c === void 0 || typeof c == "object" && c !== null && Object.keys(c).length === 0) && (P += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var B = Kr(A);
            B ? P += B : P += Rt();
            var F;
            c === null ? F = "null" : Array.isArray(c) ? F = "array" : c !== void 0 && c.$$typeof === n ? (F = "<" + (H(c.type) || "Unknown") + " />", P = " Did you accidentally export a JSX literal instead of a component?") : F = typeof c, I("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", F, P);
          }
          var k = Jr(c, v, g, A, C);
          if (k == null)
            return k;
          if (T) {
            var q = v.children;
            if (q !== void 0)
              if (E)
                if (Array.isArray(q)) {
                  for (var te = 0; te < q.length; te++)
                    Tt(q[te], c);
                  Object.freeze && Object.freeze(q);
                } else
                  I("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
              else
                Tt(q, c);
          }
          return c === e.Fragment ? Xr(k) : Yr(k), k;
        }
      }
      function Zr(c, v, g) {
        return At(c, v, g, !0);
      }
      function Qr(c, v, g) {
        return At(c, v, g, !1);
      }
      var en = Qr, tn = Zr;
      e.jsx = en, e.jsxs = tn;
    }();
  }(Hf)), Hf;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = xL() : e.exports = RL();
})(SL);
const cv = Tn.Fragment, _o = Tn.jsx;
Tn.jsxs;
var Jf = {}, jL = {
  get exports() {
    return Jf;
  },
  set exports(e) {
    Jf = e;
  }
}, fa = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Kf;
function PL() {
  if (Kf)
    return fa;
  Kf = 1;
  var e = ye;
  function t(p, d) {
    return p === d && (p !== 0 || 1 / p === 1 / d) || p !== p && d !== d;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useState, o = e.useEffect, i = e.useLayoutEffect, a = e.useDebugValue;
  function s(p, d) {
    var h = d(), m = n({ inst: { value: h, getSnapshot: d } }), y = m[0].inst, _ = m[1];
    return i(function() {
      y.value = h, y.getSnapshot = d, u(y) && _({ inst: y });
    }, [p, h, d]), o(function() {
      return u(y) && _({ inst: y }), p(function() {
        u(y) && _({ inst: y });
      });
    }, [p]), a(h), h;
  }
  function u(p) {
    var d = p.getSnapshot;
    p = p.value;
    try {
      var h = d();
      return !r(p, h);
    } catch {
      return !0;
    }
  }
  function l(p, d) {
    return d();
  }
  var f = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? l : s;
  return fa.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : f, fa;
}
var Gf = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Yf;
function TL() {
  return Yf || (Yf = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = ye, t = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function r(w) {
      {
        for (var O = arguments.length, D = new Array(O > 1 ? O - 1 : 0), N = 1; N < O; N++)
          D[N - 1] = arguments[N];
        n("error", w, D);
      }
    }
    function n(w, O, D) {
      {
        var N = t.ReactDebugCurrentFrame, U = N.getStackAddendum();
        U !== "" && (O += "%s", D = D.concat([U]));
        var I = D.map(function($) {
          return String($);
        });
        I.unshift("Warning: " + O), Function.prototype.apply.call(console[w], console, I);
      }
    }
    function o(w, O) {
      return w === O && (w !== 0 || 1 / w === 1 / O) || w !== w && O !== O;
    }
    var i = typeof Object.is == "function" ? Object.is : o, a = e.useState, s = e.useEffect, u = e.useLayoutEffect, l = e.useDebugValue, f = !1, p = !1;
    function d(w, O, D) {
      f || e.startTransition !== void 0 && (f = !0, r("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
      var N = O();
      if (!p) {
        var U = O();
        i(N, U) || (r("The result of getSnapshot should be cached to avoid an infinite loop"), p = !0);
      }
      var I = a({
        inst: {
          value: N,
          getSnapshot: O
        }
      }), $ = I[0].inst, Z = I[1];
      return u(function() {
        $.value = N, $.getSnapshot = O, h($) && Z({
          inst: $
        });
      }, [w, N, O]), s(function() {
        h($) && Z({
          inst: $
        });
        var oe = function() {
          h($) && Z({
            inst: $
          });
        };
        return w(oe);
      }, [w]), l(N), N;
    }
    function h(w) {
      var O = w.getSnapshot, D = w.value;
      try {
        var N = O();
        return !i(D, N);
      } catch {
        return !0;
      }
    }
    function m(w, O, D) {
      return O();
    }
    var y = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", _ = !y, j = _ ? m : d, L = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : j;
    Gf.useSyncExternalStore = L, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), Gf;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = PL() : e.exports = TL();
})(jL);
const AL = () => !0;
class CL extends JN {
  constructor() {
    super(...arguments), he(this, "middlewareHandler", AL), he(this, "_routes", []);
  }
  get routes() {
    return this._routes;
  }
  registerMiddleware(t) {
    this.middlewareHandler = (r, n) => {
      var o, i, a;
      return r.middleware ? typeof ((o = r.component) == null ? void 0 : o.middleware) == "string" ? t[(i = r.component) == null ? void 0 : i.middleware] && t[(a = r.component) == null ? void 0 : a.middleware](r, n) : typeof r.middleware == "string" ? t[r.middleware] && t[r.middleware](r, n) : r.middleware(r, n) : !0;
    };
  }
  canPassMiddleware(t, r) {
    var n;
    return (n = t.component) != null && n.middleware && typeof t.component.middleware == "function" ? t.component.middleware(t, r) : this.middlewareHandler(t, r);
  }
  addRoute(...t) {
    const r = qN([...t, ...this._routes], "path");
    this._routes = r, this.trigger("routeChange", r);
  }
  removeRoute(t) {
    const r = this._routes.findIndex((n) => n.path === t);
    if (r > -1) {
      const n = [...this._routes];
      n.splice(r, 1), this._routes = n, this.trigger("routeChange", n);
    }
  }
}
new CL();
jr(
  void 0
);
jr(void 0);
const NL = ye.createContext(void 0), DL = (e) => {
  const t = An(NL);
  if (!t)
    throw new Error("useAuthorization must be used in AuthorizationProvider");
  return {
    granted: ir(() => e ? t.can(e) : !0, [e, t.can]),
    ...t
  };
};
Pr(
  ({ permissions: e, children: t, guestView: r }) => {
    const { granted: n } = DL(e);
    return typeof t == "function" ? t(n) : /* @__PURE__ */ _o(cv, { children: n ? t : r });
  }
);
const LL = ({
  route: { component: e, ...t }
}) => {
  var r;
  return /* @__PURE__ */ _o(cv, { children: (r = t.routes) != null && r.length && !t.element && !e ? /* @__PURE__ */ _o(eP, {}) : t.element || (e ? /* @__PURE__ */ _o(e, {}) : null) });
};
Pr(LL);
var Xf = {}, IL = {
  get exports() {
    return Xf;
  },
  set exports(e) {
    Xf = e;
  }
}, pa = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Zf;
function FL() {
  if (Zf)
    return pa;
  Zf = 1;
  var e = ye;
  function t(p, d) {
    return p === d && (p !== 0 || 1 / p === 1 / d) || p !== p && d !== d;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useState, o = e.useEffect, i = e.useLayoutEffect, a = e.useDebugValue;
  function s(p, d) {
    var h = d(), m = n({ inst: { value: h, getSnapshot: d } }), y = m[0].inst, _ = m[1];
    return i(function() {
      y.value = h, y.getSnapshot = d, u(y) && _({ inst: y });
    }, [p, h, d]), o(function() {
      return u(y) && _({ inst: y }), p(function() {
        u(y) && _({ inst: y });
      });
    }, [p]), a(h), h;
  }
  function u(p) {
    var d = p.getSnapshot;
    p = p.value;
    try {
      var h = d();
      return !r(p, h);
    } catch {
      return !0;
    }
  }
  function l(p, d) {
    return d();
  }
  var f = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? l : s;
  return pa.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : f, pa;
}
var Qf = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ep;
function kL() {
  return ep || (ep = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = ye, t = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function r(w) {
      {
        for (var O = arguments.length, D = new Array(O > 1 ? O - 1 : 0), N = 1; N < O; N++)
          D[N - 1] = arguments[N];
        n("error", w, D);
      }
    }
    function n(w, O, D) {
      {
        var N = t.ReactDebugCurrentFrame, U = N.getStackAddendum();
        U !== "" && (O += "%s", D = D.concat([U]));
        var I = D.map(function($) {
          return String($);
        });
        I.unshift("Warning: " + O), Function.prototype.apply.call(console[w], console, I);
      }
    }
    function o(w, O) {
      return w === O && (w !== 0 || 1 / w === 1 / O) || w !== w && O !== O;
    }
    var i = typeof Object.is == "function" ? Object.is : o, a = e.useState, s = e.useEffect, u = e.useLayoutEffect, l = e.useDebugValue, f = !1, p = !1;
    function d(w, O, D) {
      f || e.startTransition !== void 0 && (f = !0, r("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
      var N = O();
      if (!p) {
        var U = O();
        i(N, U) || (r("The result of getSnapshot should be cached to avoid an infinite loop"), p = !0);
      }
      var I = a({
        inst: {
          value: N,
          getSnapshot: O
        }
      }), $ = I[0].inst, Z = I[1];
      return u(function() {
        $.value = N, $.getSnapshot = O, h($) && Z({
          inst: $
        });
      }, [w, N, O]), s(function() {
        h($) && Z({
          inst: $
        });
        var oe = function() {
          h($) && Z({
            inst: $
          });
        };
        return w(oe);
      }, [w]), l(N), N;
    }
    function h(w) {
      var O = w.getSnapshot, D = w.value;
      try {
        var N = O();
        return !i(D, N);
      } catch {
        return !0;
      }
    }
    function m(w, O, D) {
      return O();
    }
    var y = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", _ = !y, j = _ ? m : d, L = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : j;
    Qf.useSyncExternalStore = L, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), Qf;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = FL() : e.exports = kL();
})(IL);
const UL = () => !0;
class $L extends aR {
  constructor() {
    super(...arguments), de(this, "middlewareHandler", UL), de(this, "_routes", []);
  }
  get routes() {
    return this._routes;
  }
  registerMiddleware(t) {
    this.middlewareHandler = (r, n) => {
      var o, i, a;
      return r.middleware ? typeof ((o = r.component) == null ? void 0 : o.middleware) == "string" ? t[(i = r.component) == null ? void 0 : i.middleware] && t[(a = r.component) == null ? void 0 : a.middleware](r, n) : typeof r.middleware == "string" ? t[r.middleware] && t[r.middleware](r, n) : r.middleware(r, n) : !0;
    };
  }
  canPassMiddleware(t, r) {
    var n;
    return (n = t.component) != null && n.middleware && typeof t.component.middleware == "function" ? t.component.middleware(t, r) : this.middlewareHandler(t, r);
  }
  addRoute(...t) {
    const r = iR([...t, ...this._routes], "path");
    this._routes = r, this.trigger("routeChange", r);
  }
  removeRoute(t) {
    const r = this._routes.findIndex((n) => n.path === t);
    if (r > -1) {
      const n = [...this._routes];
      n.splice(r, 1), this._routes = n, this.trigger("routeChange", n);
    }
  }
}
new $L();
function BL(e, t) {
  const r = Ft(!1);
  _e(() => {
    if (r.current)
      return e && e();
    r.current = !0;
  }, t);
}
jr(
  void 0
);
jr(void 0);
const ML = ye.createContext(void 0), zL = (e) => {
  const t = An(ML);
  if (!t)
    throw new Error("useAuthorization must be used in AuthorizationProvider");
  return {
    granted: ir(() => e ? t.can(e) : !0, [e, t.can]),
    ...t
  };
};
Pr(
  ({ permissions: e, children: t, guestView: r }) => {
    const { granted: n } = zL(e);
    return typeof t == "function" ? t(n) : /* @__PURE__ */ vo(ch, { children: n ? t : r });
  }
);
const VL = ({
  route: { component: e, ...t }
}) => {
  var r;
  return /* @__PURE__ */ vo(ch, { children: (r = t.routes) != null && r.length && !t.element && !e ? /* @__PURE__ */ vo(dO, {}) : t.element || (e ? /* @__PURE__ */ vo(e, {}) : null) });
};
Pr(VL);
function WI({ initValue: e, key: t }) {
  const [r, n] = ne({}), [o, i] = ne({});
  _e(() => {
    t && !r[t] && n((l) => ({
      ...l,
      [t]: e
    }));
  }, [t]), BL(() => {
    Object.keys(r).forEach((l) => {
      r[l] === 0 && s(l);
    });
  }, [r]);
  const a = X(
    (l) => {
      const f = {};
      o[l] || (f[l] = setInterval(() => {
        n((p) => ({
          ...p,
          [l]: p[l] - 1
        }));
      }, 1e3), i((p) => ({
        ...p,
        ...f
      })));
    },
    [t, o]
  ), s = X(
    (l) => {
      if (o[l]) {
        const f = o[l];
        clearInterval(f), i((p) => (delete p[l], p)), n((p) => (delete p[l], p));
      }
    },
    [o]
  ), u = X(
    (l) => {
      n((f) => ({
        ...f,
        [l]: e
      })), a(l);
    },
    [e]
  );
  return {
    state: r[t],
    clearCountDown: s,
    initCountdown: u
  };
}
function WL(e, t) {
  function r(n) {
    let o = [];
    return Array.isArray(n) ? o = n : o = n.split(","), o.length ? t.filter((a) => o.includes(a)).length > 0 : !0;
  }
  for (const n of e)
    if (r(n.permissions || [])) {
      if (n.routes) {
        const o = WL(n.routes, t);
        if (o)
          return o;
        continue;
      }
      return n;
    }
}
const tp = (e, t, r = !1) => {
  const n = e.split("/"), o = t.split("/");
  if (o.length > n.length || r && o.length !== n.length)
    return !1;
  for (let i = 0; i < o.length; i++) {
    const a = o[i];
    if (!a.match(/:([\w\W]+)/gi) && a !== n[i])
      return !1;
  }
  return !0;
};
var Ss = {}, HL = {
  get exports() {
    return Ss;
  },
  set exports(e) {
    Ss = e;
  }
}, da = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rp;
function qL() {
  if (rp)
    return da;
  rp = 1;
  var e = ye;
  function t(p, d) {
    return p === d && (p !== 0 || 1 / p === 1 / d) || p !== p && d !== d;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useState, o = e.useEffect, i = e.useLayoutEffect, a = e.useDebugValue;
  function s(p, d) {
    var h = d(), m = n({ inst: { value: h, getSnapshot: d } }), y = m[0].inst, _ = m[1];
    return i(function() {
      y.value = h, y.getSnapshot = d, u(y) && _({ inst: y });
    }, [p, h, d]), o(function() {
      return u(y) && _({ inst: y }), p(function() {
        u(y) && _({ inst: y });
      });
    }, [p]), a(h), h;
  }
  function u(p) {
    var d = p.getSnapshot;
    p = p.value;
    try {
      var h = d();
      return !r(p, h);
    } catch {
      return !0;
    }
  }
  function l(p, d) {
    return d();
  }
  var f = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? l : s;
  return da.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : f, da;
}
var ha = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var np;
function JL() {
  return np || (np = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = ye, t = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function r(w) {
      {
        for (var O = arguments.length, D = new Array(O > 1 ? O - 1 : 0), N = 1; N < O; N++)
          D[N - 1] = arguments[N];
        n("error", w, D);
      }
    }
    function n(w, O, D) {
      {
        var N = t.ReactDebugCurrentFrame, U = N.getStackAddendum();
        U !== "" && (O += "%s", D = D.concat([U]));
        var I = D.map(function($) {
          return String($);
        });
        I.unshift("Warning: " + O), Function.prototype.apply.call(console[w], console, I);
      }
    }
    function o(w, O) {
      return w === O && (w !== 0 || 1 / w === 1 / O) || w !== w && O !== O;
    }
    var i = typeof Object.is == "function" ? Object.is : o, a = e.useState, s = e.useEffect, u = e.useLayoutEffect, l = e.useDebugValue, f = !1, p = !1;
    function d(w, O, D) {
      f || e.startTransition !== void 0 && (f = !0, r("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
      var N = O();
      if (!p) {
        var U = O();
        i(N, U) || (r("The result of getSnapshot should be cached to avoid an infinite loop"), p = !0);
      }
      var I = a({
        inst: {
          value: N,
          getSnapshot: O
        }
      }), $ = I[0].inst, Z = I[1];
      return u(function() {
        $.value = N, $.getSnapshot = O, h($) && Z({
          inst: $
        });
      }, [w, N, O]), s(function() {
        h($) && Z({
          inst: $
        });
        var oe = function() {
          h($) && Z({
            inst: $
          });
        };
        return w(oe);
      }, [w]), l(N), N;
    }
    function h(w) {
      var O = w.getSnapshot, D = w.value;
      try {
        var N = O();
        return !i(D, N);
      } catch {
        return !0;
      }
    }
    function m(w, O, D) {
      return O();
    }
    var y = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", _ = !y, j = _ ? m : d, L = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : j;
    ha.useSyncExternalStore = L, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), ha;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = qL() : e.exports = JL();
})(HL);
const KL = () => !0;
class GL extends _E {
  constructor() {
    super(...arguments);
    pe(this, "middlewareHandler", KL);
    pe(this, "_routes", []);
  }
  get routes() {
    return this._routes;
  }
  registerMiddleware(r) {
    this.middlewareHandler = (n, o) => {
      var i, a, s;
      return n.middleware ? typeof ((i = n.component) == null ? void 0 : i.middleware) == "string" ? r[(a = n.component) == null ? void 0 : a.middleware] && r[(s = n.component) == null ? void 0 : s.middleware](n, o) : typeof n.middleware == "string" ? r[n.middleware] && r[n.middleware](n, o) : n.middleware(n, o) : !0;
    };
  }
  canPassMiddleware(r, n) {
    var o;
    return (o = r.component) != null && o.middleware && typeof r.component.middleware == "function" ? r.component.middleware(r, n) : this.middlewareHandler(r, n);
  }
  addRoute(...r) {
    const n = EE([...r, ...this._routes], "path");
    this._routes = n, this.trigger("routeChange", n);
  }
  removeRoute(r) {
    const n = this._routes.findIndex((o) => o.path === r);
    if (n > -1) {
      const o = [...this._routes];
      o.splice(n, 1), this._routes = o, this.trigger("routeChange", o);
    }
  }
}
const fn = new GL();
function lv() {
  const e = X((...o) => {
    fn.addRoute(...o);
  }, []), t = X((o) => {
    fn.removeRoute(o);
  }, []), r = X((o) => fn.on("routeChange", o), []);
  return { routes: Ss.useSyncExternalStore(
    r,
    () => fn.routes
  ), addRoutes: e, removeRoute: t };
}
const HI = () => {
  const { routes: e } = lv(), [t, r] = ne(), n = et(), o = X(
    (i) => {
      const a = i.filter(
        (s) => tp(n.pathname, s.path)
      );
      for (const s of a)
        if (s) {
          if (s.routes)
            o(s.routes);
          else if (tp(n.pathname, s.path, !0)) {
            r(s);
            break;
          }
        }
    },
    [n]
  );
  return _e(() => {
    o(e);
  }, [o, e]), t;
}, YL = (e) => {
  _e(
    () => () => {
      e();
    },
    []
  );
};
function XL(e, t) {
  const r = Ft(e);
  r.current = e;
  const n = (t == null ? void 0 : t.wait) ?? 1e3, o = Ft(
    uE(
      (...i) => r.current(...i),
      n,
      t
    )
  ).current;
  return YL(() => {
    o.cancel();
  }), {
    run: o,
    cancel: o.cancel,
    flush: o.flush
  };
}
function qI(e, t) {
  const [r, n] = ne(e), { run: o } = XL((i) => {
    n(i);
  }, t);
  return [r, o];
}
function JI(e, t) {
  const r = Ft(!1);
  _e(() => {
    if (r.current)
      return e && e();
    r.current = !0;
  }, t);
}
const KI = (e, t) => {
  const r = Ft(e);
  r.current = e;
  const n = ne()[1], o = X(() => {
    i(), n(
      setInterval(() => r.current(), t)
    );
  }, [r.current, t]), i = X(() => {
    n((a) => {
      a && clearInterval(a);
    });
  }, []);
  return {
    run: o,
    cancel: i
  };
}, ZL = (e = !1) => {
  const [t, r] = ne(e), n = X(() => {
    r((a) => !a);
  }, []), o = X(() => {
    r(!0);
  }, []), i = X(() => {
    r(!1);
  }, []);
  return { state: t, toggle: n, on: o, off: i };
}, fv = jr(
  void 0
);
function GI({
  children: e,
  color: t,
  isWrap: r = !1,
  component: n
}) {
  const { state: o, on: i, off: a } = ZL(), s = ne(0)[1], u = X(() => {
    i(), s((f) => f + 1), s(1);
  }, []), l = X(() => {
    setTimeout(() => {
      s((f) => f === 1 ? (a(), 0) : f - 1);
    }, 500);
  }, []);
  return /* @__PURE__ */ Q(fv.Provider, { value: { startLoading: u, stopLoading: l, state: o }, children: r ? /* @__PURE__ */ Q(n, { state: o, color: t, children: e }) : /* @__PURE__ */ ka(cr, { children: [
    e,
    /* @__PURE__ */ Q(n, { state: o, color: t })
  ] }) });
}
const pv = (e) => {
  const t = An(fv);
  if (t === void 0)
    throw new Error("useLoading must be used in LoadingProvider");
  return _e(() => {
    typeof e > "u" || (e ? t.startLoading() : t.stopLoading());
  }, [e, t]), t;
};
var Gt = /* @__PURE__ */ ((e) => (e.Standing = "standing", e.Processing = "processing", e.Success = "success", e.Failed = "Failed", e))(Gt || {});
function Wu(e) {
  _e(() => e(), []);
}
function QL(e, t) {
  const r = Ft(new Fa()), [n, o] = ne(), { startLoading: i, stopLoading: a } = pv(), [s, u] = ne(Gt.Standing), [l, f] = ne(), [p, d] = ne(), h = ir(() => s === Gt.Processing, [s]), m = X(
    (..._) => {
      u(Gt.Processing), t != null && t.showLoading && i(), r.current.next(e(..._));
    },
    [e]
  ), y = X(() => {
    n == null || n.unsubscribe(), u(Gt.Standing), t != null && t.showLoading && a();
  }, [n]);
  return Wu(() => (r.current.closed && (r.current = new Fa()), r.current.subscribe({
    next: (_) => {
      o(
        _.subscribe({
          next: f,
          complete: () => {
            u(Gt.Success), t != null && t.showLoading && a();
          },
          error: (j) => {
            u(Gt.Failed), d(j), t != null && t.showLoading && a();
          }
        })
      );
    }
  }), () => {
    t != null && t.showLoading && a(), r.current.unsubscribe();
  })), {
    run: m,
    cancel: y,
    state: s,
    processing: h,
    result: l,
    error: p
  };
}
const eI = { attributes: !0, childList: !0, subtree: !0 }, YI = (e, t) => {
  const r = ir(() => new MutationObserver(t), [t]);
  _e(() => {
    const n = e instanceof HTMLElement ? e : e.current;
    return n && r.observe(n, eI), () => {
      r.disconnect();
    };
  }, [r, e]);
};
function XI(e) {
  const t = Ft();
  return _e(() => {
    t.current = e;
  }), t.current;
}
const ZI = (e, t) => {
  const r = Ft(e);
  r.current = e;
  const n = ne()[1], o = X(() => {
    i(), n(
      setTimeout(() => r.current(), t)
    );
  }, [r.current, t]), i = X(() => {
    n((a) => {
      a && clearTimeout(a);
    });
  }, []);
  return {
    run: o,
    cancel: i
  };
};
function QI({ get: e, set: t }, r) {
  const n = ir(e, r), o = X(t, r);
  return [n, o];
}
const dv = jr(void 0), eF = ({
  children: e,
  defaultTokens: t = () => ({}),
  fetchUserOnLogin: r = () => new Do((o) => o.next(void 0)),
  fetchRefreshToken: n
}) => {
  const [o, i] = ne(), [a, s] = ne(t), [u, l] = ne(!1), { run: f, result: p } = QL(r), d = X(
    (O, D) => {
      l(!0), s(O), D ? i(D) : f(O);
    },
    [f]
  ), h = X(() => {
    i(void 0), s({}), l(!1);
  }, []);
  _e(() => {
    var O;
    (O = Object.values(t())[0]) != null && O.length && (f(t()), l(!0));
  }, [ja.subdomain]), _e(() => {
    p && i(p);
  }, [p]), _e(() => {
    for (const O in a)
      if (Object.prototype.hasOwnProperty.call(a, O)) {
        const D = a[O];
        ro.setToken(O, D || "");
      }
    return () => {
      for (const O in a)
        Object.prototype.hasOwnProperty.call(a, O) && ro.setToken(O, "");
    };
  }, [a]);
  const [m, y] = ne(!1), [_, j] = ne([]), L = (O, D) => {
    _.forEach((N) => {
      O ? N.reject(O) : N.resolve(D);
    }), _.splice(0);
  }, w = ke.addInterceptor({
    response: {
      error: (O, D) => {
        if (!(O instanceof F_))
          return O;
        const { config: N, response: U } = O;
        if (!N || !U)
          return Promise.reject(O);
        if (U.status === 401) {
          if (console.log("Refresh Token..."), m)
            return new Promise(function($, Z) {
              _.push({ resolve: $, reject: Z });
            }).then(() => zi(D.request(N))).catch(($) => $);
          y(!0);
          const I = ro.getToken("refresh_token");
          return I ? n ? new Promise(($, Z) => {
            zi(n(I)).then(({ data: oe }) => {
              y(!1), L(null, oe.data.accessToken), d({
                base_token: oe.data.accessToken,
                refresh_token: oe.data.refreshToken
              }), $(zi(D.request(N)));
            }).catch((oe) => {
              y(!0), h(), L(oe), Z(oe);
            });
          }) : Promise.reject(O) : (console.log("Not found refresh token app"), Promise.reject(O));
        }
        return Promise.reject(O);
      }
    }
  });
  return Wu(() => w()), /* @__PURE__ */ Q(dv.Provider, { value: { user: o, tokens: a, isLoggedIn: u, login: d, logout: h }, children: e });
};
function tF() {
  const e = An(dv);
  if (!e)
    throw new Error("useAuthContext must be used in AuthProvider");
  return e;
}
const Hu = ye.createContext(void 0), rF = ({
  userPermissions: e,
  isUser: t,
  children: r
}) => {
  const n = X(
    (o) => {
      let i = [];
      return Array.isArray(o) ? i = o : i = o.split(","), i.length ? t ? e.filter((s) => i.includes(s)).length > 0 : !1 : !0;
    },
    [t, e]
  );
  return /* @__PURE__ */ Q(Hu.Provider, { value: { userPermissions: e, can: n }, children: r });
}, tI = (e) => {
  const t = An(Hu);
  if (!t)
    throw new Error("useAuthorization must be used in AuthorizationProvider");
  return {
    granted: ir(() => e ? t.can(e) : !0, [e, t.can]),
    ...t
  };
}, nF = Pr(
  ({ permissions: e, children: t, guestView: r }) => {
    const { granted: n } = tI(e);
    return typeof t == "function" ? t(n) : /* @__PURE__ */ Q(cr, { children: n ? t : r });
  }
);
function oF(e) {
  return (t) => (r) => /* @__PURE__ */ Q(Hu.Consumer, { children: (n) => /* @__PURE__ */ Q(cr, { children: (n == null ? void 0 : n.can(e || [])) && /* @__PURE__ */ Q(t, { ...r }) }) });
}
function iF({
  component: e,
  props: t
}) {
  return /* @__PURE__ */ Q(e, { ...t });
}
function aF({
  children: e
}) {
  const { startLoading: t, stopLoading: r } = pv();
  return Wu(() => ke.addInterceptor({
    request(o) {
      return o.showLoading && t(), o;
    },
    response: {
      success: (o) => (o.config.showLoading && r(), o),
      error: (o) => {
        const { config: i } = o;
        return i != null && i.showLoading && r(), o;
      }
    }
  })), /* @__PURE__ */ Q(cr, { children: e });
}
function sF(e, t) {
  return () => {
    const r = new ke(e().baseURL, e());
    return dE(t, (n) => (...o) => n(r, ...o));
  };
}
function rI(e, t = "/") {
  const r = {}, n = e.Index.length > 0 ? `${t}${e.Index}` : "";
  for (const o in e)
    if (Object.prototype.hasOwnProperty.call(e, o)) {
      const i = e[o];
      typeof i == "object" ? r[o] = rI(i, n !== "/" ? n + "/" : "/") : o === "Index" ? r[o] = n.length ? n : t : r[o] = n + "/" + i;
    }
  return r;
}
const nI = ({
  route: { component: e, ...t }
}) => {
  var r;
  return /* @__PURE__ */ Q(cr, { children: (r = t.routes) != null && r.length && !t.element && !e ? /* @__PURE__ */ Q(pm, {}) : t.element || (e ? /* @__PURE__ */ Q(e, {}) : null) });
}, oI = Pr(nI), op = ({ route: e }) => {
  const t = qo(), [r, n] = ne();
  return _e(() => {
    (async () => n(
      await fn.canPassMiddleware(e, t)
    ))();
  }, [t, e]), r !== void 0 ? yv(r) ? r : r ? /* @__PURE__ */ Q(oI, { route: e }) : null : null;
}, hv = (e) => {
  if (e.routes) {
    const { routes: t, element: r, index: n, ...o } = e, i = t.map((a) => hv(a));
    return /* @__PURE__ */ qu(
      So,
      {
        element: /* @__PURE__ */ Q(op, { route: { ...o, element: r, routes: t } }),
        ...o,
        index: n,
        key: Nc(12)
      },
      i
    );
  }
  return /* @__PURE__ */ qu(
    So,
    {
      element: /* @__PURE__ */ Q(op, { route: e }),
      ...e,
      key: Nc(12)
    }
  );
}, iI = ({ onChange: e }) => {
  const t = et();
  return _e(() => {
    e && e(t);
  }, [t.pathname]), /* @__PURE__ */ Q(cr, {});
}, uF = ({
  routes: e,
  notFoundElement: t,
  onRouteChange: r
}) => {
  const n = ir(
    () => e.map((o) => hv(o)),
    [e]
  );
  return /* @__PURE__ */ ka(cr, { children: [
    /* @__PURE__ */ Q(iI, { onChange: r }),
    /* @__PURE__ */ ka(hm, { children: [
      n,
      /* @__PURE__ */ Q(So, { path: "*", element: t })
    ] })
  ] });
};
function cF(e) {
  const t = e;
  return (r) => {
    const n = lv();
    return /* @__PURE__ */ Q(t, { ...r, routes: n });
  };
}
export {
  ke as Api,
  aF as ApiLoadingHandlerProvider,
  eF as AuthProvider,
  rF as AuthorizationProvider,
  Gs as AxiosObservable,
  mI as BrowserRouter,
  _E as EventListenersManager,
  fv as LoadingContext,
  GI as LoadingProvider,
  iI as LocationEffect,
  vI as Navigate,
  pm as Outlet,
  nF as PrivateView,
  xa as RequestHeaderContentType,
  op as RouteMiddleware,
  oI as RouteRenderer,
  uF as RouterGenerator,
  fn as RouterHandler,
  xI as StorageManager,
  Up as StorageManagerClass,
  ro as TokenManager,
  wI as clearObject,
  Cc as clearUndefinedProperties,
  ja as coreConfig,
  sF as createRepository,
  rI as createRoutePath,
  RI as createVariableWithWatcher,
  bI as emptyObject,
  WL as findRouteHasPermission,
  Ra as formData,
  uI as generatePath,
  hv as generateRoutes,
  iF as lazyComponent,
  Nc as makeId,
  OI as passwordRegex,
  tp as pathMatched,
  EI as phoneNumberRegex,
  To as urlEncoded,
  pI as useActionData,
  hI as useAsyncError,
  dI as useAsyncValue,
  tF as useAuthContext,
  tI as useAuthorization,
  gI as useBeforeUnload,
  VI as useConstructor,
  WI as useCountDown,
  HI as useCurrentRoute,
  XL as useDebounceFn,
  qI as useDebounceState,
  JI as useDidUpdate,
  KI as useInterval,
  QL as useJob,
  pv as useLoading,
  et as useLocation,
  Wu as useMount,
  qo as useNavigate,
  fI as useNavigation,
  YI as useOnElementChange,
  rm as useOutlet,
  cI as useOutletContext,
  lI as useParams,
  XI as usePrevious,
  lv as useRoutes,
  yI as useSearchParams,
  ZI as useTimeout,
  ZL as useToggle,
  YL as useUnMount,
  QI as useWritableMemo,
  _I as usernameRegex,
  SI as validateAsciiChars,
  oF as withAuthorization,
  cF as withRoutes
};

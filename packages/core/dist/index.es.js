var _s = Object.defineProperty;
var Ss = (e, t, r) => t in e ? _s(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var G = (e, t, r) => (Ss(e, typeof t != "symbol" ? t + "" : t, r), r);
import * as b from "react";
import Xe, { useState as q, useCallback as H, useEffect as K, useRef as _e, createContext as Ho, useContext as Fr, useMemo as Ze, memo as Wo, isValidElement as Os, createElement as Ln } from "react";
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
function yt() {
  return yt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, yt.apply(this, arguments);
}
var ve;
(function(e) {
  e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
})(ve || (ve = {}));
const In = "popstate";
function Rs(e) {
  e === void 0 && (e = {});
  function t(n, o) {
    let {
      pathname: i,
      search: s,
      hash: a
    } = n.location;
    return mr(
      "",
      {
        pathname: i,
        search: s,
        hash: a
      },
      o.state && o.state.usr || null,
      o.state && o.state.key || "default"
    );
  }
  function r(n, o) {
    return typeof o == "string" ? o : Le(o);
  }
  return Ts(t, r, null, e);
}
function P(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function xs() {
  return Math.random().toString(36).substr(2, 8);
}
function jn(e) {
  return {
    usr: e.state,
    key: e.key
  };
}
function mr(e, t, r, n) {
  return r === void 0 && (r = null), yt({
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: ""
  }, typeof t == "string" ? Ue(t) : t, {
    state: r,
    key: t && t.key || n || xs()
  });
}
function Le(e) {
  let {
    pathname: t = "/",
    search: r = "",
    hash: n = ""
  } = e;
  return r && r !== "?" && (t += r.charAt(0) === "?" ? r : "?" + r), n && n !== "#" && (t += n.charAt(0) === "#" ? n : "#" + n), t;
}
function Ue(e) {
  let t = {};
  if (e) {
    let r = e.indexOf("#");
    r >= 0 && (t.hash = e.substr(r), e = e.substr(0, r));
    let n = e.indexOf("?");
    n >= 0 && (t.search = e.substr(n), e = e.substr(0, n)), e && (t.pathname = e);
  }
  return t;
}
function Ps(e) {
  let t = typeof window < "u" && typeof window.location < "u" && window.location.origin !== "null" ? window.location.origin : window.location.href, r = typeof e == "string" ? e : Le(e);
  return P(t, "No window.location.(origin|href) available to create URL for href: " + r), new URL(r, t);
}
function Ts(e, t, r, n) {
  n === void 0 && (n = {});
  let {
    window: o = document.defaultView,
    v5Compat: i = !1
  } = n, s = o.history, a = ve.Pop, u = null;
  function l() {
    a = ve.Pop, u && u({
      action: a,
      location: p.location
    });
  }
  function f(g, v) {
    a = ve.Push;
    let h = mr(p.location, g, v);
    r && r(h, g);
    let S = jn(h), w = p.createHref(h);
    try {
      s.pushState(S, "", w);
    } catch {
      o.location.assign(w);
    }
    i && u && u({
      action: a,
      location: p.location
    });
  }
  function d(g, v) {
    a = ve.Replace;
    let h = mr(p.location, g, v);
    r && r(h, g);
    let S = jn(h), w = p.createHref(h);
    s.replaceState(S, "", w), i && u && u({
      action: a,
      location: p.location
    });
  }
  let p = {
    get action() {
      return a;
    },
    get location() {
      return e(o, s);
    },
    listen(g) {
      if (u)
        throw new Error("A history only accepts one active listener");
      return o.addEventListener(In, l), u = g, () => {
        o.removeEventListener(In, l), u = null;
      };
    },
    createHref(g) {
      return t(o, g);
    },
    encodeLocation(g) {
      let v = Ps(typeof g == "string" ? g : Le(g));
      return {
        pathname: v.pathname,
        search: v.search,
        hash: v.hash
      };
    },
    push: f,
    replace: d,
    go(g) {
      return s.go(g);
    }
  };
  return p;
}
var Un;
(function(e) {
  e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error";
})(Un || (Un = {}));
function Cs(e, t, r) {
  r === void 0 && (r = "/");
  let n = typeof t == "string" ? Ue(t) : t, o = Go(n.pathname || "/", r);
  if (o == null)
    return null;
  let i = qo(e);
  As(i);
  let s = null;
  for (let a = 0; s == null && a < i.length; ++a)
    s = Ms(
      i[a],
      ks(o)
    );
  return s;
}
function qo(e, t, r, n) {
  t === void 0 && (t = []), r === void 0 && (r = []), n === void 0 && (n = "");
  let o = (i, s, a) => {
    let u = {
      relativePath: a === void 0 ? i.path || "" : a,
      caseSensitive: i.caseSensitive === !0,
      childrenIndex: s,
      route: i
    };
    u.relativePath.startsWith("/") && (P(u.relativePath.startsWith(n), 'Absolute route path "' + u.relativePath + '" nested under path ' + ('"' + n + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), u.relativePath = u.relativePath.slice(n.length));
    let l = ue([n, u.relativePath]), f = r.concat(u);
    i.children && i.children.length > 0 && (P(
      i.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + l + '".')
    ), qo(i.children, t, f, l)), !(i.path == null && !i.index) && t.push({
      path: l,
      score: Us(l, i.index),
      routesMeta: f
    });
  };
  return e.forEach((i, s) => {
    var a;
    if (i.path === "" || !((a = i.path) != null && a.includes("?")))
      o(i, s);
    else
      for (let u of zo(i.path))
        o(i, s, u);
  }), t;
}
function zo(e) {
  let t = e.split("/");
  if (t.length === 0)
    return [];
  let [r, ...n] = t, o = r.endsWith("?"), i = r.replace(/\?$/, "");
  if (n.length === 0)
    return o ? [i, ""] : [i];
  let s = zo(n.join("/")), a = [];
  return a.push(...s.map((u) => u === "" ? i : [i, u].join("/"))), o && a.push(...s), a.map((u) => e.startsWith("/") && u === "" ? "/" : u);
}
function As(e) {
  e.sort((t, r) => t.score !== r.score ? r.score - t.score : Fs(t.routesMeta.map((n) => n.childrenIndex), r.routesMeta.map((n) => n.childrenIndex)));
}
const Ns = /^:\w+$/, Ds = 3, $s = 2, Ls = 1, Is = 10, js = -2, Fn = (e) => e === "*";
function Us(e, t) {
  let r = e.split("/"), n = r.length;
  return r.some(Fn) && (n += js), t && (n += $s), r.filter((o) => !Fn(o)).reduce((o, i) => o + (Ns.test(i) ? Ds : i === "" ? Ls : Is), n);
}
function Fs(e, t) {
  return e.length === t.length && e.slice(0, -1).every((n, o) => n === t[o]) ? e[e.length - 1] - t[t.length - 1] : 0;
}
function Ms(e, t) {
  let {
    routesMeta: r
  } = e, n = {}, o = "/", i = [];
  for (let s = 0; s < r.length; ++s) {
    let a = r[s], u = s === r.length - 1, l = o === "/" ? t : t.slice(o.length) || "/", f = Bs({
      path: a.relativePath,
      caseSensitive: a.caseSensitive,
      end: u
    }, l);
    if (!f)
      return null;
    Object.assign(n, f.params);
    let d = a.route;
    i.push({
      params: n,
      pathname: ue([o, f.pathname]),
      pathnameBase: zs(ue([o, f.pathnameBase])),
      route: d
    }), f.pathnameBase !== "/" && (o = ue([o, f.pathnameBase]));
  }
  return i;
}
function Rh(e, t) {
  t === void 0 && (t = {});
  let r = e;
  return r.endsWith("*") && r !== "*" && !r.endsWith("/*") && (oe(!1, 'Route path "' + r + '" will be treated as if it were ' + ('"' + r.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + r.replace(/\*$/, "/*") + '".')), r = r.replace(/\*$/, "/*")), r.replace(/^:(\w+)/g, (n, o) => (P(t[o] != null, 'Missing ":' + o + '" param'), t[o])).replace(/\/:(\w+)/g, (n, o) => (P(t[o] != null, 'Missing ":' + o + '" param'), "/" + t[o])).replace(/(\/?)\*/, (n, o, i, s) => {
    const a = "*";
    return t[a] == null ? s === "/*" ? "/" : "" : "" + o + t[a];
  });
}
function Bs(e, t) {
  typeof e == "string" && (e = {
    path: e,
    caseSensitive: !1,
    end: !0
  });
  let [r, n] = Vs(e.path, e.caseSensitive, e.end), o = t.match(r);
  if (!o)
    return null;
  let i = o[0], s = i.replace(/(.)\/+$/, "$1"), a = o.slice(1);
  return {
    params: n.reduce((l, f, d) => {
      if (f === "*") {
        let p = a[d] || "";
        s = i.slice(0, i.length - p.length).replace(/(.)\/+$/, "$1");
      }
      return l[f] = Hs(a[d] || "", f), l;
    }, {}),
    pathname: i,
    pathnameBase: s,
    pattern: e
  };
}
function Vs(e, t, r) {
  t === void 0 && (t = !1), r === void 0 && (r = !0), oe(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
  let n = [], o = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^$?{}|()[\]]/g, "\\$&").replace(/\/:(\w+)/g, (s, a) => (n.push(a), "/([^\\/]+)"));
  return e.endsWith("*") ? (n.push("*"), o += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? o += "\\/*$" : e !== "" && e !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, t ? void 0 : "i"), n];
}
function ks(e) {
  try {
    return decodeURI(e);
  } catch (t) {
    return oe(!1, 'The URL path "' + e + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + t + ").")), e;
  }
}
function Hs(e, t) {
  try {
    return decodeURIComponent(e);
  } catch (r) {
    return oe(!1, 'The value for the URL param "' + t + '" will not be decoded because' + (' the string "' + e + '" is a malformed URL segment. This is probably') + (" due to a bad percent encoding (" + r + ").")), e;
  }
}
function Go(e, t) {
  if (t === "/")
    return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let r = t.endsWith("/") ? t.length - 1 : t.length, n = e.charAt(r);
  return n && n !== "/" ? null : e.slice(r) || "/";
}
function oe(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function Ws(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: r,
    search: n = "",
    hash: o = ""
  } = typeof e == "string" ? Ue(e) : e;
  return {
    pathname: r ? r.startsWith("/") ? r : qs(r, t) : t,
    search: Gs(n),
    hash: Js(o)
  };
}
function qs(e, t) {
  let r = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((o) => {
    o === ".." ? r.length > 1 && r.pop() : o !== "." && r.push(o);
  }), r.length > 1 ? r.join("/") : "/";
}
function Qt(e, t, r, n) {
  return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(n) + "].  Please separate it out to the ") + ("`to." + r + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function Jo(e) {
  return e.filter((t, r) => r === 0 || t.route.path && t.route.path.length > 0);
}
function Ko(e, t, r, n) {
  n === void 0 && (n = !1);
  let o;
  typeof e == "string" ? o = Ue(e) : (o = yt({}, e), P(!o.pathname || !o.pathname.includes("?"), Qt("?", "pathname", "search", o)), P(!o.pathname || !o.pathname.includes("#"), Qt("#", "pathname", "hash", o)), P(!o.search || !o.search.includes("#"), Qt("#", "search", "hash", o)));
  let i = e === "" || o.pathname === "", s = i ? "/" : o.pathname, a;
  if (n || s == null)
    a = r;
  else {
    let d = t.length - 1;
    if (s.startsWith("..")) {
      let p = s.split("/");
      for (; p[0] === ".."; )
        p.shift(), d -= 1;
      o.pathname = p.join("/");
    }
    a = d >= 0 ? t[d] : "/";
  }
  let u = Ws(o, a), l = s && s !== "/" && s.endsWith("/"), f = (i || s === ".") && r.endsWith("/");
  return !u.pathname.endsWith("/") && (l || f) && (u.pathname += "/"), u;
}
const ue = (e) => e.join("/").replace(/\/\/+/g, "/"), zs = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"), Gs = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, Js = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e;
class Ks {
  constructor(t, r, n, o) {
    o === void 0 && (o = !1), this.status = t, this.statusText = r || "", this.internal = o, n instanceof Error ? (this.data = n.toString(), this.error = n) : this.data = n;
  }
}
function Ys(e) {
  return e instanceof Ks;
}
const Xs = ["post", "put", "patch", "delete"];
[...Xs];
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
function vr() {
  return vr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, vr.apply(this, arguments);
}
function Zs(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
const Yo = typeof Object.is == "function" ? Object.is : Zs, {
  useState: Qs,
  useEffect: ea,
  useLayoutEffect: ta,
  useDebugValue: ra
} = b;
let Mn = !1, Bn = !1;
function na(e, t, r) {
  process.env.NODE_ENV !== "production" && (Mn || "startTransition" in b && (Mn = !0, console.error("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release.")));
  const n = t();
  if (process.env.NODE_ENV !== "production" && !Bn) {
    const s = t();
    Yo(n, s) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), Bn = !0);
  }
  const [{
    inst: o
  }, i] = Qs({
    inst: {
      value: n,
      getSnapshot: t
    }
  });
  return ta(() => {
    o.value = n, o.getSnapshot = t, er(o) && i({
      inst: o
    });
  }, [e, n, t]), ea(() => (er(o) && i({
    inst: o
  }), e(() => {
    er(o) && i({
      inst: o
    });
  })), [e]), ra(n), n;
}
function er(e) {
  const t = e.getSnapshot, r = e.value;
  try {
    const n = t();
    return !Yo(r, n);
  } catch {
    return !0;
  }
}
function oa(e, t, r) {
  return t();
}
const ia = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", sa = !ia, aa = sa ? oa : na;
"useSyncExternalStore" in b && ((e) => e.useSyncExternalStore)(b);
const Xo = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (Xo.displayName = "DataStaticRouterContext");
const Mr = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (Mr.displayName = "DataRouter");
const Qe = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (Qe.displayName = "DataRouterState");
const Br = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (Br.displayName = "Await");
const be = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (be.displayName = "Navigation");
const et = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (et.displayName = "Location");
const Z = /* @__PURE__ */ b.createContext({
  outlet: null,
  matches: []
});
process.env.NODE_ENV !== "production" && (Z.displayName = "Route");
const Vr = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (Vr.displayName = "RouteError");
function ua(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t;
  Fe() || (process.env.NODE_ENV !== "production" ? P(
    !1,
    "useHref() may be used only in the context of a <Router> component."
  ) : P(!1));
  let {
    basename: n,
    navigator: o
  } = b.useContext(be), {
    hash: i,
    pathname: s,
    search: a
  } = Nt(e, {
    relative: r
  }), u = s;
  return n !== "/" && (u = s === "/" ? n : ue([n, s])), o.createHref({
    pathname: u,
    search: a,
    hash: i
  });
}
function Fe() {
  return b.useContext(et) != null;
}
function fe() {
  return Fe() || (process.env.NODE_ENV !== "production" ? P(
    !1,
    "useLocation() may be used only in the context of a <Router> component."
  ) : P(!1)), b.useContext(et).location;
}
function At() {
  Fe() || (process.env.NODE_ENV !== "production" ? P(
    !1,
    "useNavigate() may be used only in the context of a <Router> component."
  ) : P(!1));
  let {
    basename: e,
    navigator: t
  } = b.useContext(be), {
    matches: r
  } = b.useContext(Z), {
    pathname: n
  } = fe(), o = JSON.stringify(Jo(r).map((a) => a.pathnameBase)), i = b.useRef(!1);
  return b.useEffect(() => {
    i.current = !0;
  }), b.useCallback(function(a, u) {
    if (u === void 0 && (u = {}), process.env.NODE_ENV !== "production" && oe(i.current, "You should call navigate() in a React.useEffect(), not when your component is first rendered."), !i.current)
      return;
    if (typeof a == "number") {
      t.go(a);
      return;
    }
    let l = Ko(a, JSON.parse(o), n, u.relative === "path");
    e !== "/" && (l.pathname = l.pathname === "/" ? e : ue([e, l.pathname])), (u.replace ? t.replace : t.push)(l, u.state, u);
  }, [e, t, o, n]);
}
const Zo = /* @__PURE__ */ b.createContext(null);
function xh() {
  return b.useContext(Zo);
}
function ca(e) {
  let t = b.useContext(Z).outlet;
  return t && /* @__PURE__ */ b.createElement(Zo.Provider, {
    value: e
  }, t);
}
function Ph() {
  let {
    matches: e
  } = b.useContext(Z), t = e[e.length - 1];
  return t ? t.params : {};
}
function Nt(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t, {
    matches: n
  } = b.useContext(Z), {
    pathname: o
  } = fe(), i = JSON.stringify(Jo(n).map((s) => s.pathnameBase));
  return b.useMemo(() => Ko(e, JSON.parse(i), o, r === "path"), [e, i, o, r]);
}
function la(e, t) {
  Fe() || (process.env.NODE_ENV !== "production" ? P(
    !1,
    "useRoutes() may be used only in the context of a <Router> component."
  ) : P(!1));
  let {
    navigator: r
  } = b.useContext(be), n = b.useContext(Qe), {
    matches: o
  } = b.useContext(Z), i = o[o.length - 1], s = i ? i.params : {}, a = i ? i.pathname : "/", u = i ? i.pathnameBase : "/", l = i && i.route;
  if (process.env.NODE_ENV !== "production") {
    let w = l && l.path || "";
    ya(a, !l || w.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + a + '" (under <Route path="' + w + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + w + '"> to <Route ') + ('path="' + (w === "/" ? "*" : w + "/*") + '">.'));
  }
  let f = fe(), d;
  if (t) {
    var p;
    let w = typeof t == "string" ? Ue(t) : t;
    u === "/" || (p = w.pathname) != null && p.startsWith(u) || (process.env.NODE_ENV !== "production" ? P(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + u + '" ') + ('but pathname "' + w.pathname + '" was given in the `location` prop.')) : P(!1)), d = w;
  } else
    d = f;
  let g = d.pathname || "/", v = u === "/" ? g : g.slice(u.length) || "/", h = Cs(e, {
    pathname: v
  });
  process.env.NODE_ENV !== "production" && (process.env.NODE_ENV !== "production" && oe(l || h != null, 'No routes matched location "' + d.pathname + d.search + d.hash + '" '), process.env.NODE_ENV !== "production" && oe(h == null || h[h.length - 1].route.element !== void 0, 'Matched leaf route at location "' + d.pathname + d.search + d.hash + '" does not have an element. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.'));
  let S = ha(h && h.map((w) => Object.assign({}, w, {
    params: Object.assign({}, s, w.params),
    pathname: ue([
      u,
      r.encodeLocation ? r.encodeLocation(w.pathname).pathname : w.pathname
    ]),
    pathnameBase: w.pathnameBase === "/" ? u : ue([
      u,
      r.encodeLocation ? r.encodeLocation(w.pathnameBase).pathname : w.pathnameBase
    ])
  })), o, n || void 0);
  return t && S ? /* @__PURE__ */ b.createElement(et.Provider, {
    value: {
      location: vr({
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default"
      }, d),
      navigationType: ve.Pop
    }
  }, S) : S;
}
function fa() {
  let e = ga(), t = Ys(e) ? e.status + " " + e.statusText : e instanceof Error ? e.message : JSON.stringify(e), r = e instanceof Error ? e.stack : null, n = "rgba(200,200,200, 0.5)", o = {
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
class da extends b.Component {
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
    return this.state.error ? /* @__PURE__ */ b.createElement(Z.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ b.createElement(Vr.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function pa(e) {
  let {
    routeContext: t,
    match: r,
    children: n
  } = e, o = b.useContext(Xo);
  return o && r.route.errorElement && (o._deepestRenderedBoundaryId = r.route.id), /* @__PURE__ */ b.createElement(Z.Provider, {
    value: t
  }, n);
}
function ha(e, t, r) {
  if (t === void 0 && (t = []), e == null)
    if (r != null && r.errors)
      e = r.matches;
    else
      return null;
  let n = e, o = r == null ? void 0 : r.errors;
  if (o != null) {
    let i = n.findIndex((s) => s.route.id && (o == null ? void 0 : o[s.route.id]));
    i >= 0 || (process.env.NODE_ENV !== "production" ? P(!1, "Could not find a matching route for the current errors: " + o) : P(!1)), n = n.slice(0, Math.min(n.length, i + 1));
  }
  return n.reduceRight((i, s, a) => {
    let u = s.route.id ? o == null ? void 0 : o[s.route.id] : null, l = r ? s.route.errorElement || /* @__PURE__ */ b.createElement(fa, null) : null, f = t.concat(n.slice(0, a + 1)), d = () => /* @__PURE__ */ b.createElement(pa, {
      match: s,
      routeContext: {
        outlet: i,
        matches: f
      }
    }, u ? l : s.route.element !== void 0 ? s.route.element : i);
    return r && (s.route.errorElement || a === 0) ? /* @__PURE__ */ b.createElement(da, {
      location: r.location,
      component: l,
      error: u,
      children: d(),
      routeContext: {
        outlet: null,
        matches: f
      }
    }) : d();
  }, null);
}
var Vn;
(function(e) {
  e.UseRevalidator = "useRevalidator";
})(Vn || (Vn = {}));
var Ie;
(function(e) {
  e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator";
})(Ie || (Ie = {}));
function Qo(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function kr(e) {
  let t = b.useContext(Qe);
  return t || (process.env.NODE_ENV !== "production" ? P(!1, Qo(e)) : P(!1)), t;
}
function ma(e) {
  let t = b.useContext(Z);
  return t || (process.env.NODE_ENV !== "production" ? P(!1, Qo(e)) : P(!1)), t;
}
function va(e) {
  let t = ma(e), r = t.matches[t.matches.length - 1];
  return r.route.id || (process.env.NODE_ENV !== "production" ? P(!1, e + ' can only be used on routes that contain a unique "id"') : P(!1)), r.route.id;
}
function Th() {
  return kr(Ie.UseNavigation).navigation;
}
function Ch() {
  let e = kr(Ie.UseActionData);
  return b.useContext(Z) || (process.env.NODE_ENV !== "production" ? P(!1, "useActionData must be used inside a RouteContext") : P(!1)), Object.values((e == null ? void 0 : e.actionData) || {})[0];
}
function ga() {
  var e;
  let t = b.useContext(Vr), r = kr(Ie.UseRouteError), n = va(Ie.UseRouteError);
  return t || ((e = r.errors) == null ? void 0 : e[n]);
}
function Ah() {
  let e = b.useContext(Br);
  return e == null ? void 0 : e._data;
}
function Nh() {
  let e = b.useContext(Br);
  return e == null ? void 0 : e._error;
}
const kn = {};
function ya(e, t, r) {
  !t && !kn[e] && (kn[e] = !0, process.env.NODE_ENV !== "production" && oe(!1, r));
}
function Dh(e) {
  let {
    to: t,
    replace: r,
    state: n,
    relative: o
  } = e;
  Fe() || (process.env.NODE_ENV !== "production" ? P(
    !1,
    "<Navigate> may be used only in the context of a <Router> component."
  ) : P(!1)), process.env.NODE_ENV !== "production" && oe(!b.useContext(be).static, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
  let i = b.useContext(Qe), s = At();
  return b.useEffect(() => {
    i && i.navigation.state !== "idle" || s(t, {
      replace: r,
      state: n,
      relative: o
    });
  }), null;
}
function ba(e) {
  return ca(e.context);
}
function bt(e) {
  process.env.NODE_ENV !== "production" ? P(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.") : P(!1);
}
function Ea(e) {
  let {
    basename: t = "/",
    children: r = null,
    location: n,
    navigationType: o = ve.Pop,
    navigator: i,
    static: s = !1
  } = e;
  Fe() && (process.env.NODE_ENV !== "production" ? P(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.") : P(!1));
  let a = t.replace(/^\/*/, "/"), u = b.useMemo(() => ({
    basename: a,
    navigator: i,
    static: s
  }), [a, i, s]);
  typeof n == "string" && (n = Ue(n));
  let {
    pathname: l = "/",
    search: f = "",
    hash: d = "",
    state: p = null,
    key: g = "default"
  } = n, v = b.useMemo(() => {
    let h = Go(l, a);
    return h == null ? null : {
      pathname: h,
      search: f,
      hash: d,
      state: p,
      key: g
    };
  }, [a, l, f, d, p, g]);
  return process.env.NODE_ENV !== "production" && oe(v != null, '<Router basename="' + a + '"> is not able to match the URL ' + ('"' + l + f + d + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), v == null ? null : /* @__PURE__ */ b.createElement(be.Provider, {
    value: u
  }, /* @__PURE__ */ b.createElement(et.Provider, {
    children: r,
    value: {
      location: v,
      navigationType: o
    }
  }));
}
function wa(e) {
  let {
    children: t,
    location: r
  } = e, n = b.useContext(Mr), o = n && !t ? n.router.routes : gr(t);
  return la(o, r);
}
var Hn;
(function(e) {
  e[e.pending = 0] = "pending", e[e.success = 1] = "success", e[e.error = 2] = "error";
})(Hn || (Hn = {}));
new Promise(() => {
});
function gr(e, t) {
  t === void 0 && (t = []);
  let r = [];
  return b.Children.forEach(e, (n, o) => {
    if (!/* @__PURE__ */ b.isValidElement(n))
      return;
    if (n.type === b.Fragment) {
      r.push.apply(r, gr(n.props.children, t));
      return;
    }
    n.type !== bt && (process.env.NODE_ENV !== "production" ? P(!1, "[" + (typeof n.type == "string" ? n.type : n.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>") : P(!1)), !n.props.index || !n.props.children || (process.env.NODE_ENV !== "production" ? P(!1, "An index route cannot have child routes.") : P(!1));
    let i = [...t, o], s = {
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
    n.props.children && (s.children = gr(n.props.children, i)), r.push(s);
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
function Se() {
  return Se = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Se.apply(this, arguments);
}
function Hr(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), o, i;
  for (i = 0; i < n.length; i++)
    o = n[i], !(t.indexOf(o) >= 0) && (r[o] = e[o]);
  return r;
}
const ft = "get", tr = "application/x-www-form-urlencoded";
function Dt(e) {
  return e != null && typeof e.tagName == "string";
}
function _a(e) {
  return Dt(e) && e.tagName.toLowerCase() === "button";
}
function Sa(e) {
  return Dt(e) && e.tagName.toLowerCase() === "form";
}
function Oa(e) {
  return Dt(e) && e.tagName.toLowerCase() === "input";
}
function Ra(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function xa(e, t) {
  return e.button === 0 && (!t || t === "_self") && !Ra(e);
}
function yr(e) {
  return e === void 0 && (e = ""), new URLSearchParams(typeof e == "string" || Array.isArray(e) || e instanceof URLSearchParams ? e : Object.keys(e).reduce((t, r) => {
    let n = e[r];
    return t.concat(Array.isArray(n) ? n.map((o) => [r, o]) : [[r, n]]);
  }, []));
}
function Pa(e, t) {
  let r = yr(e);
  for (let n of t.keys())
    r.has(n) || t.getAll(n).forEach((o) => {
      r.append(n, o);
    });
  return r;
}
function Ta(e, t, r) {
  let n, o, i, s;
  if (Sa(e)) {
    let f = r.submissionTrigger;
    n = r.method || e.getAttribute("method") || ft, o = r.action || e.getAttribute("action") || t, i = r.encType || e.getAttribute("enctype") || tr, s = new FormData(e), f && f.name && s.append(f.name, f.value);
  } else if (_a(e) || Oa(e) && (e.type === "submit" || e.type === "image")) {
    let f = e.form;
    if (f == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    n = r.method || e.getAttribute("formmethod") || f.getAttribute("method") || ft, o = r.action || e.getAttribute("formaction") || f.getAttribute("action") || t, i = r.encType || e.getAttribute("formenctype") || f.getAttribute("enctype") || tr, s = new FormData(f), e.name && s.append(e.name, e.value);
  } else {
    if (Dt(e))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    if (n = r.method || ft, o = r.action || t, i = r.encType || tr, e instanceof FormData)
      s = e;
    else if (s = new FormData(), e instanceof URLSearchParams)
      for (let [f, d] of e)
        s.append(f, d);
    else if (e != null)
      for (let f of Object.keys(e))
        s.append(f, e[f]);
  }
  let {
    protocol: a,
    host: u
  } = window.location;
  return {
    url: new URL(o, a + "//" + u),
    method: n.toLowerCase(),
    encType: i,
    formData: s
  };
}
const Ca = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset"], Aa = ["aria-current", "caseSensitive", "className", "end", "style", "to", "children"], Na = ["reloadDocument", "replace", "method", "action", "onSubmit", "fetcherKey", "routeId", "relative"];
function $h(e) {
  let {
    basename: t,
    children: r,
    window: n
  } = e, o = b.useRef();
  o.current == null && (o.current = Rs({
    window: n,
    v5Compat: !0
  }));
  let i = o.current, [s, a] = b.useState({
    action: i.action,
    location: i.location
  });
  return b.useLayoutEffect(() => i.listen(a), [i]), /* @__PURE__ */ b.createElement(Ea, {
    basename: t,
    children: r,
    location: s.location,
    navigationType: s.action,
    navigator: i
  });
}
process.env.NODE_ENV;
const ei = /* @__PURE__ */ b.forwardRef(function(t, r) {
  let {
    onClick: n,
    relative: o,
    reloadDocument: i,
    replace: s,
    state: a,
    target: u,
    to: l,
    preventScrollReset: f
  } = t, d = Hr(t, Ca), p = ua(l, {
    relative: o
  }), g = ja(l, {
    replace: s,
    state: a,
    target: u,
    preventScrollReset: f,
    relative: o
  });
  function v(h) {
    n && n(h), h.defaultPrevented || g(h);
  }
  return /* @__PURE__ */ b.createElement("a", Se({}, d, {
    href: p,
    onClick: i ? n : v,
    ref: r,
    target: u
  }));
});
process.env.NODE_ENV !== "production" && (ei.displayName = "Link");
const Da = /* @__PURE__ */ b.forwardRef(function(t, r) {
  let {
    "aria-current": n = "page",
    caseSensitive: o = !1,
    className: i = "",
    end: s = !1,
    style: a,
    to: u,
    children: l
  } = t, f = Hr(t, Aa), d = Nt(u, {
    relative: f.relative
  }), p = fe(), g = b.useContext(Qe), {
    navigator: v
  } = b.useContext(be), h = v.encodeLocation ? v.encodeLocation(d).pathname : d.pathname, S = p.pathname, w = g && g.navigation && g.navigation.location ? g.navigation.location.pathname : null;
  o || (S = S.toLowerCase(), w = w ? w.toLowerCase() : null, h = h.toLowerCase());
  let D = S === h || !s && S.startsWith(h) && S.charAt(h.length) === "/", O = w != null && (w === h || !s && w.startsWith(h) && w.charAt(h.length) === "/"), _ = D ? n : void 0, T;
  typeof i == "function" ? T = i({
    isActive: D,
    isPending: O
  }) : T = [i, D ? "active" : null, O ? "pending" : null].filter(Boolean).join(" ");
  let R = typeof a == "function" ? a({
    isActive: D,
    isPending: O
  }) : a;
  return /* @__PURE__ */ b.createElement(ei, Se({}, f, {
    "aria-current": _,
    className: T,
    ref: r,
    style: R,
    to: u
  }), typeof l == "function" ? l({
    isActive: D,
    isPending: O
  }) : l);
});
process.env.NODE_ENV !== "production" && (Da.displayName = "NavLink");
const $a = /* @__PURE__ */ b.forwardRef((e, t) => /* @__PURE__ */ b.createElement(ti, Se({}, e, {
  ref: t
})));
process.env.NODE_ENV !== "production" && ($a.displayName = "Form");
const ti = /* @__PURE__ */ b.forwardRef((e, t) => {
  let {
    reloadDocument: r,
    replace: n,
    method: o = ft,
    action: i,
    onSubmit: s,
    fetcherKey: a,
    routeId: u,
    relative: l
  } = e, f = Hr(e, Na), d = Ua(a, u), p = o.toLowerCase() === "get" ? "get" : "post", g = ri(i, {
    relative: l
  }), v = (h) => {
    if (s && s(h), h.defaultPrevented)
      return;
    h.preventDefault();
    let S = h.nativeEvent.submitter, w = (S == null ? void 0 : S.getAttribute("formmethod")) || o;
    d(S || h.currentTarget, {
      method: w,
      replace: n,
      relative: l
    });
  };
  return /* @__PURE__ */ b.createElement("form", Se({
    ref: t,
    method: p,
    action: g,
    onSubmit: r ? s : v
  }, f));
});
process.env.NODE_ENV !== "production" && (ti.displayName = "FormImpl");
process.env.NODE_ENV;
var br;
(function(e) {
  e.UseScrollRestoration = "useScrollRestoration", e.UseSubmitImpl = "useSubmitImpl", e.UseFetcher = "useFetcher";
})(br || (br = {}));
var Wn;
(function(e) {
  e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration";
})(Wn || (Wn = {}));
function La(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function Ia(e) {
  let t = b.useContext(Mr);
  return t || (process.env.NODE_ENV !== "production" ? P(!1, La(e)) : P(!1)), t;
}
function ja(e, t) {
  let {
    target: r,
    replace: n,
    state: o,
    preventScrollReset: i,
    relative: s
  } = t === void 0 ? {} : t, a = At(), u = fe(), l = Nt(e, {
    relative: s
  });
  return b.useCallback((f) => {
    if (xa(f, r)) {
      f.preventDefault();
      let d = n !== void 0 ? n : Le(u) === Le(l);
      a(e, {
        replace: d,
        state: o,
        preventScrollReset: i,
        relative: s
      });
    }
  }, [u, a, l, n, o, r, e, i, s]);
}
function Lh(e) {
  process.env.NODE_ENV !== "production" && Fa(typeof URLSearchParams < "u", "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params\n\nIf you're unsure how to load polyfills, we recommend you check out https://polyfill.io/v3/ which provides some recommendations about how to load polyfills only for users that need them, instead of for every user.");
  let t = b.useRef(yr(e)), r = fe(), n = b.useMemo(() => Pa(r.search, t.current), [r.search]), o = At(), i = b.useCallback((s, a) => {
    const u = yr(typeof s == "function" ? s(n) : s);
    o("?" + u, a);
  }, [o, n]);
  return [n, i];
}
function Ua(e, t) {
  let {
    router: r
  } = Ia(br.UseSubmitImpl), n = ri();
  return b.useCallback(function(o, i) {
    if (i === void 0 && (i = {}), typeof document > "u")
      throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
    let {
      method: s,
      encType: a,
      formData: u,
      url: l
    } = Ta(o, n, i), f = l.pathname + l.search, d = {
      replace: i.replace,
      formData: u,
      formMethod: s,
      formEncType: a
    };
    e ? (t == null && (process.env.NODE_ENV !== "production" ? P(!1, "No routeId available for useFetcher()") : P(!1)), r.fetch(e, t, f, d)) : r.navigate(f, d);
  }, [n, r, e, t]);
}
function ri(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t, {
    basename: n
  } = b.useContext(be), o = b.useContext(Z);
  o || (process.env.NODE_ENV !== "production" ? P(!1, "useFormAction must be used inside a RouteContext") : P(!1));
  let [i] = o.matches.slice(-1), s = Se({}, Nt(e || ".", {
    relative: r
  })), a = fe();
  if (e == null && (s.search = a.search, s.hash = a.hash, i.route.index)) {
    let u = new URLSearchParams(s.search);
    u.delete("index"), s.search = u.toString() ? "?" + u.toString() : "";
  }
  return (!e || e === ".") && i.route.index && (s.search = s.search ? s.search.replace(/^\?/, "?index&") : "?index"), n !== "/" && (s.pathname = s.pathname === "/" ? n : ue([n, s.pathname])), Le(s);
}
function Ih(e) {
  b.useEffect(() => (window.addEventListener("beforeunload", e), () => {
    window.removeEventListener("beforeunload", e);
  }), [e]);
}
function Fa(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
var Ma = typeof global == "object" && global && global.Object === Object && global;
const ni = Ma;
var Ba = typeof self == "object" && self && self.Object === Object && self, Va = ni || Ba || Function("return this")();
const Q = Va;
var ka = Q.Symbol;
const ge = ka;
var oi = Object.prototype, Ha = oi.hasOwnProperty, Wa = oi.toString, ke = ge ? ge.toStringTag : void 0;
function qa(e) {
  var t = Ha.call(e, ke), r = e[ke];
  try {
    e[ke] = void 0;
    var n = !0;
  } catch {
  }
  var o = Wa.call(e);
  return n && (t ? e[ke] = r : delete e[ke]), o;
}
var za = Object.prototype, Ga = za.toString;
function Ja(e) {
  return Ga.call(e);
}
var Ka = "[object Null]", Ya = "[object Undefined]", qn = ge ? ge.toStringTag : void 0;
function xe(e) {
  return e == null ? e === void 0 ? Ya : Ka : qn && qn in Object(e) ? qa(e) : Ja(e);
}
function ye(e) {
  return e != null && typeof e == "object";
}
var Xa = "[object Symbol]";
function $t(e) {
  return typeof e == "symbol" || ye(e) && xe(e) == Xa;
}
function Za(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, o = Array(n); ++r < n; )
    o[r] = t(e[r], r, e);
  return o;
}
var Qa = Array.isArray;
const Y = Qa;
var eu = 1 / 0, zn = ge ? ge.prototype : void 0, Gn = zn ? zn.toString : void 0;
function ii(e) {
  if (typeof e == "string")
    return e;
  if (Y(e))
    return Za(e, ii) + "";
  if ($t(e))
    return Gn ? Gn.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -eu ? "-0" : t;
}
var tu = /\s/;
function ru(e) {
  for (var t = e.length; t-- && tu.test(e.charAt(t)); )
    ;
  return t;
}
var nu = /^\s+/;
function ou(e) {
  return e && e.slice(0, ru(e) + 1).replace(nu, "");
}
function X(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var Jn = 0 / 0, iu = /^[-+]0x[0-9a-f]+$/i, su = /^0b[01]+$/i, au = /^0o[0-7]+$/i, uu = parseInt;
function Kn(e) {
  if (typeof e == "number")
    return e;
  if ($t(e))
    return Jn;
  if (X(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = X(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = ou(e);
  var r = su.test(e);
  return r || au.test(e) ? uu(e.slice(2), r ? 2 : 8) : iu.test(e) ? Jn : +e;
}
function Wr(e) {
  return e;
}
var cu = "[object AsyncFunction]", lu = "[object Function]", fu = "[object GeneratorFunction]", du = "[object Proxy]";
function qr(e) {
  if (!X(e))
    return !1;
  var t = xe(e);
  return t == lu || t == fu || t == cu || t == du;
}
var pu = Q["__core-js_shared__"];
const rr = pu;
var Yn = function() {
  var e = /[^.]+$/.exec(rr && rr.keys && rr.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function hu(e) {
  return !!Yn && Yn in e;
}
var mu = Function.prototype, vu = mu.toString;
function Pe(e) {
  if (e != null) {
    try {
      return vu.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var gu = /[\\^$.*+?()[\]{}|]/g, yu = /^\[object .+?Constructor\]$/, bu = Function.prototype, Eu = Object.prototype, wu = bu.toString, _u = Eu.hasOwnProperty, Su = RegExp(
  "^" + wu.call(_u).replace(gu, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Ou(e) {
  if (!X(e) || hu(e))
    return !1;
  var t = qr(e) ? Su : yu;
  return t.test(Pe(e));
}
function Ru(e, t) {
  return e == null ? void 0 : e[t];
}
function Te(e, t) {
  var r = Ru(e, t);
  return Ou(r) ? r : void 0;
}
var xu = Te(Q, "WeakMap");
const Er = xu;
var Xn = Object.create, Pu = function() {
  function e() {
  }
  return function(t) {
    if (!X(t))
      return {};
    if (Xn)
      return Xn(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}();
const Tu = Pu;
function Cu(e, t, r) {
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
function Au() {
}
function Nu(e, t) {
  var r = -1, n = e.length;
  for (t || (t = Array(n)); ++r < n; )
    t[r] = e[r];
  return t;
}
var Du = 800, $u = 16, Lu = Date.now;
function Iu(e) {
  var t = 0, r = 0;
  return function() {
    var n = Lu(), o = $u - (n - r);
    if (r = n, o > 0) {
      if (++t >= Du)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function ju(e) {
  return function() {
    return e;
  };
}
var Uu = function() {
  try {
    var e = Te(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
const Et = Uu;
var Fu = Et ? function(e, t) {
  return Et(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: ju(t),
    writable: !0
  });
} : Wr;
const Mu = Fu;
var Bu = Iu(Mu);
const Vu = Bu;
function ku(e, t, r, n) {
  for (var o = e.length, i = r + (n ? 1 : -1); n ? i-- : ++i < o; )
    if (t(e[i], i, e))
      return i;
  return -1;
}
function Hu(e) {
  return e !== e;
}
function Wu(e, t, r) {
  for (var n = r - 1, o = e.length; ++n < o; )
    if (e[n] === t)
      return n;
  return -1;
}
function qu(e, t, r) {
  return t === t ? Wu(e, t, r) : ku(e, Hu, r);
}
function zu(e, t) {
  var r = e == null ? 0 : e.length;
  return !!r && qu(e, t, 0) > -1;
}
var Gu = 9007199254740991, Ju = /^(?:0|[1-9]\d*)$/;
function zr(e, t) {
  var r = typeof e;
  return t = t ?? Gu, !!t && (r == "number" || r != "symbol" && Ju.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function Lt(e, t, r) {
  t == "__proto__" && Et ? Et(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
function tt(e, t) {
  return e === t || e !== e && t !== t;
}
var Ku = Object.prototype, Yu = Ku.hasOwnProperty;
function Xu(e, t, r) {
  var n = e[t];
  (!(Yu.call(e, t) && tt(n, r)) || r === void 0 && !(t in e)) && Lt(e, t, r);
}
function Zu(e, t, r, n) {
  var o = !r;
  r || (r = {});
  for (var i = -1, s = t.length; ++i < s; ) {
    var a = t[i], u = n ? n(r[a], e[a], a, r, e) : void 0;
    u === void 0 && (u = e[a]), o ? Lt(r, a, u) : Xu(r, a, u);
  }
  return r;
}
var Zn = Math.max;
function Qu(e, t, r) {
  return t = Zn(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var n = arguments, o = -1, i = Zn(n.length - t, 0), s = Array(i); ++o < i; )
      s[o] = n[t + o];
    o = -1;
    for (var a = Array(t + 1); ++o < t; )
      a[o] = n[o];
    return a[t] = r(s), Cu(e, this, a);
  };
}
function ec(e, t) {
  return Vu(Qu(e, t, Wr), e + "");
}
var tc = 9007199254740991;
function Gr(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= tc;
}
function It(e) {
  return e != null && Gr(e.length) && !qr(e);
}
function rc(e, t, r) {
  if (!X(r))
    return !1;
  var n = typeof t;
  return (n == "number" ? It(r) && zr(t, r.length) : n == "string" && t in r) ? tt(r[t], e) : !1;
}
function nc(e) {
  return ec(function(t, r) {
    var n = -1, o = r.length, i = o > 1 ? r[o - 1] : void 0, s = o > 2 ? r[2] : void 0;
    for (i = e.length > 3 && typeof i == "function" ? (o--, i) : void 0, s && rc(r[0], r[1], s) && (i = o < 3 ? void 0 : i, o = 1), t = Object(t); ++n < o; ) {
      var a = r[n];
      a && e(t, a, n, i);
    }
    return t;
  });
}
var oc = Object.prototype;
function Jr(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || oc;
  return e === r;
}
function ic(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var sc = "[object Arguments]";
function Qn(e) {
  return ye(e) && xe(e) == sc;
}
var si = Object.prototype, ac = si.hasOwnProperty, uc = si.propertyIsEnumerable, cc = Qn(function() {
  return arguments;
}()) ? Qn : function(e) {
  return ye(e) && ac.call(e, "callee") && !uc.call(e, "callee");
};
const wt = cc;
function lc() {
  return !1;
}
var ai = typeof exports == "object" && exports && !exports.nodeType && exports, eo = ai && typeof module == "object" && module && !module.nodeType && module, fc = eo && eo.exports === ai, to = fc ? Q.Buffer : void 0, dc = to ? to.isBuffer : void 0, pc = dc || lc;
const _t = pc;
var hc = "[object Arguments]", mc = "[object Array]", vc = "[object Boolean]", gc = "[object Date]", yc = "[object Error]", bc = "[object Function]", Ec = "[object Map]", wc = "[object Number]", _c = "[object Object]", Sc = "[object RegExp]", Oc = "[object Set]", Rc = "[object String]", xc = "[object WeakMap]", Pc = "[object ArrayBuffer]", Tc = "[object DataView]", Cc = "[object Float32Array]", Ac = "[object Float64Array]", Nc = "[object Int8Array]", Dc = "[object Int16Array]", $c = "[object Int32Array]", Lc = "[object Uint8Array]", Ic = "[object Uint8ClampedArray]", jc = "[object Uint16Array]", Uc = "[object Uint32Array]", j = {};
j[Cc] = j[Ac] = j[Nc] = j[Dc] = j[$c] = j[Lc] = j[Ic] = j[jc] = j[Uc] = !0;
j[hc] = j[mc] = j[Pc] = j[vc] = j[Tc] = j[gc] = j[yc] = j[bc] = j[Ec] = j[wc] = j[_c] = j[Sc] = j[Oc] = j[Rc] = j[xc] = !1;
function Fc(e) {
  return ye(e) && Gr(e.length) && !!j[xe(e)];
}
function Mc(e) {
  return function(t) {
    return e(t);
  };
}
var ui = typeof exports == "object" && exports && !exports.nodeType && exports, qe = ui && typeof module == "object" && module && !module.nodeType && module, Bc = qe && qe.exports === ui, nr = Bc && ni.process, Vc = function() {
  try {
    var e = qe && qe.require && qe.require("util").types;
    return e || nr && nr.binding && nr.binding("util");
  } catch {
  }
}();
const ro = Vc;
var no = ro && ro.isTypedArray, kc = no ? Mc(no) : Fc;
const Kr = kc;
var Hc = Object.prototype, Wc = Hc.hasOwnProperty;
function ci(e, t) {
  var r = Y(e), n = !r && wt(e), o = !r && !n && _t(e), i = !r && !n && !o && Kr(e), s = r || n || o || i, a = s ? ic(e.length, String) : [], u = a.length;
  for (var l in e)
    (t || Wc.call(e, l)) && !(s && (l == "length" || o && (l == "offset" || l == "parent") || i && (l == "buffer" || l == "byteLength" || l == "byteOffset") || zr(l, u))) && a.push(l);
  return a;
}
function li(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var qc = li(Object.keys, Object);
const zc = qc;
var Gc = Object.prototype, Jc = Gc.hasOwnProperty;
function Kc(e) {
  if (!Jr(e))
    return zc(e);
  var t = [];
  for (var r in Object(e))
    Jc.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
function Yr(e) {
  return It(e) ? ci(e) : Kc(e);
}
function Yc(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var Xc = Object.prototype, Zc = Xc.hasOwnProperty;
function Qc(e) {
  if (!X(e))
    return Yc(e);
  var t = Jr(e), r = [];
  for (var n in e)
    n == "constructor" && (t || !Zc.call(e, n)) || r.push(n);
  return r;
}
function fi(e) {
  return It(e) ? ci(e, !0) : Qc(e);
}
var el = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, tl = /^\w*$/;
function Xr(e, t) {
  if (Y(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || $t(e) ? !0 : tl.test(e) || !el.test(e) || t != null && e in Object(t);
}
var rl = Te(Object, "create");
const ze = rl;
function nl() {
  this.__data__ = ze ? ze(null) : {}, this.size = 0;
}
function ol(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var il = "__lodash_hash_undefined__", sl = Object.prototype, al = sl.hasOwnProperty;
function ul(e) {
  var t = this.__data__;
  if (ze) {
    var r = t[e];
    return r === il ? void 0 : r;
  }
  return al.call(t, e) ? t[e] : void 0;
}
var cl = Object.prototype, ll = cl.hasOwnProperty;
function fl(e) {
  var t = this.__data__;
  return ze ? t[e] !== void 0 : ll.call(t, e);
}
var dl = "__lodash_hash_undefined__";
function pl(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = ze && t === void 0 ? dl : t, this;
}
function Oe(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Oe.prototype.clear = nl;
Oe.prototype.delete = ol;
Oe.prototype.get = ul;
Oe.prototype.has = fl;
Oe.prototype.set = pl;
function hl() {
  this.__data__ = [], this.size = 0;
}
function jt(e, t) {
  for (var r = e.length; r--; )
    if (tt(e[r][0], t))
      return r;
  return -1;
}
var ml = Array.prototype, vl = ml.splice;
function gl(e) {
  var t = this.__data__, r = jt(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : vl.call(t, r, 1), --this.size, !0;
}
function yl(e) {
  var t = this.__data__, r = jt(t, e);
  return r < 0 ? void 0 : t[r][1];
}
function bl(e) {
  return jt(this.__data__, e) > -1;
}
function El(e, t) {
  var r = this.__data__, n = jt(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
function de(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
de.prototype.clear = hl;
de.prototype.delete = gl;
de.prototype.get = yl;
de.prototype.has = bl;
de.prototype.set = El;
var wl = Te(Q, "Map");
const Ge = wl;
function _l() {
  this.size = 0, this.__data__ = {
    hash: new Oe(),
    map: new (Ge || de)(),
    string: new Oe()
  };
}
function Sl(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function Ut(e, t) {
  var r = e.__data__;
  return Sl(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
function Ol(e) {
  var t = Ut(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function Rl(e) {
  return Ut(this, e).get(e);
}
function xl(e) {
  return Ut(this, e).has(e);
}
function Pl(e, t) {
  var r = Ut(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
function pe(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
pe.prototype.clear = _l;
pe.prototype.delete = Ol;
pe.prototype.get = Rl;
pe.prototype.has = xl;
pe.prototype.set = Pl;
var Tl = "Expected a function";
function Zr(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Tl);
  var r = function() {
    var n = arguments, o = t ? t.apply(this, n) : n[0], i = r.cache;
    if (i.has(o))
      return i.get(o);
    var s = e.apply(this, n);
    return r.cache = i.set(o, s) || i, s;
  };
  return r.cache = new (Zr.Cache || pe)(), r;
}
Zr.Cache = pe;
var Cl = 500;
function Al(e) {
  var t = Zr(e, function(n) {
    return r.size === Cl && r.clear(), n;
  }), r = t.cache;
  return t;
}
var Nl = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Dl = /\\(\\)?/g, $l = Al(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(Nl, function(r, n, o, i) {
    t.push(o ? i.replace(Dl, "$1") : n || r);
  }), t;
});
const Ll = $l;
function Il(e) {
  return e == null ? "" : ii(e);
}
function di(e, t) {
  return Y(e) ? e : Xr(e, t) ? [e] : Ll(Il(e));
}
var jl = 1 / 0;
function Ft(e) {
  if (typeof e == "string" || $t(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -jl ? "-0" : t;
}
function pi(e, t) {
  t = di(t, e);
  for (var r = 0, n = t.length; e != null && r < n; )
    e = e[Ft(t[r++])];
  return r && r == n ? e : void 0;
}
function Ul(e, t, r) {
  var n = e == null ? void 0 : pi(e, t);
  return n === void 0 ? r : n;
}
function Fl(e, t) {
  for (var r = -1, n = t.length, o = e.length; ++r < n; )
    e[o + r] = t[r];
  return e;
}
var Ml = li(Object.getPrototypeOf, Object);
const hi = Ml;
var Bl = "[object Object]", Vl = Function.prototype, kl = Object.prototype, mi = Vl.toString, Hl = kl.hasOwnProperty, Wl = mi.call(Object);
function ql(e) {
  if (!ye(e) || xe(e) != Bl)
    return !1;
  var t = hi(e);
  if (t === null)
    return !0;
  var r = Hl.call(t, "constructor") && t.constructor;
  return typeof r == "function" && r instanceof r && mi.call(r) == Wl;
}
function zl() {
  this.__data__ = new de(), this.size = 0;
}
function Gl(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
function Jl(e) {
  return this.__data__.get(e);
}
function Kl(e) {
  return this.__data__.has(e);
}
var Yl = 200;
function Xl(e, t) {
  var r = this.__data__;
  if (r instanceof de) {
    var n = r.__data__;
    if (!Ge || n.length < Yl - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new pe(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
function ne(e) {
  var t = this.__data__ = new de(e);
  this.size = t.size;
}
ne.prototype.clear = zl;
ne.prototype.delete = Gl;
ne.prototype.get = Jl;
ne.prototype.has = Kl;
ne.prototype.set = Xl;
var vi = typeof exports == "object" && exports && !exports.nodeType && exports, oo = vi && typeof module == "object" && module && !module.nodeType && module, Zl = oo && oo.exports === vi, io = Zl ? Q.Buffer : void 0, so = io ? io.allocUnsafe : void 0;
function Ql(e, t) {
  if (t)
    return e.slice();
  var r = e.length, n = so ? so(r) : new e.constructor(r);
  return e.copy(n), n;
}
function ef(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, o = 0, i = []; ++r < n; ) {
    var s = e[r];
    t(s, r, e) && (i[o++] = s);
  }
  return i;
}
function tf() {
  return [];
}
var rf = Object.prototype, nf = rf.propertyIsEnumerable, ao = Object.getOwnPropertySymbols, of = ao ? function(e) {
  return e == null ? [] : (e = Object(e), ef(ao(e), function(t) {
    return nf.call(e, t);
  }));
} : tf;
const sf = of;
function af(e, t, r) {
  var n = t(e);
  return Y(e) ? n : Fl(n, r(e));
}
function uo(e) {
  return af(e, Yr, sf);
}
var uf = Te(Q, "DataView");
const wr = uf;
var cf = Te(Q, "Promise");
const _r = cf;
var lf = Te(Q, "Set");
const $e = lf;
var co = "[object Map]", ff = "[object Object]", lo = "[object Promise]", fo = "[object Set]", po = "[object WeakMap]", ho = "[object DataView]", df = Pe(wr), pf = Pe(Ge), hf = Pe(_r), mf = Pe($e), vf = Pe(Er), Ee = xe;
(wr && Ee(new wr(new ArrayBuffer(1))) != ho || Ge && Ee(new Ge()) != co || _r && Ee(_r.resolve()) != lo || $e && Ee(new $e()) != fo || Er && Ee(new Er()) != po) && (Ee = function(e) {
  var t = xe(e), r = t == ff ? e.constructor : void 0, n = r ? Pe(r) : "";
  if (n)
    switch (n) {
      case df:
        return ho;
      case pf:
        return co;
      case hf:
        return lo;
      case mf:
        return fo;
      case vf:
        return po;
    }
  return t;
});
const mo = Ee;
var gf = Q.Uint8Array;
const St = gf;
function yf(e) {
  var t = new e.constructor(e.byteLength);
  return new St(t).set(new St(e)), t;
}
function bf(e, t) {
  var r = t ? yf(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
function Ef(e) {
  return typeof e.constructor == "function" && !Jr(e) ? Tu(hi(e)) : {};
}
var wf = "__lodash_hash_undefined__";
function _f(e) {
  return this.__data__.set(e, wf), this;
}
function Sf(e) {
  return this.__data__.has(e);
}
function Je(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.__data__ = new pe(); ++t < r; )
    this.add(e[t]);
}
Je.prototype.add = Je.prototype.push = _f;
Je.prototype.has = Sf;
function Of(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
    if (t(e[r], r, e))
      return !0;
  return !1;
}
function gi(e, t) {
  return e.has(t);
}
var Rf = 1, xf = 2;
function yi(e, t, r, n, o, i) {
  var s = r & Rf, a = e.length, u = t.length;
  if (a != u && !(s && u > a))
    return !1;
  var l = i.get(e), f = i.get(t);
  if (l && f)
    return l == t && f == e;
  var d = -1, p = !0, g = r & xf ? new Je() : void 0;
  for (i.set(e, t), i.set(t, e); ++d < a; ) {
    var v = e[d], h = t[d];
    if (n)
      var S = s ? n(h, v, d, t, e, i) : n(v, h, d, e, t, i);
    if (S !== void 0) {
      if (S)
        continue;
      p = !1;
      break;
    }
    if (g) {
      if (!Of(t, function(w, D) {
        if (!gi(g, D) && (v === w || o(v, w, r, n, i)))
          return g.push(D);
      })) {
        p = !1;
        break;
      }
    } else if (!(v === h || o(v, h, r, n, i))) {
      p = !1;
      break;
    }
  }
  return i.delete(e), i.delete(t), p;
}
function Pf(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n, o) {
    r[++t] = [o, n];
  }), r;
}
function Qr(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n) {
    r[++t] = n;
  }), r;
}
var Tf = 1, Cf = 2, Af = "[object Boolean]", Nf = "[object Date]", Df = "[object Error]", $f = "[object Map]", Lf = "[object Number]", If = "[object RegExp]", jf = "[object Set]", Uf = "[object String]", Ff = "[object Symbol]", Mf = "[object ArrayBuffer]", Bf = "[object DataView]", vo = ge ? ge.prototype : void 0, or = vo ? vo.valueOf : void 0;
function Vf(e, t, r, n, o, i, s) {
  switch (r) {
    case Bf:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case Mf:
      return !(e.byteLength != t.byteLength || !i(new St(e), new St(t)));
    case Af:
    case Nf:
    case Lf:
      return tt(+e, +t);
    case Df:
      return e.name == t.name && e.message == t.message;
    case If:
    case Uf:
      return e == t + "";
    case $f:
      var a = Pf;
    case jf:
      var u = n & Tf;
      if (a || (a = Qr), e.size != t.size && !u)
        return !1;
      var l = s.get(e);
      if (l)
        return l == t;
      n |= Cf, s.set(e, t);
      var f = yi(a(e), a(t), n, o, i, s);
      return s.delete(e), f;
    case Ff:
      if (or)
        return or.call(e) == or.call(t);
  }
  return !1;
}
var kf = 1, Hf = Object.prototype, Wf = Hf.hasOwnProperty;
function qf(e, t, r, n, o, i) {
  var s = r & kf, a = uo(e), u = a.length, l = uo(t), f = l.length;
  if (u != f && !s)
    return !1;
  for (var d = u; d--; ) {
    var p = a[d];
    if (!(s ? p in t : Wf.call(t, p)))
      return !1;
  }
  var g = i.get(e), v = i.get(t);
  if (g && v)
    return g == t && v == e;
  var h = !0;
  i.set(e, t), i.set(t, e);
  for (var S = s; ++d < u; ) {
    p = a[d];
    var w = e[p], D = t[p];
    if (n)
      var O = s ? n(D, w, p, t, e, i) : n(w, D, p, e, t, i);
    if (!(O === void 0 ? w === D || o(w, D, r, n, i) : O)) {
      h = !1;
      break;
    }
    S || (S = p == "constructor");
  }
  if (h && !S) {
    var _ = e.constructor, T = t.constructor;
    _ != T && "constructor" in e && "constructor" in t && !(typeof _ == "function" && _ instanceof _ && typeof T == "function" && T instanceof T) && (h = !1);
  }
  return i.delete(e), i.delete(t), h;
}
var zf = 1, go = "[object Arguments]", yo = "[object Array]", ut = "[object Object]", Gf = Object.prototype, bo = Gf.hasOwnProperty;
function Jf(e, t, r, n, o, i) {
  var s = Y(e), a = Y(t), u = s ? yo : mo(e), l = a ? yo : mo(t);
  u = u == go ? ut : u, l = l == go ? ut : l;
  var f = u == ut, d = l == ut, p = u == l;
  if (p && _t(e)) {
    if (!_t(t))
      return !1;
    s = !0, f = !1;
  }
  if (p && !f)
    return i || (i = new ne()), s || Kr(e) ? yi(e, t, r, n, o, i) : Vf(e, t, u, r, n, o, i);
  if (!(r & zf)) {
    var g = f && bo.call(e, "__wrapped__"), v = d && bo.call(t, "__wrapped__");
    if (g || v) {
      var h = g ? e.value() : e, S = v ? t.value() : t;
      return i || (i = new ne()), o(h, S, r, n, i);
    }
  }
  return p ? (i || (i = new ne()), qf(e, t, r, n, o, i)) : !1;
}
function en(e, t, r, n, o) {
  return e === t ? !0 : e == null || t == null || !ye(e) && !ye(t) ? e !== e && t !== t : Jf(e, t, r, n, en, o);
}
var Kf = 1, Yf = 2;
function Xf(e, t, r, n) {
  var o = r.length, i = o, s = !n;
  if (e == null)
    return !i;
  for (e = Object(e); o--; ) {
    var a = r[o];
    if (s && a[2] ? a[1] !== e[a[0]] : !(a[0] in e))
      return !1;
  }
  for (; ++o < i; ) {
    a = r[o];
    var u = a[0], l = e[u], f = a[1];
    if (s && a[2]) {
      if (l === void 0 && !(u in e))
        return !1;
    } else {
      var d = new ne();
      if (n)
        var p = n(l, f, u, e, t, d);
      if (!(p === void 0 ? en(f, l, Kf | Yf, n, d) : p))
        return !1;
    }
  }
  return !0;
}
function bi(e) {
  return e === e && !X(e);
}
function Zf(e) {
  for (var t = Yr(e), r = t.length; r--; ) {
    var n = t[r], o = e[n];
    t[r] = [n, o, bi(o)];
  }
  return t;
}
function Ei(e, t) {
  return function(r) {
    return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
  };
}
function Qf(e) {
  var t = Zf(e);
  return t.length == 1 && t[0][2] ? Ei(t[0][0], t[0][1]) : function(r) {
    return r === e || Xf(r, e, t);
  };
}
function ed(e, t) {
  return e != null && t in Object(e);
}
function td(e, t, r) {
  t = di(t, e);
  for (var n = -1, o = t.length, i = !1; ++n < o; ) {
    var s = Ft(t[n]);
    if (!(i = e != null && r(e, s)))
      break;
    e = e[s];
  }
  return i || ++n != o ? i : (o = e == null ? 0 : e.length, !!o && Gr(o) && zr(s, o) && (Y(e) || wt(e)));
}
function rd(e, t) {
  return e != null && td(e, t, ed);
}
var nd = 1, od = 2;
function id(e, t) {
  return Xr(e) && bi(t) ? Ei(Ft(e), t) : function(r) {
    var n = Ul(r, e);
    return n === void 0 && n === t ? rd(r, e) : en(t, n, nd | od);
  };
}
function sd(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function ad(e) {
  return function(t) {
    return pi(t, e);
  };
}
function ud(e) {
  return Xr(e) ? sd(Ft(e)) : ad(e);
}
function wi(e) {
  return typeof e == "function" ? e : e == null ? Wr : typeof e == "object" ? Y(e) ? id(e[0], e[1]) : Qf(e) : ud(e);
}
function cd(e) {
  return function(t, r, n) {
    for (var o = -1, i = Object(t), s = n(t), a = s.length; a--; ) {
      var u = s[e ? a : ++o];
      if (r(i[u], u, i) === !1)
        break;
    }
    return t;
  };
}
var ld = cd();
const _i = ld;
function fd(e, t) {
  return e && _i(e, t, Yr);
}
var dd = function() {
  return Q.Date.now();
};
const ir = dd;
var pd = "Expected a function", hd = Math.max, md = Math.min;
function vd(e, t, r) {
  var n, o, i, s, a, u, l = 0, f = !1, d = !1, p = !0;
  if (typeof e != "function")
    throw new TypeError(pd);
  t = Kn(t) || 0, X(r) && (f = !!r.leading, d = "maxWait" in r, i = d ? hd(Kn(r.maxWait) || 0, t) : i, p = "trailing" in r ? !!r.trailing : p);
  function g(R) {
    var U = n, $ = o;
    return n = o = void 0, l = R, s = e.apply($, U), s;
  }
  function v(R) {
    return l = R, a = setTimeout(w, t), f ? g(R) : s;
  }
  function h(R) {
    var U = R - u, $ = R - l, F = t - U;
    return d ? md(F, i - $) : F;
  }
  function S(R) {
    var U = R - u, $ = R - l;
    return u === void 0 || U >= t || U < 0 || d && $ >= i;
  }
  function w() {
    var R = ir();
    if (S(R))
      return D(R);
    a = setTimeout(w, h(R));
  }
  function D(R) {
    return a = void 0, p && n ? g(R) : (n = o = void 0, s);
  }
  function O() {
    a !== void 0 && clearTimeout(a), l = 0, n = u = o = a = void 0;
  }
  function _() {
    return a === void 0 ? s : D(ir());
  }
  function T() {
    var R = ir(), U = S(R);
    if (n = arguments, o = this, u = R, U) {
      if (a === void 0)
        return v(u);
      if (d)
        return clearTimeout(a), a = setTimeout(w, t), g(u);
    }
    return a === void 0 && (a = setTimeout(w, t)), s;
  }
  return T.cancel = O, T.flush = _, T;
}
function Sr(e, t, r) {
  (r !== void 0 && !tt(e[t], r) || r === void 0 && !(t in e)) && Lt(e, t, r);
}
function gd(e) {
  return ye(e) && It(e);
}
function Or(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function yd(e) {
  return Zu(e, fi(e));
}
function bd(e, t, r, n, o, i, s) {
  var a = Or(e, r), u = Or(t, r), l = s.get(u);
  if (l) {
    Sr(e, r, l);
    return;
  }
  var f = i ? i(a, u, r + "", e, t, s) : void 0, d = f === void 0;
  if (d) {
    var p = Y(u), g = !p && _t(u), v = !p && !g && Kr(u);
    f = u, p || g || v ? Y(a) ? f = a : gd(a) ? f = Nu(a) : g ? (d = !1, f = Ql(u, !0)) : v ? (d = !1, f = bf(u, !0)) : f = [] : ql(u) || wt(u) ? (f = a, wt(a) ? f = yd(a) : (!X(a) || qr(a)) && (f = Ef(u))) : d = !1;
  }
  d && (s.set(u, f), o(f, u, n, i, s), s.delete(u)), Sr(e, r, f);
}
function Si(e, t, r, n, o) {
  e !== t && _i(t, function(i, s) {
    if (o || (o = new ne()), X(i))
      bd(e, t, s, r, Si, n, o);
    else {
      var a = n ? n(Or(e, s), i, s + "", e, t, o) : void 0;
      a === void 0 && (a = i), Sr(e, s, a);
    }
  }, fi);
}
function Ed(e, t, r) {
  for (var n = -1, o = e == null ? 0 : e.length; ++n < o; )
    if (r(t, e[n]))
      return !0;
  return !1;
}
function wd(e, t) {
  var r = {};
  return t = wi(t), fd(e, function(n, o, i) {
    Lt(r, o, t(n, o, i));
  }), r;
}
var _d = nc(function(e, t, r) {
  Si(e, t, r);
});
const Sd = _d;
var Od = 1 / 0, Rd = $e && 1 / Qr(new $e([, -0]))[1] == Od ? function(e) {
  return new $e(e);
} : Au;
const xd = Rd;
var Pd = 200;
function Td(e, t, r) {
  var n = -1, o = zu, i = e.length, s = !0, a = [], u = a;
  if (r)
    s = !1, o = Ed;
  else if (i >= Pd) {
    var l = t ? null : xd(e);
    if (l)
      return Qr(l);
    s = !1, o = gi, u = new Je();
  } else
    u = t ? [] : a;
  e:
    for (; ++n < i; ) {
      var f = e[n], d = t ? t(f) : f;
      if (f = r || f !== 0 ? f : 0, s && d === d) {
        for (var p = u.length; p--; )
          if (u[p] === d)
            continue e;
        t && u.push(d), a.push(f);
      } else
        o(u, d, r) || (u !== a && u.push(d), a.push(f));
    }
  return a;
}
function Cd(e, t) {
  return e && e.length ? Td(e, wi(t)) : [];
}
var Rr = /* @__PURE__ */ ((e) => (e.Json = "application/json", e.UrlEncoded = "application/x-www-form-urlencoded", e))(Rr || {});
class Ad {
  constructor() {
    G(this, "listeners");
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
      const i = (n = this.listeners[t]) == null ? void 0 : n.findIndex((s) => s === r);
      i && i > -1 && ((o = this.listeners[t]) == null || o.splice(i, 1));
    } else
      throw new Error(`${this} is doesn't have event "${String(t)}"`);
  }
}
function Eo(e) {
  for (const t in e)
    Object.prototype.hasOwnProperty.call(e, t) && e[t] === void 0 && delete e[t];
  return e;
}
function jh(e) {
  for (const t in e)
    Object.prototype.hasOwnProperty.call(e, t) && delete e[t];
  return e;
}
function Uh(e) {
  for (const t in e)
    Object.prototype.hasOwnProperty.call(e, t) && (e[t] = void 0);
  return e;
}
const Fh = /(^[0-9]{9,16}$)\b/g, Mh = /^[a-z0-9\-\d@._]+$/, Bh = /^(?=.*[a-z])(?=.*?[A-Z])(?=.*[@$!%*#?&])[a-zA-Z@$!%*#?&\d]{8,32}$/g;
function Vh(e) {
  return !/[^\x00-\x7F]/.test(e);
}
const xr = (e, t = "", r = new FormData()) => (Object.keys(e).forEach((n) => {
  const o = t !== "" ? t + "." + n : n, i = e[n];
  Array.isArray(i) ? i.forEach((s, a) => {
    typeof s == "object" ? s instanceof File ? r.append(o, s) : r = xr(s, o + `[${a}]`, r) : r.append(o, s);
  }) : typeof i == "object" ? i instanceof File ? r.append(o, i) : r = xr(i, o, r) : r.append(o, i);
}), r), Ot = (e, t = "", r = new URLSearchParams()) => (Object.keys(e).forEach((n) => {
  const o = t !== "" ? t + "." + n : n, i = e[n];
  Array.isArray(i) ? i.forEach((s, a) => {
    typeof s == "object" ? r = Ot(s, o + `[${a}]`, r) : r.append(o, s);
  }) : typeof i == "object" ? r = Ot(i, o, r) : r.append(o, i);
}), r);
class Nd {
  getToken(t) {
    return localStorage.getItem(t) || "";
  }
  setToken(t, r) {
    return localStorage.setItem(t, r);
  }
}
const dt = new Nd();
function kh(e, t) {
  return new Proxy(e, {
    set(r, n, o) {
      return r[n] = o, t(r), !0;
    }
  });
}
function wo(e) {
  let t = "";
  const r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n = r.length;
  for (let o = 0; o < e; o++)
    t += r.charAt(Math.floor(Math.random() * n));
  return t;
}
function Oi(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Ri } = Object.prototype, { getPrototypeOf: tn } = Object, rn = ((e) => (t) => {
  const r = Ri.call(t);
  return e[r] || (e[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), he = (e) => (e = e.toLowerCase(), (t) => rn(t) === e), Mt = (e) => (t) => typeof t === e, { isArray: Me } = Array, Ke = Mt("undefined");
function Dd(e) {
  return e !== null && !Ke(e) && e.constructor !== null && !Ke(e.constructor) && Re(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const xi = he("ArrayBuffer");
function $d(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && xi(e.buffer), t;
}
const Ld = Mt("string"), Re = Mt("function"), Pi = Mt("number"), nn = (e) => e !== null && typeof e == "object", Id = (e) => e === !0 || e === !1, pt = (e) => {
  if (rn(e) !== "object")
    return !1;
  const t = tn(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, jd = he("Date"), Ud = he("File"), Fd = he("Blob"), Md = he("FileList"), Bd = (e) => nn(e) && Re(e.pipe), Vd = (e) => {
  const t = "[object FormData]";
  return e && (typeof FormData == "function" && e instanceof FormData || Ri.call(e) === t || Re(e.toString) && e.toString() === t);
}, kd = he("URLSearchParams"), Hd = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function rt(e, t, { allOwnKeys: r = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let n, o;
  if (typeof e != "object" && (e = [e]), Me(e))
    for (n = 0, o = e.length; n < o; n++)
      t.call(null, e[n], n, e);
  else {
    const i = r ? Object.getOwnPropertyNames(e) : Object.keys(e), s = i.length;
    let a;
    for (n = 0; n < s; n++)
      a = i[n], t.call(null, e[a], a, e);
  }
}
function Ti(e, t) {
  t = t.toLowerCase();
  const r = Object.keys(e);
  let n = r.length, o;
  for (; n-- > 0; )
    if (o = r[n], t === o.toLowerCase())
      return o;
  return null;
}
const Ci = typeof self > "u" ? typeof global > "u" ? globalThis : global : self, Ai = (e) => !Ke(e) && e !== Ci;
function Pr() {
  const { caseless: e } = Ai(this) && this || {}, t = {}, r = (n, o) => {
    const i = e && Ti(t, o) || o;
    pt(t[i]) && pt(n) ? t[i] = Pr(t[i], n) : pt(n) ? t[i] = Pr({}, n) : Me(n) ? t[i] = n.slice() : t[i] = n;
  };
  for (let n = 0, o = arguments.length; n < o; n++)
    arguments[n] && rt(arguments[n], r);
  return t;
}
const Wd = (e, t, r, { allOwnKeys: n } = {}) => (rt(t, (o, i) => {
  r && Re(o) ? e[i] = Oi(o, r) : e[i] = o;
}, { allOwnKeys: n }), e), qd = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), zd = (e, t, r, n) => {
  e.prototype = Object.create(t.prototype, n), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), r && Object.assign(e.prototype, r);
}, Gd = (e, t, r, n) => {
  let o, i, s;
  const a = {};
  if (t = t || {}, e == null)
    return t;
  do {
    for (o = Object.getOwnPropertyNames(e), i = o.length; i-- > 0; )
      s = o[i], (!n || n(s, e, t)) && !a[s] && (t[s] = e[s], a[s] = !0);
    e = r !== !1 && tn(e);
  } while (e && (!r || r(e, t)) && e !== Object.prototype);
  return t;
}, Jd = (e, t, r) => {
  e = String(e), (r === void 0 || r > e.length) && (r = e.length), r -= t.length;
  const n = e.indexOf(t, r);
  return n !== -1 && n === r;
}, Kd = (e) => {
  if (!e)
    return null;
  if (Me(e))
    return e;
  let t = e.length;
  if (!Pi(t))
    return null;
  const r = new Array(t);
  for (; t-- > 0; )
    r[t] = e[t];
  return r;
}, Yd = ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && tn(Uint8Array)), Xd = (e, t) => {
  const n = (e && e[Symbol.iterator]).call(e);
  let o;
  for (; (o = n.next()) && !o.done; ) {
    const i = o.value;
    t.call(e, i[0], i[1]);
  }
}, Zd = (e, t) => {
  let r;
  const n = [];
  for (; (r = e.exec(t)) !== null; )
    n.push(r);
  return n;
}, Qd = he("HTMLFormElement"), ep = (e) => e.toLowerCase().replace(
  /[_-\s]([a-z\d])(\w*)/g,
  function(r, n, o) {
    return n.toUpperCase() + o;
  }
), _o = (({ hasOwnProperty: e }) => (t, r) => e.call(t, r))(Object.prototype), tp = he("RegExp"), Ni = (e, t) => {
  const r = Object.getOwnPropertyDescriptors(e), n = {};
  rt(r, (o, i) => {
    t(o, i, e) !== !1 && (n[i] = o);
  }), Object.defineProperties(e, n);
}, rp = (e) => {
  Ni(e, (t, r) => {
    if (Re(e) && ["arguments", "caller", "callee"].indexOf(r) !== -1)
      return !1;
    const n = e[r];
    if (Re(n)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + r + "'");
      });
    }
  });
}, np = (e, t) => {
  const r = {}, n = (o) => {
    o.forEach((i) => {
      r[i] = !0;
    });
  };
  return Me(e) ? n(e) : n(String(e).split(t)), r;
}, op = () => {
}, ip = (e, t) => (e = +e, Number.isFinite(e) ? e : t), sp = (e) => {
  const t = new Array(10), r = (n, o) => {
    if (nn(n)) {
      if (t.indexOf(n) >= 0)
        return;
      if (!("toJSON" in n)) {
        t[o] = n;
        const i = Me(n) ? [] : {};
        return rt(n, (s, a) => {
          const u = r(s, o + 1);
          !Ke(u) && (i[a] = u);
        }), t[o] = void 0, i;
      }
    }
    return n;
  };
  return r(e, 0);
}, m = {
  isArray: Me,
  isArrayBuffer: xi,
  isBuffer: Dd,
  isFormData: Vd,
  isArrayBufferView: $d,
  isString: Ld,
  isNumber: Pi,
  isBoolean: Id,
  isObject: nn,
  isPlainObject: pt,
  isUndefined: Ke,
  isDate: jd,
  isFile: Ud,
  isBlob: Fd,
  isRegExp: tp,
  isFunction: Re,
  isStream: Bd,
  isURLSearchParams: kd,
  isTypedArray: Yd,
  isFileList: Md,
  forEach: rt,
  merge: Pr,
  extend: Wd,
  trim: Hd,
  stripBOM: qd,
  inherits: zd,
  toFlatObject: Gd,
  kindOf: rn,
  kindOfTest: he,
  endsWith: Jd,
  toArray: Kd,
  forEachEntry: Xd,
  matchAll: Zd,
  isHTMLForm: Qd,
  hasOwnProperty: _o,
  hasOwnProp: _o,
  reduceDescriptors: Ni,
  freezeMethods: rp,
  toObjectSet: np,
  toCamelCase: ep,
  noop: op,
  toFiniteNumber: ip,
  findKey: Ti,
  global: Ci,
  isContextDefined: Ai,
  toJSONObject: sp
};
function N(e, t, r, n, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), r && (this.config = r), n && (this.request = n), o && (this.response = o);
}
m.inherits(N, Error, {
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
      config: m.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const Di = N.prototype, $i = {};
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
  $i[e] = { value: e };
});
Object.defineProperties(N, $i);
Object.defineProperty(Di, "isAxiosError", { value: !0 });
N.from = (e, t, r, n, o, i) => {
  const s = Object.create(Di);
  return m.toFlatObject(e, s, function(u) {
    return u !== Error.prototype;
  }, (a) => a !== "isAxiosError"), N.call(s, e.message, t, r, n, o), s.cause = e, s.name = e.name, i && Object.assign(s, i), s;
};
var ap = typeof self == "object" ? self.FormData : window.FormData;
const up = ap;
function Tr(e) {
  return m.isPlainObject(e) || m.isArray(e);
}
function Li(e) {
  return m.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function So(e, t, r) {
  return e ? e.concat(t).map(function(o, i) {
    return o = Li(o), !r && i ? "[" + o + "]" : o;
  }).join(r ? "." : "") : t;
}
function cp(e) {
  return m.isArray(e) && !e.some(Tr);
}
const lp = m.toFlatObject(m, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function fp(e) {
  return e && m.isFunction(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator];
}
function Bt(e, t, r) {
  if (!m.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new (up || FormData)(), r = m.toFlatObject(r, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(h, S) {
    return !m.isUndefined(S[h]);
  });
  const n = r.metaTokens, o = r.visitor || f, i = r.dots, s = r.indexes, u = (r.Blob || typeof Blob < "u" && Blob) && fp(t);
  if (!m.isFunction(o))
    throw new TypeError("visitor must be a function");
  function l(v) {
    if (v === null)
      return "";
    if (m.isDate(v))
      return v.toISOString();
    if (!u && m.isBlob(v))
      throw new N("Blob is not supported. Use a Buffer instead.");
    return m.isArrayBuffer(v) || m.isTypedArray(v) ? u && typeof Blob == "function" ? new Blob([v]) : Buffer.from(v) : v;
  }
  function f(v, h, S) {
    let w = v;
    if (v && !S && typeof v == "object") {
      if (m.endsWith(h, "{}"))
        h = n ? h : h.slice(0, -2), v = JSON.stringify(v);
      else if (m.isArray(v) && cp(v) || m.isFileList(v) || m.endsWith(h, "[]") && (w = m.toArray(v)))
        return h = Li(h), w.forEach(function(O, _) {
          !(m.isUndefined(O) || O === null) && t.append(
            s === !0 ? So([h], _, i) : s === null ? h : h + "[]",
            l(O)
          );
        }), !1;
    }
    return Tr(v) ? !0 : (t.append(So(S, h, i), l(v)), !1);
  }
  const d = [], p = Object.assign(lp, {
    defaultVisitor: f,
    convertValue: l,
    isVisitable: Tr
  });
  function g(v, h) {
    if (!m.isUndefined(v)) {
      if (d.indexOf(v) !== -1)
        throw Error("Circular reference detected in " + h.join("."));
      d.push(v), m.forEach(v, function(w, D) {
        (!(m.isUndefined(w) || w === null) && o.call(
          t,
          w,
          m.isString(D) ? D.trim() : D,
          h,
          p
        )) === !0 && g(w, h ? h.concat(D) : [D]);
      }), d.pop();
    }
  }
  if (!m.isObject(e))
    throw new TypeError("data must be an object");
  return g(e), t;
}
function Oo(e) {
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
function on(e, t) {
  this._pairs = [], e && Bt(e, this, t);
}
const Ii = on.prototype;
Ii.append = function(t, r) {
  this._pairs.push([t, r]);
};
Ii.toString = function(t) {
  const r = t ? function(n) {
    return t.call(this, n, Oo);
  } : Oo;
  return this._pairs.map(function(o) {
    return r(o[0]) + "=" + r(o[1]);
  }, "").join("&");
};
function dp(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function ji(e, t, r) {
  if (!t)
    return e;
  const n = r && r.encode || dp, o = r && r.serialize;
  let i;
  if (o ? i = o(t, r) : i = m.isURLSearchParams(t) ? t.toString() : new on(t, r).toString(n), i) {
    const s = e.indexOf("#");
    s !== -1 && (e = e.slice(0, s)), e += (e.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return e;
}
class pp {
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
    m.forEach(this.handlers, function(n) {
      n !== null && t(n);
    });
  }
}
const Ro = pp, Ui = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, hp = typeof URLSearchParams < "u" ? URLSearchParams : on, mp = FormData, vp = (() => {
  let e;
  return typeof navigator < "u" && ((e = navigator.product) === "ReactNative" || e === "NativeScript" || e === "NS") ? !1 : typeof window < "u" && typeof document < "u";
})(), gp = (() => typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), re = {
  isBrowser: !0,
  classes: {
    URLSearchParams: hp,
    FormData: mp,
    Blob
  },
  isStandardBrowserEnv: vp,
  isStandardBrowserWebWorkerEnv: gp,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function yp(e, t) {
  return Bt(e, new re.classes.URLSearchParams(), Object.assign({
    visitor: function(r, n, o, i) {
      return re.isNode && m.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function bp(e) {
  return m.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function Ep(e) {
  const t = {}, r = Object.keys(e);
  let n;
  const o = r.length;
  let i;
  for (n = 0; n < o; n++)
    i = r[n], t[i] = e[i];
  return t;
}
function Fi(e) {
  function t(r, n, o, i) {
    let s = r[i++];
    const a = Number.isFinite(+s), u = i >= r.length;
    return s = !s && m.isArray(o) ? o.length : s, u ? (m.hasOwnProp(o, s) ? o[s] = [o[s], n] : o[s] = n, !a) : ((!o[s] || !m.isObject(o[s])) && (o[s] = []), t(r, n, o[s], i) && m.isArray(o[s]) && (o[s] = Ep(o[s])), !a);
  }
  if (m.isFormData(e) && m.isFunction(e.entries)) {
    const r = {};
    return m.forEachEntry(e, (n, o) => {
      t(bp(n), o, r, 0);
    }), r;
  }
  return null;
}
const wp = {
  "Content-Type": void 0
};
function _p(e, t, r) {
  if (m.isString(e))
    try {
      return (t || JSON.parse)(e), m.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (r || JSON.stringify)(e);
}
const Vt = {
  transitional: Ui,
  adapter: ["xhr", "http"],
  transformRequest: [function(t, r) {
    const n = r.getContentType() || "", o = n.indexOf("application/json") > -1, i = m.isObject(t);
    if (i && m.isHTMLForm(t) && (t = new FormData(t)), m.isFormData(t))
      return o && o ? JSON.stringify(Fi(t)) : t;
    if (m.isArrayBuffer(t) || m.isBuffer(t) || m.isStream(t) || m.isFile(t) || m.isBlob(t))
      return t;
    if (m.isArrayBufferView(t))
      return t.buffer;
    if (m.isURLSearchParams(t))
      return r.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let a;
    if (i) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return yp(t, this.formSerializer).toString();
      if ((a = m.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
        const u = this.env && this.env.FormData;
        return Bt(
          a ? { "files[]": t } : t,
          u && new u(),
          this.formSerializer
        );
      }
    }
    return i || o ? (r.setContentType("application/json", !1), _p(t)) : t;
  }],
  transformResponse: [function(t) {
    const r = this.transitional || Vt.transitional, n = r && r.forcedJSONParsing, o = this.responseType === "json";
    if (t && m.isString(t) && (n && !this.responseType || o)) {
      const s = !(r && r.silentJSONParsing) && o;
      try {
        return JSON.parse(t);
      } catch (a) {
        if (s)
          throw a.name === "SyntaxError" ? N.from(a, N.ERR_BAD_RESPONSE, this, null, this.response) : a;
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
    FormData: re.classes.FormData,
    Blob: re.classes.Blob
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
m.forEach(["delete", "get", "head"], function(t) {
  Vt.headers[t] = {};
});
m.forEach(["post", "put", "patch"], function(t) {
  Vt.headers[t] = m.merge(wp);
});
const sn = Vt, Sp = m.toObjectSet([
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
]), Op = (e) => {
  const t = {};
  let r, n, o;
  return e && e.split(`
`).forEach(function(s) {
    o = s.indexOf(":"), r = s.substring(0, o).trim().toLowerCase(), n = s.substring(o + 1).trim(), !(!r || t[r] && Sp[r]) && (r === "set-cookie" ? t[r] ? t[r].push(n) : t[r] = [n] : t[r] = t[r] ? t[r] + ", " + n : n);
  }), t;
}, xo = Symbol("internals");
function He(e) {
  return e && String(e).trim().toLowerCase();
}
function ht(e) {
  return e === !1 || e == null ? e : m.isArray(e) ? e.map(ht) : String(e);
}
function Rp(e) {
  const t = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(e); )
    t[n[1]] = n[2];
  return t;
}
function xp(e) {
  return /^[-_a-zA-Z]+$/.test(e.trim());
}
function Po(e, t, r, n) {
  if (m.isFunction(n))
    return n.call(this, t, r);
  if (m.isString(t)) {
    if (m.isString(n))
      return t.indexOf(n) !== -1;
    if (m.isRegExp(n))
      return n.test(t);
  }
}
function Pp(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, r, n) => r.toUpperCase() + n);
}
function Tp(e, t) {
  const r = m.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(e, n + r, {
      value: function(o, i, s) {
        return this[n].call(this, t, o, i, s);
      },
      configurable: !0
    });
  });
}
let kt = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, r, n) {
    const o = this;
    function i(a, u, l) {
      const f = He(u);
      if (!f)
        throw new Error("header name must be a non-empty string");
      const d = m.findKey(o, f);
      (!d || o[d] === void 0 || l === !0 || l === void 0 && o[d] !== !1) && (o[d || u] = ht(a));
    }
    const s = (a, u) => m.forEach(a, (l, f) => i(l, f, u));
    return m.isPlainObject(t) || t instanceof this.constructor ? s(t, r) : m.isString(t) && (t = t.trim()) && !xp(t) ? s(Op(t), r) : t != null && i(r, t, n), this;
  }
  get(t, r) {
    if (t = He(t), t) {
      const n = m.findKey(this, t);
      if (n) {
        const o = this[n];
        if (!r)
          return o;
        if (r === !0)
          return Rp(o);
        if (m.isFunction(r))
          return r.call(this, o, n);
        if (m.isRegExp(r))
          return r.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, r) {
    if (t = He(t), t) {
      const n = m.findKey(this, t);
      return !!(n && (!r || Po(this, this[n], n, r)));
    }
    return !1;
  }
  delete(t, r) {
    const n = this;
    let o = !1;
    function i(s) {
      if (s = He(s), s) {
        const a = m.findKey(n, s);
        a && (!r || Po(n, n[a], a, r)) && (delete n[a], o = !0);
      }
    }
    return m.isArray(t) ? t.forEach(i) : i(t), o;
  }
  clear() {
    return Object.keys(this).forEach(this.delete.bind(this));
  }
  normalize(t) {
    const r = this, n = {};
    return m.forEach(this, (o, i) => {
      const s = m.findKey(n, i);
      if (s) {
        r[s] = ht(o), delete r[i];
        return;
      }
      const a = t ? Pp(i) : String(i).trim();
      a !== i && delete r[i], r[a] = ht(o), n[a] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const r = /* @__PURE__ */ Object.create(null);
    return m.forEach(this, (n, o) => {
      n != null && n !== !1 && (r[o] = t && m.isArray(n) ? n.join(", ") : n);
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
    const n = (this[xo] = this[xo] = {
      accessors: {}
    }).accessors, o = this.prototype;
    function i(s) {
      const a = He(s);
      n[a] || (Tp(o, s), n[a] = !0);
    }
    return m.isArray(t) ? t.forEach(i) : i(t), this;
  }
};
kt.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent"]);
m.freezeMethods(kt.prototype);
m.freezeMethods(kt);
const ce = kt;
function sr(e, t) {
  const r = this || sn, n = t || r, o = ce.from(n.headers);
  let i = n.data;
  return m.forEach(e, function(a) {
    i = a.call(r, i, o.normalize(), t ? t.status : void 0);
  }), o.normalize(), i;
}
function Mi(e) {
  return !!(e && e.__CANCEL__);
}
function nt(e, t, r) {
  N.call(this, e ?? "canceled", N.ERR_CANCELED, t, r), this.name = "CanceledError";
}
m.inherits(nt, N, {
  __CANCEL__: !0
});
const Cp = null;
function Ap(e, t, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? e(r) : t(new N(
    "Request failed with status code " + r.status,
    [N.ERR_BAD_REQUEST, N.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
    r.config,
    r.request,
    r
  ));
}
const Np = re.isStandardBrowserEnv ? function() {
  return {
    write: function(r, n, o, i, s, a) {
      const u = [];
      u.push(r + "=" + encodeURIComponent(n)), m.isNumber(o) && u.push("expires=" + new Date(o).toGMTString()), m.isString(i) && u.push("path=" + i), m.isString(s) && u.push("domain=" + s), a === !0 && u.push("secure"), document.cookie = u.join("; ");
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
function Dp(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function $p(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Bi(e, t) {
  return e && !Dp(t) ? $p(e, t) : t;
}
const Lp = re.isStandardBrowserEnv ? function() {
  const t = /(msie|trident)/i.test(navigator.userAgent), r = document.createElement("a");
  let n;
  function o(i) {
    let s = i;
    return t && (r.setAttribute("href", s), s = r.href), r.setAttribute("href", s), {
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
  return n = o(window.location.href), function(s) {
    const a = m.isString(s) ? o(s) : s;
    return a.protocol === n.protocol && a.host === n.host;
  };
}() : function() {
  return function() {
    return !0;
  };
}();
function Ip(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function jp(e, t) {
  e = e || 10;
  const r = new Array(e), n = new Array(e);
  let o = 0, i = 0, s;
  return t = t !== void 0 ? t : 1e3, function(u) {
    const l = Date.now(), f = n[i];
    s || (s = l), r[o] = u, n[o] = l;
    let d = i, p = 0;
    for (; d !== o; )
      p += r[d++], d = d % e;
    if (o = (o + 1) % e, o === i && (i = (i + 1) % e), l - s < t)
      return;
    const g = f && l - f;
    return g ? Math.round(p * 1e3 / g) : void 0;
  };
}
function To(e, t) {
  let r = 0;
  const n = jp(50, 250);
  return (o) => {
    const i = o.loaded, s = o.lengthComputable ? o.total : void 0, a = i - r, u = n(a), l = i <= s;
    r = i;
    const f = {
      loaded: i,
      total: s,
      progress: s ? i / s : void 0,
      bytes: a,
      rate: u || void 0,
      estimated: u && s && l ? (s - i) / u : void 0,
      event: o
    };
    f[t ? "download" : "upload"] = !0, e(f);
  };
}
const Up = typeof XMLHttpRequest < "u", Fp = Up && function(e) {
  return new Promise(function(r, n) {
    let o = e.data;
    const i = ce.from(e.headers).normalize(), s = e.responseType;
    let a;
    function u() {
      e.cancelToken && e.cancelToken.unsubscribe(a), e.signal && e.signal.removeEventListener("abort", a);
    }
    m.isFormData(o) && (re.isStandardBrowserEnv || re.isStandardBrowserWebWorkerEnv) && i.setContentType(!1);
    let l = new XMLHttpRequest();
    if (e.auth) {
      const g = e.auth.username || "", v = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
      i.set("Authorization", "Basic " + btoa(g + ":" + v));
    }
    const f = Bi(e.baseURL, e.url);
    l.open(e.method.toUpperCase(), ji(f, e.params, e.paramsSerializer), !0), l.timeout = e.timeout;
    function d() {
      if (!l)
        return;
      const g = ce.from(
        "getAllResponseHeaders" in l && l.getAllResponseHeaders()
      ), h = {
        data: !s || s === "text" || s === "json" ? l.responseText : l.response,
        status: l.status,
        statusText: l.statusText,
        headers: g,
        config: e,
        request: l
      };
      Ap(function(w) {
        r(w), u();
      }, function(w) {
        n(w), u();
      }, h), l = null;
    }
    if ("onloadend" in l ? l.onloadend = d : l.onreadystatechange = function() {
      !l || l.readyState !== 4 || l.status === 0 && !(l.responseURL && l.responseURL.indexOf("file:") === 0) || setTimeout(d);
    }, l.onabort = function() {
      l && (n(new N("Request aborted", N.ECONNABORTED, e, l)), l = null);
    }, l.onerror = function() {
      n(new N("Network Error", N.ERR_NETWORK, e, l)), l = null;
    }, l.ontimeout = function() {
      let v = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
      const h = e.transitional || Ui;
      e.timeoutErrorMessage && (v = e.timeoutErrorMessage), n(new N(
        v,
        h.clarifyTimeoutError ? N.ETIMEDOUT : N.ECONNABORTED,
        e,
        l
      )), l = null;
    }, re.isStandardBrowserEnv) {
      const g = (e.withCredentials || Lp(f)) && e.xsrfCookieName && Np.read(e.xsrfCookieName);
      g && i.set(e.xsrfHeaderName, g);
    }
    o === void 0 && i.setContentType(null), "setRequestHeader" in l && m.forEach(i.toJSON(), function(v, h) {
      l.setRequestHeader(h, v);
    }), m.isUndefined(e.withCredentials) || (l.withCredentials = !!e.withCredentials), s && s !== "json" && (l.responseType = e.responseType), typeof e.onDownloadProgress == "function" && l.addEventListener("progress", To(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && l.upload && l.upload.addEventListener("progress", To(e.onUploadProgress)), (e.cancelToken || e.signal) && (a = (g) => {
      l && (n(!g || g.type ? new nt(null, e, l) : g), l.abort(), l = null);
    }, e.cancelToken && e.cancelToken.subscribe(a), e.signal && (e.signal.aborted ? a() : e.signal.addEventListener("abort", a)));
    const p = Ip(f);
    if (p && re.protocols.indexOf(p) === -1) {
      n(new N("Unsupported protocol " + p + ":", N.ERR_BAD_REQUEST, e));
      return;
    }
    l.send(o || null);
  });
}, mt = {
  http: Cp,
  xhr: Fp
};
m.forEach(mt, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Mp = {
  getAdapter: (e) => {
    e = m.isArray(e) ? e : [e];
    const { length: t } = e;
    let r, n;
    for (let o = 0; o < t && (r = e[o], !(n = m.isString(r) ? mt[r.toLowerCase()] : r)); o++)
      ;
    if (!n)
      throw n === !1 ? new N(
        `Adapter ${r} is not supported by the environment`,
        "ERR_NOT_SUPPORT"
      ) : new Error(
        m.hasOwnProp(mt, r) ? `Adapter '${r}' is not available in the build` : `Unknown adapter '${r}'`
      );
    if (!m.isFunction(n))
      throw new TypeError("adapter is not a function");
    return n;
  },
  adapters: mt
};
function ar(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new nt(null, e);
}
function Co(e) {
  return ar(e), e.headers = ce.from(e.headers), e.data = sr.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), Mp.getAdapter(e.adapter || sn.adapter)(e).then(function(n) {
    return ar(e), n.data = sr.call(
      e,
      e.transformResponse,
      n
    ), n.headers = ce.from(n.headers), n;
  }, function(n) {
    return Mi(n) || (ar(e), n && n.response && (n.response.data = sr.call(
      e,
      e.transformResponse,
      n.response
    ), n.response.headers = ce.from(n.response.headers))), Promise.reject(n);
  });
}
const Ao = (e) => e instanceof ce ? e.toJSON() : e;
function je(e, t) {
  t = t || {};
  const r = {};
  function n(l, f, d) {
    return m.isPlainObject(l) && m.isPlainObject(f) ? m.merge.call({ caseless: d }, l, f) : m.isPlainObject(f) ? m.merge({}, f) : m.isArray(f) ? f.slice() : f;
  }
  function o(l, f, d) {
    if (m.isUndefined(f)) {
      if (!m.isUndefined(l))
        return n(void 0, l, d);
    } else
      return n(l, f, d);
  }
  function i(l, f) {
    if (!m.isUndefined(f))
      return n(void 0, f);
  }
  function s(l, f) {
    if (m.isUndefined(f)) {
      if (!m.isUndefined(l))
        return n(void 0, l);
    } else
      return n(void 0, f);
  }
  function a(l, f, d) {
    if (d in t)
      return n(l, f);
    if (d in e)
      return n(void 0, l);
  }
  const u = {
    url: i,
    method: i,
    data: i,
    baseURL: s,
    transformRequest: s,
    transformResponse: s,
    paramsSerializer: s,
    timeout: s,
    timeoutMessage: s,
    withCredentials: s,
    adapter: s,
    responseType: s,
    xsrfCookieName: s,
    xsrfHeaderName: s,
    onUploadProgress: s,
    onDownloadProgress: s,
    decompress: s,
    maxContentLength: s,
    maxBodyLength: s,
    beforeRedirect: s,
    transport: s,
    httpAgent: s,
    httpsAgent: s,
    cancelToken: s,
    socketPath: s,
    responseEncoding: s,
    validateStatus: a,
    headers: (l, f) => o(Ao(l), Ao(f), !0)
  };
  return m.forEach(Object.keys(e).concat(Object.keys(t)), function(f) {
    const d = u[f] || o, p = d(e[f], t[f], f);
    m.isUndefined(p) && d !== a || (r[f] = p);
  }), r;
}
const Vi = "1.2.1", an = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  an[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const No = {};
an.transitional = function(t, r, n) {
  function o(i, s) {
    return "[Axios v" + Vi + "] Transitional option '" + i + "'" + s + (n ? ". " + n : "");
  }
  return (i, s, a) => {
    if (t === !1)
      throw new N(
        o(s, " has been removed" + (r ? " in " + r : "")),
        N.ERR_DEPRECATED
      );
    return r && !No[s] && (No[s] = !0, console.warn(
      o(
        s,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), t ? t(i, s, a) : !0;
  };
};
function Bp(e, t, r) {
  if (typeof e != "object")
    throw new N("options must be an object", N.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(e);
  let o = n.length;
  for (; o-- > 0; ) {
    const i = n[o], s = t[i];
    if (s) {
      const a = e[i], u = a === void 0 || s(a, i, e);
      if (u !== !0)
        throw new N("option " + i + " must be " + u, N.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0)
      throw new N("Unknown option " + i, N.ERR_BAD_OPTION);
  }
}
const Cr = {
  assertOptions: Bp,
  validators: an
}, me = Cr.validators;
let Rt = class {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new Ro(),
      response: new Ro()
    };
  }
  request(t, r) {
    typeof t == "string" ? (r = r || {}, r.url = t) : r = t || {}, r = je(this.defaults, r);
    const { transitional: n, paramsSerializer: o, headers: i } = r;
    n !== void 0 && Cr.assertOptions(n, {
      silentJSONParsing: me.transitional(me.boolean),
      forcedJSONParsing: me.transitional(me.boolean),
      clarifyTimeoutError: me.transitional(me.boolean)
    }, !1), o !== void 0 && Cr.assertOptions(o, {
      encode: me.function,
      serialize: me.function
    }, !0), r.method = (r.method || this.defaults.method || "get").toLowerCase();
    let s;
    s = i && m.merge(
      i.common,
      i[r.method]
    ), s && m.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (v) => {
        delete i[v];
      }
    ), r.headers = ce.concat(s, i);
    const a = [];
    let u = !0;
    this.interceptors.request.forEach(function(h) {
      typeof h.runWhen == "function" && h.runWhen(r) === !1 || (u = u && h.synchronous, a.unshift(h.fulfilled, h.rejected));
    });
    const l = [];
    this.interceptors.response.forEach(function(h) {
      l.push(h.fulfilled, h.rejected);
    });
    let f, d = 0, p;
    if (!u) {
      const v = [Co.bind(this), void 0];
      for (v.unshift.apply(v, a), v.push.apply(v, l), p = v.length, f = Promise.resolve(r); d < p; )
        f = f.then(v[d++], v[d++]);
      return f;
    }
    p = a.length;
    let g = r;
    for (d = 0; d < p; ) {
      const v = a[d++], h = a[d++];
      try {
        g = v(g);
      } catch (S) {
        h.call(this, S);
        break;
      }
    }
    try {
      f = Co.call(this, g);
    } catch (v) {
      return Promise.reject(v);
    }
    for (d = 0, p = l.length; d < p; )
      f = f.then(l[d++], l[d++]);
    return f;
  }
  getUri(t) {
    t = je(this.defaults, t);
    const r = Bi(t.baseURL, t.url);
    return ji(r, t.params, t.paramsSerializer);
  }
};
m.forEach(["delete", "get", "head", "options"], function(t) {
  Rt.prototype[t] = function(r, n) {
    return this.request(je(n || {}, {
      method: t,
      url: r,
      data: (n || {}).data
    }));
  };
});
m.forEach(["post", "put", "patch"], function(t) {
  function r(n) {
    return function(i, s, a) {
      return this.request(je(a || {}, {
        method: t,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: i,
        data: s
      }));
    };
  }
  Rt.prototype[t] = r(), Rt.prototype[t + "Form"] = r(!0);
});
const vt = Rt;
let ki = class {
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
      const s = new Promise((a) => {
        n.subscribe(a), i = a;
      }).then(o);
      return s.cancel = function() {
        n.unsubscribe(i);
      }, s;
    }, t(function(i, s, a) {
      n.reason || (n.reason = new nt(i, s, a), r(n.reason));
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
      token: new ki(function(o) {
        t = o;
      }),
      cancel: t
    };
  }
};
const Vp = ki;
function kp(e) {
  return function(r) {
    return e.apply(null, r);
  };
}
function Hp(e) {
  return m.isObject(e) && e.isAxiosError === !0;
}
function Hi(e) {
  const t = new vt(e), r = Oi(vt.prototype.request, t);
  return m.extend(r, vt.prototype, t, { allOwnKeys: !0 }), m.extend(r, t, null, { allOwnKeys: !0 }), r.create = function(o) {
    return Hi(je(e, o));
  }, r;
}
const W = Hi(sn);
W.Axios = vt;
W.CanceledError = nt;
W.CancelToken = Vp;
W.isCancel = Mi;
W.VERSION = Vi;
W.toFormData = Bt;
W.AxiosError = N;
W.Cancel = W.CanceledError;
W.all = function(t) {
  return Promise.all(t);
};
W.spread = kp;
W.isAxiosError = Hp;
W.mergeConfig = je;
W.AxiosHeaders = ce;
W.formToJSON = (e) => Fi(m.isHTMLForm(e) ? new FormData(e) : e);
W.default = W;
const Wi = W, {
  Axios: zh,
  AxiosError: Wp,
  CanceledError: Gh,
  isCancel: Jh,
  CancelToken: Kh,
  VERSION: Yh,
  all: Xh,
  Cancel: Zh,
  isAxiosError: Qh,
  spread: em,
  toFormData: tm,
  AxiosHeaders: rm,
  formToJSON: nm,
  mergeConfig: om
} = Wi;
var Ar = function(e, t) {
  return Ar = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
    r.__proto__ = n;
  } || function(r, n) {
    for (var o in n)
      Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
  }, Ar(e, t);
};
function Ht(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  Ar(e, t);
  function r() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
}
function Nr(e) {
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
function xt(e, t) {
  var r = typeof Symbol == "function" && e[Symbol.iterator];
  if (!r)
    return e;
  var n = r.call(e), o, i = [], s;
  try {
    for (; (t === void 0 || t-- > 0) && !(o = n.next()).done; )
      i.push(o.value);
  } catch (a) {
    s = { error: a };
  } finally {
    try {
      o && !o.done && (r = n.return) && r.call(n);
    } finally {
      if (s)
        throw s.error;
    }
  }
  return i;
}
function Pt(e, t, r) {
  if (r || arguments.length === 2)
    for (var n = 0, o = t.length, i; n < o; n++)
      (i || !(n in t)) && (i || (i = Array.prototype.slice.call(t, 0, n)), i[n] = t[n]);
  return e.concat(i || Array.prototype.slice.call(t));
}
function le(e) {
  return typeof e == "function";
}
function un(e) {
  var t = function(n) {
    Error.call(n), n.stack = new Error().stack;
  }, r = e(t);
  return r.prototype = Object.create(Error.prototype), r.prototype.constructor = r, r;
}
var ur = un(function(e) {
  return function(r) {
    e(this), this.message = r ? r.length + ` errors occurred during unsubscription:
` + r.map(function(n, o) {
      return o + 1 + ") " + n.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = r;
  };
});
function Dr(e, t) {
  if (e) {
    var r = e.indexOf(t);
    0 <= r && e.splice(r, 1);
  }
}
var Wt = function() {
  function e(t) {
    this.initialTeardown = t, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return e.prototype.unsubscribe = function() {
    var t, r, n, o, i;
    if (!this.closed) {
      this.closed = !0;
      var s = this._parentage;
      if (s)
        if (this._parentage = null, Array.isArray(s))
          try {
            for (var a = Nr(s), u = a.next(); !u.done; u = a.next()) {
              var l = u.value;
              l.remove(this);
            }
          } catch (h) {
            t = { error: h };
          } finally {
            try {
              u && !u.done && (r = a.return) && r.call(a);
            } finally {
              if (t)
                throw t.error;
            }
          }
        else
          s.remove(this);
      var f = this.initialTeardown;
      if (le(f))
        try {
          f();
        } catch (h) {
          i = h instanceof ur ? h.errors : [h];
        }
      var d = this._finalizers;
      if (d) {
        this._finalizers = null;
        try {
          for (var p = Nr(d), g = p.next(); !g.done; g = p.next()) {
            var v = g.value;
            try {
              Do(v);
            } catch (h) {
              i = i ?? [], h instanceof ur ? i = Pt(Pt([], xt(i)), xt(h.errors)) : i.push(h);
            }
          }
        } catch (h) {
          n = { error: h };
        } finally {
          try {
            g && !g.done && (o = p.return) && o.call(p);
          } finally {
            if (n)
              throw n.error;
          }
        }
      }
      if (i)
        throw new ur(i);
    }
  }, e.prototype.add = function(t) {
    var r;
    if (t && t !== this)
      if (this.closed)
        Do(t);
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
    r === t ? this._parentage = null : Array.isArray(r) && Dr(r, t);
  }, e.prototype.remove = function(t) {
    var r = this._finalizers;
    r && Dr(r, t), t instanceof e && t._removeParent(this);
  }, e.EMPTY = function() {
    var t = new e();
    return t.closed = !0, t;
  }(), e;
}(), qi = Wt.EMPTY;
function zi(e) {
  return e instanceof Wt || e && "closed" in e && le(e.remove) && le(e.add) && le(e.unsubscribe);
}
function Do(e) {
  le(e) ? e() : e.unsubscribe();
}
var cn = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1
}, $r = {
  setTimeout: function(e, t) {
    for (var r = [], n = 2; n < arguments.length; n++)
      r[n - 2] = arguments[n];
    var o = $r.delegate;
    return o != null && o.setTimeout ? o.setTimeout.apply(o, Pt([e, t], xt(r))) : setTimeout.apply(void 0, Pt([e, t], xt(r)));
  },
  clearTimeout: function(e) {
    var t = $r.delegate;
    return ((t == null ? void 0 : t.clearTimeout) || clearTimeout)(e);
  },
  delegate: void 0
};
function qp(e) {
  $r.setTimeout(function() {
    throw e;
  });
}
function $o() {
}
var ct = null;
function gt(e) {
  if (cn.useDeprecatedSynchronousErrorHandling) {
    var t = !ct;
    if (t && (ct = { errorThrown: !1, error: null }), e(), t) {
      var r = ct, n = r.errorThrown, o = r.error;
      if (ct = null, n)
        throw o;
    }
  } else
    e();
}
var Gi = function(e) {
  Ht(t, e);
  function t(r) {
    var n = e.call(this) || this;
    return n.isStopped = !1, r ? (n.destination = r, zi(r) && r.add(n)) : n.destination = Kp, n;
  }
  return t.create = function(r, n, o) {
    return new Lr(r, n, o);
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
}(Wt), zp = Function.prototype.bind;
function cr(e, t) {
  return zp.call(e, t);
}
var Gp = function() {
  function e(t) {
    this.partialObserver = t;
  }
  return e.prototype.next = function(t) {
    var r = this.partialObserver;
    if (r.next)
      try {
        r.next(t);
      } catch (n) {
        lt(n);
      }
  }, e.prototype.error = function(t) {
    var r = this.partialObserver;
    if (r.error)
      try {
        r.error(t);
      } catch (n) {
        lt(n);
      }
    else
      lt(t);
  }, e.prototype.complete = function() {
    var t = this.partialObserver;
    if (t.complete)
      try {
        t.complete();
      } catch (r) {
        lt(r);
      }
  }, e;
}(), Lr = function(e) {
  Ht(t, e);
  function t(r, n, o) {
    var i = e.call(this) || this, s;
    if (le(r) || !r)
      s = {
        next: r ?? void 0,
        error: n ?? void 0,
        complete: o ?? void 0
      };
    else {
      var a;
      i && cn.useDeprecatedNextContext ? (a = Object.create(r), a.unsubscribe = function() {
        return i.unsubscribe();
      }, s = {
        next: r.next && cr(r.next, a),
        error: r.error && cr(r.error, a),
        complete: r.complete && cr(r.complete, a)
      }) : s = r;
    }
    return i.destination = new Gp(s), i;
  }
  return t;
}(Gi);
function lt(e) {
  qp(e);
}
function Jp(e) {
  throw e;
}
var Kp = {
  closed: !0,
  next: $o,
  error: Jp,
  complete: $o
}, Yp = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function Xp(e) {
  return e;
}
function Zp(e) {
  return e.length === 0 ? Xp : e.length === 1 ? e[0] : function(r) {
    return e.reduce(function(n, o) {
      return o(n);
    }, r);
  };
}
var Tt = function() {
  function e(t) {
    t && (this._subscribe = t);
  }
  return e.prototype.lift = function(t) {
    var r = new e();
    return r.source = this, r.operator = t, r;
  }, e.prototype.subscribe = function(t, r, n) {
    var o = this, i = eh(t) ? t : new Lr(t, r, n);
    return gt(function() {
      var s = o, a = s.operator, u = s.source;
      i.add(a ? a.call(i, u) : u ? o._subscribe(i) : o._trySubscribe(i));
    }), i;
  }, e.prototype._trySubscribe = function(t) {
    try {
      return this._subscribe(t);
    } catch (r) {
      t.error(r);
    }
  }, e.prototype.forEach = function(t, r) {
    var n = this;
    return r = Lo(r), new r(function(o, i) {
      var s = new Lr({
        next: function(a) {
          try {
            t(a);
          } catch (u) {
            i(u), s.unsubscribe();
          }
        },
        error: i,
        complete: o
      });
      n.subscribe(s);
    });
  }, e.prototype._subscribe = function(t) {
    var r;
    return (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(t);
  }, e.prototype[Yp] = function() {
    return this;
  }, e.prototype.pipe = function() {
    for (var t = [], r = 0; r < arguments.length; r++)
      t[r] = arguments[r];
    return Zp(t)(this);
  }, e.prototype.toPromise = function(t) {
    var r = this;
    return t = Lo(t), new t(function(n, o) {
      var i;
      r.subscribe(function(s) {
        return i = s;
      }, function(s) {
        return o(s);
      }, function() {
        return n(i);
      });
    });
  }, e.create = function(t) {
    return new e(t);
  }, e;
}();
function Lo(e) {
  var t;
  return (t = e ?? cn.Promise) !== null && t !== void 0 ? t : Promise;
}
function Qp(e) {
  return e && le(e.next) && le(e.error) && le(e.complete);
}
function eh(e) {
  return e && e instanceof Gi || Qp(e) && zi(e);
}
var th = un(function(e) {
  return function() {
    e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), Ir = function(e) {
  Ht(t, e);
  function t() {
    var r = e.call(this) || this;
    return r.closed = !1, r.currentObservers = null, r.observers = [], r.isStopped = !1, r.hasError = !1, r.thrownError = null, r;
  }
  return t.prototype.lift = function(r) {
    var n = new Io(this, this);
    return n.operator = r, n;
  }, t.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new th();
  }, t.prototype.next = function(r) {
    var n = this;
    gt(function() {
      var o, i;
      if (n._throwIfClosed(), !n.isStopped) {
        n.currentObservers || (n.currentObservers = Array.from(n.observers));
        try {
          for (var s = Nr(n.currentObservers), a = s.next(); !a.done; a = s.next()) {
            var u = a.value;
            u.next(r);
          }
        } catch (l) {
          o = { error: l };
        } finally {
          try {
            a && !a.done && (i = s.return) && i.call(s);
          } finally {
            if (o)
              throw o.error;
          }
        }
      }
    });
  }, t.prototype.error = function(r) {
    var n = this;
    gt(function() {
      if (n._throwIfClosed(), !n.isStopped) {
        n.hasError = n.isStopped = !0, n.thrownError = r;
        for (var o = n.observers; o.length; )
          o.shift().error(r);
      }
    });
  }, t.prototype.complete = function() {
    var r = this;
    gt(function() {
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
    var n = this, o = this, i = o.hasError, s = o.isStopped, a = o.observers;
    return i || s ? qi : (this.currentObservers = null, a.push(r), new Wt(function() {
      n.currentObservers = null, Dr(a, r);
    }));
  }, t.prototype._checkFinalizedStatuses = function(r) {
    var n = this, o = n.hasError, i = n.thrownError, s = n.isStopped;
    o ? r.error(i) : s && r.complete();
  }, t.prototype.asObservable = function() {
    var r = new Tt();
    return r.source = this, r;
  }, t.create = function(r, n) {
    return new Io(r, n);
  }, t;
}(Tt), Io = function(e) {
  Ht(t, e);
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
    return (o = (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(r)) !== null && o !== void 0 ? o : qi;
  }, t;
}(Ir), rh = un(function(e) {
  return function() {
    e(this), this.name = "EmptyError", this.message = "no elements in sequence";
  };
});
function lr(e, t) {
  var r = typeof t == "object";
  return new Promise(function(n, o) {
    var i = !1, s;
    e.subscribe({
      next: function(a) {
        s = a, i = !0;
      },
      error: o,
      complete: function() {
        i ? n(s) : r ? n(t.defaultValue) : o(new rh());
      }
    });
  });
}
class ln {
  constructor(t) {
    G(this, "config");
    G(this, "axios");
    t && (this.config = t), this.axios = Wi.create(this.config);
  }
  get interceptors() {
    return this.axios.interceptors;
  }
  static create(t) {
    return new ln(t);
  }
  request(t) {
    return new Tt((r) => {
      const n = new AbortController();
      let o, i;
      return t.uploadProgressSubscriber && (o = (s) => {
        t.uploadProgressSubscriber && t.uploadProgressSubscriber.next(s);
      }), t.downloadProgressSubscriber && (i = (s) => {
        t.downloadProgressSubscriber && t.downloadProgressSubscriber.next(s);
      }), this.axios.request({
        ...t,
        onUploadProgress: o,
        onDownloadProgress: i,
        signal: n.signal
      }).then((s) => {
        r.next(s), r.complete(), t.uploadProgressSubscriber && t.uploadProgressSubscriber.complete(), t.downloadProgressSubscriber && t.downloadProgressSubscriber.complete();
      }).catch((s) => {
        r.error(s), t.uploadProgressSubscriber && t.uploadProgressSubscriber.error(s);
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
function nh(e) {
  return ln.create({
    baseURL: e
  });
}
const k = class {
  constructor(t, r) {
    G(this, "axiosInstance");
    G(this, "defaultConfig", {
      contentType: "json",
      cache: !1
    });
    G(this, "tokenType");
    this.axiosInstance = nh(t), this.setupInterceptor(), r && (this.defaultConfig = {
      ...this.defaultConfig,
      ...r
    });
  }
  static setAuthorizationTokenType(t) {
    k.tokenType = t;
  }
  static setGlobalParams(t) {
    k.globalParams = {
      ...k.globalParams,
      ...t
    };
  }
  static setGlobalData(t) {
    k.globalData = {
      ...k.globalData,
      ...t
    };
  }
  static setGlobalHeaders(t) {
    k.globalHeaders = {
      ...k.globalHeaders,
      ...t
    };
  }
  static addInterceptor(t) {
    return k.interceptors.add(t), () => {
      k.removeInterceptor(t);
    };
  }
  static removeInterceptor(t) {
    k.interceptors.delete(t);
  }
  setAuthorizationTokenType(t) {
    this.tokenType = t;
  }
  getTokenType(t) {
    return t.tokenType !== void 0 ? t.tokenType : this.tokenType !== void 0 ? this.tokenType : k.tokenType;
  }
  setupInterceptor() {
    this.axiosInstance.interceptors.request.use(
      async (t) => {
        if (t = await this.useRequestInterceptors(t), t = Sd({}, this.defaultConfig, t), t.headers = {
          ...t.headers,
          ...k.globalHeaders,
          "Content-Type": t.contentType === "formData" ? !1 : t.contentType === "urlEncoded" ? Rr.UrlEncoded : Rr.Json
        }, !t.preparedData) {
          if ((typeof t.cache < "u" ? t.cache : this.defaultConfig.cache) === !1 && (t.headers["Cache-Control"] = "no-cache", t.params = {
            ...t.params,
            axios_timestamp: Date.now()
          }), t.params = Ot(
            Eo({
              ...t.params,
              ...k.globalParams
            })
          ), t.data = {
            ...t.data,
            ...k.globalData
          }, Eo(t.data), JSON.stringify(t.data) === "{}")
            t.data = void 0;
          else
            switch (t.contentType) {
              case "formData":
                t.data = xr(t.data);
                break;
              case "urlEncoded":
                t.data = Ot(t.data);
            }
          t.preparedData = !0;
        }
        const r = this.getTokenType(t), n = r ? dt.getToken(r) : null;
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
    for (const r of k.interceptors)
      r.request && (t = await r.request(t));
    return t;
  }
  async useErrorResponseInterceptor(t) {
    for (const r of k.interceptors)
      if (r.response && r.response.error)
        try {
          t = await r.response.error(t, this.axiosInstance);
        } catch {
          return t;
        }
    return t;
  }
  async useSuccessResponseInterceptor(t) {
    for (const r of k.interceptors)
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
let te = k;
G(te, "tokenType", "base_token"), G(te, "globalParams", {}), G(te, "globalData", {}), G(te, "globalHeaders", {}), G(te, "interceptors", /* @__PURE__ */ new Set());
var Ye = {}, oh = {
  get exports() {
    return Ye;
  },
  set exports(e) {
    Ye = e;
  }
}, De = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var fr, jo;
function Ji() {
  if (jo)
    return fr;
  jo = 1;
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
      for (var s = {}, a = 0; a < 10; a++)
        s["_" + String.fromCharCode(a)] = a;
      var u = Object.getOwnPropertyNames(s).map(function(f) {
        return s[f];
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
  return fr = o() ? Object.assign : function(i, s) {
    for (var a, u = n(i), l, f = 1; f < arguments.length; f++) {
      a = Object(arguments[f]);
      for (var d in a)
        t.call(a, d) && (u[d] = a[d]);
      if (e) {
        l = e(a);
        for (var p = 0; p < l.length; p++)
          r.call(a, l[p]) && (u[l[p]] = a[l[p]]);
      }
    }
    return u;
  }, fr;
}
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Uo;
function ih() {
  if (Uo)
    return De;
  Uo = 1, Ji();
  var e = Xe, t = 60103;
  if (De.Fragment = 60107, typeof Symbol == "function" && Symbol.for) {
    var r = Symbol.for;
    t = r("react.element"), De.Fragment = r("react.fragment");
  }
  var n = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = Object.prototype.hasOwnProperty, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function s(a, u, l) {
    var f, d = {}, p = null, g = null;
    l !== void 0 && (p = "" + l), u.key !== void 0 && (p = "" + u.key), u.ref !== void 0 && (g = u.ref);
    for (f in u)
      o.call(u, f) && !i.hasOwnProperty(f) && (d[f] = u[f]);
    if (a && a.defaultProps)
      for (f in u = a.defaultProps, u)
        d[f] === void 0 && (d[f] = u[f]);
    return { $$typeof: t, type: a, key: p, ref: g, props: d, _owner: n.current };
  }
  return De.jsx = s, De.jsxs = s, De;
}
var dr = {};
/** @license React v17.0.2
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fo;
function sh() {
  return Fo || (Fo = 1, function(e) {
    process.env.NODE_ENV !== "production" && function() {
      var t = Xe, r = Ji(), n = 60103, o = 60106;
      e.Fragment = 60107;
      var i = 60108, s = 60114, a = 60109, u = 60110, l = 60112, f = 60113, d = 60120, p = 60115, g = 60116, v = 60121, h = 60122, S = 60117, w = 60129, D = 60131;
      if (typeof Symbol == "function" && Symbol.for) {
        var O = Symbol.for;
        n = O("react.element"), o = O("react.portal"), e.Fragment = O("react.fragment"), i = O("react.strict_mode"), s = O("react.profiler"), a = O("react.provider"), u = O("react.context"), l = O("react.forward_ref"), f = O("react.suspense"), d = O("react.suspense_list"), p = O("react.memo"), g = O("react.lazy"), v = O("react.block"), h = O("react.server.block"), S = O("react.fundamental"), O("react.scope"), O("react.opaque.id"), w = O("react.debug_trace_mode"), O("react.offscreen"), D = O("react.legacy_hidden");
      }
      var _ = typeof Symbol == "function" && Symbol.iterator, T = "@@iterator";
      function R(c) {
        if (c === null || typeof c != "object")
          return null;
        var y = _ && c[_] || c[T];
        return typeof y == "function" ? y : null;
      }
      var U = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function $(c) {
        {
          for (var y = arguments.length, E = new Array(y > 1 ? y - 1 : 0), x = 1; x < y; x++)
            E[x - 1] = arguments[x];
          F("error", c, E);
        }
      }
      function F(c, y, E) {
        {
          var x = U.ReactDebugCurrentFrame, L = x.getStackAddendum();
          L !== "" && (y += "%s", E = E.concat([L]));
          var I = E.map(function(A) {
            return "" + A;
          });
          I.unshift("Warning: " + y), Function.prototype.apply.call(console[c], console, I);
        }
      }
      var ie = !1;
      function J(c) {
        return !!(typeof c == "string" || typeof c == "function" || c === e.Fragment || c === s || c === w || c === i || c === f || c === d || c === D || ie || typeof c == "object" && c !== null && (c.$$typeof === g || c.$$typeof === p || c.$$typeof === a || c.$$typeof === u || c.$$typeof === l || c.$$typeof === S || c.$$typeof === v || c[0] === h));
      }
      function es(c, y, E) {
        var x = y.displayName || y.name || "";
        return c.displayName || (x !== "" ? E + "(" + x + ")" : E);
      }
      function dn(c) {
        return c.displayName || "Context";
      }
      function ee(c) {
        if (c == null)
          return null;
        if (typeof c.tag == "number" && $("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue."), typeof c == "function")
          return c.displayName || c.name || null;
        if (typeof c == "string")
          return c;
        switch (c) {
          case e.Fragment:
            return "Fragment";
          case o:
            return "Portal";
          case s:
            return "Profiler";
          case i:
            return "StrictMode";
          case f:
            return "Suspense";
          case d:
            return "SuspenseList";
        }
        if (typeof c == "object")
          switch (c.$$typeof) {
            case u:
              var y = c;
              return dn(y) + ".Consumer";
            case a:
              var E = c;
              return dn(E._context) + ".Provider";
            case l:
              return es(c, c.render, "ForwardRef");
            case p:
              return ee(c.type);
            case v:
              return ee(c._render);
            case g: {
              var x = c, L = x._payload, I = x._init;
              try {
                return ee(I(L));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var Be = 0, pn, hn, mn, vn, gn, yn, bn;
      function En() {
      }
      En.__reactDisabledLog = !0;
      function ts() {
        {
          if (Be === 0) {
            pn = console.log, hn = console.info, mn = console.warn, vn = console.error, gn = console.group, yn = console.groupCollapsed, bn = console.groupEnd;
            var c = {
              configurable: !0,
              enumerable: !0,
              value: En,
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
          Be++;
        }
      }
      function rs() {
        {
          if (Be--, Be === 0) {
            var c = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: r({}, c, {
                value: pn
              }),
              info: r({}, c, {
                value: hn
              }),
              warn: r({}, c, {
                value: mn
              }),
              error: r({}, c, {
                value: vn
              }),
              group: r({}, c, {
                value: gn
              }),
              groupCollapsed: r({}, c, {
                value: yn
              }),
              groupEnd: r({}, c, {
                value: bn
              })
            });
          }
          Be < 0 && $("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var qt = U.ReactCurrentDispatcher, zt;
      function ot(c, y, E) {
        {
          if (zt === void 0)
            try {
              throw Error();
            } catch (L) {
              var x = L.stack.trim().match(/\n( *(at )?)/);
              zt = x && x[1] || "";
            }
          return `
` + zt + c;
        }
      }
      var Gt = !1, it;
      {
        var ns = typeof WeakMap == "function" ? WeakMap : Map;
        it = new ns();
      }
      function wn(c, y) {
        if (!c || Gt)
          return "";
        {
          var E = it.get(c);
          if (E !== void 0)
            return E;
        }
        var x;
        Gt = !0;
        var L = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var I;
        I = qt.current, qt.current = null, ts();
        try {
          if (y) {
            var A = function() {
              throw Error();
            };
            if (Object.defineProperty(A.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(A, []);
              } catch (ae) {
                x = ae;
              }
              Reflect.construct(c, [], A);
            } else {
              try {
                A.call();
              } catch (ae) {
                x = ae;
              }
              c.call(A.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (ae) {
              x = ae;
            }
            c();
          }
        } catch (ae) {
          if (ae && x && typeof ae.stack == "string") {
            for (var C = ae.stack.split(`
`), z = x.stack.split(`
`), M = C.length - 1, V = z.length - 1; M >= 1 && V >= 0 && C[M] !== z[V]; )
              V--;
            for (; M >= 1 && V >= 0; M--, V--)
              if (C[M] !== z[V]) {
                if (M !== 1 || V !== 1)
                  do
                    if (M--, V--, V < 0 || C[M] !== z[V]) {
                      var se = `
` + C[M].replace(" at new ", " at ");
                      return typeof c == "function" && it.set(c, se), se;
                    }
                  while (M >= 1 && V >= 0);
                break;
              }
          }
        } finally {
          Gt = !1, qt.current = I, rs(), Error.prepareStackTrace = L;
        }
        var Ne = c ? c.displayName || c.name : "", $n = Ne ? ot(Ne) : "";
        return typeof c == "function" && it.set(c, $n), $n;
      }
      function _n(c, y, E) {
        return wn(c, !1);
      }
      function os(c) {
        var y = c.prototype;
        return !!(y && y.isReactComponent);
      }
      function st(c, y, E) {
        if (c == null)
          return "";
        if (typeof c == "function")
          return wn(c, os(c));
        if (typeof c == "string")
          return ot(c);
        switch (c) {
          case f:
            return ot("Suspense");
          case d:
            return ot("SuspenseList");
        }
        if (typeof c == "object")
          switch (c.$$typeof) {
            case l:
              return _n(c.render);
            case p:
              return st(c.type, y, E);
            case v:
              return _n(c._render);
            case g: {
              var x = c, L = x._payload, I = x._init;
              try {
                return st(I(L), y, E);
              } catch {
              }
            }
          }
        return "";
      }
      var Sn = {}, On = U.ReactDebugCurrentFrame;
      function at(c) {
        if (c) {
          var y = c._owner, E = st(c.type, c._source, y ? y.type : null);
          On.setExtraStackFrame(E);
        } else
          On.setExtraStackFrame(null);
      }
      function is(c, y, E, x, L) {
        {
          var I = Function.call.bind(Object.prototype.hasOwnProperty);
          for (var A in c)
            if (I(c, A)) {
              var C = void 0;
              try {
                if (typeof c[A] != "function") {
                  var z = Error((x || "React class") + ": " + E + " type `" + A + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof c[A] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw z.name = "Invariant Violation", z;
                }
                C = c[A](y, A, x, E, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (M) {
                C = M;
              }
              C && !(C instanceof Error) && (at(L), $("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", x || "React class", E, A, typeof C), at(null)), C instanceof Error && !(C.message in Sn) && (Sn[C.message] = !0, at(L), $("Failed %s type: %s", E, C.message), at(null));
            }
        }
      }
      var Ve = U.ReactCurrentOwner, Jt = Object.prototype.hasOwnProperty, ss = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, Rn, xn, Kt;
      Kt = {};
      function as(c) {
        if (Jt.call(c, "ref")) {
          var y = Object.getOwnPropertyDescriptor(c, "ref").get;
          if (y && y.isReactWarning)
            return !1;
        }
        return c.ref !== void 0;
      }
      function us(c) {
        if (Jt.call(c, "key")) {
          var y = Object.getOwnPropertyDescriptor(c, "key").get;
          if (y && y.isReactWarning)
            return !1;
        }
        return c.key !== void 0;
      }
      function cs(c, y) {
        if (typeof c.ref == "string" && Ve.current && y && Ve.current.stateNode !== y) {
          var E = ee(Ve.current.type);
          Kt[E] || ($('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', ee(Ve.current.type), c.ref), Kt[E] = !0);
        }
      }
      function ls(c, y) {
        {
          var E = function() {
            Rn || (Rn = !0, $("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
          };
          E.isReactWarning = !0, Object.defineProperty(c, "key", {
            get: E,
            configurable: !0
          });
        }
      }
      function fs(c, y) {
        {
          var E = function() {
            xn || (xn = !0, $("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
          };
          E.isReactWarning = !0, Object.defineProperty(c, "ref", {
            get: E,
            configurable: !0
          });
        }
      }
      var ds = function(c, y, E, x, L, I, A) {
        var C = {
          $$typeof: n,
          type: c,
          key: y,
          ref: E,
          props: A,
          _owner: I
        };
        return C._store = {}, Object.defineProperty(C._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(C, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: x
        }), Object.defineProperty(C, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: L
        }), Object.freeze && (Object.freeze(C.props), Object.freeze(C)), C;
      };
      function ps(c, y, E, x, L) {
        {
          var I, A = {}, C = null, z = null;
          E !== void 0 && (C = "" + E), us(y) && (C = "" + y.key), as(y) && (z = y.ref, cs(y, L));
          for (I in y)
            Jt.call(y, I) && !ss.hasOwnProperty(I) && (A[I] = y[I]);
          if (c && c.defaultProps) {
            var M = c.defaultProps;
            for (I in M)
              A[I] === void 0 && (A[I] = M[I]);
          }
          if (C || z) {
            var V = typeof c == "function" ? c.displayName || c.name || "Unknown" : c;
            C && ls(A, V), z && fs(A, V);
          }
          return ds(c, C, z, L, x, Ve.current, A);
        }
      }
      var Yt = U.ReactCurrentOwner, Pn = U.ReactDebugCurrentFrame;
      function Ae(c) {
        if (c) {
          var y = c._owner, E = st(c.type, c._source, y ? y.type : null);
          Pn.setExtraStackFrame(E);
        } else
          Pn.setExtraStackFrame(null);
      }
      var Xt;
      Xt = !1;
      function Zt(c) {
        return typeof c == "object" && c !== null && c.$$typeof === n;
      }
      function Tn() {
        {
          if (Yt.current) {
            var c = ee(Yt.current.type);
            if (c)
              return `

Check the render method of \`` + c + "`.";
          }
          return "";
        }
      }
      function hs(c) {
        {
          if (c !== void 0) {
            var y = c.fileName.replace(/^.*[\\\/]/, ""), E = c.lineNumber;
            return `

Check your code at ` + y + ":" + E + ".";
          }
          return "";
        }
      }
      var Cn = {};
      function ms(c) {
        {
          var y = Tn();
          if (!y) {
            var E = typeof c == "string" ? c : c.displayName || c.name;
            E && (y = `

Check the top-level render call using <` + E + ">.");
          }
          return y;
        }
      }
      function An(c, y) {
        {
          if (!c._store || c._store.validated || c.key != null)
            return;
          c._store.validated = !0;
          var E = ms(y);
          if (Cn[E])
            return;
          Cn[E] = !0;
          var x = "";
          c && c._owner && c._owner !== Yt.current && (x = " It was passed a child from " + ee(c._owner.type) + "."), Ae(c), $('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', E, x), Ae(null);
        }
      }
      function Nn(c, y) {
        {
          if (typeof c != "object")
            return;
          if (Array.isArray(c))
            for (var E = 0; E < c.length; E++) {
              var x = c[E];
              Zt(x) && An(x, y);
            }
          else if (Zt(c))
            c._store && (c._store.validated = !0);
          else if (c) {
            var L = R(c);
            if (typeof L == "function" && L !== c.entries)
              for (var I = L.call(c), A; !(A = I.next()).done; )
                Zt(A.value) && An(A.value, y);
          }
        }
      }
      function vs(c) {
        {
          var y = c.type;
          if (y == null || typeof y == "string")
            return;
          var E;
          if (typeof y == "function")
            E = y.propTypes;
          else if (typeof y == "object" && (y.$$typeof === l || y.$$typeof === p))
            E = y.propTypes;
          else
            return;
          if (E) {
            var x = ee(y);
            is(E, c.props, "prop", x, c);
          } else if (y.PropTypes !== void 0 && !Xt) {
            Xt = !0;
            var L = ee(y);
            $("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", L || "Unknown");
          }
          typeof y.getDefaultProps == "function" && !y.getDefaultProps.isReactClassApproved && $("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function gs(c) {
        {
          for (var y = Object.keys(c.props), E = 0; E < y.length; E++) {
            var x = y[E];
            if (x !== "children" && x !== "key") {
              Ae(c), $("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", x), Ae(null);
              break;
            }
          }
          c.ref !== null && (Ae(c), $("Invalid attribute `ref` supplied to `React.Fragment`."), Ae(null));
        }
      }
      function Dn(c, y, E, x, L, I) {
        {
          var A = J(c);
          if (!A) {
            var C = "";
            (c === void 0 || typeof c == "object" && c !== null && Object.keys(c).length === 0) && (C += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var z = hs(L);
            z ? C += z : C += Tn();
            var M;
            c === null ? M = "null" : Array.isArray(c) ? M = "array" : c !== void 0 && c.$$typeof === n ? (M = "<" + (ee(c.type) || "Unknown") + " />", C = " Did you accidentally export a JSX literal instead of a component?") : M = typeof c, $("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", M, C);
          }
          var V = ps(c, y, E, L, I);
          if (V == null)
            return V;
          if (A) {
            var se = y.children;
            if (se !== void 0)
              if (x)
                if (Array.isArray(se)) {
                  for (var Ne = 0; Ne < se.length; Ne++)
                    Nn(se[Ne], c);
                  Object.freeze && Object.freeze(se);
                } else
                  $("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
              else
                Nn(se, c);
          }
          return c === e.Fragment ? gs(V) : vs(V), V;
        }
      }
      function ys(c, y, E) {
        return Dn(c, y, E, !0);
      }
      function bs(c, y, E) {
        return Dn(c, y, E, !1);
      }
      var Es = bs, ws = ys;
      e.jsx = Es, e.jsxs = ws;
    }();
  }(dr)), dr;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = ih() : e.exports = sh();
})(oh);
const Ce = Ye.Fragment, B = Ye.jsx, jr = Ye.jsxs, im = (e = () => {
}) => {
  const [t, r] = q(!1);
  t || (e(), r(!0));
};
function ah(e, t) {
  function r(n) {
    let o = [];
    return Array.isArray(n) ? o = n : o = n.split(","), o.length ? t.filter((s) => o.includes(s)).length > 0 : !0;
  }
  for (const n of e)
    if (r(n.permissions || [])) {
      if (n.routes) {
        const o = ah(n.routes, t);
        if (o)
          return o;
        continue;
      }
      return n;
    }
}
const Mo = (e, t, r = !1) => {
  const n = e.split("/"), o = t.split("/");
  if (o.length > n.length || r && o.length !== n.length)
    return !1;
  for (let i = 0; i < o.length; i++) {
    const s = o[i];
    if (!s.match(/:([\w\W]+)/gi) && s !== n[i])
      return !1;
  }
  return !0;
};
var Ur = {}, uh = {
  get exports() {
    return Ur;
  },
  set exports(e) {
    Ur = e;
  }
}, pr = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Bo;
function ch() {
  if (Bo)
    return pr;
  Bo = 1;
  var e = Xe;
  function t(d, p) {
    return d === p && (d !== 0 || 1 / d === 1 / p) || d !== d && p !== p;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useState, o = e.useEffect, i = e.useLayoutEffect, s = e.useDebugValue;
  function a(d, p) {
    var g = p(), v = n({ inst: { value: g, getSnapshot: p } }), h = v[0].inst, S = v[1];
    return i(function() {
      h.value = g, h.getSnapshot = p, u(h) && S({ inst: h });
    }, [d, g, p]), o(function() {
      return u(h) && S({ inst: h }), d(function() {
        u(h) && S({ inst: h });
      });
    }, [d]), s(g), g;
  }
  function u(d) {
    var p = d.getSnapshot;
    d = d.value;
    try {
      var g = p();
      return !r(d, g);
    } catch {
      return !0;
    }
  }
  function l(d, p) {
    return p();
  }
  var f = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? l : a;
  return pr.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : f, pr;
}
var hr = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vo;
function lh() {
  return Vo || (Vo = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = Xe, t = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function r(O) {
      {
        for (var _ = arguments.length, T = new Array(_ > 1 ? _ - 1 : 0), R = 1; R < _; R++)
          T[R - 1] = arguments[R];
        n("error", O, T);
      }
    }
    function n(O, _, T) {
      {
        var R = t.ReactDebugCurrentFrame, U = R.getStackAddendum();
        U !== "" && (_ += "%s", T = T.concat([U]));
        var $ = T.map(function(F) {
          return String(F);
        });
        $.unshift("Warning: " + _), Function.prototype.apply.call(console[O], console, $);
      }
    }
    function o(O, _) {
      return O === _ && (O !== 0 || 1 / O === 1 / _) || O !== O && _ !== _;
    }
    var i = typeof Object.is == "function" ? Object.is : o, s = e.useState, a = e.useEffect, u = e.useLayoutEffect, l = e.useDebugValue, f = !1, d = !1;
    function p(O, _, T) {
      f || e.startTransition !== void 0 && (f = !0, r("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
      var R = _();
      if (!d) {
        var U = _();
        i(R, U) || (r("The result of getSnapshot should be cached to avoid an infinite loop"), d = !0);
      }
      var $ = s({
        inst: {
          value: R,
          getSnapshot: _
        }
      }), F = $[0].inst, ie = $[1];
      return u(function() {
        F.value = R, F.getSnapshot = _, g(F) && ie({
          inst: F
        });
      }, [O, R, _]), a(function() {
        g(F) && ie({
          inst: F
        });
        var J = function() {
          g(F) && ie({
            inst: F
          });
        };
        return O(J);
      }, [O]), l(R), R;
    }
    function g(O) {
      var _ = O.getSnapshot, T = O.value;
      try {
        var R = _();
        return !i(T, R);
      } catch {
        return !0;
      }
    }
    function v(O, _, T) {
      return _();
    }
    var h = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", S = !h, w = S ? v : p, D = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : w;
    hr.useSyncExternalStore = D, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), hr;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = ch() : e.exports = lh();
})(uh);
const fh = () => !0;
class dh extends Ad {
  constructor() {
    super(...arguments);
    G(this, "middlewareHandler", fh);
    G(this, "_routes", []);
  }
  get routes() {
    return this._routes;
  }
  registerMiddleware(r) {
    this.middlewareHandler = (n, o) => {
      var i, s, a;
      return n.middleware ? typeof ((i = n.component) == null ? void 0 : i.middleware) == "string" ? r[(s = n.component) == null ? void 0 : s.middleware] && r[(a = n.component) == null ? void 0 : a.middleware](n, o) : typeof n.middleware == "string" ? r[n.middleware] && r[n.middleware](n, o) : n.middleware(n, o) : !0;
    };
  }
  canPassMiddleware(r, n) {
    var o;
    return (o = r.component) != null && o.middleware && typeof r.component.middleware == "function" ? r.component.middleware(r, n) : this.middlewareHandler(r, n);
  }
  addRoute(...r) {
    const n = Cd([...r, ...this._routes], "path");
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
const We = new dh();
function Ki() {
  const e = H((...o) => {
    We.addRoute(...o);
  }, []), t = H((o) => {
    We.removeRoute(o);
  }, []), r = H((o) => We.on("routeChange", o), []);
  return { routes: Ur.useSyncExternalStore(
    r,
    () => We.routes
  ), addRoutes: e, removeRoute: t };
}
const sm = () => {
  const { routes: e } = Ki(), [t, r] = q(), n = fe(), o = H(
    (i) => {
      const s = i.filter(
        (a) => Mo(n.pathname, a.path)
      );
      for (const a of s)
        if (a) {
          if (a.routes)
            o(a.routes);
          else if (Mo(n.pathname, a.path, !0)) {
            r(a);
            break;
          }
        }
    },
    [n]
  );
  return K(() => {
    o(e);
  }, [o, e]), t;
}, ph = (e) => {
  K(
    () => () => {
      e();
    },
    []
  );
};
function hh(e, t) {
  const r = _e(e);
  r.current = e;
  const n = (t == null ? void 0 : t.wait) ?? 1e3, o = _e(
    vd(
      (...i) => r.current(...i),
      n,
      t
    )
  ).current;
  return ph(() => {
    o.cancel();
  }), {
    run: o,
    cancel: o.cancel,
    flush: o.flush
  };
}
function am(e, t) {
  const [r, n] = q(e), { run: o } = hh((i) => {
    n(i);
  }, t);
  return [r, o];
}
function um(e, t) {
  const r = _e(!1);
  K(() => {
    if (r.current)
      return e && e();
    r.current = !0;
  }, t);
}
const cm = (e, t) => {
  const r = _e(e);
  r.current = e;
  const n = q()[1], o = H(() => {
    i(), n(
      setInterval(() => r.current(), t)
    );
  }, [r.current, t]), i = H(() => {
    n((s) => {
      s && clearInterval(s);
    });
  }, []);
  return {
    run: o,
    cancel: i
  };
}, mh = (e = !1) => {
  const [t, r] = q(e), n = H(() => {
    r((s) => !s);
  }, []), o = H(() => {
    r(!0);
  }, []), i = H(() => {
    r(!1);
  }, []);
  return { state: t, toggle: n, on: o, off: i };
}, Yi = Ho(
  void 0
);
function lm({
  children: e,
  color: t,
  isWrap: r = !1,
  component: n
}) {
  const { state: o, on: i, off: s } = mh(), a = q(0)[1], u = H(() => {
    i(), a((f) => f + 1), a(1);
  }, []), l = H(() => {
    a((f) => f === 1 ? (s(), 0) : f - 1);
  }, []);
  return /* @__PURE__ */ B(Yi.Provider, { value: { startLoading: u, stopLoading: l, state: o }, children: r ? /* @__PURE__ */ B(n, { state: o, color: t, children: e }) : /* @__PURE__ */ jr(Ce, { children: [
    e,
    /* @__PURE__ */ B(n, { state: o, color: t })
  ] }) });
}
const Xi = (e) => {
  const t = Fr(Yi);
  if (t === void 0)
    throw new Error("useLoading must be used in LoadingProvider");
  return K(() => {
    typeof e > "u" || (e ? t.startLoading() : t.stopLoading());
  }, [e, t]), t;
};
var we = /* @__PURE__ */ ((e) => (e.Standing = "standing", e.Processing = "processing", e.Success = "success", e.Failed = "Failed", e))(we || {});
function Ct(e) {
  K(() => e(), []);
}
function vh(e, t) {
  const r = _e(new Ir()), [n, o] = q(), { startLoading: i, stopLoading: s } = Xi(), [a, u] = q(we.Standing), [l, f] = q(), [d, p] = q(), g = Ze(() => a === we.Processing, [a]), v = H(
    (...S) => {
      u(we.Processing), t != null && t.showLoading && i(), r.current.next(e(...S));
    },
    [e]
  ), h = H(() => {
    n == null || n.unsubscribe(), u(we.Standing), t != null && t.showLoading && s();
  }, [n]);
  return Ct(() => (r.current.closed && (r.current = new Ir()), r.current.subscribe({
    next: (S) => {
      o(
        S.subscribe({
          next: f,
          complete: () => {
            u(we.Success), t != null && t.showLoading && s();
          },
          error: (w) => {
            u(we.Failed), p(w), t != null && t.showLoading && s();
          }
        })
      );
    }
  }), () => {
    t != null && t.showLoading && s(), r.current.unsubscribe();
  })), {
    run: v,
    cancel: h,
    state: a,
    processing: g,
    result: l,
    error: d
  };
}
const gh = { attributes: !0, childList: !0, subtree: !0 }, fm = (e, t) => {
  const r = Ze(() => new MutationObserver(t), [t]);
  K(() => {
    const n = e instanceof HTMLElement ? e : e.current;
    return n && r.observe(n, gh), () => {
      r.disconnect();
    };
  }, [r, e]);
};
function dm(e) {
  const t = _e();
  return K(() => {
    t.current = e;
  }), t.current;
}
const pm = (e, t) => {
  const r = _e(e);
  r.current = e;
  const n = q()[1], o = H(() => {
    i(), n(
      setTimeout(() => r.current(), t)
    );
  }, [r.current, t]), i = H(() => {
    n((s) => {
      s && clearTimeout(s);
    });
  }, []);
  return {
    run: o,
    cancel: i
  };
};
function hm({ get: e, set: t }, r) {
  const n = Ze(e, r), o = H(t, r);
  return [n, o];
}
const Zi = Ho(void 0), mm = ({
  children: e,
  defaultTokens: t = {},
  fetchUserOnLogin: r = () => new Tt((o) => o.next(void 0)),
  fetchRefreshToken: n
}) => {
  const [o, i] = q(), [s, a] = q(t), [u, l] = q(!1), { run: f, result: d } = vh(r), p = H(
    (_, T) => {
      l(!0), a(_), T ? i(T) : f(_);
    },
    [f]
  ), g = H(() => {
    i(void 0), a({}), l(!1);
  }, []);
  Ct(() => {
    var _;
    (_ = Object.values(t)[0]) != null && _.length && (f(t), l(!0));
  }), K(() => {
    d && i(d);
  }, [d]), K(() => {
    for (const _ in s)
      if (Object.prototype.hasOwnProperty.call(s, _)) {
        const T = s[_];
        dt.setToken(_, T || "");
      }
    return () => {
      for (const _ in s)
        Object.prototype.hasOwnProperty.call(s, _) && dt.setToken(_, "");
    };
  }, [s]);
  const [v, h] = q(!1), [S, w] = q([]), D = (_, T) => {
    S.forEach((R) => {
      _ ? R.reject(_) : R.resolve(T);
    }), S.splice(0);
  }, O = te.addInterceptor({
    response: {
      error: (_, T) => {
        if (!(_ instanceof Wp))
          return _;
        const { config: R, response: U } = _;
        if (!R || !U)
          return Promise.reject(_);
        if (U.status === 401) {
          if (v)
            return new Promise(function(F, ie) {
              S.push({ resolve: F, reject: ie });
            }).then(() => lr(T.request(R))).catch((F) => F);
          h(!0);
          const $ = dt.getToken("refresh_token");
          return $ ? n ? new Promise((F, ie) => {
            lr(n($)).then(({ data: J }) => {
              console.log("refresh tokens", J), h(!1), D(null, J.accessToken), p({
                base_token: J.accessToken,
                refresh_token: J.refreshToken
              }), F(lr(T.request(R)));
            }).catch((J) => {
              console.log("err: ", J), h(!0), g(), D(J), ie(J);
            });
          }) : Promise.reject(_) : (console.log("Not found refresh token app"), Promise.reject(_));
        }
        return Promise.reject(_);
      }
    }
  });
  return Ct(() => O()), /* @__PURE__ */ B(Zi.Provider, { value: { user: o, tokens: s, isLoggedIn: u, login: p, logout: g }, children: e });
};
function vm() {
  const e = Fr(Zi);
  if (!e)
    throw new Error("useAuthContext must be used in AuthProvider");
  return e;
}
const fn = Xe.createContext(void 0), gm = ({
  userPermissions: e,
  isUser: t,
  children: r
}) => {
  const n = H(
    (o) => {
      let i = [];
      return Array.isArray(o) ? i = o : i = o.split(","), i.length ? t ? e.filter((a) => i.includes(a)).length > 0 : !1 : !0;
    },
    [t, e]
  );
  return /* @__PURE__ */ B(fn.Provider, { value: { userPermissions: e, can: n }, children: r });
}, yh = (e) => {
  const t = Fr(fn);
  if (!t)
    throw new Error("useAuthorization must be used in AuthorizationProvider");
  return {
    granted: Ze(() => e ? t.can(e) : !0, [e, t.can]),
    ...t
  };
}, ym = Wo(
  ({ permissions: e, children: t, guestView: r }) => {
    const { granted: n } = yh(e);
    return typeof t == "function" ? t(n) : /* @__PURE__ */ B(Ce, { children: n ? t : r });
  }
);
function bm(e) {
  return (t) => (r) => /* @__PURE__ */ B(fn.Consumer, { children: (n) => /* @__PURE__ */ B(Ce, { children: (n == null ? void 0 : n.can(e || [])) && /* @__PURE__ */ B(t, { ...r }) }) });
}
function Em({
  component: e,
  props: t
}) {
  return /* @__PURE__ */ B(e, { ...t });
}
function wm({
  children: e
}) {
  const { startLoading: t, stopLoading: r } = Xi();
  return Ct(() => te.addInterceptor({
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
  })), /* @__PURE__ */ B(Ce, { children: e });
}
function _m(e, t) {
  return () => {
    const r = new te(e().baseURL, e());
    return wd(t, (n) => (...o) => n(r, ...o));
  };
}
function bh(e, t = "/") {
  const r = {}, n = e.Index.length > 0 ? `${t}${e.Index}` : "";
  for (const o in e)
    if (Object.prototype.hasOwnProperty.call(e, o)) {
      const i = e[o];
      typeof i == "object" ? r[o] = bh(i, n !== "/" ? n + "/" : "/") : o === "Index" ? r[o] = n.length ? n : t : r[o] = n + "/" + i;
    }
  return r;
}
const Eh = ({
  route: { component: e, ...t }
}) => {
  var r;
  return /* @__PURE__ */ B(Ce, { children: (r = t.routes) != null && r.length && !t.element && !e ? /* @__PURE__ */ B(ba, {}) : t.element || (e ? /* @__PURE__ */ B(e, {}) : null) });
}, wh = Wo(Eh), ko = ({ route: e }) => {
  const t = At(), [r, n] = q();
  return K(() => {
    (async () => n(
      await We.canPassMiddleware(e, t)
    ))();
  }, [t, e]), r !== void 0 ? Os(r) ? r : r ? /* @__PURE__ */ B(wh, { route: e }) : null : null;
}, Qi = (e) => {
  if (e.routes) {
    const { routes: t, element: r, index: n, ...o } = e, i = t.map((s) => Qi(s));
    return /* @__PURE__ */ Ln(
      bt,
      {
        element: /* @__PURE__ */ B(ko, { route: { ...o, element: r, routes: t } }),
        ...o,
        index: n,
        key: wo(12)
      },
      i
    );
  }
  return /* @__PURE__ */ Ln(
    bt,
    {
      element: /* @__PURE__ */ B(ko, { route: e }),
      ...e,
      key: wo(12)
    }
  );
}, _h = ({ onChange: e }) => {
  const t = fe();
  return K(() => {
    e && e(t);
  }, [t.pathname]), /* @__PURE__ */ B(Ce, {});
}, Sm = ({
  routes: e,
  notFoundElement: t,
  onRouteChange: r
}) => {
  const n = Ze(
    () => e.map((o) => Qi(o)),
    [e]
  );
  return /* @__PURE__ */ jr(Ce, { children: [
    /* @__PURE__ */ B(_h, { onChange: r }),
    /* @__PURE__ */ jr(wa, { children: [
      n,
      /* @__PURE__ */ B(bt, { path: "*", element: t })
    ] })
  ] });
};
function Om(e) {
  const t = e;
  return (r) => {
    const n = Ki();
    return /* @__PURE__ */ B(t, { ...r, routes: n });
  };
}
export {
  te as Api,
  wm as ApiLoadingHandlerProvider,
  mm as AuthProvider,
  gm as AuthorizationProvider,
  ln as AxiosObservable,
  $h as BrowserRouter,
  Ad as EventListenersManager,
  Yi as LoadingContext,
  lm as LoadingProvider,
  _h as LocationEffect,
  Dh as Navigate,
  ba as Outlet,
  ym as PrivateView,
  Rr as RequestHeaderContentType,
  ko as RouteMiddleware,
  wh as RouteRenderer,
  Sm as RouterGenerator,
  We as RouterHandler,
  dt as TokenManager,
  Uh as clearObject,
  Eo as clearUndefinedProperties,
  _m as createRepository,
  bh as createRoutePath,
  kh as createVariableWithWatcher,
  jh as emptyObject,
  ah as findRouteHasPermission,
  xr as formData,
  Rh as generatePath,
  Qi as generateRoutes,
  Em as lazyComponent,
  wo as makeId,
  Bh as passwordRegex,
  Mo as pathMatched,
  Fh as phoneNumberRegex,
  Ot as urlEncoded,
  Ch as useActionData,
  Nh as useAsyncError,
  Ah as useAsyncValue,
  vm as useAuthContext,
  yh as useAuthorization,
  Ih as useBeforeUnload,
  im as useConstructor,
  sm as useCurrentRoute,
  hh as useDebounceFn,
  am as useDebounceState,
  um as useDidUpdate,
  cm as useInterval,
  vh as useJob,
  Xi as useLoading,
  fe as useLocation,
  Ct as useMount,
  At as useNavigate,
  Th as useNavigation,
  fm as useOnElementChange,
  ca as useOutlet,
  xh as useOutletContext,
  Ph as useParams,
  dm as usePrevious,
  Ki as useRoutes,
  Lh as useSearchParams,
  pm as useTimeout,
  mh as useToggle,
  ph as useUnMount,
  hm as useWritableMemo,
  Mh as usernameRegex,
  Vh as validateAsciiChars,
  bm as withAuthorization,
  Om as withRoutes
};

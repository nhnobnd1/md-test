var Os = Object.defineProperty;
var Rs = (e, t, r) => t in e ? Os(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var z = (e, t, r) => (Rs(e, typeof t != "symbol" ? t + "" : t, r), r);
import * as b from "react";
import Xe, { useState as q, useCallback as H, useEffect as J, useRef as _e, createContext as Wo, useContext as Fr, useMemo as Ze, memo as qo, isValidElement as xs, createElement as In } from "react";
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
const jn = "popstate";
function Ps(e) {
  e === void 0 && (e = {});
  function t(n, o) {
    let {
      pathname: i,
      search: s,
      hash: a
    } = n.location;
    return hr(
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
  return As(t, r, null, e);
}
function P(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function Ts() {
  return Math.random().toString(36).substr(2, 8);
}
function Un(e) {
  return {
    usr: e.state,
    key: e.key
  };
}
function hr(e, t, r, n) {
  return r === void 0 && (r = null), yt({
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: ""
  }, typeof t == "string" ? Ue(t) : t, {
    state: r,
    key: t && t.key || n || Ts()
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
function Cs(e) {
  let t = typeof window < "u" && typeof window.location < "u" && window.location.origin !== "null" ? window.location.origin : window.location.href, r = typeof e == "string" ? e : Le(e);
  return P(t, "No window.location.(origin|href) available to create URL for href: " + r), new URL(r, t);
}
function As(e, t, r, n) {
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
    let h = hr(p.location, g, v);
    r && r(h, g);
    let S = Un(h), w = p.createHref(h);
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
    let h = hr(p.location, g, v);
    r && r(h, g);
    let S = Un(h), w = p.createHref(h);
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
      return o.addEventListener(jn, l), u = g, () => {
        o.removeEventListener(jn, l), u = null;
      };
    },
    createHref(g) {
      return t(o, g);
    },
    encodeLocation(g) {
      let v = Cs(typeof g == "string" ? g : Le(g));
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
var Fn;
(function(e) {
  e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error";
})(Fn || (Fn = {}));
function Ns(e, t, r) {
  r === void 0 && (r = "/");
  let n = typeof t == "string" ? Ue(t) : t, o = Jo(n.pathname || "/", r);
  if (o == null)
    return null;
  let i = zo(e);
  Ds(i);
  let s = null;
  for (let a = 0; s == null && a < i.length; ++a)
    s = Vs(
      i[a],
      Ws(o)
    );
  return s;
}
function zo(e, t, r, n) {
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
    ), zo(i.children, t, f, l)), !(i.path == null && !i.index) && t.push({
      path: l,
      score: Ms(l, i.index),
      routesMeta: f
    });
  };
  return e.forEach((i, s) => {
    var a;
    if (i.path === "" || !((a = i.path) != null && a.includes("?")))
      o(i, s);
    else
      for (let u of Go(i.path))
        o(i, s, u);
  }), t;
}
function Go(e) {
  let t = e.split("/");
  if (t.length === 0)
    return [];
  let [r, ...n] = t, o = r.endsWith("?"), i = r.replace(/\?$/, "");
  if (n.length === 0)
    return o ? [i, ""] : [i];
  let s = Go(n.join("/")), a = [];
  return a.push(...s.map((u) => u === "" ? i : [i, u].join("/"))), o && a.push(...s), a.map((u) => e.startsWith("/") && u === "" ? "/" : u);
}
function Ds(e) {
  e.sort((t, r) => t.score !== r.score ? r.score - t.score : Bs(t.routesMeta.map((n) => n.childrenIndex), r.routesMeta.map((n) => n.childrenIndex)));
}
const $s = /^:\w+$/, Ls = 3, Is = 2, js = 1, Us = 10, Fs = -2, Mn = (e) => e === "*";
function Ms(e, t) {
  let r = e.split("/"), n = r.length;
  return r.some(Mn) && (n += Fs), t && (n += Is), r.filter((o) => !Mn(o)).reduce((o, i) => o + ($s.test(i) ? Ls : i === "" ? js : Us), n);
}
function Bs(e, t) {
  return e.length === t.length && e.slice(0, -1).every((n, o) => n === t[o]) ? e[e.length - 1] - t[t.length - 1] : 0;
}
function Vs(e, t) {
  let {
    routesMeta: r
  } = e, n = {}, o = "/", i = [];
  for (let s = 0; s < r.length; ++s) {
    let a = r[s], u = s === r.length - 1, l = o === "/" ? t : t.slice(o.length) || "/", f = ks({
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
      pathnameBase: Js(ue([o, f.pathnameBase])),
      route: d
    }), f.pathnameBase !== "/" && (o = ue([o, f.pathnameBase]));
  }
  return i;
}
function Ph(e, t) {
  t === void 0 && (t = {});
  let r = e;
  return r.endsWith("*") && r !== "*" && !r.endsWith("/*") && (oe(!1, 'Route path "' + r + '" will be treated as if it were ' + ('"' + r.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + r.replace(/\*$/, "/*") + '".')), r = r.replace(/\*$/, "/*")), r.replace(/^:(\w+)/g, (n, o) => (P(t[o] != null, 'Missing ":' + o + '" param'), t[o])).replace(/\/:(\w+)/g, (n, o) => (P(t[o] != null, 'Missing ":' + o + '" param'), "/" + t[o])).replace(/(\/?)\*/, (n, o, i, s) => {
    const a = "*";
    return t[a] == null ? s === "/*" ? "/" : "" : "" + o + t[a];
  });
}
function ks(e, t) {
  typeof e == "string" && (e = {
    path: e,
    caseSensitive: !1,
    end: !0
  });
  let [r, n] = Hs(e.path, e.caseSensitive, e.end), o = t.match(r);
  if (!o)
    return null;
  let i = o[0], s = i.replace(/(.)\/+$/, "$1"), a = o.slice(1);
  return {
    params: n.reduce((l, f, d) => {
      if (f === "*") {
        let p = a[d] || "";
        s = i.slice(0, i.length - p.length).replace(/(.)\/+$/, "$1");
      }
      return l[f] = qs(a[d] || "", f), l;
    }, {}),
    pathname: i,
    pathnameBase: s,
    pattern: e
  };
}
function Hs(e, t, r) {
  t === void 0 && (t = !1), r === void 0 && (r = !0), oe(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
  let n = [], o = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^$?{}|()[\]]/g, "\\$&").replace(/\/:(\w+)/g, (s, a) => (n.push(a), "/([^\\/]+)"));
  return e.endsWith("*") ? (n.push("*"), o += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? o += "\\/*$" : e !== "" && e !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, t ? void 0 : "i"), n];
}
function Ws(e) {
  try {
    return decodeURI(e);
  } catch (t) {
    return oe(!1, 'The URL path "' + e + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + t + ").")), e;
  }
}
function qs(e, t) {
  try {
    return decodeURIComponent(e);
  } catch (r) {
    return oe(!1, 'The value for the URL param "' + t + '" will not be decoded because' + (' the string "' + e + '" is a malformed URL segment. This is probably') + (" due to a bad percent encoding (" + r + ").")), e;
  }
}
function Jo(e, t) {
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
function zs(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: r,
    search: n = "",
    hash: o = ""
  } = typeof e == "string" ? Ue(e) : e;
  return {
    pathname: r ? r.startsWith("/") ? r : Gs(r, t) : t,
    search: Ks(n),
    hash: Ys(o)
  };
}
function Gs(e, t) {
  let r = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((o) => {
    o === ".." ? r.length > 1 && r.pop() : o !== "." && r.push(o);
  }), r.length > 1 ? r.join("/") : "/";
}
function Zt(e, t, r, n) {
  return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(n) + "].  Please separate it out to the ") + ("`to." + r + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function Ko(e) {
  return e.filter((t, r) => r === 0 || t.route.path && t.route.path.length > 0);
}
function Yo(e, t, r, n) {
  n === void 0 && (n = !1);
  let o;
  typeof e == "string" ? o = Ue(e) : (o = yt({}, e), P(!o.pathname || !o.pathname.includes("?"), Zt("?", "pathname", "search", o)), P(!o.pathname || !o.pathname.includes("#"), Zt("#", "pathname", "hash", o)), P(!o.search || !o.search.includes("#"), Zt("#", "search", "hash", o)));
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
  let u = zs(o, a), l = s && s !== "/" && s.endsWith("/"), f = (i || s === ".") && r.endsWith("/");
  return !u.pathname.endsWith("/") && (l || f) && (u.pathname += "/"), u;
}
const ue = (e) => e.join("/").replace(/\/\/+/g, "/"), Js = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"), Ks = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, Ys = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e;
class Xs {
  constructor(t, r, n, o) {
    o === void 0 && (o = !1), this.status = t, this.statusText = r || "", this.internal = o, n instanceof Error ? (this.data = n.toString(), this.error = n) : this.data = n;
  }
}
function Zs(e) {
  return e instanceof Xs;
}
const Qs = ["post", "put", "patch", "delete"];
[...Qs];
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
function mr() {
  return mr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, mr.apply(this, arguments);
}
function ea(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
const Xo = typeof Object.is == "function" ? Object.is : ea, {
  useState: ta,
  useEffect: ra,
  useLayoutEffect: na,
  useDebugValue: oa
} = b;
let Bn = !1, Vn = !1;
function ia(e, t, r) {
  process.env.NODE_ENV !== "production" && (Bn || "startTransition" in b && (Bn = !0, console.error("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release.")));
  const n = t();
  if (process.env.NODE_ENV !== "production" && !Vn) {
    const s = t();
    Xo(n, s) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), Vn = !0);
  }
  const [{
    inst: o
  }, i] = ta({
    inst: {
      value: n,
      getSnapshot: t
    }
  });
  return na(() => {
    o.value = n, o.getSnapshot = t, Qt(o) && i({
      inst: o
    });
  }, [e, n, t]), ra(() => (Qt(o) && i({
    inst: o
  }), e(() => {
    Qt(o) && i({
      inst: o
    });
  })), [e]), oa(n), n;
}
function Qt(e) {
  const t = e.getSnapshot, r = e.value;
  try {
    const n = t();
    return !Xo(r, n);
  } catch {
    return !0;
  }
}
function sa(e, t, r) {
  return t();
}
const aa = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", ua = !aa, ca = ua ? sa : ia;
"useSyncExternalStore" in b && ((e) => e.useSyncExternalStore)(b);
const Zo = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (Zo.displayName = "DataStaticRouterContext");
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
const X = /* @__PURE__ */ b.createContext({
  outlet: null,
  matches: []
});
process.env.NODE_ENV !== "production" && (X.displayName = "Route");
const Vr = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (Vr.displayName = "RouteError");
function la(e, t) {
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
  } = At(e, {
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
function Ct() {
  Fe() || (process.env.NODE_ENV !== "production" ? P(
    !1,
    "useNavigate() may be used only in the context of a <Router> component."
  ) : P(!1));
  let {
    basename: e,
    navigator: t
  } = b.useContext(be), {
    matches: r
  } = b.useContext(X), {
    pathname: n
  } = fe(), o = JSON.stringify(Ko(r).map((a) => a.pathnameBase)), i = b.useRef(!1);
  return b.useEffect(() => {
    i.current = !0;
  }), b.useCallback(function(a, u) {
    if (u === void 0 && (u = {}), process.env.NODE_ENV !== "production" && oe(i.current, "You should call navigate() in a React.useEffect(), not when your component is first rendered."), !i.current)
      return;
    if (typeof a == "number") {
      t.go(a);
      return;
    }
    let l = Yo(a, JSON.parse(o), n, u.relative === "path");
    e !== "/" && (l.pathname = l.pathname === "/" ? e : ue([e, l.pathname])), (u.replace ? t.replace : t.push)(l, u.state, u);
  }, [e, t, o, n]);
}
const Qo = /* @__PURE__ */ b.createContext(null);
function Th() {
  return b.useContext(Qo);
}
function fa(e) {
  let t = b.useContext(X).outlet;
  return t && /* @__PURE__ */ b.createElement(Qo.Provider, {
    value: e
  }, t);
}
function Ch() {
  let {
    matches: e
  } = b.useContext(X), t = e[e.length - 1];
  return t ? t.params : {};
}
function At(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t, {
    matches: n
  } = b.useContext(X), {
    pathname: o
  } = fe(), i = JSON.stringify(Ko(n).map((s) => s.pathnameBase));
  return b.useMemo(() => Yo(e, JSON.parse(i), o, r === "path"), [e, i, o, r]);
}
function da(e, t) {
  Fe() || (process.env.NODE_ENV !== "production" ? P(
    !1,
    "useRoutes() may be used only in the context of a <Router> component."
  ) : P(!1));
  let {
    navigator: r
  } = b.useContext(be), n = b.useContext(Qe), {
    matches: o
  } = b.useContext(X), i = o[o.length - 1], s = i ? i.params : {}, a = i ? i.pathname : "/", u = i ? i.pathnameBase : "/", l = i && i.route;
  if (process.env.NODE_ENV !== "production") {
    let w = l && l.path || "";
    Ea(a, !l || w.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + a + '" (under <Route path="' + w + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + w + '"> to <Route ') + ('path="' + (w === "/" ? "*" : w + "/*") + '">.'));
  }
  let f = fe(), d;
  if (t) {
    var p;
    let w = typeof t == "string" ? Ue(t) : t;
    u === "/" || (p = w.pathname) != null && p.startsWith(u) || (process.env.NODE_ENV !== "production" ? P(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + u + '" ') + ('but pathname "' + w.pathname + '" was given in the `location` prop.')) : P(!1)), d = w;
  } else
    d = f;
  let g = d.pathname || "/", v = u === "/" ? g : g.slice(u.length) || "/", h = Ns(e, {
    pathname: v
  });
  process.env.NODE_ENV !== "production" && (process.env.NODE_ENV !== "production" && oe(l || h != null, 'No routes matched location "' + d.pathname + d.search + d.hash + '" '), process.env.NODE_ENV !== "production" && oe(h == null || h[h.length - 1].route.element !== void 0, 'Matched leaf route at location "' + d.pathname + d.search + d.hash + '" does not have an element. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.'));
  let S = va(h && h.map((w) => Object.assign({}, w, {
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
      location: mr({
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
function pa() {
  let e = ba(), t = Zs(e) ? e.status + " " + e.statusText : e instanceof Error ? e.message : JSON.stringify(e), r = e instanceof Error ? e.stack : null, n = "rgba(200,200,200, 0.5)", o = {
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
class ha extends b.Component {
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
    return this.state.error ? /* @__PURE__ */ b.createElement(X.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ b.createElement(Vr.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function ma(e) {
  let {
    routeContext: t,
    match: r,
    children: n
  } = e, o = b.useContext(Zo);
  return o && r.route.errorElement && (o._deepestRenderedBoundaryId = r.route.id), /* @__PURE__ */ b.createElement(X.Provider, {
    value: t
  }, n);
}
function va(e, t, r) {
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
    let u = s.route.id ? o == null ? void 0 : o[s.route.id] : null, l = r ? s.route.errorElement || /* @__PURE__ */ b.createElement(pa, null) : null, f = t.concat(n.slice(0, a + 1)), d = () => /* @__PURE__ */ b.createElement(ma, {
      match: s,
      routeContext: {
        outlet: i,
        matches: f
      }
    }, u ? l : s.route.element !== void 0 ? s.route.element : i);
    return r && (s.route.errorElement || a === 0) ? /* @__PURE__ */ b.createElement(ha, {
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
var kn;
(function(e) {
  e.UseRevalidator = "useRevalidator";
})(kn || (kn = {}));
var Ie;
(function(e) {
  e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator";
})(Ie || (Ie = {}));
function ei(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function kr(e) {
  let t = b.useContext(Qe);
  return t || (process.env.NODE_ENV !== "production" ? P(!1, ei(e)) : P(!1)), t;
}
function ga(e) {
  let t = b.useContext(X);
  return t || (process.env.NODE_ENV !== "production" ? P(!1, ei(e)) : P(!1)), t;
}
function ya(e) {
  let t = ga(e), r = t.matches[t.matches.length - 1];
  return r.route.id || (process.env.NODE_ENV !== "production" ? P(!1, e + ' can only be used on routes that contain a unique "id"') : P(!1)), r.route.id;
}
function Ah() {
  return kr(Ie.UseNavigation).navigation;
}
function Nh() {
  let e = kr(Ie.UseActionData);
  return b.useContext(X) || (process.env.NODE_ENV !== "production" ? P(!1, "useActionData must be used inside a RouteContext") : P(!1)), Object.values((e == null ? void 0 : e.actionData) || {})[0];
}
function ba() {
  var e;
  let t = b.useContext(Vr), r = kr(Ie.UseRouteError), n = ya(Ie.UseRouteError);
  return t || ((e = r.errors) == null ? void 0 : e[n]);
}
function Dh() {
  let e = b.useContext(Br);
  return e == null ? void 0 : e._data;
}
function $h() {
  let e = b.useContext(Br);
  return e == null ? void 0 : e._error;
}
const Hn = {};
function Ea(e, t, r) {
  !t && !Hn[e] && (Hn[e] = !0, process.env.NODE_ENV !== "production" && oe(!1, r));
}
function Lh(e) {
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
  let i = b.useContext(Qe), s = Ct();
  return b.useEffect(() => {
    i && i.navigation.state !== "idle" || s(t, {
      replace: r,
      state: n,
      relative: o
    });
  }), null;
}
function wa(e) {
  return fa(e.context);
}
function bt(e) {
  process.env.NODE_ENV !== "production" ? P(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.") : P(!1);
}
function _a(e) {
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
    let h = Jo(l, a);
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
function Sa(e) {
  let {
    children: t,
    location: r
  } = e, n = b.useContext(Mr), o = n && !t ? n.router.routes : vr(t);
  return da(o, r);
}
var Wn;
(function(e) {
  e[e.pending = 0] = "pending", e[e.success = 1] = "success", e[e.error = 2] = "error";
})(Wn || (Wn = {}));
new Promise(() => {
});
function vr(e, t) {
  t === void 0 && (t = []);
  let r = [];
  return b.Children.forEach(e, (n, o) => {
    if (!/* @__PURE__ */ b.isValidElement(n))
      return;
    if (n.type === b.Fragment) {
      r.push.apply(r, vr(n.props.children, t));
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
    n.props.children && (s.children = vr(n.props.children, i)), r.push(s);
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
const ft = "get", er = "application/x-www-form-urlencoded";
function Nt(e) {
  return e != null && typeof e.tagName == "string";
}
function Oa(e) {
  return Nt(e) && e.tagName.toLowerCase() === "button";
}
function Ra(e) {
  return Nt(e) && e.tagName.toLowerCase() === "form";
}
function xa(e) {
  return Nt(e) && e.tagName.toLowerCase() === "input";
}
function Pa(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Ta(e, t) {
  return e.button === 0 && (!t || t === "_self") && !Pa(e);
}
function gr(e) {
  return e === void 0 && (e = ""), new URLSearchParams(typeof e == "string" || Array.isArray(e) || e instanceof URLSearchParams ? e : Object.keys(e).reduce((t, r) => {
    let n = e[r];
    return t.concat(Array.isArray(n) ? n.map((o) => [r, o]) : [[r, n]]);
  }, []));
}
function Ca(e, t) {
  let r = gr(e);
  for (let n of t.keys())
    r.has(n) || t.getAll(n).forEach((o) => {
      r.append(n, o);
    });
  return r;
}
function Aa(e, t, r) {
  let n, o, i, s;
  if (Ra(e)) {
    let f = r.submissionTrigger;
    n = r.method || e.getAttribute("method") || ft, o = r.action || e.getAttribute("action") || t, i = r.encType || e.getAttribute("enctype") || er, s = new FormData(e), f && f.name && s.append(f.name, f.value);
  } else if (Oa(e) || xa(e) && (e.type === "submit" || e.type === "image")) {
    let f = e.form;
    if (f == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    n = r.method || e.getAttribute("formmethod") || f.getAttribute("method") || ft, o = r.action || e.getAttribute("formaction") || f.getAttribute("action") || t, i = r.encType || e.getAttribute("formenctype") || f.getAttribute("enctype") || er, s = new FormData(f), e.name && s.append(e.name, e.value);
  } else {
    if (Nt(e))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    if (n = r.method || ft, o = r.action || t, i = r.encType || er, e instanceof FormData)
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
const Na = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset"], Da = ["aria-current", "caseSensitive", "className", "end", "style", "to", "children"], $a = ["reloadDocument", "replace", "method", "action", "onSubmit", "fetcherKey", "routeId", "relative"];
function Ih(e) {
  let {
    basename: t,
    children: r,
    window: n
  } = e, o = b.useRef();
  o.current == null && (o.current = Ps({
    window: n,
    v5Compat: !0
  }));
  let i = o.current, [s, a] = b.useState({
    action: i.action,
    location: i.location
  });
  return b.useLayoutEffect(() => i.listen(a), [i]), /* @__PURE__ */ b.createElement(_a, {
    basename: t,
    children: r,
    location: s.location,
    navigationType: s.action,
    navigator: i
  });
}
process.env.NODE_ENV;
const ti = /* @__PURE__ */ b.forwardRef(function(t, r) {
  let {
    onClick: n,
    relative: o,
    reloadDocument: i,
    replace: s,
    state: a,
    target: u,
    to: l,
    preventScrollReset: f
  } = t, d = Hr(t, Na), p = la(l, {
    relative: o
  }), g = Fa(l, {
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
process.env.NODE_ENV !== "production" && (ti.displayName = "Link");
const La = /* @__PURE__ */ b.forwardRef(function(t, r) {
  let {
    "aria-current": n = "page",
    caseSensitive: o = !1,
    className: i = "",
    end: s = !1,
    style: a,
    to: u,
    children: l
  } = t, f = Hr(t, Da), d = At(u, {
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
  return /* @__PURE__ */ b.createElement(ti, Se({}, f, {
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
process.env.NODE_ENV !== "production" && (La.displayName = "NavLink");
const Ia = /* @__PURE__ */ b.forwardRef((e, t) => /* @__PURE__ */ b.createElement(ri, Se({}, e, {
  ref: t
})));
process.env.NODE_ENV !== "production" && (Ia.displayName = "Form");
const ri = /* @__PURE__ */ b.forwardRef((e, t) => {
  let {
    reloadDocument: r,
    replace: n,
    method: o = ft,
    action: i,
    onSubmit: s,
    fetcherKey: a,
    routeId: u,
    relative: l
  } = e, f = Hr(e, $a), d = Ma(a, u), p = o.toLowerCase() === "get" ? "get" : "post", g = ni(i, {
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
process.env.NODE_ENV !== "production" && (ri.displayName = "FormImpl");
process.env.NODE_ENV;
var yr;
(function(e) {
  e.UseScrollRestoration = "useScrollRestoration", e.UseSubmitImpl = "useSubmitImpl", e.UseFetcher = "useFetcher";
})(yr || (yr = {}));
var qn;
(function(e) {
  e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration";
})(qn || (qn = {}));
function ja(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function Ua(e) {
  let t = b.useContext(Mr);
  return t || (process.env.NODE_ENV !== "production" ? P(!1, ja(e)) : P(!1)), t;
}
function Fa(e, t) {
  let {
    target: r,
    replace: n,
    state: o,
    preventScrollReset: i,
    relative: s
  } = t === void 0 ? {} : t, a = Ct(), u = fe(), l = At(e, {
    relative: s
  });
  return b.useCallback((f) => {
    if (Ta(f, r)) {
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
function jh(e) {
  process.env.NODE_ENV !== "production" && Ba(typeof URLSearchParams < "u", "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params\n\nIf you're unsure how to load polyfills, we recommend you check out https://polyfill.io/v3/ which provides some recommendations about how to load polyfills only for users that need them, instead of for every user.");
  let t = b.useRef(gr(e)), r = fe(), n = b.useMemo(() => Ca(r.search, t.current), [r.search]), o = Ct(), i = b.useCallback((s, a) => {
    const u = gr(typeof s == "function" ? s(n) : s);
    o("?" + u, a);
  }, [o, n]);
  return [n, i];
}
function Ma(e, t) {
  let {
    router: r
  } = Ua(yr.UseSubmitImpl), n = ni();
  return b.useCallback(function(o, i) {
    if (i === void 0 && (i = {}), typeof document > "u")
      throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
    let {
      method: s,
      encType: a,
      formData: u,
      url: l
    } = Aa(o, n, i), f = l.pathname + l.search, d = {
      replace: i.replace,
      formData: u,
      formMethod: s,
      formEncType: a
    };
    e ? (t == null && (process.env.NODE_ENV !== "production" ? P(!1, "No routeId available for useFetcher()") : P(!1)), r.fetch(e, t, f, d)) : r.navigate(f, d);
  }, [n, r, e, t]);
}
function ni(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t, {
    basename: n
  } = b.useContext(be), o = b.useContext(X);
  o || (process.env.NODE_ENV !== "production" ? P(!1, "useFormAction must be used inside a RouteContext") : P(!1));
  let [i] = o.matches.slice(-1), s = Se({}, At(e || ".", {
    relative: r
  })), a = fe();
  if (e == null && (s.search = a.search, s.hash = a.hash, i.route.index)) {
    let u = new URLSearchParams(s.search);
    u.delete("index"), s.search = u.toString() ? "?" + u.toString() : "";
  }
  return (!e || e === ".") && i.route.index && (s.search = s.search ? s.search.replace(/^\?/, "?index&") : "?index"), n !== "/" && (s.pathname = s.pathname === "/" ? n : ue([n, s.pathname])), Le(s);
}
function Uh(e) {
  b.useEffect(() => (window.addEventListener("beforeunload", e), () => {
    window.removeEventListener("beforeunload", e);
  }), [e]);
}
function Ba(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
var Va = typeof global == "object" && global && global.Object === Object && global;
const oi = Va;
var ka = typeof self == "object" && self && self.Object === Object && self, Ha = oi || ka || Function("return this")();
const Z = Ha;
var Wa = Z.Symbol;
const ge = Wa;
var ii = Object.prototype, qa = ii.hasOwnProperty, za = ii.toString, ke = ge ? ge.toStringTag : void 0;
function Ga(e) {
  var t = qa.call(e, ke), r = e[ke];
  try {
    e[ke] = void 0;
    var n = !0;
  } catch {
  }
  var o = za.call(e);
  return n && (t ? e[ke] = r : delete e[ke]), o;
}
var Ja = Object.prototype, Ka = Ja.toString;
function Ya(e) {
  return Ka.call(e);
}
var Xa = "[object Null]", Za = "[object Undefined]", zn = ge ? ge.toStringTag : void 0;
function xe(e) {
  return e == null ? e === void 0 ? Za : Xa : zn && zn in Object(e) ? Ga(e) : Ya(e);
}
function ye(e) {
  return e != null && typeof e == "object";
}
var Qa = "[object Symbol]";
function Dt(e) {
  return typeof e == "symbol" || ye(e) && xe(e) == Qa;
}
function eu(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, o = Array(n); ++r < n; )
    o[r] = t(e[r], r, e);
  return o;
}
var tu = Array.isArray;
const K = tu;
var ru = 1 / 0, Gn = ge ? ge.prototype : void 0, Jn = Gn ? Gn.toString : void 0;
function si(e) {
  if (typeof e == "string")
    return e;
  if (K(e))
    return eu(e, si) + "";
  if (Dt(e))
    return Jn ? Jn.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -ru ? "-0" : t;
}
var nu = /\s/;
function ou(e) {
  for (var t = e.length; t-- && nu.test(e.charAt(t)); )
    ;
  return t;
}
var iu = /^\s+/;
function su(e) {
  return e && e.slice(0, ou(e) + 1).replace(iu, "");
}
function Y(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var Kn = 0 / 0, au = /^[-+]0x[0-9a-f]+$/i, uu = /^0b[01]+$/i, cu = /^0o[0-7]+$/i, lu = parseInt;
function Yn(e) {
  if (typeof e == "number")
    return e;
  if (Dt(e))
    return Kn;
  if (Y(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = Y(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = su(e);
  var r = uu.test(e);
  return r || cu.test(e) ? lu(e.slice(2), r ? 2 : 8) : au.test(e) ? Kn : +e;
}
function Wr(e) {
  return e;
}
var fu = "[object AsyncFunction]", du = "[object Function]", pu = "[object GeneratorFunction]", hu = "[object Proxy]";
function qr(e) {
  if (!Y(e))
    return !1;
  var t = xe(e);
  return t == du || t == pu || t == fu || t == hu;
}
var mu = Z["__core-js_shared__"];
const tr = mu;
var Xn = function() {
  var e = /[^.]+$/.exec(tr && tr.keys && tr.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function vu(e) {
  return !!Xn && Xn in e;
}
var gu = Function.prototype, yu = gu.toString;
function Pe(e) {
  if (e != null) {
    try {
      return yu.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var bu = /[\\^$.*+?()[\]{}|]/g, Eu = /^\[object .+?Constructor\]$/, wu = Function.prototype, _u = Object.prototype, Su = wu.toString, Ou = _u.hasOwnProperty, Ru = RegExp(
  "^" + Su.call(Ou).replace(bu, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function xu(e) {
  if (!Y(e) || vu(e))
    return !1;
  var t = qr(e) ? Ru : Eu;
  return t.test(Pe(e));
}
function Pu(e, t) {
  return e == null ? void 0 : e[t];
}
function Te(e, t) {
  var r = Pu(e, t);
  return xu(r) ? r : void 0;
}
var Tu = Te(Z, "WeakMap");
const br = Tu;
var Zn = Object.create, Cu = function() {
  function e() {
  }
  return function(t) {
    if (!Y(t))
      return {};
    if (Zn)
      return Zn(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}();
const Au = Cu;
function Nu(e, t, r) {
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
function Du() {
}
function $u(e, t) {
  var r = -1, n = e.length;
  for (t || (t = Array(n)); ++r < n; )
    t[r] = e[r];
  return t;
}
var Lu = 800, Iu = 16, ju = Date.now;
function Uu(e) {
  var t = 0, r = 0;
  return function() {
    var n = ju(), o = Iu - (n - r);
    if (r = n, o > 0) {
      if (++t >= Lu)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function Fu(e) {
  return function() {
    return e;
  };
}
var Mu = function() {
  try {
    var e = Te(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
const Et = Mu;
var Bu = Et ? function(e, t) {
  return Et(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Fu(t),
    writable: !0
  });
} : Wr;
const Vu = Bu;
var ku = Uu(Vu);
const Hu = ku;
function Wu(e, t, r, n) {
  for (var o = e.length, i = r + (n ? 1 : -1); n ? i-- : ++i < o; )
    if (t(e[i], i, e))
      return i;
  return -1;
}
function qu(e) {
  return e !== e;
}
function zu(e, t, r) {
  for (var n = r - 1, o = e.length; ++n < o; )
    if (e[n] === t)
      return n;
  return -1;
}
function Gu(e, t, r) {
  return t === t ? zu(e, t, r) : Wu(e, qu, r);
}
function Ju(e, t) {
  var r = e == null ? 0 : e.length;
  return !!r && Gu(e, t, 0) > -1;
}
var Ku = 9007199254740991, Yu = /^(?:0|[1-9]\d*)$/;
function zr(e, t) {
  var r = typeof e;
  return t = t ?? Ku, !!t && (r == "number" || r != "symbol" && Yu.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function $t(e, t, r) {
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
var Xu = Object.prototype, Zu = Xu.hasOwnProperty;
function Qu(e, t, r) {
  var n = e[t];
  (!(Zu.call(e, t) && tt(n, r)) || r === void 0 && !(t in e)) && $t(e, t, r);
}
function ec(e, t, r, n) {
  var o = !r;
  r || (r = {});
  for (var i = -1, s = t.length; ++i < s; ) {
    var a = t[i], u = n ? n(r[a], e[a], a, r, e) : void 0;
    u === void 0 && (u = e[a]), o ? $t(r, a, u) : Qu(r, a, u);
  }
  return r;
}
var Qn = Math.max;
function tc(e, t, r) {
  return t = Qn(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var n = arguments, o = -1, i = Qn(n.length - t, 0), s = Array(i); ++o < i; )
      s[o] = n[t + o];
    o = -1;
    for (var a = Array(t + 1); ++o < t; )
      a[o] = n[o];
    return a[t] = r(s), Nu(e, this, a);
  };
}
function rc(e, t) {
  return Hu(tc(e, t, Wr), e + "");
}
var nc = 9007199254740991;
function Gr(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= nc;
}
function Lt(e) {
  return e != null && Gr(e.length) && !qr(e);
}
function oc(e, t, r) {
  if (!Y(r))
    return !1;
  var n = typeof t;
  return (n == "number" ? Lt(r) && zr(t, r.length) : n == "string" && t in r) ? tt(r[t], e) : !1;
}
function ic(e) {
  return rc(function(t, r) {
    var n = -1, o = r.length, i = o > 1 ? r[o - 1] : void 0, s = o > 2 ? r[2] : void 0;
    for (i = e.length > 3 && typeof i == "function" ? (o--, i) : void 0, s && oc(r[0], r[1], s) && (i = o < 3 ? void 0 : i, o = 1), t = Object(t); ++n < o; ) {
      var a = r[n];
      a && e(t, a, n, i);
    }
    return t;
  });
}
var sc = Object.prototype;
function Jr(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || sc;
  return e === r;
}
function ac(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var uc = "[object Arguments]";
function eo(e) {
  return ye(e) && xe(e) == uc;
}
var ai = Object.prototype, cc = ai.hasOwnProperty, lc = ai.propertyIsEnumerable, fc = eo(function() {
  return arguments;
}()) ? eo : function(e) {
  return ye(e) && cc.call(e, "callee") && !lc.call(e, "callee");
};
const wt = fc;
function dc() {
  return !1;
}
var ui = typeof exports == "object" && exports && !exports.nodeType && exports, to = ui && typeof module == "object" && module && !module.nodeType && module, pc = to && to.exports === ui, ro = pc ? Z.Buffer : void 0, hc = ro ? ro.isBuffer : void 0, mc = hc || dc;
const _t = mc;
var vc = "[object Arguments]", gc = "[object Array]", yc = "[object Boolean]", bc = "[object Date]", Ec = "[object Error]", wc = "[object Function]", _c = "[object Map]", Sc = "[object Number]", Oc = "[object Object]", Rc = "[object RegExp]", xc = "[object Set]", Pc = "[object String]", Tc = "[object WeakMap]", Cc = "[object ArrayBuffer]", Ac = "[object DataView]", Nc = "[object Float32Array]", Dc = "[object Float64Array]", $c = "[object Int8Array]", Lc = "[object Int16Array]", Ic = "[object Int32Array]", jc = "[object Uint8Array]", Uc = "[object Uint8ClampedArray]", Fc = "[object Uint16Array]", Mc = "[object Uint32Array]", j = {};
j[Nc] = j[Dc] = j[$c] = j[Lc] = j[Ic] = j[jc] = j[Uc] = j[Fc] = j[Mc] = !0;
j[vc] = j[gc] = j[Cc] = j[yc] = j[Ac] = j[bc] = j[Ec] = j[wc] = j[_c] = j[Sc] = j[Oc] = j[Rc] = j[xc] = j[Pc] = j[Tc] = !1;
function Bc(e) {
  return ye(e) && Gr(e.length) && !!j[xe(e)];
}
function Vc(e) {
  return function(t) {
    return e(t);
  };
}
var ci = typeof exports == "object" && exports && !exports.nodeType && exports, qe = ci && typeof module == "object" && module && !module.nodeType && module, kc = qe && qe.exports === ci, rr = kc && oi.process, Hc = function() {
  try {
    var e = qe && qe.require && qe.require("util").types;
    return e || rr && rr.binding && rr.binding("util");
  } catch {
  }
}();
const no = Hc;
var oo = no && no.isTypedArray, Wc = oo ? Vc(oo) : Bc;
const Kr = Wc;
var qc = Object.prototype, zc = qc.hasOwnProperty;
function li(e, t) {
  var r = K(e), n = !r && wt(e), o = !r && !n && _t(e), i = !r && !n && !o && Kr(e), s = r || n || o || i, a = s ? ac(e.length, String) : [], u = a.length;
  for (var l in e)
    (t || zc.call(e, l)) && !(s && (l == "length" || o && (l == "offset" || l == "parent") || i && (l == "buffer" || l == "byteLength" || l == "byteOffset") || zr(l, u))) && a.push(l);
  return a;
}
function fi(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var Gc = fi(Object.keys, Object);
const Jc = Gc;
var Kc = Object.prototype, Yc = Kc.hasOwnProperty;
function Xc(e) {
  if (!Jr(e))
    return Jc(e);
  var t = [];
  for (var r in Object(e))
    Yc.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
function Yr(e) {
  return Lt(e) ? li(e) : Xc(e);
}
function Zc(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var Qc = Object.prototype, el = Qc.hasOwnProperty;
function tl(e) {
  if (!Y(e))
    return Zc(e);
  var t = Jr(e), r = [];
  for (var n in e)
    n == "constructor" && (t || !el.call(e, n)) || r.push(n);
  return r;
}
function di(e) {
  return Lt(e) ? li(e, !0) : tl(e);
}
var rl = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, nl = /^\w*$/;
function Xr(e, t) {
  if (K(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || Dt(e) ? !0 : nl.test(e) || !rl.test(e) || t != null && e in Object(t);
}
var ol = Te(Object, "create");
const ze = ol;
function il() {
  this.__data__ = ze ? ze(null) : {}, this.size = 0;
}
function sl(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var al = "__lodash_hash_undefined__", ul = Object.prototype, cl = ul.hasOwnProperty;
function ll(e) {
  var t = this.__data__;
  if (ze) {
    var r = t[e];
    return r === al ? void 0 : r;
  }
  return cl.call(t, e) ? t[e] : void 0;
}
var fl = Object.prototype, dl = fl.hasOwnProperty;
function pl(e) {
  var t = this.__data__;
  return ze ? t[e] !== void 0 : dl.call(t, e);
}
var hl = "__lodash_hash_undefined__";
function ml(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = ze && t === void 0 ? hl : t, this;
}
function Oe(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Oe.prototype.clear = il;
Oe.prototype.delete = sl;
Oe.prototype.get = ll;
Oe.prototype.has = pl;
Oe.prototype.set = ml;
function vl() {
  this.__data__ = [], this.size = 0;
}
function It(e, t) {
  for (var r = e.length; r--; )
    if (tt(e[r][0], t))
      return r;
  return -1;
}
var gl = Array.prototype, yl = gl.splice;
function bl(e) {
  var t = this.__data__, r = It(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : yl.call(t, r, 1), --this.size, !0;
}
function El(e) {
  var t = this.__data__, r = It(t, e);
  return r < 0 ? void 0 : t[r][1];
}
function wl(e) {
  return It(this.__data__, e) > -1;
}
function _l(e, t) {
  var r = this.__data__, n = It(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
function de(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
de.prototype.clear = vl;
de.prototype.delete = bl;
de.prototype.get = El;
de.prototype.has = wl;
de.prototype.set = _l;
var Sl = Te(Z, "Map");
const Ge = Sl;
function Ol() {
  this.size = 0, this.__data__ = {
    hash: new Oe(),
    map: new (Ge || de)(),
    string: new Oe()
  };
}
function Rl(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function jt(e, t) {
  var r = e.__data__;
  return Rl(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
function xl(e) {
  var t = jt(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function Pl(e) {
  return jt(this, e).get(e);
}
function Tl(e) {
  return jt(this, e).has(e);
}
function Cl(e, t) {
  var r = jt(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
function pe(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
pe.prototype.clear = Ol;
pe.prototype.delete = xl;
pe.prototype.get = Pl;
pe.prototype.has = Tl;
pe.prototype.set = Cl;
var Al = "Expected a function";
function Zr(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Al);
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
var Nl = 500;
function Dl(e) {
  var t = Zr(e, function(n) {
    return r.size === Nl && r.clear(), n;
  }), r = t.cache;
  return t;
}
var $l = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Ll = /\\(\\)?/g, Il = Dl(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace($l, function(r, n, o, i) {
    t.push(o ? i.replace(Ll, "$1") : n || r);
  }), t;
});
const jl = Il;
function Ul(e) {
  return e == null ? "" : si(e);
}
function pi(e, t) {
  return K(e) ? e : Xr(e, t) ? [e] : jl(Ul(e));
}
var Fl = 1 / 0;
function Ut(e) {
  if (typeof e == "string" || Dt(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -Fl ? "-0" : t;
}
function hi(e, t) {
  t = pi(t, e);
  for (var r = 0, n = t.length; e != null && r < n; )
    e = e[Ut(t[r++])];
  return r && r == n ? e : void 0;
}
function Ml(e, t, r) {
  var n = e == null ? void 0 : hi(e, t);
  return n === void 0 ? r : n;
}
function Bl(e, t) {
  for (var r = -1, n = t.length, o = e.length; ++r < n; )
    e[o + r] = t[r];
  return e;
}
var Vl = fi(Object.getPrototypeOf, Object);
const mi = Vl;
var kl = "[object Object]", Hl = Function.prototype, Wl = Object.prototype, vi = Hl.toString, ql = Wl.hasOwnProperty, zl = vi.call(Object);
function Gl(e) {
  if (!ye(e) || xe(e) != kl)
    return !1;
  var t = mi(e);
  if (t === null)
    return !0;
  var r = ql.call(t, "constructor") && t.constructor;
  return typeof r == "function" && r instanceof r && vi.call(r) == zl;
}
function Jl() {
  this.__data__ = new de(), this.size = 0;
}
function Kl(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
function Yl(e) {
  return this.__data__.get(e);
}
function Xl(e) {
  return this.__data__.has(e);
}
var Zl = 200;
function Ql(e, t) {
  var r = this.__data__;
  if (r instanceof de) {
    var n = r.__data__;
    if (!Ge || n.length < Zl - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new pe(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
function ne(e) {
  var t = this.__data__ = new de(e);
  this.size = t.size;
}
ne.prototype.clear = Jl;
ne.prototype.delete = Kl;
ne.prototype.get = Yl;
ne.prototype.has = Xl;
ne.prototype.set = Ql;
var gi = typeof exports == "object" && exports && !exports.nodeType && exports, io = gi && typeof module == "object" && module && !module.nodeType && module, ef = io && io.exports === gi, so = ef ? Z.Buffer : void 0, ao = so ? so.allocUnsafe : void 0;
function tf(e, t) {
  if (t)
    return e.slice();
  var r = e.length, n = ao ? ao(r) : new e.constructor(r);
  return e.copy(n), n;
}
function rf(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, o = 0, i = []; ++r < n; ) {
    var s = e[r];
    t(s, r, e) && (i[o++] = s);
  }
  return i;
}
function nf() {
  return [];
}
var of = Object.prototype, sf = of.propertyIsEnumerable, uo = Object.getOwnPropertySymbols, af = uo ? function(e) {
  return e == null ? [] : (e = Object(e), rf(uo(e), function(t) {
    return sf.call(e, t);
  }));
} : nf;
const uf = af;
function cf(e, t, r) {
  var n = t(e);
  return K(e) ? n : Bl(n, r(e));
}
function co(e) {
  return cf(e, Yr, uf);
}
var lf = Te(Z, "DataView");
const Er = lf;
var ff = Te(Z, "Promise");
const wr = ff;
var df = Te(Z, "Set");
const $e = df;
var lo = "[object Map]", pf = "[object Object]", fo = "[object Promise]", po = "[object Set]", ho = "[object WeakMap]", mo = "[object DataView]", hf = Pe(Er), mf = Pe(Ge), vf = Pe(wr), gf = Pe($e), yf = Pe(br), Ee = xe;
(Er && Ee(new Er(new ArrayBuffer(1))) != mo || Ge && Ee(new Ge()) != lo || wr && Ee(wr.resolve()) != fo || $e && Ee(new $e()) != po || br && Ee(new br()) != ho) && (Ee = function(e) {
  var t = xe(e), r = t == pf ? e.constructor : void 0, n = r ? Pe(r) : "";
  if (n)
    switch (n) {
      case hf:
        return mo;
      case mf:
        return lo;
      case vf:
        return fo;
      case gf:
        return po;
      case yf:
        return ho;
    }
  return t;
});
const vo = Ee;
var bf = Z.Uint8Array;
const St = bf;
function Ef(e) {
  var t = new e.constructor(e.byteLength);
  return new St(t).set(new St(e)), t;
}
function wf(e, t) {
  var r = t ? Ef(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
function _f(e) {
  return typeof e.constructor == "function" && !Jr(e) ? Au(mi(e)) : {};
}
var Sf = "__lodash_hash_undefined__";
function Of(e) {
  return this.__data__.set(e, Sf), this;
}
function Rf(e) {
  return this.__data__.has(e);
}
function Je(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.__data__ = new pe(); ++t < r; )
    this.add(e[t]);
}
Je.prototype.add = Je.prototype.push = Of;
Je.prototype.has = Rf;
function xf(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
    if (t(e[r], r, e))
      return !0;
  return !1;
}
function yi(e, t) {
  return e.has(t);
}
var Pf = 1, Tf = 2;
function bi(e, t, r, n, o, i) {
  var s = r & Pf, a = e.length, u = t.length;
  if (a != u && !(s && u > a))
    return !1;
  var l = i.get(e), f = i.get(t);
  if (l && f)
    return l == t && f == e;
  var d = -1, p = !0, g = r & Tf ? new Je() : void 0;
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
      if (!xf(t, function(w, D) {
        if (!yi(g, D) && (v === w || o(v, w, r, n, i)))
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
function Cf(e) {
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
var Af = 1, Nf = 2, Df = "[object Boolean]", $f = "[object Date]", Lf = "[object Error]", If = "[object Map]", jf = "[object Number]", Uf = "[object RegExp]", Ff = "[object Set]", Mf = "[object String]", Bf = "[object Symbol]", Vf = "[object ArrayBuffer]", kf = "[object DataView]", go = ge ? ge.prototype : void 0, nr = go ? go.valueOf : void 0;
function Hf(e, t, r, n, o, i, s) {
  switch (r) {
    case kf:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case Vf:
      return !(e.byteLength != t.byteLength || !i(new St(e), new St(t)));
    case Df:
    case $f:
    case jf:
      return tt(+e, +t);
    case Lf:
      return e.name == t.name && e.message == t.message;
    case Uf:
    case Mf:
      return e == t + "";
    case If:
      var a = Cf;
    case Ff:
      var u = n & Af;
      if (a || (a = Qr), e.size != t.size && !u)
        return !1;
      var l = s.get(e);
      if (l)
        return l == t;
      n |= Nf, s.set(e, t);
      var f = bi(a(e), a(t), n, o, i, s);
      return s.delete(e), f;
    case Bf:
      if (nr)
        return nr.call(e) == nr.call(t);
  }
  return !1;
}
var Wf = 1, qf = Object.prototype, zf = qf.hasOwnProperty;
function Gf(e, t, r, n, o, i) {
  var s = r & Wf, a = co(e), u = a.length, l = co(t), f = l.length;
  if (u != f && !s)
    return !1;
  for (var d = u; d--; ) {
    var p = a[d];
    if (!(s ? p in t : zf.call(t, p)))
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
var Jf = 1, yo = "[object Arguments]", bo = "[object Array]", ut = "[object Object]", Kf = Object.prototype, Eo = Kf.hasOwnProperty;
function Yf(e, t, r, n, o, i) {
  var s = K(e), a = K(t), u = s ? bo : vo(e), l = a ? bo : vo(t);
  u = u == yo ? ut : u, l = l == yo ? ut : l;
  var f = u == ut, d = l == ut, p = u == l;
  if (p && _t(e)) {
    if (!_t(t))
      return !1;
    s = !0, f = !1;
  }
  if (p && !f)
    return i || (i = new ne()), s || Kr(e) ? bi(e, t, r, n, o, i) : Hf(e, t, u, r, n, o, i);
  if (!(r & Jf)) {
    var g = f && Eo.call(e, "__wrapped__"), v = d && Eo.call(t, "__wrapped__");
    if (g || v) {
      var h = g ? e.value() : e, S = v ? t.value() : t;
      return i || (i = new ne()), o(h, S, r, n, i);
    }
  }
  return p ? (i || (i = new ne()), Gf(e, t, r, n, o, i)) : !1;
}
function en(e, t, r, n, o) {
  return e === t ? !0 : e == null || t == null || !ye(e) && !ye(t) ? e !== e && t !== t : Yf(e, t, r, n, en, o);
}
var Xf = 1, Zf = 2;
function Qf(e, t, r, n) {
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
      if (!(p === void 0 ? en(f, l, Xf | Zf, n, d) : p))
        return !1;
    }
  }
  return !0;
}
function Ei(e) {
  return e === e && !Y(e);
}
function ed(e) {
  for (var t = Yr(e), r = t.length; r--; ) {
    var n = t[r], o = e[n];
    t[r] = [n, o, Ei(o)];
  }
  return t;
}
function wi(e, t) {
  return function(r) {
    return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
  };
}
function td(e) {
  var t = ed(e);
  return t.length == 1 && t[0][2] ? wi(t[0][0], t[0][1]) : function(r) {
    return r === e || Qf(r, e, t);
  };
}
function rd(e, t) {
  return e != null && t in Object(e);
}
function nd(e, t, r) {
  t = pi(t, e);
  for (var n = -1, o = t.length, i = !1; ++n < o; ) {
    var s = Ut(t[n]);
    if (!(i = e != null && r(e, s)))
      break;
    e = e[s];
  }
  return i || ++n != o ? i : (o = e == null ? 0 : e.length, !!o && Gr(o) && zr(s, o) && (K(e) || wt(e)));
}
function od(e, t) {
  return e != null && nd(e, t, rd);
}
var id = 1, sd = 2;
function ad(e, t) {
  return Xr(e) && Ei(t) ? wi(Ut(e), t) : function(r) {
    var n = Ml(r, e);
    return n === void 0 && n === t ? od(r, e) : en(t, n, id | sd);
  };
}
function ud(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function cd(e) {
  return function(t) {
    return hi(t, e);
  };
}
function ld(e) {
  return Xr(e) ? ud(Ut(e)) : cd(e);
}
function _i(e) {
  return typeof e == "function" ? e : e == null ? Wr : typeof e == "object" ? K(e) ? ad(e[0], e[1]) : td(e) : ld(e);
}
function fd(e) {
  return function(t, r, n) {
    for (var o = -1, i = Object(t), s = n(t), a = s.length; a--; ) {
      var u = s[e ? a : ++o];
      if (r(i[u], u, i) === !1)
        break;
    }
    return t;
  };
}
var dd = fd();
const Si = dd;
function pd(e, t) {
  return e && Si(e, t, Yr);
}
var hd = function() {
  return Z.Date.now();
};
const or = hd;
var md = "Expected a function", vd = Math.max, gd = Math.min;
function yd(e, t, r) {
  var n, o, i, s, a, u, l = 0, f = !1, d = !1, p = !0;
  if (typeof e != "function")
    throw new TypeError(md);
  t = Yn(t) || 0, Y(r) && (f = !!r.leading, d = "maxWait" in r, i = d ? vd(Yn(r.maxWait) || 0, t) : i, p = "trailing" in r ? !!r.trailing : p);
  function g(R) {
    var U = n, $ = o;
    return n = o = void 0, l = R, s = e.apply($, U), s;
  }
  function v(R) {
    return l = R, a = setTimeout(w, t), f ? g(R) : s;
  }
  function h(R) {
    var U = R - u, $ = R - l, F = t - U;
    return d ? gd(F, i - $) : F;
  }
  function S(R) {
    var U = R - u, $ = R - l;
    return u === void 0 || U >= t || U < 0 || d && $ >= i;
  }
  function w() {
    var R = or();
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
    return a === void 0 ? s : D(or());
  }
  function T() {
    var R = or(), U = S(R);
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
function _r(e, t, r) {
  (r !== void 0 && !tt(e[t], r) || r === void 0 && !(t in e)) && $t(e, t, r);
}
function bd(e) {
  return ye(e) && Lt(e);
}
function Sr(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function Ed(e) {
  return ec(e, di(e));
}
function wd(e, t, r, n, o, i, s) {
  var a = Sr(e, r), u = Sr(t, r), l = s.get(u);
  if (l) {
    _r(e, r, l);
    return;
  }
  var f = i ? i(a, u, r + "", e, t, s) : void 0, d = f === void 0;
  if (d) {
    var p = K(u), g = !p && _t(u), v = !p && !g && Kr(u);
    f = u, p || g || v ? K(a) ? f = a : bd(a) ? f = $u(a) : g ? (d = !1, f = tf(u, !0)) : v ? (d = !1, f = wf(u, !0)) : f = [] : Gl(u) || wt(u) ? (f = a, wt(a) ? f = Ed(a) : (!Y(a) || qr(a)) && (f = _f(u))) : d = !1;
  }
  d && (s.set(u, f), o(f, u, n, i, s), s.delete(u)), _r(e, r, f);
}
function Oi(e, t, r, n, o) {
  e !== t && Si(t, function(i, s) {
    if (o || (o = new ne()), Y(i))
      wd(e, t, s, r, Oi, n, o);
    else {
      var a = n ? n(Sr(e, s), i, s + "", e, t, o) : void 0;
      a === void 0 && (a = i), _r(e, s, a);
    }
  }, di);
}
function _d(e, t, r) {
  for (var n = -1, o = e == null ? 0 : e.length; ++n < o; )
    if (r(t, e[n]))
      return !0;
  return !1;
}
function Sd(e, t) {
  var r = {};
  return t = _i(t), pd(e, function(n, o, i) {
    $t(r, o, t(n, o, i));
  }), r;
}
var Od = ic(function(e, t, r) {
  Oi(e, t, r);
});
const Rd = Od;
var xd = 1 / 0, Pd = $e && 1 / Qr(new $e([, -0]))[1] == xd ? function(e) {
  return new $e(e);
} : Du;
const Td = Pd;
var Cd = 200;
function Ad(e, t, r) {
  var n = -1, o = Ju, i = e.length, s = !0, a = [], u = a;
  if (r)
    s = !1, o = _d;
  else if (i >= Cd) {
    var l = t ? null : Td(e);
    if (l)
      return Qr(l);
    s = !1, o = yi, u = new Je();
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
function Nd(e, t) {
  return e && e.length ? Ad(e, _i(t)) : [];
}
var Or = /* @__PURE__ */ ((e) => (e.Json = "application/json", e.UrlEncoded = "application/x-www-form-urlencoded", e))(Or || {});
class Dd {
  constructor() {
    z(this, "listeners");
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
function wo(e) {
  for (const t in e)
    Object.prototype.hasOwnProperty.call(e, t) && e[t] === void 0 && delete e[t];
  return e;
}
function Fh(e) {
  for (const t in e)
    Object.prototype.hasOwnProperty.call(e, t) && delete e[t];
  return e;
}
function Mh(e) {
  for (const t in e)
    Object.prototype.hasOwnProperty.call(e, t) && (e[t] = void 0);
  return e;
}
const Bh = /(^[0-9]{9,16}$)\b/g, Vh = /^[a-z0-9\-\d@._]+$/, kh = /^(?=.*[a-z])(?=.*?[A-Z])(?=.*[@$!%*#?&])[a-zA-Z@$!%*#?&\d]{8,32}$/g;
function Hh(e) {
  return !/[^\x00-\x7F]/.test(e);
}
const Rr = (e, t = "", r = new FormData()) => (Object.keys(e).forEach((n) => {
  const o = t !== "" ? t + "." + n : n, i = e[n];
  Array.isArray(i) ? i.forEach((s, a) => {
    typeof s == "object" ? s instanceof File ? r.append(o, s) : r = Rr(s, o + `[${a}]`, r) : r.append(o, s);
  }) : typeof i == "object" ? i instanceof File ? r.append(o, i) : r = Rr(i, o, r) : r.append(o, i);
}), r), Ot = (e, t = "", r = new URLSearchParams()) => (Object.keys(e).forEach((n) => {
  const o = t !== "" ? t + "." + n : n, i = e[n];
  Array.isArray(i) ? i.forEach((s, a) => {
    typeof s == "object" ? r = Ot(s, o + `[${a}]`, r) : r.append(o, s);
  }) : typeof i == "object" ? r = Ot(i, o, r) : r.append(o, i);
}), r);
class $d {
  constructor() {
    z(this, "modeEnv");
    z(this, "subdomain");
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
const xr = new $d();
class Ri {
  getToken(t) {
    if (this.getPrefix())
      return localStorage.getItem(`${this.getPrefix()}_${t}`) || "";
  }
  setToken(t, r) {
    if (this.getPrefix())
      return localStorage.setItem(`${this.getPrefix()}_${t}`, r);
  }
  getPrefix() {
    const t = xr.getConfig().modEnv, r = xr.getConfig().subdomain;
    return !t || !r ? "" : `${t}_${r}`;
  }
}
const dt = new Ri(), Wh = new Ri();
function qh(e, t) {
  return new Proxy(e, {
    set(r, n, o) {
      return r[n] = o, t(r), !0;
    }
  });
}
function _o(e) {
  let t = "";
  const r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n = r.length;
  for (let o = 0; o < e; o++)
    t += r.charAt(Math.floor(Math.random() * n));
  return t;
}
function xi(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Pi } = Object.prototype, { getPrototypeOf: tn } = Object, rn = ((e) => (t) => {
  const r = Pi.call(t);
  return e[r] || (e[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), he = (e) => (e = e.toLowerCase(), (t) => rn(t) === e), Ft = (e) => (t) => typeof t === e, { isArray: Me } = Array, Ke = Ft("undefined");
function Ld(e) {
  return e !== null && !Ke(e) && e.constructor !== null && !Ke(e.constructor) && Re(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Ti = he("ArrayBuffer");
function Id(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Ti(e.buffer), t;
}
const jd = Ft("string"), Re = Ft("function"), Ci = Ft("number"), nn = (e) => e !== null && typeof e == "object", Ud = (e) => e === !0 || e === !1, pt = (e) => {
  if (rn(e) !== "object")
    return !1;
  const t = tn(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, Fd = he("Date"), Md = he("File"), Bd = he("Blob"), Vd = he("FileList"), kd = (e) => nn(e) && Re(e.pipe), Hd = (e) => {
  const t = "[object FormData]";
  return e && (typeof FormData == "function" && e instanceof FormData || Pi.call(e) === t || Re(e.toString) && e.toString() === t);
}, Wd = he("URLSearchParams"), qd = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
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
function Ai(e, t) {
  t = t.toLowerCase();
  const r = Object.keys(e);
  let n = r.length, o;
  for (; n-- > 0; )
    if (o = r[n], t === o.toLowerCase())
      return o;
  return null;
}
const Ni = typeof self > "u" ? typeof global > "u" ? globalThis : global : self, Di = (e) => !Ke(e) && e !== Ni;
function Pr() {
  const { caseless: e } = Di(this) && this || {}, t = {}, r = (n, o) => {
    const i = e && Ai(t, o) || o;
    pt(t[i]) && pt(n) ? t[i] = Pr(t[i], n) : pt(n) ? t[i] = Pr({}, n) : Me(n) ? t[i] = n.slice() : t[i] = n;
  };
  for (let n = 0, o = arguments.length; n < o; n++)
    arguments[n] && rt(arguments[n], r);
  return t;
}
const zd = (e, t, r, { allOwnKeys: n } = {}) => (rt(t, (o, i) => {
  r && Re(o) ? e[i] = xi(o, r) : e[i] = o;
}, { allOwnKeys: n }), e), Gd = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Jd = (e, t, r, n) => {
  e.prototype = Object.create(t.prototype, n), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), r && Object.assign(e.prototype, r);
}, Kd = (e, t, r, n) => {
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
}, Yd = (e, t, r) => {
  e = String(e), (r === void 0 || r > e.length) && (r = e.length), r -= t.length;
  const n = e.indexOf(t, r);
  return n !== -1 && n === r;
}, Xd = (e) => {
  if (!e)
    return null;
  if (Me(e))
    return e;
  let t = e.length;
  if (!Ci(t))
    return null;
  const r = new Array(t);
  for (; t-- > 0; )
    r[t] = e[t];
  return r;
}, Zd = ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && tn(Uint8Array)), Qd = (e, t) => {
  const n = (e && e[Symbol.iterator]).call(e);
  let o;
  for (; (o = n.next()) && !o.done; ) {
    const i = o.value;
    t.call(e, i[0], i[1]);
  }
}, ep = (e, t) => {
  let r;
  const n = [];
  for (; (r = e.exec(t)) !== null; )
    n.push(r);
  return n;
}, tp = he("HTMLFormElement"), rp = (e) => e.toLowerCase().replace(
  /[_-\s]([a-z\d])(\w*)/g,
  function(r, n, o) {
    return n.toUpperCase() + o;
  }
), So = (({ hasOwnProperty: e }) => (t, r) => e.call(t, r))(Object.prototype), np = he("RegExp"), $i = (e, t) => {
  const r = Object.getOwnPropertyDescriptors(e), n = {};
  rt(r, (o, i) => {
    t(o, i, e) !== !1 && (n[i] = o);
  }), Object.defineProperties(e, n);
}, op = (e) => {
  $i(e, (t, r) => {
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
}, ip = (e, t) => {
  const r = {}, n = (o) => {
    o.forEach((i) => {
      r[i] = !0;
    });
  };
  return Me(e) ? n(e) : n(String(e).split(t)), r;
}, sp = () => {
}, ap = (e, t) => (e = +e, Number.isFinite(e) ? e : t), up = (e) => {
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
  isArrayBuffer: Ti,
  isBuffer: Ld,
  isFormData: Hd,
  isArrayBufferView: Id,
  isString: jd,
  isNumber: Ci,
  isBoolean: Ud,
  isObject: nn,
  isPlainObject: pt,
  isUndefined: Ke,
  isDate: Fd,
  isFile: Md,
  isBlob: Bd,
  isRegExp: np,
  isFunction: Re,
  isStream: kd,
  isURLSearchParams: Wd,
  isTypedArray: Zd,
  isFileList: Vd,
  forEach: rt,
  merge: Pr,
  extend: zd,
  trim: qd,
  stripBOM: Gd,
  inherits: Jd,
  toFlatObject: Kd,
  kindOf: rn,
  kindOfTest: he,
  endsWith: Yd,
  toArray: Xd,
  forEachEntry: Qd,
  matchAll: ep,
  isHTMLForm: tp,
  hasOwnProperty: So,
  hasOwnProp: So,
  reduceDescriptors: $i,
  freezeMethods: op,
  toObjectSet: ip,
  toCamelCase: rp,
  noop: sp,
  toFiniteNumber: ap,
  findKey: Ai,
  global: Ni,
  isContextDefined: Di,
  toJSONObject: up
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
const Li = N.prototype, Ii = {};
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
  Ii[e] = { value: e };
});
Object.defineProperties(N, Ii);
Object.defineProperty(Li, "isAxiosError", { value: !0 });
N.from = (e, t, r, n, o, i) => {
  const s = Object.create(Li);
  return m.toFlatObject(e, s, function(u) {
    return u !== Error.prototype;
  }, (a) => a !== "isAxiosError"), N.call(s, e.message, t, r, n, o), s.cause = e, s.name = e.name, i && Object.assign(s, i), s;
};
var cp = typeof self == "object" ? self.FormData : window.FormData;
const lp = cp;
function Tr(e) {
  return m.isPlainObject(e) || m.isArray(e);
}
function ji(e) {
  return m.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Oo(e, t, r) {
  return e ? e.concat(t).map(function(o, i) {
    return o = ji(o), !r && i ? "[" + o + "]" : o;
  }).join(r ? "." : "") : t;
}
function fp(e) {
  return m.isArray(e) && !e.some(Tr);
}
const dp = m.toFlatObject(m, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function pp(e) {
  return e && m.isFunction(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator];
}
function Mt(e, t, r) {
  if (!m.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new (lp || FormData)(), r = m.toFlatObject(r, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(h, S) {
    return !m.isUndefined(S[h]);
  });
  const n = r.metaTokens, o = r.visitor || f, i = r.dots, s = r.indexes, u = (r.Blob || typeof Blob < "u" && Blob) && pp(t);
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
      else if (m.isArray(v) && fp(v) || m.isFileList(v) || m.endsWith(h, "[]") && (w = m.toArray(v)))
        return h = ji(h), w.forEach(function(O, _) {
          !(m.isUndefined(O) || O === null) && t.append(
            s === !0 ? Oo([h], _, i) : s === null ? h : h + "[]",
            l(O)
          );
        }), !1;
    }
    return Tr(v) ? !0 : (t.append(Oo(S, h, i), l(v)), !1);
  }
  const d = [], p = Object.assign(dp, {
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
function Ro(e) {
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
  this._pairs = [], e && Mt(e, this, t);
}
const Ui = on.prototype;
Ui.append = function(t, r) {
  this._pairs.push([t, r]);
};
Ui.toString = function(t) {
  const r = t ? function(n) {
    return t.call(this, n, Ro);
  } : Ro;
  return this._pairs.map(function(o) {
    return r(o[0]) + "=" + r(o[1]);
  }, "").join("&");
};
function hp(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Fi(e, t, r) {
  if (!t)
    return e;
  const n = r && r.encode || hp, o = r && r.serialize;
  let i;
  if (o ? i = o(t, r) : i = m.isURLSearchParams(t) ? t.toString() : new on(t, r).toString(n), i) {
    const s = e.indexOf("#");
    s !== -1 && (e = e.slice(0, s)), e += (e.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return e;
}
class mp {
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
const xo = mp, Mi = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, vp = typeof URLSearchParams < "u" ? URLSearchParams : on, gp = FormData, yp = (() => {
  let e;
  return typeof navigator < "u" && ((e = navigator.product) === "ReactNative" || e === "NativeScript" || e === "NS") ? !1 : typeof window < "u" && typeof document < "u";
})(), bp = (() => typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), re = {
  isBrowser: !0,
  classes: {
    URLSearchParams: vp,
    FormData: gp,
    Blob
  },
  isStandardBrowserEnv: yp,
  isStandardBrowserWebWorkerEnv: bp,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function Ep(e, t) {
  return Mt(e, new re.classes.URLSearchParams(), Object.assign({
    visitor: function(r, n, o, i) {
      return re.isNode && m.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function wp(e) {
  return m.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function _p(e) {
  const t = {}, r = Object.keys(e);
  let n;
  const o = r.length;
  let i;
  for (n = 0; n < o; n++)
    i = r[n], t[i] = e[i];
  return t;
}
function Bi(e) {
  function t(r, n, o, i) {
    let s = r[i++];
    const a = Number.isFinite(+s), u = i >= r.length;
    return s = !s && m.isArray(o) ? o.length : s, u ? (m.hasOwnProp(o, s) ? o[s] = [o[s], n] : o[s] = n, !a) : ((!o[s] || !m.isObject(o[s])) && (o[s] = []), t(r, n, o[s], i) && m.isArray(o[s]) && (o[s] = _p(o[s])), !a);
  }
  if (m.isFormData(e) && m.isFunction(e.entries)) {
    const r = {};
    return m.forEachEntry(e, (n, o) => {
      t(wp(n), o, r, 0);
    }), r;
  }
  return null;
}
const Sp = {
  "Content-Type": void 0
};
function Op(e, t, r) {
  if (m.isString(e))
    try {
      return (t || JSON.parse)(e), m.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (r || JSON.stringify)(e);
}
const Bt = {
  transitional: Mi,
  adapter: ["xhr", "http"],
  transformRequest: [function(t, r) {
    const n = r.getContentType() || "", o = n.indexOf("application/json") > -1, i = m.isObject(t);
    if (i && m.isHTMLForm(t) && (t = new FormData(t)), m.isFormData(t))
      return o && o ? JSON.stringify(Bi(t)) : t;
    if (m.isArrayBuffer(t) || m.isBuffer(t) || m.isStream(t) || m.isFile(t) || m.isBlob(t))
      return t;
    if (m.isArrayBufferView(t))
      return t.buffer;
    if (m.isURLSearchParams(t))
      return r.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let a;
    if (i) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return Ep(t, this.formSerializer).toString();
      if ((a = m.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
        const u = this.env && this.env.FormData;
        return Mt(
          a ? { "files[]": t } : t,
          u && new u(),
          this.formSerializer
        );
      }
    }
    return i || o ? (r.setContentType("application/json", !1), Op(t)) : t;
  }],
  transformResponse: [function(t) {
    const r = this.transitional || Bt.transitional, n = r && r.forcedJSONParsing, o = this.responseType === "json";
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
  Bt.headers[t] = {};
});
m.forEach(["post", "put", "patch"], function(t) {
  Bt.headers[t] = m.merge(Sp);
});
const sn = Bt, Rp = m.toObjectSet([
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
]), xp = (e) => {
  const t = {};
  let r, n, o;
  return e && e.split(`
`).forEach(function(s) {
    o = s.indexOf(":"), r = s.substring(0, o).trim().toLowerCase(), n = s.substring(o + 1).trim(), !(!r || t[r] && Rp[r]) && (r === "set-cookie" ? t[r] ? t[r].push(n) : t[r] = [n] : t[r] = t[r] ? t[r] + ", " + n : n);
  }), t;
}, Po = Symbol("internals");
function He(e) {
  return e && String(e).trim().toLowerCase();
}
function ht(e) {
  return e === !1 || e == null ? e : m.isArray(e) ? e.map(ht) : String(e);
}
function Pp(e) {
  const t = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(e); )
    t[n[1]] = n[2];
  return t;
}
function Tp(e) {
  return /^[-_a-zA-Z]+$/.test(e.trim());
}
function To(e, t, r, n) {
  if (m.isFunction(n))
    return n.call(this, t, r);
  if (m.isString(t)) {
    if (m.isString(n))
      return t.indexOf(n) !== -1;
    if (m.isRegExp(n))
      return n.test(t);
  }
}
function Cp(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, r, n) => r.toUpperCase() + n);
}
function Ap(e, t) {
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
let Vt = class {
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
    return m.isPlainObject(t) || t instanceof this.constructor ? s(t, r) : m.isString(t) && (t = t.trim()) && !Tp(t) ? s(xp(t), r) : t != null && i(r, t, n), this;
  }
  get(t, r) {
    if (t = He(t), t) {
      const n = m.findKey(this, t);
      if (n) {
        const o = this[n];
        if (!r)
          return o;
        if (r === !0)
          return Pp(o);
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
      return !!(n && (!r || To(this, this[n], n, r)));
    }
    return !1;
  }
  delete(t, r) {
    const n = this;
    let o = !1;
    function i(s) {
      if (s = He(s), s) {
        const a = m.findKey(n, s);
        a && (!r || To(n, n[a], a, r)) && (delete n[a], o = !0);
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
      const a = t ? Cp(i) : String(i).trim();
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
    const n = (this[Po] = this[Po] = {
      accessors: {}
    }).accessors, o = this.prototype;
    function i(s) {
      const a = He(s);
      n[a] || (Ap(o, s), n[a] = !0);
    }
    return m.isArray(t) ? t.forEach(i) : i(t), this;
  }
};
Vt.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent"]);
m.freezeMethods(Vt.prototype);
m.freezeMethods(Vt);
const ce = Vt;
function ir(e, t) {
  const r = this || sn, n = t || r, o = ce.from(n.headers);
  let i = n.data;
  return m.forEach(e, function(a) {
    i = a.call(r, i, o.normalize(), t ? t.status : void 0);
  }), o.normalize(), i;
}
function Vi(e) {
  return !!(e && e.__CANCEL__);
}
function nt(e, t, r) {
  N.call(this, e ?? "canceled", N.ERR_CANCELED, t, r), this.name = "CanceledError";
}
m.inherits(nt, N, {
  __CANCEL__: !0
});
const Np = null;
function Dp(e, t, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? e(r) : t(new N(
    "Request failed with status code " + r.status,
    [N.ERR_BAD_REQUEST, N.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
    r.config,
    r.request,
    r
  ));
}
const $p = re.isStandardBrowserEnv ? function() {
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
function Lp(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Ip(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function ki(e, t) {
  return e && !Lp(t) ? Ip(e, t) : t;
}
const jp = re.isStandardBrowserEnv ? function() {
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
function Up(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function Fp(e, t) {
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
function Co(e, t) {
  let r = 0;
  const n = Fp(50, 250);
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
const Mp = typeof XMLHttpRequest < "u", Bp = Mp && function(e) {
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
    const f = ki(e.baseURL, e.url);
    l.open(e.method.toUpperCase(), Fi(f, e.params, e.paramsSerializer), !0), l.timeout = e.timeout;
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
      Dp(function(w) {
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
      const h = e.transitional || Mi;
      e.timeoutErrorMessage && (v = e.timeoutErrorMessage), n(new N(
        v,
        h.clarifyTimeoutError ? N.ETIMEDOUT : N.ECONNABORTED,
        e,
        l
      )), l = null;
    }, re.isStandardBrowserEnv) {
      const g = (e.withCredentials || jp(f)) && e.xsrfCookieName && $p.read(e.xsrfCookieName);
      g && i.set(e.xsrfHeaderName, g);
    }
    o === void 0 && i.setContentType(null), "setRequestHeader" in l && m.forEach(i.toJSON(), function(v, h) {
      l.setRequestHeader(h, v);
    }), m.isUndefined(e.withCredentials) || (l.withCredentials = !!e.withCredentials), s && s !== "json" && (l.responseType = e.responseType), typeof e.onDownloadProgress == "function" && l.addEventListener("progress", Co(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && l.upload && l.upload.addEventListener("progress", Co(e.onUploadProgress)), (e.cancelToken || e.signal) && (a = (g) => {
      l && (n(!g || g.type ? new nt(null, e, l) : g), l.abort(), l = null);
    }, e.cancelToken && e.cancelToken.subscribe(a), e.signal && (e.signal.aborted ? a() : e.signal.addEventListener("abort", a)));
    const p = Up(f);
    if (p && re.protocols.indexOf(p) === -1) {
      n(new N("Unsupported protocol " + p + ":", N.ERR_BAD_REQUEST, e));
      return;
    }
    l.send(o || null);
  });
}, mt = {
  http: Np,
  xhr: Bp
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
const Vp = {
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
function sr(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new nt(null, e);
}
function Ao(e) {
  return sr(e), e.headers = ce.from(e.headers), e.data = ir.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), Vp.getAdapter(e.adapter || sn.adapter)(e).then(function(n) {
    return sr(e), n.data = ir.call(
      e,
      e.transformResponse,
      n
    ), n.headers = ce.from(n.headers), n;
  }, function(n) {
    return Vi(n) || (sr(e), n && n.response && (n.response.data = ir.call(
      e,
      e.transformResponse,
      n.response
    ), n.response.headers = ce.from(n.response.headers))), Promise.reject(n);
  });
}
const No = (e) => e instanceof ce ? e.toJSON() : e;
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
    headers: (l, f) => o(No(l), No(f), !0)
  };
  return m.forEach(Object.keys(e).concat(Object.keys(t)), function(f) {
    const d = u[f] || o, p = d(e[f], t[f], f);
    m.isUndefined(p) && d !== a || (r[f] = p);
  }), r;
}
const Hi = "1.2.1", an = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  an[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Do = {};
an.transitional = function(t, r, n) {
  function o(i, s) {
    return "[Axios v" + Hi + "] Transitional option '" + i + "'" + s + (n ? ". " + n : "");
  }
  return (i, s, a) => {
    if (t === !1)
      throw new N(
        o(s, " has been removed" + (r ? " in " + r : "")),
        N.ERR_DEPRECATED
      );
    return r && !Do[s] && (Do[s] = !0, console.warn(
      o(
        s,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), t ? t(i, s, a) : !0;
  };
};
function kp(e, t, r) {
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
  assertOptions: kp,
  validators: an
}, me = Cr.validators;
let Rt = class {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new xo(),
      response: new xo()
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
      const v = [Ao.bind(this), void 0];
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
      f = Ao.call(this, g);
    } catch (v) {
      return Promise.reject(v);
    }
    for (d = 0, p = l.length; d < p; )
      f = f.then(l[d++], l[d++]);
    return f;
  }
  getUri(t) {
    t = je(this.defaults, t);
    const r = ki(t.baseURL, t.url);
    return Fi(r, t.params, t.paramsSerializer);
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
let Wi = class {
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
      token: new Wi(function(o) {
        t = o;
      }),
      cancel: t
    };
  }
};
const Hp = Wi;
function Wp(e) {
  return function(r) {
    return e.apply(null, r);
  };
}
function qp(e) {
  return m.isObject(e) && e.isAxiosError === !0;
}
function qi(e) {
  const t = new vt(e), r = xi(vt.prototype.request, t);
  return m.extend(r, vt.prototype, t, { allOwnKeys: !0 }), m.extend(r, t, null, { allOwnKeys: !0 }), r.create = function(o) {
    return qi(je(e, o));
  }, r;
}
const W = qi(sn);
W.Axios = vt;
W.CanceledError = nt;
W.CancelToken = Hp;
W.isCancel = Vi;
W.VERSION = Hi;
W.toFormData = Mt;
W.AxiosError = N;
W.Cancel = W.CanceledError;
W.all = function(t) {
  return Promise.all(t);
};
W.spread = Wp;
W.isAxiosError = qp;
W.mergeConfig = je;
W.AxiosHeaders = ce;
W.formToJSON = (e) => Bi(m.isHTMLForm(e) ? new FormData(e) : e);
W.default = W;
const zi = W, {
  Axios: Kh,
  AxiosError: zp,
  CanceledError: Yh,
  isCancel: Xh,
  CancelToken: Zh,
  VERSION: Qh,
  all: em,
  Cancel: tm,
  isAxiosError: rm,
  spread: nm,
  toFormData: om,
  AxiosHeaders: im,
  formToJSON: sm,
  mergeConfig: am
} = zi;
var Ar = function(e, t) {
  return Ar = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
    r.__proto__ = n;
  } || function(r, n) {
    for (var o in n)
      Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
  }, Ar(e, t);
};
function kt(e, t) {
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
var ar = un(function(e) {
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
var Ht = function() {
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
          i = h instanceof ar ? h.errors : [h];
        }
      var d = this._finalizers;
      if (d) {
        this._finalizers = null;
        try {
          for (var p = Nr(d), g = p.next(); !g.done; g = p.next()) {
            var v = g.value;
            try {
              $o(v);
            } catch (h) {
              i = i ?? [], h instanceof ar ? i = Pt(Pt([], xt(i)), xt(h.errors)) : i.push(h);
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
        throw new ar(i);
    }
  }, e.prototype.add = function(t) {
    var r;
    if (t && t !== this)
      if (this.closed)
        $o(t);
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
}(), Gi = Ht.EMPTY;
function Ji(e) {
  return e instanceof Ht || e && "closed" in e && le(e.remove) && le(e.add) && le(e.unsubscribe);
}
function $o(e) {
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
function Gp(e) {
  $r.setTimeout(function() {
    throw e;
  });
}
function Lo() {
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
var Ki = function(e) {
  kt(t, e);
  function t(r) {
    var n = e.call(this) || this;
    return n.isStopped = !1, r ? (n.destination = r, Ji(r) && r.add(n)) : n.destination = Xp, n;
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
}(Ht), Jp = Function.prototype.bind;
function ur(e, t) {
  return Jp.call(e, t);
}
var Kp = function() {
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
  kt(t, e);
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
        next: r.next && ur(r.next, a),
        error: r.error && ur(r.error, a),
        complete: r.complete && ur(r.complete, a)
      }) : s = r;
    }
    return i.destination = new Kp(s), i;
  }
  return t;
}(Ki);
function lt(e) {
  Gp(e);
}
function Yp(e) {
  throw e;
}
var Xp = {
  closed: !0,
  next: Lo,
  error: Yp,
  complete: Lo
}, Zp = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function Qp(e) {
  return e;
}
function eh(e) {
  return e.length === 0 ? Qp : e.length === 1 ? e[0] : function(r) {
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
    var o = this, i = rh(t) ? t : new Lr(t, r, n);
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
    return r = Io(r), new r(function(o, i) {
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
  }, e.prototype[Zp] = function() {
    return this;
  }, e.prototype.pipe = function() {
    for (var t = [], r = 0; r < arguments.length; r++)
      t[r] = arguments[r];
    return eh(t)(this);
  }, e.prototype.toPromise = function(t) {
    var r = this;
    return t = Io(t), new t(function(n, o) {
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
function Io(e) {
  var t;
  return (t = e ?? cn.Promise) !== null && t !== void 0 ? t : Promise;
}
function th(e) {
  return e && le(e.next) && le(e.error) && le(e.complete);
}
function rh(e) {
  return e && e instanceof Ki || th(e) && Ji(e);
}
var nh = un(function(e) {
  return function() {
    e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), Ir = function(e) {
  kt(t, e);
  function t() {
    var r = e.call(this) || this;
    return r.closed = !1, r.currentObservers = null, r.observers = [], r.isStopped = !1, r.hasError = !1, r.thrownError = null, r;
  }
  return t.prototype.lift = function(r) {
    var n = new jo(this, this);
    return n.operator = r, n;
  }, t.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new nh();
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
    return i || s ? Gi : (this.currentObservers = null, a.push(r), new Ht(function() {
      n.currentObservers = null, Dr(a, r);
    }));
  }, t.prototype._checkFinalizedStatuses = function(r) {
    var n = this, o = n.hasError, i = n.thrownError, s = n.isStopped;
    o ? r.error(i) : s && r.complete();
  }, t.prototype.asObservable = function() {
    var r = new Tt();
    return r.source = this, r;
  }, t.create = function(r, n) {
    return new jo(r, n);
  }, t;
}(Tt), jo = function(e) {
  kt(t, e);
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
    return (o = (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(r)) !== null && o !== void 0 ? o : Gi;
  }, t;
}(Ir), oh = un(function(e) {
  return function() {
    e(this), this.name = "EmptyError", this.message = "no elements in sequence";
  };
});
function cr(e, t) {
  var r = typeof t == "object";
  return new Promise(function(n, o) {
    var i = !1, s;
    e.subscribe({
      next: function(a) {
        s = a, i = !0;
      },
      error: o,
      complete: function() {
        i ? n(s) : r ? n(t.defaultValue) : o(new oh());
      }
    });
  });
}
class ln {
  constructor(t) {
    z(this, "config");
    z(this, "axios");
    t && (this.config = t), this.axios = zi.create(this.config);
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
function ih(e) {
  return ln.create({
    baseURL: e
  });
}
const k = class {
  constructor(t, r) {
    z(this, "axiosInstance");
    z(this, "defaultConfig", {
      contentType: "json",
      cache: !1
    });
    z(this, "tokenType");
    this.axiosInstance = ih(t), this.setupInterceptor(), r && (this.defaultConfig = {
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
        if (t = await this.useRequestInterceptors(t), t = Rd({}, this.defaultConfig, t), t.headers = {
          ...t.headers,
          ...k.globalHeaders,
          "Content-Type": t.contentType === "formData" ? !1 : t.contentType === "urlEncoded" ? Or.UrlEncoded : Or.Json
        }, !t.preparedData) {
          if ((typeof t.cache < "u" ? t.cache : this.defaultConfig.cache) === !1 && (t.headers["Cache-Control"] = "no-cache", t.params = {
            ...t.params,
            axios_timestamp: Date.now()
          }), t.params = Ot(
            wo({
              ...t.params,
              ...k.globalParams
            })
          ), t.data = {
            ...t.data,
            ...k.globalData
          }, wo(t.data), JSON.stringify(t.data) === "{}")
            t.data = void 0;
          else
            switch (t.contentType) {
              case "formData":
                t.data = Rr(t.data);
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
z(te, "tokenType", "base_token"), z(te, "globalParams", {}), z(te, "globalData", {}), z(te, "globalHeaders", {}), z(te, "interceptors", /* @__PURE__ */ new Set());
var Ye = {}, sh = {
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
var lr, Uo;
function Yi() {
  if (Uo)
    return lr;
  Uo = 1;
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
  return lr = o() ? Object.assign : function(i, s) {
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
  }, lr;
}
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fo;
function ah() {
  if (Fo)
    return De;
  Fo = 1, Yi();
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
var fr = {};
/** @license React v17.0.2
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Mo;
function uh() {
  return Mo || (Mo = 1, function(e) {
    process.env.NODE_ENV !== "production" && function() {
      var t = Xe, r = Yi(), n = 60103, o = 60106;
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
      function Q(c) {
        return !!(typeof c == "string" || typeof c == "function" || c === e.Fragment || c === s || c === w || c === i || c === f || c === d || c === D || ie || typeof c == "object" && c !== null && (c.$$typeof === g || c.$$typeof === p || c.$$typeof === a || c.$$typeof === u || c.$$typeof === l || c.$$typeof === S || c.$$typeof === v || c[0] === h));
      }
      function rs(c, y, E) {
        var x = y.displayName || y.name || "";
        return c.displayName || (x !== "" ? E + "(" + x + ")" : E);
      }
      function pn(c) {
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
              return pn(y) + ".Consumer";
            case a:
              var E = c;
              return pn(E._context) + ".Provider";
            case l:
              return rs(c, c.render, "ForwardRef");
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
      var Be = 0, hn, mn, vn, gn, yn, bn, En;
      function wn() {
      }
      wn.__reactDisabledLog = !0;
      function ns() {
        {
          if (Be === 0) {
            hn = console.log, mn = console.info, vn = console.warn, gn = console.error, yn = console.group, bn = console.groupCollapsed, En = console.groupEnd;
            var c = {
              configurable: !0,
              enumerable: !0,
              value: wn,
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
      function os() {
        {
          if (Be--, Be === 0) {
            var c = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: r({}, c, {
                value: hn
              }),
              info: r({}, c, {
                value: mn
              }),
              warn: r({}, c, {
                value: vn
              }),
              error: r({}, c, {
                value: gn
              }),
              group: r({}, c, {
                value: yn
              }),
              groupCollapsed: r({}, c, {
                value: bn
              }),
              groupEnd: r({}, c, {
                value: En
              })
            });
          }
          Be < 0 && $("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var Wt = U.ReactCurrentDispatcher, qt;
      function ot(c, y, E) {
        {
          if (qt === void 0)
            try {
              throw Error();
            } catch (L) {
              var x = L.stack.trim().match(/\n( *(at )?)/);
              qt = x && x[1] || "";
            }
          return `
` + qt + c;
        }
      }
      var zt = !1, it;
      {
        var is = typeof WeakMap == "function" ? WeakMap : Map;
        it = new is();
      }
      function _n(c, y) {
        if (!c || zt)
          return "";
        {
          var E = it.get(c);
          if (E !== void 0)
            return E;
        }
        var x;
        zt = !0;
        var L = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var I;
        I = Wt.current, Wt.current = null, ns();
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
`), G = x.stack.split(`
`), M = C.length - 1, V = G.length - 1; M >= 1 && V >= 0 && C[M] !== G[V]; )
              V--;
            for (; M >= 1 && V >= 0; M--, V--)
              if (C[M] !== G[V]) {
                if (M !== 1 || V !== 1)
                  do
                    if (M--, V--, V < 0 || C[M] !== G[V]) {
                      var se = `
` + C[M].replace(" at new ", " at ");
                      return typeof c == "function" && it.set(c, se), se;
                    }
                  while (M >= 1 && V >= 0);
                break;
              }
          }
        } finally {
          zt = !1, Wt.current = I, os(), Error.prepareStackTrace = L;
        }
        var Ne = c ? c.displayName || c.name : "", Ln = Ne ? ot(Ne) : "";
        return typeof c == "function" && it.set(c, Ln), Ln;
      }
      function Sn(c, y, E) {
        return _n(c, !1);
      }
      function ss(c) {
        var y = c.prototype;
        return !!(y && y.isReactComponent);
      }
      function st(c, y, E) {
        if (c == null)
          return "";
        if (typeof c == "function")
          return _n(c, ss(c));
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
              return Sn(c.render);
            case p:
              return st(c.type, y, E);
            case v:
              return Sn(c._render);
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
      var On = {}, Rn = U.ReactDebugCurrentFrame;
      function at(c) {
        if (c) {
          var y = c._owner, E = st(c.type, c._source, y ? y.type : null);
          Rn.setExtraStackFrame(E);
        } else
          Rn.setExtraStackFrame(null);
      }
      function as(c, y, E, x, L) {
        {
          var I = Function.call.bind(Object.prototype.hasOwnProperty);
          for (var A in c)
            if (I(c, A)) {
              var C = void 0;
              try {
                if (typeof c[A] != "function") {
                  var G = Error((x || "React class") + ": " + E + " type `" + A + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof c[A] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw G.name = "Invariant Violation", G;
                }
                C = c[A](y, A, x, E, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (M) {
                C = M;
              }
              C && !(C instanceof Error) && (at(L), $("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", x || "React class", E, A, typeof C), at(null)), C instanceof Error && !(C.message in On) && (On[C.message] = !0, at(L), $("Failed %s type: %s", E, C.message), at(null));
            }
        }
      }
      var Ve = U.ReactCurrentOwner, Gt = Object.prototype.hasOwnProperty, us = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, xn, Pn, Jt;
      Jt = {};
      function cs(c) {
        if (Gt.call(c, "ref")) {
          var y = Object.getOwnPropertyDescriptor(c, "ref").get;
          if (y && y.isReactWarning)
            return !1;
        }
        return c.ref !== void 0;
      }
      function ls(c) {
        if (Gt.call(c, "key")) {
          var y = Object.getOwnPropertyDescriptor(c, "key").get;
          if (y && y.isReactWarning)
            return !1;
        }
        return c.key !== void 0;
      }
      function fs(c, y) {
        if (typeof c.ref == "string" && Ve.current && y && Ve.current.stateNode !== y) {
          var E = ee(Ve.current.type);
          Jt[E] || ($('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', ee(Ve.current.type), c.ref), Jt[E] = !0);
        }
      }
      function ds(c, y) {
        {
          var E = function() {
            xn || (xn = !0, $("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
          };
          E.isReactWarning = !0, Object.defineProperty(c, "key", {
            get: E,
            configurable: !0
          });
        }
      }
      function ps(c, y) {
        {
          var E = function() {
            Pn || (Pn = !0, $("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
          };
          E.isReactWarning = !0, Object.defineProperty(c, "ref", {
            get: E,
            configurable: !0
          });
        }
      }
      var hs = function(c, y, E, x, L, I, A) {
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
      function ms(c, y, E, x, L) {
        {
          var I, A = {}, C = null, G = null;
          E !== void 0 && (C = "" + E), ls(y) && (C = "" + y.key), cs(y) && (G = y.ref, fs(y, L));
          for (I in y)
            Gt.call(y, I) && !us.hasOwnProperty(I) && (A[I] = y[I]);
          if (c && c.defaultProps) {
            var M = c.defaultProps;
            for (I in M)
              A[I] === void 0 && (A[I] = M[I]);
          }
          if (C || G) {
            var V = typeof c == "function" ? c.displayName || c.name || "Unknown" : c;
            C && ds(A, V), G && ps(A, V);
          }
          return hs(c, C, G, L, x, Ve.current, A);
        }
      }
      var Kt = U.ReactCurrentOwner, Tn = U.ReactDebugCurrentFrame;
      function Ae(c) {
        if (c) {
          var y = c._owner, E = st(c.type, c._source, y ? y.type : null);
          Tn.setExtraStackFrame(E);
        } else
          Tn.setExtraStackFrame(null);
      }
      var Yt;
      Yt = !1;
      function Xt(c) {
        return typeof c == "object" && c !== null && c.$$typeof === n;
      }
      function Cn() {
        {
          if (Kt.current) {
            var c = ee(Kt.current.type);
            if (c)
              return `

Check the render method of \`` + c + "`.";
          }
          return "";
        }
      }
      function vs(c) {
        {
          if (c !== void 0) {
            var y = c.fileName.replace(/^.*[\\\/]/, ""), E = c.lineNumber;
            return `

Check your code at ` + y + ":" + E + ".";
          }
          return "";
        }
      }
      var An = {};
      function gs(c) {
        {
          var y = Cn();
          if (!y) {
            var E = typeof c == "string" ? c : c.displayName || c.name;
            E && (y = `

Check the top-level render call using <` + E + ">.");
          }
          return y;
        }
      }
      function Nn(c, y) {
        {
          if (!c._store || c._store.validated || c.key != null)
            return;
          c._store.validated = !0;
          var E = gs(y);
          if (An[E])
            return;
          An[E] = !0;
          var x = "";
          c && c._owner && c._owner !== Kt.current && (x = " It was passed a child from " + ee(c._owner.type) + "."), Ae(c), $('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', E, x), Ae(null);
        }
      }
      function Dn(c, y) {
        {
          if (typeof c != "object")
            return;
          if (Array.isArray(c))
            for (var E = 0; E < c.length; E++) {
              var x = c[E];
              Xt(x) && Nn(x, y);
            }
          else if (Xt(c))
            c._store && (c._store.validated = !0);
          else if (c) {
            var L = R(c);
            if (typeof L == "function" && L !== c.entries)
              for (var I = L.call(c), A; !(A = I.next()).done; )
                Xt(A.value) && Nn(A.value, y);
          }
        }
      }
      function ys(c) {
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
            as(E, c.props, "prop", x, c);
          } else if (y.PropTypes !== void 0 && !Yt) {
            Yt = !0;
            var L = ee(y);
            $("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", L || "Unknown");
          }
          typeof y.getDefaultProps == "function" && !y.getDefaultProps.isReactClassApproved && $("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function bs(c) {
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
      function $n(c, y, E, x, L, I) {
        {
          var A = Q(c);
          if (!A) {
            var C = "";
            (c === void 0 || typeof c == "object" && c !== null && Object.keys(c).length === 0) && (C += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var G = vs(L);
            G ? C += G : C += Cn();
            var M;
            c === null ? M = "null" : Array.isArray(c) ? M = "array" : c !== void 0 && c.$$typeof === n ? (M = "<" + (ee(c.type) || "Unknown") + " />", C = " Did you accidentally export a JSX literal instead of a component?") : M = typeof c, $("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", M, C);
          }
          var V = ms(c, y, E, L, I);
          if (V == null)
            return V;
          if (A) {
            var se = y.children;
            if (se !== void 0)
              if (x)
                if (Array.isArray(se)) {
                  for (var Ne = 0; Ne < se.length; Ne++)
                    Dn(se[Ne], c);
                  Object.freeze && Object.freeze(se);
                } else
                  $("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
              else
                Dn(se, c);
          }
          return c === e.Fragment ? bs(V) : ys(V), V;
        }
      }
      function Es(c, y, E) {
        return $n(c, y, E, !0);
      }
      function ws(c, y, E) {
        return $n(c, y, E, !1);
      }
      var _s = ws, Ss = Es;
      e.jsx = _s, e.jsxs = Ss;
    }();
  }(fr)), fr;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = ah() : e.exports = uh();
})(sh);
const Ce = Ye.Fragment, B = Ye.jsx, jr = Ye.jsxs, um = (e = () => {
}) => {
  const [t, r] = q(!1);
  t || (e(), r(!0));
};
function ch(e, t) {
  function r(n) {
    let o = [];
    return Array.isArray(n) ? o = n : o = n.split(","), o.length ? t.filter((s) => o.includes(s)).length > 0 : !0;
  }
  for (const n of e)
    if (r(n.permissions || [])) {
      if (n.routes) {
        const o = ch(n.routes, t);
        if (o)
          return o;
        continue;
      }
      return n;
    }
}
const Bo = (e, t, r = !1) => {
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
var Ur = {}, lh = {
  get exports() {
    return Ur;
  },
  set exports(e) {
    Ur = e;
  }
}, dr = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vo;
function fh() {
  if (Vo)
    return dr;
  Vo = 1;
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
  return dr.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : f, dr;
}
var pr = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ko;
function dh() {
  return ko || (ko = 1, process.env.NODE_ENV !== "production" && function() {
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
        var Q = function() {
          g(F) && ie({
            inst: F
          });
        };
        return O(Q);
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
    pr.useSyncExternalStore = D, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), pr;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = fh() : e.exports = dh();
})(lh);
const ph = () => !0;
class hh extends Dd {
  constructor() {
    super(...arguments);
    z(this, "middlewareHandler", ph);
    z(this, "_routes", []);
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
    const n = Nd([...r, ...this._routes], "path");
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
const We = new hh();
function Xi() {
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
const cm = () => {
  const { routes: e } = Xi(), [t, r] = q(), n = fe(), o = H(
    (i) => {
      const s = i.filter(
        (a) => Bo(n.pathname, a.path)
      );
      for (const a of s)
        if (a) {
          if (a.routes)
            o(a.routes);
          else if (Bo(n.pathname, a.path, !0)) {
            r(a);
            break;
          }
        }
    },
    [n]
  );
  return J(() => {
    o(e);
  }, [o, e]), t;
}, mh = (e) => {
  J(
    () => () => {
      e();
    },
    []
  );
};
function vh(e, t) {
  const r = _e(e);
  r.current = e;
  const n = (t == null ? void 0 : t.wait) ?? 1e3, o = _e(
    yd(
      (...i) => r.current(...i),
      n,
      t
    )
  ).current;
  return mh(() => {
    o.cancel();
  }), {
    run: o,
    cancel: o.cancel,
    flush: o.flush
  };
}
function lm(e, t) {
  const [r, n] = q(e), { run: o } = vh((i) => {
    n(i);
  }, t);
  return [r, o];
}
function fm(e, t) {
  const r = _e(!1);
  J(() => {
    if (r.current)
      return e && e();
    r.current = !0;
  }, t);
}
const dm = (e, t) => {
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
}, gh = (e = !1) => {
  const [t, r] = q(e), n = H(() => {
    r((s) => !s);
  }, []), o = H(() => {
    r(!0);
  }, []), i = H(() => {
    r(!1);
  }, []);
  return { state: t, toggle: n, on: o, off: i };
}, Zi = Wo(
  void 0
);
function pm({
  children: e,
  color: t,
  isWrap: r = !1,
  component: n
}) {
  const { state: o, on: i, off: s } = gh(), a = q(0)[1], u = H(() => {
    i(), a((f) => f + 1), a(1);
  }, []), l = H(() => {
    a((f) => f === 1 ? (s(), 0) : f - 1);
  }, []);
  return /* @__PURE__ */ B(Zi.Provider, { value: { startLoading: u, stopLoading: l, state: o }, children: r ? /* @__PURE__ */ B(n, { state: o, color: t, children: e }) : /* @__PURE__ */ jr(Ce, { children: [
    e,
    /* @__PURE__ */ B(n, { state: o, color: t })
  ] }) });
}
const Qi = (e) => {
  const t = Fr(Zi);
  if (t === void 0)
    throw new Error("useLoading must be used in LoadingProvider");
  return J(() => {
    typeof e > "u" || (e ? t.startLoading() : t.stopLoading());
  }, [e, t]), t;
};
var we = /* @__PURE__ */ ((e) => (e.Standing = "standing", e.Processing = "processing", e.Success = "success", e.Failed = "Failed", e))(we || {});
function fn(e) {
  J(() => e(), []);
}
function yh(e, t) {
  const r = _e(new Ir()), [n, o] = q(), { startLoading: i, stopLoading: s } = Qi(), [a, u] = q(we.Standing), [l, f] = q(), [d, p] = q(), g = Ze(() => a === we.Processing, [a]), v = H(
    (...S) => {
      u(we.Processing), t != null && t.showLoading && i(), r.current.next(e(...S));
    },
    [e]
  ), h = H(() => {
    n == null || n.unsubscribe(), u(we.Standing), t != null && t.showLoading && s();
  }, [n]);
  return fn(() => (r.current.closed && (r.current = new Ir()), r.current.subscribe({
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
const bh = { attributes: !0, childList: !0, subtree: !0 }, hm = (e, t) => {
  const r = Ze(() => new MutationObserver(t), [t]);
  J(() => {
    const n = e instanceof HTMLElement ? e : e.current;
    return n && r.observe(n, bh), () => {
      r.disconnect();
    };
  }, [r, e]);
};
function mm(e) {
  const t = _e();
  return J(() => {
    t.current = e;
  }), t.current;
}
const vm = (e, t) => {
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
function gm({ get: e, set: t }, r) {
  const n = Ze(e, r), o = H(t, r);
  return [n, o];
}
const es = Wo(void 0), ym = ({
  children: e,
  defaultTokens: t = () => ({}),
  fetchUserOnLogin: r = () => new Tt((o) => o.next(void 0)),
  fetchRefreshToken: n
}) => {
  const [o, i] = q(), [s, a] = q(t), [u, l] = q(!1), { run: f, result: d } = yh(r), p = H(
    (_, T) => {
      l(!0), a(_), T ? i(T) : f(_);
    },
    [f]
  ), g = H(() => {
    i(void 0), a({}), l(!1);
  }, []);
  J(() => {
    var _;
    (_ = Object.values(t())[0]) != null && _.length && (f(t()), l(!0));
  }, [xr.subdomain]), J(() => {
    d && i(d);
  }, [d]), J(() => {
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
        if (!(_ instanceof zp))
          return _;
        const { config: R, response: U } = _;
        if (!R || !U)
          return Promise.reject(_);
        if (U.status === 401) {
          if (v)
            return new Promise(function(F, ie) {
              S.push({ resolve: F, reject: ie });
            }).then(() => cr(T.request(R))).catch((F) => F);
          h(!0);
          const $ = dt.getToken("refresh_token");
          return $ ? n ? new Promise((F, ie) => {
            cr(n($)).then(({ data: Q }) => {
              h(!1), D(null, Q.data.accessToken), p({
                base_token: Q.data.accessToken,
                refresh_token: Q.data.refreshToken
              }), F(cr(T.request(R)));
            }).catch((Q) => {
              h(!0), g(), D(Q), ie(Q);
            });
          }) : Promise.reject(_) : (console.log("Not found refresh token app"), Promise.reject(_));
        }
        return Promise.reject(_);
      }
    }
  });
  return fn(() => O()), /* @__PURE__ */ B(es.Provider, { value: { user: o, tokens: s, isLoggedIn: u, login: p, logout: g }, children: e });
};
function bm() {
  const e = Fr(es);
  if (!e)
    throw new Error("useAuthContext must be used in AuthProvider");
  return e;
}
const dn = Xe.createContext(void 0), Em = ({
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
  return /* @__PURE__ */ B(dn.Provider, { value: { userPermissions: e, can: n }, children: r });
}, Eh = (e) => {
  const t = Fr(dn);
  if (!t)
    throw new Error("useAuthorization must be used in AuthorizationProvider");
  return {
    granted: Ze(() => e ? t.can(e) : !0, [e, t.can]),
    ...t
  };
}, wm = qo(
  ({ permissions: e, children: t, guestView: r }) => {
    const { granted: n } = Eh(e);
    return typeof t == "function" ? t(n) : /* @__PURE__ */ B(Ce, { children: n ? t : r });
  }
);
function _m(e) {
  return (t) => (r) => /* @__PURE__ */ B(dn.Consumer, { children: (n) => /* @__PURE__ */ B(Ce, { children: (n == null ? void 0 : n.can(e || [])) && /* @__PURE__ */ B(t, { ...r }) }) });
}
function Sm({
  component: e,
  props: t
}) {
  return /* @__PURE__ */ B(e, { ...t });
}
function Om({
  children: e
}) {
  const { startLoading: t, stopLoading: r } = Qi();
  return fn(() => te.addInterceptor({
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
function Rm(e, t) {
  return () => {
    const r = new te(e().baseURL, e());
    return Sd(t, (n) => (...o) => n(r, ...o));
  };
}
function wh(e, t = "/") {
  const r = {}, n = e.Index.length > 0 ? `${t}${e.Index}` : "";
  for (const o in e)
    if (Object.prototype.hasOwnProperty.call(e, o)) {
      const i = e[o];
      typeof i == "object" ? r[o] = wh(i, n !== "/" ? n + "/" : "/") : o === "Index" ? r[o] = n.length ? n : t : r[o] = n + "/" + i;
    }
  return r;
}
const _h = ({
  route: { component: e, ...t }
}) => {
  var r;
  return /* @__PURE__ */ B(Ce, { children: (r = t.routes) != null && r.length && !t.element && !e ? /* @__PURE__ */ B(wa, {}) : t.element || (e ? /* @__PURE__ */ B(e, {}) : null) });
}, Sh = qo(_h), Ho = ({ route: e }) => {
  const t = Ct(), [r, n] = q();
  return J(() => {
    (async () => n(
      await We.canPassMiddleware(e, t)
    ))();
  }, [t, e]), r !== void 0 ? xs(r) ? r : r ? /* @__PURE__ */ B(Sh, { route: e }) : null : null;
}, ts = (e) => {
  if (e.routes) {
    const { routes: t, element: r, index: n, ...o } = e, i = t.map((s) => ts(s));
    return /* @__PURE__ */ In(
      bt,
      {
        element: /* @__PURE__ */ B(Ho, { route: { ...o, element: r, routes: t } }),
        ...o,
        index: n,
        key: _o(12)
      },
      i
    );
  }
  return /* @__PURE__ */ In(
    bt,
    {
      element: /* @__PURE__ */ B(Ho, { route: e }),
      ...e,
      key: _o(12)
    }
  );
}, Oh = ({ onChange: e }) => {
  const t = fe();
  return J(() => {
    e && e(t);
  }, [t.pathname]), /* @__PURE__ */ B(Ce, {});
}, xm = ({
  routes: e,
  notFoundElement: t,
  onRouteChange: r
}) => {
  const n = Ze(
    () => e.map((o) => ts(o)),
    [e]
  );
  return /* @__PURE__ */ jr(Ce, { children: [
    /* @__PURE__ */ B(Oh, { onChange: r }),
    /* @__PURE__ */ jr(Sa, { children: [
      n,
      /* @__PURE__ */ B(bt, { path: "*", element: t })
    ] })
  ] });
};
function Pm(e) {
  const t = e;
  return (r) => {
    const n = Xi();
    return /* @__PURE__ */ B(t, { ...r, routes: n });
  };
}
export {
  te as Api,
  Om as ApiLoadingHandlerProvider,
  ym as AuthProvider,
  Em as AuthorizationProvider,
  ln as AxiosObservable,
  Ih as BrowserRouter,
  Dd as EventListenersManager,
  Zi as LoadingContext,
  pm as LoadingProvider,
  Oh as LocationEffect,
  Lh as Navigate,
  wa as Outlet,
  wm as PrivateView,
  Or as RequestHeaderContentType,
  Ho as RouteMiddleware,
  Sh as RouteRenderer,
  xm as RouterGenerator,
  We as RouterHandler,
  Wh as StorageManager,
  Ri as StorageManagerClass,
  dt as TokenManager,
  Mh as clearObject,
  wo as clearUndefinedProperties,
  xr as coreConfig,
  Rm as createRepository,
  wh as createRoutePath,
  qh as createVariableWithWatcher,
  Fh as emptyObject,
  ch as findRouteHasPermission,
  Rr as formData,
  Ph as generatePath,
  ts as generateRoutes,
  Sm as lazyComponent,
  _o as makeId,
  kh as passwordRegex,
  Bo as pathMatched,
  Bh as phoneNumberRegex,
  Ot as urlEncoded,
  Nh as useActionData,
  $h as useAsyncError,
  Dh as useAsyncValue,
  bm as useAuthContext,
  Eh as useAuthorization,
  Uh as useBeforeUnload,
  um as useConstructor,
  cm as useCurrentRoute,
  vh as useDebounceFn,
  lm as useDebounceState,
  fm as useDidUpdate,
  dm as useInterval,
  yh as useJob,
  Qi as useLoading,
  fe as useLocation,
  fn as useMount,
  Ct as useNavigate,
  Ah as useNavigation,
  hm as useOnElementChange,
  fa as useOutlet,
  Th as useOutletContext,
  Ch as useParams,
  mm as usePrevious,
  Xi as useRoutes,
  jh as useSearchParams,
  vm as useTimeout,
  gh as useToggle,
  mh as useUnMount,
  gm as useWritableMemo,
  Vh as usernameRegex,
  Hh as validateAsciiChars,
  _m as withAuthorization,
  Pm as withRoutes
};

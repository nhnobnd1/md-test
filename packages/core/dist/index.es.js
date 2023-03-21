var Ci = Object.defineProperty;
var Gi = (e, t, r) => t in e ? Ci(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var ae = (e, t, r) => (Gi(e, typeof t != "symbol" ? t + "" : t, r), r);
import * as b from "react";
import vt, { useState as re, useRef as ke, useEffect as ce, useCallback as Y, useMemo as rt, createContext as ea, useContext as rn, memo as ta, isValidElement as $i, createElement as Hn } from "react";
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
function It() {
  return It = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, It.apply(this, arguments);
}
var $e;
(function(e) {
  e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
})($e || ($e = {}));
const Vn = "popstate";
function Di(e) {
  e === void 0 && (e = {});
  function t(n, o) {
    let {
      pathname: a,
      search: i,
      hash: s
    } = n.location;
    return xr(
      "",
      {
        pathname: a,
        search: i,
        hash: s
      },
      o.state && o.state.usr || null,
      o.state && o.state.key || "default"
    );
  }
  function r(n, o) {
    return typeof o == "string" ? o : Qe(o);
  }
  return Li(t, r, null, e);
}
function $(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function Ni() {
  return Math.random().toString(36).substr(2, 8);
}
function Wn(e) {
  return {
    usr: e.state,
    key: e.key
  };
}
function xr(e, t, r, n) {
  return r === void 0 && (r = null), It({
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: ""
  }, typeof t == "string" ? nt(t) : t, {
    state: r,
    key: t && t.key || n || Ni()
  });
}
function Qe(e) {
  let {
    pathname: t = "/",
    search: r = "",
    hash: n = ""
  } = e;
  return r && r !== "?" && (t += r.charAt(0) === "?" ? r : "?" + r), n && n !== "#" && (t += n.charAt(0) === "#" ? n : "#" + n), t;
}
function nt(e) {
  let t = {};
  if (e) {
    let r = e.indexOf("#");
    r >= 0 && (t.hash = e.substr(r), e = e.substr(0, r));
    let n = e.indexOf("?");
    n >= 0 && (t.search = e.substr(n), e = e.substr(0, n)), e && (t.pathname = e);
  }
  return t;
}
function Ii(e) {
  let t = typeof window < "u" && typeof window.location < "u" && window.location.origin !== "null" ? window.location.origin : window.location.href, r = typeof e == "string" ? e : Qe(e);
  return $(t, "No window.location.(origin|href) available to create URL for href: " + r), new URL(r, t);
}
function Li(e, t, r, n) {
  n === void 0 && (n = {});
  let {
    window: o = document.defaultView,
    v5Compat: a = !1
  } = n, i = o.history, s = $e.Pop, u = null;
  function l() {
    s = $e.Pop, u && u({
      action: s,
      location: h.location
    });
  }
  function c(m, g) {
    s = $e.Push;
    let p = xr(h.location, m, g);
    r && r(p, m);
    let M = Wn(p), w = h.createHref(p);
    try {
      i.pushState(M, "", w);
    } catch {
      o.location.assign(w);
    }
    a && u && u({
      action: s,
      location: h.location
    });
  }
  function d(m, g) {
    s = $e.Replace;
    let p = xr(h.location, m, g);
    r && r(p, m);
    let M = Wn(p), w = h.createHref(p);
    i.replaceState(M, "", w), a && u && u({
      action: s,
      location: h.location
    });
  }
  let h = {
    get action() {
      return s;
    },
    get location() {
      return e(o, i);
    },
    listen(m) {
      if (u)
        throw new Error("A history only accepts one active listener");
      return o.addEventListener(Vn, l), u = m, () => {
        o.removeEventListener(Vn, l), u = null;
      };
    },
    createHref(m) {
      return t(o, m);
    },
    encodeLocation(m) {
      let g = Ii(typeof m == "string" ? m : Qe(m));
      return {
        pathname: g.pathname,
        search: g.search,
        hash: g.hash
      };
    },
    push: c,
    replace: d,
    go(m) {
      return i.go(m);
    }
  };
  return h;
}
var Kn;
(function(e) {
  e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error";
})(Kn || (Kn = {}));
function ji(e, t, r) {
  r === void 0 && (r = "/");
  let n = typeof t == "string" ? nt(t) : t, o = oa(n.pathname || "/", r);
  if (o == null)
    return null;
  let a = ra(e);
  Ui(a);
  let i = null;
  for (let s = 0; i == null && s < a.length; ++s)
    i = qi(
      a[s],
      Zi(o)
    );
  return i;
}
function ra(e, t, r, n) {
  t === void 0 && (t = []), r === void 0 && (r = []), n === void 0 && (n = "");
  let o = (a, i, s) => {
    let u = {
      relativePath: s === void 0 ? a.path || "" : s,
      caseSensitive: a.caseSensitive === !0,
      childrenIndex: i,
      route: a
    };
    u.relativePath.startsWith("/") && ($(u.relativePath.startsWith(n), 'Absolute route path "' + u.relativePath + '" nested under path ' + ('"' + n + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), u.relativePath = u.relativePath.slice(n.length));
    let l = Ae([n, u.relativePath]), c = r.concat(u);
    a.children && a.children.length > 0 && ($(
      a.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + l + '".')
    ), ra(a.children, t, c, l)), !(a.path == null && !a.index) && t.push({
      path: l,
      score: Ki(l, a.index),
      routesMeta: c
    });
  };
  return e.forEach((a, i) => {
    var s;
    if (a.path === "" || !((s = a.path) != null && s.includes("?")))
      o(a, i);
    else
      for (let u of na(a.path))
        o(a, i, u);
  }), t;
}
function na(e) {
  let t = e.split("/");
  if (t.length === 0)
    return [];
  let [r, ...n] = t, o = r.endsWith("?"), a = r.replace(/\?$/, "");
  if (n.length === 0)
    return o ? [a, ""] : [a];
  let i = na(n.join("/")), s = [];
  return s.push(...i.map((u) => u === "" ? a : [a, u].join("/"))), o && s.push(...i), s.map((u) => e.startsWith("/") && u === "" ? "/" : u);
}
function Ui(e) {
  e.sort((t, r) => t.score !== r.score ? r.score - t.score : zi(t.routesMeta.map((n) => n.childrenIndex), r.routesMeta.map((n) => n.childrenIndex)));
}
const ki = /^:\w+$/, Bi = 3, Fi = 2, Hi = 1, Vi = 10, Wi = -2, zn = (e) => e === "*";
function Ki(e, t) {
  let r = e.split("/"), n = r.length;
  return r.some(zn) && (n += Wi), t && (n += Fi), r.filter((o) => !zn(o)).reduce((o, a) => o + (ki.test(a) ? Bi : a === "" ? Hi : Vi), n);
}
function zi(e, t) {
  return e.length === t.length && e.slice(0, -1).every((n, o) => n === t[o]) ? e[e.length - 1] - t[t.length - 1] : 0;
}
function qi(e, t) {
  let {
    routesMeta: r
  } = e, n = {}, o = "/", a = [];
  for (let i = 0; i < r.length; ++i) {
    let s = r[i], u = i === r.length - 1, l = o === "/" ? t : t.slice(o.length) || "/", c = Ji({
      path: s.relativePath,
      caseSensitive: s.caseSensitive,
      end: u
    }, l);
    if (!c)
      return null;
    Object.assign(n, c.params);
    let d = s.route;
    a.push({
      params: n,
      pathname: Ae([o, c.pathname]),
      pathnameBase: ts(Ae([o, c.pathnameBase])),
      route: d
    }), c.pathnameBase !== "/" && (o = Ae([o, c.pathnameBase]));
  }
  return a;
}
function jp(e, t) {
  t === void 0 && (t = {});
  let r = e;
  return r.endsWith("*") && r !== "*" && !r.endsWith("/*") && (Ee(!1, 'Route path "' + r + '" will be treated as if it were ' + ('"' + r.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + r.replace(/\*$/, "/*") + '".')), r = r.replace(/\*$/, "/*")), r.replace(/^:(\w+)/g, (n, o) => ($(t[o] != null, 'Missing ":' + o + '" param'), t[o])).replace(/\/:(\w+)/g, (n, o) => ($(t[o] != null, 'Missing ":' + o + '" param'), "/" + t[o])).replace(/(\/?)\*/, (n, o, a, i) => {
    const s = "*";
    return t[s] == null ? i === "/*" ? "/" : "" : "" + o + t[s];
  });
}
function Ji(e, t) {
  typeof e == "string" && (e = {
    path: e,
    caseSensitive: !1,
    end: !0
  });
  let [r, n] = Yi(e.path, e.caseSensitive, e.end), o = t.match(r);
  if (!o)
    return null;
  let a = o[0], i = a.replace(/(.)\/+$/, "$1"), s = o.slice(1);
  return {
    params: n.reduce((l, c, d) => {
      if (c === "*") {
        let h = s[d] || "";
        i = a.slice(0, a.length - h.length).replace(/(.)\/+$/, "$1");
      }
      return l[c] = Xi(s[d] || "", c), l;
    }, {}),
    pathname: a,
    pathnameBase: i,
    pattern: e
  };
}
function Yi(e, t, r) {
  t === void 0 && (t = !1), r === void 0 && (r = !0), Ee(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
  let n = [], o = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^$?{}|()[\]]/g, "\\$&").replace(/\/:(\w+)/g, (i, s) => (n.push(s), "/([^\\/]+)"));
  return e.endsWith("*") ? (n.push("*"), o += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? o += "\\/*$" : e !== "" && e !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, t ? void 0 : "i"), n];
}
function Zi(e) {
  try {
    return decodeURI(e);
  } catch (t) {
    return Ee(!1, 'The URL path "' + e + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + t + ").")), e;
  }
}
function Xi(e, t) {
  try {
    return decodeURIComponent(e);
  } catch (r) {
    return Ee(!1, 'The value for the URL param "' + t + '" will not be decoded because' + (' the string "' + e + '" is a malformed URL segment. This is probably') + (" due to a bad percent encoding (" + r + ").")), e;
  }
}
function oa(e, t) {
  if (t === "/")
    return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let r = t.endsWith("/") ? t.length - 1 : t.length, n = e.charAt(r);
  return n && n !== "/" ? null : e.slice(r) || "/";
}
function Ee(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function Qi(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: r,
    search: n = "",
    hash: o = ""
  } = typeof e == "string" ? nt(e) : e;
  return {
    pathname: r ? r.startsWith("/") ? r : es(r, t) : t,
    search: rs(n),
    hash: ns(o)
  };
}
function es(e, t) {
  let r = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((o) => {
    o === ".." ? r.length > 1 && r.pop() : o !== "." && r.push(o);
  }), r.length > 1 ? r.join("/") : "/";
}
function pr(e, t, r, n) {
  return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(n) + "].  Please separate it out to the ") + ("`to." + r + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function aa(e) {
  return e.filter((t, r) => r === 0 || t.route.path && t.route.path.length > 0);
}
function ia(e, t, r, n) {
  n === void 0 && (n = !1);
  let o;
  typeof e == "string" ? o = nt(e) : (o = It({}, e), $(!o.pathname || !o.pathname.includes("?"), pr("?", "pathname", "search", o)), $(!o.pathname || !o.pathname.includes("#"), pr("#", "pathname", "hash", o)), $(!o.search || !o.search.includes("#"), pr("#", "search", "hash", o)));
  let a = e === "" || o.pathname === "", i = a ? "/" : o.pathname, s;
  if (n || i == null)
    s = r;
  else {
    let d = t.length - 1;
    if (i.startsWith("..")) {
      let h = i.split("/");
      for (; h[0] === ".."; )
        h.shift(), d -= 1;
      o.pathname = h.join("/");
    }
    s = d >= 0 ? t[d] : "/";
  }
  let u = Qi(o, s), l = i && i !== "/" && i.endsWith("/"), c = (a || i === ".") && r.endsWith("/");
  return !u.pathname.endsWith("/") && (l || c) && (u.pathname += "/"), u;
}
const Ae = (e) => e.join("/").replace(/\/\/+/g, "/"), ts = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"), rs = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, ns = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e;
class os {
  constructor(t, r, n, o) {
    o === void 0 && (o = !1), this.status = t, this.statusText = r || "", this.internal = o, n instanceof Error ? (this.data = n.toString(), this.error = n) : this.data = n;
  }
}
function as(e) {
  return e instanceof os;
}
const is = ["post", "put", "patch", "delete"];
[...is];
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
function Cr() {
  return Cr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Cr.apply(this, arguments);
}
function ss(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
const sa = typeof Object.is == "function" ? Object.is : ss, {
  useState: us,
  useEffect: cs,
  useLayoutEffect: ls,
  useDebugValue: fs
} = b;
let qn = !1, Jn = !1;
function ds(e, t, r) {
  process.env.NODE_ENV !== "production" && (qn || "startTransition" in b && (qn = !0, console.error("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release.")));
  const n = t();
  if (process.env.NODE_ENV !== "production" && !Jn) {
    const i = t();
    sa(n, i) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), Jn = !0);
  }
  const [{
    inst: o
  }, a] = us({
    inst: {
      value: n,
      getSnapshot: t
    }
  });
  return ls(() => {
    o.value = n, o.getSnapshot = t, mr(o) && a({
      inst: o
    });
  }, [e, n, t]), cs(() => (mr(o) && a({
    inst: o
  }), e(() => {
    mr(o) && a({
      inst: o
    });
  })), [e]), fs(n), n;
}
function mr(e) {
  const t = e.getSnapshot, r = e.value;
  try {
    const n = t();
    return !sa(r, n);
  } catch {
    return !0;
  }
}
function hs(e, t, r) {
  return t();
}
const ps = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", ms = !ps, gs = ms ? hs : ds;
"useSyncExternalStore" in b && ((e) => e.useSyncExternalStore)(b);
const ua = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (ua.displayName = "DataStaticRouterContext");
const nn = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (nn.displayName = "DataRouter");
const yt = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (yt.displayName = "DataRouterState");
const on = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (on.displayName = "Await");
const Ie = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (Ie.displayName = "Navigation");
const bt = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (bt.displayName = "Location");
const pe = /* @__PURE__ */ b.createContext({
  outlet: null,
  matches: []
});
process.env.NODE_ENV !== "production" && (pe.displayName = "Route");
const an = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (an.displayName = "RouteError");
function vs(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t;
  ot() || (process.env.NODE_ENV !== "production" ? $(
    !1,
    "useHref() may be used only in the context of a <Router> component."
  ) : $(!1));
  let {
    basename: n,
    navigator: o
  } = b.useContext(Ie), {
    hash: a,
    pathname: i,
    search: s
  } = Jt(e, {
    relative: r
  }), u = i;
  return n !== "/" && (u = i === "/" ? n : Ae([n, i])), o.createHref({
    pathname: u,
    search: s,
    hash: a
  });
}
function ot() {
  return b.useContext(bt) != null;
}
function Re() {
  return ot() || (process.env.NODE_ENV !== "production" ? $(
    !1,
    "useLocation() may be used only in the context of a <Router> component."
  ) : $(!1)), b.useContext(bt).location;
}
function qt() {
  ot() || (process.env.NODE_ENV !== "production" ? $(
    !1,
    "useNavigate() may be used only in the context of a <Router> component."
  ) : $(!1));
  let {
    basename: e,
    navigator: t
  } = b.useContext(Ie), {
    matches: r
  } = b.useContext(pe), {
    pathname: n
  } = Re(), o = JSON.stringify(aa(r).map((s) => s.pathnameBase)), a = b.useRef(!1);
  return b.useEffect(() => {
    a.current = !0;
  }), b.useCallback(function(s, u) {
    if (u === void 0 && (u = {}), process.env.NODE_ENV !== "production" && Ee(a.current, "You should call navigate() in a React.useEffect(), not when your component is first rendered."), !a.current)
      return;
    if (typeof s == "number") {
      t.go(s);
      return;
    }
    let l = ia(s, JSON.parse(o), n, u.relative === "path");
    e !== "/" && (l.pathname = l.pathname === "/" ? e : Ae([e, l.pathname])), (u.replace ? t.replace : t.push)(l, u.state, u);
  }, [e, t, o, n]);
}
const ca = /* @__PURE__ */ b.createContext(null);
function Up() {
  return b.useContext(ca);
}
function ys(e) {
  let t = b.useContext(pe).outlet;
  return t && /* @__PURE__ */ b.createElement(ca.Provider, {
    value: e
  }, t);
}
function kp() {
  let {
    matches: e
  } = b.useContext(pe), t = e[e.length - 1];
  return t ? t.params : {};
}
function Jt(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t, {
    matches: n
  } = b.useContext(pe), {
    pathname: o
  } = Re(), a = JSON.stringify(aa(n).map((i) => i.pathnameBase));
  return b.useMemo(() => ia(e, JSON.parse(a), o, r === "path"), [e, a, o, r]);
}
function bs(e, t) {
  ot() || (process.env.NODE_ENV !== "production" ? $(
    !1,
    "useRoutes() may be used only in the context of a <Router> component."
  ) : $(!1));
  let {
    navigator: r
  } = b.useContext(Ie), n = b.useContext(yt), {
    matches: o
  } = b.useContext(pe), a = o[o.length - 1], i = a ? a.params : {}, s = a ? a.pathname : "/", u = a ? a.pathnameBase : "/", l = a && a.route;
  if (process.env.NODE_ENV !== "production") {
    let w = l && l.path || "";
    Ms(s, !l || w.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + s + '" (under <Route path="' + w + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + w + '"> to <Route ') + ('path="' + (w === "/" ? "*" : w + "/*") + '">.'));
  }
  let c = Re(), d;
  if (t) {
    var h;
    let w = typeof t == "string" ? nt(t) : t;
    u === "/" || (h = w.pathname) != null && h.startsWith(u) || (process.env.NODE_ENV !== "production" ? $(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + u + '" ') + ('but pathname "' + w.pathname + '" was given in the `location` prop.')) : $(!1)), d = w;
  } else
    d = c;
  let m = d.pathname || "/", g = u === "/" ? m : m.slice(u.length) || "/", p = ji(e, {
    pathname: g
  });
  process.env.NODE_ENV !== "production" && (process.env.NODE_ENV !== "production" && Ee(l || p != null, 'No routes matched location "' + d.pathname + d.search + d.hash + '" '), process.env.NODE_ENV !== "production" && Ee(p == null || p[p.length - 1].route.element !== void 0, 'Matched leaf route at location "' + d.pathname + d.search + d.hash + '" does not have an element. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.'));
  let M = Ss(p && p.map((w) => Object.assign({}, w, {
    params: Object.assign({}, i, w.params),
    pathname: Ae([
      u,
      r.encodeLocation ? r.encodeLocation(w.pathname).pathname : w.pathname
    ]),
    pathnameBase: w.pathnameBase === "/" ? u : Ae([
      u,
      r.encodeLocation ? r.encodeLocation(w.pathnameBase).pathname : w.pathnameBase
    ])
  })), o, n || void 0);
  return t && M ? /* @__PURE__ */ b.createElement(bt.Provider, {
    value: {
      location: Cr({
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default"
      }, d),
      navigationType: $e.Pop
    }
  }, M) : M;
}
function Es() {
  let e = Os(), t = as(e) ? e.status + " " + e.statusText : e instanceof Error ? e.message : JSON.stringify(e), r = e instanceof Error ? e.stack : null, n = "rgba(200,200,200, 0.5)", o = {
    padding: "0.5rem",
    backgroundColor: n
  }, a = {
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
    style: a
  }, "errorElement"), " props on ", /* @__PURE__ */ b.createElement("code", {
    style: a
  }, "<Route>")));
}
class Ts extends b.Component {
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
    return this.state.error ? /* @__PURE__ */ b.createElement(pe.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ b.createElement(an.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function ws(e) {
  let {
    routeContext: t,
    match: r,
    children: n
  } = e, o = b.useContext(ua);
  return o && r.route.errorElement && (o._deepestRenderedBoundaryId = r.route.id), /* @__PURE__ */ b.createElement(pe.Provider, {
    value: t
  }, n);
}
function Ss(e, t, r) {
  if (t === void 0 && (t = []), e == null)
    if (r != null && r.errors)
      e = r.matches;
    else
      return null;
  let n = e, o = r == null ? void 0 : r.errors;
  if (o != null) {
    let a = n.findIndex((i) => i.route.id && (o == null ? void 0 : o[i.route.id]));
    a >= 0 || (process.env.NODE_ENV !== "production" ? $(!1, "Could not find a matching route for the current errors: " + o) : $(!1)), n = n.slice(0, Math.min(n.length, a + 1));
  }
  return n.reduceRight((a, i, s) => {
    let u = i.route.id ? o == null ? void 0 : o[i.route.id] : null, l = r ? i.route.errorElement || /* @__PURE__ */ b.createElement(Es, null) : null, c = t.concat(n.slice(0, s + 1)), d = () => /* @__PURE__ */ b.createElement(ws, {
      match: i,
      routeContext: {
        outlet: a,
        matches: c
      }
    }, u ? l : i.route.element !== void 0 ? i.route.element : a);
    return r && (i.route.errorElement || s === 0) ? /* @__PURE__ */ b.createElement(Ts, {
      location: r.location,
      component: l,
      error: u,
      children: d(),
      routeContext: {
        outlet: null,
        matches: c
      }
    }) : d();
  }, null);
}
var Yn;
(function(e) {
  e.UseRevalidator = "useRevalidator";
})(Yn || (Yn = {}));
var et;
(function(e) {
  e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator";
})(et || (et = {}));
function la(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function sn(e) {
  let t = b.useContext(yt);
  return t || (process.env.NODE_ENV !== "production" ? $(!1, la(e)) : $(!1)), t;
}
function _s(e) {
  let t = b.useContext(pe);
  return t || (process.env.NODE_ENV !== "production" ? $(!1, la(e)) : $(!1)), t;
}
function As(e) {
  let t = _s(e), r = t.matches[t.matches.length - 1];
  return r.route.id || (process.env.NODE_ENV !== "production" ? $(!1, e + ' can only be used on routes that contain a unique "id"') : $(!1)), r.route.id;
}
function Bp() {
  return sn(et.UseNavigation).navigation;
}
function Fp() {
  let e = sn(et.UseActionData);
  return b.useContext(pe) || (process.env.NODE_ENV !== "production" ? $(!1, "useActionData must be used inside a RouteContext") : $(!1)), Object.values((e == null ? void 0 : e.actionData) || {})[0];
}
function Os() {
  var e;
  let t = b.useContext(an), r = sn(et.UseRouteError), n = As(et.UseRouteError);
  return t || ((e = r.errors) == null ? void 0 : e[n]);
}
function Hp() {
  let e = b.useContext(on);
  return e == null ? void 0 : e._data;
}
function Vp() {
  let e = b.useContext(on);
  return e == null ? void 0 : e._error;
}
const Zn = {};
function Ms(e, t, r) {
  !t && !Zn[e] && (Zn[e] = !0, process.env.NODE_ENV !== "production" && Ee(!1, r));
}
function Wp(e) {
  let {
    to: t,
    replace: r,
    state: n,
    relative: o
  } = e;
  ot() || (process.env.NODE_ENV !== "production" ? $(
    !1,
    "<Navigate> may be used only in the context of a <Router> component."
  ) : $(!1)), process.env.NODE_ENV !== "production" && Ee(!b.useContext(Ie).static, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
  let a = b.useContext(yt), i = qt();
  return b.useEffect(() => {
    a && a.navigation.state !== "idle" || i(t, {
      replace: r,
      state: n,
      relative: o
    });
  }), null;
}
function Rs(e) {
  return ys(e.context);
}
function Lt(e) {
  process.env.NODE_ENV !== "production" ? $(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.") : $(!1);
}
function Ps(e) {
  let {
    basename: t = "/",
    children: r = null,
    location: n,
    navigationType: o = $e.Pop,
    navigator: a,
    static: i = !1
  } = e;
  ot() && (process.env.NODE_ENV !== "production" ? $(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.") : $(!1));
  let s = t.replace(/^\/*/, "/"), u = b.useMemo(() => ({
    basename: s,
    navigator: a,
    static: i
  }), [s, a, i]);
  typeof n == "string" && (n = nt(n));
  let {
    pathname: l = "/",
    search: c = "",
    hash: d = "",
    state: h = null,
    key: m = "default"
  } = n, g = b.useMemo(() => {
    let p = oa(l, s);
    return p == null ? null : {
      pathname: p,
      search: c,
      hash: d,
      state: h,
      key: m
    };
  }, [s, l, c, d, h, m]);
  return process.env.NODE_ENV !== "production" && Ee(g != null, '<Router basename="' + s + '"> is not able to match the URL ' + ('"' + l + c + d + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), g == null ? null : /* @__PURE__ */ b.createElement(Ie.Provider, {
    value: u
  }, /* @__PURE__ */ b.createElement(bt.Provider, {
    children: r,
    value: {
      location: g,
      navigationType: o
    }
  }));
}
function xs(e) {
  let {
    children: t,
    location: r
  } = e, n = b.useContext(nn), o = n && !t ? n.router.routes : Gr(t);
  return bs(o, r);
}
var Xn;
(function(e) {
  e[e.pending = 0] = "pending", e[e.success = 1] = "success", e[e.error = 2] = "error";
})(Xn || (Xn = {}));
new Promise(() => {
});
function Gr(e, t) {
  t === void 0 && (t = []);
  let r = [];
  return b.Children.forEach(e, (n, o) => {
    if (!/* @__PURE__ */ b.isValidElement(n))
      return;
    if (n.type === b.Fragment) {
      r.push.apply(r, Gr(n.props.children, t));
      return;
    }
    n.type !== Lt && (process.env.NODE_ENV !== "production" ? $(!1, "[" + (typeof n.type == "string" ? n.type : n.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>") : $(!1)), !n.props.index || !n.props.children || (process.env.NODE_ENV !== "production" ? $(!1, "An index route cannot have child routes.") : $(!1));
    let a = [...t, o], i = {
      id: n.props.id || a.join("-"),
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
    n.props.children && (i.children = Gr(n.props.children, a)), r.push(i);
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
function Be() {
  return Be = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Be.apply(this, arguments);
}
function un(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), o, a;
  for (a = 0; a < n.length; a++)
    o = n[a], !(t.indexOf(o) >= 0) && (r[o] = e[o]);
  return r;
}
const xt = "get", gr = "application/x-www-form-urlencoded";
function Yt(e) {
  return e != null && typeof e.tagName == "string";
}
function Cs(e) {
  return Yt(e) && e.tagName.toLowerCase() === "button";
}
function Gs(e) {
  return Yt(e) && e.tagName.toLowerCase() === "form";
}
function $s(e) {
  return Yt(e) && e.tagName.toLowerCase() === "input";
}
function Ds(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Ns(e, t) {
  return e.button === 0 && (!t || t === "_self") && !Ds(e);
}
function $r(e) {
  return e === void 0 && (e = ""), new URLSearchParams(typeof e == "string" || Array.isArray(e) || e instanceof URLSearchParams ? e : Object.keys(e).reduce((t, r) => {
    let n = e[r];
    return t.concat(Array.isArray(n) ? n.map((o) => [r, o]) : [[r, n]]);
  }, []));
}
function Is(e, t) {
  let r = $r(e);
  for (let n of t.keys())
    r.has(n) || t.getAll(n).forEach((o) => {
      r.append(n, o);
    });
  return r;
}
function Ls(e, t, r) {
  let n, o, a, i;
  if (Gs(e)) {
    let c = r.submissionTrigger;
    n = r.method || e.getAttribute("method") || xt, o = r.action || e.getAttribute("action") || t, a = r.encType || e.getAttribute("enctype") || gr, i = new FormData(e), c && c.name && i.append(c.name, c.value);
  } else if (Cs(e) || $s(e) && (e.type === "submit" || e.type === "image")) {
    let c = e.form;
    if (c == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    n = r.method || e.getAttribute("formmethod") || c.getAttribute("method") || xt, o = r.action || e.getAttribute("formaction") || c.getAttribute("action") || t, a = r.encType || e.getAttribute("formenctype") || c.getAttribute("enctype") || gr, i = new FormData(c), e.name && i.append(e.name, e.value);
  } else {
    if (Yt(e))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    if (n = r.method || xt, o = r.action || t, a = r.encType || gr, e instanceof FormData)
      i = e;
    else if (i = new FormData(), e instanceof URLSearchParams)
      for (let [c, d] of e)
        i.append(c, d);
    else if (e != null)
      for (let c of Object.keys(e))
        i.append(c, e[c]);
  }
  let {
    protocol: s,
    host: u
  } = window.location;
  return {
    url: new URL(o, s + "//" + u),
    method: n.toLowerCase(),
    encType: a,
    formData: i
  };
}
const js = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset"], Us = ["aria-current", "caseSensitive", "className", "end", "style", "to", "children"], ks = ["reloadDocument", "replace", "method", "action", "onSubmit", "fetcherKey", "routeId", "relative"];
function Kp(e) {
  let {
    basename: t,
    children: r,
    window: n
  } = e, o = b.useRef();
  o.current == null && (o.current = Di({
    window: n,
    v5Compat: !0
  }));
  let a = o.current, [i, s] = b.useState({
    action: a.action,
    location: a.location
  });
  return b.useLayoutEffect(() => a.listen(s), [a]), /* @__PURE__ */ b.createElement(Ps, {
    basename: t,
    children: r,
    location: i.location,
    navigationType: i.action,
    navigator: a
  });
}
process.env.NODE_ENV;
const fa = /* @__PURE__ */ b.forwardRef(function(t, r) {
  let {
    onClick: n,
    relative: o,
    reloadDocument: a,
    replace: i,
    state: s,
    target: u,
    to: l,
    preventScrollReset: c
  } = t, d = un(t, js), h = vs(l, {
    relative: o
  }), m = Ws(l, {
    replace: i,
    state: s,
    target: u,
    preventScrollReset: c,
    relative: o
  });
  function g(p) {
    n && n(p), p.defaultPrevented || m(p);
  }
  return /* @__PURE__ */ b.createElement("a", Be({}, d, {
    href: h,
    onClick: a ? n : g,
    ref: r,
    target: u
  }));
});
process.env.NODE_ENV !== "production" && (fa.displayName = "Link");
const Bs = /* @__PURE__ */ b.forwardRef(function(t, r) {
  let {
    "aria-current": n = "page",
    caseSensitive: o = !1,
    className: a = "",
    end: i = !1,
    style: s,
    to: u,
    children: l
  } = t, c = un(t, Us), d = Jt(u, {
    relative: c.relative
  }), h = Re(), m = b.useContext(yt), {
    navigator: g
  } = b.useContext(Ie), p = g.encodeLocation ? g.encodeLocation(d).pathname : d.pathname, M = h.pathname, w = m && m.navigation && m.navigation.location ? m.navigation.location.pathname : null;
  o || (M = M.toLowerCase(), w = w ? w.toLowerCase() : null, p = p.toLowerCase());
  let I = M === p || !i && M.startsWith(p) && M.charAt(p.length) === "/", A = w != null && (w === p || !i && w.startsWith(p) && w.charAt(p.length) === "/"), O = I ? n : void 0, N;
  typeof a == "function" ? N = a({
    isActive: I,
    isPending: A
  }) : N = [a, I ? "active" : null, A ? "pending" : null].filter(Boolean).join(" ");
  let R = typeof s == "function" ? s({
    isActive: I,
    isPending: A
  }) : s;
  return /* @__PURE__ */ b.createElement(fa, Be({}, c, {
    "aria-current": O,
    className: N,
    ref: r,
    style: R,
    to: u
  }), typeof l == "function" ? l({
    isActive: I,
    isPending: A
  }) : l);
});
process.env.NODE_ENV !== "production" && (Bs.displayName = "NavLink");
const Fs = /* @__PURE__ */ b.forwardRef((e, t) => /* @__PURE__ */ b.createElement(da, Be({}, e, {
  ref: t
})));
process.env.NODE_ENV !== "production" && (Fs.displayName = "Form");
const da = /* @__PURE__ */ b.forwardRef((e, t) => {
  let {
    reloadDocument: r,
    replace: n,
    method: o = xt,
    action: a,
    onSubmit: i,
    fetcherKey: s,
    routeId: u,
    relative: l
  } = e, c = un(e, ks), d = Ks(s, u), h = o.toLowerCase() === "get" ? "get" : "post", m = ha(a, {
    relative: l
  }), g = (p) => {
    if (i && i(p), p.defaultPrevented)
      return;
    p.preventDefault();
    let M = p.nativeEvent.submitter, w = (M == null ? void 0 : M.getAttribute("formmethod")) || o;
    d(M || p.currentTarget, {
      method: w,
      replace: n,
      relative: l
    });
  };
  return /* @__PURE__ */ b.createElement("form", Be({
    ref: t,
    method: h,
    action: m,
    onSubmit: r ? i : g
  }, c));
});
process.env.NODE_ENV !== "production" && (da.displayName = "FormImpl");
process.env.NODE_ENV;
var Dr;
(function(e) {
  e.UseScrollRestoration = "useScrollRestoration", e.UseSubmitImpl = "useSubmitImpl", e.UseFetcher = "useFetcher";
})(Dr || (Dr = {}));
var Qn;
(function(e) {
  e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration";
})(Qn || (Qn = {}));
function Hs(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function Vs(e) {
  let t = b.useContext(nn);
  return t || (process.env.NODE_ENV !== "production" ? $(!1, Hs(e)) : $(!1)), t;
}
function Ws(e, t) {
  let {
    target: r,
    replace: n,
    state: o,
    preventScrollReset: a,
    relative: i
  } = t === void 0 ? {} : t, s = qt(), u = Re(), l = Jt(e, {
    relative: i
  });
  return b.useCallback((c) => {
    if (Ns(c, r)) {
      c.preventDefault();
      let d = n !== void 0 ? n : Qe(u) === Qe(l);
      s(e, {
        replace: d,
        state: o,
        preventScrollReset: a,
        relative: i
      });
    }
  }, [u, s, l, n, o, r, e, a, i]);
}
function zp(e) {
  process.env.NODE_ENV !== "production" && zs(typeof URLSearchParams < "u", "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params\n\nIf you're unsure how to load polyfills, we recommend you check out https://polyfill.io/v3/ which provides some recommendations about how to load polyfills only for users that need them, instead of for every user.");
  let t = b.useRef($r(e)), r = Re(), n = b.useMemo(() => Is(r.search, t.current), [r.search]), o = qt(), a = b.useCallback((i, s) => {
    const u = $r(typeof i == "function" ? i(n) : i);
    o("?" + u, s);
  }, [o, n]);
  return [n, a];
}
function Ks(e, t) {
  let {
    router: r
  } = Vs(Dr.UseSubmitImpl), n = ha();
  return b.useCallback(function(o, a) {
    if (a === void 0 && (a = {}), typeof document > "u")
      throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
    let {
      method: i,
      encType: s,
      formData: u,
      url: l
    } = Ls(o, n, a), c = l.pathname + l.search, d = {
      replace: a.replace,
      formData: u,
      formMethod: i,
      formEncType: s
    };
    e ? (t == null && (process.env.NODE_ENV !== "production" ? $(!1, "No routeId available for useFetcher()") : $(!1)), r.fetch(e, t, c, d)) : r.navigate(c, d);
  }, [n, r, e, t]);
}
function ha(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t, {
    basename: n
  } = b.useContext(Ie), o = b.useContext(pe);
  o || (process.env.NODE_ENV !== "production" ? $(!1, "useFormAction must be used inside a RouteContext") : $(!1));
  let [a] = o.matches.slice(-1), i = Be({}, Jt(e || ".", {
    relative: r
  })), s = Re();
  if (e == null && (i.search = s.search, i.hash = s.hash, a.route.index)) {
    let u = new URLSearchParams(i.search);
    u.delete("index"), i.search = u.toString() ? "?" + u.toString() : "";
  }
  return (!e || e === ".") && a.route.index && (i.search = i.search ? i.search.replace(/^\?/, "?index&") : "?index"), n !== "/" && (i.pathname = i.pathname === "/" ? n : Ae([n, i.pathname])), Qe(i);
}
function qp(e) {
  b.useEffect(() => (window.addEventListener("beforeunload", e), () => {
    window.removeEventListener("beforeunload", e);
  }), [e]);
}
function zs(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
var qs = typeof global == "object" && global && global.Object === Object && global;
const pa = qs;
var Js = typeof self == "object" && self && self.Object === Object && self, Ys = pa || Js || Function("return this")();
const me = Ys;
var Zs = me.Symbol;
const De = Zs;
var ma = Object.prototype, Xs = ma.hasOwnProperty, Qs = ma.toString, ut = De ? De.toStringTag : void 0;
function eu(e) {
  var t = Xs.call(e, ut), r = e[ut];
  try {
    e[ut] = void 0;
    var n = !0;
  } catch {
  }
  var o = Qs.call(e);
  return n && (t ? e[ut] = r : delete e[ut]), o;
}
var tu = Object.prototype, ru = tu.toString;
function nu(e) {
  return ru.call(e);
}
var ou = "[object Null]", au = "[object Undefined]", eo = De ? De.toStringTag : void 0;
function Ve(e) {
  return e == null ? e === void 0 ? au : ou : eo && eo in Object(e) ? eu(e) : nu(e);
}
function Ne(e) {
  return e != null && typeof e == "object";
}
var iu = "[object Symbol]";
function Zt(e) {
  return typeof e == "symbol" || Ne(e) && Ve(e) == iu;
}
function su(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, o = Array(n); ++r < n; )
    o[r] = t(e[r], r, e);
  return o;
}
var uu = Array.isArray;
const de = uu;
var cu = 1 / 0, to = De ? De.prototype : void 0, ro = to ? to.toString : void 0;
function ga(e) {
  if (typeof e == "string")
    return e;
  if (de(e))
    return su(e, ga) + "";
  if (Zt(e))
    return ro ? ro.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -cu ? "-0" : t;
}
var lu = /\s/;
function fu(e) {
  for (var t = e.length; t-- && lu.test(e.charAt(t)); )
    ;
  return t;
}
var du = /^\s+/;
function hu(e) {
  return e && e.slice(0, fu(e) + 1).replace(du, "");
}
function he(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var no = 0 / 0, pu = /^[-+]0x[0-9a-f]+$/i, mu = /^0b[01]+$/i, gu = /^0o[0-7]+$/i, vu = parseInt;
function oo(e) {
  if (typeof e == "number")
    return e;
  if (Zt(e))
    return no;
  if (he(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = he(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = hu(e);
  var r = mu.test(e);
  return r || gu.test(e) ? vu(e.slice(2), r ? 2 : 8) : pu.test(e) ? no : +e;
}
function cn(e) {
  return e;
}
var yu = "[object AsyncFunction]", bu = "[object Function]", Eu = "[object GeneratorFunction]", Tu = "[object Proxy]";
function ln(e) {
  if (!he(e))
    return !1;
  var t = Ve(e);
  return t == bu || t == Eu || t == yu || t == Tu;
}
var wu = me["__core-js_shared__"];
const vr = wu;
var ao = function() {
  var e = /[^.]+$/.exec(vr && vr.keys && vr.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function Su(e) {
  return !!ao && ao in e;
}
var _u = Function.prototype, Au = _u.toString;
function We(e) {
  if (e != null) {
    try {
      return Au.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Ou = /[\\^$.*+?()[\]{}|]/g, Mu = /^\[object .+?Constructor\]$/, Ru = Function.prototype, Pu = Object.prototype, xu = Ru.toString, Cu = Pu.hasOwnProperty, Gu = RegExp(
  "^" + xu.call(Cu).replace(Ou, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function $u(e) {
  if (!he(e) || Su(e))
    return !1;
  var t = ln(e) ? Gu : Mu;
  return t.test(We(e));
}
function Du(e, t) {
  return e == null ? void 0 : e[t];
}
function Ke(e, t) {
  var r = Du(e, t);
  return $u(r) ? r : void 0;
}
var Nu = Ke(me, "WeakMap");
const Nr = Nu;
var io = Object.create, Iu = function() {
  function e() {
  }
  return function(t) {
    if (!he(t))
      return {};
    if (io)
      return io(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}();
const Lu = Iu;
function ju(e, t, r) {
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
function Uu() {
}
function ku(e, t) {
  var r = -1, n = e.length;
  for (t || (t = Array(n)); ++r < n; )
    t[r] = e[r];
  return t;
}
var Bu = 800, Fu = 16, Hu = Date.now;
function Vu(e) {
  var t = 0, r = 0;
  return function() {
    var n = Hu(), o = Fu - (n - r);
    if (r = n, o > 0) {
      if (++t >= Bu)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function Wu(e) {
  return function() {
    return e;
  };
}
var Ku = function() {
  try {
    var e = Ke(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
const jt = Ku;
var zu = jt ? function(e, t) {
  return jt(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Wu(t),
    writable: !0
  });
} : cn;
const qu = zu;
var Ju = Vu(qu);
const Yu = Ju;
function Zu(e, t, r, n) {
  for (var o = e.length, a = r + (n ? 1 : -1); n ? a-- : ++a < o; )
    if (t(e[a], a, e))
      return a;
  return -1;
}
function Xu(e) {
  return e !== e;
}
function Qu(e, t, r) {
  for (var n = r - 1, o = e.length; ++n < o; )
    if (e[n] === t)
      return n;
  return -1;
}
function ec(e, t, r) {
  return t === t ? Qu(e, t, r) : Zu(e, Xu, r);
}
function tc(e, t) {
  var r = e == null ? 0 : e.length;
  return !!r && ec(e, t, 0) > -1;
}
var rc = 9007199254740991, nc = /^(?:0|[1-9]\d*)$/;
function fn(e, t) {
  var r = typeof e;
  return t = t ?? rc, !!t && (r == "number" || r != "symbol" && nc.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function Xt(e, t, r) {
  t == "__proto__" && jt ? jt(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
function Et(e, t) {
  return e === t || e !== e && t !== t;
}
var oc = Object.prototype, ac = oc.hasOwnProperty;
function ic(e, t, r) {
  var n = e[t];
  (!(ac.call(e, t) && Et(n, r)) || r === void 0 && !(t in e)) && Xt(e, t, r);
}
function sc(e, t, r, n) {
  var o = !r;
  r || (r = {});
  for (var a = -1, i = t.length; ++a < i; ) {
    var s = t[a], u = n ? n(r[s], e[s], s, r, e) : void 0;
    u === void 0 && (u = e[s]), o ? Xt(r, s, u) : ic(r, s, u);
  }
  return r;
}
var so = Math.max;
function uc(e, t, r) {
  return t = so(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var n = arguments, o = -1, a = so(n.length - t, 0), i = Array(a); ++o < a; )
      i[o] = n[t + o];
    o = -1;
    for (var s = Array(t + 1); ++o < t; )
      s[o] = n[o];
    return s[t] = r(i), ju(e, this, s);
  };
}
function cc(e, t) {
  return Yu(uc(e, t, cn), e + "");
}
var lc = 9007199254740991;
function dn(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= lc;
}
function Qt(e) {
  return e != null && dn(e.length) && !ln(e);
}
function fc(e, t, r) {
  if (!he(r))
    return !1;
  var n = typeof t;
  return (n == "number" ? Qt(r) && fn(t, r.length) : n == "string" && t in r) ? Et(r[t], e) : !1;
}
function dc(e) {
  return cc(function(t, r) {
    var n = -1, o = r.length, a = o > 1 ? r[o - 1] : void 0, i = o > 2 ? r[2] : void 0;
    for (a = e.length > 3 && typeof a == "function" ? (o--, a) : void 0, i && fc(r[0], r[1], i) && (a = o < 3 ? void 0 : a, o = 1), t = Object(t); ++n < o; ) {
      var s = r[n];
      s && e(t, s, n, a);
    }
    return t;
  });
}
var hc = Object.prototype;
function hn(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || hc;
  return e === r;
}
function pc(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var mc = "[object Arguments]";
function uo(e) {
  return Ne(e) && Ve(e) == mc;
}
var va = Object.prototype, gc = va.hasOwnProperty, vc = va.propertyIsEnumerable, yc = uo(function() {
  return arguments;
}()) ? uo : function(e) {
  return Ne(e) && gc.call(e, "callee") && !vc.call(e, "callee");
};
const Ut = yc;
function bc() {
  return !1;
}
var ya = typeof exports == "object" && exports && !exports.nodeType && exports, co = ya && typeof module == "object" && module && !module.nodeType && module, Ec = co && co.exports === ya, lo = Ec ? me.Buffer : void 0, Tc = lo ? lo.isBuffer : void 0, wc = Tc || bc;
const kt = wc;
var Sc = "[object Arguments]", _c = "[object Array]", Ac = "[object Boolean]", Oc = "[object Date]", Mc = "[object Error]", Rc = "[object Function]", Pc = "[object Map]", xc = "[object Number]", Cc = "[object Object]", Gc = "[object RegExp]", $c = "[object Set]", Dc = "[object String]", Nc = "[object WeakMap]", Ic = "[object ArrayBuffer]", Lc = "[object DataView]", jc = "[object Float32Array]", Uc = "[object Float64Array]", kc = "[object Int8Array]", Bc = "[object Int16Array]", Fc = "[object Int32Array]", Hc = "[object Uint8Array]", Vc = "[object Uint8ClampedArray]", Wc = "[object Uint16Array]", Kc = "[object Uint32Array]", q = {};
q[jc] = q[Uc] = q[kc] = q[Bc] = q[Fc] = q[Hc] = q[Vc] = q[Wc] = q[Kc] = !0;
q[Sc] = q[_c] = q[Ic] = q[Ac] = q[Lc] = q[Oc] = q[Mc] = q[Rc] = q[Pc] = q[xc] = q[Cc] = q[Gc] = q[$c] = q[Dc] = q[Nc] = !1;
function zc(e) {
  return Ne(e) && dn(e.length) && !!q[Ve(e)];
}
function qc(e) {
  return function(t) {
    return e(t);
  };
}
var ba = typeof exports == "object" && exports && !exports.nodeType && exports, ft = ba && typeof module == "object" && module && !module.nodeType && module, Jc = ft && ft.exports === ba, yr = Jc && pa.process, Yc = function() {
  try {
    var e = ft && ft.require && ft.require("util").types;
    return e || yr && yr.binding && yr.binding("util");
  } catch {
  }
}();
const fo = Yc;
var ho = fo && fo.isTypedArray, Zc = ho ? qc(ho) : zc;
const pn = Zc;
var Xc = Object.prototype, Qc = Xc.hasOwnProperty;
function Ea(e, t) {
  var r = de(e), n = !r && Ut(e), o = !r && !n && kt(e), a = !r && !n && !o && pn(e), i = r || n || o || a, s = i ? pc(e.length, String) : [], u = s.length;
  for (var l in e)
    (t || Qc.call(e, l)) && !(i && (l == "length" || o && (l == "offset" || l == "parent") || a && (l == "buffer" || l == "byteLength" || l == "byteOffset") || fn(l, u))) && s.push(l);
  return s;
}
function Ta(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var el = Ta(Object.keys, Object);
const tl = el;
var rl = Object.prototype, nl = rl.hasOwnProperty;
function ol(e) {
  if (!hn(e))
    return tl(e);
  var t = [];
  for (var r in Object(e))
    nl.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
function mn(e) {
  return Qt(e) ? Ea(e) : ol(e);
}
function al(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var il = Object.prototype, sl = il.hasOwnProperty;
function ul(e) {
  if (!he(e))
    return al(e);
  var t = hn(e), r = [];
  for (var n in e)
    n == "constructor" && (t || !sl.call(e, n)) || r.push(n);
  return r;
}
function wa(e) {
  return Qt(e) ? Ea(e, !0) : ul(e);
}
var cl = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, ll = /^\w*$/;
function gn(e, t) {
  if (de(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || Zt(e) ? !0 : ll.test(e) || !cl.test(e) || t != null && e in Object(t);
}
var fl = Ke(Object, "create");
const dt = fl;
function dl() {
  this.__data__ = dt ? dt(null) : {}, this.size = 0;
}
function hl(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var pl = "__lodash_hash_undefined__", ml = Object.prototype, gl = ml.hasOwnProperty;
function vl(e) {
  var t = this.__data__;
  if (dt) {
    var r = t[e];
    return r === pl ? void 0 : r;
  }
  return gl.call(t, e) ? t[e] : void 0;
}
var yl = Object.prototype, bl = yl.hasOwnProperty;
function El(e) {
  var t = this.__data__;
  return dt ? t[e] !== void 0 : bl.call(t, e);
}
var Tl = "__lodash_hash_undefined__";
function wl(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = dt && t === void 0 ? Tl : t, this;
}
function Fe(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Fe.prototype.clear = dl;
Fe.prototype.delete = hl;
Fe.prototype.get = vl;
Fe.prototype.has = El;
Fe.prototype.set = wl;
function Sl() {
  this.__data__ = [], this.size = 0;
}
function er(e, t) {
  for (var r = e.length; r--; )
    if (Et(e[r][0], t))
      return r;
  return -1;
}
var _l = Array.prototype, Al = _l.splice;
function Ol(e) {
  var t = this.__data__, r = er(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : Al.call(t, r, 1), --this.size, !0;
}
function Ml(e) {
  var t = this.__data__, r = er(t, e);
  return r < 0 ? void 0 : t[r][1];
}
function Rl(e) {
  return er(this.__data__, e) > -1;
}
function Pl(e, t) {
  var r = this.__data__, n = er(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
function Pe(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Pe.prototype.clear = Sl;
Pe.prototype.delete = Ol;
Pe.prototype.get = Ml;
Pe.prototype.has = Rl;
Pe.prototype.set = Pl;
var xl = Ke(me, "Map");
const ht = xl;
function Cl() {
  this.size = 0, this.__data__ = {
    hash: new Fe(),
    map: new (ht || Pe)(),
    string: new Fe()
  };
}
function Gl(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function tr(e, t) {
  var r = e.__data__;
  return Gl(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
function $l(e) {
  var t = tr(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function Dl(e) {
  return tr(this, e).get(e);
}
function Nl(e) {
  return tr(this, e).has(e);
}
function Il(e, t) {
  var r = tr(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
function xe(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
xe.prototype.clear = Cl;
xe.prototype.delete = $l;
xe.prototype.get = Dl;
xe.prototype.has = Nl;
xe.prototype.set = Il;
var Ll = "Expected a function";
function vn(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Ll);
  var r = function() {
    var n = arguments, o = t ? t.apply(this, n) : n[0], a = r.cache;
    if (a.has(o))
      return a.get(o);
    var i = e.apply(this, n);
    return r.cache = a.set(o, i) || a, i;
  };
  return r.cache = new (vn.Cache || xe)(), r;
}
vn.Cache = xe;
var jl = 500;
function Ul(e) {
  var t = vn(e, function(n) {
    return r.size === jl && r.clear(), n;
  }), r = t.cache;
  return t;
}
var kl = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Bl = /\\(\\)?/g, Fl = Ul(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(kl, function(r, n, o, a) {
    t.push(o ? a.replace(Bl, "$1") : n || r);
  }), t;
});
const Hl = Fl;
function Vl(e) {
  return e == null ? "" : ga(e);
}
function Sa(e, t) {
  return de(e) ? e : gn(e, t) ? [e] : Hl(Vl(e));
}
var Wl = 1 / 0;
function rr(e) {
  if (typeof e == "string" || Zt(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -Wl ? "-0" : t;
}
function _a(e, t) {
  t = Sa(t, e);
  for (var r = 0, n = t.length; e != null && r < n; )
    e = e[rr(t[r++])];
  return r && r == n ? e : void 0;
}
function Kl(e, t, r) {
  var n = e == null ? void 0 : _a(e, t);
  return n === void 0 ? r : n;
}
function zl(e, t) {
  for (var r = -1, n = t.length, o = e.length; ++r < n; )
    e[o + r] = t[r];
  return e;
}
var ql = Ta(Object.getPrototypeOf, Object);
const Aa = ql;
var Jl = "[object Object]", Yl = Function.prototype, Zl = Object.prototype, Oa = Yl.toString, Xl = Zl.hasOwnProperty, Ql = Oa.call(Object);
function ef(e) {
  if (!Ne(e) || Ve(e) != Jl)
    return !1;
  var t = Aa(e);
  if (t === null)
    return !0;
  var r = Xl.call(t, "constructor") && t.constructor;
  return typeof r == "function" && r instanceof r && Oa.call(r) == Ql;
}
function tf() {
  this.__data__ = new Pe(), this.size = 0;
}
function rf(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
function nf(e) {
  return this.__data__.get(e);
}
function of(e) {
  return this.__data__.has(e);
}
var af = 200;
function sf(e, t) {
  var r = this.__data__;
  if (r instanceof Pe) {
    var n = r.__data__;
    if (!ht || n.length < af - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new xe(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
function be(e) {
  var t = this.__data__ = new Pe(e);
  this.size = t.size;
}
be.prototype.clear = tf;
be.prototype.delete = rf;
be.prototype.get = nf;
be.prototype.has = of;
be.prototype.set = sf;
var Ma = typeof exports == "object" && exports && !exports.nodeType && exports, po = Ma && typeof module == "object" && module && !module.nodeType && module, uf = po && po.exports === Ma, mo = uf ? me.Buffer : void 0, go = mo ? mo.allocUnsafe : void 0;
function cf(e, t) {
  if (t)
    return e.slice();
  var r = e.length, n = go ? go(r) : new e.constructor(r);
  return e.copy(n), n;
}
function lf(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, o = 0, a = []; ++r < n; ) {
    var i = e[r];
    t(i, r, e) && (a[o++] = i);
  }
  return a;
}
function ff() {
  return [];
}
var df = Object.prototype, hf = df.propertyIsEnumerable, vo = Object.getOwnPropertySymbols, pf = vo ? function(e) {
  return e == null ? [] : (e = Object(e), lf(vo(e), function(t) {
    return hf.call(e, t);
  }));
} : ff;
const mf = pf;
function gf(e, t, r) {
  var n = t(e);
  return de(e) ? n : zl(n, r(e));
}
function yo(e) {
  return gf(e, mn, mf);
}
var vf = Ke(me, "DataView");
const Ir = vf;
var yf = Ke(me, "Promise");
const Lr = yf;
var bf = Ke(me, "Set");
const Ze = bf;
var bo = "[object Map]", Ef = "[object Object]", Eo = "[object Promise]", To = "[object Set]", wo = "[object WeakMap]", So = "[object DataView]", Tf = We(Ir), wf = We(ht), Sf = We(Lr), _f = We(Ze), Af = We(Nr), je = Ve;
(Ir && je(new Ir(new ArrayBuffer(1))) != So || ht && je(new ht()) != bo || Lr && je(Lr.resolve()) != Eo || Ze && je(new Ze()) != To || Nr && je(new Nr()) != wo) && (je = function(e) {
  var t = Ve(e), r = t == Ef ? e.constructor : void 0, n = r ? We(r) : "";
  if (n)
    switch (n) {
      case Tf:
        return So;
      case wf:
        return bo;
      case Sf:
        return Eo;
      case _f:
        return To;
      case Af:
        return wo;
    }
  return t;
});
const _o = je;
var Of = me.Uint8Array;
const Bt = Of;
function Mf(e) {
  var t = new e.constructor(e.byteLength);
  return new Bt(t).set(new Bt(e)), t;
}
function Rf(e, t) {
  var r = t ? Mf(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
function Pf(e) {
  return typeof e.constructor == "function" && !hn(e) ? Lu(Aa(e)) : {};
}
var xf = "__lodash_hash_undefined__";
function Cf(e) {
  return this.__data__.set(e, xf), this;
}
function Gf(e) {
  return this.__data__.has(e);
}
function pt(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.__data__ = new xe(); ++t < r; )
    this.add(e[t]);
}
pt.prototype.add = pt.prototype.push = Cf;
pt.prototype.has = Gf;
function $f(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
    if (t(e[r], r, e))
      return !0;
  return !1;
}
function Ra(e, t) {
  return e.has(t);
}
var Df = 1, Nf = 2;
function Pa(e, t, r, n, o, a) {
  var i = r & Df, s = e.length, u = t.length;
  if (s != u && !(i && u > s))
    return !1;
  var l = a.get(e), c = a.get(t);
  if (l && c)
    return l == t && c == e;
  var d = -1, h = !0, m = r & Nf ? new pt() : void 0;
  for (a.set(e, t), a.set(t, e); ++d < s; ) {
    var g = e[d], p = t[d];
    if (n)
      var M = i ? n(p, g, d, t, e, a) : n(g, p, d, e, t, a);
    if (M !== void 0) {
      if (M)
        continue;
      h = !1;
      break;
    }
    if (m) {
      if (!$f(t, function(w, I) {
        if (!Ra(m, I) && (g === w || o(g, w, r, n, a)))
          return m.push(I);
      })) {
        h = !1;
        break;
      }
    } else if (!(g === p || o(g, p, r, n, a))) {
      h = !1;
      break;
    }
  }
  return a.delete(e), a.delete(t), h;
}
function If(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n, o) {
    r[++t] = [o, n];
  }), r;
}
function yn(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n) {
    r[++t] = n;
  }), r;
}
var Lf = 1, jf = 2, Uf = "[object Boolean]", kf = "[object Date]", Bf = "[object Error]", Ff = "[object Map]", Hf = "[object Number]", Vf = "[object RegExp]", Wf = "[object Set]", Kf = "[object String]", zf = "[object Symbol]", qf = "[object ArrayBuffer]", Jf = "[object DataView]", Ao = De ? De.prototype : void 0, br = Ao ? Ao.valueOf : void 0;
function Yf(e, t, r, n, o, a, i) {
  switch (r) {
    case Jf:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case qf:
      return !(e.byteLength != t.byteLength || !a(new Bt(e), new Bt(t)));
    case Uf:
    case kf:
    case Hf:
      return Et(+e, +t);
    case Bf:
      return e.name == t.name && e.message == t.message;
    case Vf:
    case Kf:
      return e == t + "";
    case Ff:
      var s = If;
    case Wf:
      var u = n & Lf;
      if (s || (s = yn), e.size != t.size && !u)
        return !1;
      var l = i.get(e);
      if (l)
        return l == t;
      n |= jf, i.set(e, t);
      var c = Pa(s(e), s(t), n, o, a, i);
      return i.delete(e), c;
    case zf:
      if (br)
        return br.call(e) == br.call(t);
  }
  return !1;
}
var Zf = 1, Xf = Object.prototype, Qf = Xf.hasOwnProperty;
function ed(e, t, r, n, o, a) {
  var i = r & Zf, s = yo(e), u = s.length, l = yo(t), c = l.length;
  if (u != c && !i)
    return !1;
  for (var d = u; d--; ) {
    var h = s[d];
    if (!(i ? h in t : Qf.call(t, h)))
      return !1;
  }
  var m = a.get(e), g = a.get(t);
  if (m && g)
    return m == t && g == e;
  var p = !0;
  a.set(e, t), a.set(t, e);
  for (var M = i; ++d < u; ) {
    h = s[d];
    var w = e[h], I = t[h];
    if (n)
      var A = i ? n(I, w, h, t, e, a) : n(w, I, h, e, t, a);
    if (!(A === void 0 ? w === I || o(w, I, r, n, a) : A)) {
      p = !1;
      break;
    }
    M || (M = h == "constructor");
  }
  if (p && !M) {
    var O = e.constructor, N = t.constructor;
    O != N && "constructor" in e && "constructor" in t && !(typeof O == "function" && O instanceof O && typeof N == "function" && N instanceof N) && (p = !1);
  }
  return a.delete(e), a.delete(t), p;
}
var td = 1, Oo = "[object Arguments]", Mo = "[object Array]", Ot = "[object Object]", rd = Object.prototype, Ro = rd.hasOwnProperty;
function nd(e, t, r, n, o, a) {
  var i = de(e), s = de(t), u = i ? Mo : _o(e), l = s ? Mo : _o(t);
  u = u == Oo ? Ot : u, l = l == Oo ? Ot : l;
  var c = u == Ot, d = l == Ot, h = u == l;
  if (h && kt(e)) {
    if (!kt(t))
      return !1;
    i = !0, c = !1;
  }
  if (h && !c)
    return a || (a = new be()), i || pn(e) ? Pa(e, t, r, n, o, a) : Yf(e, t, u, r, n, o, a);
  if (!(r & td)) {
    var m = c && Ro.call(e, "__wrapped__"), g = d && Ro.call(t, "__wrapped__");
    if (m || g) {
      var p = m ? e.value() : e, M = g ? t.value() : t;
      return a || (a = new be()), o(p, M, r, n, a);
    }
  }
  return h ? (a || (a = new be()), ed(e, t, r, n, o, a)) : !1;
}
function bn(e, t, r, n, o) {
  return e === t ? !0 : e == null || t == null || !Ne(e) && !Ne(t) ? e !== e && t !== t : nd(e, t, r, n, bn, o);
}
var od = 1, ad = 2;
function id(e, t, r, n) {
  var o = r.length, a = o, i = !n;
  if (e == null)
    return !a;
  for (e = Object(e); o--; ) {
    var s = r[o];
    if (i && s[2] ? s[1] !== e[s[0]] : !(s[0] in e))
      return !1;
  }
  for (; ++o < a; ) {
    s = r[o];
    var u = s[0], l = e[u], c = s[1];
    if (i && s[2]) {
      if (l === void 0 && !(u in e))
        return !1;
    } else {
      var d = new be();
      if (n)
        var h = n(l, c, u, e, t, d);
      if (!(h === void 0 ? bn(c, l, od | ad, n, d) : h))
        return !1;
    }
  }
  return !0;
}
function xa(e) {
  return e === e && !he(e);
}
function sd(e) {
  for (var t = mn(e), r = t.length; r--; ) {
    var n = t[r], o = e[n];
    t[r] = [n, o, xa(o)];
  }
  return t;
}
function Ca(e, t) {
  return function(r) {
    return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
  };
}
function ud(e) {
  var t = sd(e);
  return t.length == 1 && t[0][2] ? Ca(t[0][0], t[0][1]) : function(r) {
    return r === e || id(r, e, t);
  };
}
function cd(e, t) {
  return e != null && t in Object(e);
}
function ld(e, t, r) {
  t = Sa(t, e);
  for (var n = -1, o = t.length, a = !1; ++n < o; ) {
    var i = rr(t[n]);
    if (!(a = e != null && r(e, i)))
      break;
    e = e[i];
  }
  return a || ++n != o ? a : (o = e == null ? 0 : e.length, !!o && dn(o) && fn(i, o) && (de(e) || Ut(e)));
}
function fd(e, t) {
  return e != null && ld(e, t, cd);
}
var dd = 1, hd = 2;
function pd(e, t) {
  return gn(e) && xa(t) ? Ca(rr(e), t) : function(r) {
    var n = Kl(r, e);
    return n === void 0 && n === t ? fd(r, e) : bn(t, n, dd | hd);
  };
}
function md(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function gd(e) {
  return function(t) {
    return _a(t, e);
  };
}
function vd(e) {
  return gn(e) ? md(rr(e)) : gd(e);
}
function Ga(e) {
  return typeof e == "function" ? e : e == null ? cn : typeof e == "object" ? de(e) ? pd(e[0], e[1]) : ud(e) : vd(e);
}
function yd(e) {
  return function(t, r, n) {
    for (var o = -1, a = Object(t), i = n(t), s = i.length; s--; ) {
      var u = i[e ? s : ++o];
      if (r(a[u], u, a) === !1)
        break;
    }
    return t;
  };
}
var bd = yd();
const $a = bd;
function Ed(e, t) {
  return e && $a(e, t, mn);
}
var Td = function() {
  return me.Date.now();
};
const Er = Td;
var wd = "Expected a function", Sd = Math.max, _d = Math.min;
function Ad(e, t, r) {
  var n, o, a, i, s, u, l = 0, c = !1, d = !1, h = !0;
  if (typeof e != "function")
    throw new TypeError(wd);
  t = oo(t) || 0, he(r) && (c = !!r.leading, d = "maxWait" in r, a = d ? Sd(oo(r.maxWait) || 0, t) : a, h = "trailing" in r ? !!r.trailing : h);
  function m(R) {
    var V = n, k = o;
    return n = o = void 0, l = R, i = e.apply(k, V), i;
  }
  function g(R) {
    return l = R, s = setTimeout(w, t), c ? m(R) : i;
  }
  function p(R) {
    var V = R - u, k = R - l, L = t - V;
    return d ? _d(L, a - k) : L;
  }
  function M(R) {
    var V = R - u, k = R - l;
    return u === void 0 || V >= t || V < 0 || d && k >= a;
  }
  function w() {
    var R = Er();
    if (M(R))
      return I(R);
    s = setTimeout(w, p(R));
  }
  function I(R) {
    return s = void 0, h && n ? m(R) : (n = o = void 0, i);
  }
  function A() {
    s !== void 0 && clearTimeout(s), l = 0, n = u = o = s = void 0;
  }
  function O() {
    return s === void 0 ? i : I(Er());
  }
  function N() {
    var R = Er(), V = M(R);
    if (n = arguments, o = this, u = R, V) {
      if (s === void 0)
        return g(u);
      if (d)
        return clearTimeout(s), s = setTimeout(w, t), m(u);
    }
    return s === void 0 && (s = setTimeout(w, t)), i;
  }
  return N.cancel = A, N.flush = O, N;
}
function jr(e, t, r) {
  (r !== void 0 && !Et(e[t], r) || r === void 0 && !(t in e)) && Xt(e, t, r);
}
function Od(e) {
  return Ne(e) && Qt(e);
}
function Ur(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function Md(e) {
  return sc(e, wa(e));
}
function Rd(e, t, r, n, o, a, i) {
  var s = Ur(e, r), u = Ur(t, r), l = i.get(u);
  if (l) {
    jr(e, r, l);
    return;
  }
  var c = a ? a(s, u, r + "", e, t, i) : void 0, d = c === void 0;
  if (d) {
    var h = de(u), m = !h && kt(u), g = !h && !m && pn(u);
    c = u, h || m || g ? de(s) ? c = s : Od(s) ? c = ku(s) : m ? (d = !1, c = cf(u, !0)) : g ? (d = !1, c = Rf(u, !0)) : c = [] : ef(u) || Ut(u) ? (c = s, Ut(s) ? c = Md(s) : (!he(s) || ln(s)) && (c = Pf(u))) : d = !1;
  }
  d && (i.set(u, c), o(c, u, n, a, i), i.delete(u)), jr(e, r, c);
}
function Da(e, t, r, n, o) {
  e !== t && $a(t, function(a, i) {
    if (o || (o = new be()), he(a))
      Rd(e, t, i, r, Da, n, o);
    else {
      var s = n ? n(Ur(e, i), a, i + "", e, t, o) : void 0;
      s === void 0 && (s = a), jr(e, i, s);
    }
  }, wa);
}
function Pd(e, t, r) {
  for (var n = -1, o = e == null ? 0 : e.length; ++n < o; )
    if (r(t, e[n]))
      return !0;
  return !1;
}
function xd(e, t) {
  var r = {};
  return t = Ga(t), Ed(e, function(n, o, a) {
    Xt(r, o, t(n, o, a));
  }), r;
}
var Cd = dc(function(e, t, r) {
  Da(e, t, r);
});
const Gd = Cd;
var $d = 1 / 0, Dd = Ze && 1 / yn(new Ze([, -0]))[1] == $d ? function(e) {
  return new Ze(e);
} : Uu;
const Nd = Dd;
var Id = 200;
function Ld(e, t, r) {
  var n = -1, o = tc, a = e.length, i = !0, s = [], u = s;
  if (r)
    i = !1, o = Pd;
  else if (a >= Id) {
    var l = t ? null : Nd(e);
    if (l)
      return yn(l);
    i = !1, o = Ra, u = new pt();
  } else
    u = t ? [] : s;
  e:
    for (; ++n < a; ) {
      var c = e[n], d = t ? t(c) : c;
      if (c = r || c !== 0 ? c : 0, i && d === d) {
        for (var h = u.length; h--; )
          if (u[h] === d)
            continue e;
        t && u.push(d), s.push(c);
      } else
        o(u, d, r) || (u !== s && u.push(d), s.push(c));
    }
  return s;
}
function jd(e, t) {
  return e && e.length ? Ld(e, Ga(t)) : [];
}
var kr = /* @__PURE__ */ ((e) => (e.Json = "application/json", e.UrlEncoded = "application/x-www-form-urlencoded", e))(kr || {});
class Ud {
  constructor() {
    ae(this, "listeners");
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
      const a = (n = this.listeners[t]) == null ? void 0 : n.findIndex((i) => i === r);
      a && a > -1 && ((o = this.listeners[t]) == null || o.splice(a, 1));
    } else
      throw new Error(`${this} is doesn't have event "${String(t)}"`);
  }
}
function Po(e) {
  for (const t in e)
    Object.prototype.hasOwnProperty.call(e, t) && e[t] === void 0 && delete e[t];
  return e;
}
function Jp(e) {
  for (const t in e)
    Object.prototype.hasOwnProperty.call(e, t) && delete e[t];
  return e;
}
function Yp(e) {
  for (const t in e)
    Object.prototype.hasOwnProperty.call(e, t) && (e[t] = void 0);
  return e;
}
const Zp = /(^[0-9]{9,16}$)\b/g, Xp = /^[a-z0-9\-\d@._]+$/, Qp = /^(?=.*[a-z])(?=.*?[A-Z])(?=.*[@$!%*#?&])[a-zA-Z@$!%*#?&\d]{8,32}$/g;
function em(e) {
  return !/[^\x00-\x7F]/.test(e);
}
const tm = /^[0-9a-fA-F]{24}$/, rm = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, Br = (e, t = "", r = new FormData()) => (Object.keys(e).forEach((n) => {
  const o = t !== "" ? t + "." + n : n, a = e[n];
  Array.isArray(a) ? a.forEach((i, s) => {
    typeof i == "object" ? i instanceof File ? r.append(o, i) : r = Br(i, o + `[${s}]`, r) : r.append(o, i);
  }) : typeof a == "object" ? a instanceof File ? r.append(o, a) : r = Br(a, o, r) : r.append(o, a);
}), r), Ft = (e, t = "", r = new URLSearchParams()) => (Object.keys(e).forEach((n) => {
  const o = t !== "" ? t + "." + n : n, a = e[n];
  Array.isArray(a) ? a.forEach((i, s) => {
    typeof i == "object" ? r = Ft(i, o + `[${s}]`, r) : r.append(o, i);
  }) : typeof a == "object" ? r = Ft(a, o, r) : r.append(o, a);
}), r);
class kd {
  constructor() {
    ae(this, "modeEnv");
    ae(this, "subdomain");
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
const Fr = new kd();
class Na {
  getToken(t) {
    if (this.getPrefix())
      return localStorage.getItem(`${this.getPrefix()}_${t}`) || "";
  }
  setToken(t, r) {
    if (this.getPrefix())
      return localStorage.setItem(`${this.getPrefix()}_${t}`, r);
  }
  getPrefix() {
    const t = Fr.getConfig().modEnv, r = Fr.getConfig().subdomain;
    return !t || !r ? "" : `${t}_${r}`;
  }
}
const Xe = new Na(), Mt = new Na();
function nm(e, t) {
  return new Proxy(e, {
    set(r, n, o) {
      return r[n] = o, t(r), !0;
    }
  });
}
function Hr(e) {
  this.message = e;
}
Hr.prototype = new Error(), Hr.prototype.name = "InvalidCharacterError";
var xo = typeof window < "u" && window.atob && window.atob.bind(window) || function(e) {
  var t = String(e).replace(/=+$/, "");
  if (t.length % 4 == 1)
    throw new Hr("'atob' failed: The string to be decoded is not correctly encoded.");
  for (var r, n, o = 0, a = 0, i = ""; n = t.charAt(a++); ~n && (r = o % 4 ? 64 * r + n : n, o++ % 4) ? i += String.fromCharCode(255 & r >> (-2 * o & 6)) : 0)
    n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(n);
  return i;
};
function Bd(e) {
  var t = e.replace(/-/g, "+").replace(/_/g, "/");
  switch (t.length % 4) {
    case 0:
      break;
    case 2:
      t += "==";
      break;
    case 3:
      t += "=";
      break;
    default:
      throw "Illegal base64url string!";
  }
  try {
    return function(r) {
      return decodeURIComponent(xo(r).replace(/(.)/g, function(n, o) {
        var a = o.charCodeAt(0).toString(16).toUpperCase();
        return a.length < 2 && (a = "0" + a), "%" + a;
      }));
    }(t);
  } catch {
    return xo(t);
  }
}
function Ht(e) {
  this.message = e;
}
function Ia(e, t) {
  if (typeof e != "string")
    throw new Ht("Invalid token specified");
  var r = (t = t || {}).header === !0 ? 0 : 1;
  try {
    return JSON.parse(Bd(e.split(".")[r]));
  } catch (n) {
    throw new Ht("Invalid token specified: " + n.message);
  }
}
Ht.prototype = new Error(), Ht.prototype.name = "InvalidTokenError";
function om() {
  const e = Xe.getToken("base_token");
  return e ? Ia(e).role : "";
}
function am() {
  const e = Xe.getToken("base_token");
  return e ? Ia(e) : null;
}
function Co(e) {
  let t = "";
  const r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n = r.length;
  for (let o = 0; o < e; o++)
    t += r.charAt(Math.floor(Math.random() * n));
  return t;
}
function La(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: ja } = Object.prototype, { getPrototypeOf: En } = Object, Tn = ((e) => (t) => {
  const r = ja.call(t);
  return e[r] || (e[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), Ce = (e) => (e = e.toLowerCase(), (t) => Tn(t) === e), nr = (e) => (t) => typeof t === e, { isArray: at } = Array, mt = nr("undefined");
function Fd(e) {
  return e !== null && !mt(e) && e.constructor !== null && !mt(e.constructor) && He(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Ua = Ce("ArrayBuffer");
function Hd(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Ua(e.buffer), t;
}
const Vd = nr("string"), He = nr("function"), ka = nr("number"), wn = (e) => e !== null && typeof e == "object", Wd = (e) => e === !0 || e === !1, Ct = (e) => {
  if (Tn(e) !== "object")
    return !1;
  const t = En(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, Kd = Ce("Date"), zd = Ce("File"), qd = Ce("Blob"), Jd = Ce("FileList"), Yd = (e) => wn(e) && He(e.pipe), Zd = (e) => {
  const t = "[object FormData]";
  return e && (typeof FormData == "function" && e instanceof FormData || ja.call(e) === t || He(e.toString) && e.toString() === t);
}, Xd = Ce("URLSearchParams"), Qd = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Tt(e, t, { allOwnKeys: r = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let n, o;
  if (typeof e != "object" && (e = [e]), at(e))
    for (n = 0, o = e.length; n < o; n++)
      t.call(null, e[n], n, e);
  else {
    const a = r ? Object.getOwnPropertyNames(e) : Object.keys(e), i = a.length;
    let s;
    for (n = 0; n < i; n++)
      s = a[n], t.call(null, e[s], s, e);
  }
}
function Ba(e, t) {
  t = t.toLowerCase();
  const r = Object.keys(e);
  let n = r.length, o;
  for (; n-- > 0; )
    if (o = r[n], t === o.toLowerCase())
      return o;
  return null;
}
const Fa = typeof self > "u" ? typeof global > "u" ? globalThis : global : self, Ha = (e) => !mt(e) && e !== Fa;
function Vr() {
  const { caseless: e } = Ha(this) && this || {}, t = {}, r = (n, o) => {
    const a = e && Ba(t, o) || o;
    Ct(t[a]) && Ct(n) ? t[a] = Vr(t[a], n) : Ct(n) ? t[a] = Vr({}, n) : at(n) ? t[a] = n.slice() : t[a] = n;
  };
  for (let n = 0, o = arguments.length; n < o; n++)
    arguments[n] && Tt(arguments[n], r);
  return t;
}
const eh = (e, t, r, { allOwnKeys: n } = {}) => (Tt(t, (o, a) => {
  r && He(o) ? e[a] = La(o, r) : e[a] = o;
}, { allOwnKeys: n }), e), th = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), rh = (e, t, r, n) => {
  e.prototype = Object.create(t.prototype, n), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), r && Object.assign(e.prototype, r);
}, nh = (e, t, r, n) => {
  let o, a, i;
  const s = {};
  if (t = t || {}, e == null)
    return t;
  do {
    for (o = Object.getOwnPropertyNames(e), a = o.length; a-- > 0; )
      i = o[a], (!n || n(i, e, t)) && !s[i] && (t[i] = e[i], s[i] = !0);
    e = r !== !1 && En(e);
  } while (e && (!r || r(e, t)) && e !== Object.prototype);
  return t;
}, oh = (e, t, r) => {
  e = String(e), (r === void 0 || r > e.length) && (r = e.length), r -= t.length;
  const n = e.indexOf(t, r);
  return n !== -1 && n === r;
}, ah = (e) => {
  if (!e)
    return null;
  if (at(e))
    return e;
  let t = e.length;
  if (!ka(t))
    return null;
  const r = new Array(t);
  for (; t-- > 0; )
    r[t] = e[t];
  return r;
}, ih = ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && En(Uint8Array)), sh = (e, t) => {
  const n = (e && e[Symbol.iterator]).call(e);
  let o;
  for (; (o = n.next()) && !o.done; ) {
    const a = o.value;
    t.call(e, a[0], a[1]);
  }
}, uh = (e, t) => {
  let r;
  const n = [];
  for (; (r = e.exec(t)) !== null; )
    n.push(r);
  return n;
}, ch = Ce("HTMLFormElement"), lh = (e) => e.toLowerCase().replace(
  /[_-\s]([a-z\d])(\w*)/g,
  function(r, n, o) {
    return n.toUpperCase() + o;
  }
), Go = (({ hasOwnProperty: e }) => (t, r) => e.call(t, r))(Object.prototype), fh = Ce("RegExp"), Va = (e, t) => {
  const r = Object.getOwnPropertyDescriptors(e), n = {};
  Tt(r, (o, a) => {
    t(o, a, e) !== !1 && (n[a] = o);
  }), Object.defineProperties(e, n);
}, dh = (e) => {
  Va(e, (t, r) => {
    if (He(e) && ["arguments", "caller", "callee"].indexOf(r) !== -1)
      return !1;
    const n = e[r];
    if (He(n)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + r + "'");
      });
    }
  });
}, hh = (e, t) => {
  const r = {}, n = (o) => {
    o.forEach((a) => {
      r[a] = !0;
    });
  };
  return at(e) ? n(e) : n(String(e).split(t)), r;
}, ph = () => {
}, mh = (e, t) => (e = +e, Number.isFinite(e) ? e : t), gh = (e) => {
  const t = new Array(10), r = (n, o) => {
    if (wn(n)) {
      if (t.indexOf(n) >= 0)
        return;
      if (!("toJSON" in n)) {
        t[o] = n;
        const a = at(n) ? [] : {};
        return Tt(n, (i, s) => {
          const u = r(i, o + 1);
          !mt(u) && (a[s] = u);
        }), t[o] = void 0, a;
      }
    }
    return n;
  };
  return r(e, 0);
}, v = {
  isArray: at,
  isArrayBuffer: Ua,
  isBuffer: Fd,
  isFormData: Zd,
  isArrayBufferView: Hd,
  isString: Vd,
  isNumber: ka,
  isBoolean: Wd,
  isObject: wn,
  isPlainObject: Ct,
  isUndefined: mt,
  isDate: Kd,
  isFile: zd,
  isBlob: qd,
  isRegExp: fh,
  isFunction: He,
  isStream: Yd,
  isURLSearchParams: Xd,
  isTypedArray: ih,
  isFileList: Jd,
  forEach: Tt,
  merge: Vr,
  extend: eh,
  trim: Qd,
  stripBOM: th,
  inherits: rh,
  toFlatObject: nh,
  kindOf: Tn,
  kindOfTest: Ce,
  endsWith: oh,
  toArray: ah,
  forEachEntry: sh,
  matchAll: uh,
  isHTMLForm: ch,
  hasOwnProperty: Go,
  hasOwnProp: Go,
  reduceDescriptors: Va,
  freezeMethods: dh,
  toObjectSet: hh,
  toCamelCase: lh,
  noop: ph,
  toFiniteNumber: mh,
  findKey: Ba,
  global: Fa,
  isContextDefined: Ha,
  toJSONObject: gh
};
function F(e, t, r, n, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), r && (this.config = r), n && (this.request = n), o && (this.response = o);
}
v.inherits(F, Error, {
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
      config: v.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const Wa = F.prototype, Ka = {};
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
  Ka[e] = { value: e };
});
Object.defineProperties(F, Ka);
Object.defineProperty(Wa, "isAxiosError", { value: !0 });
F.from = (e, t, r, n, o, a) => {
  const i = Object.create(Wa);
  return v.toFlatObject(e, i, function(u) {
    return u !== Error.prototype;
  }, (s) => s !== "isAxiosError"), F.call(i, e.message, t, r, n, o), i.cause = e, i.name = e.name, a && Object.assign(i, a), i;
};
var vh = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, yh = typeof self == "object" ? self.FormData : window.FormData;
const bh = yh;
function Wr(e) {
  return v.isPlainObject(e) || v.isArray(e);
}
function za(e) {
  return v.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function $o(e, t, r) {
  return e ? e.concat(t).map(function(o, a) {
    return o = za(o), !r && a ? "[" + o + "]" : o;
  }).join(r ? "." : "") : t;
}
function Eh(e) {
  return v.isArray(e) && !e.some(Wr);
}
const Th = v.toFlatObject(v, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function wh(e) {
  return e && v.isFunction(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator];
}
function or(e, t, r) {
  if (!v.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new (bh || FormData)(), r = v.toFlatObject(r, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(p, M) {
    return !v.isUndefined(M[p]);
  });
  const n = r.metaTokens, o = r.visitor || c, a = r.dots, i = r.indexes, u = (r.Blob || typeof Blob < "u" && Blob) && wh(t);
  if (!v.isFunction(o))
    throw new TypeError("visitor must be a function");
  function l(g) {
    if (g === null)
      return "";
    if (v.isDate(g))
      return g.toISOString();
    if (!u && v.isBlob(g))
      throw new F("Blob is not supported. Use a Buffer instead.");
    return v.isArrayBuffer(g) || v.isTypedArray(g) ? u && typeof Blob == "function" ? new Blob([g]) : Buffer.from(g) : g;
  }
  function c(g, p, M) {
    let w = g;
    if (g && !M && typeof g == "object") {
      if (v.endsWith(p, "{}"))
        p = n ? p : p.slice(0, -2), g = JSON.stringify(g);
      else if (v.isArray(g) && Eh(g) || v.isFileList(g) || v.endsWith(p, "[]") && (w = v.toArray(g)))
        return p = za(p), w.forEach(function(A, O) {
          !(v.isUndefined(A) || A === null) && t.append(
            i === !0 ? $o([p], O, a) : i === null ? p : p + "[]",
            l(A)
          );
        }), !1;
    }
    return Wr(g) ? !0 : (t.append($o(M, p, a), l(g)), !1);
  }
  const d = [], h = Object.assign(Th, {
    defaultVisitor: c,
    convertValue: l,
    isVisitable: Wr
  });
  function m(g, p) {
    if (!v.isUndefined(g)) {
      if (d.indexOf(g) !== -1)
        throw Error("Circular reference detected in " + p.join("."));
      d.push(g), v.forEach(g, function(w, I) {
        (!(v.isUndefined(w) || w === null) && o.call(
          t,
          w,
          v.isString(I) ? I.trim() : I,
          p,
          h
        )) === !0 && m(w, p ? p.concat(I) : [I]);
      }), d.pop();
    }
  }
  if (!v.isObject(e))
    throw new TypeError("data must be an object");
  return m(e), t;
}
function Do(e) {
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
function Sn(e, t) {
  this._pairs = [], e && or(e, this, t);
}
const qa = Sn.prototype;
qa.append = function(t, r) {
  this._pairs.push([t, r]);
};
qa.toString = function(t) {
  const r = t ? function(n) {
    return t.call(this, n, Do);
  } : Do;
  return this._pairs.map(function(o) {
    return r(o[0]) + "=" + r(o[1]);
  }, "").join("&");
};
function Sh(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Ja(e, t, r) {
  if (!t)
    return e;
  const n = r && r.encode || Sh, o = r && r.serialize;
  let a;
  if (o ? a = o(t, r) : a = v.isURLSearchParams(t) ? t.toString() : new Sn(t, r).toString(n), a) {
    const i = e.indexOf("#");
    i !== -1 && (e = e.slice(0, i)), e += (e.indexOf("?") === -1 ? "?" : "&") + a;
  }
  return e;
}
class _h {
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
    v.forEach(this.handlers, function(n) {
      n !== null && t(n);
    });
  }
}
const No = _h, Ya = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Ah = typeof URLSearchParams < "u" ? URLSearchParams : Sn, Oh = FormData, Mh = (() => {
  let e;
  return typeof navigator < "u" && ((e = navigator.product) === "ReactNative" || e === "NativeScript" || e === "NS") ? !1 : typeof window < "u" && typeof document < "u";
})(), Rh = (() => typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), ye = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Ah,
    FormData: Oh,
    Blob
  },
  isStandardBrowserEnv: Mh,
  isStandardBrowserWebWorkerEnv: Rh,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function Ph(e, t) {
  return or(e, new ye.classes.URLSearchParams(), Object.assign({
    visitor: function(r, n, o, a) {
      return ye.isNode && v.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : a.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function xh(e) {
  return v.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function Ch(e) {
  const t = {}, r = Object.keys(e);
  let n;
  const o = r.length;
  let a;
  for (n = 0; n < o; n++)
    a = r[n], t[a] = e[a];
  return t;
}
function Za(e) {
  function t(r, n, o, a) {
    let i = r[a++];
    const s = Number.isFinite(+i), u = a >= r.length;
    return i = !i && v.isArray(o) ? o.length : i, u ? (v.hasOwnProp(o, i) ? o[i] = [o[i], n] : o[i] = n, !s) : ((!o[i] || !v.isObject(o[i])) && (o[i] = []), t(r, n, o[i], a) && v.isArray(o[i]) && (o[i] = Ch(o[i])), !s);
  }
  if (v.isFormData(e) && v.isFunction(e.entries)) {
    const r = {};
    return v.forEachEntry(e, (n, o) => {
      t(xh(n), o, r, 0);
    }), r;
  }
  return null;
}
const Gh = {
  "Content-Type": void 0
};
function $h(e, t, r) {
  if (v.isString(e))
    try {
      return (t || JSON.parse)(e), v.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (r || JSON.stringify)(e);
}
const ar = {
  transitional: Ya,
  adapter: ["xhr", "http"],
  transformRequest: [function(t, r) {
    const n = r.getContentType() || "", o = n.indexOf("application/json") > -1, a = v.isObject(t);
    if (a && v.isHTMLForm(t) && (t = new FormData(t)), v.isFormData(t))
      return o && o ? JSON.stringify(Za(t)) : t;
    if (v.isArrayBuffer(t) || v.isBuffer(t) || v.isStream(t) || v.isFile(t) || v.isBlob(t))
      return t;
    if (v.isArrayBufferView(t))
      return t.buffer;
    if (v.isURLSearchParams(t))
      return r.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let s;
    if (a) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return Ph(t, this.formSerializer).toString();
      if ((s = v.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
        const u = this.env && this.env.FormData;
        return or(
          s ? { "files[]": t } : t,
          u && new u(),
          this.formSerializer
        );
      }
    }
    return a || o ? (r.setContentType("application/json", !1), $h(t)) : t;
  }],
  transformResponse: [function(t) {
    const r = this.transitional || ar.transitional, n = r && r.forcedJSONParsing, o = this.responseType === "json";
    if (t && v.isString(t) && (n && !this.responseType || o)) {
      const i = !(r && r.silentJSONParsing) && o;
      try {
        return JSON.parse(t);
      } catch (s) {
        if (i)
          throw s.name === "SyntaxError" ? F.from(s, F.ERR_BAD_RESPONSE, this, null, this.response) : s;
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
    FormData: ye.classes.FormData,
    Blob: ye.classes.Blob
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
v.forEach(["delete", "get", "head"], function(t) {
  ar.headers[t] = {};
});
v.forEach(["post", "put", "patch"], function(t) {
  ar.headers[t] = v.merge(Gh);
});
const _n = ar, Dh = v.toObjectSet([
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
]), Nh = (e) => {
  const t = {};
  let r, n, o;
  return e && e.split(`
`).forEach(function(i) {
    o = i.indexOf(":"), r = i.substring(0, o).trim().toLowerCase(), n = i.substring(o + 1).trim(), !(!r || t[r] && Dh[r]) && (r === "set-cookie" ? t[r] ? t[r].push(n) : t[r] = [n] : t[r] = t[r] ? t[r] + ", " + n : n);
  }), t;
}, Io = Symbol("internals");
function ct(e) {
  return e && String(e).trim().toLowerCase();
}
function Gt(e) {
  return e === !1 || e == null ? e : v.isArray(e) ? e.map(Gt) : String(e);
}
function Ih(e) {
  const t = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(e); )
    t[n[1]] = n[2];
  return t;
}
function Lh(e) {
  return /^[-_a-zA-Z]+$/.test(e.trim());
}
function Lo(e, t, r, n) {
  if (v.isFunction(n))
    return n.call(this, t, r);
  if (v.isString(t)) {
    if (v.isString(n))
      return t.indexOf(n) !== -1;
    if (v.isRegExp(n))
      return n.test(t);
  }
}
function jh(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, r, n) => r.toUpperCase() + n);
}
function Uh(e, t) {
  const r = v.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(e, n + r, {
      value: function(o, a, i) {
        return this[n].call(this, t, o, a, i);
      },
      configurable: !0
    });
  });
}
let ir = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, r, n) {
    const o = this;
    function a(s, u, l) {
      const c = ct(u);
      if (!c)
        throw new Error("header name must be a non-empty string");
      const d = v.findKey(o, c);
      (!d || o[d] === void 0 || l === !0 || l === void 0 && o[d] !== !1) && (o[d || u] = Gt(s));
    }
    const i = (s, u) => v.forEach(s, (l, c) => a(l, c, u));
    return v.isPlainObject(t) || t instanceof this.constructor ? i(t, r) : v.isString(t) && (t = t.trim()) && !Lh(t) ? i(Nh(t), r) : t != null && a(r, t, n), this;
  }
  get(t, r) {
    if (t = ct(t), t) {
      const n = v.findKey(this, t);
      if (n) {
        const o = this[n];
        if (!r)
          return o;
        if (r === !0)
          return Ih(o);
        if (v.isFunction(r))
          return r.call(this, o, n);
        if (v.isRegExp(r))
          return r.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, r) {
    if (t = ct(t), t) {
      const n = v.findKey(this, t);
      return !!(n && (!r || Lo(this, this[n], n, r)));
    }
    return !1;
  }
  delete(t, r) {
    const n = this;
    let o = !1;
    function a(i) {
      if (i = ct(i), i) {
        const s = v.findKey(n, i);
        s && (!r || Lo(n, n[s], s, r)) && (delete n[s], o = !0);
      }
    }
    return v.isArray(t) ? t.forEach(a) : a(t), o;
  }
  clear() {
    return Object.keys(this).forEach(this.delete.bind(this));
  }
  normalize(t) {
    const r = this, n = {};
    return v.forEach(this, (o, a) => {
      const i = v.findKey(n, a);
      if (i) {
        r[i] = Gt(o), delete r[a];
        return;
      }
      const s = t ? jh(a) : String(a).trim();
      s !== a && delete r[a], r[s] = Gt(o), n[s] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const r = /* @__PURE__ */ Object.create(null);
    return v.forEach(this, (n, o) => {
      n != null && n !== !1 && (r[o] = t && v.isArray(n) ? n.join(", ") : n);
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
    const n = (this[Io] = this[Io] = {
      accessors: {}
    }).accessors, o = this.prototype;
    function a(i) {
      const s = ct(i);
      n[s] || (Uh(o, i), n[s] = !0);
    }
    return v.isArray(t) ? t.forEach(a) : a(t), this;
  }
};
ir.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent"]);
v.freezeMethods(ir.prototype);
v.freezeMethods(ir);
const Oe = ir;
function Tr(e, t) {
  const r = this || _n, n = t || r, o = Oe.from(n.headers);
  let a = n.data;
  return v.forEach(e, function(s) {
    a = s.call(r, a, o.normalize(), t ? t.status : void 0);
  }), o.normalize(), a;
}
function Xa(e) {
  return !!(e && e.__CANCEL__);
}
function wt(e, t, r) {
  F.call(this, e ?? "canceled", F.ERR_CANCELED, t, r), this.name = "CanceledError";
}
v.inherits(wt, F, {
  __CANCEL__: !0
});
const kh = null;
function Bh(e, t, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? e(r) : t(new F(
    "Request failed with status code " + r.status,
    [F.ERR_BAD_REQUEST, F.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
    r.config,
    r.request,
    r
  ));
}
const Fh = ye.isStandardBrowserEnv ? function() {
  return {
    write: function(r, n, o, a, i, s) {
      const u = [];
      u.push(r + "=" + encodeURIComponent(n)), v.isNumber(o) && u.push("expires=" + new Date(o).toGMTString()), v.isString(a) && u.push("path=" + a), v.isString(i) && u.push("domain=" + i), s === !0 && u.push("secure"), document.cookie = u.join("; ");
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
function Hh(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Vh(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Qa(e, t) {
  return e && !Hh(t) ? Vh(e, t) : t;
}
const Wh = ye.isStandardBrowserEnv ? function() {
  const t = /(msie|trident)/i.test(navigator.userAgent), r = document.createElement("a");
  let n;
  function o(a) {
    let i = a;
    return t && (r.setAttribute("href", i), i = r.href), r.setAttribute("href", i), {
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
  return n = o(window.location.href), function(i) {
    const s = v.isString(i) ? o(i) : i;
    return s.protocol === n.protocol && s.host === n.host;
  };
}() : function() {
  return function() {
    return !0;
  };
}();
function Kh(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function zh(e, t) {
  e = e || 10;
  const r = new Array(e), n = new Array(e);
  let o = 0, a = 0, i;
  return t = t !== void 0 ? t : 1e3, function(u) {
    const l = Date.now(), c = n[a];
    i || (i = l), r[o] = u, n[o] = l;
    let d = a, h = 0;
    for (; d !== o; )
      h += r[d++], d = d % e;
    if (o = (o + 1) % e, o === a && (a = (a + 1) % e), l - i < t)
      return;
    const m = c && l - c;
    return m ? Math.round(h * 1e3 / m) : void 0;
  };
}
function jo(e, t) {
  let r = 0;
  const n = zh(50, 250);
  return (o) => {
    const a = o.loaded, i = o.lengthComputable ? o.total : void 0, s = a - r, u = n(s), l = a <= i;
    r = a;
    const c = {
      loaded: a,
      total: i,
      progress: i ? a / i : void 0,
      bytes: s,
      rate: u || void 0,
      estimated: u && i && l ? (i - a) / u : void 0,
      event: o
    };
    c[t ? "download" : "upload"] = !0, e(c);
  };
}
const qh = typeof XMLHttpRequest < "u", Jh = qh && function(e) {
  return new Promise(function(r, n) {
    let o = e.data;
    const a = Oe.from(e.headers).normalize(), i = e.responseType;
    let s;
    function u() {
      e.cancelToken && e.cancelToken.unsubscribe(s), e.signal && e.signal.removeEventListener("abort", s);
    }
    v.isFormData(o) && (ye.isStandardBrowserEnv || ye.isStandardBrowserWebWorkerEnv) && a.setContentType(!1);
    let l = new XMLHttpRequest();
    if (e.auth) {
      const m = e.auth.username || "", g = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
      a.set("Authorization", "Basic " + btoa(m + ":" + g));
    }
    const c = Qa(e.baseURL, e.url);
    l.open(e.method.toUpperCase(), Ja(c, e.params, e.paramsSerializer), !0), l.timeout = e.timeout;
    function d() {
      if (!l)
        return;
      const m = Oe.from(
        "getAllResponseHeaders" in l && l.getAllResponseHeaders()
      ), p = {
        data: !i || i === "text" || i === "json" ? l.responseText : l.response,
        status: l.status,
        statusText: l.statusText,
        headers: m,
        config: e,
        request: l
      };
      Bh(function(w) {
        r(w), u();
      }, function(w) {
        n(w), u();
      }, p), l = null;
    }
    if ("onloadend" in l ? l.onloadend = d : l.onreadystatechange = function() {
      !l || l.readyState !== 4 || l.status === 0 && !(l.responseURL && l.responseURL.indexOf("file:") === 0) || setTimeout(d);
    }, l.onabort = function() {
      l && (n(new F("Request aborted", F.ECONNABORTED, e, l)), l = null);
    }, l.onerror = function() {
      n(new F("Network Error", F.ERR_NETWORK, e, l)), l = null;
    }, l.ontimeout = function() {
      let g = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
      const p = e.transitional || Ya;
      e.timeoutErrorMessage && (g = e.timeoutErrorMessage), n(new F(
        g,
        p.clarifyTimeoutError ? F.ETIMEDOUT : F.ECONNABORTED,
        e,
        l
      )), l = null;
    }, ye.isStandardBrowserEnv) {
      const m = (e.withCredentials || Wh(c)) && e.xsrfCookieName && Fh.read(e.xsrfCookieName);
      m && a.set(e.xsrfHeaderName, m);
    }
    o === void 0 && a.setContentType(null), "setRequestHeader" in l && v.forEach(a.toJSON(), function(g, p) {
      l.setRequestHeader(p, g);
    }), v.isUndefined(e.withCredentials) || (l.withCredentials = !!e.withCredentials), i && i !== "json" && (l.responseType = e.responseType), typeof e.onDownloadProgress == "function" && l.addEventListener("progress", jo(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && l.upload && l.upload.addEventListener("progress", jo(e.onUploadProgress)), (e.cancelToken || e.signal) && (s = (m) => {
      l && (n(!m || m.type ? new wt(null, e, l) : m), l.abort(), l = null);
    }, e.cancelToken && e.cancelToken.subscribe(s), e.signal && (e.signal.aborted ? s() : e.signal.addEventListener("abort", s)));
    const h = Kh(c);
    if (h && ye.protocols.indexOf(h) === -1) {
      n(new F("Unsupported protocol " + h + ":", F.ERR_BAD_REQUEST, e));
      return;
    }
    l.send(o || null);
  });
}, $t = {
  http: kh,
  xhr: Jh
};
v.forEach($t, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Yh = {
  getAdapter: (e) => {
    e = v.isArray(e) ? e : [e];
    const { length: t } = e;
    let r, n;
    for (let o = 0; o < t && (r = e[o], !(n = v.isString(r) ? $t[r.toLowerCase()] : r)); o++)
      ;
    if (!n)
      throw n === !1 ? new F(
        `Adapter ${r} is not supported by the environment`,
        "ERR_NOT_SUPPORT"
      ) : new Error(
        v.hasOwnProp($t, r) ? `Adapter '${r}' is not available in the build` : `Unknown adapter '${r}'`
      );
    if (!v.isFunction(n))
      throw new TypeError("adapter is not a function");
    return n;
  },
  adapters: $t
};
function wr(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new wt(null, e);
}
function Uo(e) {
  return wr(e), e.headers = Oe.from(e.headers), e.data = Tr.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), Yh.getAdapter(e.adapter || _n.adapter)(e).then(function(n) {
    return wr(e), n.data = Tr.call(
      e,
      e.transformResponse,
      n
    ), n.headers = Oe.from(n.headers), n;
  }, function(n) {
    return Xa(n) || (wr(e), n && n.response && (n.response.data = Tr.call(
      e,
      e.transformResponse,
      n.response
    ), n.response.headers = Oe.from(n.response.headers))), Promise.reject(n);
  });
}
const ko = (e) => e instanceof Oe ? e.toJSON() : e;
function tt(e, t) {
  t = t || {};
  const r = {};
  function n(l, c, d) {
    return v.isPlainObject(l) && v.isPlainObject(c) ? v.merge.call({ caseless: d }, l, c) : v.isPlainObject(c) ? v.merge({}, c) : v.isArray(c) ? c.slice() : c;
  }
  function o(l, c, d) {
    if (v.isUndefined(c)) {
      if (!v.isUndefined(l))
        return n(void 0, l, d);
    } else
      return n(l, c, d);
  }
  function a(l, c) {
    if (!v.isUndefined(c))
      return n(void 0, c);
  }
  function i(l, c) {
    if (v.isUndefined(c)) {
      if (!v.isUndefined(l))
        return n(void 0, l);
    } else
      return n(void 0, c);
  }
  function s(l, c, d) {
    if (d in t)
      return n(l, c);
    if (d in e)
      return n(void 0, l);
  }
  const u = {
    url: a,
    method: a,
    data: a,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: s,
    headers: (l, c) => o(ko(l), ko(c), !0)
  };
  return v.forEach(Object.keys(e).concat(Object.keys(t)), function(c) {
    const d = u[c] || o, h = d(e[c], t[c], c);
    v.isUndefined(h) && d !== s || (r[c] = h);
  }), r;
}
const ei = "1.2.1", An = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  An[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Bo = {};
An.transitional = function(t, r, n) {
  function o(a, i) {
    return "[Axios v" + ei + "] Transitional option '" + a + "'" + i + (n ? ". " + n : "");
  }
  return (a, i, s) => {
    if (t === !1)
      throw new F(
        o(i, " has been removed" + (r ? " in " + r : "")),
        F.ERR_DEPRECATED
      );
    return r && !Bo[i] && (Bo[i] = !0, console.warn(
      o(
        i,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), t ? t(a, i, s) : !0;
  };
};
function Zh(e, t, r) {
  if (typeof e != "object")
    throw new F("options must be an object", F.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(e);
  let o = n.length;
  for (; o-- > 0; ) {
    const a = n[o], i = t[a];
    if (i) {
      const s = e[a], u = s === void 0 || i(s, a, e);
      if (u !== !0)
        throw new F("option " + a + " must be " + u, F.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0)
      throw new F("Unknown option " + a, F.ERR_BAD_OPTION);
  }
}
const Kr = {
  assertOptions: Zh,
  validators: An
}, Ge = Kr.validators;
let Vt = class {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new No(),
      response: new No()
    };
  }
  request(t, r) {
    typeof t == "string" ? (r = r || {}, r.url = t) : r = t || {}, r = tt(this.defaults, r);
    const { transitional: n, paramsSerializer: o, headers: a } = r;
    n !== void 0 && Kr.assertOptions(n, {
      silentJSONParsing: Ge.transitional(Ge.boolean),
      forcedJSONParsing: Ge.transitional(Ge.boolean),
      clarifyTimeoutError: Ge.transitional(Ge.boolean)
    }, !1), o !== void 0 && Kr.assertOptions(o, {
      encode: Ge.function,
      serialize: Ge.function
    }, !0), r.method = (r.method || this.defaults.method || "get").toLowerCase();
    let i;
    i = a && v.merge(
      a.common,
      a[r.method]
    ), i && v.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (g) => {
        delete a[g];
      }
    ), r.headers = Oe.concat(i, a);
    const s = [];
    let u = !0;
    this.interceptors.request.forEach(function(p) {
      typeof p.runWhen == "function" && p.runWhen(r) === !1 || (u = u && p.synchronous, s.unshift(p.fulfilled, p.rejected));
    });
    const l = [];
    this.interceptors.response.forEach(function(p) {
      l.push(p.fulfilled, p.rejected);
    });
    let c, d = 0, h;
    if (!u) {
      const g = [Uo.bind(this), void 0];
      for (g.unshift.apply(g, s), g.push.apply(g, l), h = g.length, c = Promise.resolve(r); d < h; )
        c = c.then(g[d++], g[d++]);
      return c;
    }
    h = s.length;
    let m = r;
    for (d = 0; d < h; ) {
      const g = s[d++], p = s[d++];
      try {
        m = g(m);
      } catch (M) {
        p.call(this, M);
        break;
      }
    }
    try {
      c = Uo.call(this, m);
    } catch (g) {
      return Promise.reject(g);
    }
    for (d = 0, h = l.length; d < h; )
      c = c.then(l[d++], l[d++]);
    return c;
  }
  getUri(t) {
    t = tt(this.defaults, t);
    const r = Qa(t.baseURL, t.url);
    return Ja(r, t.params, t.paramsSerializer);
  }
};
v.forEach(["delete", "get", "head", "options"], function(t) {
  Vt.prototype[t] = function(r, n) {
    return this.request(tt(n || {}, {
      method: t,
      url: r,
      data: (n || {}).data
    }));
  };
});
v.forEach(["post", "put", "patch"], function(t) {
  function r(n) {
    return function(a, i, s) {
      return this.request(tt(s || {}, {
        method: t,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: a,
        data: i
      }));
    };
  }
  Vt.prototype[t] = r(), Vt.prototype[t + "Form"] = r(!0);
});
const Dt = Vt;
let ti = class {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let r;
    this.promise = new Promise(function(a) {
      r = a;
    });
    const n = this;
    this.promise.then((o) => {
      if (!n._listeners)
        return;
      let a = n._listeners.length;
      for (; a-- > 0; )
        n._listeners[a](o);
      n._listeners = null;
    }), this.promise.then = (o) => {
      let a;
      const i = new Promise((s) => {
        n.subscribe(s), a = s;
      }).then(o);
      return i.cancel = function() {
        n.unsubscribe(a);
      }, i;
    }, t(function(a, i, s) {
      n.reason || (n.reason = new wt(a, i, s), r(n.reason));
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
      token: new ti(function(o) {
        t = o;
      }),
      cancel: t
    };
  }
};
const Xh = ti;
function Qh(e) {
  return function(r) {
    return e.apply(null, r);
  };
}
function ep(e) {
  return v.isObject(e) && e.isAxiosError === !0;
}
function ri(e) {
  const t = new Dt(e), r = La(Dt.prototype.request, t);
  return v.extend(r, Dt.prototype, t, { allOwnKeys: !0 }), v.extend(r, t, null, { allOwnKeys: !0 }), r.create = function(o) {
    return ri(tt(e, o));
  }, r;
}
const oe = ri(_n);
oe.Axios = Dt;
oe.CanceledError = wt;
oe.CancelToken = Xh;
oe.isCancel = Xa;
oe.VERSION = ei;
oe.toFormData = or;
oe.AxiosError = F;
oe.Cancel = oe.CanceledError;
oe.all = function(t) {
  return Promise.all(t);
};
oe.spread = Qh;
oe.isAxiosError = ep;
oe.mergeConfig = tt;
oe.AxiosHeaders = Oe;
oe.formToJSON = (e) => Za(v.isHTMLForm(e) ? new FormData(e) : e);
oe.default = oe;
const ni = oe, {
  Axios: cm,
  AxiosError: tp,
  CanceledError: lm,
  isCancel: fm,
  CancelToken: dm,
  VERSION: hm,
  all: pm,
  Cancel: mm,
  isAxiosError: gm,
  spread: vm,
  toFormData: ym,
  AxiosHeaders: bm,
  formToJSON: Em,
  mergeConfig: Tm
} = ni;
var zr = function(e, t) {
  return zr = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
    r.__proto__ = n;
  } || function(r, n) {
    for (var o in n)
      Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
  }, zr(e, t);
};
function sr(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  zr(e, t);
  function r() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
}
function qr(e) {
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
function Wt(e, t) {
  var r = typeof Symbol == "function" && e[Symbol.iterator];
  if (!r)
    return e;
  var n = r.call(e), o, a = [], i;
  try {
    for (; (t === void 0 || t-- > 0) && !(o = n.next()).done; )
      a.push(o.value);
  } catch (s) {
    i = { error: s };
  } finally {
    try {
      o && !o.done && (r = n.return) && r.call(n);
    } finally {
      if (i)
        throw i.error;
    }
  }
  return a;
}
function Kt(e, t, r) {
  if (r || arguments.length === 2)
    for (var n = 0, o = t.length, a; n < o; n++)
      (a || !(n in t)) && (a || (a = Array.prototype.slice.call(t, 0, n)), a[n] = t[n]);
  return e.concat(a || Array.prototype.slice.call(t));
}
function Me(e) {
  return typeof e == "function";
}
function On(e) {
  var t = function(n) {
    Error.call(n), n.stack = new Error().stack;
  }, r = e(t);
  return r.prototype = Object.create(Error.prototype), r.prototype.constructor = r, r;
}
var Sr = On(function(e) {
  return function(r) {
    e(this), this.message = r ? r.length + ` errors occurred during unsubscription:
` + r.map(function(n, o) {
      return o + 1 + ") " + n.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = r;
  };
});
function Jr(e, t) {
  if (e) {
    var r = e.indexOf(t);
    0 <= r && e.splice(r, 1);
  }
}
var ur = function() {
  function e(t) {
    this.initialTeardown = t, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return e.prototype.unsubscribe = function() {
    var t, r, n, o, a;
    if (!this.closed) {
      this.closed = !0;
      var i = this._parentage;
      if (i)
        if (this._parentage = null, Array.isArray(i))
          try {
            for (var s = qr(i), u = s.next(); !u.done; u = s.next()) {
              var l = u.value;
              l.remove(this);
            }
          } catch (p) {
            t = { error: p };
          } finally {
            try {
              u && !u.done && (r = s.return) && r.call(s);
            } finally {
              if (t)
                throw t.error;
            }
          }
        else
          i.remove(this);
      var c = this.initialTeardown;
      if (Me(c))
        try {
          c();
        } catch (p) {
          a = p instanceof Sr ? p.errors : [p];
        }
      var d = this._finalizers;
      if (d) {
        this._finalizers = null;
        try {
          for (var h = qr(d), m = h.next(); !m.done; m = h.next()) {
            var g = m.value;
            try {
              Fo(g);
            } catch (p) {
              a = a ?? [], p instanceof Sr ? a = Kt(Kt([], Wt(a)), Wt(p.errors)) : a.push(p);
            }
          }
        } catch (p) {
          n = { error: p };
        } finally {
          try {
            m && !m.done && (o = h.return) && o.call(h);
          } finally {
            if (n)
              throw n.error;
          }
        }
      }
      if (a)
        throw new Sr(a);
    }
  }, e.prototype.add = function(t) {
    var r;
    if (t && t !== this)
      if (this.closed)
        Fo(t);
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
    r === t ? this._parentage = null : Array.isArray(r) && Jr(r, t);
  }, e.prototype.remove = function(t) {
    var r = this._finalizers;
    r && Jr(r, t), t instanceof e && t._removeParent(this);
  }, e.EMPTY = function() {
    var t = new e();
    return t.closed = !0, t;
  }(), e;
}(), oi = ur.EMPTY;
function ai(e) {
  return e instanceof ur || e && "closed" in e && Me(e.remove) && Me(e.add) && Me(e.unsubscribe);
}
function Fo(e) {
  Me(e) ? e() : e.unsubscribe();
}
var Mn = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1
}, Yr = {
  setTimeout: function(e, t) {
    for (var r = [], n = 2; n < arguments.length; n++)
      r[n - 2] = arguments[n];
    var o = Yr.delegate;
    return o != null && o.setTimeout ? o.setTimeout.apply(o, Kt([e, t], Wt(r))) : setTimeout.apply(void 0, Kt([e, t], Wt(r)));
  },
  clearTimeout: function(e) {
    var t = Yr.delegate;
    return ((t == null ? void 0 : t.clearTimeout) || clearTimeout)(e);
  },
  delegate: void 0
};
function rp(e) {
  Yr.setTimeout(function() {
    throw e;
  });
}
function Ho() {
}
var Rt = null;
function Nt(e) {
  if (Mn.useDeprecatedSynchronousErrorHandling) {
    var t = !Rt;
    if (t && (Rt = { errorThrown: !1, error: null }), e(), t) {
      var r = Rt, n = r.errorThrown, o = r.error;
      if (Rt = null, n)
        throw o;
    }
  } else
    e();
}
var ii = function(e) {
  sr(t, e);
  function t(r) {
    var n = e.call(this) || this;
    return n.isStopped = !1, r ? (n.destination = r, ai(r) && r.add(n)) : n.destination = ip, n;
  }
  return t.create = function(r, n, o) {
    return new Zr(r, n, o);
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
}(ur), np = Function.prototype.bind;
function _r(e, t) {
  return np.call(e, t);
}
var op = function() {
  function e(t) {
    this.partialObserver = t;
  }
  return e.prototype.next = function(t) {
    var r = this.partialObserver;
    if (r.next)
      try {
        r.next(t);
      } catch (n) {
        Pt(n);
      }
  }, e.prototype.error = function(t) {
    var r = this.partialObserver;
    if (r.error)
      try {
        r.error(t);
      } catch (n) {
        Pt(n);
      }
    else
      Pt(t);
  }, e.prototype.complete = function() {
    var t = this.partialObserver;
    if (t.complete)
      try {
        t.complete();
      } catch (r) {
        Pt(r);
      }
  }, e;
}(), Zr = function(e) {
  sr(t, e);
  function t(r, n, o) {
    var a = e.call(this) || this, i;
    if (Me(r) || !r)
      i = {
        next: r ?? void 0,
        error: n ?? void 0,
        complete: o ?? void 0
      };
    else {
      var s;
      a && Mn.useDeprecatedNextContext ? (s = Object.create(r), s.unsubscribe = function() {
        return a.unsubscribe();
      }, i = {
        next: r.next && _r(r.next, s),
        error: r.error && _r(r.error, s),
        complete: r.complete && _r(r.complete, s)
      }) : i = r;
    }
    return a.destination = new op(i), a;
  }
  return t;
}(ii);
function Pt(e) {
  rp(e);
}
function ap(e) {
  throw e;
}
var ip = {
  closed: !0,
  next: Ho,
  error: ap,
  complete: Ho
}, sp = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function up(e) {
  return e;
}
function cp(e) {
  return e.length === 0 ? up : e.length === 1 ? e[0] : function(r) {
    return e.reduce(function(n, o) {
      return o(n);
    }, r);
  };
}
var zt = function() {
  function e(t) {
    t && (this._subscribe = t);
  }
  return e.prototype.lift = function(t) {
    var r = new e();
    return r.source = this, r.operator = t, r;
  }, e.prototype.subscribe = function(t, r, n) {
    var o = this, a = fp(t) ? t : new Zr(t, r, n);
    return Nt(function() {
      var i = o, s = i.operator, u = i.source;
      a.add(s ? s.call(a, u) : u ? o._subscribe(a) : o._trySubscribe(a));
    }), a;
  }, e.prototype._trySubscribe = function(t) {
    try {
      return this._subscribe(t);
    } catch (r) {
      t.error(r);
    }
  }, e.prototype.forEach = function(t, r) {
    var n = this;
    return r = Vo(r), new r(function(o, a) {
      var i = new Zr({
        next: function(s) {
          try {
            t(s);
          } catch (u) {
            a(u), i.unsubscribe();
          }
        },
        error: a,
        complete: o
      });
      n.subscribe(i);
    });
  }, e.prototype._subscribe = function(t) {
    var r;
    return (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(t);
  }, e.prototype[sp] = function() {
    return this;
  }, e.prototype.pipe = function() {
    for (var t = [], r = 0; r < arguments.length; r++)
      t[r] = arguments[r];
    return cp(t)(this);
  }, e.prototype.toPromise = function(t) {
    var r = this;
    return t = Vo(t), new t(function(n, o) {
      var a;
      r.subscribe(function(i) {
        return a = i;
      }, function(i) {
        return o(i);
      }, function() {
        return n(a);
      });
    });
  }, e.create = function(t) {
    return new e(t);
  }, e;
}();
function Vo(e) {
  var t;
  return (t = e ?? Mn.Promise) !== null && t !== void 0 ? t : Promise;
}
function lp(e) {
  return e && Me(e.next) && Me(e.error) && Me(e.complete);
}
function fp(e) {
  return e && e instanceof ii || lp(e) && ai(e);
}
var dp = On(function(e) {
  return function() {
    e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), Xr = function(e) {
  sr(t, e);
  function t() {
    var r = e.call(this) || this;
    return r.closed = !1, r.currentObservers = null, r.observers = [], r.isStopped = !1, r.hasError = !1, r.thrownError = null, r;
  }
  return t.prototype.lift = function(r) {
    var n = new Wo(this, this);
    return n.operator = r, n;
  }, t.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new dp();
  }, t.prototype.next = function(r) {
    var n = this;
    Nt(function() {
      var o, a;
      if (n._throwIfClosed(), !n.isStopped) {
        n.currentObservers || (n.currentObservers = Array.from(n.observers));
        try {
          for (var i = qr(n.currentObservers), s = i.next(); !s.done; s = i.next()) {
            var u = s.value;
            u.next(r);
          }
        } catch (l) {
          o = { error: l };
        } finally {
          try {
            s && !s.done && (a = i.return) && a.call(i);
          } finally {
            if (o)
              throw o.error;
          }
        }
      }
    });
  }, t.prototype.error = function(r) {
    var n = this;
    Nt(function() {
      if (n._throwIfClosed(), !n.isStopped) {
        n.hasError = n.isStopped = !0, n.thrownError = r;
        for (var o = n.observers; o.length; )
          o.shift().error(r);
      }
    });
  }, t.prototype.complete = function() {
    var r = this;
    Nt(function() {
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
    var n = this, o = this, a = o.hasError, i = o.isStopped, s = o.observers;
    return a || i ? oi : (this.currentObservers = null, s.push(r), new ur(function() {
      n.currentObservers = null, Jr(s, r);
    }));
  }, t.prototype._checkFinalizedStatuses = function(r) {
    var n = this, o = n.hasError, a = n.thrownError, i = n.isStopped;
    o ? r.error(a) : i && r.complete();
  }, t.prototype.asObservable = function() {
    var r = new zt();
    return r.source = this, r;
  }, t.create = function(r, n) {
    return new Wo(r, n);
  }, t;
}(zt), Wo = function(e) {
  sr(t, e);
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
    return (o = (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(r)) !== null && o !== void 0 ? o : oi;
  }, t;
}(Xr), hp = On(function(e) {
  return function() {
    e(this), this.name = "EmptyError", this.message = "no elements in sequence";
  };
});
function Ar(e, t) {
  var r = typeof t == "object";
  return new Promise(function(n, o) {
    var a = !1, i;
    e.subscribe({
      next: function(s) {
        i = s, a = !0;
      },
      error: o,
      complete: function() {
        a ? n(i) : r ? n(t.defaultValue) : o(new hp());
      }
    });
  });
}
class Rn {
  constructor(t) {
    ae(this, "config");
    ae(this, "axios");
    t && (this.config = t), this.axios = ni.create(this.config);
  }
  get interceptors() {
    return this.axios.interceptors;
  }
  static create(t) {
    return new Rn(t);
  }
  request(t) {
    return new zt((r) => {
      const n = new AbortController();
      let o, a;
      return t.uploadProgressSubscriber && (o = (i) => {
        t.uploadProgressSubscriber && t.uploadProgressSubscriber.next(i);
      }), t.downloadProgressSubscriber && (a = (i) => {
        t.downloadProgressSubscriber && t.downloadProgressSubscriber.next(i);
      }), this.axios.request({
        ...t,
        onUploadProgress: o,
        onDownloadProgress: a,
        signal: n.signal
      }).then((i) => {
        r.next(i), r.complete(), t.uploadProgressSubscriber && t.uploadProgressSubscriber.complete(), t.downloadProgressSubscriber && t.downloadProgressSubscriber.complete();
      }).catch((i) => {
        r.error(i), t.uploadProgressSubscriber && t.uploadProgressSubscriber.error(i);
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
function pp(e) {
  return Rn.create({
    baseURL: e
  });
}
const te = class {
  constructor(t, r) {
    ae(this, "axiosInstance");
    ae(this, "defaultConfig", {
      contentType: "json",
      cache: !1
    });
    ae(this, "tokenType");
    this.axiosInstance = pp(t), this.setupInterceptor(), r && (this.defaultConfig = {
      ...this.defaultConfig,
      ...r
    });
  }
  static setAuthorizationTokenType(t) {
    te.tokenType = t;
  }
  static setGlobalParams(t) {
    te.globalParams = {
      ...te.globalParams,
      ...t
    };
  }
  static setGlobalData(t) {
    te.globalData = {
      ...te.globalData,
      ...t
    };
  }
  static setGlobalHeaders(t) {
    te.globalHeaders = {
      ...te.globalHeaders,
      ...t
    };
  }
  static addInterceptor(t) {
    return te.interceptors.add(t), () => {
      te.removeInterceptor(t);
    };
  }
  static removeInterceptor(t) {
    te.interceptors.delete(t);
  }
  setAuthorizationTokenType(t) {
    this.tokenType = t;
  }
  getTokenType(t) {
    return t.tokenType !== void 0 ? t.tokenType : this.tokenType !== void 0 ? this.tokenType : te.tokenType;
  }
  setupInterceptor() {
    this.axiosInstance.interceptors.request.use(
      async (t) => {
        if (t = await this.useRequestInterceptors(t), t = Gd({}, this.defaultConfig, t), t.headers = {
          ...t.headers,
          ...te.globalHeaders,
          "Content-Type": t.contentType === "formData" ? !1 : t.contentType === "urlEncoded" ? kr.UrlEncoded : kr.Json
        }, !t.preparedData) {
          if ((typeof t.cache < "u" ? t.cache : this.defaultConfig.cache) === !1 && (t.headers["Cache-Control"] = "no-cache", t.params = {
            ...t.params,
            axios_timestamp: Date.now()
          }), t.params = Ft(
            Po({
              ...t.params,
              ...te.globalParams
            })
          ), t.data = {
            ...t.data,
            ...te.globalData
          }, Po(t.data), JSON.stringify(t.data) === "{}")
            t.data = void 0;
          else
            switch (t.contentType) {
              case "formData":
                t.data = Br(t.data);
                break;
              case "urlEncoded":
                t.data = Ft(t.data);
            }
          t.preparedData = !0;
        }
        const r = this.getTokenType(t), n = r ? Xe.getToken(r) : null;
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
    for (const r of te.interceptors)
      r.request && (t = await r.request(t));
    return t;
  }
  async useErrorResponseInterceptor(t) {
    for (const r of te.interceptors)
      if (r.response && r.response.error)
        try {
          t = await r.response.error(t, this.axiosInstance);
        } catch {
          return t;
        }
    return t;
  }
  async useSuccessResponseInterceptor(t) {
    for (const r of te.interceptors)
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
let ve = te;
ae(ve, "tokenType", "base_token"), ae(ve, "globalParams", {}), ae(ve, "globalData", {}), ae(ve, "globalHeaders", {}), ae(ve, "interceptors", /* @__PURE__ */ new Set());
var gt = {}, mp = {
  get exports() {
    return gt;
  },
  set exports(e) {
    gt = e;
  }
}, Ye = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Or, Ko;
function si() {
  if (Ko)
    return Or;
  Ko = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, r = Object.prototype.propertyIsEnumerable;
  function n(a) {
    if (a == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(a);
  }
  function o() {
    try {
      if (!Object.assign)
        return !1;
      var a = new String("abc");
      if (a[5] = "de", Object.getOwnPropertyNames(a)[0] === "5")
        return !1;
      for (var i = {}, s = 0; s < 10; s++)
        i["_" + String.fromCharCode(s)] = s;
      var u = Object.getOwnPropertyNames(i).map(function(c) {
        return i[c];
      });
      if (u.join("") !== "0123456789")
        return !1;
      var l = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(c) {
        l[c] = c;
      }), Object.keys(Object.assign({}, l)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Or = o() ? Object.assign : function(a, i) {
    for (var s, u = n(a), l, c = 1; c < arguments.length; c++) {
      s = Object(arguments[c]);
      for (var d in s)
        t.call(s, d) && (u[d] = s[d]);
      if (e) {
        l = e(s);
        for (var h = 0; h < l.length; h++)
          r.call(s, l[h]) && (u[l[h]] = s[l[h]]);
      }
    }
    return u;
  }, Or;
}
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zo;
function gp() {
  if (zo)
    return Ye;
  zo = 1, si();
  var e = vt, t = 60103;
  if (Ye.Fragment = 60107, typeof Symbol == "function" && Symbol.for) {
    var r = Symbol.for;
    t = r("react.element"), Ye.Fragment = r("react.fragment");
  }
  var n = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = Object.prototype.hasOwnProperty, a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function i(s, u, l) {
    var c, d = {}, h = null, m = null;
    l !== void 0 && (h = "" + l), u.key !== void 0 && (h = "" + u.key), u.ref !== void 0 && (m = u.ref);
    for (c in u)
      o.call(u, c) && !a.hasOwnProperty(c) && (d[c] = u[c]);
    if (s && s.defaultProps)
      for (c in u = s.defaultProps, u)
        d[c] === void 0 && (d[c] = u[c]);
    return { $$typeof: t, type: s, key: h, ref: m, props: d, _owner: n.current };
  }
  return Ye.jsx = i, Ye.jsxs = i, Ye;
}
var Mr = {};
/** @license React v17.0.2
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qo;
function vp() {
  return qo || (qo = 1, function(e) {
    process.env.NODE_ENV !== "production" && function() {
      var t = vt, r = si(), n = 60103, o = 60106;
      e.Fragment = 60107;
      var a = 60108, i = 60114, s = 60109, u = 60110, l = 60112, c = 60113, d = 60120, h = 60115, m = 60116, g = 60121, p = 60122, M = 60117, w = 60129, I = 60131;
      if (typeof Symbol == "function" && Symbol.for) {
        var A = Symbol.for;
        n = A("react.element"), o = A("react.portal"), e.Fragment = A("react.fragment"), a = A("react.strict_mode"), i = A("react.profiler"), s = A("react.provider"), u = A("react.context"), l = A("react.forward_ref"), c = A("react.suspense"), d = A("react.suspense_list"), h = A("react.memo"), m = A("react.lazy"), g = A("react.block"), p = A("react.server.block"), M = A("react.fundamental"), A("react.scope"), A("react.opaque.id"), w = A("react.debug_trace_mode"), A("react.offscreen"), I = A("react.legacy_hidden");
      }
      var O = typeof Symbol == "function" && Symbol.iterator, N = "@@iterator";
      function R(f) {
        if (f === null || typeof f != "object")
          return null;
        var y = O && f[O] || f[N];
        return typeof y == "function" ? y : null;
      }
      var V = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function k(f) {
        {
          for (var y = arguments.length, S = new Array(y > 1 ? y - 1 : 0), P = 1; P < y; P++)
            S[P - 1] = arguments[P];
          L("error", f, S);
        }
      }
      function L(f, y, S) {
        {
          var P = V.ReactDebugCurrentFrame, W = P.getStackAddendum();
          W !== "" && (y += "%s", S = S.concat([W]));
          var K = S.map(function(B) {
            return "" + B;
          });
          K.unshift("Warning: " + y), Function.prototype.apply.call(console[f], console, K);
        }
      }
      var j = !1;
      function ie(f) {
        return !!(typeof f == "string" || typeof f == "function" || f === e.Fragment || f === i || f === w || f === a || f === c || f === d || f === I || j || typeof f == "object" && f !== null && (f.$$typeof === m || f.$$typeof === h || f.$$typeof === s || f.$$typeof === u || f.$$typeof === l || f.$$typeof === M || f.$$typeof === g || f[0] === p));
      }
      function St(f, y, S) {
        var P = y.displayName || y.name || "";
        return f.displayName || (P !== "" ? S + "(" + P + ")" : S);
      }
      function x(f) {
        return f.displayName || "Context";
      }
      function T(f) {
        if (f == null)
          return null;
        if (typeof f.tag == "number" && k("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue."), typeof f == "function")
          return f.displayName || f.name || null;
        if (typeof f == "string")
          return f;
        switch (f) {
          case e.Fragment:
            return "Fragment";
          case o:
            return "Portal";
          case i:
            return "Profiler";
          case a:
            return "StrictMode";
          case c:
            return "Suspense";
          case d:
            return "SuspenseList";
        }
        if (typeof f == "object")
          switch (f.$$typeof) {
            case u:
              var y = f;
              return x(y) + ".Consumer";
            case s:
              var S = f;
              return x(S._context) + ".Provider";
            case l:
              return St(f, f.render, "ForwardRef");
            case h:
              return T(f.type);
            case g:
              return T(f._render);
            case m: {
              var P = f, W = P._payload, K = P._init;
              try {
                return T(K(W));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var E = 0, C, _, D, G, H, J, z;
      function ee() {
      }
      ee.__reactDisabledLog = !0;
      function ge() {
        {
          if (E === 0) {
            C = console.log, _ = console.info, D = console.warn, G = console.error, H = console.group, J = console.groupCollapsed, z = console.groupEnd;
            var f = {
              configurable: !0,
              enumerable: !0,
              value: ee,
              writable: !0
            };
            Object.defineProperties(console, {
              info: f,
              log: f,
              warn: f,
              error: f,
              group: f,
              groupCollapsed: f,
              groupEnd: f
            });
          }
          E++;
        }
      }
      function le() {
        {
          if (E--, E === 0) {
            var f = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: r({}, f, {
                value: C
              }),
              info: r({}, f, {
                value: _
              }),
              warn: r({}, f, {
                value: D
              }),
              error: r({}, f, {
                value: G
              }),
              group: r({}, f, {
                value: H
              }),
              groupCollapsed: r({}, f, {
                value: J
              }),
              groupEnd: r({}, f, {
                value: z
              })
            });
          }
          E < 0 && k("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var Te = V.ReactCurrentDispatcher, we;
      function fe(f, y, S) {
        {
          if (we === void 0)
            try {
              throw Error();
            } catch (W) {
              var P = W.stack.trim().match(/\n( *(at )?)/);
              we = P && P[1] || "";
            }
          return `
` + we + f;
        }
      }
      var ne = !1, ue;
      {
        var it = typeof WeakMap == "function" ? WeakMap : Map;
        ue = new it();
      }
      function Le(f, y) {
        if (!f || ne)
          return "";
        {
          var S = ue.get(f);
          if (S !== void 0)
            return S;
        }
        var P;
        ne = !0;
        var W = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var K;
        K = Te.current, Te.current = null, ge();
        try {
          if (y) {
            var B = function() {
              throw Error();
            };
            if (Object.defineProperty(B.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(B, []);
              } catch (_e) {
                P = _e;
              }
              Reflect.construct(f, [], B);
            } else {
              try {
                B.call();
              } catch (_e) {
                P = _e;
              }
              f.call(B.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (_e) {
              P = _e;
            }
            f();
          }
        } catch (_e) {
          if (_e && P && typeof _e.stack == "string") {
            for (var U = _e.stack.split(`
`), se = P.stack.split(`
`), Z = U.length - 1, Q = se.length - 1; Z >= 1 && Q >= 0 && U[Z] !== se[Q]; )
              Q--;
            for (; Z >= 1 && Q >= 0; Z--, Q--)
              if (U[Z] !== se[Q]) {
                if (Z !== 1 || Q !== 1)
                  do
                    if (Z--, Q--, Q < 0 || U[Z] !== se[Q]) {
                      var Se = `
` + U[Z].replace(" at new ", " at ");
                      return typeof f == "function" && ue.set(f, Se), Se;
                    }
                  while (Z >= 1 && Q >= 0);
                break;
              }
          }
        } finally {
          ne = !1, Te.current = K, le(), Error.prepareStackTrace = W;
        }
        var Je = f ? f.displayName || f.name : "", Fn = Je ? fe(Je) : "";
        return typeof f == "function" && ue.set(f, Fn), Fn;
      }
      function Cn(f, y, S) {
        return Le(f, !1);
      }
      function hi(f) {
        var y = f.prototype;
        return !!(y && y.isReactComponent);
      }
      function _t(f, y, S) {
        if (f == null)
          return "";
        if (typeof f == "function")
          return Le(f, hi(f));
        if (typeof f == "string")
          return fe(f);
        switch (f) {
          case c:
            return fe("Suspense");
          case d:
            return fe("SuspenseList");
        }
        if (typeof f == "object")
          switch (f.$$typeof) {
            case l:
              return Cn(f.render);
            case h:
              return _t(f.type, y, S);
            case g:
              return Cn(f._render);
            case m: {
              var P = f, W = P._payload, K = P._init;
              try {
                return _t(K(W), y, S);
              } catch {
              }
            }
          }
        return "";
      }
      var Gn = {}, $n = V.ReactDebugCurrentFrame;
      function At(f) {
        if (f) {
          var y = f._owner, S = _t(f.type, f._source, y ? y.type : null);
          $n.setExtraStackFrame(S);
        } else
          $n.setExtraStackFrame(null);
      }
      function pi(f, y, S, P, W) {
        {
          var K = Function.call.bind(Object.prototype.hasOwnProperty);
          for (var B in f)
            if (K(f, B)) {
              var U = void 0;
              try {
                if (typeof f[B] != "function") {
                  var se = Error((P || "React class") + ": " + S + " type `" + B + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof f[B] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw se.name = "Invariant Violation", se;
                }
                U = f[B](y, B, P, S, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (Z) {
                U = Z;
              }
              U && !(U instanceof Error) && (At(W), k("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", P || "React class", S, B, typeof U), At(null)), U instanceof Error && !(U.message in Gn) && (Gn[U.message] = !0, At(W), k("Failed %s type: %s", S, U.message), At(null));
            }
        }
      }
      var st = V.ReactCurrentOwner, cr = Object.prototype.hasOwnProperty, mi = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, Dn, Nn, lr;
      lr = {};
      function gi(f) {
        if (cr.call(f, "ref")) {
          var y = Object.getOwnPropertyDescriptor(f, "ref").get;
          if (y && y.isReactWarning)
            return !1;
        }
        return f.ref !== void 0;
      }
      function vi(f) {
        if (cr.call(f, "key")) {
          var y = Object.getOwnPropertyDescriptor(f, "key").get;
          if (y && y.isReactWarning)
            return !1;
        }
        return f.key !== void 0;
      }
      function yi(f, y) {
        if (typeof f.ref == "string" && st.current && y && st.current.stateNode !== y) {
          var S = T(st.current.type);
          lr[S] || (k('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', T(st.current.type), f.ref), lr[S] = !0);
        }
      }
      function bi(f, y) {
        {
          var S = function() {
            Dn || (Dn = !0, k("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
          };
          S.isReactWarning = !0, Object.defineProperty(f, "key", {
            get: S,
            configurable: !0
          });
        }
      }
      function Ei(f, y) {
        {
          var S = function() {
            Nn || (Nn = !0, k("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
          };
          S.isReactWarning = !0, Object.defineProperty(f, "ref", {
            get: S,
            configurable: !0
          });
        }
      }
      var Ti = function(f, y, S, P, W, K, B) {
        var U = {
          $$typeof: n,
          type: f,
          key: y,
          ref: S,
          props: B,
          _owner: K
        };
        return U._store = {}, Object.defineProperty(U._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(U, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: P
        }), Object.defineProperty(U, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: W
        }), Object.freeze && (Object.freeze(U.props), Object.freeze(U)), U;
      };
      function wi(f, y, S, P, W) {
        {
          var K, B = {}, U = null, se = null;
          S !== void 0 && (U = "" + S), vi(y) && (U = "" + y.key), gi(y) && (se = y.ref, yi(y, W));
          for (K in y)
            cr.call(y, K) && !mi.hasOwnProperty(K) && (B[K] = y[K]);
          if (f && f.defaultProps) {
            var Z = f.defaultProps;
            for (K in Z)
              B[K] === void 0 && (B[K] = Z[K]);
          }
          if (U || se) {
            var Q = typeof f == "function" ? f.displayName || f.name || "Unknown" : f;
            U && bi(B, Q), se && Ei(B, Q);
          }
          return Ti(f, U, se, W, P, st.current, B);
        }
      }
      var fr = V.ReactCurrentOwner, In = V.ReactDebugCurrentFrame;
      function qe(f) {
        if (f) {
          var y = f._owner, S = _t(f.type, f._source, y ? y.type : null);
          In.setExtraStackFrame(S);
        } else
          In.setExtraStackFrame(null);
      }
      var dr;
      dr = !1;
      function hr(f) {
        return typeof f == "object" && f !== null && f.$$typeof === n;
      }
      function Ln() {
        {
          if (fr.current) {
            var f = T(fr.current.type);
            if (f)
              return `

Check the render method of \`` + f + "`.";
          }
          return "";
        }
      }
      function Si(f) {
        {
          if (f !== void 0) {
            var y = f.fileName.replace(/^.*[\\\/]/, ""), S = f.lineNumber;
            return `

Check your code at ` + y + ":" + S + ".";
          }
          return "";
        }
      }
      var jn = {};
      function _i(f) {
        {
          var y = Ln();
          if (!y) {
            var S = typeof f == "string" ? f : f.displayName || f.name;
            S && (y = `

Check the top-level render call using <` + S + ">.");
          }
          return y;
        }
      }
      function Un(f, y) {
        {
          if (!f._store || f._store.validated || f.key != null)
            return;
          f._store.validated = !0;
          var S = _i(y);
          if (jn[S])
            return;
          jn[S] = !0;
          var P = "";
          f && f._owner && f._owner !== fr.current && (P = " It was passed a child from " + T(f._owner.type) + "."), qe(f), k('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', S, P), qe(null);
        }
      }
      function kn(f, y) {
        {
          if (typeof f != "object")
            return;
          if (Array.isArray(f))
            for (var S = 0; S < f.length; S++) {
              var P = f[S];
              hr(P) && Un(P, y);
            }
          else if (hr(f))
            f._store && (f._store.validated = !0);
          else if (f) {
            var W = R(f);
            if (typeof W == "function" && W !== f.entries)
              for (var K = W.call(f), B; !(B = K.next()).done; )
                hr(B.value) && Un(B.value, y);
          }
        }
      }
      function Ai(f) {
        {
          var y = f.type;
          if (y == null || typeof y == "string")
            return;
          var S;
          if (typeof y == "function")
            S = y.propTypes;
          else if (typeof y == "object" && (y.$$typeof === l || y.$$typeof === h))
            S = y.propTypes;
          else
            return;
          if (S) {
            var P = T(y);
            pi(S, f.props, "prop", P, f);
          } else if (y.PropTypes !== void 0 && !dr) {
            dr = !0;
            var W = T(y);
            k("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", W || "Unknown");
          }
          typeof y.getDefaultProps == "function" && !y.getDefaultProps.isReactClassApproved && k("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Oi(f) {
        {
          for (var y = Object.keys(f.props), S = 0; S < y.length; S++) {
            var P = y[S];
            if (P !== "children" && P !== "key") {
              qe(f), k("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", P), qe(null);
              break;
            }
          }
          f.ref !== null && (qe(f), k("Invalid attribute `ref` supplied to `React.Fragment`."), qe(null));
        }
      }
      function Bn(f, y, S, P, W, K) {
        {
          var B = ie(f);
          if (!B) {
            var U = "";
            (f === void 0 || typeof f == "object" && f !== null && Object.keys(f).length === 0) && (U += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var se = Si(W);
            se ? U += se : U += Ln();
            var Z;
            f === null ? Z = "null" : Array.isArray(f) ? Z = "array" : f !== void 0 && f.$$typeof === n ? (Z = "<" + (T(f.type) || "Unknown") + " />", U = " Did you accidentally export a JSX literal instead of a component?") : Z = typeof f, k("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Z, U);
          }
          var Q = wi(f, y, S, W, K);
          if (Q == null)
            return Q;
          if (B) {
            var Se = y.children;
            if (Se !== void 0)
              if (P)
                if (Array.isArray(Se)) {
                  for (var Je = 0; Je < Se.length; Je++)
                    kn(Se[Je], f);
                  Object.freeze && Object.freeze(Se);
                } else
                  k("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
              else
                kn(Se, f);
          }
          return f === e.Fragment ? Oi(Q) : Ai(Q), Q;
        }
      }
      function Mi(f, y, S) {
        return Bn(f, y, S, !0);
      }
      function Ri(f, y, S) {
        return Bn(f, y, S, !1);
      }
      var Pi = Ri, xi = Mi;
      e.jsx = Pi, e.jsxs = xi;
    }();
  }(Mr)), Mr;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = gp() : e.exports = vp();
})(mp);
const ze = gt.Fragment, X = gt.jsx, Qr = gt.jsxs, wm = (e = () => {
}) => {
  const [t, r] = re(!1);
  t || (e(), r(!0));
};
var en = {}, yp = {
  get exports() {
    return en;
  },
  set exports(e) {
    en = e;
  }
};
(function(e, t) {
  (function(r, n) {
    e.exports = n();
  })(vh, function() {
    var r = 1e3, n = 6e4, o = 36e5, a = "millisecond", i = "second", s = "minute", u = "hour", l = "day", c = "week", d = "month", h = "quarter", m = "year", g = "date", p = "Invalid Date", M = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, w = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, I = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(x) {
      var T = ["th", "st", "nd", "rd"], E = x % 100;
      return "[" + x + (T[(E - 20) % 10] || T[E] || T[0]) + "]";
    } }, A = function(x, T, E) {
      var C = String(x);
      return !C || C.length >= T ? x : "" + Array(T + 1 - C.length).join(E) + x;
    }, O = { s: A, z: function(x) {
      var T = -x.utcOffset(), E = Math.abs(T), C = Math.floor(E / 60), _ = E % 60;
      return (T <= 0 ? "+" : "-") + A(C, 2, "0") + ":" + A(_, 2, "0");
    }, m: function x(T, E) {
      if (T.date() < E.date())
        return -x(E, T);
      var C = 12 * (E.year() - T.year()) + (E.month() - T.month()), _ = T.clone().add(C, d), D = E - _ < 0, G = T.clone().add(C + (D ? -1 : 1), d);
      return +(-(C + (E - _) / (D ? _ - G : G - _)) || 0);
    }, a: function(x) {
      return x < 0 ? Math.ceil(x) || 0 : Math.floor(x);
    }, p: function(x) {
      return { M: d, y: m, w: c, d: l, D: g, h: u, m: s, s: i, ms: a, Q: h }[x] || String(x || "").toLowerCase().replace(/s$/, "");
    }, u: function(x) {
      return x === void 0;
    } }, N = "en", R = {};
    R[N] = I;
    var V = function(x) {
      return x instanceof ie;
    }, k = function x(T, E, C) {
      var _;
      if (!T)
        return N;
      if (typeof T == "string") {
        var D = T.toLowerCase();
        R[D] && (_ = D), E && (R[D] = E, _ = D);
        var G = T.split("-");
        if (!_ && G.length > 1)
          return x(G[0]);
      } else {
        var H = T.name;
        R[H] = T, _ = H;
      }
      return !C && _ && (N = _), _ || !C && N;
    }, L = function(x, T) {
      if (V(x))
        return x.clone();
      var E = typeof T == "object" ? T : {};
      return E.date = x, E.args = arguments, new ie(E);
    }, j = O;
    j.l = k, j.i = V, j.w = function(x, T) {
      return L(x, { locale: T.$L, utc: T.$u, x: T.$x, $offset: T.$offset });
    };
    var ie = function() {
      function x(E) {
        this.$L = k(E.locale, null, !0), this.parse(E);
      }
      var T = x.prototype;
      return T.parse = function(E) {
        this.$d = function(C) {
          var _ = C.date, D = C.utc;
          if (_ === null)
            return new Date(NaN);
          if (j.u(_))
            return new Date();
          if (_ instanceof Date)
            return new Date(_);
          if (typeof _ == "string" && !/Z$/i.test(_)) {
            var G = _.match(M);
            if (G) {
              var H = G[2] - 1 || 0, J = (G[7] || "0").substring(0, 3);
              return D ? new Date(Date.UTC(G[1], H, G[3] || 1, G[4] || 0, G[5] || 0, G[6] || 0, J)) : new Date(G[1], H, G[3] || 1, G[4] || 0, G[5] || 0, G[6] || 0, J);
            }
          }
          return new Date(_);
        }(E), this.$x = E.x || {}, this.init();
      }, T.init = function() {
        var E = this.$d;
        this.$y = E.getFullYear(), this.$M = E.getMonth(), this.$D = E.getDate(), this.$W = E.getDay(), this.$H = E.getHours(), this.$m = E.getMinutes(), this.$s = E.getSeconds(), this.$ms = E.getMilliseconds();
      }, T.$utils = function() {
        return j;
      }, T.isValid = function() {
        return this.$d.toString() !== p;
      }, T.isSame = function(E, C) {
        var _ = L(E);
        return this.startOf(C) <= _ && _ <= this.endOf(C);
      }, T.isAfter = function(E, C) {
        return L(E) < this.startOf(C);
      }, T.isBefore = function(E, C) {
        return this.endOf(C) < L(E);
      }, T.$g = function(E, C, _) {
        return j.u(E) ? this[C] : this.set(_, E);
      }, T.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, T.valueOf = function() {
        return this.$d.getTime();
      }, T.startOf = function(E, C) {
        var _ = this, D = !!j.u(C) || C, G = j.p(E), H = function(fe, ne) {
          var ue = j.w(_.$u ? Date.UTC(_.$y, ne, fe) : new Date(_.$y, ne, fe), _);
          return D ? ue : ue.endOf(l);
        }, J = function(fe, ne) {
          return j.w(_.toDate()[fe].apply(_.toDate("s"), (D ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(ne)), _);
        }, z = this.$W, ee = this.$M, ge = this.$D, le = "set" + (this.$u ? "UTC" : "");
        switch (G) {
          case m:
            return D ? H(1, 0) : H(31, 11);
          case d:
            return D ? H(1, ee) : H(0, ee + 1);
          case c:
            var Te = this.$locale().weekStart || 0, we = (z < Te ? z + 7 : z) - Te;
            return H(D ? ge - we : ge + (6 - we), ee);
          case l:
          case g:
            return J(le + "Hours", 0);
          case u:
            return J(le + "Minutes", 1);
          case s:
            return J(le + "Seconds", 2);
          case i:
            return J(le + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, T.endOf = function(E) {
        return this.startOf(E, !1);
      }, T.$set = function(E, C) {
        var _, D = j.p(E), G = "set" + (this.$u ? "UTC" : ""), H = (_ = {}, _[l] = G + "Date", _[g] = G + "Date", _[d] = G + "Month", _[m] = G + "FullYear", _[u] = G + "Hours", _[s] = G + "Minutes", _[i] = G + "Seconds", _[a] = G + "Milliseconds", _)[D], J = D === l ? this.$D + (C - this.$W) : C;
        if (D === d || D === m) {
          var z = this.clone().set(g, 1);
          z.$d[H](J), z.init(), this.$d = z.set(g, Math.min(this.$D, z.daysInMonth())).$d;
        } else
          H && this.$d[H](J);
        return this.init(), this;
      }, T.set = function(E, C) {
        return this.clone().$set(E, C);
      }, T.get = function(E) {
        return this[j.p(E)]();
      }, T.add = function(E, C) {
        var _, D = this;
        E = Number(E);
        var G = j.p(C), H = function(ee) {
          var ge = L(D);
          return j.w(ge.date(ge.date() + Math.round(ee * E)), D);
        };
        if (G === d)
          return this.set(d, this.$M + E);
        if (G === m)
          return this.set(m, this.$y + E);
        if (G === l)
          return H(1);
        if (G === c)
          return H(7);
        var J = (_ = {}, _[s] = n, _[u] = o, _[i] = r, _)[G] || 1, z = this.$d.getTime() + E * J;
        return j.w(z, this);
      }, T.subtract = function(E, C) {
        return this.add(-1 * E, C);
      }, T.format = function(E) {
        var C = this, _ = this.$locale();
        if (!this.isValid())
          return _.invalidDate || p;
        var D = E || "YYYY-MM-DDTHH:mm:ssZ", G = j.z(this), H = this.$H, J = this.$m, z = this.$M, ee = _.weekdays, ge = _.months, le = function(ne, ue, it, Le) {
          return ne && (ne[ue] || ne(C, D)) || it[ue].slice(0, Le);
        }, Te = function(ne) {
          return j.s(H % 12 || 12, ne, "0");
        }, we = _.meridiem || function(ne, ue, it) {
          var Le = ne < 12 ? "AM" : "PM";
          return it ? Le.toLowerCase() : Le;
        }, fe = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: z + 1, MM: j.s(z + 1, 2, "0"), MMM: le(_.monthsShort, z, ge, 3), MMMM: le(ge, z), D: this.$D, DD: j.s(this.$D, 2, "0"), d: String(this.$W), dd: le(_.weekdaysMin, this.$W, ee, 2), ddd: le(_.weekdaysShort, this.$W, ee, 3), dddd: ee[this.$W], H: String(H), HH: j.s(H, 2, "0"), h: Te(1), hh: Te(2), a: we(H, J, !0), A: we(H, J, !1), m: String(J), mm: j.s(J, 2, "0"), s: String(this.$s), ss: j.s(this.$s, 2, "0"), SSS: j.s(this.$ms, 3, "0"), Z: G };
        return D.replace(w, function(ne, ue) {
          return ue || fe[ne] || G.replace(":", "");
        });
      }, T.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, T.diff = function(E, C, _) {
        var D, G = j.p(C), H = L(E), J = (H.utcOffset() - this.utcOffset()) * n, z = this - H, ee = j.m(this, H);
        return ee = (D = {}, D[m] = ee / 12, D[d] = ee, D[h] = ee / 3, D[c] = (z - J) / 6048e5, D[l] = (z - J) / 864e5, D[u] = z / o, D[s] = z / n, D[i] = z / r, D)[G] || z, _ ? ee : j.a(ee);
      }, T.daysInMonth = function() {
        return this.endOf(d).$D;
      }, T.$locale = function() {
        return R[this.$L];
      }, T.locale = function(E, C) {
        if (!E)
          return this.$L;
        var _ = this.clone(), D = k(E, C, !0);
        return D && (_.$L = D), _;
      }, T.clone = function() {
        return j.w(this.$d, this);
      }, T.toDate = function() {
        return new Date(this.valueOf());
      }, T.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, T.toISOString = function() {
        return this.$d.toISOString();
      }, T.toString = function() {
        return this.$d.toUTCString();
      }, x;
    }(), St = ie.prototype;
    return L.prototype = St, [["$ms", a], ["$s", i], ["$m", s], ["$H", u], ["$W", l], ["$M", d], ["$y", m], ["$D", g]].forEach(function(x) {
      St[x[1]] = function(T) {
        return this.$g(T, x[0], x[1]);
      };
    }), L.extend = function(x, T) {
      return x.$i || (x(T, ie, L), x.$i = !0), L;
    }, L.locale = k, L.isDayjs = V, L.unix = function(x) {
      return L(1e3 * x);
    }, L.en = R[N], L.Ls = R, L.p = {}, L;
  });
})(yp);
const Jo = en;
function bp(e, t) {
  const r = ke(!1);
  ce(() => {
    if (r.current)
      return e && e();
    r.current = !0;
  }, t);
}
function Sm({ initValue: e, key: t }) {
  const [r, n] = re({}), [o, a] = re({}), i = Y(
    (c, d) => {
      n((h) => ({
        ...h,
        [c]: d || e
      }));
    },
    [e]
  );
  ce(() => {
    if (t && !r[t]) {
      const c = Mt.getToken("countDown"), d = Mt.getToken("leavingDate");
      if (c && d) {
        const h = JSON.parse(c), m = JSON.parse(d);
        if (h[t]) {
          const g = m, p = Jo().unix(), M = {
            ...h
          }, w = {};
          Object.keys(M).forEach((I) => {
            const A = h[I] - (p - g);
            A < e && A > 0 ? w[I] = A : u(I);
          }), n((I) => ({
            ...I,
            ...w
          }));
        }
      }
    }
  }, [t]), bp(() => {
    Mt.setToken("countDown", JSON.stringify({ ...r })), Mt.setToken("leavingDate", JSON.stringify(Jo().unix())), Object.keys(r).forEach((c) => {
      Object.keys(o).includes(c) || s(c), r[c] === 0 && u(c);
    });
  }, [r]);
  const s = Y(
    (c) => {
      const d = {};
      o[c] || (d[c] = setInterval(() => {
        n((h) => ({
          ...h,
          [c]: h[c] - 1
        }));
      }, 1e3), a((h) => ({
        ...h,
        ...d
      })));
    },
    [t, o]
  ), u = Y(
    (c) => {
      if (o[c]) {
        const d = o[c];
        clearInterval(d), a((h) => (delete h[c], { ...h })), n((h) => (delete h[c], h));
      }
    },
    [o]
  ), l = rt(() => Object.keys(o).includes(t), [o, t]);
  return {
    state: r[t],
    clearCountDown: u,
    initCountdown: i,
    checkTimerProcess: l
  };
}
function Ep(e, t) {
  function r(n) {
    let o = [];
    return Array.isArray(n) ? o = n : o = n.split(","), o.length ? t.filter((i) => o.includes(i)).length > 0 : !0;
  }
  for (const n of e)
    if (r(n.permissions || [])) {
      if (n.routes) {
        const o = Ep(n.routes, t);
        if (o)
          return o;
        continue;
      }
      return n;
    }
}
const Yo = (e, t, r = !1) => {
  const n = e.split("/"), o = t.split("/");
  if (o.length > n.length || r && o.length !== n.length)
    return !1;
  for (let a = 0; a < o.length; a++) {
    const i = o[a];
    if (!i.match(/:([\w\W]+)/gi) && i !== n[a])
      return !1;
  }
  return !0;
};
var tn = {}, Tp = {
  get exports() {
    return tn;
  },
  set exports(e) {
    tn = e;
  }
}, Rr = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Zo;
function wp() {
  if (Zo)
    return Rr;
  Zo = 1;
  var e = vt;
  function t(d, h) {
    return d === h && (d !== 0 || 1 / d === 1 / h) || d !== d && h !== h;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useState, o = e.useEffect, a = e.useLayoutEffect, i = e.useDebugValue;
  function s(d, h) {
    var m = h(), g = n({ inst: { value: m, getSnapshot: h } }), p = g[0].inst, M = g[1];
    return a(function() {
      p.value = m, p.getSnapshot = h, u(p) && M({ inst: p });
    }, [d, m, h]), o(function() {
      return u(p) && M({ inst: p }), d(function() {
        u(p) && M({ inst: p });
      });
    }, [d]), i(m), m;
  }
  function u(d) {
    var h = d.getSnapshot;
    d = d.value;
    try {
      var m = h();
      return !r(d, m);
    } catch {
      return !0;
    }
  }
  function l(d, h) {
    return h();
  }
  var c = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? l : s;
  return Rr.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : c, Rr;
}
var Pr = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xo;
function Sp() {
  return Xo || (Xo = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = vt, t = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function r(A) {
      {
        for (var O = arguments.length, N = new Array(O > 1 ? O - 1 : 0), R = 1; R < O; R++)
          N[R - 1] = arguments[R];
        n("error", A, N);
      }
    }
    function n(A, O, N) {
      {
        var R = t.ReactDebugCurrentFrame, V = R.getStackAddendum();
        V !== "" && (O += "%s", N = N.concat([V]));
        var k = N.map(function(L) {
          return String(L);
        });
        k.unshift("Warning: " + O), Function.prototype.apply.call(console[A], console, k);
      }
    }
    function o(A, O) {
      return A === O && (A !== 0 || 1 / A === 1 / O) || A !== A && O !== O;
    }
    var a = typeof Object.is == "function" ? Object.is : o, i = e.useState, s = e.useEffect, u = e.useLayoutEffect, l = e.useDebugValue, c = !1, d = !1;
    function h(A, O, N) {
      c || e.startTransition !== void 0 && (c = !0, r("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
      var R = O();
      if (!d) {
        var V = O();
        a(R, V) || (r("The result of getSnapshot should be cached to avoid an infinite loop"), d = !0);
      }
      var k = i({
        inst: {
          value: R,
          getSnapshot: O
        }
      }), L = k[0].inst, j = k[1];
      return u(function() {
        L.value = R, L.getSnapshot = O, m(L) && j({
          inst: L
        });
      }, [A, R, O]), s(function() {
        m(L) && j({
          inst: L
        });
        var ie = function() {
          m(L) && j({
            inst: L
          });
        };
        return A(ie);
      }, [A]), l(R), R;
    }
    function m(A) {
      var O = A.getSnapshot, N = A.value;
      try {
        var R = O();
        return !a(N, R);
      } catch {
        return !0;
      }
    }
    function g(A, O, N) {
      return O();
    }
    var p = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", M = !p, w = M ? g : h, I = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : w;
    Pr.useSyncExternalStore = I, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), Pr;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = wp() : e.exports = Sp();
})(Tp);
const _p = () => !0;
class Ap extends Ud {
  constructor() {
    super(...arguments);
    ae(this, "middlewareHandler", _p);
    ae(this, "_routes", []);
  }
  get routes() {
    return this._routes;
  }
  registerMiddleware(r) {
    this.middlewareHandler = (n, o) => {
      var a, i, s;
      return n.middleware ? typeof ((a = n.component) == null ? void 0 : a.middleware) == "string" ? r[(i = n.component) == null ? void 0 : i.middleware] && r[(s = n.component) == null ? void 0 : s.middleware](n, o) : typeof n.middleware == "string" ? r[n.middleware] && r[n.middleware](n, o) : n.middleware(n, o) : !0;
    };
  }
  canPassMiddleware(r, n) {
    var o;
    return (o = r.component) != null && o.middleware && typeof r.component.middleware == "function" ? r.component.middleware(r, n) : this.middlewareHandler(r, n);
  }
  addRoute(...r) {
    const n = jd([...r, ...this._routes], "path");
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
const lt = new Ap();
function ui() {
  const e = Y((...o) => {
    lt.addRoute(...o);
  }, []), t = Y((o) => {
    lt.removeRoute(o);
  }, []), r = Y((o) => lt.on("routeChange", o), []);
  return { routes: tn.useSyncExternalStore(
    r,
    () => lt.routes
  ), addRoutes: e, removeRoute: t };
}
const _m = () => {
  const { routes: e } = ui(), [t, r] = re(), n = Re(), o = Y(
    (a) => {
      const i = a.filter(
        (s) => Yo(n.pathname, s.path)
      );
      for (const s of i)
        if (s) {
          if (s.routes)
            o(s.routes);
          else if (Yo(n.pathname, s.path, !0)) {
            r(s);
            break;
          }
        }
    },
    [n]
  );
  return ce(() => {
    o(e);
  }, [o, e]), t;
}, Op = (e) => {
  ce(
    () => () => {
      e();
    },
    []
  );
};
function Mp(e, t) {
  const r = ke(e);
  r.current = e;
  const n = (t == null ? void 0 : t.wait) ?? 1e3, o = ke(
    Ad(
      (...a) => r.current(...a),
      n,
      t
    )
  ).current;
  return Op(() => {
    o.cancel();
  }), {
    run: o,
    cancel: o.cancel,
    flush: o.flush
  };
}
function Am(e, t) {
  const [r, n] = re(e), { run: o } = Mp((a) => {
    n(a);
  }, t);
  return [r, o];
}
const Om = (e, t) => {
  const r = ke(e);
  r.current = e;
  const n = re()[1], o = Y(() => {
    a(), n(
      setInterval(() => r.current(), t)
    );
  }, [r.current, t]), a = Y(() => {
    n((i) => {
      i && clearInterval(i);
    });
  }, []);
  return {
    run: o,
    cancel: a
  };
}, Rp = (e = !1) => {
  const [t, r] = re(e), n = Y(() => {
    r((i) => !i);
  }, []), o = Y(() => {
    r(!0);
  }, []), a = Y(() => {
    r(!1);
  }, []);
  return { state: t, toggle: n, on: o, off: a };
}, ci = ea(
  void 0
);
function Mm({
  children: e,
  color: t,
  isWrap: r = !1,
  component: n
}) {
  const { state: o, on: a, off: i } = Rp(), s = re(0)[1], u = Y(() => {
    a(), s((c) => c + 1), s(1);
  }, []), l = Y(() => {
    setTimeout(() => {
      s((c) => c === 1 ? (i(), 0) : c - 1);
    }, 500);
  }, []);
  return /* @__PURE__ */ X(ci.Provider, { value: { startLoading: u, stopLoading: l, state: o }, children: r ? /* @__PURE__ */ X(n, { state: o, color: t, children: e }) : /* @__PURE__ */ Qr(ze, { children: [
    e,
    /* @__PURE__ */ X(n, { state: o, color: t })
  ] }) });
}
const li = (e) => {
  const t = rn(ci);
  if (t === void 0)
    throw new Error("useLoading must be used in LoadingProvider");
  return ce(() => {
    typeof e > "u" || (e ? t.startLoading() : t.stopLoading());
  }, [e, t]), t;
};
var Ue = /* @__PURE__ */ ((e) => (e.Standing = "standing", e.Processing = "processing", e.Success = "success", e.Failed = "Failed", e))(Ue || {});
function Pn(e) {
  ce(() => e(), []);
}
function Pp(e, t) {
  const r = ke(new Xr()), [n, o] = re(), { startLoading: a, stopLoading: i } = li(), [s, u] = re(Ue.Standing), [l, c] = re(), [d, h] = re(), m = rt(() => s === Ue.Processing, [s]), g = Y(
    (...M) => {
      u(Ue.Processing), t != null && t.showLoading && a(), r.current.next(e(...M));
    },
    [e]
  ), p = Y(() => {
    n == null || n.unsubscribe(), u(Ue.Standing), t != null && t.showLoading && i();
  }, [n]);
  return Pn(() => (r.current.closed && (r.current = new Xr()), r.current.subscribe({
    next: (M) => {
      o(
        M.subscribe({
          next: c,
          complete: () => {
            u(Ue.Success), t != null && t.showLoading && i();
          },
          error: (w) => {
            u(Ue.Failed), h(w), t != null && t.showLoading && i();
          }
        })
      );
    }
  }), () => {
    t != null && t.showLoading && i(), r.current.unsubscribe();
  })), {
    run: g,
    cancel: p,
    state: s,
    processing: m,
    result: l,
    error: d
  };
}
const xp = { attributes: !0, childList: !0, subtree: !0 }, Rm = (e, t) => {
  const r = rt(() => new MutationObserver(t), [t]);
  ce(() => {
    const n = e instanceof HTMLElement ? e : e.current;
    return n && r.observe(n, xp), () => {
      r.disconnect();
    };
  }, [r, e]);
};
function Pm(e) {
  const t = ke();
  return ce(() => {
    t.current = e;
  }), t.current;
}
const xm = (e, t) => {
  const r = ke(e);
  r.current = e;
  const n = re()[1], o = Y(() => {
    a(), n(
      setTimeout(() => r.current(), t)
    );
  }, [r.current, t]), a = Y(() => {
    n((i) => {
      i && clearTimeout(i);
    });
  }, []);
  return {
    run: o,
    cancel: a
  };
};
function Cm({ get: e, set: t }, r) {
  const n = rt(e, r), o = Y(t, r);
  return [n, o];
}
const fi = ea(void 0), Gm = ({
  children: e,
  defaultTokens: t = () => ({}),
  fetchUserOnLogin: r = () => new zt((o) => o.next(void 0)),
  fetchRefreshToken: n
}) => {
  const [o, a] = re(), [i, s] = re(t), [u, l] = re(!1), { run: c, result: d } = Pp(r), h = Y(
    (O, N) => {
      l(!0), s(O), N ? a(N) : c(O);
    },
    [c]
  ), m = Y(() => {
    a(void 0), s({}), l(!1);
  }, []);
  ce(() => {
    var O;
    (O = Object.values(t())[0]) != null && O.length && (c(t()), l(!0));
  }, [Fr.subdomain]), ce(() => {
    d && a(d);
  }, [d]), ce(() => {
    for (const O in i)
      if (Object.prototype.hasOwnProperty.call(i, O)) {
        const N = i[O];
        Xe.setToken(O, N || "");
      }
    return () => {
      for (const O in i)
        Object.prototype.hasOwnProperty.call(i, O) && Xe.setToken(O, "");
    };
  }, [i]);
  const [g, p] = re(!1), [M, w] = re([]), I = (O, N) => {
    M.forEach((R) => {
      O ? R.reject(O) : R.resolve(N);
    }), M.splice(0);
  }, A = ve.addInterceptor({
    response: {
      error: (O, N) => {
        if (!(O instanceof tp))
          return O;
        const { config: R, response: V } = O;
        if (!R || !V)
          return Promise.reject(O);
        if (V.status === 401) {
          if (console.log("Refresh Token..."), g)
            return new Promise(function(L, j) {
              M.push({ resolve: L, reject: j });
            }).then(() => Ar(N.request(R))).catch((L) => L);
          p(!0);
          const k = Xe.getToken("refresh_token");
          return k ? n ? new Promise((L, j) => {
            Ar(n(k)).then(({ data: ie }) => {
              p(!1), I(null, ie.data.accessToken), h({
                base_token: ie.data.accessToken,
                refresh_token: ie.data.refreshToken
              }), L(Ar(N.request(R)));
            }).catch((ie) => {
              p(!0), m(), I(ie), j(ie);
            });
          }) : Promise.reject(O) : (console.log("Not found refresh token app"), Promise.reject(O));
        }
        return Promise.reject(O);
      }
    }
  });
  return Pn(() => A()), /* @__PURE__ */ X(fi.Provider, { value: { user: o, tokens: i, isLoggedIn: u, login: h, logout: m }, children: e });
};
function $m() {
  const e = rn(fi);
  if (!e)
    throw new Error("useAuthContext must be used in AuthProvider");
  return e;
}
const xn = vt.createContext(void 0), Dm = ({
  userPermissions: e,
  isUser: t,
  children: r
}) => {
  const n = Y(
    (o) => {
      let a = [];
      return Array.isArray(o) ? a = o : a = o.split(","), a.length ? t ? e.filter((s) => a.includes(s)).length > 0 : !1 : !0;
    },
    [t, e]
  );
  return /* @__PURE__ */ X(xn.Provider, { value: { userPermissions: e, can: n }, children: r });
}, Cp = (e) => {
  const t = rn(xn);
  if (!t)
    throw new Error("useAuthorization must be used in AuthorizationProvider");
  return {
    granted: rt(() => e ? t.can(e) : !0, [e, t.can]),
    ...t
  };
}, Nm = ta(
  ({ permissions: e, children: t, guestView: r }) => {
    const { granted: n } = Cp(e);
    return typeof t == "function" ? t(n) : /* @__PURE__ */ X(ze, { children: n ? t : r });
  }
);
function Im(e) {
  return (t) => (r) => /* @__PURE__ */ X(xn.Consumer, { children: (n) => /* @__PURE__ */ X(ze, { children: (n == null ? void 0 : n.can(e || [])) && /* @__PURE__ */ X(t, { ...r }) }) });
}
function Lm({
  component: e,
  props: t
}) {
  return /* @__PURE__ */ X(e, { ...t });
}
function jm({
  children: e
}) {
  const { startLoading: t, stopLoading: r } = li();
  return Pn(() => ve.addInterceptor({
    request(o) {
      return o.showLoading && t(), o;
    },
    response: {
      success: (o) => (o.config.showLoading && r(), o),
      error: (o) => {
        const { config: a } = o;
        return a != null && a.showLoading && r(), o;
      }
    }
  })), /* @__PURE__ */ X(ze, { children: e });
}
function Um(e, t) {
  return () => {
    const r = new ve(e().baseURL, e());
    return xd(t, (n) => (...o) => n(r, ...o));
  };
}
function Gp(e, t = "/") {
  const r = {}, n = e.Index.length > 0 ? `${t}${e.Index}` : "";
  for (const o in e)
    if (Object.prototype.hasOwnProperty.call(e, o)) {
      const a = e[o];
      typeof a == "object" ? r[o] = Gp(a, n !== "/" ? n + "/" : "/") : o === "Index" ? r[o] = n.length ? n : t : r[o] = n + "/" + a;
    }
  return r;
}
const $p = ({
  route: { component: e, ...t }
}) => {
  var r;
  return /* @__PURE__ */ X(ze, { children: (r = t.routes) != null && r.length && !t.element && !e ? /* @__PURE__ */ X(Rs, {}) : t.element || (e ? /* @__PURE__ */ X(e, {}) : null) });
}, Dp = ta($p), Qo = ({ route: e }) => {
  const t = qt(), [r, n] = re();
  return ce(() => {
    (async () => n(
      await lt.canPassMiddleware(e, t)
    ))();
  }, [t, e]), r !== void 0 ? $i(r) ? r : r ? /* @__PURE__ */ X(Dp, { route: e }) : null : null;
}, di = (e) => {
  if (e.routes) {
    const { routes: t, element: r, index: n, ...o } = e, a = t.map((i) => di(i));
    return /* @__PURE__ */ Hn(
      Lt,
      {
        element: /* @__PURE__ */ X(Qo, { route: { ...o, element: r, routes: t } }),
        ...o,
        index: n,
        key: Co(12)
      },
      a
    );
  }
  return /* @__PURE__ */ Hn(
    Lt,
    {
      element: /* @__PURE__ */ X(Qo, { route: e }),
      ...e,
      key: Co(12)
    }
  );
}, Np = ({ onChange: e }) => {
  const t = Re();
  return ce(() => {
    e && e(t);
  }, [t.pathname]), /* @__PURE__ */ X(ze, {});
}, km = ({
  routes: e,
  notFoundElement: t,
  onRouteChange: r
}) => {
  const n = rt(
    () => e.map((o) => di(o)),
    [e]
  );
  return /* @__PURE__ */ Qr(ze, { children: [
    /* @__PURE__ */ X(Np, { onChange: r }),
    /* @__PURE__ */ Qr(xs, { children: [
      n,
      /* @__PURE__ */ X(Lt, { path: "*", element: t })
    ] })
  ] });
};
function Bm(e) {
  const t = e;
  return (r) => {
    const n = ui();
    return /* @__PURE__ */ X(t, { ...r, routes: n });
  };
}
const Fm = {
  "Etc/GMT+12": "(GMT-12:00) International Date Line West",
  "Pacific/Pago_Pago": "(GMT-11:00) American Samoa",
  "Pacific/Midway": "(GMT-11:00) Midway Island",
  "Pacific/Honolulu": "(GMT-10:00) Hawaii",
  "America/Juneau": "(GMT-09:00) Alaska",
  "America/Los_Angeles": "(GMT-08:00) Pacific Time (US & Canada)",
  "America/Tijuana": "(GMT-08:00) Tijuana",
  "America/Phoenix": "(GMT-07:00) Arizona",
  "America/Mazatlan": "(GMT-07:00) Mazatlan",
  "America/Denver": "(GMT-07:00) Mountain Time (US & Canada)",
  "America/Guatemala": "(GMT-06:00) Central America",
  "America/Chicago": "(GMT-06:00) Central Time (US & Canada)",
  "America/Chihuahua": "(GMT-07:00) Chihuahua",
  "America/Mexico_City": "(GMT-06:00) Guadalajara, Mexico City",
  "America/Monterrey": "(GMT-06:00) Monterrey",
  "America/Regina": "(GMT-06:00) Saskatchewan",
  "America/Bogota": "(GMT-05:00) Bogota",
  "America/New_York": "(GMT-05:00) Eastern Time (US & Canada)",
  "America/Indiana/Indianapolis": "(GMT-05:00) Indiana (East)",
  "America/Lima": "(GMT-05:00) Lima, Quito",
  "America/Halifax": "(GMT-04:00) Atlantic Time (Canada)",
  "America/Caracas": "(GMT-04:00) Caracas",
  "America/Guyana": "(GMT-04:00) Georgetown",
  "America/La_Paz": "(GMT-04:00) La Paz",
  "America/Puerto_Rico": "(GMT-04:00) Puerto Rico",
  "America/Santiago": "(GMT-04:00) Santiago",
  "America/St_Johns": "(GMT-03:30) Newfoundland",
  "America/Sao_Paulo": "(GMT-03:00) Brasilia",
  "America/Argentina/Buenos_Aires": "(GMT-03:00) Buenos Aires",
  "America/Godthab": "(GMT-03:00) Greenland",
  "America/Montevideo": "(GMT-03:00) Montevideo",
  "Atlantic/South_Georgia": "(GMT-02:00) Mid-Atlantic",
  "Atlantic/Azores": "(GMT-01:00) Azores",
  "Atlantic/Cape_Verde": "(GMT-01:00) Cape Verde Is",
  "Europe/London": "(GMT+00:00) Edinburgh, London",
  "Europe/Lisbon": "(GMT+00:00) Lisbon",
  "Africa/Monrovia": "(GMT+00:00) Monrovia",
  "Etc/UTC": "(GMT+00:00) UTC",
  "Europe/Amsterdam": "(GMT+01:00) Amsterdam",
  "Europe/Belgrade": "(GMT+01:00) Belgrade",
  "Europe/Berlin": "(GMT+01:00) Berlin",
  "Europe/Zurich": "(GMT+01:00) Bern, Zurich",
  "Europe/Bratislava": "(GMT+01:00) Bratislava",
  "Europe/Brussels": "(GMT+01:00) Brussels",
  "Europe/Budapest": "(GMT+01:00) Budapest",
  "Africa/Casablanca": "(GMT+01:00) Casablanca",
  "Europe/Copenhagen": "(GMT+01:00) Copenhagen",
  "Europe/Dublin": "(GMT+00:00) Dublin",
  "Europe/Ljubljana": "(GMT+01:00) Ljubljana",
  "Europe/Madrid": "(GMT+01:00) Madrid",
  "Europe/Paris": "(GMT+01:00) Paris",
  "Europe/Prague": "(GMT+01:00) Prague",
  "Europe/Rome": "(GMT+01:00) Rome",
  "Europe/Sarajevo": "(GMT+01:00) Sarajevo",
  "Europe/Skopje": "(GMT+01:00) Skopje",
  "Europe/Stockholm": "(GMT+01:00) Stockholm",
  "Europe/Vienna": "(GMT+01:00) Vienna",
  "Europe/Warsaw": "(GMT+01:00) Warsaw",
  "Africa/Algiers": "(GMT+01:00) West Central Africa",
  "Europe/Zagreb": "(GMT+01:00) Zagreb",
  "Europe/Athens": "(GMT+02:00) Athens",
  "Europe/Bucharest": "(GMT+02:00) Bucharest",
  "Africa/Cairo": "(GMT+02:00) Cairo",
  "Africa/Harare": "(GMT+02:00) Harare",
  "Europe/Helsinki": "(GMT+02:00) Helsinki",
  "Asia/Jerusalem": "(GMT+02:00) Jerusalem",
  "Europe/Kaliningrad": "(GMT+02:00) Kaliningrad",
  "Europe/Kiev": "(GMT+02:00) Kyiv",
  "Africa/Johannesburg": "(GMT+02:00) Pretoria",
  "Europe/Riga": "(GMT+02:00) Riga",
  "Europe/Sofia": "(GMT+02:00) Sofia",
  "Europe/Tallinn": "(GMT+02:00) Tallinn",
  "Europe/Vilnius": "(GMT+02:00) Vilnius",
  "Asia/Baghdad": "(GMT+03:00) Baghdad",
  "Europe/Istanbul": "(GMT+03:00) Istanbul",
  "Asia/Kuwait": "(GMT+03:00) Kuwait",
  "Europe/Minsk": "(GMT+03:00) Minsk",
  "Europe/Moscow": "(GMT+03:00) Moscow, St. Petersburg",
  "Africa/Nairobi": "(GMT+03:00) Nairobi",
  "Asia/Riyadh": "(GMT+03:00) Riyadh",
  "Europe/Volgograd": "(GMT+03:00) Volgograd",
  "Asia/Tehran": "(GMT+03:30) Tehran",
  "Asia/Muscat": "(GMT+04:00) Abu Dhabi, Muscat",
  "Asia/Baku": "(GMT+04:00) Baku",
  "Europe/Samara": "(GMT+04:00) Samara",
  "Asia/Tbilisi": "(GMT+04:00) Tbilisi",
  "Asia/Yerevan": "(GMT+04:00) Yerevan",
  "Asia/Kabul": "(GMT+04:30) Kabul",
  "Asia/Yekaterinburg": "(GMT+05:00) Ekaterinburg",
  "Asia/Karachi": "(GMT+05:00) Islamabad, Karachi",
  "Asia/Tashkent": "(GMT+05:00) Tashkent",
  "Asia/Kolkata": "(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi",
  "Asia/Colombo": "(GMT+05:30) Sri Jayawardenepura",
  "Asia/Kathmandu": "(GMT+05:45) Kathmandu",
  "Asia/Almaty": "(GMT+06:00) Almaty",
  "Asia/Dhaka": "(GMT+06:00) Astana, Dhaka",
  "Asia/Urumqi": "(GMT+06:00) Urumqi",
  "Asia/Rangoon": "(GMT+06:30) Rangoon",
  "Asia/Bangkok": "(GMT+07:00) Bangkok, Hanoi",
  "Asia/Jakarta": "(GMT+07:00) Jakarta",
  "Asia/Krasnoyarsk": "(GMT+07:00) Krasnoyarsk",
  "Asia/Novosibirsk": "(GMT+07:00) Novosibirsk",
  "Asia/Shanghai": "(GMT+08:00) Beijing",
  "Asia/Chongqing": "(GMT+08:00) Chongqing",
  "Asia/Hong_Kong": "(GMT+08:00) Hong Kong",
  "Asia/Irkutsk": "(GMT+08:00) Irkutsk",
  "Asia/Kuala_Lumpur": "(GMT+08:00) Kuala Lumpur",
  "Australia/Perth": "(GMT+08:00) Perth",
  "Asia/Singapore": "(GMT+08:00) Singapore",
  "Asia/Taipei": "(GMT+08:00) Taipei",
  "Asia/Ulaanbaatar": "(GMT+08:00) Ulaanbaatar",
  "Asia/Tokyo": "(GMT+09:00) Osaka, Sapporo, Tokyo",
  "Asia/Seoul": "(GMT+09:00) Seoul",
  "Asia/Yakutsk": "(GMT+09:00) Yakutsk",
  "Australia/Adelaide": "(GMT+09:30) Adelaide",
  "Australia/Darwin": "(GMT+09:30) Darwin",
  "Australia/Brisbane": "(GMT+10:00) Brisbane",
  "Australia/Melbourne": "(GMT+10:00) Canberra, Melbourne",
  "Pacific/Guam": "(GMT+10:00) Guam",
  "Australia/Hobart": "(GMT+10:00) Hobart",
  "Pacific/Port_Moresby": "(GMT+10:00) Port Moresby",
  "Australia/Sydney": "(GMT+10:00) Sydney",
  "Asia/Vladivostok": "(GMT+10:00) Vladivostok",
  "Asia/Magadan": "(GMT+11:00) Magadan",
  "Pacific/Noumea": "(GMT+11:00) New Caledonia",
  "Pacific/Guadalcanal": "(GMT+11:00) Solomon Is",
  "Asia/Srednekolymsk": "(GMT+11:00) Srednekolymsk",
  "Pacific/Auckland": "(GMT+12:00) Auckland, Wellington",
  "Pacific/Fiji": "(GMT+12:00) Fiji",
  "Asia/Kamchatka": "(GMT+12:00) Kamchatka",
  "Pacific/Majuro": "(GMT+12:00) Marshall Is",
  "Pacific/Chatham": "(GMT+12:45) Chatham Is",
  "Pacific/Tongatapu": "(GMT+13:00) Nuku'alofa",
  "Pacific/Apia": "(GMT+13:00) Samoa",
  "Pacific/Fakaofo": "(GMT+13:00) Tokelau Is"
}, Hm = {
  "Etc/GMT+12": "GMT-12:00",
  "Pacific/Pago_Pago": "GMT-11:00",
  "Pacific/Midway": "GMT-11:00",
  "Pacific/Honolulu": "GMT-10:00",
  "America/Juneau": "GMT-09:00",
  "America/Los_Angeles": "GMT-08:00",
  "America/Tijuana": "GMT-08:00",
  "America/Phoenix": "GMT-07:00",
  "America/Mazatlan": "GMT-07:00",
  "America/Denver": "GMT-07:00",
  "America/Guatemala": "GMT-06:00",
  "America/Chicago": "GMT-06:00",
  "America/Chihuahua": "GMT-07:00",
  "America/Mexico_City": "GMT-06:00",
  "America/Monterrey": "GMT-06:00",
  "America/Regina": "GMT-06:00",
  "America/Bogota": "GMT-05:00",
  "America/New_York": "GMT-05:00",
  "America/Indiana/Indianapolis": "GMT-05:00",
  "America/Lima": "GMT-05:00",
  "America/Halifax": "GMT-04:00",
  "America/Caracas": "GMT-04:00",
  "America/Guyana": "GMT-04:00",
  "America/La_Paz": "GMT-04:00",
  "America/Puerto_Rico": "GMT-04:00",
  "America/Santiago": "GMT-04:00",
  "America/St_Johns": "GMT-03:30",
  "America/Sao_Paulo": "GMT-03:00",
  "America/Argentina/Buenos_Aires": "GMT-03:00",
  "America/Godthab": "GMT-03:00",
  "America/Montevideo": "GMT-03:00",
  "Atlantic/South_Georgia": "GMT-02:00",
  "Atlantic/Azores": "GMT-01:00",
  "Atlantic/Cape_Verde": "GMT-01:00",
  "Europe/London": "GMT+00:00",
  "Europe/Lisbon": "GMT+00:00",
  "Africa/Monrovia": "GMT+00:00",
  "Etc/UTC": "GMT+00:00",
  "Europe/Amsterdam": "GMT+01:00",
  "Europe/Belgrade": "GMT+01:00",
  "Europe/Berlin": "GMT+01:00",
  "Europe/Zurich": "GMT+01:00",
  "Europe/Bratislava": "GMT+01:00",
  "Europe/Brussels": "GMT+01:00",
  "Europe/Budapest": "GMT+01:00",
  "Africa/Casablanca": "GMT+01:00",
  "Europe/Copenhagen": "GMT+01:00",
  "Europe/Dublin": "GMT+00:00",
  "Europe/Ljubljana": "GMT+01:00",
  "Europe/Madrid": "GMT+01:00",
  "Europe/Paris": "GMT+01:00",
  "Europe/Prague": "GMT+01:00",
  "Europe/Rome": "GMT+01:00",
  "Europe/Sarajevo": "GMT+01:00",
  "Europe/Skopje": "GMT+01:00",
  "Europe/Stockholm": "GMT+01:00",
  "Europe/Vienna": "GMT+01:00",
  "Europe/Warsaw": "GMT+01:00",
  "Africa/Algiers": "GMT+01:00",
  "Europe/Zagreb": "GMT+01:00",
  "Europe/Athens": "GMT+02:00",
  "Europe/Bucharest": "GMT+02:00",
  "Africa/Cairo": "GMT+02:00",
  "Africa/Harare": "GMT+02:00",
  "Europe/Helsinki": "GMT+02:00",
  "Asia/Jerusalem": "GMT+02:00",
  "Europe/Kaliningrad": "GMT+02:00",
  "Europe/Kiev": "GMT+02:00",
  "Africa/Johannesburg": "GMT+02:00",
  "Europe/Riga": "GMT+02:00",
  "Europe/Sofia": "GMT+02:00",
  "Europe/Tallinn": "GMT+02:00",
  "Europe/Vilnius": "GMT+02:00",
  "Asia/Baghdad": "GMT+03:00",
  "Europe/Istanbul": "GMT+03:00",
  "Asia/Kuwait": "GMT+03:00",
  "Europe/Minsk": "GMT+03:00",
  "Europe/Moscow": "GMT+03:00",
  "Africa/Nairobi": "GMT+03:00",
  "Asia/Riyadh": "GMT+03:00",
  "Europe/Volgograd": "GMT+03:00",
  "Asia/Tehran": "GMT+03:30",
  "Asia/Muscat": "GMT+04:00",
  "Asia/Baku": "GMT+04:00",
  "Europe/Samara": "GMT+04:00",
  "Asia/Tbilisi": "GMT+04:00",
  "Asia/Yerevan": "GMT+04:00",
  "Asia/Kabul": "GMT+04:30",
  "Asia/Yekaterinburg": "GMT+05:00",
  "Asia/Karachi": "GMT+05:00",
  "Asia/Tashkent": "GMT+05:00",
  "Asia/Kolkata": "GMT+05:30",
  "Asia/Colombo": "GMT+05:30",
  "Asia/Kathmandu": "GMT+05:45",
  "Asia/Almaty": "GMT+06:00",
  "Asia/Dhaka": "GMT+06:00",
  "Asia/Urumqi": "GMT+06:00",
  "Asia/Rangoon": "GMT+06:30",
  "Asia/Bangkok": "GMT+07:00",
  "Asia/Jakarta": "GMT+07:00",
  "Asia/Krasnoyarsk": "GMT+07:00",
  "Asia/Novosibirsk": "GMT+07:00",
  "Asia/Shanghai": "GMT+08:00",
  "Asia/Chongqing": "GMT+08:00",
  "Asia/Hong_Kong": "GMT+08:00",
  "Asia/Irkutsk": "GMT+08:00",
  "Asia/Kuala_Lumpur": "GMT+08:00",
  "Australia/Perth": "GMT+08:00",
  "Asia/Singapore": "GMT+08:00",
  "Asia/Taipei": "GMT+08:00",
  "Asia/Ulaanbaatar": "GMT+08:00",
  "Asia/Tokyo": "GMT+09:00",
  "Asia/Seoul": "GMT+09:00",
  "Asia/Yakutsk": "GMT+09:00",
  "Australia/Adelaide": "GMT+09:30",
  "Australia/Darwin": "GMT+09:30",
  "Australia/Brisbane": "GMT+10:00",
  "Australia/Melbourne": "GMT+10:00",
  "Pacific/Guam": "GMT+10:00",
  "Australia/Hobart": "GMT+10:00",
  "Pacific/Port_Moresby": "GMT+10:00",
  "Australia/Sydney": "GMT+10:00",
  "Asia/Vladivostok": "GMT+10:00",
  "Asia/Magadan": "GMT+11:00",
  "Pacific/Noumea": "GMT+11:00",
  "Pacific/Guadalcanal": "GMT+11:00",
  "Asia/Srednekolymsk": "GMT+11:00",
  "Pacific/Auckland": "GMT+12:00",
  "Pacific/Fiji": "GMT+12:00",
  "Asia/Kamchatka": "GMT+12:00",
  "Pacific/Majuro": "GMT+12:00",
  "Pacific/Chatham": "GMT+12:45",
  "Pacific/Tongatapu": "GMT+13:00",
  "Pacific/Apia": "GMT+13:00",
  "Pacific/Fakaofo": "GMT+13:00"
};
export {
  ve as Api,
  jm as ApiLoadingHandlerProvider,
  Gm as AuthProvider,
  Dm as AuthorizationProvider,
  Rn as AxiosObservable,
  Kp as BrowserRouter,
  Ud as EventListenersManager,
  ci as LoadingContext,
  Mm as LoadingProvider,
  Np as LocationEffect,
  Wp as Navigate,
  Rs as Outlet,
  Nm as PrivateView,
  kr as RequestHeaderContentType,
  Qo as RouteMiddleware,
  Dp as RouteRenderer,
  km as RouterGenerator,
  lt as RouterHandler,
  Mt as StorageManager,
  Na as StorageManagerClass,
  Fm as TIME_ZONES,
  Hm as TIME_ZONES_GMT,
  Xe as TokenManager,
  Yp as clearObject,
  Po as clearUndefinedProperties,
  Fr as coreConfig,
  Um as createRepository,
  Gp as createRoutePath,
  nm as createVariableWithWatcher,
  rm as emailRegex,
  Jp as emptyObject,
  Ep as findRouteHasPermission,
  Br as formData,
  jp as generatePath,
  di as generateRoutes,
  Lm as lazyComponent,
  Co as makeId,
  tm as objectIdRegex,
  Qp as passwordRegex,
  Yo as pathMatched,
  Zp as phoneNumberRegex,
  Ft as urlEncoded,
  Fp as useActionData,
  Vp as useAsyncError,
  Hp as useAsyncValue,
  $m as useAuthContext,
  Cp as useAuthorization,
  qp as useBeforeUnload,
  wm as useConstructor,
  Sm as useCountDown,
  _m as useCurrentRoute,
  Mp as useDebounceFn,
  Am as useDebounceState,
  bp as useDidUpdate,
  Om as useInterval,
  Pp as useJob,
  li as useLoading,
  Re as useLocation,
  Pn as useMount,
  qt as useNavigate,
  Bp as useNavigation,
  Rm as useOnElementChange,
  ys as useOutlet,
  Up as useOutletContext,
  kp as useParams,
  Pm as usePrevious,
  om as useRole,
  ui as useRoutes,
  zp as useSearchParams,
  xm as useTimeout,
  Rp as useToggle,
  Op as useUnMount,
  am as useUser,
  Cm as useWritableMemo,
  Xp as usernameRegex,
  em as validateAsciiChars,
  Im as withAuthorization,
  Bm as withRoutes
};

var Ts = Object.defineProperty;
var Ps = (e, t, r) => t in e ? Ts(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var ie = (e, t, r) => (Ps(e, typeof t != "symbol" ? t + "" : t, r), r);
import * as b from "react";
import vt, { useState as re, useRef as Be, useEffect as ce, useCallback as K, useMemo as tt, createContext as Xo, useContext as en, memo as Zo, isValidElement as Cs, createElement as Vn } from "react";
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
function jt() {
  return jt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, jt.apply(this, arguments);
}
var Ne;
(function(e) {
  e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
})(Ne || (Ne = {}));
const Hn = "popstate";
function As(e) {
  e === void 0 && (e = {});
  function t(n, o) {
    let {
      pathname: i,
      search: s,
      hash: a
    } = n.location;
    return Cr(
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
    return typeof o == "string" ? o : Ze(o);
  }
  return Ns(t, r, null, e);
}
function N(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function $s() {
  return Math.random().toString(36).substr(2, 8);
}
function Wn(e) {
  return {
    usr: e.state,
    key: e.key
  };
}
function Cr(e, t, r, n) {
  return r === void 0 && (r = null), jt({
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: ""
  }, typeof t == "string" ? rt(t) : t, {
    state: r,
    key: t && t.key || n || $s()
  });
}
function Ze(e) {
  let {
    pathname: t = "/",
    search: r = "",
    hash: n = ""
  } = e;
  return r && r !== "?" && (t += r.charAt(0) === "?" ? r : "?" + r), n && n !== "#" && (t += n.charAt(0) === "#" ? n : "#" + n), t;
}
function rt(e) {
  let t = {};
  if (e) {
    let r = e.indexOf("#");
    r >= 0 && (t.hash = e.substr(r), e = e.substr(0, r));
    let n = e.indexOf("?");
    n >= 0 && (t.search = e.substr(n), e = e.substr(0, n)), e && (t.pathname = e);
  }
  return t;
}
function Ds(e) {
  let t = typeof window < "u" && typeof window.location < "u" && window.location.origin !== "null" ? window.location.origin : window.location.href, r = typeof e == "string" ? e : Ze(e);
  return N(t, "No window.location.(origin|href) available to create URL for href: " + r), new URL(r, t);
}
function Ns(e, t, r, n) {
  n === void 0 && (n = {});
  let {
    window: o = document.defaultView,
    v5Compat: i = !1
  } = n, s = o.history, a = Ne.Pop, u = null;
  function l() {
    a = Ne.Pop, u && u({
      action: a,
      location: h.location
    });
  }
  function c(m, v) {
    a = Ne.Push;
    let p = Cr(h.location, m, v);
    r && r(p, m);
    let T = Wn(p), S = h.createHref(p);
    try {
      s.pushState(T, "", S);
    } catch {
      o.location.assign(S);
    }
    i && u && u({
      action: a,
      location: h.location
    });
  }
  function d(m, v) {
    a = Ne.Replace;
    let p = Cr(h.location, m, v);
    r && r(p, m);
    let T = Wn(p), S = h.createHref(p);
    s.replaceState(T, "", S), i && u && u({
      action: a,
      location: h.location
    });
  }
  let h = {
    get action() {
      return a;
    },
    get location() {
      return e(o, s);
    },
    listen(m) {
      if (u)
        throw new Error("A history only accepts one active listener");
      return o.addEventListener(Hn, l), u = m, () => {
        o.removeEventListener(Hn, l), u = null;
      };
    },
    createHref(m) {
      return t(o, m);
    },
    encodeLocation(m) {
      let v = Ds(typeof m == "string" ? m : Ze(m));
      return {
        pathname: v.pathname,
        search: v.search,
        hash: v.hash
      };
    },
    push: c,
    replace: d,
    go(m) {
      return s.go(m);
    }
  };
  return h;
}
var kn;
(function(e) {
  e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error";
})(kn || (kn = {}));
function Ls(e, t, r) {
  r === void 0 && (r = "/");
  let n = typeof t == "string" ? rt(t) : t, o = ti(n.pathname || "/", r);
  if (o == null)
    return null;
  let i = Qo(e);
  Is(i);
  let s = null;
  for (let a = 0; s == null && a < i.length; ++a)
    s = ks(
      i[a],
      Ys(o)
    );
  return s;
}
function Qo(e, t, r, n) {
  t === void 0 && (t = []), r === void 0 && (r = []), n === void 0 && (n = "");
  let o = (i, s, a) => {
    let u = {
      relativePath: a === void 0 ? i.path || "" : a,
      caseSensitive: i.caseSensitive === !0,
      childrenIndex: s,
      route: i
    };
    u.relativePath.startsWith("/") && (N(u.relativePath.startsWith(n), 'Absolute route path "' + u.relativePath + '" nested under path ' + ('"' + n + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), u.relativePath = u.relativePath.slice(n.length));
    let l = Re([n, u.relativePath]), c = r.concat(u);
    i.children && i.children.length > 0 && (N(
      i.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + l + '".')
    ), Qo(i.children, t, c, l)), !(i.path == null && !i.index) && t.push({
      path: l,
      score: Hs(l, i.index),
      routesMeta: c
    });
  };
  return e.forEach((i, s) => {
    var a;
    if (i.path === "" || !((a = i.path) != null && a.includes("?")))
      o(i, s);
    else
      for (let u of ei(i.path))
        o(i, s, u);
  }), t;
}
function ei(e) {
  let t = e.split("/");
  if (t.length === 0)
    return [];
  let [r, ...n] = t, o = r.endsWith("?"), i = r.replace(/\?$/, "");
  if (n.length === 0)
    return o ? [i, ""] : [i];
  let s = ei(n.join("/")), a = [];
  return a.push(...s.map((u) => u === "" ? i : [i, u].join("/"))), o && a.push(...s), a.map((u) => e.startsWith("/") && u === "" ? "/" : u);
}
function Is(e) {
  e.sort((t, r) => t.score !== r.score ? r.score - t.score : Ws(t.routesMeta.map((n) => n.childrenIndex), r.routesMeta.map((n) => n.childrenIndex)));
}
const js = /^:\w+$/, Ms = 3, Us = 2, Fs = 1, Bs = 10, Vs = -2, qn = (e) => e === "*";
function Hs(e, t) {
  let r = e.split("/"), n = r.length;
  return r.some(qn) && (n += Vs), t && (n += Us), r.filter((o) => !qn(o)).reduce((o, i) => o + (js.test(i) ? Ms : i === "" ? Fs : Bs), n);
}
function Ws(e, t) {
  return e.length === t.length && e.slice(0, -1).every((n, o) => n === t[o]) ? e[e.length - 1] - t[t.length - 1] : 0;
}
function ks(e, t) {
  let {
    routesMeta: r
  } = e, n = {}, o = "/", i = [];
  for (let s = 0; s < r.length; ++s) {
    let a = r[s], u = s === r.length - 1, l = o === "/" ? t : t.slice(o.length) || "/", c = qs({
      path: a.relativePath,
      caseSensitive: a.caseSensitive,
      end: u
    }, l);
    if (!c)
      return null;
    Object.assign(n, c.params);
    let d = a.route;
    i.push({
      params: n,
      pathname: Re([o, c.pathname]),
      pathnameBase: Xs(Re([o, c.pathnameBase])),
      route: d
    }), c.pathnameBase !== "/" && (o = Re([o, c.pathnameBase]));
  }
  return i;
}
function Np(e, t) {
  t === void 0 && (t = {});
  let r = e;
  return r.endsWith("*") && r !== "*" && !r.endsWith("/*") && (Ee(!1, 'Route path "' + r + '" will be treated as if it were ' + ('"' + r.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + r.replace(/\*$/, "/*") + '".')), r = r.replace(/\*$/, "/*")), r.replace(/^:(\w+)/g, (n, o) => (N(t[o] != null, 'Missing ":' + o + '" param'), t[o])).replace(/\/:(\w+)/g, (n, o) => (N(t[o] != null, 'Missing ":' + o + '" param'), "/" + t[o])).replace(/(\/?)\*/, (n, o, i, s) => {
    const a = "*";
    return t[a] == null ? s === "/*" ? "/" : "" : "" + o + t[a];
  });
}
function qs(e, t) {
  typeof e == "string" && (e = {
    path: e,
    caseSensitive: !1,
    end: !0
  });
  let [r, n] = zs(e.path, e.caseSensitive, e.end), o = t.match(r);
  if (!o)
    return null;
  let i = o[0], s = i.replace(/(.)\/+$/, "$1"), a = o.slice(1);
  return {
    params: n.reduce((l, c, d) => {
      if (c === "*") {
        let h = a[d] || "";
        s = i.slice(0, i.length - h.length).replace(/(.)\/+$/, "$1");
      }
      return l[c] = Js(a[d] || "", c), l;
    }, {}),
    pathname: i,
    pathnameBase: s,
    pattern: e
  };
}
function zs(e, t, r) {
  t === void 0 && (t = !1), r === void 0 && (r = !0), Ee(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
  let n = [], o = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^$?{}|()[\]]/g, "\\$&").replace(/\/:(\w+)/g, (s, a) => (n.push(a), "/([^\\/]+)"));
  return e.endsWith("*") ? (n.push("*"), o += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? o += "\\/*$" : e !== "" && e !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, t ? void 0 : "i"), n];
}
function Ys(e) {
  try {
    return decodeURI(e);
  } catch (t) {
    return Ee(!1, 'The URL path "' + e + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + t + ").")), e;
  }
}
function Js(e, t) {
  try {
    return decodeURIComponent(e);
  } catch (r) {
    return Ee(!1, 'The value for the URL param "' + t + '" will not be decoded because' + (' the string "' + e + '" is a malformed URL segment. This is probably') + (" due to a bad percent encoding (" + r + ").")), e;
  }
}
function ti(e, t) {
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
function Gs(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: r,
    search: n = "",
    hash: o = ""
  } = typeof e == "string" ? rt(e) : e;
  return {
    pathname: r ? r.startsWith("/") ? r : Ks(r, t) : t,
    search: Zs(n),
    hash: Qs(o)
  };
}
function Ks(e, t) {
  let r = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((o) => {
    o === ".." ? r.length > 1 && r.pop() : o !== "." && r.push(o);
  }), r.length > 1 ? r.join("/") : "/";
}
function hr(e, t, r, n) {
  return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(n) + "].  Please separate it out to the ") + ("`to." + r + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function ri(e) {
  return e.filter((t, r) => r === 0 || t.route.path && t.route.path.length > 0);
}
function ni(e, t, r, n) {
  n === void 0 && (n = !1);
  let o;
  typeof e == "string" ? o = rt(e) : (o = jt({}, e), N(!o.pathname || !o.pathname.includes("?"), hr("?", "pathname", "search", o)), N(!o.pathname || !o.pathname.includes("#"), hr("#", "pathname", "hash", o)), N(!o.search || !o.search.includes("#"), hr("#", "search", "hash", o)));
  let i = e === "" || o.pathname === "", s = i ? "/" : o.pathname, a;
  if (n || s == null)
    a = r;
  else {
    let d = t.length - 1;
    if (s.startsWith("..")) {
      let h = s.split("/");
      for (; h[0] === ".."; )
        h.shift(), d -= 1;
      o.pathname = h.join("/");
    }
    a = d >= 0 ? t[d] : "/";
  }
  let u = Gs(o, a), l = s && s !== "/" && s.endsWith("/"), c = (i || s === ".") && r.endsWith("/");
  return !u.pathname.endsWith("/") && (l || c) && (u.pathname += "/"), u;
}
const Re = (e) => e.join("/").replace(/\/\/+/g, "/"), Xs = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"), Zs = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, Qs = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e;
class ea {
  constructor(t, r, n, o) {
    o === void 0 && (o = !1), this.status = t, this.statusText = r || "", this.internal = o, n instanceof Error ? (this.data = n.toString(), this.error = n) : this.data = n;
  }
}
function ta(e) {
  return e instanceof ea;
}
const ra = ["post", "put", "patch", "delete"];
[...ra];
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
function Ar() {
  return Ar = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ar.apply(this, arguments);
}
function na(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
const oi = typeof Object.is == "function" ? Object.is : na, {
  useState: oa,
  useEffect: ia,
  useLayoutEffect: sa,
  useDebugValue: aa
} = b;
let zn = !1, Yn = !1;
function ua(e, t, r) {
  process.env.NODE_ENV !== "production" && (zn || "startTransition" in b && (zn = !0, console.error("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release.")));
  const n = t();
  if (process.env.NODE_ENV !== "production" && !Yn) {
    const s = t();
    oi(n, s) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), Yn = !0);
  }
  const [{
    inst: o
  }, i] = oa({
    inst: {
      value: n,
      getSnapshot: t
    }
  });
  return sa(() => {
    o.value = n, o.getSnapshot = t, pr(o) && i({
      inst: o
    });
  }, [e, n, t]), ia(() => (pr(o) && i({
    inst: o
  }), e(() => {
    pr(o) && i({
      inst: o
    });
  })), [e]), aa(n), n;
}
function pr(e) {
  const t = e.getSnapshot, r = e.value;
  try {
    const n = t();
    return !oi(r, n);
  } catch {
    return !0;
  }
}
function ca(e, t, r) {
  return t();
}
const la = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", fa = !la, da = fa ? ca : ua;
"useSyncExternalStore" in b && ((e) => e.useSyncExternalStore)(b);
const ii = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (ii.displayName = "DataStaticRouterContext");
const tn = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (tn.displayName = "DataRouter");
const gt = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (gt.displayName = "DataRouterState");
const rn = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (rn.displayName = "Await");
const je = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (je.displayName = "Navigation");
const yt = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (yt.displayName = "Location");
const pe = /* @__PURE__ */ b.createContext({
  outlet: null,
  matches: []
});
process.env.NODE_ENV !== "production" && (pe.displayName = "Route");
const nn = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (nn.displayName = "RouteError");
function ha(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t;
  nt() || (process.env.NODE_ENV !== "production" ? N(
    !1,
    "useHref() may be used only in the context of a <Router> component."
  ) : N(!1));
  let {
    basename: n,
    navigator: o
  } = b.useContext(je), {
    hash: i,
    pathname: s,
    search: a
  } = Jt(e, {
    relative: r
  }), u = s;
  return n !== "/" && (u = s === "/" ? n : Re([n, s])), o.createHref({
    pathname: u,
    search: a,
    hash: i
  });
}
function nt() {
  return b.useContext(yt) != null;
}
function Pe() {
  return nt() || (process.env.NODE_ENV !== "production" ? N(
    !1,
    "useLocation() may be used only in the context of a <Router> component."
  ) : N(!1)), b.useContext(yt).location;
}
function Yt() {
  nt() || (process.env.NODE_ENV !== "production" ? N(
    !1,
    "useNavigate() may be used only in the context of a <Router> component."
  ) : N(!1));
  let {
    basename: e,
    navigator: t
  } = b.useContext(je), {
    matches: r
  } = b.useContext(pe), {
    pathname: n
  } = Pe(), o = JSON.stringify(ri(r).map((a) => a.pathnameBase)), i = b.useRef(!1);
  return b.useEffect(() => {
    i.current = !0;
  }), b.useCallback(function(a, u) {
    if (u === void 0 && (u = {}), process.env.NODE_ENV !== "production" && Ee(i.current, "You should call navigate() in a React.useEffect(), not when your component is first rendered."), !i.current)
      return;
    if (typeof a == "number") {
      t.go(a);
      return;
    }
    let l = ni(a, JSON.parse(o), n, u.relative === "path");
    e !== "/" && (l.pathname = l.pathname === "/" ? e : Re([e, l.pathname])), (u.replace ? t.replace : t.push)(l, u.state, u);
  }, [e, t, o, n]);
}
const si = /* @__PURE__ */ b.createContext(null);
function Lp() {
  return b.useContext(si);
}
function pa(e) {
  let t = b.useContext(pe).outlet;
  return t && /* @__PURE__ */ b.createElement(si.Provider, {
    value: e
  }, t);
}
function Ip() {
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
  } = Pe(), i = JSON.stringify(ri(n).map((s) => s.pathnameBase));
  return b.useMemo(() => ni(e, JSON.parse(i), o, r === "path"), [e, i, o, r]);
}
function ma(e, t) {
  nt() || (process.env.NODE_ENV !== "production" ? N(
    !1,
    "useRoutes() may be used only in the context of a <Router> component."
  ) : N(!1));
  let {
    navigator: r
  } = b.useContext(je), n = b.useContext(gt), {
    matches: o
  } = b.useContext(pe), i = o[o.length - 1], s = i ? i.params : {}, a = i ? i.pathname : "/", u = i ? i.pathnameBase : "/", l = i && i.route;
  if (process.env.NODE_ENV !== "production") {
    let S = l && l.path || "";
    _a(a, !l || S.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + a + '" (under <Route path="' + S + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + S + '"> to <Route ') + ('path="' + (S === "/" ? "*" : S + "/*") + '">.'));
  }
  let c = Pe(), d;
  if (t) {
    var h;
    let S = typeof t == "string" ? rt(t) : t;
    u === "/" || (h = S.pathname) != null && h.startsWith(u) || (process.env.NODE_ENV !== "production" ? N(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + u + '" ') + ('but pathname "' + S.pathname + '" was given in the `location` prop.')) : N(!1)), d = S;
  } else
    d = c;
  let m = d.pathname || "/", v = u === "/" ? m : m.slice(u.length) || "/", p = Ls(e, {
    pathname: v
  });
  process.env.NODE_ENV !== "production" && (process.env.NODE_ENV !== "production" && Ee(l || p != null, 'No routes matched location "' + d.pathname + d.search + d.hash + '" '), process.env.NODE_ENV !== "production" && Ee(p == null || p[p.length - 1].route.element !== void 0, 'Matched leaf route at location "' + d.pathname + d.search + d.hash + '" does not have an element. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.'));
  let T = ba(p && p.map((S) => Object.assign({}, S, {
    params: Object.assign({}, s, S.params),
    pathname: Re([
      u,
      r.encodeLocation ? r.encodeLocation(S.pathname).pathname : S.pathname
    ]),
    pathnameBase: S.pathnameBase === "/" ? u : Re([
      u,
      r.encodeLocation ? r.encodeLocation(S.pathnameBase).pathname : S.pathnameBase
    ])
  })), o, n || void 0);
  return t && T ? /* @__PURE__ */ b.createElement(yt.Provider, {
    value: {
      location: Ar({
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default"
      }, d),
      navigationType: Ne.Pop
    }
  }, T) : T;
}
function va() {
  let e = Sa(), t = ta(e) ? e.status + " " + e.statusText : e instanceof Error ? e.message : JSON.stringify(e), r = e instanceof Error ? e.stack : null, n = "rgba(200,200,200, 0.5)", o = {
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
class ga extends b.Component {
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
    }, /* @__PURE__ */ b.createElement(nn.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function ya(e) {
  let {
    routeContext: t,
    match: r,
    children: n
  } = e, o = b.useContext(ii);
  return o && r.route.errorElement && (o._deepestRenderedBoundaryId = r.route.id), /* @__PURE__ */ b.createElement(pe.Provider, {
    value: t
  }, n);
}
function ba(e, t, r) {
  if (t === void 0 && (t = []), e == null)
    if (r != null && r.errors)
      e = r.matches;
    else
      return null;
  let n = e, o = r == null ? void 0 : r.errors;
  if (o != null) {
    let i = n.findIndex((s) => s.route.id && (o == null ? void 0 : o[s.route.id]));
    i >= 0 || (process.env.NODE_ENV !== "production" ? N(!1, "Could not find a matching route for the current errors: " + o) : N(!1)), n = n.slice(0, Math.min(n.length, i + 1));
  }
  return n.reduceRight((i, s, a) => {
    let u = s.route.id ? o == null ? void 0 : o[s.route.id] : null, l = r ? s.route.errorElement || /* @__PURE__ */ b.createElement(va, null) : null, c = t.concat(n.slice(0, a + 1)), d = () => /* @__PURE__ */ b.createElement(ya, {
      match: s,
      routeContext: {
        outlet: i,
        matches: c
      }
    }, u ? l : s.route.element !== void 0 ? s.route.element : i);
    return r && (s.route.errorElement || a === 0) ? /* @__PURE__ */ b.createElement(ga, {
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
var Jn;
(function(e) {
  e.UseRevalidator = "useRevalidator";
})(Jn || (Jn = {}));
var Qe;
(function(e) {
  e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator";
})(Qe || (Qe = {}));
function ai(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function on(e) {
  let t = b.useContext(gt);
  return t || (process.env.NODE_ENV !== "production" ? N(!1, ai(e)) : N(!1)), t;
}
function Ea(e) {
  let t = b.useContext(pe);
  return t || (process.env.NODE_ENV !== "production" ? N(!1, ai(e)) : N(!1)), t;
}
function wa(e) {
  let t = Ea(e), r = t.matches[t.matches.length - 1];
  return r.route.id || (process.env.NODE_ENV !== "production" ? N(!1, e + ' can only be used on routes that contain a unique "id"') : N(!1)), r.route.id;
}
function jp() {
  return on(Qe.UseNavigation).navigation;
}
function Mp() {
  let e = on(Qe.UseActionData);
  return b.useContext(pe) || (process.env.NODE_ENV !== "production" ? N(!1, "useActionData must be used inside a RouteContext") : N(!1)), Object.values((e == null ? void 0 : e.actionData) || {})[0];
}
function Sa() {
  var e;
  let t = b.useContext(nn), r = on(Qe.UseRouteError), n = wa(Qe.UseRouteError);
  return t || ((e = r.errors) == null ? void 0 : e[n]);
}
function Up() {
  let e = b.useContext(rn);
  return e == null ? void 0 : e._data;
}
function Fp() {
  let e = b.useContext(rn);
  return e == null ? void 0 : e._error;
}
const Gn = {};
function _a(e, t, r) {
  !t && !Gn[e] && (Gn[e] = !0, process.env.NODE_ENV !== "production" && Ee(!1, r));
}
function Bp(e) {
  let {
    to: t,
    replace: r,
    state: n,
    relative: o
  } = e;
  nt() || (process.env.NODE_ENV !== "production" ? N(
    !1,
    "<Navigate> may be used only in the context of a <Router> component."
  ) : N(!1)), process.env.NODE_ENV !== "production" && Ee(!b.useContext(je).static, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
  let i = b.useContext(gt), s = Yt();
  return b.useEffect(() => {
    i && i.navigation.state !== "idle" || s(t, {
      replace: r,
      state: n,
      relative: o
    });
  }), null;
}
function Oa(e) {
  return pa(e.context);
}
function Mt(e) {
  process.env.NODE_ENV !== "production" ? N(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.") : N(!1);
}
function Ra(e) {
  let {
    basename: t = "/",
    children: r = null,
    location: n,
    navigationType: o = Ne.Pop,
    navigator: i,
    static: s = !1
  } = e;
  nt() && (process.env.NODE_ENV !== "production" ? N(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.") : N(!1));
  let a = t.replace(/^\/*/, "/"), u = b.useMemo(() => ({
    basename: a,
    navigator: i,
    static: s
  }), [a, i, s]);
  typeof n == "string" && (n = rt(n));
  let {
    pathname: l = "/",
    search: c = "",
    hash: d = "",
    state: h = null,
    key: m = "default"
  } = n, v = b.useMemo(() => {
    let p = ti(l, a);
    return p == null ? null : {
      pathname: p,
      search: c,
      hash: d,
      state: h,
      key: m
    };
  }, [a, l, c, d, h, m]);
  return process.env.NODE_ENV !== "production" && Ee(v != null, '<Router basename="' + a + '"> is not able to match the URL ' + ('"' + l + c + d + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), v == null ? null : /* @__PURE__ */ b.createElement(je.Provider, {
    value: u
  }, /* @__PURE__ */ b.createElement(yt.Provider, {
    children: r,
    value: {
      location: v,
      navigationType: o
    }
  }));
}
function xa(e) {
  let {
    children: t,
    location: r
  } = e, n = b.useContext(tn), o = n && !t ? n.router.routes : $r(t);
  return ma(o, r);
}
var Kn;
(function(e) {
  e[e.pending = 0] = "pending", e[e.success = 1] = "success", e[e.error = 2] = "error";
})(Kn || (Kn = {}));
new Promise(() => {
});
function $r(e, t) {
  t === void 0 && (t = []);
  let r = [];
  return b.Children.forEach(e, (n, o) => {
    if (!/* @__PURE__ */ b.isValidElement(n))
      return;
    if (n.type === b.Fragment) {
      r.push.apply(r, $r(n.props.children, t));
      return;
    }
    n.type !== Mt && (process.env.NODE_ENV !== "production" ? N(!1, "[" + (typeof n.type == "string" ? n.type : n.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>") : N(!1)), !n.props.index || !n.props.children || (process.env.NODE_ENV !== "production" ? N(!1, "An index route cannot have child routes.") : N(!1));
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
    n.props.children && (s.children = $r(n.props.children, i)), r.push(s);
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
function Ve() {
  return Ve = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ve.apply(this, arguments);
}
function sn(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), o, i;
  for (i = 0; i < n.length; i++)
    o = n[i], !(t.indexOf(o) >= 0) && (r[o] = e[o]);
  return r;
}
const Ct = "get", mr = "application/x-www-form-urlencoded";
function Gt(e) {
  return e != null && typeof e.tagName == "string";
}
function Ta(e) {
  return Gt(e) && e.tagName.toLowerCase() === "button";
}
function Pa(e) {
  return Gt(e) && e.tagName.toLowerCase() === "form";
}
function Ca(e) {
  return Gt(e) && e.tagName.toLowerCase() === "input";
}
function Aa(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function $a(e, t) {
  return e.button === 0 && (!t || t === "_self") && !Aa(e);
}
function Dr(e) {
  return e === void 0 && (e = ""), new URLSearchParams(typeof e == "string" || Array.isArray(e) || e instanceof URLSearchParams ? e : Object.keys(e).reduce((t, r) => {
    let n = e[r];
    return t.concat(Array.isArray(n) ? n.map((o) => [r, o]) : [[r, n]]);
  }, []));
}
function Da(e, t) {
  let r = Dr(e);
  for (let n of t.keys())
    r.has(n) || t.getAll(n).forEach((o) => {
      r.append(n, o);
    });
  return r;
}
function Na(e, t, r) {
  let n, o, i, s;
  if (Pa(e)) {
    let c = r.submissionTrigger;
    n = r.method || e.getAttribute("method") || Ct, o = r.action || e.getAttribute("action") || t, i = r.encType || e.getAttribute("enctype") || mr, s = new FormData(e), c && c.name && s.append(c.name, c.value);
  } else if (Ta(e) || Ca(e) && (e.type === "submit" || e.type === "image")) {
    let c = e.form;
    if (c == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    n = r.method || e.getAttribute("formmethod") || c.getAttribute("method") || Ct, o = r.action || e.getAttribute("formaction") || c.getAttribute("action") || t, i = r.encType || e.getAttribute("formenctype") || c.getAttribute("enctype") || mr, s = new FormData(c), e.name && s.append(e.name, e.value);
  } else {
    if (Gt(e))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    if (n = r.method || Ct, o = r.action || t, i = r.encType || mr, e instanceof FormData)
      s = e;
    else if (s = new FormData(), e instanceof URLSearchParams)
      for (let [c, d] of e)
        s.append(c, d);
    else if (e != null)
      for (let c of Object.keys(e))
        s.append(c, e[c]);
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
const La = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset"], Ia = ["aria-current", "caseSensitive", "className", "end", "style", "to", "children"], ja = ["reloadDocument", "replace", "method", "action", "onSubmit", "fetcherKey", "routeId", "relative"];
function Vp(e) {
  let {
    basename: t,
    children: r,
    window: n
  } = e, o = b.useRef();
  o.current == null && (o.current = As({
    window: n,
    v5Compat: !0
  }));
  let i = o.current, [s, a] = b.useState({
    action: i.action,
    location: i.location
  });
  return b.useLayoutEffect(() => i.listen(a), [i]), /* @__PURE__ */ b.createElement(Ra, {
    basename: t,
    children: r,
    location: s.location,
    navigationType: s.action,
    navigator: i
  });
}
process.env.NODE_ENV;
const ui = /* @__PURE__ */ b.forwardRef(function(t, r) {
  let {
    onClick: n,
    relative: o,
    reloadDocument: i,
    replace: s,
    state: a,
    target: u,
    to: l,
    preventScrollReset: c
  } = t, d = sn(t, La), h = ha(l, {
    relative: o
  }), m = Va(l, {
    replace: s,
    state: a,
    target: u,
    preventScrollReset: c,
    relative: o
  });
  function v(p) {
    n && n(p), p.defaultPrevented || m(p);
  }
  return /* @__PURE__ */ b.createElement("a", Ve({}, d, {
    href: h,
    onClick: i ? n : v,
    ref: r,
    target: u
  }));
});
process.env.NODE_ENV !== "production" && (ui.displayName = "Link");
const Ma = /* @__PURE__ */ b.forwardRef(function(t, r) {
  let {
    "aria-current": n = "page",
    caseSensitive: o = !1,
    className: i = "",
    end: s = !1,
    style: a,
    to: u,
    children: l
  } = t, c = sn(t, Ia), d = Jt(u, {
    relative: c.relative
  }), h = Pe(), m = b.useContext(gt), {
    navigator: v
  } = b.useContext(je), p = v.encodeLocation ? v.encodeLocation(d).pathname : d.pathname, T = h.pathname, S = m && m.navigation && m.navigation.location ? m.navigation.location.pathname : null;
  o || (T = T.toLowerCase(), S = S ? S.toLowerCase() : null, p = p.toLowerCase());
  let j = T === p || !s && T.startsWith(p) && T.charAt(p.length) === "/", R = S != null && (S === p || !s && S.startsWith(p) && S.charAt(p.length) === "/"), x = j ? n : void 0, I;
  typeof i == "function" ? I = i({
    isActive: j,
    isPending: R
  }) : I = [i, j ? "active" : null, R ? "pending" : null].filter(Boolean).join(" ");
  let P = typeof a == "function" ? a({
    isActive: j,
    isPending: R
  }) : a;
  return /* @__PURE__ */ b.createElement(ui, Ve({}, c, {
    "aria-current": x,
    className: I,
    ref: r,
    style: P,
    to: u
  }), typeof l == "function" ? l({
    isActive: j,
    isPending: R
  }) : l);
});
process.env.NODE_ENV !== "production" && (Ma.displayName = "NavLink");
const Ua = /* @__PURE__ */ b.forwardRef((e, t) => /* @__PURE__ */ b.createElement(ci, Ve({}, e, {
  ref: t
})));
process.env.NODE_ENV !== "production" && (Ua.displayName = "Form");
const ci = /* @__PURE__ */ b.forwardRef((e, t) => {
  let {
    reloadDocument: r,
    replace: n,
    method: o = Ct,
    action: i,
    onSubmit: s,
    fetcherKey: a,
    routeId: u,
    relative: l
  } = e, c = sn(e, ja), d = Ha(a, u), h = o.toLowerCase() === "get" ? "get" : "post", m = li(i, {
    relative: l
  }), v = (p) => {
    if (s && s(p), p.defaultPrevented)
      return;
    p.preventDefault();
    let T = p.nativeEvent.submitter, S = (T == null ? void 0 : T.getAttribute("formmethod")) || o;
    d(T || p.currentTarget, {
      method: S,
      replace: n,
      relative: l
    });
  };
  return /* @__PURE__ */ b.createElement("form", Ve({
    ref: t,
    method: h,
    action: m,
    onSubmit: r ? s : v
  }, c));
});
process.env.NODE_ENV !== "production" && (ci.displayName = "FormImpl");
process.env.NODE_ENV;
var Nr;
(function(e) {
  e.UseScrollRestoration = "useScrollRestoration", e.UseSubmitImpl = "useSubmitImpl", e.UseFetcher = "useFetcher";
})(Nr || (Nr = {}));
var Xn;
(function(e) {
  e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration";
})(Xn || (Xn = {}));
function Fa(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function Ba(e) {
  let t = b.useContext(tn);
  return t || (process.env.NODE_ENV !== "production" ? N(!1, Fa(e)) : N(!1)), t;
}
function Va(e, t) {
  let {
    target: r,
    replace: n,
    state: o,
    preventScrollReset: i,
    relative: s
  } = t === void 0 ? {} : t, a = Yt(), u = Pe(), l = Jt(e, {
    relative: s
  });
  return b.useCallback((c) => {
    if ($a(c, r)) {
      c.preventDefault();
      let d = n !== void 0 ? n : Ze(u) === Ze(l);
      a(e, {
        replace: d,
        state: o,
        preventScrollReset: i,
        relative: s
      });
    }
  }, [u, a, l, n, o, r, e, i, s]);
}
function Hp(e) {
  process.env.NODE_ENV !== "production" && Wa(typeof URLSearchParams < "u", "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params\n\nIf you're unsure how to load polyfills, we recommend you check out https://polyfill.io/v3/ which provides some recommendations about how to load polyfills only for users that need them, instead of for every user.");
  let t = b.useRef(Dr(e)), r = Pe(), n = b.useMemo(() => Da(r.search, t.current), [r.search]), o = Yt(), i = b.useCallback((s, a) => {
    const u = Dr(typeof s == "function" ? s(n) : s);
    o("?" + u, a);
  }, [o, n]);
  return [n, i];
}
function Ha(e, t) {
  let {
    router: r
  } = Ba(Nr.UseSubmitImpl), n = li();
  return b.useCallback(function(o, i) {
    if (i === void 0 && (i = {}), typeof document > "u")
      throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
    let {
      method: s,
      encType: a,
      formData: u,
      url: l
    } = Na(o, n, i), c = l.pathname + l.search, d = {
      replace: i.replace,
      formData: u,
      formMethod: s,
      formEncType: a
    };
    e ? (t == null && (process.env.NODE_ENV !== "production" ? N(!1, "No routeId available for useFetcher()") : N(!1)), r.fetch(e, t, c, d)) : r.navigate(c, d);
  }, [n, r, e, t]);
}
function li(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t, {
    basename: n
  } = b.useContext(je), o = b.useContext(pe);
  o || (process.env.NODE_ENV !== "production" ? N(!1, "useFormAction must be used inside a RouteContext") : N(!1));
  let [i] = o.matches.slice(-1), s = Ve({}, Jt(e || ".", {
    relative: r
  })), a = Pe();
  if (e == null && (s.search = a.search, s.hash = a.hash, i.route.index)) {
    let u = new URLSearchParams(s.search);
    u.delete("index"), s.search = u.toString() ? "?" + u.toString() : "";
  }
  return (!e || e === ".") && i.route.index && (s.search = s.search ? s.search.replace(/^\?/, "?index&") : "?index"), n !== "/" && (s.pathname = s.pathname === "/" ? n : Re([n, s.pathname])), Ze(s);
}
function Wp(e) {
  b.useEffect(() => (window.addEventListener("beforeunload", e), () => {
    window.removeEventListener("beforeunload", e);
  }), [e]);
}
function Wa(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
var ka = typeof global == "object" && global && global.Object === Object && global;
const fi = ka;
var qa = typeof self == "object" && self && self.Object === Object && self, za = fi || qa || Function("return this")();
const me = za;
var Ya = me.Symbol;
const Le = Ya;
var di = Object.prototype, Ja = di.hasOwnProperty, Ga = di.toString, at = Le ? Le.toStringTag : void 0;
function Ka(e) {
  var t = Ja.call(e, at), r = e[at];
  try {
    e[at] = void 0;
    var n = !0;
  } catch {
  }
  var o = Ga.call(e);
  return n && (t ? e[at] = r : delete e[at]), o;
}
var Xa = Object.prototype, Za = Xa.toString;
function Qa(e) {
  return Za.call(e);
}
var eu = "[object Null]", tu = "[object Undefined]", Zn = Le ? Le.toStringTag : void 0;
function ke(e) {
  return e == null ? e === void 0 ? tu : eu : Zn && Zn in Object(e) ? Ka(e) : Qa(e);
}
function Ie(e) {
  return e != null && typeof e == "object";
}
var ru = "[object Symbol]";
function Kt(e) {
  return typeof e == "symbol" || Ie(e) && ke(e) == ru;
}
function nu(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, o = Array(n); ++r < n; )
    o[r] = t(e[r], r, e);
  return o;
}
var ou = Array.isArray;
const de = ou;
var iu = 1 / 0, Qn = Le ? Le.prototype : void 0, eo = Qn ? Qn.toString : void 0;
function hi(e) {
  if (typeof e == "string")
    return e;
  if (de(e))
    return nu(e, hi) + "";
  if (Kt(e))
    return eo ? eo.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -iu ? "-0" : t;
}
var su = /\s/;
function au(e) {
  for (var t = e.length; t-- && su.test(e.charAt(t)); )
    ;
  return t;
}
var uu = /^\s+/;
function cu(e) {
  return e && e.slice(0, au(e) + 1).replace(uu, "");
}
function he(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var to = 0 / 0, lu = /^[-+]0x[0-9a-f]+$/i, fu = /^0b[01]+$/i, du = /^0o[0-7]+$/i, hu = parseInt;
function ro(e) {
  if (typeof e == "number")
    return e;
  if (Kt(e))
    return to;
  if (he(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = he(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = cu(e);
  var r = fu.test(e);
  return r || du.test(e) ? hu(e.slice(2), r ? 2 : 8) : lu.test(e) ? to : +e;
}
function an(e) {
  return e;
}
var pu = "[object AsyncFunction]", mu = "[object Function]", vu = "[object GeneratorFunction]", gu = "[object Proxy]";
function un(e) {
  if (!he(e))
    return !1;
  var t = ke(e);
  return t == mu || t == vu || t == pu || t == gu;
}
var yu = me["__core-js_shared__"];
const vr = yu;
var no = function() {
  var e = /[^.]+$/.exec(vr && vr.keys && vr.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function bu(e) {
  return !!no && no in e;
}
var Eu = Function.prototype, wu = Eu.toString;
function qe(e) {
  if (e != null) {
    try {
      return wu.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Su = /[\\^$.*+?()[\]{}|]/g, _u = /^\[object .+?Constructor\]$/, Ou = Function.prototype, Ru = Object.prototype, xu = Ou.toString, Tu = Ru.hasOwnProperty, Pu = RegExp(
  "^" + xu.call(Tu).replace(Su, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Cu(e) {
  if (!he(e) || bu(e))
    return !1;
  var t = un(e) ? Pu : _u;
  return t.test(qe(e));
}
function Au(e, t) {
  return e == null ? void 0 : e[t];
}
function ze(e, t) {
  var r = Au(e, t);
  return Cu(r) ? r : void 0;
}
var $u = ze(me, "WeakMap");
const Lr = $u;
var oo = Object.create, Du = function() {
  function e() {
  }
  return function(t) {
    if (!he(t))
      return {};
    if (oo)
      return oo(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}();
const Nu = Du;
function Lu(e, t, r) {
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
function Iu() {
}
function ju(e, t) {
  var r = -1, n = e.length;
  for (t || (t = Array(n)); ++r < n; )
    t[r] = e[r];
  return t;
}
var Mu = 800, Uu = 16, Fu = Date.now;
function Bu(e) {
  var t = 0, r = 0;
  return function() {
    var n = Fu(), o = Uu - (n - r);
    if (r = n, o > 0) {
      if (++t >= Mu)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function Vu(e) {
  return function() {
    return e;
  };
}
var Hu = function() {
  try {
    var e = ze(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
const Ut = Hu;
var Wu = Ut ? function(e, t) {
  return Ut(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Vu(t),
    writable: !0
  });
} : an;
const ku = Wu;
var qu = Bu(ku);
const zu = qu;
function Yu(e, t, r, n) {
  for (var o = e.length, i = r + (n ? 1 : -1); n ? i-- : ++i < o; )
    if (t(e[i], i, e))
      return i;
  return -1;
}
function Ju(e) {
  return e !== e;
}
function Gu(e, t, r) {
  for (var n = r - 1, o = e.length; ++n < o; )
    if (e[n] === t)
      return n;
  return -1;
}
function Ku(e, t, r) {
  return t === t ? Gu(e, t, r) : Yu(e, Ju, r);
}
function Xu(e, t) {
  var r = e == null ? 0 : e.length;
  return !!r && Ku(e, t, 0) > -1;
}
var Zu = 9007199254740991, Qu = /^(?:0|[1-9]\d*)$/;
function cn(e, t) {
  var r = typeof e;
  return t = t ?? Zu, !!t && (r == "number" || r != "symbol" && Qu.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function Xt(e, t, r) {
  t == "__proto__" && Ut ? Ut(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
function bt(e, t) {
  return e === t || e !== e && t !== t;
}
var ec = Object.prototype, tc = ec.hasOwnProperty;
function rc(e, t, r) {
  var n = e[t];
  (!(tc.call(e, t) && bt(n, r)) || r === void 0 && !(t in e)) && Xt(e, t, r);
}
function nc(e, t, r, n) {
  var o = !r;
  r || (r = {});
  for (var i = -1, s = t.length; ++i < s; ) {
    var a = t[i], u = n ? n(r[a], e[a], a, r, e) : void 0;
    u === void 0 && (u = e[a]), o ? Xt(r, a, u) : rc(r, a, u);
  }
  return r;
}
var io = Math.max;
function oc(e, t, r) {
  return t = io(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var n = arguments, o = -1, i = io(n.length - t, 0), s = Array(i); ++o < i; )
      s[o] = n[t + o];
    o = -1;
    for (var a = Array(t + 1); ++o < t; )
      a[o] = n[o];
    return a[t] = r(s), Lu(e, this, a);
  };
}
function ic(e, t) {
  return zu(oc(e, t, an), e + "");
}
var sc = 9007199254740991;
function ln(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= sc;
}
function Zt(e) {
  return e != null && ln(e.length) && !un(e);
}
function ac(e, t, r) {
  if (!he(r))
    return !1;
  var n = typeof t;
  return (n == "number" ? Zt(r) && cn(t, r.length) : n == "string" && t in r) ? bt(r[t], e) : !1;
}
function uc(e) {
  return ic(function(t, r) {
    var n = -1, o = r.length, i = o > 1 ? r[o - 1] : void 0, s = o > 2 ? r[2] : void 0;
    for (i = e.length > 3 && typeof i == "function" ? (o--, i) : void 0, s && ac(r[0], r[1], s) && (i = o < 3 ? void 0 : i, o = 1), t = Object(t); ++n < o; ) {
      var a = r[n];
      a && e(t, a, n, i);
    }
    return t;
  });
}
var cc = Object.prototype;
function fn(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || cc;
  return e === r;
}
function lc(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var fc = "[object Arguments]";
function so(e) {
  return Ie(e) && ke(e) == fc;
}
var pi = Object.prototype, dc = pi.hasOwnProperty, hc = pi.propertyIsEnumerable, pc = so(function() {
  return arguments;
}()) ? so : function(e) {
  return Ie(e) && dc.call(e, "callee") && !hc.call(e, "callee");
};
const Ft = pc;
function mc() {
  return !1;
}
var mi = typeof exports == "object" && exports && !exports.nodeType && exports, ao = mi && typeof module == "object" && module && !module.nodeType && module, vc = ao && ao.exports === mi, uo = vc ? me.Buffer : void 0, gc = uo ? uo.isBuffer : void 0, yc = gc || mc;
const Bt = yc;
var bc = "[object Arguments]", Ec = "[object Array]", wc = "[object Boolean]", Sc = "[object Date]", _c = "[object Error]", Oc = "[object Function]", Rc = "[object Map]", xc = "[object Number]", Tc = "[object Object]", Pc = "[object RegExp]", Cc = "[object Set]", Ac = "[object String]", $c = "[object WeakMap]", Dc = "[object ArrayBuffer]", Nc = "[object DataView]", Lc = "[object Float32Array]", Ic = "[object Float64Array]", jc = "[object Int8Array]", Mc = "[object Int16Array]", Uc = "[object Int32Array]", Fc = "[object Uint8Array]", Bc = "[object Uint8ClampedArray]", Vc = "[object Uint16Array]", Hc = "[object Uint32Array]", J = {};
J[Lc] = J[Ic] = J[jc] = J[Mc] = J[Uc] = J[Fc] = J[Bc] = J[Vc] = J[Hc] = !0;
J[bc] = J[Ec] = J[Dc] = J[wc] = J[Nc] = J[Sc] = J[_c] = J[Oc] = J[Rc] = J[xc] = J[Tc] = J[Pc] = J[Cc] = J[Ac] = J[$c] = !1;
function Wc(e) {
  return Ie(e) && ln(e.length) && !!J[ke(e)];
}
function kc(e) {
  return function(t) {
    return e(t);
  };
}
var vi = typeof exports == "object" && exports && !exports.nodeType && exports, lt = vi && typeof module == "object" && module && !module.nodeType && module, qc = lt && lt.exports === vi, gr = qc && fi.process, zc = function() {
  try {
    var e = lt && lt.require && lt.require("util").types;
    return e || gr && gr.binding && gr.binding("util");
  } catch {
  }
}();
const co = zc;
var lo = co && co.isTypedArray, Yc = lo ? kc(lo) : Wc;
const dn = Yc;
var Jc = Object.prototype, Gc = Jc.hasOwnProperty;
function gi(e, t) {
  var r = de(e), n = !r && Ft(e), o = !r && !n && Bt(e), i = !r && !n && !o && dn(e), s = r || n || o || i, a = s ? lc(e.length, String) : [], u = a.length;
  for (var l in e)
    (t || Gc.call(e, l)) && !(s && (l == "length" || o && (l == "offset" || l == "parent") || i && (l == "buffer" || l == "byteLength" || l == "byteOffset") || cn(l, u))) && a.push(l);
  return a;
}
function yi(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var Kc = yi(Object.keys, Object);
const Xc = Kc;
var Zc = Object.prototype, Qc = Zc.hasOwnProperty;
function el(e) {
  if (!fn(e))
    return Xc(e);
  var t = [];
  for (var r in Object(e))
    Qc.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
function hn(e) {
  return Zt(e) ? gi(e) : el(e);
}
function tl(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var rl = Object.prototype, nl = rl.hasOwnProperty;
function ol(e) {
  if (!he(e))
    return tl(e);
  var t = fn(e), r = [];
  for (var n in e)
    n == "constructor" && (t || !nl.call(e, n)) || r.push(n);
  return r;
}
function bi(e) {
  return Zt(e) ? gi(e, !0) : ol(e);
}
var il = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, sl = /^\w*$/;
function pn(e, t) {
  if (de(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || Kt(e) ? !0 : sl.test(e) || !il.test(e) || t != null && e in Object(t);
}
var al = ze(Object, "create");
const ft = al;
function ul() {
  this.__data__ = ft ? ft(null) : {}, this.size = 0;
}
function cl(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var ll = "__lodash_hash_undefined__", fl = Object.prototype, dl = fl.hasOwnProperty;
function hl(e) {
  var t = this.__data__;
  if (ft) {
    var r = t[e];
    return r === ll ? void 0 : r;
  }
  return dl.call(t, e) ? t[e] : void 0;
}
var pl = Object.prototype, ml = pl.hasOwnProperty;
function vl(e) {
  var t = this.__data__;
  return ft ? t[e] !== void 0 : ml.call(t, e);
}
var gl = "__lodash_hash_undefined__";
function yl(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = ft && t === void 0 ? gl : t, this;
}
function He(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
He.prototype.clear = ul;
He.prototype.delete = cl;
He.prototype.get = hl;
He.prototype.has = vl;
He.prototype.set = yl;
function bl() {
  this.__data__ = [], this.size = 0;
}
function Qt(e, t) {
  for (var r = e.length; r--; )
    if (bt(e[r][0], t))
      return r;
  return -1;
}
var El = Array.prototype, wl = El.splice;
function Sl(e) {
  var t = this.__data__, r = Qt(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : wl.call(t, r, 1), --this.size, !0;
}
function _l(e) {
  var t = this.__data__, r = Qt(t, e);
  return r < 0 ? void 0 : t[r][1];
}
function Ol(e) {
  return Qt(this.__data__, e) > -1;
}
function Rl(e, t) {
  var r = this.__data__, n = Qt(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
function Ce(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Ce.prototype.clear = bl;
Ce.prototype.delete = Sl;
Ce.prototype.get = _l;
Ce.prototype.has = Ol;
Ce.prototype.set = Rl;
var xl = ze(me, "Map");
const dt = xl;
function Tl() {
  this.size = 0, this.__data__ = {
    hash: new He(),
    map: new (dt || Ce)(),
    string: new He()
  };
}
function Pl(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function er(e, t) {
  var r = e.__data__;
  return Pl(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
function Cl(e) {
  var t = er(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function Al(e) {
  return er(this, e).get(e);
}
function $l(e) {
  return er(this, e).has(e);
}
function Dl(e, t) {
  var r = er(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
function Ae(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Ae.prototype.clear = Tl;
Ae.prototype.delete = Cl;
Ae.prototype.get = Al;
Ae.prototype.has = $l;
Ae.prototype.set = Dl;
var Nl = "Expected a function";
function mn(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Nl);
  var r = function() {
    var n = arguments, o = t ? t.apply(this, n) : n[0], i = r.cache;
    if (i.has(o))
      return i.get(o);
    var s = e.apply(this, n);
    return r.cache = i.set(o, s) || i, s;
  };
  return r.cache = new (mn.Cache || Ae)(), r;
}
mn.Cache = Ae;
var Ll = 500;
function Il(e) {
  var t = mn(e, function(n) {
    return r.size === Ll && r.clear(), n;
  }), r = t.cache;
  return t;
}
var jl = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Ml = /\\(\\)?/g, Ul = Il(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(jl, function(r, n, o, i) {
    t.push(o ? i.replace(Ml, "$1") : n || r);
  }), t;
});
const Fl = Ul;
function Bl(e) {
  return e == null ? "" : hi(e);
}
function Ei(e, t) {
  return de(e) ? e : pn(e, t) ? [e] : Fl(Bl(e));
}
var Vl = 1 / 0;
function tr(e) {
  if (typeof e == "string" || Kt(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -Vl ? "-0" : t;
}
function wi(e, t) {
  t = Ei(t, e);
  for (var r = 0, n = t.length; e != null && r < n; )
    e = e[tr(t[r++])];
  return r && r == n ? e : void 0;
}
function Hl(e, t, r) {
  var n = e == null ? void 0 : wi(e, t);
  return n === void 0 ? r : n;
}
function Wl(e, t) {
  for (var r = -1, n = t.length, o = e.length; ++r < n; )
    e[o + r] = t[r];
  return e;
}
var kl = yi(Object.getPrototypeOf, Object);
const Si = kl;
var ql = "[object Object]", zl = Function.prototype, Yl = Object.prototype, _i = zl.toString, Jl = Yl.hasOwnProperty, Gl = _i.call(Object);
function Kl(e) {
  if (!Ie(e) || ke(e) != ql)
    return !1;
  var t = Si(e);
  if (t === null)
    return !0;
  var r = Jl.call(t, "constructor") && t.constructor;
  return typeof r == "function" && r instanceof r && _i.call(r) == Gl;
}
function Xl() {
  this.__data__ = new Ce(), this.size = 0;
}
function Zl(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
function Ql(e) {
  return this.__data__.get(e);
}
function ef(e) {
  return this.__data__.has(e);
}
var tf = 200;
function rf(e, t) {
  var r = this.__data__;
  if (r instanceof Ce) {
    var n = r.__data__;
    if (!dt || n.length < tf - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new Ae(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
function be(e) {
  var t = this.__data__ = new Ce(e);
  this.size = t.size;
}
be.prototype.clear = Xl;
be.prototype.delete = Zl;
be.prototype.get = Ql;
be.prototype.has = ef;
be.prototype.set = rf;
var Oi = typeof exports == "object" && exports && !exports.nodeType && exports, fo = Oi && typeof module == "object" && module && !module.nodeType && module, nf = fo && fo.exports === Oi, ho = nf ? me.Buffer : void 0, po = ho ? ho.allocUnsafe : void 0;
function of(e, t) {
  if (t)
    return e.slice();
  var r = e.length, n = po ? po(r) : new e.constructor(r);
  return e.copy(n), n;
}
function sf(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, o = 0, i = []; ++r < n; ) {
    var s = e[r];
    t(s, r, e) && (i[o++] = s);
  }
  return i;
}
function af() {
  return [];
}
var uf = Object.prototype, cf = uf.propertyIsEnumerable, mo = Object.getOwnPropertySymbols, lf = mo ? function(e) {
  return e == null ? [] : (e = Object(e), sf(mo(e), function(t) {
    return cf.call(e, t);
  }));
} : af;
const ff = lf;
function df(e, t, r) {
  var n = t(e);
  return de(e) ? n : Wl(n, r(e));
}
function vo(e) {
  return df(e, hn, ff);
}
var hf = ze(me, "DataView");
const Ir = hf;
var pf = ze(me, "Promise");
const jr = pf;
var mf = ze(me, "Set");
const Xe = mf;
var go = "[object Map]", vf = "[object Object]", yo = "[object Promise]", bo = "[object Set]", Eo = "[object WeakMap]", wo = "[object DataView]", gf = qe(Ir), yf = qe(dt), bf = qe(jr), Ef = qe(Xe), wf = qe(Lr), Ue = ke;
(Ir && Ue(new Ir(new ArrayBuffer(1))) != wo || dt && Ue(new dt()) != go || jr && Ue(jr.resolve()) != yo || Xe && Ue(new Xe()) != bo || Lr && Ue(new Lr()) != Eo) && (Ue = function(e) {
  var t = ke(e), r = t == vf ? e.constructor : void 0, n = r ? qe(r) : "";
  if (n)
    switch (n) {
      case gf:
        return wo;
      case yf:
        return go;
      case bf:
        return yo;
      case Ef:
        return bo;
      case wf:
        return Eo;
    }
  return t;
});
const So = Ue;
var Sf = me.Uint8Array;
const Vt = Sf;
function _f(e) {
  var t = new e.constructor(e.byteLength);
  return new Vt(t).set(new Vt(e)), t;
}
function Of(e, t) {
  var r = t ? _f(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
function Rf(e) {
  return typeof e.constructor == "function" && !fn(e) ? Nu(Si(e)) : {};
}
var xf = "__lodash_hash_undefined__";
function Tf(e) {
  return this.__data__.set(e, xf), this;
}
function Pf(e) {
  return this.__data__.has(e);
}
function ht(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.__data__ = new Ae(); ++t < r; )
    this.add(e[t]);
}
ht.prototype.add = ht.prototype.push = Tf;
ht.prototype.has = Pf;
function Cf(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
    if (t(e[r], r, e))
      return !0;
  return !1;
}
function Ri(e, t) {
  return e.has(t);
}
var Af = 1, $f = 2;
function xi(e, t, r, n, o, i) {
  var s = r & Af, a = e.length, u = t.length;
  if (a != u && !(s && u > a))
    return !1;
  var l = i.get(e), c = i.get(t);
  if (l && c)
    return l == t && c == e;
  var d = -1, h = !0, m = r & $f ? new ht() : void 0;
  for (i.set(e, t), i.set(t, e); ++d < a; ) {
    var v = e[d], p = t[d];
    if (n)
      var T = s ? n(p, v, d, t, e, i) : n(v, p, d, e, t, i);
    if (T !== void 0) {
      if (T)
        continue;
      h = !1;
      break;
    }
    if (m) {
      if (!Cf(t, function(S, j) {
        if (!Ri(m, j) && (v === S || o(v, S, r, n, i)))
          return m.push(j);
      })) {
        h = !1;
        break;
      }
    } else if (!(v === p || o(v, p, r, n, i))) {
      h = !1;
      break;
    }
  }
  return i.delete(e), i.delete(t), h;
}
function Df(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n, o) {
    r[++t] = [o, n];
  }), r;
}
function vn(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n) {
    r[++t] = n;
  }), r;
}
var Nf = 1, Lf = 2, If = "[object Boolean]", jf = "[object Date]", Mf = "[object Error]", Uf = "[object Map]", Ff = "[object Number]", Bf = "[object RegExp]", Vf = "[object Set]", Hf = "[object String]", Wf = "[object Symbol]", kf = "[object ArrayBuffer]", qf = "[object DataView]", _o = Le ? Le.prototype : void 0, yr = _o ? _o.valueOf : void 0;
function zf(e, t, r, n, o, i, s) {
  switch (r) {
    case qf:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case kf:
      return !(e.byteLength != t.byteLength || !i(new Vt(e), new Vt(t)));
    case If:
    case jf:
    case Ff:
      return bt(+e, +t);
    case Mf:
      return e.name == t.name && e.message == t.message;
    case Bf:
    case Hf:
      return e == t + "";
    case Uf:
      var a = Df;
    case Vf:
      var u = n & Nf;
      if (a || (a = vn), e.size != t.size && !u)
        return !1;
      var l = s.get(e);
      if (l)
        return l == t;
      n |= Lf, s.set(e, t);
      var c = xi(a(e), a(t), n, o, i, s);
      return s.delete(e), c;
    case Wf:
      if (yr)
        return yr.call(e) == yr.call(t);
  }
  return !1;
}
var Yf = 1, Jf = Object.prototype, Gf = Jf.hasOwnProperty;
function Kf(e, t, r, n, o, i) {
  var s = r & Yf, a = vo(e), u = a.length, l = vo(t), c = l.length;
  if (u != c && !s)
    return !1;
  for (var d = u; d--; ) {
    var h = a[d];
    if (!(s ? h in t : Gf.call(t, h)))
      return !1;
  }
  var m = i.get(e), v = i.get(t);
  if (m && v)
    return m == t && v == e;
  var p = !0;
  i.set(e, t), i.set(t, e);
  for (var T = s; ++d < u; ) {
    h = a[d];
    var S = e[h], j = t[h];
    if (n)
      var R = s ? n(j, S, h, t, e, i) : n(S, j, h, e, t, i);
    if (!(R === void 0 ? S === j || o(S, j, r, n, i) : R)) {
      p = !1;
      break;
    }
    T || (T = h == "constructor");
  }
  if (p && !T) {
    var x = e.constructor, I = t.constructor;
    x != I && "constructor" in e && "constructor" in t && !(typeof x == "function" && x instanceof x && typeof I == "function" && I instanceof I) && (p = !1);
  }
  return i.delete(e), i.delete(t), p;
}
var Xf = 1, Oo = "[object Arguments]", Ro = "[object Array]", Rt = "[object Object]", Zf = Object.prototype, xo = Zf.hasOwnProperty;
function Qf(e, t, r, n, o, i) {
  var s = de(e), a = de(t), u = s ? Ro : So(e), l = a ? Ro : So(t);
  u = u == Oo ? Rt : u, l = l == Oo ? Rt : l;
  var c = u == Rt, d = l == Rt, h = u == l;
  if (h && Bt(e)) {
    if (!Bt(t))
      return !1;
    s = !0, c = !1;
  }
  if (h && !c)
    return i || (i = new be()), s || dn(e) ? xi(e, t, r, n, o, i) : zf(e, t, u, r, n, o, i);
  if (!(r & Xf)) {
    var m = c && xo.call(e, "__wrapped__"), v = d && xo.call(t, "__wrapped__");
    if (m || v) {
      var p = m ? e.value() : e, T = v ? t.value() : t;
      return i || (i = new be()), o(p, T, r, n, i);
    }
  }
  return h ? (i || (i = new be()), Kf(e, t, r, n, o, i)) : !1;
}
function gn(e, t, r, n, o) {
  return e === t ? !0 : e == null || t == null || !Ie(e) && !Ie(t) ? e !== e && t !== t : Qf(e, t, r, n, gn, o);
}
var ed = 1, td = 2;
function rd(e, t, r, n) {
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
    var u = a[0], l = e[u], c = a[1];
    if (s && a[2]) {
      if (l === void 0 && !(u in e))
        return !1;
    } else {
      var d = new be();
      if (n)
        var h = n(l, c, u, e, t, d);
      if (!(h === void 0 ? gn(c, l, ed | td, n, d) : h))
        return !1;
    }
  }
  return !0;
}
function Ti(e) {
  return e === e && !he(e);
}
function nd(e) {
  for (var t = hn(e), r = t.length; r--; ) {
    var n = t[r], o = e[n];
    t[r] = [n, o, Ti(o)];
  }
  return t;
}
function Pi(e, t) {
  return function(r) {
    return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
  };
}
function od(e) {
  var t = nd(e);
  return t.length == 1 && t[0][2] ? Pi(t[0][0], t[0][1]) : function(r) {
    return r === e || rd(r, e, t);
  };
}
function id(e, t) {
  return e != null && t in Object(e);
}
function sd(e, t, r) {
  t = Ei(t, e);
  for (var n = -1, o = t.length, i = !1; ++n < o; ) {
    var s = tr(t[n]);
    if (!(i = e != null && r(e, s)))
      break;
    e = e[s];
  }
  return i || ++n != o ? i : (o = e == null ? 0 : e.length, !!o && ln(o) && cn(s, o) && (de(e) || Ft(e)));
}
function ad(e, t) {
  return e != null && sd(e, t, id);
}
var ud = 1, cd = 2;
function ld(e, t) {
  return pn(e) && Ti(t) ? Pi(tr(e), t) : function(r) {
    var n = Hl(r, e);
    return n === void 0 && n === t ? ad(r, e) : gn(t, n, ud | cd);
  };
}
function fd(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function dd(e) {
  return function(t) {
    return wi(t, e);
  };
}
function hd(e) {
  return pn(e) ? fd(tr(e)) : dd(e);
}
function Ci(e) {
  return typeof e == "function" ? e : e == null ? an : typeof e == "object" ? de(e) ? ld(e[0], e[1]) : od(e) : hd(e);
}
function pd(e) {
  return function(t, r, n) {
    for (var o = -1, i = Object(t), s = n(t), a = s.length; a--; ) {
      var u = s[e ? a : ++o];
      if (r(i[u], u, i) === !1)
        break;
    }
    return t;
  };
}
var md = pd();
const Ai = md;
function vd(e, t) {
  return e && Ai(e, t, hn);
}
var gd = function() {
  return me.Date.now();
};
const br = gd;
var yd = "Expected a function", bd = Math.max, Ed = Math.min;
function wd(e, t, r) {
  var n, o, i, s, a, u, l = 0, c = !1, d = !1, h = !0;
  if (typeof e != "function")
    throw new TypeError(yd);
  t = ro(t) || 0, he(r) && (c = !!r.leading, d = "maxWait" in r, i = d ? bd(ro(r.maxWait) || 0, t) : i, h = "trailing" in r ? !!r.trailing : h);
  function m(P) {
    var k = n, B = o;
    return n = o = void 0, l = P, s = e.apply(B, k), s;
  }
  function v(P) {
    return l = P, a = setTimeout(S, t), c ? m(P) : s;
  }
  function p(P) {
    var k = P - u, B = P - l, M = t - k;
    return d ? Ed(M, i - B) : M;
  }
  function T(P) {
    var k = P - u, B = P - l;
    return u === void 0 || k >= t || k < 0 || d && B >= i;
  }
  function S() {
    var P = br();
    if (T(P))
      return j(P);
    a = setTimeout(S, p(P));
  }
  function j(P) {
    return a = void 0, h && n ? m(P) : (n = o = void 0, s);
  }
  function R() {
    a !== void 0 && clearTimeout(a), l = 0, n = u = o = a = void 0;
  }
  function x() {
    return a === void 0 ? s : j(br());
  }
  function I() {
    var P = br(), k = T(P);
    if (n = arguments, o = this, u = P, k) {
      if (a === void 0)
        return v(u);
      if (d)
        return clearTimeout(a), a = setTimeout(S, t), m(u);
    }
    return a === void 0 && (a = setTimeout(S, t)), s;
  }
  return I.cancel = R, I.flush = x, I;
}
function Mr(e, t, r) {
  (r !== void 0 && !bt(e[t], r) || r === void 0 && !(t in e)) && Xt(e, t, r);
}
function Sd(e) {
  return Ie(e) && Zt(e);
}
function Ur(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function _d(e) {
  return nc(e, bi(e));
}
function Od(e, t, r, n, o, i, s) {
  var a = Ur(e, r), u = Ur(t, r), l = s.get(u);
  if (l) {
    Mr(e, r, l);
    return;
  }
  var c = i ? i(a, u, r + "", e, t, s) : void 0, d = c === void 0;
  if (d) {
    var h = de(u), m = !h && Bt(u), v = !h && !m && dn(u);
    c = u, h || m || v ? de(a) ? c = a : Sd(a) ? c = ju(a) : m ? (d = !1, c = of(u, !0)) : v ? (d = !1, c = Of(u, !0)) : c = [] : Kl(u) || Ft(u) ? (c = a, Ft(a) ? c = _d(a) : (!he(a) || un(a)) && (c = Rf(u))) : d = !1;
  }
  d && (s.set(u, c), o(c, u, n, i, s), s.delete(u)), Mr(e, r, c);
}
function $i(e, t, r, n, o) {
  e !== t && Ai(t, function(i, s) {
    if (o || (o = new be()), he(i))
      Od(e, t, s, r, $i, n, o);
    else {
      var a = n ? n(Ur(e, s), i, s + "", e, t, o) : void 0;
      a === void 0 && (a = i), Mr(e, s, a);
    }
  }, bi);
}
function Rd(e, t, r) {
  for (var n = -1, o = e == null ? 0 : e.length; ++n < o; )
    if (r(t, e[n]))
      return !0;
  return !1;
}
function xd(e, t) {
  var r = {};
  return t = Ci(t), vd(e, function(n, o, i) {
    Xt(r, o, t(n, o, i));
  }), r;
}
var Td = uc(function(e, t, r) {
  $i(e, t, r);
});
const Pd = Td;
var Cd = 1 / 0, Ad = Xe && 1 / vn(new Xe([, -0]))[1] == Cd ? function(e) {
  return new Xe(e);
} : Iu;
const $d = Ad;
var Dd = 200;
function Nd(e, t, r) {
  var n = -1, o = Xu, i = e.length, s = !0, a = [], u = a;
  if (r)
    s = !1, o = Rd;
  else if (i >= Dd) {
    var l = t ? null : $d(e);
    if (l)
      return vn(l);
    s = !1, o = Ri, u = new ht();
  } else
    u = t ? [] : a;
  e:
    for (; ++n < i; ) {
      var c = e[n], d = t ? t(c) : c;
      if (c = r || c !== 0 ? c : 0, s && d === d) {
        for (var h = u.length; h--; )
          if (u[h] === d)
            continue e;
        t && u.push(d), a.push(c);
      } else
        o(u, d, r) || (u !== a && u.push(d), a.push(c));
    }
  return a;
}
function Ld(e, t) {
  return e && e.length ? Nd(e, Ci(t)) : [];
}
var Fr = /* @__PURE__ */ ((e) => (e.Json = "application/json", e.UrlEncoded = "application/x-www-form-urlencoded", e))(Fr || {});
class Id {
  constructor() {
    ie(this, "listeners");
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
function To(e) {
  for (const t in e)
    Object.prototype.hasOwnProperty.call(e, t) && e[t] === void 0 && delete e[t];
  return e;
}
function kp(e) {
  for (const t in e)
    Object.prototype.hasOwnProperty.call(e, t) && delete e[t];
  return e;
}
function qp(e) {
  for (const t in e)
    Object.prototype.hasOwnProperty.call(e, t) && (e[t] = void 0);
  return e;
}
const zp = /(^[0-9]{9,16}$)\b/g, Yp = /^[a-z0-9\-\d@._]+$/, Jp = /^(?=.*[a-z])(?=.*?[A-Z])(?=.*[@$!%*#?&])[a-zA-Z@$!%*#?&\d]{8,32}$/g;
function Gp(e) {
  return !/[^\x00-\x7F]/.test(e);
}
const Br = (e, t = "", r = new FormData()) => (Object.keys(e).forEach((n) => {
  const o = t !== "" ? t + "." + n : n, i = e[n];
  Array.isArray(i) ? i.forEach((s, a) => {
    typeof s == "object" ? s instanceof File ? r.append(o, s) : r = Br(s, o + `[${a}]`, r) : r.append(o, s);
  }) : typeof i == "object" ? i instanceof File ? r.append(o, i) : r = Br(i, o, r) : r.append(o, i);
}), r), Ht = (e, t = "", r = new URLSearchParams()) => (Object.keys(e).forEach((n) => {
  const o = t !== "" ? t + "." + n : n, i = e[n];
  Array.isArray(i) ? i.forEach((s, a) => {
    typeof s == "object" ? r = Ht(s, o + `[${a}]`, r) : r.append(o, s);
  }) : typeof i == "object" ? r = Ht(i, o, r) : r.append(o, i);
}), r);
class jd {
  constructor() {
    ie(this, "modeEnv");
    ie(this, "subdomain");
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
const Vr = new jd();
class Di {
  getToken(t) {
    if (this.getPrefix())
      return localStorage.getItem(`${this.getPrefix()}_${t}`) || "";
  }
  setToken(t, r) {
    if (this.getPrefix())
      return localStorage.setItem(`${this.getPrefix()}_${t}`, r);
  }
  getPrefix() {
    const t = Vr.getConfig().modEnv, r = Vr.getConfig().subdomain;
    return !t || !r ? "" : `${t}_${r}`;
  }
}
const At = new Di(), xt = new Di();
function Kp(e, t) {
  return new Proxy(e, {
    set(r, n, o) {
      return r[n] = o, t(r), !0;
    }
  });
}
function Po(e) {
  let t = "";
  const r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n = r.length;
  for (let o = 0; o < e; o++)
    t += r.charAt(Math.floor(Math.random() * n));
  return t;
}
function Ni(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Li } = Object.prototype, { getPrototypeOf: yn } = Object, bn = ((e) => (t) => {
  const r = Li.call(t);
  return e[r] || (e[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), $e = (e) => (e = e.toLowerCase(), (t) => bn(t) === e), rr = (e) => (t) => typeof t === e, { isArray: ot } = Array, pt = rr("undefined");
function Md(e) {
  return e !== null && !pt(e) && e.constructor !== null && !pt(e.constructor) && We(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Ii = $e("ArrayBuffer");
function Ud(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Ii(e.buffer), t;
}
const Fd = rr("string"), We = rr("function"), ji = rr("number"), En = (e) => e !== null && typeof e == "object", Bd = (e) => e === !0 || e === !1, $t = (e) => {
  if (bn(e) !== "object")
    return !1;
  const t = yn(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, Vd = $e("Date"), Hd = $e("File"), Wd = $e("Blob"), kd = $e("FileList"), qd = (e) => En(e) && We(e.pipe), zd = (e) => {
  const t = "[object FormData]";
  return e && (typeof FormData == "function" && e instanceof FormData || Li.call(e) === t || We(e.toString) && e.toString() === t);
}, Yd = $e("URLSearchParams"), Jd = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Et(e, t, { allOwnKeys: r = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let n, o;
  if (typeof e != "object" && (e = [e]), ot(e))
    for (n = 0, o = e.length; n < o; n++)
      t.call(null, e[n], n, e);
  else {
    const i = r ? Object.getOwnPropertyNames(e) : Object.keys(e), s = i.length;
    let a;
    for (n = 0; n < s; n++)
      a = i[n], t.call(null, e[a], a, e);
  }
}
function Mi(e, t) {
  t = t.toLowerCase();
  const r = Object.keys(e);
  let n = r.length, o;
  for (; n-- > 0; )
    if (o = r[n], t === o.toLowerCase())
      return o;
  return null;
}
const Ui = typeof self > "u" ? typeof global > "u" ? globalThis : global : self, Fi = (e) => !pt(e) && e !== Ui;
function Hr() {
  const { caseless: e } = Fi(this) && this || {}, t = {}, r = (n, o) => {
    const i = e && Mi(t, o) || o;
    $t(t[i]) && $t(n) ? t[i] = Hr(t[i], n) : $t(n) ? t[i] = Hr({}, n) : ot(n) ? t[i] = n.slice() : t[i] = n;
  };
  for (let n = 0, o = arguments.length; n < o; n++)
    arguments[n] && Et(arguments[n], r);
  return t;
}
const Gd = (e, t, r, { allOwnKeys: n } = {}) => (Et(t, (o, i) => {
  r && We(o) ? e[i] = Ni(o, r) : e[i] = o;
}, { allOwnKeys: n }), e), Kd = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Xd = (e, t, r, n) => {
  e.prototype = Object.create(t.prototype, n), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), r && Object.assign(e.prototype, r);
}, Zd = (e, t, r, n) => {
  let o, i, s;
  const a = {};
  if (t = t || {}, e == null)
    return t;
  do {
    for (o = Object.getOwnPropertyNames(e), i = o.length; i-- > 0; )
      s = o[i], (!n || n(s, e, t)) && !a[s] && (t[s] = e[s], a[s] = !0);
    e = r !== !1 && yn(e);
  } while (e && (!r || r(e, t)) && e !== Object.prototype);
  return t;
}, Qd = (e, t, r) => {
  e = String(e), (r === void 0 || r > e.length) && (r = e.length), r -= t.length;
  const n = e.indexOf(t, r);
  return n !== -1 && n === r;
}, eh = (e) => {
  if (!e)
    return null;
  if (ot(e))
    return e;
  let t = e.length;
  if (!ji(t))
    return null;
  const r = new Array(t);
  for (; t-- > 0; )
    r[t] = e[t];
  return r;
}, th = ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && yn(Uint8Array)), rh = (e, t) => {
  const n = (e && e[Symbol.iterator]).call(e);
  let o;
  for (; (o = n.next()) && !o.done; ) {
    const i = o.value;
    t.call(e, i[0], i[1]);
  }
}, nh = (e, t) => {
  let r;
  const n = [];
  for (; (r = e.exec(t)) !== null; )
    n.push(r);
  return n;
}, oh = $e("HTMLFormElement"), ih = (e) => e.toLowerCase().replace(
  /[_-\s]([a-z\d])(\w*)/g,
  function(r, n, o) {
    return n.toUpperCase() + o;
  }
), Co = (({ hasOwnProperty: e }) => (t, r) => e.call(t, r))(Object.prototype), sh = $e("RegExp"), Bi = (e, t) => {
  const r = Object.getOwnPropertyDescriptors(e), n = {};
  Et(r, (o, i) => {
    t(o, i, e) !== !1 && (n[i] = o);
  }), Object.defineProperties(e, n);
}, ah = (e) => {
  Bi(e, (t, r) => {
    if (We(e) && ["arguments", "caller", "callee"].indexOf(r) !== -1)
      return !1;
    const n = e[r];
    if (We(n)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + r + "'");
      });
    }
  });
}, uh = (e, t) => {
  const r = {}, n = (o) => {
    o.forEach((i) => {
      r[i] = !0;
    });
  };
  return ot(e) ? n(e) : n(String(e).split(t)), r;
}, ch = () => {
}, lh = (e, t) => (e = +e, Number.isFinite(e) ? e : t), fh = (e) => {
  const t = new Array(10), r = (n, o) => {
    if (En(n)) {
      if (t.indexOf(n) >= 0)
        return;
      if (!("toJSON" in n)) {
        t[o] = n;
        const i = ot(n) ? [] : {};
        return Et(n, (s, a) => {
          const u = r(s, o + 1);
          !pt(u) && (i[a] = u);
        }), t[o] = void 0, i;
      }
    }
    return n;
  };
  return r(e, 0);
}, g = {
  isArray: ot,
  isArrayBuffer: Ii,
  isBuffer: Md,
  isFormData: zd,
  isArrayBufferView: Ud,
  isString: Fd,
  isNumber: ji,
  isBoolean: Bd,
  isObject: En,
  isPlainObject: $t,
  isUndefined: pt,
  isDate: Vd,
  isFile: Hd,
  isBlob: Wd,
  isRegExp: sh,
  isFunction: We,
  isStream: qd,
  isURLSearchParams: Yd,
  isTypedArray: th,
  isFileList: kd,
  forEach: Et,
  merge: Hr,
  extend: Gd,
  trim: Jd,
  stripBOM: Kd,
  inherits: Xd,
  toFlatObject: Zd,
  kindOf: bn,
  kindOfTest: $e,
  endsWith: Qd,
  toArray: eh,
  forEachEntry: rh,
  matchAll: nh,
  isHTMLForm: oh,
  hasOwnProperty: Co,
  hasOwnProp: Co,
  reduceDescriptors: Bi,
  freezeMethods: ah,
  toObjectSet: uh,
  toCamelCase: ih,
  noop: ch,
  toFiniteNumber: lh,
  findKey: Mi,
  global: Ui,
  isContextDefined: Fi,
  toJSONObject: fh
};
function H(e, t, r, n, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), r && (this.config = r), n && (this.request = n), o && (this.response = o);
}
g.inherits(H, Error, {
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
      config: g.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const Vi = H.prototype, Hi = {};
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
  Hi[e] = { value: e };
});
Object.defineProperties(H, Hi);
Object.defineProperty(Vi, "isAxiosError", { value: !0 });
H.from = (e, t, r, n, o, i) => {
  const s = Object.create(Vi);
  return g.toFlatObject(e, s, function(u) {
    return u !== Error.prototype;
  }, (a) => a !== "isAxiosError"), H.call(s, e.message, t, r, n, o), s.cause = e, s.name = e.name, i && Object.assign(s, i), s;
};
var dh = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, hh = typeof self == "object" ? self.FormData : window.FormData;
const ph = hh;
function Wr(e) {
  return g.isPlainObject(e) || g.isArray(e);
}
function Wi(e) {
  return g.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Ao(e, t, r) {
  return e ? e.concat(t).map(function(o, i) {
    return o = Wi(o), !r && i ? "[" + o + "]" : o;
  }).join(r ? "." : "") : t;
}
function mh(e) {
  return g.isArray(e) && !e.some(Wr);
}
const vh = g.toFlatObject(g, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function gh(e) {
  return e && g.isFunction(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator];
}
function nr(e, t, r) {
  if (!g.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new (ph || FormData)(), r = g.toFlatObject(r, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(p, T) {
    return !g.isUndefined(T[p]);
  });
  const n = r.metaTokens, o = r.visitor || c, i = r.dots, s = r.indexes, u = (r.Blob || typeof Blob < "u" && Blob) && gh(t);
  if (!g.isFunction(o))
    throw new TypeError("visitor must be a function");
  function l(v) {
    if (v === null)
      return "";
    if (g.isDate(v))
      return v.toISOString();
    if (!u && g.isBlob(v))
      throw new H("Blob is not supported. Use a Buffer instead.");
    return g.isArrayBuffer(v) || g.isTypedArray(v) ? u && typeof Blob == "function" ? new Blob([v]) : Buffer.from(v) : v;
  }
  function c(v, p, T) {
    let S = v;
    if (v && !T && typeof v == "object") {
      if (g.endsWith(p, "{}"))
        p = n ? p : p.slice(0, -2), v = JSON.stringify(v);
      else if (g.isArray(v) && mh(v) || g.isFileList(v) || g.endsWith(p, "[]") && (S = g.toArray(v)))
        return p = Wi(p), S.forEach(function(R, x) {
          !(g.isUndefined(R) || R === null) && t.append(
            s === !0 ? Ao([p], x, i) : s === null ? p : p + "[]",
            l(R)
          );
        }), !1;
    }
    return Wr(v) ? !0 : (t.append(Ao(T, p, i), l(v)), !1);
  }
  const d = [], h = Object.assign(vh, {
    defaultVisitor: c,
    convertValue: l,
    isVisitable: Wr
  });
  function m(v, p) {
    if (!g.isUndefined(v)) {
      if (d.indexOf(v) !== -1)
        throw Error("Circular reference detected in " + p.join("."));
      d.push(v), g.forEach(v, function(S, j) {
        (!(g.isUndefined(S) || S === null) && o.call(
          t,
          S,
          g.isString(j) ? j.trim() : j,
          p,
          h
        )) === !0 && m(S, p ? p.concat(j) : [j]);
      }), d.pop();
    }
  }
  if (!g.isObject(e))
    throw new TypeError("data must be an object");
  return m(e), t;
}
function $o(e) {
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
function wn(e, t) {
  this._pairs = [], e && nr(e, this, t);
}
const ki = wn.prototype;
ki.append = function(t, r) {
  this._pairs.push([t, r]);
};
ki.toString = function(t) {
  const r = t ? function(n) {
    return t.call(this, n, $o);
  } : $o;
  return this._pairs.map(function(o) {
    return r(o[0]) + "=" + r(o[1]);
  }, "").join("&");
};
function yh(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function qi(e, t, r) {
  if (!t)
    return e;
  const n = r && r.encode || yh, o = r && r.serialize;
  let i;
  if (o ? i = o(t, r) : i = g.isURLSearchParams(t) ? t.toString() : new wn(t, r).toString(n), i) {
    const s = e.indexOf("#");
    s !== -1 && (e = e.slice(0, s)), e += (e.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return e;
}
class bh {
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
    g.forEach(this.handlers, function(n) {
      n !== null && t(n);
    });
  }
}
const Do = bh, zi = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Eh = typeof URLSearchParams < "u" ? URLSearchParams : wn, wh = FormData, Sh = (() => {
  let e;
  return typeof navigator < "u" && ((e = navigator.product) === "ReactNative" || e === "NativeScript" || e === "NS") ? !1 : typeof window < "u" && typeof document < "u";
})(), _h = (() => typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), ye = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Eh,
    FormData: wh,
    Blob
  },
  isStandardBrowserEnv: Sh,
  isStandardBrowserWebWorkerEnv: _h,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function Oh(e, t) {
  return nr(e, new ye.classes.URLSearchParams(), Object.assign({
    visitor: function(r, n, o, i) {
      return ye.isNode && g.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function Rh(e) {
  return g.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function xh(e) {
  const t = {}, r = Object.keys(e);
  let n;
  const o = r.length;
  let i;
  for (n = 0; n < o; n++)
    i = r[n], t[i] = e[i];
  return t;
}
function Yi(e) {
  function t(r, n, o, i) {
    let s = r[i++];
    const a = Number.isFinite(+s), u = i >= r.length;
    return s = !s && g.isArray(o) ? o.length : s, u ? (g.hasOwnProp(o, s) ? o[s] = [o[s], n] : o[s] = n, !a) : ((!o[s] || !g.isObject(o[s])) && (o[s] = []), t(r, n, o[s], i) && g.isArray(o[s]) && (o[s] = xh(o[s])), !a);
  }
  if (g.isFormData(e) && g.isFunction(e.entries)) {
    const r = {};
    return g.forEachEntry(e, (n, o) => {
      t(Rh(n), o, r, 0);
    }), r;
  }
  return null;
}
const Th = {
  "Content-Type": void 0
};
function Ph(e, t, r) {
  if (g.isString(e))
    try {
      return (t || JSON.parse)(e), g.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (r || JSON.stringify)(e);
}
const or = {
  transitional: zi,
  adapter: ["xhr", "http"],
  transformRequest: [function(t, r) {
    const n = r.getContentType() || "", o = n.indexOf("application/json") > -1, i = g.isObject(t);
    if (i && g.isHTMLForm(t) && (t = new FormData(t)), g.isFormData(t))
      return o && o ? JSON.stringify(Yi(t)) : t;
    if (g.isArrayBuffer(t) || g.isBuffer(t) || g.isStream(t) || g.isFile(t) || g.isBlob(t))
      return t;
    if (g.isArrayBufferView(t))
      return t.buffer;
    if (g.isURLSearchParams(t))
      return r.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let a;
    if (i) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return Oh(t, this.formSerializer).toString();
      if ((a = g.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
        const u = this.env && this.env.FormData;
        return nr(
          a ? { "files[]": t } : t,
          u && new u(),
          this.formSerializer
        );
      }
    }
    return i || o ? (r.setContentType("application/json", !1), Ph(t)) : t;
  }],
  transformResponse: [function(t) {
    const r = this.transitional || or.transitional, n = r && r.forcedJSONParsing, o = this.responseType === "json";
    if (t && g.isString(t) && (n && !this.responseType || o)) {
      const s = !(r && r.silentJSONParsing) && o;
      try {
        return JSON.parse(t);
      } catch (a) {
        if (s)
          throw a.name === "SyntaxError" ? H.from(a, H.ERR_BAD_RESPONSE, this, null, this.response) : a;
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
g.forEach(["delete", "get", "head"], function(t) {
  or.headers[t] = {};
});
g.forEach(["post", "put", "patch"], function(t) {
  or.headers[t] = g.merge(Th);
});
const Sn = or, Ch = g.toObjectSet([
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
]), Ah = (e) => {
  const t = {};
  let r, n, o;
  return e && e.split(`
`).forEach(function(s) {
    o = s.indexOf(":"), r = s.substring(0, o).trim().toLowerCase(), n = s.substring(o + 1).trim(), !(!r || t[r] && Ch[r]) && (r === "set-cookie" ? t[r] ? t[r].push(n) : t[r] = [n] : t[r] = t[r] ? t[r] + ", " + n : n);
  }), t;
}, No = Symbol("internals");
function ut(e) {
  return e && String(e).trim().toLowerCase();
}
function Dt(e) {
  return e === !1 || e == null ? e : g.isArray(e) ? e.map(Dt) : String(e);
}
function $h(e) {
  const t = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(e); )
    t[n[1]] = n[2];
  return t;
}
function Dh(e) {
  return /^[-_a-zA-Z]+$/.test(e.trim());
}
function Lo(e, t, r, n) {
  if (g.isFunction(n))
    return n.call(this, t, r);
  if (g.isString(t)) {
    if (g.isString(n))
      return t.indexOf(n) !== -1;
    if (g.isRegExp(n))
      return n.test(t);
  }
}
function Nh(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, r, n) => r.toUpperCase() + n);
}
function Lh(e, t) {
  const r = g.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(e, n + r, {
      value: function(o, i, s) {
        return this[n].call(this, t, o, i, s);
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
    function i(a, u, l) {
      const c = ut(u);
      if (!c)
        throw new Error("header name must be a non-empty string");
      const d = g.findKey(o, c);
      (!d || o[d] === void 0 || l === !0 || l === void 0 && o[d] !== !1) && (o[d || u] = Dt(a));
    }
    const s = (a, u) => g.forEach(a, (l, c) => i(l, c, u));
    return g.isPlainObject(t) || t instanceof this.constructor ? s(t, r) : g.isString(t) && (t = t.trim()) && !Dh(t) ? s(Ah(t), r) : t != null && i(r, t, n), this;
  }
  get(t, r) {
    if (t = ut(t), t) {
      const n = g.findKey(this, t);
      if (n) {
        const o = this[n];
        if (!r)
          return o;
        if (r === !0)
          return $h(o);
        if (g.isFunction(r))
          return r.call(this, o, n);
        if (g.isRegExp(r))
          return r.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, r) {
    if (t = ut(t), t) {
      const n = g.findKey(this, t);
      return !!(n && (!r || Lo(this, this[n], n, r)));
    }
    return !1;
  }
  delete(t, r) {
    const n = this;
    let o = !1;
    function i(s) {
      if (s = ut(s), s) {
        const a = g.findKey(n, s);
        a && (!r || Lo(n, n[a], a, r)) && (delete n[a], o = !0);
      }
    }
    return g.isArray(t) ? t.forEach(i) : i(t), o;
  }
  clear() {
    return Object.keys(this).forEach(this.delete.bind(this));
  }
  normalize(t) {
    const r = this, n = {};
    return g.forEach(this, (o, i) => {
      const s = g.findKey(n, i);
      if (s) {
        r[s] = Dt(o), delete r[i];
        return;
      }
      const a = t ? Nh(i) : String(i).trim();
      a !== i && delete r[i], r[a] = Dt(o), n[a] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const r = /* @__PURE__ */ Object.create(null);
    return g.forEach(this, (n, o) => {
      n != null && n !== !1 && (r[o] = t && g.isArray(n) ? n.join(", ") : n);
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
    const n = (this[No] = this[No] = {
      accessors: {}
    }).accessors, o = this.prototype;
    function i(s) {
      const a = ut(s);
      n[a] || (Lh(o, s), n[a] = !0);
    }
    return g.isArray(t) ? t.forEach(i) : i(t), this;
  }
};
ir.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent"]);
g.freezeMethods(ir.prototype);
g.freezeMethods(ir);
const xe = ir;
function Er(e, t) {
  const r = this || Sn, n = t || r, o = xe.from(n.headers);
  let i = n.data;
  return g.forEach(e, function(a) {
    i = a.call(r, i, o.normalize(), t ? t.status : void 0);
  }), o.normalize(), i;
}
function Ji(e) {
  return !!(e && e.__CANCEL__);
}
function wt(e, t, r) {
  H.call(this, e ?? "canceled", H.ERR_CANCELED, t, r), this.name = "CanceledError";
}
g.inherits(wt, H, {
  __CANCEL__: !0
});
const Ih = null;
function jh(e, t, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? e(r) : t(new H(
    "Request failed with status code " + r.status,
    [H.ERR_BAD_REQUEST, H.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
    r.config,
    r.request,
    r
  ));
}
const Mh = ye.isStandardBrowserEnv ? function() {
  return {
    write: function(r, n, o, i, s, a) {
      const u = [];
      u.push(r + "=" + encodeURIComponent(n)), g.isNumber(o) && u.push("expires=" + new Date(o).toGMTString()), g.isString(i) && u.push("path=" + i), g.isString(s) && u.push("domain=" + s), a === !0 && u.push("secure"), document.cookie = u.join("; ");
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
function Uh(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Fh(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Gi(e, t) {
  return e && !Uh(t) ? Fh(e, t) : t;
}
const Bh = ye.isStandardBrowserEnv ? function() {
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
    const a = g.isString(s) ? o(s) : s;
    return a.protocol === n.protocol && a.host === n.host;
  };
}() : function() {
  return function() {
    return !0;
  };
}();
function Vh(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function Hh(e, t) {
  e = e || 10;
  const r = new Array(e), n = new Array(e);
  let o = 0, i = 0, s;
  return t = t !== void 0 ? t : 1e3, function(u) {
    const l = Date.now(), c = n[i];
    s || (s = l), r[o] = u, n[o] = l;
    let d = i, h = 0;
    for (; d !== o; )
      h += r[d++], d = d % e;
    if (o = (o + 1) % e, o === i && (i = (i + 1) % e), l - s < t)
      return;
    const m = c && l - c;
    return m ? Math.round(h * 1e3 / m) : void 0;
  };
}
function Io(e, t) {
  let r = 0;
  const n = Hh(50, 250);
  return (o) => {
    const i = o.loaded, s = o.lengthComputable ? o.total : void 0, a = i - r, u = n(a), l = i <= s;
    r = i;
    const c = {
      loaded: i,
      total: s,
      progress: s ? i / s : void 0,
      bytes: a,
      rate: u || void 0,
      estimated: u && s && l ? (s - i) / u : void 0,
      event: o
    };
    c[t ? "download" : "upload"] = !0, e(c);
  };
}
const Wh = typeof XMLHttpRequest < "u", kh = Wh && function(e) {
  return new Promise(function(r, n) {
    let o = e.data;
    const i = xe.from(e.headers).normalize(), s = e.responseType;
    let a;
    function u() {
      e.cancelToken && e.cancelToken.unsubscribe(a), e.signal && e.signal.removeEventListener("abort", a);
    }
    g.isFormData(o) && (ye.isStandardBrowserEnv || ye.isStandardBrowserWebWorkerEnv) && i.setContentType(!1);
    let l = new XMLHttpRequest();
    if (e.auth) {
      const m = e.auth.username || "", v = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
      i.set("Authorization", "Basic " + btoa(m + ":" + v));
    }
    const c = Gi(e.baseURL, e.url);
    l.open(e.method.toUpperCase(), qi(c, e.params, e.paramsSerializer), !0), l.timeout = e.timeout;
    function d() {
      if (!l)
        return;
      const m = xe.from(
        "getAllResponseHeaders" in l && l.getAllResponseHeaders()
      ), p = {
        data: !s || s === "text" || s === "json" ? l.responseText : l.response,
        status: l.status,
        statusText: l.statusText,
        headers: m,
        config: e,
        request: l
      };
      jh(function(S) {
        r(S), u();
      }, function(S) {
        n(S), u();
      }, p), l = null;
    }
    if ("onloadend" in l ? l.onloadend = d : l.onreadystatechange = function() {
      !l || l.readyState !== 4 || l.status === 0 && !(l.responseURL && l.responseURL.indexOf("file:") === 0) || setTimeout(d);
    }, l.onabort = function() {
      l && (n(new H("Request aborted", H.ECONNABORTED, e, l)), l = null);
    }, l.onerror = function() {
      n(new H("Network Error", H.ERR_NETWORK, e, l)), l = null;
    }, l.ontimeout = function() {
      let v = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
      const p = e.transitional || zi;
      e.timeoutErrorMessage && (v = e.timeoutErrorMessage), n(new H(
        v,
        p.clarifyTimeoutError ? H.ETIMEDOUT : H.ECONNABORTED,
        e,
        l
      )), l = null;
    }, ye.isStandardBrowserEnv) {
      const m = (e.withCredentials || Bh(c)) && e.xsrfCookieName && Mh.read(e.xsrfCookieName);
      m && i.set(e.xsrfHeaderName, m);
    }
    o === void 0 && i.setContentType(null), "setRequestHeader" in l && g.forEach(i.toJSON(), function(v, p) {
      l.setRequestHeader(p, v);
    }), g.isUndefined(e.withCredentials) || (l.withCredentials = !!e.withCredentials), s && s !== "json" && (l.responseType = e.responseType), typeof e.onDownloadProgress == "function" && l.addEventListener("progress", Io(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && l.upload && l.upload.addEventListener("progress", Io(e.onUploadProgress)), (e.cancelToken || e.signal) && (a = (m) => {
      l && (n(!m || m.type ? new wt(null, e, l) : m), l.abort(), l = null);
    }, e.cancelToken && e.cancelToken.subscribe(a), e.signal && (e.signal.aborted ? a() : e.signal.addEventListener("abort", a)));
    const h = Vh(c);
    if (h && ye.protocols.indexOf(h) === -1) {
      n(new H("Unsupported protocol " + h + ":", H.ERR_BAD_REQUEST, e));
      return;
    }
    l.send(o || null);
  });
}, Nt = {
  http: Ih,
  xhr: kh
};
g.forEach(Nt, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const qh = {
  getAdapter: (e) => {
    e = g.isArray(e) ? e : [e];
    const { length: t } = e;
    let r, n;
    for (let o = 0; o < t && (r = e[o], !(n = g.isString(r) ? Nt[r.toLowerCase()] : r)); o++)
      ;
    if (!n)
      throw n === !1 ? new H(
        `Adapter ${r} is not supported by the environment`,
        "ERR_NOT_SUPPORT"
      ) : new Error(
        g.hasOwnProp(Nt, r) ? `Adapter '${r}' is not available in the build` : `Unknown adapter '${r}'`
      );
    if (!g.isFunction(n))
      throw new TypeError("adapter is not a function");
    return n;
  },
  adapters: Nt
};
function wr(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new wt(null, e);
}
function jo(e) {
  return wr(e), e.headers = xe.from(e.headers), e.data = Er.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), qh.getAdapter(e.adapter || Sn.adapter)(e).then(function(n) {
    return wr(e), n.data = Er.call(
      e,
      e.transformResponse,
      n
    ), n.headers = xe.from(n.headers), n;
  }, function(n) {
    return Ji(n) || (wr(e), n && n.response && (n.response.data = Er.call(
      e,
      e.transformResponse,
      n.response
    ), n.response.headers = xe.from(n.response.headers))), Promise.reject(n);
  });
}
const Mo = (e) => e instanceof xe ? e.toJSON() : e;
function et(e, t) {
  t = t || {};
  const r = {};
  function n(l, c, d) {
    return g.isPlainObject(l) && g.isPlainObject(c) ? g.merge.call({ caseless: d }, l, c) : g.isPlainObject(c) ? g.merge({}, c) : g.isArray(c) ? c.slice() : c;
  }
  function o(l, c, d) {
    if (g.isUndefined(c)) {
      if (!g.isUndefined(l))
        return n(void 0, l, d);
    } else
      return n(l, c, d);
  }
  function i(l, c) {
    if (!g.isUndefined(c))
      return n(void 0, c);
  }
  function s(l, c) {
    if (g.isUndefined(c)) {
      if (!g.isUndefined(l))
        return n(void 0, l);
    } else
      return n(void 0, c);
  }
  function a(l, c, d) {
    if (d in t)
      return n(l, c);
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
    headers: (l, c) => o(Mo(l), Mo(c), !0)
  };
  return g.forEach(Object.keys(e).concat(Object.keys(t)), function(c) {
    const d = u[c] || o, h = d(e[c], t[c], c);
    g.isUndefined(h) && d !== a || (r[c] = h);
  }), r;
}
const Ki = "1.2.1", _n = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  _n[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Uo = {};
_n.transitional = function(t, r, n) {
  function o(i, s) {
    return "[Axios v" + Ki + "] Transitional option '" + i + "'" + s + (n ? ". " + n : "");
  }
  return (i, s, a) => {
    if (t === !1)
      throw new H(
        o(s, " has been removed" + (r ? " in " + r : "")),
        H.ERR_DEPRECATED
      );
    return r && !Uo[s] && (Uo[s] = !0, console.warn(
      o(
        s,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), t ? t(i, s, a) : !0;
  };
};
function zh(e, t, r) {
  if (typeof e != "object")
    throw new H("options must be an object", H.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(e);
  let o = n.length;
  for (; o-- > 0; ) {
    const i = n[o], s = t[i];
    if (s) {
      const a = e[i], u = a === void 0 || s(a, i, e);
      if (u !== !0)
        throw new H("option " + i + " must be " + u, H.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0)
      throw new H("Unknown option " + i, H.ERR_BAD_OPTION);
  }
}
const kr = {
  assertOptions: zh,
  validators: _n
}, De = kr.validators;
let Wt = class {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new Do(),
      response: new Do()
    };
  }
  request(t, r) {
    typeof t == "string" ? (r = r || {}, r.url = t) : r = t || {}, r = et(this.defaults, r);
    const { transitional: n, paramsSerializer: o, headers: i } = r;
    n !== void 0 && kr.assertOptions(n, {
      silentJSONParsing: De.transitional(De.boolean),
      forcedJSONParsing: De.transitional(De.boolean),
      clarifyTimeoutError: De.transitional(De.boolean)
    }, !1), o !== void 0 && kr.assertOptions(o, {
      encode: De.function,
      serialize: De.function
    }, !0), r.method = (r.method || this.defaults.method || "get").toLowerCase();
    let s;
    s = i && g.merge(
      i.common,
      i[r.method]
    ), s && g.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (v) => {
        delete i[v];
      }
    ), r.headers = xe.concat(s, i);
    const a = [];
    let u = !0;
    this.interceptors.request.forEach(function(p) {
      typeof p.runWhen == "function" && p.runWhen(r) === !1 || (u = u && p.synchronous, a.unshift(p.fulfilled, p.rejected));
    });
    const l = [];
    this.interceptors.response.forEach(function(p) {
      l.push(p.fulfilled, p.rejected);
    });
    let c, d = 0, h;
    if (!u) {
      const v = [jo.bind(this), void 0];
      for (v.unshift.apply(v, a), v.push.apply(v, l), h = v.length, c = Promise.resolve(r); d < h; )
        c = c.then(v[d++], v[d++]);
      return c;
    }
    h = a.length;
    let m = r;
    for (d = 0; d < h; ) {
      const v = a[d++], p = a[d++];
      try {
        m = v(m);
      } catch (T) {
        p.call(this, T);
        break;
      }
    }
    try {
      c = jo.call(this, m);
    } catch (v) {
      return Promise.reject(v);
    }
    for (d = 0, h = l.length; d < h; )
      c = c.then(l[d++], l[d++]);
    return c;
  }
  getUri(t) {
    t = et(this.defaults, t);
    const r = Gi(t.baseURL, t.url);
    return qi(r, t.params, t.paramsSerializer);
  }
};
g.forEach(["delete", "get", "head", "options"], function(t) {
  Wt.prototype[t] = function(r, n) {
    return this.request(et(n || {}, {
      method: t,
      url: r,
      data: (n || {}).data
    }));
  };
});
g.forEach(["post", "put", "patch"], function(t) {
  function r(n) {
    return function(i, s, a) {
      return this.request(et(a || {}, {
        method: t,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: i,
        data: s
      }));
    };
  }
  Wt.prototype[t] = r(), Wt.prototype[t + "Form"] = r(!0);
});
const Lt = Wt;
let Xi = class {
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
      n.reason || (n.reason = new wt(i, s, a), r(n.reason));
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
      token: new Xi(function(o) {
        t = o;
      }),
      cancel: t
    };
  }
};
const Yh = Xi;
function Jh(e) {
  return function(r) {
    return e.apply(null, r);
  };
}
function Gh(e) {
  return g.isObject(e) && e.isAxiosError === !0;
}
function Zi(e) {
  const t = new Lt(e), r = Ni(Lt.prototype.request, t);
  return g.extend(r, Lt.prototype, t, { allOwnKeys: !0 }), g.extend(r, t, null, { allOwnKeys: !0 }), r.create = function(o) {
    return Zi(et(e, o));
  }, r;
}
const oe = Zi(Sn);
oe.Axios = Lt;
oe.CanceledError = wt;
oe.CancelToken = Yh;
oe.isCancel = Ji;
oe.VERSION = Ki;
oe.toFormData = nr;
oe.AxiosError = H;
oe.Cancel = oe.CanceledError;
oe.all = function(t) {
  return Promise.all(t);
};
oe.spread = Jh;
oe.isAxiosError = Gh;
oe.mergeConfig = et;
oe.AxiosHeaders = xe;
oe.formToJSON = (e) => Yi(g.isHTMLForm(e) ? new FormData(e) : e);
oe.default = oe;
const Qi = oe, {
  Axios: em,
  AxiosError: Kh,
  CanceledError: tm,
  isCancel: rm,
  CancelToken: nm,
  VERSION: om,
  all: im,
  Cancel: sm,
  isAxiosError: am,
  spread: um,
  toFormData: cm,
  AxiosHeaders: lm,
  formToJSON: fm,
  mergeConfig: dm
} = Qi;
var qr = function(e, t) {
  return qr = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
    r.__proto__ = n;
  } || function(r, n) {
    for (var o in n)
      Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
  }, qr(e, t);
};
function sr(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  qr(e, t);
  function r() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
}
function zr(e) {
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
function kt(e, t) {
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
function qt(e, t, r) {
  if (r || arguments.length === 2)
    for (var n = 0, o = t.length, i; n < o; n++)
      (i || !(n in t)) && (i || (i = Array.prototype.slice.call(t, 0, n)), i[n] = t[n]);
  return e.concat(i || Array.prototype.slice.call(t));
}
function Te(e) {
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
function Yr(e, t) {
  if (e) {
    var r = e.indexOf(t);
    0 <= r && e.splice(r, 1);
  }
}
var ar = function() {
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
            for (var a = zr(s), u = a.next(); !u.done; u = a.next()) {
              var l = u.value;
              l.remove(this);
            }
          } catch (p) {
            t = { error: p };
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
      var c = this.initialTeardown;
      if (Te(c))
        try {
          c();
        } catch (p) {
          i = p instanceof Sr ? p.errors : [p];
        }
      var d = this._finalizers;
      if (d) {
        this._finalizers = null;
        try {
          for (var h = zr(d), m = h.next(); !m.done; m = h.next()) {
            var v = m.value;
            try {
              Fo(v);
            } catch (p) {
              i = i ?? [], p instanceof Sr ? i = qt(qt([], kt(i)), kt(p.errors)) : i.push(p);
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
      if (i)
        throw new Sr(i);
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
    r === t ? this._parentage = null : Array.isArray(r) && Yr(r, t);
  }, e.prototype.remove = function(t) {
    var r = this._finalizers;
    r && Yr(r, t), t instanceof e && t._removeParent(this);
  }, e.EMPTY = function() {
    var t = new e();
    return t.closed = !0, t;
  }(), e;
}(), es = ar.EMPTY;
function ts(e) {
  return e instanceof ar || e && "closed" in e && Te(e.remove) && Te(e.add) && Te(e.unsubscribe);
}
function Fo(e) {
  Te(e) ? e() : e.unsubscribe();
}
var Rn = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1
}, Jr = {
  setTimeout: function(e, t) {
    for (var r = [], n = 2; n < arguments.length; n++)
      r[n - 2] = arguments[n];
    var o = Jr.delegate;
    return o != null && o.setTimeout ? o.setTimeout.apply(o, qt([e, t], kt(r))) : setTimeout.apply(void 0, qt([e, t], kt(r)));
  },
  clearTimeout: function(e) {
    var t = Jr.delegate;
    return ((t == null ? void 0 : t.clearTimeout) || clearTimeout)(e);
  },
  delegate: void 0
};
function Xh(e) {
  Jr.setTimeout(function() {
    throw e;
  });
}
function Bo() {
}
var Tt = null;
function It(e) {
  if (Rn.useDeprecatedSynchronousErrorHandling) {
    var t = !Tt;
    if (t && (Tt = { errorThrown: !1, error: null }), e(), t) {
      var r = Tt, n = r.errorThrown, o = r.error;
      if (Tt = null, n)
        throw o;
    }
  } else
    e();
}
var rs = function(e) {
  sr(t, e);
  function t(r) {
    var n = e.call(this) || this;
    return n.isStopped = !1, r ? (n.destination = r, ts(r) && r.add(n)) : n.destination = tp, n;
  }
  return t.create = function(r, n, o) {
    return new Gr(r, n, o);
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
}(ar), Zh = Function.prototype.bind;
function _r(e, t) {
  return Zh.call(e, t);
}
var Qh = function() {
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
}(), Gr = function(e) {
  sr(t, e);
  function t(r, n, o) {
    var i = e.call(this) || this, s;
    if (Te(r) || !r)
      s = {
        next: r ?? void 0,
        error: n ?? void 0,
        complete: o ?? void 0
      };
    else {
      var a;
      i && Rn.useDeprecatedNextContext ? (a = Object.create(r), a.unsubscribe = function() {
        return i.unsubscribe();
      }, s = {
        next: r.next && _r(r.next, a),
        error: r.error && _r(r.error, a),
        complete: r.complete && _r(r.complete, a)
      }) : s = r;
    }
    return i.destination = new Qh(s), i;
  }
  return t;
}(rs);
function Pt(e) {
  Xh(e);
}
function ep(e) {
  throw e;
}
var tp = {
  closed: !0,
  next: Bo,
  error: ep,
  complete: Bo
}, rp = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function np(e) {
  return e;
}
function op(e) {
  return e.length === 0 ? np : e.length === 1 ? e[0] : function(r) {
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
    var o = this, i = sp(t) ? t : new Gr(t, r, n);
    return It(function() {
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
    return r = Vo(r), new r(function(o, i) {
      var s = new Gr({
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
  }, e.prototype[rp] = function() {
    return this;
  }, e.prototype.pipe = function() {
    for (var t = [], r = 0; r < arguments.length; r++)
      t[r] = arguments[r];
    return op(t)(this);
  }, e.prototype.toPromise = function(t) {
    var r = this;
    return t = Vo(t), new t(function(n, o) {
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
function Vo(e) {
  var t;
  return (t = e ?? Rn.Promise) !== null && t !== void 0 ? t : Promise;
}
function ip(e) {
  return e && Te(e.next) && Te(e.error) && Te(e.complete);
}
function sp(e) {
  return e && e instanceof rs || ip(e) && ts(e);
}
var ap = On(function(e) {
  return function() {
    e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), Kr = function(e) {
  sr(t, e);
  function t() {
    var r = e.call(this) || this;
    return r.closed = !1, r.currentObservers = null, r.observers = [], r.isStopped = !1, r.hasError = !1, r.thrownError = null, r;
  }
  return t.prototype.lift = function(r) {
    var n = new Ho(this, this);
    return n.operator = r, n;
  }, t.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new ap();
  }, t.prototype.next = function(r) {
    var n = this;
    It(function() {
      var o, i;
      if (n._throwIfClosed(), !n.isStopped) {
        n.currentObservers || (n.currentObservers = Array.from(n.observers));
        try {
          for (var s = zr(n.currentObservers), a = s.next(); !a.done; a = s.next()) {
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
    It(function() {
      if (n._throwIfClosed(), !n.isStopped) {
        n.hasError = n.isStopped = !0, n.thrownError = r;
        for (var o = n.observers; o.length; )
          o.shift().error(r);
      }
    });
  }, t.prototype.complete = function() {
    var r = this;
    It(function() {
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
    return i || s ? es : (this.currentObservers = null, a.push(r), new ar(function() {
      n.currentObservers = null, Yr(a, r);
    }));
  }, t.prototype._checkFinalizedStatuses = function(r) {
    var n = this, o = n.hasError, i = n.thrownError, s = n.isStopped;
    o ? r.error(i) : s && r.complete();
  }, t.prototype.asObservable = function() {
    var r = new zt();
    return r.source = this, r;
  }, t.create = function(r, n) {
    return new Ho(r, n);
  }, t;
}(zt), Ho = function(e) {
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
    return (o = (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(r)) !== null && o !== void 0 ? o : es;
  }, t;
}(Kr), up = On(function(e) {
  return function() {
    e(this), this.name = "EmptyError", this.message = "no elements in sequence";
  };
});
function Or(e, t) {
  var r = typeof t == "object";
  return new Promise(function(n, o) {
    var i = !1, s;
    e.subscribe({
      next: function(a) {
        s = a, i = !0;
      },
      error: o,
      complete: function() {
        i ? n(s) : r ? n(t.defaultValue) : o(new up());
      }
    });
  });
}
class xn {
  constructor(t) {
    ie(this, "config");
    ie(this, "axios");
    t && (this.config = t), this.axios = Qi.create(this.config);
  }
  get interceptors() {
    return this.axios.interceptors;
  }
  static create(t) {
    return new xn(t);
  }
  request(t) {
    return new zt((r) => {
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
function cp(e) {
  return xn.create({
    baseURL: e
  });
}
const te = class {
  constructor(t, r) {
    ie(this, "axiosInstance");
    ie(this, "defaultConfig", {
      contentType: "json",
      cache: !1
    });
    ie(this, "tokenType");
    this.axiosInstance = cp(t), this.setupInterceptor(), r && (this.defaultConfig = {
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
        if (t = await this.useRequestInterceptors(t), t = Pd({}, this.defaultConfig, t), t.headers = {
          ...t.headers,
          ...te.globalHeaders,
          "Content-Type": t.contentType === "formData" ? !1 : t.contentType === "urlEncoded" ? Fr.UrlEncoded : Fr.Json
        }, !t.preparedData) {
          if ((typeof t.cache < "u" ? t.cache : this.defaultConfig.cache) === !1 && (t.headers["Cache-Control"] = "no-cache", t.params = {
            ...t.params,
            axios_timestamp: Date.now()
          }), t.params = Ht(
            To({
              ...t.params,
              ...te.globalParams
            })
          ), t.data = {
            ...t.data,
            ...te.globalData
          }, To(t.data), JSON.stringify(t.data) === "{}")
            t.data = void 0;
          else
            switch (t.contentType) {
              case "formData":
                t.data = Br(t.data);
                break;
              case "urlEncoded":
                t.data = Ht(t.data);
            }
          t.preparedData = !0;
        }
        const r = this.getTokenType(t), n = r ? At.getToken(r) : null;
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
let ge = te;
ie(ge, "tokenType", "base_token"), ie(ge, "globalParams", {}), ie(ge, "globalData", {}), ie(ge, "globalHeaders", {}), ie(ge, "interceptors", /* @__PURE__ */ new Set());
var mt = {}, lp = {
  get exports() {
    return mt;
  },
  set exports(e) {
    mt = e;
  }
}, Ke = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Rr, Wo;
function ns() {
  if (Wo)
    return Rr;
  Wo = 1;
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
      var u = Object.getOwnPropertyNames(s).map(function(c) {
        return s[c];
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
  return Rr = o() ? Object.assign : function(i, s) {
    for (var a, u = n(i), l, c = 1; c < arguments.length; c++) {
      a = Object(arguments[c]);
      for (var d in a)
        t.call(a, d) && (u[d] = a[d]);
      if (e) {
        l = e(a);
        for (var h = 0; h < l.length; h++)
          r.call(a, l[h]) && (u[l[h]] = a[l[h]]);
      }
    }
    return u;
  }, Rr;
}
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ko;
function fp() {
  if (ko)
    return Ke;
  ko = 1, ns();
  var e = vt, t = 60103;
  if (Ke.Fragment = 60107, typeof Symbol == "function" && Symbol.for) {
    var r = Symbol.for;
    t = r("react.element"), Ke.Fragment = r("react.fragment");
  }
  var n = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = Object.prototype.hasOwnProperty, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function s(a, u, l) {
    var c, d = {}, h = null, m = null;
    l !== void 0 && (h = "" + l), u.key !== void 0 && (h = "" + u.key), u.ref !== void 0 && (m = u.ref);
    for (c in u)
      o.call(u, c) && !i.hasOwnProperty(c) && (d[c] = u[c]);
    if (a && a.defaultProps)
      for (c in u = a.defaultProps, u)
        d[c] === void 0 && (d[c] = u[c]);
    return { $$typeof: t, type: a, key: h, ref: m, props: d, _owner: n.current };
  }
  return Ke.jsx = s, Ke.jsxs = s, Ke;
}
var xr = {};
/** @license React v17.0.2
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qo;
function dp() {
  return qo || (qo = 1, function(e) {
    process.env.NODE_ENV !== "production" && function() {
      var t = vt, r = ns(), n = 60103, o = 60106;
      e.Fragment = 60107;
      var i = 60108, s = 60114, a = 60109, u = 60110, l = 60112, c = 60113, d = 60120, h = 60115, m = 60116, v = 60121, p = 60122, T = 60117, S = 60129, j = 60131;
      if (typeof Symbol == "function" && Symbol.for) {
        var R = Symbol.for;
        n = R("react.element"), o = R("react.portal"), e.Fragment = R("react.fragment"), i = R("react.strict_mode"), s = R("react.profiler"), a = R("react.provider"), u = R("react.context"), l = R("react.forward_ref"), c = R("react.suspense"), d = R("react.suspense_list"), h = R("react.memo"), m = R("react.lazy"), v = R("react.block"), p = R("react.server.block"), T = R("react.fundamental"), R("react.scope"), R("react.opaque.id"), S = R("react.debug_trace_mode"), R("react.offscreen"), j = R("react.legacy_hidden");
      }
      var x = typeof Symbol == "function" && Symbol.iterator, I = "@@iterator";
      function P(f) {
        if (f === null || typeof f != "object")
          return null;
        var y = x && f[x] || f[I];
        return typeof y == "function" ? y : null;
      }
      var k = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function B(f) {
        {
          for (var y = arguments.length, _ = new Array(y > 1 ? y - 1 : 0), C = 1; C < y; C++)
            _[C - 1] = arguments[C];
          M("error", f, _);
        }
      }
      function M(f, y, _) {
        {
          var C = k.ReactDebugCurrentFrame, q = C.getStackAddendum();
          q !== "" && (y += "%s", _ = _.concat([q]));
          var z = _.map(function(V) {
            return "" + V;
          });
          z.unshift("Warning: " + y), Function.prototype.apply.call(console[f], console, z);
        }
      }
      var U = !1;
      function se(f) {
        return !!(typeof f == "string" || typeof f == "function" || f === e.Fragment || f === s || f === S || f === i || f === c || f === d || f === j || U || typeof f == "object" && f !== null && (f.$$typeof === m || f.$$typeof === h || f.$$typeof === a || f.$$typeof === u || f.$$typeof === l || f.$$typeof === T || f.$$typeof === v || f[0] === p));
      }
      function St(f, y, _) {
        var C = y.displayName || y.name || "";
        return f.displayName || (C !== "" ? _ + "(" + C + ")" : _);
      }
      function A(f) {
        return f.displayName || "Context";
      }
      function w(f) {
        if (f == null)
          return null;
        if (typeof f.tag == "number" && B("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue."), typeof f == "function")
          return f.displayName || f.name || null;
        if (typeof f == "string")
          return f;
        switch (f) {
          case e.Fragment:
            return "Fragment";
          case o:
            return "Portal";
          case s:
            return "Profiler";
          case i:
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
              return A(y) + ".Consumer";
            case a:
              var _ = f;
              return A(_._context) + ".Provider";
            case l:
              return St(f, f.render, "ForwardRef");
            case h:
              return w(f.type);
            case v:
              return w(f._render);
            case m: {
              var C = f, q = C._payload, z = C._init;
              try {
                return w(z(q));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var E = 0, $, O, L, D, W, G, Y;
      function ee() {
      }
      ee.__reactDisabledLog = !0;
      function ve() {
        {
          if (E === 0) {
            $ = console.log, O = console.info, L = console.warn, D = console.error, W = console.group, G = console.groupCollapsed, Y = console.groupEnd;
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
                value: $
              }),
              info: r({}, f, {
                value: O
              }),
              warn: r({}, f, {
                value: L
              }),
              error: r({}, f, {
                value: D
              }),
              group: r({}, f, {
                value: W
              }),
              groupCollapsed: r({}, f, {
                value: G
              }),
              groupEnd: r({}, f, {
                value: Y
              })
            });
          }
          E < 0 && B("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var we = k.ReactCurrentDispatcher, Se;
      function fe(f, y, _) {
        {
          if (Se === void 0)
            try {
              throw Error();
            } catch (q) {
              var C = q.stack.trim().match(/\n( *(at )?)/);
              Se = C && C[1] || "";
            }
          return `
` + Se + f;
        }
      }
      var ne = !1, ue;
      {
        var it = typeof WeakMap == "function" ? WeakMap : Map;
        ue = new it();
      }
      function Me(f, y) {
        if (!f || ne)
          return "";
        {
          var _ = ue.get(f);
          if (_ !== void 0)
            return _;
        }
        var C;
        ne = !0;
        var q = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var z;
        z = we.current, we.current = null, ve();
        try {
          if (y) {
            var V = function() {
              throw Error();
            };
            if (Object.defineProperty(V.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(V, []);
              } catch (Oe) {
                C = Oe;
              }
              Reflect.construct(f, [], V);
            } else {
              try {
                V.call();
              } catch (Oe) {
                C = Oe;
              }
              f.call(V.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (Oe) {
              C = Oe;
            }
            f();
          }
        } catch (Oe) {
          if (Oe && C && typeof Oe.stack == "string") {
            for (var F = Oe.stack.split(`
`), ae = C.stack.split(`
`), X = F.length - 1, Q = ae.length - 1; X >= 1 && Q >= 0 && F[X] !== ae[Q]; )
              Q--;
            for (; X >= 1 && Q >= 0; X--, Q--)
              if (F[X] !== ae[Q]) {
                if (X !== 1 || Q !== 1)
                  do
                    if (X--, Q--, Q < 0 || F[X] !== ae[Q]) {
                      var _e = `
` + F[X].replace(" at new ", " at ");
                      return typeof f == "function" && ue.set(f, _e), _e;
                    }
                  while (X >= 1 && Q >= 0);
                break;
              }
          }
        } finally {
          ne = !1, we.current = z, le(), Error.prepareStackTrace = q;
        }
        var Ge = f ? f.displayName || f.name : "", Bn = Ge ? fe(Ge) : "";
        return typeof f == "function" && ue.set(f, Bn), Bn;
      }
      function Cn(f, y, _) {
        return Me(f, !1);
      }
      function cs(f) {
        var y = f.prototype;
        return !!(y && y.isReactComponent);
      }
      function _t(f, y, _) {
        if (f == null)
          return "";
        if (typeof f == "function")
          return Me(f, cs(f));
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
              return _t(f.type, y, _);
            case v:
              return Cn(f._render);
            case m: {
              var C = f, q = C._payload, z = C._init;
              try {
                return _t(z(q), y, _);
              } catch {
              }
            }
          }
        return "";
      }
      var An = {}, $n = k.ReactDebugCurrentFrame;
      function Ot(f) {
        if (f) {
          var y = f._owner, _ = _t(f.type, f._source, y ? y.type : null);
          $n.setExtraStackFrame(_);
        } else
          $n.setExtraStackFrame(null);
      }
      function ls(f, y, _, C, q) {
        {
          var z = Function.call.bind(Object.prototype.hasOwnProperty);
          for (var V in f)
            if (z(f, V)) {
              var F = void 0;
              try {
                if (typeof f[V] != "function") {
                  var ae = Error((C || "React class") + ": " + _ + " type `" + V + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof f[V] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw ae.name = "Invariant Violation", ae;
                }
                F = f[V](y, V, C, _, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (X) {
                F = X;
              }
              F && !(F instanceof Error) && (Ot(q), B("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", C || "React class", _, V, typeof F), Ot(null)), F instanceof Error && !(F.message in An) && (An[F.message] = !0, Ot(q), B("Failed %s type: %s", _, F.message), Ot(null));
            }
        }
      }
      var st = k.ReactCurrentOwner, ur = Object.prototype.hasOwnProperty, fs = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, Dn, Nn, cr;
      cr = {};
      function ds(f) {
        if (ur.call(f, "ref")) {
          var y = Object.getOwnPropertyDescriptor(f, "ref").get;
          if (y && y.isReactWarning)
            return !1;
        }
        return f.ref !== void 0;
      }
      function hs(f) {
        if (ur.call(f, "key")) {
          var y = Object.getOwnPropertyDescriptor(f, "key").get;
          if (y && y.isReactWarning)
            return !1;
        }
        return f.key !== void 0;
      }
      function ps(f, y) {
        if (typeof f.ref == "string" && st.current && y && st.current.stateNode !== y) {
          var _ = w(st.current.type);
          cr[_] || (B('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', w(st.current.type), f.ref), cr[_] = !0);
        }
      }
      function ms(f, y) {
        {
          var _ = function() {
            Dn || (Dn = !0, B("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
          };
          _.isReactWarning = !0, Object.defineProperty(f, "key", {
            get: _,
            configurable: !0
          });
        }
      }
      function vs(f, y) {
        {
          var _ = function() {
            Nn || (Nn = !0, B("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
          };
          _.isReactWarning = !0, Object.defineProperty(f, "ref", {
            get: _,
            configurable: !0
          });
        }
      }
      var gs = function(f, y, _, C, q, z, V) {
        var F = {
          $$typeof: n,
          type: f,
          key: y,
          ref: _,
          props: V,
          _owner: z
        };
        return F._store = {}, Object.defineProperty(F._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(F, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: C
        }), Object.defineProperty(F, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: q
        }), Object.freeze && (Object.freeze(F.props), Object.freeze(F)), F;
      };
      function ys(f, y, _, C, q) {
        {
          var z, V = {}, F = null, ae = null;
          _ !== void 0 && (F = "" + _), hs(y) && (F = "" + y.key), ds(y) && (ae = y.ref, ps(y, q));
          for (z in y)
            ur.call(y, z) && !fs.hasOwnProperty(z) && (V[z] = y[z]);
          if (f && f.defaultProps) {
            var X = f.defaultProps;
            for (z in X)
              V[z] === void 0 && (V[z] = X[z]);
          }
          if (F || ae) {
            var Q = typeof f == "function" ? f.displayName || f.name || "Unknown" : f;
            F && ms(V, Q), ae && vs(V, Q);
          }
          return gs(f, F, ae, q, C, st.current, V);
        }
      }
      var lr = k.ReactCurrentOwner, Ln = k.ReactDebugCurrentFrame;
      function Je(f) {
        if (f) {
          var y = f._owner, _ = _t(f.type, f._source, y ? y.type : null);
          Ln.setExtraStackFrame(_);
        } else
          Ln.setExtraStackFrame(null);
      }
      var fr;
      fr = !1;
      function dr(f) {
        return typeof f == "object" && f !== null && f.$$typeof === n;
      }
      function In() {
        {
          if (lr.current) {
            var f = w(lr.current.type);
            if (f)
              return `

Check the render method of \`` + f + "`.";
          }
          return "";
        }
      }
      function bs(f) {
        {
          if (f !== void 0) {
            var y = f.fileName.replace(/^.*[\\\/]/, ""), _ = f.lineNumber;
            return `

Check your code at ` + y + ":" + _ + ".";
          }
          return "";
        }
      }
      var jn = {};
      function Es(f) {
        {
          var y = In();
          if (!y) {
            var _ = typeof f == "string" ? f : f.displayName || f.name;
            _ && (y = `

Check the top-level render call using <` + _ + ">.");
          }
          return y;
        }
      }
      function Mn(f, y) {
        {
          if (!f._store || f._store.validated || f.key != null)
            return;
          f._store.validated = !0;
          var _ = Es(y);
          if (jn[_])
            return;
          jn[_] = !0;
          var C = "";
          f && f._owner && f._owner !== lr.current && (C = " It was passed a child from " + w(f._owner.type) + "."), Je(f), B('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', _, C), Je(null);
        }
      }
      function Un(f, y) {
        {
          if (typeof f != "object")
            return;
          if (Array.isArray(f))
            for (var _ = 0; _ < f.length; _++) {
              var C = f[_];
              dr(C) && Mn(C, y);
            }
          else if (dr(f))
            f._store && (f._store.validated = !0);
          else if (f) {
            var q = P(f);
            if (typeof q == "function" && q !== f.entries)
              for (var z = q.call(f), V; !(V = z.next()).done; )
                dr(V.value) && Mn(V.value, y);
          }
        }
      }
      function ws(f) {
        {
          var y = f.type;
          if (y == null || typeof y == "string")
            return;
          var _;
          if (typeof y == "function")
            _ = y.propTypes;
          else if (typeof y == "object" && (y.$$typeof === l || y.$$typeof === h))
            _ = y.propTypes;
          else
            return;
          if (_) {
            var C = w(y);
            ls(_, f.props, "prop", C, f);
          } else if (y.PropTypes !== void 0 && !fr) {
            fr = !0;
            var q = w(y);
            B("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", q || "Unknown");
          }
          typeof y.getDefaultProps == "function" && !y.getDefaultProps.isReactClassApproved && B("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Ss(f) {
        {
          for (var y = Object.keys(f.props), _ = 0; _ < y.length; _++) {
            var C = y[_];
            if (C !== "children" && C !== "key") {
              Je(f), B("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", C), Je(null);
              break;
            }
          }
          f.ref !== null && (Je(f), B("Invalid attribute `ref` supplied to `React.Fragment`."), Je(null));
        }
      }
      function Fn(f, y, _, C, q, z) {
        {
          var V = se(f);
          if (!V) {
            var F = "";
            (f === void 0 || typeof f == "object" && f !== null && Object.keys(f).length === 0) && (F += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var ae = bs(q);
            ae ? F += ae : F += In();
            var X;
            f === null ? X = "null" : Array.isArray(f) ? X = "array" : f !== void 0 && f.$$typeof === n ? (X = "<" + (w(f.type) || "Unknown") + " />", F = " Did you accidentally export a JSX literal instead of a component?") : X = typeof f, B("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", X, F);
          }
          var Q = ys(f, y, _, q, z);
          if (Q == null)
            return Q;
          if (V) {
            var _e = y.children;
            if (_e !== void 0)
              if (C)
                if (Array.isArray(_e)) {
                  for (var Ge = 0; Ge < _e.length; Ge++)
                    Un(_e[Ge], f);
                  Object.freeze && Object.freeze(_e);
                } else
                  B("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
              else
                Un(_e, f);
          }
          return f === e.Fragment ? Ss(Q) : ws(Q), Q;
        }
      }
      function _s(f, y, _) {
        return Fn(f, y, _, !0);
      }
      function Os(f, y, _) {
        return Fn(f, y, _, !1);
      }
      var Rs = Os, xs = _s;
      e.jsx = Rs, e.jsxs = xs;
    }();
  }(xr)), xr;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = fp() : e.exports = dp();
})(lp);
const Ye = mt.Fragment, Z = mt.jsx, Xr = mt.jsxs, hm = (e = () => {
}) => {
  const [t, r] = re(!1);
  t || (e(), r(!0));
};
var Zr = {}, hp = {
  get exports() {
    return Zr;
  },
  set exports(e) {
    Zr = e;
  }
};
(function(e, t) {
  (function(r, n) {
    e.exports = n();
  })(dh, function() {
    var r = 1e3, n = 6e4, o = 36e5, i = "millisecond", s = "second", a = "minute", u = "hour", l = "day", c = "week", d = "month", h = "quarter", m = "year", v = "date", p = "Invalid Date", T = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, S = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, j = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(A) {
      var w = ["th", "st", "nd", "rd"], E = A % 100;
      return "[" + A + (w[(E - 20) % 10] || w[E] || w[0]) + "]";
    } }, R = function(A, w, E) {
      var $ = String(A);
      return !$ || $.length >= w ? A : "" + Array(w + 1 - $.length).join(E) + A;
    }, x = { s: R, z: function(A) {
      var w = -A.utcOffset(), E = Math.abs(w), $ = Math.floor(E / 60), O = E % 60;
      return (w <= 0 ? "+" : "-") + R($, 2, "0") + ":" + R(O, 2, "0");
    }, m: function A(w, E) {
      if (w.date() < E.date())
        return -A(E, w);
      var $ = 12 * (E.year() - w.year()) + (E.month() - w.month()), O = w.clone().add($, d), L = E - O < 0, D = w.clone().add($ + (L ? -1 : 1), d);
      return +(-($ + (E - O) / (L ? O - D : D - O)) || 0);
    }, a: function(A) {
      return A < 0 ? Math.ceil(A) || 0 : Math.floor(A);
    }, p: function(A) {
      return { M: d, y: m, w: c, d: l, D: v, h: u, m: a, s, ms: i, Q: h }[A] || String(A || "").toLowerCase().replace(/s$/, "");
    }, u: function(A) {
      return A === void 0;
    } }, I = "en", P = {};
    P[I] = j;
    var k = function(A) {
      return A instanceof se;
    }, B = function A(w, E, $) {
      var O;
      if (!w)
        return I;
      if (typeof w == "string") {
        var L = w.toLowerCase();
        P[L] && (O = L), E && (P[L] = E, O = L);
        var D = w.split("-");
        if (!O && D.length > 1)
          return A(D[0]);
      } else {
        var W = w.name;
        P[W] = w, O = W;
      }
      return !$ && O && (I = O), O || !$ && I;
    }, M = function(A, w) {
      if (k(A))
        return A.clone();
      var E = typeof w == "object" ? w : {};
      return E.date = A, E.args = arguments, new se(E);
    }, U = x;
    U.l = B, U.i = k, U.w = function(A, w) {
      return M(A, { locale: w.$L, utc: w.$u, x: w.$x, $offset: w.$offset });
    };
    var se = function() {
      function A(E) {
        this.$L = B(E.locale, null, !0), this.parse(E);
      }
      var w = A.prototype;
      return w.parse = function(E) {
        this.$d = function($) {
          var O = $.date, L = $.utc;
          if (O === null)
            return new Date(NaN);
          if (U.u(O))
            return new Date();
          if (O instanceof Date)
            return new Date(O);
          if (typeof O == "string" && !/Z$/i.test(O)) {
            var D = O.match(T);
            if (D) {
              var W = D[2] - 1 || 0, G = (D[7] || "0").substring(0, 3);
              return L ? new Date(Date.UTC(D[1], W, D[3] || 1, D[4] || 0, D[5] || 0, D[6] || 0, G)) : new Date(D[1], W, D[3] || 1, D[4] || 0, D[5] || 0, D[6] || 0, G);
            }
          }
          return new Date(O);
        }(E), this.$x = E.x || {}, this.init();
      }, w.init = function() {
        var E = this.$d;
        this.$y = E.getFullYear(), this.$M = E.getMonth(), this.$D = E.getDate(), this.$W = E.getDay(), this.$H = E.getHours(), this.$m = E.getMinutes(), this.$s = E.getSeconds(), this.$ms = E.getMilliseconds();
      }, w.$utils = function() {
        return U;
      }, w.isValid = function() {
        return this.$d.toString() !== p;
      }, w.isSame = function(E, $) {
        var O = M(E);
        return this.startOf($) <= O && O <= this.endOf($);
      }, w.isAfter = function(E, $) {
        return M(E) < this.startOf($);
      }, w.isBefore = function(E, $) {
        return this.endOf($) < M(E);
      }, w.$g = function(E, $, O) {
        return U.u(E) ? this[$] : this.set(O, E);
      }, w.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, w.valueOf = function() {
        return this.$d.getTime();
      }, w.startOf = function(E, $) {
        var O = this, L = !!U.u($) || $, D = U.p(E), W = function(fe, ne) {
          var ue = U.w(O.$u ? Date.UTC(O.$y, ne, fe) : new Date(O.$y, ne, fe), O);
          return L ? ue : ue.endOf(l);
        }, G = function(fe, ne) {
          return U.w(O.toDate()[fe].apply(O.toDate("s"), (L ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(ne)), O);
        }, Y = this.$W, ee = this.$M, ve = this.$D, le = "set" + (this.$u ? "UTC" : "");
        switch (D) {
          case m:
            return L ? W(1, 0) : W(31, 11);
          case d:
            return L ? W(1, ee) : W(0, ee + 1);
          case c:
            var we = this.$locale().weekStart || 0, Se = (Y < we ? Y + 7 : Y) - we;
            return W(L ? ve - Se : ve + (6 - Se), ee);
          case l:
          case v:
            return G(le + "Hours", 0);
          case u:
            return G(le + "Minutes", 1);
          case a:
            return G(le + "Seconds", 2);
          case s:
            return G(le + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, w.endOf = function(E) {
        return this.startOf(E, !1);
      }, w.$set = function(E, $) {
        var O, L = U.p(E), D = "set" + (this.$u ? "UTC" : ""), W = (O = {}, O[l] = D + "Date", O[v] = D + "Date", O[d] = D + "Month", O[m] = D + "FullYear", O[u] = D + "Hours", O[a] = D + "Minutes", O[s] = D + "Seconds", O[i] = D + "Milliseconds", O)[L], G = L === l ? this.$D + ($ - this.$W) : $;
        if (L === d || L === m) {
          var Y = this.clone().set(v, 1);
          Y.$d[W](G), Y.init(), this.$d = Y.set(v, Math.min(this.$D, Y.daysInMonth())).$d;
        } else
          W && this.$d[W](G);
        return this.init(), this;
      }, w.set = function(E, $) {
        return this.clone().$set(E, $);
      }, w.get = function(E) {
        return this[U.p(E)]();
      }, w.add = function(E, $) {
        var O, L = this;
        E = Number(E);
        var D = U.p($), W = function(ee) {
          var ve = M(L);
          return U.w(ve.date(ve.date() + Math.round(ee * E)), L);
        };
        if (D === d)
          return this.set(d, this.$M + E);
        if (D === m)
          return this.set(m, this.$y + E);
        if (D === l)
          return W(1);
        if (D === c)
          return W(7);
        var G = (O = {}, O[a] = n, O[u] = o, O[s] = r, O)[D] || 1, Y = this.$d.getTime() + E * G;
        return U.w(Y, this);
      }, w.subtract = function(E, $) {
        return this.add(-1 * E, $);
      }, w.format = function(E) {
        var $ = this, O = this.$locale();
        if (!this.isValid())
          return O.invalidDate || p;
        var L = E || "YYYY-MM-DDTHH:mm:ssZ", D = U.z(this), W = this.$H, G = this.$m, Y = this.$M, ee = O.weekdays, ve = O.months, le = function(ne, ue, it, Me) {
          return ne && (ne[ue] || ne($, L)) || it[ue].slice(0, Me);
        }, we = function(ne) {
          return U.s(W % 12 || 12, ne, "0");
        }, Se = O.meridiem || function(ne, ue, it) {
          var Me = ne < 12 ? "AM" : "PM";
          return it ? Me.toLowerCase() : Me;
        }, fe = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: Y + 1, MM: U.s(Y + 1, 2, "0"), MMM: le(O.monthsShort, Y, ve, 3), MMMM: le(ve, Y), D: this.$D, DD: U.s(this.$D, 2, "0"), d: String(this.$W), dd: le(O.weekdaysMin, this.$W, ee, 2), ddd: le(O.weekdaysShort, this.$W, ee, 3), dddd: ee[this.$W], H: String(W), HH: U.s(W, 2, "0"), h: we(1), hh: we(2), a: Se(W, G, !0), A: Se(W, G, !1), m: String(G), mm: U.s(G, 2, "0"), s: String(this.$s), ss: U.s(this.$s, 2, "0"), SSS: U.s(this.$ms, 3, "0"), Z: D };
        return L.replace(S, function(ne, ue) {
          return ue || fe[ne] || D.replace(":", "");
        });
      }, w.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, w.diff = function(E, $, O) {
        var L, D = U.p($), W = M(E), G = (W.utcOffset() - this.utcOffset()) * n, Y = this - W, ee = U.m(this, W);
        return ee = (L = {}, L[m] = ee / 12, L[d] = ee, L[h] = ee / 3, L[c] = (Y - G) / 6048e5, L[l] = (Y - G) / 864e5, L[u] = Y / o, L[a] = Y / n, L[s] = Y / r, L)[D] || Y, O ? ee : U.a(ee);
      }, w.daysInMonth = function() {
        return this.endOf(d).$D;
      }, w.$locale = function() {
        return P[this.$L];
      }, w.locale = function(E, $) {
        if (!E)
          return this.$L;
        var O = this.clone(), L = B(E, $, !0);
        return L && (O.$L = L), O;
      }, w.clone = function() {
        return U.w(this.$d, this);
      }, w.toDate = function() {
        return new Date(this.valueOf());
      }, w.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, w.toISOString = function() {
        return this.$d.toISOString();
      }, w.toString = function() {
        return this.$d.toUTCString();
      }, A;
    }(), St = se.prototype;
    return M.prototype = St, [["$ms", i], ["$s", s], ["$m", a], ["$H", u], ["$W", l], ["$M", d], ["$y", m], ["$D", v]].forEach(function(A) {
      St[A[1]] = function(w) {
        return this.$g(w, A[0], A[1]);
      };
    }), M.extend = function(A, w) {
      return A.$i || (A(w, se, M), A.$i = !0), M;
    }, M.locale = B, M.isDayjs = k, M.unix = function(A) {
      return M(1e3 * A);
    }, M.en = P[I], M.Ls = P, M.p = {}, M;
  });
})(hp);
const zo = Zr;
function pp(e, t) {
  const r = Be(!1);
  ce(() => {
    if (r.current)
      return e && e();
    r.current = !0;
  }, t);
}
function pm({ initValue: e, key: t }) {
  const [r, n] = re({}), [o, i] = re({}), s = K(
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
      const c = xt.getToken("countDown"), d = xt.getToken("leavingDate");
      if (c && d) {
        const h = JSON.parse(c), m = JSON.parse(d);
        if (h[t]) {
          const v = m, p = zo().unix(), T = {
            ...h
          }, S = {};
          Object.keys(T).forEach((j) => {
            const R = h[j] - (p - v);
            R < e && R > 0 ? S[j] = R : u(j);
          }), n((j) => ({
            ...j,
            ...S
          }));
        }
      }
    }
  }, [t]), pp(() => {
    xt.setToken("countDown", JSON.stringify({ ...r })), xt.setToken("leavingDate", JSON.stringify(zo().unix())), Object.keys(r).forEach((c) => {
      Object.keys(o).includes(c) || a(c), r[c] === 0 && u(c);
    });
  }, [r]);
  const a = K(
    (c) => {
      const d = {};
      o[c] || (d[c] = setInterval(() => {
        n((h) => ({
          ...h,
          [c]: h[c] - 1
        }));
      }, 1e3), i((h) => ({
        ...h,
        ...d
      })));
    },
    [t, o]
  ), u = K(
    (c) => {
      if (o[c]) {
        const d = o[c];
        clearInterval(d), i((h) => (delete h[c], { ...h })), n((h) => (delete h[c], h));
      }
    },
    [o]
  ), l = tt(() => Object.keys(o).includes(t), [o, t]);
  return {
    state: r[t],
    clearCountDown: u,
    initCountdown: s,
    checkTimerProcess: l
  };
}
function mp(e, t) {
  function r(n) {
    let o = [];
    return Array.isArray(n) ? o = n : o = n.split(","), o.length ? t.filter((s) => o.includes(s)).length > 0 : !0;
  }
  for (const n of e)
    if (r(n.permissions || [])) {
      if (n.routes) {
        const o = mp(n.routes, t);
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
  for (let i = 0; i < o.length; i++) {
    const s = o[i];
    if (!s.match(/:([\w\W]+)/gi) && s !== n[i])
      return !1;
  }
  return !0;
};
var Qr = {}, vp = {
  get exports() {
    return Qr;
  },
  set exports(e) {
    Qr = e;
  }
}, Tr = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Jo;
function gp() {
  if (Jo)
    return Tr;
  Jo = 1;
  var e = vt;
  function t(d, h) {
    return d === h && (d !== 0 || 1 / d === 1 / h) || d !== d && h !== h;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useState, o = e.useEffect, i = e.useLayoutEffect, s = e.useDebugValue;
  function a(d, h) {
    var m = h(), v = n({ inst: { value: m, getSnapshot: h } }), p = v[0].inst, T = v[1];
    return i(function() {
      p.value = m, p.getSnapshot = h, u(p) && T({ inst: p });
    }, [d, m, h]), o(function() {
      return u(p) && T({ inst: p }), d(function() {
        u(p) && T({ inst: p });
      });
    }, [d]), s(m), m;
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
  var c = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? l : a;
  return Tr.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : c, Tr;
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
var Go;
function yp() {
  return Go || (Go = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = vt, t = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function r(R) {
      {
        for (var x = arguments.length, I = new Array(x > 1 ? x - 1 : 0), P = 1; P < x; P++)
          I[P - 1] = arguments[P];
        n("error", R, I);
      }
    }
    function n(R, x, I) {
      {
        var P = t.ReactDebugCurrentFrame, k = P.getStackAddendum();
        k !== "" && (x += "%s", I = I.concat([k]));
        var B = I.map(function(M) {
          return String(M);
        });
        B.unshift("Warning: " + x), Function.prototype.apply.call(console[R], console, B);
      }
    }
    function o(R, x) {
      return R === x && (R !== 0 || 1 / R === 1 / x) || R !== R && x !== x;
    }
    var i = typeof Object.is == "function" ? Object.is : o, s = e.useState, a = e.useEffect, u = e.useLayoutEffect, l = e.useDebugValue, c = !1, d = !1;
    function h(R, x, I) {
      c || e.startTransition !== void 0 && (c = !0, r("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
      var P = x();
      if (!d) {
        var k = x();
        i(P, k) || (r("The result of getSnapshot should be cached to avoid an infinite loop"), d = !0);
      }
      var B = s({
        inst: {
          value: P,
          getSnapshot: x
        }
      }), M = B[0].inst, U = B[1];
      return u(function() {
        M.value = P, M.getSnapshot = x, m(M) && U({
          inst: M
        });
      }, [R, P, x]), a(function() {
        m(M) && U({
          inst: M
        });
        var se = function() {
          m(M) && U({
            inst: M
          });
        };
        return R(se);
      }, [R]), l(P), P;
    }
    function m(R) {
      var x = R.getSnapshot, I = R.value;
      try {
        var P = x();
        return !i(I, P);
      } catch {
        return !0;
      }
    }
    function v(R, x, I) {
      return x();
    }
    var p = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", T = !p, S = T ? v : h, j = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : S;
    Pr.useSyncExternalStore = j, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), Pr;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = gp() : e.exports = yp();
})(vp);
const bp = () => !0;
class Ep extends Id {
  constructor() {
    super(...arguments);
    ie(this, "middlewareHandler", bp);
    ie(this, "_routes", []);
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
    const n = Ld([...r, ...this._routes], "path");
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
const ct = new Ep();
function os() {
  const e = K((...o) => {
    ct.addRoute(...o);
  }, []), t = K((o) => {
    ct.removeRoute(o);
  }, []), r = K((o) => ct.on("routeChange", o), []);
  return { routes: Qr.useSyncExternalStore(
    r,
    () => ct.routes
  ), addRoutes: e, removeRoute: t };
}
const mm = () => {
  const { routes: e } = os(), [t, r] = re(), n = Pe(), o = K(
    (i) => {
      const s = i.filter(
        (a) => Yo(n.pathname, a.path)
      );
      for (const a of s)
        if (a) {
          if (a.routes)
            o(a.routes);
          else if (Yo(n.pathname, a.path, !0)) {
            r(a);
            break;
          }
        }
    },
    [n]
  );
  return ce(() => {
    o(e);
  }, [o, e]), t;
}, wp = (e) => {
  ce(
    () => () => {
      e();
    },
    []
  );
};
function Sp(e, t) {
  const r = Be(e);
  r.current = e;
  const n = (t == null ? void 0 : t.wait) ?? 1e3, o = Be(
    wd(
      (...i) => r.current(...i),
      n,
      t
    )
  ).current;
  return wp(() => {
    o.cancel();
  }), {
    run: o,
    cancel: o.cancel,
    flush: o.flush
  };
}
function vm(e, t) {
  const [r, n] = re(e), { run: o } = Sp((i) => {
    n(i);
  }, t);
  return [r, o];
}
const gm = (e, t) => {
  const r = Be(e);
  r.current = e;
  const n = re()[1], o = K(() => {
    i(), n(
      setInterval(() => r.current(), t)
    );
  }, [r.current, t]), i = K(() => {
    n((s) => {
      s && clearInterval(s);
    });
  }, []);
  return {
    run: o,
    cancel: i
  };
}, _p = (e = !1) => {
  const [t, r] = re(e), n = K(() => {
    r((s) => !s);
  }, []), o = K(() => {
    r(!0);
  }, []), i = K(() => {
    r(!1);
  }, []);
  return { state: t, toggle: n, on: o, off: i };
}, is = Xo(
  void 0
);
function ym({
  children: e,
  color: t,
  isWrap: r = !1,
  component: n
}) {
  const { state: o, on: i, off: s } = _p(), a = re(0)[1], u = K(() => {
    i(), a((c) => c + 1), a(1);
  }, []), l = K(() => {
    setTimeout(() => {
      a((c) => c === 1 ? (s(), 0) : c - 1);
    }, 500);
  }, []);
  return /* @__PURE__ */ Z(is.Provider, { value: { startLoading: u, stopLoading: l, state: o }, children: r ? /* @__PURE__ */ Z(n, { state: o, color: t, children: e }) : /* @__PURE__ */ Xr(Ye, { children: [
    e,
    /* @__PURE__ */ Z(n, { state: o, color: t })
  ] }) });
}
const ss = (e) => {
  const t = en(is);
  if (t === void 0)
    throw new Error("useLoading must be used in LoadingProvider");
  return ce(() => {
    typeof e > "u" || (e ? t.startLoading() : t.stopLoading());
  }, [e, t]), t;
};
var Fe = /* @__PURE__ */ ((e) => (e.Standing = "standing", e.Processing = "processing", e.Success = "success", e.Failed = "Failed", e))(Fe || {});
function Tn(e) {
  ce(() => e(), []);
}
function Op(e, t) {
  const r = Be(new Kr()), [n, o] = re(), { startLoading: i, stopLoading: s } = ss(), [a, u] = re(Fe.Standing), [l, c] = re(), [d, h] = re(), m = tt(() => a === Fe.Processing, [a]), v = K(
    (...T) => {
      u(Fe.Processing), t != null && t.showLoading && i(), r.current.next(e(...T));
    },
    [e]
  ), p = K(() => {
    n == null || n.unsubscribe(), u(Fe.Standing), t != null && t.showLoading && s();
  }, [n]);
  return Tn(() => (r.current.closed && (r.current = new Kr()), r.current.subscribe({
    next: (T) => {
      o(
        T.subscribe({
          next: c,
          complete: () => {
            u(Fe.Success), t != null && t.showLoading && s();
          },
          error: (S) => {
            u(Fe.Failed), h(S), t != null && t.showLoading && s();
          }
        })
      );
    }
  }), () => {
    t != null && t.showLoading && s(), r.current.unsubscribe();
  })), {
    run: v,
    cancel: p,
    state: a,
    processing: m,
    result: l,
    error: d
  };
}
const Rp = { attributes: !0, childList: !0, subtree: !0 }, bm = (e, t) => {
  const r = tt(() => new MutationObserver(t), [t]);
  ce(() => {
    const n = e instanceof HTMLElement ? e : e.current;
    return n && r.observe(n, Rp), () => {
      r.disconnect();
    };
  }, [r, e]);
};
function Em(e) {
  const t = Be();
  return ce(() => {
    t.current = e;
  }), t.current;
}
const wm = (e, t) => {
  const r = Be(e);
  r.current = e;
  const n = re()[1], o = K(() => {
    i(), n(
      setTimeout(() => r.current(), t)
    );
  }, [r.current, t]), i = K(() => {
    n((s) => {
      s && clearTimeout(s);
    });
  }, []);
  return {
    run: o,
    cancel: i
  };
};
function Sm({ get: e, set: t }, r) {
  const n = tt(e, r), o = K(t, r);
  return [n, o];
}
const as = Xo(void 0), _m = ({
  children: e,
  defaultTokens: t = () => ({}),
  fetchUserOnLogin: r = () => new zt((o) => o.next(void 0)),
  fetchRefreshToken: n
}) => {
  const [o, i] = re(), [s, a] = re(t), [u, l] = re(!1), { run: c, result: d } = Op(r), h = K(
    (x, I) => {
      l(!0), a(x), I ? i(I) : c(x);
    },
    [c]
  ), m = K(() => {
    i(void 0), a({}), l(!1);
  }, []);
  ce(() => {
    var x;
    (x = Object.values(t())[0]) != null && x.length && (c(t()), l(!0));
  }, [Vr.subdomain]), ce(() => {
    d && i(d);
  }, [d]), ce(() => {
    for (const x in s)
      if (Object.prototype.hasOwnProperty.call(s, x)) {
        const I = s[x];
        At.setToken(x, I || "");
      }
    return () => {
      for (const x in s)
        Object.prototype.hasOwnProperty.call(s, x) && At.setToken(x, "");
    };
  }, [s]);
  const [v, p] = re(!1), [T, S] = re([]), j = (x, I) => {
    T.forEach((P) => {
      x ? P.reject(x) : P.resolve(I);
    }), T.splice(0);
  }, R = ge.addInterceptor({
    response: {
      error: (x, I) => {
        if (!(x instanceof Kh))
          return x;
        const { config: P, response: k } = x;
        if (!P || !k)
          return Promise.reject(x);
        if (k.status === 401) {
          if (console.log("Refresh Token..."), v)
            return new Promise(function(M, U) {
              T.push({ resolve: M, reject: U });
            }).then(() => Or(I.request(P))).catch((M) => M);
          p(!0);
          const B = At.getToken("refresh_token");
          return B ? n ? new Promise((M, U) => {
            Or(n(B)).then(({ data: se }) => {
              p(!1), j(null, se.data.accessToken), h({
                base_token: se.data.accessToken,
                refresh_token: se.data.refreshToken
              }), M(Or(I.request(P)));
            }).catch((se) => {
              p(!0), m(), j(se), U(se);
            });
          }) : Promise.reject(x) : (console.log("Not found refresh token app"), Promise.reject(x));
        }
        return Promise.reject(x);
      }
    }
  });
  return Tn(() => R()), /* @__PURE__ */ Z(as.Provider, { value: { user: o, tokens: s, isLoggedIn: u, login: h, logout: m }, children: e });
};
function Om() {
  const e = en(as);
  if (!e)
    throw new Error("useAuthContext must be used in AuthProvider");
  return e;
}
const Pn = vt.createContext(void 0), Rm = ({
  userPermissions: e,
  isUser: t,
  children: r
}) => {
  const n = K(
    (o) => {
      let i = [];
      return Array.isArray(o) ? i = o : i = o.split(","), i.length ? t ? e.filter((a) => i.includes(a)).length > 0 : !1 : !0;
    },
    [t, e]
  );
  return /* @__PURE__ */ Z(Pn.Provider, { value: { userPermissions: e, can: n }, children: r });
}, xp = (e) => {
  const t = en(Pn);
  if (!t)
    throw new Error("useAuthorization must be used in AuthorizationProvider");
  return {
    granted: tt(() => e ? t.can(e) : !0, [e, t.can]),
    ...t
  };
}, xm = Zo(
  ({ permissions: e, children: t, guestView: r }) => {
    const { granted: n } = xp(e);
    return typeof t == "function" ? t(n) : /* @__PURE__ */ Z(Ye, { children: n ? t : r });
  }
);
function Tm(e) {
  return (t) => (r) => /* @__PURE__ */ Z(Pn.Consumer, { children: (n) => /* @__PURE__ */ Z(Ye, { children: (n == null ? void 0 : n.can(e || [])) && /* @__PURE__ */ Z(t, { ...r }) }) });
}
function Pm({
  component: e,
  props: t
}) {
  return /* @__PURE__ */ Z(e, { ...t });
}
function Cm({
  children: e
}) {
  const { startLoading: t, stopLoading: r } = ss();
  return Tn(() => ge.addInterceptor({
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
  })), /* @__PURE__ */ Z(Ye, { children: e });
}
function Am(e, t) {
  return () => {
    const r = new ge(e().baseURL, e());
    return xd(t, (n) => (...o) => n(r, ...o));
  };
}
function Tp(e, t = "/") {
  const r = {}, n = e.Index.length > 0 ? `${t}${e.Index}` : "";
  for (const o in e)
    if (Object.prototype.hasOwnProperty.call(e, o)) {
      const i = e[o];
      typeof i == "object" ? r[o] = Tp(i, n !== "/" ? n + "/" : "/") : o === "Index" ? r[o] = n.length ? n : t : r[o] = n + "/" + i;
    }
  return r;
}
const Pp = ({
  route: { component: e, ...t }
}) => {
  var r;
  return /* @__PURE__ */ Z(Ye, { children: (r = t.routes) != null && r.length && !t.element && !e ? /* @__PURE__ */ Z(Oa, {}) : t.element || (e ? /* @__PURE__ */ Z(e, {}) : null) });
}, Cp = Zo(Pp), Ko = ({ route: e }) => {
  const t = Yt(), [r, n] = re();
  return ce(() => {
    (async () => n(
      await ct.canPassMiddleware(e, t)
    ))();
  }, [t, e]), r !== void 0 ? Cs(r) ? r : r ? /* @__PURE__ */ Z(Cp, { route: e }) : null : null;
}, us = (e) => {
  if (e.routes) {
    const { routes: t, element: r, index: n, ...o } = e, i = t.map((s) => us(s));
    return /* @__PURE__ */ Vn(
      Mt,
      {
        element: /* @__PURE__ */ Z(Ko, { route: { ...o, element: r, routes: t } }),
        ...o,
        index: n,
        key: Po(12)
      },
      i
    );
  }
  return /* @__PURE__ */ Vn(
    Mt,
    {
      element: /* @__PURE__ */ Z(Ko, { route: e }),
      ...e,
      key: Po(12)
    }
  );
}, Ap = ({ onChange: e }) => {
  const t = Pe();
  return ce(() => {
    e && e(t);
  }, [t.pathname]), /* @__PURE__ */ Z(Ye, {});
}, $m = ({
  routes: e,
  notFoundElement: t,
  onRouteChange: r
}) => {
  const n = tt(
    () => e.map((o) => us(o)),
    [e]
  );
  return /* @__PURE__ */ Xr(Ye, { children: [
    /* @__PURE__ */ Z(Ap, { onChange: r }),
    /* @__PURE__ */ Xr(xa, { children: [
      n,
      /* @__PURE__ */ Z(Mt, { path: "*", element: t })
    ] })
  ] });
};
function Dm(e) {
  const t = e;
  return (r) => {
    const n = os();
    return /* @__PURE__ */ Z(t, { ...r, routes: n });
  };
}
export {
  ge as Api,
  Cm as ApiLoadingHandlerProvider,
  _m as AuthProvider,
  Rm as AuthorizationProvider,
  xn as AxiosObservable,
  Vp as BrowserRouter,
  Id as EventListenersManager,
  is as LoadingContext,
  ym as LoadingProvider,
  Ap as LocationEffect,
  Bp as Navigate,
  Oa as Outlet,
  xm as PrivateView,
  Fr as RequestHeaderContentType,
  Ko as RouteMiddleware,
  Cp as RouteRenderer,
  $m as RouterGenerator,
  ct as RouterHandler,
  xt as StorageManager,
  Di as StorageManagerClass,
  At as TokenManager,
  qp as clearObject,
  To as clearUndefinedProperties,
  Vr as coreConfig,
  Am as createRepository,
  Tp as createRoutePath,
  Kp as createVariableWithWatcher,
  kp as emptyObject,
  mp as findRouteHasPermission,
  Br as formData,
  Np as generatePath,
  us as generateRoutes,
  Pm as lazyComponent,
  Po as makeId,
  Jp as passwordRegex,
  Yo as pathMatched,
  zp as phoneNumberRegex,
  Ht as urlEncoded,
  Mp as useActionData,
  Fp as useAsyncError,
  Up as useAsyncValue,
  Om as useAuthContext,
  xp as useAuthorization,
  Wp as useBeforeUnload,
  hm as useConstructor,
  pm as useCountDown,
  mm as useCurrentRoute,
  Sp as useDebounceFn,
  vm as useDebounceState,
  pp as useDidUpdate,
  gm as useInterval,
  Op as useJob,
  ss as useLoading,
  Pe as useLocation,
  Tn as useMount,
  Yt as useNavigate,
  jp as useNavigation,
  bm as useOnElementChange,
  pa as useOutlet,
  Lp as useOutletContext,
  Ip as useParams,
  Em as usePrevious,
  os as useRoutes,
  Hp as useSearchParams,
  wm as useTimeout,
  _p as useToggle,
  wp as useUnMount,
  Sm as useWritableMemo,
  Yp as usernameRegex,
  Gp as validateAsciiChars,
  Tm as withAuthorization,
  Dm as withRoutes
};

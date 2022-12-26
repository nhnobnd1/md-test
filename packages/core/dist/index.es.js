var Ea = Object.defineProperty;
var wa = (e, t, r) => t in e ? Ea(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var G = (e, t, r) => (wa(e, typeof t != "symbol" ? t + "" : t, r), r);
import * as b from "react";
import Ye, { useState as z, useCallback as V, useEffect as J, useRef as Ee, createContext as Wo, useContext as jr, useMemo as Xe, memo as Ho, isValidElement as _a, createElement as Ln } from "react";
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
function vt() {
  return vt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, vt.apply(this, arguments);
}
var he;
(function(e) {
  e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
})(he || (he = {}));
const $n = "popstate";
function Sa(e) {
  e === void 0 && (e = {});
  function t(n, o) {
    let {
      pathname: i,
      search: a,
      hash: s
    } = n.location;
    return dr(
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
    return typeof o == "string" ? o : Ne(o);
  }
  return xa(t, r, null, e);
}
function R(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function Oa() {
  return Math.random().toString(36).substr(2, 8);
}
function In(e) {
  return {
    usr: e.state,
    key: e.key
  };
}
function dr(e, t, r, n) {
  return r === void 0 && (r = null), vt({
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: ""
  }, typeof t == "string" ? $e(t) : t, {
    state: r,
    key: t && t.key || n || Oa()
  });
}
function Ne(e) {
  let {
    pathname: t = "/",
    search: r = "",
    hash: n = ""
  } = e;
  return r && r !== "?" && (t += r.charAt(0) === "?" ? r : "?" + r), n && n !== "#" && (t += n.charAt(0) === "#" ? n : "#" + n), t;
}
function $e(e) {
  let t = {};
  if (e) {
    let r = e.indexOf("#");
    r >= 0 && (t.hash = e.substr(r), e = e.substr(0, r));
    let n = e.indexOf("?");
    n >= 0 && (t.search = e.substr(n), e = e.substr(0, n)), e && (t.pathname = e);
  }
  return t;
}
function Ra(e) {
  let t = typeof window < "u" && typeof window.location < "u" && window.location.origin !== "null" ? window.location.origin : window.location.href, r = typeof e == "string" ? e : Ne(e);
  return R(t, "No window.location.(origin|href) available to create URL for href: " + r), new URL(r, t);
}
function xa(e, t, r, n) {
  n === void 0 && (n = {});
  let {
    window: o = document.defaultView,
    v5Compat: i = !1
  } = n, a = o.history, s = he.Pop, u = null;
  function l() {
    s = he.Pop, u && u({
      action: s,
      location: p.location
    });
  }
  function f(m, g) {
    s = he.Push;
    let v = dr(p.location, m, g);
    r && r(v, m);
    let S = In(v), w = p.createHref(v);
    try {
      a.pushState(S, "", w);
    } catch {
      o.location.assign(w);
    }
    i && u && u({
      action: s,
      location: p.location
    });
  }
  function d(m, g) {
    s = he.Replace;
    let v = dr(p.location, m, g);
    r && r(v, m);
    let S = In(v), w = p.createHref(v);
    a.replaceState(S, "", w), i && u && u({
      action: s,
      location: p.location
    });
  }
  let p = {
    get action() {
      return s;
    },
    get location() {
      return e(o, a);
    },
    listen(m) {
      if (u)
        throw new Error("A history only accepts one active listener");
      return o.addEventListener($n, l), u = m, () => {
        o.removeEventListener($n, l), u = null;
      };
    },
    createHref(m) {
      return t(o, m);
    },
    encodeLocation(m) {
      let g = Ra(typeof m == "string" ? m : Ne(m));
      return {
        pathname: g.pathname,
        search: g.search,
        hash: g.hash
      };
    },
    push: f,
    replace: d,
    go(m) {
      return a.go(m);
    }
  };
  return p;
}
var jn;
(function(e) {
  e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error";
})(jn || (jn = {}));
function Pa(e, t, r) {
  r === void 0 && (r = "/");
  let n = typeof t == "string" ? $e(t) : t, o = zo(n.pathname || "/", r);
  if (o == null)
    return null;
  let i = ko(e);
  Ta(i);
  let a = null;
  for (let s = 0; a == null && s < i.length; ++s)
    a = Ua(
      i[s],
      Ba(o)
    );
  return a;
}
function ko(e, t, r, n) {
  t === void 0 && (t = []), r === void 0 && (r = []), n === void 0 && (n = "");
  let o = (i, a, s) => {
    let u = {
      relativePath: s === void 0 ? i.path || "" : s,
      caseSensitive: i.caseSensitive === !0,
      childrenIndex: a,
      route: i
    };
    u.relativePath.startsWith("/") && (R(u.relativePath.startsWith(n), 'Absolute route path "' + u.relativePath + '" nested under path ' + ('"' + n + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), u.relativePath = u.relativePath.slice(n.length));
    let l = ae([n, u.relativePath]), f = r.concat(u);
    i.children && i.children.length > 0 && (R(
      i.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + l + '".')
    ), ko(i.children, t, f, l)), !(i.path == null && !i.index) && t.push({
      path: l,
      score: Ia(l, i.index),
      routesMeta: f
    });
  };
  return e.forEach((i, a) => {
    var s;
    if (i.path === "" || !((s = i.path) != null && s.includes("?")))
      o(i, a);
    else
      for (let u of qo(i.path))
        o(i, a, u);
  }), t;
}
function qo(e) {
  let t = e.split("/");
  if (t.length === 0)
    return [];
  let [r, ...n] = t, o = r.endsWith("?"), i = r.replace(/\?$/, "");
  if (n.length === 0)
    return o ? [i, ""] : [i];
  let a = qo(n.join("/")), s = [];
  return s.push(...a.map((u) => u === "" ? i : [i, u].join("/"))), o && s.push(...a), s.map((u) => e.startsWith("/") && u === "" ? "/" : u);
}
function Ta(e) {
  e.sort((t, r) => t.score !== r.score ? r.score - t.score : ja(t.routesMeta.map((n) => n.childrenIndex), r.routesMeta.map((n) => n.childrenIndex)));
}
const Ca = /^:\w+$/, Aa = 3, Na = 2, Da = 1, La = 10, $a = -2, Un = (e) => e === "*";
function Ia(e, t) {
  let r = e.split("/"), n = r.length;
  return r.some(Un) && (n += $a), t && (n += Na), r.filter((o) => !Un(o)).reduce((o, i) => o + (Ca.test(i) ? Aa : i === "" ? Da : La), n);
}
function ja(e, t) {
  return e.length === t.length && e.slice(0, -1).every((n, o) => n === t[o]) ? e[e.length - 1] - t[t.length - 1] : 0;
}
function Ua(e, t) {
  let {
    routesMeta: r
  } = e, n = {}, o = "/", i = [];
  for (let a = 0; a < r.length; ++a) {
    let s = r[a], u = a === r.length - 1, l = o === "/" ? t : t.slice(o.length) || "/", f = Fa({
      path: s.relativePath,
      caseSensitive: s.caseSensitive,
      end: u
    }, l);
    if (!f)
      return null;
    Object.assign(n, f.params);
    let d = s.route;
    i.push({
      params: n,
      pathname: ae([o, f.pathname]),
      pathnameBase: ka(ae([o, f.pathnameBase])),
      route: d
    }), f.pathnameBase !== "/" && (o = ae([o, f.pathnameBase]));
  }
  return i;
}
function _h(e, t) {
  t === void 0 && (t = {});
  let r = e;
  return r.endsWith("*") && r !== "*" && !r.endsWith("/*") && (re(!1, 'Route path "' + r + '" will be treated as if it were ' + ('"' + r.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + r.replace(/\*$/, "/*") + '".')), r = r.replace(/\*$/, "/*")), r.replace(/^:(\w+)/g, (n, o) => (R(t[o] != null, 'Missing ":' + o + '" param'), t[o])).replace(/\/:(\w+)/g, (n, o) => (R(t[o] != null, 'Missing ":' + o + '" param'), "/" + t[o])).replace(/(\/?)\*/, (n, o, i, a) => {
    const s = "*";
    return t[s] == null ? a === "/*" ? "/" : "" : "" + o + t[s];
  });
}
function Fa(e, t) {
  typeof e == "string" && (e = {
    path: e,
    caseSensitive: !1,
    end: !0
  });
  let [r, n] = Ma(e.path, e.caseSensitive, e.end), o = t.match(r);
  if (!o)
    return null;
  let i = o[0], a = i.replace(/(.)\/+$/, "$1"), s = o.slice(1);
  return {
    params: n.reduce((l, f, d) => {
      if (f === "*") {
        let p = s[d] || "";
        a = i.slice(0, i.length - p.length).replace(/(.)\/+$/, "$1");
      }
      return l[f] = Va(s[d] || "", f), l;
    }, {}),
    pathname: i,
    pathnameBase: a,
    pattern: e
  };
}
function Ma(e, t, r) {
  t === void 0 && (t = !1), r === void 0 && (r = !0), re(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
  let n = [], o = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^$?{}|()[\]]/g, "\\$&").replace(/\/:(\w+)/g, (a, s) => (n.push(s), "/([^\\/]+)"));
  return e.endsWith("*") ? (n.push("*"), o += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? o += "\\/*$" : e !== "" && e !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, t ? void 0 : "i"), n];
}
function Ba(e) {
  try {
    return decodeURI(e);
  } catch (t) {
    return re(!1, 'The URL path "' + e + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + t + ").")), e;
  }
}
function Va(e, t) {
  try {
    return decodeURIComponent(e);
  } catch (r) {
    return re(!1, 'The value for the URL param "' + t + '" will not be decoded because' + (' the string "' + e + '" is a malformed URL segment. This is probably') + (" due to a bad percent encoding (" + r + ").")), e;
  }
}
function zo(e, t) {
  if (t === "/")
    return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let r = t.endsWith("/") ? t.length - 1 : t.length, n = e.charAt(r);
  return n && n !== "/" ? null : e.slice(r) || "/";
}
function re(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function Wa(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: r,
    search: n = "",
    hash: o = ""
  } = typeof e == "string" ? $e(e) : e;
  return {
    pathname: r ? r.startsWith("/") ? r : Ha(r, t) : t,
    search: qa(n),
    hash: za(o)
  };
}
function Ha(e, t) {
  let r = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((o) => {
    o === ".." ? r.length > 1 && r.pop() : o !== "." && r.push(o);
  }), r.length > 1 ? r.join("/") : "/";
}
function Xt(e, t, r, n) {
  return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(n) + "].  Please separate it out to the ") + ("`to." + r + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function Go(e) {
  return e.filter((t, r) => r === 0 || t.route.path && t.route.path.length > 0);
}
function Jo(e, t, r, n) {
  n === void 0 && (n = !1);
  let o;
  typeof e == "string" ? o = $e(e) : (o = vt({}, e), R(!o.pathname || !o.pathname.includes("?"), Xt("?", "pathname", "search", o)), R(!o.pathname || !o.pathname.includes("#"), Xt("#", "pathname", "hash", o)), R(!o.search || !o.search.includes("#"), Xt("#", "search", "hash", o)));
  let i = e === "" || o.pathname === "", a = i ? "/" : o.pathname, s;
  if (n || a == null)
    s = r;
  else {
    let d = t.length - 1;
    if (a.startsWith("..")) {
      let p = a.split("/");
      for (; p[0] === ".."; )
        p.shift(), d -= 1;
      o.pathname = p.join("/");
    }
    s = d >= 0 ? t[d] : "/";
  }
  let u = Wa(o, s), l = a && a !== "/" && a.endsWith("/"), f = (i || a === ".") && r.endsWith("/");
  return !u.pathname.endsWith("/") && (l || f) && (u.pathname += "/"), u;
}
const ae = (e) => e.join("/").replace(/\/\/+/g, "/"), ka = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"), qa = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, za = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e;
class Ga {
  constructor(t, r, n, o) {
    o === void 0 && (o = !1), this.status = t, this.statusText = r || "", this.internal = o, n instanceof Error ? (this.data = n.toString(), this.error = n) : this.data = n;
  }
}
function Ja(e) {
  return e instanceof Ga;
}
const Ka = ["post", "put", "patch", "delete"];
[...Ka];
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
function pr() {
  return pr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, pr.apply(this, arguments);
}
function Ya(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
const Ko = typeof Object.is == "function" ? Object.is : Ya, {
  useState: Xa,
  useEffect: Za,
  useLayoutEffect: Qa,
  useDebugValue: es
} = b;
let Fn = !1, Mn = !1;
function ts(e, t, r) {
  process.env.NODE_ENV !== "production" && (Fn || "startTransition" in b && (Fn = !0, console.error("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release.")));
  const n = t();
  if (process.env.NODE_ENV !== "production" && !Mn) {
    const a = t();
    Ko(n, a) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), Mn = !0);
  }
  const [{
    inst: o
  }, i] = Xa({
    inst: {
      value: n,
      getSnapshot: t
    }
  });
  return Qa(() => {
    o.value = n, o.getSnapshot = t, Zt(o) && i({
      inst: o
    });
  }, [e, n, t]), Za(() => (Zt(o) && i({
    inst: o
  }), e(() => {
    Zt(o) && i({
      inst: o
    });
  })), [e]), es(n), n;
}
function Zt(e) {
  const t = e.getSnapshot, r = e.value;
  try {
    const n = t();
    return !Ko(r, n);
  } catch {
    return !0;
  }
}
function rs(e, t, r) {
  return t();
}
const ns = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", os = !ns, is = os ? rs : ts;
"useSyncExternalStore" in b && ((e) => e.useSyncExternalStore)(b);
const Yo = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (Yo.displayName = "DataStaticRouterContext");
const Ur = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (Ur.displayName = "DataRouter");
const Ze = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (Ze.displayName = "DataRouterState");
const Fr = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (Fr.displayName = "Await");
const ge = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (ge.displayName = "Navigation");
const Qe = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (Qe.displayName = "Location");
const X = /* @__PURE__ */ b.createContext({
  outlet: null,
  matches: []
});
process.env.NODE_ENV !== "production" && (X.displayName = "Route");
const Mr = /* @__PURE__ */ b.createContext(null);
process.env.NODE_ENV !== "production" && (Mr.displayName = "RouteError");
function as(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t;
  Ie() || (process.env.NODE_ENV !== "production" ? R(
    !1,
    "useHref() may be used only in the context of a <Router> component."
  ) : R(!1));
  let {
    basename: n,
    navigator: o
  } = b.useContext(ge), {
    hash: i,
    pathname: a,
    search: s
  } = Tt(e, {
    relative: r
  }), u = a;
  return n !== "/" && (u = a === "/" ? n : ae([n, a])), o.createHref({
    pathname: u,
    search: s,
    hash: i
  });
}
function Ie() {
  return b.useContext(Qe) != null;
}
function ce() {
  return Ie() || (process.env.NODE_ENV !== "production" ? R(
    !1,
    "useLocation() may be used only in the context of a <Router> component."
  ) : R(!1)), b.useContext(Qe).location;
}
function Pt() {
  Ie() || (process.env.NODE_ENV !== "production" ? R(
    !1,
    "useNavigate() may be used only in the context of a <Router> component."
  ) : R(!1));
  let {
    basename: e,
    navigator: t
  } = b.useContext(ge), {
    matches: r
  } = b.useContext(X), {
    pathname: n
  } = ce(), o = JSON.stringify(Go(r).map((s) => s.pathnameBase)), i = b.useRef(!1);
  return b.useEffect(() => {
    i.current = !0;
  }), b.useCallback(function(s, u) {
    if (u === void 0 && (u = {}), process.env.NODE_ENV !== "production" && re(i.current, "You should call navigate() in a React.useEffect(), not when your component is first rendered."), !i.current)
      return;
    if (typeof s == "number") {
      t.go(s);
      return;
    }
    let l = Jo(s, JSON.parse(o), n, u.relative === "path");
    e !== "/" && (l.pathname = l.pathname === "/" ? e : ae([e, l.pathname])), (u.replace ? t.replace : t.push)(l, u.state, u);
  }, [e, t, o, n]);
}
const Xo = /* @__PURE__ */ b.createContext(null);
function Sh() {
  return b.useContext(Xo);
}
function ss(e) {
  let t = b.useContext(X).outlet;
  return t && /* @__PURE__ */ b.createElement(Xo.Provider, {
    value: e
  }, t);
}
function Oh() {
  let {
    matches: e
  } = b.useContext(X), t = e[e.length - 1];
  return t ? t.params : {};
}
function Tt(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t, {
    matches: n
  } = b.useContext(X), {
    pathname: o
  } = ce(), i = JSON.stringify(Go(n).map((a) => a.pathnameBase));
  return b.useMemo(() => Jo(e, JSON.parse(i), o, r === "path"), [e, i, o, r]);
}
function us(e, t) {
  Ie() || (process.env.NODE_ENV !== "production" ? R(
    !1,
    "useRoutes() may be used only in the context of a <Router> component."
  ) : R(!1));
  let {
    navigator: r
  } = b.useContext(ge), n = b.useContext(Ze), {
    matches: o
  } = b.useContext(X), i = o[o.length - 1], a = i ? i.params : {}, s = i ? i.pathname : "/", u = i ? i.pathnameBase : "/", l = i && i.route;
  if (process.env.NODE_ENV !== "production") {
    let w = l && l.path || "";
    vs(s, !l || w.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + s + '" (under <Route path="' + w + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + w + '"> to <Route ') + ('path="' + (w === "/" ? "*" : w + "/*") + '">.'));
  }
  let f = ce(), d;
  if (t) {
    var p;
    let w = typeof t == "string" ? $e(t) : t;
    u === "/" || (p = w.pathname) != null && p.startsWith(u) || (process.env.NODE_ENV !== "production" ? R(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + u + '" ') + ('but pathname "' + w.pathname + '" was given in the `location` prop.')) : R(!1)), d = w;
  } else
    d = f;
  let m = d.pathname || "/", g = u === "/" ? m : m.slice(u.length) || "/", v = Pa(e, {
    pathname: g
  });
  process.env.NODE_ENV !== "production" && (process.env.NODE_ENV !== "production" && re(l || v != null, 'No routes matched location "' + d.pathname + d.search + d.hash + '" '), process.env.NODE_ENV !== "production" && re(v == null || v[v.length - 1].route.element !== void 0, 'Matched leaf route at location "' + d.pathname + d.search + d.hash + '" does not have an element. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.'));
  let S = ds(v && v.map((w) => Object.assign({}, w, {
    params: Object.assign({}, a, w.params),
    pathname: ae([
      u,
      r.encodeLocation ? r.encodeLocation(w.pathname).pathname : w.pathname
    ]),
    pathnameBase: w.pathnameBase === "/" ? u : ae([
      u,
      r.encodeLocation ? r.encodeLocation(w.pathnameBase).pathname : w.pathnameBase
    ])
  })), o, n || void 0);
  return t && S ? /* @__PURE__ */ b.createElement(Qe.Provider, {
    value: {
      location: pr({
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default"
      }, d),
      navigationType: he.Pop
    }
  }, S) : S;
}
function cs() {
  let e = ms(), t = Ja(e) ? e.status + " " + e.statusText : e instanceof Error ? e.message : JSON.stringify(e), r = e instanceof Error ? e.stack : null, n = "rgba(200,200,200, 0.5)", o = {
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
class ls extends b.Component {
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
    }, /* @__PURE__ */ b.createElement(Mr.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function fs(e) {
  let {
    routeContext: t,
    match: r,
    children: n
  } = e, o = b.useContext(Yo);
  return o && r.route.errorElement && (o._deepestRenderedBoundaryId = r.route.id), /* @__PURE__ */ b.createElement(X.Provider, {
    value: t
  }, n);
}
function ds(e, t, r) {
  if (t === void 0 && (t = []), e == null)
    if (r != null && r.errors)
      e = r.matches;
    else
      return null;
  let n = e, o = r == null ? void 0 : r.errors;
  if (o != null) {
    let i = n.findIndex((a) => a.route.id && (o == null ? void 0 : o[a.route.id]));
    i >= 0 || (process.env.NODE_ENV !== "production" ? R(!1, "Could not find a matching route for the current errors: " + o) : R(!1)), n = n.slice(0, Math.min(n.length, i + 1));
  }
  return n.reduceRight((i, a, s) => {
    let u = a.route.id ? o == null ? void 0 : o[a.route.id] : null, l = r ? a.route.errorElement || /* @__PURE__ */ b.createElement(cs, null) : null, f = t.concat(n.slice(0, s + 1)), d = () => /* @__PURE__ */ b.createElement(fs, {
      match: a,
      routeContext: {
        outlet: i,
        matches: f
      }
    }, u ? l : a.route.element !== void 0 ? a.route.element : i);
    return r && (a.route.errorElement || s === 0) ? /* @__PURE__ */ b.createElement(ls, {
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
var Bn;
(function(e) {
  e.UseRevalidator = "useRevalidator";
})(Bn || (Bn = {}));
var De;
(function(e) {
  e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator";
})(De || (De = {}));
function Zo(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function Br(e) {
  let t = b.useContext(Ze);
  return t || (process.env.NODE_ENV !== "production" ? R(!1, Zo(e)) : R(!1)), t;
}
function ps(e) {
  let t = b.useContext(X);
  return t || (process.env.NODE_ENV !== "production" ? R(!1, Zo(e)) : R(!1)), t;
}
function hs(e) {
  let t = ps(e), r = t.matches[t.matches.length - 1];
  return r.route.id || (process.env.NODE_ENV !== "production" ? R(!1, e + ' can only be used on routes that contain a unique "id"') : R(!1)), r.route.id;
}
function Rh() {
  return Br(De.UseNavigation).navigation;
}
function xh() {
  let e = Br(De.UseActionData);
  return b.useContext(X) || (process.env.NODE_ENV !== "production" ? R(!1, "useActionData must be used inside a RouteContext") : R(!1)), Object.values((e == null ? void 0 : e.actionData) || {})[0];
}
function ms() {
  var e;
  let t = b.useContext(Mr), r = Br(De.UseRouteError), n = hs(De.UseRouteError);
  return t || ((e = r.errors) == null ? void 0 : e[n]);
}
function Ph() {
  let e = b.useContext(Fr);
  return e == null ? void 0 : e._data;
}
function Th() {
  let e = b.useContext(Fr);
  return e == null ? void 0 : e._error;
}
const Vn = {};
function vs(e, t, r) {
  !t && !Vn[e] && (Vn[e] = !0, process.env.NODE_ENV !== "production" && re(!1, r));
}
function Ch(e) {
  let {
    to: t,
    replace: r,
    state: n,
    relative: o
  } = e;
  Ie() || (process.env.NODE_ENV !== "production" ? R(
    !1,
    "<Navigate> may be used only in the context of a <Router> component."
  ) : R(!1)), process.env.NODE_ENV !== "production" && re(!b.useContext(ge).static, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
  let i = b.useContext(Ze), a = Pt();
  return b.useEffect(() => {
    i && i.navigation.state !== "idle" || a(t, {
      replace: r,
      state: n,
      relative: o
    });
  }), null;
}
function gs(e) {
  return ss(e.context);
}
function gt(e) {
  process.env.NODE_ENV !== "production" ? R(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.") : R(!1);
}
function ys(e) {
  let {
    basename: t = "/",
    children: r = null,
    location: n,
    navigationType: o = he.Pop,
    navigator: i,
    static: a = !1
  } = e;
  Ie() && (process.env.NODE_ENV !== "production" ? R(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.") : R(!1));
  let s = t.replace(/^\/*/, "/"), u = b.useMemo(() => ({
    basename: s,
    navigator: i,
    static: a
  }), [s, i, a]);
  typeof n == "string" && (n = $e(n));
  let {
    pathname: l = "/",
    search: f = "",
    hash: d = "",
    state: p = null,
    key: m = "default"
  } = n, g = b.useMemo(() => {
    let v = zo(l, s);
    return v == null ? null : {
      pathname: v,
      search: f,
      hash: d,
      state: p,
      key: m
    };
  }, [s, l, f, d, p, m]);
  return process.env.NODE_ENV !== "production" && re(g != null, '<Router basename="' + s + '"> is not able to match the URL ' + ('"' + l + f + d + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), g == null ? null : /* @__PURE__ */ b.createElement(ge.Provider, {
    value: u
  }, /* @__PURE__ */ b.createElement(Qe.Provider, {
    children: r,
    value: {
      location: g,
      navigationType: o
    }
  }));
}
function bs(e) {
  let {
    children: t,
    location: r
  } = e, n = b.useContext(Ur), o = n && !t ? n.router.routes : hr(t);
  return us(o, r);
}
var Wn;
(function(e) {
  e[e.pending = 0] = "pending", e[e.success = 1] = "success", e[e.error = 2] = "error";
})(Wn || (Wn = {}));
new Promise(() => {
});
function hr(e, t) {
  t === void 0 && (t = []);
  let r = [];
  return b.Children.forEach(e, (n, o) => {
    if (!/* @__PURE__ */ b.isValidElement(n))
      return;
    if (n.type === b.Fragment) {
      r.push.apply(r, hr(n.props.children, t));
      return;
    }
    n.type !== gt && (process.env.NODE_ENV !== "production" ? R(!1, "[" + (typeof n.type == "string" ? n.type : n.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>") : R(!1)), !n.props.index || !n.props.children || (process.env.NODE_ENV !== "production" ? R(!1, "An index route cannot have child routes.") : R(!1));
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
    n.props.children && (a.children = hr(n.props.children, i)), r.push(a);
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
function we() {
  return we = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, we.apply(this, arguments);
}
function Vr(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), o, i;
  for (i = 0; i < n.length; i++)
    o = n[i], !(t.indexOf(o) >= 0) && (r[o] = e[o]);
  return r;
}
const lt = "get", Qt = "application/x-www-form-urlencoded";
function Ct(e) {
  return e != null && typeof e.tagName == "string";
}
function Es(e) {
  return Ct(e) && e.tagName.toLowerCase() === "button";
}
function ws(e) {
  return Ct(e) && e.tagName.toLowerCase() === "form";
}
function _s(e) {
  return Ct(e) && e.tagName.toLowerCase() === "input";
}
function Ss(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Os(e, t) {
  return e.button === 0 && (!t || t === "_self") && !Ss(e);
}
function mr(e) {
  return e === void 0 && (e = ""), new URLSearchParams(typeof e == "string" || Array.isArray(e) || e instanceof URLSearchParams ? e : Object.keys(e).reduce((t, r) => {
    let n = e[r];
    return t.concat(Array.isArray(n) ? n.map((o) => [r, o]) : [[r, n]]);
  }, []));
}
function Rs(e, t) {
  let r = mr(e);
  for (let n of t.keys())
    r.has(n) || t.getAll(n).forEach((o) => {
      r.append(n, o);
    });
  return r;
}
function xs(e, t, r) {
  let n, o, i, a;
  if (ws(e)) {
    let f = r.submissionTrigger;
    n = r.method || e.getAttribute("method") || lt, o = r.action || e.getAttribute("action") || t, i = r.encType || e.getAttribute("enctype") || Qt, a = new FormData(e), f && f.name && a.append(f.name, f.value);
  } else if (Es(e) || _s(e) && (e.type === "submit" || e.type === "image")) {
    let f = e.form;
    if (f == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    n = r.method || e.getAttribute("formmethod") || f.getAttribute("method") || lt, o = r.action || e.getAttribute("formaction") || f.getAttribute("action") || t, i = r.encType || e.getAttribute("formenctype") || f.getAttribute("enctype") || Qt, a = new FormData(f), e.name && a.append(e.name, e.value);
  } else {
    if (Ct(e))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    if (n = r.method || lt, o = r.action || t, i = r.encType || Qt, e instanceof FormData)
      a = e;
    else if (a = new FormData(), e instanceof URLSearchParams)
      for (let [f, d] of e)
        a.append(f, d);
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
const Ps = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset"], Ts = ["aria-current", "caseSensitive", "className", "end", "style", "to", "children"], Cs = ["reloadDocument", "replace", "method", "action", "onSubmit", "fetcherKey", "routeId", "relative"];
function Ah(e) {
  let {
    basename: t,
    children: r,
    window: n
  } = e, o = b.useRef();
  o.current == null && (o.current = Sa({
    window: n,
    v5Compat: !0
  }));
  let i = o.current, [a, s] = b.useState({
    action: i.action,
    location: i.location
  });
  return b.useLayoutEffect(() => i.listen(s), [i]), /* @__PURE__ */ b.createElement(ys, {
    basename: t,
    children: r,
    location: a.location,
    navigationType: a.action,
    navigator: i
  });
}
process.env.NODE_ENV;
const Qo = /* @__PURE__ */ b.forwardRef(function(t, r) {
  let {
    onClick: n,
    relative: o,
    reloadDocument: i,
    replace: a,
    state: s,
    target: u,
    to: l,
    preventScrollReset: f
  } = t, d = Vr(t, Ps), p = as(l, {
    relative: o
  }), m = $s(l, {
    replace: a,
    state: s,
    target: u,
    preventScrollReset: f,
    relative: o
  });
  function g(v) {
    n && n(v), v.defaultPrevented || m(v);
  }
  return /* @__PURE__ */ b.createElement("a", we({}, d, {
    href: p,
    onClick: i ? n : g,
    ref: r,
    target: u
  }));
});
process.env.NODE_ENV !== "production" && (Qo.displayName = "Link");
const As = /* @__PURE__ */ b.forwardRef(function(t, r) {
  let {
    "aria-current": n = "page",
    caseSensitive: o = !1,
    className: i = "",
    end: a = !1,
    style: s,
    to: u,
    children: l
  } = t, f = Vr(t, Ts), d = Tt(u, {
    relative: f.relative
  }), p = ce(), m = b.useContext(Ze), {
    navigator: g
  } = b.useContext(ge), v = g.encodeLocation ? g.encodeLocation(d).pathname : d.pathname, S = p.pathname, w = m && m.navigation && m.navigation.location ? m.navigation.location.pathname : null;
  o || (S = S.toLowerCase(), w = w ? w.toLowerCase() : null, v = v.toLowerCase());
  let N = S === v || !a && S.startsWith(v) && S.charAt(v.length) === "/", _ = w != null && (w === v || !a && w.startsWith(v) && w.charAt(v.length) === "/"), P = N ? n : void 0, I;
  typeof i == "function" ? I = i({
    isActive: N,
    isPending: _
  }) : I = [i, N ? "active" : null, _ ? "pending" : null].filter(Boolean).join(" ");
  let x = typeof s == "function" ? s({
    isActive: N,
    isPending: _
  }) : s;
  return /* @__PURE__ */ b.createElement(Qo, we({}, f, {
    "aria-current": P,
    className: I,
    ref: r,
    style: x,
    to: u
  }), typeof l == "function" ? l({
    isActive: N,
    isPending: _
  }) : l);
});
process.env.NODE_ENV !== "production" && (As.displayName = "NavLink");
const Ns = /* @__PURE__ */ b.forwardRef((e, t) => /* @__PURE__ */ b.createElement(ei, we({}, e, {
  ref: t
})));
process.env.NODE_ENV !== "production" && (Ns.displayName = "Form");
const ei = /* @__PURE__ */ b.forwardRef((e, t) => {
  let {
    reloadDocument: r,
    replace: n,
    method: o = lt,
    action: i,
    onSubmit: a,
    fetcherKey: s,
    routeId: u,
    relative: l
  } = e, f = Vr(e, Cs), d = Is(s, u), p = o.toLowerCase() === "get" ? "get" : "post", m = ti(i, {
    relative: l
  }), g = (v) => {
    if (a && a(v), v.defaultPrevented)
      return;
    v.preventDefault();
    let S = v.nativeEvent.submitter, w = (S == null ? void 0 : S.getAttribute("formmethod")) || o;
    d(S || v.currentTarget, {
      method: w,
      replace: n,
      relative: l
    });
  };
  return /* @__PURE__ */ b.createElement("form", we({
    ref: t,
    method: p,
    action: m,
    onSubmit: r ? a : g
  }, f));
});
process.env.NODE_ENV !== "production" && (ei.displayName = "FormImpl");
process.env.NODE_ENV;
var vr;
(function(e) {
  e.UseScrollRestoration = "useScrollRestoration", e.UseSubmitImpl = "useSubmitImpl", e.UseFetcher = "useFetcher";
})(vr || (vr = {}));
var Hn;
(function(e) {
  e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration";
})(Hn || (Hn = {}));
function Ds(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function Ls(e) {
  let t = b.useContext(Ur);
  return t || (process.env.NODE_ENV !== "production" ? R(!1, Ds(e)) : R(!1)), t;
}
function $s(e, t) {
  let {
    target: r,
    replace: n,
    state: o,
    preventScrollReset: i,
    relative: a
  } = t === void 0 ? {} : t, s = Pt(), u = ce(), l = Tt(e, {
    relative: a
  });
  return b.useCallback((f) => {
    if (Os(f, r)) {
      f.preventDefault();
      let d = n !== void 0 ? n : Ne(u) === Ne(l);
      s(e, {
        replace: d,
        state: o,
        preventScrollReset: i,
        relative: a
      });
    }
  }, [u, s, l, n, o, r, e, i, a]);
}
function Nh(e) {
  process.env.NODE_ENV !== "production" && js(typeof URLSearchParams < "u", "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params\n\nIf you're unsure how to load polyfills, we recommend you check out https://polyfill.io/v3/ which provides some recommendations about how to load polyfills only for users that need them, instead of for every user.");
  let t = b.useRef(mr(e)), r = ce(), n = b.useMemo(() => Rs(r.search, t.current), [r.search]), o = Pt(), i = b.useCallback((a, s) => {
    const u = mr(typeof a == "function" ? a(n) : a);
    o("?" + u, s);
  }, [o, n]);
  return [n, i];
}
function Is(e, t) {
  let {
    router: r
  } = Ls(vr.UseSubmitImpl), n = ti();
  return b.useCallback(function(o, i) {
    if (i === void 0 && (i = {}), typeof document > "u")
      throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
    let {
      method: a,
      encType: s,
      formData: u,
      url: l
    } = xs(o, n, i), f = l.pathname + l.search, d = {
      replace: i.replace,
      formData: u,
      formMethod: a,
      formEncType: s
    };
    e ? (t == null && (process.env.NODE_ENV !== "production" ? R(!1, "No routeId available for useFetcher()") : R(!1)), r.fetch(e, t, f, d)) : r.navigate(f, d);
  }, [n, r, e, t]);
}
function ti(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t, {
    basename: n
  } = b.useContext(ge), o = b.useContext(X);
  o || (process.env.NODE_ENV !== "production" ? R(!1, "useFormAction must be used inside a RouteContext") : R(!1));
  let [i] = o.matches.slice(-1), a = we({}, Tt(e || ".", {
    relative: r
  })), s = ce();
  if (e == null && (a.search = s.search, a.hash = s.hash, i.route.index)) {
    let u = new URLSearchParams(a.search);
    u.delete("index"), a.search = u.toString() ? "?" + u.toString() : "";
  }
  return (!e || e === ".") && i.route.index && (a.search = a.search ? a.search.replace(/^\?/, "?index&") : "?index"), n !== "/" && (a.pathname = a.pathname === "/" ? n : ae([n, a.pathname])), Ne(a);
}
function Dh(e) {
  b.useEffect(() => (window.addEventListener("beforeunload", e), () => {
    window.removeEventListener("beforeunload", e);
  }), [e]);
}
function js(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
var Us = typeof global == "object" && global && global.Object === Object && global;
const ri = Us;
var Fs = typeof self == "object" && self && self.Object === Object && self, Ms = ri || Fs || Function("return this")();
const Z = Ms;
var Bs = Z.Symbol;
const me = Bs;
var ni = Object.prototype, Vs = ni.hasOwnProperty, Ws = ni.toString, Ve = me ? me.toStringTag : void 0;
function Hs(e) {
  var t = Vs.call(e, Ve), r = e[Ve];
  try {
    e[Ve] = void 0;
    var n = !0;
  } catch {
  }
  var o = Ws.call(e);
  return n && (t ? e[Ve] = r : delete e[Ve]), o;
}
var ks = Object.prototype, qs = ks.toString;
function zs(e) {
  return qs.call(e);
}
var Gs = "[object Null]", Js = "[object Undefined]", kn = me ? me.toStringTag : void 0;
function Oe(e) {
  return e == null ? e === void 0 ? Js : Gs : kn && kn in Object(e) ? Hs(e) : zs(e);
}
function ve(e) {
  return e != null && typeof e == "object";
}
var Ks = "[object Symbol]";
function At(e) {
  return typeof e == "symbol" || ve(e) && Oe(e) == Ks;
}
function Ys(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, o = Array(n); ++r < n; )
    o[r] = t(e[r], r, e);
  return o;
}
var Xs = Array.isArray;
const K = Xs;
var Zs = 1 / 0, qn = me ? me.prototype : void 0, zn = qn ? qn.toString : void 0;
function oi(e) {
  if (typeof e == "string")
    return e;
  if (K(e))
    return Ys(e, oi) + "";
  if (At(e))
    return zn ? zn.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -Zs ? "-0" : t;
}
var Qs = /\s/;
function eu(e) {
  for (var t = e.length; t-- && Qs.test(e.charAt(t)); )
    ;
  return t;
}
var tu = /^\s+/;
function ru(e) {
  return e && e.slice(0, eu(e) + 1).replace(tu, "");
}
function Y(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var Gn = 0 / 0, nu = /^[-+]0x[0-9a-f]+$/i, ou = /^0b[01]+$/i, iu = /^0o[0-7]+$/i, au = parseInt;
function Jn(e) {
  if (typeof e == "number")
    return e;
  if (At(e))
    return Gn;
  if (Y(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = Y(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = ru(e);
  var r = ou.test(e);
  return r || iu.test(e) ? au(e.slice(2), r ? 2 : 8) : nu.test(e) ? Gn : +e;
}
function Wr(e) {
  return e;
}
var su = "[object AsyncFunction]", uu = "[object Function]", cu = "[object GeneratorFunction]", lu = "[object Proxy]";
function Hr(e) {
  if (!Y(e))
    return !1;
  var t = Oe(e);
  return t == uu || t == cu || t == su || t == lu;
}
var fu = Z["__core-js_shared__"];
const er = fu;
var Kn = function() {
  var e = /[^.]+$/.exec(er && er.keys && er.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function du(e) {
  return !!Kn && Kn in e;
}
var pu = Function.prototype, hu = pu.toString;
function Re(e) {
  if (e != null) {
    try {
      return hu.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var mu = /[\\^$.*+?()[\]{}|]/g, vu = /^\[object .+?Constructor\]$/, gu = Function.prototype, yu = Object.prototype, bu = gu.toString, Eu = yu.hasOwnProperty, wu = RegExp(
  "^" + bu.call(Eu).replace(mu, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function _u(e) {
  if (!Y(e) || du(e))
    return !1;
  var t = Hr(e) ? wu : vu;
  return t.test(Re(e));
}
function Su(e, t) {
  return e == null ? void 0 : e[t];
}
function xe(e, t) {
  var r = Su(e, t);
  return _u(r) ? r : void 0;
}
var Ou = xe(Z, "WeakMap");
const gr = Ou;
var Yn = Object.create, Ru = function() {
  function e() {
  }
  return function(t) {
    if (!Y(t))
      return {};
    if (Yn)
      return Yn(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}();
const xu = Ru;
function Pu(e, t, r) {
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
function Tu() {
}
function Cu(e, t) {
  var r = -1, n = e.length;
  for (t || (t = Array(n)); ++r < n; )
    t[r] = e[r];
  return t;
}
var Au = 800, Nu = 16, Du = Date.now;
function Lu(e) {
  var t = 0, r = 0;
  return function() {
    var n = Du(), o = Nu - (n - r);
    if (r = n, o > 0) {
      if (++t >= Au)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function $u(e) {
  return function() {
    return e;
  };
}
var Iu = function() {
  try {
    var e = xe(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
const yt = Iu;
var ju = yt ? function(e, t) {
  return yt(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: $u(t),
    writable: !0
  });
} : Wr;
const Uu = ju;
var Fu = Lu(Uu);
const Mu = Fu;
function Bu(e, t, r, n) {
  for (var o = e.length, i = r + (n ? 1 : -1); n ? i-- : ++i < o; )
    if (t(e[i], i, e))
      return i;
  return -1;
}
function Vu(e) {
  return e !== e;
}
function Wu(e, t, r) {
  for (var n = r - 1, o = e.length; ++n < o; )
    if (e[n] === t)
      return n;
  return -1;
}
function Hu(e, t, r) {
  return t === t ? Wu(e, t, r) : Bu(e, Vu, r);
}
function ku(e, t) {
  var r = e == null ? 0 : e.length;
  return !!r && Hu(e, t, 0) > -1;
}
var qu = 9007199254740991, zu = /^(?:0|[1-9]\d*)$/;
function kr(e, t) {
  var r = typeof e;
  return t = t ?? qu, !!t && (r == "number" || r != "symbol" && zu.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function Nt(e, t, r) {
  t == "__proto__" && yt ? yt(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
function et(e, t) {
  return e === t || e !== e && t !== t;
}
var Gu = Object.prototype, Ju = Gu.hasOwnProperty;
function Ku(e, t, r) {
  var n = e[t];
  (!(Ju.call(e, t) && et(n, r)) || r === void 0 && !(t in e)) && Nt(e, t, r);
}
function Yu(e, t, r, n) {
  var o = !r;
  r || (r = {});
  for (var i = -1, a = t.length; ++i < a; ) {
    var s = t[i], u = n ? n(r[s], e[s], s, r, e) : void 0;
    u === void 0 && (u = e[s]), o ? Nt(r, s, u) : Ku(r, s, u);
  }
  return r;
}
var Xn = Math.max;
function Xu(e, t, r) {
  return t = Xn(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var n = arguments, o = -1, i = Xn(n.length - t, 0), a = Array(i); ++o < i; )
      a[o] = n[t + o];
    o = -1;
    for (var s = Array(t + 1); ++o < t; )
      s[o] = n[o];
    return s[t] = r(a), Pu(e, this, s);
  };
}
function Zu(e, t) {
  return Mu(Xu(e, t, Wr), e + "");
}
var Qu = 9007199254740991;
function qr(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Qu;
}
function Dt(e) {
  return e != null && qr(e.length) && !Hr(e);
}
function ec(e, t, r) {
  if (!Y(r))
    return !1;
  var n = typeof t;
  return (n == "number" ? Dt(r) && kr(t, r.length) : n == "string" && t in r) ? et(r[t], e) : !1;
}
function tc(e) {
  return Zu(function(t, r) {
    var n = -1, o = r.length, i = o > 1 ? r[o - 1] : void 0, a = o > 2 ? r[2] : void 0;
    for (i = e.length > 3 && typeof i == "function" ? (o--, i) : void 0, a && ec(r[0], r[1], a) && (i = o < 3 ? void 0 : i, o = 1), t = Object(t); ++n < o; ) {
      var s = r[n];
      s && e(t, s, n, i);
    }
    return t;
  });
}
var rc = Object.prototype;
function zr(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || rc;
  return e === r;
}
function nc(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var oc = "[object Arguments]";
function Zn(e) {
  return ve(e) && Oe(e) == oc;
}
var ii = Object.prototype, ic = ii.hasOwnProperty, ac = ii.propertyIsEnumerable, sc = Zn(function() {
  return arguments;
}()) ? Zn : function(e) {
  return ve(e) && ic.call(e, "callee") && !ac.call(e, "callee");
};
const bt = sc;
function uc() {
  return !1;
}
var ai = typeof exports == "object" && exports && !exports.nodeType && exports, Qn = ai && typeof module == "object" && module && !module.nodeType && module, cc = Qn && Qn.exports === ai, eo = cc ? Z.Buffer : void 0, lc = eo ? eo.isBuffer : void 0, fc = lc || uc;
const Et = fc;
var dc = "[object Arguments]", pc = "[object Array]", hc = "[object Boolean]", mc = "[object Date]", vc = "[object Error]", gc = "[object Function]", yc = "[object Map]", bc = "[object Number]", Ec = "[object Object]", wc = "[object RegExp]", _c = "[object Set]", Sc = "[object String]", Oc = "[object WeakMap]", Rc = "[object ArrayBuffer]", xc = "[object DataView]", Pc = "[object Float32Array]", Tc = "[object Float64Array]", Cc = "[object Int8Array]", Ac = "[object Int16Array]", Nc = "[object Int32Array]", Dc = "[object Uint8Array]", Lc = "[object Uint8ClampedArray]", $c = "[object Uint16Array]", Ic = "[object Uint32Array]", j = {};
j[Pc] = j[Tc] = j[Cc] = j[Ac] = j[Nc] = j[Dc] = j[Lc] = j[$c] = j[Ic] = !0;
j[dc] = j[pc] = j[Rc] = j[hc] = j[xc] = j[mc] = j[vc] = j[gc] = j[yc] = j[bc] = j[Ec] = j[wc] = j[_c] = j[Sc] = j[Oc] = !1;
function jc(e) {
  return ve(e) && qr(e.length) && !!j[Oe(e)];
}
function Uc(e) {
  return function(t) {
    return e(t);
  };
}
var si = typeof exports == "object" && exports && !exports.nodeType && exports, ke = si && typeof module == "object" && module && !module.nodeType && module, Fc = ke && ke.exports === si, tr = Fc && ri.process, Mc = function() {
  try {
    var e = ke && ke.require && ke.require("util").types;
    return e || tr && tr.binding && tr.binding("util");
  } catch {
  }
}();
const to = Mc;
var ro = to && to.isTypedArray, Bc = ro ? Uc(ro) : jc;
const Gr = Bc;
var Vc = Object.prototype, Wc = Vc.hasOwnProperty;
function ui(e, t) {
  var r = K(e), n = !r && bt(e), o = !r && !n && Et(e), i = !r && !n && !o && Gr(e), a = r || n || o || i, s = a ? nc(e.length, String) : [], u = s.length;
  for (var l in e)
    (t || Wc.call(e, l)) && !(a && (l == "length" || o && (l == "offset" || l == "parent") || i && (l == "buffer" || l == "byteLength" || l == "byteOffset") || kr(l, u))) && s.push(l);
  return s;
}
function ci(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var Hc = ci(Object.keys, Object);
const kc = Hc;
var qc = Object.prototype, zc = qc.hasOwnProperty;
function Gc(e) {
  if (!zr(e))
    return kc(e);
  var t = [];
  for (var r in Object(e))
    zc.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
function Jr(e) {
  return Dt(e) ? ui(e) : Gc(e);
}
function Jc(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var Kc = Object.prototype, Yc = Kc.hasOwnProperty;
function Xc(e) {
  if (!Y(e))
    return Jc(e);
  var t = zr(e), r = [];
  for (var n in e)
    n == "constructor" && (t || !Yc.call(e, n)) || r.push(n);
  return r;
}
function li(e) {
  return Dt(e) ? ui(e, !0) : Xc(e);
}
var Zc = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Qc = /^\w*$/;
function Kr(e, t) {
  if (K(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || At(e) ? !0 : Qc.test(e) || !Zc.test(e) || t != null && e in Object(t);
}
var el = xe(Object, "create");
const qe = el;
function tl() {
  this.__data__ = qe ? qe(null) : {}, this.size = 0;
}
function rl(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var nl = "__lodash_hash_undefined__", ol = Object.prototype, il = ol.hasOwnProperty;
function al(e) {
  var t = this.__data__;
  if (qe) {
    var r = t[e];
    return r === nl ? void 0 : r;
  }
  return il.call(t, e) ? t[e] : void 0;
}
var sl = Object.prototype, ul = sl.hasOwnProperty;
function cl(e) {
  var t = this.__data__;
  return qe ? t[e] !== void 0 : ul.call(t, e);
}
var ll = "__lodash_hash_undefined__";
function fl(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = qe && t === void 0 ? ll : t, this;
}
function _e(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
_e.prototype.clear = tl;
_e.prototype.delete = rl;
_e.prototype.get = al;
_e.prototype.has = cl;
_e.prototype.set = fl;
function dl() {
  this.__data__ = [], this.size = 0;
}
function Lt(e, t) {
  for (var r = e.length; r--; )
    if (et(e[r][0], t))
      return r;
  return -1;
}
var pl = Array.prototype, hl = pl.splice;
function ml(e) {
  var t = this.__data__, r = Lt(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : hl.call(t, r, 1), --this.size, !0;
}
function vl(e) {
  var t = this.__data__, r = Lt(t, e);
  return r < 0 ? void 0 : t[r][1];
}
function gl(e) {
  return Lt(this.__data__, e) > -1;
}
function yl(e, t) {
  var r = this.__data__, n = Lt(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
function le(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
le.prototype.clear = dl;
le.prototype.delete = ml;
le.prototype.get = vl;
le.prototype.has = gl;
le.prototype.set = yl;
var bl = xe(Z, "Map");
const ze = bl;
function El() {
  this.size = 0, this.__data__ = {
    hash: new _e(),
    map: new (ze || le)(),
    string: new _e()
  };
}
function wl(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function $t(e, t) {
  var r = e.__data__;
  return wl(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
function _l(e) {
  var t = $t(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function Sl(e) {
  return $t(this, e).get(e);
}
function Ol(e) {
  return $t(this, e).has(e);
}
function Rl(e, t) {
  var r = $t(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
function fe(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
fe.prototype.clear = El;
fe.prototype.delete = _l;
fe.prototype.get = Sl;
fe.prototype.has = Ol;
fe.prototype.set = Rl;
var xl = "Expected a function";
function Yr(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(xl);
  var r = function() {
    var n = arguments, o = t ? t.apply(this, n) : n[0], i = r.cache;
    if (i.has(o))
      return i.get(o);
    var a = e.apply(this, n);
    return r.cache = i.set(o, a) || i, a;
  };
  return r.cache = new (Yr.Cache || fe)(), r;
}
Yr.Cache = fe;
var Pl = 500;
function Tl(e) {
  var t = Yr(e, function(n) {
    return r.size === Pl && r.clear(), n;
  }), r = t.cache;
  return t;
}
var Cl = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Al = /\\(\\)?/g, Nl = Tl(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(Cl, function(r, n, o, i) {
    t.push(o ? i.replace(Al, "$1") : n || r);
  }), t;
});
const Dl = Nl;
function Ll(e) {
  return e == null ? "" : oi(e);
}
function fi(e, t) {
  return K(e) ? e : Kr(e, t) ? [e] : Dl(Ll(e));
}
var $l = 1 / 0;
function It(e) {
  if (typeof e == "string" || At(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -$l ? "-0" : t;
}
function di(e, t) {
  t = fi(t, e);
  for (var r = 0, n = t.length; e != null && r < n; )
    e = e[It(t[r++])];
  return r && r == n ? e : void 0;
}
function Il(e, t, r) {
  var n = e == null ? void 0 : di(e, t);
  return n === void 0 ? r : n;
}
function jl(e, t) {
  for (var r = -1, n = t.length, o = e.length; ++r < n; )
    e[o + r] = t[r];
  return e;
}
var Ul = ci(Object.getPrototypeOf, Object);
const pi = Ul;
var Fl = "[object Object]", Ml = Function.prototype, Bl = Object.prototype, hi = Ml.toString, Vl = Bl.hasOwnProperty, Wl = hi.call(Object);
function Hl(e) {
  if (!ve(e) || Oe(e) != Fl)
    return !1;
  var t = pi(e);
  if (t === null)
    return !0;
  var r = Vl.call(t, "constructor") && t.constructor;
  return typeof r == "function" && r instanceof r && hi.call(r) == Wl;
}
function kl() {
  this.__data__ = new le(), this.size = 0;
}
function ql(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
function zl(e) {
  return this.__data__.get(e);
}
function Gl(e) {
  return this.__data__.has(e);
}
var Jl = 200;
function Kl(e, t) {
  var r = this.__data__;
  if (r instanceof le) {
    var n = r.__data__;
    if (!ze || n.length < Jl - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new fe(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
function te(e) {
  var t = this.__data__ = new le(e);
  this.size = t.size;
}
te.prototype.clear = kl;
te.prototype.delete = ql;
te.prototype.get = zl;
te.prototype.has = Gl;
te.prototype.set = Kl;
var mi = typeof exports == "object" && exports && !exports.nodeType && exports, no = mi && typeof module == "object" && module && !module.nodeType && module, Yl = no && no.exports === mi, oo = Yl ? Z.Buffer : void 0, io = oo ? oo.allocUnsafe : void 0;
function Xl(e, t) {
  if (t)
    return e.slice();
  var r = e.length, n = io ? io(r) : new e.constructor(r);
  return e.copy(n), n;
}
function Zl(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, o = 0, i = []; ++r < n; ) {
    var a = e[r];
    t(a, r, e) && (i[o++] = a);
  }
  return i;
}
function Ql() {
  return [];
}
var ef = Object.prototype, tf = ef.propertyIsEnumerable, ao = Object.getOwnPropertySymbols, rf = ao ? function(e) {
  return e == null ? [] : (e = Object(e), Zl(ao(e), function(t) {
    return tf.call(e, t);
  }));
} : Ql;
const nf = rf;
function of(e, t, r) {
  var n = t(e);
  return K(e) ? n : jl(n, r(e));
}
function so(e) {
  return of(e, Jr, nf);
}
var af = xe(Z, "DataView");
const yr = af;
var sf = xe(Z, "Promise");
const br = sf;
var uf = xe(Z, "Set");
const Ae = uf;
var uo = "[object Map]", cf = "[object Object]", co = "[object Promise]", lo = "[object Set]", fo = "[object WeakMap]", po = "[object DataView]", lf = Re(yr), ff = Re(ze), df = Re(br), pf = Re(Ae), hf = Re(gr), ye = Oe;
(yr && ye(new yr(new ArrayBuffer(1))) != po || ze && ye(new ze()) != uo || br && ye(br.resolve()) != co || Ae && ye(new Ae()) != lo || gr && ye(new gr()) != fo) && (ye = function(e) {
  var t = Oe(e), r = t == cf ? e.constructor : void 0, n = r ? Re(r) : "";
  if (n)
    switch (n) {
      case lf:
        return po;
      case ff:
        return uo;
      case df:
        return co;
      case pf:
        return lo;
      case hf:
        return fo;
    }
  return t;
});
const ho = ye;
var mf = Z.Uint8Array;
const wt = mf;
function vf(e) {
  var t = new e.constructor(e.byteLength);
  return new wt(t).set(new wt(e)), t;
}
function gf(e, t) {
  var r = t ? vf(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
function yf(e) {
  return typeof e.constructor == "function" && !zr(e) ? xu(pi(e)) : {};
}
var bf = "__lodash_hash_undefined__";
function Ef(e) {
  return this.__data__.set(e, bf), this;
}
function wf(e) {
  return this.__data__.has(e);
}
function Ge(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.__data__ = new fe(); ++t < r; )
    this.add(e[t]);
}
Ge.prototype.add = Ge.prototype.push = Ef;
Ge.prototype.has = wf;
function _f(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
    if (t(e[r], r, e))
      return !0;
  return !1;
}
function vi(e, t) {
  return e.has(t);
}
var Sf = 1, Of = 2;
function gi(e, t, r, n, o, i) {
  var a = r & Sf, s = e.length, u = t.length;
  if (s != u && !(a && u > s))
    return !1;
  var l = i.get(e), f = i.get(t);
  if (l && f)
    return l == t && f == e;
  var d = -1, p = !0, m = r & Of ? new Ge() : void 0;
  for (i.set(e, t), i.set(t, e); ++d < s; ) {
    var g = e[d], v = t[d];
    if (n)
      var S = a ? n(v, g, d, t, e, i) : n(g, v, d, e, t, i);
    if (S !== void 0) {
      if (S)
        continue;
      p = !1;
      break;
    }
    if (m) {
      if (!_f(t, function(w, N) {
        if (!vi(m, N) && (g === w || o(g, w, r, n, i)))
          return m.push(N);
      })) {
        p = !1;
        break;
      }
    } else if (!(g === v || o(g, v, r, n, i))) {
      p = !1;
      break;
    }
  }
  return i.delete(e), i.delete(t), p;
}
function Rf(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n, o) {
    r[++t] = [o, n];
  }), r;
}
function Xr(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n) {
    r[++t] = n;
  }), r;
}
var xf = 1, Pf = 2, Tf = "[object Boolean]", Cf = "[object Date]", Af = "[object Error]", Nf = "[object Map]", Df = "[object Number]", Lf = "[object RegExp]", $f = "[object Set]", If = "[object String]", jf = "[object Symbol]", Uf = "[object ArrayBuffer]", Ff = "[object DataView]", mo = me ? me.prototype : void 0, rr = mo ? mo.valueOf : void 0;
function Mf(e, t, r, n, o, i, a) {
  switch (r) {
    case Ff:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case Uf:
      return !(e.byteLength != t.byteLength || !i(new wt(e), new wt(t)));
    case Tf:
    case Cf:
    case Df:
      return et(+e, +t);
    case Af:
      return e.name == t.name && e.message == t.message;
    case Lf:
    case If:
      return e == t + "";
    case Nf:
      var s = Rf;
    case $f:
      var u = n & xf;
      if (s || (s = Xr), e.size != t.size && !u)
        return !1;
      var l = a.get(e);
      if (l)
        return l == t;
      n |= Pf, a.set(e, t);
      var f = gi(s(e), s(t), n, o, i, a);
      return a.delete(e), f;
    case jf:
      if (rr)
        return rr.call(e) == rr.call(t);
  }
  return !1;
}
var Bf = 1, Vf = Object.prototype, Wf = Vf.hasOwnProperty;
function Hf(e, t, r, n, o, i) {
  var a = r & Bf, s = so(e), u = s.length, l = so(t), f = l.length;
  if (u != f && !a)
    return !1;
  for (var d = u; d--; ) {
    var p = s[d];
    if (!(a ? p in t : Wf.call(t, p)))
      return !1;
  }
  var m = i.get(e), g = i.get(t);
  if (m && g)
    return m == t && g == e;
  var v = !0;
  i.set(e, t), i.set(t, e);
  for (var S = a; ++d < u; ) {
    p = s[d];
    var w = e[p], N = t[p];
    if (n)
      var _ = a ? n(N, w, p, t, e, i) : n(w, N, p, e, t, i);
    if (!(_ === void 0 ? w === N || o(w, N, r, n, i) : _)) {
      v = !1;
      break;
    }
    S || (S = p == "constructor");
  }
  if (v && !S) {
    var P = e.constructor, I = t.constructor;
    P != I && "constructor" in e && "constructor" in t && !(typeof P == "function" && P instanceof P && typeof I == "function" && I instanceof I) && (v = !1);
  }
  return i.delete(e), i.delete(t), v;
}
var kf = 1, vo = "[object Arguments]", go = "[object Array]", st = "[object Object]", qf = Object.prototype, yo = qf.hasOwnProperty;
function zf(e, t, r, n, o, i) {
  var a = K(e), s = K(t), u = a ? go : ho(e), l = s ? go : ho(t);
  u = u == vo ? st : u, l = l == vo ? st : l;
  var f = u == st, d = l == st, p = u == l;
  if (p && Et(e)) {
    if (!Et(t))
      return !1;
    a = !0, f = !1;
  }
  if (p && !f)
    return i || (i = new te()), a || Gr(e) ? gi(e, t, r, n, o, i) : Mf(e, t, u, r, n, o, i);
  if (!(r & kf)) {
    var m = f && yo.call(e, "__wrapped__"), g = d && yo.call(t, "__wrapped__");
    if (m || g) {
      var v = m ? e.value() : e, S = g ? t.value() : t;
      return i || (i = new te()), o(v, S, r, n, i);
    }
  }
  return p ? (i || (i = new te()), Hf(e, t, r, n, o, i)) : !1;
}
function Zr(e, t, r, n, o) {
  return e === t ? !0 : e == null || t == null || !ve(e) && !ve(t) ? e !== e && t !== t : zf(e, t, r, n, Zr, o);
}
var Gf = 1, Jf = 2;
function Kf(e, t, r, n) {
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
      var d = new te();
      if (n)
        var p = n(l, f, u, e, t, d);
      if (!(p === void 0 ? Zr(f, l, Gf | Jf, n, d) : p))
        return !1;
    }
  }
  return !0;
}
function yi(e) {
  return e === e && !Y(e);
}
function Yf(e) {
  for (var t = Jr(e), r = t.length; r--; ) {
    var n = t[r], o = e[n];
    t[r] = [n, o, yi(o)];
  }
  return t;
}
function bi(e, t) {
  return function(r) {
    return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
  };
}
function Xf(e) {
  var t = Yf(e);
  return t.length == 1 && t[0][2] ? bi(t[0][0], t[0][1]) : function(r) {
    return r === e || Kf(r, e, t);
  };
}
function Zf(e, t) {
  return e != null && t in Object(e);
}
function Qf(e, t, r) {
  t = fi(t, e);
  for (var n = -1, o = t.length, i = !1; ++n < o; ) {
    var a = It(t[n]);
    if (!(i = e != null && r(e, a)))
      break;
    e = e[a];
  }
  return i || ++n != o ? i : (o = e == null ? 0 : e.length, !!o && qr(o) && kr(a, o) && (K(e) || bt(e)));
}
function ed(e, t) {
  return e != null && Qf(e, t, Zf);
}
var td = 1, rd = 2;
function nd(e, t) {
  return Kr(e) && yi(t) ? bi(It(e), t) : function(r) {
    var n = Il(r, e);
    return n === void 0 && n === t ? ed(r, e) : Zr(t, n, td | rd);
  };
}
function od(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function id(e) {
  return function(t) {
    return di(t, e);
  };
}
function ad(e) {
  return Kr(e) ? od(It(e)) : id(e);
}
function Ei(e) {
  return typeof e == "function" ? e : e == null ? Wr : typeof e == "object" ? K(e) ? nd(e[0], e[1]) : Xf(e) : ad(e);
}
function sd(e) {
  return function(t, r, n) {
    for (var o = -1, i = Object(t), a = n(t), s = a.length; s--; ) {
      var u = a[e ? s : ++o];
      if (r(i[u], u, i) === !1)
        break;
    }
    return t;
  };
}
var ud = sd();
const wi = ud;
function cd(e, t) {
  return e && wi(e, t, Jr);
}
var ld = function() {
  return Z.Date.now();
};
const nr = ld;
var fd = "Expected a function", dd = Math.max, pd = Math.min;
function hd(e, t, r) {
  var n, o, i, a, s, u, l = 0, f = !1, d = !1, p = !0;
  if (typeof e != "function")
    throw new TypeError(fd);
  t = Jn(t) || 0, Y(r) && (f = !!r.leading, d = "maxWait" in r, i = d ? dd(Jn(r.maxWait) || 0, t) : i, p = "trailing" in r ? !!r.trailing : p);
  function m(x) {
    var U = n, $ = o;
    return n = o = void 0, l = x, a = e.apply($, U), a;
  }
  function g(x) {
    return l = x, s = setTimeout(w, t), f ? m(x) : a;
  }
  function v(x) {
    var U = x - u, $ = x - l, k = t - U;
    return d ? pd(k, i - $) : k;
  }
  function S(x) {
    var U = x - u, $ = x - l;
    return u === void 0 || U >= t || U < 0 || d && $ >= i;
  }
  function w() {
    var x = nr();
    if (S(x))
      return N(x);
    s = setTimeout(w, v(x));
  }
  function N(x) {
    return s = void 0, p && n ? m(x) : (n = o = void 0, a);
  }
  function _() {
    s !== void 0 && clearTimeout(s), l = 0, n = u = o = s = void 0;
  }
  function P() {
    return s === void 0 ? a : N(nr());
  }
  function I() {
    var x = nr(), U = S(x);
    if (n = arguments, o = this, u = x, U) {
      if (s === void 0)
        return g(u);
      if (d)
        return clearTimeout(s), s = setTimeout(w, t), m(u);
    }
    return s === void 0 && (s = setTimeout(w, t)), a;
  }
  return I.cancel = _, I.flush = P, I;
}
function Er(e, t, r) {
  (r !== void 0 && !et(e[t], r) || r === void 0 && !(t in e)) && Nt(e, t, r);
}
function md(e) {
  return ve(e) && Dt(e);
}
function wr(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function vd(e) {
  return Yu(e, li(e));
}
function gd(e, t, r, n, o, i, a) {
  var s = wr(e, r), u = wr(t, r), l = a.get(u);
  if (l) {
    Er(e, r, l);
    return;
  }
  var f = i ? i(s, u, r + "", e, t, a) : void 0, d = f === void 0;
  if (d) {
    var p = K(u), m = !p && Et(u), g = !p && !m && Gr(u);
    f = u, p || m || g ? K(s) ? f = s : md(s) ? f = Cu(s) : m ? (d = !1, f = Xl(u, !0)) : g ? (d = !1, f = gf(u, !0)) : f = [] : Hl(u) || bt(u) ? (f = s, bt(s) ? f = vd(s) : (!Y(s) || Hr(s)) && (f = yf(u))) : d = !1;
  }
  d && (a.set(u, f), o(f, u, n, i, a), a.delete(u)), Er(e, r, f);
}
function _i(e, t, r, n, o) {
  e !== t && wi(t, function(i, a) {
    if (o || (o = new te()), Y(i))
      gd(e, t, a, r, _i, n, o);
    else {
      var s = n ? n(wr(e, a), i, a + "", e, t, o) : void 0;
      s === void 0 && (s = i), Er(e, a, s);
    }
  }, li);
}
function yd(e, t, r) {
  for (var n = -1, o = e == null ? 0 : e.length; ++n < o; )
    if (r(t, e[n]))
      return !0;
  return !1;
}
function bd(e, t) {
  var r = {};
  return t = Ei(t), cd(e, function(n, o, i) {
    Nt(r, o, t(n, o, i));
  }), r;
}
var Ed = tc(function(e, t, r) {
  _i(e, t, r);
});
const wd = Ed;
var _d = 1 / 0, Sd = Ae && 1 / Xr(new Ae([, -0]))[1] == _d ? function(e) {
  return new Ae(e);
} : Tu;
const Od = Sd;
var Rd = 200;
function xd(e, t, r) {
  var n = -1, o = ku, i = e.length, a = !0, s = [], u = s;
  if (r)
    a = !1, o = yd;
  else if (i >= Rd) {
    var l = t ? null : Od(e);
    if (l)
      return Xr(l);
    a = !1, o = vi, u = new Ge();
  } else
    u = t ? [] : s;
  e:
    for (; ++n < i; ) {
      var f = e[n], d = t ? t(f) : f;
      if (f = r || f !== 0 ? f : 0, a && d === d) {
        for (var p = u.length; p--; )
          if (u[p] === d)
            continue e;
        t && u.push(d), s.push(f);
      } else
        o(u, d, r) || (u !== s && u.push(d), s.push(f));
    }
  return s;
}
function Pd(e, t) {
  return e && e.length ? xd(e, Ei(t)) : [];
}
var _r = /* @__PURE__ */ ((e) => (e.Json = "application/json", e.UrlEncoded = "application/x-www-form-urlencoded", e))(_r || {});
class Td {
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
      const i = (n = this.listeners[t]) == null ? void 0 : n.findIndex((a) => a === r);
      i && i > -1 && ((o = this.listeners[t]) == null || o.splice(i, 1));
    } else
      throw new Error(`${this} is doesn't have event "${String(t)}"`);
  }
}
function bo(e) {
  for (const t in e)
    Object.prototype.hasOwnProperty.call(e, t) && e[t] === void 0 && delete e[t];
  return e;
}
function Lh(e) {
  for (const t in e)
    Object.prototype.hasOwnProperty.call(e, t) && delete e[t];
  return e;
}
function $h(e) {
  for (const t in e)
    Object.prototype.hasOwnProperty.call(e, t) && (e[t] = void 0);
  return e;
}
const Sr = (e, t = "", r = new FormData()) => (Object.keys(e).forEach((n) => {
  const o = t !== "" ? t + "." + n : n, i = e[n];
  Array.isArray(i) ? i.forEach((a, s) => {
    typeof a == "object" ? a instanceof File ? r.append(o, a) : r = Sr(a, o + `[${s}]`, r) : r.append(o, a);
  }) : typeof i == "object" ? i instanceof File ? r.append(o, i) : r = Sr(i, o, r) : r.append(o, i);
}), r), _t = (e, t = "", r = new URLSearchParams()) => (Object.keys(e).forEach((n) => {
  const o = t !== "" ? t + "." + n : n, i = e[n];
  Array.isArray(i) ? i.forEach((a, s) => {
    typeof a == "object" ? r = _t(a, o + `[${s}]`, r) : r.append(o, a);
  }) : typeof i == "object" ? r = _t(i, o, r) : r.append(o, i);
}), r);
class Cd {
  getToken(t) {
    return localStorage.getItem(t) || "";
  }
  setToken(t, r) {
    return localStorage.setItem(t, r);
  }
}
const Or = new Cd();
function Ih(e, t) {
  return new Proxy(e, {
    set(r, n, o) {
      return r[n] = o, t(r), !0;
    }
  });
}
function Eo(e) {
  let t = "";
  const r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n = r.length;
  for (let o = 0; o < e; o++)
    t += r.charAt(Math.floor(Math.random() * n));
  return t;
}
function Si(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Oi } = Object.prototype, { getPrototypeOf: Qr } = Object, en = ((e) => (t) => {
  const r = Oi.call(t);
  return e[r] || (e[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), de = (e) => (e = e.toLowerCase(), (t) => en(t) === e), jt = (e) => (t) => typeof t === e, { isArray: je } = Array, Je = jt("undefined");
function Ad(e) {
  return e !== null && !Je(e) && e.constructor !== null && !Je(e.constructor) && Se(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Ri = de("ArrayBuffer");
function Nd(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Ri(e.buffer), t;
}
const Dd = jt("string"), Se = jt("function"), xi = jt("number"), tn = (e) => e !== null && typeof e == "object", Ld = (e) => e === !0 || e === !1, ft = (e) => {
  if (en(e) !== "object")
    return !1;
  const t = Qr(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, $d = de("Date"), Id = de("File"), jd = de("Blob"), Ud = de("FileList"), Fd = (e) => tn(e) && Se(e.pipe), Md = (e) => {
  const t = "[object FormData]";
  return e && (typeof FormData == "function" && e instanceof FormData || Oi.call(e) === t || Se(e.toString) && e.toString() === t);
}, Bd = de("URLSearchParams"), Vd = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function tt(e, t, { allOwnKeys: r = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let n, o;
  if (typeof e != "object" && (e = [e]), je(e))
    for (n = 0, o = e.length; n < o; n++)
      t.call(null, e[n], n, e);
  else {
    const i = r ? Object.getOwnPropertyNames(e) : Object.keys(e), a = i.length;
    let s;
    for (n = 0; n < a; n++)
      s = i[n], t.call(null, e[s], s, e);
  }
}
function Pi(e, t) {
  t = t.toLowerCase();
  const r = Object.keys(e);
  let n = r.length, o;
  for (; n-- > 0; )
    if (o = r[n], t === o.toLowerCase())
      return o;
  return null;
}
const Ti = typeof self > "u" ? typeof global > "u" ? globalThis : global : self, Ci = (e) => !Je(e) && e !== Ti;
function Rr() {
  const { caseless: e } = Ci(this) && this || {}, t = {}, r = (n, o) => {
    const i = e && Pi(t, o) || o;
    ft(t[i]) && ft(n) ? t[i] = Rr(t[i], n) : ft(n) ? t[i] = Rr({}, n) : je(n) ? t[i] = n.slice() : t[i] = n;
  };
  for (let n = 0, o = arguments.length; n < o; n++)
    arguments[n] && tt(arguments[n], r);
  return t;
}
const Wd = (e, t, r, { allOwnKeys: n } = {}) => (tt(t, (o, i) => {
  r && Se(o) ? e[i] = Si(o, r) : e[i] = o;
}, { allOwnKeys: n }), e), Hd = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), kd = (e, t, r, n) => {
  e.prototype = Object.create(t.prototype, n), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), r && Object.assign(e.prototype, r);
}, qd = (e, t, r, n) => {
  let o, i, a;
  const s = {};
  if (t = t || {}, e == null)
    return t;
  do {
    for (o = Object.getOwnPropertyNames(e), i = o.length; i-- > 0; )
      a = o[i], (!n || n(a, e, t)) && !s[a] && (t[a] = e[a], s[a] = !0);
    e = r !== !1 && Qr(e);
  } while (e && (!r || r(e, t)) && e !== Object.prototype);
  return t;
}, zd = (e, t, r) => {
  e = String(e), (r === void 0 || r > e.length) && (r = e.length), r -= t.length;
  const n = e.indexOf(t, r);
  return n !== -1 && n === r;
}, Gd = (e) => {
  if (!e)
    return null;
  if (je(e))
    return e;
  let t = e.length;
  if (!xi(t))
    return null;
  const r = new Array(t);
  for (; t-- > 0; )
    r[t] = e[t];
  return r;
}, Jd = ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Qr(Uint8Array)), Kd = (e, t) => {
  const n = (e && e[Symbol.iterator]).call(e);
  let o;
  for (; (o = n.next()) && !o.done; ) {
    const i = o.value;
    t.call(e, i[0], i[1]);
  }
}, Yd = (e, t) => {
  let r;
  const n = [];
  for (; (r = e.exec(t)) !== null; )
    n.push(r);
  return n;
}, Xd = de("HTMLFormElement"), Zd = (e) => e.toLowerCase().replace(
  /[_-\s]([a-z\d])(\w*)/g,
  function(r, n, o) {
    return n.toUpperCase() + o;
  }
), wo = (({ hasOwnProperty: e }) => (t, r) => e.call(t, r))(Object.prototype), Qd = de("RegExp"), Ai = (e, t) => {
  const r = Object.getOwnPropertyDescriptors(e), n = {};
  tt(r, (o, i) => {
    t(o, i, e) !== !1 && (n[i] = o);
  }), Object.defineProperties(e, n);
}, ep = (e) => {
  Ai(e, (t, r) => {
    if (Se(e) && ["arguments", "caller", "callee"].indexOf(r) !== -1)
      return !1;
    const n = e[r];
    if (Se(n)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + r + "'");
      });
    }
  });
}, tp = (e, t) => {
  const r = {}, n = (o) => {
    o.forEach((i) => {
      r[i] = !0;
    });
  };
  return je(e) ? n(e) : n(String(e).split(t)), r;
}, rp = () => {
}, np = (e, t) => (e = +e, Number.isFinite(e) ? e : t), op = (e) => {
  const t = new Array(10), r = (n, o) => {
    if (tn(n)) {
      if (t.indexOf(n) >= 0)
        return;
      if (!("toJSON" in n)) {
        t[o] = n;
        const i = je(n) ? [] : {};
        return tt(n, (a, s) => {
          const u = r(a, o + 1);
          !Je(u) && (i[s] = u);
        }), t[o] = void 0, i;
      }
    }
    return n;
  };
  return r(e, 0);
}, h = {
  isArray: je,
  isArrayBuffer: Ri,
  isBuffer: Ad,
  isFormData: Md,
  isArrayBufferView: Nd,
  isString: Dd,
  isNumber: xi,
  isBoolean: Ld,
  isObject: tn,
  isPlainObject: ft,
  isUndefined: Je,
  isDate: $d,
  isFile: Id,
  isBlob: jd,
  isRegExp: Qd,
  isFunction: Se,
  isStream: Fd,
  isURLSearchParams: Bd,
  isTypedArray: Jd,
  isFileList: Ud,
  forEach: tt,
  merge: Rr,
  extend: Wd,
  trim: Vd,
  stripBOM: Hd,
  inherits: kd,
  toFlatObject: qd,
  kindOf: en,
  kindOfTest: de,
  endsWith: zd,
  toArray: Gd,
  forEachEntry: Kd,
  matchAll: Yd,
  isHTMLForm: Xd,
  hasOwnProperty: wo,
  hasOwnProp: wo,
  reduceDescriptors: Ai,
  freezeMethods: ep,
  toObjectSet: tp,
  toCamelCase: Zd,
  noop: rp,
  toFiniteNumber: np,
  findKey: Pi,
  global: Ti,
  isContextDefined: Ci,
  toJSONObject: op
};
function A(e, t, r, n, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), r && (this.config = r), n && (this.request = n), o && (this.response = o);
}
h.inherits(A, Error, {
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
      config: h.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const Ni = A.prototype, Di = {};
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
  Di[e] = { value: e };
});
Object.defineProperties(A, Di);
Object.defineProperty(Ni, "isAxiosError", { value: !0 });
A.from = (e, t, r, n, o, i) => {
  const a = Object.create(Ni);
  return h.toFlatObject(e, a, function(u) {
    return u !== Error.prototype;
  }, (s) => s !== "isAxiosError"), A.call(a, e.message, t, r, n, o), a.cause = e, a.name = e.name, i && Object.assign(a, i), a;
};
var ip = typeof self == "object" ? self.FormData : window.FormData;
const ap = ip;
function xr(e) {
  return h.isPlainObject(e) || h.isArray(e);
}
function Li(e) {
  return h.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function _o(e, t, r) {
  return e ? e.concat(t).map(function(o, i) {
    return o = Li(o), !r && i ? "[" + o + "]" : o;
  }).join(r ? "." : "") : t;
}
function sp(e) {
  return h.isArray(e) && !e.some(xr);
}
const up = h.toFlatObject(h, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function cp(e) {
  return e && h.isFunction(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator];
}
function Ut(e, t, r) {
  if (!h.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new (ap || FormData)(), r = h.toFlatObject(r, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(v, S) {
    return !h.isUndefined(S[v]);
  });
  const n = r.metaTokens, o = r.visitor || f, i = r.dots, a = r.indexes, u = (r.Blob || typeof Blob < "u" && Blob) && cp(t);
  if (!h.isFunction(o))
    throw new TypeError("visitor must be a function");
  function l(g) {
    if (g === null)
      return "";
    if (h.isDate(g))
      return g.toISOString();
    if (!u && h.isBlob(g))
      throw new A("Blob is not supported. Use a Buffer instead.");
    return h.isArrayBuffer(g) || h.isTypedArray(g) ? u && typeof Blob == "function" ? new Blob([g]) : Buffer.from(g) : g;
  }
  function f(g, v, S) {
    let w = g;
    if (g && !S && typeof g == "object") {
      if (h.endsWith(v, "{}"))
        v = n ? v : v.slice(0, -2), g = JSON.stringify(g);
      else if (h.isArray(g) && sp(g) || h.isFileList(g) || h.endsWith(v, "[]") && (w = h.toArray(g)))
        return v = Li(v), w.forEach(function(_, P) {
          !(h.isUndefined(_) || _ === null) && t.append(
            a === !0 ? _o([v], P, i) : a === null ? v : v + "[]",
            l(_)
          );
        }), !1;
    }
    return xr(g) ? !0 : (t.append(_o(S, v, i), l(g)), !1);
  }
  const d = [], p = Object.assign(up, {
    defaultVisitor: f,
    convertValue: l,
    isVisitable: xr
  });
  function m(g, v) {
    if (!h.isUndefined(g)) {
      if (d.indexOf(g) !== -1)
        throw Error("Circular reference detected in " + v.join("."));
      d.push(g), h.forEach(g, function(w, N) {
        (!(h.isUndefined(w) || w === null) && o.call(
          t,
          w,
          h.isString(N) ? N.trim() : N,
          v,
          p
        )) === !0 && m(w, v ? v.concat(N) : [N]);
      }), d.pop();
    }
  }
  if (!h.isObject(e))
    throw new TypeError("data must be an object");
  return m(e), t;
}
function So(e) {
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
function rn(e, t) {
  this._pairs = [], e && Ut(e, this, t);
}
const $i = rn.prototype;
$i.append = function(t, r) {
  this._pairs.push([t, r]);
};
$i.toString = function(t) {
  const r = t ? function(n) {
    return t.call(this, n, So);
  } : So;
  return this._pairs.map(function(o) {
    return r(o[0]) + "=" + r(o[1]);
  }, "").join("&");
};
function lp(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Ii(e, t, r) {
  if (!t)
    return e;
  const n = r && r.encode || lp, o = r && r.serialize;
  let i;
  if (o ? i = o(t, r) : i = h.isURLSearchParams(t) ? t.toString() : new rn(t, r).toString(n), i) {
    const a = e.indexOf("#");
    a !== -1 && (e = e.slice(0, a)), e += (e.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return e;
}
class fp {
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
    h.forEach(this.handlers, function(n) {
      n !== null && t(n);
    });
  }
}
const Oo = fp, ji = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, dp = typeof URLSearchParams < "u" ? URLSearchParams : rn, pp = FormData, hp = (() => {
  let e;
  return typeof navigator < "u" && ((e = navigator.product) === "ReactNative" || e === "NativeScript" || e === "NS") ? !1 : typeof window < "u" && typeof document < "u";
})(), mp = (() => typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), ee = {
  isBrowser: !0,
  classes: {
    URLSearchParams: dp,
    FormData: pp,
    Blob
  },
  isStandardBrowserEnv: hp,
  isStandardBrowserWebWorkerEnv: mp,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function vp(e, t) {
  return Ut(e, new ee.classes.URLSearchParams(), Object.assign({
    visitor: function(r, n, o, i) {
      return ee.isNode && h.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function gp(e) {
  return h.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function yp(e) {
  const t = {}, r = Object.keys(e);
  let n;
  const o = r.length;
  let i;
  for (n = 0; n < o; n++)
    i = r[n], t[i] = e[i];
  return t;
}
function Ui(e) {
  function t(r, n, o, i) {
    let a = r[i++];
    const s = Number.isFinite(+a), u = i >= r.length;
    return a = !a && h.isArray(o) ? o.length : a, u ? (h.hasOwnProp(o, a) ? o[a] = [o[a], n] : o[a] = n, !s) : ((!o[a] || !h.isObject(o[a])) && (o[a] = []), t(r, n, o[a], i) && h.isArray(o[a]) && (o[a] = yp(o[a])), !s);
  }
  if (h.isFormData(e) && h.isFunction(e.entries)) {
    const r = {};
    return h.forEachEntry(e, (n, o) => {
      t(gp(n), o, r, 0);
    }), r;
  }
  return null;
}
const bp = {
  "Content-Type": void 0
};
function Ep(e, t, r) {
  if (h.isString(e))
    try {
      return (t || JSON.parse)(e), h.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (r || JSON.stringify)(e);
}
const Ft = {
  transitional: ji,
  adapter: ["xhr", "http"],
  transformRequest: [function(t, r) {
    const n = r.getContentType() || "", o = n.indexOf("application/json") > -1, i = h.isObject(t);
    if (i && h.isHTMLForm(t) && (t = new FormData(t)), h.isFormData(t))
      return o && o ? JSON.stringify(Ui(t)) : t;
    if (h.isArrayBuffer(t) || h.isBuffer(t) || h.isStream(t) || h.isFile(t) || h.isBlob(t))
      return t;
    if (h.isArrayBufferView(t))
      return t.buffer;
    if (h.isURLSearchParams(t))
      return r.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let s;
    if (i) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return vp(t, this.formSerializer).toString();
      if ((s = h.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
        const u = this.env && this.env.FormData;
        return Ut(
          s ? { "files[]": t } : t,
          u && new u(),
          this.formSerializer
        );
      }
    }
    return i || o ? (r.setContentType("application/json", !1), Ep(t)) : t;
  }],
  transformResponse: [function(t) {
    const r = this.transitional || Ft.transitional, n = r && r.forcedJSONParsing, o = this.responseType === "json";
    if (t && h.isString(t) && (n && !this.responseType || o)) {
      const a = !(r && r.silentJSONParsing) && o;
      try {
        return JSON.parse(t);
      } catch (s) {
        if (a)
          throw s.name === "SyntaxError" ? A.from(s, A.ERR_BAD_RESPONSE, this, null, this.response) : s;
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
    FormData: ee.classes.FormData,
    Blob: ee.classes.Blob
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
h.forEach(["delete", "get", "head"], function(t) {
  Ft.headers[t] = {};
});
h.forEach(["post", "put", "patch"], function(t) {
  Ft.headers[t] = h.merge(bp);
});
const nn = Ft, wp = h.toObjectSet([
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
]), _p = (e) => {
  const t = {};
  let r, n, o;
  return e && e.split(`
`).forEach(function(a) {
    o = a.indexOf(":"), r = a.substring(0, o).trim().toLowerCase(), n = a.substring(o + 1).trim(), !(!r || t[r] && wp[r]) && (r === "set-cookie" ? t[r] ? t[r].push(n) : t[r] = [n] : t[r] = t[r] ? t[r] + ", " + n : n);
  }), t;
}, Ro = Symbol("internals");
function We(e) {
  return e && String(e).trim().toLowerCase();
}
function dt(e) {
  return e === !1 || e == null ? e : h.isArray(e) ? e.map(dt) : String(e);
}
function Sp(e) {
  const t = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(e); )
    t[n[1]] = n[2];
  return t;
}
function Op(e) {
  return /^[-_a-zA-Z]+$/.test(e.trim());
}
function xo(e, t, r, n) {
  if (h.isFunction(n))
    return n.call(this, t, r);
  if (h.isString(t)) {
    if (h.isString(n))
      return t.indexOf(n) !== -1;
    if (h.isRegExp(n))
      return n.test(t);
  }
}
function Rp(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, r, n) => r.toUpperCase() + n);
}
function xp(e, t) {
  const r = h.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(e, n + r, {
      value: function(o, i, a) {
        return this[n].call(this, t, o, i, a);
      },
      configurable: !0
    });
  });
}
class Mt {
  constructor(t) {
    t && this.set(t);
  }
  set(t, r, n) {
    const o = this;
    function i(s, u, l) {
      const f = We(u);
      if (!f)
        throw new Error("header name must be a non-empty string");
      const d = h.findKey(o, f);
      (!d || o[d] === void 0 || l === !0 || l === void 0 && o[d] !== !1) && (o[d || u] = dt(s));
    }
    const a = (s, u) => h.forEach(s, (l, f) => i(l, f, u));
    return h.isPlainObject(t) || t instanceof this.constructor ? a(t, r) : h.isString(t) && (t = t.trim()) && !Op(t) ? a(_p(t), r) : t != null && i(r, t, n), this;
  }
  get(t, r) {
    if (t = We(t), t) {
      const n = h.findKey(this, t);
      if (n) {
        const o = this[n];
        if (!r)
          return o;
        if (r === !0)
          return Sp(o);
        if (h.isFunction(r))
          return r.call(this, o, n);
        if (h.isRegExp(r))
          return r.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, r) {
    if (t = We(t), t) {
      const n = h.findKey(this, t);
      return !!(n && (!r || xo(this, this[n], n, r)));
    }
    return !1;
  }
  delete(t, r) {
    const n = this;
    let o = !1;
    function i(a) {
      if (a = We(a), a) {
        const s = h.findKey(n, a);
        s && (!r || xo(n, n[s], s, r)) && (delete n[s], o = !0);
      }
    }
    return h.isArray(t) ? t.forEach(i) : i(t), o;
  }
  clear() {
    return Object.keys(this).forEach(this.delete.bind(this));
  }
  normalize(t) {
    const r = this, n = {};
    return h.forEach(this, (o, i) => {
      const a = h.findKey(n, i);
      if (a) {
        r[a] = dt(o), delete r[i];
        return;
      }
      const s = t ? Rp(i) : String(i).trim();
      s !== i && delete r[i], r[s] = dt(o), n[s] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const r = /* @__PURE__ */ Object.create(null);
    return h.forEach(this, (n, o) => {
      n != null && n !== !1 && (r[o] = t && h.isArray(n) ? n.join(", ") : n);
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
    const n = (this[Ro] = this[Ro] = {
      accessors: {}
    }).accessors, o = this.prototype;
    function i(a) {
      const s = We(a);
      n[s] || (xp(o, a), n[s] = !0);
    }
    return h.isArray(t) ? t.forEach(i) : i(t), this;
  }
}
Mt.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent"]);
h.freezeMethods(Mt.prototype);
h.freezeMethods(Mt);
const se = Mt;
function or(e, t) {
  const r = this || nn, n = t || r, o = se.from(n.headers);
  let i = n.data;
  return h.forEach(e, function(s) {
    i = s.call(r, i, o.normalize(), t ? t.status : void 0);
  }), o.normalize(), i;
}
function Fi(e) {
  return !!(e && e.__CANCEL__);
}
function rt(e, t, r) {
  A.call(this, e ?? "canceled", A.ERR_CANCELED, t, r), this.name = "CanceledError";
}
h.inherits(rt, A, {
  __CANCEL__: !0
});
const Pp = null;
function Tp(e, t, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? e(r) : t(new A(
    "Request failed with status code " + r.status,
    [A.ERR_BAD_REQUEST, A.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
    r.config,
    r.request,
    r
  ));
}
const Cp = ee.isStandardBrowserEnv ? function() {
  return {
    write: function(r, n, o, i, a, s) {
      const u = [];
      u.push(r + "=" + encodeURIComponent(n)), h.isNumber(o) && u.push("expires=" + new Date(o).toGMTString()), h.isString(i) && u.push("path=" + i), h.isString(a) && u.push("domain=" + a), s === !0 && u.push("secure"), document.cookie = u.join("; ");
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
function Ap(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Np(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Mi(e, t) {
  return e && !Ap(t) ? Np(e, t) : t;
}
const Dp = ee.isStandardBrowserEnv ? function() {
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
    const s = h.isString(a) ? o(a) : a;
    return s.protocol === n.protocol && s.host === n.host;
  };
}() : function() {
  return function() {
    return !0;
  };
}();
function Lp(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function $p(e, t) {
  e = e || 10;
  const r = new Array(e), n = new Array(e);
  let o = 0, i = 0, a;
  return t = t !== void 0 ? t : 1e3, function(u) {
    const l = Date.now(), f = n[i];
    a || (a = l), r[o] = u, n[o] = l;
    let d = i, p = 0;
    for (; d !== o; )
      p += r[d++], d = d % e;
    if (o = (o + 1) % e, o === i && (i = (i + 1) % e), l - a < t)
      return;
    const m = f && l - f;
    return m ? Math.round(p * 1e3 / m) : void 0;
  };
}
function Po(e, t) {
  let r = 0;
  const n = $p(50, 250);
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
const Ip = typeof XMLHttpRequest < "u", jp = Ip && function(e) {
  return new Promise(function(r, n) {
    let o = e.data;
    const i = se.from(e.headers).normalize(), a = e.responseType;
    let s;
    function u() {
      e.cancelToken && e.cancelToken.unsubscribe(s), e.signal && e.signal.removeEventListener("abort", s);
    }
    h.isFormData(o) && (ee.isStandardBrowserEnv || ee.isStandardBrowserWebWorkerEnv) && i.setContentType(!1);
    let l = new XMLHttpRequest();
    if (e.auth) {
      const m = e.auth.username || "", g = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
      i.set("Authorization", "Basic " + btoa(m + ":" + g));
    }
    const f = Mi(e.baseURL, e.url);
    l.open(e.method.toUpperCase(), Ii(f, e.params, e.paramsSerializer), !0), l.timeout = e.timeout;
    function d() {
      if (!l)
        return;
      const m = se.from(
        "getAllResponseHeaders" in l && l.getAllResponseHeaders()
      ), v = {
        data: !a || a === "text" || a === "json" ? l.responseText : l.response,
        status: l.status,
        statusText: l.statusText,
        headers: m,
        config: e,
        request: l
      };
      Tp(function(w) {
        r(w), u();
      }, function(w) {
        n(w), u();
      }, v), l = null;
    }
    if ("onloadend" in l ? l.onloadend = d : l.onreadystatechange = function() {
      !l || l.readyState !== 4 || l.status === 0 && !(l.responseURL && l.responseURL.indexOf("file:") === 0) || setTimeout(d);
    }, l.onabort = function() {
      l && (n(new A("Request aborted", A.ECONNABORTED, e, l)), l = null);
    }, l.onerror = function() {
      n(new A("Network Error", A.ERR_NETWORK, e, l)), l = null;
    }, l.ontimeout = function() {
      let g = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
      const v = e.transitional || ji;
      e.timeoutErrorMessage && (g = e.timeoutErrorMessage), n(new A(
        g,
        v.clarifyTimeoutError ? A.ETIMEDOUT : A.ECONNABORTED,
        e,
        l
      )), l = null;
    }, ee.isStandardBrowserEnv) {
      const m = (e.withCredentials || Dp(f)) && e.xsrfCookieName && Cp.read(e.xsrfCookieName);
      m && i.set(e.xsrfHeaderName, m);
    }
    o === void 0 && i.setContentType(null), "setRequestHeader" in l && h.forEach(i.toJSON(), function(g, v) {
      l.setRequestHeader(v, g);
    }), h.isUndefined(e.withCredentials) || (l.withCredentials = !!e.withCredentials), a && a !== "json" && (l.responseType = e.responseType), typeof e.onDownloadProgress == "function" && l.addEventListener("progress", Po(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && l.upload && l.upload.addEventListener("progress", Po(e.onUploadProgress)), (e.cancelToken || e.signal) && (s = (m) => {
      l && (n(!m || m.type ? new rt(null, e, l) : m), l.abort(), l = null);
    }, e.cancelToken && e.cancelToken.subscribe(s), e.signal && (e.signal.aborted ? s() : e.signal.addEventListener("abort", s)));
    const p = Lp(f);
    if (p && ee.protocols.indexOf(p) === -1) {
      n(new A("Unsupported protocol " + p + ":", A.ERR_BAD_REQUEST, e));
      return;
    }
    l.send(o || null);
  });
}, pt = {
  http: Pp,
  xhr: jp
};
h.forEach(pt, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Up = {
  getAdapter: (e) => {
    e = h.isArray(e) ? e : [e];
    const { length: t } = e;
    let r, n;
    for (let o = 0; o < t && (r = e[o], !(n = h.isString(r) ? pt[r.toLowerCase()] : r)); o++)
      ;
    if (!n)
      throw n === !1 ? new A(
        `Adapter ${r} is not supported by the environment`,
        "ERR_NOT_SUPPORT"
      ) : new Error(
        h.hasOwnProp(pt, r) ? `Adapter '${r}' is not available in the build` : `Unknown adapter '${r}'`
      );
    if (!h.isFunction(n))
      throw new TypeError("adapter is not a function");
    return n;
  },
  adapters: pt
};
function ir(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new rt(null, e);
}
function To(e) {
  return ir(e), e.headers = se.from(e.headers), e.data = or.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), Up.getAdapter(e.adapter || nn.adapter)(e).then(function(n) {
    return ir(e), n.data = or.call(
      e,
      e.transformResponse,
      n
    ), n.headers = se.from(n.headers), n;
  }, function(n) {
    return Fi(n) || (ir(e), n && n.response && (n.response.data = or.call(
      e,
      e.transformResponse,
      n.response
    ), n.response.headers = se.from(n.response.headers))), Promise.reject(n);
  });
}
const Co = (e) => e instanceof se ? e.toJSON() : e;
function Le(e, t) {
  t = t || {};
  const r = {};
  function n(l, f, d) {
    return h.isPlainObject(l) && h.isPlainObject(f) ? h.merge.call({ caseless: d }, l, f) : h.isPlainObject(f) ? h.merge({}, f) : h.isArray(f) ? f.slice() : f;
  }
  function o(l, f, d) {
    if (h.isUndefined(f)) {
      if (!h.isUndefined(l))
        return n(void 0, l, d);
    } else
      return n(l, f, d);
  }
  function i(l, f) {
    if (!h.isUndefined(f))
      return n(void 0, f);
  }
  function a(l, f) {
    if (h.isUndefined(f)) {
      if (!h.isUndefined(l))
        return n(void 0, l);
    } else
      return n(void 0, f);
  }
  function s(l, f, d) {
    if (d in t)
      return n(l, f);
    if (d in e)
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
    headers: (l, f) => o(Co(l), Co(f), !0)
  };
  return h.forEach(Object.keys(e).concat(Object.keys(t)), function(f) {
    const d = u[f] || o, p = d(e[f], t[f], f);
    h.isUndefined(p) && d !== s || (r[f] = p);
  }), r;
}
const Bi = "1.2.1", on = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  on[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Ao = {};
on.transitional = function(t, r, n) {
  function o(i, a) {
    return "[Axios v" + Bi + "] Transitional option '" + i + "'" + a + (n ? ". " + n : "");
  }
  return (i, a, s) => {
    if (t === !1)
      throw new A(
        o(a, " has been removed" + (r ? " in " + r : "")),
        A.ERR_DEPRECATED
      );
    return r && !Ao[a] && (Ao[a] = !0, console.warn(
      o(
        a,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), t ? t(i, a, s) : !0;
  };
};
function Fp(e, t, r) {
  if (typeof e != "object")
    throw new A("options must be an object", A.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(e);
  let o = n.length;
  for (; o-- > 0; ) {
    const i = n[o], a = t[i];
    if (a) {
      const s = e[i], u = s === void 0 || a(s, i, e);
      if (u !== !0)
        throw new A("option " + i + " must be " + u, A.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0)
      throw new A("Unknown option " + i, A.ERR_BAD_OPTION);
  }
}
const Pr = {
  assertOptions: Fp,
  validators: on
}, pe = Pr.validators;
let St = class {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new Oo(),
      response: new Oo()
    };
  }
  request(t, r) {
    typeof t == "string" ? (r = r || {}, r.url = t) : r = t || {}, r = Le(this.defaults, r);
    const { transitional: n, paramsSerializer: o, headers: i } = r;
    n !== void 0 && Pr.assertOptions(n, {
      silentJSONParsing: pe.transitional(pe.boolean),
      forcedJSONParsing: pe.transitional(pe.boolean),
      clarifyTimeoutError: pe.transitional(pe.boolean)
    }, !1), o !== void 0 && Pr.assertOptions(o, {
      encode: pe.function,
      serialize: pe.function
    }, !0), r.method = (r.method || this.defaults.method || "get").toLowerCase();
    let a;
    a = i && h.merge(
      i.common,
      i[r.method]
    ), a && h.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (g) => {
        delete i[g];
      }
    ), r.headers = se.concat(a, i);
    const s = [];
    let u = !0;
    this.interceptors.request.forEach(function(v) {
      typeof v.runWhen == "function" && v.runWhen(r) === !1 || (u = u && v.synchronous, s.unshift(v.fulfilled, v.rejected));
    });
    const l = [];
    this.interceptors.response.forEach(function(v) {
      l.push(v.fulfilled, v.rejected);
    });
    let f, d = 0, p;
    if (!u) {
      const g = [To.bind(this), void 0];
      for (g.unshift.apply(g, s), g.push.apply(g, l), p = g.length, f = Promise.resolve(r); d < p; )
        f = f.then(g[d++], g[d++]);
      return f;
    }
    p = s.length;
    let m = r;
    for (d = 0; d < p; ) {
      const g = s[d++], v = s[d++];
      try {
        m = g(m);
      } catch (S) {
        v.call(this, S);
        break;
      }
    }
    try {
      f = To.call(this, m);
    } catch (g) {
      return Promise.reject(g);
    }
    for (d = 0, p = l.length; d < p; )
      f = f.then(l[d++], l[d++]);
    return f;
  }
  getUri(t) {
    t = Le(this.defaults, t);
    const r = Mi(t.baseURL, t.url);
    return Ii(r, t.params, t.paramsSerializer);
  }
};
h.forEach(["delete", "get", "head", "options"], function(t) {
  St.prototype[t] = function(r, n) {
    return this.request(Le(n || {}, {
      method: t,
      url: r,
      data: (n || {}).data
    }));
  };
});
h.forEach(["post", "put", "patch"], function(t) {
  function r(n) {
    return function(i, a, s) {
      return this.request(Le(s || {}, {
        method: t,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: i,
        data: a
      }));
    };
  }
  St.prototype[t] = r(), St.prototype[t + "Form"] = r(!0);
});
const ht = St;
class an {
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
      n.reason || (n.reason = new rt(i, a, s), r(n.reason));
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
      token: new an(function(o) {
        t = o;
      }),
      cancel: t
    };
  }
}
const Mp = an;
function Bp(e) {
  return function(r) {
    return e.apply(null, r);
  };
}
function Vp(e) {
  return h.isObject(e) && e.isAxiosError === !0;
}
function Vi(e) {
  const t = new ht(e), r = Si(ht.prototype.request, t);
  return h.extend(r, ht.prototype, t, { allOwnKeys: !0 }), h.extend(r, t, null, { allOwnKeys: !0 }), r.create = function(o) {
    return Vi(Le(e, o));
  }, r;
}
const H = Vi(nn);
H.Axios = ht;
H.CanceledError = rt;
H.CancelToken = Mp;
H.isCancel = Fi;
H.VERSION = Bi;
H.toFormData = Ut;
H.AxiosError = A;
H.Cancel = H.CanceledError;
H.all = function(t) {
  return Promise.all(t);
};
H.spread = Bp;
H.isAxiosError = Vp;
H.mergeConfig = Le;
H.AxiosHeaders = se;
H.formToJSON = (e) => Ui(h.isHTMLForm(e) ? new FormData(e) : e);
H.default = H;
const Wp = H;
var Tr = function(e, t) {
  return Tr = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
    r.__proto__ = n;
  } || function(r, n) {
    for (var o in n)
      Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
  }, Tr(e, t);
};
function Bt(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  Tr(e, t);
  function r() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
}
function Cr(e) {
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
function Ot(e, t) {
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
function Rt(e, t, r) {
  if (r || arguments.length === 2)
    for (var n = 0, o = t.length, i; n < o; n++)
      (i || !(n in t)) && (i || (i = Array.prototype.slice.call(t, 0, n)), i[n] = t[n]);
  return e.concat(i || Array.prototype.slice.call(t));
}
function ue(e) {
  return typeof e == "function";
}
function Wi(e) {
  var t = function(n) {
    Error.call(n), n.stack = new Error().stack;
  }, r = e(t);
  return r.prototype = Object.create(Error.prototype), r.prototype.constructor = r, r;
}
var ar = Wi(function(e) {
  return function(r) {
    e(this), this.message = r ? r.length + ` errors occurred during unsubscription:
` + r.map(function(n, o) {
      return o + 1 + ") " + n.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = r;
  };
});
function Ar(e, t) {
  if (e) {
    var r = e.indexOf(t);
    0 <= r && e.splice(r, 1);
  }
}
var Vt = function() {
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
            for (var s = Cr(a), u = s.next(); !u.done; u = s.next()) {
              var l = u.value;
              l.remove(this);
            }
          } catch (v) {
            t = { error: v };
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
      if (ue(f))
        try {
          f();
        } catch (v) {
          i = v instanceof ar ? v.errors : [v];
        }
      var d = this._finalizers;
      if (d) {
        this._finalizers = null;
        try {
          for (var p = Cr(d), m = p.next(); !m.done; m = p.next()) {
            var g = m.value;
            try {
              No(g);
            } catch (v) {
              i = i ?? [], v instanceof ar ? i = Rt(Rt([], Ot(i)), Ot(v.errors)) : i.push(v);
            }
          }
        } catch (v) {
          n = { error: v };
        } finally {
          try {
            m && !m.done && (o = p.return) && o.call(p);
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
        No(t);
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
    r === t ? this._parentage = null : Array.isArray(r) && Ar(r, t);
  }, e.prototype.remove = function(t) {
    var r = this._finalizers;
    r && Ar(r, t), t instanceof e && t._removeParent(this);
  }, e.EMPTY = function() {
    var t = new e();
    return t.closed = !0, t;
  }(), e;
}(), Hi = Vt.EMPTY;
function ki(e) {
  return e instanceof Vt || e && "closed" in e && ue(e.remove) && ue(e.add) && ue(e.unsubscribe);
}
function No(e) {
  ue(e) ? e() : e.unsubscribe();
}
var sn = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1
}, Nr = {
  setTimeout: function(e, t) {
    for (var r = [], n = 2; n < arguments.length; n++)
      r[n - 2] = arguments[n];
    var o = Nr.delegate;
    return o != null && o.setTimeout ? o.setTimeout.apply(o, Rt([e, t], Ot(r))) : setTimeout.apply(void 0, Rt([e, t], Ot(r)));
  },
  clearTimeout: function(e) {
    var t = Nr.delegate;
    return ((t == null ? void 0 : t.clearTimeout) || clearTimeout)(e);
  },
  delegate: void 0
};
function Hp(e) {
  Nr.setTimeout(function() {
    throw e;
  });
}
function Do() {
}
var ut = null;
function mt(e) {
  if (sn.useDeprecatedSynchronousErrorHandling) {
    var t = !ut;
    if (t && (ut = { errorThrown: !1, error: null }), e(), t) {
      var r = ut, n = r.errorThrown, o = r.error;
      if (ut = null, n)
        throw o;
    }
  } else
    e();
}
var qi = function(e) {
  Bt(t, e);
  function t(r) {
    var n = e.call(this) || this;
    return n.isStopped = !1, r ? (n.destination = r, ki(r) && r.add(n)) : n.destination = Gp, n;
  }
  return t.create = function(r, n, o) {
    return new Dr(r, n, o);
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
}(Vt), kp = Function.prototype.bind;
function sr(e, t) {
  return kp.call(e, t);
}
var qp = function() {
  function e(t) {
    this.partialObserver = t;
  }
  return e.prototype.next = function(t) {
    var r = this.partialObserver;
    if (r.next)
      try {
        r.next(t);
      } catch (n) {
        ct(n);
      }
  }, e.prototype.error = function(t) {
    var r = this.partialObserver;
    if (r.error)
      try {
        r.error(t);
      } catch (n) {
        ct(n);
      }
    else
      ct(t);
  }, e.prototype.complete = function() {
    var t = this.partialObserver;
    if (t.complete)
      try {
        t.complete();
      } catch (r) {
        ct(r);
      }
  }, e;
}(), Dr = function(e) {
  Bt(t, e);
  function t(r, n, o) {
    var i = e.call(this) || this, a;
    if (ue(r) || !r)
      a = {
        next: r ?? void 0,
        error: n ?? void 0,
        complete: o ?? void 0
      };
    else {
      var s;
      i && sn.useDeprecatedNextContext ? (s = Object.create(r), s.unsubscribe = function() {
        return i.unsubscribe();
      }, a = {
        next: r.next && sr(r.next, s),
        error: r.error && sr(r.error, s),
        complete: r.complete && sr(r.complete, s)
      }) : a = r;
    }
    return i.destination = new qp(a), i;
  }
  return t;
}(qi);
function ct(e) {
  Hp(e);
}
function zp(e) {
  throw e;
}
var Gp = {
  closed: !0,
  next: Do,
  error: zp,
  complete: Do
}, Jp = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function Kp(e) {
  return e;
}
function Yp(e) {
  return e.length === 0 ? Kp : e.length === 1 ? e[0] : function(r) {
    return e.reduce(function(n, o) {
      return o(n);
    }, r);
  };
}
var xt = function() {
  function e(t) {
    t && (this._subscribe = t);
  }
  return e.prototype.lift = function(t) {
    var r = new e();
    return r.source = this, r.operator = t, r;
  }, e.prototype.subscribe = function(t, r, n) {
    var o = this, i = Zp(t) ? t : new Dr(t, r, n);
    return mt(function() {
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
    return r = Lo(r), new r(function(o, i) {
      var a = new Dr({
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
  }, e.prototype[Jp] = function() {
    return this;
  }, e.prototype.pipe = function() {
    for (var t = [], r = 0; r < arguments.length; r++)
      t[r] = arguments[r];
    return Yp(t)(this);
  }, e.prototype.toPromise = function(t) {
    var r = this;
    return t = Lo(t), new t(function(n, o) {
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
function Lo(e) {
  var t;
  return (t = e ?? sn.Promise) !== null && t !== void 0 ? t : Promise;
}
function Xp(e) {
  return e && ue(e.next) && ue(e.error) && ue(e.complete);
}
function Zp(e) {
  return e && e instanceof qi || Xp(e) && ki(e);
}
var Qp = Wi(function(e) {
  return function() {
    e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), Lr = function(e) {
  Bt(t, e);
  function t() {
    var r = e.call(this) || this;
    return r.closed = !1, r.currentObservers = null, r.observers = [], r.isStopped = !1, r.hasError = !1, r.thrownError = null, r;
  }
  return t.prototype.lift = function(r) {
    var n = new $o(this, this);
    return n.operator = r, n;
  }, t.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new Qp();
  }, t.prototype.next = function(r) {
    var n = this;
    mt(function() {
      var o, i;
      if (n._throwIfClosed(), !n.isStopped) {
        n.currentObservers || (n.currentObservers = Array.from(n.observers));
        try {
          for (var a = Cr(n.currentObservers), s = a.next(); !s.done; s = a.next()) {
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
    mt(function() {
      if (n._throwIfClosed(), !n.isStopped) {
        n.hasError = n.isStopped = !0, n.thrownError = r;
        for (var o = n.observers; o.length; )
          o.shift().error(r);
      }
    });
  }, t.prototype.complete = function() {
    var r = this;
    mt(function() {
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
    return i || a ? Hi : (this.currentObservers = null, s.push(r), new Vt(function() {
      n.currentObservers = null, Ar(s, r);
    }));
  }, t.prototype._checkFinalizedStatuses = function(r) {
    var n = this, o = n.hasError, i = n.thrownError, a = n.isStopped;
    o ? r.error(i) : a && r.complete();
  }, t.prototype.asObservable = function() {
    var r = new xt();
    return r.source = this, r;
  }, t.create = function(r, n) {
    return new $o(r, n);
  }, t;
}(xt), $o = function(e) {
  Bt(t, e);
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
    return (o = (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(r)) !== null && o !== void 0 ? o : Hi;
  }, t;
}(Lr);
class un {
  constructor(t) {
    G(this, "config");
    G(this, "axios");
    t && (this.config = t), this.axios = Wp.create(this.config);
  }
  get interceptors() {
    return this.axios.interceptors;
  }
  static create(t) {
    return new un(t);
  }
  request(t) {
    return new xt((r) => {
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
function eh(e) {
  return un.create({
    baseURL: e
  });
}
const B = class {
  constructor(t, r) {
    G(this, "axiosInstance");
    G(this, "defaultConfig", {
      contentType: "json",
      cache: !1
    });
    G(this, "tokenType");
    this.axiosInstance = eh(t), this.setupInterceptor(), r && (this.defaultConfig = {
      ...this.defaultConfig,
      ...r
    });
  }
  static setAuthorizationTokenType(t) {
    B.tokenType = t;
  }
  static setGlobalParams(t) {
    B.globalParams = {
      ...B.globalParams,
      ...t
    };
  }
  static setGlobalData(t) {
    B.globalData = {
      ...B.globalData,
      ...t
    };
  }
  static setGlobalHeaders(t) {
    B.globalHeaders = {
      ...B.globalHeaders,
      ...t
    };
  }
  static addInterceptor(t) {
    return B.interceptors.add(t), () => {
      B.removeInterceptor(t);
    };
  }
  static removeInterceptor(t) {
    B.interceptors.delete(t);
  }
  setAuthorizationTokenType(t) {
    this.tokenType = t;
  }
  getTokenType(t) {
    return t.tokenType !== void 0 ? t.tokenType : this.tokenType !== void 0 ? this.tokenType : B.tokenType;
  }
  setupInterceptor() {
    this.axiosInstance.interceptors.request.use(
      async (t) => {
        if (t = await this.useRequestInterceptors(t), t = wd({}, this.defaultConfig, t), t.headers = {
          ...t.headers,
          ...B.globalHeaders,
          "Content-Type": t.contentType === "formData" ? !1 : t.contentType === "urlEncoded" ? _r.UrlEncoded : _r.Json
        }, !t.preparedData) {
          if ((typeof t.cache < "u" ? t.cache : this.defaultConfig.cache) === !1 && (t.headers["Cache-Control"] = "no-cache", t.params = {
            ...t.params,
            axios_timestamp: Date.now()
          }), t.params = _t(
            bo({
              ...t.params,
              ...B.globalParams
            })
          ), t.data = {
            ...t.data,
            ...B.globalData
          }, bo(t.data), JSON.stringify(t.data) === "{}")
            t.data = void 0;
          else
            switch (t.contentType) {
              case "formData":
                t.data = Sr(t.data);
                break;
              case "urlEncoded":
                t.data = _t(t.data);
            }
          t.preparedData = !0;
        }
        const r = this.getTokenType(t), n = r ? Or.getToken(r) : null;
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
    for (const r of B.interceptors)
      r.request && (t = await r.request(t));
    return t;
  }
  async useErrorResponseInterceptor(t) {
    for (const r of B.interceptors)
      if (r.response && r.response.error)
        try {
          t = await r.response.error(t, this.axiosInstance);
        } catch {
          return t;
        }
    return t;
  }
  async useSuccessResponseInterceptor(t) {
    for (const r of B.interceptors)
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
let ie = B;
G(ie, "tokenType", "base_token"), G(ie, "globalParams", {}), G(ie, "globalData", {}), G(ie, "globalHeaders", {}), G(ie, "interceptors", /* @__PURE__ */ new Set());
var Ke = {}, th = {
  get exports() {
    return Ke;
  },
  set exports(e) {
    Ke = e;
  }
}, Ce = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var ur, Io;
function zi() {
  if (Io)
    return ur;
  Io = 1;
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
  return ur = o() ? Object.assign : function(i, a) {
    for (var s, u = n(i), l, f = 1; f < arguments.length; f++) {
      s = Object(arguments[f]);
      for (var d in s)
        t.call(s, d) && (u[d] = s[d]);
      if (e) {
        l = e(s);
        for (var p = 0; p < l.length; p++)
          r.call(s, l[p]) && (u[l[p]] = s[l[p]]);
      }
    }
    return u;
  }, ur;
}
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var jo;
function rh() {
  if (jo)
    return Ce;
  jo = 1, zi();
  var e = Ye, t = 60103;
  if (Ce.Fragment = 60107, typeof Symbol == "function" && Symbol.for) {
    var r = Symbol.for;
    t = r("react.element"), Ce.Fragment = r("react.fragment");
  }
  var n = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = Object.prototype.hasOwnProperty, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function a(s, u, l) {
    var f, d = {}, p = null, m = null;
    l !== void 0 && (p = "" + l), u.key !== void 0 && (p = "" + u.key), u.ref !== void 0 && (m = u.ref);
    for (f in u)
      o.call(u, f) && !i.hasOwnProperty(f) && (d[f] = u[f]);
    if (s && s.defaultProps)
      for (f in u = s.defaultProps, u)
        d[f] === void 0 && (d[f] = u[f]);
    return { $$typeof: t, type: s, key: p, ref: m, props: d, _owner: n.current };
  }
  return Ce.jsx = a, Ce.jsxs = a, Ce;
}
var cr = {};
/** @license React v17.0.2
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Uo;
function nh() {
  return Uo || (Uo = 1, function(e) {
    process.env.NODE_ENV !== "production" && function() {
      var t = Ye, r = zi(), n = 60103, o = 60106;
      e.Fragment = 60107;
      var i = 60108, a = 60114, s = 60109, u = 60110, l = 60112, f = 60113, d = 60120, p = 60115, m = 60116, g = 60121, v = 60122, S = 60117, w = 60129, N = 60131;
      if (typeof Symbol == "function" && Symbol.for) {
        var _ = Symbol.for;
        n = _("react.element"), o = _("react.portal"), e.Fragment = _("react.fragment"), i = _("react.strict_mode"), a = _("react.profiler"), s = _("react.provider"), u = _("react.context"), l = _("react.forward_ref"), f = _("react.suspense"), d = _("react.suspense_list"), p = _("react.memo"), m = _("react.lazy"), g = _("react.block"), v = _("react.server.block"), S = _("react.fundamental"), _("react.scope"), _("react.opaque.id"), w = _("react.debug_trace_mode"), _("react.offscreen"), N = _("react.legacy_hidden");
      }
      var P = typeof Symbol == "function" && Symbol.iterator, I = "@@iterator";
      function x(c) {
        if (c === null || typeof c != "object")
          return null;
        var y = P && c[P] || c[I];
        return typeof y == "function" ? y : null;
      }
      var U = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function $(c) {
        {
          for (var y = arguments.length, E = new Array(y > 1 ? y - 1 : 0), O = 1; O < y; O++)
            E[O - 1] = arguments[O];
          k("error", c, E);
        }
      }
      function k(c, y, E) {
        {
          var O = U.ReactDebugCurrentFrame, D = O.getStackAddendum();
          D !== "" && (y += "%s", E = E.concat([D]));
          var L = E.map(function(C) {
            return "" + C;
          });
          L.unshift("Warning: " + y), Function.prototype.apply.call(console[c], console, L);
        }
      }
      var Fe = !1;
      function Wt(c) {
        return !!(typeof c == "string" || typeof c == "function" || c === e.Fragment || c === a || c === w || c === i || c === f || c === d || c === N || Fe || typeof c == "object" && c !== null && (c.$$typeof === m || c.$$typeof === p || c.$$typeof === s || c.$$typeof === u || c.$$typeof === l || c.$$typeof === S || c.$$typeof === g || c[0] === v));
      }
      function Zi(c, y, E) {
        var O = y.displayName || y.name || "";
        return c.displayName || (O !== "" ? E + "(" + O + ")" : E);
      }
      function fn(c) {
        return c.displayName || "Context";
      }
      function Q(c) {
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
          case a:
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
              return fn(y) + ".Consumer";
            case s:
              var E = c;
              return fn(E._context) + ".Provider";
            case l:
              return Zi(c, c.render, "ForwardRef");
            case p:
              return Q(c.type);
            case g:
              return Q(c._render);
            case m: {
              var O = c, D = O._payload, L = O._init;
              try {
                return Q(L(D));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var Me = 0, dn, pn, hn, mn, vn, gn, yn;
      function bn() {
      }
      bn.__reactDisabledLog = !0;
      function Qi() {
        {
          if (Me === 0) {
            dn = console.log, pn = console.info, hn = console.warn, mn = console.error, vn = console.group, gn = console.groupCollapsed, yn = console.groupEnd;
            var c = {
              configurable: !0,
              enumerable: !0,
              value: bn,
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
          Me++;
        }
      }
      function ea() {
        {
          if (Me--, Me === 0) {
            var c = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: r({}, c, {
                value: dn
              }),
              info: r({}, c, {
                value: pn
              }),
              warn: r({}, c, {
                value: hn
              }),
              error: r({}, c, {
                value: mn
              }),
              group: r({}, c, {
                value: vn
              }),
              groupCollapsed: r({}, c, {
                value: gn
              }),
              groupEnd: r({}, c, {
                value: yn
              })
            });
          }
          Me < 0 && $("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var Ht = U.ReactCurrentDispatcher, kt;
      function nt(c, y, E) {
        {
          if (kt === void 0)
            try {
              throw Error();
            } catch (D) {
              var O = D.stack.trim().match(/\n( *(at )?)/);
              kt = O && O[1] || "";
            }
          return `
` + kt + c;
        }
      }
      var qt = !1, ot;
      {
        var ta = typeof WeakMap == "function" ? WeakMap : Map;
        ot = new ta();
      }
      function En(c, y) {
        if (!c || qt)
          return "";
        {
          var E = ot.get(c);
          if (E !== void 0)
            return E;
        }
        var O;
        qt = !0;
        var D = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var L;
        L = Ht.current, Ht.current = null, Qi();
        try {
          if (y) {
            var C = function() {
              throw Error();
            };
            if (Object.defineProperty(C.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(C, []);
              } catch (oe) {
                O = oe;
              }
              Reflect.construct(c, [], C);
            } else {
              try {
                C.call();
              } catch (oe) {
                O = oe;
              }
              c.call(C.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (oe) {
              O = oe;
            }
            c();
          }
        } catch (oe) {
          if (oe && O && typeof oe.stack == "string") {
            for (var T = oe.stack.split(`
`), q = O.stack.split(`
`), F = T.length - 1, M = q.length - 1; F >= 1 && M >= 0 && T[F] !== q[M]; )
              M--;
            for (; F >= 1 && M >= 0; F--, M--)
              if (T[F] !== q[M]) {
                if (F !== 1 || M !== 1)
                  do
                    if (F--, M--, M < 0 || T[F] !== q[M]) {
                      var ne = `
` + T[F].replace(" at new ", " at ");
                      return typeof c == "function" && ot.set(c, ne), ne;
                    }
                  while (F >= 1 && M >= 0);
                break;
              }
          }
        } finally {
          qt = !1, Ht.current = L, ea(), Error.prepareStackTrace = D;
        }
        var Te = c ? c.displayName || c.name : "", Dn = Te ? nt(Te) : "";
        return typeof c == "function" && ot.set(c, Dn), Dn;
      }
      function wn(c, y, E) {
        return En(c, !1);
      }
      function ra(c) {
        var y = c.prototype;
        return !!(y && y.isReactComponent);
      }
      function it(c, y, E) {
        if (c == null)
          return "";
        if (typeof c == "function")
          return En(c, ra(c));
        if (typeof c == "string")
          return nt(c);
        switch (c) {
          case f:
            return nt("Suspense");
          case d:
            return nt("SuspenseList");
        }
        if (typeof c == "object")
          switch (c.$$typeof) {
            case l:
              return wn(c.render);
            case p:
              return it(c.type, y, E);
            case g:
              return wn(c._render);
            case m: {
              var O = c, D = O._payload, L = O._init;
              try {
                return it(L(D), y, E);
              } catch {
              }
            }
          }
        return "";
      }
      var _n = {}, Sn = U.ReactDebugCurrentFrame;
      function at(c) {
        if (c) {
          var y = c._owner, E = it(c.type, c._source, y ? y.type : null);
          Sn.setExtraStackFrame(E);
        } else
          Sn.setExtraStackFrame(null);
      }
      function na(c, y, E, O, D) {
        {
          var L = Function.call.bind(Object.prototype.hasOwnProperty);
          for (var C in c)
            if (L(c, C)) {
              var T = void 0;
              try {
                if (typeof c[C] != "function") {
                  var q = Error((O || "React class") + ": " + E + " type `" + C + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof c[C] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw q.name = "Invariant Violation", q;
                }
                T = c[C](y, C, O, E, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (F) {
                T = F;
              }
              T && !(T instanceof Error) && (at(D), $("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", O || "React class", E, C, typeof T), at(null)), T instanceof Error && !(T.message in _n) && (_n[T.message] = !0, at(D), $("Failed %s type: %s", E, T.message), at(null));
            }
        }
      }
      var Be = U.ReactCurrentOwner, zt = Object.prototype.hasOwnProperty, oa = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, On, Rn, Gt;
      Gt = {};
      function ia(c) {
        if (zt.call(c, "ref")) {
          var y = Object.getOwnPropertyDescriptor(c, "ref").get;
          if (y && y.isReactWarning)
            return !1;
        }
        return c.ref !== void 0;
      }
      function aa(c) {
        if (zt.call(c, "key")) {
          var y = Object.getOwnPropertyDescriptor(c, "key").get;
          if (y && y.isReactWarning)
            return !1;
        }
        return c.key !== void 0;
      }
      function sa(c, y) {
        if (typeof c.ref == "string" && Be.current && y && Be.current.stateNode !== y) {
          var E = Q(Be.current.type);
          Gt[E] || ($('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', Q(Be.current.type), c.ref), Gt[E] = !0);
        }
      }
      function ua(c, y) {
        {
          var E = function() {
            On || (On = !0, $("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
          };
          E.isReactWarning = !0, Object.defineProperty(c, "key", {
            get: E,
            configurable: !0
          });
        }
      }
      function ca(c, y) {
        {
          var E = function() {
            Rn || (Rn = !0, $("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
          };
          E.isReactWarning = !0, Object.defineProperty(c, "ref", {
            get: E,
            configurable: !0
          });
        }
      }
      var la = function(c, y, E, O, D, L, C) {
        var T = {
          $$typeof: n,
          type: c,
          key: y,
          ref: E,
          props: C,
          _owner: L
        };
        return T._store = {}, Object.defineProperty(T._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(T, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: O
        }), Object.defineProperty(T, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: D
        }), Object.freeze && (Object.freeze(T.props), Object.freeze(T)), T;
      };
      function fa(c, y, E, O, D) {
        {
          var L, C = {}, T = null, q = null;
          E !== void 0 && (T = "" + E), aa(y) && (T = "" + y.key), ia(y) && (q = y.ref, sa(y, D));
          for (L in y)
            zt.call(y, L) && !oa.hasOwnProperty(L) && (C[L] = y[L]);
          if (c && c.defaultProps) {
            var F = c.defaultProps;
            for (L in F)
              C[L] === void 0 && (C[L] = F[L]);
          }
          if (T || q) {
            var M = typeof c == "function" ? c.displayName || c.name || "Unknown" : c;
            T && ua(C, M), q && ca(C, M);
          }
          return la(c, T, q, D, O, Be.current, C);
        }
      }
      var Jt = U.ReactCurrentOwner, xn = U.ReactDebugCurrentFrame;
      function Pe(c) {
        if (c) {
          var y = c._owner, E = it(c.type, c._source, y ? y.type : null);
          xn.setExtraStackFrame(E);
        } else
          xn.setExtraStackFrame(null);
      }
      var Kt;
      Kt = !1;
      function Yt(c) {
        return typeof c == "object" && c !== null && c.$$typeof === n;
      }
      function Pn() {
        {
          if (Jt.current) {
            var c = Q(Jt.current.type);
            if (c)
              return `

Check the render method of \`` + c + "`.";
          }
          return "";
        }
      }
      function da(c) {
        {
          if (c !== void 0) {
            var y = c.fileName.replace(/^.*[\\\/]/, ""), E = c.lineNumber;
            return `

Check your code at ` + y + ":" + E + ".";
          }
          return "";
        }
      }
      var Tn = {};
      function pa(c) {
        {
          var y = Pn();
          if (!y) {
            var E = typeof c == "string" ? c : c.displayName || c.name;
            E && (y = `

Check the top-level render call using <` + E + ">.");
          }
          return y;
        }
      }
      function Cn(c, y) {
        {
          if (!c._store || c._store.validated || c.key != null)
            return;
          c._store.validated = !0;
          var E = pa(y);
          if (Tn[E])
            return;
          Tn[E] = !0;
          var O = "";
          c && c._owner && c._owner !== Jt.current && (O = " It was passed a child from " + Q(c._owner.type) + "."), Pe(c), $('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', E, O), Pe(null);
        }
      }
      function An(c, y) {
        {
          if (typeof c != "object")
            return;
          if (Array.isArray(c))
            for (var E = 0; E < c.length; E++) {
              var O = c[E];
              Yt(O) && Cn(O, y);
            }
          else if (Yt(c))
            c._store && (c._store.validated = !0);
          else if (c) {
            var D = x(c);
            if (typeof D == "function" && D !== c.entries)
              for (var L = D.call(c), C; !(C = L.next()).done; )
                Yt(C.value) && Cn(C.value, y);
          }
        }
      }
      function ha(c) {
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
            var O = Q(y);
            na(E, c.props, "prop", O, c);
          } else if (y.PropTypes !== void 0 && !Kt) {
            Kt = !0;
            var D = Q(y);
            $("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", D || "Unknown");
          }
          typeof y.getDefaultProps == "function" && !y.getDefaultProps.isReactClassApproved && $("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function ma(c) {
        {
          for (var y = Object.keys(c.props), E = 0; E < y.length; E++) {
            var O = y[E];
            if (O !== "children" && O !== "key") {
              Pe(c), $("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", O), Pe(null);
              break;
            }
          }
          c.ref !== null && (Pe(c), $("Invalid attribute `ref` supplied to `React.Fragment`."), Pe(null));
        }
      }
      function Nn(c, y, E, O, D, L) {
        {
          var C = Wt(c);
          if (!C) {
            var T = "";
            (c === void 0 || typeof c == "object" && c !== null && Object.keys(c).length === 0) && (T += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var q = da(D);
            q ? T += q : T += Pn();
            var F;
            c === null ? F = "null" : Array.isArray(c) ? F = "array" : c !== void 0 && c.$$typeof === n ? (F = "<" + (Q(c.type) || "Unknown") + " />", T = " Did you accidentally export a JSX literal instead of a component?") : F = typeof c, $("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", F, T);
          }
          var M = fa(c, y, E, D, L);
          if (M == null)
            return M;
          if (C) {
            var ne = y.children;
            if (ne !== void 0)
              if (O)
                if (Array.isArray(ne)) {
                  for (var Te = 0; Te < ne.length; Te++)
                    An(ne[Te], c);
                  Object.freeze && Object.freeze(ne);
                } else
                  $("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
              else
                An(ne, c);
          }
          return c === e.Fragment ? ma(M) : ha(M), M;
        }
      }
      function va(c, y, E) {
        return Nn(c, y, E, !0);
      }
      function ga(c, y, E) {
        return Nn(c, y, E, !1);
      }
      var ya = ga, ba = va;
      e.jsx = ya, e.jsxs = ba;
    }();
  }(cr)), cr;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = rh() : e.exports = nh();
})(th);
const Ue = Ke.Fragment, W = Ke.jsx, $r = Ke.jsxs, Uh = (e = () => {
}) => {
  const [t, r] = z(!1);
  t || (e(), r(!0));
};
function oh(e, t) {
  function r(n) {
    let o = [];
    return Array.isArray(n) ? o = n : o = n.split(","), o.length ? t.filter((a) => o.includes(a)).length > 0 : !0;
  }
  for (const n of e)
    if (r(n.permissions || [])) {
      if (n.routes) {
        const o = oh(n.routes, t);
        if (o)
          return o;
        continue;
      }
      return n;
    }
}
const Fo = (e, t, r = !1) => {
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
var Ir = {}, ih = {
  get exports() {
    return Ir;
  },
  set exports(e) {
    Ir = e;
  }
}, lr = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Mo;
function ah() {
  if (Mo)
    return lr;
  Mo = 1;
  var e = Ye;
  function t(d, p) {
    return d === p && (d !== 0 || 1 / d === 1 / p) || d !== d && p !== p;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useState, o = e.useEffect, i = e.useLayoutEffect, a = e.useDebugValue;
  function s(d, p) {
    var m = p(), g = n({ inst: { value: m, getSnapshot: p } }), v = g[0].inst, S = g[1];
    return i(function() {
      v.value = m, v.getSnapshot = p, u(v) && S({ inst: v });
    }, [d, m, p]), o(function() {
      return u(v) && S({ inst: v }), d(function() {
        u(v) && S({ inst: v });
      });
    }, [d]), a(m), m;
  }
  function u(d) {
    var p = d.getSnapshot;
    d = d.value;
    try {
      var m = p();
      return !r(d, m);
    } catch {
      return !0;
    }
  }
  function l(d, p) {
    return p();
  }
  var f = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? l : s;
  return lr.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : f, lr;
}
var fr = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Bo;
function sh() {
  return Bo || (Bo = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var e = Ye, t = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function r(_) {
      {
        for (var P = arguments.length, I = new Array(P > 1 ? P - 1 : 0), x = 1; x < P; x++)
          I[x - 1] = arguments[x];
        n("error", _, I);
      }
    }
    function n(_, P, I) {
      {
        var x = t.ReactDebugCurrentFrame, U = x.getStackAddendum();
        U !== "" && (P += "%s", I = I.concat([U]));
        var $ = I.map(function(k) {
          return String(k);
        });
        $.unshift("Warning: " + P), Function.prototype.apply.call(console[_], console, $);
      }
    }
    function o(_, P) {
      return _ === P && (_ !== 0 || 1 / _ === 1 / P) || _ !== _ && P !== P;
    }
    var i = typeof Object.is == "function" ? Object.is : o, a = e.useState, s = e.useEffect, u = e.useLayoutEffect, l = e.useDebugValue, f = !1, d = !1;
    function p(_, P, I) {
      f || e.startTransition !== void 0 && (f = !0, r("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
      var x = P();
      if (!d) {
        var U = P();
        i(x, U) || (r("The result of getSnapshot should be cached to avoid an infinite loop"), d = !0);
      }
      var $ = a({
        inst: {
          value: x,
          getSnapshot: P
        }
      }), k = $[0].inst, Fe = $[1];
      return u(function() {
        k.value = x, k.getSnapshot = P, m(k) && Fe({
          inst: k
        });
      }, [_, x, P]), s(function() {
        m(k) && Fe({
          inst: k
        });
        var Wt = function() {
          m(k) && Fe({
            inst: k
          });
        };
        return _(Wt);
      }, [_]), l(x), x;
    }
    function m(_) {
      var P = _.getSnapshot, I = _.value;
      try {
        var x = P();
        return !i(I, x);
      } catch {
        return !0;
      }
    }
    function g(_, P, I) {
      return P();
    }
    var v = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", S = !v, w = S ? g : p, N = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : w;
    fr.useSyncExternalStore = N, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), fr;
}
(function(e) {
  process.env.NODE_ENV === "production" ? e.exports = ah() : e.exports = sh();
})(ih);
const uh = () => !0;
class ch extends Td {
  constructor() {
    super(...arguments);
    G(this, "middlewareHandler", uh);
    G(this, "_routes", []);
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
    const n = Pd([...r, ...this._routes], "path");
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
const He = new ch();
function Gi() {
  const e = V((...o) => {
    He.addRoute(...o);
  }, []), t = V((o) => {
    He.removeRoute(o);
  }, []), r = V((o) => He.on("routeChange", o), []);
  return { routes: Ir.useSyncExternalStore(
    r,
    () => He.routes
  ), addRoutes: e, removeRoute: t };
}
const Fh = () => {
  const { routes: e } = Gi(), [t, r] = z(), n = ce(), o = V(
    (i) => {
      const a = i.filter(
        (s) => Fo(n.pathname, s.path)
      );
      for (const s of a)
        if (s) {
          if (s.routes)
            o(s.routes);
          else if (Fo(n.pathname, s.path, !0)) {
            r(s);
            break;
          }
        }
    },
    [n]
  );
  return J(() => {
    o(e);
  }, [o, e]), t;
}, lh = (e) => {
  J(
    () => () => {
      e();
    },
    []
  );
};
function fh(e, t) {
  const r = Ee(e);
  r.current = e;
  const n = (t == null ? void 0 : t.wait) ?? 1e3, o = Ee(
    hd(
      (...i) => r.current(...i),
      n,
      t
    )
  ).current;
  return lh(() => {
    o.cancel();
  }), {
    run: o,
    cancel: o.cancel,
    flush: o.flush
  };
}
function Mh(e, t) {
  const [r, n] = z(e), { run: o } = fh((i) => {
    n(i);
  }, t);
  return [r, o];
}
function Bh(e, t) {
  const r = Ee(!1);
  J(() => {
    if (r.current)
      return e && e();
    r.current = !0;
  }, t);
}
const Vh = (e, t) => {
  const r = Ee(e);
  r.current = e;
  const n = z()[1], o = V(() => {
    i(), n(
      setInterval(() => r.current(), t)
    );
  }, [r.current, t]), i = V(() => {
    n((a) => {
      a && clearInterval(a);
    });
  }, []);
  return {
    run: o,
    cancel: i
  };
}, dh = (e = !1) => {
  const [t, r] = z(e), n = V(() => {
    r((a) => !a);
  }, []), o = V(() => {
    r(!0);
  }, []), i = V(() => {
    r(!1);
  }, []);
  return { state: t, toggle: n, on: o, off: i };
}, Ji = Wo(
  void 0
);
function Wh({
  children: e,
  color: t,
  component: r
}) {
  const { state: n, on: o, off: i } = dh(), a = z(0)[1], s = V(() => {
    o(), a((l) => l + 1), a(1);
  }, []), u = V(() => {
    a((l) => l === 1 ? (i(), 0) : l - 1);
  }, []);
  return /* @__PURE__ */ $r(Ji.Provider, { value: { startLoading: s, stopLoading: u, state: n }, children: [
    e,
    /* @__PURE__ */ W(r, { state: n, color: t })
  ] });
}
const Ki = (e) => {
  const t = jr(Ji);
  if (t === void 0)
    throw new Error("useLoading must be used in LoadingProvider");
  return J(() => {
    typeof e > "u" || (e ? t.startLoading() : t.stopLoading());
  }, [e, t]), t;
};
var be = /* @__PURE__ */ ((e) => (e.Standing = "standing", e.Processing = "processing", e.Success = "success", e.Failed = "Failed", e))(be || {});
function cn(e) {
  J(() => e(), []);
}
function ph(e, t) {
  const r = Ee(new Lr()), [n, o] = z(), { startLoading: i, stopLoading: a } = Ki(), [s, u] = z(be.Standing), [l, f] = z(), [d, p] = z(), m = Xe(() => s === be.Processing, [s]), g = V(
    (...S) => {
      u(be.Processing), t != null && t.showLoading && i(), r.current.next(e(...S));
    },
    [e]
  ), v = V(() => {
    n == null || n.unsubscribe(), u(be.Standing), t != null && t.showLoading && a();
  }, [n]);
  return cn(() => (r.current.closed && (r.current = new Lr()), r.current.subscribe({
    next: (S) => {
      o(
        S.subscribe({
          next: f,
          complete: () => {
            u(be.Success), t != null && t.showLoading && a();
          },
          error: (w) => {
            u(be.Failed), p(w), t != null && t.showLoading && a();
          }
        })
      );
    }
  }), () => {
    t != null && t.showLoading && a(), r.current.unsubscribe();
  })), {
    run: g,
    cancel: v,
    state: s,
    processing: m,
    result: l,
    error: d
  };
}
const hh = { attributes: !0, childList: !0, subtree: !0 }, Hh = (e, t) => {
  const r = Xe(() => new MutationObserver(t), [t]);
  J(() => {
    const n = e instanceof HTMLElement ? e : e.current;
    return n && r.observe(n, hh), () => {
      r.disconnect();
    };
  }, [r, e]);
};
function kh(e) {
  const t = Ee();
  return J(() => {
    t.current = e;
  }), t.current;
}
const qh = (e, t) => {
  const r = Ee(e);
  r.current = e;
  const n = z()[1], o = V(() => {
    i(), n(
      setTimeout(() => r.current(), t)
    );
  }, [r.current, t]), i = V(() => {
    n((a) => {
      a && clearTimeout(a);
    });
  }, []);
  return {
    run: o,
    cancel: i
  };
};
function zh({ get: e, set: t }, r) {
  const n = Xe(e, r), o = V(t, r);
  return [n, o];
}
const Yi = Wo(void 0), Gh = ({
  children: e,
  defaultTokens: t = {},
  fetchUserOnLogin: r = () => new xt((n) => n.next(void 0))
}) => {
  const [n, o] = z(), [i, a] = z(t), [s, u] = z(!1), { run: l, result: f } = ph(r), d = V(
    (m, g) => {
      u(!0), a(m), g ? o(g) : l(m);
    },
    [l]
  ), p = V(() => {
    o(void 0), a({}), u(!1);
  }, []);
  return cn(() => {
    var m;
    (m = Object.values(t)[0]) != null && m.length && (l(t), u(!0));
  }), J(() => {
    f && o(f);
  }, [f]), J(() => {
    for (const m in i)
      if (Object.prototype.hasOwnProperty.call(i, m)) {
        const g = i[m];
        Or.setToken(m, g || "");
      }
    return () => {
      for (const m in i)
        Object.prototype.hasOwnProperty.call(i, m) && Or.setToken(m, "");
    };
  }, [i]), /* @__PURE__ */ W(Yi.Provider, { value: { user: n, tokens: i, isLoggedIn: s, login: d, logout: p }, children: e });
};
function Jh() {
  const e = jr(Yi);
  if (!e)
    throw new Error("useAuthContext must be used in AuthProvider");
  return e;
}
const ln = Ye.createContext(void 0), Kh = ({
  userPermissions: e,
  isUser: t,
  children: r
}) => {
  const n = V(
    (o) => {
      let i = [];
      return Array.isArray(o) ? i = o : i = o.split(","), i.length ? t ? e.filter((s) => i.includes(s)).length > 0 : !1 : !0;
    },
    [t, e]
  );
  return /* @__PURE__ */ W(ln.Provider, { value: { userPermissions: e, can: n }, children: r });
}, mh = (e) => {
  const t = jr(ln);
  if (!t)
    throw new Error("useAuthorization must be used in AuthorizationProvider");
  return {
    granted: Xe(() => e ? t.can(e) : !0, [e, t.can]),
    ...t
  };
}, Yh = Ho(
  ({ permissions: e, children: t, guestView: r }) => {
    const { granted: n } = mh(e);
    return typeof t == "function" ? t(n) : /* @__PURE__ */ W(Ue, { children: n ? t : r });
  }
);
function Xh(e) {
  return (t) => (r) => /* @__PURE__ */ W(ln.Consumer, { children: (n) => /* @__PURE__ */ W(Ue, { children: (n == null ? void 0 : n.can(e || [])) && /* @__PURE__ */ W(t, { ...r }) }) });
}
function Zh({
  component: e,
  props: t
}) {
  return /* @__PURE__ */ W(e, { ...t });
}
function Qh({
  children: e
}) {
  const { startLoading: t, stopLoading: r } = Ki();
  return cn(() => ie.addInterceptor({
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
  })), /* @__PURE__ */ W(Ue, { children: e });
}
function em(e, t) {
  const r = new ie(e.baseURL, e);
  return bd(t, (n) => (...o) => n(r, ...o));
}
function vh(e, t = "/") {
  const r = {}, n = e.Index.length > 0 ? `${t}${e.Index}` : "";
  for (const o in e)
    if (Object.prototype.hasOwnProperty.call(e, o)) {
      const i = e[o];
      typeof i == "object" ? r[o] = vh(i, n !== "/" ? n + "/" : "/") : o === "Index" ? r[o] = n.length ? n : t : r[o] = n + "/" + i;
    }
  return r;
}
const gh = ({
  route: { component: e, ...t }
}) => {
  var r;
  return /* @__PURE__ */ W(Ue, { children: (r = t.routes) != null && r.length && !t.element && !e ? /* @__PURE__ */ W(gs, {}) : t.element || (e ? /* @__PURE__ */ W(e, {}) : null) });
}, yh = Ho(gh), Vo = ({ route: e }) => {
  const t = Pt(), [r, n] = z();
  return J(() => {
    (async () => n(
      await He.canPassMiddleware(e, t)
    ))();
  }, [t, e]), r !== void 0 ? _a(r) ? r : r ? /* @__PURE__ */ W(yh, { route: e }) : null : null;
}, Xi = (e) => {
  if (e.routes) {
    const { routes: t, element: r, index: n, ...o } = e, i = t.map((a) => Xi(a));
    return /* @__PURE__ */ Ln(
      gt,
      {
        element: /* @__PURE__ */ W(Vo, { route: { ...o, element: r, routes: t } }),
        ...o,
        index: n,
        key: Eo(12)
      },
      i
    );
  }
  return /* @__PURE__ */ Ln(
    gt,
    {
      element: /* @__PURE__ */ W(Vo, { route: e }),
      ...e,
      key: Eo(12)
    }
  );
}, bh = ({ onChange: e }) => {
  const t = ce();
  return J(() => {
    e && e(t);
  }, [t.pathname]), /* @__PURE__ */ W(Ue, {});
}, tm = ({
  routes: e,
  notFoundElement: t,
  onRouteChange: r
}) => {
  const n = Xe(
    () => e.map((o) => Xi(o)),
    [e]
  );
  return /* @__PURE__ */ $r(Ue, { children: [
    /* @__PURE__ */ W(bh, { onChange: r }),
    /* @__PURE__ */ $r(bs, { children: [
      n,
      /* @__PURE__ */ W(gt, { path: "*", element: t })
    ] })
  ] });
};
function rm(e) {
  const t = e;
  return (r) => {
    const n = Gi();
    return /* @__PURE__ */ W(t, { ...r, routes: n });
  };
}
export {
  ie as Api,
  Qh as ApiLoadingHandlerProvider,
  Gh as AuthProvider,
  Kh as AuthorizationProvider,
  un as AxiosObservable,
  Ah as BrowserRouter,
  Td as EventListenersManager,
  Ji as LoadingContext,
  Wh as LoadingProvider,
  bh as LocationEffect,
  Ch as Navigate,
  gs as Outlet,
  Yh as PrivateView,
  _r as RequestHeaderContentType,
  Vo as RouteMiddleware,
  yh as RouteRenderer,
  tm as RouterGenerator,
  He as RouterHandler,
  Or as TokenManager,
  $h as clearObject,
  bo as clearUndefinedProperties,
  em as createRepository,
  vh as createRoutePath,
  Ih as createVariableWithWatcher,
  Lh as emptyObject,
  oh as findRouteHasPermission,
  Sr as formData,
  _h as generatePath,
  Xi as generateRoutes,
  Zh as lazyComponent,
  Eo as makeId,
  Fo as pathMatched,
  _t as urlEncoded,
  xh as useActionData,
  Th as useAsyncError,
  Ph as useAsyncValue,
  Jh as useAuthContext,
  mh as useAuthorization,
  Dh as useBeforeUnload,
  Uh as useConstructor,
  Fh as useCurrentRoute,
  fh as useDebounceFn,
  Mh as useDebounceState,
  Bh as useDidUpdate,
  Vh as useInterval,
  ph as useJob,
  Ki as useLoading,
  ce as useLocation,
  cn as useMount,
  Pt as useNavigate,
  Rh as useNavigation,
  Hh as useOnElementChange,
  ss as useOutlet,
  Sh as useOutletContext,
  Oh as useParams,
  kh as usePrevious,
  Gi as useRoutes,
  Nh as useSearchParams,
  qh as useTimeout,
  dh as useToggle,
  lh as useUnMount,
  zh as useWritableMemo,
  Xh as withAuthorization,
  rm as withRoutes
};

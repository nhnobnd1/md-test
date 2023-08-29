import * as U from "react";
import Qt, { createContext as co, memo as lo, useContext as Ui, useMemo as Ii } from "react";
var Mi = Object.defineProperty, Fi = (t, e, r) => e in t ? Mi(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, et = (t, e, r) => (Fi(t, typeof e != "symbol" ? e + "" : e, r), r);
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
function er() {
  return er = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
    }
    return t;
  }, er.apply(this, arguments);
}
var un;
(function(t) {
  t.Pop = "POP", t.Push = "PUSH", t.Replace = "REPLACE";
})(un || (un = {}));
function nt(t, e) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(e);
}
function rr(t) {
  let {
    pathname: e = "/",
    search: r = "",
    hash: n = ""
  } = t;
  return r && r !== "?" && (e += r.charAt(0) === "?" ? r : "?" + r), n && n !== "#" && (e += n.charAt(0) === "#" ? n : "#" + n), e;
}
function fo(t) {
  let e = {};
  if (t) {
    let r = t.indexOf("#");
    r >= 0 && (e.hash = t.substr(r), t = t.substr(0, r));
    let n = t.indexOf("?");
    n >= 0 && (e.search = t.substr(n), t = t.substr(0, n)), t && (e.pathname = t);
  }
  return e;
}
var cn;
(function(t) {
  t.data = "data", t.deferred = "deferred", t.redirect = "redirect", t.error = "error";
})(cn || (cn = {}));
function zi(t, e) {
  if (!t) {
    typeof console < "u" && console.warn(e);
    try {
      throw new Error(e);
    } catch {
    }
  }
}
function Vi(t, e) {
  e === void 0 && (e = "/");
  let {
    pathname: r,
    search: n = "",
    hash: o = ""
  } = typeof t == "string" ? fo(t) : t;
  return {
    pathname: r ? r.startsWith("/") ? r : Hi(r, e) : e,
    search: Bi(n),
    hash: Wi(o)
  };
}
function Hi(t, e) {
  let r = e.replace(/\/+$/, "").split("/");
  return t.split("/").forEach((n) => {
    n === ".." ? r.length > 1 && r.pop() : n !== "." && r.push(n);
  }), r.length > 1 ? r.join("/") : "/";
}
function Be(t, e, r, n) {
  return "Cannot include a '" + t + "' character in a manually specified " + ("`to." + e + "` field [" + JSON.stringify(n) + "].  Please separate it out to the ") + ("`to." + r + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function po(t) {
  return t.filter((e, r) => r === 0 || e.route.path && e.route.path.length > 0);
}
function ho(t, e, r, n) {
  n === void 0 && (n = !1);
  let o;
  typeof t == "string" ? o = fo(t) : (o = er({}, t), nt(!o.pathname || !o.pathname.includes("?"), Be("?", "pathname", "search", o)), nt(!o.pathname || !o.pathname.includes("#"), Be("#", "pathname", "hash", o)), nt(!o.search || !o.search.includes("#"), Be("#", "search", "hash", o)));
  let i = t === "" || o.pathname === "", a = i ? "/" : o.pathname, u;
  if (n || a == null)
    u = r;
  else {
    let h = e.length - 1;
    if (a.startsWith("..")) {
      let d = a.split("/");
      for (; d[0] === ".."; )
        d.shift(), h -= 1;
      o.pathname = d.join("/");
    }
    u = h >= 0 ? e[h] : "/";
  }
  let s = Vi(o, u), l = a && a !== "/" && a.endsWith("/"), f = (i || a === ".") && r.endsWith("/");
  return !s.pathname.endsWith("/") && (l || f) && (s.pathname += "/"), s;
}
const _r = (t) => t.join("/").replace(/\/\/+/g, "/"), Bi = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, Wi = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t, vo = ["post", "put", "patch", "delete"];
new Set(vo);
const Yi = ["get", ...vo];
new Set(Yi);
"useSyncExternalStore" in U && ((t) => t.useSyncExternalStore)(U);
const qi = /* @__PURE__ */ U.createContext(null);
process.env.NODE_ENV !== "production" && (qi.displayName = "DataStaticRouterContext");
const yo = /* @__PURE__ */ U.createContext(null);
process.env.NODE_ENV !== "production" && (yo.displayName = "DataRouter");
const mo = /* @__PURE__ */ U.createContext(null);
process.env.NODE_ENV !== "production" && (mo.displayName = "DataRouterState");
const Gi = /* @__PURE__ */ U.createContext(null);
process.env.NODE_ENV !== "production" && (Gi.displayName = "Await");
const Xt = /* @__PURE__ */ U.createContext(null);
process.env.NODE_ENV !== "production" && (Xt.displayName = "Navigation");
const Sr = /* @__PURE__ */ U.createContext(null);
process.env.NODE_ENV !== "production" && (Sr.displayName = "Location");
const te = /* @__PURE__ */ U.createContext({
  outlet: null,
  matches: []
});
process.env.NODE_ENV !== "production" && (te.displayName = "Route");
const Ki = /* @__PURE__ */ U.createContext(null);
process.env.NODE_ENV !== "production" && (Ki.displayName = "RouteError");
function Ji(t, e) {
  let {
    relative: r
  } = e === void 0 ? {} : e;
  jr() || (process.env.NODE_ENV !== "production" ? nt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  ) : nt(!1));
  let {
    basename: n,
    navigator: o
  } = U.useContext(Xt), {
    hash: i,
    pathname: a,
    search: u
  } = je(t, {
    relative: r
  }), s = a;
  return n !== "/" && (s = a === "/" ? n : _r([n, a])), o.createHref({
    pathname: s,
    search: u,
    hash: i
  });
}
function jr() {
  return U.useContext(Sr) != null;
}
function ee() {
  return jr() || (process.env.NODE_ENV !== "production" ? nt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ) : nt(!1)), U.useContext(Sr).location;
}
function Zi() {
  jr() || (process.env.NODE_ENV !== "production" ? nt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  ) : nt(!1));
  let {
    basename: t,
    navigator: e
  } = U.useContext(Xt), {
    matches: r
  } = U.useContext(te), {
    pathname: n
  } = ee(), o = JSON.stringify(po(r).map((a) => a.pathnameBase)), i = U.useRef(!1);
  return U.useEffect(() => {
    i.current = !0;
  }), U.useCallback(function(a, u) {
    if (u === void 0 && (u = {}), process.env.NODE_ENV !== "production" && zi(i.current, "You should call navigate() in a React.useEffect(), not when your component is first rendered."), !i.current)
      return;
    if (typeof a == "number") {
      e.go(a);
      return;
    }
    let s = ho(a, JSON.parse(o), n, u.relative === "path");
    t !== "/" && (s.pathname = s.pathname === "/" ? t : _r([t, s.pathname])), (u.replace ? e.replace : e.push)(s, u.state, u);
  }, [t, e, o, n]);
}
const Qi = /* @__PURE__ */ U.createContext(null);
function Xi(t) {
  let e = U.useContext(te).outlet;
  return e && /* @__PURE__ */ U.createElement(Qi.Provider, {
    value: t
  }, e);
}
function je(t, e) {
  let {
    relative: r
  } = e === void 0 ? {} : e, {
    matches: n
  } = U.useContext(te), {
    pathname: o
  } = ee(), i = JSON.stringify(po(n).map((a) => a.pathnameBase));
  return U.useMemo(() => ho(t, JSON.parse(i), o, r === "path"), [t, i, o, r]);
}
var ln;
(function(t) {
  t.UseRevalidator = "useRevalidator";
})(ln || (ln = {}));
var fn;
(function(t) {
  t.UseLoaderData = "useLoaderData", t.UseActionData = "useActionData", t.UseRouteError = "useRouteError", t.UseNavigation = "useNavigation", t.UseRouteLoaderData = "useRouteLoaderData", t.UseMatches = "useMatches", t.UseRevalidator = "useRevalidator";
})(fn || (fn = {}));
function ta(t) {
  return Xi(t.context);
}
var pn;
(function(t) {
  t[t.pending = 0] = "pending", t[t.success = 1] = "success", t[t.error = 2] = "error";
})(pn || (pn = {}));
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
function $t() {
  return $t = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
    }
    return t;
  }, $t.apply(this, arguments);
}
function xr(t, e) {
  if (t == null)
    return {};
  var r = {}, n = Object.keys(t), o, i;
  for (i = 0; i < n.length; i++)
    o = n[i], !(e.indexOf(o) >= 0) && (r[o] = t[o]);
  return r;
}
const pe = "get", We = "application/x-www-form-urlencoded";
function xe(t) {
  return t != null && typeof t.tagName == "string";
}
function ea(t) {
  return xe(t) && t.tagName.toLowerCase() === "button";
}
function ra(t) {
  return xe(t) && t.tagName.toLowerCase() === "form";
}
function na(t) {
  return xe(t) && t.tagName.toLowerCase() === "input";
}
function oa(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function ia(t, e) {
  return t.button === 0 && // Ignore everything but left clicks
  (!e || e === "_self") && // Let browser handle "target=_blank" etc.
  !oa(t);
}
function aa(t, e, r) {
  let n, o, i, a;
  if (ra(t)) {
    let l = r.submissionTrigger;
    n = r.method || t.getAttribute("method") || pe, o = r.action || t.getAttribute("action") || e, i = r.encType || t.getAttribute("enctype") || We, a = new FormData(t), l && l.name && a.append(l.name, l.value);
  } else if (ea(t) || na(t) && (t.type === "submit" || t.type === "image")) {
    let l = t.form;
    if (l == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    n = r.method || t.getAttribute("formmethod") || l.getAttribute("method") || pe, o = r.action || t.getAttribute("formaction") || l.getAttribute("action") || e, i = r.encType || t.getAttribute("formenctype") || l.getAttribute("enctype") || We, a = new FormData(l), t.name && a.append(t.name, t.value);
  } else {
    if (xe(t))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    if (n = r.method || pe, o = r.action || e, i = r.encType || We, t instanceof FormData)
      a = t;
    else if (a = new FormData(), t instanceof URLSearchParams)
      for (let [l, f] of t)
        a.append(l, f);
    else if (t != null)
      for (let l of Object.keys(t))
        a.append(l, t[l]);
  }
  let {
    protocol: u,
    host: s
  } = window.location;
  return {
    url: new URL(o, u + "//" + s),
    method: n.toLowerCase(),
    encType: i,
    formData: a
  };
}
const sa = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset"], ua = ["aria-current", "caseSensitive", "className", "end", "style", "to", "children"], ca = ["reloadDocument", "replace", "method", "action", "onSubmit", "fetcherKey", "routeId", "relative"];
process.env.NODE_ENV;
const go = /* @__PURE__ */ U.forwardRef(function(t, e) {
  let {
    onClick: r,
    relative: n,
    reloadDocument: o,
    replace: i,
    state: a,
    target: u,
    to: s,
    preventScrollReset: l
  } = t, f = xr(t, sa), h = Ji(s, {
    relative: n
  }), d = ha(s, {
    replace: i,
    state: a,
    target: u,
    preventScrollReset: l,
    relative: n
  });
  function p(m) {
    r && r(m), m.defaultPrevented || d(m);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ U.createElement("a", $t({}, f, {
      href: h,
      onClick: o ? r : p,
      ref: e,
      target: u
    }))
  );
});
process.env.NODE_ENV !== "production" && (go.displayName = "Link");
const la = /* @__PURE__ */ U.forwardRef(function(t, e) {
  let {
    "aria-current": r = "page",
    caseSensitive: n = !1,
    className: o = "",
    end: i = !1,
    style: a,
    to: u,
    children: s
  } = t, l = xr(t, ua), f = je(u, {
    relative: l.relative
  }), h = ee(), d = U.useContext(mo), {
    navigator: p
  } = U.useContext(Xt), m = p.encodeLocation ? p.encodeLocation(f).pathname : f.pathname, v = h.pathname, w = d && d.navigation && d.navigation.location ? d.navigation.location.pathname : null;
  n || (v = v.toLowerCase(), w = w ? w.toLowerCase() : null, m = m.toLowerCase());
  let A = v === m || !i && v.startsWith(m) && v.charAt(m.length) === "/", R = w != null && (w === m || !i && w.startsWith(m) && w.charAt(m.length) === "/"), S = A ? r : void 0, j;
  typeof o == "function" ? j = o({
    isActive: A,
    isPending: R
  }) : j = [o, A ? "active" : null, R ? "pending" : null].filter(Boolean).join(" ");
  let x = typeof a == "function" ? a({
    isActive: A,
    isPending: R
  }) : a;
  return /* @__PURE__ */ U.createElement(go, $t({}, l, {
    "aria-current": S,
    className: j,
    ref: e,
    style: x,
    to: u
  }), typeof s == "function" ? s({
    isActive: A,
    isPending: R
  }) : s);
});
process.env.NODE_ENV !== "production" && (la.displayName = "NavLink");
const fa = /* @__PURE__ */ U.forwardRef((t, e) => /* @__PURE__ */ U.createElement(bo, $t({}, t, {
  ref: e
})));
process.env.NODE_ENV !== "production" && (fa.displayName = "Form");
const bo = /* @__PURE__ */ U.forwardRef((t, e) => {
  let {
    reloadDocument: r,
    replace: n,
    method: o = pe,
    action: i,
    onSubmit: a,
    fetcherKey: u,
    routeId: s,
    relative: l
  } = t, f = xr(t, ca), h = va(u, s), d = o.toLowerCase() === "get" ? "get" : "post", p = Oo(i, {
    relative: l
  }), m = (v) => {
    if (a && a(v), v.defaultPrevented)
      return;
    v.preventDefault();
    let w = v.nativeEvent.submitter, A = (w == null ? void 0 : w.getAttribute("formmethod")) || o;
    h(w || v.currentTarget, {
      method: A,
      replace: n,
      relative: l
    });
  };
  return /* @__PURE__ */ U.createElement("form", $t({
    ref: e,
    method: d,
    action: p,
    onSubmit: r ? a : m
  }, f));
});
process.env.NODE_ENV !== "production" && (bo.displayName = "FormImpl");
process.env.NODE_ENV;
var nr;
(function(t) {
  t.UseScrollRestoration = "useScrollRestoration", t.UseSubmitImpl = "useSubmitImpl", t.UseFetcher = "useFetcher";
})(nr || (nr = {}));
var dn;
(function(t) {
  t.UseFetchers = "useFetchers", t.UseScrollRestoration = "useScrollRestoration";
})(dn || (dn = {}));
function pa(t) {
  return t + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function da(t) {
  let e = U.useContext(yo);
  return e || (process.env.NODE_ENV !== "production" ? nt(!1, pa(t)) : nt(!1)), e;
}
function ha(t, e) {
  let {
    target: r,
    replace: n,
    state: o,
    preventScrollReset: i,
    relative: a
  } = e === void 0 ? {} : e, u = Zi(), s = ee(), l = je(t, {
    relative: a
  });
  return U.useCallback((f) => {
    if (ia(f, r)) {
      f.preventDefault();
      let h = n !== void 0 ? n : rr(s) === rr(l);
      u(t, {
        replace: h,
        state: o,
        preventScrollReset: i,
        relative: a
      });
    }
  }, [s, u, l, n, o, r, t, i, a]);
}
function va(t, e) {
  let {
    router: r
  } = da(nr.UseSubmitImpl), n = Oo();
  return U.useCallback(function(o, i) {
    if (i === void 0 && (i = {}), typeof document > "u")
      throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
    let {
      method: a,
      encType: u,
      formData: s,
      url: l
    } = aa(o, n, i), f = l.pathname + l.search, h = {
      replace: i.replace,
      formData: s,
      formMethod: a,
      formEncType: u
    };
    t ? (e == null && (process.env.NODE_ENV !== "production" ? nt(!1, "No routeId available for useFetcher()") : nt(!1)), r.fetch(t, e, f, h)) : r.navigate(f, h);
  }, [n, r, t, e]);
}
function Oo(t, e) {
  let {
    relative: r
  } = e === void 0 ? {} : e, {
    basename: n
  } = U.useContext(Xt), o = U.useContext(te);
  o || (process.env.NODE_ENV !== "production" ? nt(!1, "useFormAction must be used inside a RouteContext") : nt(!1));
  let [i] = o.matches.slice(-1), a = $t({}, je(t || ".", {
    relative: r
  })), u = ee();
  if (t == null && (a.search = u.search, a.hash = u.hash, i.route.index)) {
    let s = new URLSearchParams(a.search);
    s.delete("index"), a.search = s.toString() ? "?" + s.toString() : "";
  }
  return (!t || t === ".") && i.route.index && (a.search = a.search ? a.search.replace(/^\?/, "?index&") : "?index"), n !== "/" && (a.pathname = a.pathname === "/" ? n : _r([n, a.pathname])), rr(a);
}
var ya = typeof global == "object" && global && global.Object === Object && global;
const wo = ya;
var ma = typeof self == "object" && self && self.Object === Object && self, ga = wo || ma || Function("return this")();
const ht = ga;
var ba = ht.Symbol;
const jt = ba;
var Eo = Object.prototype, Oa = Eo.hasOwnProperty, wa = Eo.toString, Wt = jt ? jt.toStringTag : void 0;
function Ea(t) {
  var e = Oa.call(t, Wt), r = t[Wt];
  try {
    t[Wt] = void 0;
    var n = !0;
  } catch {
  }
  var o = wa.call(t);
  return n && (e ? t[Wt] = r : delete t[Wt]), o;
}
var _a = Object.prototype, Sa = _a.toString;
function ja(t) {
  return Sa.call(t);
}
var xa = "[object Null]", Aa = "[object Undefined]", hn = jt ? jt.toStringTag : void 0;
function Ct(t) {
  return t == null ? t === void 0 ? Aa : xa : hn && hn in Object(t) ? Ea(t) : ja(t);
}
function xt(t) {
  return t != null && typeof t == "object";
}
var Ra = "[object Symbol]";
function Ar(t) {
  return typeof t == "symbol" || xt(t) && Ct(t) == Ra;
}
function Da(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length, o = Array(n); ++r < n; )
    o[r] = e(t[r], r, t);
  return o;
}
var $a = Array.isArray;
const lt = $a;
var Na = 1 / 0, vn = jt ? jt.prototype : void 0, yn = vn ? vn.toString : void 0;
function _o(t) {
  if (typeof t == "string")
    return t;
  if (lt(t))
    return Da(t, _o) + "";
  if (Ar(t))
    return yn ? yn.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -Na ? "-0" : e;
}
function At(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
function Rr(t) {
  return t;
}
var Ta = "[object AsyncFunction]", Ca = "[object Function]", Pa = "[object GeneratorFunction]", ka = "[object Proxy]";
function Dr(t) {
  if (!At(t))
    return !1;
  var e = Ct(t);
  return e == Ca || e == Pa || e == Ta || e == ka;
}
var La = ht["__core-js_shared__"];
const Ye = La;
var mn = function() {
  var t = /[^.]+$/.exec(Ye && Ye.keys && Ye.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function Ua(t) {
  return !!mn && mn in t;
}
var Ia = Function.prototype, Ma = Ia.toString;
function Pt(t) {
  if (t != null) {
    try {
      return Ma.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var Fa = /[\\^$.*+?()[\]{}|]/g, za = /^\[object .+?Constructor\]$/, Va = Function.prototype, Ha = Object.prototype, Ba = Va.toString, Wa = Ha.hasOwnProperty, Ya = RegExp(
  "^" + Ba.call(Wa).replace(Fa, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function qa(t) {
  if (!At(t) || Ua(t))
    return !1;
  var e = Dr(t) ? Ya : za;
  return e.test(Pt(t));
}
function Ga(t, e) {
  return t == null ? void 0 : t[e];
}
function kt(t, e) {
  var r = Ga(t, e);
  return qa(r) ? r : void 0;
}
var Ka = kt(ht, "WeakMap");
const or = Ka;
var gn = Object.create, Ja = function() {
  function t() {
  }
  return function(e) {
    if (!At(e))
      return {};
    if (gn)
      return gn(e);
    t.prototype = e;
    var r = new t();
    return t.prototype = void 0, r;
  };
}();
const Za = Ja;
function Qa(t, e, r) {
  switch (r.length) {
    case 0:
      return t.call(e);
    case 1:
      return t.call(e, r[0]);
    case 2:
      return t.call(e, r[0], r[1]);
    case 3:
      return t.call(e, r[0], r[1], r[2]);
  }
  return t.apply(e, r);
}
function Xa() {
}
function ts(t, e) {
  var r = -1, n = t.length;
  for (e || (e = Array(n)); ++r < n; )
    e[r] = t[r];
  return e;
}
var es = 800, rs = 16, ns = Date.now;
function os(t) {
  var e = 0, r = 0;
  return function() {
    var n = ns(), o = rs - (n - r);
    if (r = n, o > 0) {
      if (++e >= es)
        return arguments[0];
    } else
      e = 0;
    return t.apply(void 0, arguments);
  };
}
function is(t) {
  return function() {
    return t;
  };
}
var as = function() {
  try {
    var t = kt(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
}();
const be = as;
var ss = be ? function(t, e) {
  return be(t, "toString", {
    configurable: !0,
    enumerable: !1,
    value: is(e),
    writable: !0
  });
} : Rr;
const us = ss;
var cs = os(us);
const ls = cs;
function fs(t, e, r, n) {
  for (var o = t.length, i = r + (n ? 1 : -1); n ? i-- : ++i < o; )
    if (e(t[i], i, t))
      return i;
  return -1;
}
function ps(t) {
  return t !== t;
}
function ds(t, e, r) {
  for (var n = r - 1, o = t.length; ++n < o; )
    if (t[n] === e)
      return n;
  return -1;
}
function hs(t, e, r) {
  return e === e ? ds(t, e, r) : fs(t, ps, r);
}
function vs(t, e) {
  var r = t == null ? 0 : t.length;
  return !!r && hs(t, e, 0) > -1;
}
var ys = 9007199254740991, ms = /^(?:0|[1-9]\d*)$/;
function $r(t, e) {
  var r = typeof t;
  return e = e ?? ys, !!e && (r == "number" || r != "symbol" && ms.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
function Ae(t, e, r) {
  e == "__proto__" && be ? be(t, e, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : t[e] = r;
}
function re(t, e) {
  return t === e || t !== t && e !== e;
}
var gs = Object.prototype, bs = gs.hasOwnProperty;
function Os(t, e, r) {
  var n = t[e];
  (!(bs.call(t, e) && re(n, r)) || r === void 0 && !(e in t)) && Ae(t, e, r);
}
function ws(t, e, r, n) {
  var o = !r;
  r || (r = {});
  for (var i = -1, a = e.length; ++i < a; ) {
    var u = e[i], s = n ? n(r[u], t[u], u, r, t) : void 0;
    s === void 0 && (s = t[u]), o ? Ae(r, u, s) : Os(r, u, s);
  }
  return r;
}
var bn = Math.max;
function Es(t, e, r) {
  return e = bn(e === void 0 ? t.length - 1 : e, 0), function() {
    for (var n = arguments, o = -1, i = bn(n.length - e, 0), a = Array(i); ++o < i; )
      a[o] = n[e + o];
    o = -1;
    for (var u = Array(e + 1); ++o < e; )
      u[o] = n[o];
    return u[e] = r(a), Qa(t, this, u);
  };
}
function _s(t, e) {
  return ls(Es(t, e, Rr), t + "");
}
var Ss = 9007199254740991;
function Nr(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= Ss;
}
function Re(t) {
  return t != null && Nr(t.length) && !Dr(t);
}
function js(t, e, r) {
  if (!At(r))
    return !1;
  var n = typeof e;
  return (n == "number" ? Re(r) && $r(e, r.length) : n == "string" && e in r) ? re(r[e], t) : !1;
}
function xs(t) {
  return _s(function(e, r) {
    var n = -1, o = r.length, i = o > 1 ? r[o - 1] : void 0, a = o > 2 ? r[2] : void 0;
    for (i = t.length > 3 && typeof i == "function" ? (o--, i) : void 0, a && js(r[0], r[1], a) && (i = o < 3 ? void 0 : i, o = 1), e = Object(e); ++n < o; ) {
      var u = r[n];
      u && t(e, u, n, i);
    }
    return e;
  });
}
var As = Object.prototype;
function Tr(t) {
  var e = t && t.constructor, r = typeof e == "function" && e.prototype || As;
  return t === r;
}
function Rs(t, e) {
  for (var r = -1, n = Array(t); ++r < t; )
    n[r] = e(r);
  return n;
}
var Ds = "[object Arguments]";
function On(t) {
  return xt(t) && Ct(t) == Ds;
}
var So = Object.prototype, $s = So.hasOwnProperty, Ns = So.propertyIsEnumerable, Ts = On(function() {
  return arguments;
}()) ? On : function(t) {
  return xt(t) && $s.call(t, "callee") && !Ns.call(t, "callee");
};
const Oe = Ts;
function Cs() {
  return !1;
}
var jo = typeof exports == "object" && exports && !exports.nodeType && exports, wn = jo && typeof module == "object" && module && !module.nodeType && module, Ps = wn && wn.exports === jo, En = Ps ? ht.Buffer : void 0, ks = En ? En.isBuffer : void 0, Ls = ks || Cs;
const we = Ls;
var Us = "[object Arguments]", Is = "[object Array]", Ms = "[object Boolean]", Fs = "[object Date]", zs = "[object Error]", Vs = "[object Function]", Hs = "[object Map]", Bs = "[object Number]", Ws = "[object Object]", Ys = "[object RegExp]", qs = "[object Set]", Gs = "[object String]", Ks = "[object WeakMap]", Js = "[object ArrayBuffer]", Zs = "[object DataView]", Qs = "[object Float32Array]", Xs = "[object Float64Array]", tu = "[object Int8Array]", eu = "[object Int16Array]", ru = "[object Int32Array]", nu = "[object Uint8Array]", ou = "[object Uint8ClampedArray]", iu = "[object Uint16Array]", au = "[object Uint32Array]", q = {};
q[Qs] = q[Xs] = q[tu] = q[eu] = q[ru] = q[nu] = q[ou] = q[iu] = q[au] = !0;
q[Us] = q[Is] = q[Js] = q[Ms] = q[Zs] = q[Fs] = q[zs] = q[Vs] = q[Hs] = q[Bs] = q[Ws] = q[Ys] = q[qs] = q[Gs] = q[Ks] = !1;
function su(t) {
  return xt(t) && Nr(t.length) && !!q[Ct(t)];
}
function uu(t) {
  return function(e) {
    return t(e);
  };
}
var xo = typeof exports == "object" && exports && !exports.nodeType && exports, qt = xo && typeof module == "object" && module && !module.nodeType && module, cu = qt && qt.exports === xo, qe = cu && wo.process, lu = function() {
  try {
    var t = qt && qt.require && qt.require("util").types;
    return t || qe && qe.binding && qe.binding("util");
  } catch {
  }
}();
const _n = lu;
var Sn = _n && _n.isTypedArray, fu = Sn ? uu(Sn) : su;
const Cr = fu;
var pu = Object.prototype, du = pu.hasOwnProperty;
function Ao(t, e) {
  var r = lt(t), n = !r && Oe(t), o = !r && !n && we(t), i = !r && !n && !o && Cr(t), a = r || n || o || i, u = a ? Rs(t.length, String) : [], s = u.length;
  for (var l in t)
    (e || du.call(t, l)) && !(a && // Safari 9 has enumerable `arguments.length` in strict mode.
    (l == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    o && (l == "offset" || l == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (l == "buffer" || l == "byteLength" || l == "byteOffset") || // Skip index properties.
    $r(l, s))) && u.push(l);
  return u;
}
function Ro(t, e) {
  return function(r) {
    return t(e(r));
  };
}
var hu = Ro(Object.keys, Object);
const vu = hu;
var yu = Object.prototype, mu = yu.hasOwnProperty;
function gu(t) {
  if (!Tr(t))
    return vu(t);
  var e = [];
  for (var r in Object(t))
    mu.call(t, r) && r != "constructor" && e.push(r);
  return e;
}
function Pr(t) {
  return Re(t) ? Ao(t) : gu(t);
}
function bu(t) {
  var e = [];
  if (t != null)
    for (var r in Object(t))
      e.push(r);
  return e;
}
var Ou = Object.prototype, wu = Ou.hasOwnProperty;
function Eu(t) {
  if (!At(t))
    return bu(t);
  var e = Tr(t), r = [];
  for (var n in t)
    n == "constructor" && (e || !wu.call(t, n)) || r.push(n);
  return r;
}
function Do(t) {
  return Re(t) ? Ao(t, !0) : Eu(t);
}
var _u = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Su = /^\w*$/;
function kr(t, e) {
  if (lt(t))
    return !1;
  var r = typeof t;
  return r == "number" || r == "symbol" || r == "boolean" || t == null || Ar(t) ? !0 : Su.test(t) || !_u.test(t) || e != null && t in Object(e);
}
var ju = kt(Object, "create");
const Gt = ju;
function xu() {
  this.__data__ = Gt ? Gt(null) : {}, this.size = 0;
}
function Au(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var Ru = "__lodash_hash_undefined__", Du = Object.prototype, $u = Du.hasOwnProperty;
function Nu(t) {
  var e = this.__data__;
  if (Gt) {
    var r = e[t];
    return r === Ru ? void 0 : r;
  }
  return $u.call(e, t) ? e[t] : void 0;
}
var Tu = Object.prototype, Cu = Tu.hasOwnProperty;
function Pu(t) {
  var e = this.__data__;
  return Gt ? e[t] !== void 0 : Cu.call(e, t);
}
var ku = "__lodash_hash_undefined__";
function Lu(t, e) {
  var r = this.__data__;
  return this.size += this.has(t) ? 0 : 1, r[t] = Gt && e === void 0 ? ku : e, this;
}
function Nt(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
Nt.prototype.clear = xu;
Nt.prototype.delete = Au;
Nt.prototype.get = Nu;
Nt.prototype.has = Pu;
Nt.prototype.set = Lu;
function Uu() {
  this.__data__ = [], this.size = 0;
}
function De(t, e) {
  for (var r = t.length; r--; )
    if (re(t[r][0], e))
      return r;
  return -1;
}
var Iu = Array.prototype, Mu = Iu.splice;
function Fu(t) {
  var e = this.__data__, r = De(e, t);
  if (r < 0)
    return !1;
  var n = e.length - 1;
  return r == n ? e.pop() : Mu.call(e, r, 1), --this.size, !0;
}
function zu(t) {
  var e = this.__data__, r = De(e, t);
  return r < 0 ? void 0 : e[r][1];
}
function Vu(t) {
  return De(this.__data__, t) > -1;
}
function Hu(t, e) {
  var r = this.__data__, n = De(r, t);
  return n < 0 ? (++this.size, r.push([t, e])) : r[n][1] = e, this;
}
function wt(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
wt.prototype.clear = Uu;
wt.prototype.delete = Fu;
wt.prototype.get = zu;
wt.prototype.has = Vu;
wt.prototype.set = Hu;
var Bu = kt(ht, "Map");
const Kt = Bu;
function Wu() {
  this.size = 0, this.__data__ = {
    hash: new Nt(),
    map: new (Kt || wt)(),
    string: new Nt()
  };
}
function Yu(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function $e(t, e) {
  var r = t.__data__;
  return Yu(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map;
}
function qu(t) {
  var e = $e(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function Gu(t) {
  return $e(this, t).get(t);
}
function Ku(t) {
  return $e(this, t).has(t);
}
function Ju(t, e) {
  var r = $e(this, t), n = r.size;
  return r.set(t, e), this.size += r.size == n ? 0 : 1, this;
}
function Et(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
Et.prototype.clear = Wu;
Et.prototype.delete = qu;
Et.prototype.get = Gu;
Et.prototype.has = Ku;
Et.prototype.set = Ju;
var Zu = "Expected a function";
function Lr(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(Zu);
  var r = function() {
    var n = arguments, o = e ? e.apply(this, n) : n[0], i = r.cache;
    if (i.has(o))
      return i.get(o);
    var a = t.apply(this, n);
    return r.cache = i.set(o, a) || i, a;
  };
  return r.cache = new (Lr.Cache || Et)(), r;
}
Lr.Cache = Et;
var Qu = 500;
function Xu(t) {
  var e = Lr(t, function(n) {
    return r.size === Qu && r.clear(), n;
  }), r = e.cache;
  return e;
}
var tc = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, ec = /\\(\\)?/g, rc = Xu(function(t) {
  var e = [];
  return t.charCodeAt(0) === 46 && e.push(""), t.replace(tc, function(r, n, o, i) {
    e.push(o ? i.replace(ec, "$1") : n || r);
  }), e;
});
const nc = rc;
function oc(t) {
  return t == null ? "" : _o(t);
}
function $o(t, e) {
  return lt(t) ? t : kr(t, e) ? [t] : nc(oc(t));
}
var ic = 1 / 0;
function Ne(t) {
  if (typeof t == "string" || Ar(t))
    return t;
  var e = t + "";
  return e == "0" && 1 / t == -ic ? "-0" : e;
}
function No(t, e) {
  e = $o(e, t);
  for (var r = 0, n = e.length; t != null && r < n; )
    t = t[Ne(e[r++])];
  return r && r == n ? t : void 0;
}
function ac(t, e, r) {
  var n = t == null ? void 0 : No(t, e);
  return n === void 0 ? r : n;
}
function sc(t, e) {
  for (var r = -1, n = e.length, o = t.length; ++r < n; )
    t[o + r] = e[r];
  return t;
}
var uc = Ro(Object.getPrototypeOf, Object);
const To = uc;
var cc = "[object Object]", lc = Function.prototype, fc = Object.prototype, Co = lc.toString, pc = fc.hasOwnProperty, dc = Co.call(Object);
function hc(t) {
  if (!xt(t) || Ct(t) != cc)
    return !1;
  var e = To(t);
  if (e === null)
    return !0;
  var r = pc.call(e, "constructor") && e.constructor;
  return typeof r == "function" && r instanceof r && Co.call(r) == dc;
}
function vc() {
  this.__data__ = new wt(), this.size = 0;
}
function yc(t) {
  var e = this.__data__, r = e.delete(t);
  return this.size = e.size, r;
}
function mc(t) {
  return this.__data__.get(t);
}
function gc(t) {
  return this.__data__.has(t);
}
var bc = 200;
function Oc(t, e) {
  var r = this.__data__;
  if (r instanceof wt) {
    var n = r.__data__;
    if (!Kt || n.length < bc - 1)
      return n.push([t, e]), this.size = ++r.size, this;
    r = this.__data__ = new Et(n);
  }
  return r.set(t, e), this.size = r.size, this;
}
function dt(t) {
  var e = this.__data__ = new wt(t);
  this.size = e.size;
}
dt.prototype.clear = vc;
dt.prototype.delete = yc;
dt.prototype.get = mc;
dt.prototype.has = gc;
dt.prototype.set = Oc;
var Po = typeof exports == "object" && exports && !exports.nodeType && exports, jn = Po && typeof module == "object" && module && !module.nodeType && module, wc = jn && jn.exports === Po, xn = wc ? ht.Buffer : void 0, An = xn ? xn.allocUnsafe : void 0;
function Ec(t, e) {
  if (e)
    return t.slice();
  var r = t.length, n = An ? An(r) : new t.constructor(r);
  return t.copy(n), n;
}
function _c(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length, o = 0, i = []; ++r < n; ) {
    var a = t[r];
    e(a, r, t) && (i[o++] = a);
  }
  return i;
}
function Sc() {
  return [];
}
var jc = Object.prototype, xc = jc.propertyIsEnumerable, Rn = Object.getOwnPropertySymbols, Ac = Rn ? function(t) {
  return t == null ? [] : (t = Object(t), _c(Rn(t), function(e) {
    return xc.call(t, e);
  }));
} : Sc;
const Rc = Ac;
function Dc(t, e, r) {
  var n = e(t);
  return lt(t) ? n : sc(n, r(t));
}
function Dn(t) {
  return Dc(t, Pr, Rc);
}
var $c = kt(ht, "DataView");
const ir = $c;
var Nc = kt(ht, "Promise");
const ar = Nc;
var Tc = kt(ht, "Set");
const Ft = Tc;
var $n = "[object Map]", Cc = "[object Object]", Nn = "[object Promise]", Tn = "[object Set]", Cn = "[object WeakMap]", Pn = "[object DataView]", Pc = Pt(ir), kc = Pt(Kt), Lc = Pt(ar), Uc = Pt(Ft), Ic = Pt(or), Dt = Ct;
(ir && Dt(new ir(new ArrayBuffer(1))) != Pn || Kt && Dt(new Kt()) != $n || ar && Dt(ar.resolve()) != Nn || Ft && Dt(new Ft()) != Tn || or && Dt(new or()) != Cn) && (Dt = function(t) {
  var e = Ct(t), r = e == Cc ? t.constructor : void 0, n = r ? Pt(r) : "";
  if (n)
    switch (n) {
      case Pc:
        return Pn;
      case kc:
        return $n;
      case Lc:
        return Nn;
      case Uc:
        return Tn;
      case Ic:
        return Cn;
    }
  return e;
});
const kn = Dt;
var Mc = ht.Uint8Array;
const Ee = Mc;
function Fc(t) {
  var e = new t.constructor(t.byteLength);
  return new Ee(e).set(new Ee(t)), e;
}
function zc(t, e) {
  var r = e ? Fc(t.buffer) : t.buffer;
  return new t.constructor(r, t.byteOffset, t.length);
}
function Vc(t) {
  return typeof t.constructor == "function" && !Tr(t) ? Za(To(t)) : {};
}
var Hc = "__lodash_hash_undefined__";
function Bc(t) {
  return this.__data__.set(t, Hc), this;
}
function Wc(t) {
  return this.__data__.has(t);
}
function Jt(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.__data__ = new Et(); ++e < r; )
    this.add(t[e]);
}
Jt.prototype.add = Jt.prototype.push = Bc;
Jt.prototype.has = Wc;
function Yc(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length; ++r < n; )
    if (e(t[r], r, t))
      return !0;
  return !1;
}
function ko(t, e) {
  return t.has(e);
}
var qc = 1, Gc = 2;
function Lo(t, e, r, n, o, i) {
  var a = r & qc, u = t.length, s = e.length;
  if (u != s && !(a && s > u))
    return !1;
  var l = i.get(t), f = i.get(e);
  if (l && f)
    return l == e && f == t;
  var h = -1, d = !0, p = r & Gc ? new Jt() : void 0;
  for (i.set(t, e), i.set(e, t); ++h < u; ) {
    var m = t[h], v = e[h];
    if (n)
      var w = a ? n(v, m, h, e, t, i) : n(m, v, h, t, e, i);
    if (w !== void 0) {
      if (w)
        continue;
      d = !1;
      break;
    }
    if (p) {
      if (!Yc(e, function(A, R) {
        if (!ko(p, R) && (m === A || o(m, A, r, n, i)))
          return p.push(R);
      })) {
        d = !1;
        break;
      }
    } else if (!(m === v || o(m, v, r, n, i))) {
      d = !1;
      break;
    }
  }
  return i.delete(t), i.delete(e), d;
}
function Kc(t) {
  var e = -1, r = Array(t.size);
  return t.forEach(function(n, o) {
    r[++e] = [o, n];
  }), r;
}
function Ur(t) {
  var e = -1, r = Array(t.size);
  return t.forEach(function(n) {
    r[++e] = n;
  }), r;
}
var Jc = 1, Zc = 2, Qc = "[object Boolean]", Xc = "[object Date]", tl = "[object Error]", el = "[object Map]", rl = "[object Number]", nl = "[object RegExp]", ol = "[object Set]", il = "[object String]", al = "[object Symbol]", sl = "[object ArrayBuffer]", ul = "[object DataView]", Ln = jt ? jt.prototype : void 0, Ge = Ln ? Ln.valueOf : void 0;
function cl(t, e, r, n, o, i, a) {
  switch (r) {
    case ul:
      if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset)
        return !1;
      t = t.buffer, e = e.buffer;
    case sl:
      return !(t.byteLength != e.byteLength || !i(new Ee(t), new Ee(e)));
    case Qc:
    case Xc:
    case rl:
      return re(+t, +e);
    case tl:
      return t.name == e.name && t.message == e.message;
    case nl:
    case il:
      return t == e + "";
    case el:
      var u = Kc;
    case ol:
      var s = n & Jc;
      if (u || (u = Ur), t.size != e.size && !s)
        return !1;
      var l = a.get(t);
      if (l)
        return l == e;
      n |= Zc, a.set(t, e);
      var f = Lo(u(t), u(e), n, o, i, a);
      return a.delete(t), f;
    case al:
      if (Ge)
        return Ge.call(t) == Ge.call(e);
  }
  return !1;
}
var ll = 1, fl = Object.prototype, pl = fl.hasOwnProperty;
function dl(t, e, r, n, o, i) {
  var a = r & ll, u = Dn(t), s = u.length, l = Dn(e), f = l.length;
  if (s != f && !a)
    return !1;
  for (var h = s; h--; ) {
    var d = u[h];
    if (!(a ? d in e : pl.call(e, d)))
      return !1;
  }
  var p = i.get(t), m = i.get(e);
  if (p && m)
    return p == e && m == t;
  var v = !0;
  i.set(t, e), i.set(e, t);
  for (var w = a; ++h < s; ) {
    d = u[h];
    var A = t[d], R = e[d];
    if (n)
      var S = a ? n(R, A, d, e, t, i) : n(A, R, d, t, e, i);
    if (!(S === void 0 ? A === R || o(A, R, r, n, i) : S)) {
      v = !1;
      break;
    }
    w || (w = d == "constructor");
  }
  if (v && !w) {
    var j = t.constructor, x = e.constructor;
    j != x && "constructor" in t && "constructor" in e && !(typeof j == "function" && j instanceof j && typeof x == "function" && x instanceof x) && (v = !1);
  }
  return i.delete(t), i.delete(e), v;
}
var hl = 1, Un = "[object Arguments]", In = "[object Array]", ce = "[object Object]", vl = Object.prototype, Mn = vl.hasOwnProperty;
function yl(t, e, r, n, o, i) {
  var a = lt(t), u = lt(e), s = a ? In : kn(t), l = u ? In : kn(e);
  s = s == Un ? ce : s, l = l == Un ? ce : l;
  var f = s == ce, h = l == ce, d = s == l;
  if (d && we(t)) {
    if (!we(e))
      return !1;
    a = !0, f = !1;
  }
  if (d && !f)
    return i || (i = new dt()), a || Cr(t) ? Lo(t, e, r, n, o, i) : cl(t, e, s, r, n, o, i);
  if (!(r & hl)) {
    var p = f && Mn.call(t, "__wrapped__"), m = h && Mn.call(e, "__wrapped__");
    if (p || m) {
      var v = p ? t.value() : t, w = m ? e.value() : e;
      return i || (i = new dt()), o(v, w, r, n, i);
    }
  }
  return d ? (i || (i = new dt()), dl(t, e, r, n, o, i)) : !1;
}
function Ir(t, e, r, n, o) {
  return t === e ? !0 : t == null || e == null || !xt(t) && !xt(e) ? t !== t && e !== e : yl(t, e, r, n, Ir, o);
}
var ml = 1, gl = 2;
function bl(t, e, r, n) {
  var o = r.length, i = o, a = !n;
  if (t == null)
    return !i;
  for (t = Object(t); o--; ) {
    var u = r[o];
    if (a && u[2] ? u[1] !== t[u[0]] : !(u[0] in t))
      return !1;
  }
  for (; ++o < i; ) {
    u = r[o];
    var s = u[0], l = t[s], f = u[1];
    if (a && u[2]) {
      if (l === void 0 && !(s in t))
        return !1;
    } else {
      var h = new dt();
      if (n)
        var d = n(l, f, s, t, e, h);
      if (!(d === void 0 ? Ir(f, l, ml | gl, n, h) : d))
        return !1;
    }
  }
  return !0;
}
function Uo(t) {
  return t === t && !At(t);
}
function Ol(t) {
  for (var e = Pr(t), r = e.length; r--; ) {
    var n = e[r], o = t[n];
    e[r] = [n, o, Uo(o)];
  }
  return e;
}
function Io(t, e) {
  return function(r) {
    return r == null ? !1 : r[t] === e && (e !== void 0 || t in Object(r));
  };
}
function wl(t) {
  var e = Ol(t);
  return e.length == 1 && e[0][2] ? Io(e[0][0], e[0][1]) : function(r) {
    return r === t || bl(r, t, e);
  };
}
function El(t, e) {
  return t != null && e in Object(t);
}
function _l(t, e, r) {
  e = $o(e, t);
  for (var n = -1, o = e.length, i = !1; ++n < o; ) {
    var a = Ne(e[n]);
    if (!(i = t != null && r(t, a)))
      break;
    t = t[a];
  }
  return i || ++n != o ? i : (o = t == null ? 0 : t.length, !!o && Nr(o) && $r(a, o) && (lt(t) || Oe(t)));
}
function Sl(t, e) {
  return t != null && _l(t, e, El);
}
var jl = 1, xl = 2;
function Al(t, e) {
  return kr(t) && Uo(e) ? Io(Ne(t), e) : function(r) {
    var n = ac(r, t);
    return n === void 0 && n === e ? Sl(r, t) : Ir(e, n, jl | xl);
  };
}
function Rl(t) {
  return function(e) {
    return e == null ? void 0 : e[t];
  };
}
function Dl(t) {
  return function(e) {
    return No(e, t);
  };
}
function $l(t) {
  return kr(t) ? Rl(Ne(t)) : Dl(t);
}
function Mo(t) {
  return typeof t == "function" ? t : t == null ? Rr : typeof t == "object" ? lt(t) ? Al(t[0], t[1]) : wl(t) : $l(t);
}
function Nl(t) {
  return function(e, r, n) {
    for (var o = -1, i = Object(e), a = n(e), u = a.length; u--; ) {
      var s = a[t ? u : ++o];
      if (r(i[s], s, i) === !1)
        break;
    }
    return e;
  };
}
var Tl = Nl();
const Fo = Tl;
function Cl(t, e) {
  return t && Fo(t, e, Pr);
}
function sr(t, e, r) {
  (r !== void 0 && !re(t[e], r) || r === void 0 && !(e in t)) && Ae(t, e, r);
}
function Pl(t) {
  return xt(t) && Re(t);
}
function ur(t, e) {
  if (!(e === "constructor" && typeof t[e] == "function") && e != "__proto__")
    return t[e];
}
function kl(t) {
  return ws(t, Do(t));
}
function Ll(t, e, r, n, o, i, a) {
  var u = ur(t, r), s = ur(e, r), l = a.get(s);
  if (l) {
    sr(t, r, l);
    return;
  }
  var f = i ? i(u, s, r + "", t, e, a) : void 0, h = f === void 0;
  if (h) {
    var d = lt(s), p = !d && we(s), m = !d && !p && Cr(s);
    f = s, d || p || m ? lt(u) ? f = u : Pl(u) ? f = ts(u) : p ? (h = !1, f = Ec(s, !0)) : m ? (h = !1, f = zc(s, !0)) : f = [] : hc(s) || Oe(s) ? (f = u, Oe(u) ? f = kl(u) : (!At(u) || Dr(u)) && (f = Vc(s))) : h = !1;
  }
  h && (a.set(s, f), o(f, s, n, i, a), a.delete(s)), sr(t, r, f);
}
function zo(t, e, r, n, o) {
  t !== e && Fo(e, function(i, a) {
    if (o || (o = new dt()), At(i))
      Ll(t, e, a, r, zo, n, o);
    else {
      var u = n ? n(ur(t, a), i, a + "", t, e, o) : void 0;
      u === void 0 && (u = i), sr(t, a, u);
    }
  }, Do);
}
function Ul(t, e, r) {
  for (var n = -1, o = t == null ? 0 : t.length; ++n < o; )
    if (r(e, t[n]))
      return !0;
  return !1;
}
function Il(t, e) {
  var r = {};
  return e = Mo(e), Cl(t, function(n, o, i) {
    Ae(r, o, e(n, o, i));
  }), r;
}
var Ml = xs(function(t, e, r) {
  zo(t, e, r);
});
const Fl = Ml;
var zl = 1 / 0, Vl = Ft && 1 / Ur(new Ft([, -0]))[1] == zl ? function(t) {
  return new Ft(t);
} : Xa;
const Hl = Vl;
var Bl = 200;
function Wl(t, e, r) {
  var n = -1, o = vs, i = t.length, a = !0, u = [], s = u;
  if (r)
    a = !1, o = Ul;
  else if (i >= Bl) {
    var l = e ? null : Hl(t);
    if (l)
      return Ur(l);
    a = !1, o = ko, s = new Jt();
  } else
    s = e ? [] : u;
  t:
    for (; ++n < i; ) {
      var f = t[n], h = e ? e(f) : f;
      if (f = r || f !== 0 ? f : 0, a && h === h) {
        for (var d = s.length; d--; )
          if (s[d] === h)
            continue t;
        e && s.push(h), u.push(f);
      } else
        o(s, h, r) || (s !== u && s.push(h), u.push(f));
    }
  return u;
}
function Yl(t, e) {
  return t && t.length ? Wl(t, Mo(e)) : [];
}
var cr = /* @__PURE__ */ ((t) => (t.Json = "application/json", t.UrlEncoded = "application/x-www-form-urlencoded", t))(cr || {});
class ql {
  constructor() {
    et(this, "listeners"), this.listeners = {};
  }
  trigger(e, ...r) {
    var n;
    (n = this.listeners[e]) == null || n.map((o) => o(...r));
  }
  on(e, r) {
    var n;
    return this.listeners[e] ? (n = this.listeners[e]) == null || n.push(r) : this.listeners[e] = [r], () => {
      this.off(e, r);
    };
  }
  off(e, r) {
    var n, o;
    if (this.listeners[e]) {
      const i = (n = this.listeners[e]) == null ? void 0 : n.findIndex((a) => a === r);
      i && i > -1 && ((o = this.listeners[e]) == null || o.splice(i, 1));
    } else
      throw new Error(`${this} is doesn't have event "${String(e)}"`);
  }
}
class Gl {
  constructor() {
    et(this, "modeEnv"), et(this, "subdomain"), et(this, "app");
  }
  setConfig({
    modeEnv: e,
    subdomain: r,
    app: n
  }) {
    this.modeEnv = e || void 0, this.subdomain = r || void 0, this.app = n || void 0;
  }
  getConfig() {
    return {
      modEnv: this.modeEnv,
      subdomain: this.subdomain,
      app: this.app
    };
  }
}
const le = new Gl();
class Vo {
  constructor() {
    et(this, "tokens", {});
  }
  getToken(e) {
    if (this.getPrefix())
      return le.getConfig().app ? this.tokens[`${this.getPrefix()}_${e}`] : localStorage.getItem(`${this.getPrefix()}_${e}`);
  }
  setToken(e, r) {
    if (this.getPrefix() && (this.tokens[`${this.getPrefix()}_${e}`] = r, !le.getConfig().app))
      return localStorage.setItem(`${this.getPrefix()}_${e}`, r);
  }
  getPrefix() {
    const e = le.getConfig().modEnv, r = le.getConfig().subdomain;
    return !e || !r ? "" : `${e}_${r}`;
  }
}
const Kl = new Vo();
new Vo();
var Te = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ne(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Ho = { exports: {} };
(function(t, e) {
  (function(r, n) {
    t.exports = n();
  })(Te, function() {
    var r = 1e3, n = 6e4, o = 36e5, i = "millisecond", a = "second", u = "minute", s = "hour", l = "day", f = "week", h = "month", d = "quarter", p = "year", m = "date", v = "Invalid Date", w = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, A = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, R = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function($) {
      var O = ["th", "st", "nd", "rd"], b = $ % 100;
      return "[" + $ + (O[(b - 20) % 10] || O[b] || O[0]) + "]";
    } }, S = function($, O, b) {
      var N = String($);
      return !N || N.length >= O ? $ : "" + Array(O + 1 - N.length).join(b) + $;
    }, j = { s: S, z: function($) {
      var O = -$.utcOffset(), b = Math.abs(O), N = Math.floor(b / 60), _ = b % 60;
      return (O <= 0 ? "+" : "-") + S(N, 2, "0") + ":" + S(_, 2, "0");
    }, m: function $(O, b) {
      if (O.date() < b.date())
        return -$(b, O);
      var N = 12 * (b.year() - O.year()) + (b.month() - O.month()), _ = O.clone().add(N, h), C = b - _ < 0, T = O.clone().add(N + (C ? -1 : 1), h);
      return +(-(N + (b - _) / (C ? _ - T : T - _)) || 0);
    }, a: function($) {
      return $ < 0 ? Math.ceil($) || 0 : Math.floor($);
    }, p: function($) {
      return { M: h, y: p, w: f, d: l, D: m, h: s, m: u, s: a, ms: i, Q: d }[$] || String($ || "").toLowerCase().replace(/s$/, "");
    }, u: function($) {
      return $ === void 0;
    } }, x = "en", P = {};
    P[x] = R;
    var H = function($) {
      return $ instanceof st;
    }, I = function $(O, b, N) {
      var _;
      if (!O)
        return x;
      if (typeof O == "string") {
        var C = O.toLowerCase();
        P[C] && (_ = C), b && (P[C] = b, _ = C);
        var T = O.split("-");
        if (!_ && T.length > 1)
          return $(T[0]);
      } else {
        var z = O.name;
        P[z] = O, _ = z;
      }
      return !N && _ && (x = _), _ || !N && x;
    }, k = function($, O) {
      if (H($))
        return $.clone();
      var b = typeof O == "object" ? O : {};
      return b.date = $, b.args = arguments, new st(b);
    }, L = j;
    L.l = I, L.i = H, L.w = function($, O) {
      return k($, { locale: O.$L, utc: O.$u, x: O.$x, $offset: O.$offset });
    };
    var st = function() {
      function $(b) {
        this.$L = I(b.locale, null, !0), this.parse(b);
      }
      var O = $.prototype;
      return O.parse = function(b) {
        this.$d = function(N) {
          var _ = N.date, C = N.utc;
          if (_ === null)
            return /* @__PURE__ */ new Date(NaN);
          if (L.u(_))
            return /* @__PURE__ */ new Date();
          if (_ instanceof Date)
            return new Date(_);
          if (typeof _ == "string" && !/Z$/i.test(_)) {
            var T = _.match(w);
            if (T) {
              var z = T[2] - 1 || 0, G = (T[7] || "0").substring(0, 3);
              return C ? new Date(Date.UTC(T[1], z, T[3] || 1, T[4] || 0, T[5] || 0, T[6] || 0, G)) : new Date(T[1], z, T[3] || 1, T[4] || 0, T[5] || 0, T[6] || 0, G);
            }
          }
          return new Date(_);
        }(b), this.$x = b.x || {}, this.init();
      }, O.init = function() {
        var b = this.$d;
        this.$y = b.getFullYear(), this.$M = b.getMonth(), this.$D = b.getDate(), this.$W = b.getDay(), this.$H = b.getHours(), this.$m = b.getMinutes(), this.$s = b.getSeconds(), this.$ms = b.getMilliseconds();
      }, O.$utils = function() {
        return L;
      }, O.isValid = function() {
        return this.$d.toString() !== v;
      }, O.isSame = function(b, N) {
        var _ = k(b);
        return this.startOf(N) <= _ && _ <= this.endOf(N);
      }, O.isAfter = function(b, N) {
        return k(b) < this.startOf(N);
      }, O.isBefore = function(b, N) {
        return this.endOf(N) < k(b);
      }, O.$g = function(b, N, _) {
        return L.u(b) ? this[N] : this.set(_, b);
      }, O.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, O.valueOf = function() {
        return this.$d.getTime();
      }, O.startOf = function(b, N) {
        var _ = this, C = !!L.u(N) || N, T = L.p(b), z = function(ct, Q) {
          var ot = L.w(_.$u ? Date.UTC(_.$y, Q, ct) : new Date(_.$y, Q, ct), _);
          return C ? ot : ot.endOf(l);
        }, G = function(ct, Q) {
          return L.w(_.toDate()[ct].apply(_.toDate("s"), (C ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(Q)), _);
        }, Y = this.$W, Z = this.$M, ft = this.$D, ut = "set" + (this.$u ? "UTC" : "");
        switch (T) {
          case p:
            return C ? z(1, 0) : z(31, 11);
          case h:
            return C ? z(1, Z) : z(0, Z + 1);
          case f:
            var vt = this.$locale().weekStart || 0, yt = (Y < vt ? Y + 7 : Y) - vt;
            return z(C ? ft - yt : ft + (6 - yt), Z);
          case l:
          case m:
            return G(ut + "Hours", 0);
          case s:
            return G(ut + "Minutes", 1);
          case u:
            return G(ut + "Seconds", 2);
          case a:
            return G(ut + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, O.endOf = function(b) {
        return this.startOf(b, !1);
      }, O.$set = function(b, N) {
        var _, C = L.p(b), T = "set" + (this.$u ? "UTC" : ""), z = (_ = {}, _[l] = T + "Date", _[m] = T + "Date", _[h] = T + "Month", _[p] = T + "FullYear", _[s] = T + "Hours", _[u] = T + "Minutes", _[a] = T + "Seconds", _[i] = T + "Milliseconds", _)[C], G = C === l ? this.$D + (N - this.$W) : N;
        if (C === h || C === p) {
          var Y = this.clone().set(m, 1);
          Y.$d[z](G), Y.init(), this.$d = Y.set(m, Math.min(this.$D, Y.daysInMonth())).$d;
        } else
          z && this.$d[z](G);
        return this.init(), this;
      }, O.set = function(b, N) {
        return this.clone().$set(b, N);
      }, O.get = function(b) {
        return this[L.p(b)]();
      }, O.add = function(b, N) {
        var _, C = this;
        b = Number(b);
        var T = L.p(N), z = function(Z) {
          var ft = k(C);
          return L.w(ft.date(ft.date() + Math.round(Z * b)), C);
        };
        if (T === h)
          return this.set(h, this.$M + b);
        if (T === p)
          return this.set(p, this.$y + b);
        if (T === l)
          return z(1);
        if (T === f)
          return z(7);
        var G = (_ = {}, _[u] = n, _[s] = o, _[a] = r, _)[T] || 1, Y = this.$d.getTime() + b * G;
        return L.w(Y, this);
      }, O.subtract = function(b, N) {
        return this.add(-1 * b, N);
      }, O.format = function(b) {
        var N = this, _ = this.$locale();
        if (!this.isValid())
          return _.invalidDate || v;
        var C = b || "YYYY-MM-DDTHH:mm:ssZ", T = L.z(this), z = this.$H, G = this.$m, Y = this.$M, Z = _.weekdays, ft = _.months, ut = function(Q, ot, Ht, Rt) {
          return Q && (Q[ot] || Q(N, C)) || Ht[ot].slice(0, Rt);
        }, vt = function(Q) {
          return L.s(z % 12 || 12, Q, "0");
        }, yt = _.meridiem || function(Q, ot, Ht) {
          var Rt = Q < 12 ? "AM" : "PM";
          return Ht ? Rt.toLowerCase() : Rt;
        }, ct = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: Y + 1, MM: L.s(Y + 1, 2, "0"), MMM: ut(_.monthsShort, Y, ft, 3), MMMM: ut(ft, Y), D: this.$D, DD: L.s(this.$D, 2, "0"), d: String(this.$W), dd: ut(_.weekdaysMin, this.$W, Z, 2), ddd: ut(_.weekdaysShort, this.$W, Z, 3), dddd: Z[this.$W], H: String(z), HH: L.s(z, 2, "0"), h: vt(1), hh: vt(2), a: yt(z, G, !0), A: yt(z, G, !1), m: String(G), mm: L.s(G, 2, "0"), s: String(this.$s), ss: L.s(this.$s, 2, "0"), SSS: L.s(this.$ms, 3, "0"), Z: T };
        return C.replace(A, function(Q, ot) {
          return ot || ct[Q] || T.replace(":", "");
        });
      }, O.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, O.diff = function(b, N, _) {
        var C, T = L.p(N), z = k(b), G = (z.utcOffset() - this.utcOffset()) * n, Y = this - z, Z = L.m(this, z);
        return Z = (C = {}, C[p] = Z / 12, C[h] = Z, C[d] = Z / 3, C[f] = (Y - G) / 6048e5, C[l] = (Y - G) / 864e5, C[s] = Y / o, C[u] = Y / n, C[a] = Y / r, C)[T] || Y, _ ? Z : L.a(Z);
      }, O.daysInMonth = function() {
        return this.endOf(h).$D;
      }, O.$locale = function() {
        return P[this.$L];
      }, O.locale = function(b, N) {
        if (!b)
          return this.$L;
        var _ = this.clone(), C = I(b, N, !0);
        return C && (_.$L = C), _;
      }, O.clone = function() {
        return L.w(this.$d, this);
      }, O.toDate = function() {
        return new Date(this.valueOf());
      }, O.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, O.toISOString = function() {
        return this.$d.toISOString();
      }, O.toString = function() {
        return this.$d.toUTCString();
      }, $;
    }(), ae = st.prototype;
    return k.prototype = ae, [["$ms", i], ["$s", a], ["$m", u], ["$H", s], ["$W", l], ["$M", h], ["$y", p], ["$D", m]].forEach(function($) {
      ae[$[1]] = function(O) {
        return this.$g(O, $[0], $[1]);
      };
    }), k.extend = function($, O) {
      return $.$i || ($(O, st, k), $.$i = !0), k;
    }, k.locale = I, k.isDayjs = H, k.unix = function($) {
      return k(1e3 * $);
    }, k.en = P[x], k.Ls = P, k.p = {}, k;
  });
})(Ho);
var Jl = Ho.exports;
const Mr = /* @__PURE__ */ ne(Jl);
var Bo = { exports: {} };
(function(t, e) {
  (function(r, n) {
    t.exports = n();
  })(Te, function() {
    return function(r, n, o) {
      r = r || {};
      var i = n.prototype, a = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
      function u(l, f, h, d) {
        return i.fromToBase(l, f, h, d);
      }
      o.en.relativeTime = a, i.fromToBase = function(l, f, h, d, p) {
        for (var m, v, w, A = h.$locale().relativeTime || a, R = r.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], S = R.length, j = 0; j < S; j += 1) {
          var x = R[j];
          x.d && (m = d ? o(l).diff(h, x.d, !0) : h.diff(l, x.d, !0));
          var P = (r.rounding || Math.round)(Math.abs(m));
          if (w = m > 0, P <= x.r || !x.r) {
            P <= 1 && j > 0 && (x = R[j - 1]);
            var H = A[x.l];
            p && (P = p("" + P)), v = typeof H == "string" ? H.replace("%d", P) : H(P, f, x.l, w);
            break;
          }
        }
        if (f)
          return v;
        var I = w ? A.future : A.past;
        return typeof I == "function" ? I(v) : I.replace("%s", v);
      }, i.to = function(l, f) {
        return u(l, f, this, !0);
      }, i.from = function(l, f) {
        return u(l, f, this);
      };
      var s = function(l) {
        return l.$u ? o.utc() : o();
      };
      i.toNow = function(l) {
        return this.to(s(this), l);
      }, i.fromNow = function(l) {
        return this.from(s(this), l);
      };
    };
  });
})(Bo);
var Zl = Bo.exports;
const Ql = /* @__PURE__ */ ne(Zl);
var Wo = { exports: {} };
(function(t, e) {
  (function(r, n) {
    t.exports = n();
  })(Te, function() {
    var r = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }, n = {};
    return function(o, i, a) {
      var u, s = function(d, p, m) {
        m === void 0 && (m = {});
        var v = new Date(d), w = function(A, R) {
          R === void 0 && (R = {});
          var S = R.timeZoneName || "short", j = A + "|" + S, x = n[j];
          return x || (x = new Intl.DateTimeFormat("en-US", { hour12: !1, timeZone: A, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: S }), n[j] = x), x;
        }(p, m);
        return w.formatToParts(v);
      }, l = function(d, p) {
        for (var m = s(d, p), v = [], w = 0; w < m.length; w += 1) {
          var A = m[w], R = A.type, S = A.value, j = r[R];
          j >= 0 && (v[j] = parseInt(S, 10));
        }
        var x = v[3], P = x === 24 ? 0 : x, H = v[0] + "-" + v[1] + "-" + v[2] + " " + P + ":" + v[4] + ":" + v[5] + ":000", I = +d;
        return (a.utc(H).valueOf() - (I -= I % 1e3)) / 6e4;
      }, f = i.prototype;
      f.tz = function(d, p) {
        d === void 0 && (d = u);
        var m = this.utcOffset(), v = this.toDate(), w = v.toLocaleString("en-US", { timeZone: d }), A = Math.round((v - new Date(w)) / 1e3 / 60), R = a(w).$set("millisecond", this.$ms).utcOffset(15 * -Math.round(v.getTimezoneOffset() / 15) - A, !0);
        if (p) {
          var S = R.utcOffset();
          R = R.add(m - S, "minute");
        }
        return R.$x.$timezone = d, R;
      }, f.offsetName = function(d) {
        var p = this.$x.$timezone || a.tz.guess(), m = s(this.valueOf(), p, { timeZoneName: d }).find(function(v) {
          return v.type.toLowerCase() === "timezonename";
        });
        return m && m.value;
      };
      var h = f.startOf;
      f.startOf = function(d, p) {
        if (!this.$x || !this.$x.$timezone)
          return h.call(this, d, p);
        var m = a(this.format("YYYY-MM-DD HH:mm:ss:SSS"));
        return h.call(m, d, p).tz(this.$x.$timezone, !0);
      }, a.tz = function(d, p, m) {
        var v = m && p, w = m || p || u, A = l(+a(), w);
        if (typeof d != "string")
          return a(d).tz(w);
        var R = function(P, H, I) {
          var k = P - 60 * H * 1e3, L = l(k, I);
          if (H === L)
            return [k, H];
          var st = l(k -= 60 * (L - H) * 1e3, I);
          return L === st ? [k, L] : [P - 60 * Math.min(L, st) * 1e3, Math.max(L, st)];
        }(a.utc(d, v).valueOf(), A, w), S = R[0], j = R[1], x = a(S).utcOffset(j);
        return x.$x.$timezone = w, x;
      }, a.tz.guess = function() {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
      }, a.tz.setDefault = function(d) {
        u = d;
      };
    };
  });
})(Wo);
var Xl = Wo.exports;
const tf = /* @__PURE__ */ ne(Xl);
var Yo = { exports: {} };
(function(t, e) {
  (function(r, n) {
    t.exports = n();
  })(Te, function() {
    var r = "minute", n = /[+-]\d\d(?::?\d\d)?/g, o = /([+-]|\d\d)/g;
    return function(i, a, u) {
      var s = a.prototype;
      u.utc = function(v) {
        var w = { date: v, utc: !0, args: arguments };
        return new a(w);
      }, s.utc = function(v) {
        var w = u(this.toDate(), { locale: this.$L, utc: !0 });
        return v ? w.add(this.utcOffset(), r) : w;
      }, s.local = function() {
        return u(this.toDate(), { locale: this.$L, utc: !1 });
      };
      var l = s.parse;
      s.parse = function(v) {
        v.utc && (this.$u = !0), this.$utils().u(v.$offset) || (this.$offset = v.$offset), l.call(this, v);
      };
      var f = s.init;
      s.init = function() {
        if (this.$u) {
          var v = this.$d;
          this.$y = v.getUTCFullYear(), this.$M = v.getUTCMonth(), this.$D = v.getUTCDate(), this.$W = v.getUTCDay(), this.$H = v.getUTCHours(), this.$m = v.getUTCMinutes(), this.$s = v.getUTCSeconds(), this.$ms = v.getUTCMilliseconds();
        } else
          f.call(this);
      };
      var h = s.utcOffset;
      s.utcOffset = function(v, w) {
        var A = this.$utils().u;
        if (A(v))
          return this.$u ? 0 : A(this.$offset) ? h.call(this) : this.$offset;
        if (typeof v == "string" && (v = function(x) {
          x === void 0 && (x = "");
          var P = x.match(n);
          if (!P)
            return null;
          var H = ("" + P[0]).match(o) || ["-", 0, 0], I = H[0], k = 60 * +H[1] + +H[2];
          return k === 0 ? 0 : I === "+" ? k : -k;
        }(v), v === null))
          return this;
        var R = Math.abs(v) <= 16 ? 60 * v : v, S = this;
        if (w)
          return S.$offset = R, S.$u = v === 0, S;
        if (v !== 0) {
          var j = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
          (S = this.local().add(R + j, r)).$offset = R, S.$x.$localOffset = j;
        } else
          S = this.utc();
        return S;
      };
      var d = s.format;
      s.format = function(v) {
        var w = v || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
        return d.call(this, w);
      }, s.valueOf = function() {
        var v = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
        return this.$d.valueOf() - 6e4 * v;
      }, s.isUTC = function() {
        return !!this.$u;
      }, s.toISOString = function() {
        return this.toDate().toISOString();
      }, s.toString = function() {
        return this.toDate().toUTCString();
      };
      var p = s.toDate;
      s.toDate = function(v) {
        return v === "s" && this.$offset ? u(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : p.call(this);
      };
      var m = s.diff;
      s.diff = function(v, w, A) {
        if (v && this.$u === v.$u)
          return m.call(this, v, w, A);
        var R = this.local(), S = u(v).local();
        return m.call(R, S, w, A);
      };
    };
  });
})(Yo);
var ef = Yo.exports;
const rf = /* @__PURE__ */ ne(ef);
Mr.extend(rf);
Mr.extend(tf);
Mr.extend(Ql);
function Fn(t) {
  for (const e in t)
    Object.prototype.hasOwnProperty.call(t, e) && t[e] === void 0 && delete t[e];
  return t;
}
const lr = (t, e = "", r = new FormData()) => (Object.keys(t).forEach((n) => {
  const o = e !== "" ? e + "." + n : n, i = t[n];
  Array.isArray(i) ? i.forEach((a, u) => {
    typeof a == "object" ? a instanceof File ? r.append(o, a) : r = lr(a, o + `[${u}]`, r) : r.append(o, a);
  }) : typeof i == "object" ? i instanceof File ? r.append(o, i) : r = lr(i, o, r) : r.append(o, i);
}), r), _e = (t, e = "", r = new URLSearchParams()) => (Object.keys(t).forEach((n) => {
  const o = e !== "" ? e + "." + n : n, i = t[n];
  Array.isArray(i) ? i.forEach((a, u) => {
    typeof a == "object" ? r = _e(a, o + `[${u}]`, r) : r.append(o, a);
  }) : typeof i == "object" ? r = _e(i, o, r) : r.append(o, i);
}), r);
function fr(t) {
  this.message = t;
}
fr.prototype = new Error(), fr.prototype.name = "InvalidCharacterError";
typeof window < "u" && window.atob && window.atob.bind(window);
function zn(t) {
  this.message = t;
}
zn.prototype = new Error(), zn.prototype.name = "InvalidTokenError";
function qo(t, e) {
  return function() {
    return t.apply(e, arguments);
  };
}
const { toString: Go } = Object.prototype, { getPrototypeOf: Fr } = Object, zr = ((t) => (e) => {
  const r = Go.call(e);
  return t[r] || (t[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), _t = (t) => (t = t.toLowerCase(), (e) => zr(e) === t), Ce = (t) => (e) => typeof e === t, { isArray: Vt } = Array, Zt = Ce("undefined");
function nf(t) {
  return t !== null && !Zt(t) && t.constructor !== null && !Zt(t.constructor) && Tt(t.constructor.isBuffer) && t.constructor.isBuffer(t);
}
const Ko = _t("ArrayBuffer");
function of(t) {
  let e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(t) : e = t && t.buffer && Ko(t.buffer), e;
}
const af = Ce("string"), Tt = Ce("function"), Jo = Ce("number"), Vr = (t) => t !== null && typeof t == "object", sf = (t) => t === !0 || t === !1, de = (t) => {
  if (zr(t) !== "object")
    return !1;
  const e = Fr(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in t) && !(Symbol.iterator in t);
}, uf = _t("Date"), cf = _t("File"), lf = _t("Blob"), ff = _t("FileList"), pf = (t) => Vr(t) && Tt(t.pipe), df = (t) => {
  const e = "[object FormData]";
  return t && (typeof FormData == "function" && t instanceof FormData || Go.call(t) === e || Tt(t.toString) && t.toString() === e);
}, hf = _t("URLSearchParams"), vf = (t) => t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function oe(t, e, { allOwnKeys: r = !1 } = {}) {
  if (t === null || typeof t > "u")
    return;
  let n, o;
  if (typeof t != "object" && (t = [t]), Vt(t))
    for (n = 0, o = t.length; n < o; n++)
      e.call(null, t[n], n, t);
  else {
    const i = r ? Object.getOwnPropertyNames(t) : Object.keys(t), a = i.length;
    let u;
    for (n = 0; n < a; n++)
      u = i[n], e.call(null, t[u], u, t);
  }
}
function Zo(t, e) {
  e = e.toLowerCase();
  const r = Object.keys(t);
  let n = r.length, o;
  for (; n-- > 0; )
    if (o = r[n], e === o.toLowerCase())
      return o;
  return null;
}
const Qo = typeof self > "u" ? typeof global > "u" ? globalThis : global : self, Xo = (t) => !Zt(t) && t !== Qo;
function pr() {
  const { caseless: t } = Xo(this) && this || {}, e = {}, r = (n, o) => {
    const i = t && Zo(e, o) || o;
    de(e[i]) && de(n) ? e[i] = pr(e[i], n) : de(n) ? e[i] = pr({}, n) : Vt(n) ? e[i] = n.slice() : e[i] = n;
  };
  for (let n = 0, o = arguments.length; n < o; n++)
    arguments[n] && oe(arguments[n], r);
  return e;
}
const yf = (t, e, r, { allOwnKeys: n } = {}) => (oe(e, (o, i) => {
  r && Tt(o) ? t[i] = qo(o, r) : t[i] = o;
}, { allOwnKeys: n }), t), mf = (t) => (t.charCodeAt(0) === 65279 && (t = t.slice(1)), t), gf = (t, e, r, n) => {
  t.prototype = Object.create(e.prototype, n), t.prototype.constructor = t, Object.defineProperty(t, "super", {
    value: e.prototype
  }), r && Object.assign(t.prototype, r);
}, bf = (t, e, r, n) => {
  let o, i, a;
  const u = {};
  if (e = e || {}, t == null)
    return e;
  do {
    for (o = Object.getOwnPropertyNames(t), i = o.length; i-- > 0; )
      a = o[i], (!n || n(a, t, e)) && !u[a] && (e[a] = t[a], u[a] = !0);
    t = r !== !1 && Fr(t);
  } while (t && (!r || r(t, e)) && t !== Object.prototype);
  return e;
}, Of = (t, e, r) => {
  t = String(t), (r === void 0 || r > t.length) && (r = t.length), r -= e.length;
  const n = t.indexOf(e, r);
  return n !== -1 && n === r;
}, wf = (t) => {
  if (!t)
    return null;
  if (Vt(t))
    return t;
  let e = t.length;
  if (!Jo(e))
    return null;
  const r = new Array(e);
  for (; e-- > 0; )
    r[e] = t[e];
  return r;
}, Ef = ((t) => (e) => t && e instanceof t)(typeof Uint8Array < "u" && Fr(Uint8Array)), _f = (t, e) => {
  const r = (t && t[Symbol.iterator]).call(t);
  let n;
  for (; (n = r.next()) && !n.done; ) {
    const o = n.value;
    e.call(t, o[0], o[1]);
  }
}, Sf = (t, e) => {
  let r;
  const n = [];
  for (; (r = t.exec(e)) !== null; )
    n.push(r);
  return n;
}, jf = _t("HTMLFormElement"), xf = (t) => t.toLowerCase().replace(
  /[_-\s]([a-z\d])(\w*)/g,
  function(e, r, n) {
    return r.toUpperCase() + n;
  }
), Vn = (({ hasOwnProperty: t }) => (e, r) => t.call(e, r))(Object.prototype), Af = _t("RegExp"), ti = (t, e) => {
  const r = Object.getOwnPropertyDescriptors(t), n = {};
  oe(r, (o, i) => {
    e(o, i, t) !== !1 && (n[i] = o);
  }), Object.defineProperties(t, n);
}, Rf = (t) => {
  ti(t, (e, r) => {
    if (Tt(t) && ["arguments", "caller", "callee"].indexOf(r) !== -1)
      return !1;
    const n = t[r];
    if (Tt(n)) {
      if (e.enumerable = !1, "writable" in e) {
        e.writable = !1;
        return;
      }
      e.set || (e.set = () => {
        throw Error("Can not rewrite read-only method '" + r + "'");
      });
    }
  });
}, Df = (t, e) => {
  const r = {}, n = (o) => {
    o.forEach((i) => {
      r[i] = !0;
    });
  };
  return Vt(t) ? n(t) : n(String(t).split(e)), r;
}, $f = () => {
}, Nf = (t, e) => (t = +t, Number.isFinite(t) ? t : e), Tf = (t) => {
  const e = new Array(10), r = (n, o) => {
    if (Vr(n)) {
      if (e.indexOf(n) >= 0)
        return;
      if (!("toJSON" in n)) {
        e[o] = n;
        const i = Vt(n) ? [] : {};
        return oe(n, (a, u) => {
          const s = r(a, o + 1);
          !Zt(s) && (i[u] = s);
        }), e[o] = void 0, i;
      }
    }
    return n;
  };
  return r(t, 0);
}, y = {
  isArray: Vt,
  isArrayBuffer: Ko,
  isBuffer: nf,
  isFormData: df,
  isArrayBufferView: of,
  isString: af,
  isNumber: Jo,
  isBoolean: sf,
  isObject: Vr,
  isPlainObject: de,
  isUndefined: Zt,
  isDate: uf,
  isFile: cf,
  isBlob: lf,
  isRegExp: Af,
  isFunction: Tt,
  isStream: pf,
  isURLSearchParams: hf,
  isTypedArray: Ef,
  isFileList: ff,
  forEach: oe,
  merge: pr,
  extend: yf,
  trim: vf,
  stripBOM: mf,
  inherits: gf,
  toFlatObject: bf,
  kindOf: zr,
  kindOfTest: _t,
  endsWith: Of,
  toArray: wf,
  forEachEntry: _f,
  matchAll: Sf,
  isHTMLForm: jf,
  hasOwnProperty: Vn,
  hasOwnProp: Vn,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: ti,
  freezeMethods: Rf,
  toObjectSet: Df,
  toCamelCase: xf,
  noop: $f,
  toFiniteNumber: Nf,
  findKey: Zo,
  global: Qo,
  isContextDefined: Xo,
  toJSONObject: Tf
};
function F(t, e, r, n, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = t, this.name = "AxiosError", e && (this.code = e), r && (this.config = r), n && (this.request = n), o && (this.response = o);
}
y.inherits(F, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: y.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const ei = F.prototype, ri = {};
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
  // eslint-disable-next-line func-names
].forEach((t) => {
  ri[t] = { value: t };
});
Object.defineProperties(F, ri);
Object.defineProperty(ei, "isAxiosError", { value: !0 });
F.from = (t, e, r, n, o, i) => {
  const a = Object.create(ei);
  return y.toFlatObject(t, a, function(u) {
    return u !== Error.prototype;
  }, (u) => u !== "isAxiosError"), F.call(a, t.message, e, r, n, o), a.cause = t, a.name = t.name, i && Object.assign(a, i), a;
};
var Cf = typeof self == "object" ? self.FormData : window.FormData;
const Pf = /* @__PURE__ */ ne(Cf);
function dr(t) {
  return y.isPlainObject(t) || y.isArray(t);
}
function ni(t) {
  return y.endsWith(t, "[]") ? t.slice(0, -2) : t;
}
function Hn(t, e, r) {
  return t ? t.concat(e).map(function(n, o) {
    return n = ni(n), !r && o ? "[" + n + "]" : n;
  }).join(r ? "." : "") : e;
}
function kf(t) {
  return y.isArray(t) && !t.some(dr);
}
const Lf = y.toFlatObject(y, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function Uf(t) {
  return t && y.isFunction(t.append) && t[Symbol.toStringTag] === "FormData" && t[Symbol.iterator];
}
function Pe(t, e, r) {
  if (!y.isObject(t))
    throw new TypeError("target must be an object");
  e = e || new (Pf || FormData)(), r = y.toFlatObject(r, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(p, m) {
    return !y.isUndefined(m[p]);
  });
  const n = r.metaTokens, o = r.visitor || l, i = r.dots, a = r.indexes, u = (r.Blob || typeof Blob < "u" && Blob) && Uf(e);
  if (!y.isFunction(o))
    throw new TypeError("visitor must be a function");
  function s(p) {
    if (p === null)
      return "";
    if (y.isDate(p))
      return p.toISOString();
    if (!u && y.isBlob(p))
      throw new F("Blob is not supported. Use a Buffer instead.");
    return y.isArrayBuffer(p) || y.isTypedArray(p) ? u && typeof Blob == "function" ? new Blob([p]) : Buffer.from(p) : p;
  }
  function l(p, m, v) {
    let w = p;
    if (p && !v && typeof p == "object") {
      if (y.endsWith(m, "{}"))
        m = n ? m : m.slice(0, -2), p = JSON.stringify(p);
      else if (y.isArray(p) && kf(p) || y.isFileList(p) || y.endsWith(m, "[]") && (w = y.toArray(p)))
        return m = ni(m), w.forEach(function(A, R) {
          !(y.isUndefined(A) || A === null) && e.append(
            // eslint-disable-next-line no-nested-ternary
            a === !0 ? Hn([m], R, i) : a === null ? m : m + "[]",
            s(A)
          );
        }), !1;
    }
    return dr(p) ? !0 : (e.append(Hn(v, m, i), s(p)), !1);
  }
  const f = [], h = Object.assign(Lf, {
    defaultVisitor: l,
    convertValue: s,
    isVisitable: dr
  });
  function d(p, m) {
    if (!y.isUndefined(p)) {
      if (f.indexOf(p) !== -1)
        throw Error("Circular reference detected in " + m.join("."));
      f.push(p), y.forEach(p, function(v, w) {
        (!(y.isUndefined(v) || v === null) && o.call(
          e,
          v,
          y.isString(w) ? w.trim() : w,
          m,
          h
        )) === !0 && d(v, m ? m.concat(w) : [w]);
      }), f.pop();
    }
  }
  if (!y.isObject(t))
    throw new TypeError("data must be an object");
  return d(t), e;
}
function Bn(t) {
  const e = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g, function(r) {
    return e[r];
  });
}
function Hr(t, e) {
  this._pairs = [], t && Pe(t, this, e);
}
const oi = Hr.prototype;
oi.append = function(t, e) {
  this._pairs.push([t, e]);
};
oi.toString = function(t) {
  const e = t ? function(r) {
    return t.call(this, r, Bn);
  } : Bn;
  return this._pairs.map(function(r) {
    return e(r[0]) + "=" + e(r[1]);
  }, "").join("&");
};
function If(t) {
  return encodeURIComponent(t).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function ii(t, e, r) {
  if (!e)
    return t;
  const n = r && r.encode || If, o = r && r.serialize;
  let i;
  if (o ? i = o(e, r) : i = y.isURLSearchParams(e) ? e.toString() : new Hr(e, r).toString(n), i) {
    const a = t.indexOf("#");
    a !== -1 && (t = t.slice(0, a)), t += (t.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return t;
}
class Mf {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(e, r, n) {
    return this.handlers.push({
      fulfilled: e,
      rejected: r,
      synchronous: n ? n.synchronous : !1,
      runWhen: n ? n.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(e) {
    this.handlers[e] && (this.handlers[e] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(e) {
    y.forEach(this.handlers, function(r) {
      r !== null && e(r);
    });
  }
}
const Wn = Mf, ai = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Ff = typeof URLSearchParams < "u" ? URLSearchParams : Hr, zf = FormData, Vf = (() => {
  let t;
  return typeof navigator < "u" && ((t = navigator.product) === "ReactNative" || t === "NativeScript" || t === "NS") ? !1 : typeof window < "u" && typeof document < "u";
})(), Hf = (() => typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), pt = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Ff,
    FormData: zf,
    Blob
  },
  isStandardBrowserEnv: Vf,
  isStandardBrowserWebWorkerEnv: Hf,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function Bf(t, e) {
  return Pe(t, new pt.classes.URLSearchParams(), Object.assign({
    visitor: function(r, n, o, i) {
      return pt.isNode && y.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments);
    }
  }, e));
}
function Wf(t) {
  return y.matchAll(/\w+|\[(\w*)]/g, t).map((e) => e[0] === "[]" ? "" : e[1] || e[0]);
}
function Yf(t) {
  const e = {}, r = Object.keys(t);
  let n;
  const o = r.length;
  let i;
  for (n = 0; n < o; n++)
    i = r[n], e[i] = t[i];
  return e;
}
function si(t) {
  function e(r, n, o, i) {
    let a = r[i++];
    const u = Number.isFinite(+a), s = i >= r.length;
    return a = !a && y.isArray(o) ? o.length : a, s ? (y.hasOwnProp(o, a) ? o[a] = [o[a], n] : o[a] = n, !u) : ((!o[a] || !y.isObject(o[a])) && (o[a] = []), e(r, n, o[a], i) && y.isArray(o[a]) && (o[a] = Yf(o[a])), !u);
  }
  if (y.isFormData(t) && y.isFunction(t.entries)) {
    const r = {};
    return y.forEachEntry(t, (n, o) => {
      e(Wf(n), o, r, 0);
    }), r;
  }
  return null;
}
const qf = {
  "Content-Type": void 0
};
function Gf(t, e, r) {
  if (y.isString(t))
    try {
      return (e || JSON.parse)(t), y.trim(t);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (r || JSON.stringify)(t);
}
const ke = {
  transitional: ai,
  adapter: ["xhr", "http"],
  transformRequest: [function(t, e) {
    const r = e.getContentType() || "", n = r.indexOf("application/json") > -1, o = y.isObject(t);
    if (o && y.isHTMLForm(t) && (t = new FormData(t)), y.isFormData(t))
      return n && n ? JSON.stringify(si(t)) : t;
    if (y.isArrayBuffer(t) || y.isBuffer(t) || y.isStream(t) || y.isFile(t) || y.isBlob(t))
      return t;
    if (y.isArrayBufferView(t))
      return t.buffer;
    if (y.isURLSearchParams(t))
      return e.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let i;
    if (o) {
      if (r.indexOf("application/x-www-form-urlencoded") > -1)
        return Bf(t, this.formSerializer).toString();
      if ((i = y.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
        const a = this.env && this.env.FormData;
        return Pe(
          i ? { "files[]": t } : t,
          a && new a(),
          this.formSerializer
        );
      }
    }
    return o || n ? (e.setContentType("application/json", !1), Gf(t)) : t;
  }],
  transformResponse: [function(t) {
    const e = this.transitional || ke.transitional, r = e && e.forcedJSONParsing, n = this.responseType === "json";
    if (t && y.isString(t) && (r && !this.responseType || n)) {
      const o = !(e && e.silentJSONParsing) && n;
      try {
        return JSON.parse(t);
      } catch (i) {
        if (o)
          throw i.name === "SyntaxError" ? F.from(i, F.ERR_BAD_RESPONSE, this, null, this.response) : i;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: pt.classes.FormData,
    Blob: pt.classes.Blob
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
y.forEach(["delete", "get", "head"], function(t) {
  ke.headers[t] = {};
});
y.forEach(["post", "put", "patch"], function(t) {
  ke.headers[t] = y.merge(qf);
});
const Br = ke, Kf = y.toObjectSet([
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
]), Jf = (t) => {
  const e = {};
  let r, n, o;
  return t && t.split(`
`).forEach(function(i) {
    o = i.indexOf(":"), r = i.substring(0, o).trim().toLowerCase(), n = i.substring(o + 1).trim(), !(!r || e[r] && Kf[r]) && (r === "set-cookie" ? e[r] ? e[r].push(n) : e[r] = [n] : e[r] = e[r] ? e[r] + ", " + n : n);
  }), e;
}, Yn = Symbol("internals");
function Yt(t) {
  return t && String(t).trim().toLowerCase();
}
function he(t) {
  return t === !1 || t == null ? t : y.isArray(t) ? t.map(he) : String(t);
}
function Zf(t) {
  const e = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(t); )
    e[n[1]] = n[2];
  return e;
}
function Qf(t) {
  return /^[-_a-zA-Z]+$/.test(t.trim());
}
function qn(t, e, r, n) {
  if (y.isFunction(n))
    return n.call(this, e, r);
  if (y.isString(e)) {
    if (y.isString(n))
      return e.indexOf(n) !== -1;
    if (y.isRegExp(n))
      return n.test(e);
  }
}
function Xf(t) {
  return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, r, n) => r.toUpperCase() + n);
}
function tp(t, e) {
  const r = y.toCamelCase(" " + e);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(t, n + r, {
      value: function(o, i, a) {
        return this[n].call(this, e, o, i, a);
      },
      configurable: !0
    });
  });
}
let Le = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, e, r) {
    const n = this;
    function o(a, u, s) {
      const l = Yt(u);
      if (!l)
        throw new Error("header name must be a non-empty string");
      const f = y.findKey(n, l);
      (!f || n[f] === void 0 || s === !0 || s === void 0 && n[f] !== !1) && (n[f || u] = he(a));
    }
    const i = (a, u) => y.forEach(a, (s, l) => o(s, l, u));
    return y.isPlainObject(t) || t instanceof this.constructor ? i(t, e) : y.isString(t) && (t = t.trim()) && !Qf(t) ? i(Jf(t), e) : t != null && o(e, t, r), this;
  }
  get(t, e) {
    if (t = Yt(t), t) {
      const r = y.findKey(this, t);
      if (r) {
        const n = this[r];
        if (!e)
          return n;
        if (e === !0)
          return Zf(n);
        if (y.isFunction(e))
          return e.call(this, n, r);
        if (y.isRegExp(e))
          return e.exec(n);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, e) {
    if (t = Yt(t), t) {
      const r = y.findKey(this, t);
      return !!(r && (!e || qn(this, this[r], r, e)));
    }
    return !1;
  }
  delete(t, e) {
    const r = this;
    let n = !1;
    function o(i) {
      if (i = Yt(i), i) {
        const a = y.findKey(r, i);
        a && (!e || qn(r, r[a], a, e)) && (delete r[a], n = !0);
      }
    }
    return y.isArray(t) ? t.forEach(o) : o(t), n;
  }
  clear() {
    return Object.keys(this).forEach(this.delete.bind(this));
  }
  normalize(t) {
    const e = this, r = {};
    return y.forEach(this, (n, o) => {
      const i = y.findKey(r, o);
      if (i) {
        e[i] = he(n), delete e[o];
        return;
      }
      const a = t ? Xf(o) : String(o).trim();
      a !== o && delete e[o], e[a] = he(n), r[a] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const e = /* @__PURE__ */ Object.create(null);
    return y.forEach(this, (r, n) => {
      r != null && r !== !1 && (e[n] = t && y.isArray(r) ? r.join(", ") : r);
    }), e;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, e]) => t + ": " + e).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...e) {
    const r = new this(t);
    return e.forEach((n) => r.set(n)), r;
  }
  static accessor(t) {
    const e = (this[Yn] = this[Yn] = {
      accessors: {}
    }).accessors, r = this.prototype;
    function n(o) {
      const i = Yt(o);
      e[i] || (tp(r, o), e[i] = !0);
    }
    return y.isArray(t) ? t.forEach(n) : n(t), this;
  }
};
Le.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent"]);
y.freezeMethods(Le.prototype);
y.freezeMethods(Le);
const bt = Le;
function Ke(t, e) {
  const r = this || Br, n = e || r, o = bt.from(n.headers);
  let i = n.data;
  return y.forEach(t, function(a) {
    i = a.call(r, i, o.normalize(), e ? e.status : void 0);
  }), o.normalize(), i;
}
function ui(t) {
  return !!(t && t.__CANCEL__);
}
function ie(t, e, r) {
  F.call(this, t ?? "canceled", F.ERR_CANCELED, e, r), this.name = "CanceledError";
}
y.inherits(ie, F, {
  __CANCEL__: !0
});
const ep = null;
function rp(t, e, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? t(r) : e(new F(
    "Request failed with status code " + r.status,
    [F.ERR_BAD_REQUEST, F.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
    r.config,
    r.request,
    r
  ));
}
const np = pt.isStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  function() {
    return {
      write: function(t, e, r, n, o, i) {
        const a = [];
        a.push(t + "=" + encodeURIComponent(e)), y.isNumber(r) && a.push("expires=" + new Date(r).toGMTString()), y.isString(n) && a.push("path=" + n), y.isString(o) && a.push("domain=" + o), i === !0 && a.push("secure"), document.cookie = a.join("; ");
      },
      read: function(t) {
        const e = document.cookie.match(new RegExp("(^|;\\s*)(" + t + ")=([^;]*)"));
        return e ? decodeURIComponent(e[3]) : null;
      },
      remove: function(t) {
        this.write(t, "", Date.now() - 864e5);
      }
    };
  }()
) : (
  // Non standard browser env (web workers, react-native) lack needed support.
  function() {
    return {
      write: function() {
      },
      read: function() {
        return null;
      },
      remove: function() {
      }
    };
  }()
);
function op(t) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
}
function ip(t, e) {
  return e ? t.replace(/\/+$/, "") + "/" + e.replace(/^\/+/, "") : t;
}
function ci(t, e) {
  return t && !op(e) ? ip(t, e) : e;
}
const ap = pt.isStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const t = /(msie|trident)/i.test(navigator.userAgent), e = document.createElement("a");
    let r;
    function n(o) {
      let i = o;
      return t && (e.setAttribute("href", i), i = e.href), e.setAttribute("href", i), {
        href: e.href,
        protocol: e.protocol ? e.protocol.replace(/:$/, "") : "",
        host: e.host,
        search: e.search ? e.search.replace(/^\?/, "") : "",
        hash: e.hash ? e.hash.replace(/^#/, "") : "",
        hostname: e.hostname,
        port: e.port,
        pathname: e.pathname.charAt(0) === "/" ? e.pathname : "/" + e.pathname
      };
    }
    return r = n(window.location.href), function(o) {
      const i = y.isString(o) ? n(o) : o;
      return i.protocol === r.protocol && i.host === r.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  function() {
    return function() {
      return !0;
    };
  }()
);
function sp(t) {
  const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
  return e && e[1] || "";
}
function up(t, e) {
  t = t || 10;
  const r = new Array(t), n = new Array(t);
  let o = 0, i = 0, a;
  return e = e !== void 0 ? e : 1e3, function(u) {
    const s = Date.now(), l = n[i];
    a || (a = s), r[o] = u, n[o] = s;
    let f = i, h = 0;
    for (; f !== o; )
      h += r[f++], f = f % t;
    if (o = (o + 1) % t, o === i && (i = (i + 1) % t), s - a < e)
      return;
    const d = l && s - l;
    return d ? Math.round(h * 1e3 / d) : void 0;
  };
}
function Gn(t, e) {
  let r = 0;
  const n = up(50, 250);
  return (o) => {
    const i = o.loaded, a = o.lengthComputable ? o.total : void 0, u = i - r, s = n(u), l = i <= a;
    r = i;
    const f = {
      loaded: i,
      total: a,
      progress: a ? i / a : void 0,
      bytes: u,
      rate: s || void 0,
      estimated: s && a && l ? (a - i) / s : void 0,
      event: o
    };
    f[e ? "download" : "upload"] = !0, t(f);
  };
}
const cp = typeof XMLHttpRequest < "u", lp = cp && function(t) {
  return new Promise(function(e, r) {
    let n = t.data;
    const o = bt.from(t.headers).normalize(), i = t.responseType;
    let a;
    function u() {
      t.cancelToken && t.cancelToken.unsubscribe(a), t.signal && t.signal.removeEventListener("abort", a);
    }
    y.isFormData(n) && (pt.isStandardBrowserEnv || pt.isStandardBrowserWebWorkerEnv) && o.setContentType(!1);
    let s = new XMLHttpRequest();
    if (t.auth) {
      const d = t.auth.username || "", p = t.auth.password ? unescape(encodeURIComponent(t.auth.password)) : "";
      o.set("Authorization", "Basic " + btoa(d + ":" + p));
    }
    const l = ci(t.baseURL, t.url);
    s.open(t.method.toUpperCase(), ii(l, t.params, t.paramsSerializer), !0), s.timeout = t.timeout;
    function f() {
      if (!s)
        return;
      const d = bt.from(
        "getAllResponseHeaders" in s && s.getAllResponseHeaders()
      ), p = {
        data: !i || i === "text" || i === "json" ? s.responseText : s.response,
        status: s.status,
        statusText: s.statusText,
        headers: d,
        config: t,
        request: s
      };
      rp(function(m) {
        e(m), u();
      }, function(m) {
        r(m), u();
      }, p), s = null;
    }
    if ("onloadend" in s ? s.onloadend = f : s.onreadystatechange = function() {
      !s || s.readyState !== 4 || s.status === 0 && !(s.responseURL && s.responseURL.indexOf("file:") === 0) || setTimeout(f);
    }, s.onabort = function() {
      s && (r(new F("Request aborted", F.ECONNABORTED, t, s)), s = null);
    }, s.onerror = function() {
      r(new F("Network Error", F.ERR_NETWORK, t, s)), s = null;
    }, s.ontimeout = function() {
      let d = t.timeout ? "timeout of " + t.timeout + "ms exceeded" : "timeout exceeded";
      const p = t.transitional || ai;
      t.timeoutErrorMessage && (d = t.timeoutErrorMessage), r(new F(
        d,
        p.clarifyTimeoutError ? F.ETIMEDOUT : F.ECONNABORTED,
        t,
        s
      )), s = null;
    }, pt.isStandardBrowserEnv) {
      const d = (t.withCredentials || ap(l)) && t.xsrfCookieName && np.read(t.xsrfCookieName);
      d && o.set(t.xsrfHeaderName, d);
    }
    n === void 0 && o.setContentType(null), "setRequestHeader" in s && y.forEach(o.toJSON(), function(d, p) {
      s.setRequestHeader(p, d);
    }), y.isUndefined(t.withCredentials) || (s.withCredentials = !!t.withCredentials), i && i !== "json" && (s.responseType = t.responseType), typeof t.onDownloadProgress == "function" && s.addEventListener("progress", Gn(t.onDownloadProgress, !0)), typeof t.onUploadProgress == "function" && s.upload && s.upload.addEventListener("progress", Gn(t.onUploadProgress)), (t.cancelToken || t.signal) && (a = (d) => {
      s && (r(!d || d.type ? new ie(null, t, s) : d), s.abort(), s = null);
    }, t.cancelToken && t.cancelToken.subscribe(a), t.signal && (t.signal.aborted ? a() : t.signal.addEventListener("abort", a)));
    const h = sp(l);
    if (h && pt.protocols.indexOf(h) === -1) {
      r(new F("Unsupported protocol " + h + ":", F.ERR_BAD_REQUEST, t));
      return;
    }
    s.send(n || null);
  });
}, ve = {
  http: ep,
  xhr: lp
};
y.forEach(ve, (t, e) => {
  if (t) {
    try {
      Object.defineProperty(t, "name", { value: e });
    } catch {
    }
    Object.defineProperty(t, "adapterName", { value: e });
  }
});
const fp = {
  getAdapter: (t) => {
    t = y.isArray(t) ? t : [t];
    const { length: e } = t;
    let r, n;
    for (let o = 0; o < e && (r = t[o], !(n = y.isString(r) ? ve[r.toLowerCase()] : r)); o++)
      ;
    if (!n)
      throw n === !1 ? new F(
        `Adapter ${r} is not supported by the environment`,
        "ERR_NOT_SUPPORT"
      ) : new Error(
        y.hasOwnProp(ve, r) ? `Adapter '${r}' is not available in the build` : `Unknown adapter '${r}'`
      );
    if (!y.isFunction(n))
      throw new TypeError("adapter is not a function");
    return n;
  },
  adapters: ve
};
function Je(t) {
  if (t.cancelToken && t.cancelToken.throwIfRequested(), t.signal && t.signal.aborted)
    throw new ie(null, t);
}
function Kn(t) {
  return Je(t), t.headers = bt.from(t.headers), t.data = Ke.call(
    t,
    t.transformRequest
  ), ["post", "put", "patch"].indexOf(t.method) !== -1 && t.headers.setContentType("application/x-www-form-urlencoded", !1), fp.getAdapter(t.adapter || Br.adapter)(t).then(function(e) {
    return Je(t), e.data = Ke.call(
      t,
      t.transformResponse,
      e
    ), e.headers = bt.from(e.headers), e;
  }, function(e) {
    return ui(e) || (Je(t), e && e.response && (e.response.data = Ke.call(
      t,
      t.transformResponse,
      e.response
    ), e.response.headers = bt.from(e.response.headers))), Promise.reject(e);
  });
}
const Jn = (t) => t instanceof bt ? t.toJSON() : t;
function zt(t, e) {
  e = e || {};
  const r = {};
  function n(l, f, h) {
    return y.isPlainObject(l) && y.isPlainObject(f) ? y.merge.call({ caseless: h }, l, f) : y.isPlainObject(f) ? y.merge({}, f) : y.isArray(f) ? f.slice() : f;
  }
  function o(l, f, h) {
    if (y.isUndefined(f)) {
      if (!y.isUndefined(l))
        return n(void 0, l, h);
    } else
      return n(l, f, h);
  }
  function i(l, f) {
    if (!y.isUndefined(f))
      return n(void 0, f);
  }
  function a(l, f) {
    if (y.isUndefined(f)) {
      if (!y.isUndefined(l))
        return n(void 0, l);
    } else
      return n(void 0, f);
  }
  function u(l, f, h) {
    if (h in e)
      return n(l, f);
    if (h in t)
      return n(void 0, l);
  }
  const s = {
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
    validateStatus: u,
    headers: (l, f) => o(Jn(l), Jn(f), !0)
  };
  return y.forEach(Object.keys(t).concat(Object.keys(e)), function(l) {
    const f = s[l] || o, h = f(t[l], e[l], l);
    y.isUndefined(h) && f !== u || (r[l] = h);
  }), r;
}
const li = "1.2.1", Wr = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((t, e) => {
  Wr[t] = function(r) {
    return typeof r === t || "a" + (e < 1 ? "n " : " ") + t;
  };
});
const Zn = {};
Wr.transitional = function(t, e, r) {
  function n(o, i) {
    return "[Axios v" + li + "] Transitional option '" + o + "'" + i + (r ? ". " + r : "");
  }
  return (o, i, a) => {
    if (t === !1)
      throw new F(
        n(i, " has been removed" + (e ? " in " + e : "")),
        F.ERR_DEPRECATED
      );
    return e && !Zn[i] && (Zn[i] = !0, console.warn(
      n(
        i,
        " has been deprecated since v" + e + " and will be removed in the near future"
      )
    )), t ? t(o, i, a) : !0;
  };
};
function pp(t, e, r) {
  if (typeof t != "object")
    throw new F("options must be an object", F.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(t);
  let o = n.length;
  for (; o-- > 0; ) {
    const i = n[o], a = e[i];
    if (a) {
      const u = t[i], s = u === void 0 || a(u, i, t);
      if (s !== !0)
        throw new F("option " + i + " must be " + s, F.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0)
      throw new F("Unknown option " + i, F.ERR_BAD_OPTION);
  }
}
const hr = {
  assertOptions: pp,
  validators: Wr
}, St = hr.validators;
let Se = class {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new Wn(),
      response: new Wn()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  request(t, e) {
    typeof t == "string" ? (e = e || {}, e.url = t) : e = t || {}, e = zt(this.defaults, e);
    const { transitional: r, paramsSerializer: n, headers: o } = e;
    r !== void 0 && hr.assertOptions(r, {
      silentJSONParsing: St.transitional(St.boolean),
      forcedJSONParsing: St.transitional(St.boolean),
      clarifyTimeoutError: St.transitional(St.boolean)
    }, !1), n !== void 0 && hr.assertOptions(n, {
      encode: St.function,
      serialize: St.function
    }, !0), e.method = (e.method || this.defaults.method || "get").toLowerCase();
    let i;
    i = o && y.merge(
      o.common,
      o[e.method]
    ), i && y.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (p) => {
        delete o[p];
      }
    ), e.headers = bt.concat(i, o);
    const a = [];
    let u = !0;
    this.interceptors.request.forEach(function(p) {
      typeof p.runWhen == "function" && p.runWhen(e) === !1 || (u = u && p.synchronous, a.unshift(p.fulfilled, p.rejected));
    });
    const s = [];
    this.interceptors.response.forEach(function(p) {
      s.push(p.fulfilled, p.rejected);
    });
    let l, f = 0, h;
    if (!u) {
      const p = [Kn.bind(this), void 0];
      for (p.unshift.apply(p, a), p.push.apply(p, s), h = p.length, l = Promise.resolve(e); f < h; )
        l = l.then(p[f++], p[f++]);
      return l;
    }
    h = a.length;
    let d = e;
    for (f = 0; f < h; ) {
      const p = a[f++], m = a[f++];
      try {
        d = p(d);
      } catch (v) {
        m.call(this, v);
        break;
      }
    }
    try {
      l = Kn.call(this, d);
    } catch (p) {
      return Promise.reject(p);
    }
    for (f = 0, h = s.length; f < h; )
      l = l.then(s[f++], s[f++]);
    return l;
  }
  getUri(t) {
    t = zt(this.defaults, t);
    const e = ci(t.baseURL, t.url);
    return ii(e, t.params, t.paramsSerializer);
  }
};
y.forEach(["delete", "get", "head", "options"], function(t) {
  Se.prototype[t] = function(e, r) {
    return this.request(zt(r || {}, {
      method: t,
      url: e,
      data: (r || {}).data
    }));
  };
});
y.forEach(["post", "put", "patch"], function(t) {
  function e(r) {
    return function(n, o, i) {
      return this.request(zt(i || {}, {
        method: t,
        headers: r ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: n,
        data: o
      }));
    };
  }
  Se.prototype[t] = e(), Se.prototype[t + "Form"] = e(!0);
});
const ye = Se;
let dp = class fi {
  constructor(e) {
    if (typeof e != "function")
      throw new TypeError("executor must be a function.");
    let r;
    this.promise = new Promise(function(o) {
      r = o;
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
      const a = new Promise((u) => {
        n.subscribe(u), i = u;
      }).then(o);
      return a.cancel = function() {
        n.unsubscribe(i);
      }, a;
    }, e(function(o, i, a) {
      n.reason || (n.reason = new ie(o, i, a), r(n.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(e) {
    if (this.reason) {
      e(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(e) : this._listeners = [e];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(e) {
    if (!this._listeners)
      return;
    const r = this._listeners.indexOf(e);
    r !== -1 && this._listeners.splice(r, 1);
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let e;
    return {
      token: new fi(function(r) {
        e = r;
      }),
      cancel: e
    };
  }
};
const hp = dp;
function vp(t) {
  return function(e) {
    return t.apply(null, e);
  };
}
function yp(t) {
  return y.isObject(t) && t.isAxiosError === !0;
}
function pi(t) {
  const e = new ye(t), r = qo(ye.prototype.request, e);
  return y.extend(r, ye.prototype, e, { allOwnKeys: !0 }), y.extend(r, e, null, { allOwnKeys: !0 }), r.create = function(n) {
    return pi(zt(t, n));
  }, r;
}
const tt = pi(Br);
tt.Axios = ye;
tt.CanceledError = ie;
tt.CancelToken = hp;
tt.isCancel = ui;
tt.VERSION = li;
tt.toFormData = Pe;
tt.AxiosError = F;
tt.Cancel = tt.CanceledError;
tt.all = function(t) {
  return Promise.all(t);
};
tt.spread = vp;
tt.isAxiosError = yp;
tt.mergeConfig = zt;
tt.AxiosHeaders = bt;
tt.formToJSON = (t) => si(y.isHTMLForm(t) ? new FormData(t) : t);
tt.default = tt;
const mp = tt;
var vr = function(t, e) {
  return vr = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
    r.__proto__ = n;
  } || function(r, n) {
    for (var o in n)
      Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
  }, vr(t, e);
};
function Ue(t, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  vr(t, e);
  function r() {
    this.constructor = t;
  }
  t.prototype = e === null ? Object.create(e) : (r.prototype = e.prototype, new r());
}
function yr(t) {
  var e = typeof Symbol == "function" && Symbol.iterator, r = e && t[e], n = 0;
  if (r)
    return r.call(t);
  if (t && typeof t.length == "number")
    return {
      next: function() {
        return t && n >= t.length && (t = void 0), { value: t && t[n++], done: !t };
      }
    };
  throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function mr(t, e) {
  var r = typeof Symbol == "function" && t[Symbol.iterator];
  if (!r)
    return t;
  var n = r.call(t), o, i = [], a;
  try {
    for (; (e === void 0 || e-- > 0) && !(o = n.next()).done; )
      i.push(o.value);
  } catch (u) {
    a = { error: u };
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
function gr(t, e, r) {
  if (r || arguments.length === 2)
    for (var n = 0, o = e.length, i; n < o; n++)
      (i || !(n in e)) && (i || (i = Array.prototype.slice.call(e, 0, n)), i[n] = e[n]);
  return t.concat(i || Array.prototype.slice.call(e));
}
function Ot(t) {
  return typeof t == "function";
}
function Yr(t) {
  var e = function(n) {
    Error.call(n), n.stack = new Error().stack;
  }, r = t(e);
  return r.prototype = Object.create(Error.prototype), r.prototype.constructor = r, r;
}
var Ze = Yr(function(t) {
  return function(e) {
    t(this), this.message = e ? e.length + ` errors occurred during unsubscription:
` + e.map(function(r, n) {
      return n + 1 + ") " + r.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = e;
  };
});
function br(t, e) {
  if (t) {
    var r = t.indexOf(e);
    0 <= r && t.splice(r, 1);
  }
}
var Ie = function() {
  function t(e) {
    this.initialTeardown = e, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return t.prototype.unsubscribe = function() {
    var e, r, n, o, i;
    if (!this.closed) {
      this.closed = !0;
      var a = this._parentage;
      if (a)
        if (this._parentage = null, Array.isArray(a))
          try {
            for (var u = yr(a), s = u.next(); !s.done; s = u.next()) {
              var l = s.value;
              l.remove(this);
            }
          } catch (v) {
            e = { error: v };
          } finally {
            try {
              s && !s.done && (r = u.return) && r.call(u);
            } finally {
              if (e)
                throw e.error;
            }
          }
        else
          a.remove(this);
      var f = this.initialTeardown;
      if (Ot(f))
        try {
          f();
        } catch (v) {
          i = v instanceof Ze ? v.errors : [v];
        }
      var h = this._finalizers;
      if (h) {
        this._finalizers = null;
        try {
          for (var d = yr(h), p = d.next(); !p.done; p = d.next()) {
            var m = p.value;
            try {
              Qn(m);
            } catch (v) {
              i = i ?? [], v instanceof Ze ? i = gr(gr([], mr(i)), mr(v.errors)) : i.push(v);
            }
          }
        } catch (v) {
          n = { error: v };
        } finally {
          try {
            p && !p.done && (o = d.return) && o.call(d);
          } finally {
            if (n)
              throw n.error;
          }
        }
      }
      if (i)
        throw new Ze(i);
    }
  }, t.prototype.add = function(e) {
    var r;
    if (e && e !== this)
      if (this.closed)
        Qn(e);
      else {
        if (e instanceof t) {
          if (e.closed || e._hasParent(this))
            return;
          e._addParent(this);
        }
        (this._finalizers = (r = this._finalizers) !== null && r !== void 0 ? r : []).push(e);
      }
  }, t.prototype._hasParent = function(e) {
    var r = this._parentage;
    return r === e || Array.isArray(r) && r.includes(e);
  }, t.prototype._addParent = function(e) {
    var r = this._parentage;
    this._parentage = Array.isArray(r) ? (r.push(e), r) : r ? [r, e] : e;
  }, t.prototype._removeParent = function(e) {
    var r = this._parentage;
    r === e ? this._parentage = null : Array.isArray(r) && br(r, e);
  }, t.prototype.remove = function(e) {
    var r = this._finalizers;
    r && br(r, e), e instanceof t && e._removeParent(this);
  }, t.EMPTY = function() {
    var e = new t();
    return e.closed = !0, e;
  }(), t;
}(), di = Ie.EMPTY;
function hi(t) {
  return t instanceof Ie || t && "closed" in t && Ot(t.remove) && Ot(t.add) && Ot(t.unsubscribe);
}
function Qn(t) {
  Ot(t) ? t() : t.unsubscribe();
}
var vi = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1
}, gp = {
  setTimeout: function(t, e) {
    for (var r = [], n = 2; n < arguments.length; n++)
      r[n - 2] = arguments[n];
    return setTimeout.apply(void 0, gr([t, e], mr(r)));
  },
  clearTimeout: function(t) {
    return clearTimeout(t);
  },
  delegate: void 0
};
function bp(t) {
  gp.setTimeout(function() {
    throw t;
  });
}
function Xn() {
}
function me(t) {
  t();
}
var yi = function(t) {
  Ue(e, t);
  function e(r) {
    var n = t.call(this) || this;
    return n.isStopped = !1, r ? (n.destination = r, hi(r) && r.add(n)) : n.destination = _p, n;
  }
  return e.create = function(r, n, o) {
    return new Or(r, n, o);
  }, e.prototype.next = function(r) {
    this.isStopped || this._next(r);
  }, e.prototype.error = function(r) {
    this.isStopped || (this.isStopped = !0, this._error(r));
  }, e.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, e.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, t.prototype.unsubscribe.call(this), this.destination = null);
  }, e.prototype._next = function(r) {
    this.destination.next(r);
  }, e.prototype._error = function(r) {
    try {
      this.destination.error(r);
    } finally {
      this.unsubscribe();
    }
  }, e.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, e;
}(Ie), Op = Function.prototype.bind;
function Qe(t, e) {
  return Op.call(t, e);
}
var wp = function() {
  function t(e) {
    this.partialObserver = e;
  }
  return t.prototype.next = function(e) {
    var r = this.partialObserver;
    if (r.next)
      try {
        r.next(e);
      } catch (n) {
        fe(n);
      }
  }, t.prototype.error = function(e) {
    var r = this.partialObserver;
    if (r.error)
      try {
        r.error(e);
      } catch (n) {
        fe(n);
      }
    else
      fe(e);
  }, t.prototype.complete = function() {
    var e = this.partialObserver;
    if (e.complete)
      try {
        e.complete();
      } catch (r) {
        fe(r);
      }
  }, t;
}(), Or = function(t) {
  Ue(e, t);
  function e(r, n, o) {
    var i = t.call(this) || this, a;
    if (Ot(r) || !r)
      a = {
        next: r ?? void 0,
        error: n ?? void 0,
        complete: o ?? void 0
      };
    else {
      var u;
      i && vi.useDeprecatedNextContext ? (u = Object.create(r), u.unsubscribe = function() {
        return i.unsubscribe();
      }, a = {
        next: r.next && Qe(r.next, u),
        error: r.error && Qe(r.error, u),
        complete: r.complete && Qe(r.complete, u)
      }) : a = r;
    }
    return i.destination = new wp(a), i;
  }
  return e;
}(yi);
function fe(t) {
  bp(t);
}
function Ep(t) {
  throw t;
}
var _p = {
  closed: !0,
  next: Xn,
  error: Ep,
  complete: Xn
}, Sp = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function jp(t) {
  return t;
}
function xp(t) {
  return t.length === 0 ? jp : t.length === 1 ? t[0] : function(e) {
    return t.reduce(function(r, n) {
      return n(r);
    }, e);
  };
}
var wr = function() {
  function t(e) {
    e && (this._subscribe = e);
  }
  return t.prototype.lift = function(e) {
    var r = new t();
    return r.source = this, r.operator = e, r;
  }, t.prototype.subscribe = function(e, r, n) {
    var o = this, i = Rp(e) ? e : new Or(e, r, n);
    return me(function() {
      var a = o, u = a.operator, s = a.source;
      i.add(u ? u.call(i, s) : s ? o._subscribe(i) : o._trySubscribe(i));
    }), i;
  }, t.prototype._trySubscribe = function(e) {
    try {
      return this._subscribe(e);
    } catch (r) {
      e.error(r);
    }
  }, t.prototype.forEach = function(e, r) {
    var n = this;
    return r = to(r), new r(function(o, i) {
      var a = new Or({
        next: function(u) {
          try {
            e(u);
          } catch (s) {
            i(s), a.unsubscribe();
          }
        },
        error: i,
        complete: o
      });
      n.subscribe(a);
    });
  }, t.prototype._subscribe = function(e) {
    var r;
    return (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(e);
  }, t.prototype[Sp] = function() {
    return this;
  }, t.prototype.pipe = function() {
    for (var e = [], r = 0; r < arguments.length; r++)
      e[r] = arguments[r];
    return xp(e)(this);
  }, t.prototype.toPromise = function(e) {
    var r = this;
    return e = to(e), new e(function(n, o) {
      var i;
      r.subscribe(function(a) {
        return i = a;
      }, function(a) {
        return o(a);
      }, function() {
        return n(i);
      });
    });
  }, t.create = function(e) {
    return new t(e);
  }, t;
}();
function to(t) {
  var e;
  return (e = t ?? vi.Promise) !== null && e !== void 0 ? e : Promise;
}
function Ap(t) {
  return t && Ot(t.next) && Ot(t.error) && Ot(t.complete);
}
function Rp(t) {
  return t && t instanceof yi || Ap(t) && hi(t);
}
var Dp = Yr(function(t) {
  return function() {
    t(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), $p = function(t) {
  Ue(e, t);
  function e() {
    var r = t.call(this) || this;
    return r.closed = !1, r.currentObservers = null, r.observers = [], r.isStopped = !1, r.hasError = !1, r.thrownError = null, r;
  }
  return e.prototype.lift = function(r) {
    var n = new eo(this, this);
    return n.operator = r, n;
  }, e.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new Dp();
  }, e.prototype.next = function(r) {
    var n = this;
    me(function() {
      var o, i;
      if (n._throwIfClosed(), !n.isStopped) {
        n.currentObservers || (n.currentObservers = Array.from(n.observers));
        try {
          for (var a = yr(n.currentObservers), u = a.next(); !u.done; u = a.next()) {
            var s = u.value;
            s.next(r);
          }
        } catch (l) {
          o = { error: l };
        } finally {
          try {
            u && !u.done && (i = a.return) && i.call(a);
          } finally {
            if (o)
              throw o.error;
          }
        }
      }
    });
  }, e.prototype.error = function(r) {
    var n = this;
    me(function() {
      if (n._throwIfClosed(), !n.isStopped) {
        n.hasError = n.isStopped = !0, n.thrownError = r;
        for (var o = n.observers; o.length; )
          o.shift().error(r);
      }
    });
  }, e.prototype.complete = function() {
    var r = this;
    me(function() {
      if (r._throwIfClosed(), !r.isStopped) {
        r.isStopped = !0;
        for (var n = r.observers; n.length; )
          n.shift().complete();
      }
    });
  }, e.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(e.prototype, "observed", {
    get: function() {
      var r;
      return ((r = this.observers) === null || r === void 0 ? void 0 : r.length) > 0;
    },
    enumerable: !1,
    configurable: !0
  }), e.prototype._trySubscribe = function(r) {
    return this._throwIfClosed(), t.prototype._trySubscribe.call(this, r);
  }, e.prototype._subscribe = function(r) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(r), this._innerSubscribe(r);
  }, e.prototype._innerSubscribe = function(r) {
    var n = this, o = this, i = o.hasError, a = o.isStopped, u = o.observers;
    return i || a ? di : (this.currentObservers = null, u.push(r), new Ie(function() {
      n.currentObservers = null, br(u, r);
    }));
  }, e.prototype._checkFinalizedStatuses = function(r) {
    var n = this, o = n.hasError, i = n.thrownError, a = n.isStopped;
    o ? r.error(i) : a && r.complete();
  }, e.prototype.asObservable = function() {
    var r = new wr();
    return r.source = this, r;
  }, e.create = function(r, n) {
    return new eo(r, n);
  }, e;
}(wr), eo = function(t) {
  Ue(e, t);
  function e(r, n) {
    var o = t.call(this) || this;
    return o.destination = r, o.source = n, o;
  }
  return e.prototype.next = function(r) {
    var n, o;
    (o = (n = this.destination) === null || n === void 0 ? void 0 : n.next) === null || o === void 0 || o.call(n, r);
  }, e.prototype.error = function(r) {
    var n, o;
    (o = (n = this.destination) === null || n === void 0 ? void 0 : n.error) === null || o === void 0 || o.call(n, r);
  }, e.prototype.complete = function() {
    var r, n;
    (n = (r = this.destination) === null || r === void 0 ? void 0 : r.complete) === null || n === void 0 || n.call(r);
  }, e.prototype._subscribe = function(r) {
    var n, o;
    return (o = (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(r)) !== null && o !== void 0 ? o : di;
  }, e;
}($p);
Yr(function(t) {
  return function() {
    t(this), this.name = "EmptyError", this.message = "no elements in sequence";
  };
});
class qr {
  constructor(e) {
    et(this, "config"), et(this, "axios"), e && (this.config = e), this.axios = mp.create(this.config);
  }
  get interceptors() {
    return this.axios.interceptors;
  }
  static create(e) {
    return new qr(e);
  }
  request(e) {
    return new wr((r) => {
      const n = new AbortController();
      let o, i;
      return e.uploadProgressSubscriber && (o = (a) => {
        e.uploadProgressSubscriber && e.uploadProgressSubscriber.next(a);
      }), e.downloadProgressSubscriber && (i = (a) => {
        e.downloadProgressSubscriber && e.downloadProgressSubscriber.next(a);
      }), this.axios.request({
        ...e,
        onUploadProgress: o,
        onDownloadProgress: i,
        signal: n.signal
      }).then((a) => {
        r.next(a), r.complete(), e.uploadProgressSubscriber && e.uploadProgressSubscriber.complete(), e.downloadProgressSubscriber && e.downloadProgressSubscriber.complete();
      }).catch((a) => {
        r.error(a), e.uploadProgressSubscriber && e.uploadProgressSubscriber.error(a);
      }), () => {
        n.abort();
      };
    });
  }
  get(e, r) {
    return this.request({
      url: e,
      method: "GET",
      ...r
    });
  }
  delete(e, r) {
    return this.request({
      url: e,
      method: "DELETE",
      ...r
    });
  }
  post(e, r, n) {
    return this.request({
      url: e,
      data: r,
      method: "POST",
      ...n
    });
  }
  put(e, r, n) {
    return this.request({
      url: e,
      data: r,
      method: "PUT",
      ...n
    });
  }
  patch(e, r, n) {
    return this.request({
      url: e,
      data: r,
      method: "PATCH",
      ...n
    });
  }
}
function Np(t) {
  return qr.create({
    baseURL: t
  });
}
const Mt = class X {
  constructor(e, r) {
    et(this, "axiosInstance"), et(this, "defaultConfig", {
      contentType: "json",
      cache: !1
    }), et(this, "tokenType"), this.axiosInstance = Np(e), this.setupInterceptor(), r && (this.defaultConfig = {
      ...this.defaultConfig,
      ...r
    });
  }
  static setAuthorizationTokenType(e) {
    X.tokenType = e;
  }
  static setGlobalParams(e) {
    X.globalParams = {
      ...X.globalParams,
      ...e
    };
  }
  static setGlobalData(e) {
    X.globalData = {
      ...X.globalData,
      ...e
    };
  }
  static setGlobalHeaders(e) {
    X.globalHeaders = {
      ...X.globalHeaders,
      ...e
    };
  }
  static addInterceptor(e) {
    return X.interceptors.add(e), () => {
      X.removeInterceptor(e);
    };
  }
  static removeInterceptor(e) {
    X.interceptors.delete(e);
  }
  setAuthorizationTokenType(e) {
    this.tokenType = e;
  }
  getTokenType(e) {
    return e.tokenType !== void 0 ? e.tokenType : this.tokenType !== void 0 ? this.tokenType : X.tokenType;
  }
  /**
   * Set up interceptors
   */
  setupInterceptor() {
    this.axiosInstance.interceptors.request.use(
      async (e) => {
        if (e = await this.useRequestInterceptors(e), e = Fl({}, this.defaultConfig, e), e.headers = {
          ...e.headers,
          ...X.globalHeaders,
          "Content-Type": e.contentType === "formData" ? !1 : e.contentType === "urlEncoded" ? cr.UrlEncoded : cr.Json
        }, !e.preparedData) {
          if ((typeof e.cache < "u" ? e.cache : this.defaultConfig.cache) === !1 && (e.headers["Cache-Control"] = "no-cache", e.params = {
            ...e.params,
            axios_timestamp: Date.now()
          }), e.params = _e(
            Fn({
              ...e.params,
              ...X.globalParams
            })
          ), e.data = {
            ...e.data,
            ...X.globalData
          }, Fn(e.data), JSON.stringify(e.data) === "{}")
            e.data = void 0;
          else
            switch (e.contentType) {
              case "formData":
                e.data = lr(e.data);
                break;
              case "urlEncoded":
                e.data = _e(e.data);
            }
          e.preparedData = !0;
        }
        const r = this.getTokenType(e), n = r ? Kl.getToken(r) : null;
        return n && (e.headers.Authorization = "Bearer " + n), e;
      },
      (e) => {
        console.log(e);
      }
    ), this.axiosInstance.interceptors.response.use(
      (e) => this.useSuccessResponseInterceptor(e),
      async (e) => {
        const r = await this.useErrorResponseInterceptor(e);
        return r instanceof Error ? Promise.reject(r) : r;
      }
    );
  }
  async useRequestInterceptors(e) {
    for (const r of X.interceptors)
      r.request && (e = await r.request(e));
    return e;
  }
  async useErrorResponseInterceptor(e) {
    for (const r of X.interceptors)
      if (r.response && r.response.error)
        try {
          e = await r.response.error(e, this.axiosInstance);
        } catch {
          return e;
        }
    return e;
  }
  async useSuccessResponseInterceptor(e) {
    for (const r of X.interceptors)
      r.response && r.response.success && (e = await r.response.success(e));
    return e;
  }
  /**
   * End setup interceptors
   */
  request(e) {
    return this.axiosInstance.request(e);
  }
  post(e, r, n) {
    return this.axiosInstance.post(e, r, n);
  }
  put(e, r, n) {
    return this.axiosInstance.put(e, r, n);
  }
  patch(e, r, n) {
    return this.axiosInstance.patch(e, r, n);
  }
  get(e, r, n) {
    return this.axiosInstance.get(e, {
      ...n,
      params: r
    });
  }
  delete(e, r, n) {
    return this.axiosInstance.delete(e, {
      ...n,
      params: r
    });
  }
};
et(Mt, "tokenType", "base_token"), // Params
et(Mt, "globalParams", {}), // Body data
et(Mt, "globalData", {}), // Headers
et(Mt, "globalHeaders", {}), // Interceptors
et(Mt, "interceptors", /* @__PURE__ */ new Set());
let Tp = Mt;
var Er = { exports: {} }, It = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Xe, ro;
function mi() {
  if (ro)
    return Xe;
  ro = 1;
  var t = Object.getOwnPropertySymbols, e = Object.prototype.hasOwnProperty, r = Object.prototype.propertyIsEnumerable;
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
      for (var a = {}, u = 0; u < 10; u++)
        a["_" + String.fromCharCode(u)] = u;
      var s = Object.getOwnPropertyNames(a).map(function(f) {
        return a[f];
      });
      if (s.join("") !== "0123456789")
        return !1;
      var l = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(f) {
        l[f] = f;
      }), Object.keys(Object.assign({}, l)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Xe = o() ? Object.assign : function(i, a) {
    for (var u, s = n(i), l, f = 1; f < arguments.length; f++) {
      u = Object(arguments[f]);
      for (var h in u)
        e.call(u, h) && (s[h] = u[h]);
      if (t) {
        l = t(u);
        for (var d = 0; d < l.length; d++)
          r.call(u, l[d]) && (s[l[d]] = u[l[d]]);
      }
    }
    return s;
  }, Xe;
}
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var no;
function Cp() {
  if (no)
    return It;
  no = 1, mi();
  var t = Qt, e = 60103;
  if (It.Fragment = 60107, typeof Symbol == "function" && Symbol.for) {
    var r = Symbol.for;
    e = r("react.element"), It.Fragment = r("react.fragment");
  }
  var n = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = Object.prototype.hasOwnProperty, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function a(u, s, l) {
    var f, h = {}, d = null, p = null;
    l !== void 0 && (d = "" + l), s.key !== void 0 && (d = "" + s.key), s.ref !== void 0 && (p = s.ref);
    for (f in s)
      o.call(s, f) && !i.hasOwnProperty(f) && (h[f] = s[f]);
    if (u && u.defaultProps)
      for (f in s = u.defaultProps, s)
        h[f] === void 0 && (h[f] = s[f]);
    return { $$typeof: e, type: u, key: d, ref: p, props: h, _owner: n.current };
  }
  return It.jsx = a, It.jsxs = a, It;
}
var oo = {};
/** @license React v17.0.2
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var io;
function Pp() {
  return io || (io = 1, function(t) {
    process.env.NODE_ENV !== "production" && function() {
      var e = Qt, r = mi(), n = 60103, o = 60106;
      t.Fragment = 60107;
      var i = 60108, a = 60114, u = 60109, s = 60110, l = 60112, f = 60113, h = 60120, d = 60115, p = 60116, m = 60121, v = 60122, w = 60117, A = 60129, R = 60131;
      if (typeof Symbol == "function" && Symbol.for) {
        var S = Symbol.for;
        n = S("react.element"), o = S("react.portal"), t.Fragment = S("react.fragment"), i = S("react.strict_mode"), a = S("react.profiler"), u = S("react.provider"), s = S("react.context"), l = S("react.forward_ref"), f = S("react.suspense"), h = S("react.suspense_list"), d = S("react.memo"), p = S("react.lazy"), m = S("react.block"), v = S("react.server.block"), w = S("react.fundamental"), S("react.scope"), S("react.opaque.id"), A = S("react.debug_trace_mode"), S("react.offscreen"), R = S("react.legacy_hidden");
      }
      var j = typeof Symbol == "function" && Symbol.iterator, x = "@@iterator";
      function P(c) {
        if (c === null || typeof c != "object")
          return null;
        var g = j && c[j] || c[x];
        return typeof g == "function" ? g : null;
      }
      var H = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function I(c) {
        {
          for (var g = arguments.length, E = new Array(g > 1 ? g - 1 : 0), D = 1; D < g; D++)
            E[D - 1] = arguments[D];
          k("error", c, E);
        }
      }
      function k(c, g, E) {
        {
          var D = H.ReactDebugCurrentFrame, B = D.getStackAddendum();
          B !== "" && (g += "%s", E = E.concat([B]));
          var W = E.map(function(V) {
            return "" + V;
          });
          W.unshift("Warning: " + g), Function.prototype.apply.call(console[c], console, W);
        }
      }
      var L = !1;
      function st(c) {
        return !!(typeof c == "string" || typeof c == "function" || c === t.Fragment || c === a || c === A || c === i || c === f || c === h || c === R || L || typeof c == "object" && c !== null && (c.$$typeof === p || c.$$typeof === d || c.$$typeof === u || c.$$typeof === s || c.$$typeof === l || c.$$typeof === w || c.$$typeof === m || c[0] === v));
      }
      function ae(c, g, E) {
        var D = g.displayName || g.name || "";
        return c.displayName || (D !== "" ? E + "(" + D + ")" : E);
      }
      function $(c) {
        return c.displayName || "Context";
      }
      function O(c) {
        if (c == null)
          return null;
        if (typeof c.tag == "number" && I("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue."), typeof c == "function")
          return c.displayName || c.name || null;
        if (typeof c == "string")
          return c;
        switch (c) {
          case t.Fragment:
            return "Fragment";
          case o:
            return "Portal";
          case a:
            return "Profiler";
          case i:
            return "StrictMode";
          case f:
            return "Suspense";
          case h:
            return "SuspenseList";
        }
        if (typeof c == "object")
          switch (c.$$typeof) {
            case s:
              var g = c;
              return $(g) + ".Consumer";
            case u:
              var E = c;
              return $(E._context) + ".Provider";
            case l:
              return ae(c, c.render, "ForwardRef");
            case d:
              return O(c.type);
            case m:
              return O(c._render);
            case p: {
              var D = c, B = D._payload, W = D._init;
              try {
                return O(W(B));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var b = 0, N, _, C, T, z, G, Y;
      function Z() {
      }
      Z.__reactDisabledLog = !0;
      function ft() {
        {
          if (b === 0) {
            N = console.log, _ = console.info, C = console.warn, T = console.error, z = console.group, G = console.groupCollapsed, Y = console.groupEnd;
            var c = {
              configurable: !0,
              enumerable: !0,
              value: Z,
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
          b++;
        }
      }
      function ut() {
        {
          if (b--, b === 0) {
            var c = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: r({}, c, {
                value: N
              }),
              info: r({}, c, {
                value: _
              }),
              warn: r({}, c, {
                value: C
              }),
              error: r({}, c, {
                value: T
              }),
              group: r({}, c, {
                value: z
              }),
              groupCollapsed: r({}, c, {
                value: G
              }),
              groupEnd: r({}, c, {
                value: Y
              })
            });
          }
          b < 0 && I("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var vt = H.ReactCurrentDispatcher, yt;
      function ct(c, g, E) {
        {
          if (yt === void 0)
            try {
              throw Error();
            } catch (B) {
              var D = B.stack.trim().match(/\n( *(at )?)/);
              yt = D && D[1] || "";
            }
          return `
` + yt + c;
        }
      }
      var Q = !1, ot;
      {
        var Ht = typeof WeakMap == "function" ? WeakMap : Map;
        ot = new Ht();
      }
      function Rt(c, g) {
        if (!c || Q)
          return "";
        {
          var E = ot.get(c);
          if (E !== void 0)
            return E;
        }
        var D;
        Q = !0;
        var B = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var W;
        W = vt.current, vt.current = null, ft();
        try {
          if (g) {
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
              } catch (gt) {
                D = gt;
              }
              Reflect.construct(c, [], V);
            } else {
              try {
                V.call();
              } catch (gt) {
                D = gt;
              }
              c.call(V.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (gt) {
              D = gt;
            }
            c();
          }
        } catch (gt) {
          if (gt && D && typeof gt.stack == "string") {
            for (var M = gt.stack.split(`
`), rt = D.stack.split(`
`), K = M.length - 1, J = rt.length - 1; K >= 1 && J >= 0 && M[K] !== rt[J]; )
              J--;
            for (; K >= 1 && J >= 0; K--, J--)
              if (M[K] !== rt[J]) {
                if (K !== 1 || J !== 1)
                  do
                    if (K--, J--, J < 0 || M[K] !== rt[J]) {
                      var mt = `
` + M[K].replace(" at new ", " at ");
                      return typeof c == "function" && ot.set(c, mt), mt;
                    }
                  while (K >= 1 && J >= 0);
                break;
              }
          }
        } finally {
          Q = !1, vt.current = W, ut(), Error.prepareStackTrace = B;
        }
        var Ut = c ? c.displayName || c.name : "", sn = Ut ? ct(Ut) : "";
        return typeof c == "function" && ot.set(c, sn), sn;
      }
      function Kr(c, g, E) {
        return Rt(c, !1);
      }
      function bi(c) {
        var g = c.prototype;
        return !!(g && g.isReactComponent);
      }
      function se(c, g, E) {
        if (c == null)
          return "";
        if (typeof c == "function")
          return Rt(c, bi(c));
        if (typeof c == "string")
          return ct(c);
        switch (c) {
          case f:
            return ct("Suspense");
          case h:
            return ct("SuspenseList");
        }
        if (typeof c == "object")
          switch (c.$$typeof) {
            case l:
              return Kr(c.render);
            case d:
              return se(c.type, g, E);
            case m:
              return Kr(c._render);
            case p: {
              var D = c, B = D._payload, W = D._init;
              try {
                return se(W(B), g, E);
              } catch {
              }
            }
          }
        return "";
      }
      var Jr = {}, Zr = H.ReactDebugCurrentFrame;
      function ue(c) {
        if (c) {
          var g = c._owner, E = se(c.type, c._source, g ? g.type : null);
          Zr.setExtraStackFrame(E);
        } else
          Zr.setExtraStackFrame(null);
      }
      function Oi(c, g, E, D, B) {
        {
          var W = Function.call.bind(Object.prototype.hasOwnProperty);
          for (var V in c)
            if (W(c, V)) {
              var M = void 0;
              try {
                if (typeof c[V] != "function") {
                  var rt = Error((D || "React class") + ": " + E + " type `" + V + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof c[V] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw rt.name = "Invariant Violation", rt;
                }
                M = c[V](g, V, D, E, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (K) {
                M = K;
              }
              M && !(M instanceof Error) && (ue(B), I("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", D || "React class", E, V, typeof M), ue(null)), M instanceof Error && !(M.message in Jr) && (Jr[M.message] = !0, ue(B), I("Failed %s type: %s", E, M.message), ue(null));
            }
        }
      }
      var Bt = H.ReactCurrentOwner, Me = Object.prototype.hasOwnProperty, wi = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, Qr, Xr, Fe;
      Fe = {};
      function Ei(c) {
        if (Me.call(c, "ref")) {
          var g = Object.getOwnPropertyDescriptor(c, "ref").get;
          if (g && g.isReactWarning)
            return !1;
        }
        return c.ref !== void 0;
      }
      function _i(c) {
        if (Me.call(c, "key")) {
          var g = Object.getOwnPropertyDescriptor(c, "key").get;
          if (g && g.isReactWarning)
            return !1;
        }
        return c.key !== void 0;
      }
      function Si(c, g) {
        if (typeof c.ref == "string" && Bt.current && g && Bt.current.stateNode !== g) {
          var E = O(Bt.current.type);
          Fe[E] || (I('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', O(Bt.current.type), c.ref), Fe[E] = !0);
        }
      }
      function ji(c, g) {
        {
          var E = function() {
            Qr || (Qr = !0, I("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", g));
          };
          E.isReactWarning = !0, Object.defineProperty(c, "key", {
            get: E,
            configurable: !0
          });
        }
      }
      function xi(c, g) {
        {
          var E = function() {
            Xr || (Xr = !0, I("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", g));
          };
          E.isReactWarning = !0, Object.defineProperty(c, "ref", {
            get: E,
            configurable: !0
          });
        }
      }
      var Ai = function(c, g, E, D, B, W, V) {
        var M = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: n,
          // Built-in properties that belong on the element
          type: c,
          key: g,
          ref: E,
          props: V,
          // Record the component responsible for creating this element.
          _owner: W
        };
        return M._store = {}, Object.defineProperty(M._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(M, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: D
        }), Object.defineProperty(M, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: B
        }), Object.freeze && (Object.freeze(M.props), Object.freeze(M)), M;
      };
      function Ri(c, g, E, D, B) {
        {
          var W, V = {}, M = null, rt = null;
          E !== void 0 && (M = "" + E), _i(g) && (M = "" + g.key), Ei(g) && (rt = g.ref, Si(g, B));
          for (W in g)
            Me.call(g, W) && !wi.hasOwnProperty(W) && (V[W] = g[W]);
          if (c && c.defaultProps) {
            var K = c.defaultProps;
            for (W in K)
              V[W] === void 0 && (V[W] = K[W]);
          }
          if (M || rt) {
            var J = typeof c == "function" ? c.displayName || c.name || "Unknown" : c;
            M && ji(V, J), rt && xi(V, J);
          }
          return Ai(c, M, rt, B, D, Bt.current, V);
        }
      }
      var ze = H.ReactCurrentOwner, tn = H.ReactDebugCurrentFrame;
      function Lt(c) {
        if (c) {
          var g = c._owner, E = se(c.type, c._source, g ? g.type : null);
          tn.setExtraStackFrame(E);
        } else
          tn.setExtraStackFrame(null);
      }
      var Ve;
      Ve = !1;
      function He(c) {
        return typeof c == "object" && c !== null && c.$$typeof === n;
      }
      function en() {
        {
          if (ze.current) {
            var c = O(ze.current.type);
            if (c)
              return `

Check the render method of \`` + c + "`.";
          }
          return "";
        }
      }
      function Di(c) {
        {
          if (c !== void 0) {
            var g = c.fileName.replace(/^.*[\\\/]/, ""), E = c.lineNumber;
            return `

Check your code at ` + g + ":" + E + ".";
          }
          return "";
        }
      }
      var rn = {};
      function $i(c) {
        {
          var g = en();
          if (!g) {
            var E = typeof c == "string" ? c : c.displayName || c.name;
            E && (g = `

Check the top-level render call using <` + E + ">.");
          }
          return g;
        }
      }
      function nn(c, g) {
        {
          if (!c._store || c._store.validated || c.key != null)
            return;
          c._store.validated = !0;
          var E = $i(g);
          if (rn[E])
            return;
          rn[E] = !0;
          var D = "";
          c && c._owner && c._owner !== ze.current && (D = " It was passed a child from " + O(c._owner.type) + "."), Lt(c), I('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', E, D), Lt(null);
        }
      }
      function on(c, g) {
        {
          if (typeof c != "object")
            return;
          if (Array.isArray(c))
            for (var E = 0; E < c.length; E++) {
              var D = c[E];
              He(D) && nn(D, g);
            }
          else if (He(c))
            c._store && (c._store.validated = !0);
          else if (c) {
            var B = P(c);
            if (typeof B == "function" && B !== c.entries)
              for (var W = B.call(c), V; !(V = W.next()).done; )
                He(V.value) && nn(V.value, g);
          }
        }
      }
      function Ni(c) {
        {
          var g = c.type;
          if (g == null || typeof g == "string")
            return;
          var E;
          if (typeof g == "function")
            E = g.propTypes;
          else if (typeof g == "object" && (g.$$typeof === l || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          g.$$typeof === d))
            E = g.propTypes;
          else
            return;
          if (E) {
            var D = O(g);
            Oi(E, c.props, "prop", D, c);
          } else if (g.PropTypes !== void 0 && !Ve) {
            Ve = !0;
            var B = O(g);
            I("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", B || "Unknown");
          }
          typeof g.getDefaultProps == "function" && !g.getDefaultProps.isReactClassApproved && I("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Ti(c) {
        {
          for (var g = Object.keys(c.props), E = 0; E < g.length; E++) {
            var D = g[E];
            if (D !== "children" && D !== "key") {
              Lt(c), I("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", D), Lt(null);
              break;
            }
          }
          c.ref !== null && (Lt(c), I("Invalid attribute `ref` supplied to `React.Fragment`."), Lt(null));
        }
      }
      function an(c, g, E, D, B, W) {
        {
          var V = st(c);
          if (!V) {
            var M = "";
            (c === void 0 || typeof c == "object" && c !== null && Object.keys(c).length === 0) && (M += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var rt = Di(B);
            rt ? M += rt : M += en();
            var K;
            c === null ? K = "null" : Array.isArray(c) ? K = "array" : c !== void 0 && c.$$typeof === n ? (K = "<" + (O(c.type) || "Unknown") + " />", M = " Did you accidentally export a JSX literal instead of a component?") : K = typeof c, I("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", K, M);
          }
          var J = Ri(c, g, E, B, W);
          if (J == null)
            return J;
          if (V) {
            var mt = g.children;
            if (mt !== void 0)
              if (D)
                if (Array.isArray(mt)) {
                  for (var Ut = 0; Ut < mt.length; Ut++)
                    on(mt[Ut], c);
                  Object.freeze && Object.freeze(mt);
                } else
                  I("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
              else
                on(mt, c);
          }
          return c === t.Fragment ? Ti(J) : Ni(J), J;
        }
      }
      function Ci(c, g, E) {
        return an(c, g, E, !0);
      }
      function Pi(c, g, E) {
        return an(c, g, E, !1);
      }
      var ki = Pi, Li = Ci;
      t.jsx = ki, t.jsxs = Li;
    }();
  }(oo)), oo;
}
process.env.NODE_ENV === "production" ? Er.exports = Cp() : Er.exports = Pp();
var Gr = Er.exports;
const gi = Gr.Fragment, ge = Gr.jsx;
Gr.jsxs;
var tr = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ao;
function kp() {
  if (ao)
    return tr;
  ao = 1;
  var t = Qt;
  function e(h, d) {
    return h === d && (h !== 0 || 1 / h === 1 / d) || h !== h && d !== d;
  }
  var r = typeof Object.is == "function" ? Object.is : e, n = t.useState, o = t.useEffect, i = t.useLayoutEffect, a = t.useDebugValue;
  function u(h, d) {
    var p = d(), m = n({ inst: { value: p, getSnapshot: d } }), v = m[0].inst, w = m[1];
    return i(function() {
      v.value = p, v.getSnapshot = d, s(v) && w({ inst: v });
    }, [h, p, d]), o(function() {
      return s(v) && w({ inst: v }), h(function() {
        s(v) && w({ inst: v });
      });
    }, [h]), a(p), p;
  }
  function s(h) {
    var d = h.getSnapshot;
    h = h.value;
    try {
      var p = d();
      return !r(h, p);
    } catch {
      return !0;
    }
  }
  function l(h, d) {
    return d();
  }
  var f = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? l : u;
  return tr.useSyncExternalStore = t.useSyncExternalStore !== void 0 ? t.useSyncExternalStore : f, tr;
}
var so = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var uo;
function Lp() {
  return uo || (uo = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var t = Qt, e = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function r(S) {
      {
        for (var j = arguments.length, x = new Array(j > 1 ? j - 1 : 0), P = 1; P < j; P++)
          x[P - 1] = arguments[P];
        n("error", S, x);
      }
    }
    function n(S, j, x) {
      {
        var P = e.ReactDebugCurrentFrame, H = P.getStackAddendum();
        H !== "" && (j += "%s", x = x.concat([H]));
        var I = x.map(function(k) {
          return String(k);
        });
        I.unshift("Warning: " + j), Function.prototype.apply.call(console[S], console, I);
      }
    }
    function o(S, j) {
      return S === j && (S !== 0 || 1 / S === 1 / j) || S !== S && j !== j;
    }
    var i = typeof Object.is == "function" ? Object.is : o, a = t.useState, u = t.useEffect, s = t.useLayoutEffect, l = t.useDebugValue, f = !1, h = !1;
    function d(S, j, x) {
      f || t.startTransition !== void 0 && (f = !0, r("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
      var P = j();
      if (!h) {
        var H = j();
        i(P, H) || (r("The result of getSnapshot should be cached to avoid an infinite loop"), h = !0);
      }
      var I = a({
        inst: {
          value: P,
          getSnapshot: j
        }
      }), k = I[0].inst, L = I[1];
      return s(function() {
        k.value = P, k.getSnapshot = j, p(k) && L({
          inst: k
        });
      }, [S, P, j]), u(function() {
        p(k) && L({
          inst: k
        });
        var st = function() {
          p(k) && L({
            inst: k
          });
        };
        return S(st);
      }, [S]), l(P), P;
    }
    function p(S) {
      var j = S.getSnapshot, x = S.value;
      try {
        var P = j();
        return !i(x, P);
      } catch {
        return !0;
      }
    }
    function m(S, j, x) {
      return j();
    }
    var v = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", w = !v, A = w ? m : d, R = t.useSyncExternalStore !== void 0 ? t.useSyncExternalStore : A;
    so.useSyncExternalStore = R, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), so;
}
process.env.NODE_ENV === "production" ? kp() : Lp();
const Up = () => !0;
class Ip extends ql {
  constructor() {
    super(...arguments), et(this, "middlewareHandler", Up), et(this, "_routes", []);
  }
  get routes() {
    return this._routes;
  }
  registerMiddleware(e) {
    this.middlewareHandler = (r, n) => {
      var o, i, a;
      return r.middleware ? typeof ((o = r.component) == null ? void 0 : o.middleware) == "string" ? e[(i = r.component) == null ? void 0 : i.middleware] && e[(a = r.component) == null ? void 0 : a.middleware](r, n) : typeof r.middleware == "string" ? e[r.middleware] && e[r.middleware](r, n) : r.middleware(r, n) : !0;
    };
  }
  canPassMiddleware(e, r) {
    var n;
    return (n = e.component) != null && n.middleware && typeof e.component.middleware == "function" ? e.component.middleware(e, r) : this.middlewareHandler(e, r);
  }
  addRoute(...e) {
    const r = Yl([...e, ...this._routes], "path");
    this._routes = r, this.trigger("routeChange", r);
  }
  removeRoute(e) {
    const r = this._routes.findIndex((n) => n.path === e);
    if (r > -1) {
      const n = [...this._routes];
      n.splice(r, 1), this._routes = n, this.trigger("routeChange", n);
    }
  }
}
new Ip();
co(
  void 0
);
co(void 0);
const Mp = Qt.createContext(void 0), Fp = (t) => {
  const e = Ui(Mp);
  if (!e)
    throw new Error("useAuthorization must be used in AuthorizationProvider");
  return {
    granted: Ii(() => t ? e.can(t) : !0, [t, e.can]),
    ...e
  };
};
lo(
  ({ permissions: t, children: e, guestView: r }) => {
    const { granted: n } = Fp(t);
    return typeof e == "function" ? e(n) : /* @__PURE__ */ ge(gi, { children: n ? e : r });
  }
);
function it(t, e) {
  return () => {
    const r = new Tp(t().baseURL, t());
    return Il(e, (n) => (...o) => n(r, ...o));
  };
}
const zp = ({
  route: { component: t, ...e }
}) => {
  var r;
  return /* @__PURE__ */ ge(gi, { children: (r = e.routes) != null && r.length && !e.element && !t ? /* @__PURE__ */ ge(ta, {}) : e.element || (t ? /* @__PURE__ */ ge(t, {}) : null) });
};
lo(zp);
class Vp {
  constructor() {
    this.apiUrl = "";
  }
  getApiUrl() {
    return this.apiUrl;
  }
  setApiUrl(e) {
    this.apiUrl = e;
  }
}
const at = new Vp(), od = it(
  () => ({
    baseURL: `${at.getApiUrl()}/api/v1/account`
  }),
  {
    agentSignUp(t, e) {
      return t.post("/sign-up", e);
    },
    shopifySignup(t, e) {
      return t.post("/shopify/sign-up", e);
    },
    agentSignIn(t, e) {
      return t.post("/sign-in", e);
    },
    shopifySignIn(t, e) {
      return t.post("/shopify/sign-in", e);
    },
    unlockAccount(t, e) {
      return t.post("/unlock", e);
    },
    forgotPasswordReset(t, e) {
      return t.post("/forgot-password-reset-code", e);
    },
    forgotPasswordResetWithToken(t, e) {
      return t.post("/forgot-password-reset", e);
    },
    refreshToken(t, e) {
      return t.post("/refresh-token", e);
    },
    signOut(t) {
      return t.get("/sign-out");
    },
    changePassword(t, e) {
      return t.post("/update-password", e);
    },
    userGet2FAStatus(t) {
      return t.get("/2fa-status");
    },
    checkPasswordResetToken(t, e) {
      return t.post("/check-password-reset-token", e);
    }
  }
);
var Hp = /* @__PURE__ */ ((t) => (t.INVITATION_EXISTS = "INVITATION_EXISTS", t.USER_IS_EXISTS = "USER_IS_EXISTS", t))(Hp || {}), Bp = /* @__PURE__ */ ((t) => (t.TOKEN_VALID = "TOKEN_VALID", t.TOKEN_INVALID = "TOKEN_INVALID", t.INVITATION_NOT_EXISTS = "INVITATION_NOT_EXISTS", t.USER_ACTIVE = "USER_ACTIVE", t))(Bp || {});
const id = it(
  () => ({
    baseURL: `${at.getApiUrl()}/api/v1/account/agent`
  }),
  {
    getList(t, e) {
      return t.get("", e);
    },
    getOne(t, e) {
      return t.get(`/${e}`);
    },
    create(t, e) {
      return t.post("", e);
    },
    update(t, e, r) {
      return t.put(`/${e}`, r);
    },
    delete(t, e) {
      return t.delete(`/${e}`);
    },
    activeNewAgent(t, e) {
      return t.put("/active-new-agent", e);
    },
    resendEmailInvitation(t, e) {
      return t.put("/resend-invitation", e);
    },
    deActiveAgent(t, e) {
      return t.put(`/deactive/${e}`, {});
    },
    reActiveAgent(t, e) {
      return t.put(`/reactive/${e}`, {});
    },
    checkTokenActiveNewAgent(t, e) {
      return t.post(
        "/check-active-new-agent-token",
        e
      );
    }
  }
);
var Wp = /* @__PURE__ */ ((t) => (t.Full = "24/7", t.Custom = "CUSTOM", t))(Wp || {}), Yp = /* @__PURE__ */ ((t) => (t.Monday = "MONDAY", t.Tuesday = "TUESDAY", t.Wednesday = "WEDNESDAY", t.Thursday = "THURSDAY", t.Friday = "FRIDAY", t.Saturday = "SATURDAY", t.Sunday = "SUNDAY", t))(Yp || {});
const ad = it(
  () => ({
    baseURL: `${at.getApiUrl()}/api/v1/customer`
  }),
  {
    getList(t, e) {
      return t.get("", e);
    },
    getOne(t, e) {
      return t.get(`/${e}`);
    },
    create(t, e) {
      return t.post("", e);
    },
    update(t, e, r) {
      return t.put(`/${e}`, r);
    },
    delete(t, e) {
      return t.delete("", {}, { data: e });
    },
    getListTicket(t, e, r) {
      return t.get(`/all-tickets/${e}`, r);
    },
    syncShopifyCustomers(t) {
      return t.post("/sync-from-shopify", {});
    },
    checkingSyncImportCustomer(t) {
      return t.get("/check-status-sync-or-import");
    },
    importCSV(t, e) {
      return t.post("/import-from-csv", e);
    }
  }
);
var qp = /* @__PURE__ */ ((t) => (t.Plain = "Plain", t.Login = "Login", t.MD5 = "CRAM - MD5", t))(qp || {}), Gp = /* @__PURE__ */ ((t) => (t.Both = "both", t.Incoming = "incoming", t.Outgoing = "outgoing", t))(Gp || {}), Kp = /* @__PURE__ */ ((t) => (t.CUSTOM = "CUSTOM", t.MOOSEDESK = "MOOSEDESK", t.FORWARD = "FORWARD", t))(Kp || {}), Jp = /* @__PURE__ */ ((t) => (t.XS = "xs", t.SM = "sm", t.MD = "md", t.LG = "lg", t.XL = "xl", t.XXL = "xxl", t))(Jp || {}), Zp = /* @__PURE__ */ ((t) => (t.GMAIL = "GMAIL", t.OUTLOOK = "OUTLOOK", t.OTHER = "OTHER", t.MOOSEDESK = "MOOSEDESK", t))(Zp || {});
const sd = it(
  () => ({
    baseURL: `${at.getApiUrl()}/api/v1/email-integration`
  }),
  {
    getEmailGoogleAuth(t, e) {
      return t.get("/google-auth", e);
    },
    getEmailMicrosoftAuth(t, e) {
      return t.get("/microsoft-auth", e);
    },
    getPrimaryEmail(t) {
      return t.get("/primary-email");
    },
    getListEmail(t, e) {
      return t.get("", e);
    },
    createEmailIntegration(t, e) {
      return t.post("", e);
    },
    getOneEmail(t, e) {
      return t.get(`/${e}`);
    },
    updateEmailIntegration(t, e, r) {
      return t.put(`/${e}`, r);
    },
    deleteEmailIntegration(t, e) {
      return t.delete(`/${e}`);
    },
    checkConnectionImap(t, e) {
      return t.post("/imap-check-connection", e);
    },
    checkConnectionSmtp(t, e) {
      return t.post("/smtp-check-connection", e);
    },
    verifyTypeMail(t, e) {
      return t.get(
        `/lookup-mx?email=${e}`
      );
    },
    verifyGoogleCode(t, e) {
      return t.get(
        `/google-confirmation-code?email=${e}`
      );
    },
    sendVerifyForwardEmail(t, e) {
      return t.get(
        `/send-fwd-verification-email?email=${e}`
      );
    },
    checkVerifyForwardEmail(t, e) {
      return t.get(
        `/check-fwd-verification-email?email=${e}`
      );
    },
    sendVerifyEmailSes(t, e) {
      return t.get(
        `/send-verification-sender-sg?email=${e}`
      );
    },
    checkVerifyEmailSes(t, e) {
      return t.get(
        `/check-verification-sender-sg?email=${e}`
      );
    },
    primaryEmail(t, e, r) {
      return t.post(`/primary-email/${e}`, r);
    },
    checkCurrentEmail(t) {
      return t.get(
        "/current-emails"
      );
    }
  }
), ud = it(
  () => ({
    baseURL: `${at.getApiUrl()}/api/v1/general/info`
  }),
  {
    get(t, e) {
      return t.get("", e);
    }
  }
), cd = it(
  () => ({
    baseURL: `${at.getApiUrl()}/api/v1/help-widget`
  }),
  {
    getList(t, e) {
      return t.get("", e);
    },
    getOne(t, e) {
      return t.get(`/${e}`);
    },
    create(t, e) {
      return t.post("", e);
    },
    update(t, e, r) {
      return t.put(`/${e}`, r);
    },
    delete(t, e) {
      return t.delete(`/${e}`);
    }
  }
), ld = it(
  () => ({
    baseURL: `${at.getApiUrl()}/api/v1/general/info`
  }),
  {
    getStore(t, e) {
      return t.get("", e);
    }
  }
), fd = it(
  () => ({
    baseURL: `${at.getApiUrl()}/api/v1/tour-guide`
  }),
  {
    updateTourGuide(t, e) {
      return t.post("", e);
    }
  }
), pd = it(
  () => ({
    baseURL: `${at.getApiUrl()}/api/v1/tag`
  }),
  {
    getList(t, e) {
      return t.get("", e);
    },
    getListTicket(t, e, r) {
      return t.get(`/view-tickets/${e}`, r);
    },
    getOne(t, e) {
      return t.get(`/${e}`);
    },
    create(t, e) {
      return t.post("", e);
    },
    update(t, e, r) {
      return t.put(`/${e}`, r);
    },
    delete(t, e) {
      return t.delete("", {}, { data: e });
    },
    deleteForce(t, e) {
      return t.delete(`/remove-from-all-tickets/${e}`);
    }
  }
);
var Qp = /* @__PURE__ */ ((t) => (t.URGENT = "URGENT", t.HIGH = "HIGH", t.MEDIUM = "MEDIUM", t.LOW = "LOW", t))(Qp || {}), Xp = /* @__PURE__ */ ((t) => (t.PENDING = "PENDING", t.OPEN = "OPEN", t.RESOLVED = "RESOLVED", t.NEW = "NEW", t))(Xp || {});
const dd = [
  {
    label: "Pending",
    value: "PENDING"
    /* PENDING */
  },
  {
    label: "Open",
    value: "OPEN"
    /* OPEN */
  },
  {
    label: "Resolved",
    value: "RESOLVED"
    /* RESOLVED */
  }
], hd = [
  {
    label: "Urgent",
    value: "URGENT"
    /* URGENT */
  },
  {
    label: "High",
    value: "HIGH"
    /* HIGH */
  },
  {
    label: "Medium",
    value: "MEDIUM"
    /* MEDIUM */
  },
  {
    label: "Low",
    value: "LOW"
    /* LOW */
  }
], vd = it(
  () => ({
    baseURL: `${at.getApiUrl()}/api/v1/ticket`
  }),
  {
    getList(t, e) {
      return t.get("", e);
    },
    getListFilter(t, e) {
      return t.get("/filters", e);
    },
    getListTrash(t, e) {
      return t.get("/trash", e);
    },
    getOne(t, e) {
      return t.get(`/${e}`);
    },
    getStatistic(t) {
      return t.get("/status-statistics");
    },
    getConversations(t, e) {
      return t.get(`/${e}/conversations`);
    },
    create(t, e) {
      return t.post("", e);
    },
    postReply(t, e) {
      return t.post(`/${e.id}/reply`, e);
    },
    postAttachment(t, e) {
      return t.post(
        "/attachments",
        { file: e },
        {
          contentType: "formData",
          data: { file: e }
        }
      );
    },
    update(t, e) {
      return t.put("", e);
    },
    delete(t, e) {
      return t.delete("", {}, { data: e });
    },
    restore(t, e) {
      return t.put("/restore", e);
    },
    deletePermanently(t, e) {
      return t.delete("/permanently", {}, { data: e });
    },
    deletePermanentlyAll(t) {
      return t.delete("/permanently/all");
    }
  }
);
var td = /* @__PURE__ */ ((t) => (t.READ_PRODUCTS = "read_products", t))(td || {}), ed = /* @__PURE__ */ ((t) => (t.Admin = "Admin", t.BasicAgent = "BasicAgent", t.AgentLeader = "AgentLeader", t))(ed || {});
const yd = it(
  () => ({
    baseURL: `${at.getApiUrl()}/api/v1/account/group`
  }),
  {
    getList(t, e) {
      return t.get("", e);
    },
    getOne(t, e) {
      return t.get(`/${e}`);
    },
    create(t, e) {
      return t.post("", e);
    },
    update(t, e, r) {
      return t.put(`/${e}`, r);
    },
    delete(t, e) {
      return t.delete(`/${e}`);
    },
    getListMembers(t, e, r) {
      return t.get(`/${e}/members`, r);
    }
  }
);
var rd = /* @__PURE__ */ ((t) => (t.Disabled = "Disabled", t.Email = "Email", t.Authenticator = "Authenticator", t))(rd || {});
const md = it(
  () => ({
    baseURL: `${at.getApiUrl()}/api/v1/account/setting`
  }),
  {
    getAccessManagerSetting(t) {
      return t.get("/access-manager");
    },
    updateAccessManagerSetting(t, e) {
      return t.post("/access-manager", e);
    },
    setupOtp(t, e) {
      return t.post("/setup-otp", e);
    },
    verifySetupOTP(t, e) {
      return t.post("/verify-setup-otp", e);
    }
  }
), gd = it(
  () => ({
    baseURL: `${at.getApiUrl()}/api/v1/merchant-rating`
  }),
  {
    getMerchantRating(t) {
      return t.get("");
    },
    postMerchantRating(t, e) {
      return t.post("", e);
    }
  }
);
export {
  Gp as AccessType,
  od as AccountRepository,
  id as AgentRepository,
  qp as AuthenticationSMTP,
  Wp as BusinessHoursType,
  ad as CustomerRepository,
  Yp as Day,
  sd as EmailIntegrationRepository,
  at as Env,
  Hp as ErrorCodeCreate,
  ud as GlobalRepository,
  cd as HelpWidgetRepository,
  Zp as MailBoxType,
  Kp as MailSettingType,
  gd as MerchantRepository,
  rd as MethodOTP,
  td as PermissionScopesShopify,
  Qp as Priority,
  ed as Role,
  Jp as ScreenType,
  Xp as StatusTicket,
  ld as StoreRepository,
  pd as TagRepository,
  vd as TicketRepository,
  fd as TourGuideRepository,
  Bp as TypeCheckTokenNewAgent,
  yd as UserGroupRepository,
  md as UserSettingRepository,
  hd as priorityOptions,
  dd as statusOptions
};

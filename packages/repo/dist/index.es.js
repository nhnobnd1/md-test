import * as U from "react";
import Qt, { createContext as uo, memo as co, useContext as Ui, useMemo as Li } from "react";
var Ii = Object.defineProperty, Mi = (t, e, r) => e in t ? Ii(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, et = (t, e, r) => (Mi(t, typeof e != "symbol" ? e + "" : e, r), r);
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
function tr() {
  return tr = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
    }
    return t;
  }, tr.apply(this, arguments);
}
var sn;
(function(t) {
  t.Pop = "POP", t.Push = "PUSH", t.Replace = "REPLACE";
})(sn || (sn = {}));
function nt(t, e) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(e);
}
function er(t) {
  let {
    pathname: e = "/",
    search: r = "",
    hash: n = ""
  } = t;
  return r && r !== "?" && (e += r.charAt(0) === "?" ? r : "?" + r), n && n !== "#" && (e += n.charAt(0) === "#" ? n : "#" + n), e;
}
function lo(t) {
  let e = {};
  if (t) {
    let r = t.indexOf("#");
    r >= 0 && (e.hash = t.substr(r), t = t.substr(0, r));
    let n = t.indexOf("?");
    n >= 0 && (e.search = t.substr(n), t = t.substr(0, n)), t && (e.pathname = t);
  }
  return e;
}
var un;
(function(t) {
  t.data = "data", t.deferred = "deferred", t.redirect = "redirect", t.error = "error";
})(un || (un = {}));
function Fi(t, e) {
  if (!t) {
    typeof console < "u" && console.warn(e);
    try {
      throw new Error(e);
    } catch {
    }
  }
}
function zi(t, e) {
  e === void 0 && (e = "/");
  let {
    pathname: r,
    search: n = "",
    hash: o = ""
  } = typeof t == "string" ? lo(t) : t;
  return {
    pathname: r ? r.startsWith("/") ? r : Vi(r, e) : e,
    search: Hi(n),
    hash: Bi(o)
  };
}
function Vi(t, e) {
  let r = e.replace(/\/+$/, "").split("/");
  return t.split("/").forEach((n) => {
    n === ".." ? r.length > 1 && r.pop() : n !== "." && r.push(n);
  }), r.length > 1 ? r.join("/") : "/";
}
function He(t, e, r, n) {
  return "Cannot include a '" + t + "' character in a manually specified " + ("`to." + e + "` field [" + JSON.stringify(n) + "].  Please separate it out to the ") + ("`to." + r + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function fo(t) {
  return t.filter((e, r) => r === 0 || e.route.path && e.route.path.length > 0);
}
function po(t, e, r, n) {
  n === void 0 && (n = !1);
  let o;
  typeof t == "string" ? o = lo(t) : (o = tr({}, t), nt(!o.pathname || !o.pathname.includes("?"), He("?", "pathname", "search", o)), nt(!o.pathname || !o.pathname.includes("#"), He("#", "pathname", "hash", o)), nt(!o.search || !o.search.includes("#"), He("#", "search", "hash", o)));
  let i = t === "" || o.pathname === "", a = i ? "/" : o.pathname, u;
  if (n || a == null)
    u = r;
  else {
    let d = e.length - 1;
    if (a.startsWith("..")) {
      let h = a.split("/");
      for (; h[0] === ".."; )
        h.shift(), d -= 1;
      o.pathname = h.join("/");
    }
    u = d >= 0 ? e[d] : "/";
  }
  let s = zi(o, u), l = a && a !== "/" && a.endsWith("/"), f = (i || a === ".") && r.endsWith("/");
  return !s.pathname.endsWith("/") && (l || f) && (s.pathname += "/"), s;
}
const _r = (t) => t.join("/").replace(/\/\/+/g, "/"), Hi = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, Bi = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t, ho = ["post", "put", "patch", "delete"];
new Set(ho);
const Wi = ["get", ...ho];
new Set(Wi);
"useSyncExternalStore" in U && ((t) => t.useSyncExternalStore)(U);
const Yi = /* @__PURE__ */ U.createContext(null);
process.env.NODE_ENV !== "production" && (Yi.displayName = "DataStaticRouterContext");
const vo = /* @__PURE__ */ U.createContext(null);
process.env.NODE_ENV !== "production" && (vo.displayName = "DataRouter");
const mo = /* @__PURE__ */ U.createContext(null);
process.env.NODE_ENV !== "production" && (mo.displayName = "DataRouterState");
const qi = /* @__PURE__ */ U.createContext(null);
process.env.NODE_ENV !== "production" && (qi.displayName = "Await");
const Xt = /* @__PURE__ */ U.createContext(null);
process.env.NODE_ENV !== "production" && (Xt.displayName = "Navigation");
const Er = /* @__PURE__ */ U.createContext(null);
process.env.NODE_ENV !== "production" && (Er.displayName = "Location");
const te = /* @__PURE__ */ U.createContext({
  outlet: null,
  matches: []
});
process.env.NODE_ENV !== "production" && (te.displayName = "Route");
const Ji = /* @__PURE__ */ U.createContext(null);
process.env.NODE_ENV !== "production" && (Ji.displayName = "RouteError");
function Ki(t, e) {
  let {
    relative: r
  } = e === void 0 ? {} : e;
  Sr() || (process.env.NODE_ENV !== "production" ? nt(
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
  } = Se(t, {
    relative: r
  }), s = a;
  return n !== "/" && (s = a === "/" ? n : _r([n, a])), o.createHref({
    pathname: s,
    search: u,
    hash: i
  });
}
function Sr() {
  return U.useContext(Er) != null;
}
function ee() {
  return Sr() || (process.env.NODE_ENV !== "production" ? nt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ) : nt(!1)), U.useContext(Er).location;
}
function Gi() {
  Sr() || (process.env.NODE_ENV !== "production" ? nt(
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
  } = ee(), o = JSON.stringify(fo(r).map((a) => a.pathnameBase)), i = U.useRef(!1);
  return U.useEffect(() => {
    i.current = !0;
  }), U.useCallback(function(a, u) {
    if (u === void 0 && (u = {}), process.env.NODE_ENV !== "production" && Fi(i.current, "You should call navigate() in a React.useEffect(), not when your component is first rendered."), !i.current)
      return;
    if (typeof a == "number") {
      e.go(a);
      return;
    }
    let s = po(a, JSON.parse(o), n, u.relative === "path");
    t !== "/" && (s.pathname = s.pathname === "/" ? t : _r([t, s.pathname])), (u.replace ? e.replace : e.push)(s, u.state, u);
  }, [t, e, o, n]);
}
const Zi = /* @__PURE__ */ U.createContext(null);
function Qi(t) {
  let e = U.useContext(te).outlet;
  return e && /* @__PURE__ */ U.createElement(Zi.Provider, {
    value: t
  }, e);
}
function Se(t, e) {
  let {
    relative: r
  } = e === void 0 ? {} : e, {
    matches: n
  } = U.useContext(te), {
    pathname: o
  } = ee(), i = JSON.stringify(fo(n).map((a) => a.pathnameBase));
  return U.useMemo(() => po(t, JSON.parse(i), o, r === "path"), [t, i, o, r]);
}
var cn;
(function(t) {
  t.UseRevalidator = "useRevalidator";
})(cn || (cn = {}));
var ln;
(function(t) {
  t.UseLoaderData = "useLoaderData", t.UseActionData = "useActionData", t.UseRouteError = "useRouteError", t.UseNavigation = "useNavigation", t.UseRouteLoaderData = "useRouteLoaderData", t.UseMatches = "useMatches", t.UseRevalidator = "useRevalidator";
})(ln || (ln = {}));
function Xi(t) {
  return Qi(t.context);
}
var fn;
(function(t) {
  t[t.pending = 0] = "pending", t[t.success = 1] = "success", t[t.error = 2] = "error";
})(fn || (fn = {}));
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
function jr(t, e) {
  if (t == null)
    return {};
  var r = {}, n = Object.keys(t), o, i;
  for (i = 0; i < n.length; i++)
    o = n[i], !(e.indexOf(o) >= 0) && (r[o] = t[o]);
  return r;
}
const fe = "get", Be = "application/x-www-form-urlencoded";
function je(t) {
  return t != null && typeof t.tagName == "string";
}
function ta(t) {
  return je(t) && t.tagName.toLowerCase() === "button";
}
function ea(t) {
  return je(t) && t.tagName.toLowerCase() === "form";
}
function ra(t) {
  return je(t) && t.tagName.toLowerCase() === "input";
}
function na(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function oa(t, e) {
  return t.button === 0 && // Ignore everything but left clicks
  (!e || e === "_self") && // Let browser handle "target=_blank" etc.
  !na(t);
}
function ia(t, e, r) {
  let n, o, i, a;
  if (ea(t)) {
    let l = r.submissionTrigger;
    n = r.method || t.getAttribute("method") || fe, o = r.action || t.getAttribute("action") || e, i = r.encType || t.getAttribute("enctype") || Be, a = new FormData(t), l && l.name && a.append(l.name, l.value);
  } else if (ta(t) || ra(t) && (t.type === "submit" || t.type === "image")) {
    let l = t.form;
    if (l == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    n = r.method || t.getAttribute("formmethod") || l.getAttribute("method") || fe, o = r.action || t.getAttribute("formaction") || l.getAttribute("action") || e, i = r.encType || t.getAttribute("formenctype") || l.getAttribute("enctype") || Be, a = new FormData(l), t.name && a.append(t.name, t.value);
  } else {
    if (je(t))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    if (n = r.method || fe, o = r.action || e, i = r.encType || Be, t instanceof FormData)
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
const aa = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset"], sa = ["aria-current", "caseSensitive", "className", "end", "style", "to", "children"], ua = ["reloadDocument", "replace", "method", "action", "onSubmit", "fetcherKey", "routeId", "relative"];
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
  } = t, f = jr(t, aa), d = Ki(s, {
    relative: n
  }), h = ha(s, {
    replace: i,
    state: a,
    target: u,
    preventScrollReset: l,
    relative: n
  });
  function p(g) {
    r && r(g), g.defaultPrevented || h(g);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ U.createElement("a", $t({}, f, {
      href: d,
      onClick: o ? r : p,
      ref: e,
      target: u
    }))
  );
});
process.env.NODE_ENV !== "production" && (go.displayName = "Link");
const ca = /* @__PURE__ */ U.forwardRef(function(t, e) {
  let {
    "aria-current": r = "page",
    caseSensitive: n = !1,
    className: o = "",
    end: i = !1,
    style: a,
    to: u,
    children: s
  } = t, l = jr(t, sa), f = Se(u, {
    relative: l.relative
  }), d = ee(), h = U.useContext(mo), {
    navigator: p
  } = U.useContext(Xt), g = p.encodeLocation ? p.encodeLocation(f).pathname : f.pathname, v = d.pathname, E = h && h.navigation && h.navigation.location ? h.navigation.location.pathname : null;
  n || (v = v.toLowerCase(), E = E ? E.toLowerCase() : null, g = g.toLowerCase());
  let A = v === g || !i && v.startsWith(g) && v.charAt(g.length) === "/", N = E != null && (E === g || !i && E.startsWith(g) && E.charAt(g.length) === "/"), S = A ? r : void 0, j;
  typeof o == "function" ? j = o({
    isActive: A,
    isPending: N
  }) : j = [o, A ? "active" : null, N ? "pending" : null].filter(Boolean).join(" ");
  let C = typeof a == "function" ? a({
    isActive: A,
    isPending: N
  }) : a;
  return /* @__PURE__ */ U.createElement(go, $t({}, l, {
    "aria-current": S,
    className: j,
    ref: e,
    style: C,
    to: u
  }), typeof s == "function" ? s({
    isActive: A,
    isPending: N
  }) : s);
});
process.env.NODE_ENV !== "production" && (ca.displayName = "NavLink");
const la = /* @__PURE__ */ U.forwardRef((t, e) => /* @__PURE__ */ U.createElement(yo, $t({}, t, {
  ref: e
})));
process.env.NODE_ENV !== "production" && (la.displayName = "Form");
const yo = /* @__PURE__ */ U.forwardRef((t, e) => {
  let {
    reloadDocument: r,
    replace: n,
    method: o = fe,
    action: i,
    onSubmit: a,
    fetcherKey: u,
    routeId: s,
    relative: l
  } = t, f = jr(t, ua), d = da(u, s), h = o.toLowerCase() === "get" ? "get" : "post", p = bo(i, {
    relative: l
  }), g = (v) => {
    if (a && a(v), v.defaultPrevented)
      return;
    v.preventDefault();
    let E = v.nativeEvent.submitter, A = (E == null ? void 0 : E.getAttribute("formmethod")) || o;
    d(E || v.currentTarget, {
      method: A,
      replace: n,
      relative: l
    });
  };
  return /* @__PURE__ */ U.createElement("form", $t({
    ref: e,
    method: h,
    action: p,
    onSubmit: r ? a : g
  }, f));
});
process.env.NODE_ENV !== "production" && (yo.displayName = "FormImpl");
process.env.NODE_ENV;
var rr;
(function(t) {
  t.UseScrollRestoration = "useScrollRestoration", t.UseSubmitImpl = "useSubmitImpl", t.UseFetcher = "useFetcher";
})(rr || (rr = {}));
var pn;
(function(t) {
  t.UseFetchers = "useFetchers", t.UseScrollRestoration = "useScrollRestoration";
})(pn || (pn = {}));
function fa(t) {
  return t + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function pa(t) {
  let e = U.useContext(vo);
  return e || (process.env.NODE_ENV !== "production" ? nt(!1, fa(t)) : nt(!1)), e;
}
function ha(t, e) {
  let {
    target: r,
    replace: n,
    state: o,
    preventScrollReset: i,
    relative: a
  } = e === void 0 ? {} : e, u = Gi(), s = ee(), l = Se(t, {
    relative: a
  });
  return U.useCallback((f) => {
    if (oa(f, r)) {
      f.preventDefault();
      let d = n !== void 0 ? n : er(s) === er(l);
      u(t, {
        replace: d,
        state: o,
        preventScrollReset: i,
        relative: a
      });
    }
  }, [s, u, l, n, o, r, t, i, a]);
}
function da(t, e) {
  let {
    router: r
  } = pa(rr.UseSubmitImpl), n = bo();
  return U.useCallback(function(o, i) {
    if (i === void 0 && (i = {}), typeof document > "u")
      throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
    let {
      method: a,
      encType: u,
      formData: s,
      url: l
    } = ia(o, n, i), f = l.pathname + l.search, d = {
      replace: i.replace,
      formData: s,
      formMethod: a,
      formEncType: u
    };
    t ? (e == null && (process.env.NODE_ENV !== "production" ? nt(!1, "No routeId available for useFetcher()") : nt(!1)), r.fetch(t, e, f, d)) : r.navigate(f, d);
  }, [n, r, t, e]);
}
function bo(t, e) {
  let {
    relative: r
  } = e === void 0 ? {} : e, {
    basename: n
  } = U.useContext(Xt), o = U.useContext(te);
  o || (process.env.NODE_ENV !== "production" ? nt(!1, "useFormAction must be used inside a RouteContext") : nt(!1));
  let [i] = o.matches.slice(-1), a = $t({}, Se(t || ".", {
    relative: r
  })), u = ee();
  if (t == null && (a.search = u.search, a.hash = u.hash, i.route.index)) {
    let s = new URLSearchParams(a.search);
    s.delete("index"), a.search = s.toString() ? "?" + s.toString() : "";
  }
  return (!t || t === ".") && i.route.index && (a.search = a.search ? a.search.replace(/^\?/, "?index&") : "?index"), n !== "/" && (a.pathname = a.pathname === "/" ? n : _r([n, a.pathname])), er(a);
}
var va = typeof global == "object" && global && global.Object === Object && global;
const Oo = va;
var ma = typeof self == "object" && self && self.Object === Object && self, ga = Oo || ma || Function("return this")();
const dt = ga;
var ya = dt.Symbol;
const jt = ya;
var wo = Object.prototype, ba = wo.hasOwnProperty, Oa = wo.toString, Wt = jt ? jt.toStringTag : void 0;
function wa(t) {
  var e = ba.call(t, Wt), r = t[Wt];
  try {
    t[Wt] = void 0;
    var n = !0;
  } catch {
  }
  var o = Oa.call(t);
  return n && (e ? t[Wt] = r : delete t[Wt]), o;
}
var _a = Object.prototype, Ea = _a.toString;
function Sa(t) {
  return Ea.call(t);
}
var ja = "[object Null]", xa = "[object Undefined]", hn = jt ? jt.toStringTag : void 0;
function Ct(t) {
  return t == null ? t === void 0 ? xa : ja : hn && hn in Object(t) ? wa(t) : Sa(t);
}
function xt(t) {
  return t != null && typeof t == "object";
}
var Ra = "[object Symbol]";
function xr(t) {
  return typeof t == "symbol" || xt(t) && Ct(t) == Ra;
}
function Da(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length, o = Array(n); ++r < n; )
    o[r] = e(t[r], r, t);
  return o;
}
var Ta = Array.isArray;
const lt = Ta;
var $a = 1 / 0, dn = jt ? jt.prototype : void 0, vn = dn ? dn.toString : void 0;
function _o(t) {
  if (typeof t == "string")
    return t;
  if (lt(t))
    return Da(t, _o) + "";
  if (xr(t))
    return vn ? vn.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -$a ? "-0" : e;
}
function Rt(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
function Rr(t) {
  return t;
}
var Aa = "[object AsyncFunction]", Na = "[object Function]", Ca = "[object GeneratorFunction]", Pa = "[object Proxy]";
function Dr(t) {
  if (!Rt(t))
    return !1;
  var e = Ct(t);
  return e == Na || e == Ca || e == Aa || e == Pa;
}
var ka = dt["__core-js_shared__"];
const We = ka;
var mn = function() {
  var t = /[^.]+$/.exec(We && We.keys && We.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function Ua(t) {
  return !!mn && mn in t;
}
var La = Function.prototype, Ia = La.toString;
function Pt(t) {
  if (t != null) {
    try {
      return Ia.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var Ma = /[\\^$.*+?()[\]{}|]/g, Fa = /^\[object .+?Constructor\]$/, za = Function.prototype, Va = Object.prototype, Ha = za.toString, Ba = Va.hasOwnProperty, Wa = RegExp(
  "^" + Ha.call(Ba).replace(Ma, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Ya(t) {
  if (!Rt(t) || Ua(t))
    return !1;
  var e = Dr(t) ? Wa : Fa;
  return e.test(Pt(t));
}
function qa(t, e) {
  return t == null ? void 0 : t[e];
}
function kt(t, e) {
  var r = qa(t, e);
  return Ya(r) ? r : void 0;
}
var Ja = kt(dt, "WeakMap");
const nr = Ja;
var gn = Object.create, Ka = function() {
  function t() {
  }
  return function(e) {
    if (!Rt(e))
      return {};
    if (gn)
      return gn(e);
    t.prototype = e;
    var r = new t();
    return t.prototype = void 0, r;
  };
}();
const Ga = Ka;
function Za(t, e, r) {
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
function Qa() {
}
function Xa(t, e) {
  var r = -1, n = t.length;
  for (e || (e = Array(n)); ++r < n; )
    e[r] = t[r];
  return e;
}
var ts = 800, es = 16, rs = Date.now;
function ns(t) {
  var e = 0, r = 0;
  return function() {
    var n = rs(), o = es - (n - r);
    if (r = n, o > 0) {
      if (++e >= ts)
        return arguments[0];
    } else
      e = 0;
    return t.apply(void 0, arguments);
  };
}
function os(t) {
  return function() {
    return t;
  };
}
var is = function() {
  try {
    var t = kt(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
}();
const ye = is;
var as = ye ? function(t, e) {
  return ye(t, "toString", {
    configurable: !0,
    enumerable: !1,
    value: os(e),
    writable: !0
  });
} : Rr;
const ss = as;
var us = ns(ss);
const cs = us;
function ls(t, e, r, n) {
  for (var o = t.length, i = r + (n ? 1 : -1); n ? i-- : ++i < o; )
    if (e(t[i], i, t))
      return i;
  return -1;
}
function fs(t) {
  return t !== t;
}
function ps(t, e, r) {
  for (var n = r - 1, o = t.length; ++n < o; )
    if (t[n] === e)
      return n;
  return -1;
}
function hs(t, e, r) {
  return e === e ? ps(t, e, r) : ls(t, fs, r);
}
function ds(t, e) {
  var r = t == null ? 0 : t.length;
  return !!r && hs(t, e, 0) > -1;
}
var vs = 9007199254740991, ms = /^(?:0|[1-9]\d*)$/;
function Tr(t, e) {
  var r = typeof t;
  return e = e ?? vs, !!e && (r == "number" || r != "symbol" && ms.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
function xe(t, e, r) {
  e == "__proto__" && ye ? ye(t, e, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : t[e] = r;
}
function re(t, e) {
  return t === e || t !== t && e !== e;
}
var gs = Object.prototype, ys = gs.hasOwnProperty;
function bs(t, e, r) {
  var n = t[e];
  (!(ys.call(t, e) && re(n, r)) || r === void 0 && !(e in t)) && xe(t, e, r);
}
function Os(t, e, r, n) {
  var o = !r;
  r || (r = {});
  for (var i = -1, a = e.length; ++i < a; ) {
    var u = e[i], s = n ? n(r[u], t[u], u, r, t) : void 0;
    s === void 0 && (s = t[u]), o ? xe(r, u, s) : bs(r, u, s);
  }
  return r;
}
var yn = Math.max;
function ws(t, e, r) {
  return e = yn(e === void 0 ? t.length - 1 : e, 0), function() {
    for (var n = arguments, o = -1, i = yn(n.length - e, 0), a = Array(i); ++o < i; )
      a[o] = n[e + o];
    o = -1;
    for (var u = Array(e + 1); ++o < e; )
      u[o] = n[o];
    return u[e] = r(a), Za(t, this, u);
  };
}
function _s(t, e) {
  return cs(ws(t, e, Rr), t + "");
}
var Es = 9007199254740991;
function $r(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= Es;
}
function Re(t) {
  return t != null && $r(t.length) && !Dr(t);
}
function Ss(t, e, r) {
  if (!Rt(r))
    return !1;
  var n = typeof e;
  return (n == "number" ? Re(r) && Tr(e, r.length) : n == "string" && e in r) ? re(r[e], t) : !1;
}
function js(t) {
  return _s(function(e, r) {
    var n = -1, o = r.length, i = o > 1 ? r[o - 1] : void 0, a = o > 2 ? r[2] : void 0;
    for (i = t.length > 3 && typeof i == "function" ? (o--, i) : void 0, a && Ss(r[0], r[1], a) && (i = o < 3 ? void 0 : i, o = 1), e = Object(e); ++n < o; ) {
      var u = r[n];
      u && t(e, u, n, i);
    }
    return e;
  });
}
var xs = Object.prototype;
function Ar(t) {
  var e = t && t.constructor, r = typeof e == "function" && e.prototype || xs;
  return t === r;
}
function Rs(t, e) {
  for (var r = -1, n = Array(t); ++r < t; )
    n[r] = e(r);
  return n;
}
var Ds = "[object Arguments]";
function bn(t) {
  return xt(t) && Ct(t) == Ds;
}
var Eo = Object.prototype, Ts = Eo.hasOwnProperty, $s = Eo.propertyIsEnumerable, As = bn(function() {
  return arguments;
}()) ? bn : function(t) {
  return xt(t) && Ts.call(t, "callee") && !$s.call(t, "callee");
};
const be = As;
function Ns() {
  return !1;
}
var So = typeof exports == "object" && exports && !exports.nodeType && exports, On = So && typeof module == "object" && module && !module.nodeType && module, Cs = On && On.exports === So, wn = Cs ? dt.Buffer : void 0, Ps = wn ? wn.isBuffer : void 0, ks = Ps || Ns;
const Oe = ks;
var Us = "[object Arguments]", Ls = "[object Array]", Is = "[object Boolean]", Ms = "[object Date]", Fs = "[object Error]", zs = "[object Function]", Vs = "[object Map]", Hs = "[object Number]", Bs = "[object Object]", Ws = "[object RegExp]", Ys = "[object Set]", qs = "[object String]", Js = "[object WeakMap]", Ks = "[object ArrayBuffer]", Gs = "[object DataView]", Zs = "[object Float32Array]", Qs = "[object Float64Array]", Xs = "[object Int8Array]", tu = "[object Int16Array]", eu = "[object Int32Array]", ru = "[object Uint8Array]", nu = "[object Uint8ClampedArray]", ou = "[object Uint16Array]", iu = "[object Uint32Array]", q = {};
q[Zs] = q[Qs] = q[Xs] = q[tu] = q[eu] = q[ru] = q[nu] = q[ou] = q[iu] = !0;
q[Us] = q[Ls] = q[Ks] = q[Is] = q[Gs] = q[Ms] = q[Fs] = q[zs] = q[Vs] = q[Hs] = q[Bs] = q[Ws] = q[Ys] = q[qs] = q[Js] = !1;
function au(t) {
  return xt(t) && $r(t.length) && !!q[Ct(t)];
}
function su(t) {
  return function(e) {
    return t(e);
  };
}
var jo = typeof exports == "object" && exports && !exports.nodeType && exports, qt = jo && typeof module == "object" && module && !module.nodeType && module, uu = qt && qt.exports === jo, Ye = uu && Oo.process, cu = function() {
  try {
    var t = qt && qt.require && qt.require("util").types;
    return t || Ye && Ye.binding && Ye.binding("util");
  } catch {
  }
}();
const _n = cu;
var En = _n && _n.isTypedArray, lu = En ? su(En) : au;
const Nr = lu;
var fu = Object.prototype, pu = fu.hasOwnProperty;
function xo(t, e) {
  var r = lt(t), n = !r && be(t), o = !r && !n && Oe(t), i = !r && !n && !o && Nr(t), a = r || n || o || i, u = a ? Rs(t.length, String) : [], s = u.length;
  for (var l in t)
    (e || pu.call(t, l)) && !(a && // Safari 9 has enumerable `arguments.length` in strict mode.
    (l == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    o && (l == "offset" || l == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (l == "buffer" || l == "byteLength" || l == "byteOffset") || // Skip index properties.
    Tr(l, s))) && u.push(l);
  return u;
}
function Ro(t, e) {
  return function(r) {
    return t(e(r));
  };
}
var hu = Ro(Object.keys, Object);
const du = hu;
var vu = Object.prototype, mu = vu.hasOwnProperty;
function gu(t) {
  if (!Ar(t))
    return du(t);
  var e = [];
  for (var r in Object(t))
    mu.call(t, r) && r != "constructor" && e.push(r);
  return e;
}
function Cr(t) {
  return Re(t) ? xo(t) : gu(t);
}
function yu(t) {
  var e = [];
  if (t != null)
    for (var r in Object(t))
      e.push(r);
  return e;
}
var bu = Object.prototype, Ou = bu.hasOwnProperty;
function wu(t) {
  if (!Rt(t))
    return yu(t);
  var e = Ar(t), r = [];
  for (var n in t)
    n == "constructor" && (e || !Ou.call(t, n)) || r.push(n);
  return r;
}
function Do(t) {
  return Re(t) ? xo(t, !0) : wu(t);
}
var _u = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Eu = /^\w*$/;
function Pr(t, e) {
  if (lt(t))
    return !1;
  var r = typeof t;
  return r == "number" || r == "symbol" || r == "boolean" || t == null || xr(t) ? !0 : Eu.test(t) || !_u.test(t) || e != null && t in Object(e);
}
var Su = kt(Object, "create");
const Jt = Su;
function ju() {
  this.__data__ = Jt ? Jt(null) : {}, this.size = 0;
}
function xu(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var Ru = "__lodash_hash_undefined__", Du = Object.prototype, Tu = Du.hasOwnProperty;
function $u(t) {
  var e = this.__data__;
  if (Jt) {
    var r = e[t];
    return r === Ru ? void 0 : r;
  }
  return Tu.call(e, t) ? e[t] : void 0;
}
var Au = Object.prototype, Nu = Au.hasOwnProperty;
function Cu(t) {
  var e = this.__data__;
  return Jt ? e[t] !== void 0 : Nu.call(e, t);
}
var Pu = "__lodash_hash_undefined__";
function ku(t, e) {
  var r = this.__data__;
  return this.size += this.has(t) ? 0 : 1, r[t] = Jt && e === void 0 ? Pu : e, this;
}
function At(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
At.prototype.clear = ju;
At.prototype.delete = xu;
At.prototype.get = $u;
At.prototype.has = Cu;
At.prototype.set = ku;
function Uu() {
  this.__data__ = [], this.size = 0;
}
function De(t, e) {
  for (var r = t.length; r--; )
    if (re(t[r][0], e))
      return r;
  return -1;
}
var Lu = Array.prototype, Iu = Lu.splice;
function Mu(t) {
  var e = this.__data__, r = De(e, t);
  if (r < 0)
    return !1;
  var n = e.length - 1;
  return r == n ? e.pop() : Iu.call(e, r, 1), --this.size, !0;
}
function Fu(t) {
  var e = this.__data__, r = De(e, t);
  return r < 0 ? void 0 : e[r][1];
}
function zu(t) {
  return De(this.__data__, t) > -1;
}
function Vu(t, e) {
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
wt.prototype.delete = Mu;
wt.prototype.get = Fu;
wt.prototype.has = zu;
wt.prototype.set = Vu;
var Hu = kt(dt, "Map");
const Kt = Hu;
function Bu() {
  this.size = 0, this.__data__ = {
    hash: new At(),
    map: new (Kt || wt)(),
    string: new At()
  };
}
function Wu(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function Te(t, e) {
  var r = t.__data__;
  return Wu(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map;
}
function Yu(t) {
  var e = Te(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function qu(t) {
  return Te(this, t).get(t);
}
function Ju(t) {
  return Te(this, t).has(t);
}
function Ku(t, e) {
  var r = Te(this, t), n = r.size;
  return r.set(t, e), this.size += r.size == n ? 0 : 1, this;
}
function _t(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
_t.prototype.clear = Bu;
_t.prototype.delete = Yu;
_t.prototype.get = qu;
_t.prototype.has = Ju;
_t.prototype.set = Ku;
var Gu = "Expected a function";
function kr(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(Gu);
  var r = function() {
    var n = arguments, o = e ? e.apply(this, n) : n[0], i = r.cache;
    if (i.has(o))
      return i.get(o);
    var a = t.apply(this, n);
    return r.cache = i.set(o, a) || i, a;
  };
  return r.cache = new (kr.Cache || _t)(), r;
}
kr.Cache = _t;
var Zu = 500;
function Qu(t) {
  var e = kr(t, function(n) {
    return r.size === Zu && r.clear(), n;
  }), r = e.cache;
  return e;
}
var Xu = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, tc = /\\(\\)?/g, ec = Qu(function(t) {
  var e = [];
  return t.charCodeAt(0) === 46 && e.push(""), t.replace(Xu, function(r, n, o, i) {
    e.push(o ? i.replace(tc, "$1") : n || r);
  }), e;
});
const rc = ec;
function nc(t) {
  return t == null ? "" : _o(t);
}
function To(t, e) {
  return lt(t) ? t : Pr(t, e) ? [t] : rc(nc(t));
}
var oc = 1 / 0;
function $e(t) {
  if (typeof t == "string" || xr(t))
    return t;
  var e = t + "";
  return e == "0" && 1 / t == -oc ? "-0" : e;
}
function $o(t, e) {
  e = To(e, t);
  for (var r = 0, n = e.length; t != null && r < n; )
    t = t[$e(e[r++])];
  return r && r == n ? t : void 0;
}
function ic(t, e, r) {
  var n = t == null ? void 0 : $o(t, e);
  return n === void 0 ? r : n;
}
function ac(t, e) {
  for (var r = -1, n = e.length, o = t.length; ++r < n; )
    t[o + r] = e[r];
  return t;
}
var sc = Ro(Object.getPrototypeOf, Object);
const Ao = sc;
var uc = "[object Object]", cc = Function.prototype, lc = Object.prototype, No = cc.toString, fc = lc.hasOwnProperty, pc = No.call(Object);
function hc(t) {
  if (!xt(t) || Ct(t) != uc)
    return !1;
  var e = Ao(t);
  if (e === null)
    return !0;
  var r = fc.call(e, "constructor") && e.constructor;
  return typeof r == "function" && r instanceof r && No.call(r) == pc;
}
function dc() {
  this.__data__ = new wt(), this.size = 0;
}
function vc(t) {
  var e = this.__data__, r = e.delete(t);
  return this.size = e.size, r;
}
function mc(t) {
  return this.__data__.get(t);
}
function gc(t) {
  return this.__data__.has(t);
}
var yc = 200;
function bc(t, e) {
  var r = this.__data__;
  if (r instanceof wt) {
    var n = r.__data__;
    if (!Kt || n.length < yc - 1)
      return n.push([t, e]), this.size = ++r.size, this;
    r = this.__data__ = new _t(n);
  }
  return r.set(t, e), this.size = r.size, this;
}
function ht(t) {
  var e = this.__data__ = new wt(t);
  this.size = e.size;
}
ht.prototype.clear = dc;
ht.prototype.delete = vc;
ht.prototype.get = mc;
ht.prototype.has = gc;
ht.prototype.set = bc;
var Co = typeof exports == "object" && exports && !exports.nodeType && exports, Sn = Co && typeof module == "object" && module && !module.nodeType && module, Oc = Sn && Sn.exports === Co, jn = Oc ? dt.Buffer : void 0, xn = jn ? jn.allocUnsafe : void 0;
function wc(t, e) {
  if (e)
    return t.slice();
  var r = t.length, n = xn ? xn(r) : new t.constructor(r);
  return t.copy(n), n;
}
function _c(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length, o = 0, i = []; ++r < n; ) {
    var a = t[r];
    e(a, r, t) && (i[o++] = a);
  }
  return i;
}
function Ec() {
  return [];
}
var Sc = Object.prototype, jc = Sc.propertyIsEnumerable, Rn = Object.getOwnPropertySymbols, xc = Rn ? function(t) {
  return t == null ? [] : (t = Object(t), _c(Rn(t), function(e) {
    return jc.call(t, e);
  }));
} : Ec;
const Rc = xc;
function Dc(t, e, r) {
  var n = e(t);
  return lt(t) ? n : ac(n, r(t));
}
function Dn(t) {
  return Dc(t, Cr, Rc);
}
var Tc = kt(dt, "DataView");
const or = Tc;
var $c = kt(dt, "Promise");
const ir = $c;
var Ac = kt(dt, "Set");
const Ft = Ac;
var Tn = "[object Map]", Nc = "[object Object]", $n = "[object Promise]", An = "[object Set]", Nn = "[object WeakMap]", Cn = "[object DataView]", Cc = Pt(or), Pc = Pt(Kt), kc = Pt(ir), Uc = Pt(Ft), Lc = Pt(nr), Tt = Ct;
(or && Tt(new or(new ArrayBuffer(1))) != Cn || Kt && Tt(new Kt()) != Tn || ir && Tt(ir.resolve()) != $n || Ft && Tt(new Ft()) != An || nr && Tt(new nr()) != Nn) && (Tt = function(t) {
  var e = Ct(t), r = e == Nc ? t.constructor : void 0, n = r ? Pt(r) : "";
  if (n)
    switch (n) {
      case Cc:
        return Cn;
      case Pc:
        return Tn;
      case kc:
        return $n;
      case Uc:
        return An;
      case Lc:
        return Nn;
    }
  return e;
});
const Pn = Tt;
var Ic = dt.Uint8Array;
const we = Ic;
function Mc(t) {
  var e = new t.constructor(t.byteLength);
  return new we(e).set(new we(t)), e;
}
function Fc(t, e) {
  var r = e ? Mc(t.buffer) : t.buffer;
  return new t.constructor(r, t.byteOffset, t.length);
}
function zc(t) {
  return typeof t.constructor == "function" && !Ar(t) ? Ga(Ao(t)) : {};
}
var Vc = "__lodash_hash_undefined__";
function Hc(t) {
  return this.__data__.set(t, Vc), this;
}
function Bc(t) {
  return this.__data__.has(t);
}
function Gt(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.__data__ = new _t(); ++e < r; )
    this.add(t[e]);
}
Gt.prototype.add = Gt.prototype.push = Hc;
Gt.prototype.has = Bc;
function Wc(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length; ++r < n; )
    if (e(t[r], r, t))
      return !0;
  return !1;
}
function Po(t, e) {
  return t.has(e);
}
var Yc = 1, qc = 2;
function ko(t, e, r, n, o, i) {
  var a = r & Yc, u = t.length, s = e.length;
  if (u != s && !(a && s > u))
    return !1;
  var l = i.get(t), f = i.get(e);
  if (l && f)
    return l == e && f == t;
  var d = -1, h = !0, p = r & qc ? new Gt() : void 0;
  for (i.set(t, e), i.set(e, t); ++d < u; ) {
    var g = t[d], v = e[d];
    if (n)
      var E = a ? n(v, g, d, e, t, i) : n(g, v, d, t, e, i);
    if (E !== void 0) {
      if (E)
        continue;
      h = !1;
      break;
    }
    if (p) {
      if (!Wc(e, function(A, N) {
        if (!Po(p, N) && (g === A || o(g, A, r, n, i)))
          return p.push(N);
      })) {
        h = !1;
        break;
      }
    } else if (!(g === v || o(g, v, r, n, i))) {
      h = !1;
      break;
    }
  }
  return i.delete(t), i.delete(e), h;
}
function Jc(t) {
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
var Kc = 1, Gc = 2, Zc = "[object Boolean]", Qc = "[object Date]", Xc = "[object Error]", tl = "[object Map]", el = "[object Number]", rl = "[object RegExp]", nl = "[object Set]", ol = "[object String]", il = "[object Symbol]", al = "[object ArrayBuffer]", sl = "[object DataView]", kn = jt ? jt.prototype : void 0, qe = kn ? kn.valueOf : void 0;
function ul(t, e, r, n, o, i, a) {
  switch (r) {
    case sl:
      if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset)
        return !1;
      t = t.buffer, e = e.buffer;
    case al:
      return !(t.byteLength != e.byteLength || !i(new we(t), new we(e)));
    case Zc:
    case Qc:
    case el:
      return re(+t, +e);
    case Xc:
      return t.name == e.name && t.message == e.message;
    case rl:
    case ol:
      return t == e + "";
    case tl:
      var u = Jc;
    case nl:
      var s = n & Kc;
      if (u || (u = Ur), t.size != e.size && !s)
        return !1;
      var l = a.get(t);
      if (l)
        return l == e;
      n |= Gc, a.set(t, e);
      var f = ko(u(t), u(e), n, o, i, a);
      return a.delete(t), f;
    case il:
      if (qe)
        return qe.call(t) == qe.call(e);
  }
  return !1;
}
var cl = 1, ll = Object.prototype, fl = ll.hasOwnProperty;
function pl(t, e, r, n, o, i) {
  var a = r & cl, u = Dn(t), s = u.length, l = Dn(e), f = l.length;
  if (s != f && !a)
    return !1;
  for (var d = s; d--; ) {
    var h = u[d];
    if (!(a ? h in e : fl.call(e, h)))
      return !1;
  }
  var p = i.get(t), g = i.get(e);
  if (p && g)
    return p == e && g == t;
  var v = !0;
  i.set(t, e), i.set(e, t);
  for (var E = a; ++d < s; ) {
    h = u[d];
    var A = t[h], N = e[h];
    if (n)
      var S = a ? n(N, A, h, e, t, i) : n(A, N, h, t, e, i);
    if (!(S === void 0 ? A === N || o(A, N, r, n, i) : S)) {
      v = !1;
      break;
    }
    E || (E = h == "constructor");
  }
  if (v && !E) {
    var j = t.constructor, C = e.constructor;
    j != C && "constructor" in t && "constructor" in e && !(typeof j == "function" && j instanceof j && typeof C == "function" && C instanceof C) && (v = !1);
  }
  return i.delete(t), i.delete(e), v;
}
var hl = 1, Un = "[object Arguments]", Ln = "[object Array]", ue = "[object Object]", dl = Object.prototype, In = dl.hasOwnProperty;
function vl(t, e, r, n, o, i) {
  var a = lt(t), u = lt(e), s = a ? Ln : Pn(t), l = u ? Ln : Pn(e);
  s = s == Un ? ue : s, l = l == Un ? ue : l;
  var f = s == ue, d = l == ue, h = s == l;
  if (h && Oe(t)) {
    if (!Oe(e))
      return !1;
    a = !0, f = !1;
  }
  if (h && !f)
    return i || (i = new ht()), a || Nr(t) ? ko(t, e, r, n, o, i) : ul(t, e, s, r, n, o, i);
  if (!(r & hl)) {
    var p = f && In.call(t, "__wrapped__"), g = d && In.call(e, "__wrapped__");
    if (p || g) {
      var v = p ? t.value() : t, E = g ? e.value() : e;
      return i || (i = new ht()), o(v, E, r, n, i);
    }
  }
  return h ? (i || (i = new ht()), pl(t, e, r, n, o, i)) : !1;
}
function Lr(t, e, r, n, o) {
  return t === e ? !0 : t == null || e == null || !xt(t) && !xt(e) ? t !== t && e !== e : vl(t, e, r, n, Lr, o);
}
var ml = 1, gl = 2;
function yl(t, e, r, n) {
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
      var d = new ht();
      if (n)
        var h = n(l, f, s, t, e, d);
      if (!(h === void 0 ? Lr(f, l, ml | gl, n, d) : h))
        return !1;
    }
  }
  return !0;
}
function Uo(t) {
  return t === t && !Rt(t);
}
function bl(t) {
  for (var e = Cr(t), r = e.length; r--; ) {
    var n = e[r], o = t[n];
    e[r] = [n, o, Uo(o)];
  }
  return e;
}
function Lo(t, e) {
  return function(r) {
    return r == null ? !1 : r[t] === e && (e !== void 0 || t in Object(r));
  };
}
function Ol(t) {
  var e = bl(t);
  return e.length == 1 && e[0][2] ? Lo(e[0][0], e[0][1]) : function(r) {
    return r === t || yl(r, t, e);
  };
}
function wl(t, e) {
  return t != null && e in Object(t);
}
function _l(t, e, r) {
  e = To(e, t);
  for (var n = -1, o = e.length, i = !1; ++n < o; ) {
    var a = $e(e[n]);
    if (!(i = t != null && r(t, a)))
      break;
    t = t[a];
  }
  return i || ++n != o ? i : (o = t == null ? 0 : t.length, !!o && $r(o) && Tr(a, o) && (lt(t) || be(t)));
}
function El(t, e) {
  return t != null && _l(t, e, wl);
}
var Sl = 1, jl = 2;
function xl(t, e) {
  return Pr(t) && Uo(e) ? Lo($e(t), e) : function(r) {
    var n = ic(r, t);
    return n === void 0 && n === e ? El(r, t) : Lr(e, n, Sl | jl);
  };
}
function Rl(t) {
  return function(e) {
    return e == null ? void 0 : e[t];
  };
}
function Dl(t) {
  return function(e) {
    return $o(e, t);
  };
}
function Tl(t) {
  return Pr(t) ? Rl($e(t)) : Dl(t);
}
function Io(t) {
  return typeof t == "function" ? t : t == null ? Rr : typeof t == "object" ? lt(t) ? xl(t[0], t[1]) : Ol(t) : Tl(t);
}
function $l(t) {
  return function(e, r, n) {
    for (var o = -1, i = Object(e), a = n(e), u = a.length; u--; ) {
      var s = a[t ? u : ++o];
      if (r(i[s], s, i) === !1)
        break;
    }
    return e;
  };
}
var Al = $l();
const Mo = Al;
function Nl(t, e) {
  return t && Mo(t, e, Cr);
}
function ar(t, e, r) {
  (r !== void 0 && !re(t[e], r) || r === void 0 && !(e in t)) && xe(t, e, r);
}
function Cl(t) {
  return xt(t) && Re(t);
}
function sr(t, e) {
  if (!(e === "constructor" && typeof t[e] == "function") && e != "__proto__")
    return t[e];
}
function Pl(t) {
  return Os(t, Do(t));
}
function kl(t, e, r, n, o, i, a) {
  var u = sr(t, r), s = sr(e, r), l = a.get(s);
  if (l) {
    ar(t, r, l);
    return;
  }
  var f = i ? i(u, s, r + "", t, e, a) : void 0, d = f === void 0;
  if (d) {
    var h = lt(s), p = !h && Oe(s), g = !h && !p && Nr(s);
    f = s, h || p || g ? lt(u) ? f = u : Cl(u) ? f = Xa(u) : p ? (d = !1, f = wc(s, !0)) : g ? (d = !1, f = Fc(s, !0)) : f = [] : hc(s) || be(s) ? (f = u, be(u) ? f = Pl(u) : (!Rt(u) || Dr(u)) && (f = zc(s))) : d = !1;
  }
  d && (a.set(s, f), o(f, s, n, i, a), a.delete(s)), ar(t, r, f);
}
function Fo(t, e, r, n, o) {
  t !== e && Mo(e, function(i, a) {
    if (o || (o = new ht()), Rt(i))
      kl(t, e, a, r, Fo, n, o);
    else {
      var u = n ? n(sr(t, a), i, a + "", t, e, o) : void 0;
      u === void 0 && (u = i), ar(t, a, u);
    }
  }, Do);
}
function Ul(t, e, r) {
  for (var n = -1, o = t == null ? 0 : t.length; ++n < o; )
    if (r(e, t[n]))
      return !0;
  return !1;
}
function Ll(t, e) {
  var r = {};
  return e = Io(e), Nl(t, function(n, o, i) {
    xe(r, o, e(n, o, i));
  }), r;
}
var Il = js(function(t, e, r) {
  Fo(t, e, r);
});
const Ml = Il;
var Fl = 1 / 0, zl = Ft && 1 / Ur(new Ft([, -0]))[1] == Fl ? function(t) {
  return new Ft(t);
} : Qa;
const Vl = zl;
var Hl = 200;
function Bl(t, e, r) {
  var n = -1, o = ds, i = t.length, a = !0, u = [], s = u;
  if (r)
    a = !1, o = Ul;
  else if (i >= Hl) {
    var l = e ? null : Vl(t);
    if (l)
      return Ur(l);
    a = !1, o = Po, s = new Gt();
  } else
    s = e ? [] : u;
  t:
    for (; ++n < i; ) {
      var f = t[n], d = e ? e(f) : f;
      if (f = r || f !== 0 ? f : 0, a && d === d) {
        for (var h = s.length; h--; )
          if (s[h] === d)
            continue t;
        e && s.push(d), u.push(f);
      } else
        o(s, d, r) || (s !== u && s.push(d), u.push(f));
    }
  return u;
}
function Wl(t, e) {
  return t && t.length ? Bl(t, Io(e)) : [];
}
var ur = /* @__PURE__ */ ((t) => (t.Json = "application/json", t.UrlEncoded = "application/x-www-form-urlencoded", t))(ur || {});
class Yl {
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
class ql {
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
const ce = new ql();
class zo {
  constructor() {
    et(this, "tokens", {});
  }
  getToken(e) {
    if (this.getPrefix())
      return ce.getConfig().app ? this.tokens[`${this.getPrefix()}_${e}`] : localStorage.getItem(`${this.getPrefix()}_${e}`);
  }
  setToken(e, r) {
    if (this.getPrefix() && (this.tokens[`${this.getPrefix()}_${e}`] = r, !ce.getConfig().app))
      return localStorage.setItem(`${this.getPrefix()}_${e}`, r);
  }
  getPrefix() {
    const e = ce.getConfig().modEnv, r = ce.getConfig().subdomain;
    return !e || !r ? "" : `${e}_${r}`;
  }
}
const Jl = new zo();
new zo();
var Ir = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ae(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Vo = { exports: {} };
(function(t, e) {
  (function(r, n) {
    t.exports = n();
  })(Ir, function() {
    var r = 1e3, n = 6e4, o = 36e5, i = "millisecond", a = "second", u = "minute", s = "hour", l = "day", f = "week", d = "month", h = "quarter", p = "year", g = "date", v = "Invalid Date", E = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, A = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, N = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(R) {
      var O = ["th", "st", "nd", "rd"], b = R % 100;
      return "[" + R + (O[(b - 20) % 10] || O[b] || O[0]) + "]";
    } }, S = function(R, O, b) {
      var D = String(R);
      return !D || D.length >= O ? R : "" + Array(O + 1 - D.length).join(b) + R;
    }, j = { s: S, z: function(R) {
      var O = -R.utcOffset(), b = Math.abs(O), D = Math.floor(b / 60), _ = b % 60;
      return (O <= 0 ? "+" : "-") + S(D, 2, "0") + ":" + S(_, 2, "0");
    }, m: function R(O, b) {
      if (O.date() < b.date())
        return -R(b, O);
      var D = 12 * (b.year() - O.year()) + (b.month() - O.month()), _ = O.clone().add(D, d), $ = b - _ < 0, T = O.clone().add(D + ($ ? -1 : 1), d);
      return +(-(D + (b - _) / ($ ? _ - T : T - _)) || 0);
    }, a: function(R) {
      return R < 0 ? Math.ceil(R) || 0 : Math.floor(R);
    }, p: function(R) {
      return { M: d, y: p, w: f, d: l, D: g, h: s, m: u, s: a, ms: i, Q: h }[R] || String(R || "").toLowerCase().replace(/s$/, "");
    }, u: function(R) {
      return R === void 0;
    } }, C = "en", I = {};
    I[C] = N;
    var W = function(R) {
      return R instanceof st;
    }, M = function R(O, b, D) {
      var _;
      if (!O)
        return C;
      if (typeof O == "string") {
        var $ = O.toLowerCase();
        I[$] && (_ = $), b && (I[$] = b, _ = $);
        var T = O.split("-");
        if (!_ && T.length > 1)
          return R(T[0]);
      } else {
        var z = O.name;
        I[z] = O, _ = z;
      }
      return !D && _ && (C = _), _ || !D && C;
    }, P = function(R, O) {
      if (W(R))
        return R.clone();
      var b = typeof O == "object" ? O : {};
      return b.date = R, b.args = arguments, new st(b);
    }, k = j;
    k.l = M, k.i = W, k.w = function(R, O) {
      return P(R, { locale: O.$L, utc: O.$u, x: O.$x, $offset: O.$offset });
    };
    var st = function() {
      function R(b) {
        this.$L = M(b.locale, null, !0), this.parse(b);
      }
      var O = R.prototype;
      return O.parse = function(b) {
        this.$d = function(D) {
          var _ = D.date, $ = D.utc;
          if (_ === null)
            return /* @__PURE__ */ new Date(NaN);
          if (k.u(_))
            return /* @__PURE__ */ new Date();
          if (_ instanceof Date)
            return new Date(_);
          if (typeof _ == "string" && !/Z$/i.test(_)) {
            var T = _.match(E);
            if (T) {
              var z = T[2] - 1 || 0, J = (T[7] || "0").substring(0, 3);
              return $ ? new Date(Date.UTC(T[1], z, T[3] || 1, T[4] || 0, T[5] || 0, T[6] || 0, J)) : new Date(T[1], z, T[3] || 1, T[4] || 0, T[5] || 0, T[6] || 0, J);
            }
          }
          return new Date(_);
        }(b), this.$x = b.x || {}, this.init();
      }, O.init = function() {
        var b = this.$d;
        this.$y = b.getFullYear(), this.$M = b.getMonth(), this.$D = b.getDate(), this.$W = b.getDay(), this.$H = b.getHours(), this.$m = b.getMinutes(), this.$s = b.getSeconds(), this.$ms = b.getMilliseconds();
      }, O.$utils = function() {
        return k;
      }, O.isValid = function() {
        return this.$d.toString() !== v;
      }, O.isSame = function(b, D) {
        var _ = P(b);
        return this.startOf(D) <= _ && _ <= this.endOf(D);
      }, O.isAfter = function(b, D) {
        return P(b) < this.startOf(D);
      }, O.isBefore = function(b, D) {
        return this.endOf(D) < P(b);
      }, O.$g = function(b, D, _) {
        return k.u(b) ? this[D] : this.set(_, b);
      }, O.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, O.valueOf = function() {
        return this.$d.getTime();
      }, O.startOf = function(b, D) {
        var _ = this, $ = !!k.u(D) || D, T = k.p(b), z = function(ct, Q) {
          var ot = k.w(_.$u ? Date.UTC(_.$y, Q, ct) : new Date(_.$y, Q, ct), _);
          return $ ? ot : ot.endOf(l);
        }, J = function(ct, Q) {
          return k.w(_.toDate()[ct].apply(_.toDate("s"), ($ ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(Q)), _);
        }, Y = this.$W, Z = this.$M, ft = this.$D, ut = "set" + (this.$u ? "UTC" : "");
        switch (T) {
          case p:
            return $ ? z(1, 0) : z(31, 11);
          case d:
            return $ ? z(1, Z) : z(0, Z + 1);
          case f:
            var vt = this.$locale().weekStart || 0, mt = (Y < vt ? Y + 7 : Y) - vt;
            return z($ ? ft - mt : ft + (6 - mt), Z);
          case l:
          case g:
            return J(ut + "Hours", 0);
          case s:
            return J(ut + "Minutes", 1);
          case u:
            return J(ut + "Seconds", 2);
          case a:
            return J(ut + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, O.endOf = function(b) {
        return this.startOf(b, !1);
      }, O.$set = function(b, D) {
        var _, $ = k.p(b), T = "set" + (this.$u ? "UTC" : ""), z = (_ = {}, _[l] = T + "Date", _[g] = T + "Date", _[d] = T + "Month", _[p] = T + "FullYear", _[s] = T + "Hours", _[u] = T + "Minutes", _[a] = T + "Seconds", _[i] = T + "Milliseconds", _)[$], J = $ === l ? this.$D + (D - this.$W) : D;
        if ($ === d || $ === p) {
          var Y = this.clone().set(g, 1);
          Y.$d[z](J), Y.init(), this.$d = Y.set(g, Math.min(this.$D, Y.daysInMonth())).$d;
        } else
          z && this.$d[z](J);
        return this.init(), this;
      }, O.set = function(b, D) {
        return this.clone().$set(b, D);
      }, O.get = function(b) {
        return this[k.p(b)]();
      }, O.add = function(b, D) {
        var _, $ = this;
        b = Number(b);
        var T = k.p(D), z = function(Z) {
          var ft = P($);
          return k.w(ft.date(ft.date() + Math.round(Z * b)), $);
        };
        if (T === d)
          return this.set(d, this.$M + b);
        if (T === p)
          return this.set(p, this.$y + b);
        if (T === l)
          return z(1);
        if (T === f)
          return z(7);
        var J = (_ = {}, _[u] = n, _[s] = o, _[a] = r, _)[T] || 1, Y = this.$d.getTime() + b * J;
        return k.w(Y, this);
      }, O.subtract = function(b, D) {
        return this.add(-1 * b, D);
      }, O.format = function(b) {
        var D = this, _ = this.$locale();
        if (!this.isValid())
          return _.invalidDate || v;
        var $ = b || "YYYY-MM-DDTHH:mm:ssZ", T = k.z(this), z = this.$H, J = this.$m, Y = this.$M, Z = _.weekdays, ft = _.months, ut = function(Q, ot, Ht, Dt) {
          return Q && (Q[ot] || Q(D, $)) || Ht[ot].slice(0, Dt);
        }, vt = function(Q) {
          return k.s(z % 12 || 12, Q, "0");
        }, mt = _.meridiem || function(Q, ot, Ht) {
          var Dt = Q < 12 ? "AM" : "PM";
          return Ht ? Dt.toLowerCase() : Dt;
        }, ct = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: Y + 1, MM: k.s(Y + 1, 2, "0"), MMM: ut(_.monthsShort, Y, ft, 3), MMMM: ut(ft, Y), D: this.$D, DD: k.s(this.$D, 2, "0"), d: String(this.$W), dd: ut(_.weekdaysMin, this.$W, Z, 2), ddd: ut(_.weekdaysShort, this.$W, Z, 3), dddd: Z[this.$W], H: String(z), HH: k.s(z, 2, "0"), h: vt(1), hh: vt(2), a: mt(z, J, !0), A: mt(z, J, !1), m: String(J), mm: k.s(J, 2, "0"), s: String(this.$s), ss: k.s(this.$s, 2, "0"), SSS: k.s(this.$ms, 3, "0"), Z: T };
        return $.replace(A, function(Q, ot) {
          return ot || ct[Q] || T.replace(":", "");
        });
      }, O.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, O.diff = function(b, D, _) {
        var $, T = k.p(D), z = P(b), J = (z.utcOffset() - this.utcOffset()) * n, Y = this - z, Z = k.m(this, z);
        return Z = ($ = {}, $[p] = Z / 12, $[d] = Z, $[h] = Z / 3, $[f] = (Y - J) / 6048e5, $[l] = (Y - J) / 864e5, $[s] = Y / o, $[u] = Y / n, $[a] = Y / r, $)[T] || Y, _ ? Z : k.a(Z);
      }, O.daysInMonth = function() {
        return this.endOf(d).$D;
      }, O.$locale = function() {
        return I[this.$L];
      }, O.locale = function(b, D) {
        if (!b)
          return this.$L;
        var _ = this.clone(), $ = M(b, D, !0);
        return $ && (_.$L = $), _;
      }, O.clone = function() {
        return k.w(this.$d, this);
      }, O.toDate = function() {
        return new Date(this.valueOf());
      }, O.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, O.toISOString = function() {
        return this.$d.toISOString();
      }, O.toString = function() {
        return this.$d.toUTCString();
      }, R;
    }(), ie = st.prototype;
    return P.prototype = ie, [["$ms", i], ["$s", a], ["$m", u], ["$H", s], ["$W", l], ["$M", d], ["$y", p], ["$D", g]].forEach(function(R) {
      ie[R[1]] = function(O) {
        return this.$g(O, R[0], R[1]);
      };
    }), P.extend = function(R, O) {
      return R.$i || (R(O, st, P), R.$i = !0), P;
    }, P.locale = M, P.isDayjs = W, P.unix = function(R) {
      return P(1e3 * R);
    }, P.en = I[C], P.Ls = I, P.p = {}, P;
  });
})(Vo);
var Kl = Vo.exports;
const Ho = /* @__PURE__ */ Ae(Kl);
var Bo = { exports: {} };
(function(t, e) {
  (function(r, n) {
    t.exports = n();
  })(Ir, function() {
    var r = "minute", n = /[+-]\d\d(?::?\d\d)?/g, o = /([+-]|\d\d)/g;
    return function(i, a, u) {
      var s = a.prototype;
      u.utc = function(v) {
        var E = { date: v, utc: !0, args: arguments };
        return new a(E);
      }, s.utc = function(v) {
        var E = u(this.toDate(), { locale: this.$L, utc: !0 });
        return v ? E.add(this.utcOffset(), r) : E;
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
      var d = s.utcOffset;
      s.utcOffset = function(v, E) {
        var A = this.$utils().u;
        if (A(v))
          return this.$u ? 0 : A(this.$offset) ? d.call(this) : this.$offset;
        if (typeof v == "string" && (v = function(C) {
          C === void 0 && (C = "");
          var I = C.match(n);
          if (!I)
            return null;
          var W = ("" + I[0]).match(o) || ["-", 0, 0], M = W[0], P = 60 * +W[1] + +W[2];
          return P === 0 ? 0 : M === "+" ? P : -P;
        }(v), v === null))
          return this;
        var N = Math.abs(v) <= 16 ? 60 * v : v, S = this;
        if (E)
          return S.$offset = N, S.$u = v === 0, S;
        if (v !== 0) {
          var j = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
          (S = this.local().add(N + j, r)).$offset = N, S.$x.$localOffset = j;
        } else
          S = this.utc();
        return S;
      };
      var h = s.format;
      s.format = function(v) {
        var E = v || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
        return h.call(this, E);
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
      var g = s.diff;
      s.diff = function(v, E, A) {
        if (v && this.$u === v.$u)
          return g.call(this, v, E, A);
        var N = this.local(), S = u(v).local();
        return g.call(N, S, E, A);
      };
    };
  });
})(Bo);
var Gl = Bo.exports;
const Zl = /* @__PURE__ */ Ae(Gl);
var Wo = { exports: {} };
(function(t, e) {
  (function(r, n) {
    t.exports = n();
  })(Ir, function() {
    var r = { year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5 }, n = {};
    return function(o, i, a) {
      var u, s = function(h, p, g) {
        g === void 0 && (g = {});
        var v = new Date(h), E = function(A, N) {
          N === void 0 && (N = {});
          var S = N.timeZoneName || "short", j = A + "|" + S, C = n[j];
          return C || (C = new Intl.DateTimeFormat("en-US", { hour12: !1, timeZone: A, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: S }), n[j] = C), C;
        }(p, g);
        return E.formatToParts(v);
      }, l = function(h, p) {
        for (var g = s(h, p), v = [], E = 0; E < g.length; E += 1) {
          var A = g[E], N = A.type, S = A.value, j = r[N];
          j >= 0 && (v[j] = parseInt(S, 10));
        }
        var C = v[3], I = C === 24 ? 0 : C, W = v[0] + "-" + v[1] + "-" + v[2] + " " + I + ":" + v[4] + ":" + v[5] + ":000", M = +h;
        return (a.utc(W).valueOf() - (M -= M % 1e3)) / 6e4;
      }, f = i.prototype;
      f.tz = function(h, p) {
        h === void 0 && (h = u);
        var g = this.utcOffset(), v = this.toDate(), E = v.toLocaleString("en-US", { timeZone: h }), A = Math.round((v - new Date(E)) / 1e3 / 60), N = a(E).$set("millisecond", this.$ms).utcOffset(15 * -Math.round(v.getTimezoneOffset() / 15) - A, !0);
        if (p) {
          var S = N.utcOffset();
          N = N.add(g - S, "minute");
        }
        return N.$x.$timezone = h, N;
      }, f.offsetName = function(h) {
        var p = this.$x.$timezone || a.tz.guess(), g = s(this.valueOf(), p, { timeZoneName: h }).find(function(v) {
          return v.type.toLowerCase() === "timezonename";
        });
        return g && g.value;
      };
      var d = f.startOf;
      f.startOf = function(h, p) {
        if (!this.$x || !this.$x.$timezone)
          return d.call(this, h, p);
        var g = a(this.format("YYYY-MM-DD HH:mm:ss:SSS"));
        return d.call(g, h, p).tz(this.$x.$timezone, !0);
      }, a.tz = function(h, p, g) {
        var v = g && p, E = g || p || u, A = l(+a(), E);
        if (typeof h != "string")
          return a(h).tz(E);
        var N = function(I, W, M) {
          var P = I - 60 * W * 1e3, k = l(P, M);
          if (W === k)
            return [P, W];
          var st = l(P -= 60 * (k - W) * 1e3, M);
          return k === st ? [P, k] : [I - 60 * Math.min(k, st) * 1e3, Math.max(k, st)];
        }(a.utc(h, v).valueOf(), A, E), S = N[0], j = N[1], C = a(S).utcOffset(j);
        return C.$x.$timezone = E, C;
      }, a.tz.guess = function() {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
      }, a.tz.setDefault = function(h) {
        u = h;
      };
    };
  });
})(Wo);
var Ql = Wo.exports;
const Xl = /* @__PURE__ */ Ae(Ql);
Ho.extend(Zl);
Ho.extend(Xl);
function Mn(t) {
  for (const e in t)
    Object.prototype.hasOwnProperty.call(t, e) && t[e] === void 0 && delete t[e];
  return t;
}
const cr = (t, e = "", r = new FormData()) => (Object.keys(t).forEach((n) => {
  const o = e !== "" ? e + "." + n : n, i = t[n];
  Array.isArray(i) ? i.forEach((a, u) => {
    typeof a == "object" ? a instanceof File ? r.append(o, a) : r = cr(a, o + `[${u}]`, r) : r.append(o, a);
  }) : typeof i == "object" ? i instanceof File ? r.append(o, i) : r = cr(i, o, r) : r.append(o, i);
}), r), _e = (t, e = "", r = new URLSearchParams()) => (Object.keys(t).forEach((n) => {
  const o = e !== "" ? e + "." + n : n, i = t[n];
  Array.isArray(i) ? i.forEach((a, u) => {
    typeof a == "object" ? r = _e(a, o + `[${u}]`, r) : r.append(o, a);
  }) : typeof i == "object" ? r = _e(i, o, r) : r.append(o, i);
}), r);
function lr(t) {
  this.message = t;
}
lr.prototype = new Error(), lr.prototype.name = "InvalidCharacterError";
typeof window < "u" && window.atob && window.atob.bind(window);
function Fn(t) {
  this.message = t;
}
Fn.prototype = new Error(), Fn.prototype.name = "InvalidTokenError";
function Yo(t, e) {
  return function() {
    return t.apply(e, arguments);
  };
}
const { toString: qo } = Object.prototype, { getPrototypeOf: Mr } = Object, Fr = ((t) => (e) => {
  const r = qo.call(e);
  return t[r] || (t[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), Et = (t) => (t = t.toLowerCase(), (e) => Fr(e) === t), Ne = (t) => (e) => typeof e === t, { isArray: Vt } = Array, Zt = Ne("undefined");
function tf(t) {
  return t !== null && !Zt(t) && t.constructor !== null && !Zt(t.constructor) && Nt(t.constructor.isBuffer) && t.constructor.isBuffer(t);
}
const Jo = Et("ArrayBuffer");
function ef(t) {
  let e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(t) : e = t && t.buffer && Jo(t.buffer), e;
}
const rf = Ne("string"), Nt = Ne("function"), Ko = Ne("number"), zr = (t) => t !== null && typeof t == "object", nf = (t) => t === !0 || t === !1, pe = (t) => {
  if (Fr(t) !== "object")
    return !1;
  const e = Mr(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in t) && !(Symbol.iterator in t);
}, of = Et("Date"), af = Et("File"), sf = Et("Blob"), uf = Et("FileList"), cf = (t) => zr(t) && Nt(t.pipe), lf = (t) => {
  const e = "[object FormData]";
  return t && (typeof FormData == "function" && t instanceof FormData || qo.call(t) === e || Nt(t.toString) && t.toString() === e);
}, ff = Et("URLSearchParams"), pf = (t) => t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function ne(t, e, { allOwnKeys: r = !1 } = {}) {
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
function Go(t, e) {
  e = e.toLowerCase();
  const r = Object.keys(t);
  let n = r.length, o;
  for (; n-- > 0; )
    if (o = r[n], e === o.toLowerCase())
      return o;
  return null;
}
const Zo = typeof self > "u" ? typeof global > "u" ? globalThis : global : self, Qo = (t) => !Zt(t) && t !== Zo;
function fr() {
  const { caseless: t } = Qo(this) && this || {}, e = {}, r = (n, o) => {
    const i = t && Go(e, o) || o;
    pe(e[i]) && pe(n) ? e[i] = fr(e[i], n) : pe(n) ? e[i] = fr({}, n) : Vt(n) ? e[i] = n.slice() : e[i] = n;
  };
  for (let n = 0, o = arguments.length; n < o; n++)
    arguments[n] && ne(arguments[n], r);
  return e;
}
const hf = (t, e, r, { allOwnKeys: n } = {}) => (ne(e, (o, i) => {
  r && Nt(o) ? t[i] = Yo(o, r) : t[i] = o;
}, { allOwnKeys: n }), t), df = (t) => (t.charCodeAt(0) === 65279 && (t = t.slice(1)), t), vf = (t, e, r, n) => {
  t.prototype = Object.create(e.prototype, n), t.prototype.constructor = t, Object.defineProperty(t, "super", {
    value: e.prototype
  }), r && Object.assign(t.prototype, r);
}, mf = (t, e, r, n) => {
  let o, i, a;
  const u = {};
  if (e = e || {}, t == null)
    return e;
  do {
    for (o = Object.getOwnPropertyNames(t), i = o.length; i-- > 0; )
      a = o[i], (!n || n(a, t, e)) && !u[a] && (e[a] = t[a], u[a] = !0);
    t = r !== !1 && Mr(t);
  } while (t && (!r || r(t, e)) && t !== Object.prototype);
  return e;
}, gf = (t, e, r) => {
  t = String(t), (r === void 0 || r > t.length) && (r = t.length), r -= e.length;
  const n = t.indexOf(e, r);
  return n !== -1 && n === r;
}, yf = (t) => {
  if (!t)
    return null;
  if (Vt(t))
    return t;
  let e = t.length;
  if (!Ko(e))
    return null;
  const r = new Array(e);
  for (; e-- > 0; )
    r[e] = t[e];
  return r;
}, bf = ((t) => (e) => t && e instanceof t)(typeof Uint8Array < "u" && Mr(Uint8Array)), Of = (t, e) => {
  const r = (t && t[Symbol.iterator]).call(t);
  let n;
  for (; (n = r.next()) && !n.done; ) {
    const o = n.value;
    e.call(t, o[0], o[1]);
  }
}, wf = (t, e) => {
  let r;
  const n = [];
  for (; (r = t.exec(e)) !== null; )
    n.push(r);
  return n;
}, _f = Et("HTMLFormElement"), Ef = (t) => t.toLowerCase().replace(
  /[_-\s]([a-z\d])(\w*)/g,
  function(e, r, n) {
    return r.toUpperCase() + n;
  }
), zn = (({ hasOwnProperty: t }) => (e, r) => t.call(e, r))(Object.prototype), Sf = Et("RegExp"), Xo = (t, e) => {
  const r = Object.getOwnPropertyDescriptors(t), n = {};
  ne(r, (o, i) => {
    e(o, i, t) !== !1 && (n[i] = o);
  }), Object.defineProperties(t, n);
}, jf = (t) => {
  Xo(t, (e, r) => {
    if (Nt(t) && ["arguments", "caller", "callee"].indexOf(r) !== -1)
      return !1;
    const n = t[r];
    if (Nt(n)) {
      if (e.enumerable = !1, "writable" in e) {
        e.writable = !1;
        return;
      }
      e.set || (e.set = () => {
        throw Error("Can not rewrite read-only method '" + r + "'");
      });
    }
  });
}, xf = (t, e) => {
  const r = {}, n = (o) => {
    o.forEach((i) => {
      r[i] = !0;
    });
  };
  return Vt(t) ? n(t) : n(String(t).split(e)), r;
}, Rf = () => {
}, Df = (t, e) => (t = +t, Number.isFinite(t) ? t : e), Tf = (t) => {
  const e = new Array(10), r = (n, o) => {
    if (zr(n)) {
      if (e.indexOf(n) >= 0)
        return;
      if (!("toJSON" in n)) {
        e[o] = n;
        const i = Vt(n) ? [] : {};
        return ne(n, (a, u) => {
          const s = r(a, o + 1);
          !Zt(s) && (i[u] = s);
        }), e[o] = void 0, i;
      }
    }
    return n;
  };
  return r(t, 0);
}, m = {
  isArray: Vt,
  isArrayBuffer: Jo,
  isBuffer: tf,
  isFormData: lf,
  isArrayBufferView: ef,
  isString: rf,
  isNumber: Ko,
  isBoolean: nf,
  isObject: zr,
  isPlainObject: pe,
  isUndefined: Zt,
  isDate: of,
  isFile: af,
  isBlob: sf,
  isRegExp: Sf,
  isFunction: Nt,
  isStream: cf,
  isURLSearchParams: ff,
  isTypedArray: bf,
  isFileList: uf,
  forEach: ne,
  merge: fr,
  extend: hf,
  trim: pf,
  stripBOM: df,
  inherits: vf,
  toFlatObject: mf,
  kindOf: Fr,
  kindOfTest: Et,
  endsWith: gf,
  toArray: yf,
  forEachEntry: Of,
  matchAll: wf,
  isHTMLForm: _f,
  hasOwnProperty: zn,
  hasOwnProp: zn,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Xo,
  freezeMethods: jf,
  toObjectSet: xf,
  toCamelCase: Ef,
  noop: Rf,
  toFiniteNumber: Df,
  findKey: Go,
  global: Zo,
  isContextDefined: Qo,
  toJSONObject: Tf
};
function F(t, e, r, n, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = t, this.name = "AxiosError", e && (this.code = e), r && (this.config = r), n && (this.request = n), o && (this.response = o);
}
m.inherits(F, Error, {
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
      config: m.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const ti = F.prototype, ei = {};
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
  ei[t] = { value: t };
});
Object.defineProperties(F, ei);
Object.defineProperty(ti, "isAxiosError", { value: !0 });
F.from = (t, e, r, n, o, i) => {
  const a = Object.create(ti);
  return m.toFlatObject(t, a, function(u) {
    return u !== Error.prototype;
  }, (u) => u !== "isAxiosError"), F.call(a, t.message, e, r, n, o), a.cause = t, a.name = t.name, i && Object.assign(a, i), a;
};
var $f = typeof self == "object" ? self.FormData : window.FormData;
const Af = /* @__PURE__ */ Ae($f);
function pr(t) {
  return m.isPlainObject(t) || m.isArray(t);
}
function ri(t) {
  return m.endsWith(t, "[]") ? t.slice(0, -2) : t;
}
function Vn(t, e, r) {
  return t ? t.concat(e).map(function(n, o) {
    return n = ri(n), !r && o ? "[" + n + "]" : n;
  }).join(r ? "." : "") : e;
}
function Nf(t) {
  return m.isArray(t) && !t.some(pr);
}
const Cf = m.toFlatObject(m, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function Pf(t) {
  return t && m.isFunction(t.append) && t[Symbol.toStringTag] === "FormData" && t[Symbol.iterator];
}
function Ce(t, e, r) {
  if (!m.isObject(t))
    throw new TypeError("target must be an object");
  e = e || new (Af || FormData)(), r = m.toFlatObject(r, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(p, g) {
    return !m.isUndefined(g[p]);
  });
  const n = r.metaTokens, o = r.visitor || l, i = r.dots, a = r.indexes, u = (r.Blob || typeof Blob < "u" && Blob) && Pf(e);
  if (!m.isFunction(o))
    throw new TypeError("visitor must be a function");
  function s(p) {
    if (p === null)
      return "";
    if (m.isDate(p))
      return p.toISOString();
    if (!u && m.isBlob(p))
      throw new F("Blob is not supported. Use a Buffer instead.");
    return m.isArrayBuffer(p) || m.isTypedArray(p) ? u && typeof Blob == "function" ? new Blob([p]) : Buffer.from(p) : p;
  }
  function l(p, g, v) {
    let E = p;
    if (p && !v && typeof p == "object") {
      if (m.endsWith(g, "{}"))
        g = n ? g : g.slice(0, -2), p = JSON.stringify(p);
      else if (m.isArray(p) && Nf(p) || m.isFileList(p) || m.endsWith(g, "[]") && (E = m.toArray(p)))
        return g = ri(g), E.forEach(function(A, N) {
          !(m.isUndefined(A) || A === null) && e.append(
            // eslint-disable-next-line no-nested-ternary
            a === !0 ? Vn([g], N, i) : a === null ? g : g + "[]",
            s(A)
          );
        }), !1;
    }
    return pr(p) ? !0 : (e.append(Vn(v, g, i), s(p)), !1);
  }
  const f = [], d = Object.assign(Cf, {
    defaultVisitor: l,
    convertValue: s,
    isVisitable: pr
  });
  function h(p, g) {
    if (!m.isUndefined(p)) {
      if (f.indexOf(p) !== -1)
        throw Error("Circular reference detected in " + g.join("."));
      f.push(p), m.forEach(p, function(v, E) {
        (!(m.isUndefined(v) || v === null) && o.call(
          e,
          v,
          m.isString(E) ? E.trim() : E,
          g,
          d
        )) === !0 && h(v, g ? g.concat(E) : [E]);
      }), f.pop();
    }
  }
  if (!m.isObject(t))
    throw new TypeError("data must be an object");
  return h(t), e;
}
function Hn(t) {
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
function Vr(t, e) {
  this._pairs = [], t && Ce(t, this, e);
}
const ni = Vr.prototype;
ni.append = function(t, e) {
  this._pairs.push([t, e]);
};
ni.toString = function(t) {
  const e = t ? function(r) {
    return t.call(this, r, Hn);
  } : Hn;
  return this._pairs.map(function(r) {
    return e(r[0]) + "=" + e(r[1]);
  }, "").join("&");
};
function kf(t) {
  return encodeURIComponent(t).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function oi(t, e, r) {
  if (!e)
    return t;
  const n = r && r.encode || kf, o = r && r.serialize;
  let i;
  if (o ? i = o(e, r) : i = m.isURLSearchParams(e) ? e.toString() : new Vr(e, r).toString(n), i) {
    const a = t.indexOf("#");
    a !== -1 && (t = t.slice(0, a)), t += (t.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return t;
}
class Uf {
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
    m.forEach(this.handlers, function(r) {
      r !== null && e(r);
    });
  }
}
const Bn = Uf, ii = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Lf = typeof URLSearchParams < "u" ? URLSearchParams : Vr, If = FormData, Mf = (() => {
  let t;
  return typeof navigator < "u" && ((t = navigator.product) === "ReactNative" || t === "NativeScript" || t === "NS") ? !1 : typeof window < "u" && typeof document < "u";
})(), Ff = (() => typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), pt = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Lf,
    FormData: If,
    Blob
  },
  isStandardBrowserEnv: Mf,
  isStandardBrowserWebWorkerEnv: Ff,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function zf(t, e) {
  return Ce(t, new pt.classes.URLSearchParams(), Object.assign({
    visitor: function(r, n, o, i) {
      return pt.isNode && m.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments);
    }
  }, e));
}
function Vf(t) {
  return m.matchAll(/\w+|\[(\w*)]/g, t).map((e) => e[0] === "[]" ? "" : e[1] || e[0]);
}
function Hf(t) {
  const e = {}, r = Object.keys(t);
  let n;
  const o = r.length;
  let i;
  for (n = 0; n < o; n++)
    i = r[n], e[i] = t[i];
  return e;
}
function ai(t) {
  function e(r, n, o, i) {
    let a = r[i++];
    const u = Number.isFinite(+a), s = i >= r.length;
    return a = !a && m.isArray(o) ? o.length : a, s ? (m.hasOwnProp(o, a) ? o[a] = [o[a], n] : o[a] = n, !u) : ((!o[a] || !m.isObject(o[a])) && (o[a] = []), e(r, n, o[a], i) && m.isArray(o[a]) && (o[a] = Hf(o[a])), !u);
  }
  if (m.isFormData(t) && m.isFunction(t.entries)) {
    const r = {};
    return m.forEachEntry(t, (n, o) => {
      e(Vf(n), o, r, 0);
    }), r;
  }
  return null;
}
const Bf = {
  "Content-Type": void 0
};
function Wf(t, e, r) {
  if (m.isString(t))
    try {
      return (e || JSON.parse)(t), m.trim(t);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (r || JSON.stringify)(t);
}
const Pe = {
  transitional: ii,
  adapter: ["xhr", "http"],
  transformRequest: [function(t, e) {
    const r = e.getContentType() || "", n = r.indexOf("application/json") > -1, o = m.isObject(t);
    if (o && m.isHTMLForm(t) && (t = new FormData(t)), m.isFormData(t))
      return n && n ? JSON.stringify(ai(t)) : t;
    if (m.isArrayBuffer(t) || m.isBuffer(t) || m.isStream(t) || m.isFile(t) || m.isBlob(t))
      return t;
    if (m.isArrayBufferView(t))
      return t.buffer;
    if (m.isURLSearchParams(t))
      return e.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let i;
    if (o) {
      if (r.indexOf("application/x-www-form-urlencoded") > -1)
        return zf(t, this.formSerializer).toString();
      if ((i = m.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
        const a = this.env && this.env.FormData;
        return Ce(
          i ? { "files[]": t } : t,
          a && new a(),
          this.formSerializer
        );
      }
    }
    return o || n ? (e.setContentType("application/json", !1), Wf(t)) : t;
  }],
  transformResponse: [function(t) {
    const e = this.transitional || Pe.transitional, r = e && e.forcedJSONParsing, n = this.responseType === "json";
    if (t && m.isString(t) && (r && !this.responseType || n)) {
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
m.forEach(["delete", "get", "head"], function(t) {
  Pe.headers[t] = {};
});
m.forEach(["post", "put", "patch"], function(t) {
  Pe.headers[t] = m.merge(Bf);
});
const Hr = Pe, Yf = m.toObjectSet([
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
]), qf = (t) => {
  const e = {};
  let r, n, o;
  return t && t.split(`
`).forEach(function(i) {
    o = i.indexOf(":"), r = i.substring(0, o).trim().toLowerCase(), n = i.substring(o + 1).trim(), !(!r || e[r] && Yf[r]) && (r === "set-cookie" ? e[r] ? e[r].push(n) : e[r] = [n] : e[r] = e[r] ? e[r] + ", " + n : n);
  }), e;
}, Wn = Symbol("internals");
function Yt(t) {
  return t && String(t).trim().toLowerCase();
}
function he(t) {
  return t === !1 || t == null ? t : m.isArray(t) ? t.map(he) : String(t);
}
function Jf(t) {
  const e = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(t); )
    e[n[1]] = n[2];
  return e;
}
function Kf(t) {
  return /^[-_a-zA-Z]+$/.test(t.trim());
}
function Yn(t, e, r, n) {
  if (m.isFunction(n))
    return n.call(this, e, r);
  if (m.isString(e)) {
    if (m.isString(n))
      return e.indexOf(n) !== -1;
    if (m.isRegExp(n))
      return n.test(e);
  }
}
function Gf(t) {
  return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, r, n) => r.toUpperCase() + n);
}
function Zf(t, e) {
  const r = m.toCamelCase(" " + e);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(t, n + r, {
      value: function(o, i, a) {
        return this[n].call(this, e, o, i, a);
      },
      configurable: !0
    });
  });
}
let ke = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, e, r) {
    const n = this;
    function o(a, u, s) {
      const l = Yt(u);
      if (!l)
        throw new Error("header name must be a non-empty string");
      const f = m.findKey(n, l);
      (!f || n[f] === void 0 || s === !0 || s === void 0 && n[f] !== !1) && (n[f || u] = he(a));
    }
    const i = (a, u) => m.forEach(a, (s, l) => o(s, l, u));
    return m.isPlainObject(t) || t instanceof this.constructor ? i(t, e) : m.isString(t) && (t = t.trim()) && !Kf(t) ? i(qf(t), e) : t != null && o(e, t, r), this;
  }
  get(t, e) {
    if (t = Yt(t), t) {
      const r = m.findKey(this, t);
      if (r) {
        const n = this[r];
        if (!e)
          return n;
        if (e === !0)
          return Jf(n);
        if (m.isFunction(e))
          return e.call(this, n, r);
        if (m.isRegExp(e))
          return e.exec(n);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, e) {
    if (t = Yt(t), t) {
      const r = m.findKey(this, t);
      return !!(r && (!e || Yn(this, this[r], r, e)));
    }
    return !1;
  }
  delete(t, e) {
    const r = this;
    let n = !1;
    function o(i) {
      if (i = Yt(i), i) {
        const a = m.findKey(r, i);
        a && (!e || Yn(r, r[a], a, e)) && (delete r[a], n = !0);
      }
    }
    return m.isArray(t) ? t.forEach(o) : o(t), n;
  }
  clear() {
    return Object.keys(this).forEach(this.delete.bind(this));
  }
  normalize(t) {
    const e = this, r = {};
    return m.forEach(this, (n, o) => {
      const i = m.findKey(r, o);
      if (i) {
        e[i] = he(n), delete e[o];
        return;
      }
      const a = t ? Gf(o) : String(o).trim();
      a !== o && delete e[o], e[a] = he(n), r[a] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const e = /* @__PURE__ */ Object.create(null);
    return m.forEach(this, (r, n) => {
      r != null && r !== !1 && (e[n] = t && m.isArray(r) ? r.join(", ") : r);
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
    const e = (this[Wn] = this[Wn] = {
      accessors: {}
    }).accessors, r = this.prototype;
    function n(o) {
      const i = Yt(o);
      e[i] || (Zf(r, o), e[i] = !0);
    }
    return m.isArray(t) ? t.forEach(n) : n(t), this;
  }
};
ke.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent"]);
m.freezeMethods(ke.prototype);
m.freezeMethods(ke);
const bt = ke;
function Je(t, e) {
  const r = this || Hr, n = e || r, o = bt.from(n.headers);
  let i = n.data;
  return m.forEach(t, function(a) {
    i = a.call(r, i, o.normalize(), e ? e.status : void 0);
  }), o.normalize(), i;
}
function si(t) {
  return !!(t && t.__CANCEL__);
}
function oe(t, e, r) {
  F.call(this, t ?? "canceled", F.ERR_CANCELED, e, r), this.name = "CanceledError";
}
m.inherits(oe, F, {
  __CANCEL__: !0
});
const Qf = null;
function Xf(t, e, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? t(r) : e(new F(
    "Request failed with status code " + r.status,
    [F.ERR_BAD_REQUEST, F.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
    r.config,
    r.request,
    r
  ));
}
const tp = pt.isStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  function() {
    return {
      write: function(t, e, r, n, o, i) {
        const a = [];
        a.push(t + "=" + encodeURIComponent(e)), m.isNumber(r) && a.push("expires=" + new Date(r).toGMTString()), m.isString(n) && a.push("path=" + n), m.isString(o) && a.push("domain=" + o), i === !0 && a.push("secure"), document.cookie = a.join("; ");
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
function ep(t) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
}
function rp(t, e) {
  return e ? t.replace(/\/+$/, "") + "/" + e.replace(/^\/+/, "") : t;
}
function ui(t, e) {
  return t && !ep(e) ? rp(t, e) : e;
}
const np = pt.isStandardBrowserEnv ? (
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
      const i = m.isString(o) ? n(o) : o;
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
function op(t) {
  const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
  return e && e[1] || "";
}
function ip(t, e) {
  t = t || 10;
  const r = new Array(t), n = new Array(t);
  let o = 0, i = 0, a;
  return e = e !== void 0 ? e : 1e3, function(u) {
    const s = Date.now(), l = n[i];
    a || (a = s), r[o] = u, n[o] = s;
    let f = i, d = 0;
    for (; f !== o; )
      d += r[f++], f = f % t;
    if (o = (o + 1) % t, o === i && (i = (i + 1) % t), s - a < e)
      return;
    const h = l && s - l;
    return h ? Math.round(d * 1e3 / h) : void 0;
  };
}
function qn(t, e) {
  let r = 0;
  const n = ip(50, 250);
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
const ap = typeof XMLHttpRequest < "u", sp = ap && function(t) {
  return new Promise(function(e, r) {
    let n = t.data;
    const o = bt.from(t.headers).normalize(), i = t.responseType;
    let a;
    function u() {
      t.cancelToken && t.cancelToken.unsubscribe(a), t.signal && t.signal.removeEventListener("abort", a);
    }
    m.isFormData(n) && (pt.isStandardBrowserEnv || pt.isStandardBrowserWebWorkerEnv) && o.setContentType(!1);
    let s = new XMLHttpRequest();
    if (t.auth) {
      const h = t.auth.username || "", p = t.auth.password ? unescape(encodeURIComponent(t.auth.password)) : "";
      o.set("Authorization", "Basic " + btoa(h + ":" + p));
    }
    const l = ui(t.baseURL, t.url);
    s.open(t.method.toUpperCase(), oi(l, t.params, t.paramsSerializer), !0), s.timeout = t.timeout;
    function f() {
      if (!s)
        return;
      const h = bt.from(
        "getAllResponseHeaders" in s && s.getAllResponseHeaders()
      ), p = {
        data: !i || i === "text" || i === "json" ? s.responseText : s.response,
        status: s.status,
        statusText: s.statusText,
        headers: h,
        config: t,
        request: s
      };
      Xf(function(g) {
        e(g), u();
      }, function(g) {
        r(g), u();
      }, p), s = null;
    }
    if ("onloadend" in s ? s.onloadend = f : s.onreadystatechange = function() {
      !s || s.readyState !== 4 || s.status === 0 && !(s.responseURL && s.responseURL.indexOf("file:") === 0) || setTimeout(f);
    }, s.onabort = function() {
      s && (r(new F("Request aborted", F.ECONNABORTED, t, s)), s = null);
    }, s.onerror = function() {
      r(new F("Network Error", F.ERR_NETWORK, t, s)), s = null;
    }, s.ontimeout = function() {
      let h = t.timeout ? "timeout of " + t.timeout + "ms exceeded" : "timeout exceeded";
      const p = t.transitional || ii;
      t.timeoutErrorMessage && (h = t.timeoutErrorMessage), r(new F(
        h,
        p.clarifyTimeoutError ? F.ETIMEDOUT : F.ECONNABORTED,
        t,
        s
      )), s = null;
    }, pt.isStandardBrowserEnv) {
      const h = (t.withCredentials || np(l)) && t.xsrfCookieName && tp.read(t.xsrfCookieName);
      h && o.set(t.xsrfHeaderName, h);
    }
    n === void 0 && o.setContentType(null), "setRequestHeader" in s && m.forEach(o.toJSON(), function(h, p) {
      s.setRequestHeader(p, h);
    }), m.isUndefined(t.withCredentials) || (s.withCredentials = !!t.withCredentials), i && i !== "json" && (s.responseType = t.responseType), typeof t.onDownloadProgress == "function" && s.addEventListener("progress", qn(t.onDownloadProgress, !0)), typeof t.onUploadProgress == "function" && s.upload && s.upload.addEventListener("progress", qn(t.onUploadProgress)), (t.cancelToken || t.signal) && (a = (h) => {
      s && (r(!h || h.type ? new oe(null, t, s) : h), s.abort(), s = null);
    }, t.cancelToken && t.cancelToken.subscribe(a), t.signal && (t.signal.aborted ? a() : t.signal.addEventListener("abort", a)));
    const d = op(l);
    if (d && pt.protocols.indexOf(d) === -1) {
      r(new F("Unsupported protocol " + d + ":", F.ERR_BAD_REQUEST, t));
      return;
    }
    s.send(n || null);
  });
}, de = {
  http: Qf,
  xhr: sp
};
m.forEach(de, (t, e) => {
  if (t) {
    try {
      Object.defineProperty(t, "name", { value: e });
    } catch {
    }
    Object.defineProperty(t, "adapterName", { value: e });
  }
});
const up = {
  getAdapter: (t) => {
    t = m.isArray(t) ? t : [t];
    const { length: e } = t;
    let r, n;
    for (let o = 0; o < e && (r = t[o], !(n = m.isString(r) ? de[r.toLowerCase()] : r)); o++)
      ;
    if (!n)
      throw n === !1 ? new F(
        `Adapter ${r} is not supported by the environment`,
        "ERR_NOT_SUPPORT"
      ) : new Error(
        m.hasOwnProp(de, r) ? `Adapter '${r}' is not available in the build` : `Unknown adapter '${r}'`
      );
    if (!m.isFunction(n))
      throw new TypeError("adapter is not a function");
    return n;
  },
  adapters: de
};
function Ke(t) {
  if (t.cancelToken && t.cancelToken.throwIfRequested(), t.signal && t.signal.aborted)
    throw new oe(null, t);
}
function Jn(t) {
  return Ke(t), t.headers = bt.from(t.headers), t.data = Je.call(
    t,
    t.transformRequest
  ), ["post", "put", "patch"].indexOf(t.method) !== -1 && t.headers.setContentType("application/x-www-form-urlencoded", !1), up.getAdapter(t.adapter || Hr.adapter)(t).then(function(e) {
    return Ke(t), e.data = Je.call(
      t,
      t.transformResponse,
      e
    ), e.headers = bt.from(e.headers), e;
  }, function(e) {
    return si(e) || (Ke(t), e && e.response && (e.response.data = Je.call(
      t,
      t.transformResponse,
      e.response
    ), e.response.headers = bt.from(e.response.headers))), Promise.reject(e);
  });
}
const Kn = (t) => t instanceof bt ? t.toJSON() : t;
function zt(t, e) {
  e = e || {};
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
  function a(l, f) {
    if (m.isUndefined(f)) {
      if (!m.isUndefined(l))
        return n(void 0, l);
    } else
      return n(void 0, f);
  }
  function u(l, f, d) {
    if (d in e)
      return n(l, f);
    if (d in t)
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
    headers: (l, f) => o(Kn(l), Kn(f), !0)
  };
  return m.forEach(Object.keys(t).concat(Object.keys(e)), function(l) {
    const f = s[l] || o, d = f(t[l], e[l], l);
    m.isUndefined(d) && f !== u || (r[l] = d);
  }), r;
}
const ci = "1.2.1", Br = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((t, e) => {
  Br[t] = function(r) {
    return typeof r === t || "a" + (e < 1 ? "n " : " ") + t;
  };
});
const Gn = {};
Br.transitional = function(t, e, r) {
  function n(o, i) {
    return "[Axios v" + ci + "] Transitional option '" + o + "'" + i + (r ? ". " + r : "");
  }
  return (o, i, a) => {
    if (t === !1)
      throw new F(
        n(i, " has been removed" + (e ? " in " + e : "")),
        F.ERR_DEPRECATED
      );
    return e && !Gn[i] && (Gn[i] = !0, console.warn(
      n(
        i,
        " has been deprecated since v" + e + " and will be removed in the near future"
      )
    )), t ? t(o, i, a) : !0;
  };
};
function cp(t, e, r) {
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
  assertOptions: cp,
  validators: Br
}, St = hr.validators;
let Ee = class {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new Bn(),
      response: new Bn()
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
    i = o && m.merge(
      o.common,
      o[e.method]
    ), i && m.forEach(
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
    let l, f = 0, d;
    if (!u) {
      const p = [Jn.bind(this), void 0];
      for (p.unshift.apply(p, a), p.push.apply(p, s), d = p.length, l = Promise.resolve(e); f < d; )
        l = l.then(p[f++], p[f++]);
      return l;
    }
    d = a.length;
    let h = e;
    for (f = 0; f < d; ) {
      const p = a[f++], g = a[f++];
      try {
        h = p(h);
      } catch (v) {
        g.call(this, v);
        break;
      }
    }
    try {
      l = Jn.call(this, h);
    } catch (p) {
      return Promise.reject(p);
    }
    for (f = 0, d = s.length; f < d; )
      l = l.then(s[f++], s[f++]);
    return l;
  }
  getUri(t) {
    t = zt(this.defaults, t);
    const e = ui(t.baseURL, t.url);
    return oi(e, t.params, t.paramsSerializer);
  }
};
m.forEach(["delete", "get", "head", "options"], function(t) {
  Ee.prototype[t] = function(e, r) {
    return this.request(zt(r || {}, {
      method: t,
      url: e,
      data: (r || {}).data
    }));
  };
});
m.forEach(["post", "put", "patch"], function(t) {
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
  Ee.prototype[t] = e(), Ee.prototype[t + "Form"] = e(!0);
});
const ve = Ee;
let lp = class li {
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
      n.reason || (n.reason = new oe(o, i, a), r(n.reason));
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
      token: new li(function(r) {
        e = r;
      }),
      cancel: e
    };
  }
};
const fp = lp;
function pp(t) {
  return function(e) {
    return t.apply(null, e);
  };
}
function hp(t) {
  return m.isObject(t) && t.isAxiosError === !0;
}
function fi(t) {
  const e = new ve(t), r = Yo(ve.prototype.request, e);
  return m.extend(r, ve.prototype, e, { allOwnKeys: !0 }), m.extend(r, e, null, { allOwnKeys: !0 }), r.create = function(n) {
    return fi(zt(t, n));
  }, r;
}
const tt = fi(Hr);
tt.Axios = ve;
tt.CanceledError = oe;
tt.CancelToken = fp;
tt.isCancel = si;
tt.VERSION = ci;
tt.toFormData = Ce;
tt.AxiosError = F;
tt.Cancel = tt.CanceledError;
tt.all = function(t) {
  return Promise.all(t);
};
tt.spread = pp;
tt.isAxiosError = hp;
tt.mergeConfig = zt;
tt.AxiosHeaders = bt;
tt.formToJSON = (t) => ai(m.isHTMLForm(t) ? new FormData(t) : t);
tt.default = tt;
const dp = tt;
var dr = function(t, e) {
  return dr = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
    r.__proto__ = n;
  } || function(r, n) {
    for (var o in n)
      Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
  }, dr(t, e);
};
function Ue(t, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  dr(t, e);
  function r() {
    this.constructor = t;
  }
  t.prototype = e === null ? Object.create(e) : (r.prototype = e.prototype, new r());
}
function vr(t) {
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
function Wr(t) {
  var e = function(n) {
    Error.call(n), n.stack = new Error().stack;
  }, r = t(e);
  return r.prototype = Object.create(Error.prototype), r.prototype.constructor = r, r;
}
var Ge = Wr(function(t) {
  return function(e) {
    t(this), this.message = e ? e.length + ` errors occurred during unsubscription:
` + e.map(function(r, n) {
      return n + 1 + ") " + r.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = e;
  };
});
function yr(t, e) {
  if (t) {
    var r = t.indexOf(e);
    0 <= r && t.splice(r, 1);
  }
}
var Le = function() {
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
            for (var u = vr(a), s = u.next(); !s.done; s = u.next()) {
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
          i = v instanceof Ge ? v.errors : [v];
        }
      var d = this._finalizers;
      if (d) {
        this._finalizers = null;
        try {
          for (var h = vr(d), p = h.next(); !p.done; p = h.next()) {
            var g = p.value;
            try {
              Zn(g);
            } catch (v) {
              i = i ?? [], v instanceof Ge ? i = gr(gr([], mr(i)), mr(v.errors)) : i.push(v);
            }
          }
        } catch (v) {
          n = { error: v };
        } finally {
          try {
            p && !p.done && (o = h.return) && o.call(h);
          } finally {
            if (n)
              throw n.error;
          }
        }
      }
      if (i)
        throw new Ge(i);
    }
  }, t.prototype.add = function(e) {
    var r;
    if (e && e !== this)
      if (this.closed)
        Zn(e);
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
    r === e ? this._parentage = null : Array.isArray(r) && yr(r, e);
  }, t.prototype.remove = function(e) {
    var r = this._finalizers;
    r && yr(r, e), e instanceof t && e._removeParent(this);
  }, t.EMPTY = function() {
    var e = new t();
    return e.closed = !0, e;
  }(), t;
}(), pi = Le.EMPTY;
function hi(t) {
  return t instanceof Le || t && "closed" in t && Ot(t.remove) && Ot(t.add) && Ot(t.unsubscribe);
}
function Zn(t) {
  Ot(t) ? t() : t.unsubscribe();
}
var di = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1
}, vp = {
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
function mp(t) {
  vp.setTimeout(function() {
    throw t;
  });
}
function Qn() {
}
function me(t) {
  t();
}
var vi = function(t) {
  Ue(e, t);
  function e(r) {
    var n = t.call(this) || this;
    return n.isStopped = !1, r ? (n.destination = r, hi(r) && r.add(n)) : n.destination = Op, n;
  }
  return e.create = function(r, n, o) {
    return new br(r, n, o);
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
}(Le), gp = Function.prototype.bind;
function Ze(t, e) {
  return gp.call(t, e);
}
var yp = function() {
  function t(e) {
    this.partialObserver = e;
  }
  return t.prototype.next = function(e) {
    var r = this.partialObserver;
    if (r.next)
      try {
        r.next(e);
      } catch (n) {
        le(n);
      }
  }, t.prototype.error = function(e) {
    var r = this.partialObserver;
    if (r.error)
      try {
        r.error(e);
      } catch (n) {
        le(n);
      }
    else
      le(e);
  }, t.prototype.complete = function() {
    var e = this.partialObserver;
    if (e.complete)
      try {
        e.complete();
      } catch (r) {
        le(r);
      }
  }, t;
}(), br = function(t) {
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
      i && di.useDeprecatedNextContext ? (u = Object.create(r), u.unsubscribe = function() {
        return i.unsubscribe();
      }, a = {
        next: r.next && Ze(r.next, u),
        error: r.error && Ze(r.error, u),
        complete: r.complete && Ze(r.complete, u)
      }) : a = r;
    }
    return i.destination = new yp(a), i;
  }
  return e;
}(vi);
function le(t) {
  mp(t);
}
function bp(t) {
  throw t;
}
var Op = {
  closed: !0,
  next: Qn,
  error: bp,
  complete: Qn
}, wp = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function _p(t) {
  return t;
}
function Ep(t) {
  return t.length === 0 ? _p : t.length === 1 ? t[0] : function(e) {
    return t.reduce(function(r, n) {
      return n(r);
    }, e);
  };
}
var Or = function() {
  function t(e) {
    e && (this._subscribe = e);
  }
  return t.prototype.lift = function(e) {
    var r = new t();
    return r.source = this, r.operator = e, r;
  }, t.prototype.subscribe = function(e, r, n) {
    var o = this, i = jp(e) ? e : new br(e, r, n);
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
    return r = Xn(r), new r(function(o, i) {
      var a = new br({
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
  }, t.prototype[wp] = function() {
    return this;
  }, t.prototype.pipe = function() {
    for (var e = [], r = 0; r < arguments.length; r++)
      e[r] = arguments[r];
    return Ep(e)(this);
  }, t.prototype.toPromise = function(e) {
    var r = this;
    return e = Xn(e), new e(function(n, o) {
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
function Xn(t) {
  var e;
  return (e = t ?? di.Promise) !== null && e !== void 0 ? e : Promise;
}
function Sp(t) {
  return t && Ot(t.next) && Ot(t.error) && Ot(t.complete);
}
function jp(t) {
  return t && t instanceof vi || Sp(t) && hi(t);
}
var xp = Wr(function(t) {
  return function() {
    t(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), Rp = function(t) {
  Ue(e, t);
  function e() {
    var r = t.call(this) || this;
    return r.closed = !1, r.currentObservers = null, r.observers = [], r.isStopped = !1, r.hasError = !1, r.thrownError = null, r;
  }
  return e.prototype.lift = function(r) {
    var n = new to(this, this);
    return n.operator = r, n;
  }, e.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new xp();
  }, e.prototype.next = function(r) {
    var n = this;
    me(function() {
      var o, i;
      if (n._throwIfClosed(), !n.isStopped) {
        n.currentObservers || (n.currentObservers = Array.from(n.observers));
        try {
          for (var a = vr(n.currentObservers), u = a.next(); !u.done; u = a.next()) {
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
    return i || a ? pi : (this.currentObservers = null, u.push(r), new Le(function() {
      n.currentObservers = null, yr(u, r);
    }));
  }, e.prototype._checkFinalizedStatuses = function(r) {
    var n = this, o = n.hasError, i = n.thrownError, a = n.isStopped;
    o ? r.error(i) : a && r.complete();
  }, e.prototype.asObservable = function() {
    var r = new Or();
    return r.source = this, r;
  }, e.create = function(r, n) {
    return new to(r, n);
  }, e;
}(Or), to = function(t) {
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
    return (o = (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(r)) !== null && o !== void 0 ? o : pi;
  }, e;
}(Rp);
Wr(function(t) {
  return function() {
    t(this), this.name = "EmptyError", this.message = "no elements in sequence";
  };
});
class Yr {
  constructor(e) {
    et(this, "config"), et(this, "axios"), e && (this.config = e), this.axios = dp.create(this.config);
  }
  get interceptors() {
    return this.axios.interceptors;
  }
  static create(e) {
    return new Yr(e);
  }
  request(e) {
    return new Or((r) => {
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
function Dp(t) {
  return Yr.create({
    baseURL: t
  });
}
const Mt = class X {
  constructor(e, r) {
    et(this, "axiosInstance"), et(this, "defaultConfig", {
      contentType: "json",
      cache: !1
    }), et(this, "tokenType"), this.axiosInstance = Dp(e), this.setupInterceptor(), r && (this.defaultConfig = {
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
        if (e = await this.useRequestInterceptors(e), e = Ml({}, this.defaultConfig, e), e.headers = {
          ...e.headers,
          ...X.globalHeaders,
          "Content-Type": e.contentType === "formData" ? !1 : e.contentType === "urlEncoded" ? ur.UrlEncoded : ur.Json
        }, !e.preparedData) {
          if ((typeof e.cache < "u" ? e.cache : this.defaultConfig.cache) === !1 && (e.headers["Cache-Control"] = "no-cache", e.params = {
            ...e.params,
            axios_timestamp: Date.now()
          }), e.params = _e(
            Mn({
              ...e.params,
              ...X.globalParams
            })
          ), e.data = {
            ...e.data,
            ...X.globalData
          }, Mn(e.data), JSON.stringify(e.data) === "{}")
            e.data = void 0;
          else
            switch (e.contentType) {
              case "formData":
                e.data = cr(e.data);
                break;
              case "urlEncoded":
                e.data = _e(e.data);
            }
          e.preparedData = !0;
        }
        const r = this.getTokenType(e), n = r ? Jl.getToken(r) : null;
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
var wr = { exports: {} }, It = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Qe, eo;
function mi() {
  if (eo)
    return Qe;
  eo = 1;
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
  return Qe = o() ? Object.assign : function(i, a) {
    for (var u, s = n(i), l, f = 1; f < arguments.length; f++) {
      u = Object(arguments[f]);
      for (var d in u)
        e.call(u, d) && (s[d] = u[d]);
      if (t) {
        l = t(u);
        for (var h = 0; h < l.length; h++)
          r.call(u, l[h]) && (s[l[h]] = u[l[h]]);
      }
    }
    return s;
  }, Qe;
}
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ro;
function $p() {
  if (ro)
    return It;
  ro = 1, mi();
  var t = Qt, e = 60103;
  if (It.Fragment = 60107, typeof Symbol == "function" && Symbol.for) {
    var r = Symbol.for;
    e = r("react.element"), It.Fragment = r("react.fragment");
  }
  var n = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = Object.prototype.hasOwnProperty, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function a(u, s, l) {
    var f, d = {}, h = null, p = null;
    l !== void 0 && (h = "" + l), s.key !== void 0 && (h = "" + s.key), s.ref !== void 0 && (p = s.ref);
    for (f in s)
      o.call(s, f) && !i.hasOwnProperty(f) && (d[f] = s[f]);
    if (u && u.defaultProps)
      for (f in s = u.defaultProps, s)
        d[f] === void 0 && (d[f] = s[f]);
    return { $$typeof: e, type: u, key: h, ref: p, props: d, _owner: n.current };
  }
  return It.jsx = a, It.jsxs = a, It;
}
var no = {};
/** @license React v17.0.2
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var oo;
function Ap() {
  return oo || (oo = 1, function(t) {
    process.env.NODE_ENV !== "production" && function() {
      var e = Qt, r = mi(), n = 60103, o = 60106;
      t.Fragment = 60107;
      var i = 60108, a = 60114, u = 60109, s = 60110, l = 60112, f = 60113, d = 60120, h = 60115, p = 60116, g = 60121, v = 60122, E = 60117, A = 60129, N = 60131;
      if (typeof Symbol == "function" && Symbol.for) {
        var S = Symbol.for;
        n = S("react.element"), o = S("react.portal"), t.Fragment = S("react.fragment"), i = S("react.strict_mode"), a = S("react.profiler"), u = S("react.provider"), s = S("react.context"), l = S("react.forward_ref"), f = S("react.suspense"), d = S("react.suspense_list"), h = S("react.memo"), p = S("react.lazy"), g = S("react.block"), v = S("react.server.block"), E = S("react.fundamental"), S("react.scope"), S("react.opaque.id"), A = S("react.debug_trace_mode"), S("react.offscreen"), N = S("react.legacy_hidden");
      }
      var j = typeof Symbol == "function" && Symbol.iterator, C = "@@iterator";
      function I(c) {
        if (c === null || typeof c != "object")
          return null;
        var y = j && c[j] || c[C];
        return typeof y == "function" ? y : null;
      }
      var W = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function M(c) {
        {
          for (var y = arguments.length, w = new Array(y > 1 ? y - 1 : 0), x = 1; x < y; x++)
            w[x - 1] = arguments[x];
          P("error", c, w);
        }
      }
      function P(c, y, w) {
        {
          var x = W.ReactDebugCurrentFrame, H = x.getStackAddendum();
          H !== "" && (y += "%s", w = w.concat([H]));
          var B = w.map(function(V) {
            return "" + V;
          });
          B.unshift("Warning: " + y), Function.prototype.apply.call(console[c], console, B);
        }
      }
      var k = !1;
      function st(c) {
        return !!(typeof c == "string" || typeof c == "function" || c === t.Fragment || c === a || c === A || c === i || c === f || c === d || c === N || k || typeof c == "object" && c !== null && (c.$$typeof === p || c.$$typeof === h || c.$$typeof === u || c.$$typeof === s || c.$$typeof === l || c.$$typeof === E || c.$$typeof === g || c[0] === v));
      }
      function ie(c, y, w) {
        var x = y.displayName || y.name || "";
        return c.displayName || (x !== "" ? w + "(" + x + ")" : w);
      }
      function R(c) {
        return c.displayName || "Context";
      }
      function O(c) {
        if (c == null)
          return null;
        if (typeof c.tag == "number" && M("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue."), typeof c == "function")
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
          case d:
            return "SuspenseList";
        }
        if (typeof c == "object")
          switch (c.$$typeof) {
            case s:
              var y = c;
              return R(y) + ".Consumer";
            case u:
              var w = c;
              return R(w._context) + ".Provider";
            case l:
              return ie(c, c.render, "ForwardRef");
            case h:
              return O(c.type);
            case g:
              return O(c._render);
            case p: {
              var x = c, H = x._payload, B = x._init;
              try {
                return O(B(H));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var b = 0, D, _, $, T, z, J, Y;
      function Z() {
      }
      Z.__reactDisabledLog = !0;
      function ft() {
        {
          if (b === 0) {
            D = console.log, _ = console.info, $ = console.warn, T = console.error, z = console.group, J = console.groupCollapsed, Y = console.groupEnd;
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
                value: D
              }),
              info: r({}, c, {
                value: _
              }),
              warn: r({}, c, {
                value: $
              }),
              error: r({}, c, {
                value: T
              }),
              group: r({}, c, {
                value: z
              }),
              groupCollapsed: r({}, c, {
                value: J
              }),
              groupEnd: r({}, c, {
                value: Y
              })
            });
          }
          b < 0 && M("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var vt = W.ReactCurrentDispatcher, mt;
      function ct(c, y, w) {
        {
          if (mt === void 0)
            try {
              throw Error();
            } catch (H) {
              var x = H.stack.trim().match(/\n( *(at )?)/);
              mt = x && x[1] || "";
            }
          return `
` + mt + c;
        }
      }
      var Q = !1, ot;
      {
        var Ht = typeof WeakMap == "function" ? WeakMap : Map;
        ot = new Ht();
      }
      function Dt(c, y) {
        if (!c || Q)
          return "";
        {
          var w = ot.get(c);
          if (w !== void 0)
            return w;
        }
        var x;
        Q = !0;
        var H = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var B;
        B = vt.current, vt.current = null, ft();
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
              } catch (yt) {
                x = yt;
              }
              Reflect.construct(c, [], V);
            } else {
              try {
                V.call();
              } catch (yt) {
                x = yt;
              }
              c.call(V.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (yt) {
              x = yt;
            }
            c();
          }
        } catch (yt) {
          if (yt && x && typeof yt.stack == "string") {
            for (var L = yt.stack.split(`
`), rt = x.stack.split(`
`), K = L.length - 1, G = rt.length - 1; K >= 1 && G >= 0 && L[K] !== rt[G]; )
              G--;
            for (; K >= 1 && G >= 0; K--, G--)
              if (L[K] !== rt[G]) {
                if (K !== 1 || G !== 1)
                  do
                    if (K--, G--, G < 0 || L[K] !== rt[G]) {
                      var gt = `
` + L[K].replace(" at new ", " at ");
                      return typeof c == "function" && ot.set(c, gt), gt;
                    }
                  while (K >= 1 && G >= 0);
                break;
              }
          }
        } finally {
          Q = !1, vt.current = B, ut(), Error.prepareStackTrace = H;
        }
        var Lt = c ? c.displayName || c.name : "", an = Lt ? ct(Lt) : "";
        return typeof c == "function" && ot.set(c, an), an;
      }
      function Jr(c, y, w) {
        return Dt(c, !1);
      }
      function yi(c) {
        var y = c.prototype;
        return !!(y && y.isReactComponent);
      }
      function ae(c, y, w) {
        if (c == null)
          return "";
        if (typeof c == "function")
          return Dt(c, yi(c));
        if (typeof c == "string")
          return ct(c);
        switch (c) {
          case f:
            return ct("Suspense");
          case d:
            return ct("SuspenseList");
        }
        if (typeof c == "object")
          switch (c.$$typeof) {
            case l:
              return Jr(c.render);
            case h:
              return ae(c.type, y, w);
            case g:
              return Jr(c._render);
            case p: {
              var x = c, H = x._payload, B = x._init;
              try {
                return ae(B(H), y, w);
              } catch {
              }
            }
          }
        return "";
      }
      var Kr = {}, Gr = W.ReactDebugCurrentFrame;
      function se(c) {
        if (c) {
          var y = c._owner, w = ae(c.type, c._source, y ? y.type : null);
          Gr.setExtraStackFrame(w);
        } else
          Gr.setExtraStackFrame(null);
      }
      function bi(c, y, w, x, H) {
        {
          var B = Function.call.bind(Object.prototype.hasOwnProperty);
          for (var V in c)
            if (B(c, V)) {
              var L = void 0;
              try {
                if (typeof c[V] != "function") {
                  var rt = Error((x || "React class") + ": " + w + " type `" + V + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof c[V] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw rt.name = "Invariant Violation", rt;
                }
                L = c[V](y, V, x, w, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (K) {
                L = K;
              }
              L && !(L instanceof Error) && (se(H), M("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", x || "React class", w, V, typeof L), se(null)), L instanceof Error && !(L.message in Kr) && (Kr[L.message] = !0, se(H), M("Failed %s type: %s", w, L.message), se(null));
            }
        }
      }
      var Bt = W.ReactCurrentOwner, Ie = Object.prototype.hasOwnProperty, Oi = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, Zr, Qr, Me;
      Me = {};
      function wi(c) {
        if (Ie.call(c, "ref")) {
          var y = Object.getOwnPropertyDescriptor(c, "ref").get;
          if (y && y.isReactWarning)
            return !1;
        }
        return c.ref !== void 0;
      }
      function _i(c) {
        if (Ie.call(c, "key")) {
          var y = Object.getOwnPropertyDescriptor(c, "key").get;
          if (y && y.isReactWarning)
            return !1;
        }
        return c.key !== void 0;
      }
      function Ei(c, y) {
        if (typeof c.ref == "string" && Bt.current && y && Bt.current.stateNode !== y) {
          var w = O(Bt.current.type);
          Me[w] || (M('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', O(Bt.current.type), c.ref), Me[w] = !0);
        }
      }
      function Si(c, y) {
        {
          var w = function() {
            Zr || (Zr = !0, M("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
          };
          w.isReactWarning = !0, Object.defineProperty(c, "key", {
            get: w,
            configurable: !0
          });
        }
      }
      function ji(c, y) {
        {
          var w = function() {
            Qr || (Qr = !0, M("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
          };
          w.isReactWarning = !0, Object.defineProperty(c, "ref", {
            get: w,
            configurable: !0
          });
        }
      }
      var xi = function(c, y, w, x, H, B, V) {
        var L = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: n,
          // Built-in properties that belong on the element
          type: c,
          key: y,
          ref: w,
          props: V,
          // Record the component responsible for creating this element.
          _owner: B
        };
        return L._store = {}, Object.defineProperty(L._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(L, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: x
        }), Object.defineProperty(L, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: H
        }), Object.freeze && (Object.freeze(L.props), Object.freeze(L)), L;
      };
      function Ri(c, y, w, x, H) {
        {
          var B, V = {}, L = null, rt = null;
          w !== void 0 && (L = "" + w), _i(y) && (L = "" + y.key), wi(y) && (rt = y.ref, Ei(y, H));
          for (B in y)
            Ie.call(y, B) && !Oi.hasOwnProperty(B) && (V[B] = y[B]);
          if (c && c.defaultProps) {
            var K = c.defaultProps;
            for (B in K)
              V[B] === void 0 && (V[B] = K[B]);
          }
          if (L || rt) {
            var G = typeof c == "function" ? c.displayName || c.name || "Unknown" : c;
            L && Si(V, G), rt && ji(V, G);
          }
          return xi(c, L, rt, H, x, Bt.current, V);
        }
      }
      var Fe = W.ReactCurrentOwner, Xr = W.ReactDebugCurrentFrame;
      function Ut(c) {
        if (c) {
          var y = c._owner, w = ae(c.type, c._source, y ? y.type : null);
          Xr.setExtraStackFrame(w);
        } else
          Xr.setExtraStackFrame(null);
      }
      var ze;
      ze = !1;
      function Ve(c) {
        return typeof c == "object" && c !== null && c.$$typeof === n;
      }
      function tn() {
        {
          if (Fe.current) {
            var c = O(Fe.current.type);
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
            var y = c.fileName.replace(/^.*[\\\/]/, ""), w = c.lineNumber;
            return `

Check your code at ` + y + ":" + w + ".";
          }
          return "";
        }
      }
      var en = {};
      function Ti(c) {
        {
          var y = tn();
          if (!y) {
            var w = typeof c == "string" ? c : c.displayName || c.name;
            w && (y = `

Check the top-level render call using <` + w + ">.");
          }
          return y;
        }
      }
      function rn(c, y) {
        {
          if (!c._store || c._store.validated || c.key != null)
            return;
          c._store.validated = !0;
          var w = Ti(y);
          if (en[w])
            return;
          en[w] = !0;
          var x = "";
          c && c._owner && c._owner !== Fe.current && (x = " It was passed a child from " + O(c._owner.type) + "."), Ut(c), M('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', w, x), Ut(null);
        }
      }
      function nn(c, y) {
        {
          if (typeof c != "object")
            return;
          if (Array.isArray(c))
            for (var w = 0; w < c.length; w++) {
              var x = c[w];
              Ve(x) && rn(x, y);
            }
          else if (Ve(c))
            c._store && (c._store.validated = !0);
          else if (c) {
            var H = I(c);
            if (typeof H == "function" && H !== c.entries)
              for (var B = H.call(c), V; !(V = B.next()).done; )
                Ve(V.value) && rn(V.value, y);
          }
        }
      }
      function $i(c) {
        {
          var y = c.type;
          if (y == null || typeof y == "string")
            return;
          var w;
          if (typeof y == "function")
            w = y.propTypes;
          else if (typeof y == "object" && (y.$$typeof === l || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          y.$$typeof === h))
            w = y.propTypes;
          else
            return;
          if (w) {
            var x = O(y);
            bi(w, c.props, "prop", x, c);
          } else if (y.PropTypes !== void 0 && !ze) {
            ze = !0;
            var H = O(y);
            M("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", H || "Unknown");
          }
          typeof y.getDefaultProps == "function" && !y.getDefaultProps.isReactClassApproved && M("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Ai(c) {
        {
          for (var y = Object.keys(c.props), w = 0; w < y.length; w++) {
            var x = y[w];
            if (x !== "children" && x !== "key") {
              Ut(c), M("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", x), Ut(null);
              break;
            }
          }
          c.ref !== null && (Ut(c), M("Invalid attribute `ref` supplied to `React.Fragment`."), Ut(null));
        }
      }
      function on(c, y, w, x, H, B) {
        {
          var V = st(c);
          if (!V) {
            var L = "";
            (c === void 0 || typeof c == "object" && c !== null && Object.keys(c).length === 0) && (L += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var rt = Di(H);
            rt ? L += rt : L += tn();
            var K;
            c === null ? K = "null" : Array.isArray(c) ? K = "array" : c !== void 0 && c.$$typeof === n ? (K = "<" + (O(c.type) || "Unknown") + " />", L = " Did you accidentally export a JSX literal instead of a component?") : K = typeof c, M("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", K, L);
          }
          var G = Ri(c, y, w, H, B);
          if (G == null)
            return G;
          if (V) {
            var gt = y.children;
            if (gt !== void 0)
              if (x)
                if (Array.isArray(gt)) {
                  for (var Lt = 0; Lt < gt.length; Lt++)
                    nn(gt[Lt], c);
                  Object.freeze && Object.freeze(gt);
                } else
                  M("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
              else
                nn(gt, c);
          }
          return c === t.Fragment ? Ai(G) : $i(G), G;
        }
      }
      function Ni(c, y, w) {
        return on(c, y, w, !0);
      }
      function Ci(c, y, w) {
        return on(c, y, w, !1);
      }
      var Pi = Ci, ki = Ni;
      t.jsx = Pi, t.jsxs = ki;
    }();
  }(no)), no;
}
process.env.NODE_ENV === "production" ? wr.exports = $p() : wr.exports = Ap();
var qr = wr.exports;
const gi = qr.Fragment, ge = qr.jsx;
qr.jsxs;
var Xe = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var io;
function Np() {
  if (io)
    return Xe;
  io = 1;
  var t = Qt;
  function e(d, h) {
    return d === h && (d !== 0 || 1 / d === 1 / h) || d !== d && h !== h;
  }
  var r = typeof Object.is == "function" ? Object.is : e, n = t.useState, o = t.useEffect, i = t.useLayoutEffect, a = t.useDebugValue;
  function u(d, h) {
    var p = h(), g = n({ inst: { value: p, getSnapshot: h } }), v = g[0].inst, E = g[1];
    return i(function() {
      v.value = p, v.getSnapshot = h, s(v) && E({ inst: v });
    }, [d, p, h]), o(function() {
      return s(v) && E({ inst: v }), d(function() {
        s(v) && E({ inst: v });
      });
    }, [d]), a(p), p;
  }
  function s(d) {
    var h = d.getSnapshot;
    d = d.value;
    try {
      var p = h();
      return !r(d, p);
    } catch {
      return !0;
    }
  }
  function l(d, h) {
    return h();
  }
  var f = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? l : u;
  return Xe.useSyncExternalStore = t.useSyncExternalStore !== void 0 ? t.useSyncExternalStore : f, Xe;
}
var ao = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var so;
function Cp() {
  return so || (so = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var t = Qt, e = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function r(S) {
      {
        for (var j = arguments.length, C = new Array(j > 1 ? j - 1 : 0), I = 1; I < j; I++)
          C[I - 1] = arguments[I];
        n("error", S, C);
      }
    }
    function n(S, j, C) {
      {
        var I = e.ReactDebugCurrentFrame, W = I.getStackAddendum();
        W !== "" && (j += "%s", C = C.concat([W]));
        var M = C.map(function(P) {
          return String(P);
        });
        M.unshift("Warning: " + j), Function.prototype.apply.call(console[S], console, M);
      }
    }
    function o(S, j) {
      return S === j && (S !== 0 || 1 / S === 1 / j) || S !== S && j !== j;
    }
    var i = typeof Object.is == "function" ? Object.is : o, a = t.useState, u = t.useEffect, s = t.useLayoutEffect, l = t.useDebugValue, f = !1, d = !1;
    function h(S, j, C) {
      f || t.startTransition !== void 0 && (f = !0, r("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
      var I = j();
      if (!d) {
        var W = j();
        i(I, W) || (r("The result of getSnapshot should be cached to avoid an infinite loop"), d = !0);
      }
      var M = a({
        inst: {
          value: I,
          getSnapshot: j
        }
      }), P = M[0].inst, k = M[1];
      return s(function() {
        P.value = I, P.getSnapshot = j, p(P) && k({
          inst: P
        });
      }, [S, I, j]), u(function() {
        p(P) && k({
          inst: P
        });
        var st = function() {
          p(P) && k({
            inst: P
          });
        };
        return S(st);
      }, [S]), l(I), I;
    }
    function p(S) {
      var j = S.getSnapshot, C = S.value;
      try {
        var I = j();
        return !i(C, I);
      } catch {
        return !0;
      }
    }
    function g(S, j, C) {
      return j();
    }
    var v = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", E = !v, A = E ? g : h, N = t.useSyncExternalStore !== void 0 ? t.useSyncExternalStore : A;
    ao.useSyncExternalStore = N, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), ao;
}
process.env.NODE_ENV === "production" ? Np() : Cp();
const Pp = () => !0;
class kp extends Yl {
  constructor() {
    super(...arguments), et(this, "middlewareHandler", Pp), et(this, "_routes", []);
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
    const r = Wl([...e, ...this._routes], "path");
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
new kp();
uo(
  void 0
);
uo(void 0);
const Up = Qt.createContext(void 0), Lp = (t) => {
  const e = Ui(Up);
  if (!e)
    throw new Error("useAuthorization must be used in AuthorizationProvider");
  return {
    granted: Li(() => t ? e.can(t) : !0, [t, e.can]),
    ...e
  };
};
co(
  ({ permissions: t, children: e, guestView: r }) => {
    const { granted: n } = Lp(t);
    return typeof e == "function" ? e(n) : /* @__PURE__ */ ge(gi, { children: n ? e : r });
  }
);
function it(t, e) {
  return () => {
    const r = new Tp(t().baseURL, t());
    return Ll(e, (n) => (...o) => n(r, ...o));
  };
}
const Ip = ({
  route: { component: t, ...e }
}) => {
  var r;
  return /* @__PURE__ */ ge(gi, { children: (r = e.routes) != null && r.length && !e.element && !t ? /* @__PURE__ */ ge(Xi, {}) : e.element || (t ? /* @__PURE__ */ ge(t, {}) : null) });
};
co(Ip);
class Mp {
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
const at = new Mp(), eh = it(
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
var Fp = /* @__PURE__ */ ((t) => (t.INVITATION_EXISTS = "INVITATION_EXISTS", t.USER_IS_EXISTS = "USER_IS_EXISTS", t))(Fp || {}), zp = /* @__PURE__ */ ((t) => (t.TOKEN_VALID = "TOKEN_VALID", t.TOKEN_INVALID = "TOKEN_INVALID", t.INVITATION_NOT_EXISTS = "INVITATION_NOT_EXISTS", t.USER_ACTIVE = "USER_ACTIVE", t))(zp || {});
const rh = it(
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
var Vp = /* @__PURE__ */ ((t) => (t.Full = "24/7", t.Custom = "CUSTOM", t))(Vp || {}), Hp = /* @__PURE__ */ ((t) => (t.Monday = "MONDAY", t.Tuesday = "TUESDAY", t.Wednesday = "WEDNESDAY", t.Thursday = "THURSDAY", t.Friday = "FRIDAY", t.Saturday = "SATURDAY", t.Sunday = "SUNDAY", t))(Hp || {});
const nh = it(
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
var Bp = /* @__PURE__ */ ((t) => (t.Plain = "Plain", t.Login = "Login", t.MD5 = "CRAM - MD5", t))(Bp || {}), Wp = /* @__PURE__ */ ((t) => (t.Both = "both", t.Incoming = "incoming", t.Outgoing = "outgoing", t))(Wp || {}), Yp = /* @__PURE__ */ ((t) => (t.CUSTOM = "CUSTOM", t.MOOSEDESK = "MOOSEDESK", t.FORWARD = "FORWARD", t))(Yp || {}), qp = /* @__PURE__ */ ((t) => (t.XS = "xs", t.SM = "sm", t.MD = "md", t.LG = "lg", t.XL = "xl", t.XXL = "xxl", t))(qp || {}), Jp = /* @__PURE__ */ ((t) => (t.GMAIL = "GMAIL", t.OUTLOOK = "OUTLOOK", t.OTHER = "OTHER", t.MOOSEDESK = "MOOSEDESK", t))(Jp || {});
const oh = it(
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
), ih = it(
  () => ({
    baseURL: `${at.getApiUrl()}/api/v1/general/info`
  }),
  {
    get(t, e) {
      return t.get("", e);
    }
  }
), ah = it(
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
), sh = it(
  () => ({
    baseURL: `${at.getApiUrl()}/api/v1/general/info`
  }),
  {
    getStore(t, e) {
      return t.get("", e);
    }
  }
), uh = it(
  () => ({
    baseURL: `${at.getApiUrl()}/api/v1/tour-guide`
  }),
  {
    updateTourGuide(t, e) {
      return t.post("", e);
    }
  }
), ch = it(
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
var Kp = /* @__PURE__ */ ((t) => (t.URGENT = "URGENT", t.HIGH = "HIGH", t.MEDIUM = "MEDIUM", t.LOW = "LOW", t))(Kp || {}), Gp = /* @__PURE__ */ ((t) => (t.PENDING = "PENDING", t.OPEN = "OPEN", t.RESOLVED = "RESOLVED", t.NEW = "NEW", t))(Gp || {});
const lh = [
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
], fh = [
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
], ph = it(
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
var Zp = /* @__PURE__ */ ((t) => (t.READ_PRODUCTS = "read_products", t))(Zp || {}), Qp = /* @__PURE__ */ ((t) => (t.Admin = "Admin", t.BasicAgent = "BasicAgent", t.AgentLeader = "AgentLeader", t))(Qp || {});
const hh = it(
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
var Xp = /* @__PURE__ */ ((t) => (t.Disabled = "Disabled", t.Email = "Email", t.Authenticator = "Authenticator", t))(Xp || {});
const dh = it(
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
), vh = it(
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
  Wp as AccessType,
  eh as AccountRepository,
  rh as AgentRepository,
  Bp as AuthenticationSMTP,
  Vp as BusinessHoursType,
  nh as CustomerRepository,
  Hp as Day,
  oh as EmailIntegrationRepository,
  at as Env,
  Fp as ErrorCodeCreate,
  ih as GlobalRepository,
  ah as HelpWidgetRepository,
  Jp as MailBoxType,
  Yp as MailSettingType,
  vh as MerchantRepository,
  Xp as MethodOTP,
  Zp as PermissionScopesShopify,
  Kp as Priority,
  Qp as Role,
  qp as ScreenType,
  Gp as StatusTicket,
  sh as StoreRepository,
  ch as TagRepository,
  ph as TicketRepository,
  uh as TourGuideRepository,
  zp as TypeCheckTokenNewAgent,
  hh as UserGroupRepository,
  dh as UserSettingRepository,
  fh as priorityOptions,
  lh as statusOptions
};

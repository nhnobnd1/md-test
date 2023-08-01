import * as U from "react";
import Qt, { createContext as lo, memo as fo, useContext as Pi, useMemo as ki } from "react";
var Ui = Object.defineProperty, Li = (t, e, r) => e in t ? Ui(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, et = (t, e, r) => (Li(t, typeof e != "symbol" ? e + "" : e, r), r);
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
var un;
(function(t) {
  t.Pop = "POP", t.Push = "PUSH", t.Replace = "REPLACE";
})(un || (un = {}));
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
function po(t) {
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
function Ii(t, e) {
  if (!t) {
    typeof console < "u" && console.warn(e);
    try {
      throw new Error(e);
    } catch {
    }
  }
}
function Mi(t, e) {
  e === void 0 && (e = "/");
  let {
    pathname: r,
    search: n = "",
    hash: o = ""
  } = typeof t == "string" ? po(t) : t;
  return {
    pathname: r ? r.startsWith("/") ? r : Fi(r, e) : e,
    search: zi(n),
    hash: Vi(o)
  };
}
function Fi(t, e) {
  let r = e.replace(/\/+$/, "").split("/");
  return t.split("/").forEach((n) => {
    n === ".." ? r.length > 1 && r.pop() : n !== "." && r.push(n);
  }), r.length > 1 ? r.join("/") : "/";
}
function He(t, e, r, n) {
  return "Cannot include a '" + t + "' character in a manually specified " + ("`to." + e + "` field [" + JSON.stringify(n) + "].  Please separate it out to the ") + ("`to." + r + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function ho(t) {
  return t.filter((e, r) => r === 0 || e.route.path && e.route.path.length > 0);
}
function vo(t, e, r, n) {
  n === void 0 && (n = !1);
  let o;
  typeof t == "string" ? o = po(t) : (o = tr({}, t), nt(!o.pathname || !o.pathname.includes("?"), He("?", "pathname", "search", o)), nt(!o.pathname || !o.pathname.includes("#"), He("#", "pathname", "hash", o)), nt(!o.search || !o.search.includes("#"), He("#", "search", "hash", o)));
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
  let s = Mi(o, u), l = a && a !== "/" && a.endsWith("/"), f = (i || a === ".") && r.endsWith("/");
  return !s.pathname.endsWith("/") && (l || f) && (s.pathname += "/"), s;
}
const Sr = (t) => t.join("/").replace(/\/\/+/g, "/"), zi = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, Vi = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t;
"useSyncExternalStore" in U && ((t) => t.useSyncExternalStore)(U);
const Hi = /* @__PURE__ */ U.createContext(null);
process.env.NODE_ENV !== "production" && (Hi.displayName = "DataStaticRouterContext");
const mo = /* @__PURE__ */ U.createContext(null);
process.env.NODE_ENV !== "production" && (mo.displayName = "DataRouter");
const go = /* @__PURE__ */ U.createContext(null);
process.env.NODE_ENV !== "production" && (go.displayName = "DataRouterState");
const Bi = /* @__PURE__ */ U.createContext(null);
process.env.NODE_ENV !== "production" && (Bi.displayName = "Await");
const te = /* @__PURE__ */ U.createContext(null);
process.env.NODE_ENV !== "production" && (te.displayName = "Navigation");
const jr = /* @__PURE__ */ U.createContext(null);
process.env.NODE_ENV !== "production" && (jr.displayName = "Location");
const ee = /* @__PURE__ */ U.createContext({
  outlet: null,
  matches: []
});
process.env.NODE_ENV !== "production" && (ee.displayName = "Route");
const Wi = /* @__PURE__ */ U.createContext(null);
process.env.NODE_ENV !== "production" && (Wi.displayName = "RouteError");
function qi(t, e) {
  let {
    relative: r
  } = e === void 0 ? {} : e;
  xr() || (process.env.NODE_ENV !== "production" ? nt(
    !1,
    "useHref() may be used only in the context of a <Router> component."
  ) : nt(!1));
  let {
    basename: n,
    navigator: o
  } = U.useContext(te), {
    hash: i,
    pathname: a,
    search: u
  } = je(t, {
    relative: r
  }), s = a;
  return n !== "/" && (s = a === "/" ? n : Sr([n, a])), o.createHref({
    pathname: s,
    search: u,
    hash: i
  });
}
function xr() {
  return U.useContext(jr) != null;
}
function re() {
  return xr() || (process.env.NODE_ENV !== "production" ? nt(
    !1,
    "useLocation() may be used only in the context of a <Router> component."
  ) : nt(!1)), U.useContext(jr).location;
}
function Yi() {
  xr() || (process.env.NODE_ENV !== "production" ? nt(
    !1,
    "useNavigate() may be used only in the context of a <Router> component."
  ) : nt(!1));
  let {
    basename: t,
    navigator: e
  } = U.useContext(te), {
    matches: r
  } = U.useContext(ee), {
    pathname: n
  } = re(), o = JSON.stringify(ho(r).map((a) => a.pathnameBase)), i = U.useRef(!1);
  return U.useEffect(() => {
    i.current = !0;
  }), U.useCallback(function(a, u) {
    if (u === void 0 && (u = {}), process.env.NODE_ENV !== "production" && Ii(i.current, "You should call navigate() in a React.useEffect(), not when your component is first rendered."), !i.current)
      return;
    if (typeof a == "number") {
      e.go(a);
      return;
    }
    let s = vo(a, JSON.parse(o), n, u.relative === "path");
    t !== "/" && (s.pathname = s.pathname === "/" ? t : Sr([t, s.pathname])), (u.replace ? e.replace : e.push)(s, u.state, u);
  }, [t, e, o, n]);
}
const Ki = /* @__PURE__ */ U.createContext(null);
function Ji(t) {
  let e = U.useContext(ee).outlet;
  return e && /* @__PURE__ */ U.createElement(Ki.Provider, {
    value: t
  }, e);
}
function je(t, e) {
  let {
    relative: r
  } = e === void 0 ? {} : e, {
    matches: n
  } = U.useContext(ee), {
    pathname: o
  } = re(), i = JSON.stringify(ho(n).map((a) => a.pathnameBase));
  return U.useMemo(() => vo(t, JSON.parse(i), o, r === "path"), [t, i, o, r]);
}
var ln;
(function(t) {
  t.UseRevalidator = "useRevalidator";
})(ln || (ln = {}));
var fn;
(function(t) {
  t.UseLoaderData = "useLoaderData", t.UseActionData = "useActionData", t.UseRouteError = "useRouteError", t.UseNavigation = "useNavigation", t.UseRouteLoaderData = "useRouteLoaderData", t.UseMatches = "useMatches", t.UseRevalidator = "useRevalidator";
})(fn || (fn = {}));
function Gi(t) {
  return Ji(t.context);
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
function Rr(t, e) {
  if (t == null)
    return {};
  var r = {}, n = Object.keys(t), o, i;
  for (i = 0; i < n.length; i++)
    o = n[i], !(e.indexOf(o) >= 0) && (r[o] = t[o]);
  return r;
}
const pe = "get", Be = "application/x-www-form-urlencoded";
function xe(t) {
  return t != null && typeof t.tagName == "string";
}
function Xi(t) {
  return xe(t) && t.tagName.toLowerCase() === "button";
}
function Zi(t) {
  return xe(t) && t.tagName.toLowerCase() === "form";
}
function Qi(t) {
  return xe(t) && t.tagName.toLowerCase() === "input";
}
function ta(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function ea(t, e) {
  return t.button === 0 && (!e || e === "_self") && !ta(t);
}
function ra(t, e, r) {
  let n, o, i, a;
  if (Zi(t)) {
    let l = r.submissionTrigger;
    n = r.method || t.getAttribute("method") || pe, o = r.action || t.getAttribute("action") || e, i = r.encType || t.getAttribute("enctype") || Be, a = new FormData(t), l && l.name && a.append(l.name, l.value);
  } else if (Xi(t) || Qi(t) && (t.type === "submit" || t.type === "image")) {
    let l = t.form;
    if (l == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    n = r.method || t.getAttribute("formmethod") || l.getAttribute("method") || pe, o = r.action || t.getAttribute("formaction") || l.getAttribute("action") || e, i = r.encType || t.getAttribute("formenctype") || l.getAttribute("enctype") || Be, a = new FormData(l), t.name && a.append(t.name, t.value);
  } else {
    if (xe(t))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    if (n = r.method || pe, o = r.action || e, i = r.encType || Be, t instanceof FormData)
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
const na = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset"], oa = ["aria-current", "caseSensitive", "className", "end", "style", "to", "children"], ia = ["reloadDocument", "replace", "method", "action", "onSubmit", "fetcherKey", "routeId", "relative"];
process.env.NODE_ENV;
const yo = /* @__PURE__ */ U.forwardRef(function(t, e) {
  let {
    onClick: r,
    relative: n,
    reloadDocument: o,
    replace: i,
    state: a,
    target: u,
    to: s,
    preventScrollReset: l
  } = t, f = Rr(t, na), d = qi(s, {
    relative: n
  }), h = la(s, {
    replace: i,
    state: a,
    target: u,
    preventScrollReset: l,
    relative: n
  });
  function p(g) {
    r && r(g), g.defaultPrevented || h(g);
  }
  return /* @__PURE__ */ U.createElement("a", $t({}, f, {
    href: d,
    onClick: o ? r : p,
    ref: e,
    target: u
  }));
});
process.env.NODE_ENV !== "production" && (yo.displayName = "Link");
const aa = /* @__PURE__ */ U.forwardRef(function(t, e) {
  let {
    "aria-current": r = "page",
    caseSensitive: n = !1,
    className: o = "",
    end: i = !1,
    style: a,
    to: u,
    children: s
  } = t, l = Rr(t, oa), f = je(u, {
    relative: l.relative
  }), d = re(), h = U.useContext(go), {
    navigator: p
  } = U.useContext(te), g = p.encodeLocation ? p.encodeLocation(f).pathname : f.pathname, v = d.pathname, E = h && h.navigation && h.navigation.location ? h.navigation.location.pathname : null;
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
  return /* @__PURE__ */ U.createElement(yo, $t({}, l, {
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
process.env.NODE_ENV !== "production" && (aa.displayName = "NavLink");
const sa = /* @__PURE__ */ U.forwardRef((t, e) => /* @__PURE__ */ U.createElement(bo, $t({}, t, {
  ref: e
})));
process.env.NODE_ENV !== "production" && (sa.displayName = "Form");
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
  } = t, f = Rr(t, ia), d = fa(u, s), h = o.toLowerCase() === "get" ? "get" : "post", p = Oo(i, {
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
process.env.NODE_ENV !== "production" && (bo.displayName = "FormImpl");
process.env.NODE_ENV;
var rr;
(function(t) {
  t.UseScrollRestoration = "useScrollRestoration", t.UseSubmitImpl = "useSubmitImpl", t.UseFetcher = "useFetcher";
})(rr || (rr = {}));
var hn;
(function(t) {
  t.UseFetchers = "useFetchers", t.UseScrollRestoration = "useScrollRestoration";
})(hn || (hn = {}));
function ua(t) {
  return t + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function ca(t) {
  let e = U.useContext(mo);
  return e || (process.env.NODE_ENV !== "production" ? nt(!1, ua(t)) : nt(!1)), e;
}
function la(t, e) {
  let {
    target: r,
    replace: n,
    state: o,
    preventScrollReset: i,
    relative: a
  } = e === void 0 ? {} : e, u = Yi(), s = re(), l = je(t, {
    relative: a
  });
  return U.useCallback((f) => {
    if (ea(f, r)) {
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
function fa(t, e) {
  let {
    router: r
  } = ca(rr.UseSubmitImpl), n = Oo();
  return U.useCallback(function(o, i) {
    if (i === void 0 && (i = {}), typeof document > "u")
      throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
    let {
      method: a,
      encType: u,
      formData: s,
      url: l
    } = ra(o, n, i), f = l.pathname + l.search, d = {
      replace: i.replace,
      formData: s,
      formMethod: a,
      formEncType: u
    };
    t ? (e == null && (process.env.NODE_ENV !== "production" ? nt(!1, "No routeId available for useFetcher()") : nt(!1)), r.fetch(t, e, f, d)) : r.navigate(f, d);
  }, [n, r, t, e]);
}
function Oo(t, e) {
  let {
    relative: r
  } = e === void 0 ? {} : e, {
    basename: n
  } = U.useContext(te), o = U.useContext(ee);
  o || (process.env.NODE_ENV !== "production" ? nt(!1, "useFormAction must be used inside a RouteContext") : nt(!1));
  let [i] = o.matches.slice(-1), a = $t({}, je(t || ".", {
    relative: r
  })), u = re();
  if (t == null && (a.search = u.search, a.hash = u.hash, i.route.index)) {
    let s = new URLSearchParams(a.search);
    s.delete("index"), a.search = s.toString() ? "?" + s.toString() : "";
  }
  return (!t || t === ".") && i.route.index && (a.search = a.search ? a.search.replace(/^\?/, "?index&") : "?index"), n !== "/" && (a.pathname = a.pathname === "/" ? n : Sr([n, a.pathname])), er(a);
}
var pa = typeof global == "object" && global && global.Object === Object && global;
const wo = pa;
var ha = typeof self == "object" && self && self.Object === Object && self, da = wo || ha || Function("return this")();
const dt = da;
var va = dt.Symbol;
const jt = va;
var _o = Object.prototype, ma = _o.hasOwnProperty, ga = _o.toString, Wt = jt ? jt.toStringTag : void 0;
function ya(t) {
  var e = ma.call(t, Wt), r = t[Wt];
  try {
    t[Wt] = void 0;
    var n = !0;
  } catch {
  }
  var o = ga.call(t);
  return n && (e ? t[Wt] = r : delete t[Wt]), o;
}
var ba = Object.prototype, Oa = ba.toString;
function wa(t) {
  return Oa.call(t);
}
var _a = "[object Null]", Ea = "[object Undefined]", dn = jt ? jt.toStringTag : void 0;
function Ct(t) {
  return t == null ? t === void 0 ? Ea : _a : dn && dn in Object(t) ? ya(t) : wa(t);
}
function xt(t) {
  return t != null && typeof t == "object";
}
var Sa = "[object Symbol]";
function Tr(t) {
  return typeof t == "symbol" || xt(t) && Ct(t) == Sa;
}
function ja(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length, o = Array(n); ++r < n; )
    o[r] = e(t[r], r, t);
  return o;
}
var xa = Array.isArray;
const lt = xa;
var Ra = 1 / 0, vn = jt ? jt.prototype : void 0, mn = vn ? vn.toString : void 0;
function Eo(t) {
  if (typeof t == "string")
    return t;
  if (lt(t))
    return ja(t, Eo) + "";
  if (Tr(t))
    return mn ? mn.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -Ra ? "-0" : e;
}
function Rt(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
function Dr(t) {
  return t;
}
var Ta = "[object AsyncFunction]", Da = "[object Function]", $a = "[object GeneratorFunction]", Aa = "[object Proxy]";
function $r(t) {
  if (!Rt(t))
    return !1;
  var e = Ct(t);
  return e == Da || e == $a || e == Ta || e == Aa;
}
var Na = dt["__core-js_shared__"];
const We = Na;
var gn = function() {
  var t = /[^.]+$/.exec(We && We.keys && We.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function Ca(t) {
  return !!gn && gn in t;
}
var Pa = Function.prototype, ka = Pa.toString;
function Pt(t) {
  if (t != null) {
    try {
      return ka.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var Ua = /[\\^$.*+?()[\]{}|]/g, La = /^\[object .+?Constructor\]$/, Ia = Function.prototype, Ma = Object.prototype, Fa = Ia.toString, za = Ma.hasOwnProperty, Va = RegExp(
  "^" + Fa.call(za).replace(Ua, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Ha(t) {
  if (!Rt(t) || Ca(t))
    return !1;
  var e = $r(t) ? Va : La;
  return e.test(Pt(t));
}
function Ba(t, e) {
  return t == null ? void 0 : t[e];
}
function kt(t, e) {
  var r = Ba(t, e);
  return Ha(r) ? r : void 0;
}
var Wa = kt(dt, "WeakMap");
const nr = Wa;
var yn = Object.create, qa = function() {
  function t() {
  }
  return function(e) {
    if (!Rt(e))
      return {};
    if (yn)
      return yn(e);
    t.prototype = e;
    var r = new t();
    return t.prototype = void 0, r;
  };
}();
const Ya = qa;
function Ka(t, e, r) {
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
function Ja() {
}
function Ga(t, e) {
  var r = -1, n = t.length;
  for (e || (e = Array(n)); ++r < n; )
    e[r] = t[r];
  return e;
}
var Xa = 800, Za = 16, Qa = Date.now;
function ts(t) {
  var e = 0, r = 0;
  return function() {
    var n = Qa(), o = Za - (n - r);
    if (r = n, o > 0) {
      if (++e >= Xa)
        return arguments[0];
    } else
      e = 0;
    return t.apply(void 0, arguments);
  };
}
function es(t) {
  return function() {
    return t;
  };
}
var rs = function() {
  try {
    var t = kt(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
}();
const be = rs;
var ns = be ? function(t, e) {
  return be(t, "toString", {
    configurable: !0,
    enumerable: !1,
    value: es(e),
    writable: !0
  });
} : Dr;
const os = ns;
var is = ts(os);
const as = is;
function ss(t, e, r, n) {
  for (var o = t.length, i = r + (n ? 1 : -1); n ? i-- : ++i < o; )
    if (e(t[i], i, t))
      return i;
  return -1;
}
function us(t) {
  return t !== t;
}
function cs(t, e, r) {
  for (var n = r - 1, o = t.length; ++n < o; )
    if (t[n] === e)
      return n;
  return -1;
}
function ls(t, e, r) {
  return e === e ? cs(t, e, r) : ss(t, us, r);
}
function fs(t, e) {
  var r = t == null ? 0 : t.length;
  return !!r && ls(t, e, 0) > -1;
}
var ps = 9007199254740991, hs = /^(?:0|[1-9]\d*)$/;
function Ar(t, e) {
  var r = typeof t;
  return e = e ?? ps, !!e && (r == "number" || r != "symbol" && hs.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
function Re(t, e, r) {
  e == "__proto__" && be ? be(t, e, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : t[e] = r;
}
function ne(t, e) {
  return t === e || t !== t && e !== e;
}
var ds = Object.prototype, vs = ds.hasOwnProperty;
function ms(t, e, r) {
  var n = t[e];
  (!(vs.call(t, e) && ne(n, r)) || r === void 0 && !(e in t)) && Re(t, e, r);
}
function gs(t, e, r, n) {
  var o = !r;
  r || (r = {});
  for (var i = -1, a = e.length; ++i < a; ) {
    var u = e[i], s = n ? n(r[u], t[u], u, r, t) : void 0;
    s === void 0 && (s = t[u]), o ? Re(r, u, s) : ms(r, u, s);
  }
  return r;
}
var bn = Math.max;
function ys(t, e, r) {
  return e = bn(e === void 0 ? t.length - 1 : e, 0), function() {
    for (var n = arguments, o = -1, i = bn(n.length - e, 0), a = Array(i); ++o < i; )
      a[o] = n[e + o];
    o = -1;
    for (var u = Array(e + 1); ++o < e; )
      u[o] = n[o];
    return u[e] = r(a), Ka(t, this, u);
  };
}
function bs(t, e) {
  return as(ys(t, e, Dr), t + "");
}
var Os = 9007199254740991;
function Nr(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= Os;
}
function Te(t) {
  return t != null && Nr(t.length) && !$r(t);
}
function ws(t, e, r) {
  if (!Rt(r))
    return !1;
  var n = typeof e;
  return (n == "number" ? Te(r) && Ar(e, r.length) : n == "string" && e in r) ? ne(r[e], t) : !1;
}
function _s(t) {
  return bs(function(e, r) {
    var n = -1, o = r.length, i = o > 1 ? r[o - 1] : void 0, a = o > 2 ? r[2] : void 0;
    for (i = t.length > 3 && typeof i == "function" ? (o--, i) : void 0, a && ws(r[0], r[1], a) && (i = o < 3 ? void 0 : i, o = 1), e = Object(e); ++n < o; ) {
      var u = r[n];
      u && t(e, u, n, i);
    }
    return e;
  });
}
var Es = Object.prototype;
function Cr(t) {
  var e = t && t.constructor, r = typeof e == "function" && e.prototype || Es;
  return t === r;
}
function Ss(t, e) {
  for (var r = -1, n = Array(t); ++r < t; )
    n[r] = e(r);
  return n;
}
var js = "[object Arguments]";
function On(t) {
  return xt(t) && Ct(t) == js;
}
var So = Object.prototype, xs = So.hasOwnProperty, Rs = So.propertyIsEnumerable, Ts = On(function() {
  return arguments;
}()) ? On : function(t) {
  return xt(t) && xs.call(t, "callee") && !Rs.call(t, "callee");
};
const Oe = Ts;
function Ds() {
  return !1;
}
var jo = typeof exports == "object" && exports && !exports.nodeType && exports, wn = jo && typeof module == "object" && module && !module.nodeType && module, $s = wn && wn.exports === jo, _n = $s ? dt.Buffer : void 0, As = _n ? _n.isBuffer : void 0, Ns = As || Ds;
const we = Ns;
var Cs = "[object Arguments]", Ps = "[object Array]", ks = "[object Boolean]", Us = "[object Date]", Ls = "[object Error]", Is = "[object Function]", Ms = "[object Map]", Fs = "[object Number]", zs = "[object Object]", Vs = "[object RegExp]", Hs = "[object Set]", Bs = "[object String]", Ws = "[object WeakMap]", qs = "[object ArrayBuffer]", Ys = "[object DataView]", Ks = "[object Float32Array]", Js = "[object Float64Array]", Gs = "[object Int8Array]", Xs = "[object Int16Array]", Zs = "[object Int32Array]", Qs = "[object Uint8Array]", tu = "[object Uint8ClampedArray]", eu = "[object Uint16Array]", ru = "[object Uint32Array]", Y = {};
Y[Ks] = Y[Js] = Y[Gs] = Y[Xs] = Y[Zs] = Y[Qs] = Y[tu] = Y[eu] = Y[ru] = !0;
Y[Cs] = Y[Ps] = Y[qs] = Y[ks] = Y[Ys] = Y[Us] = Y[Ls] = Y[Is] = Y[Ms] = Y[Fs] = Y[zs] = Y[Vs] = Y[Hs] = Y[Bs] = Y[Ws] = !1;
function nu(t) {
  return xt(t) && Nr(t.length) && !!Y[Ct(t)];
}
function ou(t) {
  return function(e) {
    return t(e);
  };
}
var xo = typeof exports == "object" && exports && !exports.nodeType && exports, Yt = xo && typeof module == "object" && module && !module.nodeType && module, iu = Yt && Yt.exports === xo, qe = iu && wo.process, au = function() {
  try {
    var t = Yt && Yt.require && Yt.require("util").types;
    return t || qe && qe.binding && qe.binding("util");
  } catch {
  }
}();
const En = au;
var Sn = En && En.isTypedArray, su = Sn ? ou(Sn) : nu;
const Pr = su;
var uu = Object.prototype, cu = uu.hasOwnProperty;
function Ro(t, e) {
  var r = lt(t), n = !r && Oe(t), o = !r && !n && we(t), i = !r && !n && !o && Pr(t), a = r || n || o || i, u = a ? Ss(t.length, String) : [], s = u.length;
  for (var l in t)
    (e || cu.call(t, l)) && !(a && (l == "length" || o && (l == "offset" || l == "parent") || i && (l == "buffer" || l == "byteLength" || l == "byteOffset") || Ar(l, s))) && u.push(l);
  return u;
}
function To(t, e) {
  return function(r) {
    return t(e(r));
  };
}
var lu = To(Object.keys, Object);
const fu = lu;
var pu = Object.prototype, hu = pu.hasOwnProperty;
function du(t) {
  if (!Cr(t))
    return fu(t);
  var e = [];
  for (var r in Object(t))
    hu.call(t, r) && r != "constructor" && e.push(r);
  return e;
}
function kr(t) {
  return Te(t) ? Ro(t) : du(t);
}
function vu(t) {
  var e = [];
  if (t != null)
    for (var r in Object(t))
      e.push(r);
  return e;
}
var mu = Object.prototype, gu = mu.hasOwnProperty;
function yu(t) {
  if (!Rt(t))
    return vu(t);
  var e = Cr(t), r = [];
  for (var n in t)
    n == "constructor" && (e || !gu.call(t, n)) || r.push(n);
  return r;
}
function Do(t) {
  return Te(t) ? Ro(t, !0) : yu(t);
}
var bu = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Ou = /^\w*$/;
function Ur(t, e) {
  if (lt(t))
    return !1;
  var r = typeof t;
  return r == "number" || r == "symbol" || r == "boolean" || t == null || Tr(t) ? !0 : Ou.test(t) || !bu.test(t) || e != null && t in Object(e);
}
var wu = kt(Object, "create");
const Kt = wu;
function _u() {
  this.__data__ = Kt ? Kt(null) : {}, this.size = 0;
}
function Eu(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var Su = "__lodash_hash_undefined__", ju = Object.prototype, xu = ju.hasOwnProperty;
function Ru(t) {
  var e = this.__data__;
  if (Kt) {
    var r = e[t];
    return r === Su ? void 0 : r;
  }
  return xu.call(e, t) ? e[t] : void 0;
}
var Tu = Object.prototype, Du = Tu.hasOwnProperty;
function $u(t) {
  var e = this.__data__;
  return Kt ? e[t] !== void 0 : Du.call(e, t);
}
var Au = "__lodash_hash_undefined__";
function Nu(t, e) {
  var r = this.__data__;
  return this.size += this.has(t) ? 0 : 1, r[t] = Kt && e === void 0 ? Au : e, this;
}
function At(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
At.prototype.clear = _u;
At.prototype.delete = Eu;
At.prototype.get = Ru;
At.prototype.has = $u;
At.prototype.set = Nu;
function Cu() {
  this.__data__ = [], this.size = 0;
}
function De(t, e) {
  for (var r = t.length; r--; )
    if (ne(t[r][0], e))
      return r;
  return -1;
}
var Pu = Array.prototype, ku = Pu.splice;
function Uu(t) {
  var e = this.__data__, r = De(e, t);
  if (r < 0)
    return !1;
  var n = e.length - 1;
  return r == n ? e.pop() : ku.call(e, r, 1), --this.size, !0;
}
function Lu(t) {
  var e = this.__data__, r = De(e, t);
  return r < 0 ? void 0 : e[r][1];
}
function Iu(t) {
  return De(this.__data__, t) > -1;
}
function Mu(t, e) {
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
wt.prototype.clear = Cu;
wt.prototype.delete = Uu;
wt.prototype.get = Lu;
wt.prototype.has = Iu;
wt.prototype.set = Mu;
var Fu = kt(dt, "Map");
const Jt = Fu;
function zu() {
  this.size = 0, this.__data__ = {
    hash: new At(),
    map: new (Jt || wt)(),
    string: new At()
  };
}
function Vu(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function $e(t, e) {
  var r = t.__data__;
  return Vu(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map;
}
function Hu(t) {
  var e = $e(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function Bu(t) {
  return $e(this, t).get(t);
}
function Wu(t) {
  return $e(this, t).has(t);
}
function qu(t, e) {
  var r = $e(this, t), n = r.size;
  return r.set(t, e), this.size += r.size == n ? 0 : 1, this;
}
function _t(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
_t.prototype.clear = zu;
_t.prototype.delete = Hu;
_t.prototype.get = Bu;
_t.prototype.has = Wu;
_t.prototype.set = qu;
var Yu = "Expected a function";
function Lr(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(Yu);
  var r = function() {
    var n = arguments, o = e ? e.apply(this, n) : n[0], i = r.cache;
    if (i.has(o))
      return i.get(o);
    var a = t.apply(this, n);
    return r.cache = i.set(o, a) || i, a;
  };
  return r.cache = new (Lr.Cache || _t)(), r;
}
Lr.Cache = _t;
var Ku = 500;
function Ju(t) {
  var e = Lr(t, function(n) {
    return r.size === Ku && r.clear(), n;
  }), r = e.cache;
  return e;
}
var Gu = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Xu = /\\(\\)?/g, Zu = Ju(function(t) {
  var e = [];
  return t.charCodeAt(0) === 46 && e.push(""), t.replace(Gu, function(r, n, o, i) {
    e.push(o ? i.replace(Xu, "$1") : n || r);
  }), e;
});
const Qu = Zu;
function tc(t) {
  return t == null ? "" : Eo(t);
}
function $o(t, e) {
  return lt(t) ? t : Ur(t, e) ? [t] : Qu(tc(t));
}
var ec = 1 / 0;
function Ae(t) {
  if (typeof t == "string" || Tr(t))
    return t;
  var e = t + "";
  return e == "0" && 1 / t == -ec ? "-0" : e;
}
function Ao(t, e) {
  e = $o(e, t);
  for (var r = 0, n = e.length; t != null && r < n; )
    t = t[Ae(e[r++])];
  return r && r == n ? t : void 0;
}
function rc(t, e, r) {
  var n = t == null ? void 0 : Ao(t, e);
  return n === void 0 ? r : n;
}
function nc(t, e) {
  for (var r = -1, n = e.length, o = t.length; ++r < n; )
    t[o + r] = e[r];
  return t;
}
var oc = To(Object.getPrototypeOf, Object);
const No = oc;
var ic = "[object Object]", ac = Function.prototype, sc = Object.prototype, Co = ac.toString, uc = sc.hasOwnProperty, cc = Co.call(Object);
function lc(t) {
  if (!xt(t) || Ct(t) != ic)
    return !1;
  var e = No(t);
  if (e === null)
    return !0;
  var r = uc.call(e, "constructor") && e.constructor;
  return typeof r == "function" && r instanceof r && Co.call(r) == cc;
}
function fc() {
  this.__data__ = new wt(), this.size = 0;
}
function pc(t) {
  var e = this.__data__, r = e.delete(t);
  return this.size = e.size, r;
}
function hc(t) {
  return this.__data__.get(t);
}
function dc(t) {
  return this.__data__.has(t);
}
var vc = 200;
function mc(t, e) {
  var r = this.__data__;
  if (r instanceof wt) {
    var n = r.__data__;
    if (!Jt || n.length < vc - 1)
      return n.push([t, e]), this.size = ++r.size, this;
    r = this.__data__ = new _t(n);
  }
  return r.set(t, e), this.size = r.size, this;
}
function ht(t) {
  var e = this.__data__ = new wt(t);
  this.size = e.size;
}
ht.prototype.clear = fc;
ht.prototype.delete = pc;
ht.prototype.get = hc;
ht.prototype.has = dc;
ht.prototype.set = mc;
var Po = typeof exports == "object" && exports && !exports.nodeType && exports, jn = Po && typeof module == "object" && module && !module.nodeType && module, gc = jn && jn.exports === Po, xn = gc ? dt.Buffer : void 0, Rn = xn ? xn.allocUnsafe : void 0;
function yc(t, e) {
  if (e)
    return t.slice();
  var r = t.length, n = Rn ? Rn(r) : new t.constructor(r);
  return t.copy(n), n;
}
function bc(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length, o = 0, i = []; ++r < n; ) {
    var a = t[r];
    e(a, r, t) && (i[o++] = a);
  }
  return i;
}
function Oc() {
  return [];
}
var wc = Object.prototype, _c = wc.propertyIsEnumerable, Tn = Object.getOwnPropertySymbols, Ec = Tn ? function(t) {
  return t == null ? [] : (t = Object(t), bc(Tn(t), function(e) {
    return _c.call(t, e);
  }));
} : Oc;
const Sc = Ec;
function jc(t, e, r) {
  var n = e(t);
  return lt(t) ? n : nc(n, r(t));
}
function Dn(t) {
  return jc(t, kr, Sc);
}
var xc = kt(dt, "DataView");
const or = xc;
var Rc = kt(dt, "Promise");
const ir = Rc;
var Tc = kt(dt, "Set");
const Ft = Tc;
var $n = "[object Map]", Dc = "[object Object]", An = "[object Promise]", Nn = "[object Set]", Cn = "[object WeakMap]", Pn = "[object DataView]", $c = Pt(or), Ac = Pt(Jt), Nc = Pt(ir), Cc = Pt(Ft), Pc = Pt(nr), Dt = Ct;
(or && Dt(new or(new ArrayBuffer(1))) != Pn || Jt && Dt(new Jt()) != $n || ir && Dt(ir.resolve()) != An || Ft && Dt(new Ft()) != Nn || nr && Dt(new nr()) != Cn) && (Dt = function(t) {
  var e = Ct(t), r = e == Dc ? t.constructor : void 0, n = r ? Pt(r) : "";
  if (n)
    switch (n) {
      case $c:
        return Pn;
      case Ac:
        return $n;
      case Nc:
        return An;
      case Cc:
        return Nn;
      case Pc:
        return Cn;
    }
  return e;
});
const kn = Dt;
var kc = dt.Uint8Array;
const _e = kc;
function Uc(t) {
  var e = new t.constructor(t.byteLength);
  return new _e(e).set(new _e(t)), e;
}
function Lc(t, e) {
  var r = e ? Uc(t.buffer) : t.buffer;
  return new t.constructor(r, t.byteOffset, t.length);
}
function Ic(t) {
  return typeof t.constructor == "function" && !Cr(t) ? Ya(No(t)) : {};
}
var Mc = "__lodash_hash_undefined__";
function Fc(t) {
  return this.__data__.set(t, Mc), this;
}
function zc(t) {
  return this.__data__.has(t);
}
function Gt(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.__data__ = new _t(); ++e < r; )
    this.add(t[e]);
}
Gt.prototype.add = Gt.prototype.push = Fc;
Gt.prototype.has = zc;
function Vc(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length; ++r < n; )
    if (e(t[r], r, t))
      return !0;
  return !1;
}
function ko(t, e) {
  return t.has(e);
}
var Hc = 1, Bc = 2;
function Uo(t, e, r, n, o, i) {
  var a = r & Hc, u = t.length, s = e.length;
  if (u != s && !(a && s > u))
    return !1;
  var l = i.get(t), f = i.get(e);
  if (l && f)
    return l == e && f == t;
  var d = -1, h = !0, p = r & Bc ? new Gt() : void 0;
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
      if (!Vc(e, function(A, N) {
        if (!ko(p, N) && (g === A || o(g, A, r, n, i)))
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
function Wc(t) {
  var e = -1, r = Array(t.size);
  return t.forEach(function(n, o) {
    r[++e] = [o, n];
  }), r;
}
function Ir(t) {
  var e = -1, r = Array(t.size);
  return t.forEach(function(n) {
    r[++e] = n;
  }), r;
}
var qc = 1, Yc = 2, Kc = "[object Boolean]", Jc = "[object Date]", Gc = "[object Error]", Xc = "[object Map]", Zc = "[object Number]", Qc = "[object RegExp]", tl = "[object Set]", el = "[object String]", rl = "[object Symbol]", nl = "[object ArrayBuffer]", ol = "[object DataView]", Un = jt ? jt.prototype : void 0, Ye = Un ? Un.valueOf : void 0;
function il(t, e, r, n, o, i, a) {
  switch (r) {
    case ol:
      if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset)
        return !1;
      t = t.buffer, e = e.buffer;
    case nl:
      return !(t.byteLength != e.byteLength || !i(new _e(t), new _e(e)));
    case Kc:
    case Jc:
    case Zc:
      return ne(+t, +e);
    case Gc:
      return t.name == e.name && t.message == e.message;
    case Qc:
    case el:
      return t == e + "";
    case Xc:
      var u = Wc;
    case tl:
      var s = n & qc;
      if (u || (u = Ir), t.size != e.size && !s)
        return !1;
      var l = a.get(t);
      if (l)
        return l == e;
      n |= Yc, a.set(t, e);
      var f = Uo(u(t), u(e), n, o, i, a);
      return a.delete(t), f;
    case rl:
      if (Ye)
        return Ye.call(t) == Ye.call(e);
  }
  return !1;
}
var al = 1, sl = Object.prototype, ul = sl.hasOwnProperty;
function cl(t, e, r, n, o, i) {
  var a = r & al, u = Dn(t), s = u.length, l = Dn(e), f = l.length;
  if (s != f && !a)
    return !1;
  for (var d = s; d--; ) {
    var h = u[d];
    if (!(a ? h in e : ul.call(e, h)))
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
var ll = 1, Ln = "[object Arguments]", In = "[object Array]", ce = "[object Object]", fl = Object.prototype, Mn = fl.hasOwnProperty;
function pl(t, e, r, n, o, i) {
  var a = lt(t), u = lt(e), s = a ? In : kn(t), l = u ? In : kn(e);
  s = s == Ln ? ce : s, l = l == Ln ? ce : l;
  var f = s == ce, d = l == ce, h = s == l;
  if (h && we(t)) {
    if (!we(e))
      return !1;
    a = !0, f = !1;
  }
  if (h && !f)
    return i || (i = new ht()), a || Pr(t) ? Uo(t, e, r, n, o, i) : il(t, e, s, r, n, o, i);
  if (!(r & ll)) {
    var p = f && Mn.call(t, "__wrapped__"), g = d && Mn.call(e, "__wrapped__");
    if (p || g) {
      var v = p ? t.value() : t, E = g ? e.value() : e;
      return i || (i = new ht()), o(v, E, r, n, i);
    }
  }
  return h ? (i || (i = new ht()), cl(t, e, r, n, o, i)) : !1;
}
function Mr(t, e, r, n, o) {
  return t === e ? !0 : t == null || e == null || !xt(t) && !xt(e) ? t !== t && e !== e : pl(t, e, r, n, Mr, o);
}
var hl = 1, dl = 2;
function vl(t, e, r, n) {
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
      if (!(h === void 0 ? Mr(f, l, hl | dl, n, d) : h))
        return !1;
    }
  }
  return !0;
}
function Lo(t) {
  return t === t && !Rt(t);
}
function ml(t) {
  for (var e = kr(t), r = e.length; r--; ) {
    var n = e[r], o = t[n];
    e[r] = [n, o, Lo(o)];
  }
  return e;
}
function Io(t, e) {
  return function(r) {
    return r == null ? !1 : r[t] === e && (e !== void 0 || t in Object(r));
  };
}
function gl(t) {
  var e = ml(t);
  return e.length == 1 && e[0][2] ? Io(e[0][0], e[0][1]) : function(r) {
    return r === t || vl(r, t, e);
  };
}
function yl(t, e) {
  return t != null && e in Object(t);
}
function bl(t, e, r) {
  e = $o(e, t);
  for (var n = -1, o = e.length, i = !1; ++n < o; ) {
    var a = Ae(e[n]);
    if (!(i = t != null && r(t, a)))
      break;
    t = t[a];
  }
  return i || ++n != o ? i : (o = t == null ? 0 : t.length, !!o && Nr(o) && Ar(a, o) && (lt(t) || Oe(t)));
}
function Ol(t, e) {
  return t != null && bl(t, e, yl);
}
var wl = 1, _l = 2;
function El(t, e) {
  return Ur(t) && Lo(e) ? Io(Ae(t), e) : function(r) {
    var n = rc(r, t);
    return n === void 0 && n === e ? Ol(r, t) : Mr(e, n, wl | _l);
  };
}
function Sl(t) {
  return function(e) {
    return e == null ? void 0 : e[t];
  };
}
function jl(t) {
  return function(e) {
    return Ao(e, t);
  };
}
function xl(t) {
  return Ur(t) ? Sl(Ae(t)) : jl(t);
}
function Mo(t) {
  return typeof t == "function" ? t : t == null ? Dr : typeof t == "object" ? lt(t) ? El(t[0], t[1]) : gl(t) : xl(t);
}
function Rl(t) {
  return function(e, r, n) {
    for (var o = -1, i = Object(e), a = n(e), u = a.length; u--; ) {
      var s = a[t ? u : ++o];
      if (r(i[s], s, i) === !1)
        break;
    }
    return e;
  };
}
var Tl = Rl();
const Fo = Tl;
function Dl(t, e) {
  return t && Fo(t, e, kr);
}
function ar(t, e, r) {
  (r !== void 0 && !ne(t[e], r) || r === void 0 && !(e in t)) && Re(t, e, r);
}
function $l(t) {
  return xt(t) && Te(t);
}
function sr(t, e) {
  if (!(e === "constructor" && typeof t[e] == "function") && e != "__proto__")
    return t[e];
}
function Al(t) {
  return gs(t, Do(t));
}
function Nl(t, e, r, n, o, i, a) {
  var u = sr(t, r), s = sr(e, r), l = a.get(s);
  if (l) {
    ar(t, r, l);
    return;
  }
  var f = i ? i(u, s, r + "", t, e, a) : void 0, d = f === void 0;
  if (d) {
    var h = lt(s), p = !h && we(s), g = !h && !p && Pr(s);
    f = s, h || p || g ? lt(u) ? f = u : $l(u) ? f = Ga(u) : p ? (d = !1, f = yc(s, !0)) : g ? (d = !1, f = Lc(s, !0)) : f = [] : lc(s) || Oe(s) ? (f = u, Oe(u) ? f = Al(u) : (!Rt(u) || $r(u)) && (f = Ic(s))) : d = !1;
  }
  d && (a.set(s, f), o(f, s, n, i, a), a.delete(s)), ar(t, r, f);
}
function zo(t, e, r, n, o) {
  t !== e && Fo(e, function(i, a) {
    if (o || (o = new ht()), Rt(i))
      Nl(t, e, a, r, zo, n, o);
    else {
      var u = n ? n(sr(t, a), i, a + "", t, e, o) : void 0;
      u === void 0 && (u = i), ar(t, a, u);
    }
  }, Do);
}
function Cl(t, e, r) {
  for (var n = -1, o = t == null ? 0 : t.length; ++n < o; )
    if (r(e, t[n]))
      return !0;
  return !1;
}
function Pl(t, e) {
  var r = {};
  return e = Mo(e), Dl(t, function(n, o, i) {
    Re(r, o, e(n, o, i));
  }), r;
}
var kl = _s(function(t, e, r) {
  zo(t, e, r);
});
const Ul = kl;
var Ll = 1 / 0, Il = Ft && 1 / Ir(new Ft([, -0]))[1] == Ll ? function(t) {
  return new Ft(t);
} : Ja;
const Ml = Il;
var Fl = 200;
function zl(t, e, r) {
  var n = -1, o = fs, i = t.length, a = !0, u = [], s = u;
  if (r)
    a = !1, o = Cl;
  else if (i >= Fl) {
    var l = e ? null : Ml(t);
    if (l)
      return Ir(l);
    a = !1, o = ko, s = new Gt();
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
function Vl(t, e) {
  return t && t.length ? zl(t, Mo(e)) : [];
}
var ur = /* @__PURE__ */ ((t) => (t.Json = "application/json", t.UrlEncoded = "application/x-www-form-urlencoded", t))(ur || {});
class Hl {
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
class Bl {
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
const le = new Bl();
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
const Wl = new Vo();
new Vo();
var Fr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, cr = {}, ql = {
  get exports() {
    return cr;
  },
  set exports(t) {
    cr = t;
  }
};
(function(t, e) {
  (function(r, n) {
    t.exports = n();
  })(Fr, function() {
    var r = 1e3, n = 6e4, o = 36e5, i = "millisecond", a = "second", u = "minute", s = "hour", l = "day", f = "week", d = "month", h = "quarter", p = "year", g = "date", v = "Invalid Date", E = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, A = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, N = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(R) {
      var O = ["th", "st", "nd", "rd"], b = R % 100;
      return "[" + R + (O[(b - 20) % 10] || O[b] || O[0]) + "]";
    } }, S = function(R, O, b) {
      var T = String(R);
      return !T || T.length >= O ? R : "" + Array(O + 1 - T.length).join(b) + R;
    }, j = { s: S, z: function(R) {
      var O = -R.utcOffset(), b = Math.abs(O), T = Math.floor(b / 60), _ = b % 60;
      return (O <= 0 ? "+" : "-") + S(T, 2, "0") + ":" + S(_, 2, "0");
    }, m: function R(O, b) {
      if (O.date() < b.date())
        return -R(b, O);
      var T = 12 * (b.year() - O.year()) + (b.month() - O.month()), _ = O.clone().add(T, d), $ = b - _ < 0, D = O.clone().add(T + ($ ? -1 : 1), d);
      return +(-(T + (b - _) / ($ ? _ - D : D - _)) || 0);
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
    }, M = function R(O, b, T) {
      var _;
      if (!O)
        return C;
      if (typeof O == "string") {
        var $ = O.toLowerCase();
        I[$] && (_ = $), b && (I[$] = b, _ = $);
        var D = O.split("-");
        if (!_ && D.length > 1)
          return R(D[0]);
      } else {
        var z = O.name;
        I[z] = O, _ = z;
      }
      return !T && _ && (C = _), _ || !T && C;
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
        this.$d = function(T) {
          var _ = T.date, $ = T.utc;
          if (_ === null)
            return new Date(NaN);
          if (k.u(_))
            return new Date();
          if (_ instanceof Date)
            return new Date(_);
          if (typeof _ == "string" && !/Z$/i.test(_)) {
            var D = _.match(E);
            if (D) {
              var z = D[2] - 1 || 0, K = (D[7] || "0").substring(0, 3);
              return $ ? new Date(Date.UTC(D[1], z, D[3] || 1, D[4] || 0, D[5] || 0, D[6] || 0, K)) : new Date(D[1], z, D[3] || 1, D[4] || 0, D[5] || 0, D[6] || 0, K);
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
      }, O.isSame = function(b, T) {
        var _ = P(b);
        return this.startOf(T) <= _ && _ <= this.endOf(T);
      }, O.isAfter = function(b, T) {
        return P(b) < this.startOf(T);
      }, O.isBefore = function(b, T) {
        return this.endOf(T) < P(b);
      }, O.$g = function(b, T, _) {
        return k.u(b) ? this[T] : this.set(_, b);
      }, O.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, O.valueOf = function() {
        return this.$d.getTime();
      }, O.startOf = function(b, T) {
        var _ = this, $ = !!k.u(T) || T, D = k.p(b), z = function(ct, Z) {
          var ot = k.w(_.$u ? Date.UTC(_.$y, Z, ct) : new Date(_.$y, Z, ct), _);
          return $ ? ot : ot.endOf(l);
        }, K = function(ct, Z) {
          return k.w(_.toDate()[ct].apply(_.toDate("s"), ($ ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(Z)), _);
        }, q = this.$W, X = this.$M, ft = this.$D, ut = "set" + (this.$u ? "UTC" : "");
        switch (D) {
          case p:
            return $ ? z(1, 0) : z(31, 11);
          case d:
            return $ ? z(1, X) : z(0, X + 1);
          case f:
            var vt = this.$locale().weekStart || 0, mt = (q < vt ? q + 7 : q) - vt;
            return z($ ? ft - mt : ft + (6 - mt), X);
          case l:
          case g:
            return K(ut + "Hours", 0);
          case s:
            return K(ut + "Minutes", 1);
          case u:
            return K(ut + "Seconds", 2);
          case a:
            return K(ut + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, O.endOf = function(b) {
        return this.startOf(b, !1);
      }, O.$set = function(b, T) {
        var _, $ = k.p(b), D = "set" + (this.$u ? "UTC" : ""), z = (_ = {}, _[l] = D + "Date", _[g] = D + "Date", _[d] = D + "Month", _[p] = D + "FullYear", _[s] = D + "Hours", _[u] = D + "Minutes", _[a] = D + "Seconds", _[i] = D + "Milliseconds", _)[$], K = $ === l ? this.$D + (T - this.$W) : T;
        if ($ === d || $ === p) {
          var q = this.clone().set(g, 1);
          q.$d[z](K), q.init(), this.$d = q.set(g, Math.min(this.$D, q.daysInMonth())).$d;
        } else
          z && this.$d[z](K);
        return this.init(), this;
      }, O.set = function(b, T) {
        return this.clone().$set(b, T);
      }, O.get = function(b) {
        return this[k.p(b)]();
      }, O.add = function(b, T) {
        var _, $ = this;
        b = Number(b);
        var D = k.p(T), z = function(X) {
          var ft = P($);
          return k.w(ft.date(ft.date() + Math.round(X * b)), $);
        };
        if (D === d)
          return this.set(d, this.$M + b);
        if (D === p)
          return this.set(p, this.$y + b);
        if (D === l)
          return z(1);
        if (D === f)
          return z(7);
        var K = (_ = {}, _[u] = n, _[s] = o, _[a] = r, _)[D] || 1, q = this.$d.getTime() + b * K;
        return k.w(q, this);
      }, O.subtract = function(b, T) {
        return this.add(-1 * b, T);
      }, O.format = function(b) {
        var T = this, _ = this.$locale();
        if (!this.isValid())
          return _.invalidDate || v;
        var $ = b || "YYYY-MM-DDTHH:mm:ssZ", D = k.z(this), z = this.$H, K = this.$m, q = this.$M, X = _.weekdays, ft = _.months, ut = function(Z, ot, Ht, Tt) {
          return Z && (Z[ot] || Z(T, $)) || Ht[ot].slice(0, Tt);
        }, vt = function(Z) {
          return k.s(z % 12 || 12, Z, "0");
        }, mt = _.meridiem || function(Z, ot, Ht) {
          var Tt = Z < 12 ? "AM" : "PM";
          return Ht ? Tt.toLowerCase() : Tt;
        }, ct = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: q + 1, MM: k.s(q + 1, 2, "0"), MMM: ut(_.monthsShort, q, ft, 3), MMMM: ut(ft, q), D: this.$D, DD: k.s(this.$D, 2, "0"), d: String(this.$W), dd: ut(_.weekdaysMin, this.$W, X, 2), ddd: ut(_.weekdaysShort, this.$W, X, 3), dddd: X[this.$W], H: String(z), HH: k.s(z, 2, "0"), h: vt(1), hh: vt(2), a: mt(z, K, !0), A: mt(z, K, !1), m: String(K), mm: k.s(K, 2, "0"), s: String(this.$s), ss: k.s(this.$s, 2, "0"), SSS: k.s(this.$ms, 3, "0"), Z: D };
        return $.replace(A, function(Z, ot) {
          return ot || ct[Z] || D.replace(":", "");
        });
      }, O.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, O.diff = function(b, T, _) {
        var $, D = k.p(T), z = P(b), K = (z.utcOffset() - this.utcOffset()) * n, q = this - z, X = k.m(this, z);
        return X = ($ = {}, $[p] = X / 12, $[d] = X, $[h] = X / 3, $[f] = (q - K) / 6048e5, $[l] = (q - K) / 864e5, $[s] = q / o, $[u] = q / n, $[a] = q / r, $)[D] || q, _ ? X : k.a(X);
      }, O.daysInMonth = function() {
        return this.endOf(d).$D;
      }, O.$locale = function() {
        return I[this.$L];
      }, O.locale = function(b, T) {
        if (!b)
          return this.$L;
        var _ = this.clone(), $ = M(b, T, !0);
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
    }(), ae = st.prototype;
    return P.prototype = ae, [["$ms", i], ["$s", a], ["$m", u], ["$H", s], ["$W", l], ["$M", d], ["$y", p], ["$D", g]].forEach(function(R) {
      ae[R[1]] = function(O) {
        return this.$g(O, R[0], R[1]);
      };
    }), P.extend = function(R, O) {
      return R.$i || (R(O, st, P), R.$i = !0), P;
    }, P.locale = M, P.isDayjs = W, P.unix = function(R) {
      return P(1e3 * R);
    }, P.en = I[C], P.Ls = I, P.p = {}, P;
  });
})(ql);
const Ho = cr;
var lr = {}, Yl = {
  get exports() {
    return lr;
  },
  set exports(t) {
    lr = t;
  }
};
(function(t, e) {
  (function(r, n) {
    t.exports = n();
  })(Fr, function() {
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
})(Yl);
const Kl = lr;
var fr = {}, Jl = {
  get exports() {
    return fr;
  },
  set exports(t) {
    fr = t;
  }
};
(function(t, e) {
  (function(r, n) {
    t.exports = n();
  })(Fr, function() {
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
})(Jl);
const Gl = fr;
Ho.extend(Kl);
Ho.extend(Gl);
function Fn(t) {
  for (const e in t)
    Object.prototype.hasOwnProperty.call(t, e) && t[e] === void 0 && delete t[e];
  return t;
}
const pr = (t, e = "", r = new FormData()) => (Object.keys(t).forEach((n) => {
  const o = e !== "" ? e + "." + n : n, i = t[n];
  Array.isArray(i) ? i.forEach((a, u) => {
    typeof a == "object" ? a instanceof File ? r.append(o, a) : r = pr(a, o + `[${u}]`, r) : r.append(o, a);
  }) : typeof i == "object" ? i instanceof File ? r.append(o, i) : r = pr(i, o, r) : r.append(o, i);
}), r), Ee = (t, e = "", r = new URLSearchParams()) => (Object.keys(t).forEach((n) => {
  const o = e !== "" ? e + "." + n : n, i = t[n];
  Array.isArray(i) ? i.forEach((a, u) => {
    typeof a == "object" ? r = Ee(a, o + `[${u}]`, r) : r.append(o, a);
  }) : typeof i == "object" ? r = Ee(i, o, r) : r.append(o, i);
}), r);
function hr(t) {
  this.message = t;
}
hr.prototype = new Error(), hr.prototype.name = "InvalidCharacterError";
typeof window < "u" && window.atob && window.atob.bind(window);
function zn(t) {
  this.message = t;
}
zn.prototype = new Error(), zn.prototype.name = "InvalidTokenError";
function Bo(t, e) {
  return function() {
    return t.apply(e, arguments);
  };
}
const { toString: Wo } = Object.prototype, { getPrototypeOf: zr } = Object, Vr = ((t) => (e) => {
  const r = Wo.call(e);
  return t[r] || (t[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), Et = (t) => (t = t.toLowerCase(), (e) => Vr(e) === t), Ne = (t) => (e) => typeof e === t, { isArray: Vt } = Array, Xt = Ne("undefined");
function Xl(t) {
  return t !== null && !Xt(t) && t.constructor !== null && !Xt(t.constructor) && Nt(t.constructor.isBuffer) && t.constructor.isBuffer(t);
}
const qo = Et("ArrayBuffer");
function Zl(t) {
  let e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(t) : e = t && t.buffer && qo(t.buffer), e;
}
const Ql = Ne("string"), Nt = Ne("function"), Yo = Ne("number"), Hr = (t) => t !== null && typeof t == "object", tf = (t) => t === !0 || t === !1, he = (t) => {
  if (Vr(t) !== "object")
    return !1;
  const e = zr(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in t) && !(Symbol.iterator in t);
}, ef = Et("Date"), rf = Et("File"), nf = Et("Blob"), of = Et("FileList"), af = (t) => Hr(t) && Nt(t.pipe), sf = (t) => {
  const e = "[object FormData]";
  return t && (typeof FormData == "function" && t instanceof FormData || Wo.call(t) === e || Nt(t.toString) && t.toString() === e);
}, uf = Et("URLSearchParams"), cf = (t) => t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
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
function Ko(t, e) {
  e = e.toLowerCase();
  const r = Object.keys(t);
  let n = r.length, o;
  for (; n-- > 0; )
    if (o = r[n], e === o.toLowerCase())
      return o;
  return null;
}
const Jo = typeof self > "u" ? typeof global > "u" ? globalThis : global : self, Go = (t) => !Xt(t) && t !== Jo;
function dr() {
  const { caseless: t } = Go(this) && this || {}, e = {}, r = (n, o) => {
    const i = t && Ko(e, o) || o;
    he(e[i]) && he(n) ? e[i] = dr(e[i], n) : he(n) ? e[i] = dr({}, n) : Vt(n) ? e[i] = n.slice() : e[i] = n;
  };
  for (let n = 0, o = arguments.length; n < o; n++)
    arguments[n] && oe(arguments[n], r);
  return e;
}
const lf = (t, e, r, { allOwnKeys: n } = {}) => (oe(e, (o, i) => {
  r && Nt(o) ? t[i] = Bo(o, r) : t[i] = o;
}, { allOwnKeys: n }), t), ff = (t) => (t.charCodeAt(0) === 65279 && (t = t.slice(1)), t), pf = (t, e, r, n) => {
  t.prototype = Object.create(e.prototype, n), t.prototype.constructor = t, Object.defineProperty(t, "super", {
    value: e.prototype
  }), r && Object.assign(t.prototype, r);
}, hf = (t, e, r, n) => {
  let o, i, a;
  const u = {};
  if (e = e || {}, t == null)
    return e;
  do {
    for (o = Object.getOwnPropertyNames(t), i = o.length; i-- > 0; )
      a = o[i], (!n || n(a, t, e)) && !u[a] && (e[a] = t[a], u[a] = !0);
    t = r !== !1 && zr(t);
  } while (t && (!r || r(t, e)) && t !== Object.prototype);
  return e;
}, df = (t, e, r) => {
  t = String(t), (r === void 0 || r > t.length) && (r = t.length), r -= e.length;
  const n = t.indexOf(e, r);
  return n !== -1 && n === r;
}, vf = (t) => {
  if (!t)
    return null;
  if (Vt(t))
    return t;
  let e = t.length;
  if (!Yo(e))
    return null;
  const r = new Array(e);
  for (; e-- > 0; )
    r[e] = t[e];
  return r;
}, mf = ((t) => (e) => t && e instanceof t)(typeof Uint8Array < "u" && zr(Uint8Array)), gf = (t, e) => {
  const r = (t && t[Symbol.iterator]).call(t);
  let n;
  for (; (n = r.next()) && !n.done; ) {
    const o = n.value;
    e.call(t, o[0], o[1]);
  }
}, yf = (t, e) => {
  let r;
  const n = [];
  for (; (r = t.exec(e)) !== null; )
    n.push(r);
  return n;
}, bf = Et("HTMLFormElement"), Of = (t) => t.toLowerCase().replace(
  /[_-\s]([a-z\d])(\w*)/g,
  function(e, r, n) {
    return r.toUpperCase() + n;
  }
), Vn = (({ hasOwnProperty: t }) => (e, r) => t.call(e, r))(Object.prototype), wf = Et("RegExp"), Xo = (t, e) => {
  const r = Object.getOwnPropertyDescriptors(t), n = {};
  oe(r, (o, i) => {
    e(o, i, t) !== !1 && (n[i] = o);
  }), Object.defineProperties(t, n);
}, _f = (t) => {
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
}, Ef = (t, e) => {
  const r = {}, n = (o) => {
    o.forEach((i) => {
      r[i] = !0;
    });
  };
  return Vt(t) ? n(t) : n(String(t).split(e)), r;
}, Sf = () => {
}, jf = (t, e) => (t = +t, Number.isFinite(t) ? t : e), xf = (t) => {
  const e = new Array(10), r = (n, o) => {
    if (Hr(n)) {
      if (e.indexOf(n) >= 0)
        return;
      if (!("toJSON" in n)) {
        e[o] = n;
        const i = Vt(n) ? [] : {};
        return oe(n, (a, u) => {
          const s = r(a, o + 1);
          !Xt(s) && (i[u] = s);
        }), e[o] = void 0, i;
      }
    }
    return n;
  };
  return r(t, 0);
}, m = {
  isArray: Vt,
  isArrayBuffer: qo,
  isBuffer: Xl,
  isFormData: sf,
  isArrayBufferView: Zl,
  isString: Ql,
  isNumber: Yo,
  isBoolean: tf,
  isObject: Hr,
  isPlainObject: he,
  isUndefined: Xt,
  isDate: ef,
  isFile: rf,
  isBlob: nf,
  isRegExp: wf,
  isFunction: Nt,
  isStream: af,
  isURLSearchParams: uf,
  isTypedArray: mf,
  isFileList: of,
  forEach: oe,
  merge: dr,
  extend: lf,
  trim: cf,
  stripBOM: ff,
  inherits: pf,
  toFlatObject: hf,
  kindOf: Vr,
  kindOfTest: Et,
  endsWith: df,
  toArray: vf,
  forEachEntry: gf,
  matchAll: yf,
  isHTMLForm: bf,
  hasOwnProperty: Vn,
  hasOwnProp: Vn,
  reduceDescriptors: Xo,
  freezeMethods: _f,
  toObjectSet: Ef,
  toCamelCase: Of,
  noop: Sf,
  toFiniteNumber: jf,
  findKey: Ko,
  global: Jo,
  isContextDefined: Go,
  toJSONObject: xf
};
function F(t, e, r, n, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = t, this.name = "AxiosError", e && (this.code = e), r && (this.config = r), n && (this.request = n), o && (this.response = o);
}
m.inherits(F, Error, {
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
const Zo = F.prototype, Qo = {};
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
].forEach((t) => {
  Qo[t] = { value: t };
});
Object.defineProperties(F, Qo);
Object.defineProperty(Zo, "isAxiosError", { value: !0 });
F.from = (t, e, r, n, o, i) => {
  const a = Object.create(Zo);
  return m.toFlatObject(t, a, function(u) {
    return u !== Error.prototype;
  }, (u) => u !== "isAxiosError"), F.call(a, t.message, e, r, n, o), a.cause = t, a.name = t.name, i && Object.assign(a, i), a;
};
var Rf = typeof self == "object" ? self.FormData : window.FormData;
const Tf = Rf;
function vr(t) {
  return m.isPlainObject(t) || m.isArray(t);
}
function ti(t) {
  return m.endsWith(t, "[]") ? t.slice(0, -2) : t;
}
function Hn(t, e, r) {
  return t ? t.concat(e).map(function(n, o) {
    return n = ti(n), !r && o ? "[" + n + "]" : n;
  }).join(r ? "." : "") : e;
}
function Df(t) {
  return m.isArray(t) && !t.some(vr);
}
const $f = m.toFlatObject(m, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function Af(t) {
  return t && m.isFunction(t.append) && t[Symbol.toStringTag] === "FormData" && t[Symbol.iterator];
}
function Ce(t, e, r) {
  if (!m.isObject(t))
    throw new TypeError("target must be an object");
  e = e || new (Tf || FormData)(), r = m.toFlatObject(r, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(p, g) {
    return !m.isUndefined(g[p]);
  });
  const n = r.metaTokens, o = r.visitor || l, i = r.dots, a = r.indexes, u = (r.Blob || typeof Blob < "u" && Blob) && Af(e);
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
      else if (m.isArray(p) && Df(p) || m.isFileList(p) || m.endsWith(g, "[]") && (E = m.toArray(p)))
        return g = ti(g), E.forEach(function(A, N) {
          !(m.isUndefined(A) || A === null) && e.append(
            a === !0 ? Hn([g], N, i) : a === null ? g : g + "[]",
            s(A)
          );
        }), !1;
    }
    return vr(p) ? !0 : (e.append(Hn(v, g, i), s(p)), !1);
  }
  const f = [], d = Object.assign($f, {
    defaultVisitor: l,
    convertValue: s,
    isVisitable: vr
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
function Br(t, e) {
  this._pairs = [], t && Ce(t, this, e);
}
const ei = Br.prototype;
ei.append = function(t, e) {
  this._pairs.push([t, e]);
};
ei.toString = function(t) {
  const e = t ? function(r) {
    return t.call(this, r, Bn);
  } : Bn;
  return this._pairs.map(function(r) {
    return e(r[0]) + "=" + e(r[1]);
  }, "").join("&");
};
function Nf(t) {
  return encodeURIComponent(t).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function ri(t, e, r) {
  if (!e)
    return t;
  const n = r && r.encode || Nf, o = r && r.serialize;
  let i;
  if (o ? i = o(e, r) : i = m.isURLSearchParams(e) ? e.toString() : new Br(e, r).toString(n), i) {
    const a = t.indexOf("#");
    a !== -1 && (t = t.slice(0, a)), t += (t.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return t;
}
class Cf {
  constructor() {
    this.handlers = [];
  }
  use(e, r, n) {
    return this.handlers.push({
      fulfilled: e,
      rejected: r,
      synchronous: n ? n.synchronous : !1,
      runWhen: n ? n.runWhen : null
    }), this.handlers.length - 1;
  }
  eject(e) {
    this.handlers[e] && (this.handlers[e] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(e) {
    m.forEach(this.handlers, function(r) {
      r !== null && e(r);
    });
  }
}
const Wn = Cf, ni = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Pf = typeof URLSearchParams < "u" ? URLSearchParams : Br, kf = FormData, Uf = (() => {
  let t;
  return typeof navigator < "u" && ((t = navigator.product) === "ReactNative" || t === "NativeScript" || t === "NS") ? !1 : typeof window < "u" && typeof document < "u";
})(), Lf = (() => typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), pt = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Pf,
    FormData: kf,
    Blob
  },
  isStandardBrowserEnv: Uf,
  isStandardBrowserWebWorkerEnv: Lf,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function If(t, e) {
  return Ce(t, new pt.classes.URLSearchParams(), Object.assign({
    visitor: function(r, n, o, i) {
      return pt.isNode && m.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments);
    }
  }, e));
}
function Mf(t) {
  return m.matchAll(/\w+|\[(\w*)]/g, t).map((e) => e[0] === "[]" ? "" : e[1] || e[0]);
}
function Ff(t) {
  const e = {}, r = Object.keys(t);
  let n;
  const o = r.length;
  let i;
  for (n = 0; n < o; n++)
    i = r[n], e[i] = t[i];
  return e;
}
function oi(t) {
  function e(r, n, o, i) {
    let a = r[i++];
    const u = Number.isFinite(+a), s = i >= r.length;
    return a = !a && m.isArray(o) ? o.length : a, s ? (m.hasOwnProp(o, a) ? o[a] = [o[a], n] : o[a] = n, !u) : ((!o[a] || !m.isObject(o[a])) && (o[a] = []), e(r, n, o[a], i) && m.isArray(o[a]) && (o[a] = Ff(o[a])), !u);
  }
  if (m.isFormData(t) && m.isFunction(t.entries)) {
    const r = {};
    return m.forEachEntry(t, (n, o) => {
      e(Mf(n), o, r, 0);
    }), r;
  }
  return null;
}
const zf = {
  "Content-Type": void 0
};
function Vf(t, e, r) {
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
  transitional: ni,
  adapter: ["xhr", "http"],
  transformRequest: [function(t, e) {
    const r = e.getContentType() || "", n = r.indexOf("application/json") > -1, o = m.isObject(t);
    if (o && m.isHTMLForm(t) && (t = new FormData(t)), m.isFormData(t))
      return n && n ? JSON.stringify(oi(t)) : t;
    if (m.isArrayBuffer(t) || m.isBuffer(t) || m.isStream(t) || m.isFile(t) || m.isBlob(t))
      return t;
    if (m.isArrayBufferView(t))
      return t.buffer;
    if (m.isURLSearchParams(t))
      return e.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let i;
    if (o) {
      if (r.indexOf("application/x-www-form-urlencoded") > -1)
        return If(t, this.formSerializer).toString();
      if ((i = m.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
        const a = this.env && this.env.FormData;
        return Ce(
          i ? { "files[]": t } : t,
          a && new a(),
          this.formSerializer
        );
      }
    }
    return o || n ? (e.setContentType("application/json", !1), Vf(t)) : t;
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
  Pe.headers[t] = m.merge(zf);
});
const Wr = Pe, Hf = m.toObjectSet([
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
]), Bf = (t) => {
  const e = {};
  let r, n, o;
  return t && t.split(`
`).forEach(function(i) {
    o = i.indexOf(":"), r = i.substring(0, o).trim().toLowerCase(), n = i.substring(o + 1).trim(), !(!r || e[r] && Hf[r]) && (r === "set-cookie" ? e[r] ? e[r].push(n) : e[r] = [n] : e[r] = e[r] ? e[r] + ", " + n : n);
  }), e;
}, qn = Symbol("internals");
function qt(t) {
  return t && String(t).trim().toLowerCase();
}
function de(t) {
  return t === !1 || t == null ? t : m.isArray(t) ? t.map(de) : String(t);
}
function Wf(t) {
  const e = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(t); )
    e[n[1]] = n[2];
  return e;
}
function qf(t) {
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
function Yf(t) {
  return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, r, n) => r.toUpperCase() + n);
}
function Kf(t, e) {
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
      const l = qt(u);
      if (!l)
        throw new Error("header name must be a non-empty string");
      const f = m.findKey(n, l);
      (!f || n[f] === void 0 || s === !0 || s === void 0 && n[f] !== !1) && (n[f || u] = de(a));
    }
    const i = (a, u) => m.forEach(a, (s, l) => o(s, l, u));
    return m.isPlainObject(t) || t instanceof this.constructor ? i(t, e) : m.isString(t) && (t = t.trim()) && !qf(t) ? i(Bf(t), e) : t != null && o(e, t, r), this;
  }
  get(t, e) {
    if (t = qt(t), t) {
      const r = m.findKey(this, t);
      if (r) {
        const n = this[r];
        if (!e)
          return n;
        if (e === !0)
          return Wf(n);
        if (m.isFunction(e))
          return e.call(this, n, r);
        if (m.isRegExp(e))
          return e.exec(n);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, e) {
    if (t = qt(t), t) {
      const r = m.findKey(this, t);
      return !!(r && (!e || Yn(this, this[r], r, e)));
    }
    return !1;
  }
  delete(t, e) {
    const r = this;
    let n = !1;
    function o(i) {
      if (i = qt(i), i) {
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
        e[i] = de(n), delete e[o];
        return;
      }
      const a = t ? Yf(o) : String(o).trim();
      a !== o && delete e[o], e[a] = de(n), r[a] = !0;
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
    const e = (this[qn] = this[qn] = {
      accessors: {}
    }).accessors, r = this.prototype;
    function n(o) {
      const i = qt(o);
      e[i] || (Kf(r, o), e[i] = !0);
    }
    return m.isArray(t) ? t.forEach(n) : n(t), this;
  }
};
ke.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent"]);
m.freezeMethods(ke.prototype);
m.freezeMethods(ke);
const bt = ke;
function Ke(t, e) {
  const r = this || Wr, n = e || r, o = bt.from(n.headers);
  let i = n.data;
  return m.forEach(t, function(a) {
    i = a.call(r, i, o.normalize(), e ? e.status : void 0);
  }), o.normalize(), i;
}
function ii(t) {
  return !!(t && t.__CANCEL__);
}
function ie(t, e, r) {
  F.call(this, t ?? "canceled", F.ERR_CANCELED, e, r), this.name = "CanceledError";
}
m.inherits(ie, F, {
  __CANCEL__: !0
});
const Jf = null;
function Gf(t, e, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? t(r) : e(new F(
    "Request failed with status code " + r.status,
    [F.ERR_BAD_REQUEST, F.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
    r.config,
    r.request,
    r
  ));
}
const Xf = pt.isStandardBrowserEnv ? function() {
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
function Zf(t) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
}
function Qf(t, e) {
  return e ? t.replace(/\/+$/, "") + "/" + e.replace(/^\/+/, "") : t;
}
function ai(t, e) {
  return t && !Zf(e) ? Qf(t, e) : e;
}
const tp = pt.isStandardBrowserEnv ? function() {
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
}() : function() {
  return function() {
    return !0;
  };
}();
function ep(t) {
  const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
  return e && e[1] || "";
}
function rp(t, e) {
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
function Kn(t, e) {
  let r = 0;
  const n = rp(50, 250);
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
const np = typeof XMLHttpRequest < "u", op = np && function(t) {
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
    const l = ai(t.baseURL, t.url);
    s.open(t.method.toUpperCase(), ri(l, t.params, t.paramsSerializer), !0), s.timeout = t.timeout;
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
      Gf(function(g) {
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
      const p = t.transitional || ni;
      t.timeoutErrorMessage && (h = t.timeoutErrorMessage), r(new F(
        h,
        p.clarifyTimeoutError ? F.ETIMEDOUT : F.ECONNABORTED,
        t,
        s
      )), s = null;
    }, pt.isStandardBrowserEnv) {
      const h = (t.withCredentials || tp(l)) && t.xsrfCookieName && Xf.read(t.xsrfCookieName);
      h && o.set(t.xsrfHeaderName, h);
    }
    n === void 0 && o.setContentType(null), "setRequestHeader" in s && m.forEach(o.toJSON(), function(h, p) {
      s.setRequestHeader(p, h);
    }), m.isUndefined(t.withCredentials) || (s.withCredentials = !!t.withCredentials), i && i !== "json" && (s.responseType = t.responseType), typeof t.onDownloadProgress == "function" && s.addEventListener("progress", Kn(t.onDownloadProgress, !0)), typeof t.onUploadProgress == "function" && s.upload && s.upload.addEventListener("progress", Kn(t.onUploadProgress)), (t.cancelToken || t.signal) && (a = (h) => {
      s && (r(!h || h.type ? new ie(null, t, s) : h), s.abort(), s = null);
    }, t.cancelToken && t.cancelToken.subscribe(a), t.signal && (t.signal.aborted ? a() : t.signal.addEventListener("abort", a)));
    const d = ep(l);
    if (d && pt.protocols.indexOf(d) === -1) {
      r(new F("Unsupported protocol " + d + ":", F.ERR_BAD_REQUEST, t));
      return;
    }
    s.send(n || null);
  });
}, ve = {
  http: Jf,
  xhr: op
};
m.forEach(ve, (t, e) => {
  if (t) {
    try {
      Object.defineProperty(t, "name", { value: e });
    } catch {
    }
    Object.defineProperty(t, "adapterName", { value: e });
  }
});
const ip = {
  getAdapter: (t) => {
    t = m.isArray(t) ? t : [t];
    const { length: e } = t;
    let r, n;
    for (let o = 0; o < e && (r = t[o], !(n = m.isString(r) ? ve[r.toLowerCase()] : r)); o++)
      ;
    if (!n)
      throw n === !1 ? new F(
        `Adapter ${r} is not supported by the environment`,
        "ERR_NOT_SUPPORT"
      ) : new Error(
        m.hasOwnProp(ve, r) ? `Adapter '${r}' is not available in the build` : `Unknown adapter '${r}'`
      );
    if (!m.isFunction(n))
      throw new TypeError("adapter is not a function");
    return n;
  },
  adapters: ve
};
function Je(t) {
  if (t.cancelToken && t.cancelToken.throwIfRequested(), t.signal && t.signal.aborted)
    throw new ie(null, t);
}
function Jn(t) {
  return Je(t), t.headers = bt.from(t.headers), t.data = Ke.call(
    t,
    t.transformRequest
  ), ["post", "put", "patch"].indexOf(t.method) !== -1 && t.headers.setContentType("application/x-www-form-urlencoded", !1), ip.getAdapter(t.adapter || Wr.adapter)(t).then(function(e) {
    return Je(t), e.data = Ke.call(
      t,
      t.transformResponse,
      e
    ), e.headers = bt.from(e.headers), e;
  }, function(e) {
    return ii(e) || (Je(t), e && e.response && (e.response.data = Ke.call(
      t,
      t.transformResponse,
      e.response
    ), e.response.headers = bt.from(e.response.headers))), Promise.reject(e);
  });
}
const Gn = (t) => t instanceof bt ? t.toJSON() : t;
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
    headers: (l, f) => o(Gn(l), Gn(f), !0)
  };
  return m.forEach(Object.keys(t).concat(Object.keys(e)), function(l) {
    const f = s[l] || o, d = f(t[l], e[l], l);
    m.isUndefined(d) && f !== u || (r[l] = d);
  }), r;
}
const si = "1.2.1", qr = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((t, e) => {
  qr[t] = function(r) {
    return typeof r === t || "a" + (e < 1 ? "n " : " ") + t;
  };
});
const Xn = {};
qr.transitional = function(t, e, r) {
  function n(o, i) {
    return "[Axios v" + si + "] Transitional option '" + o + "'" + i + (r ? ". " + r : "");
  }
  return (o, i, a) => {
    if (t === !1)
      throw new F(
        n(i, " has been removed" + (e ? " in " + e : "")),
        F.ERR_DEPRECATED
      );
    return e && !Xn[i] && (Xn[i] = !0, console.warn(
      n(
        i,
        " has been deprecated since v" + e + " and will be removed in the near future"
      )
    )), t ? t(o, i, a) : !0;
  };
};
function ap(t, e, r) {
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
const mr = {
  assertOptions: ap,
  validators: qr
}, St = mr.validators;
let Se = class {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new Wn(),
      response: new Wn()
    };
  }
  request(t, e) {
    typeof t == "string" ? (e = e || {}, e.url = t) : e = t || {}, e = zt(this.defaults, e);
    const { transitional: r, paramsSerializer: n, headers: o } = e;
    r !== void 0 && mr.assertOptions(r, {
      silentJSONParsing: St.transitional(St.boolean),
      forcedJSONParsing: St.transitional(St.boolean),
      clarifyTimeoutError: St.transitional(St.boolean)
    }, !1), n !== void 0 && mr.assertOptions(n, {
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
    const e = ai(t.baseURL, t.url);
    return ri(e, t.params, t.paramsSerializer);
  }
};
m.forEach(["delete", "get", "head", "options"], function(t) {
  Se.prototype[t] = function(e, r) {
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
  Se.prototype[t] = e(), Se.prototype[t + "Form"] = e(!0);
});
const me = Se;
let ui = class {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let e;
    this.promise = new Promise(function(n) {
      e = n;
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
    }, t(function(n, o, i) {
      r.reason || (r.reason = new ie(n, o, i), e(r.reason));
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
    const e = this._listeners.indexOf(t);
    e !== -1 && this._listeners.splice(e, 1);
  }
  static source() {
    let t;
    return {
      token: new ui(function(e) {
        t = e;
      }),
      cancel: t
    };
  }
};
const sp = ui;
function up(t) {
  return function(e) {
    return t.apply(null, e);
  };
}
function cp(t) {
  return m.isObject(t) && t.isAxiosError === !0;
}
function ci(t) {
  const e = new me(t), r = Bo(me.prototype.request, e);
  return m.extend(r, me.prototype, e, { allOwnKeys: !0 }), m.extend(r, e, null, { allOwnKeys: !0 }), r.create = function(n) {
    return ci(zt(t, n));
  }, r;
}
const tt = ci(Wr);
tt.Axios = me;
tt.CanceledError = ie;
tt.CancelToken = sp;
tt.isCancel = ii;
tt.VERSION = si;
tt.toFormData = Ce;
tt.AxiosError = F;
tt.Cancel = tt.CanceledError;
tt.all = function(t) {
  return Promise.all(t);
};
tt.spread = up;
tt.isAxiosError = cp;
tt.mergeConfig = zt;
tt.AxiosHeaders = bt;
tt.formToJSON = (t) => oi(m.isHTMLForm(t) ? new FormData(t) : t);
tt.default = tt;
const lp = tt;
var gr = function(t, e) {
  return gr = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
    r.__proto__ = n;
  } || function(r, n) {
    for (var o in n)
      Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
  }, gr(t, e);
};
function Ue(t, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  gr(t, e);
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
function br(t, e) {
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
function Or(t, e, r) {
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
var Ge = Yr(function(t) {
  return function(e) {
    t(this), this.message = e ? e.length + ` errors occurred during unsubscription:
` + e.map(function(r, n) {
      return n + 1 + ") " + r.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = e;
  };
});
function wr(t, e) {
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
          i = v instanceof Ge ? v.errors : [v];
        }
      var d = this._finalizers;
      if (d) {
        this._finalizers = null;
        try {
          for (var h = yr(d), p = h.next(); !p.done; p = h.next()) {
            var g = p.value;
            try {
              Zn(g);
            } catch (v) {
              i = i ?? [], v instanceof Ge ? i = Or(Or([], br(i)), br(v.errors)) : i.push(v);
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
    r === e ? this._parentage = null : Array.isArray(r) && wr(r, e);
  }, t.prototype.remove = function(e) {
    var r = this._finalizers;
    r && wr(r, e), e instanceof t && e._removeParent(this);
  }, t.EMPTY = function() {
    var e = new t();
    return e.closed = !0, e;
  }(), t;
}(), li = Le.EMPTY;
function fi(t) {
  return t instanceof Le || t && "closed" in t && Ot(t.remove) && Ot(t.add) && Ot(t.unsubscribe);
}
function Zn(t) {
  Ot(t) ? t() : t.unsubscribe();
}
var pi = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1
}, fp = {
  setTimeout: function(t, e) {
    for (var r = [], n = 2; n < arguments.length; n++)
      r[n - 2] = arguments[n];
    return setTimeout.apply(void 0, Or([t, e], br(r)));
  },
  clearTimeout: function(t) {
    return clearTimeout(t);
  },
  delegate: void 0
};
function pp(t) {
  fp.setTimeout(function() {
    throw t;
  });
}
function Qn() {
}
function ge(t) {
  t();
}
var hi = function(t) {
  Ue(e, t);
  function e(r) {
    var n = t.call(this) || this;
    return n.isStopped = !1, r ? (n.destination = r, fi(r) && r.add(n)) : n.destination = mp, n;
  }
  return e.create = function(r, n, o) {
    return new _r(r, n, o);
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
}(Le), hp = Function.prototype.bind;
function Xe(t, e) {
  return hp.call(t, e);
}
var dp = function() {
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
}(), _r = function(t) {
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
      i && pi.useDeprecatedNextContext ? (u = Object.create(r), u.unsubscribe = function() {
        return i.unsubscribe();
      }, a = {
        next: r.next && Xe(r.next, u),
        error: r.error && Xe(r.error, u),
        complete: r.complete && Xe(r.complete, u)
      }) : a = r;
    }
    return i.destination = new dp(a), i;
  }
  return e;
}(hi);
function fe(t) {
  pp(t);
}
function vp(t) {
  throw t;
}
var mp = {
  closed: !0,
  next: Qn,
  error: vp,
  complete: Qn
}, gp = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function yp(t) {
  return t;
}
function bp(t) {
  return t.length === 0 ? yp : t.length === 1 ? t[0] : function(e) {
    return t.reduce(function(r, n) {
      return n(r);
    }, e);
  };
}
var Er = function() {
  function t(e) {
    e && (this._subscribe = e);
  }
  return t.prototype.lift = function(e) {
    var r = new t();
    return r.source = this, r.operator = e, r;
  }, t.prototype.subscribe = function(e, r, n) {
    var o = this, i = wp(e) ? e : new _r(e, r, n);
    return ge(function() {
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
      var a = new _r({
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
  }, t.prototype[gp] = function() {
    return this;
  }, t.prototype.pipe = function() {
    for (var e = [], r = 0; r < arguments.length; r++)
      e[r] = arguments[r];
    return bp(e)(this);
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
  return (e = t ?? pi.Promise) !== null && e !== void 0 ? e : Promise;
}
function Op(t) {
  return t && Ot(t.next) && Ot(t.error) && Ot(t.complete);
}
function wp(t) {
  return t && t instanceof hi || Op(t) && fi(t);
}
var _p = Yr(function(t) {
  return function() {
    t(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), Ep = function(t) {
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
      throw new _p();
  }, e.prototype.next = function(r) {
    var n = this;
    ge(function() {
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
    ge(function() {
      if (n._throwIfClosed(), !n.isStopped) {
        n.hasError = n.isStopped = !0, n.thrownError = r;
        for (var o = n.observers; o.length; )
          o.shift().error(r);
      }
    });
  }, e.prototype.complete = function() {
    var r = this;
    ge(function() {
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
    return i || a ? li : (this.currentObservers = null, u.push(r), new Le(function() {
      n.currentObservers = null, wr(u, r);
    }));
  }, e.prototype._checkFinalizedStatuses = function(r) {
    var n = this, o = n.hasError, i = n.thrownError, a = n.isStopped;
    o ? r.error(i) : a && r.complete();
  }, e.prototype.asObservable = function() {
    var r = new Er();
    return r.source = this, r;
  }, e.create = function(r, n) {
    return new eo(r, n);
  }, e;
}(Er), eo = function(t) {
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
    return (o = (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(r)) !== null && o !== void 0 ? o : li;
  }, e;
}(Ep);
Yr(function(t) {
  return function() {
    t(this), this.name = "EmptyError", this.message = "no elements in sequence";
  };
});
class Kr {
  constructor(e) {
    et(this, "config"), et(this, "axios"), e && (this.config = e), this.axios = lp.create(this.config);
  }
  get interceptors() {
    return this.axios.interceptors;
  }
  static create(e) {
    return new Kr(e);
  }
  request(e) {
    return new Er((r) => {
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
function Sp(t) {
  return Kr.create({
    baseURL: t
  });
}
const Q = class {
  constructor(t, e) {
    et(this, "axiosInstance"), et(this, "defaultConfig", {
      contentType: "json",
      cache: !1
    }), et(this, "tokenType"), this.axiosInstance = Sp(t), this.setupInterceptor(), e && (this.defaultConfig = {
      ...this.defaultConfig,
      ...e
    });
  }
  static setAuthorizationTokenType(t) {
    Q.tokenType = t;
  }
  static setGlobalParams(t) {
    Q.globalParams = {
      ...Q.globalParams,
      ...t
    };
  }
  static setGlobalData(t) {
    Q.globalData = {
      ...Q.globalData,
      ...t
    };
  }
  static setGlobalHeaders(t) {
    Q.globalHeaders = {
      ...Q.globalHeaders,
      ...t
    };
  }
  static addInterceptor(t) {
    return Q.interceptors.add(t), () => {
      Q.removeInterceptor(t);
    };
  }
  static removeInterceptor(t) {
    Q.interceptors.delete(t);
  }
  setAuthorizationTokenType(t) {
    this.tokenType = t;
  }
  getTokenType(t) {
    return t.tokenType !== void 0 ? t.tokenType : this.tokenType !== void 0 ? this.tokenType : Q.tokenType;
  }
  setupInterceptor() {
    this.axiosInstance.interceptors.request.use(
      async (t) => {
        if (t = await this.useRequestInterceptors(t), t = Ul({}, this.defaultConfig, t), t.headers = {
          ...t.headers,
          ...Q.globalHeaders,
          "Content-Type": t.contentType === "formData" ? !1 : t.contentType === "urlEncoded" ? ur.UrlEncoded : ur.Json
        }, !t.preparedData) {
          if ((typeof t.cache < "u" ? t.cache : this.defaultConfig.cache) === !1 && (t.headers["Cache-Control"] = "no-cache", t.params = {
            ...t.params,
            axios_timestamp: Date.now()
          }), t.params = Ee(
            Fn({
              ...t.params,
              ...Q.globalParams
            })
          ), t.data = {
            ...t.data,
            ...Q.globalData
          }, Fn(t.data), JSON.stringify(t.data) === "{}")
            t.data = void 0;
          else
            switch (t.contentType) {
              case "formData":
                t.data = pr(t.data);
                break;
              case "urlEncoded":
                t.data = Ee(t.data);
            }
          t.preparedData = !0;
        }
        const e = this.getTokenType(t), r = e ? Wl.getToken(e) : null;
        return r && (t.headers.Authorization = "Bearer " + r), t;
      },
      (t) => {
        console.log(t);
      }
    ), this.axiosInstance.interceptors.response.use(
      (t) => this.useSuccessResponseInterceptor(t),
      async (t) => {
        const e = await this.useErrorResponseInterceptor(t);
        return e instanceof Error ? Promise.reject(e) : e;
      }
    );
  }
  async useRequestInterceptors(t) {
    for (const e of Q.interceptors)
      e.request && (t = await e.request(t));
    return t;
  }
  async useErrorResponseInterceptor(t) {
    for (const e of Q.interceptors)
      if (e.response && e.response.error)
        try {
          t = await e.response.error(t, this.axiosInstance);
        } catch {
          return t;
        }
    return t;
  }
  async useSuccessResponseInterceptor(t) {
    for (const e of Q.interceptors)
      e.response && e.response.success && (t = await e.response.success(t));
    return t;
  }
  request(t) {
    return this.axiosInstance.request(t);
  }
  post(t, e, r) {
    return this.axiosInstance.post(t, e, r);
  }
  put(t, e, r) {
    return this.axiosInstance.put(t, e, r);
  }
  patch(t, e, r) {
    return this.axiosInstance.patch(t, e, r);
  }
  get(t, e, r) {
    return this.axiosInstance.get(t, {
      ...r,
      params: e
    });
  }
  delete(t, e, r) {
    return this.axiosInstance.delete(t, {
      ...r,
      params: e
    });
  }
};
let Mt = Q;
et(Mt, "tokenType", "base_token"), et(Mt, "globalParams", {}), et(Mt, "globalData", {}), et(Mt, "globalHeaders", {}), et(Mt, "interceptors", /* @__PURE__ */ new Set());
var Zt = {}, jp = {
  get exports() {
    return Zt;
  },
  set exports(t) {
    Zt = t;
  }
}, It = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Ze, ro;
function di() {
  if (ro)
    return Ze;
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
  return Ze = o() ? Object.assign : function(i, a) {
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
  }, Ze;
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
function xp() {
  if (no)
    return It;
  no = 1, di();
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
function Rp() {
  return io || (io = 1, function(t) {
    process.env.NODE_ENV !== "production" && function() {
      var e = Qt, r = di(), n = 60103, o = 60106;
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
      function ae(c, y, w) {
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
              return ae(c, c.render, "ForwardRef");
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
      var b = 0, T, _, $, D, z, K, q;
      function X() {
      }
      X.__reactDisabledLog = !0;
      function ft() {
        {
          if (b === 0) {
            T = console.log, _ = console.info, $ = console.warn, D = console.error, z = console.group, K = console.groupCollapsed, q = console.groupEnd;
            var c = {
              configurable: !0,
              enumerable: !0,
              value: X,
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
                value: T
              }),
              info: r({}, c, {
                value: _
              }),
              warn: r({}, c, {
                value: $
              }),
              error: r({}, c, {
                value: D
              }),
              group: r({}, c, {
                value: z
              }),
              groupCollapsed: r({}, c, {
                value: K
              }),
              groupEnd: r({}, c, {
                value: q
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
      var Z = !1, ot;
      {
        var Ht = typeof WeakMap == "function" ? WeakMap : Map;
        ot = new Ht();
      }
      function Tt(c, y) {
        if (!c || Z)
          return "";
        {
          var w = ot.get(c);
          if (w !== void 0)
            return w;
        }
        var x;
        Z = !0;
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
`), J = L.length - 1, G = rt.length - 1; J >= 1 && G >= 0 && L[J] !== rt[G]; )
              G--;
            for (; J >= 1 && G >= 0; J--, G--)
              if (L[J] !== rt[G]) {
                if (J !== 1 || G !== 1)
                  do
                    if (J--, G--, G < 0 || L[J] !== rt[G]) {
                      var gt = `
` + L[J].replace(" at new ", " at ");
                      return typeof c == "function" && ot.set(c, gt), gt;
                    }
                  while (J >= 1 && G >= 0);
                break;
              }
          }
        } finally {
          Z = !1, vt.current = B, ut(), Error.prepareStackTrace = H;
        }
        var Lt = c ? c.displayName || c.name : "", sn = Lt ? ct(Lt) : "";
        return typeof c == "function" && ot.set(c, sn), sn;
      }
      function Jr(c, y, w) {
        return Tt(c, !1);
      }
      function mi(c) {
        var y = c.prototype;
        return !!(y && y.isReactComponent);
      }
      function se(c, y, w) {
        if (c == null)
          return "";
        if (typeof c == "function")
          return Tt(c, mi(c));
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
              return se(c.type, y, w);
            case g:
              return Jr(c._render);
            case p: {
              var x = c, H = x._payload, B = x._init;
              try {
                return se(B(H), y, w);
              } catch {
              }
            }
          }
        return "";
      }
      var Gr = {}, Xr = W.ReactDebugCurrentFrame;
      function ue(c) {
        if (c) {
          var y = c._owner, w = se(c.type, c._source, y ? y.type : null);
          Xr.setExtraStackFrame(w);
        } else
          Xr.setExtraStackFrame(null);
      }
      function gi(c, y, w, x, H) {
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
              } catch (J) {
                L = J;
              }
              L && !(L instanceof Error) && (ue(H), M("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", x || "React class", w, V, typeof L), ue(null)), L instanceof Error && !(L.message in Gr) && (Gr[L.message] = !0, ue(H), M("Failed %s type: %s", w, L.message), ue(null));
            }
        }
      }
      var Bt = W.ReactCurrentOwner, Ie = Object.prototype.hasOwnProperty, yi = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, Zr, Qr, Me;
      Me = {};
      function bi(c) {
        if (Ie.call(c, "ref")) {
          var y = Object.getOwnPropertyDescriptor(c, "ref").get;
          if (y && y.isReactWarning)
            return !1;
        }
        return c.ref !== void 0;
      }
      function Oi(c) {
        if (Ie.call(c, "key")) {
          var y = Object.getOwnPropertyDescriptor(c, "key").get;
          if (y && y.isReactWarning)
            return !1;
        }
        return c.key !== void 0;
      }
      function wi(c, y) {
        if (typeof c.ref == "string" && Bt.current && y && Bt.current.stateNode !== y) {
          var w = O(Bt.current.type);
          Me[w] || (M('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', O(Bt.current.type), c.ref), Me[w] = !0);
        }
      }
      function _i(c, y) {
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
      function Ei(c, y) {
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
      var Si = function(c, y, w, x, H, B, V) {
        var L = {
          $$typeof: n,
          type: c,
          key: y,
          ref: w,
          props: V,
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
      function ji(c, y, w, x, H) {
        {
          var B, V = {}, L = null, rt = null;
          w !== void 0 && (L = "" + w), Oi(y) && (L = "" + y.key), bi(y) && (rt = y.ref, wi(y, H));
          for (B in y)
            Ie.call(y, B) && !yi.hasOwnProperty(B) && (V[B] = y[B]);
          if (c && c.defaultProps) {
            var J = c.defaultProps;
            for (B in J)
              V[B] === void 0 && (V[B] = J[B]);
          }
          if (L || rt) {
            var G = typeof c == "function" ? c.displayName || c.name || "Unknown" : c;
            L && _i(V, G), rt && Ei(V, G);
          }
          return Si(c, L, rt, H, x, Bt.current, V);
        }
      }
      var Fe = W.ReactCurrentOwner, tn = W.ReactDebugCurrentFrame;
      function Ut(c) {
        if (c) {
          var y = c._owner, w = se(c.type, c._source, y ? y.type : null);
          tn.setExtraStackFrame(w);
        } else
          tn.setExtraStackFrame(null);
      }
      var ze;
      ze = !1;
      function Ve(c) {
        return typeof c == "object" && c !== null && c.$$typeof === n;
      }
      function en() {
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
      function xi(c) {
        {
          if (c !== void 0) {
            var y = c.fileName.replace(/^.*[\\\/]/, ""), w = c.lineNumber;
            return `

Check your code at ` + y + ":" + w + ".";
          }
          return "";
        }
      }
      var rn = {};
      function Ri(c) {
        {
          var y = en();
          if (!y) {
            var w = typeof c == "string" ? c : c.displayName || c.name;
            w && (y = `

Check the top-level render call using <` + w + ">.");
          }
          return y;
        }
      }
      function nn(c, y) {
        {
          if (!c._store || c._store.validated || c.key != null)
            return;
          c._store.validated = !0;
          var w = Ri(y);
          if (rn[w])
            return;
          rn[w] = !0;
          var x = "";
          c && c._owner && c._owner !== Fe.current && (x = " It was passed a child from " + O(c._owner.type) + "."), Ut(c), M('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', w, x), Ut(null);
        }
      }
      function on(c, y) {
        {
          if (typeof c != "object")
            return;
          if (Array.isArray(c))
            for (var w = 0; w < c.length; w++) {
              var x = c[w];
              Ve(x) && nn(x, y);
            }
          else if (Ve(c))
            c._store && (c._store.validated = !0);
          else if (c) {
            var H = I(c);
            if (typeof H == "function" && H !== c.entries)
              for (var B = H.call(c), V; !(V = B.next()).done; )
                Ve(V.value) && nn(V.value, y);
          }
        }
      }
      function Ti(c) {
        {
          var y = c.type;
          if (y == null || typeof y == "string")
            return;
          var w;
          if (typeof y == "function")
            w = y.propTypes;
          else if (typeof y == "object" && (y.$$typeof === l || y.$$typeof === h))
            w = y.propTypes;
          else
            return;
          if (w) {
            var x = O(y);
            gi(w, c.props, "prop", x, c);
          } else if (y.PropTypes !== void 0 && !ze) {
            ze = !0;
            var H = O(y);
            M("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", H || "Unknown");
          }
          typeof y.getDefaultProps == "function" && !y.getDefaultProps.isReactClassApproved && M("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Di(c) {
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
      function an(c, y, w, x, H, B) {
        {
          var V = st(c);
          if (!V) {
            var L = "";
            (c === void 0 || typeof c == "object" && c !== null && Object.keys(c).length === 0) && (L += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var rt = xi(H);
            rt ? L += rt : L += en();
            var J;
            c === null ? J = "null" : Array.isArray(c) ? J = "array" : c !== void 0 && c.$$typeof === n ? (J = "<" + (O(c.type) || "Unknown") + " />", L = " Did you accidentally export a JSX literal instead of a component?") : J = typeof c, M("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", J, L);
          }
          var G = ji(c, y, w, H, B);
          if (G == null)
            return G;
          if (V) {
            var gt = y.children;
            if (gt !== void 0)
              if (x)
                if (Array.isArray(gt)) {
                  for (var Lt = 0; Lt < gt.length; Lt++)
                    on(gt[Lt], c);
                  Object.freeze && Object.freeze(gt);
                } else
                  M("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
              else
                on(gt, c);
          }
          return c === t.Fragment ? Di(G) : Ti(G), G;
        }
      }
      function $i(c, y, w) {
        return an(c, y, w, !0);
      }
      function Ai(c, y, w) {
        return an(c, y, w, !1);
      }
      var Ni = Ai, Ci = $i;
      t.jsx = Ni, t.jsxs = Ci;
    }();
  }(oo)), oo;
}
(function(t) {
  process.env.NODE_ENV === "production" ? t.exports = xp() : t.exports = Rp();
})(jp);
const vi = Zt.Fragment, ye = Zt.jsx;
Zt.jsxs;
var ao = {}, Tp = {
  get exports() {
    return ao;
  },
  set exports(t) {
    ao = t;
  }
}, Qe = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var so;
function Dp() {
  if (so)
    return Qe;
  so = 1;
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
  return Qe.useSyncExternalStore = t.useSyncExternalStore !== void 0 ? t.useSyncExternalStore : f, Qe;
}
var uo = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var co;
function $p() {
  return co || (co = 1, process.env.NODE_ENV !== "production" && function() {
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
    uo.useSyncExternalStore = N, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), uo;
}
(function(t) {
  process.env.NODE_ENV === "production" ? t.exports = Dp() : t.exports = $p();
})(Tp);
const Ap = () => !0;
class Np extends Hl {
  constructor() {
    super(...arguments), et(this, "middlewareHandler", Ap), et(this, "_routes", []);
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
    const r = Vl([...e, ...this._routes], "path");
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
new Np();
lo(
  void 0
);
lo(void 0);
const Cp = Qt.createContext(void 0), Pp = (t) => {
  const e = Pi(Cp);
  if (!e)
    throw new Error("useAuthorization must be used in AuthorizationProvider");
  return {
    granted: ki(() => t ? e.can(t) : !0, [t, e.can]),
    ...e
  };
};
fo(
  ({ permissions: t, children: e, guestView: r }) => {
    const { granted: n } = Pp(t);
    return typeof e == "function" ? e(n) : /* @__PURE__ */ ye(vi, { children: n ? e : r });
  }
);
function it(t, e) {
  return () => {
    const r = new Mt(t().baseURL, t());
    return Pl(e, (n) => (...o) => n(r, ...o));
  };
}
const kp = ({
  route: { component: t, ...e }
}) => {
  var r;
  return /* @__PURE__ */ ye(vi, { children: (r = e.routes) != null && r.length && !e.element && !t ? /* @__PURE__ */ ye(Gi, {}) : e.element || (t ? /* @__PURE__ */ ye(t, {}) : null) });
};
fo(kp);
class Up {
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
const at = new Up(), Zp = it(
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
var Lp = /* @__PURE__ */ ((t) => (t.INVITATION_EXISTS = "INVITATION_EXISTS", t.USER_IS_EXISTS = "USER_IS_EXISTS", t))(Lp || {}), Ip = /* @__PURE__ */ ((t) => (t.TOKEN_VALID = "TOKEN_VALID", t.TOKEN_INVALID = "TOKEN_INVALID", t.INVITATION_NOT_EXISTS = "INVITATION_NOT_EXISTS", t.USER_ACTIVE = "USER_ACTIVE", t))(Ip || {});
const Qp = it(
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
var Mp = /* @__PURE__ */ ((t) => (t.Full = "24/7", t.Custom = "CUSTOM", t))(Mp || {}), Fp = /* @__PURE__ */ ((t) => (t.Monday = "MONDAY", t.Tuesday = "TUESDAY", t.Wednesday = "WEDNESDAY", t.Thursday = "THURSDAY", t.Friday = "FRIDAY", t.Saturday = "SATURDAY", t.Sunday = "SUNDAY", t))(Fp || {});
const th = it(
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
var zp = /* @__PURE__ */ ((t) => (t.Plain = "Plain", t.Login = "Login", t.MD5 = "CRAM - MD5", t))(zp || {}), Vp = /* @__PURE__ */ ((t) => (t.Both = "both", t.Incoming = "incoming", t.Outgoing = "outgoing", t))(Vp || {}), Hp = /* @__PURE__ */ ((t) => (t.CUSTOM = "CUSTOM", t.MOOSEDESK = "MOOSEDESK", t.FORWARD = "FORWARD", t))(Hp || {}), Bp = /* @__PURE__ */ ((t) => (t.XS = "xs", t.SM = "sm", t.MD = "md", t.LG = "lg", t.XL = "xl", t.XXL = "xxl", t))(Bp || {}), Wp = /* @__PURE__ */ ((t) => (t.GMAIL = "GMAIL", t.OUTLOOK = "OUTLOOK", t.OTHER = "OTHER", t.MOOSEDESK = "MOOSEDESK", t))(Wp || {});
const eh = it(
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
), rh = it(
  () => ({
    baseURL: `${at.getApiUrl()}/api/v1/general/info`
  }),
  {
    get(t, e) {
      return t.get("", e);
    }
  }
), nh = it(
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
), oh = it(
  () => ({
    baseURL: `${at.getApiUrl()}/api/v1/general/info`
  }),
  {
    getStore(t, e) {
      return t.get("", e);
    }
  }
), ih = it(
  () => ({
    baseURL: `${at.getApiUrl()}/api/v1/tour-guide`
  }),
  {
    updateTourGuide(t, e) {
      return t.post("", e);
    }
  }
), ah = it(
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
var qp = /* @__PURE__ */ ((t) => (t.URGENT = "URGENT", t.HIGH = "HIGH", t.MEDIUM = "MEDIUM", t.LOW = "LOW", t))(qp || {}), Yp = /* @__PURE__ */ ((t) => (t.PENDING = "PENDING", t.OPEN = "OPEN", t.RESOLVED = "RESOLVED", t.NEW = "NEW", t))(Yp || {});
const sh = [
  {
    label: "Pending",
    value: "PENDING"
  },
  {
    label: "Open",
    value: "OPEN"
  },
  {
    label: "Resolved",
    value: "RESOLVED"
  }
], uh = [
  {
    label: "Urgent",
    value: "URGENT"
  },
  {
    label: "High",
    value: "HIGH"
  },
  {
    label: "Medium",
    value: "MEDIUM"
  },
  {
    label: "Low",
    value: "LOW"
  }
], ch = it(
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
var Kp = /* @__PURE__ */ ((t) => (t.READ_PRODUCTS = "read_products", t))(Kp || {}), Jp = /* @__PURE__ */ ((t) => (t.Admin = "Admin", t.BasicAgent = "BasicAgent", t.AgentLeader = "AgentLeader", t))(Jp || {});
const lh = it(
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
var Gp = /* @__PURE__ */ ((t) => (t.Disabled = "Disabled", t.Email = "Email", t.Authenticator = "Authenticator", t))(Gp || {});
const fh = it(
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
), ph = it(
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
  Vp as AccessType,
  Zp as AccountRepository,
  Qp as AgentRepository,
  zp as AuthenticationSMTP,
  Mp as BusinessHoursType,
  th as CustomerRepository,
  Fp as Day,
  eh as EmailIntegrationRepository,
  at as Env,
  Lp as ErrorCodeCreate,
  rh as GlobalRepository,
  nh as HelpWidgetRepository,
  Wp as MailBoxType,
  Hp as MailSettingType,
  ph as MerchantRepository,
  Gp as MethodOTP,
  Kp as PermissionScopesShopify,
  qp as Priority,
  Jp as Role,
  Bp as ScreenType,
  Yp as StatusTicket,
  oh as StoreRepository,
  ah as TagRepository,
  ch as TicketRepository,
  ih as TourGuideRepository,
  Ip as TypeCheckTokenNewAgent,
  lh as UserGroupRepository,
  fh as UserSettingRepository,
  uh as priorityOptions,
  sh as statusOptions
};

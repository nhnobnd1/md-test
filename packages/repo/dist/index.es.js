import * as D from "react";
import Qt, { createContext as so, memo as uo, useContext as Ti, useMemo as Di } from "react";
var Ni = Object.defineProperty, Ci = (t, e, r) => e in t ? Ni(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, rt = (t, e, r) => (Ci(t, typeof e != "symbol" ? e + "" : e, r), r);
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
function Qe() {
  return Qe = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
    }
    return t;
  }, Qe.apply(this, arguments);
}
var rn;
(function(t) {
  t.Pop = "POP", t.Push = "PUSH", t.Replace = "REPLACE";
})(rn || (rn = {}));
function nt(t, e) {
  if (t === !1 || t === null || typeof t > "u")
    throw new Error(e);
}
function tr(t) {
  let {
    pathname: e = "/",
    search: r = "",
    hash: n = ""
  } = t;
  return r && r !== "?" && (e += r.charAt(0) === "?" ? r : "?" + r), n && n !== "#" && (e += n.charAt(0) === "#" ? n : "#" + n), e;
}
function co(t) {
  let e = {};
  if (t) {
    let r = t.indexOf("#");
    r >= 0 && (e.hash = t.substr(r), t = t.substr(0, r));
    let n = t.indexOf("?");
    n >= 0 && (e.search = t.substr(n), t = t.substr(0, n)), t && (e.pathname = t);
  }
  return e;
}
var nn;
(function(t) {
  t.data = "data", t.deferred = "deferred", t.redirect = "redirect", t.error = "error";
})(nn || (nn = {}));
function Pi(t, e) {
  if (!t) {
    typeof console < "u" && console.warn(e);
    try {
      throw new Error(e);
    } catch {
    }
  }
}
function $i(t, e) {
  e === void 0 && (e = "/");
  let {
    pathname: r,
    search: n = "",
    hash: o = ""
  } = typeof t == "string" ? co(t) : t;
  return {
    pathname: r ? r.startsWith("/") ? r : Li(r, e) : e,
    search: Ui(n),
    hash: ki(o)
  };
}
function Li(t, e) {
  let r = e.replace(/\/+$/, "").split("/");
  return t.split("/").forEach((n) => {
    n === ".." ? r.length > 1 && r.pop() : n !== "." && r.push(n);
  }), r.length > 1 ? r.join("/") : "/";
}
function Ve(t, e, r, n) {
  return "Cannot include a '" + t + "' character in a manually specified " + ("`to." + e + "` field [" + JSON.stringify(n) + "].  Please separate it out to the ") + ("`to." + r + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function lo(t) {
  return t.filter((e, r) => r === 0 || e.route.path && e.route.path.length > 0);
}
function fo(t, e, r, n) {
  n === void 0 && (n = !1);
  let o;
  typeof t == "string" ? o = co(t) : (o = Qe({}, t), nt(!o.pathname || !o.pathname.includes("?"), Ve("?", "pathname", "search", o)), nt(!o.pathname || !o.pathname.includes("#"), Ve("#", "pathname", "hash", o)), nt(!o.search || !o.search.includes("#"), Ve("#", "search", "hash", o)));
  let i = t === "" || o.pathname === "", s = i ? "/" : o.pathname, c;
  if (n || s == null)
    c = r;
  else {
    let p = e.length - 1;
    if (a.startsWith("..")) {
      let v = a.split("/");
      for (; v[0] === ".."; )
        v.shift(), p -= 1;
      o.pathname = v.join("/");
    }
    c = p >= 0 ? e[p] : "/";
  }
  let a = $i(o, c), l = s && s !== "/" && s.endsWith("/"), f = (i || s === ".") && r.endsWith("/");
  return !a.pathname.endsWith("/") && (l || f) && (a.pathname += "/"), a;
}
const Or = (t) => t.join("/").replace(/\/\/+/g, "/"), Ui = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, ki = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t;
"useSyncExternalStore" in N && ((t) => t.useSyncExternalStore)(N);
const Ii = /* @__PURE__ */ N.createContext(null);
process.env.NODE_ENV !== "production" && (Ii.displayName = "DataStaticRouterContext");
const po = /* @__PURE__ */ D.createContext(null);
process.env.NODE_ENV !== "production" && (po.displayName = "DataRouter");
const ho = /* @__PURE__ */ D.createContext(null);
process.env.NODE_ENV !== "production" && (ho.displayName = "DataRouterState");
const Fi = /* @__PURE__ */ D.createContext(null);
process.env.NODE_ENV !== "production" && (Fi.displayName = "Await");
const te = /* @__PURE__ */ D.createContext(null);
process.env.NODE_ENV !== "production" && (te.displayName = "Navigation");
const wr = /* @__PURE__ */ N.createContext(null);
process.env.NODE_ENV !== "production" && (wr.displayName = "Location");
const ee = /* @__PURE__ */ N.createContext({
  outlet: null,
  matches: []
});
process.env.NODE_ENV !== "production" && (ee.displayName = "Route");
const Mi = /* @__PURE__ */ D.createContext(null);
process.env.NODE_ENV !== "production" && (Mi.displayName = "RouteError");
function zi(t, e) {
  let {
    relative: r
  } = e === void 0 ? {} : e;
  Or() || (process.env.NODE_ENV !== "production" ? nt(
    !1,
    "useHref() may be used only in the context of a <Router> component."
  ) : nt(!1));
  let {
    basename: n,
    navigator: o
  } = D.useContext(te), {
    hash: i,
    pathname: a,
    search: c
  } = Se(t, {
    relative: r
  }), a = s;
  return n !== "/" && (a = s === "/" ? n : Or([n, s])), o.createHref({
    pathname: a,
    search: c,
    hash: i
  });
}
function _r() {
  return N.useContext(wr) != null;
}
function re() {
  return Or() || (process.env.NODE_ENV !== "production" ? nt(
    !1,
    "useLocation() may be used only in the context of a <Router> component."
  ) : nt(!1)), N.useContext(wr).location;
}
function Vi() {
  _r() || (process.env.NODE_ENV !== "production" ? nt(
    !1,
    "useNavigate() may be used only in the context of a <Router> component."
  ) : nt(!1));
  let {
    basename: t,
    navigator: e
  } = D.useContext(te), {
    matches: r
  } = D.useContext(ee), {
    pathname: n
  } = re(), o = JSON.stringify(lo(r).map((a) => a.pathnameBase)), i = D.useRef(!1);
  return D.useEffect(() => {
    i.current = !0;
  }), D.useCallback(function(a, c) {
    if (c === void 0 && (c = {}), process.env.NODE_ENV !== "production" && Pi(i.current, "You should call navigate() in a React.useEffect(), not when your component is first rendered."), !i.current)
      return;
    if (typeof a == "number") {
      e.go(a);
      return;
    }
    let a = fo(s, JSON.parse(o), n, c.relative === "path");
    t !== "/" && (a.pathname = a.pathname === "/" ? t : Or([t, a.pathname])), (c.replace ? e.replace : e.push)(a, c.state, c);
  }, [t, e, o, n]);
}
const zi = /* @__PURE__ */ N.createContext(null);
function Hi(t) {
  let e = N.useContext(ee).outlet;
  return e && /* @__PURE__ */ N.createElement(zi.Provider, {
    value: t
  }, e);
}
function Se(t, e) {
  let {
    relative: r
  } = e === void 0 ? {} : e, {
    matches: n
  } = D.useContext(ee), {
    pathname: o
  } = re(), i = JSON.stringify(lo(n).map((a) => a.pathnameBase));
  return D.useMemo(() => fo(t, JSON.parse(i), o, r === "path"), [t, i, o, r]);
}
var on;
(function(t) {
  t.UseRevalidator = "useRevalidator";
})(on || (on = {}));
var sn;
(function(t) {
  t.UseLoaderData = "useLoaderData", t.UseActionData = "useActionData", t.UseRouteError = "useRouteError", t.UseNavigation = "useNavigation", t.UseRouteLoaderData = "useRouteLoaderData", t.UseMatches = "useMatches", t.UseRevalidator = "useRevalidator";
})(sn || (sn = {}));
function Wi(t) {
  return Hi(t.context);
}
var an;
(function(t) {
  t.UseLoaderData = "useLoaderData", t.UseActionData = "useActionData", t.UseRouteError = "useRouteError", t.UseNavigation = "useNavigation", t.UseRouteLoaderData = "useRouteLoaderData", t.UseMatches = "useMatches", t.UseRevalidator = "useRevalidator";
})(an || (an = {}));
function Wi(t) {
  return Hi(t.context);
}
var sn;
(function(t) {
  t[t.pending = 0] = "pending", t[t.success = 1] = "success", t[t.error = 2] = "error";
})(sn || (sn = {}));
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
function Dt() {
  return Dt = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
    }
    return t;
  }, Dt.apply(this, arguments);
}
function Er(t, e) {
  if (t == null)
    return {};
  var r = {}, n = Object.keys(t), o, i;
  for (i = 0; i < n.length; i++)
    o = n[i], !(e.indexOf(o) >= 0) && (r[o] = t[o]);
  return r;
}
const fe = "get", ze = "application/x-www-form-urlencoded";
function je(t) {
  return t != null && typeof t.tagName == "string";
}
function qi(t) {
  return je(t) && t.tagName.toLowerCase() === "button";
}
function Ji(t) {
  return je(t) && t.tagName.toLowerCase() === "form";
}
function Yi(t) {
  return je(t) && t.tagName.toLowerCase() === "input";
}
function Ki(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function Gi(t, e) {
  return t.button === 0 && (!e || e === "_self") && !Ki(t);
}
function Xi(t, e, r) {
  let n, o, i, a;
  if (Ji(t)) {
    let l = r.submissionTrigger;
    n = r.method || t.getAttribute("method") || fe, o = r.action || t.getAttribute("action") || e, i = r.encType || t.getAttribute("enctype") || ze, s = new FormData(t), l && l.name && s.append(l.name, l.value);
  } else if (qi(t) || Ji(t) && (t.type === "submit" || t.type === "image")) {
    let l = t.form;
    if (l == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    n = r.method || t.getAttribute("formmethod") || l.getAttribute("method") || fe, o = r.action || t.getAttribute("formaction") || l.getAttribute("action") || e, i = r.encType || t.getAttribute("formenctype") || l.getAttribute("enctype") || ze, s = new FormData(l), t.name && s.append(t.name, t.value);
  } else {
    if (je(t))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    if (n = r.method || fe, o = r.action || e, i = r.encType || ze, t instanceof FormData)
      s = t;
    else if (s = new FormData(), t instanceof URLSearchParams)
      for (let [l, f] of t)
        a.append(l, f);
    else if (t != null)
      for (let l of Object.keys(t))
        a.append(l, t[l]);
  }
  let {
    protocol: c,
    host: s
  } = window.location;
  return {
    url: new URL(o, c + "//" + s),
    method: n.toLowerCase(),
    encType: i,
    formData: a
  };
}
const Zi = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset"], Qi = ["aria-current", "caseSensitive", "className", "end", "style", "to", "children"], ta = ["reloadDocument", "replace", "method", "action", "onSubmit", "fetcherKey", "routeId", "relative"];
process.env.NODE_ENV;
const vo = /* @__PURE__ */ D.forwardRef(function(t, e) {
  let {
    onClick: r,
    relative: n,
    reloadDocument: o,
    replace: i,
    state: a,
    target: c,
    to: s,
    preventScrollReset: l
  } = t, f = Er(t, Zi), p = zi(s, {
    relative: n
  }), v = ia(s, {
    replace: i,
    state: a,
    target: c,
    preventScrollReset: l,
    relative: n
  });
  function d(b) {
    r && r(b), b.defaultPrevented || v(b);
  }
  return /* @__PURE__ */ D.createElement("a", Dt({}, f, {
    href: p,
    onClick: o ? r : d,
    ref: e,
    target: c
  }));
});
process.env.NODE_ENV !== "production" && (vo.displayName = "Link");
const ea = /* @__PURE__ */ D.forwardRef(function(t, e) {
  let {
    "aria-current": r = "page",
    caseSensitive: n = !1,
    className: o = "",
    end: i = !1,
    style: a,
    to: c,
    children: s
  } = t, l = Er(t, Qi), f = Se(c, {
    relative: l.relative
  }), p = re(), v = D.useContext(ho), {
    navigator: d
  } = D.useContext(te), b = d.encodeLocation ? d.encodeLocation(f).pathname : f.pathname, O = p.pathname, T = v && v.navigation && v.navigation.location ? v.navigation.location.pathname : null;
  n || (O = O.toLowerCase(), T = T ? T.toLowerCase() : null, b = b.toLowerCase());
  let M = O === b || !i && O.startsWith(b) && O.charAt(b.length) === "/", J = T != null && (T === b || !i && T.startsWith(b) && T.charAt(b.length) === "/"), E = M ? r : void 0, N;
  typeof o == "function" ? N = o({
    isActive: M,
    isPending: J
  }) : N = [o, M ? "active" : null, J ? "pending" : null].filter(Boolean).join(" ");
  let z = typeof a == "function" ? a({
    isActive: M,
    isPending: J
  }) : a;
  return /* @__PURE__ */ D.createElement(vo, Dt({}, l, {
    "aria-current": E,
    className: N,
    ref: e,
    style: z,
    to: c
  }), typeof s == "function" ? s({
    isActive: M,
    isPending: J
  }) : s);
});
process.env.NODE_ENV !== "production" && (ea.displayName = "NavLink");
const ra = /* @__PURE__ */ D.forwardRef((t, e) => /* @__PURE__ */ D.createElement(yo, Dt({}, t, {
  ref: e
})));
process.env.NODE_ENV !== "production" && (ra.displayName = "Form");
const yo = /* @__PURE__ */ D.forwardRef((t, e) => {
  let {
    reloadDocument: r,
    replace: n,
    method: o = fe,
    action: i,
    onSubmit: a,
    fetcherKey: c,
    routeId: s,
    relative: l
  } = t, f = Er(t, ta), p = aa(c, s), v = o.toLowerCase() === "get" ? "get" : "post", d = mo(i, {
    relative: l
  }), b = (O) => {
    if (a && a(O), O.defaultPrevented)
      return;
    O.preventDefault();
    let T = O.nativeEvent.submitter, M = (T == null ? void 0 : T.getAttribute("formmethod")) || o;
    p(T || O.currentTarget, {
      method: M,
      replace: n,
      relative: l
    });
  };
  return /* @__PURE__ */ D.createElement("form", Dt({
    ref: e,
    method: v,
    action: d,
    onSubmit: r ? a : b
  }, f));
});
process.env.NODE_ENV !== "production" && (yo.displayName = "FormImpl");
process.env.NODE_ENV;
var er;
(function(t) {
  t.UseScrollRestoration = "useScrollRestoration", t.UseSubmitImpl = "useSubmitImpl", t.UseFetcher = "useFetcher";
})(er || (er = {}));
var un;
(function(t) {
  t.UseFetchers = "useFetchers", t.UseScrollRestoration = "useScrollRestoration";
})(un || (un = {}));
function na(t) {
  return t + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function oa(t) {
  let e = D.useContext(po);
  return e || (process.env.NODE_ENV !== "production" ? nt(!1, na(t)) : nt(!1)), e;
}
function ia(t, e) {
  let {
    target: r,
    replace: n,
    state: o,
    preventScrollReset: i,
    relative: s
  } = e === void 0 ? {} : e, c = Vi(), a = re(), l = Se(t, {
    relative: s
  });
  return D.useCallback((f) => {
    if (Gi(f, r)) {
      f.preventDefault();
      let p = n !== void 0 ? n : tr(s) === tr(l);
      c(t, {
        replace: p,
        state: o,
        preventScrollReset: i,
        relative: a
      });
    }
  }, [s, c, l, n, o, r, t, i, a]);
}
function aa(t, e) {
  let {
    router: r
  } = oa(er.UseSubmitImpl), n = mo();
  return D.useCallback(function(o, i) {
    if (i === void 0 && (i = {}), typeof document > "u")
      throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
    let {
      method: a,
      encType: c,
      formData: s,
      url: l
    } = Xi(o, n, i), f = l.pathname + l.search, p = {
      replace: i.replace,
      formData: s,
      formMethod: a,
      formEncType: c
    };
    t ? (e == null && (process.env.NODE_ENV !== "production" ? nt(!1, "No routeId available for useFetcher()") : nt(!1)), r.fetch(t, e, f, p)) : r.navigate(f, p);
  }, [n, r, t, e]);
}
function mo(t, e) {
  let {
    relative: r
  } = e === void 0 ? {} : e, {
    basename: n
  } = D.useContext(te), o = D.useContext(ee);
  o || (process.env.NODE_ENV !== "production" ? nt(!1, "useFormAction must be used inside a RouteContext") : nt(!1));
  let [i] = o.matches.slice(-1), a = Dt({}, Se(t || ".", {
    relative: r
  })), c = re();
  if (t == null && (a.search = c.search, a.hash = c.hash, i.route.index)) {
    let s = new URLSearchParams(a.search);
    s.delete("index"), a.search = s.toString() ? "?" + s.toString() : "";
  }
  return (!t || t === ".") && i.route.index && (s.search = s.search ? s.search.replace(/^\?/, "?index&") : "?index"), n !== "/" && (s.pathname = s.pathname === "/" ? n : Or([n, s.pathname])), tr(s);
}
var as = typeof global == "object" && global && global.Object === Object && global;
const go = as;
var us = typeof self == "object" && self && self.Object === Object && self, cs = go || us || Function("return this")();
const ft = cs;
var ls = ft.Symbol;
const jt = ls;
var bo = Object.prototype, fs = bo.hasOwnProperty, ps = bo.toString, Wt = jt ? jt.toStringTag : void 0;
function hs(t) {
  var e = fs.call(t, Wt), r = t[Wt];
  try {
    t[Wt] = void 0;
    var n = !0;
  } catch {
  }
  var o = ps.call(t);
  return n && (e ? t[Wt] = r : delete t[Wt]), o;
}
var da = Object.prototype, va = da.toString;
function ya(t) {
  return va.call(t);
}
var ma = "[object Null]", ga = "[object Undefined]", cn = jt ? jt.toStringTag : void 0;
function Pt(t) {
  return t == null ? t === void 0 ? ga : ma : cn && cn in Object(t) ? ha(t) : ya(t);
}
function Rt(t) {
  return t != null && typeof t == "object";
}
var ba = "[object Symbol]";
function Sr(t) {
  return typeof t == "symbol" || Rt(t) && Pt(t) == ba;
}
function Os(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length, o = Array(n); ++r < n; )
    o[r] = e(t[r], r, t);
  return o;
}
var ws = Array.isArray;
const at = ws;
var _s = 1 / 0, ln = jt ? jt.prototype : void 0, fn = ln ? ln.toString : void 0;
function Oo(t) {
  if (typeof t == "string")
    return t;
  if (at(t))
    return Os(t, Oo) + "";
  if (Sr(t))
    return fn ? fn.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -Oa ? "-0" : e;
}
function xt(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
function jr(t) {
  return t;
}
var Ea = "[object AsyncFunction]", Sa = "[object Function]", ja = "[object GeneratorFunction]", Ra = "[object Proxy]";
function Rr(t) {
  if (!xt(t))
    return !1;
  var e = Pt(t);
  return e == Sa || e == ja || e == Ea || e == Ra;
}
var xs = ft["__core-js_shared__"];
const He = xs;
var pn = function() {
  var t = /[^.]+$/.exec(He && He.keys && He.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function Aa(t) {
  return !!pn && pn in t;
}
var Rs = Function.prototype, Ns = Rs.toString;
function $t(t) {
  if (t != null) {
    try {
      return Da.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var Ds = /[\\^$.*+?()[\]{}|]/g, Ps = /^\[object .+?Constructor\]$/, Cs = Function.prototype, $s = Object.prototype, Ls = Cs.toString, Us = $s.hasOwnProperty, ks = RegExp(
  "^" + Ls.call(Us).replace(Ds, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Ia(t) {
  if (!xt(t) || Aa(t))
    return !1;
  var e = Ar(t) ? ks : Ps;
  return e.test($t(t));
}
function Fa(t, e) {
  return t == null ? void 0 : t[e];
}
function Lt(t, e) {
  var r = Ms(t, e);
  return Is(r) ? r : void 0;
}
var Fs = Lt(ft, "WeakMap");
const rr = Fs;
var hn = Object.create, Bs = function() {
  function t() {
  }
  return function(e) {
    if (!xt(e))
      return {};
    if (hn)
      return hn(e);
    t.prototype = e;
    var r = new t();
    return t.prototype = void 0, r;
  };
}();
const Vs = Bs;
function zs(t, e, r) {
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
function Hs() {
}
function Ws(t, e) {
  var r = -1, n = t.length;
  for (e || (e = Array(n)); ++r < n; )
    e[r] = t[r];
  return e;
}
var qa = 800, Ja = 16, Ya = Date.now;
function Ka(t) {
  var e = 0, r = 0;
  return function() {
    var n = Ya(), o = Ja - (n - r);
    if (r = n, o > 0) {
      if (++e >= qa)
        return arguments[0];
    } else
      e = 0;
    return t.apply(void 0, arguments);
  };
}
function Ga(t) {
  return function() {
    return t;
  };
}
var Xa = function() {
  try {
    var t = Lt(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
}();
const ge = Xa;
var Za = ge ? function(t, e) {
  return ge(t, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Ga(e),
    writable: !0
  });
} : jr;
const Qa = Za;
var ts = Ka(Qa);
const es = ts;
function rs(t, e, r, n) {
  for (var o = t.length, i = r + (n ? 1 : -1); n ? i-- : ++i < o; )
    if (e(t[i], i, t))
      return i;
  return -1;
}
function ns(t) {
  return t !== t;
}
function os(t, e, r) {
  for (var n = r - 1, o = t.length; ++n < o; )
    if (t[n] === e)
      return n;
  return -1;
}
function is(t, e, r) {
  return e === e ? os(t, e, r) : rs(t, ns, r);
}
function as(t, e) {
  var r = t == null ? 0 : t.length;
  return !!r && is(t, e, 0) > -1;
}
var ss = 9007199254740991, us = /^(?:0|[1-9]\d*)$/;
function xr(t, e) {
  var r = typeof t;
  return e = e ?? ss, !!e && (r == "number" || r != "symbol" && us.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
function Re(t, e, r) {
  e == "__proto__" && ge ? ge(t, e, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : t[e] = r;
}
function ne(t, e) {
  return t === e || t !== t && e !== e;
}
var cs = Object.prototype, ls = cs.hasOwnProperty;
function fs(t, e, r) {
  var n = t[e];
  (!(ls.call(t, e) && ne(n, r)) || r === void 0 && !(e in t)) && Re(t, e, r);
}
function ps(t, e, r, n) {
  var o = !r;
  r || (r = {});
  for (var i = -1, a = e.length; ++i < a; ) {
    var c = e[i], s = n ? n(r[c], t[c], c, r, t) : void 0;
    s === void 0 && (s = t[c]), o ? Re(r, c, s) : fs(r, c, s);
  }
  return r;
}
var dn = Math.max;
function hs(t, e, r) {
  return e = dn(e === void 0 ? t.length - 1 : e, 0), function() {
    for (var n = arguments, o = -1, i = dn(n.length - e, 0), a = Array(i); ++o < i; )
      a[o] = n[e + o];
    o = -1;
    for (var c = Array(e + 1); ++o < e; )
      c[o] = n[o];
    return c[e] = r(s), zs(t, this, c);
  };
}
function ds(t, e) {
  return es(hs(t, e, jr), t + "");
}
var vs = 9007199254740991;
function Ar(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= vs;
}
function xe(t) {
  return t != null && Ar(t.length) && !Rr(t);
}
function ys(t, e, r) {
  if (!xt(r))
    return !1;
  var n = typeof e;
  return (n == "number" ? xe(r) && xr(e, r.length) : n == "string" && e in r) ? ne(r[e], t) : !1;
}
function ms(t) {
  return ds(function(e, r) {
    var n = -1, o = r.length, i = o > 1 ? r[o - 1] : void 0, a = o > 2 ? r[2] : void 0;
    for (i = t.length > 3 && typeof i == "function" ? (o--, i) : void 0, a && ys(r[0], r[1], a) && (i = o < 3 ? void 0 : i, o = 1), e = Object(e); ++n < o; ) {
      var c = r[n];
      c && t(e, c, n, i);
    }
    return e;
  });
}
var gs = Object.prototype;
function Tr(t) {
  var e = t && t.constructor, r = typeof e == "function" && e.prototype || gs;
  return t === r;
}
function bs(t, e) {
  for (var r = -1, n = Array(t); ++r < t; )
    n[r] = e(r);
  return n;
}
var Oa = "[object Arguments]";
function vn(t) {
  return At(t) && Ct(t) == Oa;
}
var wo = Object.prototype, wa = wo.hasOwnProperty, _a = wo.propertyIsEnumerable, Ea = vn(function() {
  return arguments;
}()) ? vn : function(t) {
  return At(t) && wa.call(t, "callee") && !_a.call(t, "callee");
};
const be = Es;
function Ss() {
  return !1;
}
var _o = typeof exports == "object" && exports && !exports.nodeType && exports, yn = _o && typeof module == "object" && module && !module.nodeType && module, ja = yn && yn.exports === _o, mn = ja ? ft.Buffer : void 0, Aa = mn ? mn.isBuffer : void 0, xa = Aa || Sa;
const Oe = xa;
var Ta = "[object Arguments]", Ra = "[object Array]", Na = "[object Boolean]", Da = "[object Date]", Pa = "[object Error]", Ca = "[object Function]", $a = "[object Map]", La = "[object Number]", Ua = "[object Object]", ka = "[object RegExp]", Ia = "[object Set]", Ma = "[object String]", Fa = "[object WeakMap]", Ba = "[object ArrayBuffer]", Va = "[object DataView]", za = "[object Float32Array]", Ha = "[object Float64Array]", Wa = "[object Int8Array]", qa = "[object Int16Array]", Ka = "[object Int32Array]", Ja = "[object Uint8Array]", Ya = "[object Uint8ClampedArray]", Ga = "[object Uint16Array]", Za = "[object Uint32Array]", W = {};
W[za] = W[Ha] = W[Wa] = W[qa] = W[Ka] = W[Ja] = W[Ya] = W[Ga] = W[Za] = !0;
W[Ta] = W[Ra] = W[Ba] = W[Na] = W[Va] = W[Da] = W[Pa] = W[Ca] = W[$a] = W[La] = W[Ua] = W[ka] = W[Ia] = W[Ma] = W[Fa] = !1;
function Xa(t) {
  return At(t) && Tr(t.length) && !!W[Ct(t)];
}
function Qs(t) {
  return function(e) {
    return t(e);
  };
}
var Eo = typeof exports == "object" && exports && !exports.nodeType && exports, Kt = Eo && typeof module == "object" && module && !module.nodeType && module, tu = Kt && Kt.exports === Eo, We = tu && go.process, eu = function() {
  try {
    var t = Kt && Kt.require && Kt.require("util").types;
    return t || We && We.binding && We.binding("util");
  } catch {
  }
}();
const gn = eu;
var bn = gn && gn.isTypedArray, ru = bn ? Qs(bn) : Zs;
const Dr = ru;
var nu = Object.prototype, ou = nu.hasOwnProperty;
function So(t, e) {
  var r = at(t), n = !r && be(t), o = !r && !n && Oe(t), i = !r && !n && !o && Nr(t), s = r || n || o || i, c = s ? ba(t.length, String) : [], a = c.length;
  for (var l in t)
    (e || ou.call(t, l)) && !(a && (l == "length" || o && (l == "offset" || l == "parent") || i && (l == "buffer" || l == "byteLength" || l == "byteOffset") || xr(l, s))) && c.push(l);
  return c;
}
function jo(t, e) {
  return function(r) {
    return t(e(r));
  };
}
var iu = jo(Object.keys, Object);
const au = iu;
var su = Object.prototype, uu = su.hasOwnProperty;
function cu(t) {
  if (!Tr(t))
    return au(t);
  var e = [];
  for (var r in Object(t))
    uu.call(t, r) && r != "constructor" && e.push(r);
  return e;
}
function Nr(t) {
  return xe(t) ? So(t) : cu(t);
}
function lu(t) {
  var e = [];
  if (t != null)
    for (var r in Object(t))
      e.push(r);
  return e;
}
var fu = Object.prototype, pu = fu.hasOwnProperty;
function hu(t) {
  if (!xt(t))
    return lu(t);
  var e = Tr(t), r = [];
  for (var n in t)
    n == "constructor" && (e || !pu.call(t, n)) || r.push(n);
  return r;
}
function Ro(t) {
  return xe(t) ? So(t, !0) : hu(t);
}
var du = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, vu = /^\w*$/;
function Cr(t, e) {
  if (st(t))
    return !1;
  var r = typeof t;
  return r == "number" || r == "symbol" || r == "boolean" || t == null || Sr(t) ? !0 : vu.test(t) || !du.test(t) || e != null && t in Object(e);
}
var yu = Lt(Object, "create");
const Jt = yu;
function mu() {
  this.__data__ = Yt ? Yt(null) : {}, this.size = 0;
}
function gu(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var bu = "__lodash_hash_undefined__", Ou = Object.prototype, wu = Ou.hasOwnProperty;
function _u(t) {
  var e = this.__data__;
  if (Yt) {
    var r = e[t];
    return r === bu ? void 0 : r;
  }
  return wu.call(e, t) ? e[t] : void 0;
}
var Eu = Object.prototype, Su = Eu.hasOwnProperty;
function ju(t) {
  var e = this.__data__;
  return Yt ? e[t] !== void 0 : Su.call(e, t);
}
var Ru = "__lodash_hash_undefined__";
function xu(t, e) {
  var r = this.__data__;
  return this.size += this.has(t) ? 0 : 1, r[t] = Yt && e === void 0 ? Ru : e, this;
}
function Nt(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
Nt.prototype.clear = mu;
Nt.prototype.delete = gu;
Nt.prototype.get = Ou;
Nt.prototype.has = ju;
Nt.prototype.set = xu;
function Au() {
  this.__data__ = [], this.size = 0;
}
function Ae(t, e) {
  for (var r = t.length; r--; )
    if (ne(t[r][0], e))
      return r;
  return -1;
}
var Tu = Array.prototype, Du = Tu.splice;
function Nu(t) {
  var e = this.__data__, r = Ae(e, t);
  if (r < 0)
    return !1;
  var n = e.length - 1;
  return r == n ? e.pop() : Du.call(e, r, 1), --this.size, !0;
}
function Cu(t) {
  var e = this.__data__, r = Ae(e, t);
  return r < 0 ? void 0 : e[r][1];
}
function Pu(t) {
  return Ae(this.__data__, t) > -1;
}
function $u(t, e) {
  var r = this.__data__, n = Te(r, t);
  return n < 0 ? (++this.size, r.push([t, e])) : r[n][1] = e, this;
}
function Ot(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
Ot.prototype.clear = Tu;
Ot.prototype.delete = Du;
Ot.prototype.get = Pu;
Ot.prototype.has = Cu;
Ot.prototype.set = $u;
var Lu = Lt(ft, "Map");
const Yt = Lu;
function Uu() {
  this.size = 0, this.__data__ = {
    hash: new Dt(),
    map: new (Yt || Ot)(),
    string: new Dt()
  };
}
function ku(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function Te(t, e) {
  var r = t.__data__;
  return ku(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map;
}
function Iu(t) {
  var e = Te(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function Fu(t) {
  return Te(this, t).get(t);
}
function Mu(t) {
  return Te(this, t).has(t);
}
function zu(t, e) {
  var r = Te(this, t), n = r.size;
  return r.set(t, e), this.size += r.size == n ? 0 : 1, this;
}
function wt(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
wt.prototype.clear = Uu;
wt.prototype.delete = Iu;
wt.prototype.get = Mu;
wt.prototype.has = Fu;
wt.prototype.set = Bu;
var Vu = "Expected a function";
function Cr(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(Vu);
  var r = function() {
    var n = arguments, o = e ? e.apply(this, n) : n[0], i = r.cache;
    if (i.has(o))
      return i.get(o);
    var a = t.apply(this, n);
    return r.cache = i.set(o, a) || i, a;
  };
  return r.cache = new (Cr.Cache || wt)(), r;
}
Cr.Cache = wt;
var zu = 500;
function Hu(t) {
  var e = Cr(t, function(n) {
    return r.size === zu && r.clear(), n;
  }), r = e.cache;
  return e;
}
var Wu = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, qu = /\\(\\)?/g, Ku = Hu(function(t) {
  var e = [];
  return t.charCodeAt(0) === 46 && e.push(""), t.replace(Wu, function(r, n, o, i) {
    e.push(o ? i.replace(qu, "$1") : n || r);
  }), e;
});
const Ju = Ku;
function Yu(t) {
  return t == null ? "" : Oo(t);
}
function xo(t, e) {
  return st(t) ? t : Cr(t, e) ? [t] : Yu(Ku(t));
}
var Gu = 1 / 0;
function De(t) {
  if (typeof t == "string" || Sr(t))
    return t;
  var e = t + "";
  return e == "0" && 1 / t == -Gu ? "-0" : e;
}
function Ao(t, e) {
  e = xo(e, t);
  for (var r = 0, n = e.length; t != null && r < n; )
    t = t[De(e[r++])];
  return r && r == n ? t : void 0;
}
function Xu(t, e, r) {
  var n = t == null ? void 0 : Ao(t, e);
  return n === void 0 ? r : n;
}
function Zu(t, e) {
  for (var r = -1, n = e.length, o = t.length; ++r < n; )
    t[o + r] = e[r];
  return t;
}
var Qu = jo(Object.getPrototypeOf, Object);
const To = Qu;
var tc = "[object Object]", ec = Function.prototype, rc = Object.prototype, Do = ec.toString, nc = rc.hasOwnProperty, oc = Do.call(Object);
function ic(t) {
  if (!Rt(t) || Pt(t) != tc)
    return !1;
  var e = To(t);
  if (e === null)
    return !0;
  var r = nc.call(e, "constructor") && e.constructor;
  return typeof r == "function" && r instanceof r && Do.call(r) == oc;
}
function sc() {
  this.__data__ = new Ot(), this.size = 0;
}
function sc(t) {
  var e = this.__data__, r = e.delete(t);
  return this.size = e.size, r;
}
function uc(t) {
  return this.__data__.get(t);
}
function cc(t) {
  return this.__data__.has(t);
}
var lc = 200;
function fc(t, e) {
  var r = this.__data__;
  if (r instanceof Ot) {
    var n = r.__data__;
    if (!Kt || n.length < lc - 1)
      return n.push([t, e]), this.size = ++r.size, this;
    r = this.__data__ = new wt(n);
  }
  return r.set(t, e), this.size = r.size, this;
}
function lt(t) {
  var e = this.__data__ = new Ot(t);
  this.size = e.size;
}
lt.prototype.clear = ac;
lt.prototype.delete = sc;
lt.prototype.get = uc;
lt.prototype.has = cc;
lt.prototype.set = fc;
var Do = typeof exports == "object" && exports && !exports.nodeType && exports, On = Do && typeof module == "object" && module && !module.nodeType && module, pc = On && On.exports === Do, wn = pc ? ft.Buffer : void 0, _n = wn ? wn.allocUnsafe : void 0;
function hc(t, e) {
  if (e)
    return t.slice();
  var r = t.length, n = On ? On(r) : new t.constructor(r);
  return t.copy(n), n;
}
function dc(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length, o = 0, i = []; ++r < n; ) {
    var a = t[r];
    e(a, r, t) && (i[o++] = a);
  }
  return i;
}
function vc() {
  return [];
}
var yc = Object.prototype, mc = yc.propertyIsEnumerable, En = Object.getOwnPropertySymbols, gc = En ? function(t) {
  return t == null ? [] : (t = Object(t), dc(En(t), function(e) {
    return mc.call(t, e);
  }));
} : vc;
const bc = gc;
function Oc(t, e, r) {
  var n = e(t);
  return st(t) ? n : Zu(n, r(t));
}
function Sn(t) {
  return Oc(t, Dr, bc);
}
var wc = Lt(ft, "DataView");
const nr = wc;
var _c = Lt(ft, "Promise");
const or = _c;
var Ec = Lt(ft, "Set");
const Ft = Ec;
var jn = "[object Map]", Sc = "[object Object]", An = "[object Promise]", xn = "[object Set]", Tn = "[object WeakMap]", Rn = "[object DataView]", jc = $t(nr), Ac = $t(Yt), xc = $t(or), Tc = $t(Ft), Rc = $t(rr), Rt = Ct;
(nr && Rt(new nr(new ArrayBuffer(1))) != Rn || Yt && Rt(new Yt()) != jn || or && Rt(or.resolve()) != An || Ft && Rt(new Ft()) != xn || rr && Rt(new rr()) != Tn) && (Rt = function(t) {
  var e = Ct(t), r = e == Sc ? t.constructor : void 0, n = r ? $t(r) : "";
  if (n)
    switch (n) {
      case jc:
        return Tn;
      case Rc:
        return jn;
      case xc:
        return Rn;
      case Ac:
        return xn;
      case Tc:
        return An;
    }
  return e;
});
const Nn = Rt;
var Nc = ft.Uint8Array;
const we = Nc;
function Dc(t) {
  var e = new t.constructor(t.byteLength);
  return new we(e).set(new we(t)), e;
}
function Cc(t, e) {
  var r = e ? Nc(t.buffer) : t.buffer;
  return new t.constructor(r, t.byteOffset, t.length);
}
function Cc(t) {
  return typeof t.constructor == "function" && !Rr(t) ? Vs(Ro(t)) : {};
}
var $c = "__lodash_hash_undefined__";
function Lc(t) {
  return this.__data__.set(t, $c), this;
}
function Uc(t) {
  return this.__data__.has(t);
}
function Gt(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.__data__ = new wt(); ++e < r; )
    this.add(t[e]);
}
Gt.prototype.add = Gt.prototype.push = Lc;
Gt.prototype.has = Uc;
function kc(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length; ++r < n; )
    if (e(t[r], r, t))
      return !0;
  return !1;
}
function Co(t, e) {
  return t.has(e);
}
var Ic = 1, Fc = 2;
function Po(t, e, r, n, o, i) {
  var a = r & Ic, c = t.length, s = e.length;
  if (c != s && !(a && s > c))
    return !1;
  var l = i.get(t), f = i.get(e);
  if (l && f)
    return l == e && f == t;
  var p = -1, v = !0, d = r & Fc ? new Gt() : void 0;
  for (i.set(t, e), i.set(e, t); ++p < c; ) {
    var b = t[p], O = e[p];
    if (n)
      var T = a ? n(O, b, p, e, t, i) : n(b, O, p, t, e, i);
    if (T !== void 0) {
      if (T)
        continue;
      v = !1;
      break;
    }
    if (d) {
      if (!kc(e, function(F, K) {
        if (!Po(d, K) && (b === F || o(b, F, r, n, i)))
          return d.push(K);
      })) {
        v = !1;
        break;
      }
    } else if (!(b === O || o(b, O, r, n, i))) {
      v = !1;
      break;
    }
  }
  return i.delete(t), i.delete(e), v;
}
function Mc(t) {
  var e = -1, r = Array(t.size);
  return t.forEach(function(n, o) {
    r[++e] = [o, n];
  }), r;
}
function $r(t) {
  var e = -1, r = Array(t.size);
  return t.forEach(function(n) {
    r[++e] = n;
  }), r;
}
var Bc = 1, Vc = 2, zc = "[object Boolean]", Hc = "[object Date]", Wc = "[object Error]", qc = "[object Map]", Kc = "[object Number]", Jc = "[object RegExp]", Yc = "[object Set]", Gc = "[object String]", Zc = "[object Symbol]", Xc = "[object ArrayBuffer]", Qc = "[object DataView]", Dn = jt ? jt.prototype : void 0, qe = Dn ? Dn.valueOf : void 0;
function tl(t, e, r, n, o, i, s) {
  switch (r) {
    case Qc:
      if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset)
        return !1;
      t = t.buffer, e = e.buffer;
    case Xc:
      return !(t.byteLength != e.byteLength || !i(new we(t), new we(e)));
    case zc:
    case Hc:
    case Kc:
      return ne(+t, +e);
    case Wc:
      return t.name == e.name && t.message == e.message;
    case Jc:
      return ne(+t, +e);
    case Wc:
      return t.name == e.name && t.message == e.message;
    case Yc:
    case Gc:
      return t == e + "";
    case qc:
      var c = Fc;
    case Yc:
      var a = n & Bc;
      if (c || (c = $r), t.size != e.size && !a)
        return !1;
      var l = a.get(t);
      if (l)
        return l == e;
      n |= Vc, s.set(t, e);
      var f = Co(c(t), c(e), n, o, i, s);
      return s.delete(t), f;
    case Zc:
      if (qe)
        return qe.call(t) == qe.call(e);
  }
  return !1;
}
var el = 1, rl = Object.prototype, nl = rl.hasOwnProperty;
function ol(t, e, r, n, o, i) {
  var a = r & el, c = Sn(t), s = c.length, l = Sn(e), f = l.length;
  if (s != f && !a)
    return !1;
  for (var p = s; p--; ) {
    var v = c[p];
    if (!(a ? v in e : nl.call(e, v)))
      return !1;
  }
  var d = i.get(t), b = i.get(e);
  if (d && b)
    return d == e && b == t;
  var O = !0;
  i.set(t, e), i.set(e, t);
  for (var T = a; ++p < s; ) {
    v = c[p];
    var M = t[v], J = e[v];
    if (n)
      var E = a ? n(J, M, v, e, t, i) : n(M, J, v, t, e, i);
    if (!(E === void 0 ? M === J || o(M, J, r, n, i) : E)) {
      O = !1;
      break;
    }
    T || (T = v == "constructor");
  }
  if (O && !T) {
    var N = t.constructor, z = e.constructor;
    N != z && "constructor" in t && "constructor" in e && !(typeof N == "function" && N instanceof N && typeof z == "function" && z instanceof z) && (O = !1);
  }
  return i.delete(t), i.delete(e), O;
}
var il = 1, Pn = "[object Arguments]", Cn = "[object Array]", ce = "[object Object]", sl = Object.prototype, $n = sl.hasOwnProperty;
function al(t, e, r, n, o, i) {
  var s = at(t), c = at(e), a = s ? Cn : Nn(t), l = c ? Cn : Nn(e);
  a = a == Pn ? ce : a, l = l == Pn ? ce : l;
  var f = a == ce, p = l == ce, v = a == l;
  if (v && Oe(t)) {
    if (!Oe(e))
      return !1;
    a = !0, f = !1;
  }
  if (v && !f)
    return i || (i = new lt()), a || Dr(t) ? Po(t, e, r, n, o, i) : tl(t, e, s, r, n, o, i);
  if (!(r & il)) {
    var d = f && $n.call(t, "__wrapped__"), b = p && $n.call(e, "__wrapped__");
    if (d || b) {
      var O = d ? t.value() : t, T = b ? e.value() : e;
      return i || (i = new lt()), o(O, T, r, n, i);
    }
  }
  return v ? (i || (i = new lt()), ol(t, e, r, n, o, i)) : !1;
}
function Lr(t, e, r, n, o) {
  return t === e ? !0 : t == null || e == null || !At(t) && !At(e) ? t !== t && e !== e : al(t, e, r, n, Lr, o);
}
var ul = 1, cl = 2;
function ll(t, e, r, n) {
  var o = r.length, i = o, a = !n;
  if (t == null)
    return !i;
  for (t = Object(t); o--; ) {
    var c = r[o];
    if (a && c[2] ? c[1] !== t[c[0]] : !(c[0] in t))
      return !1;
  }
  for (; ++o < i; ) {
    c = r[o];
    var s = c[0], l = t[s], f = c[1];
    if (a && c[2]) {
      if (l === void 0 && !(s in t))
        return !1;
    } else {
      var p = new lt();
      if (n)
        var v = n(l, f, a, t, e, p);
      if (!(v === void 0 ? Lr(f, l, ul | cl, n, p) : v))
        return !1;
    }
  }
  return !0;
}
function $o(t) {
  return t === t && !xt(t);
}
function fl(t) {
  for (var e = Nr(t), r = e.length; r--; ) {
    var n = e[r], o = t[n];
    e[r] = [n, o, $o(o)];
  }
  return e;
}
function Lo(t, e) {
  return function(r) {
    return r == null ? !1 : r[t] === e && (e !== void 0 || t in Object(r));
  };
}
function pl(t) {
  var e = fl(t);
  return e.length == 1 && e[0][2] ? Lo(e[0][0], e[0][1]) : function(r) {
    return r === t || ll(r, t, e);
  };
}
function hl(t, e) {
  return t != null && e in Object(t);
}
function dl(t, e, r) {
  e = xo(e, t);
  for (var n = -1, o = e.length, i = !1; ++n < o; ) {
    var a = De(e[n]);
    if (!(i = t != null && r(t, a)))
      break;
    t = t[a];
  }
  return i || ++n != o ? i : (o = t == null ? 0 : t.length, !!o && Ar(o) && xr(a, o) && (st(t) || be(t)));
}
function vl(t, e) {
  return t != null && dl(t, e, hl);
}
var yl = 1, ml = 2;
function gl(t, e) {
  return Pr(t) && $o(e) ? Lo(Ne(t), e) : function(r) {
    var n = Zu(r, t);
    return n === void 0 && n === e ? vl(r, t) : Lr(e, n, yl | ml);
  };
}
function bl(t) {
  return function(e) {
    return e == null ? void 0 : e[t];
  };
}
function Ol(t) {
  return function(e) {
    return Ao(e, t);
  };
}
function wl(t) {
  return Pr(t) ? bl(Ne(t)) : Ol(t);
}
function Uo(t) {
  return typeof t == "function" ? t : t == null ? jr : typeof t == "object" ? at(t) ? gl(t[0], t[1]) : pl(t) : wl(t);
}
function Ol(t) {
  return function(e, r, n) {
    for (var o = -1, i = Object(e), a = n(e), c = a.length; c--; ) {
      var s = a[t ? c : ++o];
      if (r(i[s], s, i) === !1)
        break;
    }
    return e;
  };
}
var El = _l();
const ko = El;
function Sl(t, e) {
  return t && ko(t, e, Dr);
}
function ir(t, e, r) {
  (r !== void 0 && !ne(t[e], r) || r === void 0 && !(e in t)) && Re(t, e, r);
}
function jl(t) {
  return Rt(t) && xe(t);
}
function ar(t, e) {
  if (!(e === "constructor" && typeof t[e] == "function") && e != "__proto__")
    return t[e];
}
function Rl(t) {
  return ps(t, Ro(t));
}
function xl(t, e, r, n, o, i, a) {
  var c = ar(t, r), s = ar(e, r), l = a.get(s);
  if (l) {
    ir(t, r, l);
    return;
  }
  var f = i ? i(c, s, r + "", t, e, a) : void 0, p = f === void 0;
  if (p) {
    var v = at(a), d = !v && Oe(a), b = !v && !d && Nr(a);
    f = a, v || d || b ? at(c) ? f = c : jl(c) ? f = Ws(c) : d ? (p = !1, f = hc(a, !0)) : b ? (p = !1, f = Pc(a, !0)) : f = [] : ic(a) || be(a) ? (f = c, be(c) ? f = Al(c) : (!xt(c) || Ar(c)) && (f = Cc(a))) : p = !1;
  }
  p && (a.set(s, f), o(f, s, n, i, a), a.delete(s)), ir(t, r, f);
}
function Io(t, e, r, n, o) {
  t !== e && ko(e, function(i, s) {
    if (o || (o = new lt()), xt(i))
      xl(t, e, a, r, Io, n, o);
    else {
      var c = n ? n(ar(t, a), i, a + "", t, e, o) : void 0;
      c === void 0 && (c = i), ir(t, a, c);
    }
  }, Ro);
}
function Al(t, e, r) {
  for (var n = -1, o = t == null ? 0 : t.length; ++n < o; )
    if (r(e, t[n]))
      return !0;
  return !1;
}
function Tl(t, e) {
  var r = {};
  return e = Uo(e), Sl(t, function(n, o, i) {
    Ae(r, o, e(n, o, i));
  }), r;
}
var Dl = ms(function(t, e, r) {
  Io(t, e, r);
});
const Dl = Nl;
var Pl = 1 / 0, Cl = Ft && 1 / $r(new Ft([, -0]))[1] == Pl ? function(t) {
  return new Ft(t);
} : Hs;
const $l = Cl;
var Ll = 200;
function Ul(t, e, r) {
  var n = -1, o = sa, i = t.length, s = !0, c = [], a = c;
  if (r)
    s = !1, o = Tl;
  else if (i >= Ll) {
    var l = e ? null : $l(t);
    if (l)
      return $r(l);
    s = !1, o = Po, a = new Gt();
  } else
    s = e ? [] : c;
  t:
    for (; ++n < i; ) {
      var f = t[n], p = e ? e(f) : f;
      if (f = r || f !== 0 ? f : 0, a && p === p) {
        for (var v = s.length; v--; )
          if (s[v] === p)
            continue t;
        e && s.push(p), c.push(f);
      } else
        o(s, p, r) || (s !== c && s.push(p), c.push(f));
    }
  return c;
}
function kl(t, e) {
  return t && t.length ? Ul(t, Uo(e)) : [];
}
var sr = /* @__PURE__ */ ((t) => (t.Json = "application/json", t.UrlEncoded = "application/x-www-form-urlencoded", t))(sr || {});
class Il {
  constructor() {
    rt(this, "listeners"), this.listeners = {};
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
function Ln(t) {
  for (const e in t)
    Object.prototype.hasOwnProperty.call(t, e) && t[e] === void 0 && delete t[e];
  return t;
}
const ur = (t, e = "", r = new FormData()) => (Object.keys(t).forEach((n) => {
  const o = e !== "" ? e + "." + n : n, i = t[n];
  Array.isArray(i) ? i.forEach((a, c) => {
    typeof a == "object" ? a instanceof File ? r.append(o, a) : r = ur(a, o + `[${c}]`, r) : r.append(o, a);
  }) : typeof i == "object" ? i instanceof File ? r.append(o, i) : r = ur(i, o, r) : r.append(o, i);
}), r), Oe = (t, e = "", r = new URLSearchParams()) => (Object.keys(t).forEach((n) => {
  const o = e !== "" ? e + "." + n : n, i = t[n];
  Array.isArray(i) ? i.forEach((a, c) => {
    typeof a == "object" ? r = Oe(a, o + `[${c}]`, r) : r.append(o, a);
  }) : typeof i == "object" ? r = Oe(i, o, r) : r.append(o, i);
}), r);
class Fl {
  constructor() {
    rt(this, "modeEnv"), rt(this, "subdomain");
  }
  setConfig({ modeEnv: e, subdomain: r }) {
    this.modeEnv = e || void 0, this.subdomain = r || void 0;
  }
  getConfig() {
    return {
      modEnv: this.modeEnv,
      subdomain: this.subdomain
    };
  }
}
const Un = new Ml();
class Fl {
  getToken(e) {
    if (this.getPrefix())
      return localStorage.getItem(`${this.getPrefix()}_${e}`) || "";
  }
  setToken(e, r) {
    if (this.getPrefix())
      return localStorage.setItem(`${this.getPrefix()}_${e}`, r);
  }
  getPrefix() {
    const e = Un.getConfig().modEnv, r = Un.getConfig().subdomain;
    return !e || !r ? "" : `${e}_${r}`;
  }
}
const zl = new Ml();
function cr(t) {
  this.message = t;
}
cr.prototype = new Error(), cr.prototype.name = "InvalidCharacterError";
typeof window < "u" && window.atob && window.atob.bind(window);
function kn(t) {
  this.message = t;
}
kn.prototype = new Error(), kn.prototype.name = "InvalidTokenError";
function Mo(t, e) {
  return function() {
    return t.apply(e, arguments);
  };
}
const { toString: Fo } = Object.prototype, { getPrototypeOf: Ur } = Object, kr = ((t) => (e) => {
  const r = Fo.call(e);
  return t[r] || (t[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), _t = (t) => (t = t.toLowerCase(), (e) => kr(e) === t), De = (t) => (e) => typeof e === t, { isArray: Vt } = Array, Zt = De("undefined");
function Vl(t) {
  return t !== null && !Zt(t) && t.constructor !== null && !Zt(t.constructor) && Pt(t.constructor.isBuffer) && t.constructor.isBuffer(t);
}
const Bo = _t("ArrayBuffer");
function zl(t) {
  let e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(t) : e = t && t.buffer && zo(t.buffer), e;
}
const Hl = De("string"), Pt = De("function"), Vo = De("number"), Ir = (t) => t !== null && typeof t == "object", Wl = (t) => t === !0 || t === !1, pe = (t) => {
  if (kr(t) !== "object")
    return !1;
  const e = Ur(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in t) && !(Symbol.iterator in t);
}, ql = Ot("Date"), Jl = Ot("File"), Yl = Ot("Blob"), Kl = Ot("FileList"), Gl = (t) => Ir(t) && Ct(t.pipe), Xl = (t) => {
  const e = "[object FormData]";
  return t && (typeof FormData == "function" && t instanceof FormData || Mo.call(t) === e || Ct(t.toString) && t.toString() === e);
}, Zl = Ot("URLSearchParams"), Ql = (t) => t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function oe(t, e, { allOwnKeys: r = !1 } = {}) {
  if (t === null || typeof t > "u")
    return;
  let n, o;
  if (typeof t != "object" && (t = [t]), Vt(t))
    for (n = 0, o = t.length; n < o; n++)
      e.call(null, t[n], n, t);
  else {
    const i = r ? Object.getOwnPropertyNames(t) : Object.keys(t), a = i.length;
    let c;
    for (n = 0; n < a; n++)
      c = i[n], e.call(null, t[c], c, t);
  }
}
function zo(t, e) {
  e = e.toLowerCase();
  const r = Object.keys(t);
  let n = r.length, o;
  for (; n-- > 0; )
    if (o = r[n], e === o.toLowerCase())
      return o;
  return null;
}
const Ho = typeof self > "u" ? typeof global > "u" ? globalThis : global : self, Wo = (t) => !Zt(t) && t !== Ho;
function lr() {
  const { caseless: t } = Wo(this) && this || {}, e = {}, r = (n, o) => {
    const i = t && zo(e, o) || o;
    pe(e[i]) && pe(n) ? e[i] = lr(e[i], n) : pe(n) ? e[i] = lr({}, n) : Vt(n) ? e[i] = n.slice() : e[i] = n;
  };
  for (let n = 0, o = arguments.length; n < o; n++)
    arguments[n] && oe(arguments[n], r);
  return e;
}
const tf = (t, e, r, { allOwnKeys: n } = {}) => (oe(e, (o, i) => {
  r && Ct(o) ? t[i] = Fo(o, r) : t[i] = o;
}, { allOwnKeys: n }), t), ef = (t) => (t.charCodeAt(0) === 65279 && (t = t.slice(1)), t), rf = (t, e, r, n) => {
  t.prototype = Object.create(e.prototype, n), t.prototype.constructor = t, Object.defineProperty(t, "super", {
    value: e.prototype
  }), r && Object.assign(t.prototype, r);
}, nf = (t, e, r, n) => {
  let o, i, a;
  const c = {};
  if (e = e || {}, t == null)
    return e;
  do {
    for (o = Object.getOwnPropertyNames(t), i = o.length; i-- > 0; )
      s = o[i], (!n || n(s, t, e)) && !c[s] && (e[s] = t[s], c[s] = !0);
    t = r !== !1 && Ur(t);
  } while (t && (!r || r(t, e)) && t !== Object.prototype);
  return e;
}, of = (t, e, r) => {
  t = String(t), (r === void 0 || r > t.length) && (r = t.length), r -= e.length;
  const n = t.indexOf(e, r);
  return n !== -1 && n === r;
}, af = (t) => {
  if (!t)
    return null;
  if (Vt(t))
    return t;
  let e = t.length;
  if (!Vo(e))
    return null;
  const r = new Array(e);
  for (; e-- > 0; )
    r[e] = t[e];
  return r;
}, af = ((t) => (e) => t && e instanceof t)(typeof Uint8Array < "u" && Ur(Uint8Array)), uf = (t, e) => {
  const r = (t && t[Symbol.iterator]).call(t);
  let n;
  for (; (n = r.next()) && !n.done; ) {
    const o = n.value;
    e.call(t, o[0], o[1]);
  }
}, cf = (t, e) => {
  let r;
  const n = [];
  for (; (r = t.exec(e)) !== null; )
    n.push(r);
  return n;
}, lf = Ot("HTMLFormElement"), ff = (t) => t.toLowerCase().replace(
  /[_-\s]([a-z\d])(\w*)/g,
  function(e, r, n) {
    return r.toUpperCase() + n;
  }
), In = (({ hasOwnProperty: t }) => (e, r) => t.call(e, r))(Object.prototype), pf = Ot("RegExp"), qo = (t, e) => {
  const r = Object.getOwnPropertyDescriptors(t), n = {};
  oe(r, (o, i) => {
    e(o, i, t) !== !1 && (n[i] = o);
  }), Object.defineProperties(t, n);
}, hf = (t) => {
  qo(t, (e, r) => {
    if (Ct(t) && ["arguments", "caller", "callee"].indexOf(r) !== -1)
      return !1;
    const n = t[r];
    if (Ct(n)) {
      if (e.enumerable = !1, "writable" in e) {
        e.writable = !1;
        return;
      }
      e.set || (e.set = () => {
        throw Error("Can not rewrite read-only method '" + r + "'");
      });
    }
  });
}, df = (t, e) => {
  const r = {}, n = (o) => {
    o.forEach((i) => {
      r[i] = !0;
    });
  };
  return Vt(t) ? n(t) : n(String(t).split(e)), r;
}, vf = () => {
}, yf = (t, e) => (t = +t, Number.isFinite(t) ? t : e), mf = (t) => {
  const e = new Array(10), r = (n, o) => {
    if (Ir(n)) {
      if (e.indexOf(n) >= 0)
        return;
      if (!("toJSON" in n)) {
        e[o] = n;
        const i = Vt(n) ? [] : {};
        return oe(n, (s, c) => {
          const a = r(s, o + 1);
          !Zt(a) && (i[c] = a);
        }), e[o] = void 0, i;
      }
    }
    return n;
  };
  return r(t, 0);
}, h = {
  isArray: Vt,
  isArrayBuffer: Bo,
  isBuffer: Vl,
  isFormData: Zl,
  isArrayBufferView: zl,
  isString: Hl,
  isNumber: Vo,
  isBoolean: Wl,
  isObject: Ir,
  isPlainObject: pe,
  isUndefined: Xt,
  isDate: ql,
  isFile: Jl,
  isBlob: Yl,
  isRegExp: pf,
  isFunction: Ct,
  isStream: Gl,
  isURLSearchParams: Zl,
  isTypedArray: sf,
  isFileList: Kl,
  forEach: oe,
  merge: lr,
  extend: tf,
  trim: Ql,
  stripBOM: ef,
  inherits: rf,
  toFlatObject: nf,
  kindOf: kr,
  kindOfTest: _t,
  endsWith: of,
  toArray: af,
  forEachEntry: uf,
  matchAll: cf,
  isHTMLForm: lf,
  hasOwnProperty: In,
  hasOwnProp: In,
  reduceDescriptors: qo,
  freezeMethods: hf,
  toObjectSet: df,
  toCamelCase: ff,
  noop: vf,
  toFiniteNumber: yf,
  findKey: zo,
  global: Ho,
  isContextDefined: Wo,
  toJSONObject: mf
};
function $(t, e, r, n, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = t, this.name = "AxiosError", e && (this.code = e), r && (this.config = r), n && (this.request = n), o && (this.response = o);
}
h.inherits($, Error, {
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
const Ko = $.prototype, Jo = {};
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
  Yo[t] = { value: t };
});
Object.defineProperties($, Jo);
Object.defineProperty(Ko, "isAxiosError", { value: !0 });
$.from = (t, e, r, n, o, i) => {
  const s = Object.create(Ko);
  return h.toFlatObject(t, s, function(c) {
    return c !== Error.prototype;
  }, (c) => c !== "isAxiosError"), $.call(s, t.message, e, r, n, o), s.cause = t, s.name = t.name, i && Object.assign(s, i), s;
};
var gf = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, bf = typeof self == "object" ? self.FormData : window.FormData;
const Of = bf;
function fr(t) {
  return h.isPlainObject(t) || h.isArray(t);
}
function Ko(t) {
  return h.endsWith(t, "[]") ? t.slice(0, -2) : t;
}
function Fn(t, e, r) {
  return t ? t.concat(e).map(function(n, o) {
    return n = Ko(n), !r && o ? "[" + n + "]" : n;
  }).join(r ? "." : "") : e;
}
function wf(t) {
  return h.isArray(t) && !t.some(fr);
}
const Of = h.toFlatObject(h, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function Ef(t) {
  return t && h.isFunction(t.append) && t[Symbol.toStringTag] === "FormData" && t[Symbol.iterator];
}
function Ce(t, e, r) {
  if (!h.isObject(t))
    throw new TypeError("target must be an object");
  e = e || new (Of || FormData)(), r = h.toFlatObject(r, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(d, b) {
    return !h.isUndefined(b[d]);
  });
  const n = r.metaTokens, o = r.visitor || l, i = r.dots, a = r.indexes, c = (r.Blob || typeof Blob < "u" && Blob) && Ef(e);
  if (!h.isFunction(o))
    throw new TypeError("visitor must be a function");
  function s(d) {
    if (d === null)
      return "";
    if (h.isDate(d))
      return d.toISOString();
    if (!c && h.isBlob(d))
      throw new $("Blob is not supported. Use a Buffer instead.");
    return h.isArrayBuffer(d) || h.isTypedArray(d) ? c && typeof Blob == "function" ? new Blob([d]) : Buffer.from(d) : d;
  }
  function l(d, b, O) {
    let T = d;
    if (d && !O && typeof d == "object") {
      if (h.endsWith(b, "{}"))
        b = n ? b : b.slice(0, -2), d = JSON.stringify(d);
      else if (h.isArray(d) && wf(d) || h.isFileList(d) || h.endsWith(b, "[]") && (R = h.toArray(d)))
        return b = Yo(b), R.forEach(function(F, K) {
          !(h.isUndefined(F) || F === null) && e.append(
            s === !0 ? Mn([b], K, i) : s === null ? b : b + "[]",
            a(F)
          );
        }), !1;
    }
    return fr(d) ? !0 : (e.append(Fn(O, b, i), s(d)), !1);
  }
  const f = [], p = Object.assign(Of, {
    defaultVisitor: l,
    convertValue: s,
    isVisitable: fr
  });
  function v(d, b) {
    if (!h.isUndefined(d)) {
      if (f.indexOf(d) !== -1)
        throw Error("Circular reference detected in " + b.join("."));
      f.push(d), h.forEach(d, function(O, T) {
        (!(h.isUndefined(O) || O === null) && o.call(
          e,
          O,
          h.isString(T) ? T.trim() : T,
          b,
          p
        )) === !0 && v(O, b ? b.concat(T) : [T]);
      }), f.pop();
    }
  }
  if (!h.isObject(t))
    throw new TypeError("data must be an object");
  return v(t), e;
}
function Mn(t) {
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
function Fr(t, e) {
  this._pairs = [], t && Ce(t, this, e);
}
const Go = Fr.prototype;
Go.append = function(t, e) {
  this._pairs.push([t, e]);
};
Go.toString = function(t) {
  const e = t ? function(r) {
    return t.call(this, r, Mn);
  } : Mn;
  return this._pairs.map(function(r) {
    return e(r[0]) + "=" + e(r[1]);
  }, "").join("&");
};
function Sf(t) {
  return encodeURIComponent(t).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Xo(t, e, r) {
  if (!e)
    return t;
  const n = r && r.encode || Sf, o = r && r.serialize;
  let i;
  if (o ? i = o(e, r) : i = h.isURLSearchParams(e) ? e.toString() : new Fr(e, r).toString(n), i) {
    const a = t.indexOf("#");
    a !== -1 && (t = t.slice(0, a)), t += (t.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return t;
}
class jf {
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
    h.forEach(this.handlers, function(r) {
      r !== null && e(r);
    });
  }
}
const zn = jf, Zo = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Rf = typeof URLSearchParams < "u" ? URLSearchParams : Fr, xf = FormData, Af = (() => {
  let t;
  return typeof navigator < "u" && ((t = navigator.product) === "ReactNative" || t === "NativeScript" || t === "NS") ? !1 : typeof window < "u" && typeof document < "u";
})(), Tf = (() => typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), ct = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Rf,
    FormData: xf,
    Blob
  },
  isStandardBrowserEnv: Af,
  isStandardBrowserWebWorkerEnv: Tf,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function Df(t, e) {
  return Ce(t, new ct.classes.URLSearchParams(), Object.assign({
    visitor: function(r, n, o, i) {
      return ct.isNode && h.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments);
    }
  }, e));
}
function Nf(t) {
  return h.matchAll(/\w+|\[(\w*)]/g, t).map((e) => e[0] === "[]" ? "" : e[1] || e[0]);
}
function Cf(t) {
  const e = {}, r = Object.keys(t);
  let n;
  const o = r.length;
  let i;
  for (n = 0; n < o; n++)
    i = r[n], e[i] = t[i];
  return e;
}
function Qo(t) {
  function e(r, n, o, i) {
    let a = r[i++];
    const c = Number.isFinite(+a), s = i >= r.length;
    return a = !a && h.isArray(o) ? o.length : a, s ? (h.hasOwnProp(o, a) ? o[a] = [o[a], n] : o[a] = n, !c) : ((!o[a] || !h.isObject(o[a])) && (o[a] = []), e(r, n, o[a], i) && h.isArray(o[a]) && (o[a] = Cf(o[a])), !c);
  }
  if (h.isFormData(t) && h.isFunction(t.entries)) {
    const r = {};
    return h.forEachEntry(t, (n, o) => {
      e(Nf(n), o, r, 0);
    }), r;
  }
  return null;
}
const Pf = {
  "Content-Type": void 0
};
function $f(t, e, r) {
  if (h.isString(t))
    try {
      return (e || JSON.parse)(t), h.trim(t);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (r || JSON.stringify)(t);
}
const Pe = {
  transitional: Zo,
  adapter: ["xhr", "http"],
  transformRequest: [function(t, e) {
    const r = e.getContentType() || "", n = r.indexOf("application/json") > -1, o = h.isObject(t);
    if (o && h.isHTMLForm(t) && (t = new FormData(t)), h.isFormData(t))
      return n && n ? JSON.stringify(Qo(t)) : t;
    if (h.isArrayBuffer(t) || h.isBuffer(t) || h.isStream(t) || h.isFile(t) || h.isBlob(t))
      return t;
    if (h.isArrayBufferView(t))
      return t.buffer;
    if (h.isURLSearchParams(t))
      return e.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let i;
    if (o) {
      if (r.indexOf("application/x-www-form-urlencoded") > -1)
        return Df(t, this.formSerializer).toString();
      if ((i = h.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
        const a = this.env && this.env.FormData;
        return Ce(
          i ? { "files[]": t } : t,
          a && new a(),
          this.formSerializer
        );
      }
    }
    return o || n ? (e.setContentType("application/json", !1), $f(t)) : t;
  }],
  transformResponse: [function(t) {
    const e = this.transitional || Pe.transitional, r = e && e.forcedJSONParsing, n = this.responseType === "json";
    if (t && h.isString(t) && (r && !this.responseType || n)) {
      const o = !(e && e.silentJSONParsing) && n;
      try {
        return JSON.parse(t);
      } catch (i) {
        if (o)
          throw i.name === "SyntaxError" ? $.from(i, $.ERR_BAD_RESPONSE, this, null, this.response) : i;
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
    FormData: ct.classes.FormData,
    Blob: ct.classes.Blob
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
  Pe.headers[t] = {};
});
h.forEach(["post", "put", "patch"], function(t) {
  Pe.headers[t] = h.merge(Pf);
});
const Fr = Ce, Lf = h.toObjectSet([
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
]), Uf = (t) => {
  const e = {};
  let r, n, o;
  return t && t.split(`
`).forEach(function(i) {
    o = i.indexOf(":"), r = i.substring(0, o).trim().toLowerCase(), n = i.substring(o + 1).trim(), !(!r || e[r] && Lf[r]) && (r === "set-cookie" ? e[r] ? e[r].push(n) : e[r] = [n] : e[r] = e[r] ? e[r] + ", " + n : n);
  }), e;
}, Vn = Symbol("internals");
function qt(t) {
  return t && String(t).trim().toLowerCase();
}
function he(t) {
  return t === !1 || t == null ? t : h.isArray(t) ? t.map(he) : String(t);
}
function kf(t) {
  const e = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(t); )
    e[n[1]] = n[2];
  return e;
}
function If(t) {
  return /^[-_a-zA-Z]+$/.test(t.trim());
}
function zn(t, e, r, n) {
  if (h.isFunction(n))
    return n.call(this, e, r);
  if (h.isString(e)) {
    if (h.isString(n))
      return e.indexOf(n) !== -1;
    if (h.isRegExp(n))
      return n.test(e);
  }
}
function Ff(t) {
  return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, r, n) => r.toUpperCase() + n);
}
function Mf(t, e) {
  const r = h.toCamelCase(" " + e);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(t, n + r, {
      value: function(o, i, a) {
        return this[n].call(this, e, o, i, a);
      },
      configurable: !0
    });
  });
}
let $e = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, e, r) {
    const n = this;
    function o(a, c, s) {
      const l = qt(c);
      if (!l)
        throw new Error("header name must be a non-empty string");
      const f = h.findKey(n, l);
      (!f || n[f] === void 0 || s === !0 || s === void 0 && n[f] !== !1) && (n[f || c] = he(a));
    }
    const i = (s, c) => h.forEach(s, (a, l) => o(a, l, c));
    return h.isPlainObject(t) || t instanceof this.constructor ? i(t, e) : h.isString(t) && (t = t.trim()) && !If(t) ? i(Uf(t), e) : t != null && o(e, t, r), this;
  }
  get(t, e) {
    if (t = qt(t), t) {
      const r = h.findKey(this, t);
      if (r) {
        const n = this[r];
        if (!e)
          return n;
        if (e === !0)
          return kf(n);
        if (h.isFunction(e))
          return e.call(this, n, r);
        if (h.isRegExp(e))
          return e.exec(n);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, e) {
    if (t = qt(t), t) {
      const r = h.findKey(this, t);
      return !!(r && (!e || zn(this, this[r], r, e)));
    }
    return !1;
  }
  delete(t, e) {
    const r = this;
    let n = !1;
    function o(i) {
      if (i = qt(i), i) {
        const s = h.findKey(r, i);
        s && (!e || zn(r, r[s], s, e)) && (delete r[s], n = !0);
      }
    }
    return h.isArray(t) ? t.forEach(o) : o(t), n;
  }
  clear() {
    return Object.keys(this).forEach(this.delete.bind(this));
  }
  normalize(t) {
    const e = this, r = {};
    return h.forEach(this, (n, o) => {
      const i = h.findKey(r, o);
      if (i) {
        e[i] = he(n), delete e[o];
        return;
      }
      const a = t ? Ff(o) : String(o).trim();
      a !== o && delete e[o], e[a] = he(n), r[a] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const e = /* @__PURE__ */ Object.create(null);
    return h.forEach(this, (r, n) => {
      r != null && r !== !1 && (e[n] = t && h.isArray(r) ? r.join(", ") : r);
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
    const e = (this[Vn] = this[Vn] = {
      accessors: {}
    }).accessors, r = this.prototype;
    function n(o) {
      const i = qt(o);
      e[i] || (Mf(r, o), e[i] = !0);
    }
    return h.isArray(t) ? t.forEach(n) : n(t), this;
  }
};
$e.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent"]);
h.freezeMethods($e.prototype);
h.freezeMethods($e);
const gt = $e;
function Ke(t, e) {
  const r = this || Fr, n = e || r, o = gt.from(n.headers);
  let i = n.data;
  return h.forEach(t, function(a) {
    i = a.call(r, i, o.normalize(), e ? e.status : void 0);
  }), o.normalize(), i;
}
function ti(t) {
  return !!(t && t.__CANCEL__);
}
function ie(t, e, r) {
  $.call(this, t ?? "canceled", $.ERR_CANCELED, e, r), this.name = "CanceledError";
}
h.inherits(ie, $, {
  __CANCEL__: !0
});
const Bf = null;
function Vf(t, e, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? t(r) : e(new $(
    "Request failed with status code " + r.status,
    [$.ERR_BAD_REQUEST, $.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
    r.config,
    r.request,
    r
  ));
}
const zf = ct.isStandardBrowserEnv ? function() {
  return {
    write: function(t, e, r, n, o, i) {
      const a = [];
      a.push(t + "=" + encodeURIComponent(e)), h.isNumber(r) && a.push("expires=" + new Date(r).toGMTString()), h.isString(n) && a.push("path=" + n), h.isString(o) && a.push("domain=" + o), i === !0 && a.push("secure"), document.cookie = a.join("; ");
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
function Hf(t) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
}
function Wf(t, e) {
  return e ? t.replace(/\/+$/, "") + "/" + e.replace(/^\/+/, "") : t;
}
function ei(t, e) {
  return t && !Hf(e) ? Wf(t, e) : e;
}
const qf = ct.isStandardBrowserEnv ? function() {
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
    const i = h.isString(o) ? n(o) : o;
    return i.protocol === r.protocol && i.host === r.host;
  };
}() : function() {
  return function() {
    return !0;
  };
}();
function Jf(t) {
  const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
  return e && e[1] || "";
}
function Yf(t, e) {
  t = t || 10;
  const r = new Array(t), n = new Array(t);
  let o = 0, i = 0, a;
  return e = e !== void 0 ? e : 1e3, function(c) {
    const s = Date.now(), l = n[i];
    a || (a = s), r[o] = c, n[o] = s;
    let f = i, p = 0;
    for (; f !== o; )
      p += r[f++], f = f % t;
    if (o = (o + 1) % t, o === i && (i = (i + 1) % t), s - a < e)
      return;
    const v = l && s - l;
    return v ? Math.round(p * 1e3 / v) : void 0;
  };
}
function Hn(t, e) {
  let r = 0;
  const n = Yf(50, 250);
  return (o) => {
    const i = o.loaded, a = o.lengthComputable ? o.total : void 0, c = i - r, s = n(c), l = i <= a;
    r = i;
    const f = {
      loaded: i,
      total: a,
      progress: a ? i / a : void 0,
      bytes: c,
      rate: s || void 0,
      estimated: s && a && l ? (a - i) / s : void 0,
      event: o
    };
    f[e ? "download" : "upload"] = !0, t(f);
  };
}
const Kf = typeof XMLHttpRequest < "u", Gf = Kf && function(t) {
  return new Promise(function(e, r) {
    let n = t.data;
    const o = gt.from(t.headers).normalize(), i = t.responseType;
    let a;
    function c() {
      t.cancelToken && t.cancelToken.unsubscribe(a), t.signal && t.signal.removeEventListener("abort", a);
    }
    h.isFormData(n) && (ct.isStandardBrowserEnv || ct.isStandardBrowserWebWorkerEnv) && o.setContentType(!1);
    let s = new XMLHttpRequest();
    if (t.auth) {
      const v = t.auth.username || "", d = t.auth.password ? unescape(encodeURIComponent(t.auth.password)) : "";
      o.set("Authorization", "Basic " + btoa(v + ":" + d));
    }
    const l = ei(t.baseURL, t.url);
    s.open(t.method.toUpperCase(), Xo(l, t.params, t.paramsSerializer), !0), s.timeout = t.timeout;
    function f() {
      if (!s)
        return;
      const v = gt.from(
        "getAllResponseHeaders" in s && s.getAllResponseHeaders()
      ), d = {
        data: !i || i === "text" || i === "json" ? s.responseText : s.response,
        status: s.status,
        statusText: s.statusText,
        headers: v,
        config: t,
        request: s
      };
      Vf(function(b) {
        e(b), c();
      }, function(b) {
        r(b), c();
      }, d), s = null;
    }
    if ("onloadend" in a ? a.onloadend = f : a.onreadystatechange = function() {
      !a || a.readyState !== 4 || a.status === 0 && !(a.responseURL && a.responseURL.indexOf("file:") === 0) || setTimeout(f);
    }, a.onabort = function() {
      a && (r(new $("Request aborted", $.ECONNABORTED, t, a)), a = null);
    }, a.onerror = function() {
      r(new $("Network Error", $.ERR_NETWORK, t, a)), a = null;
    }, a.ontimeout = function() {
      let v = t.timeout ? "timeout of " + t.timeout + "ms exceeded" : "timeout exceeded";
      const d = t.transitional || Xo;
      t.timeoutErrorMessage && (v = t.timeoutErrorMessage), r(new $(
        v,
        d.clarifyTimeoutError ? $.ETIMEDOUT : $.ECONNABORTED,
        t,
        s
      )), s = null;
    }, ct.isStandardBrowserEnv) {
      const v = (t.withCredentials || qf(l)) && t.xsrfCookieName && zf.read(t.xsrfCookieName);
      v && o.set(t.xsrfHeaderName, v);
    }
    n === void 0 && o.setContentType(null), "setRequestHeader" in a && h.forEach(o.toJSON(), function(v, d) {
      a.setRequestHeader(d, v);
    }), h.isUndefined(t.withCredentials) || (a.withCredentials = !!t.withCredentials), i && i !== "json" && (a.responseType = t.responseType), typeof t.onDownloadProgress == "function" && a.addEventListener("progress", Hn(t.onDownloadProgress, !0)), typeof t.onUploadProgress == "function" && a.upload && a.upload.addEventListener("progress", Hn(t.onUploadProgress)), (t.cancelToken || t.signal) && (s = (v) => {
      a && (r(!v || v.type ? new ie(null, t, a) : v), a.abort(), a = null);
    }, t.cancelToken && t.cancelToken.subscribe(s), t.signal && (t.signal.aborted ? s() : t.signal.addEventListener("abort", s)));
    const p = Kf(l);
    if (p && ct.protocols.indexOf(p) === -1) {
      r(new $("Unsupported protocol " + p + ":", $.ERR_BAD_REQUEST, t));
      return;
    }
    s.send(n || null);
  });
}, de = {
  http: zf,
  xhr: Gf
};
h.forEach(de, (t, e) => {
  if (t) {
    try {
      Object.defineProperty(t, "name", { value: e });
    } catch {
    }
    Object.defineProperty(t, "adapterName", { value: e });
  }
});
const Xf = {
  getAdapter: (t) => {
    t = h.isArray(t) ? t : [t];
    const { length: e } = t;
    let r, n;
    for (let o = 0; o < e && (r = t[o], !(n = h.isString(r) ? de[r.toLowerCase()] : r)); o++)
      ;
    if (!n)
      throw n === !1 ? new $(
        `Adapter ${r} is not supported by the environment`,
        "ERR_NOT_SUPPORT"
      ) : new Error(
        h.hasOwnProp(de, r) ? `Adapter '${r}' is not available in the build` : `Unknown adapter '${r}'`
      );
    if (!h.isFunction(n))
      throw new TypeError("adapter is not a function");
    return n;
  },
  adapters: de
};
function Ye(t) {
  if (t.cancelToken && t.cancelToken.throwIfRequested(), t.signal && t.signal.aborted)
    throw new ie(null, t);
}
function Wn(t) {
  return Je(t), t.headers = gt.from(t.headers), t.data = Ke.call(
    t,
    t.transformRequest
  ), ["post", "put", "patch"].indexOf(t.method) !== -1 && t.headers.setContentType("application/x-www-form-urlencoded", !1), Xf.getAdapter(t.adapter || Mr.adapter)(t).then(function(e) {
    return Ye(t), e.data = Je.call(
      t,
      t.transformResponse,
      e
    ), e.headers = gt.from(e.headers), e;
  }, function(e) {
    return ti(e) || (Ye(t), e && e.response && (e.response.data = Je.call(
      t,
      t.transformResponse,
      e.response
    ), e.response.headers = gt.from(e.response.headers))), Promise.reject(e);
  });
}
const qn = (t) => t instanceof gt ? t.toJSON() : t;
function zt(t, e) {
  e = e || {};
  const r = {};
  function n(l, f, p) {
    return h.isPlainObject(l) && h.isPlainObject(f) ? h.merge.call({ caseless: p }, l, f) : h.isPlainObject(f) ? h.merge({}, f) : h.isArray(f) ? f.slice() : f;
  }
  function o(l, f, p) {
    if (h.isUndefined(f)) {
      if (!h.isUndefined(l))
        return n(void 0, l, p);
    } else
      return n(l, f, p);
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
  function c(l, f, p) {
    if (p in e)
      return n(l, f);
    if (p in t)
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
    validateStatus: c,
    headers: (l, f) => o(qn(l), qn(f), !0)
  };
  return h.forEach(Object.keys(t).concat(Object.keys(e)), function(l) {
    const f = s[l] || o, p = f(t[l], e[l], l);
    h.isUndefined(p) && f !== c || (r[l] = p);
  }), r;
}
const ri = "1.2.1", zr = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((t, e) => {
  zr[t] = function(r) {
    return typeof r === t || "a" + (e < 1 ? "n " : " ") + t;
  };
});
const Jn = {};
zr.transitional = function(t, e, r) {
  function n(o, i) {
    return "[Axios v" + ri + "] Transitional option '" + o + "'" + i + (r ? ". " + r : "");
  }
  return (o, i, a) => {
    if (t === !1)
      throw new $(
        n(i, " has been removed" + (e ? " in " + e : "")),
        $.ERR_DEPRECATED
      );
    return e && !Jn[i] && (Jn[i] = !0, console.warn(
      n(
        i,
        " has been deprecated since v" + e + " and will be removed in the near future"
      )
    )), t ? t(o, i, a) : !0;
  };
};
function Zf(t, e, r) {
  if (typeof t != "object")
    throw new $("options must be an object", $.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(t);
  let o = n.length;
  for (; o-- > 0; ) {
    const i = n[o], s = e[i];
    if (s) {
      const c = t[i], a = c === void 0 || s(c, i, t);
      if (a !== !0)
        throw new $("option " + i + " must be " + a, $.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0)
      throw new $("Unknown option " + i, $.ERR_BAD_OPTION);
  }
}
const pr = {
  assertOptions: Zf,
  validators: zr
}, St = pr.validators;
let Ee = class {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new zn(),
      response: new zn()
    };
  }
  request(t, e) {
    typeof t == "string" ? (e = e || {}, e.url = t) : e = t || {}, e = zt(this.defaults, e);
    const { transitional: r, paramsSerializer: n, headers: o } = e;
    r !== void 0 && pr.assertOptions(r, {
      silentJSONParsing: St.transitional(St.boolean),
      forcedJSONParsing: St.transitional(St.boolean),
      clarifyTimeoutError: St.transitional(St.boolean)
    }, !1), n !== void 0 && pr.assertOptions(n, {
      encode: St.function,
      serialize: St.function
    }, !0), e.method = (e.method || this.defaults.method || "get").toLowerCase();
    let i;
    i = o && h.merge(
      o.common,
      o[e.method]
    ), i && h.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (d) => {
        delete o[d];
      }
    ), e.headers = gt.concat(i, o);
    const a = [];
    let c = !0;
    this.interceptors.request.forEach(function(d) {
      typeof d.runWhen == "function" && d.runWhen(e) === !1 || (c = c && d.synchronous, a.unshift(d.fulfilled, d.rejected));
    });
    const s = [];
    this.interceptors.response.forEach(function(d) {
      s.push(d.fulfilled, d.rejected);
    });
    let l, f = 0, p;
    if (!c) {
      const d = [Wn.bind(this), void 0];
      for (d.unshift.apply(d, s), d.push.apply(d, a), p = d.length, l = Promise.resolve(e); f < p; )
        l = l.then(d[f++], d[f++]);
      return l;
    }
    p = a.length;
    let v = e;
    for (f = 0; f < p; ) {
      const d = a[f++], b = a[f++];
      try {
        v = d(v);
      } catch (O) {
        b.call(this, O);
        break;
      }
    }
    try {
      l = Wn.call(this, v);
    } catch (d) {
      return Promise.reject(d);
    }
    for (f = 0, p = s.length; f < p; )
      l = l.then(s[f++], s[f++]);
    return l;
  }
  getUri(t) {
    t = zt(this.defaults, t);
    const e = ei(t.baseURL, t.url);
    return Xo(e, t.params, t.paramsSerializer);
  }
};
h.forEach(["delete", "get", "head", "options"], function(t) {
  Ee.prototype[t] = function(e, r) {
    return this.request(zt(r || {}, {
      method: t,
      url: e,
      data: (r || {}).data
    }));
  };
});
h.forEach(["post", "put", "patch"], function(t) {
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
let ni = class {
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
      token: new ni(function(e) {
        t = e;
      }),
      cancel: t
    };
  }
};
const Qf = ni;
function tp(t) {
  return function(e) {
    return t.apply(null, e);
  };
}
function ep(t) {
  return h.isObject(t) && t.isAxiosError === !0;
}
function oi(t) {
  const e = new ve(t), r = Fo(ve.prototype.request, e);
  return h.extend(r, ve.prototype, e, { allOwnKeys: !0 }), h.extend(r, e, null, { allOwnKeys: !0 }), r.create = function(n) {
    return oi(zt(t, n));
  }, r;
}
const Q = oi(Mr);
Q.Axios = ve;
Q.CanceledError = ie;
Q.CancelToken = Qf;
Q.isCancel = ti;
Q.VERSION = ri;
Q.toFormData = Pe;
Q.AxiosError = $;
Q.Cancel = Q.CanceledError;
Q.all = function(t) {
  return Promise.all(t);
};
Q.spread = tp;
Q.isAxiosError = ep;
Q.mergeConfig = zt;
Q.AxiosHeaders = gt;
Q.formToJSON = (t) => Qo(h.isHTMLForm(t) ? new FormData(t) : t);
Q.default = Q;
const rp = Q;
var hr = function(t, e) {
  return hr = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
    r.__proto__ = n;
  } || function(r, n) {
    for (var o in n)
      Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
  }, hr(t, e);
};
function Le(t, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  hr(t, e);
  function r() {
    this.constructor = t;
  }
  t.prototype = e === null ? Object.create(e) : (r.prototype = e.prototype, new r());
}
function dr(t) {
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
function vr(t, e) {
  var r = typeof Symbol == "function" && t[Symbol.iterator];
  if (!r)
    return t;
  var n = r.call(t), o, i = [], a;
  try {
    for (; (e === void 0 || e-- > 0) && !(o = n.next()).done; )
      i.push(o.value);
  } catch (c) {
    a = { error: c };
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
function yr(t, e, r) {
  if (r || arguments.length === 2)
    for (var n = 0, o = e.length, i; n < o; n++)
      (i || !(n in e)) && (i || (i = Array.prototype.slice.call(e, 0, n)), i[n] = e[n]);
  return t.concat(i || Array.prototype.slice.call(e));
}
function bt(t) {
  return typeof t == "function";
}
function Vr(t) {
  var e = function(n) {
    Error.call(n), n.stack = new Error().stack;
  }, r = t(e);
  return r.prototype = Object.create(Error.prototype), r.prototype.constructor = r, r;
}
var Ye = Vr(function(t) {
  return function(e) {
    t(this), this.message = e ? e.length + ` errors occurred during unsubscription:
` + e.map(function(r, n) {
      return n + 1 + ") " + r.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = e;
  };
});
function mr(t, e) {
  if (t) {
    var r = t.indexOf(e);
    0 <= r && t.splice(r, 1);
  }
}
var Ue = function() {
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
            for (var c = dr(a), s = c.next(); !s.done; s = c.next()) {
              var l = s.value;
              l.remove(this);
            }
          } catch (O) {
            e = { error: O };
          } finally {
            try {
              s && !s.done && (r = c.return) && r.call(c);
            } finally {
              if (e)
                throw e.error;
            }
          }
        else
          a.remove(this);
      var f = this.initialTeardown;
      if (bt(f))
        try {
          f();
        } catch (O) {
          i = O instanceof Ke ? O.errors : [O];
        }
      var p = this._finalizers;
      if (p) {
        this._finalizers = null;
        try {
          for (var v = dr(p), d = v.next(); !d.done; d = v.next()) {
            var b = d.value;
            try {
              Yn(b);
            } catch (O) {
              i = i ?? [], O instanceof Ke ? i = yr(yr([], vr(i)), vr(O.errors)) : i.push(O);
            }
          }
        } catch (O) {
          n = { error: O };
        } finally {
          try {
            d && !d.done && (o = v.return) && o.call(v);
          } finally {
            if (n)
              throw n.error;
          }
        }
      }
      if (i)
        throw new Ke(i);
    }
  }, t.prototype.add = function(e) {
    var r;
    if (e && e !== this)
      if (this.closed)
        Yn(e);
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
    r === e ? this._parentage = null : Array.isArray(r) && mr(r, e);
  }, t.prototype.remove = function(e) {
    var r = this._finalizers;
    r && mr(r, e), e instanceof t && e._removeParent(this);
  }, t.EMPTY = function() {
    var e = new t();
    return e.closed = !0, e;
  }(), t;
}(), ii = Ue.EMPTY;
function si(t) {
  return t instanceof Ue || t && "closed" in t && bt(t.remove) && bt(t.add) && bt(t.unsubscribe);
}
function Yn(t) {
  bt(t) ? t() : t.unsubscribe();
}
var si = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1
}, np = {
  setTimeout: function(t, e) {
    for (var r = [], n = 2; n < arguments.length; n++)
      r[n - 2] = arguments[n];
    return setTimeout.apply(void 0, yr([t, e], vr(r)));
  },
  clearTimeout: function(t) {
    return clearTimeout(t);
  },
  delegate: void 0
};
function op(t) {
  np.setTimeout(function() {
    throw t;
  });
}
function Kn() {
}
function ye(t) {
  t();
}
var ui = function(t) {
  Le(e, t);
  function e(r) {
    var n = t.call(this) || this;
    return n.isStopped = !1, r ? (n.destination = r, ai(r) && r.add(n)) : n.destination = up, n;
  }
  return e.create = function(r, n, o) {
    return new gr(r, n, o);
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
}(Ue), ip = Function.prototype.bind;
function Ge(t, e) {
  return ip.call(t, e);
}
var ap = function() {
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
}(), gr = function(t) {
  Le(e, t);
  function e(r, n, o) {
    var i = t.call(this) || this, a;
    if (bt(r) || !r)
      a = {
        next: r ?? void 0,
        error: n ?? void 0,
        complete: o ?? void 0
      };
    else {
      var c;
      i && si.useDeprecatedNextContext ? (c = Object.create(r), c.unsubscribe = function() {
        return i.unsubscribe();
      }, a = {
        next: r.next && Ge(r.next, c),
        error: r.error && Ge(r.error, c),
        complete: r.complete && Ge(r.complete, c)
      }) : a = r;
    }
    return i.destination = new ap(a), i;
  }
  return e;
}(ui);
function le(t) {
  op(t);
}
function sp(t) {
  throw t;
}
var up = {
  closed: !0,
  next: Kn,
  error: sp,
  complete: Kn
}, cp = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function lp(t) {
  return t;
}
function fp(t) {
  return t.length === 0 ? lp : t.length === 1 ? t[0] : function(e) {
    return t.reduce(function(r, n) {
      return n(r);
    }, e);
  };
}
var br = function() {
  function t(e) {
    e && (this._subscribe = e);
  }
  return t.prototype.lift = function(e) {
    var r = new t();
    return r.source = this, r.operator = e, r;
  }, t.prototype.subscribe = function(e, r, n) {
    var o = this, i = hp(e) ? e : new gr(e, r, n);
    return ye(function() {
      var a = o, c = a.operator, s = a.source;
      i.add(c ? c.call(i, s) : s ? o._subscribe(i) : o._trySubscribe(i));
    }), i;
  }, t.prototype._trySubscribe = function(e) {
    try {
      return this._subscribe(e);
    } catch (r) {
      e.error(r);
    }
  }, t.prototype.forEach = function(e, r) {
    var n = this;
    return r = Gn(r), new r(function(o, i) {
      var a = new gr({
        next: function(c) {
          try {
            e(c);
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
  }, t.prototype[cp] = function() {
    return this;
  }, t.prototype.pipe = function() {
    for (var e = [], r = 0; r < arguments.length; r++)
      e[r] = arguments[r];
    return fp(e)(this);
  }, t.prototype.toPromise = function(e) {
    var r = this;
    return e = Gn(e), new e(function(n, o) {
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
function Gn(t) {
  var e;
  return (e = t ?? si.Promise) !== null && e !== void 0 ? e : Promise;
}
function pp(t) {
  return t && bt(t.next) && bt(t.error) && bt(t.complete);
}
function hp(t) {
  return t && t instanceof ui || pp(t) && ai(t);
}
var dp = Vr(function(t) {
  return function() {
    t(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), vp = function(t) {
  Le(e, t);
  function e() {
    var r = t.call(this) || this;
    return r.closed = !1, r.currentObservers = null, r.observers = [], r.isStopped = !1, r.hasError = !1, r.thrownError = null, r;
  }
  return e.prototype.lift = function(r) {
    var n = new Xn(this, this);
    return n.operator = r, n;
  }, e.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new dp();
  }, e.prototype.next = function(r) {
    var n = this;
    ye(function() {
      var o, i;
      if (n._throwIfClosed(), !n.isStopped) {
        n.currentObservers || (n.currentObservers = Array.from(n.observers));
        try {
          for (var a = dr(n.currentObservers), c = a.next(); !c.done; c = a.next()) {
            var s = c.value;
            s.next(r);
          }
        } catch (l) {
          o = { error: l };
        } finally {
          try {
            c && !c.done && (i = a.return) && i.call(a);
          } finally {
            if (o)
              throw o.error;
          }
        }
      }
    });
  }, e.prototype.error = function(r) {
    var n = this;
    ye(function() {
      if (n._throwIfClosed(), !n.isStopped) {
        n.hasError = n.isStopped = !0, n.thrownError = r;
        for (var o = n.observers; o.length; )
          o.shift().error(r);
      }
    });
  }, e.prototype.complete = function() {
    var r = this;
    ye(function() {
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
    var n = this, o = this, i = o.hasError, s = o.isStopped, c = o.observers;
    return i || s ? ii : (this.currentObservers = null, c.push(r), new Ue(function() {
      n.currentObservers = null, mr(c, r);
    }));
  }, e.prototype._checkFinalizedStatuses = function(r) {
    var n = this, o = n.hasError, i = n.thrownError, a = n.isStopped;
    o ? r.error(i) : a && r.complete();
  }, e.prototype.asObservable = function() {
    var r = new br();
    return r.source = this, r;
  }, e.create = function(r, n) {
    return new Xn(r, n);
  }, e;
}(br), Zn = function(t) {
  Le(e, t);
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
    return (o = (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(r)) !== null && o !== void 0 ? o : ii;
  }, e;
}(vp);
Vr(function(t) {
  return function() {
    t(this), this.name = "EmptyError", this.message = "no elements in sequence";
  };
});
class zr {
  constructor(e) {
    rt(this, "config"), rt(this, "axios"), e && (this.config = e), this.axios = rp.create(this.config);
  }
  get interceptors() {
    return this.axios.interceptors;
  }
  static create(e) {
    return new zr(e);
  }
  request(e) {
    return new br((r) => {
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
function yp(t) {
  return zr.create({
    baseURL: t
  });
}
const Z = class {
  constructor(t, e) {
    rt(this, "axiosInstance"), rt(this, "defaultConfig", {
      contentType: "json",
      cache: !1
    }), rt(this, "tokenType"), this.axiosInstance = yp(t), this.setupInterceptor(), e && (this.defaultConfig = {
      ...this.defaultConfig,
      ...e
    });
  }
  static setAuthorizationTokenType(t) {
    Z.tokenType = t;
  }
  static setGlobalParams(t) {
    Z.globalParams = {
      ...Z.globalParams,
      ...t
    };
  }
  static setGlobalData(t) {
    Z.globalData = {
      ...Z.globalData,
      ...t
    };
  }
  static setGlobalHeaders(t) {
    Z.globalHeaders = {
      ...Z.globalHeaders,
      ...t
    };
  }
  static addInterceptor(t) {
    return Z.interceptors.add(t), () => {
      Z.removeInterceptor(t);
    };
  }
  static removeInterceptor(t) {
    Z.interceptors.delete(t);
  }
  setAuthorizationTokenType(t) {
    this.tokenType = t;
  }
  getTokenType(t) {
    return t.tokenType !== void 0 ? t.tokenType : this.tokenType !== void 0 ? this.tokenType : Z.tokenType;
  }
  setupInterceptor() {
    this.axiosInstance.interceptors.request.use(
      async (t) => {
        if (t = await this.useRequestInterceptors(t), t = Nl({}, this.defaultConfig, t), t.headers = {
          ...t.headers,
          ...Z.globalHeaders,
          "Content-Type": t.contentType === "formData" ? !1 : t.contentType === "urlEncoded" ? sr.UrlEncoded : sr.Json
        }, !t.preparedData) {
          if ((typeof t.cache < "u" ? t.cache : this.defaultConfig.cache) === !1 && (t.headers["Cache-Control"] = "no-cache", t.params = {
            ...t.params,
            axios_timestamp: Date.now()
          }), t.params = _e(
            Ln({
              ...t.params,
              ...Z.globalParams
            })
          ), t.data = {
            ...t.data,
            ...X.globalData
          }, Ln(t.data), JSON.stringify(t.data) === "{}")
            t.data = void 0;
          else
            switch (t.contentType) {
              case "formData":
                t.data = ur(t.data);
                break;
              case "urlEncoded":
                t.data = Oe(t.data);
            }
          t.preparedData = !0;
        }
        const e = this.getTokenType(t), r = e ? zl.getToken(e) : null;
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
    for (const e of Z.interceptors)
      e.request && (t = await e.request(t));
    return t;
  }
  async useErrorResponseInterceptor(t) {
    for (const e of Z.interceptors)
      if (e.response && e.response.error)
        try {
          t = await e.response.error(t, this.axiosInstance);
        } catch {
          return t;
        }
    return t;
  }
  async useSuccessResponseInterceptor(t) {
    for (const e of Z.interceptors)
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
let Ft = Z;
rt(Ft, "tokenType", "base_token"), rt(Ft, "globalParams", {}), rt(Ft, "globalData", {}), rt(Ft, "globalHeaders", {}), rt(Ft, "interceptors", /* @__PURE__ */ new Set());
var Zt = {}, mp = {
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
var Xe, Zn;
function ci() {
  if (Zn)
    return Xe;
  Zn = 1;
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
      for (var a = {}, c = 0; c < 10; c++)
        a["_" + String.fromCharCode(c)] = c;
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
    for (var c, s = n(i), l, f = 1; f < arguments.length; f++) {
      c = Object(arguments[f]);
      for (var p in c)
        e.call(c, p) && (s[p] = c[p]);
      if (t) {
        l = t(c);
        for (var v = 0; v < l.length; v++)
          r.call(c, l[v]) && (s[l[v]] = c[l[v]]);
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
var Qn;
function gp() {
  if (Qn)
    return It;
  Qn = 1, ci();
  var t = Qt, e = 60103;
  if (It.Fragment = 60107, typeof Symbol == "function" && Symbol.for) {
    var r = Symbol.for;
    e = r("react.element"), It.Fragment = r("react.fragment");
  }
  var n = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = Object.prototype.hasOwnProperty, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function a(c, s, l) {
    var f, p = {}, v = null, d = null;
    l !== void 0 && (v = "" + l), s.key !== void 0 && (v = "" + s.key), s.ref !== void 0 && (d = s.ref);
    for (f in s)
      o.call(s, f) && !i.hasOwnProperty(f) && (p[f] = s[f]);
    if (c && c.defaultProps)
      for (f in s = c.defaultProps, s)
        p[f] === void 0 && (p[f] = s[f]);
    return { $$typeof: e, type: c, key: v, ref: d, props: p, _owner: n.current };
  }
  return It.jsx = a, It.jsxs = a, It;
}
var to = {};
/** @license React v17.0.2
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var eo;
function bp() {
  return eo || (eo = 1, function(t) {
    process.env.NODE_ENV !== "production" && function() {
      var e = Qt, r = ci(), n = 60103, o = 60106;
      t.Fragment = 60107;
      var i = 60108, a = 60114, c = 60109, s = 60110, l = 60112, f = 60113, p = 60120, v = 60115, d = 60116, b = 60121, O = 60122, T = 60117, M = 60129, J = 60131;
      if (typeof Symbol == "function" && Symbol.for) {
        var E = Symbol.for;
        n = E("react.element"), o = E("react.portal"), t.Fragment = E("react.fragment"), i = E("react.strict_mode"), a = E("react.profiler"), c = E("react.provider"), s = E("react.context"), l = E("react.forward_ref"), f = E("react.suspense"), p = E("react.suspense_list"), v = E("react.memo"), d = E("react.lazy"), b = E("react.block"), O = E("react.server.block"), T = E("react.fundamental"), E("react.scope"), E("react.opaque.id"), M = E("react.debug_trace_mode"), E("react.offscreen"), J = E("react.legacy_hidden");
      }
      var D = typeof Symbol == "function" && Symbol.iterator, B = "@@iterator";
      function V(u) {
        if (u === null || typeof u != "object")
          return null;
        var y = N && u[N] || u[z];
        return typeof y == "function" ? y : null;
      }
      var tt = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function z(u) {
        {
          for (var y = arguments.length, O = new Array(y > 1 ? y - 1 : 0), S = 1; S < y; S++)
            O[S - 1] = arguments[S];
          L("error", u, O);
        }
      }
      function L(u, y, O) {
        {
          var S = tt.ReactDebugCurrentFrame, I = S.getStackAddendum();
          I !== "" && (y += "%s", O = O.concat([I]));
          var M = O.map(function(k) {
            return "" + k;
          });
          F.unshift("Warning: " + y), Function.prototype.apply.call(console[u], console, F);
        }
      }
      var P = !1;
      function Et(u) {
        return !!(typeof u == "string" || typeof u == "function" || u === t.Fragment || u === a || u === M || u === i || u === f || u === p || u === J || P || typeof u == "object" && u !== null && (u.$$typeof === d || u.$$typeof === v || u.$$typeof === c || u.$$typeof === s || u.$$typeof === l || u.$$typeof === T || u.$$typeof === b || u[0] === O));
      }
      function se(u, y, O) {
        var S = y.displayName || y.name || "";
        return u.displayName || (S !== "" ? O + "(" + S + ")" : O);
      }
      function j(u) {
        return u.displayName || "Context";
      }
      function g(u) {
        if (u == null)
          return null;
        if (typeof u.tag == "number" && z("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue."), typeof u == "function")
          return u.displayName || u.name || null;
        if (typeof u == "string")
          return u;
        switch (u) {
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
          case p:
            return "SuspenseList";
        }
        if (typeof u == "object")
          switch (u.$$typeof) {
            case s:
              var y = u;
              return j(y) + ".Consumer";
            case c:
              var O = u;
              return j(O._context) + ".Provider";
            case l:
              return ae(u, u.render, "ForwardRef");
            case v:
              return g(u.type);
            case b:
              return g(u._render);
            case d: {
              var S = u, I = S._payload, F = S._init;
              try {
                return g(F(I));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var m = 0, A, w, T, x, U, q, H;
      function G() {
      }
      G.__reactDisabledLog = !0;
      function ut() {
        {
          if (m === 0) {
            A = console.log, w = console.info, T = console.warn, x = console.error, U = console.group, q = console.groupCollapsed, H = console.groupEnd;
            var u = {
              configurable: !0,
              enumerable: !0,
              value: G,
              writable: !0
            };
            Object.defineProperties(console, {
              info: u,
              log: u,
              warn: u,
              error: u,
              group: u,
              groupCollapsed: u,
              groupEnd: u
            });
          }
          m++;
        }
      }
      function it() {
        {
          if (m--, m === 0) {
            var u = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: r({}, u, {
                value: R
              }),
              info: r({}, u, {
                value: w
              }),
              warn: r({}, u, {
                value: A
              }),
              error: r({}, u, {
                value: x
              }),
              group: r({}, u, {
                value: U
              }),
              groupCollapsed: r({}, u, {
                value: q
              }),
              groupEnd: r({}, u, {
                value: H
              })
            });
          }
          m < 0 && z("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var dt = tt.ReactCurrentDispatcher, vt;
      function st(u, y, O) {
        {
          if (vt === void 0)
            try {
              throw Error();
            } catch (I) {
              var S = I.stack.trim().match(/\n( *(at )?)/);
              vt = S && S[1] || "";
            }
          return `
` + vt + u;
        }
      }
      var X = !1, ot;
      {
        var zt = typeof WeakMap == "function" ? WeakMap : Map;
        ot = new zt();
      }
      function At(u, y) {
        if (!u || X)
          return "";
        {
          var O = ot.get(u);
          if (O !== void 0)
            return O;
        }
        var S;
        X = !0;
        var I = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var F;
        F = dt.current, dt.current = null, ut();
        try {
          if (y) {
            var k = function() {
              throw Error();
            };
            if (Object.defineProperty(k.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(k, []);
              } catch (mt) {
                S = mt;
              }
              Reflect.construct(u, [], k);
            } else {
              try {
                k.call();
              } catch (mt) {
                S = mt;
              }
              u.call(k.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (mt) {
              S = mt;
            }
            u();
          }
        } catch (mt) {
          if (mt && S && typeof mt.stack == "string") {
            for (var C = mt.stack.split(`
`), et = S.stack.split(`
`), Y = C.length - 1, K = et.length - 1; Y >= 1 && K >= 0 && C[Y] !== et[K]; )
              K--;
            for (; Y >= 1 && K >= 0; Y--, K--)
              if (C[Y] !== et[K]) {
                if (Y !== 1 || K !== 1)
                  do
                    if (Y--, K--, K < 0 || C[Y] !== et[K]) {
                      var yt = `
` + C[Y].replace(" at new ", " at ");
                      return typeof u == "function" && ot.set(u, yt), yt;
                    }
                  while (Y >= 1 && K >= 0);
                break;
              }
          }
        } finally {
          X = !1, dt.current = F, it(), Error.prepareStackTrace = I;
        }
        var kt = u ? u.displayName || u.name : "", en = kt ? st(kt) : "";
        return typeof u == "function" && ot.set(u, en), en;
      }
      function Hr(u, y, O) {
        return Tt(u, !1);
      }
      function fi(u) {
        var y = u.prototype;
        return !!(y && y.isReactComponent);
      }
      function ae(u, y, O) {
        if (u == null)
          return "";
        if (typeof u == "function")
          return At(u, fi(u));
        if (typeof u == "string")
          return at(u);
        switch (u) {
          case f:
            return at("Suspense");
          case p:
            return at("SuspenseList");
        }
        if (typeof u == "object")
          switch (u.$$typeof) {
            case l:
              return Hr(u.render);
            case v:
              return ae(u.type, y, O);
            case b:
              return Hr(u._render);
            case d: {
              var S = u, I = S._payload, F = S._init;
              try {
                return ae(M(I), y, O);
              } catch {
              }
            }
          }
        return "";
      }
      var Wr = {}, qr = tt.ReactDebugCurrentFrame;
      function ue(u) {
        if (u) {
          var y = u._owner, O = ae(u.type, u._source, y ? y.type : null);
          qr.setExtraStackFrame(O);
        } else
          qr.setExtraStackFrame(null);
      }
      function pi(u, y, O, S, I) {
        {
          var M = Function.call.bind(Object.prototype.hasOwnProperty);
          for (var k in u)
            if (M(u, k)) {
              var P = void 0;
              try {
                if (typeof u[k] != "function") {
                  var et = Error((S || "React class") + ": " + O + " type `" + k + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof u[k] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw et.name = "Invariant Violation", et;
                }
                P = u[k](y, k, S, O, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (J) {
                P = J;
              }
              P && !(P instanceof Error) && (ue(I), z("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", S || "React class", O, k, typeof P), ue(null)), P instanceof Error && !(P.message in Wr) && (Wr[P.message] = !0, ue(I), z("Failed %s type: %s", O, P.message), ue(null));
            }
        }
      }
      var Ht = tt.ReactCurrentOwner, ke = Object.prototype.hasOwnProperty, hi = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, Jr, Yr, Ie;
      Ie = {};
      function di(u) {
        if (ke.call(u, "ref")) {
          var y = Object.getOwnPropertyDescriptor(u, "ref").get;
          if (y && y.isReactWarning)
            return !1;
        }
        return u.ref !== void 0;
      }
      function vi(u) {
        if (ke.call(u, "key")) {
          var y = Object.getOwnPropertyDescriptor(u, "key").get;
          if (y && y.isReactWarning)
            return !1;
        }
        return u.key !== void 0;
      }
      function yi(u, y) {
        if (typeof u.ref == "string" && Ht.current && y && Ht.current.stateNode !== y) {
          var O = g(Ht.current.type);
          Ie[O] || (z('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', g(Ht.current.type), u.ref), Ie[O] = !0);
        }
      }
      function mi(u, y) {
        {
          var O = function() {
            Kr || (Kr = !0, z("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
          };
          O.isReactWarning = !0, Object.defineProperty(u, "key", {
            get: O,
            configurable: !0
          });
        }
      }
      function gi(u, y) {
        {
          var O = function() {
            Jr || (Jr = !0, z("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
          };
          O.isReactWarning = !0, Object.defineProperty(u, "ref", {
            get: O,
            configurable: !0
          });
        }
      }
      var bi = function(u, y, O, S, I, M, k) {
        var P = {
          $$typeof: n,
          type: u,
          key: y,
          ref: O,
          props: k,
          _owner: M
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
          value: S
        }), Object.defineProperty(C, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: I
        }), Object.freeze && (Object.freeze(C.props), Object.freeze(C)), C;
      };
      function Oi(u, y, O, S, I) {
        {
          var M, k = {}, P = null, et = null;
          O !== void 0 && (P = "" + O), vi(y) && (P = "" + y.key), di(y) && (et = y.ref, yi(y, I));
          for (M in y)
            ke.call(y, M) && !hi.hasOwnProperty(M) && (k[M] = y[M]);
          if (u && u.defaultProps) {
            var J = u.defaultProps;
            for (M in J)
              k[M] === void 0 && (k[M] = J[M]);
          }
          if (P || et) {
            var Y = typeof u == "function" ? u.displayName || u.name || "Unknown" : u;
            P && mi(k, Y), et && gi(k, Y);
          }
          return bi(u, P, et, I, S, Ht.current, k);
        }
      }
      var Me = tt.ReactCurrentOwner, Yr = tt.ReactDebugCurrentFrame;
      function Ut(u) {
        if (u) {
          var y = u._owner, O = ae(u.type, u._source, y ? y.type : null);
          Yr.setExtraStackFrame(O);
        } else
          Kr.setExtraStackFrame(null);
      }
      var Me;
      Me = !1;
      function ze(u) {
        return typeof u == "object" && u !== null && u.$$typeof === n;
      }
      function Gr() {
        {
          if (Fe.current) {
            var u = g(Fe.current.type);
            if (u)
              return `

Check the render method of \`` + u + "`.";
          }
          return "";
        }
      }
      function wi(u) {
        {
          if (u !== void 0) {
            var y = u.fileName.replace(/^.*[\\\/]/, ""), O = u.lineNumber;
            return `

Check your code at ` + y + ":" + O + ".";
          }
          return "";
        }
      }
      var Xr = {};
      function Oi(u) {
        {
          var y = Gr();
          if (!y) {
            var O = typeof u == "string" ? u : u.displayName || u.name;
            O && (y = `

Check the top-level render call using <` + O + ">.");
          }
          return y;
        }
      }
      function Zr(u, y) {
        {
          if (!u._store || u._store.validated || u.key != null)
            return;
          u._store.validated = !0;
          var O = _i(y);
          if (Zr[O])
            return;
          Zr[O] = !0;
          var S = "";
          u && u._owner && u._owner !== Me.current && (S = " It was passed a child from " + g(u._owner.type) + "."), Ut(u), z('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', O, S), Ut(null);
        }
      }
      function Qr(u, y) {
        {
          if (typeof u != "object")
            return;
          if (Array.isArray(u))
            for (var O = 0; O < u.length; O++) {
              var S = u[O];
              Be(S) && Xr(S, y);
            }
          else if (ze(u))
            u._store && (u._store.validated = !0);
          else if (u) {
            var I = V(u);
            if (typeof I == "function" && I !== u.entries)
              for (var M = I.call(u), k; !(k = M.next()).done; )
                Be(k.value) && Xr(k.value, y);
          }
        }
      }
      function Ei(u) {
        {
          var y = u.type;
          if (y == null || typeof y == "string")
            return;
          var O;
          if (typeof y == "function")
            O = y.propTypes;
          else if (typeof y == "object" && (y.$$typeof === l || y.$$typeof === v))
            O = y.propTypes;
          else
            return;
          if (O) {
            var S = g(y);
            pi(O, u.props, "prop", S, u);
          } else if (y.PropTypes !== void 0 && !Fe) {
            Fe = !0;
            var I = g(y);
            z("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", I || "Unknown");
          }
          typeof y.getDefaultProps == "function" && !y.getDefaultProps.isReactClassApproved && z("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Si(u) {
        {
          for (var y = Object.keys(u.props), O = 0; O < y.length; O++) {
            var S = y[O];
            if (S !== "children" && S !== "key") {
              Ut(u), z("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", S), Ut(null);
              break;
            }
          }
          u.ref !== null && (Ut(u), z("Invalid attribute `ref` supplied to `React.Fragment`."), Ut(null));
        }
      }
      function tn(u, y, O, S, I, M) {
        {
          var k = Et(u);
          if (!k) {
            var P = "";
            (u === void 0 || typeof u == "object" && u !== null && Object.keys(u).length === 0) && (P += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var et = wi(I);
            et ? P += et : P += Gr();
            var J;
            u === null ? J = "null" : Array.isArray(u) ? J = "array" : u !== void 0 && u.$$typeof === n ? (J = "<" + (g(u.type) || "Unknown") + " />", P = " Did you accidentally export a JSX literal instead of a component?") : J = typeof u, z("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", J, P);
          }
          var Y = Oi(u, y, O, I, M);
          if (Y == null)
            return Y;
          if (k) {
            var yt = y.children;
            if (yt !== void 0)
              if (S)
                if (Array.isArray(yt)) {
                  for (var kt = 0; kt < yt.length; kt++)
                    Qr(yt[kt], u);
                  Object.freeze && Object.freeze(yt);
                } else
                  z("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
              else
                Qr(yt, u);
          }
          return u === t.Fragment ? Si(K) : Ei(K), K;
        }
      }
      function ji(u, y, O) {
        return tn(u, y, O, !0);
      }
      function Ai(u, y, O) {
        return tn(u, y, O, !1);
      }
      var xi = Ri, Ai = ji;
      t.jsx = xi, t.jsxs = Ai;
    }();
  }(to)), to;
}
(function(t) {
  process.env.NODE_ENV === "production" ? t.exports = gp() : t.exports = bp();
})(mp);
const li = Xt.Fragment, me = Xt.jsx;
Xt.jsxs;
var ro = {}, Op = {
  get exports() {
    return ro;
  },
  set exports(t) {
    ro = t;
  }
};
(function(t, e) {
  (function(r, n) {
    t.exports = n();
  })(gf, function() {
    var r = 1e3, n = 6e4, o = 36e5, i = "millisecond", a = "second", c = "minute", s = "hour", l = "day", f = "week", p = "month", v = "quarter", d = "year", b = "date", O = "Invalid Date", T = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, M = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, J = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(j) {
      var g = ["th", "st", "nd", "rd"], m = j % 100;
      return "[" + j + (g[(m - 20) % 10] || g[m] || g[0]) + "]";
    } }, E = function(j, g, m) {
      var A = String(j);
      return !A || A.length >= g ? j : "" + Array(g + 1 - A.length).join(m) + j;
    }, D = { s: E, z: function(j) {
      var g = -j.utcOffset(), m = Math.abs(g), A = Math.floor(m / 60), w = m % 60;
      return (g <= 0 ? "+" : "-") + E(A, 2, "0") + ":" + E(w, 2, "0");
    }, m: function j(g, m) {
      if (g.date() < m.date())
        return -j(m, g);
      var A = 12 * (m.year() - g.year()) + (m.month() - g.month()), w = g.clone().add(A, p), T = m - w < 0, x = g.clone().add(A + (T ? -1 : 1), p);
      return +(-(A + (m - w) / (T ? w - x : x - w)) || 0);
    }, a: function(j) {
      return j < 0 ? Math.ceil(j) || 0 : Math.floor(j);
    }, p: function(j) {
      return { M: p, y: d, w: f, d: l, D: b, h: s, m: c, s: a, ms: i, Q: v }[j] || String(j || "").toLowerCase().replace(/s$/, "");
    }, u: function(j) {
      return j === void 0;
    } }, B = "en", V = {};
    V[B] = K;
    var tt = function(j) {
      return j instanceof Et;
    }, z = function j(g, m, A) {
      var w;
      if (!g)
        return z;
      if (typeof g == "string") {
        var T = g.toLowerCase();
        V[T] && (w = T), m && (V[T] = m, w = T);
        var x = g.split("-");
        if (!w && x.length > 1)
          return j(x[0]);
      } else {
        var U = g.name;
        V[U] = g, w = U;
      }
      return !A && w && (B = w), w || !A && B;
    }, L = function(j, g) {
      if (tt(j))
        return j.clone();
      var m = typeof g == "object" ? g : {};
      return m.date = j, m.args = arguments, new Et(m);
    }, C = D;
    C.l = z, C.i = tt, C.w = function(j, g) {
      return L(j, { locale: g.$L, utc: g.$u, x: g.$x, $offset: g.$offset });
    };
    var Et = function() {
      function j(m) {
        this.$L = z(m.locale, null, !0), this.parse(m);
      }
      var g = j.prototype;
      return g.parse = function(m) {
        this.$d = function(A) {
          var w = A.date, T = A.utc;
          if (w === null)
            return new Date(NaN);
          if (C.u(w))
            return new Date();
          if (w instanceof Date)
            return new Date(w);
          if (typeof w == "string" && !/Z$/i.test(w)) {
            var x = w.match(R);
            if (x) {
              var U = x[2] - 1 || 0, q = (x[7] || "0").substring(0, 3);
              return T ? new Date(Date.UTC(x[1], U, x[3] || 1, x[4] || 0, x[5] || 0, x[6] || 0, q)) : new Date(x[1], U, x[3] || 1, x[4] || 0, x[5] || 0, x[6] || 0, q);
            }
          }
          return new Date(w);
        }(m), this.$x = m.x || {}, this.init();
      }, g.init = function() {
        var m = this.$d;
        this.$y = m.getFullYear(), this.$M = m.getMonth(), this.$D = m.getDate(), this.$W = m.getDay(), this.$H = m.getHours(), this.$m = m.getMinutes(), this.$s = m.getSeconds(), this.$ms = m.getMilliseconds();
      }, g.$utils = function() {
        return P;
      }, g.isValid = function() {
        return this.$d.toString() !== _;
      }, g.isSame = function(m, A) {
        var w = L(m);
        return this.startOf(A) <= w && w <= this.endOf(A);
      }, g.isAfter = function(m, A) {
        return L(m) < this.startOf(A);
      }, g.isBefore = function(m, A) {
        return this.endOf(A) < L(m);
      }, g.$g = function(m, A, w) {
        return C.u(m) ? this[A] : this.set(w, m);
      }, g.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, g.valueOf = function() {
        return this.$d.getTime();
      }, g.startOf = function(m, A) {
        var w = this, T = !!C.u(A) || A, x = C.p(m), U = function(st, Z) {
          var ot = C.w(w.$u ? Date.UTC(w.$y, Z, st) : new Date(w.$y, Z, st), w);
          return T ? ot : ot.endOf(l);
        }, q = function(st, Z) {
          return C.w(w.toDate()[st].apply(w.toDate("s"), (T ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(Z)), w);
        }, H = this.$W, G = this.$M, ut = this.$D, it = "set" + (this.$u ? "UTC" : "");
        switch (x) {
          case d:
            return T ? U(1, 0) : U(31, 11);
          case p:
            return T ? U(1, G) : U(0, G + 1);
          case f:
            var dt = this.$locale().weekStart || 0, vt = (H < dt ? H + 7 : H) - dt;
            return U(T ? ut - vt : ut + (6 - vt), G);
          case l:
          case b:
            return q(it + "Hours", 0);
          case s:
            return q(it + "Minutes", 1);
          case c:
            return q(it + "Seconds", 2);
          case a:
            return q(it + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, g.endOf = function(m) {
        return this.startOf(m, !1);
      }, g.$set = function(m, A) {
        var w, T = C.p(m), x = "set" + (this.$u ? "UTC" : ""), U = (w = {}, w[l] = x + "Date", w[b] = x + "Date", w[p] = x + "Month", w[d] = x + "FullYear", w[a] = x + "Hours", w[c] = x + "Minutes", w[s] = x + "Seconds", w[i] = x + "Milliseconds", w)[T], q = T === l ? this.$D + (A - this.$W) : A;
        if (T === p || T === d) {
          var H = this.clone().set(b, 1);
          H.$d[U](q), H.init(), this.$d = H.set(b, Math.min(this.$D, H.daysInMonth())).$d;
        } else
          U && this.$d[U](q);
        return this.init(), this;
      }, g.set = function(m, R) {
        return this.clone().$set(m, R);
      }, g.get = function(m) {
        return this[C.p(m)]();
      }, g.add = function(m, A) {
        var w, T = this;
        m = Number(m);
        var x = C.p(A), U = function(G) {
          var ut = L(T);
          return C.w(ut.date(ut.date() + Math.round(G * m)), T);
        };
        if (x === p)
          return this.set(p, this.$M + m);
        if (x === d)
          return this.set(d, this.$y + m);
        if (x === l)
          return U(1);
        if (x === f)
          return U(7);
        var q = (w = {}, w[c] = n, w[a] = o, w[s] = r, w)[x] || 1, H = this.$d.getTime() + m * q;
        return C.w(H, this);
      }, g.subtract = function(m, A) {
        return this.add(-1 * m, A);
      }, g.format = function(m) {
        var A = this, w = this.$locale();
        if (!this.isValid())
          return w.invalidDate || _;
        var T = m || "YYYY-MM-DDTHH:mm:ssZ", x = C.z(this), U = this.$H, q = this.$m, H = this.$M, G = w.weekdays, ut = w.months, it = function(Z, ot, zt, Tt) {
          return Z && (Z[ot] || Z(A, T)) || zt[ot].slice(0, Tt);
        }, dt = function(Z) {
          return C.s(U % 12 || 12, Z, "0");
        }, vt = w.meridiem || function(Z, ot, zt) {
          var Tt = Z < 12 ? "AM" : "PM";
          return zt ? Tt.toLowerCase() : Tt;
        }, st = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: H + 1, MM: C.s(H + 1, 2, "0"), MMM: it(w.monthsShort, H, ut, 3), MMMM: it(ut, H), D: this.$D, DD: C.s(this.$D, 2, "0"), d: String(this.$W), dd: it(w.weekdaysMin, this.$W, G, 2), ddd: it(w.weekdaysShort, this.$W, G, 3), dddd: G[this.$W], H: String(U), HH: C.s(U, 2, "0"), h: dt(1), hh: dt(2), a: vt(U, q, !0), A: vt(U, q, !1), m: String(q), mm: C.s(q, 2, "0"), s: String(this.$s), ss: C.s(this.$s, 2, "0"), SSS: C.s(this.$ms, 3, "0"), Z: x };
        return T.replace(F, function(Z, ot) {
          return ot || st[Z] || x.replace(":", "");
        });
      }, g.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, g.diff = function(m, A, w) {
        var T, x = C.p(A), U = L(m), q = (U.utcOffset() - this.utcOffset()) * n, H = this - U, G = C.m(this, U);
        return G = (T = {}, T[d] = G / 12, T[p] = G, T[v] = G / 3, T[f] = (H - q) / 6048e5, T[l] = (H - q) / 864e5, T[a] = H / o, T[c] = H / n, T[s] = H / r, T)[x] || H, w ? G : C.a(G);
      }, g.daysInMonth = function() {
        return this.endOf(p).$D;
      }, g.$locale = function() {
        return V[this.$L];
      }, g.locale = function(m, A) {
        if (!m)
          return this.$L;
        var w = this.clone(), T = z(m, A, !0);
        return T && (w.$L = T), w;
      }, g.clone = function() {
        return P.w(this.$d, this);
      }, g.toDate = function() {
        return new Date(this.valueOf());
      }, g.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, g.toISOString = function() {
        return this.$d.toISOString();
      }, g.toString = function() {
        return this.$d.toUTCString();
      }, j;
    }(), se = Et.prototype;
    return L.prototype = se, [["$ms", i], ["$s", s], ["$m", c], ["$H", a], ["$W", l], ["$M", p], ["$y", d], ["$D", b]].forEach(function(j) {
      se[j[1]] = function(g) {
        return this.$g(g, j[0], j[1]);
      };
    }), L.extend = function(j, g) {
      return j.$i || (j(g, Et, L), j.$i = !0), L;
    }, L.locale = z, L.isDayjs = tt, L.unix = function(j) {
      return L(1e3 * j);
    }, L.en = V[B], L.Ls = V, L.p = {}, L;
  });
})(Op);
var no = {}, wp = {
  get exports() {
    return no;
  },
  set exports(t) {
    no = t;
  }
}, Ze = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var oo;
function Op() {
  if (oo)
    return Ze;
  oo = 1;
  var t = Qt;
  function e(p, v) {
    return p === v && (p !== 0 || 1 / p === 1 / v) || p !== p && v !== v;
  }
  var r = typeof Object.is == "function" ? Object.is : e, n = t.useState, o = t.useEffect, i = t.useLayoutEffect, a = t.useDebugValue;
  function c(p, v) {
    var d = v(), b = n({ inst: { value: d, getSnapshot: v } }), O = b[0].inst, T = b[1];
    return i(function() {
      O.value = d, O.getSnapshot = v, s(O) && T({ inst: O });
    }, [p, d, v]), o(function() {
      return s(O) && T({ inst: O }), p(function() {
        s(O) && T({ inst: O });
      });
    }, [p]), a(d), d;
  }
  function s(p) {
    var v = p.getSnapshot;
    p = p.value;
    try {
      var d = v();
      return !r(p, d);
    } catch {
      return !0;
    }
  }
  function l(p, v) {
    return v();
  }
  var f = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? l : c;
  return Ze.useSyncExternalStore = t.useSyncExternalStore !== void 0 ? t.useSyncExternalStore : f, Ze;
}
var io = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ao;
function Ep() {
  return ao || (ao = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var t = Qt, e = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function r(E) {
      {
        for (var D = arguments.length, B = new Array(D > 1 ? D - 1 : 0), V = 1; V < D; V++)
          B[V - 1] = arguments[V];
        n("error", E, B);
      }
    }
    function n(E, N, z) {
      {
        var V = e.ReactDebugCurrentFrame, tt = V.getStackAddendum();
        tt !== "" && (D += "%s", B = B.concat([tt]));
        var z = B.map(function(L) {
          return String(L);
        });
        z.unshift("Warning: " + D), Function.prototype.apply.call(console[E], console, z);
      }
    }
    function o(E, N) {
      return E === N && (E !== 0 || 1 / E === 1 / N) || E !== E && N !== N;
    }
    var i = typeof Object.is == "function" ? Object.is : o, a = t.useState, c = t.useEffect, s = t.useLayoutEffect, l = t.useDebugValue, f = !1, p = !1;
    function v(E, N, z) {
      f || t.startTransition !== void 0 && (f = !0, r("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
      var V = D();
      if (!p) {
        var tt = D();
        i(V, tt) || (r("The result of getSnapshot should be cached to avoid an infinite loop"), p = !0);
      }
      var z = s({
        inst: {
          value: V,
          getSnapshot: D
        }
      }), L = z[0].inst, C = z[1];
      return a(function() {
        L.value = V, L.getSnapshot = D, d(L) && C({
          inst: L
        });
      }, [E, V, D]), c(function() {
        d(L) && C({
          inst: L
        });
        var Et = function() {
          d(L) && C({
            inst: L
          });
        };
        return E(Et);
      }, [E]), l(V), V;
    }
    function d(E) {
      var N = E.getSnapshot, z = E.value;
      try {
        var V = D();
        return !i(B, V);
      } catch {
        return !0;
      }
    }
    function b(E, N, z) {
      return N();
    }
    var O = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", T = !O, M = T ? b : v, J = t.useSyncExternalStore !== void 0 ? t.useSyncExternalStore : M;
    io.useSyncExternalStore = J, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), io;
}
(function(t) {
  process.env.NODE_ENV === "production" ? t.exports = _p() : t.exports = Ep();
})(wp);
const Sp = () => !0;
class jp extends Il {
  constructor() {
    super(...arguments), rt(this, "middlewareHandler", Sp), rt(this, "_routes", []);
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
    const r = kl([...e, ...this._routes], "path");
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
new jp();
so(
  void 0
);
so(void 0);
const Rp = Qt.createContext(void 0), xp = (t) => {
  const e = Ti(Rp);
  if (!e)
    throw new Error("useAuthorization must be used in AuthorizationProvider");
  return {
    granted: Di(() => t ? e.can(t) : !0, [t, e.can]),
    ...e
  };
};
uo(
  ({ permissions: t, children: e, guestView: r }) => {
    const { granted: n } = xp(t);
    return typeof e == "function" ? e(n) : /* @__PURE__ */ me(li, { children: n ? e : r });
  }
);
function pt(t, e) {
  return () => {
    const r = new Ft(t().baseURL, t());
    return Tl(e, (n) => (...o) => n(r, ...o));
  };
}
const Ap = ({
  route: { component: t, ...e }
}) => {
  var r;
  return /* @__PURE__ */ me(li, { children: (r = e.routes) != null && r.length && !e.element && !t ? /* @__PURE__ */ me(Wi, {}) : e.element || (t ? /* @__PURE__ */ me(t, {}) : null) });
};
uo(Ap);
class Tp {
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
const ht = new Tp(), Bp = pt(
  () => ({
    baseURL: `${ht.getApiUrl()}/api/v1/account`
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
var Dp = /* @__PURE__ */ ((t) => (t.INVITATION_EXISTS = "INVITATION_EXISTS", t.USER_IS_EXISTS = "USER_IS_EXISTS", t))(Dp || {}), Np = /* @__PURE__ */ ((t) => (t.TOKEN_VALID = "TOKEN_VALID", t.TOKEN_INVALID = "TOKEN_INVALID", t.INVITATION_NOT_EXISTS = "INVITATION_NOT_EXISTS", t.USER_ACTIVE = "USER_ACTIVE", t))(Np || {});
const Hp = pt(
  () => ({
    baseURL: `${ht.getApiUrl()}/api/v1/account/agent`
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
var Pp = /* @__PURE__ */ ((t) => (t.Full = "24/7", t.Custom = "CUSTOM", t))(Pp || {}), Cp = /* @__PURE__ */ ((t) => (t.Monday = "MONDAY", t.Tuesday = "TUESDAY", t.Wednesday = "WEDNESDAY", t.Thursday = "THURSDAY", t.Friday = "FRIDAY", t.Saturday = "SATURDAY", t.Sunday = "SUNDAY", t))(Cp || {});
const qp = pt(
  () => ({
    baseURL: `${ht.getApiUrl()}/api/v1/customer`
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
    }
  }
);
var $p = /* @__PURE__ */ ((t) => (t.Plain = "Plain", t.Login = "Login", t.MD5 = "CRAM - MD5", t))($p || {}), Lp = /* @__PURE__ */ ((t) => (t.Both = "both", t.Incoming = "incoming", t.Outgoing = "outgoing", t))(Lp || {}), Up = /* @__PURE__ */ ((t) => (t.CUSTOM = "CUSTOM", t.MOOSEDESK = "MOOSEDESK", t))(Up || {}), kp = /* @__PURE__ */ ((t) => (t.GMAIL = "GMAIL", t.OUTLOOK = "OUTLOOK", t.OTHER = "OTHER", t.MOOSEDESK = "MOOSEDESK", t))(kp || {});
const Kp = pt(
  () => ({
    baseURL: `${ht.getApiUrl()}/api/v1/email-integration`
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
    }
  }
), Jp = pt(
  () => ({
    baseURL: `${ht.getApiUrl()}/api/v1/store`
  }),
  {
    getStore(t, e) {
      return t.get("/store-id", e);
    }
  }
), Yp = pt(
  () => ({
    baseURL: `${ht.getApiUrl()}/api/v1/tag`
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
    }
  }
);
var Ip = /* @__PURE__ */ ((t) => (t.Highest = "Highest", t.High = "High", t.Medium = "Medium", t.Low = "Low", t.Lowest = "Lowest", t))(Ip || {}), Mp = /* @__PURE__ */ ((t) => (t.PENDING = "PENDING", t.OPEN = "OPEN", t.RESOLVED = "RESOLVED", t))(Mp || {});
const Gp = [
  {
    label: "PENDING",
    value: "PENDING"
  },
  {
    label: "OPEN",
    value: "OPEN"
  },
  {
    label: "RESOLVED",
    value: "RESOLVED"
  }
], Zp = [
  {
    label: "Highest",
    value: "Highest"
  },
  {
    label: "High",
    value: "High"
  },
  {
    label: "Medium",
    value: "Medium"
  },
  {
    label: "Low",
    value: "Low"
  },
  {
    label: "Lowest",
    value: "Lowest"
  }
], Xp = pt(
  () => ({
    baseURL: `${ht.getApiUrl()}/api/v1/ticket`
  }),
  {
    getList(t, e) {
      return t.get("", e);
    },
    getListTrash(t, e) {
      return t.get("/trash", e);
    },
    getOne(t, e) {
      return t.get(`/${e}`);
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
    update(t, e, r) {
      return t.put(`/${e}`, r);
    },
    delete(t, e) {
      return t.delete("", {}, { data: e });
    },
    deletePermanently(t, e) {
      return t.delete("/permanently", {}, { data: e });
    }
  }
);
var Fp = /* @__PURE__ */ ((t) => (t.READ_PRODUCTS = "read_products", t))(Fp || {}), Bp = /* @__PURE__ */ ((t) => (t.Admin = "Admin", t.BasicAgent = "BasicAgent", t.AgentLeader = "AgentLeader", t))(Bp || {});
const Qp = pt(
  () => ({
    baseURL: `${ht.getApiUrl()}/api/v1/account/group`
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
var Vp = /* @__PURE__ */ ((t) => (t.Disabled = "Disabled", t.Email = "Email", t.Authenticator = "Authenticator", t))(Vp || {});
const th = pt(
  () => ({
    baseURL: `${ht.getApiUrl()}/api/v1/account/setting`
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
), eh = pt(
  () => ({
    baseURL: `${ht.getApiUrl()}/api/v1/help-widget`
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
);
export {
  Lp as AccessType,
  Hp as AccountRepository,
  Wp as AgentRepository,
  $p as AuthenticationSMTP,
  Pp as BusinessHoursType,
  qp as CustomerRepository,
  Cp as Day,
  Kp as EmailIntegrationRepository,
  ht as Env,
  Np as ErrorCodeCreate,
  eh as HelpWidgetRepository,
  kp as MailBoxType,
  Up as MailSettingType,
  Vp as MethodOTP,
  Fp as PermissionScopesShopify,
  Ip as Priority,
  Bp as Role,
  Mp as StatusTicket,
  Jp as StoreRepository,
  Yp as TagRepository,
  Xp as TicketRepository,
  Dp as TypeCheckTokenNewAgent,
  Qp as UserGroupRepository,
  th as UserSettingRepository,
  Zp as priorityOptions,
  Gp as statusOptions
};

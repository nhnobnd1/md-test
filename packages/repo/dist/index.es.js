import * as N from "react";
import Qt, { createContext as io, memo as so, useContext as xi, useMemo as Ti } from "react";
var Ri = Object.defineProperty, Ni = (t, e, r) => e in t ? Ri(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, rt = (t, e, r) => (Ni(t, typeof e != "symbol" ? e + "" : e, r), r);
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
var en;
(function(t) {
  t.Pop = "POP", t.Push = "PUSH", t.Replace = "REPLACE";
})(en || (en = {}));
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
function ao(t) {
  let e = {};
  if (t) {
    let r = t.indexOf("#");
    r >= 0 && (e.hash = t.substr(r), t = t.substr(0, r));
    let n = t.indexOf("?");
    n >= 0 && (e.search = t.substr(n), t = t.substr(0, n)), t && (e.pathname = t);
  }
  return e;
}
var rn;
(function(t) {
  t.data = "data", t.deferred = "deferred", t.redirect = "redirect", t.error = "error";
})(rn || (rn = {}));
function Di(t, e) {
  if (!t) {
    typeof console < "u" && console.warn(e);
    try {
      throw new Error(e);
    } catch {
    }
  }
}
function Pi(t, e) {
  e === void 0 && (e = "/");
  let {
    pathname: r,
    search: n = "",
    hash: o = ""
  } = typeof t == "string" ? ao(t) : t;
  return {
    pathname: r ? r.startsWith("/") ? r : Ci(r, e) : e,
    search: ki(n),
    hash: Li(o)
  };
}
function Ci(t, e) {
  let r = e.replace(/\/+$/, "").split("/");
  return t.split("/").forEach((n) => {
    n === ".." ? r.length > 1 && r.pop() : n !== "." && r.push(n);
  }), r.length > 1 ? r.join("/") : "/";
}
function ze(t, e, r, n) {
  return "Cannot include a '" + t + "' character in a manually specified " + ("`to." + e + "` field [" + JSON.stringify(n) + "].  Please separate it out to the ") + ("`to." + r + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function uo(t) {
  return t.filter((e, r) => r === 0 || e.route.path && e.route.path.length > 0);
}
function co(t, e, r, n) {
  n === void 0 && (n = !1);
  let o;
  typeof t == "string" ? o = ao(t) : (o = Qe({}, t), nt(!o.pathname || !o.pathname.includes("?"), ze("?", "pathname", "search", o)), nt(!o.pathname || !o.pathname.includes("#"), ze("#", "pathname", "hash", o)), nt(!o.search || !o.search.includes("#"), ze("#", "search", "hash", o)));
  let i = t === "" || o.pathname === "", s = i ? "/" : o.pathname, c;
  if (n || s == null)
    c = r;
  else {
    let p = e.length - 1;
    if (s.startsWith("..")) {
      let v = s.split("/");
      for (; v[0] === ".."; )
        v.shift(), p -= 1;
      o.pathname = v.join("/");
    }
    c = p >= 0 ? e[p] : "/";
  }
  let a = Pi(o, c), l = s && s !== "/" && s.endsWith("/"), f = (i || s === ".") && r.endsWith("/");
  return !a.pathname.endsWith("/") && (l || f) && (a.pathname += "/"), a;
}
const br = (t) => t.join("/").replace(/\/\/+/g, "/"), ki = (t) => !t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t, Li = (t) => !t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t;
"useSyncExternalStore" in N && ((t) => t.useSyncExternalStore)(N);
const $i = /* @__PURE__ */ N.createContext(null);
process.env.NODE_ENV !== "production" && ($i.displayName = "DataStaticRouterContext");
const lo = /* @__PURE__ */ N.createContext(null);
process.env.NODE_ENV !== "production" && (lo.displayName = "DataRouter");
const fo = /* @__PURE__ */ N.createContext(null);
process.env.NODE_ENV !== "production" && (fo.displayName = "DataRouterState");
const Ui = /* @__PURE__ */ N.createContext(null);
process.env.NODE_ENV !== "production" && (Ui.displayName = "Await");
const te = /* @__PURE__ */ N.createContext(null);
process.env.NODE_ENV !== "production" && (te.displayName = "Navigation");
const Or = /* @__PURE__ */ N.createContext(null);
process.env.NODE_ENV !== "production" && (Or.displayName = "Location");
const ee = /* @__PURE__ */ N.createContext({
  outlet: null,
  matches: []
});
process.env.NODE_ENV !== "production" && (ee.displayName = "Route");
const Ii = /* @__PURE__ */ N.createContext(null);
process.env.NODE_ENV !== "production" && (Ii.displayName = "RouteError");
function Mi(t, e) {
  let {
    relative: r
  } = e === void 0 ? {} : e;
  wr() || (process.env.NODE_ENV !== "production" ? nt(
    !1,
    "useHref() may be used only in the context of a <Router> component."
  ) : nt(!1));
  let {
    basename: n,
    navigator: o
  } = N.useContext(te), {
    hash: i,
    pathname: s,
    search: c
  } = Se(t, {
    relative: r
  }), a = s;
  return n !== "/" && (a = s === "/" ? n : br([n, s])), o.createHref({
    pathname: a,
    search: c,
    hash: i
  });
}
function wr() {
  return N.useContext(Or) != null;
}
function re() {
  return wr() || (process.env.NODE_ENV !== "production" ? nt(
    !1,
    "useLocation() may be used only in the context of a <Router> component."
  ) : nt(!1)), N.useContext(Or).location;
}
function Fi() {
  wr() || (process.env.NODE_ENV !== "production" ? nt(
    !1,
    "useNavigate() may be used only in the context of a <Router> component."
  ) : nt(!1));
  let {
    basename: t,
    navigator: e
  } = N.useContext(te), {
    matches: r
  } = N.useContext(ee), {
    pathname: n
  } = re(), o = JSON.stringify(uo(r).map((s) => s.pathnameBase)), i = N.useRef(!1);
  return N.useEffect(() => {
    i.current = !0;
  }), N.useCallback(function(s, c) {
    if (c === void 0 && (c = {}), process.env.NODE_ENV !== "production" && Di(i.current, "You should call navigate() in a React.useEffect(), not when your component is first rendered."), !i.current)
      return;
    if (typeof s == "number") {
      e.go(s);
      return;
    }
    let a = co(s, JSON.parse(o), n, c.relative === "path");
    t !== "/" && (a.pathname = a.pathname === "/" ? t : br([t, a.pathname])), (c.replace ? e.replace : e.push)(a, c.state, c);
  }, [t, e, o, n]);
}
const Bi = /* @__PURE__ */ N.createContext(null);
function zi(t) {
  let e = N.useContext(ee).outlet;
  return e && /* @__PURE__ */ N.createElement(Bi.Provider, {
    value: t
  }, e);
}
function Se(t, e) {
  let {
    relative: r
  } = e === void 0 ? {} : e, {
    matches: n
  } = N.useContext(ee), {
    pathname: o
  } = re(), i = JSON.stringify(uo(n).map((s) => s.pathnameBase));
  return N.useMemo(() => co(t, JSON.parse(i), o, r === "path"), [t, i, o, r]);
}
var nn;
(function(t) {
  t.UseRevalidator = "useRevalidator";
})(nn || (nn = {}));
var on;
(function(t) {
  t.UseLoaderData = "useLoaderData", t.UseActionData = "useActionData", t.UseRouteError = "useRouteError", t.UseNavigation = "useNavigation", t.UseRouteLoaderData = "useRouteLoaderData", t.UseMatches = "useMatches", t.UseRevalidator = "useRevalidator";
})(on || (on = {}));
function Hi(t) {
  return zi(t.context);
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
function Nt() {
  return Nt = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
    }
    return t;
  }, Nt.apply(this, arguments);
}
function _r(t, e) {
  if (t == null)
    return {};
  var r = {}, n = Object.keys(t), o, i;
  for (i = 0; i < n.length; i++)
    o = n[i], !(e.indexOf(o) >= 0) && (r[o] = t[o]);
  return r;
}
const fe = "get", He = "application/x-www-form-urlencoded";
function je(t) {
  return t != null && typeof t.tagName == "string";
}
function Wi(t) {
  return je(t) && t.tagName.toLowerCase() === "button";
}
function Vi(t) {
  return je(t) && t.tagName.toLowerCase() === "form";
}
function qi(t) {
  return je(t) && t.tagName.toLowerCase() === "input";
}
function Ki(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function Ji(t, e) {
  return t.button === 0 && (!e || e === "_self") && !Ki(t);
}
function Yi(t, e, r) {
  let n, o, i, s;
  if (Vi(t)) {
    let l = r.submissionTrigger;
    n = r.method || t.getAttribute("method") || fe, o = r.action || t.getAttribute("action") || e, i = r.encType || t.getAttribute("enctype") || He, s = new FormData(t), l && l.name && s.append(l.name, l.value);
  } else if (Wi(t) || qi(t) && (t.type === "submit" || t.type === "image")) {
    let l = t.form;
    if (l == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    n = r.method || t.getAttribute("formmethod") || l.getAttribute("method") || fe, o = r.action || t.getAttribute("formaction") || l.getAttribute("action") || e, i = r.encType || t.getAttribute("formenctype") || l.getAttribute("enctype") || He, s = new FormData(l), t.name && s.append(t.name, t.value);
  } else {
    if (je(t))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    if (n = r.method || fe, o = r.action || e, i = r.encType || He, t instanceof FormData)
      s = t;
    else if (s = new FormData(), t instanceof URLSearchParams)
      for (let [l, f] of t)
        s.append(l, f);
    else if (t != null)
      for (let l of Object.keys(t))
        s.append(l, t[l]);
  }
  let {
    protocol: c,
    host: a
  } = window.location;
  return {
    url: new URL(o, c + "//" + a),
    method: n.toLowerCase(),
    encType: i,
    formData: s
  };
}
const Gi = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset"], Zi = ["aria-current", "caseSensitive", "className", "end", "style", "to", "children"], Xi = ["reloadDocument", "replace", "method", "action", "onSubmit", "fetcherKey", "routeId", "relative"];
process.env.NODE_ENV;
const po = /* @__PURE__ */ N.forwardRef(function(t, e) {
  let {
    onClick: r,
    relative: n,
    reloadDocument: o,
    replace: i,
    state: s,
    target: c,
    to: a,
    preventScrollReset: l
  } = t, f = _r(t, Gi), p = Mi(a, {
    relative: n
  }), v = ns(a, {
    replace: i,
    state: s,
    target: c,
    preventScrollReset: l,
    relative: n
  });
  function d(b) {
    r && r(b), b.defaultPrevented || v(b);
  }
  return /* @__PURE__ */ N.createElement("a", Nt({}, f, {
    href: p,
    onClick: o ? r : d,
    ref: e,
    target: c
  }));
});
process.env.NODE_ENV !== "production" && (po.displayName = "Link");
const Qi = /* @__PURE__ */ N.forwardRef(function(t, e) {
  let {
    "aria-current": r = "page",
    caseSensitive: n = !1,
    className: o = "",
    end: i = !1,
    style: s,
    to: c,
    children: a
  } = t, l = _r(t, Zi), f = Se(c, {
    relative: l.relative
  }), p = re(), v = N.useContext(fo), {
    navigator: d
  } = N.useContext(te), b = d.encodeLocation ? d.encodeLocation(f).pathname : f.pathname, _ = p.pathname, R = v && v.navigation && v.navigation.location ? v.navigation.location.pathname : null;
  n || (_ = _.toLowerCase(), R = R ? R.toLowerCase() : null, b = b.toLowerCase());
  let F = _ === b || !i && _.startsWith(b) && _.charAt(b.length) === "/", K = R != null && (R === b || !i && R.startsWith(b) && R.charAt(b.length) === "/"), E = F ? r : void 0, D;
  typeof o == "function" ? D = o({
    isActive: F,
    isPending: K
  }) : D = [o, F ? "active" : null, K ? "pending" : null].filter(Boolean).join(" ");
  let B = typeof s == "function" ? s({
    isActive: F,
    isPending: K
  }) : s;
  return /* @__PURE__ */ N.createElement(po, Nt({}, l, {
    "aria-current": E,
    className: D,
    ref: e,
    style: B,
    to: c
  }), typeof a == "function" ? a({
    isActive: F,
    isPending: K
  }) : a);
});
process.env.NODE_ENV !== "production" && (Qi.displayName = "NavLink");
const ts = /* @__PURE__ */ N.forwardRef((t, e) => /* @__PURE__ */ N.createElement(ho, Nt({}, t, {
  ref: e
})));
process.env.NODE_ENV !== "production" && (ts.displayName = "Form");
const ho = /* @__PURE__ */ N.forwardRef((t, e) => {
  let {
    reloadDocument: r,
    replace: n,
    method: o = fe,
    action: i,
    onSubmit: s,
    fetcherKey: c,
    routeId: a,
    relative: l
  } = t, f = _r(t, Xi), p = os(c, a), v = o.toLowerCase() === "get" ? "get" : "post", d = vo(i, {
    relative: l
  }), b = (_) => {
    if (s && s(_), _.defaultPrevented)
      return;
    _.preventDefault();
    let R = _.nativeEvent.submitter, F = (R == null ? void 0 : R.getAttribute("formmethod")) || o;
    p(R || _.currentTarget, {
      method: F,
      replace: n,
      relative: l
    });
  };
  return /* @__PURE__ */ N.createElement("form", Nt({
    ref: e,
    method: v,
    action: d,
    onSubmit: r ? s : b
  }, f));
});
process.env.NODE_ENV !== "production" && (ho.displayName = "FormImpl");
process.env.NODE_ENV;
var er;
(function(t) {
  t.UseScrollRestoration = "useScrollRestoration", t.UseSubmitImpl = "useSubmitImpl", t.UseFetcher = "useFetcher";
})(er || (er = {}));
var an;
(function(t) {
  t.UseFetchers = "useFetchers", t.UseScrollRestoration = "useScrollRestoration";
})(an || (an = {}));
function es(t) {
  return t + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function rs(t) {
  let e = N.useContext(lo);
  return e || (process.env.NODE_ENV !== "production" ? nt(!1, es(t)) : nt(!1)), e;
}
function ns(t, e) {
  let {
    target: r,
    replace: n,
    state: o,
    preventScrollReset: i,
    relative: s
  } = e === void 0 ? {} : e, c = Fi(), a = re(), l = Se(t, {
    relative: s
  });
  return N.useCallback((f) => {
    if (Ji(f, r)) {
      f.preventDefault();
      let p = n !== void 0 ? n : tr(a) === tr(l);
      c(t, {
        replace: p,
        state: o,
        preventScrollReset: i,
        relative: s
      });
    }
  }, [a, c, l, n, o, r, t, i, s]);
}
function os(t, e) {
  let {
    router: r
  } = rs(er.UseSubmitImpl), n = vo();
  return N.useCallback(function(o, i) {
    if (i === void 0 && (i = {}), typeof document > "u")
      throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
    let {
      method: s,
      encType: c,
      formData: a,
      url: l
    } = Yi(o, n, i), f = l.pathname + l.search, p = {
      replace: i.replace,
      formData: a,
      formMethod: s,
      formEncType: c
    };
    t ? (e == null && (process.env.NODE_ENV !== "production" ? nt(!1, "No routeId available for useFetcher()") : nt(!1)), r.fetch(t, e, f, p)) : r.navigate(f, p);
  }, [n, r, t, e]);
}
function vo(t, e) {
  let {
    relative: r
  } = e === void 0 ? {} : e, {
    basename: n
  } = N.useContext(te), o = N.useContext(ee);
  o || (process.env.NODE_ENV !== "production" ? nt(!1, "useFormAction must be used inside a RouteContext") : nt(!1));
  let [i] = o.matches.slice(-1), s = Nt({}, Se(t || ".", {
    relative: r
  })), c = re();
  if (t == null && (s.search = c.search, s.hash = c.hash, i.route.index)) {
    let a = new URLSearchParams(s.search);
    a.delete("index"), s.search = a.toString() ? "?" + a.toString() : "";
  }
  return (!t || t === ".") && i.route.index && (s.search = s.search ? s.search.replace(/^\?/, "?index&") : "?index"), n !== "/" && (s.pathname = s.pathname === "/" ? n : br([n, s.pathname])), tr(s);
}
var is = typeof global == "object" && global && global.Object === Object && global;
const yo = is;
var ss = typeof self == "object" && self && self.Object === Object && self, as = yo || ss || Function("return this")();
const ft = as;
var us = ft.Symbol;
const Et = us;
var mo = Object.prototype, cs = mo.hasOwnProperty, ls = mo.toString, Vt = Et ? Et.toStringTag : void 0;
function fs(t) {
  var e = cs.call(t, Vt), r = t[Vt];
  try {
    t[Vt] = void 0;
    var n = !0;
  } catch {
  }
  var o = ls.call(t);
  return n && (e ? t[Vt] = r : delete t[Vt]), o;
}
var ps = Object.prototype, hs = ps.toString;
function ds(t) {
  return hs.call(t);
}
var vs = "[object Null]", ys = "[object Undefined]", un = Et ? Et.toStringTag : void 0;
function Ct(t) {
  return t == null ? t === void 0 ? ys : vs : un && un in Object(t) ? fs(t) : ds(t);
}
function St(t) {
  return t != null && typeof t == "object";
}
var ms = "[object Symbol]";
function Er(t) {
  return typeof t == "symbol" || St(t) && Ct(t) == ms;
}
function gs(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length, o = Array(n); ++r < n; )
    o[r] = e(t[r], r, t);
  return o;
}
var bs = Array.isArray;
const at = bs;
var Os = 1 / 0, cn = Et ? Et.prototype : void 0, ln = cn ? cn.toString : void 0;
function go(t) {
  if (typeof t == "string")
    return t;
  if (at(t))
    return gs(t, go) + "";
  if (Er(t))
    return ln ? ln.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -Os ? "-0" : e;
}
function jt(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
function Sr(t) {
  return t;
}
var ws = "[object AsyncFunction]", _s = "[object Function]", Es = "[object GeneratorFunction]", Ss = "[object Proxy]";
function jr(t) {
  if (!jt(t))
    return !1;
  var e = Ct(t);
  return e == _s || e == Es || e == ws || e == Ss;
}
var js = ft["__core-js_shared__"];
const We = js;
var fn = function() {
  var t = /[^.]+$/.exec(We && We.keys && We.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function As(t) {
  return !!fn && fn in t;
}
var xs = Function.prototype, Ts = xs.toString;
function kt(t) {
  if (t != null) {
    try {
      return Ts.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var Rs = /[\\^$.*+?()[\]{}|]/g, Ns = /^\[object .+?Constructor\]$/, Ds = Function.prototype, Ps = Object.prototype, Cs = Ds.toString, ks = Ps.hasOwnProperty, Ls = RegExp(
  "^" + Cs.call(ks).replace(Rs, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function $s(t) {
  if (!jt(t) || As(t))
    return !1;
  var e = jr(t) ? Ls : Ns;
  return e.test(kt(t));
}
function Us(t, e) {
  return t == null ? void 0 : t[e];
}
function Lt(t, e) {
  var r = Us(t, e);
  return $s(r) ? r : void 0;
}
var Is = Lt(ft, "WeakMap");
const rr = Is;
var pn = Object.create, Ms = function() {
  function t() {
  }
  return function(e) {
    if (!jt(e))
      return {};
    if (pn)
      return pn(e);
    t.prototype = e;
    var r = new t();
    return t.prototype = void 0, r;
  };
}();
const Fs = Ms;
function Bs(t, e, r) {
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
function zs() {
}
function Hs(t, e) {
  var r = -1, n = t.length;
  for (e || (e = Array(n)); ++r < n; )
    e[r] = t[r];
  return e;
}
var Ws = 800, Vs = 16, qs = Date.now;
function Ks(t) {
  var e = 0, r = 0;
  return function() {
    var n = qs(), o = Vs - (n - r);
    if (r = n, o > 0) {
      if (++e >= Ws)
        return arguments[0];
    } else
      e = 0;
    return t.apply(void 0, arguments);
  };
}
function Js(t) {
  return function() {
    return t;
  };
}
var Ys = function() {
  try {
    var t = Lt(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
}();
const ge = Ys;
var Gs = ge ? function(t, e) {
  return ge(t, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Js(e),
    writable: !0
  });
} : Sr;
const Zs = Gs;
var Xs = Ks(Zs);
const Qs = Xs;
function ta(t, e, r, n) {
  for (var o = t.length, i = r + (n ? 1 : -1); n ? i-- : ++i < o; )
    if (e(t[i], i, t))
      return i;
  return -1;
}
function ea(t) {
  return t !== t;
}
function ra(t, e, r) {
  for (var n = r - 1, o = t.length; ++n < o; )
    if (t[n] === e)
      return n;
  return -1;
}
function na(t, e, r) {
  return e === e ? ra(t, e, r) : ta(t, ea, r);
}
function oa(t, e) {
  var r = t == null ? 0 : t.length;
  return !!r && na(t, e, 0) > -1;
}
var ia = 9007199254740991, sa = /^(?:0|[1-9]\d*)$/;
function Ar(t, e) {
  var r = typeof t;
  return e = e ?? ia, !!e && (r == "number" || r != "symbol" && sa.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
function Ae(t, e, r) {
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
var aa = Object.prototype, ua = aa.hasOwnProperty;
function ca(t, e, r) {
  var n = t[e];
  (!(ua.call(t, e) && ne(n, r)) || r === void 0 && !(e in t)) && Ae(t, e, r);
}
function la(t, e, r, n) {
  var o = !r;
  r || (r = {});
  for (var i = -1, s = e.length; ++i < s; ) {
    var c = e[i], a = n ? n(r[c], t[c], c, r, t) : void 0;
    a === void 0 && (a = t[c]), o ? Ae(r, c, a) : ca(r, c, a);
  }
  return r;
}
var hn = Math.max;
function fa(t, e, r) {
  return e = hn(e === void 0 ? t.length - 1 : e, 0), function() {
    for (var n = arguments, o = -1, i = hn(n.length - e, 0), s = Array(i); ++o < i; )
      s[o] = n[e + o];
    o = -1;
    for (var c = Array(e + 1); ++o < e; )
      c[o] = n[o];
    return c[e] = r(s), Bs(t, this, c);
  };
}
function pa(t, e) {
  return Qs(fa(t, e, Sr), t + "");
}
var ha = 9007199254740991;
function xr(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= ha;
}
function xe(t) {
  return t != null && xr(t.length) && !jr(t);
}
function da(t, e, r) {
  if (!jt(r))
    return !1;
  var n = typeof e;
  return (n == "number" ? xe(r) && Ar(e, r.length) : n == "string" && e in r) ? ne(r[e], t) : !1;
}
function va(t) {
  return pa(function(e, r) {
    var n = -1, o = r.length, i = o > 1 ? r[o - 1] : void 0, s = o > 2 ? r[2] : void 0;
    for (i = t.length > 3 && typeof i == "function" ? (o--, i) : void 0, s && da(r[0], r[1], s) && (i = o < 3 ? void 0 : i, o = 1), e = Object(e); ++n < o; ) {
      var c = r[n];
      c && t(e, c, n, i);
    }
    return e;
  });
}
var ya = Object.prototype;
function Tr(t) {
  var e = t && t.constructor, r = typeof e == "function" && e.prototype || ya;
  return t === r;
}
function ma(t, e) {
  for (var r = -1, n = Array(t); ++r < t; )
    n[r] = e(r);
  return n;
}
var ga = "[object Arguments]";
function dn(t) {
  return St(t) && Ct(t) == ga;
}
var bo = Object.prototype, ba = bo.hasOwnProperty, Oa = bo.propertyIsEnumerable, wa = dn(function() {
  return arguments;
}()) ? dn : function(t) {
  return St(t) && ba.call(t, "callee") && !Oa.call(t, "callee");
};
const be = wa;
function _a() {
  return !1;
}
var Oo = typeof exports == "object" && exports && !exports.nodeType && exports, vn = Oo && typeof module == "object" && module && !module.nodeType && module, Ea = vn && vn.exports === Oo, yn = Ea ? ft.Buffer : void 0, Sa = yn ? yn.isBuffer : void 0, ja = Sa || _a;
const Oe = ja;
var Aa = "[object Arguments]", xa = "[object Array]", Ta = "[object Boolean]", Ra = "[object Date]", Na = "[object Error]", Da = "[object Function]", Pa = "[object Map]", Ca = "[object Number]", ka = "[object Object]", La = "[object RegExp]", $a = "[object Set]", Ua = "[object String]", Ia = "[object WeakMap]", Ma = "[object ArrayBuffer]", Fa = "[object DataView]", Ba = "[object Float32Array]", za = "[object Float64Array]", Ha = "[object Int8Array]", Wa = "[object Int16Array]", Va = "[object Int32Array]", qa = "[object Uint8Array]", Ka = "[object Uint8ClampedArray]", Ja = "[object Uint16Array]", Ya = "[object Uint32Array]", V = {};
V[Ba] = V[za] = V[Ha] = V[Wa] = V[Va] = V[qa] = V[Ka] = V[Ja] = V[Ya] = !0;
V[Aa] = V[xa] = V[Ma] = V[Ta] = V[Fa] = V[Ra] = V[Na] = V[Da] = V[Pa] = V[Ca] = V[ka] = V[La] = V[$a] = V[Ua] = V[Ia] = !1;
function Ga(t) {
  return St(t) && xr(t.length) && !!V[Ct(t)];
}
function Za(t) {
  return function(e) {
    return t(e);
  };
}
var wo = typeof exports == "object" && exports && !exports.nodeType && exports, Kt = wo && typeof module == "object" && module && !module.nodeType && module, Xa = Kt && Kt.exports === wo, Ve = Xa && yo.process, Qa = function() {
  try {
    var t = Kt && Kt.require && Kt.require("util").types;
    return t || Ve && Ve.binding && Ve.binding("util");
  } catch {
  }
}();
const mn = Qa;
var gn = mn && mn.isTypedArray, tu = gn ? Za(gn) : Ga;
const Rr = tu;
var eu = Object.prototype, ru = eu.hasOwnProperty;
function _o(t, e) {
  var r = at(t), n = !r && be(t), o = !r && !n && Oe(t), i = !r && !n && !o && Rr(t), s = r || n || o || i, c = s ? ma(t.length, String) : [], a = c.length;
  for (var l in t)
    (e || ru.call(t, l)) && !(s && (l == "length" || o && (l == "offset" || l == "parent") || i && (l == "buffer" || l == "byteLength" || l == "byteOffset") || Ar(l, a))) && c.push(l);
  return c;
}
function Eo(t, e) {
  return function(r) {
    return t(e(r));
  };
}
var nu = Eo(Object.keys, Object);
const ou = nu;
var iu = Object.prototype, su = iu.hasOwnProperty;
function au(t) {
  if (!Tr(t))
    return ou(t);
  var e = [];
  for (var r in Object(t))
    su.call(t, r) && r != "constructor" && e.push(r);
  return e;
}
function Nr(t) {
  return xe(t) ? _o(t) : au(t);
}
function uu(t) {
  var e = [];
  if (t != null)
    for (var r in Object(t))
      e.push(r);
  return e;
}
var cu = Object.prototype, lu = cu.hasOwnProperty;
function fu(t) {
  if (!jt(t))
    return uu(t);
  var e = Tr(t), r = [];
  for (var n in t)
    n == "constructor" && (e || !lu.call(t, n)) || r.push(n);
  return r;
}
function So(t) {
  return xe(t) ? _o(t, !0) : fu(t);
}
var pu = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, hu = /^\w*$/;
function Dr(t, e) {
  if (at(t))
    return !1;
  var r = typeof t;
  return r == "number" || r == "symbol" || r == "boolean" || t == null || Er(t) ? !0 : hu.test(t) || !pu.test(t) || e != null && t in Object(e);
}
var du = Lt(Object, "create");
const Jt = du;
function vu() {
  this.__data__ = Jt ? Jt(null) : {}, this.size = 0;
}
function yu(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var mu = "__lodash_hash_undefined__", gu = Object.prototype, bu = gu.hasOwnProperty;
function Ou(t) {
  var e = this.__data__;
  if (Jt) {
    var r = e[t];
    return r === mu ? void 0 : r;
  }
  return bu.call(e, t) ? e[t] : void 0;
}
var wu = Object.prototype, _u = wu.hasOwnProperty;
function Eu(t) {
  var e = this.__data__;
  return Jt ? e[t] !== void 0 : _u.call(e, t);
}
var Su = "__lodash_hash_undefined__";
function ju(t, e) {
  var r = this.__data__;
  return this.size += this.has(t) ? 0 : 1, r[t] = Jt && e === void 0 ? Su : e, this;
}
function Dt(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
Dt.prototype.clear = vu;
Dt.prototype.delete = yu;
Dt.prototype.get = Ou;
Dt.prototype.has = Eu;
Dt.prototype.set = ju;
function Au() {
  this.__data__ = [], this.size = 0;
}
function Te(t, e) {
  for (var r = t.length; r--; )
    if (ne(t[r][0], e))
      return r;
  return -1;
}
var xu = Array.prototype, Tu = xu.splice;
function Ru(t) {
  var e = this.__data__, r = Te(e, t);
  if (r < 0)
    return !1;
  var n = e.length - 1;
  return r == n ? e.pop() : Tu.call(e, r, 1), --this.size, !0;
}
function Nu(t) {
  var e = this.__data__, r = Te(e, t);
  return r < 0 ? void 0 : e[r][1];
}
function Du(t) {
  return Te(this.__data__, t) > -1;
}
function Pu(t, e) {
  var r = this.__data__, n = Te(r, t);
  return n < 0 ? (++this.size, r.push([t, e])) : r[n][1] = e, this;
}
function gt(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
gt.prototype.clear = Au;
gt.prototype.delete = Ru;
gt.prototype.get = Nu;
gt.prototype.has = Du;
gt.prototype.set = Pu;
var Cu = Lt(ft, "Map");
const Yt = Cu;
function ku() {
  this.size = 0, this.__data__ = {
    hash: new Dt(),
    map: new (Yt || gt)(),
    string: new Dt()
  };
}
function Lu(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function Re(t, e) {
  var r = t.__data__;
  return Lu(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map;
}
function $u(t) {
  var e = Re(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function Uu(t) {
  return Re(this, t).get(t);
}
function Iu(t) {
  return Re(this, t).has(t);
}
function Mu(t, e) {
  var r = Re(this, t), n = r.size;
  return r.set(t, e), this.size += r.size == n ? 0 : 1, this;
}
function bt(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
bt.prototype.clear = ku;
bt.prototype.delete = $u;
bt.prototype.get = Uu;
bt.prototype.has = Iu;
bt.prototype.set = Mu;
var Fu = "Expected a function";
function Pr(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(Fu);
  var r = function() {
    var n = arguments, o = e ? e.apply(this, n) : n[0], i = r.cache;
    if (i.has(o))
      return i.get(o);
    var s = t.apply(this, n);
    return r.cache = i.set(o, s) || i, s;
  };
  return r.cache = new (Pr.Cache || bt)(), r;
}
Pr.Cache = bt;
var Bu = 500;
function zu(t) {
  var e = Pr(t, function(n) {
    return r.size === Bu && r.clear(), n;
  }), r = e.cache;
  return e;
}
var Hu = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Wu = /\\(\\)?/g, Vu = zu(function(t) {
  var e = [];
  return t.charCodeAt(0) === 46 && e.push(""), t.replace(Hu, function(r, n, o, i) {
    e.push(o ? i.replace(Wu, "$1") : n || r);
  }), e;
});
const qu = Vu;
function Ku(t) {
  return t == null ? "" : go(t);
}
function jo(t, e) {
  return at(t) ? t : Dr(t, e) ? [t] : qu(Ku(t));
}
var Ju = 1 / 0;
function Ne(t) {
  if (typeof t == "string" || Er(t))
    return t;
  var e = t + "";
  return e == "0" && 1 / t == -Ju ? "-0" : e;
}
function Ao(t, e) {
  e = jo(e, t);
  for (var r = 0, n = e.length; t != null && r < n; )
    t = t[Ne(e[r++])];
  return r && r == n ? t : void 0;
}
function Yu(t, e, r) {
  var n = t == null ? void 0 : Ao(t, e);
  return n === void 0 ? r : n;
}
function Gu(t, e) {
  for (var r = -1, n = e.length, o = t.length; ++r < n; )
    t[o + r] = e[r];
  return t;
}
var Zu = Eo(Object.getPrototypeOf, Object);
const xo = Zu;
var Xu = "[object Object]", Qu = Function.prototype, tc = Object.prototype, To = Qu.toString, ec = tc.hasOwnProperty, rc = To.call(Object);
function nc(t) {
  if (!St(t) || Ct(t) != Xu)
    return !1;
  var e = xo(t);
  if (e === null)
    return !0;
  var r = ec.call(e, "constructor") && e.constructor;
  return typeof r == "function" && r instanceof r && To.call(r) == rc;
}
function oc() {
  this.__data__ = new gt(), this.size = 0;
}
function ic(t) {
  var e = this.__data__, r = e.delete(t);
  return this.size = e.size, r;
}
function sc(t) {
  return this.__data__.get(t);
}
function ac(t) {
  return this.__data__.has(t);
}
var uc = 200;
function cc(t, e) {
  var r = this.__data__;
  if (r instanceof gt) {
    var n = r.__data__;
    if (!Yt || n.length < uc - 1)
      return n.push([t, e]), this.size = ++r.size, this;
    r = this.__data__ = new bt(n);
  }
  return r.set(t, e), this.size = r.size, this;
}
function lt(t) {
  var e = this.__data__ = new gt(t);
  this.size = e.size;
}
lt.prototype.clear = oc;
lt.prototype.delete = ic;
lt.prototype.get = sc;
lt.prototype.has = ac;
lt.prototype.set = cc;
var Ro = typeof exports == "object" && exports && !exports.nodeType && exports, bn = Ro && typeof module == "object" && module && !module.nodeType && module, lc = bn && bn.exports === Ro, On = lc ? ft.Buffer : void 0, wn = On ? On.allocUnsafe : void 0;
function fc(t, e) {
  if (e)
    return t.slice();
  var r = t.length, n = wn ? wn(r) : new t.constructor(r);
  return t.copy(n), n;
}
function pc(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length, o = 0, i = []; ++r < n; ) {
    var s = t[r];
    e(s, r, t) && (i[o++] = s);
  }
  return i;
}
function hc() {
  return [];
}
var dc = Object.prototype, vc = dc.propertyIsEnumerable, _n = Object.getOwnPropertySymbols, yc = _n ? function(t) {
  return t == null ? [] : (t = Object(t), pc(_n(t), function(e) {
    return vc.call(t, e);
  }));
} : hc;
const mc = yc;
function gc(t, e, r) {
  var n = e(t);
  return at(t) ? n : Gu(n, r(t));
}
function En(t) {
  return gc(t, Nr, mc);
}
var bc = Lt(ft, "DataView");
const nr = bc;
var Oc = Lt(ft, "Promise");
const or = Oc;
var wc = Lt(ft, "Set");
const Ft = wc;
var Sn = "[object Map]", _c = "[object Object]", jn = "[object Promise]", An = "[object Set]", xn = "[object WeakMap]", Tn = "[object DataView]", Ec = kt(nr), Sc = kt(Yt), jc = kt(or), Ac = kt(Ft), xc = kt(rr), Rt = Ct;
(nr && Rt(new nr(new ArrayBuffer(1))) != Tn || Yt && Rt(new Yt()) != Sn || or && Rt(or.resolve()) != jn || Ft && Rt(new Ft()) != An || rr && Rt(new rr()) != xn) && (Rt = function(t) {
  var e = Ct(t), r = e == _c ? t.constructor : void 0, n = r ? kt(r) : "";
  if (n)
    switch (n) {
      case Ec:
        return Tn;
      case Sc:
        return Sn;
      case jc:
        return jn;
      case Ac:
        return An;
      case xc:
        return xn;
    }
  return e;
});
const Rn = Rt;
var Tc = ft.Uint8Array;
const we = Tc;
function Rc(t) {
  var e = new t.constructor(t.byteLength);
  return new we(e).set(new we(t)), e;
}
function Nc(t, e) {
  var r = e ? Rc(t.buffer) : t.buffer;
  return new t.constructor(r, t.byteOffset, t.length);
}
function Dc(t) {
  return typeof t.constructor == "function" && !Tr(t) ? Fs(xo(t)) : {};
}
var Pc = "__lodash_hash_undefined__";
function Cc(t) {
  return this.__data__.set(t, Pc), this;
}
function kc(t) {
  return this.__data__.has(t);
}
function Gt(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.__data__ = new bt(); ++e < r; )
    this.add(t[e]);
}
Gt.prototype.add = Gt.prototype.push = Cc;
Gt.prototype.has = kc;
function Lc(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length; ++r < n; )
    if (e(t[r], r, t))
      return !0;
  return !1;
}
function No(t, e) {
  return t.has(e);
}
var $c = 1, Uc = 2;
function Do(t, e, r, n, o, i) {
  var s = r & $c, c = t.length, a = e.length;
  if (c != a && !(s && a > c))
    return !1;
  var l = i.get(t), f = i.get(e);
  if (l && f)
    return l == e && f == t;
  var p = -1, v = !0, d = r & Uc ? new Gt() : void 0;
  for (i.set(t, e), i.set(e, t); ++p < c; ) {
    var b = t[p], _ = e[p];
    if (n)
      var R = s ? n(_, b, p, e, t, i) : n(b, _, p, t, e, i);
    if (R !== void 0) {
      if (R)
        continue;
      v = !1;
      break;
    }
    if (d) {
      if (!Lc(e, function(F, K) {
        if (!No(d, K) && (b === F || o(b, F, r, n, i)))
          return d.push(K);
      })) {
        v = !1;
        break;
      }
    } else if (!(b === _ || o(b, _, r, n, i))) {
      v = !1;
      break;
    }
  }
  return i.delete(t), i.delete(e), v;
}
function Ic(t) {
  var e = -1, r = Array(t.size);
  return t.forEach(function(n, o) {
    r[++e] = [o, n];
  }), r;
}
function Cr(t) {
  var e = -1, r = Array(t.size);
  return t.forEach(function(n) {
    r[++e] = n;
  }), r;
}
var Mc = 1, Fc = 2, Bc = "[object Boolean]", zc = "[object Date]", Hc = "[object Error]", Wc = "[object Map]", Vc = "[object Number]", qc = "[object RegExp]", Kc = "[object Set]", Jc = "[object String]", Yc = "[object Symbol]", Gc = "[object ArrayBuffer]", Zc = "[object DataView]", Nn = Et ? Et.prototype : void 0, qe = Nn ? Nn.valueOf : void 0;
function Xc(t, e, r, n, o, i, s) {
  switch (r) {
    case Zc:
      if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset)
        return !1;
      t = t.buffer, e = e.buffer;
    case Gc:
      return !(t.byteLength != e.byteLength || !i(new we(t), new we(e)));
    case Bc:
    case zc:
    case Vc:
      return ne(+t, +e);
    case Hc:
      return t.name == e.name && t.message == e.message;
    case qc:
    case Jc:
      return t == e + "";
    case Wc:
      var c = Ic;
    case Kc:
      var a = n & Mc;
      if (c || (c = Cr), t.size != e.size && !a)
        return !1;
      var l = s.get(t);
      if (l)
        return l == e;
      n |= Fc, s.set(t, e);
      var f = Do(c(t), c(e), n, o, i, s);
      return s.delete(t), f;
    case Yc:
      if (qe)
        return qe.call(t) == qe.call(e);
  }
  return !1;
}
var Qc = 1, tl = Object.prototype, el = tl.hasOwnProperty;
function rl(t, e, r, n, o, i) {
  var s = r & Qc, c = En(t), a = c.length, l = En(e), f = l.length;
  if (a != f && !s)
    return !1;
  for (var p = a; p--; ) {
    var v = c[p];
    if (!(s ? v in e : el.call(e, v)))
      return !1;
  }
  var d = i.get(t), b = i.get(e);
  if (d && b)
    return d == e && b == t;
  var _ = !0;
  i.set(t, e), i.set(e, t);
  for (var R = s; ++p < a; ) {
    v = c[p];
    var F = t[v], K = e[v];
    if (n)
      var E = s ? n(K, F, v, e, t, i) : n(F, K, v, t, e, i);
    if (!(E === void 0 ? F === K || o(F, K, r, n, i) : E)) {
      _ = !1;
      break;
    }
    R || (R = v == "constructor");
  }
  if (_ && !R) {
    var D = t.constructor, B = e.constructor;
    D != B && "constructor" in t && "constructor" in e && !(typeof D == "function" && D instanceof D && typeof B == "function" && B instanceof B) && (_ = !1);
  }
  return i.delete(t), i.delete(e), _;
}
var nl = 1, Dn = "[object Arguments]", Pn = "[object Array]", ce = "[object Object]", ol = Object.prototype, Cn = ol.hasOwnProperty;
function il(t, e, r, n, o, i) {
  var s = at(t), c = at(e), a = s ? Pn : Rn(t), l = c ? Pn : Rn(e);
  a = a == Dn ? ce : a, l = l == Dn ? ce : l;
  var f = a == ce, p = l == ce, v = a == l;
  if (v && Oe(t)) {
    if (!Oe(e))
      return !1;
    s = !0, f = !1;
  }
  if (v && !f)
    return i || (i = new lt()), s || Rr(t) ? Do(t, e, r, n, o, i) : Xc(t, e, a, r, n, o, i);
  if (!(r & nl)) {
    var d = f && Cn.call(t, "__wrapped__"), b = p && Cn.call(e, "__wrapped__");
    if (d || b) {
      var _ = d ? t.value() : t, R = b ? e.value() : e;
      return i || (i = new lt()), o(_, R, r, n, i);
    }
  }
  return v ? (i || (i = new lt()), rl(t, e, r, n, o, i)) : !1;
}
function kr(t, e, r, n, o) {
  return t === e ? !0 : t == null || e == null || !St(t) && !St(e) ? t !== t && e !== e : il(t, e, r, n, kr, o);
}
var sl = 1, al = 2;
function ul(t, e, r, n) {
  var o = r.length, i = o, s = !n;
  if (t == null)
    return !i;
  for (t = Object(t); o--; ) {
    var c = r[o];
    if (s && c[2] ? c[1] !== t[c[0]] : !(c[0] in t))
      return !1;
  }
  for (; ++o < i; ) {
    c = r[o];
    var a = c[0], l = t[a], f = c[1];
    if (s && c[2]) {
      if (l === void 0 && !(a in t))
        return !1;
    } else {
      var p = new lt();
      if (n)
        var v = n(l, f, a, t, e, p);
      if (!(v === void 0 ? kr(f, l, sl | al, n, p) : v))
        return !1;
    }
  }
  return !0;
}
function Po(t) {
  return t === t && !jt(t);
}
function cl(t) {
  for (var e = Nr(t), r = e.length; r--; ) {
    var n = e[r], o = t[n];
    e[r] = [n, o, Po(o)];
  }
  return e;
}
function Co(t, e) {
  return function(r) {
    return r == null ? !1 : r[t] === e && (e !== void 0 || t in Object(r));
  };
}
function ll(t) {
  var e = cl(t);
  return e.length == 1 && e[0][2] ? Co(e[0][0], e[0][1]) : function(r) {
    return r === t || ul(r, t, e);
  };
}
function fl(t, e) {
  return t != null && e in Object(t);
}
function pl(t, e, r) {
  e = jo(e, t);
  for (var n = -1, o = e.length, i = !1; ++n < o; ) {
    var s = Ne(e[n]);
    if (!(i = t != null && r(t, s)))
      break;
    t = t[s];
  }
  return i || ++n != o ? i : (o = t == null ? 0 : t.length, !!o && xr(o) && Ar(s, o) && (at(t) || be(t)));
}
function hl(t, e) {
  return t != null && pl(t, e, fl);
}
var dl = 1, vl = 2;
function yl(t, e) {
  return Dr(t) && Po(e) ? Co(Ne(t), e) : function(r) {
    var n = Yu(r, t);
    return n === void 0 && n === e ? hl(r, t) : kr(e, n, dl | vl);
  };
}
function ml(t) {
  return function(e) {
    return e == null ? void 0 : e[t];
  };
}
function gl(t) {
  return function(e) {
    return Ao(e, t);
  };
}
function bl(t) {
  return Dr(t) ? ml(Ne(t)) : gl(t);
}
function ko(t) {
  return typeof t == "function" ? t : t == null ? Sr : typeof t == "object" ? at(t) ? yl(t[0], t[1]) : ll(t) : bl(t);
}
function Ol(t) {
  return function(e, r, n) {
    for (var o = -1, i = Object(e), s = n(e), c = s.length; c--; ) {
      var a = s[t ? c : ++o];
      if (r(i[a], a, i) === !1)
        break;
    }
    return e;
  };
}
var wl = Ol();
const Lo = wl;
function _l(t, e) {
  return t && Lo(t, e, Nr);
}
function ir(t, e, r) {
  (r !== void 0 && !ne(t[e], r) || r === void 0 && !(e in t)) && Ae(t, e, r);
}
function El(t) {
  return St(t) && xe(t);
}
function sr(t, e) {
  if (!(e === "constructor" && typeof t[e] == "function") && e != "__proto__")
    return t[e];
}
function Sl(t) {
  return la(t, So(t));
}
function jl(t, e, r, n, o, i, s) {
  var c = sr(t, r), a = sr(e, r), l = s.get(a);
  if (l) {
    ir(t, r, l);
    return;
  }
  var f = i ? i(c, a, r + "", t, e, s) : void 0, p = f === void 0;
  if (p) {
    var v = at(a), d = !v && Oe(a), b = !v && !d && Rr(a);
    f = a, v || d || b ? at(c) ? f = c : El(c) ? f = Hs(c) : d ? (p = !1, f = fc(a, !0)) : b ? (p = !1, f = Nc(a, !0)) : f = [] : nc(a) || be(a) ? (f = c, be(c) ? f = Sl(c) : (!jt(c) || jr(c)) && (f = Dc(a))) : p = !1;
  }
  p && (s.set(a, f), o(f, a, n, i, s), s.delete(a)), ir(t, r, f);
}
function $o(t, e, r, n, o) {
  t !== e && Lo(e, function(i, s) {
    if (o || (o = new lt()), jt(i))
      jl(t, e, s, r, $o, n, o);
    else {
      var c = n ? n(sr(t, s), i, s + "", t, e, o) : void 0;
      c === void 0 && (c = i), ir(t, s, c);
    }
  }, So);
}
function Al(t, e, r) {
  for (var n = -1, o = t == null ? 0 : t.length; ++n < o; )
    if (r(e, t[n]))
      return !0;
  return !1;
}
function xl(t, e) {
  var r = {};
  return e = ko(e), _l(t, function(n, o, i) {
    Ae(r, o, e(n, o, i));
  }), r;
}
var Tl = va(function(t, e, r) {
  $o(t, e, r);
});
const Rl = Tl;
var Nl = 1 / 0, Dl = Ft && 1 / Cr(new Ft([, -0]))[1] == Nl ? function(t) {
  return new Ft(t);
} : zs;
const Pl = Dl;
var Cl = 200;
function kl(t, e, r) {
  var n = -1, o = oa, i = t.length, s = !0, c = [], a = c;
  if (r)
    s = !1, o = Al;
  else if (i >= Cl) {
    var l = e ? null : Pl(t);
    if (l)
      return Cr(l);
    s = !1, o = No, a = new Gt();
  } else
    a = e ? [] : c;
  t:
    for (; ++n < i; ) {
      var f = t[n], p = e ? e(f) : f;
      if (f = r || f !== 0 ? f : 0, s && p === p) {
        for (var v = a.length; v--; )
          if (a[v] === p)
            continue t;
        e && a.push(p), c.push(f);
      } else
        o(a, p, r) || (a !== c && a.push(p), c.push(f));
    }
  return c;
}
function Ll(t, e) {
  return t && t.length ? kl(t, ko(e)) : [];
}
var ar = /* @__PURE__ */ ((t) => (t.Json = "application/json", t.UrlEncoded = "application/x-www-form-urlencoded", t))(ar || {});
class $l {
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
      const i = (n = this.listeners[e]) == null ? void 0 : n.findIndex((s) => s === r);
      i && i > -1 && ((o = this.listeners[e]) == null || o.splice(i, 1));
    } else
      throw new Error(`${this} is doesn't have event "${String(e)}"`);
  }
}
function kn(t) {
  for (const e in t)
    Object.prototype.hasOwnProperty.call(t, e) && t[e] === void 0 && delete t[e];
  return t;
}
const ur = (t, e = "", r = new FormData()) => (Object.keys(t).forEach((n) => {
  const o = e !== "" ? e + "." + n : n, i = t[n];
  Array.isArray(i) ? i.forEach((s, c) => {
    typeof s == "object" ? s instanceof File ? r.append(o, s) : r = ur(s, o + `[${c}]`, r) : r.append(o, s);
  }) : typeof i == "object" ? i instanceof File ? r.append(o, i) : r = ur(i, o, r) : r.append(o, i);
}), r), _e = (t, e = "", r = new URLSearchParams()) => (Object.keys(t).forEach((n) => {
  const o = e !== "" ? e + "." + n : n, i = t[n];
  Array.isArray(i) ? i.forEach((s, c) => {
    typeof s == "object" ? r = _e(s, o + `[${c}]`, r) : r.append(o, s);
  }) : typeof i == "object" ? r = _e(i, o, r) : r.append(o, i);
}), r);
class Ul {
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
const Ln = new Ul();
class Il {
  getToken(e) {
    if (this.getPrefix())
      return localStorage.getItem(`${this.getPrefix()}_${e}`) || "";
  }
  setToken(e, r) {
    if (this.getPrefix())
      return localStorage.setItem(`${this.getPrefix()}_${e}`, r);
  }
  getPrefix() {
    const e = Ln.getConfig().modEnv, r = Ln.getConfig().subdomain;
    return !e || !r ? "" : `${e}_${r}`;
  }
}
const Ml = new Il();
function Uo(t, e) {
  return function() {
    return t.apply(e, arguments);
  };
}
const { toString: Io } = Object.prototype, { getPrototypeOf: Lr } = Object, $r = ((t) => (e) => {
  const r = Io.call(e);
  return t[r] || (t[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), Ot = (t) => (t = t.toLowerCase(), (e) => $r(e) === t), De = (t) => (e) => typeof e === t, { isArray: zt } = Array, Zt = De("undefined");
function Fl(t) {
  return t !== null && !Zt(t) && t.constructor !== null && !Zt(t.constructor) && Pt(t.constructor.isBuffer) && t.constructor.isBuffer(t);
}
const Mo = Ot("ArrayBuffer");
function Bl(t) {
  let e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(t) : e = t && t.buffer && Mo(t.buffer), e;
}
const zl = De("string"), Pt = De("function"), Fo = De("number"), Ur = (t) => t !== null && typeof t == "object", Hl = (t) => t === !0 || t === !1, pe = (t) => {
  if ($r(t) !== "object")
    return !1;
  const e = Lr(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in t) && !(Symbol.iterator in t);
}, Wl = Ot("Date"), Vl = Ot("File"), ql = Ot("Blob"), Kl = Ot("FileList"), Jl = (t) => Ur(t) && Pt(t.pipe), Yl = (t) => {
  const e = "[object FormData]";
  return t && (typeof FormData == "function" && t instanceof FormData || Io.call(t) === e || Pt(t.toString) && t.toString() === e);
}, Gl = Ot("URLSearchParams"), Zl = (t) => t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function oe(t, e, { allOwnKeys: r = !1 } = {}) {
  if (t === null || typeof t > "u")
    return;
  let n, o;
  if (typeof t != "object" && (t = [t]), zt(t))
    for (n = 0, o = t.length; n < o; n++)
      e.call(null, t[n], n, t);
  else {
    const i = r ? Object.getOwnPropertyNames(t) : Object.keys(t), s = i.length;
    let c;
    for (n = 0; n < s; n++)
      c = i[n], e.call(null, t[c], c, t);
  }
}
function Bo(t, e) {
  e = e.toLowerCase();
  const r = Object.keys(t);
  let n = r.length, o;
  for (; n-- > 0; )
    if (o = r[n], e === o.toLowerCase())
      return o;
  return null;
}
const zo = typeof self > "u" ? typeof global > "u" ? globalThis : global : self, Ho = (t) => !Zt(t) && t !== zo;
function cr() {
  const { caseless: t } = Ho(this) && this || {}, e = {}, r = (n, o) => {
    const i = t && Bo(e, o) || o;
    pe(e[i]) && pe(n) ? e[i] = cr(e[i], n) : pe(n) ? e[i] = cr({}, n) : zt(n) ? e[i] = n.slice() : e[i] = n;
  };
  for (let n = 0, o = arguments.length; n < o; n++)
    arguments[n] && oe(arguments[n], r);
  return e;
}
const Xl = (t, e, r, { allOwnKeys: n } = {}) => (oe(e, (o, i) => {
  r && Pt(o) ? t[i] = Uo(o, r) : t[i] = o;
}, { allOwnKeys: n }), t), Ql = (t) => (t.charCodeAt(0) === 65279 && (t = t.slice(1)), t), tf = (t, e, r, n) => {
  t.prototype = Object.create(e.prototype, n), t.prototype.constructor = t, Object.defineProperty(t, "super", {
    value: e.prototype
  }), r && Object.assign(t.prototype, r);
}, ef = (t, e, r, n) => {
  let o, i, s;
  const c = {};
  if (e = e || {}, t == null)
    return e;
  do {
    for (o = Object.getOwnPropertyNames(t), i = o.length; i-- > 0; )
      s = o[i], (!n || n(s, t, e)) && !c[s] && (e[s] = t[s], c[s] = !0);
    t = r !== !1 && Lr(t);
  } while (t && (!r || r(t, e)) && t !== Object.prototype);
  return e;
}, rf = (t, e, r) => {
  t = String(t), (r === void 0 || r > t.length) && (r = t.length), r -= e.length;
  const n = t.indexOf(e, r);
  return n !== -1 && n === r;
}, nf = (t) => {
  if (!t)
    return null;
  if (zt(t))
    return t;
  let e = t.length;
  if (!Fo(e))
    return null;
  const r = new Array(e);
  for (; e-- > 0; )
    r[e] = t[e];
  return r;
}, of = ((t) => (e) => t && e instanceof t)(typeof Uint8Array < "u" && Lr(Uint8Array)), sf = (t, e) => {
  const r = (t && t[Symbol.iterator]).call(t);
  let n;
  for (; (n = r.next()) && !n.done; ) {
    const o = n.value;
    e.call(t, o[0], o[1]);
  }
}, af = (t, e) => {
  let r;
  const n = [];
  for (; (r = t.exec(e)) !== null; )
    n.push(r);
  return n;
}, uf = Ot("HTMLFormElement"), cf = (t) => t.toLowerCase().replace(
  /[_-\s]([a-z\d])(\w*)/g,
  function(e, r, n) {
    return r.toUpperCase() + n;
  }
), $n = (({ hasOwnProperty: t }) => (e, r) => t.call(e, r))(Object.prototype), lf = Ot("RegExp"), Wo = (t, e) => {
  const r = Object.getOwnPropertyDescriptors(t), n = {};
  oe(r, (o, i) => {
    e(o, i, t) !== !1 && (n[i] = o);
  }), Object.defineProperties(t, n);
}, ff = (t) => {
  Wo(t, (e, r) => {
    if (Pt(t) && ["arguments", "caller", "callee"].indexOf(r) !== -1)
      return !1;
    const n = t[r];
    if (Pt(n)) {
      if (e.enumerable = !1, "writable" in e) {
        e.writable = !1;
        return;
      }
      e.set || (e.set = () => {
        throw Error("Can not rewrite read-only method '" + r + "'");
      });
    }
  });
}, pf = (t, e) => {
  const r = {}, n = (o) => {
    o.forEach((i) => {
      r[i] = !0;
    });
  };
  return zt(t) ? n(t) : n(String(t).split(e)), r;
}, hf = () => {
}, df = (t, e) => (t = +t, Number.isFinite(t) ? t : e), vf = (t) => {
  const e = new Array(10), r = (n, o) => {
    if (Ur(n)) {
      if (e.indexOf(n) >= 0)
        return;
      if (!("toJSON" in n)) {
        e[o] = n;
        const i = zt(n) ? [] : {};
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
  isArray: zt,
  isArrayBuffer: Mo,
  isBuffer: Fl,
  isFormData: Yl,
  isArrayBufferView: Bl,
  isString: zl,
  isNumber: Fo,
  isBoolean: Hl,
  isObject: Ur,
  isPlainObject: pe,
  isUndefined: Zt,
  isDate: Wl,
  isFile: Vl,
  isBlob: ql,
  isRegExp: lf,
  isFunction: Pt,
  isStream: Jl,
  isURLSearchParams: Gl,
  isTypedArray: of,
  isFileList: Kl,
  forEach: oe,
  merge: cr,
  extend: Xl,
  trim: Zl,
  stripBOM: Ql,
  inherits: tf,
  toFlatObject: ef,
  kindOf: $r,
  kindOfTest: Ot,
  endsWith: rf,
  toArray: nf,
  forEachEntry: sf,
  matchAll: af,
  isHTMLForm: uf,
  hasOwnProperty: $n,
  hasOwnProp: $n,
  reduceDescriptors: Wo,
  freezeMethods: ff,
  toObjectSet: pf,
  toCamelCase: cf,
  noop: hf,
  toFiniteNumber: df,
  findKey: Bo,
  global: zo,
  isContextDefined: Ho,
  toJSONObject: vf
};
function k(t, e, r, n, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = t, this.name = "AxiosError", e && (this.code = e), r && (this.config = r), n && (this.request = n), o && (this.response = o);
}
h.inherits(k, Error, {
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
const Vo = k.prototype, qo = {};
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
  qo[t] = { value: t };
});
Object.defineProperties(k, qo);
Object.defineProperty(Vo, "isAxiosError", { value: !0 });
k.from = (t, e, r, n, o, i) => {
  const s = Object.create(Vo);
  return h.toFlatObject(t, s, function(c) {
    return c !== Error.prototype;
  }, (c) => c !== "isAxiosError"), k.call(s, t.message, e, r, n, o), s.cause = t, s.name = t.name, i && Object.assign(s, i), s;
};
var yf = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, mf = typeof self == "object" ? self.FormData : window.FormData;
const gf = mf;
function lr(t) {
  return h.isPlainObject(t) || h.isArray(t);
}
function Ko(t) {
  return h.endsWith(t, "[]") ? t.slice(0, -2) : t;
}
function Un(t, e, r) {
  return t ? t.concat(e).map(function(n, o) {
    return n = Ko(n), !r && o ? "[" + n + "]" : n;
  }).join(r ? "." : "") : e;
}
function bf(t) {
  return h.isArray(t) && !t.some(lr);
}
const Of = h.toFlatObject(h, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function wf(t) {
  return t && h.isFunction(t.append) && t[Symbol.toStringTag] === "FormData" && t[Symbol.iterator];
}
function Pe(t, e, r) {
  if (!h.isObject(t))
    throw new TypeError("target must be an object");
  e = e || new (gf || FormData)(), r = h.toFlatObject(r, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(d, b) {
    return !h.isUndefined(b[d]);
  });
  const n = r.metaTokens, o = r.visitor || l, i = r.dots, s = r.indexes, c = (r.Blob || typeof Blob < "u" && Blob) && wf(e);
  if (!h.isFunction(o))
    throw new TypeError("visitor must be a function");
  function a(d) {
    if (d === null)
      return "";
    if (h.isDate(d))
      return d.toISOString();
    if (!c && h.isBlob(d))
      throw new k("Blob is not supported. Use a Buffer instead.");
    return h.isArrayBuffer(d) || h.isTypedArray(d) ? c && typeof Blob == "function" ? new Blob([d]) : Buffer.from(d) : d;
  }
  function l(d, b, _) {
    let R = d;
    if (d && !_ && typeof d == "object") {
      if (h.endsWith(b, "{}"))
        b = n ? b : b.slice(0, -2), d = JSON.stringify(d);
      else if (h.isArray(d) && bf(d) || h.isFileList(d) || h.endsWith(b, "[]") && (R = h.toArray(d)))
        return b = Ko(b), R.forEach(function(F, K) {
          !(h.isUndefined(F) || F === null) && e.append(
            s === !0 ? Un([b], K, i) : s === null ? b : b + "[]",
            a(F)
          );
        }), !1;
    }
    return lr(d) ? !0 : (e.append(Un(_, b, i), a(d)), !1);
  }
  const f = [], p = Object.assign(Of, {
    defaultVisitor: l,
    convertValue: a,
    isVisitable: lr
  });
  function v(d, b) {
    if (!h.isUndefined(d)) {
      if (f.indexOf(d) !== -1)
        throw Error("Circular reference detected in " + b.join("."));
      f.push(d), h.forEach(d, function(_, R) {
        (!(h.isUndefined(_) || _ === null) && o.call(
          e,
          _,
          h.isString(R) ? R.trim() : R,
          b,
          p
        )) === !0 && v(_, b ? b.concat(R) : [R]);
      }), f.pop();
    }
  }
  if (!h.isObject(t))
    throw new TypeError("data must be an object");
  return v(t), e;
}
function In(t) {
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
function Ir(t, e) {
  this._pairs = [], t && Pe(t, this, e);
}
const Jo = Ir.prototype;
Jo.append = function(t, e) {
  this._pairs.push([t, e]);
};
Jo.toString = function(t) {
  const e = t ? function(r) {
    return t.call(this, r, In);
  } : In;
  return this._pairs.map(function(r) {
    return e(r[0]) + "=" + e(r[1]);
  }, "").join("&");
};
function _f(t) {
  return encodeURIComponent(t).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Yo(t, e, r) {
  if (!e)
    return t;
  const n = r && r.encode || _f, o = r && r.serialize;
  let i;
  if (o ? i = o(e, r) : i = h.isURLSearchParams(e) ? e.toString() : new Ir(e, r).toString(n), i) {
    const s = t.indexOf("#");
    s !== -1 && (t = t.slice(0, s)), t += (t.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return t;
}
class Ef {
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
const Mn = Ef, Go = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Sf = typeof URLSearchParams < "u" ? URLSearchParams : Ir, jf = FormData, Af = (() => {
  let t;
  return typeof navigator < "u" && ((t = navigator.product) === "ReactNative" || t === "NativeScript" || t === "NS") ? !1 : typeof window < "u" && typeof document < "u";
})(), xf = (() => typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), ct = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Sf,
    FormData: jf,
    Blob
  },
  isStandardBrowserEnv: Af,
  isStandardBrowserWebWorkerEnv: xf,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function Tf(t, e) {
  return Pe(t, new ct.classes.URLSearchParams(), Object.assign({
    visitor: function(r, n, o, i) {
      return ct.isNode && h.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments);
    }
  }, e));
}
function Rf(t) {
  return h.matchAll(/\w+|\[(\w*)]/g, t).map((e) => e[0] === "[]" ? "" : e[1] || e[0]);
}
function Nf(t) {
  const e = {}, r = Object.keys(t);
  let n;
  const o = r.length;
  let i;
  for (n = 0; n < o; n++)
    i = r[n], e[i] = t[i];
  return e;
}
function Zo(t) {
  function e(r, n, o, i) {
    let s = r[i++];
    const c = Number.isFinite(+s), a = i >= r.length;
    return s = !s && h.isArray(o) ? o.length : s, a ? (h.hasOwnProp(o, s) ? o[s] = [o[s], n] : o[s] = n, !c) : ((!o[s] || !h.isObject(o[s])) && (o[s] = []), e(r, n, o[s], i) && h.isArray(o[s]) && (o[s] = Nf(o[s])), !c);
  }
  if (h.isFormData(t) && h.isFunction(t.entries)) {
    const r = {};
    return h.forEachEntry(t, (n, o) => {
      e(Rf(n), o, r, 0);
    }), r;
  }
  return null;
}
const Df = {
  "Content-Type": void 0
};
function Pf(t, e, r) {
  if (h.isString(t))
    try {
      return (e || JSON.parse)(t), h.trim(t);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (r || JSON.stringify)(t);
}
const Ce = {
  transitional: Go,
  adapter: ["xhr", "http"],
  transformRequest: [function(t, e) {
    const r = e.getContentType() || "", n = r.indexOf("application/json") > -1, o = h.isObject(t);
    if (o && h.isHTMLForm(t) && (t = new FormData(t)), h.isFormData(t))
      return n && n ? JSON.stringify(Zo(t)) : t;
    if (h.isArrayBuffer(t) || h.isBuffer(t) || h.isStream(t) || h.isFile(t) || h.isBlob(t))
      return t;
    if (h.isArrayBufferView(t))
      return t.buffer;
    if (h.isURLSearchParams(t))
      return e.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let i;
    if (o) {
      if (r.indexOf("application/x-www-form-urlencoded") > -1)
        return Tf(t, this.formSerializer).toString();
      if ((i = h.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
        const s = this.env && this.env.FormData;
        return Pe(
          i ? { "files[]": t } : t,
          s && new s(),
          this.formSerializer
        );
      }
    }
    return o || n ? (e.setContentType("application/json", !1), Pf(t)) : t;
  }],
  transformResponse: [function(t) {
    const e = this.transitional || Ce.transitional, r = e && e.forcedJSONParsing, n = this.responseType === "json";
    if (t && h.isString(t) && (r && !this.responseType || n)) {
      const o = !(e && e.silentJSONParsing) && n;
      try {
        return JSON.parse(t);
      } catch (i) {
        if (o)
          throw i.name === "SyntaxError" ? k.from(i, k.ERR_BAD_RESPONSE, this, null, this.response) : i;
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
  Ce.headers[t] = {};
});
h.forEach(["post", "put", "patch"], function(t) {
  Ce.headers[t] = h.merge(Df);
});
const Mr = Ce, Cf = h.toObjectSet([
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
]), kf = (t) => {
  const e = {};
  let r, n, o;
  return t && t.split(`
`).forEach(function(i) {
    o = i.indexOf(":"), r = i.substring(0, o).trim().toLowerCase(), n = i.substring(o + 1).trim(), !(!r || e[r] && Cf[r]) && (r === "set-cookie" ? e[r] ? e[r].push(n) : e[r] = [n] : e[r] = e[r] ? e[r] + ", " + n : n);
  }), e;
}, Fn = Symbol("internals");
function qt(t) {
  return t && String(t).trim().toLowerCase();
}
function he(t) {
  return t === !1 || t == null ? t : h.isArray(t) ? t.map(he) : String(t);
}
function Lf(t) {
  const e = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(t); )
    e[n[1]] = n[2];
  return e;
}
function $f(t) {
  return /^[-_a-zA-Z]+$/.test(t.trim());
}
function Bn(t, e, r, n) {
  if (h.isFunction(n))
    return n.call(this, e, r);
  if (h.isString(e)) {
    if (h.isString(n))
      return e.indexOf(n) !== -1;
    if (h.isRegExp(n))
      return n.test(e);
  }
}
function Uf(t) {
  return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, r, n) => r.toUpperCase() + n);
}
function If(t, e) {
  const r = h.toCamelCase(" " + e);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(t, n + r, {
      value: function(o, i, s) {
        return this[n].call(this, e, o, i, s);
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
    function o(s, c, a) {
      const l = qt(c);
      if (!l)
        throw new Error("header name must be a non-empty string");
      const f = h.findKey(n, l);
      (!f || n[f] === void 0 || a === !0 || a === void 0 && n[f] !== !1) && (n[f || c] = he(s));
    }
    const i = (s, c) => h.forEach(s, (a, l) => o(a, l, c));
    return h.isPlainObject(t) || t instanceof this.constructor ? i(t, e) : h.isString(t) && (t = t.trim()) && !$f(t) ? i(kf(t), e) : t != null && o(e, t, r), this;
  }
  get(t, e) {
    if (t = qt(t), t) {
      const r = h.findKey(this, t);
      if (r) {
        const n = this[r];
        if (!e)
          return n;
        if (e === !0)
          return Lf(n);
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
      return !!(r && (!e || Bn(this, this[r], r, e)));
    }
    return !1;
  }
  delete(t, e) {
    const r = this;
    let n = !1;
    function o(i) {
      if (i = qt(i), i) {
        const s = h.findKey(r, i);
        s && (!e || Bn(r, r[s], s, e)) && (delete r[s], n = !0);
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
      const s = t ? Uf(o) : String(o).trim();
      s !== o && delete e[o], e[s] = he(n), r[s] = !0;
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
    const e = (this[Fn] = this[Fn] = {
      accessors: {}
    }).accessors, r = this.prototype;
    function n(o) {
      const i = qt(o);
      e[i] || (If(r, o), e[i] = !0);
    }
    return h.isArray(t) ? t.forEach(n) : n(t), this;
  }
};
ke.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent"]);
h.freezeMethods(ke.prototype);
h.freezeMethods(ke);
const yt = ke;
function Ke(t, e) {
  const r = this || Mr, n = e || r, o = yt.from(n.headers);
  let i = n.data;
  return h.forEach(t, function(s) {
    i = s.call(r, i, o.normalize(), e ? e.status : void 0);
  }), o.normalize(), i;
}
function Xo(t) {
  return !!(t && t.__CANCEL__);
}
function ie(t, e, r) {
  k.call(this, t ?? "canceled", k.ERR_CANCELED, e, r), this.name = "CanceledError";
}
h.inherits(ie, k, {
  __CANCEL__: !0
});
const Mf = null;
function Ff(t, e, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? t(r) : e(new k(
    "Request failed with status code " + r.status,
    [k.ERR_BAD_REQUEST, k.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
    r.config,
    r.request,
    r
  ));
}
const Bf = ct.isStandardBrowserEnv ? function() {
  return {
    write: function(t, e, r, n, o, i) {
      const s = [];
      s.push(t + "=" + encodeURIComponent(e)), h.isNumber(r) && s.push("expires=" + new Date(r).toGMTString()), h.isString(n) && s.push("path=" + n), h.isString(o) && s.push("domain=" + o), i === !0 && s.push("secure"), document.cookie = s.join("; ");
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
function zf(t) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
}
function Hf(t, e) {
  return e ? t.replace(/\/+$/, "") + "/" + e.replace(/^\/+/, "") : t;
}
function Qo(t, e) {
  return t && !zf(e) ? Hf(t, e) : e;
}
const Wf = ct.isStandardBrowserEnv ? function() {
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
function Vf(t) {
  const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
  return e && e[1] || "";
}
function qf(t, e) {
  t = t || 10;
  const r = new Array(t), n = new Array(t);
  let o = 0, i = 0, s;
  return e = e !== void 0 ? e : 1e3, function(c) {
    const a = Date.now(), l = n[i];
    s || (s = a), r[o] = c, n[o] = a;
    let f = i, p = 0;
    for (; f !== o; )
      p += r[f++], f = f % t;
    if (o = (o + 1) % t, o === i && (i = (i + 1) % t), a - s < e)
      return;
    const v = l && a - l;
    return v ? Math.round(p * 1e3 / v) : void 0;
  };
}
function zn(t, e) {
  let r = 0;
  const n = qf(50, 250);
  return (o) => {
    const i = o.loaded, s = o.lengthComputable ? o.total : void 0, c = i - r, a = n(c), l = i <= s;
    r = i;
    const f = {
      loaded: i,
      total: s,
      progress: s ? i / s : void 0,
      bytes: c,
      rate: a || void 0,
      estimated: a && s && l ? (s - i) / a : void 0,
      event: o
    };
    f[e ? "download" : "upload"] = !0, t(f);
  };
}
const Kf = typeof XMLHttpRequest < "u", Jf = Kf && function(t) {
  return new Promise(function(e, r) {
    let n = t.data;
    const o = yt.from(t.headers).normalize(), i = t.responseType;
    let s;
    function c() {
      t.cancelToken && t.cancelToken.unsubscribe(s), t.signal && t.signal.removeEventListener("abort", s);
    }
    h.isFormData(n) && (ct.isStandardBrowserEnv || ct.isStandardBrowserWebWorkerEnv) && o.setContentType(!1);
    let a = new XMLHttpRequest();
    if (t.auth) {
      const v = t.auth.username || "", d = t.auth.password ? unescape(encodeURIComponent(t.auth.password)) : "";
      o.set("Authorization", "Basic " + btoa(v + ":" + d));
    }
    const l = Qo(t.baseURL, t.url);
    a.open(t.method.toUpperCase(), Yo(l, t.params, t.paramsSerializer), !0), a.timeout = t.timeout;
    function f() {
      if (!a)
        return;
      const v = yt.from(
        "getAllResponseHeaders" in a && a.getAllResponseHeaders()
      ), d = {
        data: !i || i === "text" || i === "json" ? a.responseText : a.response,
        status: a.status,
        statusText: a.statusText,
        headers: v,
        config: t,
        request: a
      };
      Ff(function(b) {
        e(b), c();
      }, function(b) {
        r(b), c();
      }, d), a = null;
    }
    if ("onloadend" in a ? a.onloadend = f : a.onreadystatechange = function() {
      !a || a.readyState !== 4 || a.status === 0 && !(a.responseURL && a.responseURL.indexOf("file:") === 0) || setTimeout(f);
    }, a.onabort = function() {
      a && (r(new k("Request aborted", k.ECONNABORTED, t, a)), a = null);
    }, a.onerror = function() {
      r(new k("Network Error", k.ERR_NETWORK, t, a)), a = null;
    }, a.ontimeout = function() {
      let v = t.timeout ? "timeout of " + t.timeout + "ms exceeded" : "timeout exceeded";
      const d = t.transitional || Go;
      t.timeoutErrorMessage && (v = t.timeoutErrorMessage), r(new k(
        v,
        d.clarifyTimeoutError ? k.ETIMEDOUT : k.ECONNABORTED,
        t,
        a
      )), a = null;
    }, ct.isStandardBrowserEnv) {
      const v = (t.withCredentials || Wf(l)) && t.xsrfCookieName && Bf.read(t.xsrfCookieName);
      v && o.set(t.xsrfHeaderName, v);
    }
    n === void 0 && o.setContentType(null), "setRequestHeader" in a && h.forEach(o.toJSON(), function(v, d) {
      a.setRequestHeader(d, v);
    }), h.isUndefined(t.withCredentials) || (a.withCredentials = !!t.withCredentials), i && i !== "json" && (a.responseType = t.responseType), typeof t.onDownloadProgress == "function" && a.addEventListener("progress", zn(t.onDownloadProgress, !0)), typeof t.onUploadProgress == "function" && a.upload && a.upload.addEventListener("progress", zn(t.onUploadProgress)), (t.cancelToken || t.signal) && (s = (v) => {
      a && (r(!v || v.type ? new ie(null, t, a) : v), a.abort(), a = null);
    }, t.cancelToken && t.cancelToken.subscribe(s), t.signal && (t.signal.aborted ? s() : t.signal.addEventListener("abort", s)));
    const p = Vf(l);
    if (p && ct.protocols.indexOf(p) === -1) {
      r(new k("Unsupported protocol " + p + ":", k.ERR_BAD_REQUEST, t));
      return;
    }
    a.send(n || null);
  });
}, de = {
  http: Mf,
  xhr: Jf
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
const Yf = {
  getAdapter: (t) => {
    t = h.isArray(t) ? t : [t];
    const { length: e } = t;
    let r, n;
    for (let o = 0; o < e && (r = t[o], !(n = h.isString(r) ? de[r.toLowerCase()] : r)); o++)
      ;
    if (!n)
      throw n === !1 ? new k(
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
function Je(t) {
  if (t.cancelToken && t.cancelToken.throwIfRequested(), t.signal && t.signal.aborted)
    throw new ie(null, t);
}
function Hn(t) {
  return Je(t), t.headers = yt.from(t.headers), t.data = Ke.call(
    t,
    t.transformRequest
  ), ["post", "put", "patch"].indexOf(t.method) !== -1 && t.headers.setContentType("application/x-www-form-urlencoded", !1), Yf.getAdapter(t.adapter || Mr.adapter)(t).then(function(e) {
    return Je(t), e.data = Ke.call(
      t,
      t.transformResponse,
      e
    ), e.headers = yt.from(e.headers), e;
  }, function(e) {
    return Xo(e) || (Je(t), e && e.response && (e.response.data = Ke.call(
      t,
      t.transformResponse,
      e.response
    ), e.response.headers = yt.from(e.response.headers))), Promise.reject(e);
  });
}
const Wn = (t) => t instanceof yt ? t.toJSON() : t;
function Bt(t, e) {
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
  function s(l, f) {
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
  const a = {
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
    validateStatus: c,
    headers: (l, f) => o(Wn(l), Wn(f), !0)
  };
  return h.forEach(Object.keys(t).concat(Object.keys(e)), function(l) {
    const f = a[l] || o, p = f(t[l], e[l], l);
    h.isUndefined(p) && f !== c || (r[l] = p);
  }), r;
}
const ti = "1.2.1", Fr = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((t, e) => {
  Fr[t] = function(r) {
    return typeof r === t || "a" + (e < 1 ? "n " : " ") + t;
  };
});
const Vn = {};
Fr.transitional = function(t, e, r) {
  function n(o, i) {
    return "[Axios v" + ti + "] Transitional option '" + o + "'" + i + (r ? ". " + r : "");
  }
  return (o, i, s) => {
    if (t === !1)
      throw new k(
        n(i, " has been removed" + (e ? " in " + e : "")),
        k.ERR_DEPRECATED
      );
    return e && !Vn[i] && (Vn[i] = !0, console.warn(
      n(
        i,
        " has been deprecated since v" + e + " and will be removed in the near future"
      )
    )), t ? t(o, i, s) : !0;
  };
};
function Gf(t, e, r) {
  if (typeof t != "object")
    throw new k("options must be an object", k.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(t);
  let o = n.length;
  for (; o-- > 0; ) {
    const i = n[o], s = e[i];
    if (s) {
      const c = t[i], a = c === void 0 || s(c, i, t);
      if (a !== !0)
        throw new k("option " + i + " must be " + a, k.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0)
      throw new k("Unknown option " + i, k.ERR_BAD_OPTION);
  }
}
const fr = {
  assertOptions: Gf,
  validators: Fr
}, _t = fr.validators;
let Ee = class {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new Mn(),
      response: new Mn()
    };
  }
  request(t, e) {
    typeof t == "string" ? (e = e || {}, e.url = t) : e = t || {}, e = Bt(this.defaults, e);
    const { transitional: r, paramsSerializer: n, headers: o } = e;
    r !== void 0 && fr.assertOptions(r, {
      silentJSONParsing: _t.transitional(_t.boolean),
      forcedJSONParsing: _t.transitional(_t.boolean),
      clarifyTimeoutError: _t.transitional(_t.boolean)
    }, !1), n !== void 0 && fr.assertOptions(n, {
      encode: _t.function,
      serialize: _t.function
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
    ), e.headers = yt.concat(i, o);
    const s = [];
    let c = !0;
    this.interceptors.request.forEach(function(d) {
      typeof d.runWhen == "function" && d.runWhen(e) === !1 || (c = c && d.synchronous, s.unshift(d.fulfilled, d.rejected));
    });
    const a = [];
    this.interceptors.response.forEach(function(d) {
      a.push(d.fulfilled, d.rejected);
    });
    let l, f = 0, p;
    if (!c) {
      const d = [Hn.bind(this), void 0];
      for (d.unshift.apply(d, s), d.push.apply(d, a), p = d.length, l = Promise.resolve(e); f < p; )
        l = l.then(d[f++], d[f++]);
      return l;
    }
    p = s.length;
    let v = e;
    for (f = 0; f < p; ) {
      const d = s[f++], b = s[f++];
      try {
        v = d(v);
      } catch (_) {
        b.call(this, _);
        break;
      }
    }
    try {
      l = Hn.call(this, v);
    } catch (d) {
      return Promise.reject(d);
    }
    for (f = 0, p = a.length; f < p; )
      l = l.then(a[f++], a[f++]);
    return l;
  }
  getUri(t) {
    t = Bt(this.defaults, t);
    const e = Qo(t.baseURL, t.url);
    return Yo(e, t.params, t.paramsSerializer);
  }
};
h.forEach(["delete", "get", "head", "options"], function(t) {
  Ee.prototype[t] = function(e, r) {
    return this.request(Bt(r || {}, {
      method: t,
      url: e,
      data: (r || {}).data
    }));
  };
});
h.forEach(["post", "put", "patch"], function(t) {
  function e(r) {
    return function(n, o, i) {
      return this.request(Bt(i || {}, {
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
let ei = class {
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
      const i = new Promise((s) => {
        r.subscribe(s), o = s;
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
      token: new ei(function(e) {
        t = e;
      }),
      cancel: t
    };
  }
};
const Zf = ei;
function Xf(t) {
  return function(e) {
    return t.apply(null, e);
  };
}
function Qf(t) {
  return h.isObject(t) && t.isAxiosError === !0;
}
function ri(t) {
  const e = new ve(t), r = Uo(ve.prototype.request, e);
  return h.extend(r, ve.prototype, e, { allOwnKeys: !0 }), h.extend(r, e, null, { allOwnKeys: !0 }), r.create = function(n) {
    return ri(Bt(t, n));
  }, r;
}
const Q = ri(Mr);
Q.Axios = ve;
Q.CanceledError = ie;
Q.CancelToken = Zf;
Q.isCancel = Xo;
Q.VERSION = ti;
Q.toFormData = Pe;
Q.AxiosError = k;
Q.Cancel = Q.CanceledError;
Q.all = function(t) {
  return Promise.all(t);
};
Q.spread = Xf;
Q.isAxiosError = Qf;
Q.mergeConfig = Bt;
Q.AxiosHeaders = yt;
Q.formToJSON = (t) => Zo(h.isHTMLForm(t) ? new FormData(t) : t);
Q.default = Q;
const tp = Q;
var pr = function(t, e) {
  return pr = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
    r.__proto__ = n;
  } || function(r, n) {
    for (var o in n)
      Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
  }, pr(t, e);
};
function Le(t, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  pr(t, e);
  function r() {
    this.constructor = t;
  }
  t.prototype = e === null ? Object.create(e) : (r.prototype = e.prototype, new r());
}
function hr(t) {
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
function dr(t, e) {
  var r = typeof Symbol == "function" && t[Symbol.iterator];
  if (!r)
    return t;
  var n = r.call(t), o, i = [], s;
  try {
    for (; (e === void 0 || e-- > 0) && !(o = n.next()).done; )
      i.push(o.value);
  } catch (c) {
    s = { error: c };
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
function vr(t, e, r) {
  if (r || arguments.length === 2)
    for (var n = 0, o = e.length, i; n < o; n++)
      (i || !(n in e)) && (i || (i = Array.prototype.slice.call(e, 0, n)), i[n] = e[n]);
  return t.concat(i || Array.prototype.slice.call(e));
}
function mt(t) {
  return typeof t == "function";
}
function Br(t) {
  var e = function(n) {
    Error.call(n), n.stack = new Error().stack;
  }, r = t(e);
  return r.prototype = Object.create(Error.prototype), r.prototype.constructor = r, r;
}
var Ye = Br(function(t) {
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
var $e = function() {
  function t(e) {
    this.initialTeardown = e, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return t.prototype.unsubscribe = function() {
    var e, r, n, o, i;
    if (!this.closed) {
      this.closed = !0;
      var s = this._parentage;
      if (s)
        if (this._parentage = null, Array.isArray(s))
          try {
            for (var c = hr(s), a = c.next(); !a.done; a = c.next()) {
              var l = a.value;
              l.remove(this);
            }
          } catch (_) {
            e = { error: _ };
          } finally {
            try {
              a && !a.done && (r = c.return) && r.call(c);
            } finally {
              if (e)
                throw e.error;
            }
          }
        else
          s.remove(this);
      var f = this.initialTeardown;
      if (mt(f))
        try {
          f();
        } catch (_) {
          i = _ instanceof Ye ? _.errors : [_];
        }
      var p = this._finalizers;
      if (p) {
        this._finalizers = null;
        try {
          for (var v = hr(p), d = v.next(); !d.done; d = v.next()) {
            var b = d.value;
            try {
              qn(b);
            } catch (_) {
              i = i ?? [], _ instanceof Ye ? i = vr(vr([], dr(i)), dr(_.errors)) : i.push(_);
            }
          }
        } catch (_) {
          n = { error: _ };
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
        throw new Ye(i);
    }
  }, t.prototype.add = function(e) {
    var r;
    if (e && e !== this)
      if (this.closed)
        qn(e);
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
}(), ni = $e.EMPTY;
function oi(t) {
  return t instanceof $e || t && "closed" in t && mt(t.remove) && mt(t.add) && mt(t.unsubscribe);
}
function qn(t) {
  mt(t) ? t() : t.unsubscribe();
}
var ii = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1
}, ep = {
  setTimeout: function(t, e) {
    for (var r = [], n = 2; n < arguments.length; n++)
      r[n - 2] = arguments[n];
    return setTimeout.apply(void 0, vr([t, e], dr(r)));
  },
  clearTimeout: function(t) {
    return clearTimeout(t);
  },
  delegate: void 0
};
function rp(t) {
  ep.setTimeout(function() {
    throw t;
  });
}
function Kn() {
}
function ye(t) {
  t();
}
var si = function(t) {
  Le(e, t);
  function e(r) {
    var n = t.call(this) || this;
    return n.isStopped = !1, r ? (n.destination = r, oi(r) && r.add(n)) : n.destination = sp, n;
  }
  return e.create = function(r, n, o) {
    return new mr(r, n, o);
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
}($e), np = Function.prototype.bind;
function Ge(t, e) {
  return np.call(t, e);
}
var op = function() {
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
}(), mr = function(t) {
  Le(e, t);
  function e(r, n, o) {
    var i = t.call(this) || this, s;
    if (mt(r) || !r)
      s = {
        next: r ?? void 0,
        error: n ?? void 0,
        complete: o ?? void 0
      };
    else {
      var c;
      i && ii.useDeprecatedNextContext ? (c = Object.create(r), c.unsubscribe = function() {
        return i.unsubscribe();
      }, s = {
        next: r.next && Ge(r.next, c),
        error: r.error && Ge(r.error, c),
        complete: r.complete && Ge(r.complete, c)
      }) : s = r;
    }
    return i.destination = new op(s), i;
  }
  return e;
}(si);
function le(t) {
  rp(t);
}
function ip(t) {
  throw t;
}
var sp = {
  closed: !0,
  next: Kn,
  error: ip,
  complete: Kn
}, ap = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function up(t) {
  return t;
}
function cp(t) {
  return t.length === 0 ? up : t.length === 1 ? t[0] : function(e) {
    return t.reduce(function(r, n) {
      return n(r);
    }, e);
  };
}
var gr = function() {
  function t(e) {
    e && (this._subscribe = e);
  }
  return t.prototype.lift = function(e) {
    var r = new t();
    return r.source = this, r.operator = e, r;
  }, t.prototype.subscribe = function(e, r, n) {
    var o = this, i = fp(e) ? e : new mr(e, r, n);
    return ye(function() {
      var s = o, c = s.operator, a = s.source;
      i.add(c ? c.call(i, a) : a ? o._subscribe(i) : o._trySubscribe(i));
    }), i;
  }, t.prototype._trySubscribe = function(e) {
    try {
      return this._subscribe(e);
    } catch (r) {
      e.error(r);
    }
  }, t.prototype.forEach = function(e, r) {
    var n = this;
    return r = Jn(r), new r(function(o, i) {
      var s = new mr({
        next: function(c) {
          try {
            e(c);
          } catch (a) {
            i(a), s.unsubscribe();
          }
        },
        error: i,
        complete: o
      });
      n.subscribe(s);
    });
  }, t.prototype._subscribe = function(e) {
    var r;
    return (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(e);
  }, t.prototype[ap] = function() {
    return this;
  }, t.prototype.pipe = function() {
    for (var e = [], r = 0; r < arguments.length; r++)
      e[r] = arguments[r];
    return cp(e)(this);
  }, t.prototype.toPromise = function(e) {
    var r = this;
    return e = Jn(e), new e(function(n, o) {
      var i;
      r.subscribe(function(s) {
        return i = s;
      }, function(s) {
        return o(s);
      }, function() {
        return n(i);
      });
    });
  }, t.create = function(e) {
    return new t(e);
  }, t;
}();
function Jn(t) {
  var e;
  return (e = t ?? ii.Promise) !== null && e !== void 0 ? e : Promise;
}
function lp(t) {
  return t && mt(t.next) && mt(t.error) && mt(t.complete);
}
function fp(t) {
  return t && t instanceof si || lp(t) && oi(t);
}
var pp = Br(function(t) {
  return function() {
    t(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), hp = function(t) {
  Le(e, t);
  function e() {
    var r = t.call(this) || this;
    return r.closed = !1, r.currentObservers = null, r.observers = [], r.isStopped = !1, r.hasError = !1, r.thrownError = null, r;
  }
  return e.prototype.lift = function(r) {
    var n = new Yn(this, this);
    return n.operator = r, n;
  }, e.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new pp();
  }, e.prototype.next = function(r) {
    var n = this;
    ye(function() {
      var o, i;
      if (n._throwIfClosed(), !n.isStopped) {
        n.currentObservers || (n.currentObservers = Array.from(n.observers));
        try {
          for (var s = hr(n.currentObservers), c = s.next(); !c.done; c = s.next()) {
            var a = c.value;
            a.next(r);
          }
        } catch (l) {
          o = { error: l };
        } finally {
          try {
            c && !c.done && (i = s.return) && i.call(s);
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
    return i || s ? ni : (this.currentObservers = null, c.push(r), new $e(function() {
      n.currentObservers = null, yr(c, r);
    }));
  }, e.prototype._checkFinalizedStatuses = function(r) {
    var n = this, o = n.hasError, i = n.thrownError, s = n.isStopped;
    o ? r.error(i) : s && r.complete();
  }, e.prototype.asObservable = function() {
    var r = new gr();
    return r.source = this, r;
  }, e.create = function(r, n) {
    return new Yn(r, n);
  }, e;
}(gr), Yn = function(t) {
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
    return (o = (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(r)) !== null && o !== void 0 ? o : ni;
  }, e;
}(hp);
Br(function(t) {
  return function() {
    t(this), this.name = "EmptyError", this.message = "no elements in sequence";
  };
});
class zr {
  constructor(e) {
    rt(this, "config"), rt(this, "axios"), e && (this.config = e), this.axios = tp.create(this.config);
  }
  get interceptors() {
    return this.axios.interceptors;
  }
  static create(e) {
    return new zr(e);
  }
  request(e) {
    return new gr((r) => {
      const n = new AbortController();
      let o, i;
      return e.uploadProgressSubscriber && (o = (s) => {
        e.uploadProgressSubscriber && e.uploadProgressSubscriber.next(s);
      }), e.downloadProgressSubscriber && (i = (s) => {
        e.downloadProgressSubscriber && e.downloadProgressSubscriber.next(s);
      }), this.axios.request({
        ...e,
        onUploadProgress: o,
        onDownloadProgress: i,
        signal: n.signal
      }).then((s) => {
        r.next(s), r.complete(), e.uploadProgressSubscriber && e.uploadProgressSubscriber.complete(), e.downloadProgressSubscriber && e.downloadProgressSubscriber.complete();
      }).catch((s) => {
        r.error(s), e.uploadProgressSubscriber && e.uploadProgressSubscriber.error(s);
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
function dp(t) {
  return zr.create({
    baseURL: t
  });
}
const X = class {
  constructor(t, e) {
    rt(this, "axiosInstance"), rt(this, "defaultConfig", {
      contentType: "json",
      cache: !1
    }), rt(this, "tokenType"), this.axiosInstance = dp(t), this.setupInterceptor(), e && (this.defaultConfig = {
      ...this.defaultConfig,
      ...e
    });
  }
  static setAuthorizationTokenType(t) {
    X.tokenType = t;
  }
  static setGlobalParams(t) {
    X.globalParams = {
      ...X.globalParams,
      ...t
    };
  }
  static setGlobalData(t) {
    X.globalData = {
      ...X.globalData,
      ...t
    };
  }
  static setGlobalHeaders(t) {
    X.globalHeaders = {
      ...X.globalHeaders,
      ...t
    };
  }
  static addInterceptor(t) {
    return X.interceptors.add(t), () => {
      X.removeInterceptor(t);
    };
  }
  static removeInterceptor(t) {
    X.interceptors.delete(t);
  }
  setAuthorizationTokenType(t) {
    this.tokenType = t;
  }
  getTokenType(t) {
    return t.tokenType !== void 0 ? t.tokenType : this.tokenType !== void 0 ? this.tokenType : X.tokenType;
  }
  setupInterceptor() {
    this.axiosInstance.interceptors.request.use(
      async (t) => {
        if (t = await this.useRequestInterceptors(t), t = Rl({}, this.defaultConfig, t), t.headers = {
          ...t.headers,
          ...X.globalHeaders,
          "Content-Type": t.contentType === "formData" ? !1 : t.contentType === "urlEncoded" ? ar.UrlEncoded : ar.Json
        }, !t.preparedData) {
          if ((typeof t.cache < "u" ? t.cache : this.defaultConfig.cache) === !1 && (t.headers["Cache-Control"] = "no-cache", t.params = {
            ...t.params,
            axios_timestamp: Date.now()
          }), t.params = _e(
            kn({
              ...t.params,
              ...X.globalParams
            })
          ), t.data = {
            ...t.data,
            ...X.globalData
          }, kn(t.data), JSON.stringify(t.data) === "{}")
            t.data = void 0;
          else
            switch (t.contentType) {
              case "formData":
                t.data = ur(t.data);
                break;
              case "urlEncoded":
                t.data = _e(t.data);
            }
          t.preparedData = !0;
        }
        const e = this.getTokenType(t), r = e ? Ml.getToken(e) : null;
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
    for (const e of X.interceptors)
      e.request && (t = await e.request(t));
    return t;
  }
  async useErrorResponseInterceptor(t) {
    for (const e of X.interceptors)
      if (e.response && e.response.error)
        try {
          t = await e.response.error(t, this.axiosInstance);
        } catch {
          return t;
        }
    return t;
  }
  async useSuccessResponseInterceptor(t) {
    for (const e of X.interceptors)
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
let Mt = X;
rt(Mt, "tokenType", "base_token"), rt(Mt, "globalParams", {}), rt(Mt, "globalData", {}), rt(Mt, "globalHeaders", {}), rt(Mt, "interceptors", /* @__PURE__ */ new Set());
var Xt = {}, vp = {
  get exports() {
    return Xt;
  },
  set exports(t) {
    Xt = t;
  }
}, It = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Ze, Gn;
function ai() {
  if (Gn)
    return Ze;
  Gn = 1;
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
      for (var s = {}, c = 0; c < 10; c++)
        s["_" + String.fromCharCode(c)] = c;
      var a = Object.getOwnPropertyNames(s).map(function(f) {
        return s[f];
      });
      if (a.join("") !== "0123456789")
        return !1;
      var l = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(f) {
        l[f] = f;
      }), Object.keys(Object.assign({}, l)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Ze = o() ? Object.assign : function(i, s) {
    for (var c, a = n(i), l, f = 1; f < arguments.length; f++) {
      c = Object(arguments[f]);
      for (var p in c)
        e.call(c, p) && (a[p] = c[p]);
      if (t) {
        l = t(c);
        for (var v = 0; v < l.length; v++)
          r.call(c, l[v]) && (a[l[v]] = c[l[v]]);
      }
    }
    return a;
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
var Zn;
function yp() {
  if (Zn)
    return It;
  Zn = 1, ai();
  var t = Qt, e = 60103;
  if (It.Fragment = 60107, typeof Symbol == "function" && Symbol.for) {
    var r = Symbol.for;
    e = r("react.element"), It.Fragment = r("react.fragment");
  }
  var n = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = Object.prototype.hasOwnProperty, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function s(c, a, l) {
    var f, p = {}, v = null, d = null;
    l !== void 0 && (v = "" + l), a.key !== void 0 && (v = "" + a.key), a.ref !== void 0 && (d = a.ref);
    for (f in a)
      o.call(a, f) && !i.hasOwnProperty(f) && (p[f] = a[f]);
    if (c && c.defaultProps)
      for (f in a = c.defaultProps, a)
        p[f] === void 0 && (p[f] = a[f]);
    return { $$typeof: e, type: c, key: v, ref: d, props: p, _owner: n.current };
  }
  return It.jsx = s, It.jsxs = s, It;
}
var Xn = {};
/** @license React v17.0.2
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qn;
function mp() {
  return Qn || (Qn = 1, function(t) {
    process.env.NODE_ENV !== "production" && function() {
      var e = Qt, r = ai(), n = 60103, o = 60106;
      t.Fragment = 60107;
      var i = 60108, s = 60114, c = 60109, a = 60110, l = 60112, f = 60113, p = 60120, v = 60115, d = 60116, b = 60121, _ = 60122, R = 60117, F = 60129, K = 60131;
      if (typeof Symbol == "function" && Symbol.for) {
        var E = Symbol.for;
        n = E("react.element"), o = E("react.portal"), t.Fragment = E("react.fragment"), i = E("react.strict_mode"), s = E("react.profiler"), c = E("react.provider"), a = E("react.context"), l = E("react.forward_ref"), f = E("react.suspense"), p = E("react.suspense_list"), v = E("react.memo"), d = E("react.lazy"), b = E("react.block"), _ = E("react.server.block"), R = E("react.fundamental"), E("react.scope"), E("react.opaque.id"), F = E("react.debug_trace_mode"), E("react.offscreen"), K = E("react.legacy_hidden");
      }
      var D = typeof Symbol == "function" && Symbol.iterator, B = "@@iterator";
      function z(u) {
        if (u === null || typeof u != "object")
          return null;
        var y = D && u[D] || u[B];
        return typeof y == "function" ? y : null;
      }
      var tt = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function H(u) {
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
          var M = O.map(function(U) {
            return "" + U;
          });
          M.unshift("Warning: " + y), Function.prototype.apply.call(console[u], console, M);
        }
      }
      var C = !1;
      function wt(u) {
        return !!(typeof u == "string" || typeof u == "function" || u === t.Fragment || u === s || u === F || u === i || u === f || u === p || u === K || C || typeof u == "object" && u !== null && (u.$$typeof === d || u.$$typeof === v || u.$$typeof === c || u.$$typeof === a || u.$$typeof === l || u.$$typeof === R || u.$$typeof === b || u[0] === _));
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
        if (typeof u.tag == "number" && H("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue."), typeof u == "function")
          return u.displayName || u.name || null;
        if (typeof u == "string")
          return u;
        switch (u) {
          case t.Fragment:
            return "Fragment";
          case o:
            return "Portal";
          case s:
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
            case a:
              var y = u;
              return j(y) + ".Consumer";
            case c:
              var O = u;
              return j(O._context) + ".Provider";
            case l:
              return se(u, u.render, "ForwardRef");
            case v:
              return g(u.type);
            case b:
              return g(u._render);
            case d: {
              var S = u, I = S._payload, M = S._init;
              try {
                return g(M(I));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var m = 0, A, w, T, x, $, q, W;
      function G() {
      }
      G.__reactDisabledLog = !0;
      function ut() {
        {
          if (m === 0) {
            A = console.log, w = console.info, T = console.warn, x = console.error, $ = console.group, q = console.groupCollapsed, W = console.groupEnd;
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
                value: A
              }),
              info: r({}, u, {
                value: w
              }),
              warn: r({}, u, {
                value: T
              }),
              error: r({}, u, {
                value: x
              }),
              group: r({}, u, {
                value: $
              }),
              groupCollapsed: r({}, u, {
                value: q
              }),
              groupEnd: r({}, u, {
                value: W
              })
            });
          }
          m < 0 && H("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var pt = tt.ReactCurrentDispatcher, ht;
      function st(u, y, O) {
        {
          if (ht === void 0)
            try {
              throw Error();
            } catch (I) {
              var S = I.stack.trim().match(/\n( *(at )?)/);
              ht = S && S[1] || "";
            }
          return `
` + ht + u;
        }
      }
      var Z = !1, ot;
      {
        var Ht = typeof WeakMap == "function" ? WeakMap : Map;
        ot = new Ht();
      }
      function Tt(u, y) {
        if (!u || Z)
          return "";
        {
          var O = ot.get(u);
          if (O !== void 0)
            return O;
        }
        var S;
        Z = !0;
        var I = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var M;
        M = pt.current, pt.current = null, ut();
        try {
          if (y) {
            var U = function() {
              throw Error();
            };
            if (Object.defineProperty(U.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(U, []);
              } catch (vt) {
                S = vt;
              }
              Reflect.construct(u, [], U);
            } else {
              try {
                U.call();
              } catch (vt) {
                S = vt;
              }
              u.call(U.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (vt) {
              S = vt;
            }
            u();
          }
        } catch (vt) {
          if (vt && S && typeof vt.stack == "string") {
            for (var P = vt.stack.split(`
`), et = S.stack.split(`
`), J = P.length - 1, Y = et.length - 1; J >= 1 && Y >= 0 && P[J] !== et[Y]; )
              Y--;
            for (; J >= 1 && Y >= 0; J--, Y--)
              if (P[J] !== et[Y]) {
                if (J !== 1 || Y !== 1)
                  do
                    if (J--, Y--, Y < 0 || P[J] !== et[Y]) {
                      var dt = `
` + P[J].replace(" at new ", " at ");
                      return typeof u == "function" && ot.set(u, dt), dt;
                    }
                  while (J >= 1 && Y >= 0);
                break;
              }
          }
        } finally {
          Z = !1, pt.current = M, it(), Error.prepareStackTrace = I;
        }
        var Ut = u ? u.displayName || u.name : "", tn = Ut ? st(Ut) : "";
        return typeof u == "function" && ot.set(u, tn), tn;
      }
      function Hr(u, y, O) {
        return Tt(u, !1);
      }
      function ci(u) {
        var y = u.prototype;
        return !!(y && y.isReactComponent);
      }
      function ae(u, y, O) {
        if (u == null)
          return "";
        if (typeof u == "function")
          return Tt(u, ci(u));
        if (typeof u == "string")
          return st(u);
        switch (u) {
          case f:
            return st("Suspense");
          case p:
            return st("SuspenseList");
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
              var S = u, I = S._payload, M = S._init;
              try {
                return ae(M(I), y, O);
              } catch {
              }
            }
          }
        return "";
      }
      var Wr = {}, Vr = tt.ReactDebugCurrentFrame;
      function ue(u) {
        if (u) {
          var y = u._owner, O = ae(u.type, u._source, y ? y.type : null);
          Vr.setExtraStackFrame(O);
        } else
          Vr.setExtraStackFrame(null);
      }
      function li(u, y, O, S, I) {
        {
          var M = Function.call.bind(Object.prototype.hasOwnProperty);
          for (var U in u)
            if (M(u, U)) {
              var P = void 0;
              try {
                if (typeof u[U] != "function") {
                  var et = Error((S || "React class") + ": " + O + " type `" + U + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof u[U] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw et.name = "Invariant Violation", et;
                }
                P = u[U](y, U, S, O, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (J) {
                P = J;
              }
              P && !(P instanceof Error) && (ue(I), H("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", S || "React class", O, U, typeof P), ue(null)), P instanceof Error && !(P.message in Wr) && (Wr[P.message] = !0, ue(I), H("Failed %s type: %s", O, P.message), ue(null));
            }
        }
      }
      var Wt = tt.ReactCurrentOwner, Ue = Object.prototype.hasOwnProperty, fi = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, qr, Kr, Ie;
      Ie = {};
      function pi(u) {
        if (Ue.call(u, "ref")) {
          var y = Object.getOwnPropertyDescriptor(u, "ref").get;
          if (y && y.isReactWarning)
            return !1;
        }
        return u.ref !== void 0;
      }
      function hi(u) {
        if (Ue.call(u, "key")) {
          var y = Object.getOwnPropertyDescriptor(u, "key").get;
          if (y && y.isReactWarning)
            return !1;
        }
        return u.key !== void 0;
      }
      function di(u, y) {
        if (typeof u.ref == "string" && Wt.current && y && Wt.current.stateNode !== y) {
          var O = g(Wt.current.type);
          Ie[O] || (H('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', g(Wt.current.type), u.ref), Ie[O] = !0);
        }
      }
      function vi(u, y) {
        {
          var O = function() {
            qr || (qr = !0, H("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
          };
          O.isReactWarning = !0, Object.defineProperty(u, "key", {
            get: O,
            configurable: !0
          });
        }
      }
      function yi(u, y) {
        {
          var O = function() {
            Kr || (Kr = !0, H("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
          };
          O.isReactWarning = !0, Object.defineProperty(u, "ref", {
            get: O,
            configurable: !0
          });
        }
      }
      var mi = function(u, y, O, S, I, M, U) {
        var P = {
          $$typeof: n,
          type: u,
          key: y,
          ref: O,
          props: U,
          _owner: M
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
          value: S
        }), Object.defineProperty(P, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: I
        }), Object.freeze && (Object.freeze(P.props), Object.freeze(P)), P;
      };
      function gi(u, y, O, S, I) {
        {
          var M, U = {}, P = null, et = null;
          O !== void 0 && (P = "" + O), hi(y) && (P = "" + y.key), pi(y) && (et = y.ref, di(y, I));
          for (M in y)
            Ue.call(y, M) && !fi.hasOwnProperty(M) && (U[M] = y[M]);
          if (u && u.defaultProps) {
            var J = u.defaultProps;
            for (M in J)
              U[M] === void 0 && (U[M] = J[M]);
          }
          if (P || et) {
            var Y = typeof u == "function" ? u.displayName || u.name || "Unknown" : u;
            P && vi(U, Y), et && yi(U, Y);
          }
          return mi(u, P, et, I, S, Wt.current, U);
        }
      }
      var Me = tt.ReactCurrentOwner, Jr = tt.ReactDebugCurrentFrame;
      function $t(u) {
        if (u) {
          var y = u._owner, O = ae(u.type, u._source, y ? y.type : null);
          Jr.setExtraStackFrame(O);
        } else
          Jr.setExtraStackFrame(null);
      }
      var Fe;
      Fe = !1;
      function Be(u) {
        return typeof u == "object" && u !== null && u.$$typeof === n;
      }
      function Yr() {
        {
          if (Me.current) {
            var u = g(Me.current.type);
            if (u)
              return `

Check the render method of \`` + u + "`.";
          }
          return "";
        }
      }
      function bi(u) {
        {
          if (u !== void 0) {
            var y = u.fileName.replace(/^.*[\\\/]/, ""), O = u.lineNumber;
            return `

Check your code at ` + y + ":" + O + ".";
          }
          return "";
        }
      }
      var Gr = {};
      function Oi(u) {
        {
          var y = Yr();
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
          var O = Oi(y);
          if (Gr[O])
            return;
          Gr[O] = !0;
          var S = "";
          u && u._owner && u._owner !== Me.current && (S = " It was passed a child from " + g(u._owner.type) + "."), $t(u), H('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', O, S), $t(null);
        }
      }
      function Xr(u, y) {
        {
          if (typeof u != "object")
            return;
          if (Array.isArray(u))
            for (var O = 0; O < u.length; O++) {
              var S = u[O];
              Be(S) && Zr(S, y);
            }
          else if (Be(u))
            u._store && (u._store.validated = !0);
          else if (u) {
            var I = z(u);
            if (typeof I == "function" && I !== u.entries)
              for (var M = I.call(u), U; !(U = M.next()).done; )
                Be(U.value) && Zr(U.value, y);
          }
        }
      }
      function wi(u) {
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
            li(O, u.props, "prop", S, u);
          } else if (y.PropTypes !== void 0 && !Fe) {
            Fe = !0;
            var I = g(y);
            H("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", I || "Unknown");
          }
          typeof y.getDefaultProps == "function" && !y.getDefaultProps.isReactClassApproved && H("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function _i(u) {
        {
          for (var y = Object.keys(u.props), O = 0; O < y.length; O++) {
            var S = y[O];
            if (S !== "children" && S !== "key") {
              $t(u), H("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", S), $t(null);
              break;
            }
          }
          u.ref !== null && ($t(u), H("Invalid attribute `ref` supplied to `React.Fragment`."), $t(null));
        }
      }
      function Qr(u, y, O, S, I, M) {
        {
          var U = wt(u);
          if (!U) {
            var P = "";
            (u === void 0 || typeof u == "object" && u !== null && Object.keys(u).length === 0) && (P += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var et = bi(I);
            et ? P += et : P += Yr();
            var J;
            u === null ? J = "null" : Array.isArray(u) ? J = "array" : u !== void 0 && u.$$typeof === n ? (J = "<" + (g(u.type) || "Unknown") + " />", P = " Did you accidentally export a JSX literal instead of a component?") : J = typeof u, H("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", J, P);
          }
          var Y = gi(u, y, O, I, M);
          if (Y == null)
            return Y;
          if (U) {
            var dt = y.children;
            if (dt !== void 0)
              if (S)
                if (Array.isArray(dt)) {
                  for (var Ut = 0; Ut < dt.length; Ut++)
                    Xr(dt[Ut], u);
                  Object.freeze && Object.freeze(dt);
                } else
                  H("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
              else
                Xr(dt, u);
          }
          return u === t.Fragment ? _i(Y) : wi(Y), Y;
        }
      }
      function Ei(u, y, O) {
        return Qr(u, y, O, !0);
      }
      function Si(u, y, O) {
        return Qr(u, y, O, !1);
      }
      var ji = Si, Ai = Ei;
      t.jsx = ji, t.jsxs = Ai;
    }();
  }(Xn)), Xn;
}
(function(t) {
  process.env.NODE_ENV === "production" ? t.exports = yp() : t.exports = mp();
})(vp);
const ui = Xt.Fragment, me = Xt.jsx;
Xt.jsxs;
var to = {}, gp = {
  get exports() {
    return to;
  },
  set exports(t) {
    to = t;
  }
};
(function(t, e) {
  (function(r, n) {
    t.exports = n();
  })(yf, function() {
    var r = 1e3, n = 6e4, o = 36e5, i = "millisecond", s = "second", c = "minute", a = "hour", l = "day", f = "week", p = "month", v = "quarter", d = "year", b = "date", _ = "Invalid Date", R = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, F = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, K = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(j) {
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
      return { M: p, y: d, w: f, d: l, D: b, h: a, m: c, s, ms: i, Q: v }[j] || String(j || "").toLowerCase().replace(/s$/, "");
    }, u: function(j) {
      return j === void 0;
    } }, B = "en", z = {};
    z[B] = K;
    var tt = function(j) {
      return j instanceof wt;
    }, H = function j(g, m, A) {
      var w;
      if (!g)
        return B;
      if (typeof g == "string") {
        var T = g.toLowerCase();
        z[T] && (w = T), m && (z[T] = m, w = T);
        var x = g.split("-");
        if (!w && x.length > 1)
          return j(x[0]);
      } else {
        var $ = g.name;
        z[$] = g, w = $;
      }
      return !A && w && (B = w), w || !A && B;
    }, L = function(j, g) {
      if (tt(j))
        return j.clone();
      var m = typeof g == "object" ? g : {};
      return m.date = j, m.args = arguments, new wt(m);
    }, C = D;
    C.l = H, C.i = tt, C.w = function(j, g) {
      return L(j, { locale: g.$L, utc: g.$u, x: g.$x, $offset: g.$offset });
    };
    var wt = function() {
      function j(m) {
        this.$L = H(m.locale, null, !0), this.parse(m);
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
              var $ = x[2] - 1 || 0, q = (x[7] || "0").substring(0, 3);
              return T ? new Date(Date.UTC(x[1], $, x[3] || 1, x[4] || 0, x[5] || 0, x[6] || 0, q)) : new Date(x[1], $, x[3] || 1, x[4] || 0, x[5] || 0, x[6] || 0, q);
            }
          }
          return new Date(w);
        }(m), this.$x = m.x || {}, this.init();
      }, g.init = function() {
        var m = this.$d;
        this.$y = m.getFullYear(), this.$M = m.getMonth(), this.$D = m.getDate(), this.$W = m.getDay(), this.$H = m.getHours(), this.$m = m.getMinutes(), this.$s = m.getSeconds(), this.$ms = m.getMilliseconds();
      }, g.$utils = function() {
        return C;
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
        var w = this, T = !!C.u(A) || A, x = C.p(m), $ = function(st, Z) {
          var ot = C.w(w.$u ? Date.UTC(w.$y, Z, st) : new Date(w.$y, Z, st), w);
          return T ? ot : ot.endOf(l);
        }, q = function(st, Z) {
          return C.w(w.toDate()[st].apply(w.toDate("s"), (T ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(Z)), w);
        }, W = this.$W, G = this.$M, ut = this.$D, it = "set" + (this.$u ? "UTC" : "");
        switch (x) {
          case d:
            return T ? $(1, 0) : $(31, 11);
          case p:
            return T ? $(1, G) : $(0, G + 1);
          case f:
            var pt = this.$locale().weekStart || 0, ht = (W < pt ? W + 7 : W) - pt;
            return $(T ? ut - ht : ut + (6 - ht), G);
          case l:
          case b:
            return q(it + "Hours", 0);
          case a:
            return q(it + "Minutes", 1);
          case c:
            return q(it + "Seconds", 2);
          case s:
            return q(it + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, g.endOf = function(m) {
        return this.startOf(m, !1);
      }, g.$set = function(m, A) {
        var w, T = C.p(m), x = "set" + (this.$u ? "UTC" : ""), $ = (w = {}, w[l] = x + "Date", w[b] = x + "Date", w[p] = x + "Month", w[d] = x + "FullYear", w[a] = x + "Hours", w[c] = x + "Minutes", w[s] = x + "Seconds", w[i] = x + "Milliseconds", w)[T], q = T === l ? this.$D + (A - this.$W) : A;
        if (T === p || T === d) {
          var W = this.clone().set(b, 1);
          W.$d[$](q), W.init(), this.$d = W.set(b, Math.min(this.$D, W.daysInMonth())).$d;
        } else
          $ && this.$d[$](q);
        return this.init(), this;
      }, g.set = function(m, A) {
        return this.clone().$set(m, A);
      }, g.get = function(m) {
        return this[C.p(m)]();
      }, g.add = function(m, A) {
        var w, T = this;
        m = Number(m);
        var x = C.p(A), $ = function(G) {
          var ut = L(T);
          return C.w(ut.date(ut.date() + Math.round(G * m)), T);
        };
        if (x === p)
          return this.set(p, this.$M + m);
        if (x === d)
          return this.set(d, this.$y + m);
        if (x === l)
          return $(1);
        if (x === f)
          return $(7);
        var q = (w = {}, w[c] = n, w[a] = o, w[s] = r, w)[x] || 1, W = this.$d.getTime() + m * q;
        return C.w(W, this);
      }, g.subtract = function(m, A) {
        return this.add(-1 * m, A);
      }, g.format = function(m) {
        var A = this, w = this.$locale();
        if (!this.isValid())
          return w.invalidDate || _;
        var T = m || "YYYY-MM-DDTHH:mm:ssZ", x = C.z(this), $ = this.$H, q = this.$m, W = this.$M, G = w.weekdays, ut = w.months, it = function(Z, ot, Ht, Tt) {
          return Z && (Z[ot] || Z(A, T)) || Ht[ot].slice(0, Tt);
        }, pt = function(Z) {
          return C.s($ % 12 || 12, Z, "0");
        }, ht = w.meridiem || function(Z, ot, Ht) {
          var Tt = Z < 12 ? "AM" : "PM";
          return Ht ? Tt.toLowerCase() : Tt;
        }, st = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: W + 1, MM: C.s(W + 1, 2, "0"), MMM: it(w.monthsShort, W, ut, 3), MMMM: it(ut, W), D: this.$D, DD: C.s(this.$D, 2, "0"), d: String(this.$W), dd: it(w.weekdaysMin, this.$W, G, 2), ddd: it(w.weekdaysShort, this.$W, G, 3), dddd: G[this.$W], H: String($), HH: C.s($, 2, "0"), h: pt(1), hh: pt(2), a: ht($, q, !0), A: ht($, q, !1), m: String(q), mm: C.s(q, 2, "0"), s: String(this.$s), ss: C.s(this.$s, 2, "0"), SSS: C.s(this.$ms, 3, "0"), Z: x };
        return T.replace(F, function(Z, ot) {
          return ot || st[Z] || x.replace(":", "");
        });
      }, g.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, g.diff = function(m, A, w) {
        var T, x = C.p(A), $ = L(m), q = ($.utcOffset() - this.utcOffset()) * n, W = this - $, G = C.m(this, $);
        return G = (T = {}, T[d] = G / 12, T[p] = G, T[v] = G / 3, T[f] = (W - q) / 6048e5, T[l] = (W - q) / 864e5, T[a] = W / o, T[c] = W / n, T[s] = W / r, T)[x] || W, w ? G : C.a(G);
      }, g.daysInMonth = function() {
        return this.endOf(p).$D;
      }, g.$locale = function() {
        return z[this.$L];
      }, g.locale = function(m, A) {
        if (!m)
          return this.$L;
        var w = this.clone(), T = H(m, A, !0);
        return T && (w.$L = T), w;
      }, g.clone = function() {
        return C.w(this.$d, this);
      }, g.toDate = function() {
        return new Date(this.valueOf());
      }, g.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, g.toISOString = function() {
        return this.$d.toISOString();
      }, g.toString = function() {
        return this.$d.toUTCString();
      }, j;
    }(), se = wt.prototype;
    return L.prototype = se, [["$ms", i], ["$s", s], ["$m", c], ["$H", a], ["$W", l], ["$M", p], ["$y", d], ["$D", b]].forEach(function(j) {
      se[j[1]] = function(g) {
        return this.$g(g, j[0], j[1]);
      };
    }), L.extend = function(j, g) {
      return j.$i || (j(g, wt, L), j.$i = !0), L;
    }, L.locale = H, L.isDayjs = tt, L.unix = function(j) {
      return L(1e3 * j);
    }, L.en = z[B], L.Ls = z, L.p = {}, L;
  });
})(gp);
var eo = {}, bp = {
  get exports() {
    return eo;
  },
  set exports(t) {
    eo = t;
  }
}, Xe = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ro;
function Op() {
  if (ro)
    return Xe;
  ro = 1;
  var t = Qt;
  function e(p, v) {
    return p === v && (p !== 0 || 1 / p === 1 / v) || p !== p && v !== v;
  }
  var r = typeof Object.is == "function" ? Object.is : e, n = t.useState, o = t.useEffect, i = t.useLayoutEffect, s = t.useDebugValue;
  function c(p, v) {
    var d = v(), b = n({ inst: { value: d, getSnapshot: v } }), _ = b[0].inst, R = b[1];
    return i(function() {
      _.value = d, _.getSnapshot = v, a(_) && R({ inst: _ });
    }, [p, d, v]), o(function() {
      return a(_) && R({ inst: _ }), p(function() {
        a(_) && R({ inst: _ });
      });
    }, [p]), s(d), d;
  }
  function a(p) {
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
  return Xe.useSyncExternalStore = t.useSyncExternalStore !== void 0 ? t.useSyncExternalStore : f, Xe;
}
var no = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var oo;
function wp() {
  return oo || (oo = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var t = Qt, e = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function r(E) {
      {
        for (var D = arguments.length, B = new Array(D > 1 ? D - 1 : 0), z = 1; z < D; z++)
          B[z - 1] = arguments[z];
        n("error", E, B);
      }
    }
    function n(E, D, B) {
      {
        var z = e.ReactDebugCurrentFrame, tt = z.getStackAddendum();
        tt !== "" && (D += "%s", B = B.concat([tt]));
        var H = B.map(function(L) {
          return String(L);
        });
        H.unshift("Warning: " + D), Function.prototype.apply.call(console[E], console, H);
      }
    }
    function o(E, D) {
      return E === D && (E !== 0 || 1 / E === 1 / D) || E !== E && D !== D;
    }
    var i = typeof Object.is == "function" ? Object.is : o, s = t.useState, c = t.useEffect, a = t.useLayoutEffect, l = t.useDebugValue, f = !1, p = !1;
    function v(E, D, B) {
      f || t.startTransition !== void 0 && (f = !0, r("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
      var z = D();
      if (!p) {
        var tt = D();
        i(z, tt) || (r("The result of getSnapshot should be cached to avoid an infinite loop"), p = !0);
      }
      var H = s({
        inst: {
          value: z,
          getSnapshot: D
        }
      }), L = H[0].inst, C = H[1];
      return a(function() {
        L.value = z, L.getSnapshot = D, d(L) && C({
          inst: L
        });
      }, [E, z, D]), c(function() {
        d(L) && C({
          inst: L
        });
        var wt = function() {
          d(L) && C({
            inst: L
          });
        };
        return E(wt);
      }, [E]), l(z), z;
    }
    function d(E) {
      var D = E.getSnapshot, B = E.value;
      try {
        var z = D();
        return !i(B, z);
      } catch {
        return !0;
      }
    }
    function b(E, D, B) {
      return D();
    }
    var _ = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", R = !_, F = R ? b : v, K = t.useSyncExternalStore !== void 0 ? t.useSyncExternalStore : F;
    no.useSyncExternalStore = K, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), no;
}
(function(t) {
  process.env.NODE_ENV === "production" ? t.exports = Op() : t.exports = wp();
})(bp);
const _p = () => !0;
class Ep extends $l {
  constructor() {
    super(...arguments), rt(this, "middlewareHandler", _p), rt(this, "_routes", []);
  }
  get routes() {
    return this._routes;
  }
  registerMiddleware(e) {
    this.middlewareHandler = (r, n) => {
      var o, i, s;
      return r.middleware ? typeof ((o = r.component) == null ? void 0 : o.middleware) == "string" ? e[(i = r.component) == null ? void 0 : i.middleware] && e[(s = r.component) == null ? void 0 : s.middleware](r, n) : typeof r.middleware == "string" ? e[r.middleware] && e[r.middleware](r, n) : r.middleware(r, n) : !0;
    };
  }
  canPassMiddleware(e, r) {
    var n;
    return (n = e.component) != null && n.middleware && typeof e.component.middleware == "function" ? e.component.middleware(e, r) : this.middlewareHandler(e, r);
  }
  addRoute(...e) {
    const r = Ll([...e, ...this._routes], "path");
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
new Ep();
io(
  void 0
);
io(void 0);
const Sp = Qt.createContext(void 0), jp = (t) => {
  const e = xi(Sp);
  if (!e)
    throw new Error("useAuthorization must be used in AuthorizationProvider");
  return {
    granted: Ti(() => t ? e.can(t) : !0, [t, e.can]),
    ...e
  };
};
so(
  ({ permissions: t, children: e, guestView: r }) => {
    const { granted: n } = jp(t);
    return typeof e == "function" ? e(n) : /* @__PURE__ */ me(ui, { children: n ? e : r });
  }
);
function At(t, e) {
  return () => {
    const r = new Mt(t().baseURL, t());
    return xl(e, (n) => (...o) => n(r, ...o));
  };
}
const Ap = ({
  route: { component: t, ...e }
}) => {
  var r;
  return /* @__PURE__ */ me(ui, { children: (r = e.routes) != null && r.length && !e.element && !t ? /* @__PURE__ */ me(Hi, {}) : e.element || (t ? /* @__PURE__ */ me(t, {}) : null) });
};
so(Ap);
class xp {
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
const xt = new xp(), Bp = At(
  () => ({
    baseURL: `${xt.getApiUrl()}/api/v1/account`
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
var Tp = /* @__PURE__ */ ((t) => (t.INVITATION_EXISTS = "INVITATION_EXISTS", t.USER_IS_EXISTS = "USER_IS_EXISTS", t))(Tp || {}), Rp = /* @__PURE__ */ ((t) => (t.TOKEN_VALID = "TOKEN_VALID", t.TOKEN_INVALID = "TOKEN_INVALID", t.INVITATION_NOT_EXISTS = "INVITATION_NOT_EXISTS", t.USER_ACTIVE = "USER_ACTIVE", t))(Rp || {});
const zp = At(
  () => ({
    baseURL: `${xt.getApiUrl()}/api/v1/account/agent`
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
var Np = /* @__PURE__ */ ((t) => (t.Full = "24/7", t.Custom = "CUSTOM", t))(Np || {}), Dp = /* @__PURE__ */ ((t) => (t.Monday = "MONDAY", t.Tuesday = "TUESDAY", t.Wednesday = "WEDNESDAY", t.Thursday = "THURSDAY", t.Friday = "FRIDAY", t.Saturday = "SATURDAY", t.Sunday = "SUNDAY", t))(Dp || {});
const Hp = At(
  () => ({
    baseURL: `${xt.getApiUrl()}/api/v1/customer`
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
var Pp = /* @__PURE__ */ ((t) => (t.Plain = "Plain", t.Login = "Login", t.MD5 = "CRAM - MD5", t))(Pp || {}), Cp = /* @__PURE__ */ ((t) => (t.Both = "both", t.Incoming = "incoming", t.Outgoing = "outgoing", t))(Cp || {}), kp = /* @__PURE__ */ ((t) => (t.CUSTOM = "CUSTOM", t.MOOSEDESK = "MOOSEDESK", t))(kp || {}), Lp = /* @__PURE__ */ ((t) => (t.GMAIL = "GMAIL", t.OUTLOOK = "OUTLOOK", t.OTHER = "OTHER", t.MOOSEDESK = "MOOSEDESK", t))(Lp || {});
const Wp = At(
  () => ({
    baseURL: `${xt.getApiUrl()}/api/v1/email-integration`
  }),
  {
    getEmailGoogleAuth(t, e) {
      return t.get("/google-auth", e);
    },
    getEmailMicrosoftAuth(t, e) {
      return t.get("/microsoft-auth", e);
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
), Vp = At(
  () => ({
    baseURL: `${xt.getApiUrl()}/api/v1/store`
  }),
  {
    getStore(t, e) {
      return t.get("/store-id", e);
    }
  }
), qp = At(
  () => ({
    baseURL: `${xt.getApiUrl()}/api/v1/tag`
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
var $p = /* @__PURE__ */ ((t) => (t.Highest = "Highest", t.High = "High", t.Medium = "Medium", t.Low = "Low", t.Lowest = "Lowest", t))($p || {});
const Kp = [
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
];
var Up = /* @__PURE__ */ ((t) => (t.READ_PRODUCTS = "read_products", t))(Up || {}), Ip = /* @__PURE__ */ ((t) => (t.Admin = "Admin", t.BasicAgent = "BasicAgent", t.AgentLeader = "AgentLeader", t))(Ip || {});
const Jp = At(
  () => ({
    baseURL: `${xt.getApiUrl()}/api/v1/account/group`
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
var Mp = /* @__PURE__ */ ((t) => (t.Disabled = "Disabled", t.Email = "Email", t.Authenticator = "Authenticator", t))(Mp || {});
const Yp = At(
  () => ({
    baseURL: `${xt.getApiUrl()}/api/v1/account/setting`
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
);
export {
  Cp as AccessType,
  Bp as AccountRepository,
  zp as AgentRepository,
  Pp as AuthenticationSMTP,
  Np as BusinessHoursType,
  Hp as CustomerRepository,
  Dp as Day,
  Wp as EmailIntegrationRepository,
  xt as Env,
  Tp as ErrorCodeCreate,
  Lp as MailBoxType,
  kp as MailSettingType,
  Mp as MethodOTP,
  Up as PermissionScopesShopify,
  $p as Priority,
  Ip as Role,
  Vp as StoreRepository,
  qp as TagRepository,
  Rp as TypeCheckTokenNewAgent,
  Jp as UserGroupRepository,
  Yp as UserSettingRepository,
  Kp as priorityOptions
};

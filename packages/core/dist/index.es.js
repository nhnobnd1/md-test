var Bt = Object.defineProperty;
var Ht = (n, e, r) => e in n ? Bt(n, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : n[e] = r;
var k = (n, e, r) => (Ht(n, typeof e != "symbol" ? e + "" : e, r), r);
import { useLocation as pt, Outlet as Gt, useNavigate as zt, Route as Oe, Routes as Kt } from "react-router-dom";
import { BrowserRouter as tn, Navigate as rn, Outlet as nn, generatePath as an, useActionData as on, useAsyncError as sn, useAsyncValue as un, useBeforeUnload as cn, useLocation as ln, useNavigate as fn, useNavigation as dn, useOutlet as pn, useOutletContext as hn, useParams as vn, useSearchParams as gn } from "react-router-dom";
import { merge as Jt, uniqBy as Xt, debounce as Zt, mapValues as Qt } from "lodash-es";
import er from "axios";
import { Observable as ht, Subject as rt } from "rxjs";
import ne, { useState as D, useCallback as P, useEffect as q, useRef as H, createContext as vt, useContext as je, useMemo as ae, memo as gt, isValidElement as tr, createElement as nt } from "react";
var Se = /* @__PURE__ */ ((n) => (n.Json = "application/json", n.UrlEncoded = "application/x-www-form-urlencoded", n))(Se || {});
class rr {
  constructor() {
    k(this, "listeners");
    this.listeners = {};
  }
  trigger(e, ...r) {
    var a;
    (a = this.listeners[e]) == null || a.map((o) => o(...r));
  }
  on(e, r) {
    var a;
    return this.listeners[e] ? (a = this.listeners[e]) == null || a.push(r) : this.listeners[e] = [r], () => {
      this.off(e, r);
    };
  }
  off(e, r) {
    var a, o;
    if (this.listeners[e]) {
      const u = (a = this.listeners[e]) == null ? void 0 : a.findIndex((c) => c === r);
      u && u > -1 && ((o = this.listeners[e]) == null || o.splice(u, 1));
    } else
      throw new Error(`${this} is doesn't have event "${String(e)}"`);
  }
}
function at(n) {
  for (const e in n)
    Object.prototype.hasOwnProperty.call(n, e) && n[e] === void 0 && delete n[e];
  return n;
}
function jr(n) {
  for (const e in n)
    Object.prototype.hasOwnProperty.call(n, e) && delete n[e];
  return n;
}
function Ar(n) {
  for (const e in n)
    Object.prototype.hasOwnProperty.call(n, e) && (n[e] = void 0);
  return n;
}
const xe = (n, e = "", r = new FormData()) => (Object.keys(n).forEach((a) => {
  const o = e !== "" ? e + "." + a : a, u = n[a];
  Array.isArray(u) ? u.forEach((c, l) => {
    typeof c == "object" ? c instanceof File ? r.append(o, c) : r = xe(c, o + `[${l}]`, r) : r.append(o, c);
  }) : typeof u == "object" ? u instanceof File ? r.append(o, u) : r = xe(u, o, r) : r.append(o, u);
}), r), le = (n, e = "", r = new URLSearchParams()) => (Object.keys(n).forEach((a) => {
  const o = e !== "" ? e + "." + a : a, u = n[a];
  Array.isArray(u) ? u.forEach((c, l) => {
    typeof c == "object" ? r = le(c, o + `[${l}]`, r) : r.append(o, c);
  }) : typeof u == "object" ? r = le(u, o, r) : r.append(o, u);
}), r);
class nr {
  getToken(e) {
    return localStorage.getItem(e) || "";
  }
  setToken(e, r) {
    return localStorage.setItem(e, r);
  }
}
const Te = new nr();
function Ir(n, e) {
  return new Proxy(n, {
    set(r, a, o) {
      return r[a] = o, e(r), !0;
    }
  });
}
function ot(n) {
  let e = "";
  const r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", a = r.length;
  for (let o = 0; o < n; o++)
    e += r.charAt(Math.floor(Math.random() * a));
  return e;
}
class Ae {
  constructor(e) {
    k(this, "config");
    k(this, "axios");
    e && (this.config = e), this.axios = er.create(this.config);
  }
  get interceptors() {
    return this.axios.interceptors;
  }
  static create(e) {
    return new Ae(e);
  }
  request(e) {
    return new ht((r) => {
      const a = new AbortController();
      let o, u;
      return e.uploadProgressSubscriber && (o = (c) => {
        e.uploadProgressSubscriber && e.uploadProgressSubscriber.next(c);
      }), e.downloadProgressSubscriber && (u = (c) => {
        e.downloadProgressSubscriber && e.downloadProgressSubscriber.next(c);
      }), this.axios.request({
        ...e,
        onUploadProgress: o,
        onDownloadProgress: u,
        signal: a.signal
      }).then((c) => {
        r.next(c), r.complete(), e.uploadProgressSubscriber && e.uploadProgressSubscriber.complete(), e.downloadProgressSubscriber && e.downloadProgressSubscriber.complete();
      }).catch((c) => {
        r.error(c), e.uploadProgressSubscriber && e.uploadProgressSubscriber.error(c);
      }), () => {
        a.abort();
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
  post(e, r, a) {
    return this.request({
      url: e,
      data: r,
      method: "POST",
      ...a
    });
  }
  put(e, r, a) {
    return this.request({
      url: e,
      data: r,
      method: "PUT",
      ...a
    });
  }
  patch(e, r, a) {
    return this.request({
      url: e,
      data: r,
      method: "PATCH",
      ...a
    });
  }
}
function ar(n) {
  return Ae.create({
    baseURL: n
  });
}
const T = class {
  constructor(e, r) {
    k(this, "axiosInstance");
    k(this, "defaultConfig", {
      contentType: "json",
      cache: !1
    });
    k(this, "tokenType");
    this.axiosInstance = ar(e), this.setupInterceptor(), r && (this.defaultConfig = {
      ...this.defaultConfig,
      ...r
    });
  }
  static setAuthorizationTokenType(e) {
    T.tokenType = e;
  }
  static setGlobalParams(e) {
    T.globalParams = {
      ...T.globalParams,
      ...e
    };
  }
  static setGlobalData(e) {
    T.globalData = {
      ...T.globalData,
      ...e
    };
  }
  static setGlobalHeaders(e) {
    T.globalHeaders = {
      ...T.globalHeaders,
      ...e
    };
  }
  static addInterceptor(e) {
    return T.interceptors.add(e), () => {
      T.removeInterceptor(e);
    };
  }
  static removeInterceptor(e) {
    T.interceptors.delete(e);
  }
  setAuthorizationTokenType(e) {
    this.tokenType = e;
  }
  getTokenType(e) {
    return e.tokenType !== void 0 ? e.tokenType : this.tokenType !== void 0 ? this.tokenType : T.tokenType;
  }
  setupInterceptor() {
    this.axiosInstance.interceptors.request.use(
      async (e) => {
        if (e = await this.useRequestInterceptors(e), e = Jt({}, this.defaultConfig, e), e.headers = {
          ...e.headers,
          ...T.globalHeaders,
          "Content-Type": e.contentType === "formData" ? !1 : e.contentType === "urlEncoded" ? Se.UrlEncoded : Se.Json
        }, !e.preparedData) {
          if ((typeof e.cache < "u" ? e.cache : this.defaultConfig.cache) === !1 && (e.headers["Cache-Control"] = "no-cache", e.params = {
            ...e.params,
            axios_timestamp: Date.now()
          }), e.params = le(
            at({
              ...e.params,
              ...T.globalParams
            })
          ), e.data = {
            ...e.data,
            ...T.globalData
          }, at(e.data), JSON.stringify(e.data) === "{}")
            e.data = void 0;
          else
            switch (e.contentType) {
              case "formData":
                e.data = xe(e.data);
                break;
              case "urlEncoded":
                e.data = le(e.data);
            }
          e.preparedData = !0;
        }
        const r = this.getTokenType(e), a = r ? Te.getToken(r) : null;
        return a && (e.headers.Authorization = "Bearer " + a), e;
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
    for (const r of T.interceptors)
      r.request && (e = await r.request(e));
    return e;
  }
  async useErrorResponseInterceptor(e) {
    for (const r of T.interceptors)
      if (r.response && r.response.error)
        try {
          e = await r.response.error(e, this.axiosInstance);
        } catch {
          return e;
        }
    return e;
  }
  async useSuccessResponseInterceptor(e) {
    for (const r of T.interceptors)
      r.response && r.response.success && (e = await r.response.success(e));
    return e;
  }
  request(e) {
    return this.axiosInstance.request(e);
  }
  post(e, r, a) {
    return this.axiosInstance.post(e, r, a);
  }
  put(e, r, a) {
    return this.axiosInstance.put(e, r, a);
  }
  patch(e, r, a) {
    return this.axiosInstance.patch(e, r, a);
  }
  get(e, r, a) {
    return this.axiosInstance.get(e, {
      ...a,
      params: r
    });
  }
  delete(e, r, a) {
    return this.axiosInstance.delete(e, {
      ...a,
      params: r
    });
  }
};
let F = T;
k(F, "tokenType", "base_token"), k(F, "globalParams", {}), k(F, "globalData", {}), k(F, "globalHeaders", {}), k(F, "interceptors", /* @__PURE__ */ new Set());
var re = {}, or = {
  get exports() {
    return re;
  },
  set exports(n) {
    re = n;
  }
}, J = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var be, st;
function mt() {
  if (st)
    return be;
  st = 1;
  var n = Object.getOwnPropertySymbols, e = Object.prototype.hasOwnProperty, r = Object.prototype.propertyIsEnumerable;
  function a(u) {
    if (u == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(u);
  }
  function o() {
    try {
      if (!Object.assign)
        return !1;
      var u = new String("abc");
      if (u[5] = "de", Object.getOwnPropertyNames(u)[0] === "5")
        return !1;
      for (var c = {}, l = 0; l < 10; l++)
        c["_" + String.fromCharCode(l)] = l;
      var p = Object.getOwnPropertyNames(c).map(function(v) {
        return c[v];
      });
      if (p.join("") !== "0123456789")
        return !1;
      var b = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(v) {
        b[v] = v;
      }), Object.keys(Object.assign({}, b)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return be = o() ? Object.assign : function(u, c) {
    for (var l, p = a(u), b, v = 1; v < arguments.length; v++) {
      l = Object(arguments[v]);
      for (var h in l)
        e.call(l, h) && (p[h] = l[h]);
      if (n) {
        b = n(l);
        for (var g = 0; g < b.length; g++)
          r.call(l, b[g]) && (p[b[g]] = l[b[g]]);
      }
    }
    return p;
  }, be;
}
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ut;
function sr() {
  if (ut)
    return J;
  ut = 1, mt();
  var n = ne, e = 60103;
  if (J.Fragment = 60107, typeof Symbol == "function" && Symbol.for) {
    var r = Symbol.for;
    e = r("react.element"), J.Fragment = r("react.fragment");
  }
  var a = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = Object.prototype.hasOwnProperty, u = { key: !0, ref: !0, __self: !0, __source: !0 };
  function c(l, p, b) {
    var v, h = {}, g = null, E = null;
    b !== void 0 && (g = "" + b), p.key !== void 0 && (g = "" + p.key), p.ref !== void 0 && (E = p.ref);
    for (v in p)
      o.call(p, v) && !u.hasOwnProperty(v) && (h[v] = p[v]);
    if (l && l.defaultProps)
      for (v in p = l.defaultProps, p)
        h[v] === void 0 && (h[v] = p[v]);
    return { $$typeof: e, type: l, key: g, ref: E, props: h, _owner: a.current };
  }
  return J.jsx = c, J.jsxs = c, J;
}
var _e = {};
/** @license React v17.0.2
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var it;
function ur() {
  return it || (it = 1, function(n) {
    process.env.NODE_ENV !== "production" && function() {
      var e = ne, r = mt(), a = 60103, o = 60106;
      n.Fragment = 60107;
      var u = 60108, c = 60114, l = 60109, p = 60110, b = 60112, v = 60113, h = 60120, g = 60115, E = 60116, j = 60121, I = 60122, U = 60117, G = 60129, oe = 60131;
      if (typeof Symbol == "function" && Symbol.for) {
        var d = Symbol.for;
        a = d("react.element"), o = d("react.portal"), n.Fragment = d("react.fragment"), u = d("react.strict_mode"), c = d("react.profiler"), l = d("react.provider"), p = d("react.context"), b = d("react.forward_ref"), v = d("react.suspense"), h = d("react.suspense_list"), g = d("react.memo"), E = d("react.lazy"), j = d("react.block"), I = d("react.server.block"), U = d("react.fundamental"), d("react.scope"), d("react.opaque.id"), G = d("react.debug_trace_mode"), d("react.offscreen"), oe = d("react.legacy_hidden");
      }
      var w = typeof Symbol == "function" && Symbol.iterator, M = "@@iterator";
      function A(t) {
        if (t === null || typeof t != "object")
          return null;
        var s = w && t[w] || t[M];
        return typeof s == "function" ? s : null;
      }
      var $ = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function S(t) {
        {
          for (var s = arguments.length, i = new Array(s > 1 ? s - 1 : 0), f = 1; f < s; f++)
            i[f - 1] = arguments[f];
          V("error", t, i);
        }
      }
      function V(t, s, i) {
        {
          var f = $.ReactDebugCurrentFrame, _ = f.getStackAddendum();
          _ !== "" && (s += "%s", i = i.concat([_]));
          var R = i.map(function(y) {
            return "" + y;
          });
          R.unshift("Warning: " + s), Function.prototype.apply.call(console[t], console, R);
        }
      }
      var Z = !1;
      function fe(t) {
        return !!(typeof t == "string" || typeof t == "function" || t === n.Fragment || t === c || t === G || t === u || t === v || t === h || t === oe || Z || typeof t == "object" && t !== null && (t.$$typeof === E || t.$$typeof === g || t.$$typeof === l || t.$$typeof === p || t.$$typeof === b || t.$$typeof === U || t.$$typeof === j || t[0] === I));
      }
      function wt(t, s, i) {
        var f = s.displayName || s.name || "";
        return t.displayName || (f !== "" ? i + "(" + f + ")" : i);
      }
      function De(t) {
        return t.displayName || "Context";
      }
      function W(t) {
        if (t == null)
          return null;
        if (typeof t.tag == "number" && S("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue."), typeof t == "function")
          return t.displayName || t.name || null;
        if (typeof t == "string")
          return t;
        switch (t) {
          case n.Fragment:
            return "Fragment";
          case o:
            return "Portal";
          case c:
            return "Profiler";
          case u:
            return "StrictMode";
          case v:
            return "Suspense";
          case h:
            return "SuspenseList";
        }
        if (typeof t == "object")
          switch (t.$$typeof) {
            case p:
              var s = t;
              return De(s) + ".Consumer";
            case l:
              var i = t;
              return De(i._context) + ".Provider";
            case b:
              return wt(t, t.render, "ForwardRef");
            case g:
              return W(t.type);
            case j:
              return W(t._render);
            case E: {
              var f = t, _ = f._payload, R = f._init;
              try {
                return W(R(_));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var Q = 0, ke, Ue, Me, $e, Ve, qe, We;
      function Ne() {
      }
      Ne.__reactDisabledLog = !0;
      function Ot() {
        {
          if (Q === 0) {
            ke = console.log, Ue = console.info, Me = console.warn, $e = console.error, Ve = console.group, qe = console.groupCollapsed, We = console.groupEnd;
            var t = {
              configurable: !0,
              enumerable: !0,
              value: Ne,
              writable: !0
            };
            Object.defineProperties(console, {
              info: t,
              log: t,
              warn: t,
              error: t,
              group: t,
              groupCollapsed: t,
              groupEnd: t
            });
          }
          Q++;
        }
      }
      function St() {
        {
          if (Q--, Q === 0) {
            var t = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: r({}, t, {
                value: ke
              }),
              info: r({}, t, {
                value: Ue
              }),
              warn: r({}, t, {
                value: Me
              }),
              error: r({}, t, {
                value: $e
              }),
              group: r({}, t, {
                value: Ve
              }),
              groupCollapsed: r({}, t, {
                value: qe
              }),
              groupEnd: r({}, t, {
                value: We
              })
            });
          }
          Q < 0 && S("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var de = $.ReactCurrentDispatcher, pe;
      function se(t, s, i) {
        {
          if (pe === void 0)
            try {
              throw Error();
            } catch (_) {
              var f = _.stack.trim().match(/\n( *(at )?)/);
              pe = f && f[1] || "";
            }
          return `
` + pe + t;
        }
      }
      var he = !1, ue;
      {
        var xt = typeof WeakMap == "function" ? WeakMap : Map;
        ue = new xt();
      }
      function Ye(t, s) {
        if (!t || he)
          return "";
        {
          var i = ue.get(t);
          if (i !== void 0)
            return i;
        }
        var f;
        he = !0;
        var _ = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var R;
        R = de.current, de.current = null, Ot();
        try {
          if (s) {
            var y = function() {
              throw Error();
            };
            if (Object.defineProperty(y.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(y, []);
              } catch (Y) {
                f = Y;
              }
              Reflect.construct(t, [], y);
            } else {
              try {
                y.call();
              } catch (Y) {
                f = Y;
              }
              t.call(y.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (Y) {
              f = Y;
            }
            t();
          }
        } catch (Y) {
          if (Y && f && typeof Y.stack == "string") {
            for (var m = Y.stack.split(`
`), L = f.stack.split(`
`), O = m.length - 1, x = L.length - 1; O >= 1 && x >= 0 && m[O] !== L[x]; )
              x--;
            for (; O >= 1 && x >= 0; O--, x--)
              if (m[O] !== L[x]) {
                if (O !== 1 || x !== 1)
                  do
                    if (O--, x--, x < 0 || m[O] !== L[x]) {
                      var N = `
` + m[O].replace(" at new ", " at ");
                      return typeof t == "function" && ue.set(t, N), N;
                    }
                  while (O >= 1 && x >= 0);
                break;
              }
          }
        } finally {
          he = !1, de.current = R, St(), Error.prepareStackTrace = _;
        }
        var K = t ? t.displayName || t.name : "", tt = K ? se(K) : "";
        return typeof t == "function" && ue.set(t, tt), tt;
      }
      function Fe(t, s, i) {
        return Ye(t, !1);
      }
      function Tt(t) {
        var s = t.prototype;
        return !!(s && s.isReactComponent);
      }
      function ie(t, s, i) {
        if (t == null)
          return "";
        if (typeof t == "function")
          return Ye(t, Tt(t));
        if (typeof t == "string")
          return se(t);
        switch (t) {
          case v:
            return se("Suspense");
          case h:
            return se("SuspenseList");
        }
        if (typeof t == "object")
          switch (t.$$typeof) {
            case b:
              return Fe(t.render);
            case g:
              return ie(t.type, s, i);
            case j:
              return Fe(t._render);
            case E: {
              var f = t, _ = f._payload, R = f._init;
              try {
                return ie(R(_), s, i);
              } catch {
              }
            }
          }
        return "";
      }
      var Be = {}, He = $.ReactDebugCurrentFrame;
      function ce(t) {
        if (t) {
          var s = t._owner, i = ie(t.type, t._source, s ? s.type : null);
          He.setExtraStackFrame(i);
        } else
          He.setExtraStackFrame(null);
      }
      function Pt(t, s, i, f, _) {
        {
          var R = Function.call.bind(Object.prototype.hasOwnProperty);
          for (var y in t)
            if (R(t, y)) {
              var m = void 0;
              try {
                if (typeof t[y] != "function") {
                  var L = Error((f || "React class") + ": " + i + " type `" + y + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof t[y] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw L.name = "Invariant Violation", L;
                }
                m = t[y](s, y, f, i, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (O) {
                m = O;
              }
              m && !(m instanceof Error) && (ce(_), S("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", f || "React class", i, y, typeof m), ce(null)), m instanceof Error && !(m.message in Be) && (Be[m.message] = !0, ce(_), S("Failed %s type: %s", i, m.message), ce(null));
            }
        }
      }
      var ee = $.ReactCurrentOwner, ve = Object.prototype.hasOwnProperty, Ct = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, Ge, ze, ge;
      ge = {};
      function jt(t) {
        if (ve.call(t, "ref")) {
          var s = Object.getOwnPropertyDescriptor(t, "ref").get;
          if (s && s.isReactWarning)
            return !1;
        }
        return t.ref !== void 0;
      }
      function At(t) {
        if (ve.call(t, "key")) {
          var s = Object.getOwnPropertyDescriptor(t, "key").get;
          if (s && s.isReactWarning)
            return !1;
        }
        return t.key !== void 0;
      }
      function It(t, s) {
        if (typeof t.ref == "string" && ee.current && s && ee.current.stateNode !== s) {
          var i = W(ee.current.type);
          ge[i] || (S('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', W(ee.current.type), t.ref), ge[i] = !0);
        }
      }
      function Lt(t, s) {
        {
          var i = function() {
            Ge || (Ge = !0, S("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", s));
          };
          i.isReactWarning = !0, Object.defineProperty(t, "key", {
            get: i,
            configurable: !0
          });
        }
      }
      function Dt(t, s) {
        {
          var i = function() {
            ze || (ze = !0, S("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", s));
          };
          i.isReactWarning = !0, Object.defineProperty(t, "ref", {
            get: i,
            configurable: !0
          });
        }
      }
      var kt = function(t, s, i, f, _, R, y) {
        var m = {
          $$typeof: a,
          type: t,
          key: s,
          ref: i,
          props: y,
          _owner: R
        };
        return m._store = {}, Object.defineProperty(m._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(m, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: f
        }), Object.defineProperty(m, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: _
        }), Object.freeze && (Object.freeze(m.props), Object.freeze(m)), m;
      };
      function Ut(t, s, i, f, _) {
        {
          var R, y = {}, m = null, L = null;
          i !== void 0 && (m = "" + i), At(s) && (m = "" + s.key), jt(s) && (L = s.ref, It(s, _));
          for (R in s)
            ve.call(s, R) && !Ct.hasOwnProperty(R) && (y[R] = s[R]);
          if (t && t.defaultProps) {
            var O = t.defaultProps;
            for (R in O)
              y[R] === void 0 && (y[R] = O[R]);
          }
          if (m || L) {
            var x = typeof t == "function" ? t.displayName || t.name || "Unknown" : t;
            m && Lt(y, x), L && Dt(y, x);
          }
          return kt(t, m, L, _, f, ee.current, y);
        }
      }
      var me = $.ReactCurrentOwner, Ke = $.ReactDebugCurrentFrame;
      function z(t) {
        if (t) {
          var s = t._owner, i = ie(t.type, t._source, s ? s.type : null);
          Ke.setExtraStackFrame(i);
        } else
          Ke.setExtraStackFrame(null);
      }
      var Ee;
      Ee = !1;
      function ye(t) {
        return typeof t == "object" && t !== null && t.$$typeof === a;
      }
      function Je() {
        {
          if (me.current) {
            var t = W(me.current.type);
            if (t)
              return `

Check the render method of \`` + t + "`.";
          }
          return "";
        }
      }
      function Mt(t) {
        {
          if (t !== void 0) {
            var s = t.fileName.replace(/^.*[\\\/]/, ""), i = t.lineNumber;
            return `

Check your code at ` + s + ":" + i + ".";
          }
          return "";
        }
      }
      var Xe = {};
      function $t(t) {
        {
          var s = Je();
          if (!s) {
            var i = typeof t == "string" ? t : t.displayName || t.name;
            i && (s = `

Check the top-level render call using <` + i + ">.");
          }
          return s;
        }
      }
      function Ze(t, s) {
        {
          if (!t._store || t._store.validated || t.key != null)
            return;
          t._store.validated = !0;
          var i = $t(s);
          if (Xe[i])
            return;
          Xe[i] = !0;
          var f = "";
          t && t._owner && t._owner !== me.current && (f = " It was passed a child from " + W(t._owner.type) + "."), z(t), S('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', i, f), z(null);
        }
      }
      function Qe(t, s) {
        {
          if (typeof t != "object")
            return;
          if (Array.isArray(t))
            for (var i = 0; i < t.length; i++) {
              var f = t[i];
              ye(f) && Ze(f, s);
            }
          else if (ye(t))
            t._store && (t._store.validated = !0);
          else if (t) {
            var _ = A(t);
            if (typeof _ == "function" && _ !== t.entries)
              for (var R = _.call(t), y; !(y = R.next()).done; )
                ye(y.value) && Ze(y.value, s);
          }
        }
      }
      function Vt(t) {
        {
          var s = t.type;
          if (s == null || typeof s == "string")
            return;
          var i;
          if (typeof s == "function")
            i = s.propTypes;
          else if (typeof s == "object" && (s.$$typeof === b || s.$$typeof === g))
            i = s.propTypes;
          else
            return;
          if (i) {
            var f = W(s);
            Pt(i, t.props, "prop", f, t);
          } else if (s.PropTypes !== void 0 && !Ee) {
            Ee = !0;
            var _ = W(s);
            S("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _ || "Unknown");
          }
          typeof s.getDefaultProps == "function" && !s.getDefaultProps.isReactClassApproved && S("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function qt(t) {
        {
          for (var s = Object.keys(t.props), i = 0; i < s.length; i++) {
            var f = s[i];
            if (f !== "children" && f !== "key") {
              z(t), S("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", f), z(null);
              break;
            }
          }
          t.ref !== null && (z(t), S("Invalid attribute `ref` supplied to `React.Fragment`."), z(null));
        }
      }
      function et(t, s, i, f, _, R) {
        {
          var y = fe(t);
          if (!y) {
            var m = "";
            (t === void 0 || typeof t == "object" && t !== null && Object.keys(t).length === 0) && (m += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var L = Mt(_);
            L ? m += L : m += Je();
            var O;
            t === null ? O = "null" : Array.isArray(t) ? O = "array" : t !== void 0 && t.$$typeof === a ? (O = "<" + (W(t.type) || "Unknown") + " />", m = " Did you accidentally export a JSX literal instead of a component?") : O = typeof t, S("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", O, m);
          }
          var x = Ut(t, s, i, _, R);
          if (x == null)
            return x;
          if (y) {
            var N = s.children;
            if (N !== void 0)
              if (f)
                if (Array.isArray(N)) {
                  for (var K = 0; K < N.length; K++)
                    Qe(N[K], t);
                  Object.freeze && Object.freeze(N);
                } else
                  S("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
              else
                Qe(N, t);
          }
          return t === n.Fragment ? qt(x) : Vt(x), x;
        }
      }
      function Wt(t, s, i) {
        return et(t, s, i, !0);
      }
      function Nt(t, s, i) {
        return et(t, s, i, !1);
      }
      var Yt = Nt, Ft = Wt;
      n.jsx = Yt, n.jsxs = Ft;
    }();
  }(_e)), _e;
}
(function(n) {
  process.env.NODE_ENV === "production" ? n.exports = sr() : n.exports = ur();
})(or);
const X = re.Fragment, C = re.jsx, Pe = re.jsxs, Lr = (n = () => {
}) => {
  const [e, r] = D(!1);
  e || (n(), r(!0));
};
function ir(n, e) {
  function r(a) {
    let o = [];
    return Array.isArray(a) ? o = a : o = a.split(","), o.length ? e.filter((c) => o.includes(c)).length > 0 : !0;
  }
  for (const a of n)
    if (r(a.permissions || [])) {
      if (a.routes) {
        const o = ir(a.routes, e);
        if (o)
          return o;
        continue;
      }
      return a;
    }
}
const ct = (n, e, r = !1) => {
  const a = n.split("/"), o = e.split("/");
  if (o.length > a.length || r && o.length !== a.length)
    return !1;
  for (let u = 0; u < o.length; u++) {
    const c = o[u];
    if (!c.match(/:([\w\W]+)/gi) && c !== a[u])
      return !1;
  }
  return !0;
};
var Ce = {}, cr = {
  get exports() {
    return Ce;
  },
  set exports(n) {
    Ce = n;
  }
}, Re = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var lt;
function lr() {
  if (lt)
    return Re;
  lt = 1;
  var n = ne;
  function e(h, g) {
    return h === g && (h !== 0 || 1 / h === 1 / g) || h !== h && g !== g;
  }
  var r = typeof Object.is == "function" ? Object.is : e, a = n.useState, o = n.useEffect, u = n.useLayoutEffect, c = n.useDebugValue;
  function l(h, g) {
    var E = g(), j = a({ inst: { value: E, getSnapshot: g } }), I = j[0].inst, U = j[1];
    return u(function() {
      I.value = E, I.getSnapshot = g, p(I) && U({ inst: I });
    }, [h, E, g]), o(function() {
      return p(I) && U({ inst: I }), h(function() {
        p(I) && U({ inst: I });
      });
    }, [h]), c(E), E;
  }
  function p(h) {
    var g = h.getSnapshot;
    h = h.value;
    try {
      var E = g();
      return !r(h, E);
    } catch {
      return !0;
    }
  }
  function b(h, g) {
    return g();
  }
  var v = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? b : l;
  return Re.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : v, Re;
}
var we = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ft;
function fr() {
  return ft || (ft = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var n = ne, e = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function r(d) {
      {
        for (var w = arguments.length, M = new Array(w > 1 ? w - 1 : 0), A = 1; A < w; A++)
          M[A - 1] = arguments[A];
        a("error", d, M);
      }
    }
    function a(d, w, M) {
      {
        var A = e.ReactDebugCurrentFrame, $ = A.getStackAddendum();
        $ !== "" && (w += "%s", M = M.concat([$]));
        var S = M.map(function(V) {
          return String(V);
        });
        S.unshift("Warning: " + w), Function.prototype.apply.call(console[d], console, S);
      }
    }
    function o(d, w) {
      return d === w && (d !== 0 || 1 / d === 1 / w) || d !== d && w !== w;
    }
    var u = typeof Object.is == "function" ? Object.is : o, c = n.useState, l = n.useEffect, p = n.useLayoutEffect, b = n.useDebugValue, v = !1, h = !1;
    function g(d, w, M) {
      v || n.startTransition !== void 0 && (v = !0, r("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
      var A = w();
      if (!h) {
        var $ = w();
        u(A, $) || (r("The result of getSnapshot should be cached to avoid an infinite loop"), h = !0);
      }
      var S = c({
        inst: {
          value: A,
          getSnapshot: w
        }
      }), V = S[0].inst, Z = S[1];
      return p(function() {
        V.value = A, V.getSnapshot = w, E(V) && Z({
          inst: V
        });
      }, [d, A, w]), l(function() {
        E(V) && Z({
          inst: V
        });
        var fe = function() {
          E(V) && Z({
            inst: V
          });
        };
        return d(fe);
      }, [d]), b(A), A;
    }
    function E(d) {
      var w = d.getSnapshot, M = d.value;
      try {
        var A = w();
        return !u(M, A);
      } catch {
        return !0;
      }
    }
    function j(d, w, M) {
      return w();
    }
    var I = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", U = !I, G = U ? j : g, oe = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : G;
    we.useSyncExternalStore = oe, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), we;
}
(function(n) {
  process.env.NODE_ENV === "production" ? n.exports = lr() : n.exports = fr();
})(cr);
const dr = () => !0;
class pr extends rr {
  constructor() {
    super(...arguments);
    k(this, "middlewareHandler", dr);
    k(this, "_routes", []);
  }
  get routes() {
    return this._routes;
  }
  registerMiddleware(r) {
    this.middlewareHandler = (a, o) => {
      var u, c, l;
      return a.middleware ? typeof ((u = a.component) == null ? void 0 : u.middleware) == "string" ? r[(c = a.component) == null ? void 0 : c.middleware] && r[(l = a.component) == null ? void 0 : l.middleware](a, o) : typeof a.middleware == "string" ? r[a.middleware] && r[a.middleware](a, o) : a.middleware(a, o) : !0;
    };
  }
  canPassMiddleware(r, a) {
    var o;
    return (o = r.component) != null && o.middleware && typeof r.component.middleware == "function" ? r.component.middleware(r, a) : this.middlewareHandler(r, a);
  }
  addRoute(...r) {
    const a = Xt([...r, ...this._routes], "path");
    this._routes = a, this.trigger("routeChange", a);
  }
  removeRoute(r) {
    const a = this._routes.findIndex((o) => o.path === r);
    if (a > -1) {
      const o = [...this._routes];
      o.splice(a, 1), this._routes = o, this.trigger("routeChange", o);
    }
  }
}
const te = new pr();
function Et() {
  const n = P((...o) => {
    te.addRoute(...o);
  }, []), e = P((o) => {
    te.removeRoute(o);
  }, []), r = P((o) => te.on("routeChange", o), []);
  return { routes: Ce.useSyncExternalStore(
    r,
    () => te.routes
  ), addRoutes: n, removeRoute: e };
}
const Dr = () => {
  const { routes: n } = Et(), [e, r] = D(), a = pt(), o = P(
    (u) => {
      const c = u.filter(
        (l) => ct(a.pathname, l.path)
      );
      for (const l of c)
        if (l) {
          if (l.routes)
            o(l.routes);
          else if (ct(a.pathname, l.path, !0)) {
            r(l);
            break;
          }
        }
    },
    [a]
  );
  return q(() => {
    o(n);
  }, [o, n]), e;
}, hr = (n) => {
  q(
    () => () => {
      n();
    },
    []
  );
};
function vr(n, e) {
  const r = H(n);
  r.current = n;
  const a = (e == null ? void 0 : e.wait) ?? 1e3, o = H(
    Zt(
      (...u) => r.current(...u),
      a,
      e
    )
  ).current;
  return hr(() => {
    o.cancel();
  }), {
    run: o,
    cancel: o.cancel,
    flush: o.flush
  };
}
function kr(n, e) {
  const [r, a] = D(n), { run: o } = vr((u) => {
    a(u);
  }, e);
  return [r, o];
}
function Ur(n, e) {
  const r = H(!1);
  q(() => {
    if (r.current)
      return n && n();
    r.current = !0;
  }, e);
}
const Mr = (n, e) => {
  const r = H(n);
  r.current = n;
  const a = D()[1], o = P(() => {
    u(), a(
      setInterval(() => r.current(), e)
    );
  }, [r.current, e]), u = P(() => {
    a((c) => {
      c && clearInterval(c);
    });
  }, []);
  return {
    run: o,
    cancel: u
  };
}, gr = (n = !1) => {
  const [e, r] = D(n), a = P(() => {
    r((c) => !c);
  }, []), o = P(() => {
    r(!0);
  }, []), u = P(() => {
    r(!1);
  }, []);
  return { state: e, toggle: a, on: o, off: u };
}, yt = vt(
  void 0
);
function $r({
  children: n,
  color: e,
  component: r
}) {
  const { state: a, on: o, off: u } = gr(), c = D(0)[1], l = P(() => {
    o(), c((b) => b + 1), c(1);
  }, []), p = P(() => {
    c((b) => b === 1 ? (u(), 0) : b - 1);
  }, []);
  return /* @__PURE__ */ Pe(yt.Provider, { value: { startLoading: l, stopLoading: p, state: a }, children: [
    n,
    /* @__PURE__ */ C(r, { state: a, color: e })
  ] });
}
const bt = (n) => {
  const e = je(yt);
  if (e === void 0)
    throw new Error("useLoading must be used in LoadingProvider");
  return q(() => {
    typeof n > "u" || (n ? e.startLoading() : e.stopLoading());
  }, [n, e]), e;
};
var B = /* @__PURE__ */ ((n) => (n.Standing = "standing", n.Processing = "processing", n.Success = "success", n.Failed = "Failed", n))(B || {});
function Ie(n) {
  q(() => n(), []);
}
function mr(n, e) {
  const r = H(new rt()), [a, o] = D(), { startLoading: u, stopLoading: c } = bt(), [l, p] = D(B.Standing), [b, v] = D(), [h, g] = D(), E = ae(() => l === B.Processing, [l]), j = P(
    (...U) => {
      p(B.Processing), e != null && e.showLoading && u(), r.current.next(n(...U));
    },
    [n]
  ), I = P(() => {
    a == null || a.unsubscribe(), p(B.Standing), e != null && e.showLoading && c();
  }, [a]);
  return Ie(() => (r.current.closed && (r.current = new rt()), r.current.subscribe({
    next: (U) => {
      o(
        U.subscribe({
          next: v,
          complete: () => {
            p(B.Success), e != null && e.showLoading && c();
          },
          error: (G) => {
            p(B.Failed), g(G), e != null && e.showLoading && c();
          }
        })
      );
    }
  }), () => {
    e != null && e.showLoading && c(), r.current.unsubscribe();
  })), {
    run: j,
    cancel: I,
    state: l,
    processing: E,
    result: b,
    error: h
  };
}
const Er = { attributes: !0, childList: !0, subtree: !0 }, Vr = (n, e) => {
  const r = ae(() => new MutationObserver(e), [e]);
  q(() => {
    const a = n instanceof HTMLElement ? n : n.current;
    return a && r.observe(a, Er), () => {
      r.disconnect();
    };
  }, [r, n]);
};
function qr(n) {
  const e = H();
  return q(() => {
    e.current = n;
  }), e.current;
}
const Wr = (n, e) => {
  const r = H(n);
  r.current = n;
  const a = D()[1], o = P(() => {
    u(), a(
      setTimeout(() => r.current(), e)
    );
  }, [r.current, e]), u = P(() => {
    a((c) => {
      c && clearTimeout(c);
    });
  }, []);
  return {
    run: o,
    cancel: u
  };
};
function Nr({ get: n, set: e }, r) {
  const a = ae(n, r), o = P(e, r);
  return [a, o];
}
const _t = vt(void 0), Yr = ({
  children: n,
  defaultTokens: e = {},
  fetchUserOnLogin: r = () => new ht((a) => a.next(void 0))
}) => {
  const [a, o] = D(), [u, c] = D(e), [l, p] = D(!1), { run: b, result: v } = mr(r), h = P(
    (E, j) => {
      p(!0), c(E), j ? o(j) : b(E);
    },
    [b]
  ), g = P(() => {
    o(void 0), c({}), p(!1);
  }, []);
  return Ie(() => {
    var E;
    (E = Object.values(e)[0]) != null && E.length && (b(e), p(!0));
  }), q(() => {
    v && o(v);
  }, [v]), q(() => {
    for (const E in u)
      if (Object.prototype.hasOwnProperty.call(u, E)) {
        const j = u[E];
        Te.setToken(E, j || "");
      }
    return () => {
      for (const E in u)
        Object.prototype.hasOwnProperty.call(u, E) && Te.setToken(E, "");
    };
  }, [u]), /* @__PURE__ */ C(_t.Provider, { value: { user: a, tokens: u, isLoggedIn: l, login: h, logout: g }, children: n });
};
function Fr() {
  const n = je(_t);
  if (!n)
    throw new Error("useAuthContext must be used in AuthProvider");
  return n;
}
const Le = ne.createContext(void 0), Br = ({
  userPermissions: n,
  isUser: e,
  children: r
}) => {
  const a = P(
    (o) => {
      let u = [];
      return Array.isArray(o) ? u = o : u = o.split(","), u.length ? e ? n.filter((l) => u.includes(l)).length > 0 : !1 : !0;
    },
    [e, n]
  );
  return /* @__PURE__ */ C(Le.Provider, { value: { userPermissions: n, can: a }, children: r });
}, yr = (n) => {
  const e = je(Le);
  if (!e)
    throw new Error("useAuthorization must be used in AuthorizationProvider");
  return {
    granted: ae(() => n ? e.can(n) : !0, [n, e.can]),
    ...e
  };
}, Hr = gt(
  ({ permissions: n, children: e, guestView: r }) => {
    const { granted: a } = yr(n);
    return typeof e == "function" ? e(a) : /* @__PURE__ */ C(X, { children: a ? e : r });
  }
);
function Gr(n) {
  return (e) => (r) => /* @__PURE__ */ C(Le.Consumer, { children: (a) => /* @__PURE__ */ C(X, { children: (a == null ? void 0 : a.can(n || [])) && /* @__PURE__ */ C(e, { ...r }) }) });
}
function zr({
  component: n,
  props: e
}) {
  return /* @__PURE__ */ C(n, { ...e });
}
function Kr({
  children: n
}) {
  const { startLoading: e, stopLoading: r } = bt();
  return Ie(() => F.addInterceptor({
    request(o) {
      return o.showLoading && e(), o;
    },
    response: {
      success: (o) => (o.config.showLoading && r(), o),
      error: (o) => {
        const { config: u } = o;
        return u != null && u.showLoading && r(), o;
      }
    }
  })), /* @__PURE__ */ C(X, { children: n });
}
function Jr(n, e) {
  const r = new F(n.baseURL, n);
  return Qt(e, (a) => (...o) => a(r, ...o));
}
function br(n, e = "/") {
  const r = {}, a = n.Index.length > 0 ? `${e}${n.Index}` : "";
  for (const o in n)
    if (Object.prototype.hasOwnProperty.call(n, o)) {
      const u = n[o];
      typeof u == "object" ? r[o] = br(u, a !== "/" ? a + "/" : "/") : o === "Index" ? r[o] = a.length ? a : e : r[o] = a + "/" + u;
    }
  return r;
}
const _r = ({
  route: { component: n, ...e }
}) => {
  var r;
  return /* @__PURE__ */ C(X, { children: (r = e.routes) != null && r.length && !e.element && !n ? /* @__PURE__ */ C(Gt, {}) : e.element || (n ? /* @__PURE__ */ C(n, {}) : null) });
}, Rr = gt(_r), dt = ({ route: n }) => {
  const e = zt(), [r, a] = D();
  return q(() => {
    (async () => a(
      await te.canPassMiddleware(n, e)
    ))();
  }, [e, n]), r !== void 0 ? tr(r) ? r : r ? /* @__PURE__ */ C(Rr, { route: n }) : null : null;
}, Rt = (n) => {
  if (n.routes) {
    const { routes: e, element: r, index: a, ...o } = n, u = e.map((c) => Rt(c));
    return /* @__PURE__ */ nt(
      Oe,
      {
        element: /* @__PURE__ */ C(dt, { route: { ...o, element: r, routes: e } }),
        ...o,
        index: a,
        key: ot(12)
      },
      u
    );
  }
  return /* @__PURE__ */ nt(
    Oe,
    {
      element: /* @__PURE__ */ C(dt, { route: n }),
      ...n,
      key: ot(12)
    }
  );
}, wr = ({ onChange: n }) => {
  const e = pt();
  return q(() => {
    n && n(e);
  }, [e.pathname]), /* @__PURE__ */ C(X, {});
}, Xr = ({
  routes: n,
  notFoundElement: e,
  onRouteChange: r
}) => {
  const a = ae(
    () => n.map((o) => Rt(o)),
    [n]
  );
  return /* @__PURE__ */ Pe(X, { children: [
    /* @__PURE__ */ C(wr, { onChange: r }),
    /* @__PURE__ */ Pe(Kt, { children: [
      a,
      /* @__PURE__ */ C(Oe, { path: "*", element: e })
    ] })
  ] });
};
function Zr(n) {
  const e = n;
  return (r) => {
    const a = Et();
    return /* @__PURE__ */ C(e, { ...r, routes: a });
  };
}
export {
  F as Api,
  Kr as ApiLoadingHandlerProvider,
  Yr as AuthProvider,
  Br as AuthorizationProvider,
  Ae as AxiosObservable,
  tn as BrowserRouter,
  rr as EventListenersManager,
  yt as LoadingContext,
  $r as LoadingProvider,
  wr as LocationEffect,
  rn as Navigate,
  nn as Outlet,
  Hr as PrivateView,
  Se as RequestHeaderContentType,
  dt as RouteMiddleware,
  Rr as RouteRenderer,
  Xr as RouterGenerator,
  te as RouterHandler,
  Te as TokenManager,
  Ar as clearObject,
  at as clearUndefinedProperties,
  Jr as createRepository,
  br as createRoutePath,
  Ir as createVariableWithWatcher,
  jr as emptyObject,
  ir as findRouteHasPermission,
  xe as formData,
  an as generatePath,
  Rt as generateRoutes,
  zr as lazyComponent,
  ot as makeId,
  ct as pathMatched,
  le as urlEncoded,
  on as useActionData,
  sn as useAsyncError,
  un as useAsyncValue,
  Fr as useAuthContext,
  yr as useAuthorization,
  cn as useBeforeUnload,
  Lr as useConstructor,
  Dr as useCurrentRoute,
  vr as useDebounceFn,
  kr as useDebounceState,
  Ur as useDidUpdate,
  Mr as useInterval,
  mr as useJob,
  bt as useLoading,
  ln as useLocation,
  Ie as useMount,
  fn as useNavigate,
  dn as useNavigation,
  Vr as useOnElementChange,
  pn as useOutlet,
  hn as useOutletContext,
  vn as useParams,
  qr as usePrevious,
  Et as useRoutes,
  gn as useSearchParams,
  Wr as useTimeout,
  gr as useToggle,
  hr as useUnMount,
  Nr as useWritableMemo,
  Gr as withAuthorization,
  Zr as withRoutes
};

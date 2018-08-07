define("saber-emitter/emitter", [],
function() {
    function t() {}
    var e = t.prototype;
    return e._getEvents = function() {
        if (!this._events) this._events = {};
        return this._events
    },
    e._getMaxListeners = function() {
        if (isNaN(this.maxListeners)) this.maxListeners = 10;
        return this.maxListeners
    },
    e.on = function(t, e) {
        var i = this._getEvents(),
        n = this._getMaxListeners();
        i[t] = i[t] || [];
        var r = i[t].length;
        if (r >= n && 0 !== n) throw new RangeError("Warning: possible Emitter memory leak detected. " + r + " listeners added.");
        return i[t].push(e),
        this
    },
    e.once = function(t, e) {
        function i() {
            n.off(t, i),
            e.apply(this, arguments)
        }
        var n = this;
        return i.listener = e,
        this.on(t, i),
        this
    },
    e.off = function(t, e) {
        var i = this._getEvents();
        if (0 === arguments.length) return this._events = {},
        this;
        var n = i[t];
        if (!n) return this;
        if (1 === arguments.length) return delete i[t],
        this;
        for (var r, s = 0; s < n.length; s++) if (r = n[s], r === e || r.listener === e) {
            n.splice(s, 1);
            break
        }
        return this
    },
    e.emit = function(t) {
        var e = this._getEvents(),
        i = e[t],
        n = Array.prototype.slice.call(arguments, 1);
        if (i) {
            i = i.slice(0);
            for (var r = 0,
            s = i.length; s > r; r++) i[r].apply(this, n)
        }
        return this
    },
    e.listeners = function(t) {
        var e = this._getEvents();
        return e[t] || []
    },
    e.setMaxListeners = function(t) {
        return this.maxListeners = t,
        this
    },
    t.mixin = function(e) {
        for (var i in t.prototype) e[i] = t.prototype[i];
        return e
    },
    t
}),

define("saber-emitter", ["saber-emitter/emitter"],
function(t) {
    return t
}),

define("saber-dom/selector", [],
function() {
    var exports = {};
    return exports.g = function(t) {
        if (!t) return null;
        else return "string" == typeof t ? document.getElementById(t) : t
    },
    exports.query = function(t, e) {
        if ("string" != typeof t) return t;
        else return e = e || document.body,
        e.querySelector(t)
    },
    exports.queryAll = function(t, e) {
        if (Array.isArray(t)) return t;
        e = e || document.body;
        var i = e.querySelectorAll(t);
        return Array.prototype.slice.call(i)
    },
    exports.matches = function(t, e) {
        var i = Element.prototype,
        n = i.matches || i.webkitMatchesSelector || i.mozMatchesSelector || i.msMatchesSelector;
        if (n) return n.call(t, e);
        for (var r = exports.queryAll(e, t.parentNode), s = 0; s < r.length; s++) if (r[s] === t) return ! 0;
        return ! 1
    },
    exports
}),

define("saber-dom/css", [],
function() {
    function t(t) {
        return t.replace(/-+(.)?/g,
        function(t, e) {
            return e ? e.toUpperCase() : ""
        })
    }
    function e(e) {
        if ("-" !== e.charAt(0)) {
            var i = n.style,
            s = t(e);
            if (! (s in i)) {
                s = s.charAt(0).toUpperCase() + s.substring(1);
                for (var a, o = 0; a = r[o]; o++) if (a + s in i) {
                    e = "-" + a + "-" + e;
                    break
                }
            }
        }
        return e
    }
    var exports = {},
    i = document.defaultView.getComputedStyle,
    n = document.createElement("div"),
    r = ["webkit", "ms", "o"];
    return exports.getStyle = function(n, r) {
        return r = e(r),
        n.style[t(r)] || i(n).getPropertyValue(r)
    },
    exports.setStyle = function(i, n, r) {
        n = e(n),
        i.style[t(n)] = r
    },
    exports.show = function(t) {
        if ("none" === exports.getStyle(t, "display")) t.style.display = null
    },
    exports.hide = function(t) {
        t.style.display = "none"
    },
    exports.addClass = function(t, e) {
        if (t.classList) t.classList.add(e);
        else {
            for (var i = t.className ? t.className.split(/\s+/) : [], n = 0, r = i.length; r > n; n++) if (i[n] === e) return t;
            i.push(e),
            t.className = i.join(" ")
        }
        return t
    },
    exports.removeClass = function(t, e) {
        if (t.classList) t.classList.remove(e);
        else {
            for (var i = t.className ? t.className.split(/\s+/) : [], n = 0, r = i.length; r > n; n++) if (i[n] === e) i.splice(n, 1),
            n--;
            t.className = i.join(" ")
        }
        return t
    },
    exports.toggleClass = function(t, e, i) {
        return i = "boolean" == typeof i ? i: !exports.hasClass(t, e),
        exports[i ? "addClass": "removeClass"](t, e),
        t
    },
    exports.hasClass = function(t, e) {
        if (t.classList) return t.classList.contains(e);
        for (var i = t.className.split(/\s+/), n = 0, r = i.length; r > n; n++) if (i[n] === e) return ! 0;
        return ! 1
    },
    exports.position = function(t, e) {
        var i = {},
        n = t.getBoundingClientRect();
        if (e) {
            var r = e.getBoundingClientRect();
            i.left = n.left - r.left,
            i.top = n.top - r.top
        } else i.left = n.left + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft),
        i.top = n.top + Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        return i
    },
    exports
}),

define("saber-dom/traversal", ["require", "./selector"],
function(require) {
    var t = require("./selector").matches,
    exports = {};
    return exports.children = function(t) {
        for (var e, i = [], n = t.children, r = 0; e = n[r]; r++) if (1 === e.nodeType) i.push(e);
        return i
    },
    exports.closest = function(e, i, n) {
        n = n || document;
        do {
            if (t(e, i)) return e;
            if (e === n) return null
        } while (( e = e . parentNode ) && e !== document);
        return null
    },
    exports
}),

define("saber-dom/data", [],
function() {
    var exports = {},
    t = "data-";
    return exports.setData = function(e, i, n) {
        e.setAttribute(t + i, n)
    },
    exports.getData = function(e, i) {
        return e.getAttribute(t + i)
    },
    exports.removeData = function(e, i) {
        e.removeAttribute(t + i)
    },
    exports
}),

define("saber-dom/main", ["require", "./selector", "./css", "./traversal", "./data"],
function(require) {
    function t(t, e) {
        for (var i in e) if (e.hasOwnProperty(i)) t[i] = e[i];
        return t
    }
    var exports = {};
    return t(exports, require("./selector")),
    t(exports, require("./css")),
    t(exports, require("./traversal")),
    t(exports, require("./data")),
    exports
}),

define("saber-dom", ["saber-dom/main"],
function(t) {
    return t
}),

define("saber-lang/extend", [],
function() {
    function t(t, e) {
        for (var i = 1,
        n = arguments.length; n > i; i++) if (e = arguments[i]) {
            for (var r in e) if (e.hasOwnProperty(r)) t[r] = e[r]
        } else;
        return t
    }
    return t
}),

// define("saber-string/format", [],
// function() {
//     function t(t, e) {
//         if (!t) return "";
//         if (null == e) return t;
//         var i = "function" == typeof e ? e: function(t) {
//             var i = e[t];
//             return null == i ? "": i
//         };
//         return (t + "").replace(/\$\{(.+?)\}/g,
//         function(t, e) {
//             return i(e)
//         })
//     }
//     return t
// }),

define("saber-lang/function/debounce", [],
function() {
    function t(t, e, i) {
        var n, r, s, a, o = function() {
            var u = Date.now() - a;
            if (e > u && u > 0) s = setTimeout(o, e - u);
            else if (s = null, !i) t.apply(n, r),
            n = r = null
        };
        return function() {
            n = this,
            r = arguments,
            a = Date.now();
            var u = 0 >= e || i && !s;
            if (e > 0 && !s) s = setTimeout(o, e);
            if (u) t.apply(n, r),
            n = r = null
        }
    }
    return t
}),

define("saber-lang/bind", [],
function() {
    function t(t, e) {
        var i = Array.prototype.slice.call(arguments, 2);
        return function() {
            return t.apply(e, i.concat(Array.prototype.slice.call(arguments)))
        }
    }
    return t
}),

// define("saber-promise/promise", [],
// function() {
//     function t(t) {
//         return "function" == typeof t
//     }
//     function e(t) {
//         return "[object Object]" === Object.prototype.toString.call(t)
//     }
//     function i(n, r) {
//         function s(t) {
//             if (!u) i(n, t),
//             u = !0
//         }
//         function a(t) {
//             if (!u) n.reject(t),
//             u = !0
//         }
//         function o() {
//             var i;
//             if (e(r) || t(r)) if (i = r.then, t(i)) i.call(r, s, a);
//             else i = null;
//             if (!i) n.fulfill(r)
//         }
//         var u;
//         if (f) try {
//             o()
//         } catch(h) {
//             if (!u) l(h),
//             n.reject(h)
//         } else o()
//     }
//     function n(t, e, n) {
//         return function(r) {
//             function s() {
//                 var s = n(r);
//                 if (s === e) throw new TypeError;
//                 i(t, s)
//             }
//             if (f) try {
//                 s()
//             } catch(a) {
//                 l(a),
//                 t.reject(a)
//             } else s()
//         }
//     }
//     function r(t, e, i) {
//         if (t.status === e) p(function() {
//             i(t.data)
//         });
//         else if (e === c.FULFILLED) t.fulfillList.push(i);
//         else if (e === c.REJECTED) t.rejectList.push(i)
//     }
//     function s(t) {
//         var e = t.status === c.FULFILLED ? t.fulfillList: t.rejectList;
//         if (u(t), e.length) p(function() {
//             for (var i; i = e.shift();) i(t.data)
//         })
//     }
//     function a(e, i, s) {
//         var a = new h,
//         u = o(a);
//         if (t(i)) i = n(a, u, i);
//         else i = function(t) {
//             a.fulfill(t)
//         };
//         if (r(e, c.FULFILLED, i), t(s)) s = n(a, u, s);
//         else s = function(t) {
//             a.reject(t)
//         };
//         return r(e, c.REJECTED, s),
//         u
//     }
//     function o(t) {
//         return {
//             then: function(e, i) {
//                 return a(t, e, i)
//             }
//         }
//     }
//     function u(t) {
//         var e = t.status === c.FULFILLED ? "resolve": "reject";
//         if (d) h.emit(e, t.data)
//     }
//     function l(t) {
//         if (d) h.emit("exception", t)
//     }
//     function h() {
//         this.status = c.PENDING,
//         this.fulfillList = [],
//         this.rejectList = []
//     }
//     var c = {
//         PENDING: 0,
//         FULFILLED: 1,
//         REJECTED: 2
//     },
//     f = !0,
//     d = !1,
//     p = function() {
//         function e() {
//             var t, e = r.length;
//             for (t = 0; e > t; t++) r[t]();
//             r.splice(0, t)
//         }
//         var i, n, r = [],
//         s = "promise";
//         if ("function" == typeof setImmediate) i = setImmediate;
//         else if (n = window.MutationObserver || window.webKitMutationObserver) {
//             var a = new n(function(t) {
//                 var i = t[0];
//                 if (i.attributeName === s) e()
//             }),
//             o = document.createElement("div");
//             a.observe(o, {
//                 attributes: !0
//             }),
//             i = function(t) {
//                 r.push(t),
//                 o.setAttribute(s, Date.now ? Date.now() : (new Date).getTime())
//             }
//         } else if (t(window.postMessage)) window.addEventListener("message",
//         function(t) {
//             if (t.source === window && t.data === s) e()
//         },
//         !1),
//         i = function(t) {
//             r.push(t),
//             window.postMessage(s, "*")
//         };
//         else i = function(t) {
//             setTimeout(t, 0)
//         };
//         return i
//     } ();
//     return h.enableGlobalEvent = function(t) {
//         t.mixin(this),
//         d = !0
//     },
//     h.disableExceptionCapture = function() {
//         f = !1
//     },
//     h.enableExceptionCapture = function() {
//         f = !0
//     },
//     h.all = function(t) {
//         function e(e) {
//             return function(i) {
//                 if (s[e] = i, r++, r >= t.length) n.fulfill(s)
//             }
//         }
//         function i(t) {
//             n.reject(t)
//         }
//         if (!Array.isArray(t)) t = Array.prototype.slice.call(arguments);
//         var n = new h,
//         r = 0,
//         s = [];
//         return t.forEach(function(t, n) {
//             t.then(e(n), i)
//         }),
//         n.promise()
//     },
//     h.promise = function(t) {
//         var e = new h;
//         return t(e),
//         e.promise()
//     },
//     h.rejected = function(t) {
//         return this.promise(function(e) {
//             e.reject(t)
//         })
//     },
//     h.fulfilled = function(t) {
//         return this.promise(function(e) {
//             e.fulfill(t)
//         })
//     },
//     h.resolved = h.fulfilled,
//     h.prototype.fulfill = function(t) {
//         if (this.status === c.PENDING) this.data = t,
//         this.status = c.FULFILLED,
//         s(this)
//     },
//     h.prototype.resolve = h.prototype.fulfill,
//     h.prototype.reject = function(t) {
//         if (this.status === c.PENDING) this.data = t,
//         this.status = c.REJECTED,
//         s(this)
//     },
//     h.prototype.promise = function() {
//         return o(this)
//     },
//     h
// }),

// define("saber-promise", ["saber-promise/promise"],
// function(t) {
//     return t
// }),

// define("saber-ajax/ajax", ["require", "saber-lang/bind", "saber-emitter", "saber-promise"],
// function(require) {
//     function t(t, e) {
//         var i = Object.keys(t).map(function(t) {
//             return t.toLowerCase()
//         });
//         return i.indexOf(e.toLowerCase()) >= 0
//     }
//     function e() {
//         return new XMLHttpRequest
//     }
//     function i(t, e) {
//         Object.keys(t).forEach(function(i) {
//             e(i, t[i])
//         })
//     }
//     function n(t) {
//         return "function" == typeof t
//     }
//     function r(t) {
//         return "[object String]" === Object.prototype.toString.call(t)
//     }
//     function s(t, e) {
//         return i(e,
//         function(e, i) {
//             t[e] = i
//         }),
//         t
//     }
//     function a(t) {
//         var e;
//         if (t.responseType && t.responseType !== v) e = t.response;
//         else e = t.responseText;
//         return e
//     }
//     function o(t) {
//         i(y,
//         function(e) {
//             t["on" + e] = null
//         })
//     }
//     function u(t, e, i) {
//         this.xhr = t,
//         this.promise = e.promise(),
//         this.url = i.url,
//         this.handleSuccess = !1,
//         this.handleFail = !1,
//         this.then(f(exports.emit, exports, "success", this), f(exports.emit, exports, "fail", this))
//     }
//     function l(t) {
//         var e = [];
//         return t = t || {},
//         i(t,
//         function(t, i) {
//             if (!Array.isArray(i)) i = [i];
//             i.forEach(function(i) {
//                 e.push(t + "=" + encodeURIComponent(i))
//             })
//         }),
//         e.join("&")
//     }
//     function h(t, e) {
//         if (!r(e)) e = l(e);
//         t = t.split("#");
//         var i = t[1];
//         return t = t[0],
//         t += t.indexOf("?") >= 0 ? "&": "?",
//         t += e + (i ? "#" + i: "")
//     }
//     function c(a, o) {
//         var c = e();
//         if (o = s({},
//         o || {}), o.method === p && o.data) a = h(a, o.data),
//         o.data = null;
//         c.open(o.method || p, a, o.async || !0, o.username, o.password);
//         var f = s(o.headers || {},
//         {
//             "X-Requested-With": "XMLHttpRequest"
//         }),
//         d = window.FormData ? o.data instanceof FormData: !1;
//         if (o.method === g && !t(f, "Content-Type") && !d) f["Content-Type"] = "application/x-www-form-urlencoded";
//         i(f,
//         function(t, e) {
//             c.setRequestHeader(t, e)
//         });
//         var b;
//         if (b = o.responseType) c.responseType = m[b.toUpperCase()] || v;
//         if (o.async !== !1 && o.timeout) c.timeout = o.timeout;
//         var w = require("saber-promise"),
//         E = new w;
//         if (i(y,
//         function(t, e) {
//             c["on" + t] = e(c, E)
//         }), o.progress) if (n(o.progress)) c.onprogress = o.progress;
//         else if (o.progress.upload && c.upload) c.upload.onprogress = o.progress.upload;
//         else if (o.progress.download) c.onprogress = o.progress.download;
//         if (o.before && n(o.before)) {
//             var x = o.before(c, E);
//             if (x === !1) return new u(c, E, o)
//         }
//         var T = o.data;
//         if (window.FormData && T instanceof FormData) c.send(T);
//         else if (!r(T) && o.stringify !== !1) c.send(l(T));
//         else c.send(T);
//         return o.url = a,
//         new u(c, E, o)
//     }
//     var f = require("saber-lang/bind"),
//     d = require("saber-emitter"),
//     exports = {};
//     d.mixin(exports);
//     var p = "GET",
//     g = "POST",
//     m = {
//         TEXT: "text",
//         ARRAYBUFFER: "arraybuffer",
//         DOCUMENT: "document",
//         BLOB: "blob",
//         JSON: "json"
//     },
//     v = m.TEXT,
//     y = {
//         load: function(t, e) {
//             return function() {
//                 o(t);
//                 var i = t.status;
//                 if (i >= 200 && 300 > i || 304 === i) e.fulfill(a(t));
//                 else e.reject(i)
//             }
//         },
//         error: function(t, e) {
//             return function() {
//                 o(t),
//                 e.reject("error")
//             }
//         },
//         abort: function(t, e) {
//             return function() {
//                 o(t),
//                 e.reject("abort")
//             }
//         },
//         timeout: function(t, e) {
//             return function() {
//                 o(t),
//                 e.reject("timeout")
//             }
//         }
//     };
//     return u.prototype.then = function(t, e) {
//         return this.handleSuccess = this.handleSuccess || !!t,
//         this.handleFail = this.handleFail || !!e,
//         this.promise.then(t, e)
//     },
//     u.prototype.success = function(t) {
//         return this.handleSuccess = !0,
//         this.then(t)
//     },
//     u.prototype.fail = function(t) {
//         return this.handleFail = !0,
//         this.then(null, t)
//     },
//     u.prototype.ensure = function(t) {
//         return this.handleSuccess = this.handleFail = !0,
//         this.then(t, t)
//     },
//     u.prototype.abort = function() {
//         this.xhr.abort()
//     },
//     u.prototype.getData = function() {
//         return a(this.xhr)
//     },
//     exports.get = function(t, e) {
//         var i = {
//             method: p,
//             data: e
//         };
//         return c(t, i)
//     },
//     exports.post = function(t, e) {
//         var i = {
//             method: g,
//             data: e
//         };
//         return c(t, i)
//     },
//     exports.request = c,
//     exports
// }),

// define("saber-ajax", ["saber-ajax/ajax"],
// function(t) {
//     return t
// }),

define("saber-lang/inherits", [],
function() {
    function t(t, e) {
        var i = function() {};
        i.prototype = e.prototype;
        var n = t.prototype,
        r = t.prototype = new i;
        for (var s in n) if (n.hasOwnProperty(s)) r[s] = n[s];
        return t.prototype.constructor = t,
        t
    }
    return t
}),

define("saber-lang/curry", [],
function() {
    function t(t) {
        var e = [].slice.call(arguments, 1);
        return function() {
            var i = e.concat([].slice.call(arguments));
            return t.apply(this, i)
        }
    }
    return t
}),

define("saber-lang/main", ["require", "./inherits", "./extend", "./curry", "./bind"],
function(require) {
    return {
        inherits: require("./inherits"),
        extend: require("./extend"),
        curry: require("./curry"),
        bind: require("./bind")
    }
}),

define("saber-lang", ["saber-lang/main"],
function(t) {
    return t
}),

define("saber-lang/type", ["require"],
function() {
    var exports = {},
    t = {};
    return "Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function(e) {
        t["[object " + e + "]"] = e.toLowerCase()
    }),
    exports.type = function(e) {
        return null == e ? String(e) : t[t.toString.call(e)] || "object"
    },
    exports.isPlainObject = function(t) {
        return "object" === exports.type(t) && Object.getPrototypeOf(t) === Object.prototype
    },
    exports.isEmptyObject = function(t) {
        if ("object" !== exports.type(t)) return ! 1;
        if (Object.keys(t).length) return ! 1;
        else return ! 0
    },
    exports.isEmpty = function(t) {
        return null === t || void 0 === t || "" === t || Array.isArray(t) && 0 === t.length || exports.isEmptyObject(t)
    },
    exports
}),

define("saber-widget/main", ["require", "saber-lang", "saber-lang/type"],
function(require) {
    var t = {},
    e = {
        configAttr: "s-ui",
        instanceAttr: "s-id"
    };
    t.config = function(t) {
        require("saber-lang").extend(e, t)
    },
    t.getConfig = function(t) {
        return e[t]
    };
    var i = 8652548;
    t.getGUID = function(t) {
        return t = t || "s",
        t + i++
    },
    t.dispose = function(t) {
        if (!t) for (var e in n) n[e].dispose();
        else if ("string" == typeof t) {
            if (t = this.get(t)) t.dispose()
        } else if ("function" == typeof t.dispose) t.dispose();
        else if (/^\[object\sHTML/.test(Object.prototype.toString.call(t))) this.find(t).forEach(function(t) {
            t.dispose()
        })
    },
    t.find = function(e) {
        var i = this.getConfig("instanceAttr");
        return [].map.call(e.querySelectorAll("[" + i + "]"),
        function(e) {
            return t.get(e.getAttribute(i))
        })
    };
    var n = {};
    t.add = function(t) {
        var e = n[t.id];
        if (!e || e !== t) n[t.id] = t
    },
    t.remove = function(t) {
        delete n[t.id]
    },
    t.get = function(t) {
        return n[t]
    };
    var r = {};
    t.register = function(e) {
        if ("function" == typeof e) {
            var i = e.prototype.type;
            if (i in r) throw new Error(i + " is exists!");
            r[i] = e,
            t[i.charAt(0).toLowerCase() + i.slice(1)] = function(t, e) {
                if (require("saber-lang/type").isPlainObject(t)) e = t || {};
                else e = e || {},
                e.main = t;
                return new r[i](e).render()
            }
        }
    };
    var s = {};
    return t.registerPlugin = function(t) {
        if ("function" == typeof t) {
            var e = t.prototype.type;
            if (e in s) throw new Error("plugin " + e + " is exists!");
            s[e] = t
        }
    },
    t.enablePlugin = function(t, e, i) {
        var n = t.plugins || (t.plugins = {}),
        r = n[e];
        if (!r && (r = s[e])) r = t.plugins[e] = new r(t, i);
        if (r) r.enable()
    },
    t.disablePlugin = function(t, e) {
        var i = t.plugins;
        if (i) {
            var n;
            if (Array.isArray(e)) n = e;
            else if (!e) n = Object.keys(i);
            else if ("string" == typeof e) n = [e];
            n.forEach(function(t) {
                if (t && i[t]) i[t].disable()
            })
        }
    },
    t.disposePlugin = function(t, e) {
        var i = t.plugins;
        if (i) {
            var n;
            if (Array.isArray(e)) n = e;
            else if (!e) n = Object.keys(i);
            else if ("string" == typeof e) n = [e];
            n.forEach(function(t) {
                if (t && i[t]) i[t].dispose(),
                delete i[t]
            })
        }
    },
    t
}),

define("saber-widget", ["saber-widget/main"],
function(t) {
    return t
}),

// function(t, e, i, n) {
//     "use strict";
//     function r(t, e, i) {
//         return setTimeout(h(t, i), e)
//     }
//     function s(t, e, i) {
//         if (Array.isArray(t)) return a(t, i[e], i),
//         !0;
//         else return ! 1
//     }
//     function a(t, e, i) {
//         var r;
//         if (t) if (t.forEach) t.forEach(e, i);
//         else if (t.length !== n) for (r = 0; r < t.length;) e.call(i, t[r], r, t),
//         r++;
//         else for (r in t) t.hasOwnProperty(r) && e.call(i, t[r], r, t)
//     }
//     function o(t, e, i) {
//         for (var r = Object.keys(e), s = 0; s < r.length;) {
//             if (!i || i && t[r[s]] === n) t[r[s]] = e[r[s]];
//             s++
//         }
//         return t
//     }
//     function u(t, e) {
//         return o(t, e, !0)
//     }
//     function l(t, e, i) {
//         var n, r = e.prototype;
//         if (n = t.prototype = Object.create(r), n.constructor = t, n._super = r, i) o(n, i)
//     }
//     function h(t, e) {
//         return function() {
//             return t.apply(e, arguments)
//         }
//     }
//     function c(t, e) {
//         if (typeof t == he) return t.apply(e ? e[0] || n: n, e);
//         else return t
//     }
//     function f(t, e) {
//         return t === n ? e: t
//     }
//     function d(t, e, i) {
//         a(v(e),
//         function(e) {
//             t.addEventListener(e, i, !1)
//         })
//     }
//     function p(t, e, i) {
//         a(v(e),
//         function(e) {
//             t.removeEventListener(e, i, !1)
//         })
//     }
//     function g(t, e) {
//         for (; t;) {
//             if (t == e) return ! 0;
//             t = t.parentNode
//         }
//         return ! 1
//     }
//     function m(t, e) {
//         return t.indexOf(e) > -1
//     }
//     function v(t) {
//         return t.trim().split(/\s+/g)
//     }
//     function y(t, e, i) {
//         if (t.indexOf && !i) return t.indexOf(e);
//         else {
//             for (var n = 0; n < t.length;) {
//                 if (i && t[n][i] == e || !i && t[n] === e) return n;
//                 n++
//             }
//             return - 1
//         }
//     }
//     function b(t) {
//         return Array.prototype.slice.call(t, 0)
//     }
//     function w(t, e, i) {
//         for (var n = [], r = [], s = 0; s < t.length;) {
//             var a = e ? t[s][e] : t[s];
//             if (y(r, a) < 0) n.push(t[s]);
//             r[s] = a,
//             s++
//         }
//         if (i) if (!e) n = n.sort();
//         else n = n.sort(function(t, i) {
//             return t[e] > i[e]
//         });
//         return n
//     }
//     function E(t, e) {
//         for (var i, r, s = e[0].toUpperCase() + e.slice(1), a = 0; a < ue.length;) {
//             if (i = ue[a], r = i ? i + s: e, r in t) return r;
//             a++
//         }
//         return n
//     }
//     function x() {
//         return pe++
//     }
//     function T(t) {
//         var e = t.ownerDocument;
//         return e.defaultView || e.parentWindow
//     }
//     function _(t, e) {
//         var i = this;
//         this.manager = t,
//         this.callback = e,
//         this.element = t.element,
//         this.target = t.options.inputTarget,
//         this.domHandler = function(e) {
//             if (c(t.options.enable, [t])) i.handler(e)
//         },
//         this.init()
//     }
//     function A(t) {
//         var e, i = t.options.inputClass;
//         if (i) e = i;
//         else if (ve) e = H;
//         else if (ye) e = $;
//         else if (!me) e = j;
//         else e = X;
//         return new e(t, S)
//     }
//     function S(t, e, i) {
//         var n = i.pointers.length,
//         r = i.changedPointers.length,
//         s = e & _e && n - r === 0,
//         a = e & (Se | ke) && n - r === 0;
//         if (i.isFirst = !!s, i.isFinal = !!a, s) t.session = {};
//         i.eventType = e,
//         k(t, i),
//         t.emit("hammer.input", i),
//         t.recognize(i),
//         t.session.prevInput = i
//     }
//     function k(t, e) {
//         var i = t.session,
//         n = e.pointers,
//         r = n.length;
//         if (!i.firstInput) i.firstInput = R(e);
//         if (r > 1 && !i.firstMultiple) i.firstMultiple = R(e);
//         else if (1 === r) i.firstMultiple = !1;
//         var s = i.firstInput,
//         a = i.firstMultiple,
//         o = a ? a.center: s.center,
//         u = e.center = O(n);
//         e.timeStamp = de(),
//         e.deltaTime = e.timeStamp - s.timeStamp,
//         e.angle = M(o, u),
//         e.distance = L(o, u),
//         C(i, e),
//         e.offsetDirection = P(e.deltaX, e.deltaY),
//         e.scale = a ? q(a.pointers, n) : 1,
//         e.rotation = a ? N(a.pointers, n) : 0,
//         D(i, e);
//         var l = t.element;
//         if (g(e.srcEvent.target, l)) l = e.srcEvent.target;
//         e.target = l
//     }
//     function C(t, e) {
//         var i = e.center,
//         n = t.offsetDelta || {},
//         r = t.prevDelta || {},
//         s = t.prevInput || {};
//         if (e.eventType === _e || s.eventType === Se) r = t.prevDelta = {
//             x: s.deltaX || 0,
//             y: s.deltaY || 0
//         },
//         n = t.offsetDelta = {
//             x: i.x,
//             y: i.y
//         };
//         e.deltaX = r.x + (i.x - n.x),
//         e.deltaY = r.y + (i.y - n.y)
//     }
//     function D(t, e) {
//         var i, r, s, a, o = t.lastInterval || e,
//         u = e.timeStamp - o.timeStamp;
//         if (e.eventType != ke && (u > Te || o.velocity === n)) {
//             var l = o.deltaX - e.deltaX,
//             h = o.deltaY - e.deltaY,
//             c = I(u, l, h);
//             r = c.x,
//             s = c.y,
//             i = fe(c.x) > fe(c.y) ? c.x: c.y,
//             a = P(l, h),
//             t.lastInterval = e
//         } else i = o.velocity,
//         r = o.velocityX,
//         s = o.velocityY,
//         a = o.direction;
//         e.velocity = i,
//         e.velocityX = r,
//         e.velocityY = s,
//         e.direction = a
//     }
//     function R(t) {
//         for (var e = [], i = 0; i < t.pointers.length;) e[i] = {
//             clientX: ce(t.pointers[i].clientX),
//             clientY: ce(t.pointers[i].clientY)
//         },
//         i++;
//         return {
//             timeStamp: de(),
//             pointers: e,
//             center: O(e),
//             deltaX: t.deltaX,
//             deltaY: t.deltaY
//         }
//     }
//     function O(t) {
//         var e = t.length;
//         if (1 === e) return {
//             x: ce(t[0].clientX),
//             y: ce(t[0].clientY)
//         };
//         for (var i = 0,
//         n = 0,
//         r = 0; e > r;) i += t[r].clientX,
//         n += t[r].clientY,
//         r++;
//         return {
//             x: ce(i / e),
//             y: ce(n / e)
//         }
//     }
//     function I(t, e, i) {
//         return {
//             x: e / t || 0,
//             y: i / t || 0
//         }
//     }
//     function P(t, e) {
//         if (t === e) return Ce;
//         if (fe(t) >= fe(e)) return t > 0 ? De: Re;
//         else return e > 0 ? Oe: Ie
//     }
//     function L(t, e, i) {
//         if (!i) i = Ne;
//         var n = e[i[0]] - t[i[0]],
//         r = e[i[1]] - t[i[1]];
//         return Math.sqrt(n * n + r * r)
//     }
//     function M(t, e, i) {
//         if (!i) i = Ne;
//         var n = e[i[0]] - t[i[0]],
//         r = e[i[1]] - t[i[1]];
//         return 180 * Math.atan2(r, n) / Math.PI
//     }
//     function N(t, e) {
//         return M(e[1], e[0], qe) - M(t[1], t[0], qe)
//     }
//     function q(t, e) {
//         return L(e[0], e[1], qe) / L(t[0], t[1], qe)
//     }
//     function j() {
//         this.evEl = He,
//         this.evWin = ze,
//         this.allow = !0,
//         this.pressed = !1,
//         _.apply(this, arguments)
//     }
//     function H() {
//         this.evEl = Be,
//         this.evWin = Xe,
//         _.apply(this, arguments),
//         this.store = this.manager.session.pointerEvents = []
//     }
//     function z() {
//         this.evTarget = Ye,
//         this.evWin = Ue,
//         this.started = !1,
//         _.apply(this, arguments)
//     }
//     function F(t, e) {
//         var i = b(t.touches),
//         n = b(t.changedTouches);
//         if (e & (Se | ke)) i = w(i.concat(n), "identifier", !0);
//         return [i, n]
//     }
//     function $() {
//         this.evTarget = Ge,
//         this.targetIds = {},
//         _.apply(this, arguments)
//     }
//     function B(t, e) {
//         var i = b(t.touches),
//         n = this.targetIds;
//         if (e & (_e | Ae) && 1 === i.length) return n[i[0].identifier] = !0,
//         [i, i];
//         var r, s, a = b(t.changedTouches),
//         o = [],
//         u = this.target;
//         if (s = i.filter(function(t) {
//             return g(t.target, u)
//         }), e === _e) for (r = 0; r < s.length;) n[s[r].identifier] = !0,
//         r++;
//         for (r = 0; r < a.length;) {
//             if (n[a[r].identifier]) o.push(a[r]);
//             if (e & (Se | ke)) delete n[a[r].identifier];
//             r++
//         }
//         if (o.length) return [w(s.concat(o), "identifier", !0), o];
//         else return void 0
//     }
//     function X() {
//         _.apply(this, arguments);
//         var t = h(this.handler, this);
//         this.touch = new $(this.manager, t),
//         this.mouse = new j(this.manager, t)
//     }
//     function V(t, e) {
//         this.manager = t,
//         this.set(e)
//     }
//     function Y(t) {
//         if (m(t, ei)) return ei;
//         var e = m(t, ii),
//         i = m(t, ni);
//         if (e && i) return ii + " " + ni;
//         if (e || i) return e ? ii: ni;
//         if (m(t, ti)) return ti;
//         else return Ke
//     }
//     function U(t) {
//         this.id = x(),
//         this.manager = null,
//         this.options = u(t || {},
//         this.defaults),
//         this.options.enable = f(this.options.enable, !0),
//         this.state = ri,
//         this.simultaneous = {},
//         this.requireFail = []
//     }
//     function W(t) {
//         if (t & li) return "cancel";
//         else if (t & oi) return "end";
//         else if (t & ai) return "move";
//         else if (t & si) return "start";
//         return ""
//     }
//     function G(t) {
//         if (t == Ie) return "down";
//         else if (t == Oe) return "up";
//         else if (t == De) return "left";
//         else if (t == Re) return "right";
//         return ""
//     }
//     function J(t, e) {
//         var i = e.manager;
//         if (i) return i.get(t);
//         else return t
//     }
//     function Q() {
//         U.apply(this, arguments)
//     }
//     function Z() {
//         Q.apply(this, arguments),
//         this.pX = null,
//         this.pY = null
//     }
//     function K() {
//         Q.apply(this, arguments)
//     }
//     function te() {
//         U.apply(this, arguments),
//         this._timer = null,
//         this._input = null
//     }
//     function ee() {
//         Q.apply(this, arguments)
//     }
//     function ie() {
//         Q.apply(this, arguments)
//     }
//     function ne() {
//         U.apply(this, arguments),
//         this.pTime = !1,
//         this.pCenter = !1,
//         this._timer = null,
//         this._input = null,
//         this.count = 0
//     }
//     function re(t, e) {
//         return e = e || {},
//         e.recognizers = f(e.recognizers, re.defaults.preset),
//         new se(t, e)
//     }
//     function se(t, e) {
//         e = e || {},
//         this.options = u(e, re.defaults),
//         this.options.inputTarget = this.options.inputTarget || t,
//         this.handlers = {},
//         this.session = {},
//         this.recognizers = [],
//         this.element = t,
//         this.input = A(this),
//         this.touchAction = new V(this, this.options.touchAction),
//         ae(this, !0),
//         a(e.recognizers,
//         function(t) {
//             var e = this.add(new t[0](t[1]));
//             t[2] && e.recognizeWith(t[2]),
//             t[3] && e.requireFailure(t[3])
//         },
//         this)
//     }
//     function ae(t, e) {
//         var i = t.element;
//         a(t.options.cssProps,
//         function(t, n) {
//             i.style[E(i.style, n)] = e ? t: ""
//         })
//     }
//     function oe(t, i) {
//         var n = e.createEvent("Event");
//         n.initEvent(t, !0, !0),
//         n.gesture = i,
//         i.target.dispatchEvent(n)
//     }
//     var ue = ["", "webkit", "moz", "MS", "ms", "o"],
//     le = e.createElement("div"),
//     he = "function",
//     ce = Math.round,
//     fe = Math.abs,
//     de = Date.now,
//     pe = 1,
//     ge = /mobile|tablet|ip(ad|hone|od)|android/i,
//     me = "ontouchstart" in t,
//     ve = E(t, "PointerEvent") !== n,
//     ye = me && ge.test(navigator.userAgent),
//     be = "touch",
//     we = "pen",
//     Ee = "mouse",
//     xe = "kinect",
//     Te = 25,
//     _e = 1,
//     Ae = 2,
//     Se = 4,
//     ke = 8,
//     Ce = 1,
//     De = 2,
//     Re = 4,
//     Oe = 8,
//     Ie = 16,
//     Pe = De | Re,
//     Le = Oe | Ie,
//     Me = Pe | Le,
//     Ne = ["x", "y"],
//     qe = ["clientX", "clientY"];
//     _.prototype = {
//         handler: function() {},
//         init: function() {
//             this.evEl && d(this.element, this.evEl, this.domHandler),
//             this.evTarget && d(this.target, this.evTarget, this.domHandler),
//             this.evWin && d(T(this.element), this.evWin, this.domHandler)
//         },
//         destroy: function() {
//             this.evEl && p(this.element, this.evEl, this.domHandler),
//             this.evTarget && p(this.target, this.evTarget, this.domHandler),
//             this.evWin && p(T(this.element), this.evWin, this.domHandler)
//         }
//     };
//     var je = {
//         mousedown: _e,
//         mousemove: Ae,
//         mouseup: Se
//     },
//     He = "mousedown",
//     ze = "mousemove mouseup";
//     l(j, _, {
//         handler: function(t) {
//             var e = je[t.type];
//             if (e & _e && 0 === t.button) this.pressed = !0;
//             if (e & Ae && 1 !== t.which) e = Se;
//             if (this.pressed && this.allow) {
//                 if (e & Se) this.pressed = !1;
//                 this.callback(this.manager, e, {
//                     pointers: [t],
//                     changedPointers: [t],
//                     pointerType: Ee,
//                     srcEvent: t
//                 })
//             }
//         }
//     });
//     var Fe = {
//         pointerdown: _e,
//         pointermove: Ae,
//         pointerup: Se,
//         pointercancel: ke,
//         pointerout: ke
//     },
//     $e = {
//         2 : be,
//         3 : we,
//         4 : Ee,
//         5 : xe
//     },
//     Be = "pointerdown",
//     Xe = "pointermove pointerup pointercancel";
//     if (t.MSPointerEvent) Be = "MSPointerDown",
//     Xe = "MSPointerMove MSPointerUp MSPointerCancel";
//     l(H, _, {
//         handler: function(t) {
//             var e = this.store,
//             i = !1,
//             n = t.type.toLowerCase().replace("ms", ""),
//             r = Fe[n],
//             s = $e[t.pointerType] || t.pointerType,
//             a = s == be,
//             o = y(e, t.pointerId, "pointerId");
//             if (r & _e && (0 === t.button || a)) {
//                 if (0 > o) e.push(t),
//                 o = e.length - 1
//             } else if (r & (Se | ke)) i = !0;
//             if (! (0 > o)) if (e[o] = t, this.callback(this.manager, r, {
//                 pointers: e,
//                 changedPointers: [t],
//                 pointerType: s,
//                 srcEvent: t
//             }), i) e.splice(o, 1)
//         }
//     });
//     var Ve = {
//         touchstart: _e,
//         touchmove: Ae,
//         touchend: Se,
//         touchcancel: ke
//     },
//     Ye = "touchstart",
//     Ue = "touchstart touchmove touchend touchcancel";
//     l(z, _, {
//         handler: function(t) {
//             var e = Ve[t.type];
//             if (e === _e) this.started = !0;
//             if (this.started) {
//                 var i = F.call(this, t, e);
//                 if (e & (Se | ke) && i[0].length - i[1].length === 0) this.started = !1;
//                 this.callback(this.manager, e, {
//                     pointers: i[0],
//                     changedPointers: i[1],
//                     pointerType: be,
//                     srcEvent: t
//                 })
//             }
//         }
//     });
//     var We = {
//         touchstart: _e,
//         touchmove: Ae,
//         touchend: Se,
//         touchcancel: ke
//     },
//     Ge = "touchstart touchmove touchend touchcancel";
//     l($, _, {
//         handler: function(t) {
//             var e = We[t.type],
//             i = B.call(this, t, e);
//             if (i) this.callback(this.manager, e, {
//                 pointers: i[0],
//                 changedPointers: i[1],
//                 pointerType: be,
//                 srcEvent: t
//             })
//         }
//     }),
//     l(X, _, {
//         handler: function(t, e, i) {
//             var n = i.pointerType == be,
//             r = i.pointerType == Ee;
//             if (n) this.mouse.allow = !1;
//             else if (r && !this.mouse.allow) return;
//             if (e & (Se | ke)) this.mouse.allow = !0;
//             this.callback(t, e, i)
//         },
//         destroy: function() {
//             this.touch.destroy(),
//             this.mouse.destroy()
//         }
//     });
//     var Je = E(le.style, "touchAction"),
//     Qe = Je !== n,
//     Ze = "compute",
//     Ke = "auto",
//     ti = "manipulation",
//     ei = "none",
//     ii = "pan-x",
//     ni = "pan-y";
//     V.prototype = {
//         set: function(t) {
//             if (t == Ze) t = this.compute();
//             if (Qe) this.manager.element.style[Je] = t;
//             this.actions = t.toLowerCase().trim()
//         },
//         update: function() {
//             this.set(this.manager.options.touchAction)
//         },
//         compute: function() {
//             var t = [];
//             return a(this.manager.recognizers,
//             function(e) {
//                 if (c(e.options.enable, [e])) t = t.concat(e.getTouchAction())
//             }),
//             Y(t.join(" "))
//         },
//         preventDefaults: function(t) {
//             if (!Qe) {
//                 var e = t.srcEvent,
//                 i = t.offsetDirection;
//                 if (this.manager.session.prevented) return void e.preventDefault();
//                 var n = this.actions,
//                 r = m(n, ei),
//                 s = m(n, ni),
//                 a = m(n, ii);
//                 if (r || s && i & Pe || a && i & Le) return this.preventSrc(e);
//                 else return void 0
//             }
//         },
//         preventSrc: function(t) {
//             this.manager.session.prevented = !0,
//             t.preventDefault()
//         }
//     };
//     var ri = 1,
//     si = 2,
//     ai = 4,
//     oi = 8,
//     ui = oi,
//     li = 16,
//     hi = 32;
//     U.prototype = {
//         defaults: {},
//         set: function(t) {
//             return o(this.options, t),
//             this.manager && this.manager.touchAction.update(),
//             this
//         },
//         recognizeWith: function(t) {
//             if (s(t, "recognizeWith", this)) return this;
//             var e = this.simultaneous;
//             if (t = J(t, this), !e[t.id]) e[t.id] = t,
//             t.recognizeWith(this);
//             return this
//         },
//         dropRecognizeWith: function(t) {
//             if (s(t, "dropRecognizeWith", this)) return this;
//             else return t = J(t, this),
//             delete this.simultaneous[t.id],
//             this
//         },
//         requireFailure: function(t) {
//             if (s(t, "requireFailure", this)) return this;
//             var e = this.requireFail;
//             if (t = J(t, this), -1 === y(e, t)) e.push(t),
//             t.requireFailure(this);
//             return this
//         },
//         dropRequireFailure: function(t) {
//             if (s(t, "dropRequireFailure", this)) return this;
//             t = J(t, this);
//             var e = y(this.requireFail, t);
//             if (e > -1) this.requireFail.splice(e, 1);
//             return this
//         },
//         hasRequireFailures: function() {
//             return this.requireFail.length > 0
//         },
//         canRecognizeWith: function(t) {
//             return !! this.simultaneous[t.id]
//         },
//         emit: function(t) {
//             function e(e) {
//                 i.manager.emit(i.options.event + (e ? W(n) : ""), t)
//             }
//             var i = this,
//             n = this.state;
//             if (oi > n) e(!0);
//             if (e(), n >= oi) e(!0)
//         },
//         tryEmit: function(t) {
//             if (this.canEmit()) return this.emit(t);
//             else return void(this.state = hi)
//         },
//         canEmit: function() {
//             for (var t = 0; t < this.requireFail.length;) {
//                 if (! (this.requireFail[t].state & (hi | ri))) return ! 1;
//                 t++
//             }
//             return ! 0
//         },
//         recognize: function(t) {
//             var e = o({},
//             t);
//             if (!c(this.options.enable, [this, e])) return this.reset(),
//             void(this.state = hi);
//             if (this.state & (ui | li | hi)) this.state = ri;
//             if (this.state = this.process(e), this.state & (si | ai | oi | li)) this.tryEmit(e)
//         },
//         process: function() {},
//         getTouchAction: function() {},
//         reset: function() {}
//     },
//     l(Q, U, {
//         defaults: {
//             pointers: 1
//         },
//         attrTest: function(t) {
//             var e = this.options.pointers;
//             return 0 === e || t.pointers.length === e
//         },
//         process: function(t) {
//             var e = this.state,
//             i = t.eventType,
//             n = e & (si | ai),
//             r = this.attrTest(t);
//             if (n && (i & ke || !r)) return e | li;
//             else if (n || r) {
//                 if (i & Se) return e | oi;
//                 else if (! (e & si)) return si;
//                 return e | ai
//             }
//             return hi
//         }
//     }),
//     l(Z, Q, {
//         defaults: {
//             event: "pan",
//             threshold: 10,
//             pointers: 1,
//             direction: Me
//         },
//         getTouchAction: function() {
//             var t = this.options.direction,
//             e = [];
//             if (t & Pe) e.push(ni);
//             if (t & Le) e.push(ii);
//             return e
//         },
//         directionTest: function(t) {
//             var e = this.options,
//             i = !0,
//             n = t.distance,
//             r = t.direction,
//             s = t.deltaX,
//             a = t.deltaY;
//             if (! (r & e.direction)) if (e.direction & Pe) r = 0 === s ? Ce: 0 > s ? De: Re,
//             i = s != this.pX,
//             n = Math.abs(t.deltaX);
//             else r = 0 === a ? Ce: 0 > a ? Oe: Ie,
//             i = a != this.pY,
//             n = Math.abs(t.deltaY);
//             return t.direction = r,
//             i && n > e.threshold && r & e.direction
//         },
//         attrTest: function(t) {
//             return Q.prototype.attrTest.call(this, t) && (this.state & si || !(this.state & si) && this.directionTest(t))
//         },
//         emit: function(t) {
//             this.pX = t.deltaX,
//             this.pY = t.deltaY;
//             var e = G(t.direction);
//             if (e) this.manager.emit(this.options.event + e, t);
//             this._super.emit.call(this, t)
//         }
//     }),
//     l(K, Q, {
//         defaults: {
//             event: "pinch",
//             threshold: 0,
//             pointers: 2
//         },
//         getTouchAction: function() {
//             return [ei]
//         },
//         attrTest: function(t) {
//             return this._super.attrTest.call(this, t) && (Math.abs(t.scale - 1) > this.options.threshold || this.state & si)
//         },
//         emit: function(t) {
//             if (this._super.emit.call(this, t), 1 !== t.scale) {
//                 var e = t.scale < 1 ? "in": "out";
//                 this.manager.emit(this.options.event + e, t)
//             }
//         }
//     }),
//     l(te, U, {
//         defaults: {
//             event: "press",
//             pointers: 1,
//             time: 500,
//             threshold: 5
//         },
//         getTouchAction: function() {
//             return [Ke]
//         },
//         process: function(t) {
//             var e = this.options,
//             i = t.pointers.length === e.pointers,
//             n = t.distance < e.threshold,
//             s = t.deltaTime > e.time;
//             if (this._input = t, !n || !i || t.eventType & (Se | ke) && !s) this.reset();
//             else if (t.eventType & _e) this.reset(),
//             this._timer = r(function() {
//                 this.state = ui,
//                 this.tryEmit()
//             },
//             e.time, this);
//             else if (t.eventType & Se) return ui;
//             return hi
//         },
//         reset: function() {
//             clearTimeout(this._timer)
//         },
//         emit: function(t) {
//             if (this.state === ui) if (t && t.eventType & Se) this.manager.emit(this.options.event + "up", t);
//             else this._input.timeStamp = de(),
//             this.manager.emit(this.options.event, this._input)
//         }
//     }),
//     l(ee, Q, {
//         defaults: {
//             event: "rotate",
//             threshold: 0,
//             pointers: 2
//         },
//         getTouchAction: function() {
//             return [ei]
//         },
//         attrTest: function(t) {
//             return this._super.attrTest.call(this, t) && (Math.abs(t.rotation) > this.options.threshold || this.state & si)
//         }
//     }),
//     l(ie, Q, {
//         defaults: {
//             event: "swipe",
//             threshold: 10,
//             velocity: .65,
//             direction: Pe | Le,
//             pointers: 1
//         },
//         getTouchAction: function() {
//             return Z.prototype.getTouchAction.call(this)
//         },
//         attrTest: function(t) {
//             var e, i = this.options.direction;
//             if (i & (Pe | Le)) e = t.velocity;
//             else if (i & Pe) e = t.velocityX;
//             else if (i & Le) e = t.velocityY;
//             return this._super.attrTest.call(this, t) && i & t.direction && t.distance > this.options.threshold && fe(e) > this.options.velocity && t.eventType & Se
//         },
//         emit: function(t) {
//             var e = G(t.direction);
//             if (e) this.manager.emit(this.options.event + e, t);
//             this.manager.emit(this.options.event, t)
//         }
//     }),
//     l(ne, U, {
//         defaults: {
//             event: "tap",
//             pointers: 1,
//             taps: 1,
//             interval: 300,
//             time: 250,
//             threshold: 2,
//             posThreshold: 10
//         },
//         getTouchAction: function() {
//             return [ti]
//         },
//         process: function(t) {
//             var e = this.options,
//             i = t.pointers.length === e.pointers,
//             n = t.distance < e.threshold,
//             s = t.deltaTime < e.time;
//             if (this.reset(), t.eventType & _e && 0 === this.count) return this.failTimeout();
//             if (n && s && i) {
//                 if (t.eventType != Se) return this.failTimeout();
//                 var a = this.pTime ? t.timeStamp - this.pTime < e.interval: !0,
//                 o = !this.pCenter || L(this.pCenter, t.center) < e.posThreshold;
//                 if (this.pTime = t.timeStamp, this.pCenter = t.center, !o || !a) this.count = 1;
//                 else this.count += 1;
//                 this._input = t;
//                 var u = this.count % e.taps;
//                 if (0 === u) if (!this.hasRequireFailures()) return ui;
//                 else return this._timer = r(function() {
//                     this.state = ui,
//                     this.tryEmit()
//                 },
//                 e.interval, this),
//                 si
//             }
//             return hi
//         },
//         failTimeout: function() {
//             return this._timer = r(function() {
//                 this.state = hi
//             },
//             this.options.interval, this),
//             hi
//         },
//         reset: function() {
//             clearTimeout(this._timer)
//         },
//         emit: function() {
//             if (this.state == ui) this._input.tapCount = this.count,
//             this.manager.emit(this.options.event, this._input)
//         }
//     }),
//     re.VERSION = "2.0.4",
//     re.defaults = {
//         domEvents: !1,
//         touchAction: Ze,
//         enable: !0,
//         inputTarget: null,
//         inputClass: null,
//         preset: [[ee, {
//             enable: !1
//         }], [K, {
//             enable: !1
//         },
//         ["rotate"]], [ie, {
//             direction: Pe
//         }], [Z, {
//             direction: Pe
//         },
//         ["swipe"]], [ne], [ne, {
//             event: "doubletap",
//             taps: 2
//         },
//         ["tap"]], [te]],
//         cssProps: {
//             userSelect: "none",
//             touchSelect: "none",
//             touchCallout: "none",
//             contentZooming: "none",
//             userDrag: "none",
//             tapHighlightColor: "rgba(0,0,0,0)"
//         }
//     };
//     var ci = 1,
//     fi = 2;
//     if (se.prototype = {
//         set: function(t) {
//             if (o(this.options, t), t.touchAction) this.touchAction.update();
//             if (t.inputTarget) this.input.destroy(),
//             this.input.target = t.inputTarget,
//             this.input.init();
//             return this
//         },
//         stop: function(t) {
//             this.session.stopped = t ? fi: ci
//         },
//         recognize: function(t) {
//             var e = this.session;
//             if (!e.stopped) {
//                 this.touchAction.preventDefaults(t);
//                 var i, n = this.recognizers,
//                 r = e.curRecognizer;
//                 if (!r || r && r.state & ui) r = e.curRecognizer = null;
//                 for (var s = 0; s < n.length;) {
//                     if (i = n[s], e.stopped !== fi && (!r || i == r || i.canRecognizeWith(r))) i.recognize(t);
//                     else i.reset();
//                     if (!r && i.state & (si | ai | oi)) r = e.curRecognizer = i;
//                     s++
//                 }
//             }
//         },
//         get: function(t) {
//             if (t instanceof U) return t;
//             for (var e = this.recognizers,
//             i = 0; i < e.length; i++) if (e[i].options.event == t) return e[i];
//             return null
//         },
//         add: function(t) {
//             if (s(t, "add", this)) return this;
//             var e = this.get(t.options.event);
//             if (e) this.remove(e);
//             return this.recognizers.push(t),
//             t.manager = this,
//             this.touchAction.update(),
//             t
//         },
//         remove: function(t) {
//             if (s(t, "remove", this)) return this;
//             var e = this.recognizers;
//             return t = this.get(t),
//             e.splice(y(e, t), 1),
//             this.touchAction.update(),
//             this
//         },
//         on: function(t, e) {
//             var i = this.handlers;
//             return a(v(t),
//             function(t) {
//                 i[t] = i[t] || [],
//                 i[t].push(e)
//             }),
//             this
//         },
//         off: function(t, e) {
//             var i = this.handlers;
//             return a(v(t),
//             function(t) {
//                 if (!e) delete i[t];
//                 else i[t].splice(y(i[t], e), 1)
//             }),
//             this
//         },
//         emit: function(t, e) {
//             if (this.options.domEvents) oe(t, e);
//             var i = this.handlers[t] && this.handlers[t].slice();
//             if (i && i.length) {
//                 e.type = t,
//                 e.preventDefault = function() {
//                     e.srcEvent.preventDefault()
//                 };
//                 for (var n = 0; n < i.length;) i[n](e),
//                 n++
//             }
//         },
//         destroy: function() {
//             this.element && ae(this, !1),
//             this.handlers = {},
//             this.session = {},
//             this.input.destroy(),
//             this.element = null
//         }
//     },
//     o(re, {
//         INPUT_START: _e,
//         INPUT_MOVE: Ae,
//         INPUT_END: Se,
//         INPUT_CANCEL: ke,
//         STATE_POSSIBLE: ri,
//         STATE_BEGAN: si,
//         STATE_CHANGED: ai,
//         STATE_ENDED: oi,
//         STATE_RECOGNIZED: ui,
//         STATE_CANCELLED: li,
//         STATE_FAILED: hi,
//         DIRECTION_NONE: Ce,
//         DIRECTION_LEFT: De,
//         DIRECTION_RIGHT: Re,
//         DIRECTION_UP: Oe,
//         DIRECTION_DOWN: Ie,
//         DIRECTION_HORIZONTAL: Pe,
//         DIRECTION_VERTICAL: Le,
//         DIRECTION_ALL: Me,
//         Manager: se,
//         Input: _,
//         TouchAction: V,
//         TouchInput: $,
//         MouseInput: j,
//         PointerEventInput: H,
//         TouchMouseInput: X,
//         SingleTouchInput: z,
//         Recognizer: U,
//         AttrRecognizer: Q,
//         Tap: ne,
//         Pan: Z,
//         Swipe: ie,
//         Pinch: K,
//         Rotate: ee,
//         Press: te,
//         on: d,
//         off: p,
//         each: a,
//         merge: u,
//         extend: o,
//         inherit: l,
//         bindFn: h,
//         prefixed: E
//     }), typeof define == he && define.amd) define("hammer/hammer", [],
//     function() {
//         return re
//     });
//     else if ("undefined" != typeof module && module.exports) module.exports = re;
//     else t[i] = re
// } (window, document, "Hammer"),

define("hammer", [],
function(t) {
    return t
}),

define("saber-widget/base/event", ["require", "saber-emitter"],
function(require) {
    var t = require("saber-emitter"),
    exports = {};
    return t.mixin(exports),
    exports.emit = function(e) {
        var i = {
            type: e,
            target: this
        },
        n = [i].concat(Array.prototype.slice.call(arguments, 1)),
        r = this["on" + e];
        if ("function" == typeof r) r.apply(this, n);
        t.prototype.emit.apply(this, [e].concat(n))
    },
    exports
}),

define("saber-widget/base/state", ["require"],
function() {
    var exports = {};
    return exports.is = function(t) {
        return !! this.states[t]
    },
    exports.addState = function(t) {
        this.states[t] = !0
    },
    exports.removeState = function(t) {
        delete this.states[t]
    },
    exports.toggleState = function(t, e) {
        e = "boolean" == typeof e ? e: !this.is(t),
        this[e ? "addState": "removeState"](t)
    },
    exports
}),

define("saber-widget/base/attribute", ["require", "saber-lang/extend", "saber-lang/type"],
function(require) {
    function t(t, e) {
        if (t === e) return ! 0;
        var n = i.type(t),
        r = i.type(e);
        if (n !== r) return ! 1;
        var s = {
            string: String,
            number: Number,
            "boolean": Boolean
        };
        for (var a in s) if (a === n) return t === s[a](e);
        if ("array" === n) {
            var o = [t.toString(), e.toString()];
            return ! /\[object\s/.test(o[0]) && !/\[object\s/.test(o[1]) && o[0] === o[1]
        }
        if ("date" === n) return + t === +e;
        if ("regexp" === n) return n.source === r.source && n.global === r.global && n.ignoreCase === r.ignoreCase && n.multiline === r.multiline;
        if (i.isEmpty(t) && i.isEmpty(e)) return ! 0;
        if ("object" != typeof t || "object" != typeof e) return ! 1;
        if (i.isPlainObject(t) && i.isPlainObject(e)) {
            if (Object.keys(t).toString() !== Object.keys(e).toString()) return ! 1;
            for (var u in t) if (t[u] !== e[u]) return ! 1;
            return ! 0
        }
        return ! 1
    }
    var e = require("saber-lang/extend"),
    i = require("saber-lang/type"),
    exports = {};
    return exports.get = function(t) {
        var e = this.attrs[t] || {};
        return e.getter ? e.getter.call(this, e.value, t) : e.value
    },
    exports.set = function(n, r, s) {
        var a = this.attrs,
        o = {};
        if ("string" == typeof n) o[n] = r;
        else if ("object" == typeof n) o = n,
        s = r;
        s = s || {};
        var u = this.is("init"),
        l = {};
        for (var h in o) if (o.hasOwnProperty(h)) {
            var c = o[h],
            f = a[h] || (a[h] = {});
            if (f.readOnly || f.readonly) throw new Error("attribute is readOnly: " + h);
            if (f.setter) f.setter.call(this, c, h);
            var d = f.value;
            if (!s.override && i.isPlainObject(d) && i.isPlainObject(c)) c = e({},
            d, c);
            if (a[h].value = c, !t(c, d)) {
                if (!s.silent && u) this.emit("propertychange", h, d, c);
                if (a[h].repaint) l[h] = [d, c]
            } else;
        } else;
        if (this.is("render") && Object.keys(l).length > 0) this.repaint(l)
    },
    exports
}),

define("saber-widget/base/dom", ["require", "saber-lang/bind", "saber-lang/function/debounce", "../main"],
function(require) {
    function t(t, e, i) {
        var n = t.domEvents[e[a]][i.type];
        if (n) n.forEach(function(t) {
            t.call(this, i)
        },
        t)
    }
    function e(e, n) {
        var r = i(e);
        r = r ? r[n.type] : [],
        r.forEach(function(i) {
            t(i, e, n)
        })
    }
    function i(t) {
        if (window === t) return o.win;
        if (document === t) return o.doc;
        if (document.documentElement === t) return o.root;
        if (document.body === t) return o.body;
        else return null
    }
    var n = require("saber-lang/bind"),
    r = require("saber-lang/function/debounce"),
    s = require("../main"),
    a = "_uiDOMEvent",
    o = {
        win: {},
        doc: {},
        root: {},
        body: {}
    },
    exports = {};
    return exports.addEvent = function(o, u, l) {
        if (!this.domEvents) this.domEvents = {};
        var h = o[a];
        if (!h) h = o[a] = s.getGUID();
        var c = this.domEvents[h];
        if (!c) c = this.domEvents[h] = {
            node: o
        };
        var f = i(o);
        if (f) {
            var d = f[u];
            if (!d) {
                if (d = f[u] = [], d.handler = n(e, null, o), "resize" === u || "scroll" === u) d.handler = r(d.handler, 150);
                o.addEventListener(u, d.handler, !1)
            }
            if (d.indexOf(this) < 0) d.push(this)
        }
        var p = c[u];
        if (!p) if (p = c[u] = [], !f) p.handler = n(t, null, this, o),
        o.addEventListener(u, p.handler, !1);
        if (p.indexOf(l) < 0) p.push(l)
    },
    exports.removeEvent = function(t, e, n) {
        var r = this.domEvents;
        if (r) if (r = r[t[a]], r && r[e]) {
            var s, o = r[e];
            if (n) {
                if (s = o.indexOf(n), s >= 0) o.splice(s, 1)
            } else o.length = 0;
            var u = i(t);
            if (!o.length) {
                if (o.handler) t.removeEventListener(e, o.handler, !1);
                if (o.length = 0, delete r[e], "node" === Object.keys(r).join("")) r = null,
                delete this.domEvents[t[a]];
                if (u && u[e]) if (s = u[e].indexOf(this), s >= 0) u[e].splice(s, 1)
            }
            if (u) if (o = u[e], o && !o.length) t.removeEventListener(e, o.handler, !1),
            o.length = 0,
            delete u[e];
            o = null
        }
    },
    exports.clearEvents = function(t) {
        var e = this.domEvents;
        if (e) {
            var i;
            if (!t) {
                for (i in e) if (e.hasOwnProperty(i)) this.clearEvents(e[i].node);
                return void(this.domEvents = null)
            }
            if (i = t[a], e = e[i]) {
                delete e.node;
                for (var n in e) if (e.hasOwnProperty(n)) this.removeEvent(t, n)
            }
            if (i) delete this.domEvents[i]
        }
    },
    exports
}),

define("saber-widget/Widget", ["require", "saber-lang/extend", "./main", "saber-dom", "./base/event", "./base/state", "./base/attribute", "./base/dom"],
function(require) {
    function t(t) {
        var i, n;
        for (i in t) if (t.hasOwnProperty(i)) {
            if (n = t[i], /^on[A-Z]/.test(i) && e(n)) this.on(i.charAt(2).toLowerCase() + i.slice(3), n),
            delete t[i];
            else if (e(this[i]) && e(n)) this[i] = n,
            delete t[i]
        } else;
        return t
    }
    function e(t) {
        return "function" == typeof t
    }
    var i = require("saber-lang/extend"),
    n = require("./main"),
    r = function(t) {
        t = t || {},
        this.attrs = i({},
        this.attrs || {},
        {
            type: {
                readOnly: !0,
                value: this.type
            },
            id: {
                readOnly: !0,
                getter: function() {
                    return this.id
                }
            },
            main: {
                readOnly: !0,
                getter: function() {
                    return this.main
                }
            }
        }),
        this.states = i({
            disable: !0
        },
        this.states),
        this.runtime = {},
        this.id = t.id || n.getGUID(),
        this.main = require("saber-dom").query(t.main),
        delete t.id,
        delete t.main,
        this.initOptions(t),
        n.add(this),
        this.addState("init"),
        this.emit("init")
    };
    return r.prototype = {
        constructor: r,
        type: "Widget",
        initOptions: function(e) {
            e = t.call(this, e),
            this.options = i({},
            e),
            this.set(this.options)
        },
        initDom: function() {},
        initEvent: function() {},
        render: function() {
            var t = this.is("render");
            if (!t) this.emit("beforerender"),
            this.initDom(),
            this.initEvent(),
            this.get("main").setAttribute(n.getConfig("instanceAttr"), this.get("id")),
            this.addState("render");
            if (this.repaint(), !t) this.emit("afterrender");
            return this
        },
        repaint: function() {},
        dispose: function() {
            if (!this.is("dispose")) this.emit("beforedispose"),
            this.disable(),
            this.runtime = null,
            this.clearEvents(),
            n.remove(this),
            n.disposePlugin(this),
            this.emit("afterdispose"),
            this.off(),
            this.addState("dispose"),
            this.main.removeAttribute(n.getConfig("instanceAttr")),
            this.main = null
        },
        enable: function() {
            if (this.is("disable")) this.removeState("disable"),
            this.emit("enable");
            return this
        },
        disable: function() {
            if (!this.is("disable")) this.addState("disable"),
            this.emit("disable");
            return this
        },
        plugin: function(t) {
            return (this.plugins || {})[t]
        },
        enablePlugin: function(t, e) {
            return n.enablePlugin(this, t, (this.options.plugin || {})[e || t.toLowerCase()]),
            this
        },
        disablePlugin: function(t) {
            return n.disablePlugin(this, t),
            this
        }
    },
    i(r.prototype, require("./base/event"), require("./base/state"), require("./base/attribute"), require("./base/dom")),
    r
}),

define("saber-widget/Slider", ["require", "exports", "module", "saber-lang", "saber-dom", "hammer", "./Widget", "./main"],
function(require) {
    function t() {
        this.attrs = {
            animate: {
                value: !0
            },
            auto: {
                value: !0,
                repaint: !0
            },
            interval: {
                value: 4e3
            },
            flex: {
                value: !1,
                repaint: !0
            },
            index: {
                value: 0
            },
            speed: {
                value: 300
            },
            switchAt: {
                value: .5
            },
            length: {
                readOnly: !0,
                getter: function() {
                    return this.runtime.length || 0
                }
            }
        },
        this.states = {
            stop: !0
        },
        s.apply(this, arguments)
    }
    function e(t, e, i) {
        if (e = e || "width", arguments.length > 2) return n.setStyle(t, e, (parseInt(i, 10) || 0) + "px");
        else return parseInt(n.getStyle(t, e), 10) || 0
    }
    var i = require("saber-lang"),
    n = require("saber-dom"),
    r = require("hammer"),
    s = require("./Widget");
    return t.prototype = {
        type: "Slider",
        initDom: function() {
            var t = this.get("main"),
            e = n.query("[data-role=wrapper]", t) || n.children(t)[0];
            if (e) n.setData(e, "role", "wrapper"),
            n.children(e).forEach(function(t) {
                n.setData(t, "role", "item")
            });
            this.runtime.wrapper = e
        },
        initEvent: function() {
            var t = "panstart panleft panright panend",
            e = this.runtime;
            e.hammer = new r(e.wrapper, {
                dragLockToAxis: !0
            }).on(t, e.handler = i.bind(this._handleHammer, this)),
            this.on("beforedispose",
            function() {
                e.hammer.off(t, e.handler)
            })
        },
        repaint: function(t) {
            if (s.prototype.repaint.call(this, t), !t) return void this._resize(!0).enable();
            if (t.hasOwnProperty("auto")) this[t.auto[1] ? "start": "stop"](!0);
            if (t.hasOwnProperty("flex")) this[t.flex[1] ? "enablePlugin": "disablePlugin"]("SliderFlex", "flex")
        },
        enable: function() {
            if (this.is("disable") && this.is("render")) {
                this.start();
                var t = this.runtime.hammer;
                if (t) t.set({
                    enable: !0
                });
                if (this.get("flex")) this.enablePlugin("SliderFlex", "flex")
            }
            return s.prototype.enable.call(this),
            this
        },
        disable: function() {
            if (!this.is("disable") && this.is("render")) {
                this.stop();
                var t = this.runtime.hammer;
                if (t) t.set({
                    enable: !1
                });
                if (this.get("flex")) this.disablePlugin("SliderFlex")
            }
            return s.prototype.disable.call(this),
            this
        },
        _handleHammer: function(t) {
            var e = t.type;
            if ("panstart" !== e) t.preventDefault();
            var i = this.runtime,
            n = i.width,
            s = this.get("index"),
            a = this.get("length");
            switch (e) {
            case "panstart":
                if (i.needResume = !this.is("pause") && !this.is("stop"), i.needResume) this.pause();
                break;
            case "panright":
            case "panleft":
                var o = this._percent(s),
                u = 100 / n * t.deltaX / a;
                if (0 === s && t.direction === r.DIRECTION_RIGHT || s === a - 1 && t.direction === r.DIRECTION_LEFT) u *= .4;
                this._move(u + o);
                break;
            case "panend":
                if (Math.abs(t.deltaX) > n * this.get("switchAt")) this[t.direction === r.DIRECTION_RIGHT ? "prev": "next"]();
                else this.to(s);
                if (i.needResume) this.resume()
            }
        },
        _percent: function(t) {
            var e = this.get("length");
            return t = Math.max(0, Math.min(e - 1, t)),
            -(100 / e) * t
        },
        _resize: function(t) {
            var i = this.runtime,
            r = i.width,
            s = e(this.get("main"));
            if (!t && s === r) return this;
            i.width = s;
            for (var a = n.children(i.wrapper), o = i.length = a.length, u = 0; o > u; u++) e(a[u], "width", s);
            return e(i.wrapper, "width", s * o),
            this.emit("resize", r, s),
            this
        },
        _loop: function(t) {
            var e = this.runtime,
            n = this.get("interval");
            if (e.timer = clearTimeout(e.timer), !(t || !n || 0 > n)) if (this.get("length") < 2) return void this.to(0).pause();
            else return void(e.timer = setTimeout(i.bind(function() {
                var t = this.get("index") + 1;
                this.to(t < this.get("length") ? t: 0),
                this._loop()
            },
            this), n))
        },
        _move: function(t, e) {
            var i = this.runtime.wrapper;
            if (this.get("animate")) n.setStyle(i, "transition", "all " + (e || 0) + "ms");
            return n.setStyle(i, "transform", "translate3d(" + t + "%, 0, 0) scale3d(1, 1, 1)"),
            this
        },
        sync: function() {
            if (this.is("render")) this.pause()._resize(!0)._move(this._percent(this.get("index"))).resume();
            return this
        },
        start: function(t) {
            if (this.is("stop") && (t || this.get("auto"))) this.removeState("stop"),
            this._loop();
            return this
        },
        stop: function(t) {
            if (!this.is("stop") && (t || this.get("auto"))) this.addState("stop"),
            this._loop(!0);
            return this
        },
        pause: function() {
            if (!this.is("pause") && !this.is("stop")) this.addState("pause"),
            this._loop(!0);
            return this
        },
        resume: function() {
            if (this.is("pause")) this.removeState("pause"),
            this._loop();
            return this
        },
        to: function(t) {
            if (this.is("disable")) return this;
            var e = this.get("index");
            if (t = Math.max(0, Math.min(t, this.get("length") - 1)), this._move(this._percent(t), this.get("speed")), e !== t) this.set("index", t),
            this.emit("change", e, t);
            return this
        },
        prev: function() {
            return this.to(this.get("index") - 1)
        },
        next: function() {
            return this.to(this.get("index") + 1)
        }
    },
    i.inherits(t, s),
    require("./main").register(t),
    t
}),

// define("saber-widget/LazyLoad", ["require", "saber-lang", "saber-dom", "./Widget", "saber-lang/function/debounce", "./main"],
// function(require) {
//     function t() {
//         this.attrs = {
//             attribute: {
//                 value: "data-original"
//             },
//             events: {
//                 value: "scroll touchmove resize orientationchange"
//             },
//             animate: {
//                 value: !1
//             },
//             range: {
//                 value: 100
//             },
//             placeholder: {
//                 value: ["data:image/png;base64,", "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8", "YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"].join("")
//             }
//         },
//         this.states = {
//             complete: !1
//         },
//         s.apply(this, arguments)
//     }
//     function e(t, e, n) {
//         n = n || 0;
//         var s, a;
//         if (e) s = r.position(t, e),
//         a = e.getBoundingClientRect();
//         else s = t.getBoundingClientRect(),
//         a = i();
//         return s.top > 0 ? s.top - n < a.height: s.top + n > 0 && s.left > 0 ? s.left - n < a.width: s.left + n > 0
//     }
//     function i() {
//         var t = window,
//         e = document,
//         i = "BackCompat" === e.compatMode ? e.body: e.documentElement;
//         return {
//             top: 0,
//             left: 0,
//             width: t.innerWidth || i.clientWidth,
//             height: t.innerHeight || i.clientHeight
//         }
//     }
//     var n = require("saber-lang"),
//     r = require("saber-dom"),
//     s = require("./Widget"),
//     a = require("saber-lang/function/debounce");
//     return t.prototype = {
//         type: "LazyLoad",
//         initDom: function() {
//             if (this.container = this.get("main"), this.main = this.get("main") || document.body, this.elements = this._filterElements(), this.get("placeholder")) this.elements.forEach(function(t) {
//                 t.src = this.get("placeholder")
//             },
//             this)
//         },
//         initEvent: function() {
//             var t = this;
//             this.get("events").split(" ").forEach(function(e) {
//                 t.addEvent(t.container || window, e, t._update)
//             }),
//             this._update()
//         },
//         _filterElements: function() {
//             return r.queryAll("[" + this.get("attribute") + "]", this.main)
//         },
//         refresh: function() {
//             this.elements = this._filterElements(),
//             this.removeState("complete")
//         },
//         _loadElement: function(t) {
//             if (this.get("animate")) r.setStyle(t, "opacity", 0),
//             r.setStyle(t, "transition", "opacity .5s linear 0s"),
//             this.addEvent(t, "load",
//             function() {
//                 r.setStyle(t, "opacity", 1)
//             });
//             var e = t.getAttribute(this.get("attribute"));
//             if ("IMG" === t.tagName.toUpperCase()) t.src = e;
//             else r.setStyle(t, "background-image", "url(" + e + ")");
//             this.emit("load", t)
//         },
//         _update: a(function() {
//             var t = this;
//             if (this.elements = this.elements.filter(function(i) {
//                 if (i) if (!i.parentNode) return ! 1;
//                 else if (e(i, t.container, t.get("range"))) return t._loadElement(i),
//                 !1;
//                 return ! 0
//             }), this.emit("change"), !this.is("complete") && !this.elements.length) this.addState("complete"),
//             this.emit("complete")
//         },
//         200)
//     },
//     t.isElementInViewport = e,
//     n.inherits(t, s),
//     require("./main").register(t),
//     t
// }),

// define("saber-widget/ImageView", ["require", "saber-lang", "saber-dom", "hammer", "./Widget", "./main"],
// function(require) {
//     function t() {
//         this.attrs = {
//             animate: {
//                 value: !0
//             },
//             speed: {
//                 value: 200
//             },
//             zoomScale: {
//                 value: .88
//             },
//             switchAt: {
//                 value: .5
//             },
//             datasource: {
//                 value: [],
//                 repaint: !0
//             },
//             index: {
//                 value: 0
//             },
//             toolbar: {
//                 value: !0,
//                 repaint: !0
//             },
//             flex: {
//                 value: !1,
//                 repaint: !0
//             },
//             full: {
//                 value: !1,
//                 setter: function(t) {
//                     this.toggleState("full", t),
//                     r.toggleClass(this.main, "full", t)
//                 }
//             },
//             length: {
//                 readOnly: !0,
//                 getter: function() {
//                     return this.get("datasource").length
//                 }
//             }
//         },
//         a.apply(this, arguments)
//     }
//     function e(t, e, n) {
//         var r = t.naturalWidth || t.width,
//         s = t.naturalHeight || t.height,
//         a = e.width,
//         o = e.height;
//         if (r > a) s *= a / r,
//         r = a;
//         if (s > o) r *= o / s,
//         s = o;
//         if (r *= n, s *= n, i(t, "width", r), i(t, "height", s), o > s) i(t, "margin-top", Math.round(Math.max((o - s) / 2, 0)))
//     }
//     function i(t, e, i) {
//         if (e = e || "width", arguments.length > 2) return r.setStyle(t, e, (parseInt(i, 10) || 0) + "px");
//         else return parseInt(r.getStyle(t, e), 10) || 0
//     }
//     var n = require("saber-lang"),
//     r = require("saber-dom"),
//     s = require("hammer"),
//     a = require("./Widget");
//     return t.prototype = {
//         type: "ImageView",
//         initDom: function() {
//             var t = this.runtime;
//             if (t.viewport = {
//                 width: window.innerWidth,
//                 height: window.innerHeight
//             },
//             this.main) t.setup = this.main,
//             this.set("datasource", r.queryAll("[data-role=image]", this.main).map(function(t, e) {
//                 return r.setData(t, "imageview", e),
//                 r.getData(t, "src") || t.getAttribute("src")
//             }));
//             var e = this.main = document.createElement("div");
//             if (e.className = "ui-imageview", r.hide(e), this.is("full")) r.addClass(e, "full");
//             var i = t.toolbar = document.createElement("div");
//             r.setData(i, "role", "toolbar"),
//             i.innerHTML = this.makeToolbar(),
//             e.appendChild(i);
//             var n = t.wrapper = document.createElement("div");
//             r.setData(n, "role", "wrapper"),
//             e.appendChild(n),
//             this.get("datasource").forEach(this._append, this),
//             document.body.appendChild(e)
//         },
//         initEvent: function() {
//             var t = this.runtime;
//             t.scale = 1,
//             t.hammer = new s(t.wrapper, {
//                 dragLockToAxis: !0
//             });
//             var e = "swipeleft swiperight panmove panend pinchin pinchout tap doubletap";
//             if (t.hammer.add(new s.Pinch), t.hammer.on(e, t.handler = n.bind(this._handleHammer, this)), this.on("beforedispose",
//             function() {
//                 t.hammer.off(e, t.handler)
//             }), t.setup) this.addEvent(t.setup, "click",
//             function(t) {
//                 if (r.matches(t.target, "[data-imageview]")) {
//                     var e = r.getData(t.target, "imageview");
//                     if (e) this.enable().to(0 | e)
//                 }
//             });
//             if (this.get("toolbar")) this.addEvent(t.toolbar, "click",
//             function(t) {
//                 if (t.preventDefault(), r.matches(t.target, "[data-role=close]")) this.disable()
//             }),
//             this.on("change",
//             function() {
//                 this.runtime.toolbar.innerHTML = this.makeToolbar()
//             })
//         },
//         repaint: function(t) {
//             if (a.prototype.repaint.call(this, t), !t) return void this._resize(!0).to(this.get("index"), !0);
//             if (t.hasOwnProperty("datasource")) {
//                 var e = !this.is("disable");
//                 if (e) this.disable();
//                 if (this.runtime.wrapper.innerHTML = "", t.datasource[1].forEach(this._append, this), e) this.enable().to(0)
//             }
//             if (t.hasOwnProperty("flex")) this[t.flex[1] ? "enablePlugin": "disablePlugin"]("ImageViewFlex", "flex")
//         },
//         enable: function() {
//             if (this.is("render")) {
//                 if (this.enablePlugin("Masker").enablePlugin("Zoom"), this.get("flex")) this.enablePlugin("ImageViewFlex", "flex");
//                 r.show(this.main)
//             }
//             return a.prototype.enable.call(this),
//             this
//         },
//         disable: function() {
//             if (this.is("render")) {
//                 if (this.disablePlugin("Masker").disablePlugin("Zoom"), this.get("flex")) this.disablePlugin("ImageViewFlex");
//                 r.hide(this.main)
//             }
//             return a.prototype.disable.call(this),
//             this
//         },
//         _handleHammer: function(t) {
//             t.preventDefault();
//             var e = this.is("zoom"),
//             i = this.runtime,
//             n = i.viewport.width,
//             r = this.get("index");
//             switch (t.type) {
//             case "panmove":
//                 var a = t.direction;
//                 if (e) this._drag(t.deltaX, t.deltaY);
//                 else if (s.DIRECTION_LEFT === a || s.DIRECTION_RIGHT === a) {
//                     var o = this.get("length"),
//                     u = 100 / n * t.deltaX / o;
//                     if (0 === r && "right" === a || r === o - 1 && "left" === a) u *= .4;
//                     this._move(this._percent(r) + u)
//                 }
//                 break;
//             case "tap":
//                 this.set("full", !this.is("full"));
//                 break;
//             case "doubletap":
//                 t.preventDefault(),
//                 this[e ? "reset": "zoom"]();
//                 break;
//             case "pinchin":
//                 this.zoom(i.scale - .2 * t.scale),
//                 t.stopPropagation();
//                 break;
//             case "pinchout":
//                 this.zoom(i.scale + .2 * t.scale),
//                 t.stopPropagation();
//                 break;
//             case "panend":
//                 if (e) if (t.pointers.length > 1) t.stopDetect();
//                 else i.dragX += t.deltaX,
//                 i.dragY += t.deltaY;
//                 else if (Math.abs(t.deltaX) > n * this.get("switchAt")) this[t.direction === s.DIRECTION_RIGHT ? "prev": "next"]();
//                 else this.to(r)
//             }
//         },
//         _percent: function(t) {
//             var e = this.get("length");
//             return t = Math.max(0, Math.min(e - 1, t)),
//             -(100 / e) * t
//         },
//         _resize: function(t) {
//             var n = this.runtime,
//             s = n.viewport,
//             a = {
//                 width: window.innerWidth,
//                 height: window.innerHeight
//             };
//             if (!t && a.width === s.width && a.height === s.height) return this;
//             n.viewport = a;
//             var o = this.get("zoomScale");
//             return r.children(n.wrapper).forEach(function(t) {
//                 i(t, "width", a.width);
//                 var n = r.query("img", t);
//                 if (n) e(n, a, o)
//             }),
//             i(n.wrapper, "width", a.width * this.get("length")),
//             this.emit("resize", s, a),
//             this
//         },
//         _append: function() {
//             var t = document.createElement("div");
//             r.setData(t, "role", "item"),
//             this.runtime.wrapper.appendChild(t)
//         },
//         _load: function(t) {
//             var i = r.queryAll("[data-role=item]", this.runtime.wrapper)[t];
//             if (i) if (!r.query("img", i)) {
//                 var n = this;
//                 n.emit("beforeload", t);
//                 var s = document.createElement("img");
//                 r.hide(s),
//                 s.src = n.get("datasource")[t],
//                 s.onload = function() {
//                     this.onload = null,
//                     e(this, n.runtime.viewport, n.get("zoomScale")),
//                     r.show(this),
//                     n.emit("afterload", t)
//                 },
//                 i.appendChild(s)
//             }
//         },
//         _move: function(t, e) {
//             var i = this.runtime.wrapper;
//             if (this.get("animate")) r.setStyle(i, "transition", "all " + (e || 0) + "ms");
//             return r.setStyle(i, "transform", "translate3d(" + t + "%, 0, 0) scale3d(1, 1, 1)"),
//             this
//         },
//         _drag: function(t, e, i) {
//             var n = this.runtime,
//             s = n.scale,
//             a = this._image(this.get("index"));
//             if (i = i || 0, t = n.dragX + t, e = n.dragY + e, this.get("animate")) r.setStyle(a, "transition", "all " + i + "ms");
//             r.setStyle(a, "transform", "translate3d(" + t + "px, " + e + "px, 0) scale3d(" + s + ", " + s + ", 1)")
//         },
//         _image: function(t) {
//             return r.query("[data-role=item]:nth-child(" + (t + 1) + ") img", this.runtime.wrapper)
//         },
//         setup: function(t) {
//             if (t && t !== this.runtime.setup) this.runtime.setup = t,
//             this.set("datasource", r.queryAll("[data-role=image]", t).map(function(t, e) {
//                 return r.setData(t, "imageview", e),
//                 r.getData(t, "src") || t.getAttribute("src")
//             })),
//             this._resize(!0)
//         },
//         makeToolbar: function() {
//             return ['<span data-role="close">\u5173\u95ed</span>', "<h1>" + (this.get("index") + 1) + " of " + this.get("length") + "</h1>"].join("")
//         },
//         to: function(t, e) {
//             if (!e && this.is("disable")) return this;
//             if ("number" != typeof t) {
//                 if (t = r.getData(t, "imageview"), !t) return this;
//                 t = 0 | t
//             }
//             if (this.is("zoom")) this.reset();
//             var i = this.get("index");
//             if (t = Math.max(0, Math.min(t, this.get("length") - 1)), this._move(this._percent(t), this.get("speed")), i !== t) this.set("index", t),
//             this.emit("change", i, t);
//             return this._load(t),
//             this
//         },
//         prev: function() {
//             return this.to(this.get("index") - 1)
//         },
//         next: function() {
//             return this.to(this.get("index") + 1)
//         },
//         zoom: function(t) {
//             if (!t && this.is("zoom")) return this;
//             if (t && (.7 > t || t > 3)) return this;
//             this.addState("zoom");
//             var e = this.runtime;
//             e.scale = t || 2,
//             e.dragX = e.dragX || 0,
//             e.dragY = e.dragY || 0,
//             this._drag(0, 0, this.get("speed")),
//             this.emit("zoom", e.scale)
//         },
//         reset: function() {
//             if (!this.is("zoom")) return this;
//             this.removeState("zoom");
//             var t = this.runtime;
//             t.scale = 1,
//             t.dragX = 0,
//             t.dragY = 0,
//             this._drag(0, 0, this.get("speed")),
//             this.emit("reset")
//         }
//     },
//     n.inherits(t, a),
//     require("./main").register(t),
//     t
// }),

// define("lang/cn", [], {
//     visit: "\u4eba\u6c14",
//     original: "\u539f\u521b",
//     play: "\u5f00\u59cb",
//     download: "\u4e0b\u8f7d",
//     server_error: "\u670d\u52a1\u5668\u5fd9, \u8bf7\u7a0d\u540e\u91cd\u8bd5",
//     please_login: "\u60a8\u8fd8\u6ca1\u6709\u767b\u5f55, \u8bf7\u767b\u5f55\u540e\u64cd\u4f5c",
//     favorited: "\u5df2\u6536\u85cf",
//     in_claim: "\u5df2\u63d0\u4ea4\u8ba4\u9886\u7533\u8bf7",
//     input_claim_name: "\u8bf7\u586b\u5199\u4f5c\u8005\u540d\u6216\u54c1\u724c\u540d",
//     input_mobile: "\u8bf7\u586b\u5199\u624b\u673a\u53f7",
//     input_email: "\u8bf7\u586b\u5199\u90ae\u7bb1",
//     add2desktop: '\u5148\u70b9\u51fb<i class="icon-share"></i>,<br/>\u518d\u70b9\u51fb"\u6dfb\u52a0\u5230\u4e3b\u5c4f\u5e55"',
//     click_fav_rt: "\u70b9\u51fb\u53f3\u4e0a\u89d2\u6536\u85cf",
//     find_anytime: "\u4ee5\u540e\u53ef\u968f\u65f6\u627e\u5230\u6211\u4eec\u54e6~",
//     install_app: "\u5b89\u88c5\u706b\u821e\u5ba2\u6237\u7aef, \u7cbe\u5f69\u65e0\u6781\u9650",
//     android_ori: "\u5b89\u5353\u6b63\u5f0f\u7248",
//     coming_soon: "\u656c\u8bf7\u671f\u5f85",
//     i_see: "\u6211\u77e5\u9053\u4e86"
// }),

// define("lang/en", [], {
//     server_error: "server is busy, please try again later",
//     favorited: "favorited",
//     in_claim: "claim is pending",
//     claim_name_empty: "please input author name or brand name",
//     mobile_empty: "please input phone number",
//     email_empty: "please input email",
//     add2desktop: 'click <i class="icon-share"></i>, then<br/>"Add to Home Screen"',
//     click_fav_rt: "click favorit button in the top right corner",
//     find_anytime: "may at any time to find our future",
//     install_app: "install hoowu App, without limit",
//     android_ori: "android",
//     coming_soon: "coming soon",
//     i_see: "i see"
// }),

// define("lang/jp", [], {}),

// define("lang/main", ["require", "saber-lang/type", "saber-string/format", "./cn", "./en", "./jp"],
// function(require) {
//     var t = require("saber-lang/type").type,
//     e = require("saber-string/format"),
//     i = {
//         cn: require("./cn"),
//         en: require("./en"),
//         jp: require("./jp")
//     },
//     n = "cn",
//     exports = {};
//     return exports.languages = Object.keys(i),
//     exports.getLang = function() {
//         return n
//     },
//     exports.use = function(t) {
//         if (t && i[t = t.toLowerCase()]) n = t
//     },
//     exports.get = function(r, s) {
//         if (!r) return "";
//         if ("array" === t(s)) return e(i[n][r], s);
//         else return i[n][r] || s || r || ""
//     },
//     exports.set = function(e, r, s) {
//         if ("string" === t(r) && r) if (!i[n].hasOwnProperty(e) || !0 === s) i[n][e] = r
//     },
//     exports
// }),

// define("const", ["require"],
// function() {
//     var exports = {};
//     exports.env = document.querySelector("html").getAttribute("data-env", 1) || "",
//     exports.server = exports.env ? exports.env + ".": "";
//     var t = "51h5.com",
//     e = "wanh5.com";
//     return exports.HOST_ROOT = exports.server + "www." + t,
//     exports.HOST_PASSPORT = exports.server + "passport." + t,
//     exports.HOST_STATIC = exports.server + "static." + e,
//     exports.HOST_GAME = exports.server + "g." + e,
//     exports.URL_LOGO = "http://" + exports.HOST_STATIC + "/images/home/logo.png",
//     exports
// }),

// define("common/pv", ["require"],
// function() {
//     function t(t) {
//         i([n + "trackPageview", t])
//     }
//     function e(t) {
//         var e = [n + "trackEvent", t].concat(Array.prototype.slice.call(arguments, 1).map(function(e) {
//             return t + n + e
//         }));
//         i(e)
//     }
//     function i(t) { ["hmt", "czc"].forEach(function(e) {
//             var i = window[n + e];
//             if (i) i.push(t)
//         })
//     }
//     var n = "_",
//     r = {};
//     return r.add = function(e) {
//         t(e)
//     },
//     r.track = function() {
//         e.apply(null, arguments)
//     },
//     r
// }),

// function(t) {
//     function e(t, e) {
//         for (var i in e) if (e.hasOwnProperty(i)) t[i] = e[i];
//         return t
//     }
//     function i() {
//         this.raw = [],
//         this.length = 0
//     }
//     function n() {
//         return "___" + D++
//     }
//     function r(t, e) {
//         var i = new Function;
//         i.prototype = e.prototype,
//         t.prototype = new i,
//         t.prototype.constructor = t
//     }
//     function s(t) {
//         return R[t]
//     }
//     function a(t) {
//         return '"' + t.replace(/\x5C/g, "\\\\").replace(/"/g, '\\"').replace(/\x0A/g, "\\n").replace(/\x09/g, "\\t").replace(/\x0D/g, "\\r") + '"'
//     }
//     function o(t) {
//         return t.replace(/[\^\[\]\$\(\)\{\}\?\*\.\+]/g,
//         function(t) {
//             return "\\" + t
//         })
//     }
//     function u(t) {
//         var e = arguments;
//         return t.replace(/\{([0-9]+)\}/g,
//         function(t, i) {
//             return e[i - 0 + 1]
//         })
//     }
//     function l(t) {
//         return t = t.replace(/^\s*\*/, ""),
//         u('gv({0},["{1}"])', a(t), t.replace(/\[['"]?([^'"]+)['"]?\]/g,
//         function(t, e) {
//             return "." + e
//         }).split(".").join('","'))
//     }
//     function h(t, e, i, n, r, s) {
//         for (var a = i.length,
//         o = t.split(e), u = 0, l = [], h = 0, c = o.length; c > h; h++) {
//             var f = o[h];
//             if (h) {
//                 var d = 1;
//                 for (u++;;) {
//                     var p = f.indexOf(i);
//                     if (0 > p) {
//                         l.push(u > 1 && d ? e: "", f);
//                         break
//                     }
//                     if (u = n ? u - 1 : 0, l.push(u > 0 && d ? e: "", f.slice(0, p), u > 0 ? i: ""), f = f.slice(p + a), d = 0, 0 === u) break
//                 }
//                 if (0 === u) r(l.join("")),
//                 s(f),
//                 l = []
//             } else f && s(f)
//         }
//         if (u > 0 && l.length > 0) s(e),
//         s(l.join(""))
//     }
//     function c(t, e, i) {
//         var n, r = [],
//         s = e.options,
//         o = "",
//         u = "",
//         f = "",
//         d = "";
//         if (i) o = "ts(",
//         u = ")",
//         f = P,
//         d = L,
//         n = s.defaultFilter;
//         return h(t, s.variableOpen, s.variableClose, 1,
//         function(t) {
//             if (i && t.indexOf("|") < 0 && n) t += "|" + n;
//             var s = t.indexOf("|"),
//             a = (s > 0 ? t.slice(0, s) : t).replace(/^\s+/, "").replace(/\s+$/, ""),
//             h = s > 0 ? t.slice(s + 1) : "",
//             p = 0 === a.indexOf("*"),
//             g = [p ? "": o, l(a), p ? "": u];
//             if (h) {
//                 h = c(h, e);
//                 for (var m = h.split("|"), v = 0, y = m.length; y > v; v++) {
//                     var b = m[v];
//                     if (/^\s*([a-z0-9_-]+)(\((.*)\))?\s*$/i.test(b)) {
//                         if (g.unshift('fs["' + RegExp.$1 + '"]('), RegExp.$3) g.push(",", RegExp.$3);
//                         g.push(")")
//                     }
//                 }
//             }
//             r.push(f, g.join(""), d)
//         },
//         function(t) {
//             r.push(f, i ? a(t) : t, d)
//         }),
//         r.join("")
//     }
//     function f(t, e) {
//         this.value = t,
//         this.engine = e
//     }
//     function d(t, e) {
//         this.value = t,
//         this.engine = e,
//         this.children = [],
//         this.cloneProps = []
//     }
//     function p(t, e) {
//         var i = t.stack,
//         n = e ? i.find(function(t) {
//             return t instanceof e
//         }) : i.bottom();
//         if (n) {
//             for (var r; (r = i.top()) !== n;) {
//                 if (!r.autoClose) throw new Error(r.type + " must be closed manually: " + r.value);
//                 r.autoClose(t)
//             }
//             n.close(t)
//         }
//         return n
//     }
//     function g(t, e) {
//         if (!/^\s*([a-z0-9\/_-]+)\s*(\(\s*master\s*=\s*([a-z0-9\/_-]+)\s*\))?\s*/i.test(t)) throw new Error("Invalid " + this.type + " syntax: " + t);
//         this.master = RegExp.$3,
//         this.name = RegExp.$1,
//         d.call(this, t, e),
//         this.blocks = {}
//     }
//     function m(t, e) {
//         if (!/^\s*([a-z0-9\/_-]+)\s*$/i.test(t)) throw new Error("Invalid " + this.type + " syntax: " + t);
//         this.name = RegExp.$1,
//         d.call(this, t, e),
//         this.cloneProps = ["name"]
//     }
//     function v(t, e) {
//         if (!/^\s*([a-z0-9\/_-]+)\s*$/i.test(t)) throw new Error("Invalid " + this.type + " syntax: " + t);
//         this.name = RegExp.$1,
//         d.call(this, t, e),
//         this.cloneProps = ["name", "state", "blocks"],
//         this.blocks = {}
//     }
//     function y(t, e) {
//         if (!/^\s*([a-z0-9_]+)\s*=([\s\S]*)$/i.test(t)) throw new Error("Invalid " + this.type + " syntax: " + t);
//         this.name = RegExp.$1,
//         this.expr = RegExp.$2,
//         d.call(this, t, e),
//         this.cloneProps = ["name", "expr"]
//     }
//     function b(t, e) {
//         if (!/^\s*([a-z0-9_-]+)\s*(\(([\s\S]*)\))?\s*$/i.test(t)) throw new Error("Invalid " + this.type + " syntax: " + t);
//         this.name = RegExp.$1,
//         this.args = RegExp.$3,
//         d.call(this, t, e),
//         this.cloneProps = ["name", "args"]
//     }
//     function w(t, e) {
//         if (!/^\s*([a-z0-9\/_-]+)\s*(\(([\s\S]*)\))?\s*$/i.test(t)) throw new Error("Invalid " + this.type + " syntax: " + t);
//         this.name = RegExp.$1,
//         this.args = RegExp.$3,
//         d.call(this, t, e),
//         this.cloneProps = ["name", "args"]
//     }
//     function E(t, e) {
//         var i = new RegExp(u("^\\s*({0}[\\s\\S]+{1})\\s+as\\s+{0}([0-9a-z_]+){1}\\s*(,\\s*{0}([0-9a-z_]+){1})?\\s*$", o(e.options.variableOpen), o(e.options.variableClose)), "i");
//         if (!i.test(t)) throw new Error("Invalid " + this.type + " syntax: " + t);
//         this.list = RegExp.$1,
//         this.item = RegExp.$2,
//         this.index = RegExp.$4,
//         d.call(this, t, e),
//         this.cloneProps = ["list", "item", "index"]
//     }
//     function x(t, e) {
//         d.call(this, t, e)
//     }
//     function T(t, e) {
//         x.call(this, t, e)
//     }
//     function _(t, e) {
//         d.call(this, t, e)
//     }
//     function A(t, e) {
//         e.target = t;
//         var i = e.engine,
//         n = t.name;
//         if (i.targets[n]) switch (i.options.namingConflict) {
//         case "override":
//             i.targets[n] = t,
//             e.targets.push(n);
//         case "ignore":
//             break;
//         default:
//             throw new Error("Target exists: " + n)
//         } else i.targets[n] = t,
//         e.targets.push(n)
//     }
//     function S(t, e) {
//         j[t] = e,
//         e.prototype.type = t
//     }
//     function k(t) {
//         this.options = {
//             commandOpen: "<!--",
//             commandClose: "-->",
//             commandSyntax: /^\s*(\/)?([a-z]+)\s*(?::([\s\S]*))?$/,
//             variableOpen: "${",
//             variableClose: "}",
//             defaultFilter: "html"
//         },
//         this.config(t),
//         this.targets = {},
//         this.filters = e({},
//         O)
//     }
//     function C(t, e) {
//         function n() {
//             var t;
//             if (c.length > 0 && (t = c.join(""))) {
//                 var i = new f(t, e);
//                 if (i.beforeAdd(l), u.top().addChild(i), c = [], e.options.strip && l.current instanceof d) i.value = t.replace(/^[\x20\t\r]*\n/, "");
//                 l.current = i
//             }
//         }
//         var r, s = e.options.commandOpen,
//         a = e.options.commandClose,
//         o = e.options.commandSyntax,
//         u = new i,
//         l = {
//             engine: e,
//             targets: [],
//             stack: u,
//             target: null
//         },
//         c = [];
//         return h(t, s, a, 0,
//         function(t) {
//             var i = o.exec(t);
//             if (i && (r = j[i[2].toLowerCase()]) && "function" == typeof r) {
//                 n();
//                 var u = l.current;
//                 if (e.options.strip && u instanceof f) u.value = u.value.replace(/\r?\n[\x20\t]*$/, "\n");
//                 if (i[1]) u = p(l, r);
//                 else {
//                     if (u = new r(i[3], e), "function" == typeof u.beforeOpen) u.beforeOpen(l);
//                     u.open(l)
//                 }
//                 l.current = u
//             } else if (!/^\s*\/\//.test(t)) c.push(s, t, a);
//             r = null
//         },
//         function(t) {
//             c.push(t)
//         }),
//         n(),
//         p(l),
//         l.targets
//     }
//     i.prototype = {
//         push: function(t) {
//             this.raw[this.length++] = t
//         },
//         pop: function() {
//             if (this.length > 0) {
//                 var t = this.raw[--this.length];
//                 return this.raw.length = this.length,
//                 t
//             }
//         },
//         top: function() {
//             return this.raw[this.length - 1]
//         },
//         bottom: function() {
//             return this.raw[0]
//         },
//         find: function(t) {
//             for (var e = this.length; e--;) {
//                 var i = this.raw[e];
//                 if (t(i)) return i
//             }
//         }
//     };
//     var D = 178245,
//     R = {
//         "&": "&amp;",
//         "<": "&lt;",
//         ">": "&gt;",
//         '"': "&quot;",
//         "'": "&#39;"
//     },
//     O = {
//         html: function(t) {
//             return t.replace(/[&<>"']/g, s)
//         },
//         url: encodeURIComponent,
//         raw: function(t) {
//             return t
//         }
//     },
//     I = 'var r="";',
//     P = "r+=",
//     L = ";",
//     M = "return r;";
//     if ("undefined" != typeof navigator && /msie\s*([0-9]+)/i.test(navigator.userAgent) && RegExp.$1 - 0 < 8) I = "var r=[],ri=0;",
//     P = "r[ri++]=",
//     M = 'return r.join("");';
//     f.prototype = {
//         getRendererBody: function() {
//             var t = this.value,
//             e = this.engine.options;
//             if (!t || e.strip && /^\s*$/.test(t)) return "";
//             else return c(t, this.engine, 1)
//         },
//         clone: function() {
//             return this
//         }
//     },
//     d.prototype = {
//         addChild: function(t) {
//             this.children.push(t)
//         },
//         open: function(t) {
//             var e = t.stack.top();
//             e && e.addChild(this),
//             t.stack.push(this)
//         },
//         close: function(t) {
//             if (t.stack.top() === this) t.stack.pop()
//         },
//         getRendererBody: function() {
//             for (var t = [], e = this.children, i = 0; i < e.length; i++) t.push(e[i].getRendererBody());
//             return t.join("")
//         },
//         clone: function() {
//             for (var t = this.constructor,
//             e = new t(this.value, this.engine), i = 0, n = this.children.length; n > i; i++) e.addChild(this.children[i].clone());
//             for (var i = 0,
//             n = this.cloneProps.length; n > i; i++) {
//                 var r = this.cloneProps[i];
//                 e[r] = this[r]
//             }
//             return e
//         }
//     };
//     var N = 'data=data||{};var v={},fs=engine.filters,hg=typeof data.get=="function",gv=function(n,ps){var p=ps[0],d=v[p];if(d==null){if(hg){return data.get(n);}d=data[p];}for(var i=1,l=ps.length;i<l;i++)if(d!=null)d = d[ps[i]];return d;},ts=function(s){if(typeof s==="string"){return s;}if(s==null){s="";}return ""+s;};';
//     r(g, d),
//     r(m, d),
//     r(v, d),
//     r(y, d),
//     r(b, d),
//     r(w, d),
//     r(E, d),
//     r(x, d),
//     r(T, x),
//     r(_, x);
//     var q = {
//         READING: 1,
//         READED: 2,
//         APPLIED: 3,
//         READY: 4
//     };
//     v.prototype.applyMaster = g.prototype.applyMaster = function(t) {
//         function e(t) {
//             var n = t.children;
//             if (n instanceof Array) for (var r = 0,
//             s = n.length; s > r; r++) {
//                 var a = n[r];
//                 if (a instanceof m && i[a.name]) a = n[r] = i[a.name];
//                 e(a)
//             }
//         }
//         if (this.state >= q.APPLIED) return 1;
//         var i = this.blocks,
//         n = this.engine.targets[t];
//         if (n && n.applyMaster(n.master)) return this.children = n.clone().children,
//         e(this),
//         this.state = q.APPLIED,
//         1;
//         else return void 0
//     },
//     g.prototype.isReady = function() {
//         function t(n) {
//             for (var r = 0,
//             s = n.children.length; s > r; r++) {
//                 var a = n.children[r];
//                 if (a instanceof v) {
//                     var o = e.targets[a.name];
//                     i = i && o && o.isReady(e)
//                 } else if (a instanceof d) t(a)
//             }
//         }
//         if (this.state >= q.READY) return 1;
//         var e = this.engine,
//         i = 1;
//         if (this.applyMaster(this.master)) return t(this),
//         i && (this.state = q.READY),
//         i;
//         else return void 0
//     },
//     g.prototype.getRenderer = function() {
//         if (this.renderer) return this.renderer;
//         if (this.isReady()) {
//             var t = new Function("data", "engine", [N, I, this.getRendererBody(), M].join("\n")),
//             e = this.engine;
//             return this.renderer = function(i) {
//                 return t(i, e)
//             },
//             this.renderer
//         }
//         return null
//     },
//     g.prototype.open = function(t) {
//         p(t),
//         d.prototype.open.call(this, t),
//         this.state = q.READING,
//         A(this, t)
//     },
//     y.prototype.open = w.prototype.open = function(t) {
//         t.stack.top().addChild(this)
//     },
//     m.prototype.open = function(t) {
//         d.prototype.open.call(this, t),
//         t.stack.find(function(t) {
//             return t.blocks
//         }).blocks[this.name] = this
//     },
//     T.prototype.open = function(t) {
//         var e = new _;
//         e.open(t);
//         var i = p(t, x);
//         i.addChild(this),
//         t.stack.push(this)
//     },
//     _.prototype.open = function(t) {
//         var e = p(t, x);
//         e.addChild(this),
//         t.stack.push(this)
//     },
//     v.prototype.open = function(t) {
//         this.parent = t.stack.top(),
//         this.target = t.target,
//         d.prototype.open.call(this, t),
//         this.state = q.READING
//     },
//     w.prototype.close = y.prototype.close = function() {},
//     v.prototype.close = function(t) {
//         d.prototype.close.call(this, t),
//         this.state = q.READED
//     },
//     g.prototype.close = function(t) {
//         d.prototype.close.call(this, t),
//         this.state = this.master ? q.READED: q.APPLIED,
//         t.target = null
//     },
//     v.prototype.autoClose = function(t) {
//         var e = this.parent.children;
//         e.push.apply(e, this.children),
//         this.children.length = 0;
//         for (var i in this.blocks) this.target.blocks[i] = this.blocks[i];
//         this.blocks = {},
//         this.close(t)
//     },
//     w.prototype.beforeOpen = v.prototype.beforeOpen = y.prototype.beforeOpen = E.prototype.beforeOpen = b.prototype.beforeOpen = m.prototype.beforeOpen = x.prototype.beforeOpen = f.prototype.beforeAdd = function(t) {
//         if (!t.stack.bottom()) {
//             var e = new g(n(), t.engine);
//             e.open(t)
//         }
//     },
//     v.prototype.getRendererBody = function() {
//         return this.applyMaster(this.name),
//         d.prototype.getRendererBody.call(this)
//     },
//     w.prototype.getRendererBody = function() {
//         return u("{0}engine.render({2},{{3}}){1}", P, L, a(this.name), c(this.args, this.engine).replace(/(^|,)\s*([a-z0-9_]+)\s*=/gi,
//         function(t, e, i) {
//             return (e || "") + a(i) + ":"
//         }))
//     },
//     y.prototype.getRendererBody = function() {
//         if (this.expr) return u("v[{0}]={1};", a(this.name), c(this.expr, this.engine));
//         else return ""
//     },
//     x.prototype.getRendererBody = function() {
//         return u("if({0}){{1}}", c(this.value, this.engine), d.prototype.getRendererBody.call(this))
//     },
//     _.prototype.getRendererBody = function() {
//         return u("}else{{0}", d.prototype.getRendererBody.call(this))
//     },
//     E.prototype.getRendererBody = function() {
//         return u('var {0}={1};if({0} instanceof Array)for (var {4}=0,{5}={0}.length;{4}<{5};{4}++){v[{2}]={4};v[{3}]={0}[{4}];{6}}else if(typeof {0}==="object")for(var {4} in {0}){v[{2}]={4};v[{3}]={0}[{4}];{6}}', n(), c(this.list, this.engine), a(this.index || n()), a(this.item), n(), n(), d.prototype.getRendererBody.call(this))
//     },
//     b.prototype.getRendererBody = function() {
//         var t = this.args;
//         return u("{2}fs[{5}]((function(){{0}{4}{1}})(){6}){3}", I, M, P, L, d.prototype.getRendererBody.call(this), a(this.name), t ? "," + c(t, this.engine) : "")
//     };
//     var j = {};
//     S("target", g),
//     S("block", m),
//     S("import", v),
//     S("use", w),
//     S("var", y),
//     S("for", E),
//     S("if", x),
//     S("elif", T),
//     S("else", _),
//     S("filter", b),
//     k.prototype.config = function(t) {
//         e(this.options, t)
//     },
//     k.prototype.compile = k.prototype.parse = function(t) {
//         if (t) {
//             var e = C(t, this);
//             if (e.length) return this.targets[e[0]].getRenderer()
//         }
//         return new Function('return ""')
//     },
//     k.prototype.getRenderer = function(t) {
//         var e = this.targets[t];
//         if (e) return e.getRenderer();
//         else return void 0
//     },
//     k.prototype.render = function(t, e) {
//         var i = this.getRenderer(t);
//         if (i) return i(e);
//         else return ""
//     },
//     k.prototype.addFilter = function(t, e) {
//         if ("function" == typeof e) this.filters[t] = e
//     };
//     var H = new k;
//     if (H.Engine = k, "object" == typeof exports && "object" == typeof module) exports = module.exports = H;
//     else if ("function" == typeof define && define.amd) define("etpl/main", [], H);
//     else t.etpl = H
// } (this),
// define("etpl", ["etpl/main"],
// function(t) {
//     return t
// }),
// define("common/pullrefresh.tpl", [],
// function() {
//     return '<!-- if: ${type} == \'game\' -->\n<!-- use: gameItems(items=${items}) -->\n<!-- /if -->\n\n<!-- target: gameItems -->\n<!-- var: langVisit = \'visit\' -->\n<!-- var: langPlay = \'play\' -->\n<!-- var: langDownload = \'download\' -->\n<!-- var: langOriginal = \'original\' -->\n<!-- for: ${items} as ${item} -->\n<div class="item" data-id="${item.id}">\n    <a href="${item.id|gameuri}">\n        <figure class="cover">\n            <!-- if: ${item.is_interest} > 0 && ${item.badge} -->\n            <i data-ui="badge${item.is_interest}">${item.badge}</i>\n            <!-- /if -->\n            <!-- if: ${item.is_original} > 0 -->\n            <span class="tip">${langOriginal|lang}</span>\n            <!-- /if -->\n            <img src="${item.img}">\n        </figure>\n        <div class="meta">\n            <h3 class="title">${item.title}</h3>\n            <i class="icon-star-${item.rates}"></i>\n            <span class="count">${langVisit|lang}: ${item.hits}</span>\n            <div class="desc">${item.intro}</div>\n        </div>\n    </a>\n    <!-- var: btnStyle = (${item.type} > 1 && ${item.type} < 4) ? \'success\' : \'danger\' -->\n    <a href="${item.id|gameuri}" class="ui-btn play" data-ui="${btnStyle} small icon-right">\n    <!-- if: ${item.type} == 2 -->\n        <i class="icon-android"></i>\n        ${langDownload|lang}\n    <!-- elif: ${item.type} == 3 -->\n        <i class="icon-apple"></i>\n        ${langDownload|lang}\n    <!-- else -->\n        <i class="icon-right"></i>\n        ${langPlay|lang}\n    <!-- /if -->\n    </a>\n</div>\n<!-- /for -->\n'
// }),
// define("common/pullrefresh", ["require", "exports", "module", "saber-lang", "saber-dom", "saber-lang/function/debounce", "saber-ajax", "etpl", "./pullrefresh.tpl"],
// function(require, exports) {
//     function t(t) {
//         var i = this.options = t || {};
//         if (i.main && i.button) {
//             var n = o(i.main, "source");
//             if (n) this.main = i.main,
//             this.button = i.button,
//             this.api = n,
//             this.type = o(i.main, "type") || "game",
//             this.when = i.when || o(i.main, "when") || window.innerHeight / 2,
//             this.max = i.max || o(i.main, "max", !0) || 5,
//             this.page = i.page || o(i.main, "page", !0) || 0,
//             e.call(this, o(i.main, "mode"));
//             else if (i.button) h.hide(i.button)
//         }
//     }
//     function e(t) {
//         if (this.mode !== t) if (this.mode = t, "manual" === t) this.button.addEventListener("click", this.handler = l.bind(n, this), !1);
//         else {
//             if (this.y = window.pageYOffset, !this.handler) window.addEventListener("scroll", this.handler = require("saber-lang/function/debounce")(l.bind(i, this), this.options.debounce || 500), !1);
//             i.call(this)
//         }
//     }
//     function i() {
//         if (this.main && this.button) {
//             var t = this.y,
//             e = window.pageYOffset;
//             if (this.y = e, !(t > e)) {
//                 var i = this.button.getBoundingClientRect().top - window.innerHeight;
//                 if (i <= this.when) n.call(this)
//             }
//         }
//     }
//     function n() {
//         if (!this.loading) if (this.loading = !0, this.page++, h.addClass(this.button, "loading"), this.button.setAttribute("disabled", "disabled"), require("saber-ajax").get(this.api.replace(/_page_/g, this.page)).then(l.bind(function(t) {
//             r.call(this);
//             try {
//                 t = JSON.parse(t)
//             } catch(e) {}
//             if (t && t.data) a.call(this, t.data)
//         },
//         this), l.bind(r, this)), !this.mode && this.max && this.page >= this.max) s.call(this)
//     }
//     function r() {
//         this.loading = !1,
//         h.removeClass(this.button, "loading"),
//         this.button.removeAttribute("disabled");
//         var t = (this.options || {}).complete;
//         t && t(this.page, this)
//     }
//     function s(t) {
//         if (window.removeEventListener("scroll", this.handler, !1), this.button.removeEventListener("click", this.handler, !1), t) h.hide(this.button),
//         this.button = this.main = this.options = null;
//         else e.call(this, "manual")
//     }
//     function a(t) {
//         if (!this.render) {
//             var e = require("etpl");
//             e = new e.Engine;
//             for (var i in this.options.filter) e.addFilter(i, this.options.filter[i]);
//             this.render = e.compile(require("./pullrefresh.tpl"))
//         }
//         if (this.main.appendChild(u(this.render({
//             type: this.type,
//             items: t.list
//         }))), !t.isfull) s.call(this, !0)
//     }
//     function o(t, e, i) {
//         var n = h.getData(t, e);
//         return i ? parseInt(n, 10) : n
//     }
//     function u(t) {
//         var e = document.createDocumentFragment();
//         if (t) {
//             var i = document.createElement("div");
//             i.innerHTML = t;
//             for (var n; n = i.children[0];) e.appendChild(n);
//             i = n = null
//         }
//         return e
//     }
//     var l = require("saber-lang"),
//     h = require("saber-dom");
//     exports.init = t
// }),
// define("common/swipe", ["require", "hammer", "saber-lang", "saber-dom"],
// function(require) {
//     function t(t) {
//         var e = t || {};
//         if (this.main = e.main && l.query(e.main), this.target = e.target && l.query(e.target), this.speed = e.speed || 300, this.moveAt = e.moveAt || 20, this.main && this.target) h.push(this),
//         l.setData(this.main, "swipe", h.length - 1),
//         this.viewport = 0,
//         this.width = 0,
//         this.offset = 0,
//         this.repaint(),
//         s()
//     }
//     function e(t) {
//         var e = t.type,
//         n = t.deltaX;
//         if ("panleft" === e || "panright" === e) {
//             if (Math.abs(n) > this.moveAt) r(this.target, this.offset + n)
//         } else if ("panend" === e) this.offset += n,
//         i(this)
//     }
//     function i(t) {
//         var e = t.offset,
//         i = t.viewport,
//         n = t.width;
//         if (e > 0 || n > i && i > n + e) t.offset = e > 0 ? 0 : i - n,
//         r(t.target, t.offset, t.speed)
//     }
//     function n(t) {
//         r(t.target, t.offset = 0, t.speed)
//     }
//     function r(t, e, i) {
//         l.setStyle(t, "transition", "all " + (i || 0) + "ms"),
//         l.setStyle(t, "transform", "translate3d(" + e + "px, 0, 0) scale3d(1, 1, 1)")
//     }
//     function s() {
//         if (!a) o.on(window, "resize", a = function() {
//             h.forEach(function(t) {
//                 t.resize()
//             })
//         })
//     }
//     var a, o = require("hammer"),
//     u = require("saber-lang"),
//     l = require("saber-dom"),
//     h = [],
//     c = "panstart panend panleft panright";
//     return t.prototype.repaint = function() {
//         if (this.viewport = this.main.offsetWidth, !this.viewport) return this.disable(),
//         this;
//         var t = l.children(this.target);
//         if (!t.length) return this.disable(),
//         this;
//         if (this.width = t.length * t[0].offsetWidth, this.width <= this.viewport) return this.disable(),
//         this;
//         if (!this.hammer) this.hammer = new o(this.main),
//         o.Pan({
//             threshold: 300,
//             direction: o.DIRECTION_HORIZONTAL
//         });
//         return this.enable(),
//         this
//     },
//     t.prototype.resize = function() {
//         return this.repaint(),
//         i(this),
//         this
//     },
//     t.prototype.reset = function() {
//         return n(this),
//         this
//     },
//     t.prototype.enable = function() {
//         if (this.hammer && !this.onHammer) this.hammer.on(c, this.onHammer = u.bind(e, this));
//         return this
//     },
//     t.prototype.disable = function() {
//         if (this.onHammer) this.hammer.off(c, this.onHammer),
//         this.onHammer = null;
//         return this
//     },
//     t.prototype.dispose = function() {
//         if (this.hammer) this.hammer.destroy(),
//         this.hammer = null;
//         for (var t = 0,
//         e = h.length; e > t; t++) if (this === h[t]) {
//             h.splice(t, 1);
//             break
//         }
//         return this
//     },
//     t.getInstance = function(t) {
//         return h[l.getData(t, "swipe")]
//     },
//     t
// }),
// define("saber-env/detect", ["require"],
// function() {
//     function t(t) {
//         var e = {},
//         i = {},
//         n = t.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
//         r = t.match(/(Android);?[\s\/]+([\d.]+)?/),
//         s = !!t.match(/\(Macintosh\; Intel /),
//         a = t.match(/(iPad).*OS\s([\d_]+)/),
//         o = t.match(/(iPod)(.*OS\s([\d_]+))?/),
//         u = !a && t.match(/(iPhone\sOS)\s([\d_]+)/),
//         l = t.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
//         h = t.match(/Windows Phone ([\d.]+)/),
//         c = l && t.match(/TouchPad/),
//         f = t.match(/Kindle\/([\d.]+)/),
//         d = t.match(/Silk\/([\d._]+)/),
//         p = t.match(/(BlackBerry).*Version\/([\d.]+)/),
//         g = t.match(/(BB10).*Version\/([\d.]+)/),
//         m = t.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
//         v = t.match(/PlayBook/),
//         y = t.match(/Chrome\/([\d.]+)/) || t.match(/CriOS\/([\d.]+)/),
//         b = t.match(/Firefox\/([\d.]+)/),
//         w = t.match(/MSIE\s([\d.]+)/) || t.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
//         E = !y && t.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
//         x = E || t.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/),
//         T = t.match(/MicroMessenger\/([\d.]+)/),
//         _ = t.match(/baiduboxapp\/[^\/]+\/([\d.]+)_/) || t.match(/baiduboxapp\/([\d.]+)/) || t.match(/BaiduHD\/([\d.]+)/) || t.match(/FlyFlow\/([\d.]+)/) || t.match(/baidubrowser\/([\d.]+)/),
//         A = t.match(/MQQBrowser\/([\d.]+)/) || t.match(/QQ\/([\d.]+)/),
//         S = t.match(/UCBrowser\/([\d.]+)/),
//         k = t.match(/SogouMobileBrowser\/([\d.]+)/),
//         C = r && t.match(/MiuiBrowser\/([\d.]+)/),
//         D = t.match(/LBKIT/),
//         R = t.match(/Mercury\/([\d.]+)/);
//         if (i.webkit = !!n) i.version = n[1];
//         if (r) e.android = !0,
//         e.version = r[2];
//         if (u && !o) e.ios = e.iphone = !0,
//         e.version = u[2].replace(/_/g, ".");
//         if (a) e.ios = e.ipad = !0,
//         e.version = a[2].replace(/_/g, ".");
//         if (o) e.ios = e.ipod = !0,
//         e.version = o[3] ? o[3].replace(/_/g, ".") : null;
//         if (h) e.wp = !0,
//         e.version = h[1];
//         if (l) e.webos = !0,
//         e.version = l[2];
//         if (c) e.touchpad = !0;
//         if (p) e.blackberry = !0,
//         e.version = p[2];
//         if (g) e.bb10 = !0,
//         e.version = g[2];
//         if (m) e.rimtabletos = !0,
//         e.version = m[2];
//         if (v) i.playbook = !0;
//         if (f) e.kindle = !0,
//         e.version = f[1];
//         if (d) i.silk = !0,
//         i.version = d[1];
//         if (!d && e.android && t.match(/Kindle Fire/)) i.silk = !0;
//         if (y) i.chrome = !0,
//         i.version = y[1];
//         if (b) i.firefox = !0,
//         i.version = b[1];
//         if (w) i.ie = !0,
//         i.version = w[1];
//         if (x && (s || e.ios)) if (i.safari = !0, s) i.version = x[1];
//         if (E) i.webview = !0;
//         if (T) i.wechat = !0,
//         i.version = T[1];
//         if (_) delete i.webview,
//         i.baidu = !0,
//         i.version = _[1];
//         if (A) i.qq = !0,
//         i.version = A[1];
//         if (S) delete i.webview,
//         i.uc = !0,
//         i.version = S[1];
//         if (k) delete i.webview,
//         i.sogou = !0,
//         i.version = k[1];
//         if (C) i.xiaomi = !0,
//         i.version = C[1];
//         if (D) i.liebao = !0,
//         i.version = "0";
//         if (R) i.mercury = !0,
//         i.version = R[1];
//         if (navigator.standalone) i.standalone = !0;
//         return e.tablet = !!(a || v || r && !t.match(/Mobile/) || b && t.match(/Tablet/) || w && !t.match(/Phone/) && t.match(/Touch/)),
//         e.phone = !(e.tablet || e.ipod || !(r || u || l || p || g || y && t.match(/Android/) || y && t.match(/CriOS\/([\d.]+)/) || b && t.match(/Mobile/) || w && t.match(/Touch/))),
//         {
//             browser: i,
//             os: e
//         }
//     }
//     return t
// }),
// define("saber-env/main", ["require", "./detect"],
// function(require) {
//     var t = require("./detect");
//     return t(navigator.userAgent)
// }),
// define("saber-env", ["saber-env/main"],
// function(t) {
//     return t
// }),
// define("saber-tap/tap", ["require", "saber-lang/bind"],
// function(require) {
//     "use strict";
//     function t() {
//         if (! ("ontouchstart" in window)) return ! 0;
//         if (l || s && h) return ! 0;
//         else return ! 1
//     }
//     function e(t) {
//         var e = t.onclick;
//         t.addEventListener("click",
//         function(t) {
//             e(t)
//         },
//         !1),
//         t.onclick = null
//     }
//     function i(i) {
//         if (this.layer = i, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.startX = 0, this.startY = 0, this.lastTouchIdentifier = 0, this.boundary = 10, !i || !i.nodeType) throw new TypeError("layer must be a HTMLElement.");
//         if (!t()) {
//             if (this.onClick = n(this.onClick, this), this.onMouse = n(this.onMouse, this), this.onTouchStart = n(this.onTouchStart, this), this.onTouchMove = n(this.onTouchMove, this), this.onTouchEnd = n(this.onTouchEnd, this), this.onTouchCancel = n(this.onTouchCancel, this), this.bindEvents(), !Event.prototype.stopImmediatePropagation) i.addEventListener = function(t, e, n) {
//                 var r = Node.prototype.addEventListener;
//                 if ("click" === t) {
//                     if (!e.hijacked) e.hijacked = function(t) {
//                         if (!t.propagationStopped) e(t)
//                     };
//                     r.call(i, t, e.hijacked, n)
//                 } else r.call(i, t, e, n)
//             },
//             i.removeEventListener = function(t, e, n) {
//                 var r = Node.prototype.removeEventListener;
//                 if ("click" === t) r.call(i, t, e.hijacked || e, n);
//                 else r.call(i, t, e, n)
//             };
//             if ("function" == typeof i.onclick) e(i)
//         }
//     }
//     var n = require("saber-lang/bind"),
//     r = navigator.userAgent,
//     s = r.indexOf("Android") > 0,
//     a = /iP(ad|hone|od)/.test(r),
//     o = a && /OS 4_\d(_\d)?/.test(r),
//     u = a && /OS ([6-9]|\d{2})_\d/.test(r),
//     l = "chrome" in window,
//     h = r.indexOf("UCBrowser") > 0;
//     return i.prototype.bindEvents = function() {
//         var t = this.layer;
//         if (s) t.addEventListener("mouseover", this.onMouse, !0),
//         t.addEventListener("mousedown", this.onMouse, !0),
//         t.addEventListener("mouseup", this.onMouse, !0);
//         t.addEventListener("click", this.onClick, !0),
//         t.addEventListener("touchstart", this.onTouchStart, !1),
//         t.addEventListener("touchmove", this.onTouchMove, !1),
//         t.addEventListener("touchend", this.onTouchEnd, !1),
//         t.addEventListener("touchcancel", this.onTouchCancel, !1)
//     },
//     i.prototype.onMouse = function(t) {
//         if (!this.targetElement) return ! 0;
//         if (t.forwardedTouchEvent) return ! 0;
//         if (!t.cancelable) return ! 0;
//         if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
//             if (t.stopImmediatePropagation) t.stopImmediatePropagation();
//             else t.propagationStopped = !0;
//             return t.stopPropagation(),
//             t.preventDefault(),
//             !1
//         }
//         return ! 0
//     },
//     i.prototype.getTargetElementFromEventTarget = function(t) {
//         if (t.nodeType === Node.TEXT_NODE) return t.parentNode;
//         else return t
//     },
//     i.prototype.updateScrollParent = function(t) {
//         var e = t.tapScrollParent;
//         if (!e || !e.contains(t)) {
//             var i = t;
//             do {
//                 if (i.scrollHeight > i.offsetHeight) {
//                     e = i,
//                     t.tapScrollParent = i;
//                     break
//                 }
//                 i = i.parentElement
//             } while ( i )
//         }
//         if (e) e.tapLastScrollTop = e.scrollTop
//     },
//     i.prototype.onClick = function(t) {
//         if (this.trackingClick) return this.targetElement = null,
//         this.trackingClick = !1,
//         !0;
//         if ("submit" === t.target.type && 0 === t.detail) return ! 0;
//         var e = this.onMouse(t);
//         if (!e) this.targetElement = null;
//         return e
//     },
//     i.prototype.onTouchStart = function(t) {
//         if (t.targetTouches.length > 1) return ! 0;
//         var e, i = this.getTargetElementFromEventTarget(t.target),
//         n = t.targetTouches[0];
//         if (a) {
//             if (e = window.getSelection(), e.rangeCount && !e.isCollapsed) return ! 0;
//             if (!this.isIOS4) {
//                 if (n.identifier === this.lastTouchIdentifier) return t.preventDefault(),
//                 !1;
//                 this.lastTouchIdentifier = n.identifier,
//                 this.updateScrollParent(i)
//             }
//         }
//         if (this.trackingClick = !0, this.trackingClickStart = t.timeStamp, this.targetElement = i, this.startX = n.pageX, this.startY = n.pageY, t.timeStamp - this.lastClickTime < 200) t.preventDefault();
//         return ! 0
//     },
//     i.prototype.touchHasMoved = function(t) {
//         var e = t.changedTouches[0],
//         i = this.boundary;
//         if (Math.abs(e.pageX - this.startX) > i || Math.abs(e.pageY - this.startY) > i) return ! 0;
//         else return ! 1
//     },
//     i.prototype.onTouchMove = function(t) {
//         if (!this.trackingClick) return ! 0;
//         var e = this.getTargetElementFromEventTarget(t.target);
//         if (this.targetElement !== e || this.touchHasMoved(t)) this.trackingClick = !1,
//         this.targetElement = null;
//         return ! 0
//     },
//     i.prototype.findControl = function(t) {
//         if (void 0 !== t.control) return t.control;
//         if (t.htmlFor) return document.getElementById(t.htmlFor);
//         else return t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
//     },
//     i.prototype.focus = function(t) {
//         if (a && t.setSelectionRange && 0 !== t.type.indexOf("date") && "time" !== t.type) {
//             var e = t.value.length;
//             t.setSelectionRange(e, e)
//         } else t.focus()
//     },
//     i.prototype.needsFocus = function(t) {
//         switch (t.nodeName.toLowerCase()) {
//         case "textarea":
//             return ! 0;
//         case "select":
//             return ! s;
//         case "input":
//             switch (t.type) {
//             case "button":
//             case "checkbox":
//             case "file":
//             case "image":
//             case "radio":
//             case "submit":
//                 return ! 1
//             }
//             return ! t.disabled && !t.readOnly;
//         default:
//             return /\bneedsfocus\b/.test(t.className)
//         }
//     },
//     i.prototype.needsClick = function(t) {
//         switch (t.nodeName.toLowerCase()) {
//         case "button":
//         case "select":
//         case "textarea":
//             if (t.disabled) return ! 0;
//             break;
//         case "input":
//             if (a && "file" === t.type || t.disabled) return ! 0;
//             break;
//         case "label":
//         case "video":
//             return ! 0
//         }
//         return /\bneedsclick\b/.test(t.className)
//     },
//     i.prototype.sendClick = function(t, e) {
//         if (document.activeElement && document.activeElement !== t) document.activeElement.blur();
//         var i = e.changedTouches[0],
//         n = document.createEvent("MouseEvents");
//         n.initMouseEvent(this.determineEventType(t), !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null),
//         n.forwardedTouchEvent = !0,
//         t.dispatchEvent(n)
//     },
//     i.prototype.determineEventType = function(t) {
//         if (s && "select" === t.tagName.toLowerCase()) return "mousedown";
//         else return "click"
//     },
//     i.prototype.onTouchEnd = function(t) {
//         var e = this.targetElement;
//         if (!this.trackingClick) return ! 0;
//         if (t.timeStamp - this.lastClickTime < 200) return this.cancelNextClick = !0,
//         !0;
//         this.cancelNextClick = !1,
//         this.lastClickTime = t.timeStamp;
//         var i = this.trackingClickStart;
//         if (this.trackingClick = !1, this.trackingClickStart = 0, u) {
//             var n = t.changedTouches[0];
//             e = document.elementFromPoint(n.pageX - window.pageXOffset, n.pageY - window.pageYOffset) || e,
//             e.tapScrollParent = this.targetElement.tapScrollParent
//         }
//         var r = e.tagName.toLowerCase();
//         if ("label" === r) {
//             var l = this.findControl(e);
//             if (l) {
//                 if (this.focus(e), s) return ! 1;
//                 e = l
//             }
//         } else if (this.needsFocus(e)) {
//             if (t.timeStamp - i > 100 || a && window.top !== window && "input" === r) return this.targetElement = null,
//             !1;
//             if (this.focus(e), !o || "select" !== r) this.targetElement = null,
//             t.preventDefault();
//             return ! 1
//         }
//         if (a && !o) {
//             var h = e.tapScrollParent;
//             if (h && h.tapLastScrollTop !== h.scrollTop) return ! 0
//         }
//         if (!this.needsClick(e)) t.preventDefault(),
//         this.sendClick(e, t);
//         return ! 1
//     },
//     i.prototype.onTouchCancel = function() {
//         this.trackingClick = !1,
//         this.targetElement = null
//     },
//     i.prototype.destroy = function() {
//         var t = this.layer;
//         if (s) t.removeEventListener("mouseover", this.onMouse, !0),
//         t.removeEventListener("mousedown", this.onMouse, !0),
//         t.removeEventListener("mouseup", this.onMouse, !0);
//         t.removeEventListener("click", this.onClick, !0),
//         t.removeEventListener("touchstart", this.onTouchStart, !1),
//         t.removeEventListener("touchmove", this.onTouchMove, !1),
//         t.removeEventListener("touchend", this.onTouchEnd, !1),
//         t.removeEventListener("touchcancel", this.onTouchCancel, !1)
//     },
//     i.mixin = function(t) {
//         if ("string" == typeof t) t = document.getElementById(t);
//         return new i(t)
//     },
//     i
// }),
// define("saber-tap", ["saber-tap/tap"],
// function(t) {
//     return t
// }),
define("saber-widget/plugin/Plugin", ["require", "saber-lang/bind", "saber-lang/extend", "../base/event", "../base/state"],
function(require) {
    var t = require("saber-lang/bind"),
    e = require("saber-lang/extend"),
    i = function(t, i) {
        this.states = e({
            disable: !0
        },
        this.states),
        this.target = t,
        this.initOptions(i),
        this.addState("init"),
        this.emit("init")
    };
    return i.prototype = {
        type: "Plugin",
        initOptions: function(i) {
            if (this.options = e({},
            this.options, i), this.target.is("render")) this.render();
            else this.target.once("afterrender", t(this.render, this))
        },
        initDom: function() {},
        initEvent: function() {},
        clearEvent: function() {},
        dispose: function() {
            if (!this.is("dispose")) this.emit("beforedispose"),
            this.clearEvent(),
            this.target = null,
            this.emit("afterdispose"),
            this.off(),
            this.addState("dispose")
        },
        enable: function() {
            if (this.is("disable")) this.removeState("disable"),
            this.emit("enable");
            return this
        },
        disable: function() {
            if (!this.is("disable")) this.addState("disable"),
            this.emit("disable");
            return this
        },
        repaint: function() {},
        render: function() {
            var t = this.is("render");
            if (!t) this.addState("render"),
            this.emit("beforerender"),
            this.initDom(),
            this.initEvent();
            if (this.repaint(), !t) this.emit("afterrender");
            return this
        }
    },
    e(i.prototype, require("../base/event"), require("../base/state")),
    i
}),
define("saber-widget/plugin/SliderFlex", ["require", "./Plugin", "saber-lang", "../main"],
function(require) {
    var t = require("./Plugin"),
    e = function() {
        t.apply(this, arguments)
    };
    return e.prototype = {
        type: "SliderFlex",
        initEvent: function() {
            var t = this.target;
            this.onRepaint = require("saber-lang").bind(this.repaint, this),
            t.addEvent(window, "resize", this.onRepaint),
            t.addEvent(window, "orientationchange", this.onRepaint)
        },
        clearEvent: function() {
            var t = this.target;
            t.removeEvent(window, "resize", this.onRepaint),
            t.removeEvent(window, "orientationchange", this.onRepaint),
            this.onRepaint = null
        },
        repaint: function() {
            if (!this.is("disable")) {
                var t = this.target;
                if (!t.is("disable")) {
                    var e = t.is("pause");
                    if (!e) t.pause();
                    if (t._resize().to(t.get("index")), !e) t.resume()
                }
            }
        }
    },
    require("saber-lang").inherits(e, t),
    require("../main").registerPlugin(e),
    e
}),
define("saber-widget/plugin/Masker", ["require", "saber-dom", "./Plugin", "saber-lang", "../main"],
function(require) {
    var t = require("saber-dom"),
    e = require("./Plugin"),
    i = function() {
        e.apply(this, arguments)
    };
    return i.prototype = {
        type: "Masker",
        options: {
            autoClose: !1
        },
        initDom: function() {
            var e = this.main = document.createElement("div");
            e.className = "ui-masker",
            e.innerHTML = '<div data-role="wrapper"></div>',
            t.hide(e),
            this.wrapper = e.firstChild,
            this.wrapper.appendChild(this.target.get("main")),
            document.body.appendChild(e)
        },
        initEvent: function() {
            var t = this;
            if (t.options.autoClose) this.target.addEvent(this.main, "click", this.onClose = function() {
                t.disable()
            })
        },
        clearEvent: function() {
            if (this.onClose) this.target.removeEvent(this.main, "click", this.onClose),
            this.onClose = null
        },
        enable: function() {
            return t.show(this.main),
            e.prototype.enable.call(this),
            this
        },
        disable: function() {
            return t.hide(this.main),
            e.prototype.disable.call(this),
            this
        }
    },
    require("saber-lang").inherits(i, e),
    require("../main").registerPlugin(i),
    i
}),
define("saber-widget/plugin/ImageViewFlex", ["require", "./Plugin", "saber-lang", "../main"],
function(require) {
    var t = require("./Plugin"),
    e = function() {
        t.apply(this, arguments)
    };
    return e.prototype = {
        type: "ImageViewFlex",
        initEvent: function() {
            var t = this.target;
            this.onRepaint = require("saber-lang").bind(this.repaint, this),
            t.addEvent(window, "resize", this.onRepaint),
            t.addEvent(window, "orientationchange", this.onRepaint)
        },
        clearEvent: function() {
            var t = this.target;
            t.removeEvent(window, "resize", this.onRepaint),
            t.removeEvent(window, "orientationchange", this.onRepaint),
            this.onRepaint = null
        },
        repaint: function() {
            if (!this.is("disable")) {
                var t = this.target;
                if (!t.is("disable")) t._resize().to(t.get("index"))
            }
        }
    },
    require("saber-lang").inherits(e, t),
    require("../main").registerPlugin(e),
    e
}),
// define("app.tpl", [],
// function() {
//     return '<!-- if: ${type} == \'footprint\' -->\n<!-- use: footprint(items=${items}) -->\n<!-- elif: ${type} == \'guess\' -->\n<!-- use: guess(items=${items}) -->\n<!-- elif: ${type} == \'screen\' -->\n<!-- use: screen(data=${data}) -->\n<!-- elif: ${type} == \'desktop\' -->\n<!-- use: desktop(text=${text}) -->\n<!-- /if -->\n\n<!-- target: footprint -->\n<!-- for: ${items} as ${item} -->\n<!-- if: ${item} -->\n<div class="item" data-id="${item.id}">\n    <a href="${item.id|gameuri}">\n        <figure class="cover" data-ui="frame"><img src="${item.img}"></figure>\n        <div class="meta">\n            <h3 class="title">${item.title}</h3>\n        </div>\n    </a>\n</div>\n<!-- /if -->\n<!-- /for -->\n\n<!-- target: guess -->\n<!-- var: langOriginal = \'original\' -->\n<!-- for: ${items} as ${item} -->\n<!-- if: ${item} -->\n<div class="item" data-id="${item.id}">\n    <a href="${item.id|gameuri}">\n        <figure class="cover">\n            <!-- if: ${item.is_interest} > 0 && ${item.badge} -->\n            <i data-ui="badge${item.is_interest}">${item.badge}</i>\n            <!-- /if -->\n            <!-- if: ${item.is_original} > 0 -->\n            <span class="tip">${langOriginal|lang}</span>\n            <!-- /if -->\n            <img src="${item.img}">\n        </figure>\n        <div class="meta"><h3 class="title">${item.title}</h3></div>\n    </a>\n</div>\n<!-- /if -->\n<!-- /for -->\n\n\n<!-- target: screen -->\n<!-- var: langClickFav = \'click_fav_rt\' -->\n<!-- var: langFindMe = \'find_anytime\' -->\n<!-- var: langInstall = \'install_app\' -->\n<!-- var: langAndroidOri = \'android_ori\' -->\n<!-- var: langComingSoon = \'coming_soon\' -->\n<!-- var: langISee = \'i_see\' -->\n<!-- if: ${data.type} == \'fav\' -->\n<img src="http://static.wanh5.com/images/home/arron_rt.png" data-role="arrow" data-ui="rt">\n<p>${langClickFav|lang}</p>\n<p>${langFindMe|lang}</p>\n<!-- elif: ${data.type} == \'app\' -->\n<p>${langInstall|lang}</p>\n<!-- /if -->\n<p>&nbsp;</p>\n<div class="dropmenu">\n    <!-- if: ${data.os.android} -->\n    <a href="/app-download.html" class="ui-btn" data-ui="middle grey"><i class="icon-android"></i>${langAndroidOri|lang}</a>\n    <!-- elif: ${data.os.ios} -->\n    <a href="/wx-download.html" class="ui-btn" data-ui="middle grey disabled"><i class="icon-apple"></i>${langComingSoon|lang}</a>\n    <!-- else: -->\n    <a href="/wx-download.html" class="ui-btn" data-ui="middle grey disabled"><i class="icon-wp"></i>${langComingSoon|lang}</a>\n    <!-- /if -->\n    <span class="ui-btn" data-ui="success active ok" onclick="this.parentNode.parentNode.parentNode.style.display=\'none\'">${langISee|lang}</span>\n</div>\n\n<!-- target: desktop -->\n<img src="http://static.wanh5.com/images/home/logo.png">\n<p>${text|raw}</p>\n<i class="icon-close"></i>\n<b></b>\n'
// }),
// define("saber-cookie/cookie", ["require"],
// function() {
//     function t(t) {
//         return "string" == typeof t && "" !== t
//     }
//     function e(e) {
//         return t(e)
//     }
//     function i(e, i) {
//         if (t(e)) {
//             var n = String(document.cookie).match(new RegExp("(?:^|)" + e + "(?:(?:=([^;]*))|;|$)"));
//             if (n) if (n = n[1]) return i ? decodeURIComponent(n) : n;
//             else return ""
//         }
//         return null
//     }
//     var exports = {};
//     return exports.set = function(t, i, n) {
//         if (e(t)) {
//             n = n || {};
//             var r = n.expires;
//             if ("number" == typeof r) r = new Date,
//             r.setTime(r.getTime() + n.expires);
//             document.cookie = t + "=" + (n.raw ? i: encodeURIComponent(i)) + (r instanceof Date ? "; expires=" + r.toUTCString() : "") + (n.domain ? "; domain=" + n.domain: "") + (n.path ? "; path=" + n.path: "") + (n.secure ? "; secure": "")
//         }
//     },
//     exports.get = function(t, n) {
//         return n = n || {},
//         i(e(t) ? t: "", !n.raw)
//     },
//     exports.remove = function(t, e) {
//         e = e || {},
//         e.raw = !0,
//         e.expires = new Date(0),
//         this.set(t, "", e)
//     },
//     exports
// }),
// define("saber-cookie", ["saber-cookie/cookie"],
// function(t) {
//     return t
// }),
//["require", "saber-emitter", "saber-dom", "saber-lang/extend", "saber-string/format", "saber-lang/function/debounce", "saber-ajax", "saber-widget", "saber-widget/Slider", "saber-widget/LazyLoad", "saber-widget/ImageView", "./lang/main", "./const", "./common/pv", "./common/pullrefresh", "./common/swipe", "saber-env", "saber-tap", "saber-widget/plugin/SliderFlex", "saber-widget/plugin/Masker", "saber-widget/plugin/ImageViewFlex", "etpl", "./app.tpl", "saber-cookie"],
define("app", function(require) {
//     function t() {
//         var t = require("saber-cookie").get("51h5_user");
//         if (t) if (t = (decodeURIComponent(t) || "").split("|"), t.length > 5) return {
//             id: parseInt(t[0], 10),
//             nick: t[1] || t[4],
//             avatar: t[2],
//             gender: parseInt(t[3], 10) || 0,
//             sign: t[5],
//             loginType: t[6],
//             env: t[7]
//         };
//         return null
//     }
//     function e(t, e, i, n) {
//         t = "add" === t ? "addEventListener": "removeEventListener",
//         i.trim().replace(/\s\s+/g, " ").split(" ").forEach(function(e) {
//             this[t](e, n, !1)
//         },
//         e)
//     }
     var i = require("saber-emitter");
     n = require("saber-dom"),
    r = require("saber-lang/extend"),
//     s = require("saber-string/format"),
//     a = require("saber-lang/function/debounce"),
//     o = require("saber-ajax"),
     u = require("saber-widget");
     require("saber-widget/Slider"),
//     require("saber-widget/LazyLoad"),
//     require("saber-widget/ImageView");
//     var l = require("./lang/main"),
//     h = require("./const"),
//     c = require("./common/pv"),
//     f = require("./common/pullrefresh"),
//     d = require("./common/swipe"),
//     p = l.get,
//     g = n.query,
        m = n.queryAll,
//     v = require("saber-env"),
//     y = navigator.userAgent,
//     b = /Hoowu\/[\d.]+/.test(y) || /Html5Plus\/[\d.]+/.test(y),
//     w = v.os.ios,
//     E = v.browser.wechat,
//     x = /AliApp\(AP\/[0-9.]+\)|AlipayClient\/[0-9]+/.test(y),
//     T = !!window.PAGE_INDEX,
//     _ = !!window.PAGE_GAME_INFO,
//     A = "/game/${id}.html",
//     S = {
//         gameuri: function(t) {
//             var e = s(A, {
//                 id: t
//             }),
//             i = location.search.slice(1);
//             if (i) e += (e.indexOf("?") < 0 ? "?": "&") + i;
//             return e
//         },
//         lang: function(t) {
//             return p(t)
//         }
//     },
//     k = {
//         window: {
//             scroll: a(function() {
//                 exports.emit("scroll")
//             },
//             80)
//         }
//     },
        exports = {};
     return i.mixin(exports),
//     exports.init = function(t) {
//         t = t || {},
//         require("saber-tap").mixin(document.body),
//         l.use(t.lang || "cn"),
//         A = t.gameUri || A,
//         this.initEvent(),
//         this.initTrackEvent(),
//         this.initHeader(),
//         this.initHiddens(),
//         this.initSliders(),
//         this.initTabs(),
//         this.initSearch(),
//         this.initClaim(),
//         this.initPullRefresh(),
//         this.initSwipe(),
//         this.initLazyLoad(),
//         this.initHideStatusBar(),
//         this.initAdd2Desktop(),
//         this.initQRTip(),
//         this.initPopMenu(),
//         this.initForm(),
//         this.initFav(),
//         this.initLike(),
//         this.initWa(),
//         this.initFootprint(),
//         this.initGoTop(),
//         this.initDownTip(),
//         this.initNotice(),
//         console.info("app start")
//     },

    exports.initSliders = function() {
        require("saber-widget/plugin/SliderFlex"),
        [].forEach.call(m(".ui-slider"),
        function(t) {
            var e = n.getData(t, "opt");
            if (e) try {
                e = JSON.parse(e)
            } catch(i) {}
            var s = u.slider(t, r({
                interval: 4e3,
                flex: !0
            },
            e || {}));
            if (e.dot && !g("[data-role=dot]", t)) {
                var a = document.createElement("div");
                a.setAttribute("data-role", "dot");
                for (var o = "",
                l = s.get("length"), h = s.get("index"), c = 0; l > c; c++) o += "<b" + (c === h ? ' class="active"': "") + "></b>";
                a.innerHTML = o,
                t.appendChild(a)
            }
            if (g("[data-role=dot]", t)) s.on("change",
            function(t, e, i) {
                n.children(g("[data-role=dot]", this.get("main"))).forEach(function(t, e) {
                    n[e === i ? "addClass": "removeClass"](t, "active")
                })
            });
            if ("true" === n.getData(t, "preview") && m("img", s.get("main")).length > 1) {
                require("saber-widget/plugin/Masker"),
                require("saber-widget/plugin/ImageViewFlex");
                var f = u.imageView(s.get("main"), {
                    flex: !0
                });
                s.addEvent(s.get("main"), "click",
                function(t) {
                    if (n.matches(t.target, "img")) f.enable().to(t.target)
                })
            }
        })
    };

//     exports.initEvent = function() {
//         for (var t in k) for (var e in k[t]) window[t].addEventListener(e, k[t][e], !1)
//     },
//     exports.initTrackEvent = function() {
//         if (T) this.addEvent(document.body, "touchstart",
//         function(t) {
//             var e = t.target || t.srcElement;
//             if (e) {
//                 var i = "[data-track]";
//                 if (!n.matches(e, i)) e = n.closest(e, i, document.body);
//                 if (e) c.track("mwwwindex", n.getData(e, "track"))
//             }
//         })
//     },
//     exports.initHeader = function() {
//         if (g(".ui-bar[data-ui~=nav]")) this.on("scroll",
//         function() {
//             n[(window.pageYOffset >= 44 ? "add": "remove") + "Class"](document.body, "header-fixed")
//         })
//     },
//     exports.initHiddens = function() {
//         var t = v.os,
//         e = ".show-";
//         if (E) e += "wx";
//         else if (x) e += "ap";
//         else if (!t.tablet && !t.phone) e += "pc";
//         else if (b) e += "app";
//         else e += t.ios ? "ios": t.android ? "android": "other";
//         var i = v.browser.uc,
//         r = this;
//         m(e).forEach(function(t) {
//             if (!i || !n.hasClass(t, "hide-uc")) {
//                 var e = g('script[type="text/template"]', t);
//                 if (e) t.innerHTML = e.innerText,
//                 r.initDownTip(t);
//                 n.removeClass(t, "hidden")
//             }
//         })
//     },
//     exports.initForm = function() {
//         function t(t, e) {
//             n.setData(t, "submiting", e ? "true": "")
//         }
//         function e(t, e) {
//             if (t) {
//                 var i = n.closest(t, "[data-role=field]");
//                 if (i) if (e) n.removeData(i, "error");
//                 else n.setData(i, "error", "true")
//             }
//         }
//         function i(i) {
//             i.preventDefault();
//             var r = this;
//             if ("true" !== n.getData(r, "submiting")) {
//                 t(r, !0);
//                 var s = {}; [].forEach.call(r.elements,
//                 function(t) {
//                     if ("submit" !== t.type && "reset" !== t.type) s[t.name] = t.value,
//                     e(t, !0)
//                 }),
//                 o.post(this.action, s).then(function(i) {
//                     t(r);
//                     var s;
//                     try {
//                         s = JSON.parse(i)
//                     } catch(a) {}
//                     if (s && 1 === s.status) {
//                         var o = n.getData(r, "success"),
//                         u = n.getData(r, "tip");
//                         if (u) alert(u);
//                         if (o) location.href = o;
//                         else location.reload(!1)
//                     } else if (s) s.data.forEach(function(t) {
//                         e(r.elements[t.ext])
//                     });
//                     else alert(p("server_error"))
//                 },
//                 function() {
//                     t(r),
//                     alert(p("server_error"))
//                 })
//             }
//         }
//         m("form[data-role=form][data-type=ajax]").forEach(function(t) {
//             t.addEventListener("submit", i, !1)
//         })
//     },
//     exports.initFav = function() {
//         if (_) {
//             var t = g(".fav[data-id]");
//             if (t) {
//                 var e, i = this,
//                 r = function() {
//                     t.innerHTML = '<i class="icon-ok"></i>' + p("favorited"),
//                     i.addUIData(t, "disabled")
//                 },
//                 s = n.getData(t, "check");
//                 if (s) o.post(s).then(function(t) {
//                     var e;
//                     try {
//                         e = JSON.parse(t)
//                     } catch(i) {}
//                     if (e && 0 === e.status) r()
//                 });
//                 i.addEvent(t, "click",
//                 function(i) {
//                     if (i.preventDefault(), !e) e = !0,
//                     o.post(n.getData(t, "url"), {
//                         id: n.getData(t, "id")
//                     }).then(function(t) {
//                         e = !1;
//                         var i;
//                         try {
//                             i = JSON.parse(t)
//                         } catch(n) {}
//                         if (i && 1 === i.status) r();
//                         else if (i) alert(i.data)
//                     },
//                     function() {
//                         e = !1
//                     })
//                 })
//             }
//         }
//     },
//     exports.initLike = function() {
//         function t(s) {
//             if (s.preventDefault(), !r) r = !0,
//             o.post(n.getData(e, "url"), {
//                 id: n.getData(e, "id")
//             }).then(function(n) {
//                 r = !1;
//                 var s;
//                 try {
//                     s = JSON.parse(n)
//                 } catch(a) {}
//                 if (s && 1 === s.status) {
//                     var o = g("em", e);
//                     if (o) o.innerText = parseInt(o.innerText, 10) + 1;
//                     e.href = "javascript:void(0);",
//                     i.removeEvent(e, "click", t),
//                     t = null
//                 } else if (s) alert(s.data)
//             },
//             function() {
//                 r = !1
//             })
//         }
//         if (_) {
//             var e = g(".like[data-id]");
//             if (e) {
//                 var i = this;
//                 i.addEvent(e, "click", t);
//                 var r
//             }
//         }
//     }, exports.initPopMenu = function() {
//         var t = this;
//         m(".ui-btn[data-popmenu]").forEach(function(e) {
//             var i = n.getData(e, "popmenu");
//             if (i = i ? g("#" + i) : null) t.addEvent(i, "click",
//             function(t) {
//                 t.stopPropagation();
//                 var e = n.getData(t.target, "url");
//                 if (e) if ("blank" === n.getData(t.target, "target")) window.open(e);
//                 else location.href = e;
//                 setTimeout(function() {
//                     n.hide(i)
//                 },
//                 500)
//             }),
//             t.addEvent(e, "click",
//             function(t) {
//                 t.preventDefault();
//                 var e = "none" === n.getStyle(i, "display");
//                 if (n[e ? "show": "hide"](i), e) {
//                     var r = n.position(this);
//                     n.setStyle(i, "left", r.left + (this.offsetWidth - i.offsetWidth) / 2 + "px"),
//                     n.setStyle(i, "top", r.top + this.offsetHeight + 4 + "px")
//                 }
//             })
//         })
//     },
//     exports.initWa = function() {
//         var t = g("#waBtn");
//         if (t && g("#waList")) {
//             var e, i = this;
//             i.addEvent(t, "click",
//             function(r) {
//                 if (r.preventDefault(), !e) e = !0,
//                 o.post(n.getData(t, "source")).then(function(t) {
//                     e = !1;
//                     var r;
//                     try {
//                         r = JSON.parse(t)
//                     } catch(s) {}
//                     if (r && 1 === r.status) {
//                         var a = g("#waList");
//                         a.innerHTML = i.renderTpl("guess", {
//                             items: r.data
//                         }),
//                         i.initSwipe(n.closest(a, "[data-role=body]"))
//                     } else if (r) alert(r.data)
//                 },
//                 function() {
//                     e = !1
//                 })
//             })
//         }
//     },
//     exports.initFootprint = function() {
//         var t = g("#fpList");
//         if (t) {
//             var e = n.getData(t, "source");
//             if (e) {
//                 var i = this;
//                 o.post(e).then(function(e) {
//                     var r;
//                     try {
//                         r = JSON.parse(e)
//                     } catch(s) {}
//                     if (r && 1 === r.status) {
//                         var a = [].concat(r.data.list || []);
//                         if (a.length < 1) return void n.hide(n.closest(t, "section"));
//                         if (a.length < 4) a = a.concat((r.data.recommend || []).slice(0, 4 - a.length));
//                         t.innerHTML = i.renderTpl("footprint", {
//                             items: a
//                         }),
//                         i.initSwipe(n.closest(t, "[data-role=body]"))
//                     }
//                 })
//             }
//         }
//     },
//     exports.initGoTop = function() {
//         this.on("scroll",
//         function() {
//             var t = g(".gotop");
//             if (t) n[window.pageYOffset > 60 ? "show": "hide"](t)
//         })
//     },
//     exports.initDownTip = function(t) {
//         if (t || E) m("a[href][data-link=down]", t).forEach(function(t) {
//             t.href = "/game-down.html?url=" + encodeURIComponent(t.href)
//         })
//     },
//     exports.initNotice = function() {
//         var t = g(".notice");
//         if (t) {
//             var e = m("a", t);
//             if (! (e.length < 2)) setInterval(function() {
//                 var i = parseInt(n.getData(t, "now") || 0, 10) || 0;
//                 if (n.removeClass(e[i], "show"), ++i >= e.length) i = 0;
//                 n.setData(t, "now", i),
//                 n.addClass(e[i++], "show")
//             },
//             parseInt(n.getData(t, "time") || 0, 10) || 6e3)
//         }
//     },
//     exports.initQRTip = function() {
//         function t(t) {
//             t.preventDefault(),
//             t.stopPropagation(),
//             g("img", i).src = this.src,
//             n.show(i),
//             document.addEventListener("click", e, !1)
//         }
//         function e() {
//             n.hide(i),
//             document.removeEventListener("click", e, !1)
//         }
//         var i = g("#qr-tip"),
//         r = m(".qr");
//         if (i && r.length) i.addEventListener("click",
//         function(t) {
//             if (t.preventDefault(), t.stopPropagation(), n.matches(t.target, ".icon-close")) e()
//         },
//         !1),
//         r.forEach(function(e) {
//             e.addEventListener("click", t, !1)
//         })
//     },
//     exports.initAdd2Desktop = function() {
//         // var t = ["/", "/index.html", "/wx", "/wx.html", "/wx-index.html"];
//         // if (! (b || E || x || !w || !v.browser.safari || v.browser.standalone || !(v.os.iphone || v.os.ipad || v.os.ipod) || "1" === localStorage.getItem("addToDesktopTip") || ("," + t.join(",") + ",").indexOf("," + location.pathname + ",") < 0)) {
//         //     var e = g("#addToDesktopTip");
//         //     if (!e) e = document.createElement("div"),
//         //     e.id = "addToDesktopTip",
//         //     e.className = "ui-tip",
//         //     e.innerHTML = this.renderTpl("desktop", {
//         //         text: p("add2desktop")
//         //     }),
//         //     document.body.appendChild(e);
//         //     e.addEventListener("click",
//         //     function i(t) {
//         //         if (n.matches(t.target, ".icon-close")) localStorage.setItem("addToDesktopTip", 1),
//         //         this.removeEventListener("click", i),
//         //         this.parentNode.removeChild(this)
//         //     })
//         // }
//     },
//     exports.initHideStatusBar = function() {
//         if (w) window.scrollTo(0, 1);
//         else setTimeout(function() {
//             window.scrollTo(0, 1)
//         },
//         100)
//     },
//     exports.initLazyLoad = function() {
//         u.lazyLoad({
//             animate: !0,
//             attribute: "data-src",
//             placeholder: null
//         })
//     },
//     exports.initPullRefresh = function() {
//         var t, e = g(".container .more");
//         if (e) {
//             if (t = g(n.getData(e, "for")), !t) {
//                 var i = n.closest(e, "section");
//                 if (i) t = g(".list", i)
//             }
//             if (!t) t = m(".container .list"),
//             t = t[t.length - 1]
//         }
//         if (t && e) f.init({
//             main: t,
//             button: e,
//             filter: S,
//             complete: function(t, e) {
//                 c.add(e.api.replace(/_page_/g, t))
//             }
//         })
//     },
//     exports.initSwipe = function(t) {
//         if (t) {
//             var e = d.getInstance(t);
//             if (e) e.resize().reset()
//         } else m("[data-role=swipe]").forEach(function(t) {
//             new d({
//                 main: g("[data-role=body]", t),
//                 target: g(".list", t)
//             })
//         })
//     },
//     exports.initTabs = function() {
//         var t = this; [].forEach.call(m(".ui-tab"),
//         function(e) {
//             e.addEventListener("click",
//             function(e) {
//                 var i = e.target || e.srcElement;
//                 if (n.hasClass(i, "ui-btn")) {
//                     e.preventDefault();
//                     var r = n.getData(i, "url");
//                     if (r) return void(location.href = r);
//                     var s = n.getData(i, "for"); [].map.call(m(".ui-btn", n.closest(i, ".ui-tab")),
//                     function(e) {
//                         return t[e === i ? "addUIData": "removeUIData"](e, "active"),
//                         n.getData(e, "for")
//                     }).forEach(function(e) {
//                         t[e === s ? "addUIData": "removeUIData"](g("[data-role=" + e + "]"), "active")
//                     })
//                 }
//             },
//             !1)
//         })
//     },
//     exports.initSearch = function() {
//         var t = g(".search > form");
//         if (t) if (this.addEvent(t, "reset submit",
//         function(t) {
//             if ("submit" === t.type && 0 === g("[data-role=input] > input", this).value.trim().length) t.preventDefault();
//             n.removeClass(g(".icon-close", this), "active")
//         },
//         !1), this.addEvent(g("[data-role=input] > input", t), "input focus blur",
//         function(t) {
//             var e = this.value.trim().length > 0;
//             n[e ? "addClass": "removeClass"](g(".icon-close", this.parentNode), "active");
//             var i = t.type;
//             if ("focus" === i || "blur" === i) n["focus" === i || e ? "addClass": "removeClass"](n.closest(this, "form"), "focus")
//         }), this.addEvent(g(".icon-close", this.parentNode), "click",
//         function(t) {
//             t.preventDefault(),
//             n.removeClass(this, "active");
//             var e = g("input", this.parentNode);
//             e.value = "",
//             e.focus()
//         }), g(".tags") && g(".tag-fresh")) this.addEvent(g(".tag-fresh"), "click",
//         function(t) {
//             t.preventDefault();
//             var e = this;
//             if (!n.hasClass(e, "_busy")) n.addClass(e, "_busy"),
//             o.post(n.getData(e, "action")).then(function(t) {
//                 n.removeClass(e, "_busy");
//                 var i;
//                 try {
//                     i = JSON.parse(t)
//                 } catch(r) {}
//                 if (i && 1 === i.status) g(".tags").innerHTML = i.data
//             },
//             function() {
//                 n.removeClass(e, "_busy")
//             })
//         })
//     },
//     exports.initClaim = function() {
//         function e() {
//             s.toggleInput("claim", !1)
//         }
//         function i() {
//             if (!a) {
//                 var t = g("form", u),
//                 e = t.elements,
//                 i = e.nick.value.trim(),
//                 r = e.tel.value.trim(),
//                 l = e.email.value.trim();
//                 if (i.length <= 0) return alert(p("input_claim_name")),
//                 void e.nick.focus();
//                 if (r.length <= 0) return alert(p("input_mobile")),
//                 void e.tel.focus();
//                 if (l.length <= 0) return alert(p("input_email")),
//                 void e.email.focus();
//                 a = !0;
//                 var h = {
//                     gid: e.gid.value,
//                     nick: i,
//                     tel: r,
//                     email: l
//                 };
//                 o.post(t.getAttribute("action"), h).then(function(e) {
//                     a = !1;
//                     try {
//                         e = JSON.parse(e)
//                     } catch(i) {}
//                     if (e && 1 === e.status) t.reset(),
//                     s.toggleInput("claim"),
//                     s.addUIData(n, "disabled"),
//                     n.innerText = p("in_claim");
//                     else alert((e ? e.data: "") || p("server_error"))
//                 },
//                 function() {
//                     a = !1,
//                     alert(p("server_error"))
//                 })
//             }
//         }
//         var n = g("#claimBtn");
//         if (n) {
//             var r = "claimShow";
//             if (location.hash.indexOf(r) >= 0) location.hash = location.hash.replace(r, ""),
//             this.toggleInput("claim", !0);
//             var s = this;
//             n.addEventListener("click",
//             function() {
//                 if (t()) s.toggleInput("claim", !0);
//                 else if (confirm(p("please_login"))) location.href = "http://" + h.HOST_PASSPORT + "/sso/login.html?redirect=" + encodeURIComponent(location.protocol + "//" + location.host + location.pathname + location.search + (location.hash ? location.hash + "&": "#") + r)
//             },
//             !1);
//             var a, u = g("#claimBox");
//             if (u) document.body.appendChild(u),
//             m("[data-role=reset]", u).forEach(function(t) {
//                 t.addEventListener("click", e, !1)
//             }),
//             m("[data-role=submit]", u).forEach(function(t) {
//                 t.addEventListener("click", i, !1)
//             })
//         }
//     },
//     exports.toggleInput = function(t, e) {
//         n[e ? "hide": "show"](g(".container")),
//         [].forEach.call(m("body > .ui-bar"),
//         function(t) {
//             n[e ? "hide": "show"](t)
//         });
//         var i;
//         if ("comment" === t) i = g(".input-box"),
//         n[e ? "show": "hide"](i),
//         g("textarea", i).focus();
//         else if ("claim" === t) i = g("#claimBox"),
//         n[e ? "show": "hide"](i);
//         this.initHideStatusBar()
//     },
//     exports.getUIData = function(t) {
//         if (t) return (n.getData(t, "ui") || "").trim().replace(/\s\s+/g, " ").split(" ");
//         else return []
//     },
//     exports.addUIData = function(t, e) {
//         var i = this.getUIData(t);
//         if (i.length && i.indexOf(e) < 0) i.push(e),
//         n.setData(t, "ui", i.join(" "))
//     },
//     exports.removeUIData = function(t, e) {
//         var i = this.getUIData(t);
//         if (i.length) i = i.filter(function(t) {
//             return t !== e
//         }).join(" "),
//         n.setData(t, "ui", i)
//     },
//     exports.addEvent = function(t, i, n) {
//         return e("add", t, i, n),
//         this
//     },
//     exports.removeEvent = function(t, i, n) {
//         return e("remove", t, i, n),
//         this
//     },
//     exports.renderTpl = function(t, e) {
//         if (!this.render) {
//             var i = require("etpl"),
//             n = new i.Engine;
//             for (var s in S) n.addFilter(s, S[s]);
//             this.render = n.compile(require("./app.tpl"))
//         }
//         return this.render(r({},
//         e, {
//             type: t
//         }))
//     },
//     exports
});
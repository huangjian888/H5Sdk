define(function(){
	//接口文件
	//loginInterface
    function core_md5(e, t) {
		e[t >> 5] |= 128 << t % 32,
		e[(t + 64 >>> 9 << 4) + 14] = t;
		var n = 1732584193,
		r = -271733879,
		i = -1732584194,
		s = 271733878;
		for (var o = 0; o < e.length; o += 16) {
			var u = n,
			a = r,
			f = i,
			l = s;
			n = md5_ff(n, r, i, s, e[o + 0], 7, -680876936),
			s = md5_ff(s, n, r, i, e[o + 1], 12, -389564586),
			i = md5_ff(i, s, n, r, e[o + 2], 17, 606105819),
			r = md5_ff(r, i, s, n, e[o + 3], 22, -1044525330),
			n = md5_ff(n, r, i, s, e[o + 4], 7, -176418897),
			s = md5_ff(s, n, r, i, e[o + 5], 12, 1200080426),
			i = md5_ff(i, s, n, r, e[o + 6], 17, -1473231341),
			r = md5_ff(r, i, s, n, e[o + 7], 22, -45705983),
			n = md5_ff(n, r, i, s, e[o + 8], 7, 1770035416),
			s = md5_ff(s, n, r, i, e[o + 9], 12, -1958414417),
			i = md5_ff(i, s, n, r, e[o + 10], 17, -42063),
			r = md5_ff(r, i, s, n, e[o + 11], 22, -1990404162),
			n = md5_ff(n, r, i, s, e[o + 12], 7, 1804603682),
			s = md5_ff(s, n, r, i, e[o + 13], 12, -40341101),
			i = md5_ff(i, s, n, r, e[o + 14], 17, -1502002290),
			r = md5_ff(r, i, s, n, e[o + 15], 22, 1236535329),
			n = md5_gg(n, r, i, s, e[o + 1], 5, -165796510),
			s = md5_gg(s, n, r, i, e[o + 6], 9, -1069501632),
			i = md5_gg(i, s, n, r, e[o + 11], 14, 643717713),
			r = md5_gg(r, i, s, n, e[o + 0], 20, -373897302),
			n = md5_gg(n, r, i, s, e[o + 5], 5, -701558691),
			s = md5_gg(s, n, r, i, e[o + 10], 9, 38016083),
			i = md5_gg(i, s, n, r, e[o + 15], 14, -660478335),
			r = md5_gg(r, i, s, n, e[o + 4], 20, -405537848),
			n = md5_gg(n, r, i, s, e[o + 9], 5, 568446438),
			s = md5_gg(s, n, r, i, e[o + 14], 9, -1019803690),
			i = md5_gg(i, s, n, r, e[o + 3], 14, -187363961),
			r = md5_gg(r, i, s, n, e[o + 8], 20, 1163531501),
			n = md5_gg(n, r, i, s, e[o + 13], 5, -1444681467),
			s = md5_gg(s, n, r, i, e[o + 2], 9, -51403784),
			i = md5_gg(i, s, n, r, e[o + 7], 14, 1735328473),
			r = md5_gg(r, i, s, n, e[o + 12], 20, -1926607734),
			n = md5_hh(n, r, i, s, e[o + 5], 4, -378558),
			s = md5_hh(s, n, r, i, e[o + 8], 11, -2022574463),
			i = md5_hh(i, s, n, r, e[o + 11], 16, 1839030562),
			r = md5_hh(r, i, s, n, e[o + 14], 23, -35309556),
			n = md5_hh(n, r, i, s, e[o + 1], 4, -1530992060),
			s = md5_hh(s, n, r, i, e[o + 4], 11, 1272893353),
			i = md5_hh(i, s, n, r, e[o + 7], 16, -155497632),
			r = md5_hh(r, i, s, n, e[o + 10], 23, -1094730640),
			n = md5_hh(n, r, i, s, e[o + 13], 4, 681279174),
			s = md5_hh(s, n, r, i, e[o + 0], 11, -358537222),
			i = md5_hh(i, s, n, r, e[o + 3], 16, -722521979),
			r = md5_hh(r, i, s, n, e[o + 6], 23, 76029189),
			n = md5_hh(n, r, i, s, e[o + 9], 4, -640364487),
			s = md5_hh(s, n, r, i, e[o + 12], 11, -421815835),
			i = md5_hh(i, s, n, r, e[o + 15], 16, 530742520),
			r = md5_hh(r, i, s, n, e[o + 2], 23, -995338651),
			n = md5_ii(n, r, i, s, e[o + 0], 6, -198630844),
			s = md5_ii(s, n, r, i, e[o + 7], 10, 1126891415),
			i = md5_ii(i, s, n, r, e[o + 14], 15, -1416354905),
			r = md5_ii(r, i, s, n, e[o + 5], 21, -57434055),
			n = md5_ii(n, r, i, s, e[o + 12], 6, 1700485571),
			s = md5_ii(s, n, r, i, e[o + 3], 10, -1894986606),
			i = md5_ii(i, s, n, r, e[o + 10], 15, -1051523),
			r = md5_ii(r, i, s, n, e[o + 1], 21, -2054922799),
			n = md5_ii(n, r, i, s, e[o + 8], 6, 1873313359),
			s = md5_ii(s, n, r, i, e[o + 15], 10, -30611744),
			i = md5_ii(i, s, n, r, e[o + 6], 15, -1560198380),
			r = md5_ii(r, i, s, n, e[o + 13], 21, 1309151649),
			n = md5_ii(n, r, i, s, e[o + 4], 6, -145523070),
			s = md5_ii(s, n, r, i, e[o + 11], 10, -1120210379),
			i = md5_ii(i, s, n, r, e[o + 2], 15, 718787259),
			r = md5_ii(r, i, s, n, e[o + 9], 21, -343485551),
			n = safe_add(n, u),
			r = safe_add(r, a),
			i = safe_add(i, f),
			s = safe_add(s, l)
		}
		return Array(n, r, i, s)
	}
	function md5_cmn(e, t, n, r, i, s) {
		return safe_add(bit_rol(safe_add(safe_add(t, e), safe_add(r, s)), i), n)
	}
	function md5_ff(e, t, n, r, i, s, o) {
		return md5_cmn(t & n | ~t & r, e, t, i, s, o)
	}
	function md5_gg(e, t, n, r, i, s, o) {
		return md5_cmn(t & r | n & ~r, e, t, i, s, o)
	}
	function md5_hh(e, t, n, r, i, s, o) {
		return md5_cmn(t ^ n ^ r, e, t, i, s, o)
	}
	function md5_ii(e, t, n, r, i, s, o) {
		return md5_cmn(n ^ (t | ~r), e, t, i, s, o)
	}

	function safe_add(e, t) {
		var n = (e & 65535) + (t & 65535),
		r = (e >> 16) + (t >> 16) + (n >> 16);
		return r << 16 | n & 65535
	}
	function bit_rol(e, t) {
		return e << t | e >>> 32 - t
	}
	function str2binl(e) {
		var t = Array(),
		n = (1 << chrsz) - 1;
		for (var r = 0; r < e.length * chrsz; r += chrsz) t[r >> 5] |= (e.charCodeAt(r / chrsz) & n) << r % 32;
		return t
	}

	function binl2hex(e) {
		var t = hexcase ? "0123456789ABCDEF": "0123456789abcdef",
		n = "";
		for (var r = 0; r < e.length * 4; r++) n += t.charAt(e[r >> 2] >> r % 4 * 8 + 4 & 15) + t.charAt(e[r >> 2] >> r % 4 * 8 & 15);
		return n
	}

	var Zepto = function() {
		function e(e) {
			return null == e ? String(e) : V[$.call(e)] || "object"
		}
		function t(t) {
			return "function" == e(t)
		}
		function n(e) {
			return null != e && e == e.window
		}
		function r(e) {
			return null != e && e.nodeType == e.DOCUMENT_NODE
		}
		function i(t) {
			return "object" == e(t)
		}
		function s(e) {
			return i(e) && !n(e) && Object.getPrototypeOf(e) == Object.prototype
		}
		function o(e) {
			return "number" == typeof e.length
		}
		function u(e) {
			return A.call(e,
			function(e) {
				return null != e
			})
		}
		function a(e) {
			return e.length > 0 ? x.fn.concat.apply([], e) : e
		}
		function f(e) {
			return e.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
		}
		function l(e) {
			return e in _ ? _[e] : _[e] = new RegExp("(^|\\s)" + e + "(\\s|$)")
		}
		function c(e, t) {
			return "number" != typeof t || D[f(e)] ? t: t + "px"
		}
		function h(e) {
			var t, n;
			return M[e] || (t = O.createElement(e), O.body.appendChild(t), n = getComputedStyle(t, "").getPropertyValue("display"), t.parentNode.removeChild(t), "none" == n && (n = "block"), M[e] = n),
			M[e]
		}
		function p(e) {
			return "children" in e ? L.call(e.children) : x.map(e.childNodes,
			function(e) {
				return 1 == e.nodeType ? e: void 0
			})
		}
		function d(e, t, n) {
			for (S in t) n && (s(t[S]) || G(t[S])) ? (s(t[S]) && !s(e[S]) && (e[S] = {}), G(t[S]) && !G(e[S]) && (e[S] = []), d(e[S], t[S], n)) : t[S] !== E && (e[S] = t[S])
		}
		function v(e, t) {
			return null == t ? x(e) : x(e).filter(t)
		}
		function m(e, n, r, i) {
			return t(n) ? n.call(e, r, i) : n
		}
		function g(e, t, n) {
			null == n ? e.removeAttribute(t) : e.setAttribute(t, n)
		}
		function y(e, t) {
			var n = e.className,
			r = n && n.baseVal !== E;
			return t === E ? r ? n.baseVal: n: void(r ? n.baseVal = t: e.className = t)
		}
		function b(e) {
			var t;
			try {
				return e ? "true" == e || ("false" == e ? !1 : "null" == e ? null: /^0/.test(e) || isNaN(t = Number(e)) ? /^[\[\{]/.test(e) ? x.parseJSON(e) : e: t) : e
			} catch(n) {
				return e
			}
		}
		function w(e, t) {
			t(e);
			for (var n in e.childNodes) w(e.childNodes[n], t)
		}
		var E, S, x, T, N, C, k = [],
		L = k.slice,
		A = k.filter,
		O = window.document,
		M = {},
		_ = {},
		D = {
			"column-count": 1,
			columns: 1,
			"font-weight": 1,
			"line-height": 1,
			opacity: 1,
			"z-index": 1,
			zoom: 1
		},
		P = /^\s*<(\w+|!)[^>]*>/,
		H = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
		B = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		j = /^(?:body|html)$/i,
		F = /([A-Z])/g,
		I = ["val", "css", "html", "text", "data", "width", "height", "offset"],
		q = ["after", "prepend", "before", "append"],
		R = O.createElement("table"),
		U = O.createElement("tr"),
		z = {
			tr: O.createElement("tbody"),
			tbody: R,
			thead: R,
			tfoot: R,
			td: U,
			th: U,
			"*": O.createElement("div")
		},
		W = /complete|loaded|interactive/,
		X = /^[\w-]*$/,
		V = {},
		$ = V.toString,
		J = {},
		K = O.createElement("div"),
		Q = {
			tabindex: "tabIndex",
			readonly: "readOnly",
			"for": "htmlFor",
			"class": "className",
			maxlength: "maxLength",
			cellspacing: "cellSpacing",
			cellpadding: "cellPadding",
			rowspan: "rowSpan",
			colspan: "colSpan",
			usemap: "useMap",
			frameborder: "frameBorder",
			contenteditable: "contentEditable"
		},
		G = Array.isArray ||
		function(e) {
			return e instanceof Array
		};
		return J.matches = function(e, t) {
			if (!t || !e || 1 !== e.nodeType) return ! 1;
			var n = e.webkitMatchesSelector || e.mozMatchesSelector || e.oMatchesSelector || e.matchesSelector;
			if (n) return n.call(e, t);
			var r, i = e.parentNode,
			s = !i;
			return s && (i = K).appendChild(e),
			r = ~J.qsa(i, t).indexOf(e),
			s && K.removeChild(e),
			r
		},
		N = function(e) {
			return e.replace(/-+(.)?/g,
			function(e, t) {
				return t ? t.toUpperCase() : ""
			})
		},
		C = function(e) {
			return A.call(e,
			function(t, n) {
				return e.indexOf(t) == n
			})
		},
		J.fragment = function(e, t, n) {
			var r, i, o;
			return H.test(e) && (r = x(O.createElement(RegExp.$1))),
			r || (e.replace && (e = e.replace(B, "<$1></$2>")), t === E && (t = P.test(e) && RegExp.$1), t in z || (t = "*"), o = z[t], o.innerHTML = "" + e, r = x.each(L.call(o.childNodes),
			function() {
				o.removeChild(this)
			})),
			s(n) && (i = x(r), x.each(n,
			function(e, t) {
				I.indexOf(e) > -1 ? i[e](t) : i.attr(e, t)
			})),
			r
		},
		J.Z = function(e, t) {
			return e = e || [],
			e.__proto__ = x.fn,
			e.selector = t || "",
			e
		},
		J.isZ = function(e) {
			return e instanceof J.Z
		},
		J.init = function(e, n) {
			var r;
			if (!e) return J.Z();
			if ("string" == typeof e) if (e = e.trim(), "<" == e[0] && P.test(e)) r = J.fragment(e, RegExp.$1, n),
			e = null;
			else {
				if (n !== E) return x(n).find(e);
				r = J.qsa(O, e)
			} else {
				if (t(e)) return x(O).ready(e);
				if (J.isZ(e)) return e;
				if (G(e)) r = u(e);
				else if (i(e)) r = [e],
				e = null;
				else if (P.test(e)) r = J.fragment(e.trim(), RegExp.$1, n),
				e = null;
				else {
					if (n !== E) return x(n).find(e);
					r = J.qsa(O, e)
				}
			}
			return J.Z(r, e)
		},
		x = function(e, t) {
			return J.init(e, t)
		},
		x.extend = function(e) {
			var t, n = L.call(arguments, 1);
			return "boolean" == typeof e && (t = e, e = n.shift()),
			n.forEach(function(n) {
				d(e, n, t)
			}),
			e
		},
		J.qsa = function(e, t) {
			var n, i = "#" == t[0],
			s = !i && "." == t[0],
			o = i || s ? t.slice(1) : t,
			u = X.test(o);
			return r(e) && u && i ? (n = e.getElementById(o)) ? [n] : [] : 1 !== e.nodeType && 9 !== e.nodeType ? [] : L.call(u && !i ? s ? e.getElementsByClassName(o) : e.getElementsByTagName(t) : e.querySelectorAll(t))
		},
		x.contains = function(e, t) {
			return e !== t && e.contains(t)
		},
		x.type = e,
		x.isFunction = t,
		x.isWindow = n,
		x.isArray = G,
		x.isPlainObject = s,
		x.isEmptyObject = function(e) {
			var t;
			for (t in e) return ! 1;
			return ! 0
		},
		x.inArray = function(e, t, n) {
			return k.indexOf.call(t, e, n)
		},
		x.camelCase = N,
		x.trim = function(e) {
			return null == e ? "": String.prototype.trim.call(e)
		},
		x.uuid = 0,
		x.support = {},
		x.expr = {},
		x.map = function(e, t) {
			var n, r, i, s = [];
			if (o(e)) for (r = 0; r < e.length; r++) n = t(e[r], r),
			null != n && s.push(n);
			else for (i in e) n = t(e[i], i),
			null != n && s.push(n);
			return a(s)
		},
		x.each = function(e, t) {
			var n, r;
			if (o(e)) {
				for (n = 0; n < e.length; n++) if (t.call(e[n], n, e[n]) === !1) return e
			} else for (r in e) if (t.call(e[r], r, e[r]) === !1) return e;
			return e
		},
		x.grep = function(e, t) {
			return A.call(e, t)
		},
		window.JSON && (x.parseJSON = JSON.parse),
		x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),
		function(e, t) {
			V["[object " + t + "]"] = t.toLowerCase()
		}),
		x.fn = {
			forEach: k.forEach,
			reduce: k.reduce,
			push: k.push,
			sort: k.sort,
			indexOf: k.indexOf,
			concat: k.concat,
			map: function(e) {
				return x(x.map(this,
				function(t, n) {
					return e.call(t, n, t)
				}))
			},
			slice: function() {
				return x(L.apply(this, arguments))
			},
			ready: function(e) {
				return W.test(O.readyState) && O.body ? e(x) : O.addEventListener("DOMContentLoaded",
				function() {
					e(x)
				},
				!1),
				this
			},
			get: function(e) {
				return e === E ? L.call(this) : this[e >= 0 ? e: e + this.length]
			},
			toArray: function() {
				return this.get()
			},
			size: function() {
				return this.length
			},
			remove: function() {
				return this.each(function() {
					null != this.parentNode && this.parentNode.removeChild(this)
				})
			},
			each: function(e) {
				return k.every.call(this,
				function(t, n) {
					return e.call(t, n, t) !== !1
				}),
				this
			},
			filter: function(e) {
				return t(e) ? this.not(this.not(e)) : x(A.call(this,
				function(t) {
					return J.matches(t, e)
				}))
			},
			add: function(e, t) {
				return x(C(this.concat(x(e, t))))
			},
			is: function(e) {
				return this.length > 0 && J.matches(this[0], e)
			},
			not: function(e) {
				var n = [];
				if (t(e) && e.call !== E) this.each(function(t) {
					e.call(this, t) || n.push(this)
				});
				else {
					var r = "string" == typeof e ? this.filter(e) : o(e) && t(e.item) ? L.call(e) : x(e);
					this.forEach(function(e) {
						r.indexOf(e) < 0 && n.push(e)
					})
				}
				return x(n)
			},
			has: function(e) {
				return this.filter(function() {
					return i(e) ? x.contains(this, e) : x(this).find(e).size()
				})
			},
			eq: function(e) {
				return - 1 === e ? this.slice(e) : this.slice(e, +e + 1)
			},
			first: function() {
				var e = this[0];
				return e && !i(e) ? e: x(e)
			},
			last: function() {
				var e = this[this.length - 1];
				return e && !i(e) ? e: x(e)
			},
			find: function(e) {
				var t, n = this;
				return t = "object" == typeof e ? x(e).filter(function() {
					var e = this;
					return k.some.call(n,
					function(t) {
						return x.contains(t, e)
					})
				}) : 1 == this.length ? x(J.qsa(this[0], e)) : this.map(function() {
					return J.qsa(this, e)
				})
			},
			closest: function(e, t) {
				var n = this[0],
				i = !1;
				for ("object" == typeof e && (i = x(e)); n && !(i ? i.indexOf(n) >= 0 : J.matches(n, e));) n = n !== t && !r(n) && n.parentNode;
				return x(n)
			},
			parents: function(e) {
				for (var t = [], n = this; n.length > 0;) n = x.map(n,
				function(e) {
					return (e = e.parentNode) && !r(e) && t.indexOf(e) < 0 ? (t.push(e), e) : void 0
				});
				return v(t, e)
			},
			parent: function(e) {
				return v(C(this.pluck("parentNode")), e)
			},
			children: function(e) {
				return v(this.map(function() {
					return p(this)
				}), e)
			},
			contents: function() {
				return this.map(function() {
					return L.call(this.childNodes)
				})
			},
			siblings: function(e) {
				return v(this.map(function(e, t) {
					return A.call(p(t.parentNode),
					function(e) {
						return e !== t
					})
				}), e)
			},
			empty: function() {
				return this.each(function() {
					this.innerHTML = ""
				})
			},
			pluck: function(e) {
				return x.map(this,
				function(t) {
					return t[e]
				})
			},
			show: function() {
				return this.each(function() {
					"none" == this.style.display && (this.style.display = ""),
					"none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = h(this.nodeName))
				})
			},
			replaceWith: function(e) {
				return this.before(e).remove()
			},
			wrap: function(e) {
				var n = t(e);
				if (this[0] && !n) var r = x(e).get(0),
				i = r.parentNode || this.length > 1;
				return this.each(function(t) {
					x(this).wrapAll(n ? e.call(this, t) : i ? r.cloneNode(!0) : r)
				})
			},
			wrapAll: function(e) {
				if (this[0]) {
					x(this[0]).before(e = x(e));
					for (var t; (t = e.children()).length;) e = t.first();
					x(e).append(this)
				}
				return this
			},
			wrapInner: function(e) {
				var n = t(e);
				return this.each(function(t) {
					var r = x(this),
					i = r.contents(),
					s = n ? e.call(this, t) : e;
					i.length ? i.wrapAll(s) : r.append(s)
				})
			},
			unwrap: function() {
				return this.parent().each(function() {
					x(this).replaceWith(x(this).children())
				}),
				this
			},
			clone: function() {
				return this.map(function() {
					return this.cloneNode(!0)
				})
			},
			hide: function() {
				return this.css("display", "none")
			},
			toggle: function(e) {
				return this.each(function() {
					var t = x(this); (e === E ? "none" == t.css("display") : e) ? t.show() : t.hide()
				})
			},
			prev: function(e) {
				return x(this.pluck("previousElementSibling")).filter(e || "*")
			},
			next: function(e) {
				return x(this.pluck("nextElementSibling")).filter(e || "*")
			},
			html: function(e) {
				return 0 === arguments.length ? this.length > 0 ? this[0].innerHTML: null: this.each(function(t) {
					var n = this.innerHTML;
					x(this).empty().append(m(this, e, t, n))
				})
			},
			text: function(e) {
				return 0 === arguments.length ? this.length > 0 ? this[0].textContent: null: this.each(function() {
					this.textContent = e === E ? "": "" + e
				})
			},
			attr: function(e, t) {
				var n;
				return "string" == typeof e && t === E ? 0 == this.length || 1 !== this[0].nodeType ? E: "value" == e && "INPUT" == this[0].nodeName ? this.val() : !(n = this[0].getAttribute(e)) && e in this[0] ? this[0][e] : n: this.each(function(n) {
					if (1 === this.nodeType) if (i(e)) for (S in e) g(this, S, e[S]);
					else g(this, e, m(this, t, n, this.getAttribute(e)))
				})
			},
			removeAttr: function(e) {
				return this.each(function() {
					1 === this.nodeType && g(this, e)
				})
			},
			prop: function(e, t) {
				return e = Q[e] || e,
				t === E ? this[0] && this[0][e] : this.each(function(n) {
					this[e] = m(this, t, n, this[e])
				})
			},
			data: function(e, t) {
				var n = this.attr("data-" + e.replace(F, "-$1").toLowerCase(), t);
				return null !== n ? b(n) : E
			},
			val: function(e) {
				return 0 === arguments.length ? this[0] && (this[0].multiple ? x(this[0]).find("option").filter(function() {
					return this.selected
				}).pluck("value") : this[0].value) : this.each(function(t) {
					this.value = m(this, e, t, this.value)
				})
			},
			offset: function(e) {
				if (e) return this.each(function(t) {
					var n = x(this),
					r = m(this, e, t, n.offset()),
					i = n.offsetParent().offset(),
					s = {
						top: r.top - i.top,
						left: r.left - i.left
					};
					"static" == n.css("position") && (s.position = "relative"),
					n.css(s)
				});
				if (0 == this.length) return null;
				var t = this[0].getBoundingClientRect();
				return {
					left: t.left + window.pageXOffset,
					top: t.top + window.pageYOffset,
					width: Math.round(t.width),
					height: Math.round(t.height)
				}
			},
			css: function(t, n) {
				if (arguments.length < 2) {
					var r = this[0],
					i = getComputedStyle(r, "");
					if (!r) return;
					if ("string" == typeof t) return r.style[N(t)] || i.getPropertyValue(t);
					if (G(t)) {
						var s = {};
						return x.each(G(t) ? t: [t],
						function(e, t) {
							s[t] = r.style[N(t)] || i.getPropertyValue(t)
						}),
						s
					}
				}
				var o = "";
				if ("string" == e(t)) n || 0 === n ? o = f(t) + ":" + c(t, n) : this.each(function() {
					this.style.removeProperty(f(t))
				});
				else for (S in t) t[S] || 0 === t[S] ? o += f(S) + ":" + c(S, t[S]) + ";": this.each(function() {
					this.style.removeProperty(f(S))
				});
				return this.each(function() {
					this.style.cssText += ";" + o
				})
			},
			index: function(e) {
				return e ? this.indexOf(x(e)[0]) : this.parent().children().indexOf(this[0])
			},
			hasClass: function(e) {
				return e ? k.some.call(this,
				function(e) {
					return this.test(y(e))
				},
				l(e)) : !1
			},
			addClass: function(e) {
				return e ? this.each(function(t) {
					T = [];
					var n = y(this),
					r = m(this, e, t, n);
					r.split(/\s+/g).forEach(function(e) {
						x(this).hasClass(e) || T.push(e)
					},
					this),
					T.length && y(this, n + (n ? " ": "") + T.join(" "))
				}) : this
			},
			removeClass: function(e) {
				return this.each(function(t) {
					return e === E ? y(this, "") : (T = y(this), m(this, e, t, T).split(/\s+/g).forEach(function(e) {
						T = T.replace(l(e), " ")
					}), void y(this, T.trim()))
				})
			},
			toggleClass: function(e, t) {
				return e ? this.each(function(n) {
					var r = x(this),
					i = m(this, e, n, y(this));
					i.split(/\s+/g).forEach(function(e) { (t === E ? !r.hasClass(e) : t) ? r.addClass(e) : r.removeClass(e)
					})
				}) : this
			},
			scrollTop: function(e) {
				if (this.length) {
					var t = "scrollTop" in this[0];
					return e === E ? t ? this[0].scrollTop: this[0].pageYOffset: this.each(t ?
					function() {
						this.scrollTop = e
					}: function() {
						this.scrollTo(this.scrollX, e)
					})
				}
			},
			scrollLeft: function(e) {
				if (this.length) {
					var t = "scrollLeft" in this[0];
					return e === E ? t ? this[0].scrollLeft: this[0].pageXOffset: this.each(t ?
					function() {
						this.scrollLeft = e
					}: function() {
						this.scrollTo(e, this.scrollY)
					})
				}
			},
			position: function() {
				if (this.length) {
					var e = this[0],
					t = this.offsetParent(),
					n = this.offset(),
					r = j.test(t[0].nodeName) ? {
						top: 0,
						left: 0
					}: t.offset();
					return n.top -= parseFloat(x(e).css("margin-top")) || 0,
					n.left -= parseFloat(x(e).css("margin-left")) || 0,
					r.top += parseFloat(x(t[0]).css("border-top-width")) || 0,
					r.left += parseFloat(x(t[0]).css("border-left-width")) || 0,
					{
						top: n.top - r.top,
						left: n.left - r.left
					}
				}
			},
			offsetParent: function() {
				return this.map(function() {
					for (var e = this.offsetParent || O.body; e && !j.test(e.nodeName) && "static" == x(e).css("position");) e = e.offsetParent;
					return e
				})
			}
		},
		x.fn.detach = x.fn.remove,
		["width", "height"].forEach(function(e) {
			var t = e.replace(/./,
			function(e) {
				return e[0].toUpperCase()
			});
			x.fn[e] = function(i) {
				var s, o = this[0];
				return i === E ? n(o) ? o["inner" + t] : r(o) ? o.documentElement["scroll" + t] : (s = this.offset()) && s[e] : this.each(function(t) {
					o = x(this),
					o.css(e, m(this, i, t, o[e]()))
				})
			}
		}),
		q.forEach(function(t, n) {
			var r = n % 2;
			x.fn[t] = function() {
				var t, i, s = x.map(arguments,
				function(n) {
					return t = e(n),
					"object" == t || "array" == t || null == n ? n: J.fragment(n)
				}),
				o = this.length > 1;
				return s.length < 1 ? this: this.each(function(e, t) {
					i = r ? t: t.parentNode,
					t = 0 == n ? t.nextSibling: 1 == n ? t.firstChild: 2 == n ? t: null,
					s.forEach(function(e) {
						if (o) e = e.cloneNode(!0);
						else if (!i) return x(e).remove();
						w(i.insertBefore(e, t),
						function(e) {
							null == e.nodeName || "SCRIPT" !== e.nodeName.toUpperCase() || e.type && "text/javascript" !== e.type || e.src || window.eval.call(window, e.innerHTML)
						})
					})
				})
			},
			x.fn[r ? t + "To": "insert" + (n ? "Before": "After")] = function(e) {
				return x(e)[t](this),
				this
			}
		}),
		J.Z.prototype = x.fn,
		J.uniq = C,
		J.deserializeValue = b,
		x.zepto = J,
		x
	} ();
	window.Zepto = Zepto,
	void 0 === window.$ && (window.$ = Zepto),
	function(e) {
		function t(e) {
			return e._zid || (e._zid = h++)
		}
		function n(e, n, s, o) {
			if (n = r(n), n.ns) var u = i(n.ns);
			return (m[t(e)] || []).filter(function(e) {
				return ! (!e || n.e && e.e != n.e || n.ns && !u.test(e.ns) || s && t(e.fn) !== t(s) || o && e.sel != o)
			})
		}
		function r(e) {
			var t = ("" + e).split(".");
			return {
				e: t[0],
				ns: t.slice(1).sort().join(" ")
			}
		}
		function i(e) {
			return new RegExp("(?:^| )" + e.replace(" ", " .* ?") + "(?: |$)")
		}
		function s(e, t) {
			return e.del && !y && e.e in b || !!t
		}
		function o(e) {
			return w[e] || y && b[e] || e
		}
		function u(n, i, u, a, l, h, p) {
			var d = t(n),
			v = m[d] || (m[d] = []);
			i.split(/\s/).forEach(function(t) {
				if ("ready" == t) return e(document).ready(u);
				var i = r(t);
				i.fn = u,
				i.sel = l,
				i.e in w && (u = function(t) {
					var n = t.relatedTarget;
					return ! n || n !== this && !e.contains(this, n) ? i.fn.apply(this, arguments) : void 0
				}),
				i.del = h;
				var d = h || u;
				i.proxy = function(e) {
					if (e = f(e), !e.isImmediatePropagationStopped()) {
						e.data = a;
						var t = d.apply(n, e._args == c ? [e] : [e].concat(e._args));
						return t === !1 && (e.preventDefault(), e.stopPropagation()),
						t
					}
				},
				i.i = v.length,
				v.push(i),
				"addEventListener" in n && n.addEventListener(o(i.e), i.proxy, s(i, p))
			})
		}
		function a(e, r, i, u, a) {
			var f = t(e); (r || "").split(/\s/).forEach(function(t) {
				n(e, t, i, u).forEach(function(t) {
					delete m[f][t.i],
					"removeEventListener" in e && e.removeEventListener(o(t.e), t.proxy, s(t, a))
				})
			})
		}
		function f(t, n) {
			return (n || !t.isDefaultPrevented) && (n || (n = t), e.each(T,
			function(e, r) {
				var i = n[e];
				t[e] = function() {
					return this[r] = E,
					i && i.apply(n, arguments)
				},
				t[r] = S
			}), (n.defaultPrevented !== c ? n.defaultPrevented: "returnValue" in n ? n.returnValue === !1 : n.getPreventDefault && n.getPreventDefault()) && (t.isDefaultPrevented = E)),
			t
		}
		function l(e) {
			var t, n = {
				originalEvent: e
			};
			for (t in e) x.test(t) || e[t] === c || (n[t] = e[t]);
			return f(n, e)
		}
		var c, h = 1,
		p = Array.prototype.slice,
		d = e.isFunction,
		v = function(e) {
			return "string" == typeof e
		},
		m = {},
		g = {},
		y = "onfocusin" in window,
		b = {
			focus: "focusin",
			blur: "focusout"
		},
		w = {
			mouseenter: "mouseover",
			mouseleave: "mouseout"
		};
		g.click = g.mousedown = g.mouseup = g.mousemove = "MouseEvents",
		e.event = {
			add: u,
			remove: a
		},
		e.proxy = function(n, r) {
			if (d(n)) {
				var i = function() {
					return n.apply(r, arguments)
				};
				return i._zid = t(n),
				i
			}
			if (v(r)) return e.proxy(n[r], n);
			throw new TypeError("expected function")
		},
		e.fn.bind = function(e, t, n) {
			return this.on(e, t, n)
		},
		e.fn.unbind = function(e, t) {
			return this.off(e, t)
		},
		e.fn.one = function(e, t, n, r) {
			return this.on(e, t, n, r, 1)
		};
		var E = function() {
			return ! 0
		},
		S = function() {
			return ! 1
		},
		x = /^([A-Z]|returnValue$|layer[XY]$)/,
		T = {
			preventDefault: "isDefaultPrevented",
			stopImmediatePropagation: "isImmediatePropagationStopped",
			stopPropagation: "isPropagationStopped"
		};
		e.fn.delegate = function(e, t, n) {
			return this.on(t, e, n)
		},
		e.fn.undelegate = function(e, t, n) {
			return this.off(t, e, n)
		},
		e.fn.live = function(t, n) {
			return e(document.body).delegate(this.selector, t, n),
			this
		},
		e.fn.die = function(t, n) {
			return e(document.body).undelegate(this.selector, t, n),
			this
		},
		e.fn.on = function(t, n, r, i, s) {
			var o, f, h = this;
			return t && !v(t) ? (e.each(t,
			function(e, t) {
				h.on(e, n, r, t, s)
			}), h) : (v(n) || d(i) || i === !1 || (i = r, r = n, n = c), (d(r) || r === !1) && (i = r, r = c), i === !1 && (i = S), h.each(function(c, h) {
				s && (o = function(e) {
					return a(h, e.type, i),
					i.apply(this, arguments)
				}),
				n && (f = function(t) {
					var r, s = e(t.target).closest(n, h).get(0);
					return s && s !== h ? (r = e.extend(l(t), {
						currentTarget: s,
						liveFired: h
					}), (o || i).apply(s, [r].concat(p.call(arguments, 1)))) : void 0
				}),
				u(h, t, i, r, n, f || o)
			}))
		},
		e.fn.off = function(t, n, r) {
			var i = this;
			return t && !v(t) ? (e.each(t,
			function(e, t) {
				i.off(e, n, t)
			}), i) : (v(n) || d(r) || r === !1 || (r = n, n = c), r === !1 && (r = S), i.each(function() {
				a(this, t, r, n)
			}))
		},
		e.fn.trigger = function(t, n) {
			return t = v(t) || e.isPlainObject(t) ? e.Event(t) : f(t),
			t._args = n,
			this.each(function() {
				"dispatchEvent" in this ? this.dispatchEvent(t) : e(this).triggerHandler(t, n)
			})
		},
		e.fn.triggerHandler = function(t, r) {
			var i, s;
			return this.each(function(o, u) {
				i = l(v(t) ? e.Event(t) : t),
				i._args = r,
				i.target = u,
				e.each(n(u, t.type || t),
				function(e, t) {
					return s = t.proxy(i),
					i.isImmediatePropagationStopped() ? !1 : void 0
				})
			}),
			s
		},
		"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(t) {
			e.fn[t] = function(e) {
				return e ? this.bind(t, e) : this.trigger(t)
			}
		}),
		["focus", "blur"].forEach(function(t) {
			e.fn[t] = function(e) {
				return e ? this.bind(t, e) : this.each(function() {
					try {
						this[t]()
					} catch(e) {}
				}),
				this
			}
		}),
		e.Event = function(e, t) {
			v(e) || (t = e, e = t.type);
			var n = document.createEvent(g[e] || "Events"),
			r = !0;
			if (t) for (var i in t)"bubbles" == i ? r = !!t[i] : n[i] = t[i];
			return n.initEvent(e, r, !0),
			f(n)
		}
	} (Zepto),
	function(t) {
		function l(e, n, r) {
			var i = t.Event(n);
			return t(e).trigger(i, r),
			!i.isDefaultPrevented()
		}
		function h(e, t, r, i) {
			return e.global ? l(t || n, r, i) : void 0
		}
		function p(e) {
			e.global && 0 === t.active++&&h(e, null, "ajaxStart")
		}
		function d(e) {
			e.global && !--t.active && h(e, null, "ajaxStop")
		}
		function m(e, t) {
			var n = t.context;
			return t.beforeSend.call(n, e, t) === !1 || h(t, n, "ajaxBeforeSend", [e, t]) === !1 ? !1 : void h(t, n, "ajaxSend", [e, t])
		}
		function g(e, t, n, r) {
			var i = n.context,
			s = "success";
			n.success.call(i, e, s, t),
			r && r.resolveWith(i, [e, s, t]),
			h(n, i, "ajaxSuccess", [t, n, e]),
			y(s, t, n)
		}
		function v(e, t, n, r, i) {
			var s = r.context;
			r.error.call(s, n, t, e),
			i && i.rejectWith(s, [n, t, e]),
			h(r, s, "ajaxError", [n, r, e || t]),
			y(t, n, r)
		}
		function y(e, t, n) {
			var r = n.context;
			n.complete.call(r, t, e),
			h(n, r, "ajaxComplete", [t, n]),
			d(n)
		}
		function x() {}
		function b(e) {
			return e && (e = e.split(";", 2)[0]),
			e && (e == f ? "html": e == u ? "json": s.test(e) ? "script": a.test(e) && "xml") || "text"
		}
		function w(e, t) {
			return "" == t ? e: (e + "&" + t).replace(/[&?]{1,2}/, "?")
		}
		function E(e) {
			e.processData && e.data && "string" != t.type(e.data) && (e.data = t.param(e.data, e.traditional)),
			!e.data || e.type && "GET" != e.type.toUpperCase() || (e.url = w(e.url, e.data), e.data = void 0)
		}
		function j(e, n, r, i) {
			return t.isFunction(n) && (i = r, r = n, n = void 0),
			t.isFunction(r) || (i = r, r = void 0),
			{
				url: e,
				data: n,
				success: r,
				dataType: i
			}
		}
		function S(e, n, r, i) {
			var s, o = t.isArray(n),
			u = t.isPlainObject(n);
			t.each(n,
			function(n, f) {
				s = t.type(f),
				i && (n = r ? i: i + "[" + (u || "object" == s || "array" == s ? n: "") + "]"),
				!i && o ? e.add(f.name, f.value) : "array" == s || !r && "object" == s ? S(e, f, r, n) : e.add(n, f)
			})
		}
		var i, r, e = 0,
		n = window.document,
		o = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
		s = /^(?:text|application)\/javascript/i,
		a = /^(?:text|application)\/xml/i,
		u = "application/json",
		f = "text/html",
		c = /^\s*$/;
		t.active = 0,
		t.ajaxJSONP = function(r, i) {
			if ("type" in r) {
				var s, o, u = r.jsonpCallback,
				a = (t.isFunction(u) ? u() : u) || "jsonp" + ++e,
				f = n.createElement("script"),
				l = window[a],
				c = function(e) {
					t(f).triggerHandler("error", e || "abort")
				},
				h = {
					abort: c
				};
				return i && i.promise(h),
				t(f).on("load error",
				function(e, n) {
					clearTimeout(o),
					t(f).off().remove(),
					"error" != e.type && s ? g(s[0], h, r, i) : v(null, n || "error", h, r, i),
					window[a] = l,
					s && t.isFunction(l) && l(s[0]),
					l = s = void 0
				}),
				m(h, r) === !1 ? (c("abort"), h) : (window[a] = function() {
					s = arguments
				},
				f.src = r.url.replace(/\?(.+)=\?/, "?$1=" + a), n.head.appendChild(f), r.timeout > 0 && (o = setTimeout(function() {
					c("timeout")
				},
				r.timeout)), h)
			}
			return t.ajax(r)
		},
		t.ajaxSettings = {
			type: "GET",
			beforeSend: x,
			success: x,
			error: x,
			complete: x,
			context: null,
			global: !0,
			xhr: function() {
				return new window.XMLHttpRequest
			},
			accepts: {
				script: "text/javascript, application/javascript, application/x-javascript",
				json: u,
				xml: "application/xml, text/xml",
				html: f,
				text: "text/plain"
			},
			crossDomain: !1,
			timeout: 0,
			processData: !0,
			cache: !0
		},
		t.ajax = function(e) {
			var n = t.extend({},
			e || {}),
			o = t.Deferred && t.Deferred();
			for (i in t.ajaxSettings) void 0 === n[i] && (n[i] = t.ajaxSettings[i]);
			p(n),
			n.crossDomain || (n.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(n.url) && RegExp.$2 != window.location.host),
			n.url || (n.url = window.location.toString()),
			E(n),
			n.cache === !1 && (n.url = w(n.url, "_=" + Date.now()));
			var s = n.dataType,
			a = /\?.+=\?/.test(n.url);
			if ("jsonp" == s || a) return a || (n.url = w(n.url, n.jsonp ? n.jsonp + "=?": n.jsonp === !1 ? "": "callback=?")),
			t.ajaxJSONP(n, o);
			var j, u = n.accepts[s],
			f = {},
			l = function(e, t) {
				f[e.toLowerCase()] = [e, t]
			},
			h = /^([\w-]+:)\/\//.test(n.url) ? RegExp.$1: window.location.protocol,
			d = n.xhr(),
			y = d.setRequestHeader;
			if (o && o.promise(d), n.crossDomain || l("X-Requested-With", "XMLHttpRequest"), l("Accept", u || "*/*"), (u = n.mimeType || u) && (u.indexOf(",") > -1 && (u = u.split(",", 2)[0]), d.overrideMimeType && d.overrideMimeType(u)), (n.contentType || n.contentType !== !1 && n.data && "GET" != n.type.toUpperCase()) && l("Content-Type", n.contentType || "application/x-www-form-urlencoded"), n.headers) for (r in n.headers) l(r, n.headers[r]);
			if (d.setRequestHeader = l, d.onreadystatechange = function() {
				if (4 == d.readyState) {
					d.onreadystatechange = x,
					clearTimeout(j);
					var e, i = !1;
					if (d.status >= 200 && d.status < 300 || 304 == d.status || 0 == d.status && "file:" == h) {
						s = s || b(n.mimeType || d.getResponseHeader("content-type")),
						e = d.responseText;
						try {
							"script" == s ? (1, eval)(e) : "xml" == s ? e = d.responseXML: "json" == s && (e = c.test(e) ? null: t.parseJSON(e))
						} catch(r) {
							i = r
						}
						i ? v(i, "parsererror", d, n, o) : g(e, d, n, o)
					} else v(d.statusText || null, d.status ? "error": "abort", d, n, o)
				}
			},
			m(d, n) === !1) return d.abort(),
			v(null, "abort", d, n, o),
			d;
			if (n.xhrFields) for (r in n.xhrFields) d[r] = n.xhrFields[r];
			var T = "async" in n ? n.async: !0;
			d.open(n.type, n.url, T, n.username, n.password);
			for (r in f) y.apply(d, f[r]);
			return n.timeout > 0 && (j = setTimeout(function() {
				d.onreadystatechange = x,
				d.abort(),
				v(null, "timeout", d, n, o)
			},
			n.timeout)),
			d.send(n.data ? n.data: null),
			d
		},
		t.get = function() {
			return t.ajax(j.apply(null, arguments))
		},
		t.post = function() {
			var e = j.apply(null, arguments);
			return e.type = "POST",
			t.ajax(e)
		},
		t.getJSON = function() {
			var e = j.apply(null, arguments);
			return e.dataType = "json",
			t.ajax(e)
		},
		t.fn.load = function(e, n, r) {
			if (!this.length) return this;
			var i, s = this,
			u = e.split(/\s/),
			a = j(e, n, r),
			f = a.success;
			return u.length > 1 && (a.url = u[0], i = u[1]),
			a.success = function(e) {
				s.html(i ? t("<div>").html(e.replace(o, "")).find(i) : e),
				f && f.apply(s, arguments)
			},
			t.ajax(a),
			this
		};
		var T = encodeURIComponent;
		t.param = function(e, t) {
			var n = [];
			return n.add = function(e, t) {
				this.push(T(e) + "=" + T(t))
			},
			S(n, e, t),
			n.join("&").replace(/%20/g, "+")
		}
	} (Zepto),
	function(e) {
		e.fn.serializeArray = function() {
			var n, r = [];
			return e([].slice.call(this.get(0).elements)).each(function() {
				n = e(this);
				var i = n.attr("type");
				"fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != i && "reset" != i && "button" != i && ("radio" != i && "checkbox" != i || this.checked) && r.push({
					name: n.attr("name"),
					value: n.val()
				})
			}),
			r
		},
		e.fn.serialize = function() {
			var e = [];
			return this.serializeArray().forEach(function(n) {
				e.push(encodeURIComponent(n.name) + "=" + encodeURIComponent(n.value))
			}),
			e.join("&")
		},
		e.fn.submit = function(n) {
			if (n) this.bind("submit", n);
			else if (this.length) {
				var r = e.Event("submit");
				this.eq(0).trigger(r),
				r.isDefaultPrevented() || this.get(0).submit()
			}
			return this
		}
	} (Zepto),
	function(e) {
		"__proto__" in {} || e.extend(e.zepto, {
			Z: function(t, n) {
				return t = t || [],
				e.extend(t, e.fn),
				t.selector = n || "",
				t.__Z = !0,
				t
			},
			isZ: function(t) {
				return "array" === e.type(t) && "__Z" in t
			}
		});
		try {
			getComputedStyle(void 0)
		} catch(t) {
			var n = getComputedStyle;
			window.getComputedStyle = function(e) {
				try {
					return n(e)
				} catch(t) {
					return null
				}
			}
		}
	} (Zepto);
	var hexcase = 0,
	chrsz = 8,
	QHPass = window.QHPass || {};
	(function() {
		QHPass.loadCss = function(e) {
			var t = document.getElementsByTagName("head")[0] || document.documentElement,
			n = document.createElement("link");
			n.rel = "stylesheet",
			n.type = "text/css",
			n.href = e,
			t.insertBefore(n, t.firstChild)
		},
		QHPass.loadJs = function(e, t, n) {
			n = n || {};
			var r = document.getElementsByTagName("head")[0] || document.documentElement,
			i = document.createElement("script"),
			s = !1;
			i.src = e,
			n.charset && (i.charset = n.charset),
			i.onerror = i.onload = i.onreadystatechange = function() { ! s && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") && (s = !0, t && t(), i.onerror = i.onload = i.onreadystatechange = null, r.removeChild(i))
			},
			r.insertBefore(i, r.firstChild)
		},
		QHPass.loadJsonp = function() {
			var e = new Date * 1;
			return function(t, n, r) {
				r = r || {};
				var i = "QiUserJsonP" + e++,
				s = r.callbackReplacer || /%callbackfun%/ig;
				window[i] = function(e) {
					n && n(e),
					window[i] = null
				},
				s.test(t) ? t = t.replace(s, i) : t += (/\?/.test(t) ? "&": "?") + "callback=" + i,
				QHPass.loadJs(t, null, r)
			}
		} (),
		QHPass.CrossDomainRequest = function(e, t, n, r) {
			var i = +(new Date),
			s = "";
			typeof n == "string" ? s = n: (s = "_CrossDomainCallback" + i, window[s] = function() {
				var e = decodeURIComponent(arguments[0]);
				return o.parentNode.removeChild(o),
				n(e)
			});
			var o = document.createElement("div");
			o.innerHTML = '<iframe style="display:none" id="_CrossDomainiframe' + i + '" name="' + "_CrossDomainiframe" + i + '" src=""></iframe>',
			document.body.appendChild(o);
			var u = document.createElement("FORM");
			u.style.display = "none",
			u.method = r || "post",
			u.target = "_CrossDomainiframe" + i,
			u.action = e;
			var a = [];
			a.push('<input type="hidden" name="callback" value="' + s + '" />'),
			a.push('<input type="hidden" name="proxy" value="http://' + location.host + '/psp_jump.html" />'),
			u.innerHTML = a.join("");
			for (var f in t) {
				var l = document.createElement("input");
				l.setAttribute("type", "hidden"),
				l.setAttribute("name", f),
				l.setAttribute("value", t[f]),
				u.appendChild(l)
			}
			document.body.appendChild(u),
			u.submit(),
			u.parentNode.removeChild(u)
		},
		QHPass.Cookie = QHPass.Cookie || {},
		QHPass.Cookie.get = function(e) {
			var t, n = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
			try {
				return (t = document.cookie.match(n)) ? decodeURIComponent(t[2]) : null
			} catch(r) {
				return null
			}
		},
		QHPass.Cookie.set = function(e, t, n, r) {
			var i = new Date;
			i.setTime(i.getTime() + n);
			var s = e + "=" + encodeURIComponent(t) + ";expires=" + i.toGMTString() + ";path=/;";
			r && r != "localhost" && (s += "domain=" + r),
			document.cookie = s
		},
		QHPass.Cookie.del = function(e) {
			QHPass.Cookie.set(e, "")
		},
		QHPass.getUserInfo = function(e, t) {
			var n = location.host.match(/1360\.com|360\.cn|qihoo\.com|woxihuan\.com|yunpan\.cn|360kan\.com/ig),
			r = n && n[0] && "http://login." + n[0] + "/?o=sso&m=info&func=%callbackfun%&show_name_flag=1";
			r && QHPass.loadJsonp(r,
			function(n) {
				n.qid ? e && e() : t && t()
			})
		},
		QHPass.trim = function(e) {
			return e && e.replace(/^\s+|\s+$/g, "")
		},
		QHPass.queryUrl = function(e, t) {
			e = e.replace(/^[^?=]*\?/ig, "").split("#")[0];
			var n = {};
			return e.replace(/(^|&)([^&=]+)=([^&]*)/g,
			function(e, t, r, i) {
				try {
					r = decodeURIComponent(r),
					i = decodeURIComponent(i)
				} catch(s) {}
				r in n ? n[r] instanceof Array ? n[r].push(i) : n[r] = [n[r], i] : n[r] = /\[\]$/.test(r) ? [i] : i
			}),
			t ? n[t] : n
		},
		QHPass.ajax = function(e) {
			var t = e.flagfun,
			n = {
				type: "POST",
				timeout: 2e4,
				error: function(e, n, r) {
					n == "timeout" ? $.dialog({
						time: 2,
						msgType: "wrong",
						content: "\u9875\u9762\u8bf7\u6c42\u8d85\u65f6\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff01",
						callback: function() {
							t ? t && t() : window.location.reload(!0)
						}
					}).show() : $.dialog({
						time: 2,
						msgType: "wrong",
						content: "\u7f51\u7edc\u5f02\u5e38\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff01",
						callback: function() {
							t ? t && t() : window.location.reload(!0)
						}
					}).show()
				}
			},
			r = $.extend(n, e);
			$.ajax(r)
		},
		$(document.body).delegate(".psp-monitor", "click",
		function(e) {
			var t = e.target,
			n = {
				cId: monitor.util.getContainerId(t),
				c: t.getAttribute("data-pspclick")
			};
			monitor.log(n, "click")
		}),
		QHPass.pspLog = function(e) {
			monitor.log(e, "click")
		},
		QHPass.wpo = function() {
			var e;
			$(function() {
				e = new Date
			}),
			monitor.setConf("wpoUrl", "http://s.360.cn/w360/p.htm"),
			$(window).on("load",
			function() {
				var t = {
					t0: e - G_start_time,
					t1: new Date - G_start_time
				};
				monitor.log(t, "wpo")
			})
		},
		$("#currentYear").html((new Date).getFullYear())
	})(),
	function(e) {
		"use strict";
		var t = e.ERROR = {
			REALNAME_EMPTY: {
				errno: 204,
				errmsg: "\u8bf7\u8f93\u5165\u771f\u5b9e\u59d3\u540d"
			},
			REALNAME_INVALID: {
				errno: 227,
				errmsg: "\u771f\u5b9e\u59d3\u540d\u8f93\u5165\u6709\u8bef"
			},
			ACCOUNT_EMPTY: {
				errno: 1030,
				errmsg: "\u8bf7\u8f93\u5165\u60a8\u7684\u5e10\u53f7"
			},
			ACCOUNT_INVALID: {
				errno: 1035,
				errmsg: "\u8bf7\u786e\u8ba4\u5e10\u53f7\u8f93\u5165\u662f\u5426\u6709\u8bef"
			},
			USERNAME_DUPLICATE: {
				errno: 213,
				errmsg: "\u7528\u6237\u540d\u5df2\u7ecf\u88ab\u4f7f\u7528"
			},
			USERNAME_EMPTY: {
				errno: 215,
				errmsg: "\u8bf7\u8f93\u5165\u7528\u6237\u540d"
			},
			USERNAME_INVALID: {
				errno: 225,
				errmsg: "\u7528\u6237\u540d\u4e0d\u80fd\u4f7f\u7528\u7279\u6b8a\u5b57\u7b26"
			},
			NICKNAME_EMPTY: {
				errno: 205,
				errmsg: "\u8bf7\u8f93\u5165\u6635\u79f0"
			},
			NICKNAME_DUPLICATE: {
				errno: 260,
				errmsg: "\u6635\u79f0\u5df2\u7ecf\u88ab\u4f7f\u7528"
			},
			NICKNAME_INVALID: {
				errno: 226,
				errmsg: "\u6635\u79f0\u4e0d\u80fd\u4f7f\u7528\u7279\u6b8a\u5b57\u7b26"
			},
			NICKNAME_TOO_SHORT: {
				errno: 15e3,
				errmsg: "\u6635\u79f0\u5e94\u4e3a2-14\u4e2a\u5b57\u7b26"
			},
			EMAIL_EMPTY: {
				errno: 203,
				errmsg: "\u8bf7\u8f93\u5165\u90ae\u7bb1"
			},
			EMAIL_INVALID: {
				errno: 1532,
				errmsg: "\u90ae\u7bb1\u683c\u5f0f\u9519\u8bef"
			},
			MOBILE_EMPTY: {
				errno: 1107,
				errmsg: "\u8bf7\u8f93\u5165\u624b\u673a\u53f7"
			},
			MOBILE_INVALID: {
				errno: 1100,
				errmsg: "\u624b\u673a\u53f7\u683c\u5f0f\u9519\u8bef"
			},
			CAPTCHA_INVALID: {
				errno: 75e3,
				errmsg: "\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801"
			},
			CAPTCHA_APPID_INVALID: {
				errno: 1300,
				errmsg: "\u9a8c\u8bc1\u7801\u683c\u5f0f\u6709\u8bef"
			},
			SMS_TOKEN_EMPTY: {
				errno: 1350,
				errmsg: "\u8bf7\u8f93\u5165\u6821\u9a8c\u7801"
			},
			SMS_TOKEN_INCORRECT: {
				errno: 1351,
				errmsg: "\u6821\u9a8c\u7801\u683c\u5f0f\u4e0d\u6b63\u786e"
			},
			IDNUMBER_EMPTY: {
				errno: "ms100",
				errmsg: "\u8bf7\u8f93\u5165\u8bc1\u4ef6\u53f7\u7801"
			},
			IDNUMBER_INVALID: {
				errno: "ms100",
				errmsg: "\u8bf7\u6b63\u786e\u586b\u5199\u8bc1\u4ef6\u53f7\u7801"
			},
			AREAR_INVALID: {
				errno: "ms100",
				errmsg: "\u8bf7\u9009\u62e9\u6b63\u786e\u7684\u5e38\u9a7b\u7701\u5e02"
			},
			ADDRESS_EMPTY: {
				errono: "ms100",
				errmsg: "\u8bf7\u8f93\u5165\u8054\u7cfb\u5730\u5740"
			},
			ZIPCODE_EMPTY: {
				errno: "ms100",
				errmsg: "\u8bf7\u8f93\u5165\u90ae\u653f\u7f16\u7801"
			},
			ZIPCODE_INVALIDE: {
				errno: "ms100",
				errmsg: "\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u90ae\u653f\u7f16\u7801"
			},
			DATE_INVALID: {
				errno: "ms100",
				errmsg: "\u8bf7\u9009\u62e9\u6b63\u786e\u7684\u65e5\u671f"
			},
			PASSWORD_EMPTY: {
				errno: 211,
				errmsg: "\u8bf7\u8f93\u5165\u5bc6\u7801"
			},
			PASSWORD_INVALID: {
				errno: 1065,
				errmsg: "\u5bc6\u7801\u4e3a6-20\u4e2a\u5b57\u7b26"
			},
			PASSWORD_LEVEL_LOW: {
				errno: 1070,
				errmsg: "\u5bc6\u7801\u5b89\u5168\u7ea7\u522b\u8fc7\u4f4e"
			},
			PASSWORD_WEAK: {
				errno: 1070,
				errmsg: "\u5bc6\u7801\u5f31\uff0c\u6709\u98ce\u9669\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165"
			},
			PASSWORD_ORDERED: {
				errno: 1070,
				errmsg: "\u5bc6\u7801\u4e0d\u80fd\u4e3a\u8fde\u7eed\u5b57\u7b26"
			},
			PASSWORD_CHAR_REPEAT: {
				errno: 1070,
				errmsg: "\u5bc6\u7801\u4e0d\u80fd\u5168\u4e3a\u76f8\u540c\u5b57\u7b26"
			},
			PASSWORD_WRONG: {
				errno: 220,
				errmsg: "\u767b\u5f55\u5bc6\u7801\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165"
			},
			PASSWORD_NOT_MATCH: {
				errno: 1091,
				errmsg: "\u4e24\u6b21\u5bc6\u7801\u8f93\u5165\u4e0d\u4e00\u81f4"
			},
			UNKNOWN_ERROR: {
				errno: 99999,
				errmsg: "\u672a\u77e5\u9519\u8bef"
			},
			SUCCESS: {
				errno: 0,
				errmsg: "\u64cd\u4f5c\u6210\u529f"
			},
			TIME_OUT: {
				errno: 1,
				errmsg: "\u7f51\u7edc\u8d85\u65f6"
			}
		},
		n = e.utils = e.utils || {},
		r = {};
		$(t).each(function(e) {
			r[e.errno] = e.errmsg
		}),
		n.isSameError = function(e, t) {
			return e.errno === undefined || t.errno === undefined ? !1 : e.errno === t.errno
		},
		n.defineError = function(e, n) {
			var i;
			for (var s in t) t.hasOwnProperty(s) && t[s].errno == e && (i = t[s], i.errmsg = n);
			r[e] = n
		},
		n.getErrorMsg = function(e, t) {
			return $.isPlainObject(e) && (t = e.errmsg, e = e.errno),
			r[e] || t
		},
		n.getErrorType = function(e) {
			e = e.errno || e;
			switch (e) {
			case t.MOBILE_EMPTY.errno:
			case t.MOBILE_INVALID.errno:
				return "mobile";
			case t.EMAIL_EMPTY.errno:
			case t.EMAIL_INVALID.errno:
				return "email";
			case t.USERNAME_EMPTY.errno:
			case t.USERNAME_INVALID.errno:
			case t.USERNAME_DUPLICATE.errno:
				return "username";
			case t.NICKNAME_EMPTY.errno:
			case t.NICKNAME_INVALID.errno:
			case t.NICKNAME_TOO_SHORT.errno:
			case t.NICKNAME_DUPLICATE.errno:
				return "nickname";
			case t.PASSWORD_INVALID.errno:
			case t.PASSWORD_EMPTY.errno:
			case t.PASSWORD_CHAR_REPEAT.errno:
			case t.PASSWORD_ORDERED.errno:
			case t.PASSWORD_WEAK.errno:
			case t.PASSWORD_WRONG.errno:
			case t.PASSWORD_LEVEL_LOW.errno:
				return "password";
			case t.PASSWORD_NOT_MATCH.errno:
				return "password-again";
			case t.SMS_TOKEN_EMPTY.errno:
			case t.SMS_TOKEN_INCORRECT.errno:
				return "sms-token"
			}
			return e >= 1e4 && e < 15e3 ? "username": e >= 15e3 && e < 2e4 ? "nickname": e >= 2e4 && e < 3e4 ? "email": e >= 3e4 && e < 45e3 ? "mobile": e >= 5e4 && e < 55e3 ? "password": e >= 55e3 && e < 6e4 ? "sec-email": "other"
		}
	} (QHPass),
	function(e, t) {
		"use strict";
		function r(e) {
			return String(e).replace(/[^\x00-\xff]/g, "--").length
		}
		function i(e, t, n) {
			var i = r(e);
			return t <= i && i <= n
		}
		function s(e) {
			return e = e === undefined ? "": e,
			e.length == 0
		}
		function o(e) {
			e = String(e);
			var t = e.length,
			n = null,
			r;
			for (var i = 1; i < t; i++) {
				r = e.charCodeAt(i) - e.charCodeAt(i - 1);
				if (n !== null && n !== r || Math.abs(r) > 1) return ! 1;
				n = r
			}
			return ! 0
		}
		function u(e) {
			var n = [],
			r;
			if (!t.isArray(e)) throw new Error("TypeError: not Array");
			e = e.sort();
			if (e.length == 1) return e;
			for (var i = 1,
			s = 0; r = e[i]; i++) r === e[i - 1] && (s = n.push(i));
			while (s--) e.splice(n[s], 1);
			return e
		}
		function f(e) {
			e = String(e);
			var n = e.length,
			r = e.split(""),
			i = t.unique(r),
			s;
			if (n >= 21 || n <= 5) return - 1;
			if (i.length == 1) return - 2;
			if (o(e)) return - 3;
			if (a.join("#").indexOf("#" + e + "#") > -1) return - 4;
			var u = {
				d: 0,
				c: 0,
				o: 0
			};
			return t.each(i,
			function(e, t) { / \d / .test(t) ? u.d = 1 : /[a-zA-Z]/.test(t) ? u.c = 1 : u.o = 1
			}),
			s = u.d + u.c + u.o + (n > 9 ? 2 : 1),
			s = Math.max(3, s),
			s
		}
		var n = e.ERROR;
		t.unique = t.unique || u;
		var a = ["", "abcabc", "abc123", "a1b2c3", "aaa111", "123abc", "123456abc", "abc123456", "qwerty", "qwertyuiop", "qweasd", "123qwe", "1qaz2wsx", "1q2w3e4r", "1q2w3e4r5t", "asdasd", "asdfgh", "asdfghjkl", "zxcvbn", "qazwsxedc", "qq123456", "admin", "password", "p@ssword", "passwd", "Password", "Passwd", "Iloveyou", "Woaini", "iloveyou", "Wodemima", "Woaiwojia", "tamade", "nimade", "123789", "1234560", "123465", "123321", "102030", "100200", "4655321", "987654", "123123", "123123123", "121212", "111222", "12301230", "168168", "456456", "321321", "521521", "5201314", "520520", "201314", "211314", "7758258", "7758521", "1314520", "1314521", "147258369", "147852369", "159357", "741852", "741852963", "654321", "852963", "963852741", "115415", "123000", ""];
		QHPass.validate = {
			checkRealName: function(e) {
				return e = t.trim(e),
				s(e) ? n.REALNAME_EMPTY: /^[\u4e00-\u9fa5]{2,5}$/.test(e) ? !1 : n.REALNAME_INVALID
			},
			checkUsername: function(e) {
				return e = t.trim(e),
				s(e) ? n.USERNAME_EMPTY: /^[\w\u4e00-\u9fa5\.]{2,14}$/.test(e) ? !1 : n.USERNAME_INVALID
			},
			checkNickname: function(e) {
				return e = t.trim(e),
				s(e) ? n.NICKNAME_EMPTY: i(e, 2, 14) ? /^[\w\u4e00-\u9fa5\.]{2,14}$/.test(e) ? !1 : n.NICKNAME_INVALID: n.NICKNAME_TOO_SHORT
			},
			checkEmail: function(e) {
				var r = /^[a-z0-9](?:[\w.\-+]*[a-z0-9])?@[a-z0-9][\w.]*\.[a-z]{2,8}$/i;
				return e = t.trim(e),
				s(e) ? n.EMAIL_EMPTY: r.test(e) ? !1 : n.EMAIL_INVALID
			},
			checkMobile: function(e) {
				return e = t.trim(e),
				s(e) ? n.MOBILE_EMPTY: /^0?1[345789]\d{9}$/.test(e) ? !1 : n.MOBILE_INVALID
			},
			checkAccount: function(e) {
				return e.length == 0 ? n.ACCOUNT_EMPTY: this.checkUsername(e) && this.checkEmail(e) && this.checkMobile(e) ? n.ACCOUNT_INVALID: !1
			},
			checkCaptcha: function(e) {
				return e = t.trim(e),
				s(e) ? n.CAPTCHA_INVALID: !1
			},
			checkSmsToken: function(e) {
				return e = t.trim(e),
				s(e) ? n.SMS_TOKEN_EMPTY: e.length != 6 || isNaN(e) ? n.SMS_TOKEN_INCORRECT: !1
			},
			checkPassword: function(e) {
				if (s(e)) return n.PASSWORD_EMPTY;
				switch (f(e)) {
				case - 1 : return n.PASSWORD_INVALID;
				case - 2 : return n.PASSWORD_CHAR_REPEAT;
				case - 3 : return n.PASSWORD_ORDERED;
				case - 4 : return n.PASSWORD_WEAK;
				default:
					return ! 1
				}
			},
			evaluatePassword: function(e) {
				return f(e)
			},
			checkPasswordConfirm: function(e, t) {
				return e === t ? !1 : n.PASSWORD_NOT_MATCH
			},
			checkIdNumber: function(n, r) {
				n = t.trim(n);
				if (s(n)) return e.ERROR.IDNUMBER_EMPTY;
				switch (r) {
				case "idCard":
					var i = isCnNewID(n);
					if (n.length == 15) {
						var o = idCardOldTowNew(n);
						i = isCnNewID(o)
					}
					if (!i) return e.ERROR.IDNUMBER_INVALID
				}
				return ! 1
			},
			checkDate: function(t, n, r) {
				return t != -1 && n != -1 && r != -1 ? !1 : e.ERROR.DATE_INVALID
			},
			checkProvinceCity: function(n, r) {
				return n = t.trim(n),
				r = t.trim(r),
				n != -2 && r != -2 ? !1 : e.ERROR.AREAR_INVALID
			},
			checkAddress: function(n) {
				return n = t.trim(n),
				s(n) ? e.ERROR.ADDRESS_EMPTY: !1
			},
			checkZipcode: function(n) {
				n = t.trim(n);
				if (s(n)) return e.ERROR.ZIPCODE_EMPTY;
				var r = /\d{6}/;
				return r.test(n) ? !1 : e.ERROR.ZIPCODE_INVALIDE
			}
		}
	} (QHPass, window.Zepto || window.jQuery),
	function() {
		if (typeof window.monitor != "undefined") return;
		var e = "V1.2.4(2012.10.23)",
		t = "360.cn",
		n = function(r, s) {
			var o = document,
			u = navigator,
			a = r.screen,
			f = document.domain.toLowerCase(),
			l = u.userAgent.toLowerCase(),
			c = {
				trim: function(e) {
					return e.replace(/^[\s\xa0\u3000]+|[\u3000\xa0\s]+$/g, "")
				}
			},
			h = {
				on: function(e, t, n) {
					e.addEventListener ? e && e.addEventListener(t, n, !1) : e && e.attachEvent("on" + t, n)
				},
				parentNode: function(e, t, n) {
					n = n || 5,
					t = t.toUpperCase();
					while (e && n-->0) {
						if (e.tagName === t) return e;
						e = e.parentNode
					}
					return null
				}
			},
			p = {
				fix: function(e) {
					if (! ("target" in e)) {
						var t = e.srcElement || e.target;
						t && t.nodeType == 3 && (t = t.parentNode),
						e.target = t
					}
					return e
				}
			},
			d = function() {
				function e(e) {
					return e != null && e.constructor != null ? Object.prototype.toString.call(e).slice(8, -1) : ""
				}
				return {
					isArray: function(t) {
						return e(t) == "Array"
					},
					isObject: function(e) {
						return e !== null && typeof e == "object"
					},
					mix: function(e, t, n) {
						for (i in t) if (n || !(e[i] || i in e)) e[i] = t[i];
						return e
					},
					encodeURIJson: function(e) {
						var t = [];
						for (var n in e) {
							if (e[n] == null) continue;
							t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]))
						}
						return t.join("&")
					}
				}
			} (),
			v = {
				get: function(e) {
					var t, n = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
					return (t = o.cookie.match(n)) ? unescape(t[2]) : ""
				},
				set: function(e, t, n) {
					n = n || {};
					var r = n.expires;
					typeof r == "number" && (r = new Date, r.setTime(r.getTime() + n.expires)),
					o.cookie = e + "=" + escape(t) + (r ? ";expires=" + r.toGMTString() : "") + (n.path ? ";path=" + n.path: "") + (n.domain ? "; domain=" + n.domain: "")
				}
			},
			m = {
				getProject: function() {
					return ""
				},
				getReferrer: function() {
					return o.referrer
				},
				getBrowser: function() {
					var e = {
						"360se-ua": "360se",
						TT: "tencenttraveler",
						Maxthon: "maxthon",
						GreenBrowser: "greenbrowser",
						Sogou: "se 1.x / se 2.x",
						TheWorld: "theworld"
					};
					for (i in e) if (l.indexOf(e[i]) > -1) return i;
					var t = !1;
					try { + external.twGetVersion(external.twGetSecurityID(r)).replace(/\./g, "") > 1013 && (t = !0)
					} catch(n) {}
					if (t) return "360se-noua";
					var s = l.match(/(msie|chrome|safari|firefox|opera)/);
					return s = s ? s[0] : "",
					s == "msie" && (s = l.match(/msie[^;]+/)),
					s
				},
				getLocation: function() {
					var e = "";
					try {
						e = location.href
					} catch(t) {
						e = o.createElement("a"),
						e.href = "",
						e = e.href
					}
					return e = e.replace(/[?#].*$/, ""),
					e = /\.(s?htm|php)/.test(e) ? e: e.replace(/\/$/, "") + "/",
					e
				},
				getGuid: function() {
					function e(e) {
						var t = 0,
						n = 0,
						r = e.length - 1;
						for (r; r >= 0; r--) {
							var i = parseInt(e.charCodeAt(r), 10);
							t = (t << 6 & 268435455) + i + (i << 14),
							(n = t & 266338304) != 0 && (t ^= n >> 21)
						}
						return t
					}
					function n() {
						var t = [u.appName, u.version, u.language || u.browserLanguage, u.platform, u.userAgent, a.width, "x", a.height, a.colorDepth, o.referrer].join(""),
						n = t.length,
						i = r.history.length;
						while (i) t += i--^n++;
						return (Math.round(Math.random() * 2147483647) ^ e(t)) * 2147483647
					}
					var i = "__guid",
					s = v.get(i);
					if (!s) {
						s = [e(o.domain), n(), +(new Date) + Math.random() + Math.random()].join(".");
						var l = {
							expires: 2592e7,
							path: "/"
						};
						if (t) {
							var c = "." + t;
							if (f.indexOf(c) > 0 && f.lastIndexOf(c) == f.length - c.length || f == c) l.domain = c
						}
						v.set(i, s, l)
					}
					return function() {
						return s
					}
				} (),
				getCount: function() {
					var e = "count",
					t = v.get(e);
					return t = (parseInt(t) || 0) + 1,
					v.set(e, t, {
						expires: 864e5,
						path: "/"
					}),
					function() {
						return t
					}
				} (),
				getFlashVer: function() {
					var e = -1;
					if (u.plugins && u.mimeTypes.length) {
						var t = u.plugins["Shockwave Flash"];
						t && t.description && (e = t.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".") + ".0")
					} else if (r.ActiveXObject && !r.opera) for (var n = 16; n >= 2; n--) try {
						var i = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + n);
						if (i) {
							var s = i.GetVariable("$version");
							e = s.replace(/WIN/g, "").replace(/,/g, ".")
						}
					} catch(o) {}
					return e = parseInt(e, 10),
					function() {
						return e
					}
				} (),
				getContainerId: function(e) {
					var t = y.areaIds;
					if (t) {
						var n, r = new RegExp("^(" + t.join("|") + ")$", "ig");
						while (e) {
							if (e.id && r.test(e.id)) return (e.getAttribute("data-desc") || e.id).substr(0, 100);
							e = e.parentNode
						}
					}
					return ""
				},
				getText: function(e) {
					return c.trim((e.getAttribute("text") || e.innerText || e.textContent || e.title || "").substr(0, 100))
				}
			},
			g = {
				getBase: function() {
					return {
						p: m.getProject(),
						u: m.getLocation(),
						id: m.getGuid(),
						guid: m.getGuid()
					}
				},
				getTrack: function() {
					return {
						b: m.getBrowser(),
						c: m.getCount(),
						r: m.getReferrer(),
						fl: m.getFlashVer()
					}
				},
				getClick: function(e) {
					e = p.fix(e || event);
					var t = e.target,
					n = t.tagName,
					r = m.getContainerId(t);
					if (t.type != "submit") {
						if (n == "AREA") return {
							f: t.href,
							c: "area:" + t.parentNode.name,
							cId: r
						};
						var i, s;
						return n == "IMG" && (i = t),
						t = h.parentNode(t, "A"),
						t ? (s = m.getText(t), {
							f: t.href,
							c: s ? s: i ? i.src.match(/[^\/]+$/) : "",
							cId: r
						}) : !1
					}
					var o = h.parentNode(t, "FORM");
					if (o) {
						var u = o.id || "",
						a = t.id,
						f = {
							f: o.action,
							c: "form:" + (o.name || u),
							cId: r
						};
						if ((u == "search-form" || u == "searchForm") && (a == "searchBtn" || a == "search-btn")) {
							var l = b("kw") || b("search-kw") || b("kw1");
							f.w = l ? l.value: ""
						}
						return f
					}
				},
				getKeydown: function(e) {
					e = p.fix(e || event);
					if (e.keyCode != 13) return ! 1;
					var t = e.target,
					n = t.tagName,
					r = m.getContainerId(t);
					if (n == "INPUT") {
						var i = h.parentNode(t, "FORM");
						if (i) {
							var s = i.id || "",
							o = t.id,
							u = {
								f: i.action,
								c: "form:" + (i.name || s),
								cId: r
							};
							if (o == "kw" || o == "search-kw" || o == "kw1") u.w = t.value;
							return u
						}
					}
					return ! 1
				}
			},
			y = {
				trackUrl: null,
				clickUrl: null,
				areaIds: null
			},
			b = function(e) {
				return document.getElementById(e)
			};
			return {
				version: e,
				util: m,
				data: g,
				config: y,
				sendLog: function() {
					return r.__monitor_imgs = {},
					function(e) {
						var t = "log_" + +(new Date),
						n = r.__monitor_imgs[t] = new Image;
						n.onload = n.onerror = function() {
							r.__monitor_imgs[t] = null,
							delete r.__monitor_imgs[t]
						},
						n.src = e
					}
				} (),
				buildLog: function() {
					var e = "";
					return function(t, n) {
						if (t === !1) return;
						t = t || {};
						var r = g.getBase();
						t = d.mix(r, t, !0);
						var i = n + d.encodeURIJson(t);
						if (i == e) return;
						e = i,
						setTimeout(function() {
							e = ""
						},
						500);
						var s = d.encodeURIJson(t);
						s += "&t=" + +(new Date),
						n = n.indexOf("?") > -1 ? n + "&" + s: n + "?" + s,
						this.sendLog(n)
					}
				} (),
				log: function(e, t) {
					t = t || "click";
					var n = y[t + "Url"];
					n || alert("Error : the " + t + "url does not exist!"),
					this.buildLog(e, n)
				},
				setConf: function(e, t) {
					var n = {};
					return d.isObject(e) ? n = e: n[e] = t,
					this.config = d.mix(this.config, n, !0),
					this
				},
				setUrl: function(e) {
					return e && (this.util.getLocation = function() {
						return e
					}),
					this
				},
				setProject: function(e) {
					return e && (this.util.getProject = function() {
						return e
					}),
					this
				},
				setId: function() {
					var e = [],
					t = 0,
					n;
					while (n = arguments[t++]) d.isArray(n) ? e = e.concat(n) : e.push(n);
					return this.setConf("areaIds", e),
					this
				},
				getTrack: function() {
					var e = this.data.getTrack();
					return this.log(e, "track"),
					this
				},
				getClickAndKeydown: function() {
					var e = this;
					return h.on(o, "mousedown",
					function(t) {
						var n = e.data.getClick(t);
						e.log(n, "click")
					}),
					h.on(o, "keydown",
					function(t) {
						var n = e.data.getKeydown(t);
						e.log(n, "click")
					}),
					n.getClickAndKeydown = function() {
						return e
					},
					this
				}
			}
		} (window);
		n.setConf({
			trackUrl: "http://s.360.cn/w360/s.htm",
			clickUrl: "http://s.360.cn/w360/c.htm",
			wpoUrl: "http://s.360.cn/w360/p.htm"
		}),
		window.monitor = n
	} ();

	(function(e, t) {
		//typeof exports == "object" ? module.exports = t() : typeof define == "function" && define.amd ? define("module/detector/1.3.0/detector", [], t) : e.detector = t()
		e.detector = t();
	})(this,
	function() {
		function u(e) {
			return Object.prototype.toString.call(e)
		}
		function a(e) {
			return u(e) === "[object Object]"
		}
		function f(e) {
			return u(e) === "[object Function]"
		}
		function l(e, t, n) {
			for (var r = 0,
			i, s = e.length; r < s; r++) if (t.call(e, e[r], r) === !1) break
		}
		function p(e) {
			if (!o.test(e)) return null;
			var t, n, r, i, s, u = !1;
			if (e.indexOf("trident/") !== -1) {
				t = /\btrident\/([0-9.]+)/.exec(e);
				if (t && t.length >= 2) {
					r = t[1];
					var a = t[1].split(".");
					a[0] = parseInt(a[0], 10) + 4,
					s = a.join(".")
				}
			}
			t = o.exec(e),
			i = t[1];
			var f = t[1].split(".");
			return "undefined" == typeof s && (s = i),
			f[0] = parseInt(f[0], 10) - 4,
			n = f.join("."),
			"undefined" == typeof r && (r = n),
			{
				browserVersion: s,
				browserMode: i,
				engineVersion: r,
				engineMode: n,
				compatible: r !== n
			}
		}
		function d(e) {
			if (!s) return;
			try {
				var t = s.twGetRunPath.toLowerCase(),
				n = s.twGetSecurityID(window),
				r = s.twGetVersion(n);
				if (t && t.indexOf(e) === -1) return ! 1;
				if (r) return {
					version: r
				}
			} catch(i) {}
		}
		function g(e, n, r) {
			var i = f(n) ? n.call(null, r) : n;
			if (!i) return null;
			var s = {
				name: e,
				version: t,
				codename: ""
			},
			o = u(i);
			if (i === !0) return s;
			if (o === "[object String]") {
				if (r.indexOf(i) !== -1) return s
			} else {
				if (a(i)) return i.hasOwnProperty("version") && (s.version = i.version),
				s;
				if (i.exec) {
					var l = i.exec(r);
					if (l) return l.length >= 2 && l[1] ? s.version = l[1].replace(/_/g, ".") : s.version = t,
					s
				}
			}
		}
		function b(e, t, n, r) {
			var i = y;
			l(t,
			function(t) {
				var n = g(t[0], t[1], e);
				if (n) return i = n,
				!1
			}),
			n.call(r, i.name, i.version)
		}
		var e = {},
		t = "-1",
		n = navigator.userAgent || "",
		r = navigator.appVersion || "",
		i = navigator.vendor || "",
		s = window.external,
		o = /\b(?:msie |ie |trident\/[0-9].*rv[ :])([0-9.]+)/,
		c = [["nokia",
		function(e) {
			return e.indexOf("nokia ") !== -1 ? /\bnokia ([0-9]+)?/: e.indexOf("noain") !== -1 ? /\bnoain ([a-z0-9]+)/: /\bnokia([a-z0-9]+)?/
		}], ["samsung",
		function(e) {
			return e.indexOf("samsung") !== -1 ? /\bsamsung(?:\-gt)?[ \-]([a-z0-9\-]+)/: /\b(?:gt|sch)[ \-]([a-z0-9\-]+)/
		}], ["wp",
		function(e) {
			return e.indexOf("windows phone ") !== -1 || e.indexOf("xblwp") !== -1 || e.indexOf("zunewp") !== -1 || e.indexOf("windows ce") !== -1
		}], ["pc", "windows"], ["ipad", "ipad"], ["ipod", "ipod"], ["iphone", /\biphone\b|\biph(\d)/], ["mac", "macintosh"], ["mi", /\bmi[ \-]?([a-z0-9 ]+(?= build))/], ["aliyun", /\baliyunos\b(?:[\-](\d+))?/], ["meizu", /\b(?:meizu\/|m)([0-9]+)\b/], ["nexus", /\bnexus ([0-9s.]+)/], ["huawei",
		function(e) {
			return e.indexOf("huawei-huawei") !== -1 ? /\bhuawei\-huawei\-([a-z0-9\-]+)/: /\bhuawei[ _\-]?([a-z0-9]+)/
		}], ["lenovo",
		function(e) {
			return e.indexOf("lenovo-lenovo") !== -1 ? /\blenovo\-lenovo[ \-]([a-z0-9]+)/: /\blenovo[ \-]?([a-z0-9]+)/
		}], ["zte",
		function(e) {
			return /\bzte\-[tu]/.test(e) ? /\bzte-[tu][ _\-]?([a-su-z0-9\+]+)/: /\bzte[ _\-]?([a-su-z0-9\+]+)/
		}], ["vivo", /\bvivo ([a-z0-9]+)/], ["htc",
		function(e) {
			return /\bhtc[a-z0-9 _\-]+(?= build\b)/.test(e) ? /\bhtc[ _\-]?([a-z0-9 ]+(?= build))/: /\bhtc[ _\-]?([a-z0-9 ]+)/
		}], ["oppo", /\boppo[_]([a-z0-9]+)/], ["konka", /\bkonka[_\-]([a-z0-9]+)/], ["sonyericsson", /\bmt([a-z0-9]+)/], ["coolpad", /\bcoolpad[_ ]?([a-z0-9]+)/], ["lg", /\blg[\-]([a-z0-9]+)/], ["android", "android"], ["blackberry", "blackberry"]],
		h = [["wp",
		function(e) {
			return e.indexOf("windows phone ") !== -1 ? /\bwindows phone (?:os )?([0-9.]+)/: e.indexOf("xblwp") !== -1 ? /\bxblwp([0-9.]+)/: e.indexOf("zunewp") !== -1 ? /\bzunewp([0-9.]+)/: "windows phone"
		}], ["windows", /\bwindows nt ([0-9.]+)/], ["macosx", /\bmac os x ([0-9._]+)/], ["ios",
		function(e) {
			return /\bcpu(?: iphone)? os /.test(e) ? /\bcpu(?: iphone)? os ([0-9._]+)/: e.indexOf("iph os ") !== -1 ? /\biph os ([0-9_]+)/: /\bios\b/
		}], ["yunos", /\baliyunos ([0-9.]+)/], ["android", /\bandroid[\/\- ]?([0-9.x]+)?/], ["chromeos", /\bcros i686 ([0-9.]+)/], ["linux", "linux"], ["windowsce", /\bwindows ce(?: ([0-9.]+))?/], ["symbian", /\bsymbian(?:os)?\/([0-9.]+)/], ["meego", /\bmeego\b/], ["blackberry", "blackberry"]],
		v = [["trident", o], ["webkit", /\bapplewebkit[\/]?([0-9.+]+)/], ["gecko", /\bgecko\/(\d+)/], ["presto", /\bpresto\/([0-9.]+)/], ["androidwebkit", /\bandroidwebkit\/([0-9.]+)/], ["coolpadwebkit", /\bcoolpadwebkit\/([0-9.]+)/]],
		m = [["sg", / se ([0-9.x]+)/], ["tw",
		function(e) {
			var t = d("theworld");
			return typeof t != "undefined" ? t: "theworld"
		}], ["360",
		function(e) {
			var t = d("360se");
			return typeof t != "undefined" ? t: e.indexOf("360 aphone browser") !== -1 ? /\b360 aphone browser \(([^\)]+)\)/: /\b360(?:se|ee|chrome|browser)\b/
		}], ["mx",
		function(e) {
			try {
				if (s && (s.mxVersion || s.max_version)) return {
					version: s.mxVersion || s.max_version
				}
			} catch(t) {}
			return /\bmaxthon(?:[ \/]([0-9.]+))?/
		}], ["qq", /\bm?qqbrowser\/([0-9.]+)/], ["green", "greenbrowser"], ["tt", /\btencenttraveler ([0-9.]+)/], ["lb",
		function(e) {
			if (e.indexOf("lbbrowser") === -1) return ! 1;
			var n;
			try {
				s && s.LiebaoGetVersion && (n = s.LiebaoGetVersion())
			} catch(r) {}
			return {
				version: n || t
			}
		}], ["tao", /\btaobrowser\/([0-9.]+)/], ["fs", /\bcoolnovo\/([0-9.]+)/], ["sy", "saayaa"], ["baidu", /\bbidubrowser[ \/]([0-9.x]+)/], ["ie", o], ["mi", /\bmiuibrowser\/([0-9.]+)/], ["opera",
		function(e) {
			var t = /\bopera.+version\/([0-9.ab]+)/,
			n = /\bopr\/([0-9.]+)/;
			return t.test(e) ? t: n
		}], ["chrome", / (?:chrome|crios|crmo)\/([0-9.]+)/], ["uc",
		function(e) {
			return e.indexOf("ucbrowser/") >= 0 ? /\bucbrowser\/([0-9.]+)/: /\buc\/[0-9]/.test(e) ? /\buc\/([0-9.]+)/: e.indexOf("ucweb") >= 0 ? /\bucweb[\/]?([0-9.]+)?/: /\b(?:ucbrowser|uc)\b/
		}], ["android",
		function(e) {
			if (e.indexOf("android") === -1) return;
			return /\bversion\/([0-9.]+(?: beta)?)/
		}], ["safari", /\bversion\/([0-9.]+(?: beta)?)(?: mobile(?:\/[a-z0-9]+)?)? safari\//], ["webview", /\bcpu(?: iphone)? os (?:[0-9._]+).+\bapplewebkit\b/], ["firefox", /\bfirefox\/([0-9.ab]+)/], ["nokia", /\bnokiabrowser\/([0-9.]+)/]],
		y = {
			name: "na",
			version: t
		},
		w = function(e) {
			e = (e || "").toLowerCase();
			var t = {};
			b(e, c,
			function(e, n) {
				var r = parseFloat(n);
				t.device = {
					name: e,
					version: r,
					fullVersion: n
				},
				t.device[e] = r
			},
			t),
			b(e, h,
			function(e, n) {
				var r = parseFloat(n);
				t.os = {
					name: e,
					version: r,
					fullVersion: n
				},
				t.os[e] = r
			},
			t);
			var n = p(e);
			return b(e, v,
			function(e, r) {
				var i = r;
				n && (r = n.engineVersion || n.engineMode, i = n.engineMode);
				var s = parseFloat(r);
				t.engine = {
					name: e,
					version: s,
					fullVersion: r,
					mode: parseFloat(i),
					fullMode: i,
					compatible: n ? n.compatible: !1
				},
				t.engine[e] = s
			},
			t),
			b(e, m,
			function(e, r) {
				var i = r;
				n && (e === "ie" && (r = n.browserVersion), i = n.browserMode);
				var s = parseFloat(r);
				t.browser = {
					name: e,
					version: s,
					fullVersion: r,
					mode: parseFloat(i),
					fullMode: i,
					compatible: n ? n.compatible: !1
				},
				t.browser[e] = s
			},
			t),
			t
		};
		return e = w(n + " " + r + " " + i),
		e.parse = w,
		e
	});
	//registerInterface1
	function hex_md5(e) {
		return binl2hex(core_md5(str2binl(e), e.length * chrsz))
	}

	QHDomain = window.QHDomain || {
		i360: "http://i.360.cn",
		login_https: "https://login.360.cn",
		captcha: "http://captcha.360.cn",
		login_http: "http://login.360.cn"
	};
	QHPass.resConfig = {
		reloadAfterLogout: !0,
		jumpUrl: "",
		isByqt: !0,
		logoutCallback: null
	};
	var _hostConf = "1360.com|360.cn|qihoo.com|qikoo.com|woxihuan.com|yunpan.cn|360pay.cn|360kan.com|so.com|leidian.com",
	_hostArr = _hostConf.split("|"),
	_hostShortArr = [],
	_hostShort2long = {},
	_i = 0,
	_tmpHost,
	_tmpHostName,
	_l = _hostArr.length;
	for (; _i < _l; _i++) _tmpHost = _hostArr[_i],
	_tmpHostName = _tmpHost.split(".")[0],
	_hostShortArr.push(_tmpHostName),
	_hostShort2long[_tmpHostName] = _tmpHost;
	QHPass._hostConf = _hostConf,
	QHPass._hostShort = _hostShortArr.join("|"),
	QHPass._hostShort2long = _hostShort2long;
	var reHost = location.host.match(new RegExp(QHPass._hostConf.replace(/\./, "\\."), "ig"));
	QHPass._hostCurr = reHost && reHost[0],
	tipTextLogin = {
		login_account_empty: "\u8bf7\u8f93\u5165\u60a8\u7684\u5e10\u53f7",
		login_password_empty: "\u8bf7\u8f93\u5165\u60a8\u7684\u5bc6\u7801",
		login_default_wrong: "\u5e10\u53f7\u6216\u5bc6\u7801\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165",
		login_phrase_wrong: "\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u9a8c\u8bc1\u7801",
		contact_kefu: ',<a target="_blank" href="http://i.360.cn/complaint">\u70b9\u6b64\u8054\u7cfb\u5ba2\u670d</a>'
	},
	QHPass.CrossDomainRequest = function(e, t, n, r) {
		var i = +(new Date),
		s = "";
		typeof n == "string" ? s = n: (s = "_CrossDomainCallback" + i, window[s] = function() {
			var e = decodeURIComponent(arguments[0]);
			return o.parentNode.removeChild(o),
			n(e)
		});
		var o = document.createElement("div");
		o.innerHTML = '<iframe style="display:none" id="_CrossDomainiframe' + i + '" name="' + "_CrossDomainiframe" + i + '" src=""></iframe>',
		document.body.appendChild(o);
		var u = document.createElement("FORM");
		u.style.display = "none",
		u.method = r || "post",
		u.target = "_CrossDomainiframe" + i,
		u.action = e;
		var a = [];
		a.push('<input type="hidden" name="callback" value="' + s + '" />'),
		a.push('<input type="hidden" name="proxy" value="//' + location.host + '/psp_jump.html" />'),
		u.innerHTML = a.join("");
		for (var f in t) {
			var l = document.createElement("input");
			l.setAttribute("type", "hidden"),
			l.setAttribute("name", f),
			l.setAttribute("value", t[f]),
			u.appendChild(l)
		}
		document.body.appendChild(u),
		u.submit(),
		u.parentNode.removeChild(u)
	},
	QHPass.loadJs = function(e, t, n) {
		n = n || {};
		var r = document.getElementsByTagName("head")[0] || document.documentElement,
		i = document.createElement("script"),
		s = !1;
		i.src = e,
		n.charset && (i.charset = n.charset),
		i.onerror = i.onload = i.onreadystatechange = function() { ! s && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") && (s = !0, t && t(), i.onerror = i.onload = i.onreadystatechange = null, r.removeChild(i))
		},
		r.insertBefore(i, r.firstChild)
	},
	QHPass.loadJsonp = function() {
		var e = new Date * 1;
		return function(t, n, r) {
			r = r || {};
			var i = "QiUserJsonP" + e++,
			s = r.callbackReplacer || /%callback%/ig;
			window[i] = function(e) {
				n && n(e),
				window[i] = null
			},
			s.test(t) ? t = t.replace(s, i) : t += (/\?/.test(t) ? "&": "?") + "callback=" + i,
			QHPass.loadJs(t, null, r)
		}
	} (),
	QHPass.g = function(e) {
		return "string" == typeof e || e instanceof String ? document.getElementById(e) : e && e.nodeName && (e.nodeType == 1 || e.nodeType == 9) ? e: null
	},
	QHPass.trim = function(e) {
		return e && e.replace(/^\s+|\s+$/g, "")
	},
	QHPass.forEach = function(e, t, n) {
		for (var r = 0,
		i = e.length; r < i; r++) r in e && t.call(n, e[r], r, e)
	},
	QHPass.byteLen = function(e) {
		return e.replace(/[^\x00-\xff]/g, "--").length
	},
	QHPass.trace = function(e) {
		window.console && window.console.log(e)
	},
	QHPass.execCallback = function(e, t) {
		typeof e == "string" ? window.location.href = e: typeof e == "boolean" ? window.location.reload(e) : e && e(t)
	},
	QHPass.Cookie = QHPass.Cookie || {},
	QHPass.Cookie.get = function(e) {
		if (QHPass.Cookie._isValidKey(e)) {
			var t = new RegExp("(^| )" + e + "=([^;]*)(;|$)"),
			n = t.exec(document.cookie);
			if (n) try {
				return decodeURIComponent(n[2]) || null
			} catch(r) {
				return n[2] || null
			}
		}
		return null
	},
	QHPass.Cookie._isValidKey = function(e) {
		return (new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+$')).test(e)
	},
	QHPass.Cookie.set = function(e, t, n) {
		if (!QHPass.Cookie._isValidKey(e)) return;
		n = n || {};
		var r = n.expires;
		"number" == typeof n.expires && (r = new Date, r.setTime(r.getTime() + n.expires)),
		document.cookie = e + "=" + encodeURIComponent(t) + "; path=" + (n.path ? n.path: "/") + (r ? "; expires=" + r.toGMTString() : "") + (n.domain ? "; domain=" + n.domain: "") + (n.secure ? "; secure": "")
	},
	QHPass.Cookie.del = function(e) {
		QHPass.Cookie.set(e, "")
	},
	QHPass.getUserInfo = function(e, t, n) {
		if (QHPass.Cookie.get("Q") || !QHPass.resConfig.isByqt) {
			var r = n || "http://login." + QHPass._hostCurr || QHDomain.login_http;
			r += "/?o=sso&m=info&func=%callback%&show_name_flag=1",
			QHPass.loadJsonp(r,
			function(n) {
				n.qid ? e && e(n) : t && t()
			})
		} else t && t()
	},
	QHPass.getRd = function(e, t) {
		var n = "http://login.360.cn?o=sso&m=getRd";
		QHPass.loadJsonp(n,
		function(n) {
			n.rd ? e && e(n.rd) : t && t(n)
		})
	},
	QHPass.logoutOtherDomain = function(e) {
		function t() {
			QHPass.resConfig.logoutCallback ? QHPass.execCallback(QHPass.resConfig.logoutCallback) : location.reload(!0)
		}
		e.errno == 0 && (QHPass._hostCurr && QHPass._hostCurr !== "360.cn" ? QHPass.loadJsonp("http://login." + QHPass._hostCurr + "/?o=sso&m=logout&func=%callback%", t) : t())
	},
	QHPass.logout = function(e) {
		e && (QHPass.resConfig.logoutCallback = e);
		if (QHPass.Cookie.get("Q") || !QHPass.resConfig.isByqt) if (QHPass.resConfig.reloadAfterLogout) {
			var t = QHPass.resConfig.jumpUrl || location.href;
			location.href = QHDomain.login_http + "/?op=logout&destUrl=" + encodeURIComponent(t)
		} else QHPass.loadJsonp(QHDomain.login_http + "/?o=sso&m=logout&func=%callback%", QHPass.logoutOtherDomain);
		else e && QHPass.execCallback(e)
	},
	QHPass.cookieEnabled = function() {
		var e = !0,
		t = document.cookie.length,
		n = Math.random(),
		r = ["test", n, "test=test", ";expires=Thu, 01 Jan 9970 00:00:00 GMT", ";path=/"].join("");
		return document.cookie = r,
		document.cookie.length == t && (e = !1),
		r = ["test", n, "test=test", ";expires=Thu, 01 Jan 1970 00:00:00 GMT", ";path=/"].join(""),
		document.cookie = r,
		e
	},
	QHPass.getCaptchaUrl = function(e, t, n) {
		var r = QHDomain.i360 + "/QuCapt/getQuCaptUrl?captchaApp=" + t + "&captchaScene=" + e;
		QHPass.loadJsonp(r,
		function(e) {
			e.errno == "0" && n && QHPass.execCallback(n, e.captchaUrl)
		})
	};
	QHPass.mShowLogin = function(e, t) {
		t = t || {},
		QHPass.loginUtils.run(e, t)
	},
	QHPass.loginUtils = function() {
		function S(t, n, r) {
			QHPass.trace(t),
			h += 1;
			var i = QHPass.g(e.globalTips);
			i && (i.innerHTML = n, i.style.display = "block"),
			d && d({
				type: t,
				msg: n,
				extra: r
			}),
			clearTimeout(QHPass._timeoutHandler)
		}
		function x(t, n, r) {
			var i = QHPass.g(e.globalTips);
			i && (i.innerHTML = n, i.style.display = "none"),
			v && v({
				type: t,
				msg: n,
				extra: r
			})
		}
		function T() {
			var t = e.account,
			n = "account",
			r = QHPass.byteLen(QHPass.g(t).value);
			r || S(n, tipTextLogin.login_account_empty)
		}
		function N() {
			var t = e.password,
			n = "pwd",
			r = QHPass.trim(QHPass.g(t).value);
			r ? r && r.length < 6 && S(n, tipTextLogin.login_default_wrong) : S(n, tipTextLogin.login_password_empty)
		}
		function C() {
			var t = e.phrase,
			n = "phrase",
			r = QHPass.trim(QHPass.g(t).value); (r.length <= 0 || r.length > 7) && S(n, tipTextLogin.login_phrase_wrong)
		}
		function k() {
			QHPass.forEach(t,
			function(e) {
				e == "360pay" || e == "yunpan" || e == "360" ? n.push("http://login." + e + ".cn") : e == "mall" ? n.push("http://login.360.com") : n.push("http://login." + e + ".com")
			})
		}
		function L() {
			h = 0;
			if (h != 0) return;
			T();
			if (h != 0) return;
			N();
			if (u) {
				if (h != 0) return;
				C()
			}
			if (h > 0) return;
			beforeFun && beforeFun(),
			QHPass._timeoutHandler = setTimeout(function() {
				QHDomain.login_https = "http://login.360.cn",
				A(),
				y && y(),
				QHPass._timeoutHandler = setTimeout(function() {
					b && b(),
					S("network", "\u7f51\u7edc\u8d85\u65f6~")
				},
				1e4)
			},
			1e4),
			A()
		}
		function A() {
			var t = QHDomain.login_https + "/?o=sso&m=getToken",
			n = QHPass.trim(QHPass.g(e.account).value),
			r = t + "&func=QHPass.loginUtils.tokenCallback&" + "userName=" + encodeURIComponent(n) + "&rand=" + Math.random();
			QHPass.loadJsonp(r)
		}
		function O(t) {
			var n = QHPass.trim(QHPass.g(e.account).value),
			r = QHPass.g(e.password).value,
			i = QHPass.g(e.isAutologin).checked ? 1 : 0,
			s = QHPass.g(e.phrase).value;
			t.errno != 0 ? S("token", decodeURIComponent(t.errmsg), t.errno) : M(n, r, i, t.token, s)
		}
		function M(e, t, n, r, i) {
			var s = [];
			s.push("userName=" + encodeURIComponent(e)),
			s.push("pwdmethod=1"),
			s.push("password=" + hex_md5(t)),
			s.push("isKeepAlive=" + n),
			s.push("token=" + r),
			o ? (s.push("captFlag=1"), s.push("captchaApp=" + a), s.push("captcha=" + encodeURIComponent(i))) : s.push("captFlag="),
			s.push("r=" + (new Date).getTime()),
			w && w();
			var u = QHDomain.login_https + "/?o=sso&m=login&from=" + p + "&rtype=data&func=QHPass.loginUtils.loginCallback";
			QHPass.loadJsonp(u + "&" + s.join("&"))
		}
		function _(e) {
			QHPass.getCaptchaUrl("login", a, e)
		}
		function D() {
			QHPass.g(e.phraseImg).src = f + "&_=" + Math.random()
		}
		function P(e) {
			E && E();
			if (e.errno == 0) i = e.s,
			r = e.userinfo,
			H();
			else switch (e.errno) {
			case 1036:
				S("account", tipTextLogin.login_default_wrong, e.errno);
				break;
			case 221:
				var t = decodeURIComponent(e.errmsg) + tipTextLogin.contact_kefu;
				S("account", t, e.errno);
				break;
			case 219:
			case 220:
				S("pwd", tipTextLogin.login_default_wrong, e.errno);
				break;
			case 2e4:
				S("account", decodeURIComponent(e.errmsg), e.errno);
				break;
			case 78e3:
			case 78002:
				u = !0,
				f = e.errdetail.captchaUrl,
				l && l(),
				S("phrase", decodeURIComponent(e.errmsg), e);
				break;
			default:
				S("rd", decodeURIComponent(e.errmsg), e.errno)
			}
		}
		function H() {
			c = 0,
			QHPass.loadJs(n[c] + "/?o=sso&m=setcookie&func=QHPass.loginUtils.rdCallBack&" + "s=" + i)
		}
		function B(e) {
			e.errno == 0 ? (c += 1, c == n.length ? (clearTimeout(QHPass._timeoutHandler), QHPass.execCallback(s, r)) : QHPass.loadJs(n[c] + "/?o=sso&m=setcookie&func=QHPass.loginUtils.rdCallBack&" + "s=" + i)) : (clearTimeout(QHPass._timeoutHandler), QHPass.execCallback(s, r))
		}
		function j(n, r) {
			e = r.doms,
			t = r.domainList || t,
			s = n,
			p = r.src,
			a = r.captchaAppId || a,
			l = r.extFun.phrase,
			d = r.extFun.error,
			v = r.extFun.correct,
			phraseTime = r.phraseTime || "start",
			m = r.extFun.init,
			y = r.extFun.httpsTimeout,
			b = r.extFun.httpTimeout,
			beforeFun = r.extFun.before,
			w = r.extFun.loading,
			E = r.extFun.after,
			phraseTime == "start" ? u = !0 : u = !1,
			k(),
			QHPass.g(e.account).onblur = function() {
				var t = QHPass.trim(this.value),
				n = "http://login.360.cn/?&src=" + p + "&from=" + p + "&charset=UTF-8&requestScema=http&o=sso&m=checkNeedCaptcha&account=" + t + "&captchaApp=i360";
				if (!t) return;
				QHPass.loadJsonp(n,
				function(t) {
					t.errno == 0 && (f = t.captchaUrl, D(), t.captchaFlag ? (QHPass.g(e.phrase).parentNode.style.display = "block", u = !0) : (QHPass.g(e.phrase).parentNode.style.display = "none", u = !1))
				})
			},
			m && m()
		}
		var e = {},
		t = ["so", "qihoo", "haosou", "yunpan", "leidian", "qikoo", "360kan", "qiku", "mall"],
		n = [],
		r = null,
		i = "",
		s = "",
		o = !0,
		u = !1,
		a = "i360",
		f = "",
		l = null,
		c = 0,
		h = 0,
		p = "",
		d = null,
		v = null,
		m = null,
		g = null,
		y = null,
		b = null,
		w = null,
		E = null;
		return QHPass._timeoutHandler = null,
		{
			run: j,
			submit: L,
			showError: S,
			showCorrect: x,
			tokenCallback: O,
			loginCallback: P,
			rdCallBack: B,
			getCaptchaUrl: _,
			setPhrase: D
		}
	} ();
	//提示信息
	var tipTextReg = {
		reg_default_regUsername: "2-14\u4e2a\u5b57\u7b26\uff1a\u82f1\u6587\u3001\u6570\u5b57\u6216\u4e2d\u6587",
		reg_default_password: "6-20\u4e2a\u5b57\u7b26\uff08\u533a\u5206\u5927\u5c0f\u5199\uff09",
		reg_wrong_loginEmail_empty: "\u8bf7\u8f93\u5165\u60a8\u7684\u5e38\u7528\u90ae\u7bb1",
		reg_wrong_loginEmail_format: "\u8bf7\u8f93\u5165\u6709\u6548\u7684\u90ae\u7bb1\u5730\u5740",
		reg_wrong_default_regUsername: "\u8bf7\u8f93\u5165\u60a8\u7684\u7528\u6237\u540d",
		reg_wrong_default_password: "\u5bc6\u7801\u5e94\u4e3a6-20\u4e2a\u5b57\u7b26\uff08\u533a\u5206\u5927\u5c0f\u5199\uff09",
		reg_wrong_default_rePassword: "\u4e24\u6b21\u8f93\u5165\u7684\u5bc6\u7801\u4e0d\u4e00\u6837\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165",
		reg_wrong_default_phrase: "\u8bf7\u6b63\u786e\u586b\u5199\u9a8c\u8bc1\u7801",
		reg_wrong_password_chinese: "\u5bc6\u7801\u4e0d\u80fd\u542b\u6709\u4e2d\u6587",
		reg_wrong_password_same_chars: "\u5bc6\u7801\u4e0d\u80fd\u5168\u4e3a\u76f8\u540c\u5b57\u7b26",
		reg_wrong_password_empty: "\u5bc6\u7801\u4e0d\u80fd\u4e3a\u7a7a",
		reg_wrong_password_emptychars: "\u5bc6\u7801\u4e0d\u80fd\u5168\u90e8\u4e3a\u7a7a\u683c",
		reg_wrong_password_weaklevel: "\u5bc6\u7801\u5f31\uff0c\u6709\u98ce\u9669\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165",
		reg_wrong_password_lx_chars: "\u5bc6\u7801\u4e0d\u80fd\u4e3a\u8fde\u7eed\u5b57\u7b26",
		reg_wrong_phrase_input: "\u9a8c\u8bc1\u7801\u8f93\u5165\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165",
		reg_wrong_phrase_ban: "\u9a8c\u8bc1\u7801\u8fde\u7eed\u9519\u8bef\u6b21\u6570\u8fc7\u591a\uff0c\u8bf7\u6539\u5929\u518d\u6765",
		reg_wrong_isagree: "\u8bf7\u5148\u9605\u8bfb\u5e76\u540c\u610f\u300a360\u7528\u6237\u670d\u52a1\u6761\u6b3e\u300b",
		reg_wrong_process_error: "\u6ce8\u518c\u8fc7\u7a0b\u4e2d\u53d1\u751f\u610f\u5916\uff0c\u8bf7\u5237\u65b0\u540e\u91cd\u8bd5",
		net_check: "\u68c0\u67e5\u4e2d\uff0c\u8bf7\u7a0d\u540e...",
		reg_wrong_username_short: "\u7528\u6237\u540d\u6700\u5c11\u4f7f\u75282\u4e2a\u5b57\u7b26\u6216\u6c49\u5b57",
		reg_wrong_username_long: "\u7528\u6237\u540d\u4e0d\u8d85\u8fc77\u4e2a\u6c49\u5b57\u621614\u4e2a\u5b57\u7b26",
		reg_wrong_username_chars: "\u7528\u6237\u540d\u4e0d\u80fd\u5305\u542b\u7279\u6b8a\u5b57\u7b26",
		reg_wrong_username_empty: "\u8bf7\u8f93\u5165\u6709\u6548\u7684\u7528\u6237\u540d",
		reg_wrong_smsCode_empty: "\u6821\u9a8c\u7801\u4e0d\u80fd\u4e3a\u7a7a",
		reg_wrong_format_smsCode: "\u6821\u9a8c\u7801\u683c\u5f0f\u9519\u8bef",
		reg_wrong_phone_empty: "\u8bf7\u8f93\u5165\u60a8\u7684\u5e38\u7528\u624b\u673a\u53f7\u7801",
		reg_wrong_phone_format: "\u8bf7\u8f93\u5165\u6709\u6548\u7684\u624b\u673a\u53f7\u7801",
		immediately_login_tips: ''
	};
	QHPass.mShowReg = function(e, t) {
		t = t || {},
		QHPass.regUtils.run(e, t)
	},
	QHPass.regUtils = function() {
		function E(t, n, r) {
			QHPass.trace(t),
			f++;
			var i = QHPass.g(e.globalTips);
			i && (i.innerHTML = n, i.style.display = "block"),
			p && p({
				type: t,
				msg: n,
				extra: r
			}),
			clearTimeout(QHPass._timeoutHandler)
		}
		function S(t, n, r) {
			var i = QHPass.g(e.globalTips);
			i && (i.innerHTML = n, i.style.display = "none"),
			d && d({
				type: t,
				msg: n,
				extra: r
			})
		}
		function x(t) {
			var n = e.loginEmail,
			r = "loginEmail",
			i = QHPass.trim(QHPass.g(n).value),
			s = QHDomain.login_http + "/index.php?op=checkemail&loginEmail=" + i + "&r=" + Math.random();
			i ? T(i) ? t && QHPass.loadJsonp(s, N) : E(r, tipTextReg.reg_wrong_loginEmail_format) : E(r, tipTextReg.reg_wrong_loginEmail_empty)
		}
		function T(e) {
			if (e.length > 100) return ! 1;
			if (!/^([\w\-\.]+)@(([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,4})$/i.test(e)) return ! 1;
			var t = e.split("@"),
			n = t[1];
			if (n == "163.com" || n == "126.com" || n == "yeah.net") if (!/^([a-zA-Z][\w]{5,17}|1(3|5|7|8|4)\d{9})$/.test(t[0])) return ! 1;
			return ! 0
		}
		function N(e) {
			if (0 == e.res) S("loginEmail", e.msg, e.errno);
			else if (e.errno == 2e4) E("loginEmail", e.msg, e.errno);
			else if (1 == e.res) {
				var t = e.msg + tipTextReg.immediately_login_tips;
				E("loginEmail", t, e.errno)
			} else E("loginEmail", e.msg, e.errno)
		}
		function C(t) {
			var n = e.username,
			r = "username",
			i = QHPass.trim(QHPass.g(n).value),
			s = QHPass.byteLen(i),
			o = /^[0-9a-zA-Z\u4e00-\u9fa5_\.]*$/i,
			u = QHDomain.login_http + "/index.php?op=checkuser&userName=" + encodeURIComponent(i) + "&r=" + Math.random();
			i ? 0 == o.test(i) ? E(r, tipTextReg.reg_wrong_username_chars) : s < 2 ? E(r, tipTextReg.reg_wrong_username_short) : s > 14 ? E(r, tipTextReg.reg_wrong_username_long) : t && QHPass.loadJsonp(u, I) : E(r, tipTextReg.reg_wrong_username_empty)
		}
		function k() {
			var t = "smsCode",
			n = QHPass.trim(QHPass.g(e.smsCode).value);
			n ? /^\d{6}$/.test(n) || E(t, tipTextReg.reg_wrong_format_smsCode) : E(t, tipTextReg.reg_wrong_smsCode_empty)
		}
		function L(t) {
			var n = "phone",
			r = QHPass.trim(QHPass.g(e.phone).value);
			r ? /^1(3|5|7|8|4)\d{9}$/.test(r) ? t && QHPass.loadJsonp(QHDomain.login_http + "/index.php?op=checkmobile&mobile=" + encodeURIComponent(r) + "&r=" + Math.random(), A) : E(n, tipTextReg.reg_wrong_phone_format) : E(n, tipTextReg.reg_wrong_phone_empty)
		}
		function A(e) {
			0 == e.errno ? S("phone", e.msg, e.errno) : e.errno == 1037 ? E("phone", e.msg + tipTextReg.immediately_login_tips, e.errno) : E("phone", e.msg, e.errno)
		}
		function O() {
			var t = e.password,
			n = "pwd",
			r = QHPass.g(t).value,
			i = _(r),
			s = /[\u4e00-\u9fa5]+/,
			o = /^\s*$/;
			r && r.length >= 6 && r.length <= 20 ? s.test(r) ? E(n, tipTextReg.reg_wrong_password_chinese) : i < 3 ? r ? o.test(r) ? E(n, tipTextReg.reg_wrong_password_emptychars) : i == 0 ? E(n, tipTextReg.reg_wrong_password_same_chars) : i == 1 ? E(n, tipTextReg.reg_wrong_password_lx_chars) : i == 2 ? E(n, tipTextReg.reg_wrong_password_weaklevel) : E(n, tipTextReg.reg_wrong_password_weaklevel) : E(n, tipTextReg.reg_wrong_password_empty) : S(n, tipTextReg.reg_default_password) : E(n, tipTextReg.reg_wrong_default_password)
		}
		function M(e) {
			var t = e.length,
			n = e.slice(0),
			r,
			i;
			while (--t > 0) {
				i = n[t],
				r = t;
				while (r--) if (i === n[r]) {
					n.splice(t, 1);
					break
				}
			}
			return n
		}
		function _(e) {
			function u(e) {
				e += "";
				var t = e.length,
				n = !0,
				r = e.charCodeAt(t - 1) - e.charCodeAt(0) > 0 ? 1 : -1;
				for (var i = 0; i < t - 1; i++) if (r !== e.charCodeAt(i + 1) - e.charCodeAt(i)) return n = !1,
				n;
				return n
			}
			e += "";
			var t = e.length,
			n = e.split(""),
			r = M(n),
			i = r.length,
			s = -1;
			cflag = u(e);
			if (t < 6 || t > 20) s = -1;
			else if (i == 1) s = 0;
			else if (cflag) s = 1;
			else if (w.join("#").indexOf(e) > -1) s = 2;
			else {
				var o = {
					d: 0,
					c: 0,
					o: 0
				};
				QHPass.forEach(r,
				function(e, t) { / \d / .test(e) ? o.d = 1 : /[a-zA-Z]/.test(e) ? o.c = 1 : o.o = 1
				}),
				s = o.d + o.c + o.o + (t > 9 ? 2 : 1),
				s = s == 2 ? s + 1 : s
			}
			return s
		}
		function D() {
			var t = e.phrase;
			if (!t || !QHPass.g(t)) return;
			if (!h) return;
			var n = "phrase",
			r = QHPass.trim(QHPass.g(t).value); (r.length < 0 || r.length > 7) && E(n, tipTextReg.reg_wrong_default_phrase)
		}
		function P(e) {
			QHPass.getCaptchaUrl("reg", o, e)
		}
		function H() {
			QHPass.g(e.phraseImg).src = u + "&_=" + Math.random()
		}
		function B() {
			QHPass.forEach(t,
			function(e) {
				e == "360pay" || e == "yunpan" || e == "360" ? n.push("http://login." + e + ".cn") : e == "mall" ? n.push("http://login.360.com") : n.push("http://login." + e + ".com")
			})
		}
		function j() {
			a = 0,
			QHPass.loadJs(n[a] + "/?o=sso&m=setcookie&func=QHPass.regUtils.rdCallBack&" + "s=" + i)
		}
		function F(e) {
			e.errno == 0 ? (a += 1, a == n.length ? (clearTimeout(QHPass._timeoutHandler), QHPass.execCallback(s)) : QHPass.loadJs(n[a] + "/?o=sso&m=setcookie&func=QHPass.regUtils.rdCallBack&" + "s=" + i)) : (clearTimeout(QHPass._timeoutHandler), QHPass.execCallback(s))
		}
		function I(e) {
			if (0 == e.res) S("username", e.msg, e.errno);
			else {
				var t = e.msg + tipTextReg.immediately_login_tips;
				E("username", t, e.userinfo)
			}
		}
		function R(e) {
			if (f > 0) return;
			q[e] && q[e](!1);
			if (f > 0) return;
			O();
			if (f > 0) return;
			D()
		}
		function U(t) {
			f = 0,
			L(!1);
			if (f > 0) return;
			var n = "smsCode",
			r = QHPass.trim(QHPass.g(e.phone).value);
			QHPass.loadJsonp(QHDomain.i360 + "/smsApi/sendsmscode?account=" + r + "&condition=2&r=" + Math.random(),
			function(e) {
				t && t(e),
				e.errno == "0" ? S(n, e.errmsg, e.errno) : e.errno == 1106 ? E(n, "\u5e10\u53f7\u5df2\u5b58\u5728" + tipTextReg.immediately_login_tips, e.errno) : E(n, e.errmsg, e.errno)
			})
		}
		function X() {
			f = 0,
			QHPass.trace("submit"),
			R(r);
			if (f > 0) return;
			beforeFun && beforeFun(),
			QHPass._timeoutHandler = setTimeout(function() {
				E("network", "\u7f51\u7edc\u8d85\u65f6~"),
				g && g()
			},
			2e4);
			var t = {
				account: QHPass.trim(QHPass.g(e[z[r]]).value),
				acctype: W[r],
				password: hex_md5(QHPass.g(e.password).value),
				rePassword: hex_md5(QHPass.g(e.password).value),
				captcha: e.phrase && QHPass.g(e.phrase) ? QHPass.g(e.phrase).value: "",
				smscode: e.smsCode && QHPass.g(e.smsCode) ? QHPass.g(e.smsCode).value: "",
				src: l,
				is_agree: QHPass.g(e.isAgree).checked ? "1": "0",
				charset: c,
				loginEmailActiveFlag: "0",
				captchaApp: o,
				captchaFlag: h ? "1": "0",
				proxy: "http://" + location.host + "/psp_jump.html",
				callback: "parent.QHPass.regUtils.submitCB"
			};
			QHPass.CrossDomainRequest(QHDomain.i360 + "/reg/doregAccount", t),
			y && y()
		}
		function V(e) {
			var t = "";
			e.errdetail && (t = JSON.parse(decodeURIComponent(e.errdetail)), u = t.captchaUrl),
			b && b(),
			e.errno == 0 ? (i = e.rd, j()) : e.errno == 78e3 ? (phraseFun && phraseFun(), E("phrase", tipTextReg.reg_wrong_phrase_input, e)) : e.errno == 78001 ? (phraseFun && phraseFun(), E("phrase", tipTextReg.reg_wrong_phrase_ban, e)) : e.errno == 1670 ? (h = !0, phraseFun && phraseFun(), E("phrase", decodeURIComponent(e.errmsg), e.errno)) : E("rd", decodeURIComponent(e.errmsg), e.errno)
		}
		function $(n, i) {
			e = i.doms,
			t = i.domainList || t,
			r = i.regway,
			s = n,
			l = i.src,
			o = i.captchaAppId || o,
			c = i.postCharset,
			p = i.extFun.error,
			d = i.extFun.correct,
			v = i.extFun.init,
			beforeFun = i.extFun.before,
			g = i.extFun.httpTimeout,
			y = i.extFun.loading,
			b = i.extFun.after,
			phraseFun = i.extFun.phrase,
			h = i.captFlag,
			B(),
			v && v(),
			r != "phone" && P(function(e) {
				u = e,
				H()
			})
		}
		var e = {},
		t = ["so", "qihoo", "haosou", "yunpan", "leidian", "qikoo", "360kan", "qiku", "mall"],
		n = [],
		r = "",
		i = "",
		s = "",
		o = "i360",
		u = "",
		a = 0,
		f = 0,
		l = "",
		c = "",
		h = !0,
		p = null,
		d = null,
		v = null,
		m = null,
		g = null,
		y = null,
		b = null,
		w = ["asdasd", "asdfgh", "asdfghjkl", "Iloveyou", "qwerty", "Password", "Passwd", "Woaini", "Wodemima", "Woaiwojia", "zxcvbn", "tamade", "nimade", "123abc", "0123456", "0123456789", "100200", "102030", "121212", "111222", "115415", "123000", "123123", "123789", "12301230", "123321", "123456", "1234560", "123465", "1234567", "12345678", "123456789", "1234567890", "123123123", "1314520", "1314521", "147258369", "147852369", "159357", "168168", "201314", "211314", "321321", "456456", "4655321", "521521", "5201314", "520520", "741852", "741852963", "7758258", "7758521", "654321", "852963", "987654", "963852741", "000000", "111111", "11111111", "112233", "666666", "888888", "abcdef", "abcabc", "abc123", "a1b2c3", "aaa111", "123qwe", "qweasd", "admin", "password", "p@ssword", "passwd", "iloveyou", "1qaz2wsx", "qwertyuiop", "qq123456", "1q2w3e4r", "123456abc", "abc123456", "qazwsxedc", "1q2w3e4r5t"];
		QHPass._timeoutHandler = null;
		var q = {
			email: x,
			username: C,
			phone: function(e) {
				L(e);
				if (f > 0) return;
				k()
			}
		},
		z = {
			email: "loginEmail",
			username: "username",
			phone: "phone"
		},
		W = {
			email: "1",
			username: "4",
			phone: "2"
		};
		return {
			run: $,
			submit: X,
			submitCB: V,
			checkLoginEmail: x,
			checkUsername: C,
			checkPhone: L,
			checkSmsCode: k,
			loginEmailCallback: N,
			checkUsernameCallback: I,
			checkPhoneCallback: A,
			getSmsCode: U,
			showError: E,
			showCorrect: S,
			customError: p,
			rdCallBack: F,
			getCaptchaUrl: P,
			setPhrase: H
		}
	} ();
	globalConf = {
		protocol: location.protocol.replace(":", ""),
		src: "",
		needHttpsDomains: ["haosou.com", "360pay.cn", "360.cn"]
	},

	QHPass.resConfig = {
		reloadAfterLogout: !1,
		jumpUrl: "",
		isByqt: !0,
		logoutCallback: null
	},
	QHPass.domainList = ["qihoo.com", "haosou.com", "yunpan.cn", "qikoo.com", "qiku.com", "360.com", "360pay.cn"],
	QHPass.setConfig = function(e, t) {
		globalConf[e] = t
	},
	QHPass.getConfig = function(e, t) {
		return globalConf[e] === undefined ? t: globalConf[e]
	},
	QHPass.CrossDomainRequest = function(e, t, n, r) {
		var i = +(new Date),
		s = "",
		o = QHPass.getConfig("protocol");
		typeof n == "string" ? s = n: (s = "_CrossDomainCallback" + i, window[s] = function() {
			var e = decodeURIComponent(arguments[0]);
			return u.parentNode.removeChild(u),
			n(e)
		});
		var u = document.createElement("div");
		u.innerHTML = '<iframe style="display:none" id="_CrossDomainiframe' + i + '" name="' + "_CrossDomainiframe" + i + '" src=""></iframe>',
		document.body.appendChild(u);
		var a = document.createElement("FORM");
		a.style.display = "none",
		a.method = r || "post",
		a.target = "_CrossDomainiframe" + i,
		a.action = e;
		var f = [];
		f.push('<input type="hidden" name="callback" value="' + s + '" />'),
		f.push('<input type="hidden" name="proxy" value="' + o + "://" + location.host + '/psp_jump.html" />'),
		a.innerHTML = f.join("");
		for (var l in t) {
			var c = document.createElement("input");
			c.setAttribute("type", "hidden"),
			c.setAttribute("name", l),
			c.setAttribute("value", t[l]),
			a.appendChild(c)
		}
		document.body.appendChild(a),
		a.submit(),
		a.parentNode.removeChild(a)
	};
	var _currentDomain = location.hostname.replace(/^(?:.+\.)?(\w+\.\w+)$/, "$1");
	QHPass.loadJs = function(e, t, n) {
		n = n || {};
		var r = document.getElementsByTagName("head")[0] || document.documentElement,
		i = document.createElement("script"),
		s = !1;
		i.src = e,
		n.charset && (i.charset = n.charset),
		i.onerror = i.onload = i.onreadystatechange = function() { ! s && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") && (s = !0, t && t(), i.onerror = i.onload = i.onreadystatechange = null, r.removeChild(i))
		},
		r.insertBefore(i, r.firstChild)
	},
	QHPass.loadJsonp = function() {
		var e = new Date * 1;
		return function(t, n, r) {
			r = r || {};
			var i = "QiUserJsonP" + e++,
			s = r.callbackReplacer || /%callback%/ig;
			window[i] = function(e) {
				n && n(e),
				window[i] = null
			},
			s.test(t) ? t = t.replace(s, i) : t += (/\?/.test(t) ? "&": "?") + "callback=" + i,
			QHPass.loadJs(t, null, r)
		}
	} (),
	QHPass.g = function(e) {
		return "string" == typeof e || e instanceof String ? document.getElementById(e) : e && e.nodeName && (e.nodeType == 1 || e.nodeType == 9) ? e: null
	},
	QHPass.trim = function(e) {
		return e && e.replace(/^\s+|\s+$/g, "")
	},
	QHPass.forEach = function(e, t, n) {
		for (var r = 0,
		i = e.length; r < i; r++) r in e && t.call(n, e[r], r, e)
	},
	QHPass.byteLen = function(e) {
		return e.replace(/[^\x00-\xff]/g, "--").length
	},
	QHPass.trace = function(e) {
		window.console && window.console.log(e)
	},
	QHPass.execCallback = function(e, t) {
		typeof e == "string" ? window.location.href = e: typeof e == "boolean" ? window.location.reload(e) : e && e(t)
	},
	QHPass.Cookie = QHPass.Cookie || {},
	QHPass.Cookie.get = function(e) {
		if (QHPass.Cookie._isValidKey(e)) {
			var t = new RegExp("(^| )" + e + "=([^;]*)(;|$)"),
			n = t.exec(document.cookie);
			if (n) try {
				return decodeURIComponent(n[2]) || null
			} catch(r) {
				return n[2] || null
			}
		}
		return null
	},
	QHPass.Cookie._isValidKey = function(e) {
		return (new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+$')).test(e)
	},
	QHPass.Cookie.set = function(e, t, n) {
		if (!QHPass.Cookie._isValidKey(e)) return;
		n = n || {};
		var r = n.expires;
		"number" == typeof n.expires && (r = new Date, r.setTime(r.getTime() + n.expires)),
		document.cookie = e + "=" + encodeURIComponent(t) + "; path=" + (n.path ? n.path: "/") + (r ? "; expires=" + r.toGMTString() : "") + (n.domain ? "; domain=" + n.domain: "") + (n.secure ? "; secure": "")
	},
	QHPass.Cookie.del = function(e) {
		QHPass.Cookie.set(e, "")
	},
	QHPass.getAthenticateStatus = function(e, t) {
		var n = QHPass.getConfig("currentDomain", _currentDomain),
		r = QHPass.getConfig("protocol") == "https" ? "https": "http",
		i = r + "://login." + n || (QHPass.getConfig("protocol") == "https" ? QHDomain.login_https: QHDomain.login_http);
		QHPass.getUserInfo(function(n) {
			var r = n.crumb,
			s = i;
			s += "?o=User&m=getShiMingStatus&crumb=" + r,
			QHPass.loadJsonp(s,
			function(n) {
				n.details && !n.details.isNeedAuthen ? e && e(n.details.mobile) : t && t()
			})
		},
		t)
	},
	//这个才是最终执行的！
	QHPass.getUserInfo = function(e, t, n) {
		var r = QHPass.getConfig("currentDomain", _currentDomain),
		i = QHPass.getConfig("protocol") == "https" ? "https": "http",
		s = i + "://login." + r;
		if (QHPass.Cookie.get("Q") || !QHPass.resConfig.isByqt) {
			var o = n || s || QHDomain.login_http;
			o += "/?o=sso&m=info&func=%callback%&show_name_flag=2213",
			QHPass.loadJsonp(o,
			function(n) {
				n.qid ? e && e(n) : t && t()
			})
		} else t && t()
	},
	QHPass.getRd = function(e, t) {
		var n = QHPass.getConfig("protocol") == "https" ? QHDomain.login_https: QHDomain.login_http,
		r = n + "?o=sso&m=getRd";
		QHPass.loadJsonp(r,
		function(n) {
			n.rd ? e && e(n.rd) : t && t(n)
		})
	},
	QHPass.logoutOtherDomain = function(e) {
		function i() {
			QHPass.resConfig.logoutCallback ? QHPass.execCallback(QHPass.resConfig.logoutCallback) : location.reload(!0)
		}
		var t = QHPass.getConfig("currentDomain", _currentDomain),
		n = QHPass.getConfig("protocol") == "https" ? "https": "http",
		r = n + "://login." + t;
		e.errno == 0 && (t && t !== "360.cn" ? QHPass.loadJsonp(r + "/?o=sso&m=logout&func=%callback%", i) : i())
	},
	QHPass.logout = function(e) {
		e && (QHPass.resConfig.logoutCallback = e);
		var t = QHPass.getConfig("protocol") == "https" ? QHDomain.login_https: QHDomain.login_http;
		if (QHPass.Cookie.get("Q") || !QHPass.resConfig.isByqt) if (QHPass.resConfig.reloadAfterLogout) {
			var n = QHPass.resConfig.jumpUrl || location.href;
			location.href = t + "/?op=logout&destUrl=" + encodeURIComponent(n)
		} else QHPass.loadJsonp(t + "/?o=sso&m=logout&func=%callback%", QHPass.logoutOtherDomain);
		else e && QHPass.execCallback(e)
	},
	QHPass.cookieEnabled = function() {
		var e = !0,
		t = document.cookie.length,
		n = Math.random(),
		r = ["test", n, "test=test", ";expires=Thu, 01 Jan 9970 00:00:00 GMT", ";path=/"].join("");
		return document.cookie = r,
		document.cookie.length == t && (e = !1),
		r = ["test", n, "test=test", ";expires=Thu, 01 Jan 1970 00:00:00 GMT", ";path=/"].join(""),
		document.cookie = r,
		e
	},
	QHPass.getCaptchaUrl = function(e, t, n) {
		var r = QHPass.getConfig("protocol"),
		i = QHDomain.i360 + "/QuCapt/getQuCaptUrl?captchaApp=" + t + "&captchaScene=" + e + "&requestScema=" + r;
		QHPass.loadJsonp(i,
		function(e) {
			e.errno == "0" && n && QHPass.execCallback(n, e.captchaUrl)
		})
	};
	QHPass.mShowLogin = function(e, t) {
		t = t || {},
		QHPass.loginUtils.run(e, t)
	},
	QHPass.loginUtils = function() {
		function S(t, n, r) {
			QHPass.trace(t),
			h += 1;
			var i = QHPass.g(e.globalTips);
			i && (i.innerHTML = n, i.style.display = "block"),
			d && d({
				type: t,
				msg: n,
				extra: r
			}),
			clearTimeout(QHPass._timeoutHandler)
		}
		function x(t, n, r) {
			var i = QHPass.g(e.globalTips);
			i && (i.innerHTML = n, i.style.display = "none"),
			v && v({
				type: t,
				msg: n,
				extra: r
			})
		}
		function T() {
			var t = e.account,
			n = "account",
			r = QHPass.byteLen(QHPass.g(t).value);
			r || S(n, tipTextLogin.login_account_empty)
		}
		function N() {
			var t = e.password,
			n = "pwd",
			r = QHPass.trim(QHPass.g(t).value);
			r ? r && r.length < 6 && S(n, tipTextLogin.login_default_wrong) : S(n, tipTextLogin.login_password_empty)
		}
		function C() {
			var t = e.phrase,
			n = "phrase",
			r = QHPass.trim(QHPass.g(t).value); (r.length <= 0 || r.length > 7) && S(n, tipTextLogin.login_phrase_wrong)
		}
		function k() {
			var e = QHPass.getConfig("needHttpsDomains");
			QHPass.forEach(t,
			function(t) {
				e.indexOf(t) > -1 ? n.push("https://login." + t) : n.push("http://login." + t)
			})
		}
		function L() {
			h = 0;
			if (h != 0) return;
			T();
			if (h != 0) return;
			N();
			if (u) {
				if (h != 0) return;
				C()
			}
			if (h > 0) return;
			beforeFun && beforeFun(),
			QHPass._timeoutHandler = setTimeout(function() {
				QHDomain.login_https = "http://login.360.cn",
				A(),
				y && y(),
				QHPass._timeoutHandler = setTimeout(function() {
					b && b(),
					S("network", "\u7f51\u7edc\u8d85\u65f6~")
				},
				1e4)
			},
			1e4),
			A()
		}
		function A() {
			var t = QHDomain.login_https + "/?o=sso&m=getToken",
			n = QHPass.trim(QHPass.g(e.account).value),
			r = t + "&func=QHPass.loginUtils.tokenCallback&" + "userName=" + encodeURIComponent(n) + "&rand=" + Math.random();
			QHPass.loadJsonp(r)
		}
		function O(t) {
			var n = QHPass.trim(QHPass.g(e.account).value),
			r = QHPass.g(e.password).value,
			i = QHPass.g(e.isAutologin).checked ? 1 : 0,
			s = QHPass.g(e.phrase).value;
			t.errno != 0 ? S("token", decodeURIComponent(t.errmsg), t.errno) : M(n, r, i, t.token, s)
		}
		function M(e, t, n, r, i) {
			var s = [],
			u = QHPass.getConfig("protocol");
			s.push("userName=" + encodeURIComponent(e)),
			s.push("pwdmethod=1"),
			s.push("password=" + hex_md5(t)),
			s.push("isKeepAlive=" + n),
			s.push("token=" + r),
			o ? (s.push("captFlag=1"), s.push("captchaApp=" + a), s.push("captcha=" + encodeURIComponent(i))) : s.push("captFlag="),
			s.push("r=" + (new Date).getTime()),
			w && w();
			var f = QHDomain.login_https + "/?o=sso&m=login&from=" + p + "&rtype=data&func=QHPass.loginUtils.loginCallback&requestScema=" + u;
			QHPass.loadJsonp(f + "&" + s.join("&"))
		}
		function _(e) {
			QHPass.getCaptchaUrl("login", a, e)
		}
		function D() {
			QHPass.g(e.phraseImg).src = f + "&_=" + Math.random()
		}
		function P(t) {
			E && E();
			if (t.errno == 0) i = t.s,
			r = t.userinfo,
			H();
			else switch (t.errno) {
			case 1036:
				S("account", tipTextLogin.login_default_wrong, t.errno);
				break;
			case 221:
				var n = decodeURIComponent(t.errmsg) + tipTextLogin.contact_kefu;
				S("account", n, t.errno);
				break;
			case 219:
			case 220:
				S("pwd", tipTextLogin.login_default_wrong, t.errno);
				break;
			case 2e4:
				S("account", decodeURIComponent(t.errmsg), t.errno);
				break;
			case 78e3:
			case 78002:
				u = !0,
				f = t.errdetail.captchaUrl,
				QHPass.g(e.phraseWrapper).style.display = "block",
				l && l(),
				S("phrase", decodeURIComponent(t.errmsg), t);
				break;
			default:
				S("rd", decodeURIComponent(t.errmsg), t.errno)
			}
		}
		function H() {
			c = 0,
			QHPass.loadJs(n[c] + "/?o=sso&m=setcookie&func=QHPass.loginUtils.rdCallBack&" + "s=" + i)
		}
		function B(e) {
			e.errno == 0 ? (c += 1, c == n.length ? (clearTimeout(QHPass._timeoutHandler), QHPass.execCallback(s, r)) : QHPass.loadJs(n[c] + "/?o=sso&m=setcookie&func=QHPass.loginUtils.rdCallBack&" + "s=" + i)) : (clearTimeout(QHPass._timeoutHandler), QHPass.execCallback(s, r))
		}
		function j(n, r) {
			e = r.doms,
			t = r.domainList || QHPass.getConfig("domainList", t),
			s = n,
			p = r.src || QHPass.getConfig("src"),
			a = r.captchaAppId || a,
			l = r.extFun.phrase,
			d = r.extFun.error,
			v = r.extFun.correct,
			phraseTime = r.phraseTime || "start",
			m = r.extFun.init,
			y = r.extFun.httpsTimeout,
			b = r.extFun.httpTimeout,
			beforeFun = r.extFun.before,
			w = r.extFun.loading,
			E = r.extFun.after,
			phraseTime == "start" ? u = !0 : u = !1,
			k(),
			QHPass.g(e.account).onblur = function() {
				var t = QHPass.trim(this.value),
				n = QHPass.getConfig("protocol", "https"),
				r = QHPass.getConfig("currentDomain", _currentDomain),
				i = n + "://login." + r || (n == "https" ? QHDomain.login_https: QHDomain.login_http),
				s = i + "/?&src=" + p + "&from=" + p + "&charset=UTF-8&requestScema=http&o=sso&m=checkNeedCaptcha&account=" + t + "&captchaApp=i360&requestScema=" + n;
				if (!t) return;
				QHPass.loadJsonp(s,
				function(t) {
					t.errno == 0 && (f = t.captchaUrl, D(), t.captchaFlag ? (QHPass.g(e.phraseWrapper).style.display = "block", u = !0) : (QHPass.g(e.phraseWrapper).style.display = "none", u = !1))
				})
			},
			m && m()
		}
		var e = {},
		t = QHPass.domainList,
		n = [],
		r = null,
		i = "",
		s = "",
		o = !0,
		u = !1,
		a = "i360",
		f = "",
		l = null,
		c = 0,
		h = 0,
		p = "",
		d = null,
		v = null,
		m = null,
		g = null,
		y = null,
		b = null,
		w = null,
		E = null;
		return QHPass._timeoutHandler = null,
		{
			run: j,
			submit: L,
			showError: S,
			showCorrect: x,
			tokenCallback: O,
			loginCallback: P,
			rdCallBack: B,
			getCaptchaUrl: _,
			setPhrase: D
		}
	} ();
	QHPass.mShowReg = function(e, t) {
		t = t || {},
		QHPass.regUtils.run(e, t)
	},
	QHPass.regUtils = function() {
		function E(t, n, r) {
			QHPass.trace(t),
			f++;
			var i = QHPass.g(e.globalTips);
			i && (i.innerHTML = n, i.style.display = "block"),
			p && p({
				type: t,
				msg: n,
				extra: r
			}),
			clearTimeout(QHPass._timeoutHandler)
		}
		function S(t, n, r) {
			var i = QHPass.g(e.globalTips);
			i && (i.innerHTML = n, i.style.display = "none"),
			d && d({
				type: t,
				msg: n,
				extra: r
			})
		}
		function x(t) {
			var n = QHPass.getConfig("protocol") == "https" ? QHDomain.login_https: QHDomain.login_http,
			r = e.loginEmail,
			i = "loginEmail",
			s = QHPass.trim(QHPass.g(r).value),
			o = n + "/index.php?op=checkemail&loginEmail=" + s + "&r=" + Math.random();
			s ? T(s) ? t && QHPass.loadJsonp(o, N) : E(i, tipTextReg.reg_wrong_loginEmail_format) : E(i, tipTextReg.reg_wrong_loginEmail_empty)
		}
		function T(e) {
			if (e.length > 100) return ! 1;
			if (!/^([\w\-\.]+)@(([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,4})$/i.test(e)) return ! 1;
			var t = e.split("@"),
			n = t[1];
			if (n == "163.com" || n == "126.com" || n == "yeah.net") if (!/^([a-zA-Z][\w]{5,17}|1(3|5|7|8|4)\d{9})$/.test(t[0])) return ! 1;
			return ! 0
		}
		function N(e) {
			if (0 == e.res) S("loginEmail", e.msg, e.errno);
			else if (e.errno == 2e4) E("loginEmail", e.msg, e.errno);
			else if (1 == e.res) {
				var t = e.msg + tipTextReg.immediately_login_tips;
				E("loginEmail", t, e.errno)
			} else E("loginEmail", e.msg, e.errno)
		}
		function C(t) {
			var n = QHPass.getConfig("protocol") == "https" ? QHDomain.login_https: QHDomain.login_http,
			r = e.username,
			i = "username",
			s = QHPass.trim(QHPass.g(r).value),
			o = QHPass.byteLen(s),
			u = /^[0-9a-zA-Z\u4e00-\u9fa5_\.]*$/i,
			a = n + "/index.php?op=checkuser&userName=" + encodeURIComponent(s) + "&r=" + Math.random();
			s ? 0 == u.test(s) ? E(i, tipTextReg.reg_wrong_username_chars) : o < 2 ? E(i, tipTextReg.reg_wrong_username_short) : o > 14 ? E(i, tipTextReg.reg_wrong_username_long) : t && QHPass.loadJsonp(a, I) : E(i, tipTextReg.reg_wrong_username_empty)
		}
		function k() {
			var t = "smsCode",
			n = QHPass.trim(QHPass.g(e.smsCode).value);
			n ? /^\d{6}$/.test(n) || E(t, tipTextReg.reg_wrong_format_smsCode) : E(t, tipTextReg.reg_wrong_smsCode_empty)
		}
		function L(t) {
			var n = QHPass.getConfig("protocol") == "https" ? QHDomain.login_https: QHDomain.login_http,
			r = "phone",
			i = QHPass.trim(QHPass.g(e.phone).value);
			i ? /^1(3|4|5|7|8)\d{9}$/.test(i) ? t && QHPass.loadJsonp(n + "/index.php?op=checkmobile&mobile=" + encodeURIComponent(i) + "&r=" + Math.random(), A) : E(r, tipTextReg.reg_wrong_phone_format) : E(r, tipTextReg.reg_wrong_phone_empty)
		}
		function A(e) {
			0 == e.errno ? S("phone", e.msg, e.errno) : e.errno == 1037 ? E("phone", e.msg + tipTextReg.immediately_login_tips, e.errno) : E("phone", e.msg, e.errno)
		}
		function O() {
			var t = e.password,
			n = "pwd",
			r = QHPass.g(t).value,
			i = _(r),
			s = /[\u4e00-\u9fa5]+/,
			o = /^\s*$/;
			r && r.length >= 6 && r.length <= 20 ? s.test(r) ? E(n, tipTextReg.reg_wrong_password_chinese) : i < 3 ? r ? o.test(r) ? E(n, tipTextReg.reg_wrong_password_emptychars) : i == 0 ? E(n, tipTextReg.reg_wrong_password_same_chars) : i == 1 ? E(n, tipTextReg.reg_wrong_password_lx_chars) : i == 2 ? E(n, tipTextReg.reg_wrong_password_weaklevel) : E(n, tipTextReg.reg_wrong_password_weaklevel) : E(n, tipTextReg.reg_wrong_password_empty) : S(n, tipTextReg.reg_default_password) : E(n, tipTextReg.reg_wrong_default_password)
		}
		function M(e) {
			var t = e.length,
			n = e.slice(0),
			r,
			i;
			while (--t > 0) {
				i = n[t],
				r = t;
				while (r--) if (i === n[r]) {
					n.splice(t, 1);
					break
				}
			}
			return n
		}
		function _(e) {
			function u(e) {
				e += "";
				var t = e.length,
				n = !0,
				r = e.charCodeAt(t - 1) - e.charCodeAt(0) > 0 ? 1 : -1;
				for (var i = 0; i < t - 1; i++) if (r !== e.charCodeAt(i + 1) - e.charCodeAt(i)) return n = !1,
				n;
				return n
			}
			e += "";
			var t = e.length,
			n = e.split(""),
			r = M(n),
			i = r.length,
			s = -1;
			cflag = u(e);
			if (t < 6 || t > 20) s = -1;
			else if (i == 1) s = 0;
			else if (cflag) s = 1;
			else if (w.join("#").indexOf(e) > -1) s = 2;
			else {
				var o = {
					d: 0,
					c: 0,
					o: 0
				};
				QHPass.forEach(r,
				function(e, t) { / \d / .test(e) ? o.d = 1 : /[a-zA-Z]/.test(e) ? o.c = 1 : o.o = 1
				}),
				s = o.d + o.c + o.o + (t > 9 ? 2 : 1),
				s = s == 2 ? s + 1 : s
			}
			return s
		}
		function D() {
			var t = e.phrase;
			if (!t || !QHPass.g(t)) return;
			if (!h) return;
			var n = "phrase",
			r = QHPass.trim(QHPass.g(t).value); (r.length < 0 || r.length > 7) && E(n, tipTextReg.reg_wrong_default_phrase)
		}
		function P(e) {
			QHPass.getCaptchaUrl("reg", o, e)
		}
		function H() {
			QHPass.g(e.phraseImg).src = u + "&_=" + Math.random()
		}
		function B() {
			var e = QHPass.getConfig("needHttpsDomains");
			QHPass.forEach(t,
			function(t) {
				e.indexOf(t) > -1 ? n.push("https://login." + t) : n.push("http://login." + t)
			})
		}
		function j() {
			a = 0,
			QHPass.loadJs(n[a] + "/?o=sso&m=setcookie&func=QHPass.regUtils.rdCallBack&" + "s=" + i)
		}
		function F(e) {
			e.errno == 0 ? (a += 1, a == n.length ? (clearTimeout(QHPass._timeoutHandler), QHPass.execCallback(s)) : QHPass.loadJs(n[a] + "/?o=sso&m=setcookie&func=QHPass.regUtils.rdCallBack&" + "s=" + i)) : (clearTimeout(QHPass._timeoutHandler), QHPass.execCallback(s))
		}
		function I(e) {
			if (0 == e.res) S("username", e.msg, e.errno);
			else {
				var t = e.msg + tipTextReg.immediately_login_tips;
				E("username", t, e.userinfo)
			}
		}
		function R(e) {
			if (f > 0) return;
			q[e] && q[e](!1);
			if (f > 0) return;
			O();
			if (f > 0) return;
			D()
		}
		function U(t) {
			f = 0,
			L(!1);
			if (f > 0) return;
			var n = "smsCode",
			r = QHPass.trim(QHPass.g(e.phone).value);
			QHPass.loadJsonp(QHDomain.i360 + "/smsApi/sendsmscode?account=" + r + "&condition=2&r=" + Math.random(),
			function(e) {
				t && t(e),
				e.errno == "0" ? S(n, e.errmsg, e.errno) : e.errno == 1106 ? E(n, "\u5e10\u53f7\u5df2\u5b58\u5728" + tipTextReg.immediately_login_tips, e.errno) : E(n, e.errmsg, e.errno)
			})
		}
		function X() {
			var t = QHPass.getConfig("protocol", "https");
			f = 0,
			QHPass.trace("submit"),
			R(r);
			if (f > 0) return;
			beforeFun && beforeFun(),
			QHPass._timeoutHandler = setTimeout(function() {
				E("network", "\u7f51\u7edc\u8d85\u65f6~"),
				g && g()
			},
			2e4);
			var n = {
				account: QHPass.trim(QHPass.g(e[z[r]]).value),
				acctype: W[r],
				password: hex_md5(QHPass.g(e.password).value),
				rePassword: hex_md5(QHPass.g(e.password).value),
				captcha: e.phrase && QHPass.g(e.phrase) ? QHPass.g(e.phrase).value: "",
				smscode: e.smsCode && QHPass.g(e.smsCode) ? QHPass.g(e.smsCode).value: "",
				src: l,
				is_agree: QHPass.g(e.isAgree).checked ? "1": "0",
				charset: c,
				loginEmailActiveFlag: "0",
				captchaApp: o,
				captchaFlag: h ? "1": "0",
				proxy: t + "://" + location.host + "/psp_jump.html",
				callback: "parent.QHPass.regUtils.submitCB",
				requestScema: t
			};
			QHPass.CrossDomainRequest(QHDomain.i360 + "/reg/doregAccount", n),
			y && y()
		}
		function V(t) {
			var n = "";
			t.errdetail && (n = JSON.parse(decodeURIComponent(t.errdetail)), u = n.captchaUrl),
			b && b(),
			t.errno == 0 ? (i = t.rd, j()) : t.errno == 78e3 ? (phraseFun && phraseFun(), QHPass.g(e.phraseWrapper).style.display = "block", E("phrase", tipTextReg.reg_wrong_phrase_input, t)) : t.errno == 78001 ? (phraseFun && phraseFun(), QHPass.g(e.phraseWrapper).style.display = "block", E("phrase", tipTextReg.reg_wrong_phrase_ban, t)) : t.errno == 1670 ? (h = !0, phraseFun && phraseFun(), E("phrase", decodeURIComponent(t.errmsg), t.errno)) : E("rd", decodeURIComponent(t.errmsg), t.errno)
		}
		function $(n, i) {
			e = i.doms,
			t = i.domainList || QHPass.getConfig("domainList", t),
			r = i.regway,
			s = n,
			l = i.src || QHPass.getConfig("src"),
			o = i.captchaAppId || o,
			c = i.postCharset || document.charset,
			p = i.extFun.error,
			d = i.extFun.correct,
			v = i.extFun.init,
			beforeFun = i.extFun.before,
			g = i.extFun.httpTimeout,
			y = i.extFun.loading,
			b = i.extFun.after,
			phraseFun = i.extFun.phrase,
			h = i.captFlag,
			B(),
			v && v(),
			r != "phone" && P(function(e) {
				u = e,
				H()
			})
		}
		var e = {},
		t = QHPass.domainList,
		n = [],
		r = "",
		i = "",
		s = "",
		o = "i360",
		u = "",
		a = 0,
		f = 0,
		l = "",
		c = "",
		h = !0,
		p = null,
		d = null,
		v = null,
		m = null,
		g = null,
		y = null,
		b = null,
		w = ["asdasd", "asdfgh", "asdfghjkl", "Iloveyou", "qwerty", "Password", "Passwd", "Woaini", "Wodemima", "Woaiwojia", "zxcvbn", "tamade", "nimade", "123abc", "0123456", "0123456789", "100200", "102030", "121212", "111222", "115415", "123000", "123123", "123789", "12301230", "123321", "123456", "1234560", "123465", "1234567", "12345678", "123456789", "1234567890", "123123123", "1314520", "1314521", "147258369", "147852369", "159357", "168168", "201314", "211314", "321321", "456456", "4655321", "521521", "5201314", "520520", "741852", "741852963", "7758258", "7758521", "654321", "852963", "987654", "963852741", "000000", "111111", "11111111", "112233", "666666", "888888", "abcdef", "abcabc", "abc123", "a1b2c3", "aaa111", "123qwe", "qweasd", "admin", "password", "p@ssword", "passwd", "iloveyou", "1qaz2wsx", "qwertyuiop", "qq123456", "1q2w3e4r", "123456abc", "abc123456", "qazwsxedc", "1q2w3e4r5t"];
		QHPass._timeoutHandler = null;
		var q = {
			email: x,
			username: C,
			phone: function(e) {
				L(e);
				if (f > 0) return;
				k()
			}
		},
		z = {
			email: "loginEmail",
			username: "username",
			phone: "phone"
		},
		W = {
			email: "1",
			username: "4",
			phone: "2"
		};
		return {
			run: $,
			submit: X,
			submitCB: V,
			checkLoginEmail: x,
			checkUsername: C,
			checkPhone: L,
			checkSmsCode: k,
			loginEmailCallback: N,
			checkUsernameCallback: I,
			checkPhoneCallback: A,
			getSmsCode: U,
			showError: E,
			showCorrect: S,
			customError: p,
			rdCallBack: F,
			getCaptchaUrl: P,
			setPhrase: H
		}
	} ();
	var tipTextSetname = {
		username_short: "\u7528\u6237\u540d\u6700\u5c11\u4f7f\u75282\u4e2a\u5b57\u7b26\u6216\u6c49\u5b57",
		username_long: "\u7528\u6237\u540d\u4e0d\u8d85\u8fc77\u4e2a\u6c49\u5b57\u621614\u4e2a\u5b57\u7b26",
		username_chars: "\u7528\u6237\u540d\u4e0d\u80fd\u5305\u542b\u7279\u6b8a\u5b57\u7b26",
		username_empty: "\u8bf7\u8f93\u5165\u6709\u6548\u7684\u7528\u6237\u540d"
	};
	QHPass.mShowSetname = function(e, t) {
		t = t || {},
		QHPass.setnameUtils.run(e, t)
	},
	QHPass.setnameUtils = function() {
		function d(t, n, r) {
			QHPass.trace(t),
			o++;
			var s = QHPass.g(e.globalTips);
			s && (s.innerHTML = n, s.style.display = "block"),
			i && i({
				type: t,
				msg: n,
				extra: r
			}),
			clearTimeout(QHPass._timeoutHandler)
		}
		function v(t, n, r) {
			var i = QHPass.g(e.globalTips);
			i && (i.innerHTML = n, i.style.display = "none"),
			s && s({
				type: t,
				msg: n,
				extra: r
			})
		}
		function m(t) {
			var n = QHPass.getConfig("protocol") == "https" ? QHDomain.login_https: QHDomain.login_http,
			r = e.username,
			i = "username",
			s = QHPass.trim(QHPass.g(r).value),
			o = QHPass.byteLen(s),
			u = /^[0-9a-zA-Z\u4e00-\u9fa5_\.]*$/i,
			a = n + "/?op=checkuser&userName=" + encodeURIComponent(s) + "&r=" + Math.random();
			s ? 0 == u.test(s) ? d(i, tipTextSetname.username_chars) : o < 2 ? d(i, tipTextSetname.username_short) : o > 14 ? d(i, tipTextSetname.username_long) : t && QHPass.loadJsonp(a,
			function(e) {
				var t = decodeURIComponent(e.msg);
				0 == e.res ? (h && h(e), v("username", t, e.errno)) : d("username", t, {
					errno: e.errno,
					userInfo: e.userinfo
				})
			}) : d(i, tipTextSetname.username_empty)
		}
		function g() {
			var t = QHPass.getConfig("protocol", "https"),
			i = t == "https" ? QHDomain.login_https: QHDomain.login_http;
			o = 0,
			m(!1);
			if (o > 0) return;
			beforeFun && beforeFun(),
			QHPass._timeoutHandler = setTimeout(function() {
				l && l(),
				d("network", "\u7f51\u7edc\u8d85\u65f6~")
			},
			2e4);
			var s = {
				userName: QHPass.trim(QHPass.g(e.username).value),
				o: "User",
				m: "modifyUserName",
				from: n,
				crumb: u && u.crumb || "",
				charset: r,
				proxy: t + "://" + location.host + "/psp_jump.html",
				callback: "parent.QHPass.setnameUtils.setnameCallback",
				requestScema: t
			};
			QHPass.CrossDomainRequest(i, s)
		}
		function y(e) {
			p && p();
			if (e.errno == 0) clearTimeout(QHPass._timeoutHandler),
			QHPass.execCallback(t);
			else {
				var n = decodeURIComponent(e.errmsg);
				d("username", n, e.errno)
			}
		}
		function b(o, f) {
			e = f.doms,
			t = o,
			n = f.src,
			r = f.postCharset,
			h = f.extFun.checkNameSucess,
			i = f.extFun.error,
			s = f.extFun.correct,
			a = f.extFun.init,
			l = f.extFun.httpTimeout,
			beforeFun = f.extFun.before,
			c = f.extFun.loading,
			p = f.extFun.after,
			a && a(),
			QHPass.getUserInfo(function(e) {
				u = e
			})
		}
		var e = {},
		t = null,
		n = "",
		r = "",
		i = null,
		s = null,
		o = 0,
		u = null,
		a = null,
		f = null,
		l = null,
		c = null,
		h = null,
		p = null;
		return QHPass._timeoutHandler = null,
		{
			run: b,
			submit: g,
			checkUsername: m,
			showError: d,
			showCorrect: v,
			setnameCallback: y
		}
	} ();

	var errTimeout;

	//接口文档
	window.QHDomain = {
		'i360':'http://i.360.cn',
		'login_http':'http://login.360.cn',
		'login_https':'https://login.360.cn',
		'js_login':'http://js.login.360.cn',
		'1360':'http://www.1360.com',
		'qihoo':'http://www.qihoo.com',
		'so':'http://www.so.com',
		'woxihuan':'http://www.woxihuan.com',
		'yunpan':'http://yunpan.360.cn',
		'help':'http://help.360.cn',
		'baike':'http://baike.360.cn',
		'rdLoginUrl':{
			"qihoo":"http:\/\/login.qihoo.com",
			"woxihuan":"http:\/\/login.woxihuan.com",
			"1360":"http:\/\/login.1360.com",
			"so":"http:\/\/login.so.com",
			"360pay":"http:\/\/login.360pay.cn",
			"leidian":"http:\/\/login.leidian.com",
			"qikoo":"http:\/\/login.qikoo.com"
		},
		'captcha':'http://i.360.cn/reg/dogetcap?i360',
		'jifen':'http://jifen.360.cn',
		'src':'pcw_i360',
		'srcRoot': 'i360'
	};
	window.QHUserInfo = {
		'loginStatus' : '',/*****1为登录，0为未登录*******/
		'figure' : '',
		'qid' : '',
		'userName' : '',
		'nickName' : '',
		'loginEmail' : ''
	};

	//baoyuanhui
	//周期函数
	var loginUsernameInterval, loginPasswordInterval, loginPhraseInterval,
	registerUsernameInterval, registerPasswordInterval, registerSmsInterval;
	//业务src
	var src = "pcw_i360";
	window.qCrumb = "";
	var domainList = '';
	var destUrl = "";
	var destDomain = '';

	monitor.setProject('360passportwap').getTrack().getClickAndKeydown();
	QHPass.setConfig('src', 'pcw_i360');
	window.QHPass = QHPass;

	//注册接口
	function initMobileReg(e, t, n, r, c) {
		var i, s = detector.device.name,
		o = detector.browser.name,
		u = s == "mac" || s == "iphone" || s == "ipad" || o == "safari",
		a = "";
		n || (n = "so.com,qihoo.com,haosou.com,yunpan.cn,leidian.com,qikoo.com,360kan.com,qiku.com,360.com"),
		u ? a = ["360"] : a = "",

		QHPass.mShowReg(function() {
			if(c && typeof c === 'function'){
					c();
			}
			hide();
			//显示注册成功
			$("#qt_global_text").html("注册成功"),
			$("#qt_global_text").css("top", "45%"),
			i && clearTimeout(i),
			i = setTimeout(function() {
				$("#qt_global_text").css("top", "-40%");

			},2e3);
		},
		{
			doms: {
				globalTips: "qt_global_text",
				smsCode: "qt_smscode",
				phone: "qt_phone",
				password: "qt_mobile_password",
				isAgree: "qt_mobile_agree"
			},
			extFun: {
				init: function() {
					$("#qt_phone").blur(function() {
						QHPass.regUtils.checkPhone(!0)
					}),
					$("#qt_mobile_reg").click(function() {
						var e = $(this).hasClass("clicked");
						if (e) return;
						$(this).addClass("clicked").val("\u63d0\u4ea4\u4e2d..."),
						QHPass.regUtils.submit()
					}),
					$("#qt_mobile_password").on("keyup",
					function(e) {
						var t = e.keyCode;
						t == 13 && $("#qt_mobile_reg").trigger("click")
					}),
					$(".get-sms-token").on("click",
					function() {
						var e = $(this),
						t = "disabled";
						if (e.hasClass(t)) return;
						QHPass.regUtils.getSmsCode(function(n) {
							if (n.errno == 0) {
								e.addClass(t);
								var r = 120,
								i = null;
								i = setInterval(function() {
									e.text(r + "\u79d2\u540e\u91cd\u53d1"),
									r--,
									r < 1 && (clearInterval(i), e.text("\u83b7\u53d6\u6821\u9a8c\u7801").removeClass(t))
								},
								1e3)
							}
						})
					}),
					$(".reg-email").on("click",
					function(i) {
						i.preventDefault(),
						$(".mobile-reg-wrapper").hide(),
						$(".email-reg-wrapper").show();
					}),
					$("body").delegate(".clk-quc-login", "click",
					function(e) {
						e.preventDefault(),
						$(".btn-login").trigger("click")
					})
				},
				error: function() {
					$("#qt_global_text").css("top", "45%"),
					i && clearTimeout(i),
					i = setTimeout(function() {
						$("#qt_global_text").css("top", "-40%")
					},
					2e3),
					$("#qt_mobile_reg").removeClass("clicked").val("快速登录");
				},
				correct: function() {
					$("#qt_global_text").css("top", "-40%")
				},
				before: function() {},
				loading: function() {},
				after: function() {}
			},
			regway: "phone",
			domainList: a,
			src: e
		})
	}
	//登录接口
	function initLogin(callback) {
		QHPass.mShowLogin(function(){
			if(callback && typeof callback === 'function'){
				callback();
			}
			//隐藏登录框
			hide();
			//显示登录成功
			$("#qt_global_text").html("登录成功"),
			$("#qt_global_text").css("top", "45%"),
			i && clearTimeout(i),
			i = setTimeout(function() {
				$("#qt_global_text").css("top", "-40%")
			},
			2e3);
		},{
			doms:{
				account:'qt_account',
				password:'qt_password',
				phrase:'qt_phrase',
				phraseWrapper: 'qt_phrase_wrapper',
				isAutologin:'qtis_autologin',
				globalTips:'qt_global_text',
				phraseImg: 'qt_phrasecode'
			},
			extFun:{
				init: function(){
					//提交
					$("#qt_btn").on('click', function(){
						$(this).val('提交中...');
						QHPass.loginUtils.submit();
					});
					//验证码刷新绑定
					$('.adaptive img').on('click',function() {
						QHPass.loginUtils.setPhrase();
					});

					$('.btn-reg').on('click', function(e) {
						e.preventDefault();
						var href = $(this).attr('href');
						location.href = href + '?destUrl='+href+'&src='+src;
					});
				},
				phrase:function(){
					$(".adaptive").show();
					$('#qt_phrase').focus();
					QHPass.loginUtils.setPhrase();
					$("#qt_btn").val('立即登录');
				},
				error:function(){
					$('#qt_global_text').css('top','45%');
					QHPass.loginUtils.setPhrase();
					if(errTimeout) clearTimeout(errTimeout);
					errTimeout = setTimeout(function(){
						$('#qt_global_text').css('top','-40px');
					}, 3000);
					$("#qt_btn").val('立即登录');
				}
			},
			phraseTime:'center'
		});
	};

	function initRegister(callback){
		initMobileReg(src, destUrl, domainList, destDomain, callback);
	};

	function hide(){
		$('#login_content').hide();
	};



	//返回接口
	return {
		checkLogin: function(callback ,exit){
			console.log("checkLogin--------------");
			QHPass.getUserInfo(function(info){
				//成功，用户已登录
				if(!callback){
					console.log(info);
				}
				else{
					callback();
				}
			},function(info){
				//失败，用户未登录
				login_360.initLogin(callback, exit);
			});
		},

		initLogin: function(callback, exit){
			callback = typeof callback === "function" ? callback : function(){};
			exit = typeof exit === "function" ? exit : function(){};
			hide();
			var template = Handlebars.compile($('#login_template').html());
			var compiledDOM = template();
			$('#login_content').html(compiledDOM);
			//关闭按钮
			$('#login_exit_button').on('click', function(){
				hide();
				exit();
			});
			//快速注册按钮
			$('#register_button').on('click', function(){
				login_360.hide();
				login_360.initRegister(callback);
			});
			//当用户名框不为空时，显示清空按钮
			//浏览器滚动到用户名处
			$('#qt_account').focus(function(){
				scrollTo(0, $('#qt_account').offset().top + 10);
				loginUsernameInterval = setInterval(function(){
					if($('#qt_account').val() !== ""){
						$('#input_clear_username').show();
					}
					else{
						$('#input_clear_username').hide();
					}
				}, 1/60);

			});
			$('#qt_account').blur(function(){
				clearInterval(loginUsernameInterval);
			});
			//一键清空用户名
			$('#input_clear_username').on('click', function(){
				$('#qt_account').val("");
				$('#qt_account')[0].focus();
			});
			//当密码框不为空时，显示清空按钮
			$('#qt_password').focus(function(){
				scrollTo(0, $('#qt_password').offset().top + 10);
				loginPasswordInterval = setInterval(function(){
					if($('#qt_password').val() !== ""){
						$('#input_clear_password').show();
					}
					else{
						$('#input_clear_password').hide();
					}
				}, 1/60);

			});
			$('#qt_password').blur(function(){
				clearInterval(loginPasswordInterval);
			});
			//一键清空密码
			$('#input_clear_password').on('click', function(){
				$('#qt_password').val("");
				$('#qt_password')[0].focus();
			});

			//验证码也是如此
			$('#qt_phrase').focus(function(){
				scrollTo(0, $('#qt_phrase').offset().top + 10);
				loginPhraseInterval = setInterval(function(){
					if($('#qt_phrase').val() !== ""){
						$('#input_clear_phrase').show();
					}
					else{
						$('#input_clear_phrase').hide();
					}
				}, 1/60);

			});
			$('#qt_phrase').blur(function(){
				clearInterval(loginPhraseInterval);
			});
			$('#input_clear_phrase').on('click', function(){
				$('#qt_phrase').val("");
				$('#qt_phrase')[0].focus();
			});
			initLogin(callback);
			$('#login_content').show();
		},

		initRegister: function(callback){
			hide();
			var template = Handlebars.compile($('#register_template').html());
			var compiledDOM = template();
			$('#login_content').html(compiledDOM);
			//返回按钮，退出注册，返回登录
			$('#login_return_button').on('click', function(){
				login_360.hide();
				//提示取消注册
				$("#qt_global_text").html("取消注册"),
				$("#qt_global_text").css("top", "45%"),
				i && clearTimeout(i),
				i = setTimeout(function() {
					$("#qt_global_text").css("top", "-40%")
				},2e3),
				$("#qt_mobile_reg").removeClass("clicked").val("快速登录");
				login_360.initLogin(callback);
			});
			//当用户名框不为空时，显示清空按钮
			$('#qt_phone').focus(function(){
				scrollTo(0, $('#qt_phone').offset().top + 10);
				registerUsernameInterval = setInterval(function(){
					if($('#qt_phone').val() !== ""){
						$('#input_clear_username').show();
					}
					else{
						$('#input_clear_username').hide();
					}
				}, 1/60);

			});
			$('#qt_phone').blur(function(){
				clearInterval(registerUsernameInterval);
			});
			//一键清空用户名
			$('#input_clear_username').on('click', function(){
				$('#qt_phone').val("");
				$('#input_clear_username').hide();
			});

			//当密码框不为空时，显示清空按钮
			$('#qt_mobile_password').focus(function(){
				scrollTo(0, $('#qt_mobile_password').offset().top + 10);
				registerPasswordInterval = setInterval(function(){
					if($('#qt_mobile_password').val() !== ""){
						$('#input_clear_password').show();
					}
					else{
						$('#input_clear_password').hide();
					}
					//当密码长度大于20时，提示
					if($('#qt_mobile_password').val().length > 20){
						$('#qt_mobile_password').val($('#qt_mobile_password').val().substring(0, 20));
						$("#qt_global_text").html("密码长度不能大于20位"),
						$("#qt_global_text").css("top", "45%"),
						i && clearTimeout(i),
						i = setTimeout(function() {
							$("#qt_global_text").css("top", "-40%")
						},2e3),
						$("#qt_mobile_reg").removeClass("clicked").val("快速登录");
					}
				}, 1/60);
			});
			$('#qt_mobile_password').blur(function(){
				clearInterval(registerPasswordInterval);
			});
			//一键清空密码
			$('#input_clear_password').on('click', function(){
				$('#qt_mobile_password').val("");
				$('#input_clear_password').hide();
			});

			//验证码也是如此
			$('#qt_smscode').focus(function(){
				scrollTo(0, $('#qt_smscode').offset().top + 10);
				registerSmsInterval = setInterval(function(){
					if($('#qt_smscode').val() !== ""){
						$('#input_clear_smscode').show();
					}
					else{
						$('#input_clear_smscode').hide();
					}
				}, 1/60);

			});
			$('#qt_smscode').blur(function(){
				clearInterval(registerSmsInterval);
			});

			$('#input_clear_smscode').on('click', function(){
				$('#qt_smscode').val("");
				$('#input_clear_smscode').hide();
			});
			initRegister(callback);
			$('#login_content').show();
		},

		hide: function(){
			$('#login_content').hide();
		},

		//开发商接口调用
		g: QHPass.getUserInfo,
	}
});

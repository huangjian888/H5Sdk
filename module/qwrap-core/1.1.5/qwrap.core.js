//document.write('<script type="text/javascript" src="' + srcPath + 'core/core_base.js"><\/script>');
(function() {
	if(typeof $ === 'undefined') {
		$ = {};
	}
}());
//document.write('<script type="text/javascript" src="' + srcPath + 'core/string.h.js"><\/script>');
(function() {
	var StringH = {
		trim: function(s) {
			return s.replace(/^[\s\uFEFF\xa0\u3000]+|[\uFEFF\xa0\u3000\s]+$/g, "");
		},
		mulReplace: function(s, arr) {
			for (var i = 0; i < arr.length; i++) {
				s = s.replace(arr[i][0], arr[i][1]);
			}
			return s;
		},
		format: function(s, arg0) {
			var args = arguments;
			return s.replace(/\{(\d+)\}/ig, function(a, b) {
				var ret = args[(b | 0) + 1];
				return ret == null ? '' : ret;
			});
		},
		tmpl: (function() {
			
			var tmplFuns={};
			/*
			sArrName 拼接字符串的变量名。
			*/
			var sArrName = "sArrCMX",
				sLeft = sArrName + '.push("';
			/*
				tag:模板标签,各属性含义：
				tagG: tag系列
				isBgn: 是开始类型的标签
				isEnd: 是结束类型的标签
				cond: 标签条件
				rlt: 标签结果
				sBgn: 开始字符串
				sEnd: 结束字符串
			*/
			var tags = {
				'=': {
					tagG: '=',
					isBgn: 1,
					isEnd: 1,
					sBgn: '",$.StringH.encode4HtmlValue(',
					sEnd: '),"'
				},
				'js': {
					tagG: 'js',
					isBgn: 1,
					isEnd: 1,
					sBgn: '");',
					sEnd: ';' + sLeft
				},
				'js': {
					tagG: 'js',
					isBgn: 1,
					isEnd: 1,
					sBgn: '");',
					sEnd: ';' + sLeft
				},
				//任意js语句, 里面如果需要输出到模板，用print("aaa");
				'if': {
					tagG: 'if',
					isBgn: 1,
					rlt: 1,
					sBgn: '");if',
					sEnd: '{' + sLeft
				},
				//if语句，写法为{if($a>1)},需要自带括号
				'elseif': {
					tagG: 'if',
					cond: 1,
					rlt: 1,
					sBgn: '");} else if',
					sEnd: '{' + sLeft
				},
				//if语句，写法为{elseif($a>1)},需要自带括号
				'else': {
					tagG: 'if',
					cond: 1,
					rlt: 2,
					sEnd: '");}else{' + sLeft
				},
				//else语句，写法为{else}
				'/if': {
					tagG: 'if',
					isEnd: 1,
					sEnd: '");}' + sLeft
				},
				//endif语句，写法为{/if}
				'for': {
					tagG: 'for',
					isBgn: 1,
					rlt: 1,
					sBgn: '");for',
					sEnd: '{' + sLeft
				},
				//for语句，写法为{for(var i=0;i<1;i++)},需要自带括号
				'/for': {
					tagG: 'for',
					isEnd: 1,
					sEnd: '");}' + sLeft
				},
				//endfor语句，写法为{/for}
				'while': {
					tagG: 'while',
					isBgn: 1,
					rlt: 1,
					sBgn: '");while',
					sEnd: '{' + sLeft
				},
				//while语句,写法为{while(i-->0)},需要自带括号
				'/while': {
					tagG: 'while',
					isEnd: 1,
					sEnd: '");}' + sLeft
				} //endwhile语句, 写法为{/while}
			};

			return function(sTmpl, opts) {

				var fun  = tmplFuns[sTmpl];
				if (!fun) {
					var N = -1,
						NStat = []; //语句堆栈;
					var ss = [
						[/\{strip\}([\s\S]*?)\{\/strip\}/g, function(a, b) {
							return b.replace(/[\r\n]\s*\}/g, " }").replace(/[\r\n]\s*/g, "");
						}],
						[/\\/g, '\\\\'],
						[/"/g, '\\"'],
						[/\r/g, '\\r'],
						[/\n/g, '\\n'], //为js作转码.
						[
							/\{[\s\S]*?\S\}/g, //js里使用}时，前面要加空格。
							function(a) {
								a = a.substr(1, a.length - 2);
								for (var i = 0; i < ss2.length; i++) {a = a.replace(ss2[i][0], ss2[i][1]); }
								var tagName = a;
								if (/^(=|.\w+)/.test(tagName)) {tagName = RegExp.$1; }
								var tag = tags[tagName];
								if (tag) {
									if (tag.isBgn) {
										var stat = NStat[++N] = {
											tagG: tag.tagG,
											rlt: tag.rlt
										};
									}
									if (tag.isEnd) {
										if (N < 0) {throw new Error("Unexpected Tag: " + a); }
										stat = NStat[N--];
										if (stat.tagG != tag.tagG) {throw new Error("Unmatch Tags: " + stat.tagG + "--" + tagName); }
									} else if (!tag.isBgn) {
										if (N < 0) {throw new Error("Unexpected Tag:" + a); }
										stat = NStat[N];
										if (stat.tagG != tag.tagG) {throw new Error("Unmatch Tags: " + stat.tagG + "--" + tagName); }
										if (tag.cond && !(tag.cond & stat.rlt)) {throw new Error("Unexpected Tag: " + tagName); }
										stat.rlt = tag.rlt;
									}
									return (tag.sBgn || '') + a.substr(tagName.length) + (tag.sEnd || '');
								} else {
									return '",(' + a + '),"';
								}
							}
						]
					];
					var ss2 = [
						[/\\n/g, '\n'],
						[/\\r/g, '\r'],
						[/\\"/g, '"'],
						[/\\\\/g, '\\'],
						[/\$(\w+)/g, 'opts["$1"]'],
						[/print\(/g, sArrName + '.push(']
					];
					for (var i = 0; i < ss.length; i++) {
						sTmpl = sTmpl.replace(ss[i][0], ss[i][1]);
					}
					if (N >= 0) {throw new Error("Lose end Tag: " + NStat[N].tagG); }
					
					sTmpl = sTmpl.replace(/##7b/g,'{').replace(/##7d/g,'}').replace(/##23/g,'#'); //替换特殊符号{}#
					sTmpl = 'var ' + sArrName + '=[];' + sLeft + sTmpl + '");return ' + sArrName + '.join("");';
					
					//alert('转化结果\n'+sTmpl);
					tmplFuns[sTmpl] = fun = new Function('opts', sTmpl);
				}

				if (arguments.length > 1) {return fun(opts); }
				return fun;
			};
		}()),
		contains: function(s, subStr) {
			return s.indexOf(subStr) > -1;
		},
		dbc2sbc: function(s) {
			return StringH.mulReplace(s, [
				[/[\uff01-\uff5e]/g, function(a) {
					return String.fromCharCode(a.charCodeAt(0) - 65248);
				}],
				[/\u3000/g, ' '],
				[/\u3002/g, '.']
			]);
		},
		byteLen: function(s) {
			return s.replace(/[^\x00-\xff]/g, "--").length;
		},
		subByte: function(s, len, tail) {
			if (StringH.byteLen(s) <= len) {return s; }
			tail = tail || '';
			len -= StringH.byteLen(tail);
			return s.substr(0, len).replace(/([^\x00-\xff])/g, "$1 ") //双字节字符替换成两个
				.substr(0, len) //截取长度
				.replace(/[^\x00-\xff]$/, "") //去掉临界双字节字符
				.replace(/([^\x00-\xff]) /g, "$1") + tail; //还原
		},

		camelize: function(s) {
			return s.replace(/\-(\w)/ig, function(a, b) {
				return b.toUpperCase();
			});
		},
		decamelize: function(s) {
			return s.replace(/[A-Z]/g, function(a) {
				return "-" + a.toLowerCase();
			});
		},
		encode4Js: function(s) {
			return StringH.mulReplace(s, [
				[/\\/g, "\\u005C"],
				[/"/g, "\\u0022"],
				[/'/g, "\\u0027"],
				[/\//g, "\\u002F"],
				[/\r/g, "\\u000A"],
				[/\n/g, "\\u000D"],
				[/\t/g, "\\u0009"]
			]);
		},
		escapeChars: function(s){
			return StringH.mulReplace(s, [
				[/\\/g, "\\\\"],
				[/"/g, "\\\""],
				//[/'/g, "\\\'"],//标准json里不支持\后跟单引号
				[/\r/g, "\\r"],
				[/\n/g, "\\n"],
				[/\t/g, "\\t"]
			]);
		},
		encode4Http: function(s) {
			return s.replace(/[\u0000-\u0020\u0080-\u00ff\s"'#\/\|\\%<>\[\]\{\}\^~;\?\:@=&]/g, function(a) {
				return encodeURIComponent(a);
			});
		},
		encode4Html: function(s) {
			var el = document.createElement('pre'); //这里要用pre，用div有时会丢失换行，例如：'a\r\n\r\nb'
			var text = document.createTextNode(s);
			el.appendChild(text);
			return el.innerHTML;
		},
		encode4HtmlValue: function(s) {
			return StringH.encode4Html(s).replace(/"/g, "&quot;").replace(/'/g, "&#039;");
		},
		decode4Html: function(s) {
			var div = document.createElement('div');
			div.innerHTML = StringH.stripTags(s);
			return div.childNodes[0] ? div.childNodes[0].nodeValue || '' : '';
		},
		stripTags: function(s) {
			return s.replace(/<[^>]*>/gi, '');
		},
		evalJs: function(s, opts) { //如果用eval，在这里需要加引号，才能不影响YUI压缩。不过其它地方用了也会有问题，所以改成evalJs，
			return new Function("opts", s)(opts);
		},
		evalExp: function(s, opts) {
			return new Function("opts", "return (" + s + ");")(opts);
		},
		queryUrl: function(url, key) {
			url = url.replace(/^[^?=]*\?/ig, '').split('#')[0];	//去除网址与hash信息
			var json = {};
			//考虑到key中可能有特殊符号如“[].”等，而[]却有是否被编码的可能，所以，牺牲效率以求严谨，就算传了key参数，也是全部解析url。
			url.replace(/(^|&)([^&=]+)=([^&]*)/g, function (a, b, key , value){
				//对url这样不可信的内容进行decode，可能会抛异常，try一下；另外为了得到最合适的结果，这里要分别try
				try {
				key = decodeURIComponent(key);
				} catch(e) {}
				try {
				value = decodeURIComponent(value);
				} catch(e) {}
				if (!(key in json)) {
					json[key] = /\[\]$/.test(key) ? [value] : value; //如果参数名以[]结尾，则当作数组
				}
				else if (json[key] instanceof Array) {
					json[key].push(value);
				}
				else {
					json[key] = [json[key], value];
				}
			});
			return key ? json[key] : json;
		},
		decodeURIJson: function(url){
			return StringH.queryUrl(url);
		}
	};
	$.StringH = StringH;
}());
//document.write('<script type="text/javascript" src="' + srcPath + 'core/object.h.js"><\/script>');
(function() {
	var escapeChars = $.StringH.escapeChars;
	function getConstructorName(o) {
		//加o.constructor是因为IE下的window和document
		if(o != null && o.constructor != null){
			return  Object.prototype.toString.call(o).slice(8, -1);
		}else{
			return '';
		}
	}
	//注意类型判断如果用.constructor比较相等和用instanceof都会有跨iframe的问题，因此尽量避免
	//用typeof和Object.prototype.toString不会有这些问题
	var ObjectH = {
		isString: function(obj) {
			return getConstructorName(obj) == 'String';
		},
		isFunction: function(obj) {
			return getConstructorName(obj) == 'Function';
		},
		isArray: function(obj) {
			return getConstructorName(obj) == 'Array';
		},
		isArrayLike: function(obj) {
			return !!obj && typeof obj == 'object' && obj.nodeType != 1 && typeof obj.length == 'number';
		},
		isObject: function(obj) {
			return obj !== null && typeof obj == 'object';
		},
		isPlainObject: function(obj) {
			return getConstructorName(obj) == 'Object';
		},
		isElement: function(obj) {
			return !!obj && obj.nodeType == 1;
		},
		set: function(obj, prop, value) {
			if (ObjectH.isArray(prop)) {
				//set(obj, props, values)
				for (var i = 0; i < prop.length; i++) {
					ObjectH.set(obj, prop[i], value[i]);
				}
			} else if (ObjectH.isPlainObject(prop)) {
				//set(obj, propJson)
				for (i in prop) {
					ObjectH.set(obj, i, prop[i]);
				}
			} else if (ObjectH.isFunction(prop)) { //getter
				var args = [].slice.call(arguments, 1);
				args[0] = obj;
				prop.apply(null, args);
			} else {
				//set(obj, prop, value);
				var keys = prop.split(".");
				i = 0;
				for (var obj2 = obj, len = keys.length - 1; i < len; i++) {
					obj2 = obj2[keys[i]];
				}
				obj2[keys[i]] = value;
			}
			return obj;
		},
		get: function(obj, prop, nullSensitive) {
			if (ObjectH.isArray(prop)) { //get(obj, props)
				var ret = [],
					i;
				for (i = 0; i < prop.length; i++) {
					ret[i] = ObjectH.get(obj, prop[i], nullSensitive);
				}
			} else if (ObjectH.isFunction(prop)) { //getter
				var args = [].slice.call(arguments, 1);
				args[0] = obj;
				return prop.apply(null, args);
			} else { //get(obj, prop)
				var keys = prop.split(".");
				ret = obj;
				for (i = 0; i < keys.length; i++) {
					if (!nullSensitive && ret == null) {return; }
					ret = ret[keys[i]];
				}
			}
			return ret;
		},
		mix: function(des, src, override) {
			if (ObjectH.isArray(src)) {
				for (var i = 0, len = src.length; i < len; i++) {
					ObjectH.mix(des, src[i], override);
				}
				return des;
			}
			if (typeof override == 'function') {
				for (i in src) {
					des[i] = override(des[i], src[i], i);
				}
			}
			else {
			for (i in src) {
				//这里要加一个des[i]，是因为要照顾一些不可枚举的属性
				if (override || !(des[i] || (i in des))) {
					des[i] = src[i];
				}
			}
			}
			return des;
		},
		map: function(obj, fn, thisObj) {
			var ret = {};
			for (var key in obj) {
				ret[key] = fn.call(thisObj, obj[key], key, obj);
			}
			return ret;
		},
		keys: function(obj) {
			var ret = [];
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					ret.push(key);
				}
			}
			return ret;
		},
		values: function(obj) {
			var ret = [];
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					ret.push(obj[key]);
				}
			}
			return ret;
		},
		stringify: function(obj) {
			if (obj == null) {return 'null'; }
			if (typeof obj !='string' && obj.toJSON) {//JK: IE8的字符串的toJSON有问题，丢了引号
				return obj.toJSON();
			}
			var type = getConstructorName(obj).toLowerCase();
			switch (type) {
				case 'string':
					return '"' + escapeChars(obj) + '"';
				case 'number':
					var ret = obj.toString();
					return /N/.test(ret) ? 'null' : ret;
				case 'boolean':
					return obj.toString();
				case 'date' :
					return 'new Date(' + obj.getTime() + ')';
				case 'array' :
					var ar = [];
					for (var i = 0; i < obj.length; i++) {ar[i] = ObjectH.stringify(obj[i]); }
					return '[' + ar.join(',') + ']';
				case 'object':
					if (ObjectH.isPlainObject(obj)) {
						ar = [];
						for (i in obj) {
							ar.push('"' + escapeChars(i) + '":' + ObjectH.stringify(obj[i]));
						}
						return '{' + ar.join(',') + '}';
					}
			}
			return 'null'; //无法序列化的，返回null;
		},
		encodeURIJson: function(json){
			var s = [];
			for( var p in json ){
				if(json[p]==null) continue;
				if(json[p] instanceof Array)
				{
					for (var i=0;i<json[p].length;i++) s.push( encodeURIComponent(p) + '=' + encodeURIComponent(json[p][i]));
				}
				else
					s.push( encodeURIComponent(p) + '=' + encodeURIComponent(json[p]));
			}
			return s.join('&');
		}
	};
	$.ObjectH = ObjectH;
}());
//document.write('<script type="text/javascript" src="' + srcPath + 'core/array.h.js"><\/script>');
(function() {
	var isArray = $.ObjectH.isArray;
	var ArrayH = {
		map: function(arr, callback, pThis) {
			var len = arr.length;
			var rlt = new Array(len);
			for (var i = 0; i < len; i++) {
				if (i in arr) {
					rlt[i] = callback.call(pThis, arr[i], i, arr);
				}
			}
			return rlt;
		},
		forEach: function(arr, callback, pThis) {
			for (var i = 0, len = arr.length; i < len; i++) {
				if (i in arr) {
					callback.call(pThis, arr[i], i, arr);
				}
			}
		},
		filter: function(arr, callback, pThis) {
			var rlt = [];
			for (var i = 0, len = arr.length; i < len; i++) {
				if ((i in arr) && callback.call(pThis, arr[i], i, arr)) {
					rlt.push(arr[i]);
				}
			}
			return rlt;
		},
		some: function(arr, callback, pThis) {
			for (var i = 0, len = arr.length; i < len; i++) {
				if (i in arr && callback.call(pThis, arr[i], i, arr)) {
					return true;
				}
			}
			return false;
		},
		every: function(arr, callback, pThis) {
			for (var i = 0, len = arr.length; i < len; i++) {
				if (i in arr && !callback.call(pThis, arr[i], i, arr)) {
					return false;
				}
			}
			return true;
		},
		indexOf: function(arr, obj, fromIdx) {
			var len = arr.length;
			fromIdx |= 0; //取整
			if (fromIdx < 0) {
				fromIdx += len;
			}
			if (fromIdx < 0) {
				fromIdx = 0;
			}
			for (; fromIdx < len; fromIdx++) {
				if (fromIdx in arr && arr[fromIdx] === obj) {
					return fromIdx;
				}
			}
			return -1;
		},
		lastIndexOf: function(arr, obj, fromIdx) {
			var len = arr.length;
			fromIdx |= 0; //取整
			if (!fromIdx || fromIdx >= len) {
				fromIdx = len - 1;
			}
			if (fromIdx < 0) {
				fromIdx += len;
			}
			for (; fromIdx > -1; fromIdx--) {
				if (fromIdx in arr && arr[fromIdx] === obj) {
					return fromIdx;
				}
			}
			return -1;
		},
		contains: function(arr, obj) {
			return (ArrayH.indexOf(arr, obj) >= 0);
		},
		clear: function(arr) {
			arr.length = 0;
		},
		remove: function(arr, obj) {
			var idx = -1;
			for (var i = 1; i < arguments.length; i++) {
				var oI = arguments[i];
				for (var j = 0; j < arr.length; j++) {
					if (oI === arr[j]) {
						if (idx < 0) {
							idx = j;
						}
						arr.splice(j--, 1);
					}
				}
			}
			return idx;
		},
		unique: function(arr) {
			var rlt = [],
				oI = null,
				indexOf = Array.indexOf || ArrayH.indexOf;
			for (var i = 0, len = arr.length; i < len; i++) {
				if (indexOf(rlt, oI = arr[i]) < 0) {
					rlt.push(oI);
				}
			}
			return rlt;
		},
		reduce: function(arr, callback, initial) {
			var len = arr.length;
			var i = 0;
			if (arguments.length < 3) { //找到第一个有效元素当作初始值
				var hasV = 0;
				for (; i < len; i++) {
					if (i in arr) {
						initial = arr[i++];
						hasV = 1;
						break;
					}
				}
				if (!hasV) {throw new Error("No component to reduce"); }
			}
			for (; i < len; i++) {
				if (i in arr) {
					initial = callback(initial, arr[i], i, arr);
				}
			}
			return initial;
		},
		reduceRight: function(arr, callback, initial) {
			var len = arr.length;
			var i = len - 1;
			if (arguments.length < 3) { //逆向找到第一个有效元素当作初始值
				var hasV = 0;
				for (; i > -1; i--) {
					if (i in arr) {
						initial = arr[i--];
						hasV = 1;
						break;
					}
				}
				if (!hasV) {
					throw new Error("No component to reduceRight");
				}
			}
			for (; i > -1; i--) {
				if (i in arr) {
					initial = callback(initial, arr[i], i, arr);
				}
			}
			return initial;
		},
		expand: function(arr, shallow) {
			var ret = [],
				i = 0,
				len = arr.length;
			for (; i<len; i++) {
				if (isArray(arr[i])) {
					ret = ret.concat(shallow ? arr[i] : ArrayH.expand(arr[i]));
				}
				else {
					ret.push(arr[i]);
				}
			}
			return ret;
		},
		toArray: function(arr) {
			var ret = [];
			for (var i = 0; i < arr.length; i++) {
				ret[i] = arr[i];
			}
			return ret;
		}
	};
	$.ArrayH = ArrayH;
}());
//document.write('<script type="text/javascript" src="' + srcPath + 'core/date.h.js"><\/script>');
(function() {
	var DateH = {
		format: function(d, pattern) {
			pattern = pattern || 'yyyy-MM-dd';
			var y = d.getFullYear().toString(),
				o = {
					M: d.getMonth() + 1, //month
					d: d.getDate(), //day
					h: d.getHours(), //hour
					m: d.getMinutes(), //minute
					s: d.getSeconds() //second
				};
			pattern = pattern.replace(/(y+)/ig, function(a, b) {
				return y.substr(4 - Math.min(4, b.length));
			});
			for (var i in o) {
				pattern = pattern.replace(new RegExp('(' + i + '+)', 'g'), function(a, b) {
					return (o[i] < 10 && b.length > 1) ? '0' + o[i] : o[i];
				});
			}
			return pattern;
		}
	};
	$.DateH = DateH;
}());
//document.write('<script type="text/javascript" src="' + srcPath + 'core/function.h.js"><\/script>');
(function() {
	var FunctionH = {
		methodize: function(func, attr) {
			if (attr) {
				return function() {
					return func.apply(null, [this[attr]].concat([].slice.call(arguments)));
				};
			}
			return function() {
				return func.apply(null, [this].concat([].slice.call(arguments)));
			};
		}
	};
	$.FunctionH = FunctionH;
}());
//document.write('<script type="text/javascript" src="' + srcPath + 'core/helper.h.js"><\/script>');
(function() {
	var FunctionH = $.FunctionH,
		Methodized = function() {};
	var HelperH = {
		methodize: function(helper, attr, preserveEveryProps) {
			var ret = new Methodized(); //因为 methodize 之后gsetter和rwrap的行为不一样
			for (var i in helper) {
				var fn = helper[i];
				if (fn instanceof Function) {
					ret[i] = FunctionH.methodize(fn, attr);
				}else if(preserveEveryProps){
					//methodize默认不保留非Function类型的成员
					//如特殊情况需保留，可将preserveEveryProps设为true
					ret[i] = fn;
				}
			}
			return ret;
		}
	};
	$.HelperH = HelperH;
}());

//IE 11 的 UserAgent：Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv 11.0) like Gecko
$.Browser = (function() {
	var na = window.navigator,
		ua = na.userAgent.toLowerCase(),
		browserTester = /(msie|webkit|gecko|presto|opera|safari|firefox|chrome|maxthon|android|ipad|iphone|webos|hpwos|trident)[ \/os]*([\d_.]+)/ig,
		Browser = {
			platform: na.platform
		};

	ua.replace(browserTester, function(a, b, c) {
		if (!Browser[b]) {
			Browser[b] = c;
		}
	});

	if (Browser.opera) { //Opera9.8后版本号位置变化
		ua.replace(/opera.*version\/([\d.]+)/, function(a, b) {
			Browser.opera = b;
		});
	}

	//IE11+ 会进入这个分支
	if (!Browser.msie && Browser.trident) { 
		ua.replace(/trident\/[0-9].*rv[ :]([0-9.]+)/ig, function(a, c) {
				Browser.msie = c;
			});
	}

	if (Browser.msie) {
		Browser.ie = Browser.msie;
		var v = parseInt(Browser.msie, 10);
		Browser['ie' + v] = true;
	}

	return Browser;
}());

(function() {
	var methodize = $.HelperH.methodize,
		mix = $.ObjectH.mix;

	mix(Object, $.ObjectH);


	mix(Array, $.ArrayH);
	mix(Array.prototype, methodize($.ArrayH));


	mix(Function, $.FunctionH);

	mix(Date, $.DateH);
	mix(Date.prototype, methodize($.DateH));

	mix(String, $.StringH);
	mix(String.prototype, methodize($.StringH));
}());
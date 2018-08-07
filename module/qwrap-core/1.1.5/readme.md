## 使用说明

本文件来自于 [QWrap](http://www.qwrap.com) 1.1.5 的核心，提供对 Array、String、Date、Object 四个原生对象的操作函数，以及基于 UA 的浏览器识别功能。

本模块会在 Array、String、Date 原型上添加方法，同时提供静态方法；对于 Object，只提供静态方法。

注：1）部分线上产品逻辑里「通过检测 QW 变量是否存在」来判断页面是否引入QWrap，为了避免产生干扰，本模块提供的功能会注册到 $，而不是 QW。2）本模块既可以单独使用本模块，也可以与各版本 jQuery 一起使用（QW.Core 放在 jQuery 之后引入）。

### 外链形式

```html
<script src="{{src}}"></script>

<script>
    [3, 2, 1].forEach(function(item, index) {
    	console.log(item, index);
    });
    //或：
    $.ArrayH.forEach([3, 2, 1], function(item, index) {
    	console.log(item, index);
    });
	/* output:
	3 0
	2 1
	1 2 
	*/
</script>
```

### 模块加载形式

QWrap Core 不是标准的 AMD 模块。不过仍然可以这样引入：

```html
<script>
    require(['{{module}}'], function(_) {
	    [3, 2, 1].forEach(function(item, index) {
	    	console.log(item, index);
	    });
    });
</script>
```

## API 索引

### 浏览器识别

浏览器信息存放在 `$.Browser` 对象中：

`console.log($.Browser)` 会输出以下内容（因人而异）：

```
(string) platform : MacIntel
(string) webkit : 537.36
(string) chrome : 31.0.1650.57
(string) safari : 537.36
```

要判断是否 `IE` 浏览器：

```javascript
if($.Browser.ie) {
	// this is ie.
}
```

要判断是否 `IE6` 或者 `IE11`：

```javascript
if($.Browser.ie6 || $.Browser.ie11) {
	// this is ie6 or ie11.
}
```

要判断是否 `IE` 浏览器，且版本不低于 `10`：

```javascript
if($.Browser.ie && parseInt($.Browser.ie) >= 10) {
	// this is ie10, ie11, ie12 ... 
}
```

注意：`$.Browser.ie` 这个属性仅在 `IE` 才有（否则是 `undefined`），且类型为`字符串`。

### 数组

以下方法静态调用时，会多出来第一个参数，类型为泛数组，如：

```javascript
var arr = [1, 1, 2, 3];
$.ArrayH.unique(arr); //[1, 2, 3]
// 或者
arr.unique(); //[1, 2, 3]
```

- [$.ArrayH.map(callback, pThis)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/arrayh/arr.map_.htm)
- [$.ArrayH.forEach(callback, pThis)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/arrayh/arr.forEach_.htm)
- [$.ArrayH.filter(callback, pThis)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/arrayh/arr.filter_.htm)
- [$.ArrayH.some(callback, pThis)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/arrayh/arr.some_.htm)
- [$.ArrayH.every(callback, pThis)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/arrayh/arr.every_.htm)
- [$.ArrayH.indexOf(obj, fromIdx)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/arrayh/arr.indexOf_.htm)
- [$.ArrayH.lastIndexOf(obj, fromIdx)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/arrayh/arr.lastIndexOf_.htm)
- [$.ArrayH.contains(obj)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/arrayh/arr.contains_.htm)
- [$.ArrayH.clear()](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/arrayh/arr.clear_.htm)
- [$.ArrayH.remove(obj)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/arrayh/arr.remove_.htm)
- [$.ArrayH.unique()](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/arrayh/arr.unique_.htm)
- [$.ArrayH.reduce(callback, initial)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/arrayh/arr.reduce_.htm)
- [$.ArrayH.reduceRight(callback, initial)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/arrayh/arr.reduceRight_.htm)
- [$.ArrayH.expand()](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/arrayh/arr.expand_.htm)
- [$.ArrayH.toArray(arr)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/arrayh/arr.toArray_.htm)

### 字符串

以下方法静态调用时，会多出来第一个参数，类型为字符串，如：

```javascript
var str = "   _hello  ";
$.StringH.trim(str); //"_hello"
// 或者
str.trim(); //"_hello"
```

- [$.StringH.trim()](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/stringh/s.trim_.htm)
- [$.StringH.mulReplace()](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/stringh/s.mulReplace_.htm)
- [$.StringH.format(arg0)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/stringh/s.format_.htm)
- [$.StringH.tmpl(opts)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/stringh/s.tmpl_.htm)
- [$.StringH.contains(subStr)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/stringh/s.contains_.htm)
- [$.StringH.dbc2sbc()](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/stringh/s.dbc2sbc_.htm)
- [$.StringH.byteLen()](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/stringh/s.byteLen_.htm)
- [$.StringH.subByte()](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/stringh/s.subByte_.htm)
- [$.StringH.camelize()](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/stringh/s.camelize_.htm)
- [$.StringH.decamelize()](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/stringh/s.decamelize_.htm)
- [$.StringH.encode4Js()](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/stringh/s.encode4Js_.htm)
- [$.StringH.escapeChars()](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/stringh/s.escapeChars_.htm)
- [$.StringH.encode4Http()](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/stringh/s.encode4Http_.htm)
- [$.StringH.encode4Html()](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/stringh/s.encode4Html_.htm)
- [$.StringH.encode4HtmlValue()](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/stringh/s.encode4HtmlValue_.htm)
- [$.StringH.decode4Html()](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/stringh/s.decode4Html_.htm)
- [$.StringH.stripTags()](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/stringh/s.stripTags_.htm)
- [$.StringH.evalJs(opts)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/stringh/s.evalJs_.htm)
- [$.StringH.evalExp(opts)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/stringh/s.evalExp_.htm)
- [$.StringH.queryUrl(key)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/stringh/s.queryUrl_.htm)


### 日期


以下方法静态调用时，会多出来第一个参数，类型为日期，如：

```javascript
var date = new Date;
$.DateH.format(date, 'YYYY');; //"2013"
// 或者
date.format('YYYY'); //"2013"
```

- [$.DateH.format(pattern)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/dateh/d.format_.htm#pattern)



### 对象

以下方法，只能静态调用，如：

```javascript
var o = {};
$.ObjectH.isString(o); //false
$.ObjectH.isPlainObject(o); //true
```

- [$.ObjectH.isString(obj)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/objecth/Object.isString_.htm#obj)
- [$.ObjectH.isFunction(obj)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/objecth/Object.isFunction_.htm#obj)
- [$.ObjectH.isArray(obj)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/objecth/Object.isArray_.htm#obj)
- [$.ObjectH.isArrayLike(obj)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/objecth/Object.isArrayLike_.htm#obj)
- [$.ObjectH.isObject(obj)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/objecth/Object.isObject_.htm#obj)
- [$.ObjectH.isPlainObject(obj)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/objecth/Object.isPlainObject_.htm#obj)
- [$.ObjectH.isElement(obj)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/objecth/Object.isElement_.htm#obj)
- [$.ObjectH.set(obj, prop, value)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/objecth/Object.set_.htm#obj)
- [$.ObjectH.get(obj, prop, nullSensitive)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/objecth/Object.get_.htm#obj)
- [$.ObjectH.mix(des, src, override)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/objecth/Object.mix_.htm#obj)
- [$.ObjectH.map(obj, fn, thisObj)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/objecth/Object.map_.htm#obj)
- [$.ObjectH.keys(obj)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/objecth/Object.keys_.htm#obj)
- [$.ObjectH.values(obj)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/objecth/Object.values_.htm#obj)
- [$.ObjectH.stringify(obj)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/objecth/Object.stringify_.htm#obj)
- [$.ObjectH.encodeURIJson(json)](http://www.qiwoo.org/qwrap/_docs/_qiwu/qw/objecth/Object.encodeURIJson_.htm#obj)



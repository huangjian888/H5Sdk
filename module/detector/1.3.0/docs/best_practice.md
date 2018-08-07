#最佳实践

本文来源：[https://github.com/aralejs/detector/issues/18](https://github.com/aralejs/detector/issues/18)

有时候在模块中需要针对某个特定浏览器进行识别，可以 *不需要*、或 *不希望* 依赖 `detector` 进行识别（例如 sticky 只需要识别 IE6），这里提供一些最佳实践，供需要时参考。

## 基本原则

1. 尽量针对特定功能使用正确的特性识别。
1. 浏览器识别尽量使用 userAgent 信息。
1. 不要使用不相干的特性检测。例如 isIE6 = !window.XMLHttpRequest;

##最佳实践

针对 IE 或 IE 内核浏览器的代码兼容性支持：

```js
// 单个浏览器识别：
var isIE6 = navigator.userAgent.indexOf("MSIE 6.0") !== -1;
var isIE7 = navigator.userAgent.indexOf("MSIE 7.0") !== -1;
var isIE8 = navigator.userAgent.indexOf("MSIE 8.0") !== -1;
var isIE9 = navigator.userAgent.indexOf("MSIE 9.0") !== -1;
var isIE10 = navigator.userAgent.indexOf("MSIE 10.0") !== -1;
//!var isIE11 = navigator.userAgent.indexOf("IE 11.0") !== -1;
var isIE11 = /\btrident\/[0-9].*rv[ :]11\.0/.test(navigator.userAgent);

// 多个浏览器识别
var isIE678 = /\bMSIE [678]\.0\b/.test(navigator.userAgent);
```

针对真实浏览器版本识别，可用于浏览器升级提示，但是为了避免将 IE 内核的浏览器识别为 IE，建议使用 detector：

```js
function IEMode(){
  var ua = navigator.userAgent.toLowerCase();
  var re_trident = /\btrident\/([0-9.]+)/;
  var re_msie = /\b(?:msie |ie |trident\/[0-9].*rv[ :])([0-9.]+)/;
  var version;

  if(!re_msie.test(ua)){return false;}

  var m = re_trident.exec(ua);
  if(m){
    version = m[1].split(".");
    version[0] = parseInt(version[0], 10) + 4;
    version = version.join(".");
  }else{
    m = re_msie.exec(ua);
    version = m[1];
  }
  return parseFloat(version);
}

var ie = IEMode();
if(ie && ie < 8){
  // 你的浏览器太老了。
}

var isIE6 = navigator.userAgent.indexOf("MSIE 6.0") !== -1;
var isIE7 = IEMode() == 7;
var isIE8 = navigator.userAgent.indexOf("Trident 4.0") !== -1;
var isIE9 = navigator.userAgent.indexOf("Trident 5.0") !== -1;
var isIE10 = navigator.userAgent.indexOf("Trident 6.0") !== -1;
var isIE11 = navigator.userAgent.indexOf("Trident 7.0") !== -1;
```
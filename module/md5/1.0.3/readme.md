## 使用说明

### 外链形式

```html
<script src="{{src}}"></script>

<script>
    alert( md5(123456) ); // "e10adc3949ba59abbe56e057f20f883e"
</script>
```

### 模块加载形式

```html
<script>
    require(['{{module}}'], function(md5) {
        alert( md5(123456) ); // "e10adc3949ba59abbe56e057f20f883e"
    });
</script>
```

## 文档参考

### md5 *md5( 'value' )*

传入要加密的字符串或者数字返回 `MD5` 加密过后的十六进制的字符串

### md5 *md5( 'value', key )*

传入要加密的字符串或数字和 Key 返回 `Hmac-MD5` 加密过后的十六进制的字符串

### md5 *md5( 'value', null, true )*

传入要加密的字符串或者数字返回 `MD5` 加密过后的原始值

### md5 *md5( 'value', 'key', ture )*

传入要加密的字符串或数字和 Key 返回 `Hmac-MD5` 加密过后的原始值

例子：

```js
md5("75team"); // "379433a1ebc0edbd9ba975cb7cccafaf"

md5("75team", "360"); // "0e26ebff5b74e006fe8daf8ce25eca74"

md5("75team", null, true); // "\x37\x94\x33\xa1\xeb\xc0\xed\xbd\x9b\xa9\x75\xcb\x7c\xcc\xaf\xaf"

md5("75team", "360", true); // "\x0e\x26\xeb\xff\x5b\x74\xe0\x06\xfe\x8d\xaf\x8c\xe2\x5e\xca\x74"
```

## 使用说明

store_xpc 主要依赖 store 和 XPC 两个组件， 同时还依赖 QW.Core 和 when.js. 利用 store 本地存储的方法和 XPC 跨域通讯的特点，实现了跨域的本地存储。当然，也保留了本域下的本地存储的方法。
PS: 就不用再去加载store.js了。

### 外链形式

```html
<script src="{{src}}"></script>
```

### 模块加载形式

```html
<script>
    require(['{{module}}'], function(store) {
      store.xpc('set', 'mystore', 1); //本地存储中设置 "mystore" 为 1.
      //...
      store.xpc('get', 'mystore').done(function(result) {
        console.log(result);  // 1
      });
    });
</script>
```


## 文档参考

### 准备工作

在 *父页面* 中引入 store-xpc.js, 并在页面增加iframe：

```html
<iframe name="XPC_STORE" style="display:none;" src="http://XXX/resource/html/xpc.html"></iframe>
```
其中`XXX`代表实际用于本地存储的域名（比如 "qun.yunpan.360.cn"，而你调用存储方法的域名可能是qun1.yunpan.360.cn）。

同时，将`xpc.html` 拷贝到`XXX`域对应的项目的相应目录中（比如 /resource/html）下。


### xpc方式下set

```js
store.xpc('set', 'mystore', 1); //本地存储中设置 "mystore" 为 1.
```

### xpc方式下get

```js
store.xpc('get', 'mystore').done(function(result) {
  console.log(result);  // 1
});
```
### xpc方式下remove

```js
store.xpc('remove', 'mystore');
```
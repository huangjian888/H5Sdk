## jsUri 是什么？

在javascript的世界里，jsUri主要负责`操作Uri和查询字符串`

它借鉴了优秀的正则表达式库[parseUri](http://blog.stevenlevithan.com/archives/parseuri)，
所以你可以`安全地解析`千奇百怪的URLs，不管它们长得多么惨不忍睹。

## jsUri 如何使用？

只需一行代码，便可轻松将jsUri引入您的项目中。
这儿提供了两种方式，供选择。

### *外链形式*
```html
<script src="{{src}}"></script>
```
    
### *模块加载形式*
待续...


## jsUri 能干什么？
*1.创建Uri对象，三种方式*
  
  第一种：用Uri格式的字符串直接初始化。用构造函数 `new Uri()`，如下：
  
  ```js
  var uri = new Uri('http://username:password@www.so.com:80/index.html?q=javascript#fragment');
  
  ```
 
  第二种：先创建一空对象，再用set方法填充相应的值
  
  提供了一系列设置属性的接口，可以`链式赋值`，简单方便
  
  ```js
    var uri1 = new Uri()
                    .setPath('/index.html')
                    .setAnchor('content')
                    .setHost('www.test.com')
                    .setPort(8080)
                    .setUserInfo('username:password')
                    .setProtocol('https')
                    .setQuery('this=that&some=thing')      
    // https://username:password@www.test.com:8080/index.html?this=that&some=thing#content

    var uri2 = new Uri('http://www.test.com')
                   .setHost('www.yahoo.com')
                   .setProtocol('https')   // https://www.yahoo.com

    var uri3 = new Uri()
                   .setPath('/archives/1979/')
                   .setQuery('?page=1')    // /archives/1979?page=1
                   
    
  ```
  
  第三种：克隆一个全新的
  
  用`clone()`得到的是一个全新的对象，与原对象相互独立
  
  ``` js
    var baseUri = new Uri('http://www.so.com');
    var newUri = baseUri.clone().setProtocol('https');
    
    newUri.toString();    // https://www.so.com
    baseUri.toString();   // http://www.so.com
    
  ```

2.*操作Uri中的参数：包括协议、主机、端口号、文件路径等*
 
 同一个函数，两种含义，便于使用。
 
 `Get`方法：参数为空时
 
 `Set`方法：当方法有一个可选的参数时，便成了相应的Set()方法


 ```js
 var uri = new Uri('http://username:password@www.so.com:80/index.html?q=javascript#fragment');
 
 //Get()
 uri.protocol();          // http
 uri.userInfo();          // username:password
 uri.host();              // www.so.com
 uri.port();              // 81
 uri.path();              // /index.html
 uri.query();             // q=javascript
 uri.anchor();            // fragment
 
 
 //Set()
 uri.protocol('https');
 uri.toString();              // https://username:password@www.so.com:80/index.html?q=javascript#fragment

 uri.host('mydomain.com');
 uri.toString();             // http://username:password@www.mydomain.com:80/index.html?q=javascript#fragment

 ````
 
3.*专门的一套操作查询参数的方法*
  
**获取**参数

`getQueryParamValue( key )`   返回参数名等于key的第一个查询参数的值

`getQueryParamValues( key )`  返回参数名等于key的所有值，一维数组

`query().params`  返回所有查询参数的键值对，二维数组

```js
  new Uri('?cat=1&cat=2&cat=3').getQueryParamValue('cat')   // 1
  new Uri('?cat=1&cat=2&cat=3').getQueryParamValues('cat')  // [1,2,3]
  new Uri('?a=1&b=2&c=3').query().params                    // [ ['a',1], ['b',2], ['c',3] ]

```

**新增**参数

`addQueryParam( key, value, [index] )`  在第index的位置，新插入查询参数键值对key=value。

其中，第三个参数index可选。当不传index时，默认在最后添加

```js
new Uri().addQueryParam('q', 'books')        // ?q=books

new Uri('http://www.github.com')
    .addQueryParam('testing', '123')
    .addQueryParam('one', 1)                 // http://www.github.com/?testing=123&one=1

// 在位置0处，插入参数
new Uri('?b=2&c=3&d=4').addQueryParam('a', '1', 0)   // ?a=1&b=2&c=3&d=4

```

**替换**参数

`replaceQueryParam( key, newValue, [oldValue] )` 将key=oldValue的查询参数的值，替换成新值newValue

其中，第三个参数oldValue可选。当不传时，则会将名等于key的所有查询参数的值替换为newValue

当uri中没有名等于key的查询参数时，则会新增一个。

```js
new Uri('?a=1&b=2&c=3')
    .replaceQueryParam('a', 'eh')          // ?a=eh&b=2&c=3

new Uri('?a=1&b=2&c=3&c=4&c=5&c=6')
    .replaceQueryParam('c', 'five', '5')   // ?a=1&b=2&c=3&c=4&c=five&c=6

new Uri().replaceQueryParam('page', 2)     // ?page=2

```

**删除**参数

`deleteQueryParam( key, [value] )`  删除名等于key，且值等于value的查询参数

其中，第二个参数value可选。当不传时，则会删除所有名等于key的查询参数
```js
new Uri('?a=1&b=2&c=3')
    .deleteQueryParam('a')                 // ?b=2&c=3

new Uri('test.com?a=1&b=2&c=3&a=eh')
    .deleteQueryParam('a', 'eh')           // test.com/?a=1&b=2&c=3
    
```

## 文档参考
点击参考 [jsUri的英文文档](https://github.com/derek-watson/jsUri)
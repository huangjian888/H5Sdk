## 简单介绍

when.js 是一个轻量级的 Promises/A+ 和 when() 的实现。

## 使用说明

### 外链形式  

``` html
<script src="{{src}}"></script>

<script>
	var timer = function() {
    var deferred = when.defer();

    var id = setTimeout(function() {
        deferred.resolve(id);
    }, 1000);

    return deferred.promise;
	};

	timer().then(function(id) { alert(id) });
</script>
```

### 模块加载形式
when.js是标准的AMD模块，可以使用模块方式引入： 
```html
<script>
require(['{{module}}'], function(when) {
    var timer = function() {
        var deferred = when.defer();

        var id = setTimeout(function() {
            deferred.resolve(id);
        }, 1000);

        return deferred.promise;
    };

    timer().then(function(id) { alert(id) });
});
</script>
```

##名词
- Promise : 一个计算过程的结果，这个计算有可能还没完成
- Deferred : 一个未完成的计算，延迟到未来某个点执行
- Resolver : 包含处理promise的resolve方法和reject方法
- Promise/A+ spec : CommonJS的草案之一，提出了一种Promise模型的设计及API表现

## 文档参考

### then *promise.then(onFulfilled,onRejected,onProgress)*
	- onFulfilled : promise 成功时调用的函数
	- onRejected : promise 失败时调用的函数
	- onProgress : promise 更新进度时调用的函数
	
### otherwise *promise.otherwise(onRejected)*
	- onRejected : promise 失败时调用的函数
	- 相当于promise.then(undefined, onRejected)

### ensure *promise.ensure(onFulfilledOrRejected)*
	- onFulfilledOrRejected : promise链的清理函数，不接受参数，不能改变promise成功时的值，但是能够抛出异常
	- 与promise.otherwise结合使用相当于一个catch/finally组合
	- 使用promise.ensure替代promise.always

### when.promise *var deferred=when.defer()*
	- 返回一个{promise,resolver}的组合
	- var promise=deferred.promise

### when.all *var promise = when.all(array)*
	- 当array中的所有项都成功时，才返回成功，如果有promise失败了，则返回第一个promise的失败原因

### when.settle *var promise = when.settle(array)*
	- 返回一个包含与array相同数目项的数组的promise,数组的每项是一个对象描述符，描述对应的promise的执行结果。
	- 如果成功，描述符为：{ state: 'fulfilled', value: <fulfillmentValue> }
	- 如果失败，描述符为：{ state: 'rejected', reason: <rejectionReason> }

### when.any *var promise = when.any(array)*
	- 返回第一个成功的promise的值。只有当array中所有的promise都失败，才返回失败，失败原因是所有promise失败原因的集合。


# 详细文档请参考：  
1. [When.js 官方api](https://github.com/cujojs/when/blob/master/docs/api.md#api 'When.js 官方api')  
2. [异步编程：When.js快速上手](http://www.imququ.com/post/promises-when-js.html '异步编程：When.js快速上手')  
3. [when.js的原理及快速实现](http://www.silverna.org/blog/?p=279 'when.js的原理及快速实现')
4. [Promises/A+规范](http://promises-aplus.github.io/promises-spec/ 'Promises/A+规范')
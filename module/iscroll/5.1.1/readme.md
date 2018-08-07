##使用说明

###简介
提供对固定大小的容器的内容进行滚动操作的函数库。

该处提供的是iscroll的iscroll-probe版，即滚动时会触发onScroll事件的版本。

###外链形式

```html
<script src="{{src}}"></script>

```

###模块加载形式

```html
<script>
	require(['{{module}}'], function(IScroll) {
		
	});
</script>
```

### 快速使用

```html
<div id="wrapper">
    <ul>
        <li>...</li>
        <li>...</li>
        ...
    </ul>
</div>
<script type="text/javascript">
require(['{{module}}'], function(IScroll) {
	var wrapper = document.getElementById('wrapper');
	var myScroll = new IScroll(wrapper);
});
</script>
```

##文档参考

###配置

### options.useTransform *Default: true*

使用Transform控制移动

### options.useTransition *Default: true*

使用Transition实现动画效果

### options.HWCompositing *Default: true*

通过添加`translateZ(0)`实现硬件加速

### options.bounce *Default: true*

是否使用回弹效果

### options.click *Default: false*

是否触发click事件

### options.disableMouse *Default: false*
### options.disablePointer *Default: false*
### options.disableTouch *Default: false*

禁用相关事件的监听

### options.eventPassthrough *Default: false*

单方向使用iscroll，另一方向使用原生的

### options.freeScroll *Default: false*

横向和纵向均可滚动

### options.keyBindings *Default: false*

绑定按键进行控制

值为true时，page up/down, home/end 可用

也可自定义

```js
keyBindings: {
    pageUp: 33,
    pageDown: 34,
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40
}
```

[更多配置](http://iscrolljs.com/#configuring)
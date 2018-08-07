## 使用说明

这个模块集合 Kissy 的 webkit 验证（原本 webkit 验证在 Chrome 27+ 失效），hao360 的 IE7 和 zoomText();

支持浏览器 IE7+, FF4+, Chrome, Opera 11.1+。

### 注意：项目慎用

因为已知一个比较严重的 Bug，所以在项目中慎用

1. 在 Webkit 内核下，拥有侧边栏（安全浏览器的左侧边栏，Chrome 开发者工具置于右侧等）会出现识别错误，如下图：
	![zoom 示例](http://p4.qhimg.com/t010d67a6e4ea6fd7a9.png)

1. 在 Retina 屏幕上面，FireFox 会出现识别错误。错误值为正确值 &times; 等于设备像素比（devicePixelRatio）。

### 外链形式

```html
<script src="{{src}}"></script>

<script>
    alert( detectZoom.zoom() );
</script>
```

### 模块加载形式

```html
<script>
    require(['{{module}}'], function(detectZoom) {
        alert( detectZoom.zoom() );
    });
</script>
```

## 文档参考

### *detectZoom.zoom()*

返回和原始页面大小比例，缩小页面值小于 1，放大页面值大于 1;

### *detectZoom.device()*

返回设备CSS像素比，缩小页面值小于 1，放大页面值大于 1，等于设备像素比（devicePixelRatio）&times; zoom;

### *detectZoom.zoomText()*

返回文字缩放比；
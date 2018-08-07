# 基础操作

<style>
#detectZoom {
    position: fixed;
    z-index: 999999;
    top: 2.5em;
    font-size: 16px;
    width: 100%;
    left:0;
}
#detectZoom p {
    font-size: 1.2em;
    height: 2em;
    line-height: 2em;
    padding-left: .5em;
    border: 0.0625em solid #AAA;
    margin: 0;
    background: #EEE;
}
</style>

<div id="detectZoom"><p>原始大小 100, 设备CSS像素比 1</p></div>

试试缩放浏览器

<script>
require(['{{module}}'], function(detectZoom) {
    var testZoom = function(){
        var zoom = Math.floor( detectZoom.zoom() * 100 );
        var device = detectZoom.device().toFixed(2);
        var text = detectZoom.zoomText();
        if (zoom !== 0 && zoom !== 100) {
            var zoomStr = zoom > 100? "放大": "缩小";
            document.getElementById("detectZoom").getElementsByTagName("p")[0].innerHTML = "页面" + zoomStr + "了, 缩放比例: " + zoom + "%, 设备CSS像素比 " + device + ", 文字缩放 " + text;
            document.getElementById("detectZoom").style.fontSize = (100 / zoom * 16) + 'px';
        } else {
            document.getElementById("detectZoom").getElementsByTagName("p")[0].innerHTML = "原始大小 " + zoom + ", 设备CSS像素比 " + device;
            document.getElementById("detectZoom").style.fontSize = '16px';
        }
    }
    window.onresize = function(){
        testZoom();
    }
    testZoom();
});
</script>

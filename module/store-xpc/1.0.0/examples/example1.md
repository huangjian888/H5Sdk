# 基础操作

<style>
    #content { width:350px;height:160px;}
</style>

<div>
    <textarea id="content"></textarea>
</div>

<div>
    <input type="button" id="btnLoad" value="跨域读取" /> &nbsp;
    <input type="button" id="btnSave" value="跨域存储" /> &nbsp;
    <input type="button" id="btnDelete" value="跨域删除" /> &nbsp;
    <input type="button" id="btnRefresh" value="刷新" />
</div>
<iframe name="XPC_STORE" style="display:none;" src="http://bcs.duapp.com/xpc-store/xpc.html?sign=MBO:A8cdd3a284851538baf8a4f57d463da8:qOMhI1%2BMv3ELA4mp8Doby%2Fa4Z18%3D&response-content-disposition=filename*=utf8%27%27xpc.html&response-cache-control=private"></iframe>
<script src='{{basePath}}/when/2.7.0/when.js'></script>
<script src='{{basePath}}/xpc/0.3/xpc.js'></script>
<script src="{{src}}"></script>
<script>   
 $(function () {
        if (!store.enabled) {
            alert('你的浏览器不支持本地存储，请禁用“隐私模式”或者升级到高级浏览器');
            return;
        }
        
        var content = $('#content'),
            key = '_test_';

        $('#btnLoad').click(function() {
            store.xpc('get', key).done(function(result) {
                content.val(result);
            });           
        });     

        $('#btnSave').click(function() {
            store.xpc('set', key, content.val());
        });     

        $('#btnDelete').click(function() {
            store.xpc('remove', key);
        });

        $('#btnRefresh').click(function() {
            location.reload();
        });
 });

</script>

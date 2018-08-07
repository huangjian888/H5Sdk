# 基础操作

<style>
	#content { width:350px;height:160px;}
</style>

<div>
	<textarea id="content"></textarea>
</div>

<div>
	<input type="button" id="encryption" value="计算MD5" />
</div>

<script>
    require(['{{module}}'], function(md5) {
    	var content = $('#content');

    	$('#encryption').click(function() {
    		content.val( md5( content.val() ));
    	});
    });
</script>

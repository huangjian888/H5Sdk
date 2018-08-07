define(function(){

	var errMsg,
	errBoxDOM,
	template,
	compiledDOM;

	function show(){
		$('#err_mask').show();
	};

	function hide(){
		$('#login_content').empty();
	};

	return {
		/*
		 * 选择支付方式后出现错误
		 */ 
		showConfirmErr: function(errMsg){
			//初始化时，编译模板
			if($('#error_box').length === 0){
				var data = {
					errMsg: errMsg,
				}
				errBoxDOM = $('#error_template').html();
				template = Handlebars.compile(errBoxDOM);
				compiledDOM = template(data);
				$('#login_content').html(compiledDOM);
			}
			//后续直接修改值
			else{
				$('#error_message').html(errMsg);
			}
			//注册事件
			//关闭页面，或是隐藏弹框
			$('#error_return_button').on('click', function(){
				$('#error_return_button').unbind('click');
				hide();
			});
			//显示
			show();
			return true;
		},

		
	}
});
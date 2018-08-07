/*
 * 360 H5SDK 游戏开发商接口
 * @author：baoyuanhui
 * 发布日期:
 * 版本：1.0.1
 */
(function(global){
	//Messager
	global.Messenger = (function(){
		// 消息前缀, 建议使用自己的项目名, 避免多项目之间的冲突
		// !注意 消息前缀应使用字符串类型
		var prefix = "FuncellH5Sdk",
			supportPostMessage = 'postMessage' in global;
	
		// Target 类, 消息对象
		function Target(target, name, prefix){
			var errMsg = '';
			if(arguments.length < 2){
				errMsg = 'target error - target and name are both required';
			} 
			else if (typeof target != 'object'){
				errMsg = 'target error - target itself must be window object';
			} 
			else if (typeof name != 'string'){
				errMsg = 'target error - target name must be string type';
			}
			if(errMsg){
				throw new Error(errMsg);
			}
			this.target = target;
			this.name = name;
			this.prefix = prefix;
		}
		// 往 target 发送消息, 出于安全考虑, 发送消息会带上前缀
		if ( supportPostMessage ){
			// IE8+ 以及现代浏览器支持
			Target.prototype.send = function(msg){
				window.H5Target = this.target;
				this.target.postMessage(this.prefix + '|' + this.name + '__Messenger__' + msg, '*');
			};
		} else {
			// 兼容IE 6/7
			Target.prototype.send = function(msg){
				var targetFunc = global.navigator[this.prefix + this.name];
				if ( typeof targetFunc == 'function' ) {
					targetFunc(this.prefix + msg, global);
				} else {
					throw new Error("target callback function is not defined");
				}
			};
		}
	
		// 信使类
		// 创建Messenger实例时指定, 必须指定Messenger的名字, (可选)指定项目名, 以避免Mashup类应用中的冲突
		// !注意: 父子页面中projectName必须保持一致, 否则无法匹配
		function Messenger(messengerName, projectName){
			this.targets = {};
			this.name = messengerName;
			this.listenFunc = [];
			this.prefix = projectName || prefix;
			this.initListen();
		}
	
		// 添加一个消息对象
		Messenger.prototype.addTarget = function(target, name){
			var targetObj = new Target(target, name,  this.prefix);
			this.targets[name] = targetObj;
		};
	
		// 初始化消息监听
		Messenger.prototype.initListen = function(){
			var self = this;
			var generalCallback = function(msg){
				if(typeof msg == 'object' && msg.data){
					msg = msg.data;
				}
				
				var msgPairs = msg.split('__Messenger__');
				var msg = msgPairs[1];
				var pairs = msgPairs[0].split('|');
				var prefix = pairs[0];
				var name = pairs[1];
	
				for(var i = 0; i < self.listenFunc.length; i++){
					if (prefix + name === self.prefix + self.name) {
						self.listenFunc[i](msg);
					}
				}
			};
	
			if ( supportPostMessage ){
				if ( 'addEventListener' in document ) {
					global.addEventListener('message', generalCallback, false);
				} else if ( 'attachEvent' in document ) {
					global.attachEvent('onmessage', generalCallback);
				}
			} else {
				// 兼容IE 6/7
				global.navigator[this.prefix + this.name] = generalCallback;
			}
		};
	
		// 监听消息
		Messenger.prototype.listen = function(callback){
			var i = 0;
			var len = this.listenFunc.length;
			var cbIsExist = false;
			for (; i < len; i++) {
				if (this.listenFunc[i] == callback) {
					cbIsExist = true;
					break;
				}
			}
			if (!cbIsExist) {
				this.listenFunc.push(callback);
			}
		};
		// 注销监听
		Messenger.prototype.clear = function(){
			this.listenFunc = [];
		};
		// 广播消息
		Messenger.prototype.send = function(msg){
			var targets = this.targets,
				target;
			for(target in targets){
				if(targets.hasOwnProperty(target)){
					targets[target].send(msg);
				}
			}
		};
	
		return Messenger;
	})();

	// end Messenger**************************************************

	var H5SDK = {};
	H5SDK.version = "1.0.1";
	//必要配置
	H5SDK.config = {};
	H5SDK.config.platformAlert = "请确保在H5SDK平台运行";
	H5SDK.config.noFrameAlert = "跨域代理模块未引入";
	H5SDK.config.payParamErrAlert = "传入的参数不完整或类型有误";
	//创建信使Messenger
	var messenger = new Messenger('gameFrame');
	//监听
	messenger.listen(function(msg){
		var msgObj = JSON.parse(msg);
		if(msgObj['funcName'] === "payReturn"){
			payReturn(msgObj['args']);
		}
		else if(msgObj['funcName'] === "getLogin"){
			loginReturn();
		}
		else if(msgObj['funcName'] === "loginCallback"){
			loginCallback(msgObj['args']);
		}
		else if(msgObj['funcName'] === "loginExit"){
			loginExit();
		}
		else if(msgObj['funcName'] === "testSend"){
			console.log(msgObj['args']);
		}
	});
	//发送
	messenger.sendObj = function(funcName, args){
		var msg = JSON.stringify({
			funcName: funcName,
			args: args
		});
		this.send(msg);
	}
	messenger.addTarget(window.parent, 'h5sdk');
	//消息延迟状态，当一个消息发送到父窗口时，直到一定时间没有回应，则会报错
	var payTimeOut, loginTimeOut;

	//发起支付
	var savedGkey, savedSkey, savedAmount;
	H5SDK.pay = function(gkey, skey, amount){
		var errMsg = ""; 
		if(!gkey || typeof gkey != "string"){
			errMsg += "gkey参数不完整或类型(gkey需为string)有误； ";
		}
		if(!skey || typeof skey != "number"){
			errMsg += "skey参数不完整或类型(skey需为number)有误； ";
		}
		if(!amount || typeof amount != "number"){
			errMsg += "amount参数不完整或类型(amount需为number)有误；";
		}

		if(errMsg){
			alert(errMsg);
			return;
		}
		savedGkey = gkey;
		savedSkey = skey;
		savedAmount = amount;
		//向父页面发起支付请求
		messenger.sendObj('pay');
		payTimeOut = setTimeout(payTimeoutFunc || function(){}, payTimeoutTime || 3000);
	};

	//支付请求未响应时的操作
	var payTimeoutFunc, payTimeoutTime;
	H5SDK.setPayTimeOut = function(func, time){
		payTimeoutFunc = (func && typeof func == "function") ? func : function(){};
		payTimeoutTime = (time && typeof func == "number") ? time : 3000;
	};
	//父窗口返回支付
	function payReturn(url){
		clearTimeout(payTimeOut);
		url += "?";
		if(savedGkey && typeof savedGkey === "string"){
			url += "gkey=" + savedGkey + "&" ;
		}
		if(savedAmount && typeof savedAmount === "number"){
			url += "amount=" + savedAmount + "&" ;
		}
		url += "skey=" + ((savedSkey && typeof savedSkey === "number") ? savedSkey : 1);
		messenger.sendObj('openPay', url);

		//window.open(url);
	};

	//登录
	//回调函数
	//其中loginCallback为真正的回调函数，需要将信息进行隐藏和加工；loginUserCallback为用户获得的信息
	var loginUserCallback, loginExit;
	function loginCallback(info){
		var qid, imgSrc, nickname;
		qid = info['qid'] || "";
		imgSrc = info['img_url'] || "";
		nickname = info['nickname'] || "";
		loginUserCallback(qid, imgSrc, nickname);
	};
	//登录操作
	H5SDK.checkLogin = function(callback, exit, channel){
        console.log("checkLogin------------------");
		loginUserCallback = typeof callback === "function" ? callback : function(){};		
		loginExit = typeof exit === "function" ? exit : function(){};
		messenger.sendObj('login', channel);
		loginTimeOut = setTimeout(loginTimeoutFunc || function(){}, loginTimeoutTime || 3000);
	};
	//登录请求未响应时的操作
	var loginTimeoutFunc, loginTimeoutTime;
	H5SDK.setLoginTimeOut = function(func, time){
		loginTimeoutFunc = (func && typeof func == "function") ? func : function(){};
		loginTimeoutTime = (time && typeof func == "number") ? time : 3000;
	};
	//父窗口返回登录
	//当父窗口接收到请求后，取消timeout
	function loginReturn(){
		clearTimeout(loginTimeOut);
	};

	//手机助手分享功能
	H5SDK.assistantShare = function(title, content, logo, link){
		var info = {
			title: title || "",
			content: content || "",
			logo: logo || "",
			link: link || ""
		}
		messenger.sendObj('share', info);
	};

	//若H5SDK已经被占用，则转存到_H5SDK中，通过getOrigin()方法获得；
	var _H5SDK = global.H5SDK || {};
	H5SDK.getOrigin = function(){
		return _H5SDK;
	};
	global.H5SDK = H5SDK;
	console.log('H5SDK settled');
	var exports = H5SDK;
	return H5SDK;
})(window);
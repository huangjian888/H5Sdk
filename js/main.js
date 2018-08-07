define(['handlebars', 'jQuery', 'login', 'swipe', 'config', 'localList'], function(){
	/*control**************************************************************************************************/
	var control = (function(){

		return {
			/*
			 * 初始化游戏数据
			 */
			initData: function(callback){
				//先读取本地游戏列表，然后向服务端发送请求，最后将本地游戏列表与服务端返回的列表拼接
				var gameList = localList || [];
				//发送ajax请求
				$.ajax({
					type: "GET",
					url: config.getDataURL,
					dataType: "jsonp",
					jsonp: "callback",
					jsonpCallback: "getData",
					success: function(data){
						if(data['data']){
							//拼接本地列表与服务器返回的列表
							gameList = gameList.concat(data['data']);
							model.setGameList(gameList);
							model.sortGameList();
							//设置游戏主题
							model.setTheme(config.themeCode);
							model.sortTheme();
							//设置轮播图
							model.setSwipe(config.swipe);
							//显示主页
							control.initIndexView();
							//设置分享语
							model.setShare(config.shareContext);
							callback();
							return true;
						}
					},
					error: function(info){
						console.log(info);
						return false;
					}
				});

				
				// if(data['data']){
				// 	model.setGameList(data['data']);
				// 	control.initIndexView();
				// 	return true;
				// }
			},

			/*
			 * 初始化主页列表
			 */
			initIndexView: function(){
				//用户头像
				this.updateUserButton();
				//主题列表
				view.initTheme();
				//轮播图
				view.initSwipe();
				//游戏列表
				view.showIndex();
				//显示主页
				this.switchListTheme(0);
			},

			/*
			 * 更新用户状态
			 */
			updateUserButton: function(){
				login_360.g(function(info){
					//显示用户头像，并修改状态为已登录
					url = info['img_url'] || config.defaultUserURL;
					view.refreshUserButton(url, true);
				}, function(info){
					//显示默认图标，并修改状态为未登录
					view.refreshUserButton(config.noLoginURL, false);
				});
			},

			/*
			 * 进入用户中心
			 */
			switchToUserInfo: function(){
				//先检查是否登录
				control.checkLogin(function(){
					//TODO 进入用户中心
					console.log("进入用户中心");
					control.updateUserButton();
				}, function(){
					control.updateUserButton();
				});
			},

			/*
			 * 切换至游戏的详细信息
			 */
			switchToDetail: function(id){
				//切换页面
				var gameId = model.getItemByID(id) ? id : (model.getItemId(id) || -1);
				if(gameId !== -1){
					console.log("id:" + gameId);
					view.initDetail(model.getItemByID(gameId));
					view.showDetail();
				}
				else{
					err.showConfirmErr("游戏不存在！");
				}
			},

			/*
			 * 切换至主页列表
			 */
			switchToList: function(){
				view.showIndex();
			},

			/*
			 * 切换至游戏页
			 */
			switchToGame: function(){
				view.showGame();
			},

			/*
			 * 切换游戏专题
			 */
			switchListTheme: function(themeNo){
				var themeNo = themeNo || 0;
				//改变导航栏样式
				$('.ui-btn').attr('data-ui', '');
				$('#list_theme_' + themeNo).attr('data-ui', 'active');
				var gameList = model.getGameList(themeNo);
				if(gameList.length === 0){
					view.showEmptyList();
				}
				else{
					view.refreshGameList(gameList);
				}
			},

			/*
			 * 开始游戏
			 * 普通浏览器与游戏大厅客户端的开始游戏方法
			 */
			startGame: function(id){
				//判定登陆
				control.checkLogin(function(){
					//默认区服
					var sID = 1;
					//获取游戏gKey
					var gameItem = model.getItemByID(id);
					//游戏分为两种，一种接罗马系统的，还有我们自己添加的
					if(gameItem['isAuto']){
						//游戏使用的引擎
						var feature = gameItem['feature'],
							url= gameItem['loginurl'];
						if(url.indexOf("?") !== -1){
							url += "&channel=360H5";
						}
						else{
							url += "?channel=360H5";
						}
						//显示游戏页面
						control.openGameURL(id, url, feature);
					}
					else{
						//TODO 获取区服列表、选择区服
						//错误判定
						//获取到游戏真正地址
						$.ajax({
							type: "GET",
							data: {
								gkey: gameItem['gkey'],
								server_id: 1,
							},
							url: config.startGameURL,
							dataType: "jsonp",
							jsonp: "callback",
							jsonpCallback: "getData",
							success: function(data){
								if(!data['errno']){
									var url = data['data']['url'];
									//在url中加上渠道参数
									if(url.indexOf("?") !== -1){
										url += "&channel=360H5";
									}
									else{
										url += "?channel=360H5";
									}
									//游戏所使用的引擎
									var feature = gameItem['feature'];
									//显示游戏页面
									control.openGameURL(id, url, feature);
									return true;
								}
								else{
									err.showConfirmErr(data['errmsg'], false);
									return false;
								}
								
							},
							error: function(data){
								err.showConfirmErr(data);
							}
						});
					}
					
				});

				//先用测试游戏
				//control.openGameURL(0, 'http://baoyuanhui.360.cn/h5sdk2/static/html/game.html');
			},

			/*
			 * 从后端获取到游戏真正的url后，打开游戏
			 * 在普通浏览器中，从iframe打开；
			 * 在360客户端中用特殊的方法
			 */
			openGameURL: function(id, url, feature){
				//客户端
				//TODO 由于目前接入游戏没有相关参数，先用测试游戏
				var JSONObj = {};
				//当前版本不区分引擎，全部用webview

				//判断是否在游戏大厅客户端
				//判断使用的引擎
				// feature = feature || 0;
				// //白鹭引擎
				// if (typeof mWebView != 'undefined' && feature == 12) {
				// 	JSONObj['ergent'] = {
				// 		gameId: 85,
				// 		gameurl: "http:\/\/api.nscwl.egret-labs.org\/rt.php",
				// 		spid: 9166,
				// 		nestmode: "2",
				// 		coopmode: "cps",
				// 		channeltag: "",
				// 		orientation: ""
				// 	};
				// 	mWebView.jsGoToH5Games(JSON.stringify(JSONObj));
				// }
				// //cocos引擎
				// else if (typeof mWebView != 'undefined' && feature == 13) {
				// 	JSONObj['coco'] = {
				// 		gamekey: "nscwl",
				// 		orientation: ""
				// 	};
				// 	mWebView.jsGoToH5Games(JSON.stringify(JSONObj));
				// }
				// //两个引擎都没有用
				// else {
				// 	view.initFloat(id);
				// 	view.setGameSrc(url);
				// 	this.switchToGame();
				// }

				view.initFloat(id);
				view.setGameSrc(url);
				this.switchToGame();

			},

			/*
			 * 打开支付页面
			 */
			openPay: function(url){
				view.setPaySrc(url);
				view.showPay();
			},

			/*
			 * 分享游戏
			 */
			shareGame: function(webid, id){
				//需要信息：分享内容，gkey，img
				var gameInfo = model.getItemByID(id);
				var context =  gameInfo['shareContext'] || config['defaultShareContext'];
				var gkey = gameInfo['gkey'];
				var imgSrc = gameInfo['img_log'];
				var linkUrl = config['mainURL'] + "?gkey=" + gkey;
				var url = "http://www.jiathis.com/send/?webid=" + webid;
				if(context){
					url += ("&title=" + context);
				}
				if(imgSrc){
					url+= ("&imageUrl=" + imgSrc);
				}
				url += "&url=" + linkUrl;
				window.open(url);
			},

			/*
			 * 助手版分享游戏
			 */
			assistantShare: function(title, content, logo, link){
				if(window.AndroidWebview){
					if(AndroidWebview.simpleShareToSNS){
						AndroidWebview.simpleShareToSNS(JSON.stringify({
							"default" : options.weibo || content,
							"weixin" : content || "",
							"weixinUrl" : link || location.href,
							"weixinTitle" : title || "",
							"weixinThumbnailUrl": logo || "",
							"showSms" : true,
							"showMore" : true,
							"needMonitor": true,
							"showQQ" : true
						}));
					} 
					else {
						AndroidWebview.shareToSNS(JSON.stringify({
							content : content || "",
							imgUrl : logo || ""
						}));
					}
				} 
				else if( navigator.userAgent.indexOf("MicroMessenger")>-1 ){
					$('#wxshare').show();
				} 
				else {
					var text = content || "";
					var img = logo || "";
					var url = link || location.href;
					var shareHref = "http://service.weibo.com/share/share.php?title=" + encodeURIComponent(text) + "&url=" + encodeURIComponent(url) + "&pic=" + encodeURIComponent(img);
					location.href=shareHref;
				}
			},

			checkLogin: function(callback, exit){
				login_360.checkLogin(function(){
					control.updateUserButton();
					if(callback && typeof callback == 'function'){
						callback();
					}
				}, function(){
					control.updateUserButton();
					if(exit  && typeof exit == 'function'){
						exit();
					}
					
				});
			},
		}
	})();

	/*view*****************************************************************************************************/
	var view = (function(){
		//模板代码
		var uiBtnTemp = $('#uiBtnTemplate').html();
		var uiSwipeTemp = $('#uiSwipeTemplate').html();
		var listItemTemp = $('#listTemplate').html();
		var detailItemTemp = $('#detailTemplate').html();
		var floatTemp = $('#float_template').html();
		//列表绑定按钮的事件
		function bindButton(gameID){
			return {
				bindDetail: function(event){
					event.stopPropagation();
					control.switchToDetail(gameID);
				},

				bindStart: function(event){
					event.stopPropagation();
					control.startGame(gameID);
				}
			};
		};

		function bindTheme(themeID){
			return {
				bindList: function(event){
					event.stopPropagation();
					control.switchListTheme(themeID);
				}
			};
		}

		//展开详情介绍事件
		function clickSummary(){
			//详情是否已经展开
			var opened = false;
			return function(){
				if(!opened){
					opened = true;
					$('#detail_txt2').show();
					$('#detail_txt1').hide();
					$('#detail_summary_button').html('收起');
				}
				else{
					opened = false;
					$('#detail_txt1').show();
					$('#detail_txt2').hide();
					$('#detail_summary_button').html('展开');
				}
			}
		};

		/*
		 * 显示游戏上方的浮层
		 */
		function showFloat(){
			$('#game_float').removeClass('game_float_all');
			$('#game_float').addClass('game_float_hidden');
			$('#game_float').show();
		};

		/*
		 * 隐藏浮层
		 */
		function hideFloat(){
			$('#game_float').hide();
		}

		/*
		 * 刷新浮层状态
		 */
		function changeFloatState(){
			var floatShowed = false;
			return function(){
				//展开
				if(!floatShowed){
					floatShowed = true;
					$('#float_button').removeClass('float_button_down');
					$('#float_button').addClass('float_button_up');
					$('#game_float').removeClass('game_float_hidden');
					$('#game_float').addClass('game_float_all');
				}
				//收回
				else{
					floatShowed = false;
					$('#float_button').removeClass('float_button_up');
					$('#float_button').addClass('float_button_down');
					$('#game_float').removeClass('game_float_all');
					$('#game_float').addClass('game_float_hidden');
				}
			}
		}

		/*
		 * 刷新游戏页面
		 */
		function refreshGame(){
			$('#game_frame').attr('src', $('#game_frame').attr('src'));
		};	

		return{
			/*
			 * 显示主页（列表页）
			 */
			showIndex: function(){
				$('#index_detail').hide();
				$('#game_float').hide();
				$('#game_frame').hide();
				$('#pay_frame').hide();
				$('#index_list').show();
			},
			/*
			 * 显示详情页
			 */
			showDetail: function(){
				$('#index_list').hide();
				$('#game_float').hide();
				$('#game_frame').hide();
				$('#pay_frame').hide();
				$('#index_detail').show();
			},
			/*
			 * 显示游戏页
			 */
			showGame: function(){
				$('#index_list').hide();
				$('#index_detail').hide();
				$('#pay_frame').hide();
				$('#game_float').show();
				$('#game_frame').show();
			},

			/*
			 * 显示支付页
			 */
			showPay: function(){
				$('#index_list').hide();
				$('#index_detail').hide();
				$('#game_float').hide();
				$('#game_frame').hide();
				$('#pay_frame').show();
			},

			/*
			 * 初始化列表页
			 * 更新导航栏，更新用户图标
			 * 添加用户图标事件
			 * 显示副导航栏游戏专题
			 */
			initTheme: function(){
				var theme = model.getTheme();
				//专题列表
				for(var i = 0; i < theme.length; i ++){
					var data = theme[i];
					var template = Handlebars.compile(uiBtnTemp);
					var compiledDOM = template(data);
					$('#ui_btns').append(compiledDOM);
					//绑定事件
					$('#list_theme_' + theme[i]['themeNo']).on('click', bindTheme(data['themeNo']).bindList);
				}
				//绑定事件
				//用户图标
				$('#title_user').on('click', control.switchToUserInfo);
			},

			/*
			 * 焦点图轮播
			 */
			initSwipe: function(data){
				var data = {
					img: model.getSwipe(),
				}
				//渲染焦点图模板
				var template = Handlebars.compile(uiSwipeTemp);
				var compiledDOM = template(data);
				$('#mySwipe').append(compiledDOM);

				//开始轮播
				var elem = $('#mySwipe')[0];
				window.uiejSwipe = new Swipe(elem, {
					startSlide: 0,
					speed: 400,
					auto: 3000,
					continuous: true,
					disableScroll: false,
					stopPropagation: true,
					callback: function(pos) {
						var bullets = $("#swipePoint b");
						var i = bullets.length;
						while (i--) {
							bullets[i].className = '';
						}
						bullets[pos].className = 'active';  
					},
					transitionEnd: function(index, elem) {}
				});

				//点击banner图片进入相应游戏
				$('.banner_img').each(function(){
					$(this).on('click', function(){control.switchToDetail($(this).attr('data-id'))});
				})
			},

			/* 
			 * 列表为空的样式
			 */
			showEmptyList: function(){
				//清空游戏列表
				$('#list_content').empty();
			},

			/* 
			 * 显示/刷新游戏列表
			 */
			refreshGameList: function(gameList){
				//清空游戏列表
				$('#list_content').empty();
				for(var i = 0; i < gameList.length; i ++){
					//添加HTML内容
					var data = gameList[i];
					var template = Handlebars.compile(listItemTemp);
					var compiledDOM = template(data);
					$('#list_content').append(compiledDOM);
					//添加事件
					//进入游戏详情
					$('#detail_game_' + gameList[i]['id']).on('click', bindButton(data['id']).bindDetail);
					//开始游戏
					$('#list_start_game_' + gameList[i]['id']).on('click', bindButton(data['id']).bindStart);
				}
			},

			/*
			 * 刷新用户图标
			 */
			refreshUserButton: function(url, isLogin){
				$('#title_user').css('background', 'url(' + url + ')');
				$('#title_user').css('background-size', '100% 100%');
				$('#title_user').attr('data-isLogin', isLogin);
			},

			/* 
			 * 显示游戏详情
			 */
			initDetail: function(data){
				var outputData = {
					id: data['id'],
					name: data['name'],
					img_log: data['img_log'],
					tag: data['tag'],
					hotscore: data['hotscore'],
					allIntro: data['intro'],
				};
				//计算图片滚屏的数量和宽度
				var imgs = [];
				for(var i = 1; i <= config.maxImgNum; i ++){
					if(data['img_pub_' + i]){
						imgs.push(data['img_pub_' + i]);
					}
				}
				outputData['imgs'] = imgs;
				var imgWidth = document.body.clientWidth >= 375 ? config.bigImgWidth : config.smallImgWidth;
				outputData['width'] = imgs.length * imgWidth + (imgs.length - 1) * 5;
				outputData['briefIntro'] = outputData['allIntro'].substring(0, config.briefIntroNum);
				if(outputData['allIntro'].length > config.briefIntroNum){
					outputData['briefIntro'] += "...";
				}
				var template = Handlebars.compile(detailItemTemp);
				var compiledDOM = template(outputData);
				$('#index_detail').html(compiledDOM);
				//绑定事件
				//两个游戏开始按钮
				$('#list_start_game_' + outputData['id'] + '_top').on('click', function(){
					control.startGame(outputData['id']);
				});
				$('#list_start_game_' + outputData['id'] + '_bot').on('click',  function(){
					control.startGame(outputData['id']);
				});
				$('#detail_return_button').on('click', function(){
					event.preventDefault();
					control.switchToList();
				});

				//绑定分享按钮
				$('#detail_share_weibo').on('click', function(){
					control.shareGame("tsina", $(this).attr('data-id'));
				});
				$('#detail_share_tqq').on('click', function(){
					control.shareGame("tqq", $(this).attr('data-id'));
				});
				$('#detail_share_qzone').on('click', function(){
					control.shareGame("qzone", $(this).attr('data-id'));
				});

				//根据游戏介绍长短决定是否显示展开按钮
				if($('#detail_txt1').html().length > config.briefIntroNum){					
					//展开游戏介绍按钮
					$('#detail_summary_button').show();
					$('#detail_summary_button').on('click', clickSummary());
				}
				else{
					$('#detail_summary_button').hide();
				}
			},

			/*
			 * 初始化游戏浮层
			 */
			initFloat: function(id){
				var template = Handlebars.compile(floatTemp);
				var data = {
					id: id,
				}
				var compiledDOM = template(data);
				$('#game_float').html(compiledDOM);
				$('#game_float').removeClass('game_float_all');
				$('#game_float').addClass('game_float_hidden');
				//绑定事件
				//下拉按钮
				$('#float_button').on('click', changeFloatState());
				//刷新
				$('#function_refresh_button').on('click', refreshGame);
				//返回
				$('#function_return_button').on('click', function(){
					view.setGameSrc("");
					control.switchToList();
				});
				//分享
				$('#float_share_weibo').on('click', function(){
					control.shareGame("tsina", $(this).attr('data-id'));
				});
				$('#float_share_tqq').on('click', function(){
					control.shareGame("tqq", $(this).attr('data-id'));
				});
				$('#float_share_qzone').on('click', function(){
					control.shareGame("qzone", $(this).attr('data-id'));
				});
			},

			/*
			 * 设置游戏页src
			 */
			setGameSrc: function(src){
				$('#game_frame').attr('src', src);
			},

			/*
			 * 设置支付页src
			 */
			setPaySrc: function(src){
				$('#pay_frame').attr('src', src);
			},
		}
	})();

	/*model****************************************************************************************************/
	var model = (function(){
		var gameList, gameTheme, gameSwipe;
		return{
			getGameList: function(themeID){
				if(!themeID){
					return gameList;
				}
				else{
					var themeGameList = [];
					for(var i = 0; i < gameList.length; i ++){
						if(gameList[i]['theme'] == themeID){
							themeGameList.push(gameList[i]);
						}
					}
					return themeGameList;
				}
			},

			setGameList: function(list){
				gameList = list;
			},

			/*
			 * 页面排序
			 */
			sortGameList: function(){
				gameList.sort(function(objA, objB){
					return (objA['sequence'] == objB['sequence']) ? (objB['hotscore'] - objA['hotscore']) : (objA['sequence'] - objB['sequence']);
				});
			},

			getItemByID: function(id){
				for(var i = 0; i < gameList.length; i ++){
					if(gameList[i]['id'] == id){
						return gameList[i];
					}
				}
				return null;
			},

			getItemId: function(gkey){
				for(var i = 0; i < gameList.length; i ++){
					if(gameList[i]['gkey'] === gkey){
						return gameList[i]['id'];
					}
				}
				return null;
			},

			setTheme: function(theme){
				gameTheme = theme;
			},

			getTheme: function(){
				return gameTheme;
			},

			sortTheme: function(){
				gameTheme.sort(function(objA, objB){
					return objA['themeNo'] > objB['themeNo'];
				});
			},

			/*
			 * 设置分享语
			 */
			setShare: function(context){
				for(var i = 0; i < context.length; i ++){
					var game = this.getItemByID(context[i]['id']);
					if(game){{
						game['shareContext'] = context[i]['context'];
					}}
					
				}
			},

			setSwipe: function(swipe){
				gameSwipe = swipe;
			},

			getSwipe: function(){
				return gameSwipe;
			},
		};
	})();

	//初始化信使
	var messenger = new Messenger('h5sdk');
	//添加监听目标
	var gameFrame = document.getElementById('game_frame');
	messenger.addTarget(gameFrame.contentWindow, 'gameFrame');
	messenger.sendObj = function(funcName, args){
		var msg = JSON.stringify({
			funcName: funcName,
			args: args
		});
		this.send(msg);
	}

	return{

		/*
		 * 首页初始化
		 */
		init: function(){
			//初始化数据
			console.log("init.....");
			control.initData(function(){
				//是否直接跳转到游戏详情页
				//分析url参数，找到gkey
				var gkey = (function GetQueryString(name) { 
					var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
					var r = window.location.search.substr(1).match(reg); 
					if (r != null){
						return unescape(r[2]); 
					}
					return null; 
				})('gkey');

				if(gkey){
					//control.switchToDetail(gkey);
					control.switchToDetail(gkey);
				}
			});
			//监听消息
			messenger.listen(function(msg){
				var msgObj = JSON.parse(msg);
				//获取支付
				if(msgObj['funcName'] === 'pay'){
					//回传信息
					messenger.sendObj('payReturn', main.p());
				}
				//登录
				else if(msgObj['funcName'] === 'login'){
					var channel = msgObj['args'];
					//先告诉frame已经接收到请求
					messenger.sendObj('getLogin');
					//启动checkLogin
					function callback(){
						login_360.g(function(info){
							messenger.sendObj('loginCallback', info);
						});
					}
					function exit(){
						messenger.sendObj('loginExit');
					}
					login_360.checkLogin(callback, exit);
				}
				else if(msgObj['funcName'] === 'openPay'){
					control.openPay(msgObj['args']);
				}	
				//关闭页面
				else if(msgObj['funcName'] === 'closePay'){
					control.switchToGame();
				}
				//分享
				else if(msgObj['funcName'] === 'share'){
					var info = msgObj['args'];
					control.assistantShare(info['title'], info['content'], info['img'], info['link']);
				}
			});
		},

		// testShare: function(){
		// 	control.assistantShare(
		// 		"敢来不", 
		// 		"有胆你就来", 
		// 		"http://p2.qhimg.com/t01dfeb1e9bd77b8b02.png", 
		// 		"http://d.hgame.com/hdpt/x360zs/appid/100070/gameid/100124?qid=2544865395&server_id=1&time=1452237587&sign=eb0980257b92328257bbe80bbf46b861&isAdult=1&channel=360H5");
		// },
		testSend: function(message){
			messenger.sendObj('testSend', message);
		},

		//客户端验证
		c: function(str, callback){
			return callback(str);
		},
		//客户端获取支付url
		p: function(){
			return config['payURL'];
		},
	}
});
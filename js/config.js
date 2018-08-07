define('config', function(){
	return {
		//每个游戏详情图片的最多数量
		maxImgNum: 5,
		//每张图片的规定宽度
		bigImgWidth: 180,
		smallImgWidth: 168,
		//简要介绍的字数
		briefIntroNum: 50,
		//本SDK主页URL
		mainURL: INDEX_URL,
		//获取游戏列表URL
		getDataURL: "http://home.h5.mgame.360.cn/game/getList",
		//开始游戏URL
		startGameURL: "http://login.h5.mgame.360.cn/gamelogin",
		//startGameURL: "http://10.16.73.18/gamelogin",
		//支付的html
		payURL: "http://pay.h5.mgame.360.cn/h5game.html",
		//用户默认头像url
		noLoginURL: "http://p1.qhimg.com/d/inn/6057758b/notLoginedUser.png",
		defaultUserURL: "http://p0.qhimg.com/d/inn/0748e8d1/defaultUser.png",
		//错误参数
		errCode: {
			'100':	'key错误', 
			'101':	'游戏不存在',
			'102':	'游戏禁止新玩家进入',
			'200':	'key错误',
			'201':	'区服尚未开启',
			'202':	'区服维护',
			'300':	'请先登录',
			'500':	'系统错误',
			'601':	'非法请求',
		},

		//游戏所属类型对应代码
		themeCode: [
			{
				'themeNo': 30,
				'name': '文字游戏',
			},
			{
				'themeNo': 0,
				'name': '热门推荐',
			},
		],
		//轮播图资料
		swipe: [
			//我欲封天
			{
				index: 1,
				id: 290592,
				//普通banner
				//src: 'http://p9.qhimg.com/t015ed40b817d1b6b4b.jpg',
				//圣诞banner
				src: 'http://p2.qhimg.com/t01ec8896d4369391b8.jpg',
				class: 'active',
			},
			//传奇世界
			{
				index: 2,
				id: 285162,
				src: 'http://p2.qhimg.com/d/inn/fb4d061a/720280.jpg',
				class: '',
			},
			//全民盗墓
			{
				index: 3,
				id: 302312,
				src: 'http://p8.qhimg.com/t01489b53f095654d79.png',
				class: '',
			},
			// //天天赚钱
			// {
			// 	index: 3,
			// 	id: 268822,
			// 	src: 'http://p3.qhimg.com/d/inn/d64c476d/ttzqbanner.jpg',
			// 	class: '',
			// },
			//恐怖医院
			{
				index: 4,
				id: 278822,
				src: 'http://p3.qhimg.com/d/inn/d444e2c6/banner1.jpg',
				class: '',
			},
			// //鬼娃娃
			// {
			// 	index: 5,
			// 	id: 284432,
			// 	src: 'http://p5.qhimg.com/d/inn/d3ae5f56/banner2.png',
			// 	class: '',
			// },
			// //告白小人
			// {
			// 	index: 6,
			// 	id: 284482,
			// 	src: 'http://p7.qhimg.com/d/inn/c8fe9bea/banner3.png',
			// 	class: '',
			// }
		],

		//默认分享宣传语
		shareContext: [
			{
				'gkey': 'ttzq',
				'id': 268822,
				'context': "变身大土豪，每天赚几亿不是梦！",
			},
			{
				'gkey': 'gbxr',
				'id': 284482,
				'context': "单身狗脱单利器！今年脱单就靠它了！",
			},
			{
				'gkey': 'kbyy',
				'id': 278822,
				'context': "跌宕起伏的故事表层下隐藏玄机",
			},
			{
				'gkey': 'gww',
				'id': 284432,
				'context': "看，有双眼睛在盯着你呢。",
			},
			{
				'gkey': 'jwzl',
				'id': 284552,
				'context': "走上了这条路，你以为你还能回头吗？",
			},
			{
				'gkey': 'yc',
				'id': 284582,
				'context': "要怎样，才能逃离这让人窒息的城...",
			},
			{
				'gkey': 'ssxy',
				'id': 284612,
				'context': "仅仅睡了一觉，醒来后已不是熟悉的世界",
			},
			{
				'gkey': 'yj',
				'id': 284652,
				'context': "你眼中的世界，好像能比别人多看到点什么...",
			},
		],

		defaultShareContext: "H5游戏",
	}
})
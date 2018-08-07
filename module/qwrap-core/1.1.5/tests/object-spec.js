define(['{{module}}'], function(_) {
	var ObjectH = $.ObjectH;

	if(typeof console === 'undefined') {
		var console = { log : function(){} };
	}

	describe('ObjectH', function() {
		it('Object', function() {
			var a = {
				x: 1,
				y: 2,
				z: 3
			};

			console.log('keys', ObjectH.keys(a));
			console.log('values', ObjectH.values(a));
		});

		it('isString/isFunction/isArray/isObject', function() {

			expect(ObjectH.isString('hello')).to.be(true);
			expect(ObjectH.isString(new String(true))).to.be(true);
			expect(ObjectH.isString(1)).to.be(false);

			expect(ObjectH.isFunction(function() {})).to.be(true);
			expect(ObjectH.isFunction(new Function(';'))).to.be(true);
			expect(ObjectH.isFunction('hello')).to.be(false);

			expect(ObjectH.isArray([])).to.be(true);
			expect(ObjectH.isArray(null)).to.be(false);
			expect(ObjectH.isArray({})).to.be(false);

			expect(ObjectH.isObject(null)).to.be(false);
			expect(ObjectH.isObject({})).to.be(true);
			expect(ObjectH.isObject([])).to.be(true);
			expect(ObjectH.isObject('hello')).to.be(false);
		});

		it('isArrayLike/isPlainObject/isElement', function() {

			expect(ObjectH.isArrayLike([])).to.be(true);
			expect(ObjectH.isArrayLike(document.body.childNodes)).to.be(true);
			expect(ObjectH.isArrayLike({})).to.be(false);

			expect(ObjectH.isPlainObject({})).to.be(true);
			expect(ObjectH.isPlainObject(new Object())).to.be(true);
			expect(ObjectH.isPlainObject('hello')).to.be(false);

			expect(ObjectH.isElement(document.body)).to.be(true);
			expect(ObjectH.isElement({})).to.be(false);
			expect(ObjectH.isElement(null)).to.be(false);
		});
		it('mix', function() {
			var el = {};
			ObjectH.mix(el, {
				name: 'JK'
			});
			expect(el.name).to.be('JK');
			ObjectH.mix(el, {
				name: 'Tom'
			});
			expect(el.name).to.be('JK');
			ObjectH.mix(el, {
				name: 'Tom'
			}, true);
			expect(el.name).to.be('Tom');
		});
		it('deep mix', function(){
			var des = {
				a : {x:1},
				b : {y:2}
			}, src =  {
				a : {y:1},
				b : {y:-2},
				c : {z:0}
			}; 
			
			ObjectH.mix(des, src, function(d, s){
				if(d && typeof d == 'object'){
					return ObjectH.mix(d, s, arguments.callee);
				}else{
					return s;
				}
			});
			expect(des.a.y).to.be(1);
			expect(des.b.y).to.be(-2);
			expect(des.c.z).to.be(0);
		});

		it('keys', function() {
			var el = {
				name: 'JK',
				age: 100
			};
			expect(ObjectH.keys(el)).to.have.length(2);
		});

		it('set', function() {
			var el = {
				name: 'JK',
				age: 100,
				friend: {}
			};
			ObjectH.set(el, 'friend.name', 'Tom');
			expect(el.friend.name).to.be('Tom');
			ObjectH.set(el, {
				'friend.age' : 10,
				teacher: {
					name: 'Zhou'
				}
			});
			expect(el.friend.age + el.teacher.name).to.be('10Zhou');
			ObjectH.set(el, function(el) {
				el.hometown = 'HB';
			});
			expect(el.hometown).to.be('HB');

		});
		it('get', function() {
			var el = {
				name: 'JK',
				age: 100,
				friend: {
					name: 'Tom'
				}
			};
			expect(ObjectH.get(el, 'name')).to.be('JK');
			expect(ObjectH.get(el, 'friend.name')).to.be('Tom');
			expect(ObjectH.get(el, 'friendd.name')).to.be(undefined);
			expect(ObjectH.get(el, function(el) {
				return el.friend.name;
			})).to.be('Tom');
		});
		it('stringify', function() {
			var json = {
				"cardNo": "bbbb1234",
				"history": [1, 2]
			};
			expect(ObjectH.stringify(json)).to.be('{"cardNo":"bbbb1234","history":[1,2]}');
		});
		it('encodeURIJson', function() {
			var json = {
				"a": "1",
				"b": [1, 2]
			};
			expect(ObjectH.encodeURIJson(json)).to.be('a=1&b=1&b=2');
		});
	});
});
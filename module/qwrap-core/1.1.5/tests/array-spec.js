define(['{{module}}'], function(_) {
	var ArrayH = $.ArrayH;

	if(typeof console === 'undefined') {
		var console = { log : function(){} };
	}

	describe('ArrayH', function() {
		it('ArrayH Members', function() {
			expect(ArrayH).to.have.property('map');
			expect(ArrayH).to.have.property('forEach');
			expect(ArrayH).to.have.property('filter');
		});

		it('map', function() {
			expect(ArrayH.map([1, 2, 3], function(o, i, arr) {
				return o * 5;
			})[1]).to.be(10);
		});

		it('forEach Add', function() {
			var arr = [1, 2, 3];
			var t = 0;
			ArrayH.forEach(arr, function(o, i, arr) {
				arr.push(i);
				t++;
			});
			expect(t).to.be(3);
		});

		it('forEach Del', function() {
			var arr = [1, 2, 3];
			var t = 0;
			ArrayH.forEach(arr, function(o, i, arr) {
				arr.pop();
				t++;
			});
			expect(t).to.be(2);
		});

		it('forEach undefined', function() {
			var arr = [1, null];
			arr[3] = 4;
			var t = 0;

			ArrayH.forEach(arr, function() {
				t++;
			});
			expect(t).to.be(3);
		});

		it('forEach arguments', function() {
			function t() {
				ArrayH.forEach(arguments, function(o, i, a) {
					console.log(a);
				});
			}
			t(1, undefined, 3);
		});

		it('filter', function() {
			var arr = ArrayH.filter([-2, -1, 0, 1, 2], function(o, i, a) {
				return o > 0;
			});
			expect(arr.length).to.be(2);
		});

		it('some', function() {
			var arr = [-2, -1, 0, 1, 2];
			expect(ArrayH.some(arr, function(o, i, a) {
				return o > 0;
			})).to.be(true);
			expect(ArrayH.some(arr, function(o, i, a) {
				return o > 2;
			})).to.be(false);
		});

		it('every', function() {
			var arr = [-2, -1, 0, 1, 2];
			expect(ArrayH.every(arr, function(o, i, a) {
				return o > -3;
			})).to.be(true);
			expect(ArrayH.every(arr, function(o, i, a) {
				return o > 0;
			})).to.be(false);
		});

		it('indexOf', function() {
			var arr = [-2, -1, 0, 1, 2, 0];
			expect(ArrayH.indexOf(arr, 3)).to.be(-1);
			expect(ArrayH.indexOf(arr, 0)).to.be(2);
			expect(ArrayH.indexOf(arr, 0, 3)).to.be(5);
			expect(ArrayH.indexOf(arr, 0, -2)).to.be(5);
		});

		it('lastIndexOf', function() {
			var arr = [-2, -1, 0, 1, 2, 0];
			expect(ArrayH.lastIndexOf(arr, 3)).to.be(-1);
			expect(ArrayH.lastIndexOf(arr, 0)).to.be(5);
			expect(ArrayH.lastIndexOf(arr, 0, 1)).to.be(-1);
			expect(ArrayH.lastIndexOf(arr, 0, 2)).to.be(2);
			expect(ArrayH.lastIndexOf(arr, 0, -2)).to.be(2);
		});

		it('contains', function() {
			var arr = [-2, -1, 0, 1, 2, 0];
			expect(ArrayH.contains(arr, 0)).to.be(true);
			expect(ArrayH.contains(arr, 3)).to.be(false);
		});

		it('clear', function() {
			var arr = [-2, -1, 0, 1, 2, 0];
			ArrayH.clear(arr);
			expect(arr.length).to.be(0);
		});

		it('remove', function() {
			var arr = [-2, -1, 0, 1, 2, 0];
			expect(ArrayH.remove(arr, 3)).to.be(-1);
			expect(ArrayH.remove(arr, 0)).to.be(2);
			expect(ArrayH.remove(arr, 0)).to.be(-1);
		});

		it('unique', function() {
			var arr = [-2, -1, 0, 1, 2, 0];
			expect(ArrayH.unique(arr, 3).length).to.be(5);
		});

		it('reduce', function() {
			var arr = [-2, -1, 0, 1, 2, 3];
			expect(ArrayH.reduce(arr, function(a, b) {
				console.log([a, b]);
				return a + b;
			})).to.be(3);
			expect(ArrayH.reduce(arr, function(a, b) {
				return a + b;
			}, 5)).to.be(8);
		});

		it('reduceRight', function() {
			var arr = [1, 2, 3];
			expect(ArrayH.reduceRight(arr, function(a, b) {
				return a / b;
			})).to.be(1.5);
			expect(ArrayH.reduceRight(arr, function(a, b) {
				return a / b;
			}, 6)).to.be(1);
		});

		it('expand', function() {
			var arr = [1, [21, 22, [231, 232, [2331, 2332]]], 3];
			expect(ArrayH.expand(arr).length).to.be(8);
			expect(ArrayH.expand(arr,true).length).to.be(5);
		});

		it('toArray', function() {
			var arr = [1, 2];
			expect(ArrayH.toArray(arr).length).to.be(2);
		});
	});
});
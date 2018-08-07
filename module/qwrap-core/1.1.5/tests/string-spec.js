define(['{{module}}'], function(_) {
	var StringH = $.StringH;

	describe('StringH', function() {
		it('StringH Members', function() {
			expect(StringH).to.have.property('trim');
		});

		it('trim', function() {
			expect(StringH.trim("  aaa  ")).to.be("aaa");
			expect(StringH.trim("﻿aaaaa﻿")).to.be("aaaaa");
		});

		it('mulReplace', function() {
			expect(StringH.mulReplace("ab", [
				["a", "A"],
				["b", "B"]
			])).to.be("AB");
		});

		it('format', function() {
			expect(StringH.format("I'm {0}.", "JK")).to.be("I'm JK.");
		});

		it('tmpl', function() {
			expect(StringH.tmpl("I'm {$0}.", ["JK"])).to.be("I'm JK.");
			expect(StringH.tmpl("{$a} love {$b}.", {
				a: "I",
				b: "you"
			})).to.be("I love you.");
			expect(StringH.tmpl('<input value="{=$name}">', {
				name:'JK\'\"> Ying<'
			})).to.be('<input value="JK&#039;&quot;&gt; Ying&lt;">');
			expect(StringH.tmpl("{js print('I')} love {$b}.", {
				a: "I",
				b: "you"
			})).to.be("I love you.");
			expect(StringH.tmpl("{js print('I')} love {$b}.")({
				a: "I",
				b: "you"
			})).to.be("I love you.");
		});

		it('contains', function() {
			expect(StringH.contains("abc", "bc")).to.be(true);
			expect(StringH.contains("abc", "bd")).to.be(false);
		});

		it('dbc2sbc', function() {
			expect(StringH.dbc2sbc("ＢＣ１")).to.be("BC1");
		});

		it('byteLen', function() {
			expect(StringH.byteLen("中国a")).to.be(5);
		});

		it('subByte', function() {
			expect(StringH.subByte("中国a", 3)).to.be("中");
			expect(StringH.subByte("中国人民", 6, '…')).to.be("中国…");
			expect(StringH.subByte("中国人民", 8, '…')).to.be("中国人民");
			expect(StringH.subByte("中国人民", 9, '…')).to.be("中国人民");
		});

		it('camelize', function() {
			expect(StringH.camelize("bg-color")).to.be("bgColor");
		});

		it('decamelize', function() {
			expect(StringH.decamelize("bgColor")).to.be("bg-color");
		});

		it('encode4Js', function() {
			expect(StringH.encode4Js("\"")).to.be("\\u0022");
		});

		it('encode4Http', function() {
			expect(StringH.encode4Http("&?")).to.be(encodeURIComponent("&?"));
		});

		it('encode4Html', function() {
			expect(StringH.encode4Html("<")).to.be("&lt;");
		});

		it('encode4HtmlValue', function() {
			expect(StringH.encode4HtmlValue("<\"")).to.be("&lt;&quot;");
		});

		it('stripTags', function() {
			expect(StringH.stripTags("a<a>")).to.be("a");
		});

		it('evalJs', function() {
			expect(StringH.evalJs("return 1+2")).to.be(3);
		});

		it('evalExp', function() {
			expect(StringH.evalExp("1+2")).to.be(3);
		});

		it('queryUrl', function() {
			expect(StringH.queryUrl("a=1&b=1&b=2",'a')).to.be('1');
			expect(StringH.queryUrl("a=1&b=1&b=2",'b')+'').to.be('1,2');
			expect(StringH.queryUrl("a=1&b=1&b=2").b+'').to.be('1,2');
		});
	});
});
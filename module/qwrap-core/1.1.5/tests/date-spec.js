define(['{{module}}'], function(_) {
	var DateH = $.DateH;

	describe('DateH', function() {
		it('DateH Members', function() {
			expect(DateH).to.have.property('format');
		});


		it('format', function() {
			expect(DateH.format(new Date("2008/1/1"))).to.be("2008-01-01");
			expect(DateH.format(new Date("2008/1/12"), "MM/dd/yyyy")).to.be("01/12/2008");
		});
	});
});
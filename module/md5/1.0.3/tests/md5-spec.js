define(['{{module}}'], function(md5) {
	    describe('MD5 Hex-encoding', function() {
        it('should create a hex-encoded MD5 hash of an ASCII value', function() {
            expect(md5('75team')).to.be('379433a1ebc0edbd9ba975cb7cccafaf');
        });

        it('should create a hex-encoded MD5 hash of an UTF-8 value', function() {
            expect(md5('奇舞团')).to.be('386146f419944ec6ec05264dc7bdf37c');
        });
    });

    describe('HMAC-MD5 Hex-encoding', function() {
        it('should create a hex-encoded HMAC-MD5 hash of an ASCII value and key', function() {
            expect(md5('75team', 360)).to.be('0e26ebff5b74e006fe8daf8ce25eca74');
        });

        it('should create a hex-encoded HMAC-MD5 hash of an UTF-8 value and key', function() {
            expect(md5('奇舞团', '奇舞团')).to.be('9764b3945269b45c963bbf86be3b861c');
        });
    });

    describe('MD5 raw encoding', function() {
        it('should create a raw MD5 hash of an ASCII value', function() {
            expect(md5('75team', null, true)).to.be('\x37\x94\x33\xa1\xeb\xc0\xed\xbd\x9b\xa9\x75\xcb\x7c\xcc\xaf\xaf');
        });

        it('should create a raw MD5 hash of an UTF-8 value', function() {
            expect(md5('奇舞团', null, true)).to.be('\x38\x61\x46\xf4\x19\x94\x4e\xc6\xec\x05\x26\x4d\xc7\xbd\xf3\x7c');
        });
    });

    describe('HMAC-MD5 raw encoding', function() {
        it('should create a raw HMAC-MD5 hash of an ASCII value and key', function() {
            expect(md5('75team', 360, true)).to.be('\x0e\x26\xeb\xff\x5b\x74\xe0\x06\xfe\x8d\xaf\x8c\xe2\x5e\xca\x74');
        });

        it('should create a raw HMAC-MD5 hash of an UTF-8 value and key', function() {
            expect(md5('奇舞团', '奇舞团', true)).to.be('\x97\x64\xb3\x94\x52\x69\xb4\x5c\x96\x3b\xbf\x86\xbe\x3b\x86\x1c');
        });
    });
});
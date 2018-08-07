define(['handlebars', 'jQuery','spin'],function () {

    window.Messenger = (function(){

        // 消息前缀, 建议使用自己的项目名, 避免多项目之间的冲突
        // !注意 消息前缀应使用字符串类型
        var prefix = "FuncellH5Sdk",
            supportPostMessage = 'postMessage' in window;

        // Target 类, 消息对象
        function Target(target, name, prefix){
            var errMsg = '';
            if(arguments.length < 2){
                errMsg = 'target error - target and name are both required';
            } else if (typeof target != 'object'){
                errMsg = 'target error - target itself must be window object';
            } else if (typeof name != 'string'){
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
                this.target.postMessage(this.prefix + '|' + this.name + '__Messenger__' + msg, '*');
            };
        } else {
            // 兼容IE 6/7
            Target.prototype.send = function(msg){
                var targetFunc = window.navigator[this.prefix + this.name];
                if ( typeof targetFunc == 'function' ) {
                    targetFunc(this.prefix + msg, window);
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
                    window.addEventListener('message', generalCallback, false);
                } else if ( 'attachEvent' in document ) {
                    window.attachEvent('onmessage', generalCallback);
                }
            } else {
                // 兼容IE 6/7
                window.navigator[this.prefix + this.name] = generalCallback;
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

    var FuncellAjax = function(obj){
        //初始化对象，没填某项时使用默认值代替
        obj = {
            //请求方法，默认post
            method: obj.method || "post",
            //请求的URL
            url:obj.url || "",
            //发送的请求数据参数
            data: obj.data || "",
            //请求超时的时间，默认5秒
            timeout: obj.timeout || 5000,
            //请求成功时执行的函数
            success: obj.success || function(){},
            //请求失败时执行的函数
            error: obj.error || function(){},
            //请求完成（不管成功还是失败都会调用）时执行的函数
            complete: obj.complete || function(){},
            //同步还是异步，默认异步
            async : obj.async || true
        };
        //创建XHR对象
        // var xhr = (function(){
        //     if( typeof XMLHttpRequst !== 'undefined') {
        //         return new XMLHttpRequest();
        //     } else if( typeof ActiveXObject !== 'undefined') {//否则判断ActiveXObject
        //         if( typeof arguments.callee.activeXString != 'string') {
        //             var versions = ['MSXML2.XMLHTTP.6.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP'];
        //             for(var i = 0, len = versions.length; i < len; i++) {
        //                 try {
        //                     new ActiveXObject(versions[i]);
        //                     arguments.callee.activeXString = versions[i];
        //                     break;
        //                 } catch(ex) {
        //                     //跳过
        //                 }
        //             }
        //         }
        //         return new ActiveXObject(arguments.callee.activeXString);
        //     } else{
        //         throw new Error('No XHR object available');
        //     }
        // })();
        var xhr = window.XMLHttpRequest ? new window.XMLHttpRequest: new ActiveXObject("MSXML2.XMLHTTP");

        var requestDone = false;//标志请求是否完成
            //通过使用JS随机字符串解决IE浏览器第二次默认获取缓存的问题

        obj.url = obj.url + '?rand=' + Math.random();
        //将名值对转换成字符串
        obj.data = (function(data){
            var arr = [];
            for (var i in data) {
                //特殊字符传参产生的问题可以使用encodeURIComponent()进行编码处理
                arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
            }
            return arr.join('&');
        })(obj.data);
        //若是GET请求，则将数据加到url后面
        if (obj.data !== '' && obj.method === 'get') {
            obj.url += obj.url.indexOf('?') == -1 ? '?' + obj.data : '&' + obj.data;
        }
        //在使用XHR对象时，必须先调用open()方法，
        //它接受三个参数：请求类型(get、post)、请求的URL和表示是否异步。
        xhr.open(obj.method, obj.url, obj.async);
        //初始化一个5秒的回调函数，用于取消请求（如果尚未完成的话）
        setTimeout(function(){
            requestDone = true;
        }, obj.timeout);

        if (obj.async === true) {  //true表示异步，false表示同步
            //使用异步调用的时候，需要触发readystatechange 事件
            //监听文档状态的更新
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && !requestDone) {   //判断对象的状态是否交互完成
                    callback();         //回调
                }
            };
        }
        if (obj.method === 'post') {
            //post方式需要自己设置http的请求头，来模仿表单提交。
            //放在open方法之后，send方法之前。
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(obj.data);        //post方式将数据放在send()方法里
        } else {
            xhr.send(null);        //get方式则填null
        }
        if (obj.async === false) {  //同步
            callback();
        }
        function callback() {
            if (xhr.status == 200) {  //判断http的交互是否成功，200表示成功
                obj.success(xhr.responseText);            //成功
            } else {
                obj.error(xhr.status,xhr.statusText)    //失败
            }
            //调用完成回调函数
            obj.complete();
            //避免内存泄漏，清理文档
            xhr = null;
        }
        return this;
    };

    var FuncellBase64 = {
        // private property
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

        // public method for encoding
        encode: function(input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;

            input = this._utf8_encode(input);

            while (i < input.length) {

                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

            }

            return output;
        },

        // public method for decoding
        decode: function(input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            while (i < input.length) {

                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

            }

            output = this._utf8_decode(output);

            return output;

        },

        // private method for UTF-8 encoding
        _utf8_encode: function(string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";

            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }

            return utftext;
        },

        // private method for UTF-8 decoding
        _utf8_decode: function(utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;

            while (i < utftext.length) {

                c = utftext.charCodeAt(i);

                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }

            }

            return string;
        }
    };

    function FuncellMd5(){
    var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
    var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
    var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

    /*
     * These are the functions you'll usually want to call
     * They take string arguments and return either hex or base-64 encoded strings
     */
    this.hex_md5 = function (s) {
        return binl2hex(core_md5(str2binl(s), s.length * chrsz));
    }
    // function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
    function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
    function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
    function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
    function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
    function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }

    /*
     * Perform a simple self-test to see if the VM is working
     */
    function md5_vm_test()
    {
        return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
    }

    /*
     * Calculate the MD5 of an array of little-endian words, and a bit length
     */
    function core_md5(x, len)
    {
        /* append padding */
        x[len >> 5] |= 0x80 << ((len) % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;

        var a =  1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d =  271733878;

        for(var i = 0; i < x.length; i += 16)
        {
            var olda = a;
            var oldb = b;
            var oldc = c;
            var oldd = d;

            a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
            d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
            c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
            b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
            a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
            d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
            c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
            b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
            a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
            d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
            c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
            b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
            a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
            d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
            c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
            b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

            a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
            d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
            c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
            b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
            a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
            d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
            c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
            b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
            a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
            d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
            c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
            b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
            a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
            d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
            c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
            b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

            a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
            d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
            c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
            b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
            a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
            d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
            c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
            b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
            a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
            d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
            c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
            b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
            a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
            d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
            c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
            b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

            a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
            d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
            c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
            b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
            a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
            d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
            c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
            b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
            a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
            d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
            c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
            b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
            a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
            d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
            c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
            b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

            a = safe_add(a, olda);
            b = safe_add(b, oldb);
            c = safe_add(c, oldc);
            d = safe_add(d, oldd);
        }
        return Array(a, b, c, d);

    }

    /*
     * These functions implement the four basic operations the algorithm uses.
     */
    function md5_cmn(q, a, b, x, s, t)
    {
        return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
    }
    function md5_ff(a, b, c, d, x, s, t)
    {
        return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }
    function md5_gg(a, b, c, d, x, s, t)
    {
        return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }
    function md5_hh(a, b, c, d, x, s, t)
    {
        return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5_ii(a, b, c, d, x, s, t)
    {
        return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

    /*
     * Calculate the HMAC-MD5, of a key and some data
     */
    function core_hmac_md5(key, data)
    {
        var bkey = str2binl(key);
        if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

        var ipad = Array(16), opad = Array(16);
        for(var i = 0; i < 16; i++)
        {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }

        var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
        return core_md5(opad.concat(hash), 512 + 128);
    }

    /*
     * Add integers, wrapping at 2^32. This uses 16-bit operations internally
     * to work around bugs in some JS interpreters.
     */
    function safe_add(x, y)
    {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    /*
     * Bitwise rotate a 32-bit number to the left.
     */
    function bit_rol(num, cnt)
    {
        return (num << cnt) | (num >>> (32 - cnt));
    }

    /*
     * Convert a string to an array of little-endian words
     * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
     */
    function str2binl(str)
    {
        var bin = Array();
        var mask = (1 << chrsz) - 1;
        for(var i = 0; i < str.length * chrsz; i += chrsz)
            bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
        return bin;
    }

    /*
     * Convert an array of little-endian words to a string
     */
    function binl2str(bin)
    {
        var str = "";
        var mask = (1 << chrsz) - 1;
        for(var i = 0; i < bin.length * 32; i += chrsz)
            str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
        return str;
    }

    /*
     * Convert an array of little-endian words to a hex string.
     */
    function binl2hex(binarray)
    {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for(var i = 0; i < binarray.length * 4; i++)
        {
            str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
                hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
        }
        return str;
    }

    /*
     * Convert an array of little-endian words to a base-64 string
     */
    function binl2b64(binarray)
    {
        var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var str = "";
        for(var i = 0; i < binarray.length * 4; i += 3)
        {
            var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
            for(var j = 0; j < 4; j++)
            {
                if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
                else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
            }
        }
        return str;
    }
    };

    var getSingle = function (fn) {
        var  instance;
        return function () {
            return instance || (instance = fn.apply(this,arguments));
        }
    }

    var FuncellUtil = function(){
        // var baseRandom = (Math.random() + "").replace(".", "");
        var baseRandom = 999;
        var baseZIndex = 0;

        var maskOptions = {
            maskId : "funcell_Mask" + baseRandom,
            textColor : "#eee",
            textFontSize : 16,
            tip : ''
        };

        function extendOptions(options) {
            if (options == undefined)
                return maskOptions;
            var settings = maskOptions;
            if (options.maskId != undefined) {
                settings.maskId = options.maskId;
            }
            if (options.textColor != undefined) {
                settings.textColor = options.textColor;
            }
            if (options.textFontSize != undefined) {
                settings.textFontSize = options.textFontSize;
            }
            if (options.tip != undefined) {
                settings.tip = options.tip;
            }
            return settings;
        }

        function _funcell_mask(options) {
            var settings = extendOptions(options);
            var maskHtml = '<div class="mask"></div><div style="text-align:center; height:30px; line-height:30px; position:absolute; padding-right:20px; left:0; right:0; top:50%; margin-top:-15px; z-index:9;"><span class="loading">&nbsp;</span><span style="padding-left:10px; color:'
                + settings.textColor
                + '; font-size:'
                + settings.textFontSize
                + 'px;">' + settings.tip + '</span></div>';
            var _funcellMask = document.createElement('div');
            _funcellMask.id = settings.maskId;
            _funcellMask.style.position = 'fixed';
            _funcellMask.style.left = '0';
            _funcellMask.style.top = '0';
            _funcellMask.style.right = '0';
            _funcellMask.style.bottom = '0';
            _funcellMask.style.zIndex = baseZIndex + 99999;
            _funcellMask.innerHTML = maskHtml;
            document.getElementsByTagName('body').item(0).appendChild(_funcellMask);
        }
        
        function _funcell_unmask(options) {
            var settings = extendOptions(options);
            _removeElement(_E("funcell_Mask" + baseRandom));
        }

        function _createFuncellClose(transId, retFunc,closeTxt) {
            var tmcloseTxt;
            if(closeTxt== undefined){
                tmcloseTxt="返回游戏"
            }else{
                tmcloseTxt = closeTxt;
            }
            var _funcellClose = document.createElement('div');
            _funcellClose.id = '_funcellClose' + baseRandom;
            _funcellClose.style.width = '70px';
            _funcellClose.style.height = '30px';
            _funcellClose.style.lineHeight = '30px';
            _funcellClose.style.textAlign = 'center';
            _funcellClose.style.fontSize = '12px';
            _funcellClose.style.color = '#fff';
            _funcellClose.style.backgroundColor = 'rgba(0,0,0,0.4)';
            // _funcellClose.style.position = 'absolute';
            _funcellClose.style.position = 'fixed';
            _funcellClose.style.borderRadius = '2px';
            _funcellClose.style.right = '20px';
            _funcellClose.style.bottom = '40px';
            _funcellClose.onclick = function() {
                closeCallback(transId, retFunc);
            }
            _funcellClose.style.fontFamily = 'Microsoft YaHei';
            _funcellClose.appendChild(document.createTextNode(tmcloseTxt));
            _E("_funcellPop" + baseRandom).appendChild(_funcellClose);
        }

        function  _createFuncellCloseById(id_Index,retFunc,closeTxt) {
            var tmcloseTxt;
            if(closeTxt== undefined){
                tmcloseTxt="返回游戏"
            }else{
                tmcloseTxt = closeTxt;
            }
            var _funcellClose = document.createElement('div');
            _funcellClose.id = '_funcellClose' + id_Index;
            _funcellClose.style.width = '70px';
            _funcellClose.style.height = '30px';
            _funcellClose.style.lineHeight = '30px';
            _funcellClose.style.textAlign = 'center';
            _funcellClose.style.fontSize = '12px';
            _funcellClose.style.color = '#fff';
            _funcellClose.style.backgroundColor = 'rgba(0,0,0,0.4)';
            // _funcellClose.style.position = 'absolute';
            _funcellClose.style.position = 'fixed';
            _funcellClose.style.borderRadius = '2px';
            _funcellClose.style.right = '20px';
            _funcellClose.style.bottom = '40px';
            _funcellClose.onclick = function() {
                closeCallbackById(id_Index, retFunc);
            }
            _funcellClose.style.fontFamily = 'Microsoft YaHei';
            _funcellClose.appendChild(document.createTextNode(tmcloseTxt));
            _E("_funcellPop" + id_Index).appendChild(_funcellClose);
        }
        
        function closeCallbackById(id_Index,retFunc) {
            try {
                _funcell_mask({
                    tip : 'loading'
                });
                _removeElement(_E("_funcellCover" + baseRandom));
                _removeElement(_E("_funcellPop" + id_Index));
                if (retFunc != undefined && retFunc != '') {
                    /**
                     * 处理回调
                     */

                }
                _funcell_unmask({});
            } catch (e) {
                _removeElement(_E("_funcellCover" + baseRandom));
                _removeElement(_E("_funcellPop" + id_Index));
                _funcell_unmask({});
            }
        }
        
        function closeCallback(transId, retFunc) {
            try {
                _funcell_mask({
                    tip : 'loading'
                });
                _removeElement(_E("_funcellCover" + baseRandom));
                _removeElement(_E("_funcellPop" + baseRandom));
                if (retFunc != undefined && retFunc != '') {
                    /**
                     * 处理回调
                     */

                }
                _funcell_unmask({});
            } catch (e) {
                _removeElement(_E("_funcellCover" + baseRandom));
                _removeElement(_E("_funcellPop" + baseRandom));
                _funcell_unmask({});
            }
        }

        function closePayCallback(data, retFunc) {
            try {
                _funcell_mask({
                    tip : 'loading'
                });
                _removeElement(_E("_funcellCover" + baseRandom));
                _removeElement(_E("_funcellPop" + baseRandom));
                if (retFunc != undefined && retFunc != '') {
                    /**
                     * 处理回调
                     */
                    retFunc(JSON.stringify(data));
                }
                _funcell_unmask({});
            } catch (e) {
                _removeElement(_E("_funcellCover" + baseRandom));
                _removeElement(_E("_funcellPop" + baseRandom));
                _funcell_unmask({});
            }
        }

        function setBaseZIndex(index) {
            baseZIndex = index;
        }

        function _getBaseZIndex() {
            return baseZIndex;
        }

         function _getBaseRandom(){
            return baseRandom;
        }

        function _createFuncellPop(id_Index,z_Index) {
            var _funcellPop = document.createElement('div');
            if(id_Index != undefined && id_Index != ""){
                _funcellPop.id = '_funcellPop' + id_Index;
            }else{
                _funcellPop.id = '_funcellPop' + baseRandom;
            }
            _funcellPop.style.width = '100%';
            _funcellPop.style.height = '100%';
            _funcellPop.style.position = 'fixed';
            if(z_Index != undefined && z_Index != ""){
                _funcellPop.style.zIndex = z_Index + 9999;
            }else{
                _funcellPop.style.zIndex = baseZIndex + 9999;
            }
            _funcellPop.style.overflow = 'hidden';
            _funcellPop.style.left = '0';
            _funcellPop.style.top = '0';
            try {
                _funcellPop.style["-webkit-overflow-scrolling"] = "touch";
                _funcellPop.style["overflow-y"] = "scroll";
            } catch (e) {
            }
            document.getElementsByTagName('body').item(0).appendChild(_funcellPop);
        }

        function _createFuncellCover() {
            var _funcellCover = document.createElement('div');
            // _funcellCover.style.display = 'none';
            _funcellCover.id = '_funcellCover' + baseRandom;
            _funcellCover.style.position = 'fixed';
            _funcellCover.style.top = 0;
            _funcellCover.style.left = 0;
            _funcellCover.style.width = '100%';
            _funcellCover.style.height = '100%';
            _funcellCover.style.backgroundColor = '#ffffff';
            _funcellCover.style.zIndex = baseZIndex + 8888;
            var first = document.body.firstChild;
            document.body.insertBefore(_funcellCover, first);
        }

        function _createFuncellIframe(ifrmSrc,id_Index) {
            var oScript = document.createElement("iframe");
            oScript.id = '_funcellFrame' + baseRandom;
            oScript.style.zIndex = "9999";
            oScript.style.backgroundColor = '#fff';
            oScript.frameBorder = '0';
            oScript.width = "100%";
            oScript.height = '100%';
            oScript.src = ifrmSrc;
            if(id_Index != undefined && id_Index != ""){
                _E("_funcellPop" + id_Index).appendChild(oScript);
            }else {
                _E("_funcellPop" + baseRandom).appendChild(oScript);
            }
            $('#_funcellFrame' + baseRandom).load(function () {
                window._FuncellMessenger.addTarget(_E("_funcellFrame" + baseRandom).contentWindow,'H5sdk_iframe');
                if(window.FuncellSpinner != undefined){
                    window.FuncellSpinner.spin();
                }
            });
        }
        
        function _createFuncellLoading(id_Index) {
            var _funcellLoading = document.createElement('div');
            _funcellLoading.id = '_funcellLoading' + baseRandom;
            // _funcellLoading.style.width = '220px';
            // _funcellLoading.style.height = '220px';
            _funcellLoading.style.textAlign = 'center';
            // _funcellLoading.style.color = '#fff';
            // _funcellLoading.style.backgroundColor = 'rgba(0,0,0,0.4)';
            _funcellLoading.style.position = 'absolute';
            _funcellLoading.style.left = '48%';
            _funcellLoading.style.top = '48%';
            if(id_Index != undefined && id_Index != ""){
                _E("_funcellPop" + id_Index).appendChild(_funcellLoading);
            }else {
                _E("_funcellPop" + baseRandom).appendChild(_funcellLoading);
            }
            require(['spin'],function(Spinner) {
                var el = $("#_funcellLoading"+baseRandom).get(0);
                window.FuncellSpinner = new Spinner();
                window.FuncellSpinner.spin(el);

                /**
                 * 超时强制关闭菊花
                 */
                setTimeout(function () {
                    if(window.FuncellSpinner != null){
                        window.FuncellSpinner.spin();
                    }
                },5000);
            });
        }
        
        function _E(id) {
            return document.getElementById(id);
        }

        function _removeElement(_element) {
            if (_element == null || _element == undefined
                || _element == "undefined")
                return;
            var _parentElement = _element.parentNode;
            if (_parentElement) {
                _parentElement.removeChild(_element);
            }
        }

        return{
            getBaseRandom:function () {
                return _getBaseRandom();
            },
            createFuncellPop : function (id_Index,z_Index) {
                _createFuncellPop(id_Index,z_Index);
            },
            createFuncellCover : function () {
              _createFuncellCover();
            },
            createFuncellIframe : function (ifrmSrc,id_Index) {
                _createFuncellIframe(ifrmSrc,id_Index);
            },
            E:function (id) {
                return _E(id);
            },
            removeElement :function (_element) {
                _removeElement(_element);
            },
            funcell_mask:function (options) {
                _funcell_mask(options);
            },
            funcell_unmask:function (options) {
                _funcell_unmask(options);
            },
            createFuncellClose:function (transId, retFunc,closeTxt) {
                _createFuncellClose(transId, retFunc,closeTxt);
            },
            createFuncellCloseById:function (id_Index,retFunc,closeTxt) {
                _createFuncellCloseById(id_Index,retFunc,closeTxt);
            },
            payCallBack:function (data, retFunc) {
                closePayCallback(data, retFunc);
            },
            createFuncellLoading : function (id_Index) {
                _createFuncellLoading(id_Index);
            },
            getBaseZIndex:function () {
                return _getBaseZIndex();
            }
        }
    };
    /*************************/
    function StringBuffer() {
        this.__strings__ = new Array();
    }
    StringBuffer.prototype.append = function (str) {
        this.__strings__.push(str);
        return this;    //方便链式操作
    }
    StringBuffer.prototype.toString = function () {
        return this.__strings__.join("");
    }
    /*************************/
    var FuncellSDK = function () {
        var appid="",appkey="",mInitParameter;

        function _init(initParameter,callback) {
            mInitParameter = initParameter;
            callback = typeof callback === "function" ? callback : function(){};
            var initJson = JSON.parse(initParameter);
            var msg = {};
            if(initJson.hasOwnProperty('appid') && initJson.hasOwnProperty('appkey')){
                appid = initJson.appid;
                appkey = initJson.appkey;
                msg = {
                    status : "success",
                    msg:"init success"
                };
            }else{
                msg = {
                    status : "fail",
                    msg:"init fail,please check appid or appkey"
                };
            }
            callback(JSON.stringify(msg));
        }

        function getHWExtData() {
            var extData = {
                platform:'H5'
            };
            var json = JSON.stringify(extData);
            return FuncellBase64.encode(json);
        }

        function getHWLoginSign(cpId,pwd,hw_platform,userAccount,appkey) {
            var sign = new StringBuffer();
            sign.append("cp_id=").append(cpId).append("&");
            sign.append("ext_data=").append(getHWExtData()).append("&");
            sign.append("grant_type=login&");
            sign.append("password=").append(pwd).append("&");
            sign.append("platform=").append(hw_platform).append("&");
            sign.append("username=").append(userAccount);
            sign.append("#").append(appkey);
            var str = sign.toString();
            var md5 = new FuncellMd5();
            return md5.hex_md5(str);
        }

        function getHWLoginSignByToken(cpId,refresh_token,hw_platform,username,appkey) {
            var sign = new StringBuffer();
            sign.append("cp_id=").append(cpId).append("&");
            sign.append("ext_data=").append(getHWExtData()).append("&");
            sign.append("grant_type=quick&");
            sign.append("platform=").append(hw_platform).append("&");
            sign.append("refresh_token=").append(refresh_token).append("&");
            sign.append("username=").append(username);
            sign.append("#").append(appkey);
            var str = sign.toString();
            var md5 = new FuncellMd5();
            return md5.hex_md5(str);
        }

        function getHWRegisterSign(cpId,rePwd,pwd,hw_platform,userAccount,appkey) {
            var sign = new StringBuffer();
            sign.append("confirm_password=").append(rePwd).append("&");
            sign.append("cp_id=").append(cpId).append("&");
            sign.append("ext_data=").append(getHWExtData()).append("&");
            sign.append("grant_type=register&");
            sign.append("password=").append(pwd).append("&");
            sign.append("platform=").append(hw_platform).append("&");
            sign.append("username=").append(userAccount);
            sign.append("#").append(appkey);
            var str = sign.toString();
            var md5 = new FuncellMd5();
            return md5.hex_md5(str);
        }

        function _login(callback,isAutoLogin) {
            callback = typeof callback === "function" ? callback : function(){};
            if(isAutoLogin != undefined && isAutoLogin == true){
                var json = JSON.parse(localStorage.getItem("funcell_config_"+appid));
                var cpid = appid;
                var refresh_token = json.data.refresh_token;
                var username = json.data.username;
                var sign = getHWLoginSignByToken(cpid,refresh_token,'H5',username,appkey);
                var ext_data=getHWExtData();
                FuncellAjax({
                    method : 'post',
                    url : 'http://auth-beta-553.funcell123.com/authorize',
                    data : {
                        'cp_id' : cpid,
                        'grant_type' : 'quick',
                        'refresh_token':refresh_token,
                        'username':username,
                        'platform':'H5',
                        'sign':sign,
                        'ext_data':ext_data,
                    },
                    timeout : 5000,
                    success : function (response) {
                        // window._FuncellUtil.removeElement(window._FuncellUtil.E("_funcellPop" + window._FuncellUtil.getBaseRandom()));
                        var json = JSON.parse(response);
                        var ret = {};
                        if(json.error_code == "P1111"){
                            ret.status = "success";
                            ret.token = json.data.access_token;
                            ret.fid = json.data.fid;
                            localStorage.setItem("funcell_config_"+appid,response);
                        }else{
                            ret.status = "error";
                            localStorage.clear();
                        }
                        ret.msg = json.message;
                        callback(JSON.stringify(ret));
                    },
                    error : function (status,statusText) {
                        // alert('获取数据错误！错误代号：' + status + '，错误信息：' + statusText);
                        var ret = {
                            status:status,
                            msg:statusText
                        };
                        callback(JSON.stringify(ret));
                    },
                    complete : function () {
                    },
                    async : true
                });
            }else{
                var userAccount = $('#qt_account').val();
                var pwd = FuncellBase64.encode($('#qt_password').val());
                var cpid = appid;
                var sign = getHWLoginSign(cpid,pwd,'H5',userAccount,appkey);
                var ext_data=getHWExtData();
                var isChecked = $('#qtis_autologin').is(':checked');
                console.log("isChecked:"+isChecked);
                FuncellAjax({
                    method : 'post',
                    url : 'http://auth-beta-553.funcell123.com/authorize',
                    data : {
                        'cp_id' : cpid,
                        'grant_type' : 'login',
                        'password':pwd,
                        'username':userAccount,
                        'platform':'H5',
                        'sign':sign,
                        'ext_data':ext_data,
                    },
                    timeout : 5000,
                    success : function (response) {
                        // console.log(response);
                        window._FuncellUtil.removeElement(window._FuncellUtil.E("_funcellPop" + window._FuncellUtil.getBaseRandom()));
                        var json = JSON.parse(response);
                        var ret = {};
                        if(json.error_code == "P1111"){
                            ret.status = "success";
                            ret.token = json.data.access_token;
                            ret.fid = json.data.fid;
                            if(isChecked == true){
                                localStorage.setItem("funcell_config_"+appid,response);
                            }
                        }else{
                            ret.status = "error";
                        }
                        ret.msg = json.message;
                        callback(JSON.stringify(ret));
                    },
                    error : function (status,statusText) {
                        // alert('获取数据错误！错误代号：' + status + '，错误信息：' + statusText);
                        var ret = {
                            status:status,
                            msg:statusText
                        };
                        callback(JSON.stringify(ret));
                    },
                    complete : function () {
                        $('#qt_btn').val("立即登录");
                    },
                    async : true
                });
            }
        }

        function _register(callback) {
            callback = typeof callback === "function" ? callback : function(){};
            var userAccount = $('#qt_phone').val();
            var pwd = FuncellBase64.encode($('#qt_mobile_password').val());
            var pwd_confirm = FuncellBase64.encode($('#qt_mobile_password_confirm').val());
            var cpid = appid;
            var sign = getHWRegisterSign(cpid,pwd_confirm,pwd,'H5',userAccount,appkey);
            var ext_data=getHWExtData();
            if(pwd === pwd_confirm){
                FuncellAjax({
                    method : 'post',
                    url : 'http://auth-beta-553.funcell123.com/authorize',
                    data : {
                        'cp_id' : cpid,
                        'grant_type' : 'register',
                        'password':pwd,
                        'confirm_password':pwd_confirm,
                        'username':userAccount,
                        'platform':'H5',
                        'sign':sign,
                        'ext_data':ext_data,
                    },
                    timeout : 5000,
                    success : function (response) {
                        window._FuncellUtil.removeElement(window._FuncellUtil.E("_funcellPop" + window._FuncellUtil.getBaseRandom()));
                        callback(response);
                    },
                    error : function (status,statusText) {
                        // alert('获取数据错误！错误代号：' + status + '，错误信息：' + statusText);
                        var ret = {
                            status:status,
                            msg:statusText
                        };
                        callback(JSON.stringify(ret));
                    },
                    complete : function () {
                        $('#qt_mobile_reg').val("快速登录");
                    },
                    async : true
                });
            }else{
                $('#qt_mobile_reg').val("快速登录");
                alert("密码输入不一致,请重新输入");
            }
        }

        function getPayHWSign(hw_access_token,amount,cp_id,cp_orderid,create_time,ext_data,platform,price,product_id,product_name) {
            var mSign = new StringBuffer();
            mSign.append("access_token=").append(hw_access_token).append("&");
            mSign.append("amount=").append(amount).append("&");
            mSign.append("cp_id=").append(cp_id).append("&");
            mSign.append("cp_orderid=").append(cp_orderid).append("&");
            mSign.append("create_time=").append(create_time).append("&");
            mSign.append("ext_data=").append(FuncellBase64.encode(ext_data)).append("&");
            mSign.append("platform=").append(platform).append("&");
            mSign.append("price=").append(price).append("&");
            mSign.append("product_id=").append(product_id).append("&");
            mSign.append("product_name=").append(FuncellBase64.encode(product_name));
            mSign.append("#").append(appkey);
            var str = mSign.toString();
            var md5 = new FuncellMd5();
            return md5.hex_md5(str);
        }

        function _pay(payParameter) {
            var payJson = JSON.parse(payParameter);
            var cp_orderid = payJson.orderid;
            var price = payJson.price;
            var ext_data = payJson.ext_data;
            var amount = payJson.amount;
            var product_id = payJson.product_id;
            var product_name = payJson.product_name;
            var hw_access_token = payJson.token;
            var cp_id = appid;
            var platform = "H5";
            var create_time = payJson.create_time;

            var postData = new StringBuffer();
            postData.append("price=").append(price).append("&");
            postData.append("amount=").append(amount).append("&");
            postData.append("ext_data=").append(FuncellBase64.encode(ext_data)).append("&");
            postData.append("product_id=").append(product_id).append("&");
            postData.append("product_name=").append(FuncellBase64.encode(product_name)).append("&");
            postData.append("cp_orderid=").append(cp_orderid).append("&");
            postData.append("access_token=").append(hw_access_token).append("&");
            postData.append("cp_id=").append(cp_id).append("&");
            postData.append("platform=").append(platform).append("&");
            postData.append("create_time=").append(create_time).append("&");
            postData.append("sign=").append(getPayHWSign(hw_access_token,amount,cp_id,cp_orderid,create_time,ext_data,platform,price,product_id,product_name));
            return postData.toString();
        }
        
        function getFindPwdHWSign() {
            var mSign = new StringBuffer();
            mSign.append("cp_id=").append(appid);
            mSign.append("#").append(appkey);
            var str = mSign.toString();
            var md5 = new FuncellMd5();
            return md5.hex_md5(str);
        }
        
        function _findpwd() {
            var postData = new StringBuffer();
            postData.append("cp_id=").append(appid).append("&");
            postData.append("sign=").append(getFindPwdHWSign());
            return postData.toString();
        }

        function _terms_detail() {

        }
        function _getInitParameter() {
            return mInitParameter;
        }
        return {
            init : function (initParameter,callback) {
                _init(initParameter,callback);
            },
            login:function (callback,isAutoLogin) {
                _login(callback,isAutoLogin);
            },
            register:function (callback) {
                _register(callback);
            },
            pay:function (payParameter) {
                return _pay(payParameter);
            },
            findpwd:function () {
                return _findpwd();
            },
            terms_detail:function () {
                _terms_detail();
            },
            getInitParameter:function () {
                return _getInitParameter();
            }
        }
    }();

    var control = (function () {
        
        function login_html() {
            var loginHtml = ['<!DOCTYPE html>',
                '<html lang="en">',
                '<head>',
                '    <meta charset="UTF-8" />',
                '    <title>H5</title>',
                '    <meta name="viewport" content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">',
                '    <meta name="msapplication-tap-highlight" content="no">',
                '    <meta name="theme-color" content="#4e8ef7">',
                '    <!-- add to homescreen for ios -->',
                '    <meta name="apple-mobile-web-app-capable" content="yes">',
                '    <meta name="apple-mobile-web-app-status-bar-style" content="black">',
                '    <link rel="stylesheet" href="http://mainaland.h5-sdk.rejoy123.com/h5sdk/css/style.css">',
                '    <link rel="stylesheet" href="http://mainaland.h5-sdk.rejoy123.com/h5sdk/css/app.css">',
                '    <link rel="stylesheet" href="http://mainaland.h5-sdk.rejoy123.com/h5sdk/css/main.css">',
                '    <meta content="telephone=no,email=no" name="format-detection" />',
                '    <meta name="full-screen" content="yes">',
                '    <meta name="x5-fullscreen" content="true" />',
                '    <meta name="360-fullscreen" content="true" />',
                '    <meta name="apple-mobile-web-app-title" content="sdk.funcell123.com" />',
                '</head>',
                '<body>',
                '<div class="login_content" id="login_content" >',
                '</div>',
                '</body>',
                '</html>',
                '<!-- 登录模板 -->',
                '<script type="text/x-handlebars-template" id="login_template">',
                '    <div class="mask" id="login_mask">',
                '        <div class="main_box login_box" id="login_box">',
                '            <div id="head" class="box_header">',
                '                <h1>Funcell账号登录</h1>',
                '                <div class="close_button" id="login_exit_button"></div>',
                '            </div>',
                '            <section class="box_content">',
                '                <div class=\'box_content_item login_input_item login_header_input_item\'>',
                '                    <input type="text" name="account" placeholder="请输入帐号" class="item_input_text" id="qt_account">',
                '                    <span class="item_input_label">账号</span>',
                '                    <span class="input_clear_button" id="input_clear_username" style="display:none"></span>',
                '                </div>',
                '                <div class=\'box_content_item login_input_item\'>',
                '                    <input type="password" name="password" placeholder="请输入密码" class="item_input_text item_input_text_no_top" id="qt_password" maxlength="20">',
                '                    <span class="item_input_label">密码</span>',
                '                    <span class="input_clear_button" id="input_clear_password" style="display:none"></span>',
                '                </div>',
                '                <div class=\'box_content_item checkbox_item\' >',
                '                    <input type="checkbox" id="qtis_autologin" checked="checked" value="1">',
                '                    <label for="qtis_autologin">下次自动登录</label>',
                '                </div>',
                '                <div class=\'box_content_item buttons_item\'>',
                '                    <button class=\'item_button half_button green_button\' id="register_button">快速注册</button>',
                '                    <input type="submit" class="btn-big check-account item_button half_button red_button" value="立即登录" id="qt_btn">',
                '                </div>',
                '                <div class=\'box_content_item find_password_item\'>',
                '                    <a id="funcell_findpwd" class="lnk">找回密码</a>',
                '                </div>',
                '            </section>',
                '        </div>',
                '    </div>',
                '</script>',
                '<!-- 注册模板 -->',
                '<script type="text/x-handlebars-template" id="register_template">',
                '    <div class="mask" id="register_mask">',
                '        <div class="main_box login_box" id="register_box">',
                '            <div class="box_header">',
                '                <h1>注册Funcell账号</h1>',
                '                <div class="close_button" id="login_return_button"></div>',
                '            </div>',
                '            <div class="box_content">',
                '                <div class=\'box_content_item login_input_item login_header_input_item\'>',
                '                    <input type="text" name="account" placeholder="请输入帐号" class="item_input_text" id="qt_phone" maxlength="11">',
                '                    <span class="item_input_label">帐号</span>',
                '                    <span class="input_clear_button" id="input_clear_username" style="display:none"></span>',
                '                </div>',
                '                <div class=\'box_content_item login_input_item\'>',
                '                    <input type="password" name="password" placeholder="请输入密码" class="item_input_text item_input_text_no_top" id="qt_mobile_password" maxLength="21">',
                '                    <span class="item_input_label">密码</span>',
                '                    <span class="input_clear_button" id="input_clear_password" style="display:none"></span>',
                '                </div>',
                '                <div class=\'box_content_item login_input_item\'>',
                '                    <input type="password" name="password_confirm" placeholder="请确认密码" class="item_input_text item_input_text_no_top" id="qt_mobile_password_confirm" maxLength="21">',
                '                    <span class="item_input_label">确认</span>',
                '                    <span class="input_clear_button" id="input_clear_password_confirm" style="display:none"></span>',
                '                </div>',
                '                <div class="box_content_item checkbox_item">',
                '					<span class="confirm_clause_item">',
                '						<input type="checkbox" id="qt_mobile_agree" checked="checked" value="1">阅读并同意<a id="funcell_termsDetail" class="lnk">产品许可协议</a>',
                '					</span>',
                '                </div>',
                '                <div class="box_content_item buttons_item bottom_buttons_item">',
                '                    <input type="submit" class="item_button full_button red_button" value="快速登录" id="qt_mobile_reg">',
                '                </div>',
                '            </div>',
                '        </div>',
                '    </div>',
                '</script>'].join("");
            return loginHtml;
        };

        function initLogin(callback,exit) {

            callback = typeof callback === "function" ? callback : function(){};
            exit = typeof exit === "function" ? exit : function(){};
            hide();

            $('#_funcellPop'+ window._FuncellUtil.getBaseRandom()).html(login_html());
            var template = Handlebars.compile($('#login_template').html());
            var compiledDOM = template();
            $('#login_content').html(compiledDOM);
            //关闭按钮
            $('#login_exit_button').on('click', function(){
                hide();
                exit();
            });
            //快速注册按钮
            $('#register_button').on('click', function(){
                hide();
                initRegister(callback);
            });
            //当用户名框不为空时，显示清空按钮
            //浏览器滚动到用户名处
            $('#qt_account').focus(function(){
                scrollTo(0, $('#qt_account').offset().top + 10);
                loginUsernameInterval = setInterval(function(){
                    if($('#qt_account').val() !== ""){
                        $('#input_clear_username').show();
                    }
                    else{
                        $('#input_clear_username').hide();
                    }
                }, 1/60);

            });
            $('#qt_account').blur(function(){
                clearInterval(loginUsernameInterval);
            });
            //一键清空用户名
            $('#input_clear_username').on('click', function(){
                $('#qt_account').val("");
                $('#qt_account')[0].focus();
            });
            //当密码框不为空时，显示清空按钮
            $('#qt_password').focus(function(){
                scrollTo(0, $('#qt_password').offset().top + 10);
                loginPasswordInterval = setInterval(function(){
                    if($('#qt_password').val() !== ""){
                        $('#input_clear_password').show();
                    }
                    else{
                        $('#input_clear_password').hide();
                    }
                }, 1/60);

            });
            $('#qt_password').blur(function(){
                clearInterval(loginPasswordInterval);
            });
            //一键清空密码
            $('#input_clear_password').on('click', function(){
                $('#qt_password').val("");
                $('#qt_password')[0].focus();
            });

            // initLogin(callback);
            $("#qt_btn").on('click', function(){
                if($('#qt_account').val() ==  "" || $('#qt_password').val() == ""){
                    alert("帐号或密码不能为空...");
                }else{
                    $(this).val('提交中...');
                    FuncellSDK.login(callback,false);
                }
            });
            $("#funcell_findpwd").on('click', function(){
                funcell_findpwd();
            });
            $('#login_content').show();
        }

        function initRegister(callback){
            hide();
            var template = Handlebars.compile($('#register_template').html());
            var compiledDOM = template();
            $('#login_content').html(compiledDOM);
            //返回按钮，退出注册，返回登录
            $('#login_return_button').on('click', function(){
                hide();
                //提示取消注册
                $("#qt_mobile_reg").removeClass("clicked").val("快速登录");
                initLogin(callback,function () {
                    // console.log('_funcellPop remove');
                    removeFuncellPop();
                });
                // control._initLoginAndRegister(callback);
            });
            //当用户名框不为空时，显示清空按钮
            $('#qt_phone').focus(function(){
                scrollTo(0, $('#qt_phone').offset().top + 10);
                registerUsernameInterval = setInterval(function(){
                    if($('#qt_phone').val() !== ""){
                        $('#input_clear_username').show();
                    }
                    else{
                        $('#input_clear_username').hide();
                    }
                }, 1/60);

            });
            $('#qt_phone').blur(function(){
                clearInterval(registerUsernameInterval);
            });
            //一键清空用户名
            $('#input_clear_username').on('click', function(){
                $('#qt_phone').val("");
                $('#input_clear_username').hide();
            });

            //当密码框不为空时，显示清空按钮
            $('#qt_mobile_password').focus(function(){
                scrollTo(0, $('#qt_mobile_password').offset().top + 10);
                registerPasswordInterval = setInterval(function(){
                    if($('#qt_mobile_password').val() !== ""){
                        $('#input_clear_password').show();
                    }
                    else{
                        $('#input_clear_password').hide();
                    }
                    //当密码长度大于20时，提示
                    if($('#qt_mobile_password').val().length > 20){
                        $('#qt_mobile_password').val($('#qt_mobile_password').val().substring(0, 20));

                        $("#qt_mobile_reg").removeClass("clicked").val("快速登录");
                    }
                }, 1/60);
            });
            $('#qt_mobile_password').blur(function(){
                clearInterval(registerPasswordInterval);
            });
            //一键清空密码
            $('#input_clear_password').on('click', function(){
                $('#qt_mobile_password').val("");
                $('#input_clear_password').hide();
            });

            //当确认密码不为空是，显示清空按钮
            $('#qt_mobile_password_confirm').focus(function(){
                scrollTo(0, $('#qt_mobile_password_confirm').offset().top + 10);
                registerPasswordInterval = setInterval(function(){
                    if($('#qt_mobile_password_confirm').val() !== ""){
                        $('#input_clear_password_confirm').show();
                    }
                    else{
                        $('#input_clear_password_confirm').hide();
                    }
                    //当密码长度大于20时，提示
                    if($('#qt_mobile_password_confirm').val().length > 20){
                        $('#qt_mobile_password_confirm').val($('#qt_mobile_password_confirm').val().substring(0, 20));

                        $("#qt_mobile_reg").removeClass("clicked").val("快速登录");
                    }
                }, 1/60);
            });
            $('#qt_mobile_password_confirm').blur(function(){
                clearInterval(registerPasswordInterval);
            });
            //一键清空确认密码
            $('#input_clear_password_confirm').on('click', function(){
                $('#qt_mobile_password_confirm').val("");
                $('#input_clear_password_confirm').hide();
            });

            // initRegister(callback);
            $("#qt_mobile_reg").on('click', function(){
                if($('#qt_phone').val() ==  "" || $('#qt_mobile_password').val() == "" || $('#qt_mobile_password_confirm').val() == ""){
                    alert("帐号或密码不能为空...");
                }else{
                    $(this).val('提交中...');
                    FuncellSDK.register(callback);
                }
            });

            $("#funcell_termsDetail").on('click', function(){
                funcell_termsdetail();
            });

            $('#login_content').show();
        };

        function hide(){
            $('#login_content').hide();
        };

        function createFuncellPop(id_Index,z_Index) {
            var createSingleFuncellUtil = getSingle(FuncellUtil);
            // window._FuncellUtil = new FuncellUtil();
            window._FuncellUtil = createSingleFuncellUtil();
            window._FuncellUtil.createFuncellPop(id_Index,z_Index);
        }
        
        function removeFuncellPop(id_Index) {
            if(id_Index != undefined && id_Index != ""){
                window._FuncellUtil.removeElement(window._FuncellUtil.E("_funcellPop" + id_Index));
            }
            else{
                window._FuncellUtil.removeElement(window._FuncellUtil.E("_funcellPop" + window._FuncellUtil.getBaseRandom()));
            }
        }

        function createFuncellCover() {
            var createSingleFuncellUtil = getSingle(FuncellUtil);
            window._FuncellUtil = createSingleFuncellUtil();
            window._FuncellUtil.createFuncellCover();
        }

        function createFuncellIframe(ifrmSrc,id_Index) {
            var createSingleFuncellUtil = getSingle(FuncellUtil);
            window._FuncellUtil = createSingleFuncellUtil();
            window._FuncellUtil.createFuncellIframe(ifrmSrc,id_Index);
        }

        function createFuncellClose(transId, retFunc,closeTxt) {
            var createSingleFuncellUtil = getSingle(FuncellUtil);
            window._FuncellUtil = createSingleFuncellUtil();
            window._FuncellUtil.createFuncellClose(transId, retFunc,closeTxt);
        }

        function createFuncellCloseById(id_Index,retFunc,closeTxt) {
            var createSingleFuncellUtil = getSingle(FuncellUtil);
            window._FuncellUtil = createSingleFuncellUtil();
            window._FuncellUtil.createFuncellCloseById(id_Index, retFunc,closeTxt);
        }

        function funcell_mask(options) {
            var createSingleFuncellUtil = getSingle(FuncellUtil);
            window._FuncellUtil = createSingleFuncellUtil();
            window._FuncellUtil.funcell_mask(options);
        }
        
        function funcell_unmask(options) {
            var createSingleFuncellUtil = getSingle(FuncellUtil);
            window._FuncellUtil = createSingleFuncellUtil();
            window._FuncellUtil.funcell_unmask(options);
        }

        function createFuncellLoading(id_Index) {
            var createSingleFuncellUtil = getSingle(FuncellUtil);
            window._FuncellUtil = createSingleFuncellUtil();
            window._FuncellUtil.createFuncellLoading(id_Index);
        }
        
        function funcell_termsdetail() {
            console.log("funcell_termsdetail");
            try {
                funcell_mask({
                    tip : 'loading'
                });
                createFuncellCover();
                createFuncellPop(window._FuncellUtil.getBaseRandom() + 1,window._FuncellUtil.getBaseZIndex() + 1);
                createFuncellLoading(window._FuncellUtil.getBaseRandom() + 1);
                var initParameter = FuncellSDK.getInitParameter();
                var initJson = JSON.parse(initParameter);
                var ifrmSrc = "http://sdk-beta-553.funcell123.com/terms/index/page/privacy_"+initJson.appid;
                createFuncellIframe(ifrmSrc,window._FuncellUtil.getBaseRandom() + 1);
                createFuncellCloseById(window._FuncellUtil.getBaseRandom() + 1);
                funcell_unmask({});
            } catch (e) {
                funcell_unmask({});
            }
        }
        
        function funcell_findpwd() {
            try {
                funcell_mask({
                    tip : 'loading'
                });
                createFuncellCover();
                createFuncellPop(window._FuncellUtil.getBaseRandom() + 1,window._FuncellUtil.getBaseZIndex() + 1);
                createFuncellLoading(window._FuncellUtil.getBaseRandom() + 1);
                var postData = FuncellSDK.findpwd();
                var ifrmSrc = "http://sdk-beta-553.funcell123.com/member/forgetpassword?"+postData;
                createFuncellIframe(ifrmSrc,window._FuncellUtil.getBaseRandom() + 1);
                createFuncellCloseById(window._FuncellUtil.getBaseRandom() + 1);
                funcell_unmask({});
            } catch (e) {
                funcell_unmask({});
            }
        }
        
        return{
            _init:function (initParameter,callback) {
                FuncellSDK.init(initParameter,callback);
                /**
                 * 初始化信使
                 */
                var createSingleFuncellUtil = getSingle(FuncellUtil);
                window._FuncellUtil = createSingleFuncellUtil();
                window._FuncellMessenger = new Messenger('FuncellH5Sdk', 'FuncellH5');
                window._FuncellMessenger.listen(function (msg) {
                    console.log("msg:"+msg);
                    var retJson = JSON.parse(msg);
                    var type = retJson.type;
                    switch(type) {
                        case "pay":
                            var ret = {};
                            switch(retJson.status){
                                case "success":
                                    ret.status = "success";
                                    break;
                                case "fail":
                                    ret.status = "fail";
                                    break;
                                default:
                                    ret.status = "unknow";
                                    break;
                            };
                            var payJson = JSON.parse(window.global_FuncellPayParameter);
                            ret.orderid = payJson.orderid;
                            window._FuncellUtil.payCallBack(ret,window.global_FuncellPayCallBack);
                            break;
                        default:
                            window._FuncellUtil.closeCallbackById(window._FuncellUtil.getBaseRandom() + 1);
                            break;
                    };
                });
                // window._FuncellMessenger.addTarget(window._FuncellUtil.E("_funcellFrame" + window._FuncellUtil.getBaseRandom()).contentWindow,'H5sdk_iframe');

            },
            _initLoginAndRegister:function (callback) {
                /**
                 * 判断是否使用token登陆
                 */
                var initParameter = FuncellSDK.getInitParameter();
                var initJson = JSON.parse(initParameter);
                if(localStorage.getItem("funcell_config_"+initJson.appid) != undefined && localStorage.getItem("funcell_config_"+initJson.appid) != ""){
                    FuncellSDK.login(callback,true);
                }else{
                    createFuncellPop();
                    initLogin(callback,function () {
                        removeFuncellPop();
                    });
                }
            },
            _pay:function (payParameter,callback) {
                window.global_FuncellPayParameter = payParameter;
                window.global_FuncellPayCallBack = callback;
                try {
                    funcell_mask({
                        tip : 'loading'
                    });
                    var payJson = JSON.parse(payParameter);
                    if(payJson.hasOwnProperty('orderid') && payJson.orderid != ''){
                        createFuncellCover();
                        createFuncellPop();
                        createFuncellLoading();
                        var postData = FuncellSDK.pay(payParameter);
                        var ifrmSrc = "http://sdk-beta-553.funcell123.com/charge?"+postData;
                        createFuncellIframe(ifrmSrc);
                        createFuncellClose(payJson.orderid,callback,payJson.closeTxt);
                    }
                    funcell_unmask({});
                } catch (e) {
                    funcell_unmask({});
                }
            },
            _logout:function (logoutCallback) {
                localStorage.clear();
                var ret={
                    status : "success"
                };
                logoutCallback(JSON.stringify(ret));
            },

        }
    })();

    /**
     * 对外接口
     */
    return {
        init:function (initParameter,initCallback) {
            control._init(initParameter,initCallback);
        },
        login:function (sessionCallback) {
            control._initLoginAndRegister(sessionCallback);
        },
        pay:function (payParameter,payCallback) {
            control._pay(payParameter,payCallback);
        },
        logout:function (logoutCallback) {
            control._logout(logoutCallback);
        },
        isFunctionSupported:function (functionName) {
            return "function" === typeof this[functionName] ? true : false;
        },
        callFunction:function (functionName) {
            return "function" === typeof this[functionName] ? this[functionName].apply(this, Array.prototype.splice.call(arguments, 1)) : console.log("function is not define");
        },
        loadScriptAsyn:function (src,fn,obj) {
            var queryScript = document.getElementsByTagName('script');
            var appendflag = true;
            for(var i = 0;i<queryScript.length;i++){
                if(queryScript[i].src == src){
                    console.log("find src:"+src +" in scripts,not append");
                    appendflag = false;
                }
            }
            if(appendflag){
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.onload = function() {
                    obj ? fn.call(obj, "success", "loadScript:" + src + "(success)") : fn("success", "loadScript:" + src + "(success)");
                };
                script.charset = "utf-8";
                script.src = src;
                document.body.appendChild(script);
            }
        }
    }
});

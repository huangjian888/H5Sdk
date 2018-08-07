(function(root, factory) {
    if(typeof exports === 'object') {
        module.exports = factory();
    } else if(typeof define === 'function' && define.amd) {
        define([], factory);
        define(['module/qwrap-core/1.1.5/qwrap.core', 'module/xpc/0.3/xpc', 'module/when/2.7.0/when'], factory);
    } else {
        /* 没有加载器时，导出到 root（浏览器中，root 即 window） 下 */
        root['store'] = factory();
    }
})(this, function() {
    var JSON = {};
    JSON.parse = $.StringH.evalExp; 
    JSON.stringify = $.ObjectH.stringify;
    
    var win = window;
    var store = {},
        doc = win.document,
        localStorageName = 'localStorage',
        scriptTag = 'script',
        storage

    store.disabled = false
    store.set = function(key, value) {}
    store.get = function(key) {}
    store.remove = function(key) {}
    store.clear = function() {}
    store.transact = function(key, defaultVal, transactionFn) {
        var val = store.get(key)
        if (transactionFn == null) {
            transactionFn = defaultVal
            defaultVal = null
        }
        if (typeof val == 'undefined') { val = defaultVal || {} }
        transactionFn(val)
        store.set(key, val)
    }
    store.getAll = function() {}
    store.forEach = function() {}

    store.serialize = function(value) {
        return JSON.stringify(value)
    }
    store.deserialize = function(value) {
        if (typeof value != 'string') { return undefined }
        try {return JSON.parse(value) }
        catch(e) {return value || undefined }
    }

    // Functions to encapsulate questionable FireFox 3.6.13 behavior
    // when about.config::dom.storage.enabled === false
    // See https://github.com/marcuswestin/store.js/issues#issue/13
    function isLocalStorageNameSupported() {
        try { return (localStorageName in win && win[localStorageName]) }
        catch(err) { return false }
    }

    if (isLocalStorageNameSupported()) {
        storage = win[localStorageName]
        store.set = function(key, val) {
            if (val === undefined) { return store.remove(key) }
            storage.setItem(key, store.serialize(val))
            return val
        }
        store.get = function(key) { return store.deserialize(storage.getItem(key)) }
        store.remove = function(key) { storage.removeItem(key) }
        store.clear = function() { storage.clear() }
        store.getAll = function() {
            var ret = {}
            store.forEach(function(key, val) {
                ret[key] = val
            })
            return ret
        }
        store.forEach = function(callback) {
            for (var i=0; i<storage.length; i++) {
                var key = storage.key(i)
                callback(key, store.get(key))
            }
        }
    } else if (doc.documentElement.addBehavior) {
        var storageOwner,
            storageContainer
        // Since #userData storage applies only to specific paths, we need to
        // somehow link our data to a specific path.  We choose /favicon.ico
        // as a pretty safe option, since all browsers already make a request to
        // this URL anyway and being a 404 will not hurt us here.  We wrap an
        // iframe pointing to the favicon in an ActiveXObject(htmlfile) object
        // (see: http://msdn.microsoft.com/en-us/library/aa752574(v=VS.85).aspx)
        // since the iframe access rules appear to allow direct access and
        // manipulation of the document element, even for a 404 page.  This
        // document can be used instead of the current document (which would
        // have been limited to the current path) to perform #userData storage.
        try {
            storageContainer = new ActiveXObject('htmlfile')
            storageContainer.open()
            storageContainer.write('<'+scriptTag+'>document.w=window</'+scriptTag+'><iframe src="/favicon.ico"></iframe>')
            storageContainer.close()
            storageOwner = storageContainer.w.frames[0].document
            storage = storageOwner.createElement('div')
        } catch(e) {
            // somehow ActiveXObject instantiation failed (perhaps some special
            // security settings or otherwse), fall back to per-path storage
            storage = doc.createElement('div')
            storageOwner = doc.body
        }
        function withIEStorage(storeFunction) {
            return function() {
                var args = Array.prototype.slice.call(arguments, 0)
                args.unshift(storage)
                // See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
                // and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
                storageOwner.appendChild(storage)
                storage.addBehavior('#default#userData')
                storage.load(localStorageName)
                var result = storeFunction.apply(store, args)
                storageOwner.removeChild(storage)
                return result
            }
        }

        // In IE7, keys cannot start with a digit or contain certain chars.
        // See https://github.com/marcuswestin/store.js/issues/40
        // See https://github.com/marcuswestin/store.js/issues/83
        var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g")
        function ieKeyFix(key) {
            return key.replace(/^d/, '___$&').replace(forbiddenCharsRegex, '___')
        }
        store.set = withIEStorage(function(storage, key, val) {
            key = ieKeyFix(key)
            if (val === undefined) { return store.remove(key) }
            storage.setAttribute(key, store.serialize(val))
            storage.save(localStorageName)
            return val
        })
        store.get = withIEStorage(function(storage, key) {
            key = ieKeyFix(key)
            return store.deserialize(storage.getAttribute(key))
        })
        store.remove = withIEStorage(function(storage, key) {
            key = ieKeyFix(key)
            storage.removeAttribute(key)
            storage.save(localStorageName)
        })
        store.clear = withIEStorage(function(storage) {
            var attributes = storage.XMLDocument.documentElement.attributes
            storage.load(localStorageName)
            for (var i=0, attr; attr=attributes[i]; i++) {
                storage.removeAttribute(attr.name)
            }
            storage.save(localStorageName)
        })
        store.getAll = function(storage) {
            var ret = {}
            store.forEach(function(key, val) {
                ret[key] = val
            })
            return ret
        }
        store.forEach = withIEStorage(function(storage, callback) {
            var attributes = storage.XMLDocument.documentElement.attributes
            for (var i=0, attr; attr=attributes[i]; ++i) {
                callback(attr.name, store.deserialize(storage.getAttribute(attr.name)))
            }
        })
    }
    /**
    * 我是父页面，我让iframe里的子页面调用store方法
    * 一个异步调用，使用了when.js。
    */
    store.xpc = function(method, key, value) {  
        var deferred = when.defer();
        //界定method，只列出了常用的，可以添加store模块中提供的其他方法
        var methodList = ["set", "get", "remove", "clear"];
        if(methodList.indexOf(method)<0) return;    
        
        var xpc = new XPC();
        xpc.addTarget(['XPC_STORE']);               
        xpc.on('message', (function(method, deferred){
            return function(data) {
                var msg = store.deserialize(data.msg);
                switch(method) {
                    case "set": 
                        break;
                    case "get":
                        deferred.resolve(msg);
                        break;
                    case "remove":
                        break;
                    case "clear":
                        break;
                }
            }
        })(method, deferred));      
        xpc.targets['XPC_STORE'].send(store.serialize({"method": method, "key": key, "value": value})); 

        return deferred.promise;    
    }
    /**
    * 我是嵌套在iframe里面的页面， 处理父页面发来的请求
    * 一直监听就行了。
    */
    store.xpcIframe = function() {
        var xpc = new XPC('XPC_STORE');
        xpc.on('message', function(data) {
        try{            
                var msg = store.deserialize(data.msg),
                    method = msg.method,
                    key = msg.key,
                    value = msg.value;
                switch(method) {
                    case "get":
                        var result = store.get(key);            
                        xpc.send(result);
                        break;
                    case "set":
                        store.set(key, value);
                        break;
                    case "remove":
                        store.remove(key);
                        break;
                    case "clear":
                        store.clear();
                        break;
                    default: 
                        break;
                }
        } catch(e) {
            throw new Error("XPC Error." + e.message);
        }
        });
    }
    try {
        var testKey = '__storejs__'
        store.set(testKey, testKey)
        if (store.get(testKey) != testKey) { store.disabled = true }
        store.remove(testKey)
    } catch(e) {
        store.disabled = true
    }
    store.enabled = !store.disabled
    return store;
});
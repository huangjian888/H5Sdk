
/* Detect-zoom
 * -----------
 * Cross Browser Zoom and Pixel Ratio Detector
 * Version 1.0.0 | Feb 5 2013
 * dual-licensed under the WTFPL and MIT license
 * Maintained by https://github/tombigel
 * Original developer https://github.com/yonran
 */

//AMD and CommonJS initialization copied from https://github.com/zohararad/audio5js
(function(root, ns, factory) {
    "use strict";

    if (typeof(module) !== 'undefined' && module.exports) { // CommonJS
        module.exports = factory(ns, root);
    } else if (typeof(define) === 'function' && define.amd) { // AMD
        define('module/detectzoom/1.0.0/detectzoom', function() {
            return factory(ns, root);
        });
    } else {
        root[ns] = factory(ns, root);
    }

}(window, 'detectZoom', function () {

    /**
     * Use devicePixelRatio if supported by the browser
     * @return {Number}
     * @private
     */
    var devicePixelRatio = function() {
        return window.devicePixelRatio || 1;
    };

    var zoomText = function () {
        // 隐藏DIV的CSS
        var hideCSS = 'position:absolute;left:-2000px;height:1px;',
        // 以px为宽度单位的元素
        pxBlock = document.createElement('div'),
        // 以em为字宽度单位的元素
        emBlockWrapper = document.createElement('div'),
        emBlock = document.createElement('div'),
        // 固定和变化的div宽度
        pxBlockWidth,
        emBlockWidth,
        // 缩放
        z;

        pxBlock.style.cssText = 'width:16px;' + hideCSS;
        document.body.appendChild(pxBlock);

        emBlockWrapper.style.fontSize = 'medium';
        emBlock.style.cssText = 'width:1em;' + hideCSS;
        emBlockWrapper.appendChild(emBlock);
        document.body.appendChild(emBlockWrapper);

        pxBlockWidth = pxBlock.offsetWidth;
        emBlockWidth = emBlock.offsetWidth;
        z = emBlockWidth / pxBlockWidth;

        document.body.removeChild(pxBlock);
        document.body.removeChild(emBlockWrapper);

        return z;
    };

    /**
     * Fallback function to set default values
     * @return {Object}
     * @private
     */
    var fallback = function() {
        return {
            zoom: 1,
            devicePxPerCssPx: 1
        };
    };
    /**
     * IE 8+: no trick needed!
     * TODO: Test on IE10 and Windows 8 RT
     * @return {Object}
     * @private
     **/
    var ie8 = function() {
        var zoom = Math.round((screen.deviceXDPI / screen.logicalXDPI) * 100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    // the trick: body's offsetWidth was in CSS pixels, while
    // getBoundingClientRect() was in system pixels in IE7.
    // Thanks to http://help.dottoro.com/ljgshbne.php
    var ie7 = function () {
        var rect = document.body.getBoundingClientRect(),
        zoom = (rect.right - rect.left) / document.body.offsetWidth;
        zoom = Math.round(zoom * 100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * Mobile WebKit
     * the trick: window.innerWidth is in CSS pixels, while
     * screen.width and screen.height are in system pixels.
     * And there are no scrollbars to mess up the measurement.
     * @return {Object}
     * @private
     */
    var webkitMobile = function () {
        var deviceWidth = (Math.abs(window.orientation) === 90) ? screen.height : screen.width,
        zoom = deviceWidth / window.innerWidth;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * Desktop Webkit
     * the trick: an element's clientHeight is in CSS pixels, while you can
     * set its line-height in system pixels using font-size and
     * -webkit-text-size-adjust:none.
     * device-pixel-ratio: http://www.webkit.org/blog/55/high-dpi-web-sites/
     *
     * Previous trick (used before http://trac.webkit.org/changeset/100847):
     * documentElement.scrollWidth is in CSS pixels, while
     * document.width was in system pixels. Note that this is the
     * layout width of the document, which is slightly different from viewport
     * because document width does not include scrollbars and might be wider
     * due to big elements.
     * @return {Object}
     * @private
     */
    // webkit Bug: 在打开开发者工具并吸附在侧边会不准确
    var webkit = function () {
        var zoom = window.outerWidth / window.innerWidth;
        zoom = Math.round(zoom * 100) / 100;

        // 浏览器下的innerWidth包含了边框和侧边栏的宽度
        if (zoom !== 1.00) {
            if (zoom >= 0.95 && zoom <= 1.05) {
                zoom = 1.00;
            }
        }

        // Webkit 下最小化和标签脱离吸附情况
        if (window.outerWidth <= 160) {
            zoom = zoomCache.zoom || 1;
        }
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * no real trick; device-pixel-ratio is the ratio of device dpi / css dpi.
     * (Note that this is a different interpretation than Webkit's device
     * pixel ratio, which is the ratio device dpi / system dpi).
     *
     * Also, for Mozilla, there is no difference between the zoom factor and the device ratio.
     *
     * @return {Object}
     * @private
     */
    var firefox4 = function () {
        var zoom = mediaQueryBinarySearch('min--moz-device-pixel-ratio', '', 0, 10, 20, 0.0001);
        zoom = Math.round(zoom * 100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom
        };
    };

    /**
     * Firefox 18.x
     * Mozilla added support for devicePixelRatio to Firefox 18,
     * but it is affected by the zoom level, so, like in older
     * Firefox we can't tell if we are in zoom mode or in a device
     * with a different pixel ratio
     * @return {Object}
     * @private
     */
    var firefox18 = function () {
        return {
            zoom: firefox4().zoom,
            devicePxPerCssPx: devicePixelRatio()
        };
    };

    /**
     * works starting Opera 11.11
     * the trick: outerWidth is the viewport width including scrollbars in
     * system px, while innerWidth is the viewport width including scrollbars
     * in CSS px
     * @return {Object}
     * @private
     */
    var opera11 = function () {
        var zoom = window.outerWidth / window.innerWidth;
        zoom = Math.round(zoom * 100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * Use a binary search through media queries to find zoom level in Firefox
     * @param property
     * @param unit
     * @param a
     * @param b
     * @param maxIter
     * @param epsilon
     * @return {Number}
     */
    var mediaQueryBinarySearch = function (property, unit, a, b, maxIter, epsilon) {
        var matchMedia;
        var head, style, div;
        if (window.matchMedia) {
            matchMedia = window.matchMedia;
        } else {
            head = document.getElementsByTagName('head')[0];
            style = document.createElement('style');
            head.appendChild(style);

            div = document.createElement('div');
            div.className = 'mediaQueryBinarySearch';
            div.style.display = 'none';
            document.body.appendChild(div);

            matchMedia = function(query) {
                style.sheet.insertRule('@media ' + query + '{.mediaQueryBinarySearch ' + '{text-decoration: underline} }', 0);
                var matched = getComputedStyle(div, null).textDecoration == 'underline';
                style.sheet.deleteRule(0);
                return {
                    matches: matched
                };
            };
        };

        function binarySearch(a, b, maxIter) {
            var mid = (a + b) / 2;
            if (maxIter <= 0 || b - a < epsilon) {
                return mid;
            }
            var query = "(" + property + ":" + mid + unit + ")";
            if (matchMedia(query).matches) {
                return binarySearch(mid, b, maxIter - 1);
            } else {
                return binarySearch(a, mid, maxIter - 1);
            }
        }

        var ratio = binarySearch(a, b, maxIter);
        if (div) {
            head.removeChild(style);
            document.body.removeChild(div);
        }
        return ratio;
    };

    /**
     * Generate detection function
     * @private
     */
    var detectFunction = (function () {
        var func = fallback,
        ua = navigator.userAgent.toLowerCase();
        //IE8+
        if (!isNaN(screen.deviceXDPI) && !isNaN(screen.logicalXDPI)) {
            func = ie8;
        }
        // IE7
        else if (-1 !== ua.indexOf("msie 7.")) {
            func = ie7;
        }
        //Mobile Webkit
        else if ('ontouchstart' in window && typeof document.body.style.webkitTextSizeAdjust === 'string') {
            func = webkitMobile;
        }
        // WebKit < 27
        else if (typeof document.body.style.webkitTextSizeAdjust === 'string') {
            func = webkit;
        }
        //Opera
        else if (-1 !== ua.indexOf('opera')) {
            func = opera11;
        }
        //Last one is Firefox
        //FF 18.x
        else if (window.devicePixelRatio) {
            func = firefox18;
        }
        //FF 4.0 - 17.x
        else if (firefox4().zoom > 0.001) {
            func = firefox4;
        }

        return func;
    }());

    var zoomCache = {
        zoom: detectFunction().zoom,
        device: detectFunction().devicePxPerCssPx
    };

    return ({

        /**
         * Ratios.zoom shorthand
         * @return {Number} Zoom level
         */
        zoom: function () {
            return zoomCache.zoom = detectFunction().zoom;
        },

        /**
         * Ratios.devicePxPerCssPx shorthand
         * @return {Number} devicePxPerCssPx level
         */
        device: function () {
            return zoomCache.device = detectFunction().devicePxPerCssPx;
        },

        zoomText: function () {
            return zoomText();
        }
    });
}));

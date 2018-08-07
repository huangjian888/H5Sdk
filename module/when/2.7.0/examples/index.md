### 相关例子

<div id="demoContainer">

</div>

<script>
	require(['{{module}}'], function(when) {
		function loadImage (src) {
			var deferred = when.defer(),
				img = document.createElement('img');
			img.onload = function () { 
				deferred.resolve(img); 
			};
			img.onerror = function () { 
				deferred.reject(new Error('Image not found: ' + src));
			};
			img.src = src;
			return deferred.promise;
		}
		
		function loadImages(srcs) {
			// srcs = array of image src urls
			// Array to hold deferred for each image being loaded
			var deferreds = [];

			// Call loadImage for each src, and push the returned deferred
			// onto the deferreds array
			for(var i = 0, len = srcs.length; i < len; i++) {
				deferreds.push(loadImage(srcs[i]));
				
				// NOTE: We could push only the promise, but since this array never
				// leaves the loadImages function, it's ok to push the whole
				// deferred.  No one can gain access to them.
				// However, if this array were exposed (e.g. via return value),
				// it would be better to push only the promise.
			}

			// Return a new promise that will resolve only when all the
			// promises in deferreds have resolved.
			// NOTE: when.all returns only a promise, not a deferred, so
			// this is safe to expose to the caller.
			return when.all(deferreds);
		}
		var imageSrcArray=['http://google.com/favicon.ico',
						'http://www.360.cn/favicon.ico',
						'http://www.baidu.com/favicon.ico',
						'http://www.sogou.com/favicon.ico'];
		
		loadImages(imageSrcArray).then(
			function gotEm(imageArray) {
				$.each(imageArray,function(idx,img){
					$('#demoContainer').append(img);
				});
				return imageArray.length;
			},
			function doh(err) {
				handleError(err);
			}
		).then(
			function shout (count) {
				alert('see my new ' + count + ' images?');
			}
		);
	});
</script>
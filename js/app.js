define(function(){
    var app = {
        init : function(){
            var elem = $('#mySwipe')[0];
            window.uiejSwipe = new Swipe(elem, {
                startSlide: 0,
                speed: 400,
                auto: 3000,
                continuous: true,
                disableScroll: true,
                stopPropagation: false,
                callback: function(pos) {
                    var bullets = $("#swipePoint b");
                    var i = bullets.length;
                    while (i--) {
                        bullets[i].className = '';
                    }
                    bullets[pos].className = 'active';  
                },
                transitionEnd: function(index, elem) {}
            });
        }
    };

    return app;
});
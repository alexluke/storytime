(function() {

  define(['requestAnimationFrame', 'sprite-batch'], function(requestAnimationFrame, SpriteBatch) {
    var Game;
    return Game = (function() {

      function Game(renderTarget) {
        this.spriteBatch = new SpriteBatch(renderTarget);
        this.x = renderTarget.offsetLeft;
        this.y = renderTarget.offsetTop;
        this.width = renderTarget.width;
        this.height = renderTarget.height;
        this.mouse = {
          x: 0,
          y: 0,
          leftButton: false,
          middleButton: false,
          rightButton: false
        };
        this.init();
      }

      Game.prototype.start = function() {
        var drawTick, updateTick,
          _this = this;
        document.addEventListener('mousemove', function(e) {
          _this.mouse.x = e.pageX - _this.x;
          return _this.mouse.y = e.pageY - _this.y;
        });
        document.addEventListener('mousedown', function(e) {
          e.preventDefault();
          if (e.button === 0) {
            return _this.mouse.leftButton = true;
          } else if (e.button === 1) {
            return _this.mouse.middleButton = true;
          } else if (e.button === 2) {
            return _this.mouse.rightButton = true;
          }
        });
        document.addEventListener('mouseup', function(e) {
          e.preventDefault();
          if (e.button === 0) {
            return _this.mouse.leftButton = false;
          } else if (e.button === 1) {
            return _this.mouse.middleButton = false;
          } else if (e.button === 2) {
            return _this.mouse.rightButton = false;
          }
        });
        drawTick = function() {
          _this.draw();
          return requestAnimationFrame(drawTick);
        };
        requestAnimationFrame(drawTick);
        this.lastUpdate = (new Date).getTime();
        updateTick = function() {
          var delta, now;
          now = (new Date).getTime();
          delta = (now - _this.lastUpdate) / 1000;
          _this.lastUpdate = now;
          return _this.update(delta, now);
        };
        return setInterval(updateTick, 1000 / 60);
      };

      Game.prototype.init = function() {};

      Game.prototype.draw = function() {};

      Game.prototype.update = function() {};

      return Game;

    })();
  });

}).call(this);

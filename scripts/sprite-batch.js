(function() {

  define(['renderers/webgl-renderer'], function(WebGLRenderer) {
    var SpriteBatch;
    return SpriteBatch = (function() {

      function SpriteBatch(renderTarget) {
        this.drawing = false;
        this.renderer = new WebGLRenderer(renderTarget);
        this.drawCount = 0;
        this.maxDraws = 1000;
        this.white = {
          r: 1.0,
          g: 1.0,
          b: 1.0,
          a: 1.0
        };
      }

      SpriteBatch.prototype.begin = function() {
        if (this.drawing) {
          throw 'Already drawing';
        }
        return this.drawing = true;
      };

      SpriteBatch.prototype.draw = function(texture, x, y, color) {
        if (!(this.currentTexture != null) || texture.name !== this.currentTexture.name || this.drawCount > this.maxDraws) {
          this.flush();
          this.currentTexture = texture;
        }
        if (!(color != null)) {
          color = this.white;
        }
        this.renderer.draw(texture, x, y, color);
        return this.drawCount++;
      };

      SpriteBatch.prototype.end = function() {
        if (!this.drawing) {
          throw 'Not drawing';
        }
        this.drawing = false;
        return this.flush();
      };

      SpriteBatch.prototype.flush = function() {
        if (this.drawCount > 0) {
          this.renderer.flush(this.currentTexture);
          return this.drawCount = 0;
        }
      };

      return SpriteBatch;

    })();
  });

}).call(this);

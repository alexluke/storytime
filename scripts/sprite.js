(function() {

  define(['texture'], function(Texture) {
    var Sprite;
    return Sprite = (function() {

      function Sprite(textureName, x, y) {
        var _ref, _ref1, _ref2;
        this.x = x;
        this.y = y;
        this.alive = true;
        if ((_ref = this.texture) == null) {
          this.texture = Texture.load(textureName);
        }
        if ((_ref1 = this.width) == null) {
          this.width = this.texture.width;
        }
        if ((_ref2 = this.height) == null) {
          this.height = this.texture.height;
        }
        this.color = {
          r: 1.0,
          g: 1.0,
          b: 1.0,
          a: 1.0
        };
      }

      Sprite.prototype.draw = function(batch) {
        return batch.draw(this.texture, this.x, this.y, this.color);
      };

      Sprite.prototype.update = function(delta) {};

      Sprite.prototype.intersects = function(otherSprite) {
        var withinX, withinY;
        withinX = this.x + this.width > otherSprite.x && this.x < otherSprite.x + otherSprite.width;
        withinY = this.y + this.height > otherSprite.y && this.y < otherSprite.y + otherSprite.height;
        return this.alive && otherSprite.alive && withinX && withinY;
      };

      Sprite.prototype.contains = function(x, y) {
        var withinX, withinY;
        withinX = x > this.x && x < this.x + this.width;
        withinY = y > this.y && y < this.y + this.height;
        return this.alive && withinX && withinY;
      };

      return Sprite;

    })();
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['sprite', 'font-texture'], function(Sprite, FontTexture) {
    var PlayButton;
    return PlayButton = (function(_super) {

      __extends(PlayButton, _super);

      function PlayButton(x, y, width) {
        this.width = width;
        this.texture = new FontTexture('Ariel', 50, 'black');
        this.texture.setText('PLAY');
        PlayButton.__super__.constructor.call(this, null, x, y);
        console.log(this.width);
      }

      PlayButton.prototype.draw = function(batch) {
        return batch.draw(this.texture, this.x + this.width / 2 - this.texture.width / 2, this.y, this.color);
      };

      return PlayButton;

    })(Sprite);
  });

}).call(this);

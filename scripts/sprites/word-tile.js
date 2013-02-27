(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['sprites/tile', 'font-texture'], function(Tile, FontTexture) {
    var WordTile;
    return WordTile = (function(_super) {

      __extends(WordTile, _super);

      function WordTile(word) {
        WordTile.__super__.constructor.call(this);
        this.id = word;
        this.font = new FontTexture('Ariel', 32, 'black', "rgba(" + (this.color.r * 255) + ", " + (this.color.g * 255) + ", " + (this.color.b * 255) + ", " + this.color.a + ")");
        this.font.setText(word);
      }

      WordTile.prototype.draw = function(batch) {
        var textPos;
        WordTile.__super__.draw.call(this, batch);
        if (this.showFace) {
          textPos = {
            x: this.x + this.width / 2 - this.font.width / 2,
            y: this.y + this.height / 2 - this.font.height / 2
          };
          return batch.draw(this.font, textPos.x, textPos.y);
        }
      };

      return WordTile;

    })(Tile);
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['sprite'], function(Sprite) {
    var Tile;
    return Tile = (function(_super) {

      __extends(Tile, _super);

      Tile.colors = [
        {
          r: 70 / 255,
          g: 255 / 255,
          b: 61 / 255,
          a: 1.0
        }, {
          r: 255 / 255,
          g: 121 / 255,
          b: 66 / 255,
          a: 1.0
        }, {
          r: 144 / 255,
          g: 92 / 255,
          b: 232 / 255,
          a: 1.0
        }, {
          r: 35 / 255,
          g: 153 / 255,
          b: 255 / 255,
          a: 1.0
        }
      ];

      function Tile() {
        var index;
        Tile.__super__.constructor.call(this, "tile", 0, 0);
        index = Math.floor(Math.random() * Tile.colors.length);
        this.color = Tile.colors[index];
        this.showFace = false;
      }

      Tile.prototype.flip = function() {
        return this.showFace = !this.showFace;
      };

      return Tile;

    })(Sprite);
  });

}).call(this);

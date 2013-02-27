(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['texture', 'sprites/tile'], function(Texture, Tile) {
    var ImageTile;
    return ImageTile = (function(_super) {

      __extends(ImageTile, _super);

      ImageTile.images = ['bird', 'jester', 'queen', 'king'];

      function ImageTile(image) {
        ImageTile.__super__.constructor.call(this);
        this.id = "pic_" + image;
        this.image = new Texture(image);
      }

      ImageTile.prototype.draw = function(batch) {
        var pos;
        ImageTile.__super__.draw.call(this, batch);
        if (this.showFace) {
          pos = {
            x: this.x + this.width / 2 - this.image.width / 2,
            y: this.y + this.height / 2 - this.image.height / 2
          };
          return batch.draw(this.image, pos.x, pos.y);
        }
      };

      return ImageTile;

    })(Tile);
  });

}).call(this);

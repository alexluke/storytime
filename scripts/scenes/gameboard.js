(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['scene', 'sprites/word-tile', 'sprites/image-tile', 'timer'], function(Scene, WordTile, ImageTile, Timer) {
    var Gameboard;
    return Gameboard = (function(_super) {

      __extends(Gameboard, _super);

      function Gameboard(width, height, words) {
        var bufferX, bufferY, cols, i, image, imageIndex, images, index, padding, rows, word, x, y, _i, _j, _k, _l, _len, _m;
        Gameboard.__super__.constructor.call(this, width, height);
        this.tiles = [];
        this.canClick = true;
        this.currentTile = false;
        for (_i = 0, _len = words.length; _i < _len; _i++) {
          word = words[_i];
          for (i = _j = 0; _j <= 1; i = ++_j) {
            this.tiles.push(new WordTile(word));
          }
        }
        images = ImageTile.images.slice(0);
        while (this.tiles.length < 20) {
          imageIndex = Math.floor(Math.random() * images.length);
          image = images[imageIndex];
          images.splice(imageIndex, 1);
          for (i = _k = 0; _k <= 1; i = ++_k) {
            this.tiles.push(new ImageTile(image));
          }
        }
        this._shuffleTiles();
        padding = 22;
        cols = 4;
        rows = 5;
        bufferX = (this.width - (padding * (cols - 1) + this.tiles[0].width * cols)) / 2;
        bufferY = (this.height - (padding * (rows - 1) + this.tiles[0].height * rows)) / 2;
        for (y = _l = 0; 0 <= rows ? _l < rows : _l > rows; y = 0 <= rows ? ++_l : --_l) {
          for (x = _m = 0; 0 <= cols ? _m < cols : _m > cols; x = 0 <= cols ? ++_m : --_m) {
            index = x + y * cols;
            this.tiles[index].x = bufferX + x * (this.tiles[index].width + padding);
            this.tiles[index].y = bufferY + y * (this.tiles[index].height + padding);
          }
        }
      }

      Gameboard.prototype.draw = function(batch) {
        var tile, _i, _len, _ref;
        _ref = this.tiles;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          tile = _ref[_i];
          if (tile.alive) {
            tile.draw(batch);
          }
        }
      };

      Gameboard.prototype.update = function(delta, mouse) {
        var otherTile, tile, _i, _len, _ref,
          _this = this;
        if (this.canClick && !this.hasClicked && mouse.leftButton) {
          this.canClick = false;
          this.hasClicked = true;
          _ref = this.tiles;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            tile = _ref[_i];
            if (tile.contains(mouse.x, mouse.y)) {
              tile.flip();
              if (this.currentTile) {
                otherTile = this.currentTile;
                if (this.currentTile.id === tile.id && this.currentTile !== tile) {
                  Timer["in"](1000, function() {
                    otherTile.alive = false;
                    tile.alive = false;
                    return _this.canClick = true;
                  });
                } else {
                  Timer["in"](1000, function() {
                    otherTile.flip();
                    tile.flip();
                    return _this.canClick = true;
                  });
                }
                this.currentTile = false;
              } else {
                this.currentTile = tile;
                this.canClick = true;
              }
              break;
            }
          }
        }
        if (!mouse.leftButton) {
          this.hasClicked = false;
        }
        if (!this.stillHasTiles()) {
          return this.running = false;
        }
      };

      Gameboard.prototype.stillHasTiles = function() {
        var tile, _i, _len, _ref;
        _ref = this.tiles;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          tile = _ref[_i];
          if (tile.alive) {
            return true;
          }
        }
        return false;
      };

      Gameboard.prototype._shuffleTiles = function() {
        var i, j, _ref, _results;
        i = this.tiles.length;
        _results = [];
        while (--i) {
          j = Math.floor(Math.random() * (i + 1));
          _results.push((_ref = [this.tiles[j], this.tiles[i]], this.tiles[i] = _ref[0], this.tiles[j] = _ref[1], _ref));
        }
        return _results;
      };

      return Gameboard;

    })(Scene);
  });

}).call(this);

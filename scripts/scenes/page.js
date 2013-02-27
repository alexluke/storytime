(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['scene', 'sprite', 'sprites/play-button', 'scenes/gameboard'], function(Scene, Sprite, PlayButton, Gameboard) {
    var Page;
    return Page = (function(_super) {

      __extends(Page, _super);

      function Page(width, height, pageNumber, words) {
        var name;
        this.pageNumber = pageNumber;
        this.words = words;
        Page.__super__.constructor.call(this, width, height);
        if (pageNumber === 'title') {
          name = 'title';
        } else {
          name = "page" + this.pageNumber;
        }
        this.page = new Sprite(name, 0, 0);
        this.button = new PlayButton(0, this.height - 58, this.width);
      }

      Page.prototype.draw = function(batch) {
        this.page.draw(batch);
        if (this.pageNumber !== 'title') {
          return this.button.draw(batch);
        }
      };

      Page.prototype.update = function(delta, mouse) {
        if (mouse.leftButton) {
          if (this.button.contains(mouse.x, mouse.y)) {
            this.running = false;
            return this.nextScene = new Gameboard(this.width, this.height, this.words);
          } else {
            return this.running = false;
          }
        }
      };

      return Page;

    })(Scene);
  });

}).call(this);

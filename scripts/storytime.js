(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['game', 'scenes/page', 'scenes/gameboard', 'timer'], function(Game, Page, Gameboard, Timer) {
    var Storytime;
    return Storytime = (function(_super) {

      __extends(Storytime, _super);

      function Storytime() {
        return Storytime.__super__.constructor.apply(this, arguments);
      }

      Storytime.words = [[], ['sing', 'a', 'song', 'of', 'sixpence', 'pocket', 'full', 'rye'], ['four', 'and', 'twenty', 'black', 'birds', 'baked', 'in', 'a', 'pie'], ['when', 'the', 'pie', 'was', 'open\'d', 'birds', 'began', 'to', 'sing'], ['was\'nt', 'that', 'a', 'dainty', 'dish', 'to', 'set', 'before', 'the', 'king'], ['the', 'king', 'was', 'in', 'his', 'counting', 'house', 'out', 'money'], ['the', 'queen', 'was', 'in', 'parlow', 'eating', 'bread', 'and', 'honey'], ['the', 'maid', 'was', 'in', 'garden', 'hanging', 'out', 'clothes'], ['there', 'came', 'a', 'little', 'blackbird', 'and', 'nipp\'d', 'off', 'her', 'nose']];

      Storytime.prototype.init = function() {
        var i, _i;
        this.scenes = [];
        this.scenes.push(new Page(this.width, this.height, 'title'));
        for (i = _i = 1; _i <= 8; i = ++_i) {
          this.scenes.push(new Page(this.width, this.height, i, Storytime.words[i]));
        }
        this.currentSceneNumber = 0;
        return this.currentScene = this.scenes[this.currentSceneNumber];
      };

      Storytime.prototype.draw = function() {
        this.spriteBatch.begin();
        this.currentScene.draw(this.spriteBatch);
        return this.spriteBatch.end();
      };

      Storytime.prototype.update = function(delta) {
        var nextScene,
          _this = this;
        this.currentScene.update(delta, this.mouse);
        if (!this.currentScene.running && !this.transitioning) {
          if (this.currentScene.nextScene != null) {
            nextScene = this.currentScene.nextScene;
          } else {
            this.currentSceneNumber++;
            if (this.currentSceneNumber >= this.scenes.length) {
              this.currentSceneNumber = 0;
            }
            nextScene = this.scenes[this.currentSceneNumber];
          }
          this.transitioning = true;
          return Timer["in"](1000, function() {
            _this.currentScene = nextScene;
            return _this.transitioning = false;
          });
        }
      };

      return Storytime;

    })(Game);
  });

}).call(this);

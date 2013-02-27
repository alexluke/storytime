(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(function() {
    var Texture;
    return Texture = (function() {

      Texture.textures = {};

      Texture.load = function(name) {
        if (__indexOf.call(Texture.textures, name) < 0) {
          Texture.textures[name] = new Texture(name);
        }
        return Texture.textures[name];
      };

      function Texture(name) {
        this.name = name;
        this.data = document.getElementById(this.name);
        if (!this.data) {
          throw "Unknown texture " + this.name;
        }
        this.width = this.data.width;
        this.height = this.data.height;
      }

      Texture.prototype.stData = function() {
        return [0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0];
      };

      return Texture;

    })();
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['texture', 'renderers/canvas-font-renderer'], function(Texture, CanvasFontRenderer) {
    var FontTexture;
    return FontTexture = (function(_super) {

      __extends(FontTexture, _super);

      function FontTexture(family, size, color, bgColor) {
        this.family = family;
        this.size = size;
        this.color = color;
        this.bgColor = bgColor;
        this.renderer = new CanvasFontRenderer(this.family, this.size, this.color, this.bgColor);
      }

      FontTexture.prototype.setText = function(text) {
        this.renderer.drawText(text);
        this.data = this.renderer.canvas;
        this.width = this.data.width;
        return this.height = this.data.height;
      };

      return FontTexture;

    })(Texture);
  });

}).call(this);

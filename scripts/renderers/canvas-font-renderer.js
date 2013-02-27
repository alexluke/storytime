(function() {

  define(function() {
    var CanvasFontRenderer;
    return CanvasFontRenderer = (function() {

      function CanvasFontRenderer(fontFamily, fontSize, color, bgColor) {
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.color = color;
        this.bgColor = bgColor;
        this.canvas = document.createElement('canvas');
        this.canvas.style.display = 'none';
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.ctx.font = "" + this.fontSize + "px " + this.fontFamily;
        if (!(this.color != null)) {
          this.color = 'black';
        }
        if (!(this.bgColor != null)) {
          this.bgColor = 'rgba(0, 0, 0, 0)';
        }
      }

      CanvasFontRenderer.prototype.drawText = function(text) {
        var size;
        size = this.ctx.measureText(text);
        this.canvas.width = size.width + 5;
        this.canvas.height = this.fontSize * 1.5;
        this.ctx.fillStyle = this.bgColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = this.color;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.font = "" + this.fontSize + "px " + this.fontFamily;
        return this.ctx.fillText(text, this.canvas.width / 2, this.fontSize / 2 + 5);
      };

      return CanvasFontRenderer;

    })();
  });

}).call(this);

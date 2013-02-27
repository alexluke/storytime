(function() {

  define(['storytime'], function(Storytime) {
    return window.addEventListener('load', function() {
      var canvas, game;
      canvas = document.getElementById('storytime');
      game = new Storytime(canvas);
      return game.start();
    });
  });

}).call(this);

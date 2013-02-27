(function() {

  define(function() {
    var Timer;
    return Timer = (function() {

      function Timer() {}

      Timer["in"] = function(ms, func) {
        return setTimeout(func, ms);
      };

      return Timer;

    })();
  });

}).call(this);

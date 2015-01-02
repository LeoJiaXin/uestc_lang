(function() {
  define(function(require, exports, module) {
    var Utils;
    Utils = {};
    Utils.resize = function() {
      var cheight, sheight;
      cheight = $('#content').height();
      sheight = $('#sidebar').height();
      return $('#main').css('padding-bottom', (cheight > sheight ? 60 : sheight - cheight + 45) + 'px');
    };
    return Utils;
  });

}).call(this);

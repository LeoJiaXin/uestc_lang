define (require,exports,module)->
  Utils = {}
  Utils.resize = ()->
    cheight = $('#content').height();
    sheight = $('#sidebar').height();
    $('#main').css('padding-bottom',(if cheight>sheight then 60 else sheight-cheight+45)+'px' )
  return Utils
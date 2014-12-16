define (require,exports,module)->
  require 'backbone'
  require 'base/template/link-course'
  $('#link-course').append JST["source/template/link-course/recommand.hbs"]
  return
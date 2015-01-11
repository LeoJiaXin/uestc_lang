define (require,exports,module)->
  #加载backbone和语言课程页面的html模板(handlebars)
  Backbone = require 'backbone'
  require 'base/template/link-exam'
  
  #页面加载完后执行如下/jquery的ready
  $ ()->
    #推荐页面，也是语言课程的默认页面Exam
    Exam =
      Views: {}
      Models:{}

    Exam.Models.Main = Backbone.Model.extend
      defaults :
        banners : []
        best : []
        description :
          title : ''
          content : ''
      url : path+'/ajax/exam/get-exam-intro.php'

    Exam.Views.Main = Backbone.View.extend
      template : JST["source/template/link-exam/intro.hbs"]
      el : $('#link-exam')
      initialize : ()->
        @listenTo @model,'change',@render
        return
      render : ()->
        @$el.html ''
        @$el.html @template @model.attributes
        $('#exam-sign').attr('href',link_for_sign)
        $('#banner img').hide()
        $('#banner img').eq(0).fadeIn ()->
          Root.Data.run = false
        a1 = ()->
          if Root.Data.run? and not Root.Data.run
            Root.Data.run = true
            $('#banner img').hide()
            $('#banner img').eq($('.banner-switch').index($(@))).fadeIn ()->
              Root.Data.run = false
            return
        $('.banner-switch').bind
          mouseenter:a1
        return

    Root.Data = {}
    Root.Model = new Exam.Models.Main()
    Root.View = new Exam.Views.Main
      model : Root.Model

    Router = Backbone.Router.extend
      routes : 
        '' : 'tomain'

    Root.Router = new Router()

    Root.Router.on 'route:tomain',()->
      Root.Model.fetch()

    Backbone.history.start()
  return
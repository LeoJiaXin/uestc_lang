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
        Root.Data.index = 0
        Root.Data.run = false
        record = ()->
          Root.Data.index = $('.banner-switch').index($(@))
          Root.View.play(true)
          return
        $('.banner-switch').bind
          click : record
        @play()
        return
      play : (once)->
        Root.View.setBanner()
        Root.Data.index++
        if Root.Data.index >= $('#banner img').length
          Root.Data.index = 0
        if not once or not once?
          setTimeout Root.View.play,5000
      setBanner : ()->
        if Root.Data.run? and not Root.Data.run
          Root.Data.run = true
          $('#banner img').hide()
          $('#banner .banner-switch').removeClass 'select'
          $('#banner .banner-switch').eq(Root.Data.index).addClass 'select'
          $('#banner img').eq(Root.Data.index).fadeIn ()->
            Root.Data.run = false
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
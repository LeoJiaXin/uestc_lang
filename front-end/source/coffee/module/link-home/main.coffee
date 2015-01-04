define (require,exports,module)->
  #加载backbone和语言课程页面的html模板(handlebars)
  Backbone = require 'backbone'
  require 'base/template/link-home'
  
  #页面加载完后执行如下/jquery的ready
  $ ()->
    #推荐页面，也是语言课程的默认页面Home
    Home =
      Views: {}
      Models:{}
    #模型:推荐页面数据

    Home.Models.Images = Backbone.Model.extend
      defaults :
        banners : []
        recent : [
          {img:''},{img:''},{img:''},{img:''}
        ]
      url : path+'/ajax/home/images.php'

    Home.Models.Recent = Backbone.Model.extend
      url : path+'/ajax/home/recent.php'
      initialize : (main)->
        @main = main
        @on 'change',@pushrecent
      pushrecent : (model)->
        recent = @main.attributes.recent
        recent[index].links = model.attributes.news[index].links for index in [0..recent.length-1]
        @main.set
          recent : recent

    Home.Views.Banner = Backbone.View.extend
      template:JST["source/template/link-home/banner.hbs"]
      el: $('#banner')
      initialize : ()->
        @listenTo @model,'change',@render
      render : ()->
        @$el.html ''
        @$el.html @template @model.attributes
        $('#banner img').hide()
        $('#banner img').eq(0).fadeIn ()->
          Root.Banner.View.run = false
        a1 = ()->
          if Root.Banner.View.run? and not Root.Banner.View.run
            Root.Banner.View.run = true
            $('#banner img').hide()
            $('#banner img').eq($('.banner-switch').index($(@))).fadeIn ()->
              Root.Banner.View.run = false
            return
        $('.banner-switch').bind
          mouseenter:a1
        return

    Home.Views.Recent = Backbone.View.extend
      template:JST["source/template/link-home/recent.hbs"]
      el: $('#recent-news')
      initialize : ()->
        @listenTo @model,'change',@render
      render : ()->
        @$el.html ''
        @$el.html @template @model.attributes

    Home.Views.FastLinks = Backbone.View.extend
      template:JST["source/template/link-home/fast-links.hbs"]
      el: $('#fast-links')
      render: ()->
        data = 
          basepath: path+'/images/home/fast-link/'
        @$el.html ''
        @$el.append @template(data)
        $('.sec-menu-wrapper').children().hide()
        $('.top-link-active').hide()
        $('.top-link-active').eq(0).show()
        $('.fast-link-top p').eq(0).css('color','#177BC6')
        $('.sec-menu-wrapper').children().eq(0).show ()->
          Root.FastLinks.View.run = false
        $('.fast-link-top').bind
          mouseenter: ()->
            if Root.FastLinks.View.run? and not Root.FastLinks.View.run
              Root.FastLinks.View.run = true
              Root.FastLinks.View.index = $('.fast-link-top').index($(@))
              $('.top-link-active').hide()
              $('.top-link-active').eq(Root.FastLinks.View.index).show()
              $('.fast-link-top p').css('color','#AAABAD')
              $('.fast-link-top p').eq(Root.FastLinks.View.index).css('color','#177BC6')
              $('.triangle').animate {left:(Root.FastLinks.View.index*10-20)+'em'},'normal','swing',()->
                $('.sec-menu-wrapper').children().hide()
                $('.sec-menu-wrapper').children().eq(Root.FastLinks.View.index).fadeIn ()->
                  Root.FastLinks.View.run = false
        $('.fast-link-sec').bind
          mouseenter: ()->
            $(this).find('p').css('color','#177BC6')
          mouseout: ()->
            $(this).find('p').css('color','#AAABAD')

    Root.Banner = {}
    Root.Recent = {}
    Root.FastLinks = {}

    Root.Model = new Home.Models.Images()
    Root.Recent.Model = new Home.Models.Recent Root.Model

    Root.Banner.View = new Home.Views.Banner
      model : Root.Model
    Root.Recent.View = new Home.Views.Recent
      model : Root.Model
    Root.FastLinks.View = new Home.Views.FastLinks()

    Root.Model.fetch
      success : ()->
        Root.FastLinks.View.render()
        Root.Recent.Model.fetch
          reset : true
          success : ()->
            Root.Recent.View.render()
  return
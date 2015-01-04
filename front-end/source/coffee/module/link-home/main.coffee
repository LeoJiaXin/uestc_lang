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

    Home.Views.Banner = Backbone.View.extend
      template:JST["source/template/link-home/banner.hbs"]
      el: $('#banner')
      initialize : ()->
        @listenTo @model,'change',@render
      render : ()->
        @$el.html ''
        @$el.html @template @model.attributes
        $('#banner img').hide()
        $('#banner img').eq(0).fadeIn()
        a1 = ()->
          if a1.run? and not a1.run
            a1.runrun = true
            $('#banner img').hide()
            $('#banner img').eq($('.banner-switch').index($(@))).fadeIn (e)->
              a1.run = false
            return
        a1.run = false
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
        $('.sec-menu-wrapper').children().eq(0).show()
        $('.fast-link-top').bind
          mouseenter: ()->
            Root.FastLinks.View.index = $('.fast-link-top').index($(@))
            $('.top-link-active').hide()
            $('.top-link-active').eq(Root.FastLinks.View.index).show()
            $('.fast-link-top p').css('color','#AAABAD')
            $('.fast-link-top p').eq(Root.FastLinks.View.index).css('color','#177BC6')
            $('.triangle').animate {left:(Root.FastLinks.View.index*10-20)+'em'},'normal','swing',()->
              $('.sec-menu-wrapper').children().hide()
              $('.sec-menu-wrapper').children().eq(Root.FastLinks.View.index).fadeIn()
        $('.fast-link-sec').bind
          mouseenter: ()->
            $(this).find('p').css('color','#177BC6')
          mouseout: ()->
            $(this).find('p').css('color','#AAABAD')

    Root.Banner = {}
    Root.Recent = {}
    Root.FastLinks = {}

    Root.Model = new Home.Models.Images()

    Root.Banner.View = new Home.Views.Banner
      model : Root.Model
    Root.Recent.View = new Home.Views.Recent
      model : Root.Model
    Root.FastLinks.View = new Home.Views.FastLinks()

    Root.Model.fetch
      success : ()->
        Root.FastLinks.View.render()
    #page for View
    # Home.Views.Recent = Backbone.View.extend
    #   template:JST["source/template/link-home/recent.hbs"]
    #   el: $('#recent-news')
    #   render: ()->
    #     $.ajax
    #       url : path+'/ajax/home/recent.php'
    #       dataType : 'json'
    #       type : 'GET'
    #       timeout : 8000
    #       success : (result)->
    #         $.HomeRecent.$el.html ''
    #         $.HomeRecent.$el.append $.HomeRecent.template result
    #       error : (xhr,textStatus)->
    #         if textStatus is 'timeout'
    #           console.log '连接超时，检查你是否使用代理等不稳定的网络。'
    #         else
    #           console.log '网络异常，请检查你的网络是否有问题。'
    #     return

    # Home.Views.FastLinks = Backbone.View.extend
    #   template:JST["source/template/link-home/fast-links.hbs"]
    #   el: $('#fast-links')
    #   render: ()->
    #     data = 
    #       basepath: path+'/images/home/fast-link/'
    #     @$el.html ''
    #     @$el.append @template(data)
    #     $('.sec-menu-wrapper').children().hide()
    #     $('.top-link-active').hide()
    #     $('.top-link-active').eq(0).show()
    #     $('.fast-link-top p').eq(0).css('color','#177BC6')
    #     $('.sec-menu-wrapper').children().eq(0).show()
    #     $('.fast-link-top').bind
    #       mouseenter: ()->
    #         $.HomeFastLinks.index = $('.fast-link-top').index($(@))
    #         $('.top-link-active').hide()
    #         $('.top-link-active').eq($.HomeFastLinks.index).show()
    #         $('.fast-link-top p').css('color','#AAABAD')
    #         $('.fast-link-top p').eq($.HomeFastLinks.index).css('color','#177BC6')
    #         $('.triangle').animate {left:($.HomeFastLinks.index*10-20)+'em'},'normal','swing',()->
    #           $('.sec-menu-wrapper').children().hide()
    #           $('.sec-menu-wrapper').children().eq($.HomeFastLinks.index).fadeIn()
    #     $('.fast-link-sec').bind
    #       mouseenter: ()->
    #         $(this).find('p').css('color','#177BC6')
    #       mouseout: ()->
    #         $(this).find('p').css('color','#AAABAD')

    # Home.Views.Banner = Backbone.View.extend
    #   template:JST["source/template/link-home/banner.hbs"]
    #   el: $('#banner')
    #   render: ()->
    #     $.ajax
    #       url : path+'/ajax/home/load-banner-image.php'
    #       dataType : 'json'
    #       type : 'GET'
    #       timeout : 8000
    #       success : (result)->
    #         $.HomeBanner.$el.html ''
    #         $.HomeBanner.$el.append $.HomeBanner.template result
    #         $('#banner img').hide()
    #         $('#banner img').eq(0).fadeIn()
    #         a1 = ()->
    #           $('#banner img').hide()
    #           $('#banner img').eq($('.banner-switch').index($(@))).fadeIn()
    #         $('.banner-switch').bind 
    #           mouseenter:a1
    #       error : (xhr,textStatus)->
    #         if textStatus is 'timeout'
    #           console.log '连接超时，检查你是否使用代理等不稳定的网络。'
    #         else
    #           console.log '网络异常，请检查你的网络是否有问题。'
    #     return

    # $.HomeRecent = new Home.Views.Recent()
    # $.HomeFastLinks = new Home.Views.FastLinks()
    # $.HomeBanner = new Home.Views.Banner()
    # #start load pagedata
    # $.HomeRecent.render()
    # $.HomeFastLinks.render()
    # $.HomeBanner.render()
  return
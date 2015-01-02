define (require,exports,module)->
  #加载backbone和语言课程页面的html模板(handlebars)
  Backbone = require 'backbone'
  require 'base/template/link-course'
  Utils = require 'base/module/common/utils'
  require 'base/module/common/jquerypager'
  #页面加载完后执行如下/jquery的ready
  $ ()->
    #init page first
    $('.tab-wrapper').children('.sec-tabs').hide()

    #define 语言课程页面Course
    Course = 
      Models : {}
      Collections : {}
      Views : {}

    Course.Models.Recommand = Backbone.Model.extend
      defaults :
        list : undefined
        links : undefined
      url : path+'/ajax/course/load-recommand.php'


    Course.Models.List = Backbone.Model.extend
      defaults :
        name : ''
        time : '0 hour'
        num : 0
        max : 0

    Course.Models.Content = Backbone.Model.extend
      defaults :
        name : ''
        time : '0 hour'
        num : 0
        max : 0
        description : ''

    Course.Models.Side = Backbone.Model.extend
      url : path+'/ajax/course/load-best-student.php'

    Course.Collections.List = Backbone.Collection.extend
      model : Course.Models.List
      pageIndex : 0
      pageSum : 1
      sectypeid : undefined
      url : ()->
        return path+'/ajax/course/load-list.php?page_pos='+@pageIndex+('&sec_type='+@sectypeid if @sectypeid?)

    Course.Views.Recommand = Backbone.View.extend
      template : JST["source/template/link-course/recommand.hbs"]
      el : $('#link-course')
      initialize : ()->
        return
      render : ()->
        @$el.html ''
        @$el.html @template @model.attributes
        Utils.resize()
        return

    Course.Views.List = Backbone.View.extend
      template : JST["source/template/link-course/list.hbs"]
      el : $('#link-course')
      initialize : ()->
        return
      render : ()->
        tmp =
          list : []
        tmp.list.push @model.models[num].attributes for num in [0...@model.length]
        @$el.html ''
        @$el.append @template tmp
        Utils.resize()
        $.pager.createbelow($('#list-pager'),{
          now : @model.pageIndex+1,
          header:1,
          next:1,
          pageNum:5,
          max : @model.pageSum,
          dopage: (index)->
            Root.Router.navigate 'list/sectype'+Root.List.Model.sectypeid+'/'+(index-1),{replace:true,trigger:true}
        })
        return

    Course.Views.Content = Backbone.View.extend
      template : JST["source/template/link-course/content.hbs"]
      el : $('#link-course')
      initialize : ()->
        # @listenTo @model,'change',@render
        return
      render : ()->
        @$el.html ''
        @$el.html @template @model.attributes
        Utils.resize()

    Course.Views.Side = Backbone.View.extend
      template : JST["source/template/link-course/sidebar.hbs"]
      el : $('#sidebar')
      initialize : ()->
        @listenTo @model,'change',@render
        return
      render : ()->
        @$el.html ''
        @$el.html @template @model.attributes
        Utils.resize()

    Root =
      Recommand : {}
      List : {}
      Content : {}
      Side : {}

    Root.Recommand.Model = new Course.Models.Recommand()
    Root.List.Model = new Course.Collections.List()
    Root.Content.Model = new Course.Models.Content()
    Root.Side.Model = new Course.Models.Side()

    Root.Recommand.View = new Course.Views.Recommand
      model : Root.Recommand.Model
    Root.List.View = new Course.Views.List
      model : Root.List.Model
    Root.Content.View = new Course.Views.Content
      model : Root.Content.Model
    Root.Side.View = new Course.Views.Side
      model : Root.Side.Model

    Router = Backbone.Router.extend
      routes : 
        '' : 'torec'
        'list/sectype:sectype/:pageindex' : 'tolist'
        'content/:id' : 'tocontent'
      checkback : ()->
        if not Root.Side.Model.attributes.list?
          @navigate '',{trigger: true, replace: true}
          return false
        return true;

    Root.Router = new Router()

    Root.Router.on 'route:torec',()->
      Root.Recommand.Model.fetch
        reset : true
        success : (result)->
          Root.Recommand.View.render()
          $('.sec-tabs').html ''
          for num in [0..3]
            $('.top-tab').eq(num+1).text(result.attributes.group[num].parent)
            for link in result.attributes.group[num].child
              $('.sec-tabs').eq(num).append('<a href="#/list/sectype'+link.id+'/0">'+link.name+'</a>')
          return
      if not Root.Side.Model.attributes.list?
        Root.Side.Model.fetch()
      return

    Root.Router.on 'route:tolist',(sectypeid,pageIndex)->
      if @checkback()
        Root.List.Model.sectypeid = sectypeid;
        Root.List.Model.pageIndex = parseInt(pageIndex);
        Root.List.Model.fetch
          reset : true
          success : ()->
            if Root.List.Model.models[0]? and Root.List.Model.models[0].attributes.sum?
              Root.List.Model.pageSum = Root.List.Model.models[0].attributes.sum
            Root.List.View.render()

    Root.Router.on 'route:tocontent',(id)->
      if @checkback()
        $.ajax
          url : path+'/ajax/course/load-content.php'
          data : {id : id}
          dataType : 'json'
          type : 'get'
          timeout : 8000
          success : (result)->
            if result.id?
              Root.Content.Model.set result
              Root.Content.View.render()

    Backbone.history.start()

    showtab = ()->
      sec = $(@).children('.sec-tabs')
      if sec?
        sec.fadeIn()
    hidetab = ()->
      sec = $(@).children('.sec-tabs')
      if sec?
        sec.fadeOut()
    $('.tab-wrapper').hover showtab,hidetab

  return

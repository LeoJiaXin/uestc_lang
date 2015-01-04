define (require,exports,module)->
  #加载backbone和语言课程页面的html模板(handlebars)
  Backbone = require 'backbone'
  require 'base/template/link-source'
  Utils = require 'base/module/common/utils'
  require 'base/module/common/jquerypager'
  #页面加载完后执行如下/jquery的ready
  $ ()->
    #define 语言课程页面Source
    Source = 
      Models : {}
      Collections : {}
      Views : {}

    Source.Models.Recommand = Backbone.Model.extend
      defaults :
        list : undefined
        links : undefined
      url : path+'/ajax/source/load-recommand.php'


    Source.Models.List = Backbone.Model.extend
      defaults :
        name : ''
        time : '0 hour'
        num : 0
        max : 0

    Source.Models.Content = Backbone.Model.extend
      defaults :
        name : ''
        time : '0 hour'
        num : 0
        max : 0
        description : ''

    Source.Models.Side = Backbone.Model.extend
      url : path+'/ajax/source/load-hot-download.php'

    Source.Collections.List = Backbone.Collection.extend
      model : Source.Models.List
      pageIndex : 0
      pageSum : 1
      sectypeid : undefined
      url : ()->
        return path+'/ajax/source/load-list.php?page_pos='+@pageIndex+('&sec_type='+@sectypeid if @sectypeid?)

    Source.Views.Recommand = Backbone.View.extend
      template : JST["source/template/link-source/recommand.hbs"]
      el : $('#link-source')
      initialize : ()->
        return
      render : ()->
        @$el.html ''
        @$el.html @template @model.attributes
        Utils.resize()
        return

    Source.Views.List = Backbone.View.extend
      template : JST["source/template/link-source/list.hbs"]
      el : $('#link-source')
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

    Source.Views.Content = Backbone.View.extend
      template : JST["source/template/link-source/content.hbs"]
      el : $('#link-source')
      initialize : ()->
        # @listenTo @model,'change',@render
        return
      render : ()->
        @$el.html ''
        @$el.html @template @model.attributes
        Utils.resize()

    Source.Views.Side = Backbone.View.extend
      template : JST["source/template/link-source/sidebar.hbs"]
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

    Root.Recommand.Model = new Source.Models.Recommand()
    Root.List.Model = new Source.Collections.List()
    Root.Content.Model = new Source.Models.Content()
    Root.Side.Model = new Source.Models.Side()

    Root.Recommand.View = new Source.Views.Recommand
      model : Root.Recommand.Model
    Root.List.View = new Source.Views.List
      model : Root.List.Model
    Root.Content.View = new Source.Views.Content
      model : Root.Content.Model
    Root.Side.View = new Source.Views.Side
      model : Root.Side.Model

    Router = Backbone.Router.extend
      routes : 
        '' : 'torec'
        'list/sectype:sectype/:pageindex' : 'tolist'
        'content/:id' : 'tocontent'
      initPage : (torec)->
        Root.Recommand.Model.fetch
          reset : true
          success : (result)->
            if torec
              Root.Recommand.View.render()
            $('.top-tab').eq(num+1).html('<a href="#list/sectype'+result.attributes.group[num].id+'/0">'+result.attributes.group[num].name+'</a>') for num in [0..3]
            return
        if not Root.Side.Model.attributes.links?
          Root.Side.Model.fetch()
        return
      checkinit : ()->
        if not Root.Side.Model.attributes.links?
          @initPage false

    Root.Router = new Router()

    Root.Router.on 'route:torec',()->
      @initPage true

    Root.Router.on 'route:tolist',(sectypeid,pageIndex)->
      @checkinit()
      Root.List.Model.sectypeid = sectypeid;
      Root.List.Model.pageIndex = parseInt(pageIndex);
      Root.List.Model.fetch
        reset : true
        success : ()->
          if Root.List.Model.models[0]? and Root.List.Model.models[0].attributes.sum?
            Root.List.Model.pageSum = Root.List.Model.models[0].attributes.sum
          Root.List.View.render()

    Root.Router.on 'route:tocontent',(id)->
      @checkinit()
      $.ajax
        url : path+'/ajax/source/load-content.php'
        data : {id : id}
        dataType : 'json'
        type : 'get'
        timeout : 8000
        success : (result)->
          if result.id?
            Root.Content.Model.set result
            Root.Content.View.render()

    Backbone.history.start()

  return
define (require,exports,module)->
  #加载backbone和语言课程页面的html模板(handlebars)
  Backbone = require 'backbone'
  require 'base/template/link-employ'
  require 'base/module/common/jquerypager'
  #页面加载完后执行如下/jquery的ready
  $ ()->
    #推荐页面，也是语言课程的默认页面Employ
    Employ = 
      Models : {}
      Collections : {}
      Views : {}

    Employ.Models.Recommand = Backbone.Model.extend
      defaults :
        list : undefined
        group : undefined
      url : path+'/ajax/employ/load-recommand.php'


    Employ.Models.List = Backbone.Model.extend
      defaults :
        name : ''
        time : '0 hour'
        num : 0
        max : 0

    Employ.Models.Content = Backbone.Model.extend
      defaults :
        name : ''
        time : '0 hour'
        num : 0
        max : 0
        description : ''

    Employ.Collections.List = Backbone.Collection.extend
      model : Employ.Models.List
      pageIndex : 0
      pageSum : 1
      sectypeid : undefined
      url : ()->
        return path+'/ajax/employ/load-list.php?page_pos='+@pageIndex+('&sec_type='+@sectypeid if @sectypeid?)

    Employ.Views.Recommand = Backbone.View.extend
      template : JST["source/template/link-employ/recommand.hbs"]
      el : $('#link-employ')
      initialize : ()->
        return
      render : ()->
        @$el.html ''
        @$el.html @template @model.attributes
        return

    Employ.Views.List = Backbone.View.extend
      template : JST["source/template/link-employ/list.hbs"]
      el : $('#link-employ')
      initialize : ()->
        return
      render : ()->
        tmp =
          list : []
        tmp.list.push @model.models[num].attributes for num in [0...@model.length]
        @$el.html ''
        @$el.append @template tmp
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

    Employ.Views.Content = Backbone.View.extend
      template : JST["source/template/link-employ/content.hbs"]
      el : $('#link-employ')
      initialize : ()->
        # @listenTo @model,'change',@render
        return
      render : ()->
        @$el.html ''
        @$el.html @template @model.attributes

    Root =
      Recommand : {}
      List : {}
      Content : {}
      Side : {}

    Root.Recommand.Model = new Employ.Models.Recommand()
    Root.List.Model = new Employ.Collections.List()
    Root.Content.Model = new Employ.Models.Content()

    Root.Recommand.View = new Employ.Views.Recommand
      model : Root.Recommand.Model
    Root.List.View = new Employ.Views.List
      model : Root.List.Model
    Root.Content.View = new Employ.Views.Content
      model : Root.Content.Model

    Router = Backbone.Router.extend
      routes : 
        '' : 'torec'
        'list/sectype:sectype/:pageindex' : 'tolist'
        'content/:id' : 'tocontent'

    Root.Router = new Router()

    Root.Router.on 'route:torec',()->
      Root.Recommand.Model.fetch
        reset : true
        success : (result)->
          Root.Recommand.View.render()
          return
      return

    Root.Router.on 'route:tolist',(sectypeid,pageIndex)->
      Root.List.Model.sectypeid = sectypeid;
      Root.List.Model.pageIndex = parseInt(pageIndex);
      Root.List.Model.fetch
        reset : true
        success : ()->
          if Root.List.Model.models[0]? and Root.List.Model.models[0].attributes.sum?
            Root.List.Model.pageSum = Root.List.Model.models[0].attributes.sum
          Root.List.View.render()

    Root.Router.on 'route:tocontent',(id)->
      $.ajax
        url : path+'/ajax/employ/load-content.php'
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
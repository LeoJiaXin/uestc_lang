define (require,exports,module)->
  #加载backbone和语言课程页面的html模板(handlebars)
  Backbone = require 'backbone'
  require 'base/template/link-activity'
  
  #页面加载完后执行如下/jquery的ready
  $ ()->
    #推荐页面，也是语言课程的默认页面Activity
    Activity = 
      Models:{}
      Collections:{}
      Events:{}
    #模型:推荐页面数据

    Activity.View = Backbone.View.extend
      recommand:JST["source/template/link-activity/recommand.hbs"]
      list:JST["source/template/link-activity/list.hbs"]
      content:JST["source/template/link-activity/content.hbs"]
      el: $('#link-activity')
      torecommand: ()->
        $.ajax
          url : path+'/ajax/activity/load-recommand.php'
          dataType : 'json'
          type : 'GET'
          timeout : 8000
          success : (result)->
            $.ActivityView.$el.html ''
            $.ActivityView.$el.append $.ActivityView.recommand result
            $('.more').bind 'click',(e)->
              e.preventDefault()
              $.ActivityView.tolist()
            $('.latest-activity a,.activity a').bind 'click',(e)->
              e.preventDefault()
              $.ActivityView.tocontent()

          error : (xhr,textStatus)->
            if textStatus is 'timeout'
              console.log '连接超时，检查你是否使用代理等不稳定的网络。'
            else
              console.log '网络异常，请检查你的网络是否有问题。'
        return
      tolist: ()->
        $.ajax
          url : path+'/ajax/activity/load-list.php'
          dataType : 'json'
          type : 'GET'
          timeout : 8000
          success : (result)->
            $.ActivityView.$el.html ''
            $.ActivityView.$el.append $.ActivityView.list result
            $('.table-column-3 a').bind 'click',(e)->
              e.preventDefault()
              $.ActivityView.tocontent()
            require 'base/module/common/jquerypager'
            $.pager.createbelow($('#list-pager'),{
              header:1,
              next:1,
              pageNum:5,
              max:20,
              dopage: (index)-> console.log('you have click page'+index);
            })
          error : (xhr,textStatus)->
            if textStatus is 'timeout'
              console.log '连接超时，检查你是否使用代理等不稳定的网络。'
            else
              console.log '网络异常，请检查你的网络是否有问题。'
        return
      tocontent: ()->
        $.ajax
          url : path+'/ajax/activity/load-content.php'
          dataType : 'json'
          type : 'GET'
          timeout : 8000
          success : (result)->
            $.ActivityView.$el.html ''
            $.ActivityView.$el.append $.ActivityView.content result
          error : (xhr,textStatus)->
            if textStatus is 'timeout'
              console.log '连接超时，检查你是否使用代理等不稳定的网络。'
            else
              console.log '网络异常，请检查你的网络是否有问题。'
        return

    $.ActivityView = new Activity.View()

    #start load pagedata
    $.ActivityView.torecommand()
  return
define (require,exports,module)->
  #加载backbone和语言课程页面的html模板(handlebars)
  Backbone = require 'backbone'
  require 'base/template/link-employ'
  
  #页面加载完后执行如下/jquery的ready
  $ ()->
    #推荐页面，也是语言课程的默认页面Employ
    Employ = 
      Models:{}
      Collections:{}
      Events:{}
    #模型:推荐页面数据

    Employ.View = Backbone.View.extend
      recommand:JST["source/template/link-employ/recommand.hbs"]
      list:JST["source/template/link-employ/list.hbs"]
      content:JST["source/template/link-employ/content.hbs"]
      el: $('#link-employ')
      torecommand: ()->
        $.ajax
          url : path+'/ajax/employ/load-recommand.php'
          dataType : 'json'
          type : 'GET'
          timeout : 8000
          success : (result)->
            $.EmployView.$el.html ''
            $.EmployView.$el.append $.EmployView.recommand result
            $('.more').bind 'click',(e)->
              e.preventDefault()
              $.EmployView.tolist()
            $('.employ-big a,.employ-small a').bind 'click',(e)->
              e.preventDefault()
              $.EmployView.tocontent()
          error : (xhr,textStatus)->
            if textStatus is 'timeout'
              console.log '连接超时，检查你是否使用代理等不稳定的网络。'
            else
              console.log '网络异常，请检查你的网络是否有问题。'
        return
      tolist: ()->
        $.ajax
          url : path+'/ajax/employ/load-list.php'
          dataType : 'json'
          type : 'GET'
          timeout : 8000
          success : (result)->
            $.EmployView.$el.html ''
            $.EmployView.$el.append $.EmployView.list result
            $('.table-column-3 a').bind 'click',(e)->
              e.preventDefault()
              $.EmployView.tocontent()
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
          url : path+'/ajax/employ/load-content.php'
          dataType : 'json'
          type : 'GET'
          timeout : 8000
          success : (result)->
            $.EmployView.$el.html ''
            $.EmployView.$el.append $.EmployView.content result
          error : (xhr,textStatus)->
            if textStatus is 'timeout'
              console.log '连接超时，检查你是否使用代理等不稳定的网络。'
            else
              console.log '网络异常，请检查你的网络是否有问题。'
        return

    $.EmployView = new Employ.View()

    #start load pagedata
    $.EmployView.torecommand()
  return
define (require,exports,module)->
  #加载backbone和语言课程页面的html模板(handlebars)
  Backbone = require 'backbone'
  require 'base/template/link-source'
  
  #页面加载完后执行如下/jquery的ready
  $ ()->
    #推荐页面，也是语言课程的默认页面Source
    Source = 
      Models:{}
      Collections:{}
      Events:{}
    #模型:推荐页面数据

    Source.View = Backbone.View.extend
      recommand:JST["source/template/link-source/recommand.hbs"]
      list:JST["source/template/link-source/list.hbs"]
      content:JST["source/template/link-source/content.hbs"]
      el: $('#link-source')
      torecommand: ()->
        $.ajax
          url : path+'/ajax/source/load-recommand.php'
          dataType : 'json'
          type : 'GET'
          timeout : 8000
          success : (result)->
            $.SourceView.$el.html ''
            $.SourceView.$el.append $.SourceView.recommand result
            $('.list-content a').click (e)->
              e.preventDefault();
              $.SourceView.tocontent()
          error : (xhr,textStatus)->
            if textStatus is 'timeout'
              console.log '连接超时，检查你是否使用代理等不稳定的网络。'
            else
              console.log '网络异常，请检查你的网络是否有问题。'
        return
      tolist: ()->
        $.ajax
          url : path+'/ajax/source/load-list.php'
          dataType : 'json'
          type : 'GET'
          timeout : 8000
          success : (result)->
            $.SourceView.$el.html ''
            $.SourceView.$el.append $.SourceView.list result
            $('.table-column-3 a').bind 'click',(e)->
              e.preventDefault()
              $.SourceView.tocontent()
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
          url : path+'/ajax/source/load-content.php'
          dataType : 'json'
          type : 'GET'
          timeout : 8000
          success : (result)->
            $.SourceView.$el.html ''
            $.SourceView.$el.append $.SourceView.content result
          error : (xhr,textStatus)->
            if textStatus is 'timeout'
              console.log '连接超时，检查你是否使用代理等不稳定的网络。'
            else
              console.log '网络异常，请检查你的网络是否有问题。'
        return

    $.SourceView = new Source.View()

    #init for tabs
    $('.top-tab.tab1').bind 'click',(e)->
      $.SourceView.torecommand()

    $('.tab2,.tab3,.tab4,.tab5').css('cursor','pointer').click (e)->
      e.preventDefault();
      $.SourceView.tolist()

    #start load pagedata
    $.SourceView.torecommand()
  return
define (require,exports,module)->
  #init page first
  $('.tab-wrapper').children('.sec-tabs').hide()

  #加载backbone和语言课程页面的html模板(handlebars)
  Backbone = require 'backbone'
  require 'base/template/link-course'
  
  #页面加载完后执行如下/jquery的ready
  $ ()->
    #推荐页面，也是语言课程的默认页面Course
    Course = 
      Models:{}
      Collections:{}
      Events:{}
    #模型:推荐页面数据

    Course.View = Backbone.View.extend
      recommand:JST["source/template/link-course/recommand.hbs"]
      list:JST["source/template/link-course/list.hbs"]
      content:JST["source/template/link-course/content.hbs"]
      el: $('#link-course')
      torecommand: ()->
        $.ajax
          url : path+'/ajax/course/load-recommand.php'
          dataType : 'json'
          type : 'GET'
          timeout : 8000
          success : (result)->
            $.CourseView.$el.html ''
            $.CourseView.$el.append $.CourseView.recommand result
            $('.list-content a').click (e)->
              e.preventDefault();
              $.CourseView.tocontent()
          error : (xhr,textStatus)->
            if textStatus is 'timeout'
              console.log '连接超时，检查你是否使用代理等不稳定的网络。'
            else
              console.log '网络异常，请检查你的网络是否有问题。'
        return
      tolist: ()->
        $.ajax
          url : path+'/ajax/course/load-list.php'
          dataType : 'json'
          type : 'GET'
          timeout : 8000
          success : (result)->
            $.CourseView.$el.html ''
            $.CourseView.$el.append $.CourseView.list result
            $('.table-column-3 a').bind 'click',(e)->
              e.preventDefault()
              $.CourseView.tocontent()
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
          url : path+'/ajax/course/load-content.php'
          dataType : 'json'
          type : 'GET'
          timeout : 8000
          success : (result)->
            $.CourseView.$el.html ''
            $.CourseView.$el.append $.CourseView.content result
          error : (xhr,textStatus)->
            if textStatus is 'timeout'
              console.log '连接超时，检查你是否使用代理等不稳定的网络。'
            else
              console.log '网络异常，请检查你的网络是否有问题。'
        return

    $.CourseView = new Course.View()

    #init for tabs
    $('.top-tab.tab1').bind 'click',(e)->
      $.CourseView.torecommand()
      console.log 'haha'
    showtab = ()->
      sec = $(@).children('.sec-tabs')
      if sec?
        sec.fadeIn()
    hidetab = ()->
      sec = $(@).children('.sec-tabs')
      if sec?
        sec.fadeOut()
    $('.tab-wrapper').hover showtab,hidetab
    $('.sec-tabs a').click (e)->
      e.preventDefault();
      $.CourseView.tolist()

    #start load pagedata
    $.CourseView.torecommand()
  return

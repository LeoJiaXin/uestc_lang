define (require,exports,module)->
  #加载backbone和语言课程页面的html模板(handlebars)
  Backbone = require 'backbone'
  require 'base/template/link-exam'
  
  #页面加载完后执行如下/jquery的ready
  $ ()->
    #推荐页面，也是语言课程的默认页面Exam
    Exam = 
      Models:{}
      Collections:{}
      Events:{}
    #模型:推荐页面数据
    Exam.Models.Form = Backbone.Model.extend
      default:
        email: ''
        name: ''
        citizenid: ''
        studentid: ''
        phone: ''

    #page for View
    Exam.View = Backbone.View.extend
      form:JST["source/template/link-exam/form.hbs"]
      success:JST["source/template/link-exam/success.hbs"]
      error:JST["source/template/link-exam/error.hbs"]
      el: $('#link-exam')
      toform: (data)->
        $.ExamView.$el.html ''
        $.ExamView.$el.append $.ExamView.form data
        $('#link-exam form').bind 'submit',(e)->
          e.preventDefault()
          $.ajax
            url : path+'/ajax/exam/sign.php'
            dataType : 'json'
            type : 'POST'
            timeout : 8000
            success : (result)->
              if result.state is 'success'
                $.ExamView.tosuccess()
              else
                $.ExamView.toerror()
            error : (xhr,textStatus)->
              if textStatus is 'timeout'
                console.log '连接超时，检查你是否使用代理等不稳定的网络。'
              else
                console.log '网络异常，请检查你的网络是否有问题。'
          return
        return
      tosuccess: ()->
        $.ExamView.$el.html ''
        $.ExamView.$el.append $.ExamView.success()
      toerror: ()->
        $.ExamView.$el.html ''
        $.ExamView.$el.append $.ExamView.error()
        $('#link-exam a').bind 'click',(e)->
          e.preventDefault()
          $.ExamView.toform()

    $.ExamView = new Exam.View()

    #start load pagedata
    $.ExamView.toform()
  return
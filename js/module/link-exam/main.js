(function() {
  define(function(require, exports, module) {
    var Backbone;
    Backbone = require('backbone');
    require('base/template/link-exam');
    $(function() {
      var Exam;
      Exam = {
        Models: {},
        Collections: {},
        Events: {}
      };
      Exam.Models.Form = Backbone.Model.extend({
        "default": {
          email: '',
          name: '',
          citizenid: '',
          studentid: '',
          phone: ''
        }
      });
      Exam.View = Backbone.View.extend({
        form: JST["source/template/link-exam/form.hbs"],
        success: JST["source/template/link-exam/success.hbs"],
        error: JST["source/template/link-exam/error.hbs"],
        el: $('#link-exam'),
        toform: function(data) {
          $.ExamView.$el.html('');
          $.ExamView.$el.append($.ExamView.form(data));
          $('#link-exam form').bind('submit', function(e) {
            e.preventDefault();
            $.ajax({
              url: path + '/ajax/exam/sign.php',
              dataType: 'json',
              type: 'POST',
              timeout: 8000,
              success: function(result) {
                if (result.state === 'success') {
                  return $.ExamView.tosuccess();
                } else {
                  return $.ExamView.toerror();
                }
              },
              error: function(xhr, textStatus) {
                if (textStatus === 'timeout') {
                  return console.log('连接超时，检查你是否使用代理等不稳定的网络。');
                } else {
                  return console.log('网络异常，请检查你的网络是否有问题。');
                }
              }
            });
          });
        },
        tosuccess: function() {
          $.ExamView.$el.html('');
          return $.ExamView.$el.append($.ExamView.success());
        },
        toerror: function() {
          $.ExamView.$el.html('');
          $.ExamView.$el.append($.ExamView.error());
          return $('#link-exam a').bind('click', function(e) {
            e.preventDefault();
            return $.ExamView.toform();
          });
        }
      });
      $.ExamView = new Exam.View();
      return $.ExamView.toform();
    });
  });

}).call(this);

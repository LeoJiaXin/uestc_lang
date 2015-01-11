(function() {
  define(function(require, exports, module) {
    var Backbone;
    Backbone = require('backbone');
    require('base/template/link-exam');
    $(function() {
      var Exam, Router;
      Exam = {
        Views: {},
        Models: {}
      };
      Exam.Models.Main = Backbone.Model.extend({
        defaults: {
          banners: [],
          best: [],
          description: {
            title: '',
            content: ''
          }
        },
        url: path + '/ajax/exam/get-exam-intro.php'
      });
      Exam.Views.Main = Backbone.View.extend({
        template: JST["source/template/link-exam/intro.hbs"],
        el: $('#link-exam'),
        initialize: function() {
          this.listenTo(this.model, 'change', this.render);
        },
        render: function() {
          this.$el.html('');
          this.$el.html(this.template(this.model.attributes));
          $('#banner img').hide();
          $('#banner img').eq(0).fadeIn(function() {
            return Root.Data.run = false;
          });
        }
      });
      Root.Data = {};
      Root.Model = new Exam.Models.Main();
      Root.View = new Exam.Views.Main({
        model: Root.Model
      });
      Router = Backbone.Router.extend({
        routes: {
          '': 'tomain'
        }
      });
      Root.Router = new Router();
      Root.Router.on('route:tomain', function() {
        return Root.Model.fetch();
      });
      return Backbone.history.start();
    });
  });

}).call(this);

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
          var record;
          this.$el.html('');
          this.$el.html(this.template(this.model.attributes));
          $('#exam-sign').attr('href', link_for_sign);
          $('#banner img').hide();
          Root.Data.index = 0;
          Root.Data.run = false;
          record = function() {
            Root.Data.index = $('.banner-switch').index($(this));
            Root.View.play(true);
          };
          $('.banner-switch').bind({
            click: record
          });
          this.play();
        },
        play: function(once) {
          Root.View.setBanner();
          Root.Data.index++;
          if (Root.Data.index >= $('#banner img').length) {
            Root.Data.index = 0;
          }
          if (!once || (once == null)) {
            return setTimeout(Root.View.play, 5000);
          }
        },
        setBanner: function() {
          if ((Root.Data.run != null) && !Root.Data.run) {
            Root.Data.run = true;
            $('#banner img').hide();
            $('#banner .banner-switch').removeClass('select');
            $('#banner .banner-switch').eq(Root.Data.index).addClass('select');
            $('#banner img').eq(Root.Data.index).fadeIn(function() {
              return Root.Data.run = false;
            });
          }
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

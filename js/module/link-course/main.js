(function() {
  define(function(require, exports, module) {
    var Backbone, Utils;
    Backbone = require('backbone');
    require('base/template/link-course');
    Utils = require('base/module/common/utils');
    require('base/module/common/jquerypager');
    $(function() {
      var Course, Root, Router, hidetab, showtab;
      $('.tab-wrapper').children('.sec-tabs').hide();
      Course = {
        Models: {},
        Collections: {},
        Views: {}
      };
      Course.Models.Recommand = Backbone.Model.extend({
        defaults: {
          list: void 0,
          links: void 0
        },
        url: path + '/ajax/course/load-recommand.php'
      });
      Course.Models.List = Backbone.Model.extend({
        defaults: {
          name: '',
          time: '0 hour',
          num: 0,
          max: 0
        }
      });
      Course.Models.Content = Backbone.Model.extend({
        defaults: {
          name: '',
          time: '0 hour',
          num: 0,
          max: 0,
          description: ''
        }
      });
      Course.Models.Side = Backbone.Model.extend({
        url: path + '/ajax/course/load-best-student.php'
      });
      Course.Collections.List = Backbone.Collection.extend({
        model: Course.Models.List,
        pageIndex: 0,
        pageSum: 1,
        sectypeid: void 0,
        url: function() {
          return path + '/ajax/course/load-list.php?page_pos=' + this.pageIndex + (this.sectypeid != null ? '&sec_type=' + this.sectypeid : void 0);
        }
      });
      Course.Views.Recommand = Backbone.View.extend({
        template: JST["source/template/link-course/recommand.hbs"],
        el: $('#link-course'),
        initialize: function() {},
        render: function() {
          this.$el.html('');
          this.$el.html(this.template(this.model.attributes));
          Utils.resize();
        }
      });
      Course.Views.List = Backbone.View.extend({
        template: JST["source/template/link-course/list.hbs"],
        el: $('#link-course'),
        initialize: function() {},
        render: function() {
          var num, tmp, _i, _ref;
          tmp = {
            list: []
          };
          for (num = _i = 0, _ref = this.model.length; 0 <= _ref ? _i < _ref : _i > _ref; num = 0 <= _ref ? ++_i : --_i) {
            tmp.list.push(this.model.models[num].attributes);
          }
          this.$el.html('');
          this.$el.append(this.template(tmp));
          Utils.resize();
          $.pager.createbelow($('#list-pager'), {
            now: this.model.pageIndex + 1,
            header: 1,
            next: 1,
            pageNum: 5,
            max: this.model.pageSum,
            dopage: function(index) {
              return Root.Router.navigate('list/sectype' + Root.List.Model.sectypeid + '/' + (index - 1), {
                replace: true,
                trigger: true
              });
            }
          });
        }
      });
      Course.Views.Content = Backbone.View.extend({
        template: JST["source/template/link-course/content.hbs"],
        el: $('#link-course'),
        initialize: function() {},
        render: function() {
          this.$el.html('');
          this.$el.html(this.template(this.model.attributes));
          return Utils.resize();
        }
      });
      Course.Views.Side = Backbone.View.extend({
        template: JST["source/template/link-course/sidebar.hbs"],
        el: $('#sidebar'),
        initialize: function() {
          this.listenTo(this.model, 'change', this.render);
        },
        render: function() {
          this.$el.html('');
          this.$el.html(this.template(this.model.attributes));
          return Utils.resize();
        }
      });
      Root = {
        Recommand: {},
        List: {},
        Content: {},
        Side: {}
      };
      Root.Recommand.Model = new Course.Models.Recommand();
      Root.List.Model = new Course.Collections.List();
      Root.Content.Model = new Course.Models.Content();
      Root.Side.Model = new Course.Models.Side();
      Root.Recommand.View = new Course.Views.Recommand({
        model: Root.Recommand.Model
      });
      Root.List.View = new Course.Views.List({
        model: Root.List.Model
      });
      Root.Content.View = new Course.Views.Content({
        model: Root.Content.Model
      });
      Root.Side.View = new Course.Views.Side({
        model: Root.Side.Model
      });
      Router = Backbone.Router.extend({
        routes: {
          '': 'torec',
          'list/sectype:sectype/:pageindex': 'tolist',
          'content/:id': 'tocontent'
        },
        checkback: function() {
          if (Root.Side.Model.attributes.list == null) {
            this.navigate('', {
              trigger: true,
              replace: true
            });
            return false;
          }
          return true;
        }
      });
      Root.Router = new Router();
      Root.Router.on('route:torec', function() {
        Root.Recommand.Model.fetch({
          reset: true,
          success: function(result) {
            var link, num, _i, _j, _len, _ref;
            Root.Recommand.View.render();
            $('.sec-tabs').html('');
            for (num = _i = 0; _i <= 3; num = ++_i) {
              $('.top-tab').eq(num + 1).text(result.attributes.group[num].parent);
              _ref = result.attributes.group[num].child;
              for (_j = 0, _len = _ref.length; _j < _len; _j++) {
                link = _ref[_j];
                $('.sec-tabs').eq(num).append('<a href="#/list/sectype' + link.id + '/0">' + link.name + '</a>');
              }
            }
          }
        });
        if (Root.Side.Model.attributes.list == null) {
          Root.Side.Model.fetch();
        }
      });
      Root.Router.on('route:tolist', function(sectypeid, pageIndex) {
        if (this.checkback()) {
          Root.List.Model.sectypeid = sectypeid;
          Root.List.Model.pageIndex = parseInt(pageIndex);
          return Root.List.Model.fetch({
            reset: true,
            success: function() {
              if ((Root.List.Model.models[0] != null) && (Root.List.Model.models[0].attributes.sum != null)) {
                Root.List.Model.pageSum = Root.List.Model.models[0].attributes.sum;
              }
              return Root.List.View.render();
            }
          });
        }
      });
      Root.Router.on('route:tocontent', function(id) {
        if (this.checkback()) {
          return $.ajax({
            url: path + '/ajax/course/load-content.php',
            data: {
              id: id
            },
            dataType: 'json',
            type: 'get',
            timeout: 8000,
            success: function(result) {
              if (result.id != null) {
                Root.Content.Model.set(result);
                return Root.Content.View.render();
              }
            }
          });
        }
      });
      Backbone.history.start();
      showtab = function() {
        var sec;
        sec = $(this).children('.sec-tabs');
        if (sec != null) {
          return sec.fadeIn();
        }
      };
      hidetab = function() {
        var sec;
        sec = $(this).children('.sec-tabs');
        if (sec != null) {
          return sec.fadeOut();
        }
      };
      return $('.tab-wrapper').hover(showtab, hidetab);
    });
  });

}).call(this);

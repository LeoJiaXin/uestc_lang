(function() {
  define(function(require, exports, module) {
    var Backbone;
    Backbone = require('backbone');
    require('base/template/link-employ');
    require('base/module/common/jquerypager');
    $(function() {
      var Employ, Root, Router;
      Employ = {
        Models: {},
        Collections: {},
        Views: {}
      };
      Employ.Models.Recommand = Backbone.Model.extend({
        defaults: {
          list: void 0,
          group: void 0
        },
        url: path + '/ajax/employ/load-recommand.php'
      });
      Employ.Models.List = Backbone.Model.extend({
        defaults: {
          name: '',
          time: '0 hour',
          num: 0,
          max: 0
        }
      });
      Employ.Models.Content = Backbone.Model.extend({
        defaults: {
          name: '',
          time: '0 hour',
          num: 0,
          max: 0,
          description: ''
        }
      });
      Employ.Collections.List = Backbone.Collection.extend({
        model: Employ.Models.List,
        pageIndex: 0,
        pageSum: 0,
        sectypeid: void 0,
        url: function() {
          return path + '/ajax/employ/load-list.php?page_pos=' + this.pageIndex + (this.sectypeid != null ? '&sec_type=' + this.sectypeid : void 0);
        }
      });
      Employ.Views.Recommand = Backbone.View.extend({
        template: JST["source/template/link-employ/recommand.hbs"],
        el: $('#link-employ'),
        initialize: function() {},
        render: function() {
          this.$el.html('');
          this.$el.html(this.template(this.model.attributes));
        }
      });
      Employ.Views.List = Backbone.View.extend({
        template: JST["source/template/link-employ/list.hbs"],
        el: $('#link-employ'),
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
      Employ.Views.Content = Backbone.View.extend({
        template: JST["source/template/link-employ/content.hbs"],
        el: $('#link-employ'),
        initialize: function() {},
        render: function() {
          this.$el.html('');
          return this.$el.html(this.template(this.model.attributes));
        }
      });
      Root = {
        Recommand: {},
        List: {},
        Content: {},
        Side: {}
      };
      Root.Recommand.Model = new Employ.Models.Recommand();
      Root.List.Model = new Employ.Collections.List();
      Root.Content.Model = new Employ.Models.Content();
      Root.Recommand.View = new Employ.Views.Recommand({
        model: Root.Recommand.Model
      });
      Root.List.View = new Employ.Views.List({
        model: Root.List.Model
      });
      Root.Content.View = new Employ.Views.Content({
        model: Root.Content.Model
      });
      Router = Backbone.Router.extend({
        routes: {
          '': 'torec',
          'list/sectype:sectype/:pageindex': 'tolist',
          'content/:id': 'tocontent'
        }
      });
      Root.Router = new Router();
      Root.Router.on('route:torec', function() {
        Root.Recommand.Model.fetch({
          reset: true,
          success: function(result) {
            Root.Recommand.View.render();
          }
        });
      });
      Root.Router.on('route:tolist', function(sectypeid, pageIndex) {
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
      });
      Root.Router.on('route:tocontent', function(id) {
        return $.ajax({
          url: path + '/ajax/employ/load-content.php',
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
      });
      return Backbone.history.start();
    });
  });

}).call(this);

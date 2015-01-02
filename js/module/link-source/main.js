(function() {
  define(function(require, exports, module) {
    var Backbone, Utils;
    Backbone = require('backbone');
    require('base/template/link-source');
    Utils = require('base/module/common/utils');
    require('base/module/common/jquerypager');
    $(function() {
      var Root, Router, Source;
      $('.tab-wrapper').children('.sec-tabs').hide();
      Source = {
        Models: {},
        Collections: {},
        Views: {}
      };
      Source.Models.Recommand = Backbone.Model.extend({
        defaults: {
          list: void 0,
          links: void 0
        },
        url: path + '/ajax/source/load-recommand.php'
      });
      Source.Models.List = Backbone.Model.extend({
        defaults: {
          name: '',
          time: '0 hour',
          num: 0,
          max: 0
        }
      });
      Source.Models.Content = Backbone.Model.extend({
        defaults: {
          name: '',
          time: '0 hour',
          num: 0,
          max: 0,
          description: ''
        }
      });
      Source.Models.Side = Backbone.Model.extend({
        defaults: {
          a: 0
        }
      });
      Source.Collections.List = Backbone.Collection.extend({
        model: Source.Models.List,
        pageIndex: 0,
        pageSum: 0,
        sectypeid: void 0,
        url: function() {
          return path + '/ajax/source/load-list.php?page_pos=' + this.pageIndex + (this.sectypeid != null ? '&sec_type=' + this.sectypeid : void 0);
        }
      });
      Source.Views.Recommand = Backbone.View.extend({
        template: JST["source/template/link-source/recommand.hbs"],
        el: $('#link-source'),
        initialize: function() {},
        render: function() {
          this.$el.html('');
          this.$el.html(this.template(this.model.attributes));
        }
      });
      Source.Views.List = Backbone.View.extend({
        template: JST["source/template/link-source/list.hbs"],
        el: $('#link-source'),
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
      Source.Views.Content = Backbone.View.extend({
        template: JST["source/template/link-source/content.hbs"],
        el: $('#link-source'),
        initialize: function() {},
        render: function() {
          this.$el.html('');
          return this.$el.html(this.template(this.model.attributes));
        }
      });
      Source.Views.Side = Backbone.View.extend({
        template: JST["source/template/link-source/sidebar.hbs"]
      });
      Root = {
        Recommand: {},
        List: {},
        Content: {},
        Side: {}
      };
      Root.Recommand.Model = new Source.Models.Recommand();
      Root.List.Model = new Source.Collections.List();
      Root.Content.Model = new Source.Models.Content();
      Root.Side.Model = new Source.Models.Side();
      Root.Recommand.View = new Source.Views.Recommand({
        model: Root.Recommand.Model
      });
      Root.List.View = new Source.Views.List({
        model: Root.List.Model
      });
      Root.Content.View = new Source.Views.Content({
        model: Root.Content.Model
      });
      Root.Side.View = new Source.Views.Side({
        model: Root.Side.Model
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
            var num, _i;
            Root.Recommand.View.render();
            for (num = _i = 0; _i <= 3; num = ++_i) {
              $('.top-tab').eq(num + 1).html('<a href="#list/sectype' + result.attributes.group[num].id + '/0">' + result.attributes.group[num].name + '</a>');
            }
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
        console.log('yes');
        return $.ajax({
          url: path + '/ajax/source/load-content.php',
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

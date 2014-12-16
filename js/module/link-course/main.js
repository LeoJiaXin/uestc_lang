(function() {
  define(function(require, exports, module) {
    var Backbone, Root;
    Backbone = require('backbone');
    require('base/template/link-course');
    Root = {};
    $(function() {
      var List;
      Root.View = Backbone.View.extend({
        template: JST["source/template/link-course/recommand.hbs"],
        el: $('#link-course'),
        render: function() {
          var data;
          data = {
            recommand_list: [
              {
                title: 'aaa',
                links: [
                  {
                    link: '#',
                    name: 'link1'
                  }, {
                    link: '#',
                    name: 'link2'
                  }, {
                    link: '#',
                    name: 'link3'
                  }, {
                    link: '#',
                    name: 'link1'
                  }, {
                    link: '#',
                    name: 'link2'
                  }, {
                    link: '#',
                    name: 'link3'
                  }, {
                    link: '#',
                    name: 'link1'
                  }, {
                    link: '#',
                    name: 'link2'
                  }, {
                    link: '#',
                    name: 'link3'
                  }, {
                    link: '#',
                    name: 'link1'
                  }, {
                    link: '#',
                    name: 'link2'
                  }, {
                    link: '#',
                    name: 'link3'
                  }
                ]
              }, {
                title: 'bbb',
                links: [
                  {
                    link: '#',
                    name: 'link1'
                  }, {
                    link: '#',
                    name: 'link2'
                  }, {
                    link: '#',
                    name: 'link3'
                  }, {
                    link: '#',
                    name: 'link1'
                  }, {
                    link: '#',
                    name: 'link2'
                  }, {
                    link: '#',
                    name: 'link3'
                  }, {
                    link: '#',
                    name: 'link1'
                  }, {
                    link: '#',
                    name: 'link2'
                  }, {
                    link: '#',
                    name: 'link3'
                  }, {
                    link: '#',
                    name: 'link1'
                  }, {
                    link: '#',
                    name: 'link2'
                  }, {
                    link: '#',
                    name: 'link3'
                  }
                ]
              }, {
                title: 'ccc',
                links: [
                  {
                    link: '#',
                    name: 'link1'
                  }, {
                    link: '#',
                    name: 'link2'
                  }, {
                    link: '#',
                    name: 'link3'
                  }, {
                    link: '#',
                    name: 'link1'
                  }, {
                    link: '#',
                    name: 'link2'
                  }, {
                    link: '#',
                    name: 'link3'
                  }, {
                    link: '#',
                    name: 'link1'
                  }, {
                    link: '#',
                    name: 'link2'
                  }, {
                    link: '#',
                    name: 'link3'
                  }, {
                    link: '#',
                    name: 'link1'
                  }, {
                    link: '#',
                    name: 'link2'
                  }, {
                    link: '#',
                    name: 'link3'
                  }
                ]
              }, {
                title: 'ddd',
                links: [
                  {
                    link: '#',
                    name: 'link1'
                  }, {
                    link: '#',
                    name: 'link2'
                  }, {
                    link: '#',
                    name: 'link3'
                  }, {
                    link: '#',
                    name: 'link1'
                  }, {
                    link: '#',
                    name: 'link2'
                  }, {
                    link: '#',
                    name: 'link3'
                  }, {
                    link: '#',
                    name: 'link1'
                  }, {
                    link: '#',
                    name: 'link2'
                  }, {
                    link: '#',
                    name: 'link3'
                  }, {
                    link: '#',
                    name: 'link1'
                  }, {
                    link: '#',
                    name: 'link2'
                  }, {
                    link: '#',
                    name: 'link3'
                  }
                ]
              }
            ]
          };
          return this.$el.append(this.template(data));
        }
      });
      List = {};
      List.View = Backbone.View.extend({
        template: JST["source/template/link-course/list.hbs"],
        el: $('#link-course'),
        render: function() {
          return this.$el.append(this.template());
        }
      });
      return new Root.View().render();
    });
  });

}).call(this);

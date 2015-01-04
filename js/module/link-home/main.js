(function() {
  define(function(require, exports, module) {
    var Backbone;
    Backbone = require('backbone');
    require('base/template/link-home');
    $(function() {
      var Home;
      Home = {
        Views: {},
        Models: {}
      };
      Home.Models.Images = Backbone.Model.extend({
        defaults: {
          banners: [],
          recent: [
            {
              img: ''
            }, {
              img: ''
            }, {
              img: ''
            }, {
              img: ''
            }
          ]
        },
        url: path + '/ajax/home/images.php'
      });
      Home.Models.Recent = Backbone.Model.extend({
        url: path + '/ajax/home/recent.php',
        initialize: function(main) {
          this.main = main;
          return this.on('change', this.pushrecent);
        },
        pushrecent: function(model) {
          var index, recent, _i, _ref;
          recent = this.main.attributes.recent;
          for (index = _i = 0, _ref = recent.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; index = 0 <= _ref ? ++_i : --_i) {
            recent[index].links = model.attributes.news[index].links;
          }
          return this.main.set({
            recent: recent
          });
        }
      });
      Home.Views.Banner = Backbone.View.extend({
        template: JST["source/template/link-home/banner.hbs"],
        el: $('#banner'),
        initialize: function() {
          return this.listenTo(this.model, 'change', this.render);
        },
        render: function() {
          var a1;
          this.$el.html('');
          this.$el.html(this.template(this.model.attributes));
          $('#banner img').hide();
          $('#banner img').eq(0).fadeIn(function() {
            return Root.Banner.View.run = false;
          });
          a1 = function() {
            if ((Root.Banner.View.run != null) && !Root.Banner.View.run) {
              Root.Banner.View.run = true;
              $('#banner img').hide();
              $('#banner img').eq($('.banner-switch').index($(this))).fadeIn(function() {
                return Root.Banner.View.run = false;
              });
            }
          };
          $('.banner-switch').bind({
            mouseenter: a1
          });
        }
      });
      Home.Views.Recent = Backbone.View.extend({
        template: JST["source/template/link-home/recent.hbs"],
        el: $('#recent-news'),
        initialize: function() {
          return this.listenTo(this.model, 'change', this.render);
        },
        render: function() {
          this.$el.html('');
          return this.$el.html(this.template(this.model.attributes));
        }
      });
      Home.Views.FastLinks = Backbone.View.extend({
        template: JST["source/template/link-home/fast-links.hbs"],
        el: $('#fast-links'),
        render: function() {
          var data;
          data = {
            basepath: path + '/images/home/fast-link/'
          };
          this.$el.html('');
          this.$el.append(this.template(data));
          $('.sec-menu-wrapper').children().hide();
          $('.top-link-active').hide();
          $('.top-link-active').eq(0).show();
          $('.fast-link-top p').eq(0).css('color', '#177BC6');
          $('.sec-menu-wrapper').children().eq(0).show(function() {
            return Root.FastLinks.View.run = false;
          });
          $('.fast-link-top').bind({
            mouseenter: function() {
              if ((Root.FastLinks.View.run != null) && !Root.FastLinks.View.run) {
                Root.FastLinks.View.run = true;
                Root.FastLinks.View.index = $('.fast-link-top').index($(this));
                $('.top-link-active').hide();
                $('.top-link-active').eq(Root.FastLinks.View.index).show();
                $('.fast-link-top p').css('color', '#AAABAD');
                $('.fast-link-top p').eq(Root.FastLinks.View.index).css('color', '#177BC6');
                return $('.triangle').animate({
                  left: (Root.FastLinks.View.index * 10 - 20) + 'em'
                }, 'normal', 'swing', function() {
                  $('.sec-menu-wrapper').children().hide();
                  return $('.sec-menu-wrapper').children().eq(Root.FastLinks.View.index).fadeIn(function() {
                    return Root.FastLinks.View.run = false;
                  });
                });
              }
            }
          });
          return $('.fast-link-sec').bind({
            mouseenter: function() {
              return $(this).find('p').css('color', '#177BC6');
            },
            mouseout: function() {
              return $(this).find('p').css('color', '#AAABAD');
            }
          });
        }
      });
      Root.Banner = {};
      Root.Recent = {};
      Root.FastLinks = {};
      Root.Model = new Home.Models.Images();
      Root.Recent.Model = new Home.Models.Recent(Root.Model);
      Root.Banner.View = new Home.Views.Banner({
        model: Root.Model
      });
      Root.Recent.View = new Home.Views.Recent({
        model: Root.Model
      });
      Root.FastLinks.View = new Home.Views.FastLinks();
      return Root.Model.fetch({
        success: function() {
          Root.FastLinks.View.render();
          return Root.Recent.Model.fetch({
            reset: true,
            success: function() {
              return Root.Recent.View.render();
            }
          });
        }
      });
    });
  });

}).call(this);

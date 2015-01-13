(function() {
  define(function(require, exports, module) {
    var Backbone;
    Backbone = require('backbone');
    require('base/template/link-home');
    $(function() {
      var Home, link, link_text, links, main_link_prefix, pos, _i, _ref;
      Home = {
        Views: {},
        Models: {}
      };
      main_link_prefix = ['', '', '', '', ''];
      links = $('#menu a');
      for (pos = _i = 0, _ref = links.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; pos = 0 <= _ref ? ++_i : --_i) {
        link = links.eq(pos);
        link_text = link.html();
        if (link_text.search('课程') !== -1) {
          main_link_prefix[0] = link.attr('href');
        } else if (link_text.search('资源') !== -1) {
          main_link_prefix[1] = link.attr('href');
        } else if (link_text.search('就业') !== -1) {
          main_link_prefix[2] = link.attr('href');
        } else if (link_text.search('动态') !== -1) {
          main_link_prefix[3] = link.attr('href');
        } else if (link_text.search('考试') !== -1) {
          main_link_prefix[4] = link.attr('href');
        }
      }
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
          var index, recent, _j, _ref1;
          recent = this.main.attributes.recent;
          for (index = _j = 0, _ref1 = recent.length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; index = 0 <= _ref1 ? ++_j : --_j) {
            recent[index].path = main_link_prefix[index];
            recent[index].links = model.attributes.news[index].links;
          }
          return this.main.set({
            recent: recent
          });
        }
      });
      Home.Models.FastLinks = Backbone.Model.extend({
        url: path + '/ajax/home/fast-links.php'
      });
      Home.Views.Banner = Backbone.View.extend({
        template: JST["source/template/link-home/banner.hbs"],
        el: $('#banner'),
        initialize: function() {
          return this.listenTo(this.model, 'change', this.render);
        },
        render: function() {
          var record;
          this.$el.html('');
          this.$el.html(this.template(this.model.attributes));
          $('#banner img').hide();
          Root.Banner.View.index = 0;
          Root.Banner.View.run = false;
          record = function() {
            Root.Banner.View.index = $('.banner-switch').index($(this));
            Root.Banner.View.play(true);
          };
          $('.banner-switch').bind({
            click: record
          });
          this.play();
        },
        play: function(once) {
          Root.Banner.View.setBanner();
          Root.Banner.View.index++;
          if (Root.Banner.View.index >= $('#banner img').length) {
            Root.Banner.View.index = 0;
          }
          if (!once || (once == null)) {
            return setTimeout(Root.Banner.View.play, 5000);
          }
        },
        setBanner: function() {
          if ((Root.Banner.View.run != null) && !Root.Banner.View.run) {
            Root.Banner.View.run = true;
            $('#banner img').hide();
            $('#banner .banner-switch').removeClass('select');
            $('#banner .banner-switch').eq(Root.Banner.View.index).addClass('select');
            $('#banner img').eq(Root.Banner.View.index).fadeIn(function() {
              return Root.Banner.View.run = false;
            });
          }
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
        initialize: function() {
          return this.listenTo(this.model, 'change', this.render);
        },
        render: function() {
          var data;
          data = {
            basepath: path + '/images/home/fast-link/',
            fast: this.model.attributes.fast,
            course: main_link_prefix[0],
            extra: main_link_prefix[4]
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
      Root.FastLinks.Model = new Home.Models.FastLinks();
      Root.Recent.Model = new Home.Models.Recent(Root.Model);
      Root.Banner.View = new Home.Views.Banner({
        model: Root.Model
      });
      Root.Recent.View = new Home.Views.Recent({
        model: Root.Model
      });
      Root.FastLinks.View = new Home.Views.FastLinks({
        model: Root.FastLinks.Model
      });
      return Root.Model.fetch({
        success: function() {
          Root.FastLinks.Model.fetch();
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

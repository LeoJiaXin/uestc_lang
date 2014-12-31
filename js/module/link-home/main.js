(function() {
  define(function(require, exports, module) {
    var Backbone;
    Backbone = require('backbone');
    require('base/template/link-home');
    $(function() {
      var Home;
      Home = {
        Views: {},
        Models: {},
        Collections: {},
        Events: {}
      };
      Home.Views.Recent = Backbone.View.extend({
        template: JST["source/template/link-home/recent.hbs"],
        el: $('#recent-news'),
        render: function() {
          $.ajax({
            url: path + '/ajax/home/recent.php',
            dataType: 'json',
            type: 'GET',
            timeout: 8000,
            success: function(result) {
              $.HomeRecent.$el.html('');
              return $.HomeRecent.$el.append($.HomeRecent.template(result));
            },
            error: function(xhr, textStatus) {
              if (textStatus === 'timeout') {
                return console.log('连接超时，检查你是否使用代理等不稳定的网络。');
              } else {
                return console.log('网络异常，请检查你的网络是否有问题。');
              }
            }
          });
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
          $('.sec-menu-wrapper').children().eq(0).show();
          $('.fast-link-top').bind({
            mouseenter: function() {
              $.HomeFastLinks.index = $('.fast-link-top').index($(this));
              $('.top-link-active').hide();
              $('.top-link-active').eq($.HomeFastLinks.index).show();
              $('.fast-link-top p').css('color', '#AAABAD');
              $('.fast-link-top p').eq($.HomeFastLinks.index).css('color', '#177BC6');
              return $('.triangle').animate({
                left: ($.HomeFastLinks.index * 10 - 20) + 'em'
              }, 'normal', 'swing', function() {
                $('.sec-menu-wrapper').children().hide();
                return $('.sec-menu-wrapper').children().eq($.HomeFastLinks.index).fadeIn();
              });
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
      Home.Views.Banner = Backbone.View.extend({
        template: JST["source/template/link-home/banner.hbs"],
        el: $('#banner'),
        render: function() {
          $.ajax({
            url: path + '/ajax/home/load-banner-image.php',
            dataType: 'json',
            type: 'GET',
            timeout: 8000,
            success: function(result) {
              var a1;
              $.HomeBanner.$el.html('');
              $.HomeBanner.$el.append($.HomeBanner.template(result));
              $('#banner img').hide();
              $('#banner img').eq(0).fadeIn();
              a1 = function() {
                $('#banner img').hide();
                return $('#banner img').eq($('.banner-switch').index($(this))).fadeIn();
              };
              return $('.banner-switch').bind({
                mouseenter: a1
              });
            },
            error: function(xhr, textStatus) {
              if (textStatus === 'timeout') {
                return console.log('连接超时，检查你是否使用代理等不稳定的网络。');
              } else {
                return console.log('网络异常，请检查你的网络是否有问题。');
              }
            }
          });
        }
      });
      $.HomeRecent = new Home.Views.Recent();
      $.HomeFastLinks = new Home.Views.FastLinks();
      $.HomeBanner = new Home.Views.Banner();
      $.HomeRecent.render();
      $.HomeFastLinks.render();
      return $.HomeBanner.render();
    });
  });

}).call(this);

(function() {
  define(function(require, exports, module) {
    var Backbone;
    $('.tab-wrapper').children('.sec-tabs').hide();
    Backbone = require('backbone');
    require('base/template/link-course');
    $(function() {
      var Course, Sidebar, hidetab, showtab;
      Course = {
        Models: {},
        Collections: {},
        Events: {}
      };
      Course.View = Backbone.View.extend({
        recommand: JST["source/template/link-course/recommand.hbs"],
        list: JST["source/template/link-course/list.hbs"],
        content: JST["source/template/link-course/content.hbs"],
        el: $('#link-course'),
        torecommand: function() {
          $.ajax({
            url: path + '/ajax/course/load-recommand.php',
            dataType: 'json',
            type: 'GET',
            timeout: 8000,
            success: function(result) {
              $.CourseView.$el.html('');
              $.CourseView.$el.append($.CourseView.recommand(result));
              return $('.list-content a').click(function(e) {
                e.preventDefault();
                return $.CourseView.tocontent();
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
        },
        tolist: function() {
          $.ajax({
            url: path + '/ajax/course/load-list.php',
            dataType: 'json',
            type: 'GET',
            timeout: 8000,
            success: function(result) {
              $.CourseView.$el.html('');
              $.CourseView.$el.append($.CourseView.list(result));
              $('.table-column-3 a').bind('click', function(e) {
                e.preventDefault();
                return $.CourseView.tocontent();
              });
              require('base/module/common/jquerypager');
              return $.pager.createbelow($('#list-pager'), {
                header: 1,
                next: 1,
                pageNum: 5,
                max: 20,
                dopage: function(index) {
                  return console.log('you have click page' + index);
                }
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
        },
        tocontent: function() {
          $.ajax({
            url: path + '/ajax/course/load-content.php',
            dataType: 'json',
            type: 'GET',
            timeout: 8000,
            success: function(result) {
              $.CourseView.$el.html('');
              return $.CourseView.$el.append($.CourseView.content(result));
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
      Sidebar = {};
      Sidebar.View = Backbone.View.extend({
        template: JST["source/template/link-course/sidebar.hbs"],
        el: $('#sidebar'),
        render: function() {
          $.ajax({
            url: path + '/ajax/course/load-best-student.php',
            dataType: 'json',
            type: 'GET',
            timeout: 8000,
            success: function(result) {
              $.SidebarView.$el.html('');
              return $.SidebarView.$el.append($.SidebarView.template(result));
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
      $.CourseView = new Course.View();
      $.SidebarView = new Sidebar.View();
      $('.top-tab.tab1').bind('click', function(e) {
        $.CourseView.torecommand();
        return console.log('haha');
      });
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
      $('.tab-wrapper').hover(showtab, hidetab);
      $('.sec-tabs a').click(function(e) {
        e.preventDefault();
        return $.CourseView.tolist();
      });
      $.CourseView.torecommand();
      $.SidebarView.render();
    });
  });

}).call(this);

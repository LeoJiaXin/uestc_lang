(function() {
  define(function(require, exports, module) {
    var Backbone;
    Backbone = require('backbone');
    require('base/template/link-source');
    $(function() {
      var Sidebar, Source;
      Source = {
        Models: {},
        Collections: {},
        Events: {}
      };
      Source.View = Backbone.View.extend({
        recommand: JST["source/template/link-source/recommand.hbs"],
        list: JST["source/template/link-source/list.hbs"],
        content: JST["source/template/link-source/content.hbs"],
        el: $('#link-source'),
        torecommand: function() {
          $.ajax({
            url: path + '/ajax/source/load-recommand.php',
            dataType: 'json',
            type: 'GET',
            timeout: 8000,
            success: function(result) {
              $.SourceView.$el.html('');
              $.SourceView.$el.append($.SourceView.recommand(result));
              return $('.list-content a').click(function(e) {
                e.preventDefault();
                return $.SourceView.tocontent();
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
            url: path + '/ajax/source/load-list.php',
            dataType: 'json',
            type: 'GET',
            timeout: 8000,
            success: function(result) {
              $.SourceView.$el.html('');
              $.SourceView.$el.append($.SourceView.list(result));
              $('.table-column-3 a').bind('click', function(e) {
                e.preventDefault();
                return $.SourceView.tocontent();
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
            url: path + '/ajax/source/load-content.php',
            dataType: 'json',
            type: 'GET',
            timeout: 8000,
            success: function(result) {
              $.SourceView.$el.html('');
              return $.SourceView.$el.append($.SourceView.content(result));
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
        template: JST["source/template/link-source/sidebar.hbs"],
        el: $('#sidebar'),
        render: function() {
          $.ajax({
            url: path + '/ajax/source/load-hot-download.php',
            dataType: 'json',
            type: 'GET',
            timeout: 8000,
            success: function(result) {
              $.SidebarView.$el.html('');
              $.SidebarView.$el.append($.SidebarView.template(result));
              return $('#sidebar a').bind('click', function(e) {
                e.preventDefault();
                return $.SourceView.tocontent();
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
      $.SourceView = new Source.View();
      $.SidebarView = new Sidebar.View();
      $('.top-tab.tab1').bind('click', function(e) {
        return $.SourceView.torecommand();
      });
      $('.tab2,.tab3,.tab4,.tab5').css('cursor', 'pointer').click(function(e) {
        e.preventDefault();
        return $.SourceView.tolist();
      });
      $.SourceView.torecommand();
      return $.SidebarView.render();
    });
  });

}).call(this);

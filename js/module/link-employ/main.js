(function() {
  define(function(require, exports, module) {
    var Backbone;
    Backbone = require('backbone');
    require('base/template/link-employ');
    $(function() {
      var Employ;
      Employ = {
        Models: {},
        Collections: {},
        Events: {}
      };
      Employ.View = Backbone.View.extend({
        recommand: JST["source/template/link-employ/recommand.hbs"],
        list: JST["source/template/link-employ/list.hbs"],
        content: JST["source/template/link-employ/content.hbs"],
        el: $('#link-employ'),
        torecommand: function() {
          $.ajax({
            url: path + '/ajax/employ/load-recommand.php',
            dataType: 'json',
            type: 'GET',
            timeout: 8000,
            success: function(result) {
              $.EmployView.$el.html('');
              $.EmployView.$el.append($.EmployView.recommand(result));
              $('.more').bind('click', function(e) {
                e.preventDefault();
                return $.EmployView.tolist();
              });
              return $('.employ-big a,.employ-small a').bind('click', function(e) {
                e.preventDefault();
                return $.EmployView.tocontent();
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
            url: path + '/ajax/employ/load-list.php',
            dataType: 'json',
            type: 'GET',
            timeout: 8000,
            success: function(result) {
              $.EmployView.$el.html('');
              $.EmployView.$el.append($.EmployView.list(result));
              $('.table-column-3 a').bind('click', function(e) {
                e.preventDefault();
                return $.EmployView.tocontent();
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
            url: path + '/ajax/employ/load-content.php',
            dataType: 'json',
            type: 'GET',
            timeout: 8000,
            success: function(result) {
              $.EmployView.$el.html('');
              return $.EmployView.$el.append($.EmployView.content(result));
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
      $.EmployView = new Employ.View();
      return $.EmployView.torecommand();
    });
  });

}).call(this);

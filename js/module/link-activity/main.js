(function() {
  define(function(require, exports, module) {
    var Backbone;
    Backbone = require('backbone');
    require('base/template/link-activity');
    $(function() {
      var Activity;
      Activity = {
        Models: {},
        Collections: {},
        Events: {}
      };
      Activity.View = Backbone.View.extend({
        recommand: JST["source/template/link-activity/recommand.hbs"],
        list: JST["source/template/link-activity/list.hbs"],
        content: JST["source/template/link-activity/content.hbs"],
        el: $('#link-activity'),
        torecommand: function() {
          $.ajax({
            url: path + '/ajax/activity/load-recommand.php',
            dataType: 'json',
            type: 'GET',
            timeout: 8000,
            success: function(result) {
              $.ActivityView.$el.html('');
              $.ActivityView.$el.append($.ActivityView.recommand(result));
              $('.more').bind('click', function(e) {
                e.preventDefault();
                return $.ActivityView.tolist();
              });
              return $('.latest-activity a,.activity a').bind('click', function(e) {
                e.preventDefault();
                return $.ActivityView.tocontent();
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
            url: path + '/ajax/activity/load-list.php',
            dataType: 'json',
            type: 'GET',
            timeout: 8000,
            success: function(result) {
              $.ActivityView.$el.html('');
              $.ActivityView.$el.append($.ActivityView.list(result));
              $('.table-column-3 a').bind('click', function(e) {
                e.preventDefault();
                return $.ActivityView.tocontent();
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
            url: path + '/ajax/activity/load-content.php',
            dataType: 'json',
            type: 'GET',
            timeout: 8000,
            success: function(result) {
              $.ActivityView.$el.html('');
              return $.ActivityView.$el.append($.ActivityView.content(result));
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
      $.ActivityView = new Activity.View();
      return $.ActivityView.torecommand();
    });
  });

}).call(this);

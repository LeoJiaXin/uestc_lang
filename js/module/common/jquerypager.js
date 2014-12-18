(function() {
  define(function(require, exports, module) {
    $.pager = {};
    $.pager.setState = function(isactive) {
      if (isactive) {
        this.css($.pager.selected).hover($.pager.selectedevent, $.pager.selectedevent);
      } else {
        this.css($.pager.down).hover($.pager.upevent, $.pager.downevent);
      }
      return this;
    };
    $.pager.setpage = function(index) {
      var begin, len, now, num, num_2, _i, _ref;
      if ((index != null) && !typeof index === "number") {
        return;
      }
      num_2 = Math.floor(this.num / 2);
      if (this.max < this.num) {
        begin = 1;
        len = this.max;
        now = index = (function() {
          switch (false) {
            case !(index < 1):
              return 1;
            case !(index > len):
              return len;
            default:
              return index;
          }
        })();
      } else {
        if (index < 1) {
          index = 1;
        } else if (index > this.max) {
          index = this.max;
        }
        if (index <= num_2) {
          begin = 1;
          len = this.num;
          now = index;
        } else if (index >= this.max - num_2 + 1) {
          begin = this.max - this.num + 2;
          len = this.max - this.num;
          now = index - begin + 1;
        } else {
          begin = index - num_2;
          len = this.num;
          now = num_2 + 1;
        }
      }
      for (num = _i = 1, _ref = this.pages.length - 1; 1 <= _ref ? _i <= _ref : _i >= _ref; num = 1 <= _ref ? ++_i : --_i) {
        this.pages[num].text((begin + num - 1) + '');
      }
      this.setState.call(this.select, false);
      this.select = this.pages[now];
      this.setState.call(this.select, true);
      return index;
    };
    return $.pager.createbelow = function(root, options) {
      var clickevent, finalevent, finalpage, firstevent, firstpage, lastevent, lastpage, max, nextevent, nextpage, num, pagelength, pages, _i, _j, _k;
      if ((options == null) || (root == null)) {
        return;
      }
      this.root = root;
      this.down = {
        'position': 'relative',
        'float': 'left',
        'margin': '0 0.3em',
        'padding': '0.3em 0.7em',
        'background-color': '#fff',
        'color': '#0099CC',
        'border': '2px solid #0099CC'
      };
      this.up = {
        'background-color': '#0099CC',
        'color': '#fff',
        'cursor': 'pointer'
      };
      this.selected = {
        'background-color': '#fff',
        'color': '#000',
        'border': '2px solid #fff'
      };
      this.downevent = function() {
        return $(this).css($.pager.down);
      };
      this.upevent = function() {
        return $(this).css($.pager.up);
      };
      this.selectedevent = function() {
        return $(this).css($.pager.selected);
      };
      pages = [];
      max = options.max != null ? options.max : 5;
      num = options.pageNum != null ? options.pageNum : 5;
      pagelength = max > num ? num : max;
      for (num = _i = 0; 0 <= pagelength ? _i <= pagelength : _i >= pagelength; num = 0 <= pagelength ? ++_i : --_i) {
        pages.push($('<div></div>').text(num + ''));
      }
      for (num = _j = 1; 1 <= pagelength ? _j <= pagelength : _j >= pagelength; num = 1 <= pagelength ? ++_j : --_j) {
        root.append($.pager.setState.call(pages[num], false));
      }
      if (options.header != null) {
        firstpage = $.pager.setState.call($('<div>首页</div>'), false);
        pages[1].before(firstpage);
        finalpage = $.pager.setState.call($('<div>末页</div>'), false);
        pages[pages.length - 1].after(finalpage);
      }
      if (options.next != null) {
        lastpage = $.pager.setState.call($('<div>上一页</div>'), false);
        pages[1].before(lastpage);
        nextpage = $.pager.setState.call($('<div>下一页</div>'), false);
        pages[pages.length - 1].after(nextpage);
      }
      root.append('<div class=\'clear\'></div>');
      this.pages = pages;
      this.index = 1;
      this.max = max;
      this.num = num;
      this.select = pages[1];
      $.pager.setState.call(this.select, true);
      clickevent = function() {
        $.pager.index = $.pager.setpage(parseInt($(this).text()));
        if ((options.dopage != null) && typeof options.dopage === 'function') {
          return options.dopage($.pager.index);
        }
      };
      firstevent = function() {
        $.pager.index = $.pager.setpage(1);
        if ((options.dopage != null) && typeof options.dopage === 'function') {
          return options.dopage($.pager.index);
        }
      };
      finalevent = function() {
        $.pager.index = $.pager.setpage($.pager.max);
        if ((options.dopage != null) && typeof options.dopage === 'function') {
          return options.dopage($.pager.index);
        }
      };
      lastevent = function() {
        $.pager.index = $.pager.setpage($.pager.index - 1);
        if ((options.dopage != null) && typeof options.dopage === 'function') {
          return options.dopage($.pager.index);
        }
      };
      nextevent = function() {
        $.pager.index = $.pager.setpage($.pager.index + 1);
        if ((options.dopage != null) && typeof options.dopage === 'function') {
          return options.dopage($.pager.index);
        }
      };
      for (num = _k = 1; 1 <= pagelength ? _k <= pagelength : _k >= pagelength; num = 1 <= pagelength ? ++_k : --_k) {
        pages[num].click(clickevent);
      }
      firstpage.click(firstevent);
      finalpage.click(finalevent);
      lastpage.click(lastevent);
      nextpage.click(nextevent);
    };
  });

}).call(this);

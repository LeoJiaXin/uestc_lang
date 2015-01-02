define (require,exports,module)->
  $.pager = {}
  $.pager.setState = (isactive)->
    if isactive
      @css($.pager.selected).hover($.pager.selectedevent,$.pager.selectedevent)
    else
      @css($.pager.down).hover($.pager.upevent,$.pager.downevent)
    return @
  $.pager.setpage = (index)->
    return if index? and not typeof index is "number"
    num_2 = Math.floor(@num/2)
    if @max<@num
      begin = 1
      len = @max
      now = index = switch
        when index<1 then 1
        when index>len then len
        else index
    else
      if index<1
        index = 1
      else if index>@max
        index = @max
      if index<=num_2
        begin = 1
        len = @num
        now = index
      else if index >= @max-num_2+1
        begin = @max-@num+2
        len = @max-@num
        now = index-begin+1
      else
        begin = index-num_2
        len = @num
        now = num_2+1
    @pages[num].text((begin+num-1)+'') for num in [1..(@pages.length-1)]
    @setState.call(@select,false)
    @select = @pages[now]
    @setState.call(@select,true)
    return index
  $.pager.createbelow = (root,options)->
    #initialize
    return if not options? or not root?
    @root = root
    @down =  
      'position': 'relative'
      'float': 'left'
      'margin': '0 0.3em'
      'padding': '0.3em 0.7em'
      'background-color': '#fff'
      'color': '#0099CC'
      'border': '2px solid #0099CC'
    @up = 
      'background-color': '#0099CC'
      'color': '#fff'
      'cursor': 'pointer'
    @selected = 
      'background-color': '#fff'
      'color': '#000'
      'border': '2px solid #fff'
    @downevent = ()-> $(this).css($.pager.down)
    @upevent = ()-> $(this).css($.pager.up)
    @selectedevent = ()-> $(this).css($.pager.selected)
    pages = [];
    max = if options.max? then options.max else 5
    num = if options.pageNum? then options.pageNum else 5
    pagelength = if max>num then num else max
    pages.push($('<div></div>').text(num+'')) for num in [0..pagelength]
    root.append $.pager.setState.call(pages[num],false) for num in [1..pagelength]
    if options.header?
      firstpage=$.pager.setState.call($('<div>首页</div>'),false)
      pages[1].before(firstpage)
      finalpage=$.pager.setState.call($('<div>末页</div>'),false)
      pages[pages.length-1].after(finalpage)
    if options.next?
      lastpage= $.pager.setState.call($('<div>上一页</div>'),false)
      pages[1].before(lastpage)
      nextpage=$.pager.setState.call($('<div>下一页</div>'),false)
      pages[pages.length-1].after(nextpage)
    root.append '<div class=\'clear\'></div>'
    @pages = pages
    @index = if options.now? then options.now else 0
    @max = max
    @num = num
    @select = pages[@index]
    $.pager.setState.call(@select,true)

    #event
    clickevent = ()->
      $.pager.index = $.pager.setpage(parseInt($(this).text()))
      options.dopage($.pager.index) if options.dopage? and typeof options.dopage is 'function'
    firstevent = ()->
      $.pager.index = $.pager.setpage(1)
      options.dopage($.pager.index) if options.dopage? and typeof options.dopage is 'function'
    finalevent = ()->
      $.pager.index = $.pager.setpage($.pager.max)
      options.dopage($.pager.index) if options.dopage? and typeof options.dopage is 'function'
    lastevent = ()->
      $.pager.index = $.pager.setpage($.pager.index-1)
      options.dopage($.pager.index) if options.dopage? and typeof options.dopage is 'function'
    nextevent = ()->
      $.pager.index = $.pager.setpage($.pager.index+1)
      options.dopage($.pager.index) if options.dopage? and typeof options.dopage is 'function'
    pages[num].click(clickevent) for num in [1..pagelength]
    firstpage.click(firstevent)
    finalpage.click(finalevent)
    lastpage.click(lastevent)
    nextpage.click(nextevent)
    return 

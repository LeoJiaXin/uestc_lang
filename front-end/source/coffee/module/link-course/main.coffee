define (require,exports,module)->
  Backbone = require 'backbone'
  require 'base/template/link-course'
  Root = {}
  $ ()->
    Root.View = Backbone.View.extend
      template:JST["source/template/link-course/recommand.hbs"]
      el: $('#link-course')
      render: ()->
        data = 
          recommand_list: [
            {
              title:'aaa',
              links:[
                {link:'#',name:'link1'},{link:'#',name:'link2'},{link:'#',name:'link3'},{link:'#',name:'link1'},{link:'#',name:'link2'},{link:'#',name:'link3'},{link:'#',name:'link1'},{link:'#',name:'link2'},{link:'#',name:'link3'},{link:'#',name:'link1'},{link:'#',name:'link2'},{link:'#',name:'link3'}
              ]
            },{
              title:'bbb',
              links:[
                {link:'#',name:'link1'},{link:'#',name:'link2'},{link:'#',name:'link3'},{link:'#',name:'link1'},{link:'#',name:'link2'},{link:'#',name:'link3'},{link:'#',name:'link1'},{link:'#',name:'link2'},{link:'#',name:'link3'},{link:'#',name:'link1'},{link:'#',name:'link2'},{link:'#',name:'link3'}
              ]
            },{
              title:'ccc',
              links:[
                {link:'#',name:'link1'},{link:'#',name:'link2'},{link:'#',name:'link3'},{link:'#',name:'link1'},{link:'#',name:'link2'},{link:'#',name:'link3'},{link:'#',name:'link1'},{link:'#',name:'link2'},{link:'#',name:'link3'},{link:'#',name:'link1'},{link:'#',name:'link2'},{link:'#',name:'link3'}
              ]
            },{
              title:'ddd',
              links:[
                {link:'#',name:'link1'},{link:'#',name:'link2'},{link:'#',name:'link3'},{link:'#',name:'link1'},{link:'#',name:'link2'},{link:'#',name:'link3'},{link:'#',name:'link1'},{link:'#',name:'link2'},{link:'#',name:'link3'},{link:'#',name:'link1'},{link:'#',name:'link2'},{link:'#',name:'link3'}
              ]
            }]
        @$el.append @template data

    List = {}
    List.View = Backbone.View.extend
      template:JST["source/template/link-course/list.hbs"]
      el: $('#link-course')
      render: ()->
        @$el.append @template()

    new Root.View().render()
    #new List.View().render()
  return
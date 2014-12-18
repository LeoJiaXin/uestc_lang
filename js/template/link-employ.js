(function() { define(function(require, exports, module) { require('handlebars');this.JST=this.JST||{},this.JST["source/template/link-employ/content.hbs"]=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f="function",g=b.helperMissing,h=this.escapeExpression;return"<h1>"+h((e=null!=(e=b.title||(null!=a?a.title:a))?e:g,typeof e===f?e.call(a,{name:"title",hash:{},data:d}):e))+"</h1>\n<div>"+h((e=null!=(e=b.content||(null!=a?a.content:a))?e:g,typeof e===f?e.call(a,{name:"content",hash:{},data:d}):e))+"</div>"},useData:!0}),this.JST["source/template/link-employ/list.hbs"]=Handlebars.template({1:function(a,b,c,d){var e,f="function",g=b.helperMissing,h=this.escapeExpression;return'  <div class="table-row">\n    <div class="table-column-3"><a href="#">'+h((e=null!=(e=b.a||(null!=a?a.a:a))?e:g,typeof e===f?e.call(a,{name:"a",hash:{},data:d}):e))+'</a></div>\n    <div class="table-column-3">'+h((e=null!=(e=b.b||(null!=a?a.b:a))?e:g,typeof e===f?e.call(a,{name:"b",hash:{},data:d}):e))+'</div>\n    <div class="table-column-3">'+h((e=null!=(e=b.c||(null!=a?a.c:a))?e:g,typeof e===f?e.call(a,{name:"c",hash:{},data:d}):e))+'</div>\n    <div class="table-column-3">'+h((e=null!=(e=b.d||(null!=a?a.d:a))?e:g,typeof e===f?e.call(a,{name:"d",hash:{},data:d}):e))+'</div>\n    <div class="clear"></div>\n  </div>\n'},compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f='<div class="table">\n  <div class="table-row table-header">\n    <div class="table-column-3">col1</div>\n    <div class="table-column-3">col2</div>\n    <div class="table-column-3">col3</div>\n    <div class="table-column-3">col4</div>\n    <div class="clear"></div>\n  </div>\n';return e=b.each.call(a,null!=a?a.list:a,{name:"each",hash:{},fn:this.program(1,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+'</div>\n<div id="list-pager"></div>'},useData:!0}),this.JST["source/template/link-employ/recommand.hbs"]=Handlebars.template({1:function(a,b,c,d,e){var f,g=this.lambda,h=this.escapeExpression,i="function",j=b.helperMissing;return'  <div class="employ-big">\n    <img src="'+h(g(null!=e[1]?e[1].basepath:e[1],a))+"/images/"+h((f=null!=(f=b.img||(null!=a?a.img:a))?f:j,typeof f===i?f.call(a,{name:"img",hash:{},data:d}):f))+'" alt="">\n    <div class="employ-content">\n      <a href="#">'+h((f=null!=(f=b.title||(null!=a?a.title:a))?f:j,typeof f===i?f.call(a,{name:"title",hash:{},data:d}):f))+"</a>\n        <p>"+h((f=null!=(f=b.desc||(null!=a?a.desc:a))?f:j,typeof f===i?f.call(a,{name:"desc",hash:{},data:d}):f))+'</p>\n    </div>\n    <div class="clear"></div>\n  </div>\n'},3:function(a,b,c,d){var e,f="function",g=b.helperMissing,h=this.escapeExpression;return'  <div class="employ-small">\n    <a href="#">'+h((e=null!=(e=b.title||(null!=a?a.title:a))?e:g,typeof e===f?e.call(a,{name:"title",hash:{},data:d}):e))+"</a>\n    <p>"+h((e=null!=(e=b.desc||(null!=a?a.desc:a))?e:g,typeof e===f?e.call(a,{name:"desc",hash:{},data:d}):e))+"</p>\n  </div>\n"},compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d,e){var f,g='<div class="employ-type employ-1">\n  <h3>abroad<a href="#" class="more">more</a></h3>\n';return f=b.each.call(a,null!=(f=null!=a?a.abroad:a)?f.big:f,{name:"each",hash:{},fn:this.program(1,d,e),inverse:this.noop,data:d}),null!=f&&(g+=f),f=b.each.call(a,null!=(f=null!=a?a.abroad:a)?f.small:f,{name:"each",hash:{},fn:this.program(3,d,e),inverse:this.noop,data:d}),null!=f&&(g+=f),g+='</div>\n<div class="employ-type employ-2">\n  <h3>study<a href="#" class="more">more</a></h3>\n',f=b.each.call(a,null!=(f=null!=a?a.study:a)?f.big:f,{name:"each",hash:{},fn:this.program(1,d,e),inverse:this.noop,data:d}),null!=f&&(g+=f),f=b.each.call(a,null!=(f=null!=a?a.study:a)?f.small:f,{name:"each",hash:{},fn:this.program(3,d,e),inverse:this.noop,data:d}),null!=f&&(g+=f),g+='</div>\n<div class="employ-type employ-3">\n  <h3>work<a href="#" class="more">more</a></h3>\n',f=b.each.call(a,null!=(f=null!=a?a.work:a)?f.big:f,{name:"each",hash:{},fn:this.program(1,d,e),inverse:this.noop,data:d}),null!=f&&(g+=f),f=b.each.call(a,null!=(f=null!=a?a.work:a)?f.small:f,{name:"each",hash:{},fn:this.program(3,d,e),inverse:this.noop,data:d}),null!=f&&(g+=f),g+"</div>"},useData:!0,useDepths:!0});});}).call(this);
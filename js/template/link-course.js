(function() { define(function(require, exports, module) { require('handlebars');this.JST=this.JST||{},this.JST["source/template/link-course/content.hbs"]=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f,g="function",h=b.helperMissing,i=this.escapeExpression,j="<h1>"+i((f=null!=(f=b.name||(null!=a?a.name:a))?f:h,typeof f===g?f.call(a,{name:"name",hash:{},data:d}):f))+"</h1>\n<div>";return f=null!=(f=b.description||(null!=a?a.description:a))?f:h,e=typeof f===g?f.call(a,{name:"description",hash:{},data:d}):f,null!=e&&(j+=e),j+"</div>"},useData:!0}),this.JST["source/template/link-course/list.hbs"]=Handlebars.template({1:function(a,b,c,d){var e,f="function",g=b.helperMissing,h=this.escapeExpression;return'  <div class="table-row">\n    <div class="table-column-3"><a href="#content/'+h((e=null!=(e=b.id||(null!=a?a.id:a))?e:g,typeof e===f?e.call(a,{name:"id",hash:{},data:d}):e))+'">'+h((e=null!=(e=b.name||(null!=a?a.name:a))?e:g,typeof e===f?e.call(a,{name:"name",hash:{},data:d}):e))+'</a></div>\n    <div class="table-column-3">'+h((e=null!=(e=b.time||(null!=a?a.time:a))?e:g,typeof e===f?e.call(a,{name:"time",hash:{},data:d}):e))+'</div>\n    <div class="table-column-3">'+h((e=null!=(e=b.num||(null!=a?a.num:a))?e:g,typeof e===f?e.call(a,{name:"num",hash:{},data:d}):e))+"/"+h((e=null!=(e=b.max||(null!=a?a.max:a))?e:g,typeof e===f?e.call(a,{name:"max",hash:{},data:d}):e))+'</div>\n    <div class="clear"></div>\n  </div>\n'},compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f='<div class="table">\n  <div class="table-row table-header">\n    <div class="table-column-3">课程名称</div>\n    <div class="table-column-3">课时</div>\n    <div class="table-column-3">人数/总人数</div>\n    <div class="clear"></div>\n  </div>\n';return e=b.each.call(a,null!=a?a.list:a,{name:"each",hash:{},fn:this.program(1,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+'</div>\n<div id="list-pager"></div>\n'},useData:!0}),this.JST["source/template/link-course/recommand.hbs"]=Handlebars.template({1:function(a,b,c,d){var e,f,g="function",h=b.helperMissing,i=this.escapeExpression,j='    <div class="list-element">\n      <h4>'+i((f=null!=(f=b.title||(null!=a?a.title:a))?f:h,typeof f===g?f.call(a,{name:"title",hash:{},data:d}):f))+'</h4>\n      <div class="list-content">\n';return e=b.each.call(a,null!=a?a.news:a,{name:"each",hash:{},fn:this.program(2,d),inverse:this.noop,data:d}),null!=e&&(j+=e),j+"      </div>\n    </div>\n"},2:function(a,b,c,d){var e,f="function",g=b.helperMissing,h=this.escapeExpression;return'        <a href="#content/'+h((e=null!=(e=b.id||(null!=a?a.id:a))?e:g,typeof e===f?e.call(a,{name:"id",hash:{},data:d}):e))+'">'+h((e=null!=(e=b.name||(null!=a?a.name:a))?e:g,typeof e===f?e.call(a,{name:"name",hash:{},data:d}):e))+"</a>\n"},compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f='<div class="tab-body-recmmand">\n  <div class="recommand-list">\n';return e=b.each.call(a,null!=a?a.list:a,{name:"each",hash:{},fn:this.program(1,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+"  </div>\n</div>"},useData:!0}),this.JST["source/template/link-course/sidebar.hbs"]=Handlebars.template({1:function(a,b,c,d){var e,f,g="function",h=b.helperMissing,i=this.escapeExpression,j='<div class="list-panel">\n  <h3>'+i((f=null!=(f=b.title||(null!=a?a.title:a))?f:h,typeof f===g?f.call(a,{name:"title",hash:{},data:d}):f))+"</h3>\n";return e=b.each.call(a,null!=a?a.students:a,{name:"each",hash:{},fn:this.program(2,d),inverse:this.noop,data:d}),null!=e&&(j+=e),j+"</div>\n"},2:function(a,b,c,d){var e,f="function",g=b.helperMissing,h=this.escapeExpression;return'  <div class="piece">\n    <img src="'+h((e=null!=(e=b.img||(null!=a?a.img:a))?e:g,typeof e===f?e.call(a,{name:"img",hash:{},data:d}):e))+'" alt="">\n    <div class="texts">\n      <h4>'+h((e=null!=(e=b.name||(null!=a?a.name:a))?e:g,typeof e===f?e.call(a,{name:"name",hash:{},data:d}):e))+"</h4>\n      <p>"+h((e=null!=(e=b["class"]||(null!=a?a["class"]:a))?e:g,typeof e===f?e.call(a,{name:"class",hash:{},data:d}):e))+"</p>\n      <p>"+h((e=null!=(e=b.degree||(null!=a?a.degree:a))?e:g,typeof e===f?e.call(a,{name:"degree",hash:{},data:d}):e))+"</p>\n      <p>"+h((e=null!=(e=b.feeling||(null!=a?a.feeling:a))?e:g,typeof e===f?e.call(a,{name:"feeling",hash:{},data:d}):e))+'</p>\n    </div>\n    <div class="clear"></div>\n  </div>\n'},compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e;return e=b.each.call(a,null!=a?a.list:a,{name:"each",hash:{},fn:this.program(1,d),inverse:this.noop,data:d}),null!=e?e:""},useData:!0});});}).call(this);
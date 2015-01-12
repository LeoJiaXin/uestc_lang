<?php
/*
Template Name:source
*/
?>
<?php get_header(); ?>
<div id="main">
  <div id="content">
    <div class="title">
      <h1>学习资源</h1>
      <h4>Learning Resource</h4>
      <div class="line"></div>
    </div>
    <div class="wrapper-tab-body">
      <div class="tabs">
        <div class="tab-wrapper">
          <div class="top-tab tab1"><a href="">最新</a></div>
        </div>
        <div class="tab-wrapper">
          <div class="top-tab tab2"></div>
        </div>
        <div class="tab-wrapper">
          <div class="top-tab tab3"></div>
        </div>
        <div class="tab-wrapper">
          <div class="top-tab tab4"></div>
        </div>
        <div class="tab-wrapper">
          <div class="top-tab tab5"></div>
        </div>
      </div>
      <div class="tab-body">
        <div class="tab-body-title">最新</div>
        <div class="tab-body-content" id="link-source"></div>
      </div>
    </div>
  </div>
  <aside role="sidebar">
<!--     <div style="display:none;"><script>var window_width = window.innerWidth || document.documentElement.clientWidth || document.body.offsetWidth;if(window_width <= _options_.response_phone_width)document.write('<script class="not-load-sidebar"><noscript></script>');</script></div>
 -->      <div id="sidebar"></div>
<!--     <div style="display:none;"><script>var window_width = window.innerWidth || document.documentElement.clientWidth || document.body.offsetWidth;if(window_width <= _options_.response_phone_width)document.write('<script class="not-load-sidebar"></noscript></script>');</script></div>
 -->  </aside>
</div>
<script>
  var moduleName = 'link-source';
</script>
<?php get_footer(); ?>

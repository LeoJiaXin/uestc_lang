<?php
/*
Template Name:course
*/
?>
<?php get_header(); ?>
<div id="main">
  <div id="content">
    <div class="title">
      <h1>YuyanKecheng</h1>
      <h4>Training Course</h4>
      <div class="line"></div>
    </div>
    <div class="wrapper-tab-body">
      <div class="tabs">
        <div class="tab-wrapper">
          <div class="top-tab tab1">Recommand</div>
        </div>
        <div class="tab-wrapper">
          <div class="top-tab tab2">Abroad</div>
          <div class="sec-tabs">
            <a href="#">Aaaaa</a>
            <a href="#">Baa</a>
            <a href="#">Ccccc</a>
          </div>
        </div>
        <div class="tab-wrapper">
          <div class="top-tab tab3">Study</div>
          <div class="sec-tabs">
            <a href="#">Aaaaa</a>
            <a href="#">Baa</a>
            <a href="#">Ccccc</a>
          </div>
        </div>
        <div class="tab-wrapper">
          <div class="top-tab tab4">Ccccc</div>
          <div class="sec-tabs">
            <a href="#">Aaaaa</a>
            <a href="#">Baa</a>
            <a href="#">Ccccc</a>
          </div>
        </div>
        <div class="tab-wrapper">
          <div class="top-tab tab5">Ddddd</div>
          <div class="sec-tabs">
            <a href="#">Aaaaa</a>
            <a href="#">Baa</a>
            <a href="#">Ccccc</a>
          </div>
        </div>
      </div>
      <div class="tab-body">
        <div class="tab-body-title">Recommand</div>
        <div class="tab-body-content" id="link-course"></div>
      </div>
    </div>
  </div>
  <aside role="sidebar">
    <div style="display:none;"><script>var window_width = window.innerWidth || document.documentElement.clientWidth || document.body.offsetWidth;if(window_width <= _options_.response_phone_width)document.write('<script class="not-load-sidebar"><noscript></script>');</script></div>
      <div id="sidebar">
        <?php dynamic_sidebar('sidebar-course'); ?>
      </div>
    <div style="display:none;"><script>var window_width = window.innerWidth || document.documentElement.clientWidth || document.body.offsetWidth;if(window_width <= _options_.response_phone_width)document.write('<script class="not-load-sidebar"></noscript></script>');</script></div>
  </aside>
</div>
<script>
  var moduleName = 'link-course';
</script>
<?php get_footer(); ?>
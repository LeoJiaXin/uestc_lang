<div style="display:none;"><script>var window_width = window.innerWidth || document.documentElement.clientWidth || document.body.offsetWidth;if(window_width <= _options_.response_phone_width)document.write('<script class="not-load-sidebar"><noscript></script>');</script></div>
<div id="sidebar">
<?php if(is_active_sidebar('sidebar-1')) dynamic_sidebar('sidebar-1'); ?>
<?php if(is_active_sidebar('sidebar-2') && (is_home() || is_front_page()) && !is_paged()) dynamic_sidebar('sidebar-2'); ?>
<?php if(is_active_sidebar('sidebar-3') && is_singular()) dynamic_sidebar('sidebar-3'); ?>
<?php if(is_active_sidebar('sidebar-4')) dynamic_sidebar('sidebar-4'); ?>
<?php if(is_dynamic_sidebar('sidebar-fixed')) : ?>
  <div id="fixed-sidebar"><?php dynamic_sidebar('sidebar-fixed'); ?></div>
<?php endif; ?>
</div>
<div style="display:none;"><script>var window_width = window.innerWidth || document.documentElement.clientWidth || document.body.offsetWidth;if(window_width <= _options_.response_phone_width)document.write('<script class="not-load-sidebar"></noscript></script>');</script></div>
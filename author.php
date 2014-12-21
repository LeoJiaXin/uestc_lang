<?php get_header(); ?>
<div role="main" id="main">
  <div id="content">
    <div class="place"><?php the_place('首页'); ?></div>
    <?php if(have_posts())the_post(); ?>
    <div class="article-author archive-info">
      <?php echo get_avatar($post->post_author,'60'); ?>
      <div><?php _e('作者：');the_author(); ?></div>
      <div><?php _e(sprintf('共有%s篇文章',count_user_posts($post->post_author))); ?></div>
      <div class="article-author-description"><?php the_author_meta('description'); ?></div>
      <div class="clear"></div>
    </div>
    <?php rewind_posts(); ?>
    <div id="post-list">
      <?php
      while(have_posts()):the_post();
      $format = get_post_format();
      get_template_part('templates/tpl-loop',$format);
      endwhile;
      ?>
    </div>
    <?php get_template_part('templates/tpl-pagenavi'); ?>
  </div>
  <aside role="sidebar">
    <?php get_sidebar(); ?>
  </aside>
</div>
<?php get_footer(); ?>
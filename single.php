<?php global $admin_options;get_header(); ?>
<div id="main">
  <div id="content">
    <div class="place"><?php the_place('首页'); ?></div>
    <article role="article" id="post-<?php the_ID(); ?>">
    <div id="article" <?php post_class(); ?>>
      <?php the_post();global $post; ?>
      <h1 class="article-title post-title"><?php the_title(); ?></h1>
      <div class="article-info post-info">
        <?php if($admin_options['mode'] > 0) { ?><span class="icon author"></span><a href="<?php echo get_author_posts_url($post->post_author); ?>"><?php the_author(); ?></a><?php } ?>
        <span class="icon cate"></span><?php the_category(','); ?>
        <span class="icon date"></span><?php echo get_the_date('Y-m-d H:i'); ?>
        
      </div>
      <div class="article-content">
        <?php the_content(); ?>
        <p>转载本站文章请注明出处：<?php bloginfo('name'); ?> <?php echo wp_get_shortlink(); ?></p>
        <?php wp_link_pages(array('before' => '<p class="Pages">文章分页：', 'after' => '</p>', 'next_or_number' => 'number', 'previouspagelink' => '上一页', 'nextpagelink' => '下一页','link_before' =>'', 'link_after'=>'')); ?>
      </div>
      <div class="article-opt post-opt">
        <?php if(get_the_tags()): ?><span class="icon tag"></span><?php the_tags('',' '); ?><?php endif; ?>
      </div>
      <div class="article-pagenavi">
        <p><?php previous_post_link('上一篇：%link'); ?></p>
        <p><?php next_post_link('下一篇：%link'); ?></p>
      </div>
      <div class="clear"></div>
      <?php 
if ( in_category(array(4,5,6)) ) {
    include(TEMPLATEPATH . '/catgory-activities.php');
} elseif ( in_category(array(1,2,3))){
    include(TEMPLATEPATH . '/catgory-activities.php');
} else {
    include(TEMPLATEPATH . '/catgory-activities.php');
}
?>
      <div class="clear"></div>
      <?php if($admin_options['mode'] > 0) { ?>
      <div class="article-author">
        <a href="<?php echo get_author_posts_url($post->post_author); ?>"><?php echo get_avatar($post->post_author,'60'); ?></a>
        <div><?php _e('作者：'); ?><a href="<?php echo get_author_posts_url($post->post_author); ?>"><?php the_author(); ?></a></div>
        <div class="article-author-description"><?php the_author_meta('description'); ?></div>
        <div class="clear"></div>
      </div>
      <?php } ?>
     
    </div>
    </article>
  </div>
  <aside role="sidebar">
    <?php get_sidebar(); ?>
  </aside>
</div>
<?php get_footer(); ?>

<?php
/*
Template Name:exam
*/
?>
<?php get_header(); ?>
<div id="main-full">
  <div id="content-full">
<!--     <img class="intro-img" src="<?php echo get_template_directory_uri(); ?>/images/sign-back.jpg" alt="">
 -->    <div class="background-intro">
      <div class="intro-wrapper" id="link-exam"></div>
    </div>
  </div>
</div>
<script>
  var link_for_sign = '<?php echo get_permalink($admin_options['page_for_usercenter']); ?>';
  var moduleName = 'link-exam';
</script>
<?php get_footer(); ?>
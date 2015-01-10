<?php
global $admin_options;
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title><?php wp_title('',true); ?></title>
<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/green-style.css">
<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/style.css">
<?php if($admin_options['response_pad_width'] > 0) { ?><link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/green-pad.css?<?php echo time(); ?>" media="screen and (max-width: <?php echo $admin_options['response_pad_width']; ?>px)"><?php } ?>
<?php if($admin_options['response_phone_width'] > 0) { ?><link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/green-phone.css" media="screen and (max-width: <?php echo $admin_options['response_phone_width']; ?>px)"><?php } ?>
<link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/images/favicon.ico">
<?php wp_head(); ?>
<script>
var _options_ = {
  'template_url' : '<?php echo get_template_directory_uri(); ?>', // 模板文件夹的访问路径
  'real_current_page' : <?php echo (get_query_var("paged") ? get_query_var("paged") : 1); ?>, // 当前的页码，用在翻页中
  'pagenavi_num' : <?php echo (int)$admin_options['pagenavi']; ?>, // 翻页的加载数量
  'response_pad_width' : <?php echo (int)$admin_options['response_pad_width']; ?>, // 响应式平板屏幕宽度
  'response_phone_width' : <?php echo (int)$admin_options['response_phone_width']; ?>, // 响应式手机屏幕宽度
  'img_lazyload' : <?php echo (int)$admin_options['img_lazyload']; ?> // 图片延时加载
};
</script>
</head>

<body <?php body_class($admin_options['mode'] < 2 ? 'admin-options-mode-signle' : ''); ?>>
<div id="top-area">
  <img class="header-back" src="<?php echo get_template_directory_uri(); ?>/images/header-back.jpg" alt="">
  <div class="container">
    <div class="menu-background"></div>
    <div id="logo">
      <img src="<?php echo get_template_directory_uri(); ?>/images/logo.png" alt="语言中心">
      <div style="display:inline-block;"><p>电子科技大学</p><p style="color:#FF9900;">语言中心</p></div>
    </div>
    <div id="menu">
      <?php 
      $defaults = array(
        'theme_location'  => 'primary',
        'depth'           => 2,
        'container'       => false,
        'items_wrap'      => '%3$s',
        'echo'            => 0
      );
      $menu = wp_nav_menu($defaults);
      $menu = str_replace('<li','<span',$menu);
      $menu = str_replace('</li>','</span>',$menu);
      $menu = str_replace('<ul','<div',$menu);
      $menu = str_replace('</ul>','</div>',$menu);
      echo $menu;
      ?>
    </div>
  <?php //if($admin_options['mode'] >= 2) { ?>
  <div id="user-area">
    <?php if(is_user_logged_in()):global $current_user;get_currentuserinfo(); ?>
    <ul class="current-user-area">
      <li class="user-name" title="<?php echo $current_user->display_name; ?>"><?php echo get_avatar($current_user->ID,'16'); ?><?php echo $current_user->display_name; ?></li>
      <li class="drop-menu admin-btn"><a href="<?php echo get_permalink($admin_options['page_for_usercenter']); ?>">模拟考试</a></li>
      <li class="drop-menu logout-btn"><a href="<?php echo wp_logout_url($_SERVER["REQUEST_URI"]); ?>">退出</a></li>
    </ul>
    <?php else : ?>
    <span class="register"><a href="<?php echo wp_login_url(); ?>?action=register">注册</a></span>
    <span>|</span>
    <span class="login"><a href="<?php echo wp_login_url($_SERVER["REQUEST_URI"]); ?>">登录</a></span>
    <?php endif; ?>
  </div>
  <?php //} ?>
  <div class="clear"></div>
</div></div>
<img src="<?php echo get_template_directory_uri(); ?>/images/icons.png" style="position:absolute;top:-1000px;height:1px;width:1px;"><!-- 为了让各类icon早一点加载 -->

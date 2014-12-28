<?php
/*
Template Name:usercenter
*/
?>
<?php

// 如果没有开启众人投稿模式
global $admin_options;
if($admin_options['mode'] < 2) {
  include("page.php");
  exit;
}

// 抛出异常变量
$error = '';

// 提交
if(isset($_POST['action']) && $_POST['action'] == 'update-user') :
  if(!wp_verify_nonce($_POST['_wpnonce'])) {
    $error = '权限过时，请刷新页面重新提交。';
  }
  elseif(!is_user_logged_in()) {
    $error = '您还没有登录，请先登录。';
  }
  else {
    $user = $_POST['user'];
    $user_id = $user['ID'];

    $user_id = wp_update_user(array( 
      'ID' => $user_id,
      'description' => strip_tags(trim($user['description'])),
      'nickname' => trim($user['nickname']),
      'display_name' => trim($user['nickname']),
      'user_url' => $user['user_url']
    ));

    if(!empty($user['meta']))foreach($user['meta'] as $meta => $value) {
      update_user_meta($user_id,$meta,$value);
    }

    wp_redirect(add_query_arg(array(
      'saved' => 'true',
      '_wpnonce' => wp_create_nonce()
    )));
    exit();
  }// end else
endif;

// 如果是刚刚提交了的文章，可以编辑
if(isset($_GET['saved']) && $_GET['saved'] == 'true') {
  $warning = '更新成功。';
}



$user = wp_get_current_user();
$user_id = $user->ID;
$user->realname = get_user_meta($user_id,'realname',true);
$user->l_number = get_user_meta($user_id,'l_number',true);
$user->phone = get_user_meta($user_id,'phone',true);
$user->qq = get_user_meta($user_id,'qq',true);
$user->l_identitycard = get_user_meta($user_id,'l_identitycard',true);
$user->weixin = get_user_meta($user_id,'weixin',true);
$user->avatar = get_user_meta($user_id,'avatar',true);

if(!is_user_logged_in()) {
  $error = '请先登录。';
}

add_action('wp_enqueue_scripts','scripts_init');
function scripts_init() {
    global $wp_version;
    if(function_exists('wp_enqueue_media') && $wp_version >= 3.5) {
      wp_enqueue_media();
    }
    else {
      wp_enqueue_script('media-upload');
      wp_enqueue_script('thickbox');
      wp_enqueue_style('thickbox');
    }
    wp_register_script('admin_options_media_dialog',get_template_directory_uri().'/admin-options/js/media.js');
    wp_enqueue_script('admin_options_media_dialog');

    wp_enqueue_style('media');
}

get_header(); ?>
<div id="main">
  <div id="page-usercenter" class="single-page">
    <form method="post" action="<?php echo add_query_arg('time',time()); ?>">
      <h1>模拟考试</h1>
      <?php if($error) : ?>
      <p class="warn"><?php echo $error; ?></p>
      <?php else : ?>
      <?php if($warning) {
        echo '<p class="warn">'.$warning.'</p>';
      } ?>
     
      <p class="info"><label><span>昵称：</span><input type="text" name="user[nickname]" value="<?php echo $user->nickname; ?>"></label></p>
      <p class="info"><label><span>用户名：</span><input type="text"value="<?php echo $user->user_login; ?>" disabled></label></p>
      <p class="info"><label><span>真实姓名（必填）：</span><input type="text" name="user[meta][l_realname]" value="<?php echo $user->l_realname; ?>"></label></p>
      <p class="info"><label><span>身份证号码(必填)：</span><input type="text" name="user[meta][l_identitycard]" value="<?php echo $user->l_identitycard; ?>"></label></p>
      <p class="info"><label><span>学号：</span><input type="text" name="user[meta][l_number]" value="<?php echo $user->l_number; ?>"></label></p>
      <p class="info"><label><span>手机号码（必填）：</span><input type="text" name="user[meta][l_phone]" value="<?php echo $user->l_phone; ?>"></label></p>
      <p class="info"><label><span>英语水平：</span><input type="text" name="user[user_url]" value="<?php echo $user->user_url; ?>"></label></p>
      <p class="info"><label><span>QQ：</span><input type="text" name="user[meta][qq]" value="<?php echo $user->qq; ?>"></label></p>
      <p class="info"><label><span>微信：</span><input type="text" name="user[meta][weixin]" value="<?php echo $user->weixin; ?>"></label></p>
      
      <p class="info"><label><span>考试时间：</span><textarea name="user[description]"><?php echo $user->description; ?></textarea></label></p>
      
      <p class="btns">
        <button type="submit" class="btn btn-submit btn-large">确认</button>
        <a href="<?php echo admin_url('profile.php'); ?>" class="btn btn-cancel btn-large">高级修改</a>
        <div class="clear"></div>
      </p>
      <input type="hidden" name="user[ID]" value="<?php echo $user_id; ?>">
      <input type="hidden" name="action" value="update-user">
      <?php wp_nonce_field(); ?>
      <?php endif; ?>
    </form>
  </div>
</div>
<?php get_footer(); ?>

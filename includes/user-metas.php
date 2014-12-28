<?php

// 用户信息
function fix_user_profile($contactmethods){
  $contactmethods['l_realname'] = '真实姓名<small></small>';
  $contactmethods['l_number'] = '学号<small></small>';
  $contactmethods['l_phone'] = '手机号<small></small>';
  $contactmethods['qq'] = 'QQ';
  $contactmethods['l_identitycard'] = '身份证号码';
  $contactmethods['weixin'] = '微信';
  //$contactmethods['avatar'] = '头像图片URL';
  unset($contactmethods['first_name']);
  unset($contactmethods['last_name']);
  unset($contactmethods['aim']);
  unset($contactmethods['yim']);
  unset($contactmethods['jabber']);
  return $contactmethods;
}
add_filter('user_contactmethods','fix_user_profile',10,1);

// 修复系统问题
function fix_user_profile_js(){
	global $wp_version, $hook_suffix;
	if(in_array($hook_suffix,array('profile.php','user-edit.php'))) : ?>
<script type="text/javascript">
jQuery(function($){
	$('#rich_editing,#comment_shortcuts').parent().parent().parent().remove();
	$('#last_name').parent().parent().remove();
	$('#first_name').parent().parent().remove();
});
</script>
<?php
	endif;
}
add_action('admin_print_footer_scripts','fix_user_profile_js');

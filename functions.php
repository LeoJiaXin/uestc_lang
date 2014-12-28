<?php
/**
 * @package WordPress
 * @subpackage UTUBON
 * @since UTUBON 2.0
 */

/**
* 初始化
*/
//add_theme_support('post-formats',array('image','quote','video'));
add_theme_support('post-thumbnails');
set_post_thumbnail_size(600,371,true);
update_option('medium_size_w',600);
//update_option('medium_size_h',371);
//update_option('thumbnail_size_w',150);
//update_option('thumbnail_size_h',93);

add_editor_style('css/editor-style.css');
remove_filter('the_content', 'wptexturize');
remove_filter('the_excerpt', 'wptexturize');
remove_filter('the_title', 'wptexturize');

add_filter('pre_option_link_manager_enabled', '__return_true' );
if(!is_admin()){
  add_filter( 'show_admin_bar', '__return_false' );
  remove_action('init','_wp_admin_bar_init',9);
}

register_nav_menu('primary','主导航');

// register_sidebar(array(
//   'name'=>'全局边栏',
//   'id' => 'sidebar-1',
//   'description' => '',
//   'before_widget' => '<div class="widget %2$s" id="%1$s">',
//   'after_widget' => '<div class="clear"></div></div>',
//   'before_title' => '<div class="widget-title"><h3>',
//   'after_title' => '</h3><div class="clear"></div></div>'
// ));
// register_sidebar(array(
//   'name'=>'首页边栏',
//   'id' => 'sidebar-2',
//   'description' => '',
//   'before_widget' => '<div class="widget %2$s" id="%1$s">',
//   'after_widget' => '<div class="clear"></div></div>',
//   'before_title' => '<div class="widget-title"><h3>',
//   'after_title' => '</h3><div class="clear"></div></div>'
// ));
// register_sidebar(array(
//   'name' => '内页边栏',
//       'id' => 'sidebar-3',
//   'before_widget' => '<div class="widget %2$s" id="%1$s">',
//   'after_widget' => '<div class="clear"></div></div>',
//   'before_title' => '<div class="widget-title"><h3>',
//   'after_title' => '</h3><div class="clear"></div></div>'
// ));
// register_sidebar(array(
//   'name'=>'全站边栏',
//   'id' => 'sidebar-4',
//   'description' => '',
//   'before_widget' => '<div class="widget %2$s" id="%1$s">',
//   'after_widget' => '<div class="clear"></div></div>',
//   'before_title' => '<div class="widget-title"><h3>',
//   'after_title' => '</h3><div class="clear"></div></div>'
// ));
// register_sidebar(array(
//   'name' => '固定边栏',
//   'id' => 'sidebar-fixed',
//   'before_widget' => '<div class="widget %2$s" id="%1$s">',
//   'after_widget' => '<div class="clear"></div></div>',
//   'before_title' => '<div class="widget-title"><h3>',
//   'after_title' => '</h3><div class="clear"></div></div>'
// ));
register_sidebar(array(
  'name' => '底部左',
  'id' => 'footer-1',
  'before_widget' => '<div class="widget %2$s" id="%1$s">',
  'after_widget' => '<div class="clear"></div></div>',
  'before_title' => '<div class="widget-title">',
  'after_title' => '</div>'
));
register_sidebar(array(
  'name' => '底部中',
  'id' => 'footer-2',
  'before_widget' => '<div class="widget %2$s" id="%1$s">',
  'after_widget' => '<div class="clear"></div></div>',
  'before_title' => '<div class="widget-title">',
  'after_title' => '</div>'
));
register_sidebar(array(
  'name' => '底部右-全局链接',
  'id' => 'footer-3',
  'before_widget' => '<div class="widget %2$s" id="%1$s">',
  'after_widget' => '<div class="clear"></div></div>',
  'before_title' => '<div class="widget-title">',
  'after_title' => '</div>'
));
register_sidebar(array(
  'name' => '底部右-首页链接',
  'id' => 'footer-4',
  'before_widget' => '<div class="widget %2$s" id="%1$s">',
  'after_widget' => '<div class="clear"></div></div>',
  'before_title' => '<div class="widget-title">',
  'after_title' => '</div>'
));
register_sidebar(array(
  'name' => '语言课程侧边栏',
  'id' => 'sidebar-course',
  'description' => '',
  'before_widget' => '<div class="widget %2$s" id="%1$s">',
  'after_widget' => '<div class="clear"></div></div>',
  'before_title' => '<div class="widget-title"><h3>',
  'after_title' => '</h3><div class="clear"></div></div>'
));
register_sidebar(array(
  'name' => '学习资源侧边栏',
  'id' => 'sidebar-source',
  'description' => '',
  'before_widget' => '<div class="widget %2$s" id="%1$s">',
  'after_widget' => '<div class="clear"></div></div>',
  'before_title' => '<div class="widget-title"><h3>',
  'after_title' => '</h3><div class="clear"></div></div>'
));

/*
 * WordPress 显示最近注册的用户
 * uestcwp
 */
function wpb_recently_registered_users() { 
	global $wpdb;
	$recentusers = '<ul class="recently-user">';
	$usernames = $wpdb->get_results("SELECT user_nicename, user_url, user_email FROM $wpdb->users ORDER BY ID DESC LIMIT 5"); //只显示最近注册的 5 个用户
	foreach ($usernames as $username) {
		if (!$username->user_url) : //如果有用户没有填写网站，就只显示头像和用户名
			$recentusers .= '<li>' .get_avatar($username->user_email, 45) .$username->user_nicename."</a></li>";
		else : //如果用户填写了网站，就给用户名添加链接
			$recentusers .= '<li>' .get_avatar($username->user_email, 45).'<a href="'.$username->user_url.'">'.$username->user_nicename."</a></li>";
		endif;
	}
	$recentusers .= '</ul>';
	return $recentusers;  
}
//添加简码
add_shortcode('wpb_newusers', 'wpb_recently_registered_users');

/**
 * WordPress 后台用户列表显示用户姓名
 * uestcwp
 */
add_filter('manage_users_columns', 'add_l_realname_column');
function add_l_realname_column($columns) {
	$columns['l_realname'] = '姓名';
	unset($columns['name']); //移除“姓名”这一栏
	unset($columns['role']);//移除“角色”这一栏
	unset($columns['posts']);//移除“发表文章数”这一栏
	return $columns;
}

add_action('manage_users_custom_column',  'show_l_realname_column_content', 20, 3);

function show_l_realname_column_content($value, $column_name, $user_id) {
	$user = get_userdata( $user_id );
	$l_realname = $user->l_realname;
	if ( 'l_realname' == $column_name )
		return $l_realname;
	return $value;
}

/**
 * WordPress 后台用户列表显示用户手机号码
 * uestcwp
 */
add_filter('manage_users_columns', 'add_l_phone_column');
function add_l_phone_column($columns) {
	$columns['l_phone'] = '手机号码';
	return $columns;
}

add_action('manage_users_custom_column',  'show_l_phone_column_content', 20, 3);

function show_l_phone_column_content($value, $column_name, $user_id) {
	$user = get_userdata( $user_id );
	$l_phone = $user->l_phone;
	if ( 'l_phone' == $column_name )
		return $l_phone;
	return $value;
}

/**
 * WordPress 后台用户列表显示用户身份证号码
 * uestcwp
 */
add_filter('manage_users_columns', 'add_l_identitycard_column');
function add_l_identitycard_column($columns) {
	$columns['l_identitycard'] = '身份证号码';
	return $columns;
}

add_action('manage_users_custom_column',  'show_l_identitycard_column_content', 20, 3);

function show_l_identitycard_column_content($value, $column_name, $user_id) {
	$user = get_userdata( $user_id );
	$l_identitycard = $user->l_identitycard;
	if ( 'l_identitycard' == $column_name )
		return $l_identitycard;
	return $value;
}

/**
 * WordPress 后台用户列表显示用户学号
 * uestcwp
 */
add_filter('manage_users_columns', 'add_l_number_column');
function add_l_number_column($columns) {
	$columns['l_number'] = '学号';
	return $columns;
}

add_action('manage_users_custom_column',  'show_l_number_column_content', 20, 3);

function show_l_number_column_content($value, $column_name, $user_id) {
	$user = get_userdata( $user_id );
	$l_number = $user->l_number;
	if ( 'l_number' == $column_name )
		return $l_number;
	return $value;
}





include(dirname(__FILE__)."/admin-options/admin-options.php");
// 引入扩展库
$function_files_path = dirname(__FILE__).'/includes';
if(file_exists($function_files_path)):
$function_files = scandir($function_files_path);
if($function_files){
  foreach($function_files as $function_file)
    if(substr($function_file,-4) == '.php')
      include_once($function_files_path.'/'.$function_file);
}
endif;

/**
* 回复列表 用wp_list_comments()函数打印出来
*/
/*
function mytheme_comment($comment, $args, $depth){
  $GLOBALS['comment'] = $comment; ?>
  <li <?php comment_class(); ?>>
  <div id="comment-<?php comment_ID() ?>" class="comment-box">
      <?php echo get_avatar($comment,'50'); ?>
      <div class="comment-content">
<div class="comment-info">
  <span class="info"><?php echo get_comment_author_link(); ?></span>
  <span class="info"><?php echo get_comment_time('Y-m-d H:i:s'); ?></span>
  <span class="float-right"><?php comment_reply_link(array_merge(
      $args, array('depth' => $depth, 'max_depth' => $args['max_depth'],'reply_text' => __('<span class="icon reply"></span>回复'))
    ));
  ?></span>
  <span class="float-right comment-eidt-link"><?php edit_comment_link('<span class="icon edit"></span>编辑','','') ?></span>
</div>
<div class="comment-text">
<?php comment_text(); ?>
</div>
<?php if ($comment->comment_approved == '0')
  printf('<div class="approve">%s</div>',__('您的回复正在审核中，很快就会出现在回复列表~~')); ?>
      </div>
    </div>
<?php }
*/

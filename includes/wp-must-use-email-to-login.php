<?php

if (in_array($GLOBALS['pagenow'], array('wp-login.php')) && strpos($_SERVER['REQUEST_URI'], '?action=register') === FALSE && strpos($_SERVER['REQUEST_URI'], '?action=lostpassword') === FALSE && strpos($_SERVER['REQUEST_URI'], '?action=rp') === FALSE ) {
	// 修改登录框提示为使用邮箱登录
	add_action('login_footer', 'change_login_text');
}

// remove the default filter
remove_filter( 'authenticate', 'wp_authenticate_username_password', 20, 3 );
// add custom filter
add_filter( 'authenticate', 'my_authenticate_username_password', 20, 3 );
// Change login credentials
function my_authenticate_username_password( $user, $username, $password ) {

    // If an email address is entered in the username box, 
    // then look up the matching username and authenticate as per normal, using that.
    if ( ! empty( $username ) ) {
        //if the username is not email set username to blank string
        //causes authenticate to fail
		if(!filter_var($username,FILTER_VALIDATE_EMAIL)){
                $username = time();
            }
        $user = get_user_by( 'email', $username );
        }
    if ( isset( $user->user_login, $user ) )
        $username = $user->user_login;

    // using the username found when looking up via email
    return wp_authenticate_username_password( NULL, $username, $password );
}

// 修改登录界面的文字，"用户名"改成"用户名或邮箱"
function change_login_text() {
	echo '
		<script type="text/javascript">
            var user_login_node = document.getElementById("user_login");
            var old_username_text = user_login_node.parentNode.innerHTML;
            user_login_node.parentNode.innerHTML = old_username_text.replace(/用户名/, "用户邮箱");
			jQuery(function($){
				$("#loginform").submit(function(){
					var email = $("#user_login").val();
					if(email.indexOf("@") <= 0 || email.indexOf(".") <= 0){
						$("#user_login").css("background-color","#FFBCBC");
						return false;
					}
				});
				$("#user_login").focus(function(){
					$(this).css("background-color","#FBFBFB");
				});
			});
      </script>';
}

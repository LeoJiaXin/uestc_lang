<div id="footer"><div class="container">
  <div class="widget-box"><?php dynamic_sidebar('footer-1'); ?></div>
  <div class="widget-box author-avatar-list"><?php dynamic_sidebar('footer-2'); ?></div>
  <div class="widget-box friend-link-list" style="margin-right:0;"><?php dynamic_sidebar('footer-3');if(is_home() && !is_paged())dynamic_sidebar('footer-4'); ?></div>
  <div class="clear"></div>
  <div id="copyright"><?php global $admin_options;$copyright = do_shortcode(stripslashes($admin_options['copyright']));echo apply_filters('the_content',$copyright); ?></div>
  <div class="clear"></div>
</div></div>

<script src="<?php bloginfo('template_url'); ?>/js/jquery.min.js"></script>
<script id="load-page-scripts" src="<?php bloginfo('template_url'); ?>/js/javascript.js"></script>
<script src="<?php bloginfo('template_url'); ?>/js/sea.js" id="seajsnode"></script>
<script>
  var path = '<?php bloginfo('template_url'); ?>';
  var Root = {};
  if(moduleName) {
    seajs.config({
      paths: {
        'base': path+'/js',
        'fun': path+'/js/module/'+moduleName
      },
      alias: {
        'handlebars': 'base/handlebars.runtime.min.js'
      }
    });
    seajs.use('fun/main',function() {
      console.log('ready');
    });
  }
</script>
<?php get_template_part('templates/tpl-dialog-register'); ?>
<?php get_template_part('templates/tpl-dialog-login'); ?>
<script>
// 打开弹窗（暂时没有用到，如需通用，移到script中间去）
function open_dialog(dialog_id) {
  var $dialog = $(dialog_id),
      $dialog_bg = $dialog.children('.dialog-bg'),
      $dialog_content = $dialog.children('.dialog-content'),
      content_height = $dialog_content.outerHeight();
  $dialog_bg.fadeIn(500);
  $dialog_content.show().animate({top:'50%',marginTop:-(content_height/2),'opacity':1,'-moz-opacity':1},1000);
}
// 关闭弹出窗口（如需通用，移到$()中间去）
$('.dialog').on('click','.dialog-bg,.close',function(){
  var $dialog = $('.dialog:visible'),
      $dialog_bg = $dialog.children('.dialog-bg'),
      $dialog_content = $dialog.children('.dialog-content');
  $dialog_content.animate({top:0,marginTop:0,'opacity':0,'-moz-opacity':0},500,function(){
    $(this).hide();
  });
  $dialog_bg.fadeOut(500);
});
// 用户注册
$('#user-area').on('click','.register',function(e){
  e.preventDefault();
  var $dialog = $('#user-register-dialog'),
      $dialog_bg = $dialog.children('.dialog-bg'),
      $dialog_content = $dialog.children('.dialog-content'),
      content_height = $dialog_content.outerHeight();
  $dialog_bg.fadeIn(500);
  $dialog_content.show().animate({top:'50%',marginTop:-(content_height/2),'opacity':1,'-moz-opacity':1},1000);
});
$('#user-register-dialog form').on('submit',function(e){
  e.preventDefault();
  var $this = $(this),
      action = $this.attr('action'),
      $data = $this.serialize(),
      $warning = $this.find('.dialog-warning'),
      $text = $this.find('.dialog-text'),
      $btns = $this.find('.dialog-btns');
  $warning.html('正在注册...');
  $.ajax({
    url : action,
    data : $data,
    dataType : 'json',
    type : 'POST',
    timeout : 8000,
    success : function(result) {
      if(result == -1) {
        $warning.html('权限超时了，请刷新页面再注册。');
      }
      else if(result.error == 0) {
        var html = '<p class="dialog-success register-success">注册成功！现在用你的邮箱 ' + result.msg + ' 去<a href="javascript:void(0)" onclick="setTimeout(function(){$(\'#user-area .login\').trigger(\'click\');},1000);$(\'#user-register-dialog .dialog-close\').trigger(\'click\');">登录</a>吧。</p>';
        $btns.hide();
        $text.html(html);
      }
      else {
        $warning.html(result.msg);
      }
    },
    error : function(xhr,textStatus){
      if(textStatus == 'timeout'){
        $warning.html('连接超时，检查你是否使用代理等不稳定的网络。');
      }
      else{
        $warning.html('网络异常，请检查你的网络是否有问题。');
      }
    }
  });
});
// 用户登录
$('#user-area').on('click','.login',function(e){
  e.preventDefault();
  var $dialog = $('#user-login-dialog'),
      $dialog_bg = $dialog.children('.dialog-bg'),
      $dialog_content = $dialog.children('.dialog-content'),
      content_height = $dialog_content.outerHeight();
  $dialog_bg.fadeIn(500);
  $dialog_content.show().animate({top:'50%',marginTop:-(content_height/2),'opacity':1,'-moz-opacity':1},1000);
});
$('#user-login-dialog form').on('submit',function(e){
  e.preventDefault();
  var $this = $(this),
      action = $this.attr('action'),
      $data = $this.serialize(),
      $warning = $this.find('.dialog-warning');
  $warning.html('正在登录...');
  $.ajax({
    url : action,
    data : $data,
    dataType : 'json',
    type : 'POST',
    timeout : 8000,
    success : function(result) {
      if(result == -1) {
        $warning.html('权限超时了，请刷新页面再登录。');
      }
      else if(result.error == 0) {
        $warning.css('color','#219A44').html(result.msg);
        window.location.reload(true);
      }
      else {
        $warning.html(result.msg);
      }
    },
    error : function(xhr,textStatus){
      if(textStatus == 'timeout'){
        $warning.html('连接超时，检查你是否使用代理等不稳定的网络。');
      }
      else{
        $warning.html('网络异常，请检查你的网络是否有问题。');
      }
    }
  });
});
</script>

<?php if(is_singular() && comments_open() && get_option('thread_comments')) { ?>
<script src="<?php echo site_url('/wp-includes/js/comment-reply.js'); ?>"></script>
<script>
$(document).keypress(function(e){
  if(e.ctrlKey && e.which == 13 || e.which == 10) {
    $("#submit").click();
    document.body.focus();
  }
})
</script>
<?php } ?>

<?php wp_footer(); ?>

</body>
</html>
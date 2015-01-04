<?php

  require(dirname(__FILE__).'/../../../../../wp-load.php');
  class obj{}
  $args = array(
    'numberposts'     => 1,
    'offset'           => 0,
    'category'    => get_cat_ID('home'),
    'orderby'          => 'post_date',
    'order'            => 'DESC',
    'post_type'        => 'post',
    'post_status'      => 'publish',
    'suppress_filters' => true 
  );
  $setting_file = get_posts($args);
  $setting = null;
  if (!$setting_file) {
    $setting = new obj;
    $setting->banners = array();
    $setting->recent = array();
    for ($i=0;$i<4;$i++) {
      $ele = new obj;
      $ele->id = $i;
      $ele->img = '';
      array_push($setting->recent,$ele);
    }
    echo json_encode($setting);
  } else {
    echo $setting_file[0]->post_content;
  }
?>
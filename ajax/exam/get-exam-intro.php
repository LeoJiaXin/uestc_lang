<?php

  require(dirname(__FILE__).'/../../../../../wp-load.php');
  class obj{}
  $args = array(
    'numberposts'     => 1,
    'offset'           => 0,
    'category'    => get_cat_ID('exam-setting'),
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
    $setting->best = array();
    $setting->description = new obj;
    $setting->description->title = '';
    $setting->description->content = '';
    $new_setting = array(
      'post_title' => 'setting',
      'post_content' => json_encode($setting),
      'post_status' => 'publish',
      'post_author' => 1,
      'post_category' => array(get_cat_ID('exam-setting'))
    );
    $result = wp_insert_post( $new_setting );
    if ($result) {
      $setting->id = $result;
      $uargs = array(
        'ID' => $result,
        'post_content' => json_encode($setting)
      );
      $result = wp_update_post( $uargs );
      echo json_encode($setting);
    } else {
      echo '{"result":"failed"}';
    }
  } else {
    echo $setting_file[0]->post_content;
  }
?>
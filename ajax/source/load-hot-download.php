<?php

  require(dirname(__FILE__).'/../../../../../wp-load.php');
  require(dirname(__FILE__).'/../common/getViews.php');
  define(MAX_LINKS,20);
  class obj{}
  $data = new obj;
  $data->links = array();
  $cat_arg = array(
    'child_of' => get_cat_ID('source'),
    'orderby' => 'name',
    'hide_empty' => false
  );
  $cats = get_categories($cat_arg);
  $id_string = '';
  for ($i=0;$i<count($cats);$i++) {
    $id_string = $id_string.','.$cats[$i]->term_id;
  }
  $post_arg = array(
    'numberposts'     => MAX_LINKS,
    'offset'           => 0,
    'category'    => $id_string,
    'meta_key' => 'post_views_count',
    'orderby'          => 'meta_value_num',
    'order'            => 'DESC',
    'post_type'        => 'post',
    'post_status'      => 'publish',
    'suppress_filters' => true 
  );
  $posts = get_posts($post_arg);
  for ($i=0;$i<count($posts);$i++) {
    $ele = new obj;
    $ele->id = $posts[$i]->ID;
    $ele->name = $posts[$i]->post_title;
    array_push($data->links,$ele);
  }
  echo json_encode($data);
?>
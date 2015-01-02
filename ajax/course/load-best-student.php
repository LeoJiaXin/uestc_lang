<?php

  require(dirname(__FILE__).'/../../../../../wp-load.php');
  define(MAX_STUDENTS,3);
  class obj{}
  $data = new obj;
  $data->list = array();
  $cat_arg = array(
    'child_of' => get_cat_ID('e'),
    'orderby' => 'name',
    'hide_empty' => false
  );
  $cats = get_categories($cat_arg);
  for ($i=0;$i<count($cats);$i++) {
    $ele = new obj;
    $ele->title = $cats[$i]->slug;
    $ele->students = array();
    $post_arg = array(
      'numberposts'     => MAX_STUDENTS,
      'offset'           => 0,
      'category'    => $cats[$i]->term_id,
      'orderby'          => 'post_date',
      'order'            => 'DESC',
      'post_type'        => 'post',
      'post_status'      => 'publish',
      'suppress_filters' => true 
    );
    $posts = get_posts($post_arg);
    for ($j=0;$j<count($posts);$j++) {
      $student = json_decode($posts[$j]->post_content);
      array_push($ele->students,$student);
    }
    array_push($data->list,$ele);
  }
  echo json_encode($data);
?>
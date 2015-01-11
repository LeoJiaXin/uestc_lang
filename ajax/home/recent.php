<?php

  require(dirname(__FILE__).'/../../../../../wp-load.php');
  define(MAX_LINKS,12);
  class obj{}
  $data = new obj;
  $data->news = array();
  $cat_arg1 = array(
    'child_of' => get_cat_ID('course'),
    'orderby' => 'name',
    'hide_empty' => false,
    'exclude' => get_cat_ID('e').','.get_cat_ID('e1').','.get_cat_ID('e2').','.get_cat_ID('e3')
  );
  $course_cats = get_categories($cat_arg1);
  $course_ids = '';
  for ($i=0;$i<count($course_cats);$i++) {
    $course_ids = $course_ids.','.$course_cats[$i]->term_id;
  }
  $course_arg = array(
    'numberposts'     => MAX_LINKS,
    'offset'           => 0,
    'category'    => $course_ids,
    'orderby'          => 'post_date',
    'order'            => 'DESC',
    'post_type'        => 'post',
    'post_status'      => 'publish',
    'suppress_filters' => true 
  );
  $course_post = get_posts($course_arg);
  $course_new = new obj;
  $course_new->links = array();
  for ($i=0;$i<count($course_post);$i++) {
    $ele = new obj;
    $ele->id = $course_post[$i]->ID;
    $ele->name = $course_post[$i]->post_title;
    array_push($course_new->links, $ele);
  }
  array_push($data->news, $course_new);
  $other_type = array('source','employ');
  for ($j=0;$j<count($other_type);$j++) {
    $cat_arg2 = array(
      'child_of' => get_cat_ID($other_type[$j]),
      'orderby' => 'name',
      'hide_empty' => false
    );
    $source_cats = get_categories($cat_arg2);
    $source_ids = '';
    for ($i=0;$i<count($source_cats);$i++) {
      $source_ids = $source_ids.','.$source_cats[$i]->term_id;
    }
    $source_args = array(
      'numberposts'     => MAX_LINKS,
      'offset'           => 0,
      'category'    => $source_ids,
      'orderby'          => 'post_date',
      'order'            => 'DESC',
      'post_type'        => 'post',
      'post_status'      => 'publish',
      'suppress_filters' => true 
    );
    $source_post = get_posts($source_args);
    $source_new = new obj;
    $source_new->links = array();
    for ($i=0;$i<count($source_post);$i++) {
      $ele = new obj;
      $ele->id = $source_post[$i]->ID;
      $ele->name = $source_post[$i]->post_title;
      array_push($source_new->links, $ele);
    }
    array_push($data->news, $source_new);
  }
  $activity_args = array(
    'numberposts'     => MAX_LINKS,
    'offset'           => 0,
    'category'    => get_cat_ID('activity'),
    'orderby'          => 'post_date',
    'order'            => 'DESC',
    'post_type'        => 'post',
    'post_status'      => 'publish',
    'suppress_filters' => true 
  );
  $activity_post = get_posts($activity_args);
  $activity_new = new obj;
  $activity_new->links = array();
  for ($i=0;$i<count($activity_post);$i++) {
    $ele = new obj;
    $ele->id = $activity_post[$i]->ID;
    $ele->name = $activity_post[$i]->post_title;
    array_push($activity_new->links, $ele);
  }
  array_push($data->news, $activity_new);
  echo json_encode($data);
?>
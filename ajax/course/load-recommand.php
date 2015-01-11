<?php

  require(dirname(__FILE__).'/../../../../../wp-load.php');
  define(MAX_LINKS,12);
  class obj{}
  $data = new obj;
  $data->list = array();
  $data->group = array();
  $root_cat_id = get_cat_ID('course');
  $cat_arg = array(
    'child_of' => $root_cat_id,
    'orderby' => 'name',
    'hide_empty' => false
  );
  $cats = get_categories($cat_arg);
  $pIds = array();
  for ($i=0;$i<count($cats);$i++) {
    if ($cats[$i]->parent == $root_cat_id && $cats[$i]->name != 'e') {
      $ele = new obj;
      $ele->parent = urldecode($cats[$i]->slug);
      $ele->child = array();
      $ele->ids = '';
      $pIds[$cats[$i]->term_id] = $ele;
      array_push($data->group,$ele);
    }
  }
  for ($i=0;$i<count($cats);$i++) {
    if ($pIds[$cats[$i]->parent]) {
      $ele = new obj;
      $ele->id = $cats[$i]->term_id;
      $ele->name = urldecode($cats[$i]->slug);
      $pIds[$cats[$i]->parent]->ids = $pIds[$cats[$i]->parent]->ids.','.$cats[$i]->term_id;
      array_push($pIds[$cats[$i]->parent]->child,$ele);
    }
  }
  for ($i=0;$i<count($data->group);$i++) {
    $post_arg = array(
      'numberposts'     => MAX_LINKS,
      'offset'           => 0,
      'category'    => $data->group[$i]->ids,
      'orderby'          => 'post_date',
      'order'            => 'DESC',
      'post_type'        => 'post',
      'post_status'      => 'publish',
      'suppress_filters' => true 
    );
    $posts = get_posts($post_arg);
    unset($data->group[$i]->ids);
    $element = new obj;
    $element->title = $data->group[$i]->parent;
    $element->news = array();
    for ($j=0;$j<count($posts);$j++) {
      $tag = new obj;
      $tag->id = $posts[$j]->ID;
      $tag->name = $posts[$j]->post_title;
      array_push($element->news, $tag);
    }
    array_push($data->list,$element);
  }
  echo json_encode($data);
?>

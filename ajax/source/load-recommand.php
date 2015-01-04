<?php

  require(dirname(__FILE__).'/../../../../../wp-load.php');
  define(MAX_LINKS,12);
  class obj{}
  $data = new obj;
  $data->list = array();
  $data->group = array();
  $cat_arg = array(
    'child_of' => get_cat_ID('source'),
    'orderby' => 'name',
    'hide_empty' => false
  );
  $cats = get_categories($cat_arg);
  for ($i=0;$i<count($cats);$i++) {
      $ele = new obj;
      $ele->name = $cats[$i]->slug;
      $ele->id = $cats[$i]->term_id;
      array_push($data->group,$ele);
  }
  for ($i=0;$i<count($data->group);$i++) {
    $post_arg = array(
      'numberposts'     => MAX_LINKS,
      'offset'           => 0,
      'category'    => $data->group[$i]->id,
      'orderby'          => 'post_date',
      'order'            => 'DESC',
      'post_type'        => 'post',
      'post_status'      => 'publish',
      'suppress_filters' => true 
    );
    $posts = get_posts($post_arg);
    $element = new obj;
    $element->title = $data->group[$i]->name;
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
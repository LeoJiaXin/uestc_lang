<?php

  require(dirname(__FILE__).'/../../../../../wp-load.php');
  require(dirname(__FILE__).'/../common/getViews.php');
  define(MAX_LINKS,22);
  class obj{}
  $data = new obj;
  $data->id = get_cat_ID('activity');
  $data->latenews = array();
  $data->recentnews = array();
  $post_arg = array(
    'numberposts'     => MAX_LINKS,
    'offset'           => 0,
    'category'    => $data->id,
    'orderby'          => 'post_date',
    'order'            => 'DESC',
    'post_type'        => 'post',
    'post_status'      => 'publish',
    'suppress_filters' => true 
  );
  $posts = get_posts($post_arg);
  for ($j=0;$j<count($posts);$j++) {
    $tmp = json_decode($posts[$j]->post_content);
    $tag = new obj;
    $tag->id = $posts[$j]->ID;
    $tag->name = $posts[$j]->post_title;
    $tag->watched = getPostViews($tag->id);
    $tag->desc = $tmp->desc;
    if ($j<2) {
      $tag->img = $tmp->img;
      array_push($data->latenews, $tag);
    }else {
      array_push($data->recentnews, $tag);
    }
  }
  echo json_encode($data);
  ?>
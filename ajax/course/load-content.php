<?php
/*
*JSON format
*
*
  {
    title : 'this is a title',
    content : 'this is content,this is content,this is content,this is content,this is content'
  }
*/

  /* this is a example for json data */
  require(dirname(__FILE__).'/../../../../../wp-load.php');
  class obj{}
  $data = new obj;
  $args = array(
  'offset'           => 0,
  'category_name'    => 'a',
  'orderby'          => 'post_date',
  'order'            => 'DESC',
  'post_type'        => 'post',
  'post_status'      => 'publish',
  'suppress_filters' => true );
  $post_array = get_posts($args);
  $data->title = $post_array[0]->post_title;
  $content = json_decode($post_array[0]->post_content);
  $data->content = $content->description;
  echo json_encode($data);
?>
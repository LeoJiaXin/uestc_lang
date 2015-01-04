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
  $id = $_GET['id'];
  if ($id) {
    $data = get_post($id);
    if ($data) {
      $class = json_decode($data->post_content);
      if ($class) {
        $class->id = $data->ID;
        $class->name = $data->post_title;
        echo json_encode($class);
        exit;
      }
    }
  }
  $class = new obj;
  $class->state = "failed";
  echo json_encode($class);
?>
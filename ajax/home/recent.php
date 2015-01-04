<?php

  /* this is a example for json data */
  require(dirname(__FILE__).'/../../../../../wp-load.php');
  class obj{}
  $data = new obj;
  $data->basepath = get_template_directory_uri();
  $data->news = array();

  for ($i=0;$i<4;$i++) {
    $element = new obj;
    $element->title = 'this is a title';
    $element->img = '/images/avatar-0.png';
    $element->links = array();
    for ($j=0;$j<16;$j++) {
      $ele = new obj;
      $ele->link = '#';
      $ele->name = 'this is a news';
      array_push($element->links, $ele);
    }
    array_push($data->news, $element);
  }
  echo json_encode($data);
?>
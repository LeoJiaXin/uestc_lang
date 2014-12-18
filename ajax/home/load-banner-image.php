<?php
/*
*JSON format
*
*
  {
    basepath: '',
    images: [
      {
        img: '/images/banner1.jpg'
      },...
    ]
  }
*/

  /* this is a example for json data */
  require(dirname(__FILE__).'/../../../../../wp-load.php');
  class obj{}
  $data = new obj;
  $data->basepath = get_template_directory_uri();
  $data->images = array();
  for ($i=1;$i<=3;$i++) {
    $ele = new obj;
    $ele->img = '/images/banner'.$i.'.jpg';
    array_push($data->images, $ele);
  }
  echo json_encode($data);
?>
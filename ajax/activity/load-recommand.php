<?php
/*
*JSON format
*
*
  {
    basepath: '',
    latest: [
      {
        img: '/images/log.png',
        title: 'this is a title',
        desc: 'this is a description,this is a description,this is a description,this is a description,this is a description,this is a description,this is a description',
      },...
    ],
    recent: [
      {
        title: 'this is a title.......yeah',
        watch: 100
      },...
    ]
  }
*/

  /* this is a example for json data */
  require(dirname(__FILE__).'/../../../../../wp-load.php');
  class obj{}
  $data = new obj;
  $data->basepath = get_template_directory_uri();
  $data->latest = array();
  $data->recent = array();
  for ($i=0;$i<2;$i++) {
    $element = new obj;
    $element->img = '/images/logo.png';
    $element->title = 'this is a title';
    $element->desc = 'this is a description,this is a description,this is a description,this is a description,this is a description,this is a description,this is a description';
    array_push($data->latest, $element);
  }
  for ($i=0;$i<12;$i++) {
    $element = new obj;
    $element->title = 'this is a title.......yeah';
    $element->watch = 200;
    array_push($data->recent, $element);
  }
  echo json_encode($data);
  ?>
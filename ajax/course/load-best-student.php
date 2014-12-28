<?php
/*
*JSON format
*
*
  {
    basepath: '...',
    panels: [
      {
        title: 'SAT student'
        students: [
          {
            img: '/images/avatar-1.png',
            name: 'LiHua',
            class: 'SAT very best class A-1',
            degree: '8 for sat',
            feeling: 'It\'s my honor to get ...'
          },..
        ]
      },....
    ]
  }
*/

  /* this is a example for json data */
  require(dirname(__FILE__).'/../../../../../wp-load.php');
  class obj{}
  $data = new obj;
  $data->basepath = get_template_directory_uri();
  $data->panels = array();
  for ($i = 0;$i<3;$i++) {
    $element = new obj;
    $element->title = 'SAT best student';
    $element->students = array();
    for ($j = 0;$j<3;$j++) {
      $ele = new obj;
      $ele->img = '/images/avatar-1.png';
      $ele->name='LiHua';
      $ele->class='SAT very best class A-1';
      $ele->degree='8 for sat';
      $ele->feeling='It\'s my honor to get ...';
      array_push($element->students,$ele);
    }
    array_push($data->panels, $element);
  }
  echo json_encode($data);
?>
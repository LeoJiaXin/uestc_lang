<?php
/*
*JSON format
*
*
  {
    abroad: {
      big: [
        {
          img: 'avatar-3.png',
          title: 'this is a big title',
          desc: 'this is big description,this is big description,this is big description,this is big description'
        },...
      ],
      small: [
        {
          title: 'this is a small title',
          desc: 'this is small description,this is small description'
        },...
      ]
    },
    study: {
      #the same as abroad
    },
    work: {
      #the same as abroad
    }
  }
*/

  /* this is a example for json data */
  require(dirname(__FILE__).'/../../../../../wp-load.php');
  class obj{}
  $data = new obj;
  $data->basepath = get_template_directory_uri();
  $data->abroad = new obj;
  $data->study = new obj;
  $data->work = new obj;

  $tmp = array($data->abroad, $data->study, $data->work);
  for ($t = 0; $t<count($tmp); $t++) {
    $big = array();
    for ($i=0;$i<2;$i++) {
      $element = new obj;
      $element->img = 'avatar-3.png';
      $element->title = 'this is a big title';
      $element->desc = 'this is big description,this is big description,this is big description,this is big description';
      array_push($big, $element);
    }
    $tmp[$t]->big = $big;
    $small = array();
    for ($i=0;$i<6;$i++) {
      $element = new obj;
      $element->title = 'this is a big title';
      $element->desc = 'this is big description,this is big description';
      array_push($small, $element);
    }
    $tmp[$t]->small = $small;
  }

  echo json_encode($data);
  ?>
<?php
/*
*JSON format
*
*
  {
    recommand_list: [
      {
        title : 'this is a title',
        links : [
          {
            name : 'this is a link',
            link : '#'
          },...
        ]
      },....
    ]
  
  }
*/

  /* this is a example for json data */
  class obj{}
  $data = new obj;
  $data->recommand_list = array();
  for($i=0;$i<4;$i++) {
    $element = new obj;
    $element->title = 'this is a title'.$i;
    $element->links = array();
    for ($j=0;$j<12;$j++) {
      $tag = new obj;
      $tag->name = 'this is a link'.$j;
      $tag->link = '#';
      array_push($element->links, $tag);
    }
    array_push($data->recommand_list,$element);
  }

  echo json_encode($data);
  ?>
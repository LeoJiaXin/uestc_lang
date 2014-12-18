<?php
/*
*JSON format
*
*
  {
    links: [
      {
        name: 'this is hot downloaded resource',
        link: '#'
      },...
    ]
  }
*/

  /* this is a example for json data */
  class obj{}
  $data = new obj;
  $data->links = array();
  for ($i=0;$i<20;$i++) {
    $element = new obj;
    $element->name = $i.'. this is hot downloaded resource';
    $element->link = '#';
    array_push($data->links, $element);
  }
  echo json_encode($data);
?>
<?php
/*
*JSON format
*
*
  {
    list: [
      {
        a:'column1',
        b:'column2',
        c:'column3',
        d:'column4'
      },....
    ]
  
  }
*/

  /* this is a example for json data */
  class obj{}
  $data = new obj;
  $data->list = array();
  for($i=0;$i<12;$i++) {
    $element = new obj;
    $element->a = 'column a'.$i;
    $element->b = 'column b'.$i;
    $element->c = 'column c'.$i;
    $element->d = 'column d'.$i;
    array_push($data->list,$element);
  }

  echo json_encode($data);
  ?>
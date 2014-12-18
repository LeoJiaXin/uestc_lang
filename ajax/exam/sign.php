<?php
/*
  if it's success ,the json format is :
  {
    state: 'success'
  }
  if it's error .the json format is :
  {
    state: #error string
  }
*/

  class obj{}
  $result = new obj;
  //$result->state = 'you have sign before';
  $result->state = 'success';
  echo json_encode($result);
?>
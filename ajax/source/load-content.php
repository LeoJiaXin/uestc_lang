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
  class obj{}
  $data = new obj;
  $data->title = 'this is a title';
  $data->content = 'this is content,this is content,this is content,this is content,this is content
  hi,I\'m content, yeah I am content......
  this is content,this is content,this is content,this is content,this is content
  hi,I\'m content, yeah I am content......
  this is content,this is content,this is content,this is content,this is content
  hi,I\'m content, yeah I am content......
  this is content,this is content,this is content,this is content,this is content
  hi,I\'m content, yeah I am content......
  this is content,this is content,this is content,this is content,this is content
  hi,I\'m content, yeah I am content......
  this is content,this is content,this is content,this is content,this is content
  hi,I\'m content, yeah I am content......
  this is content,this is content,this is content,this is content,this is content
  hi,I\'m content, yeah I am content......';
  echo json_encode($data);
?>
<?php
/*
    [
      {
        id : 1,
        name : 'course-name',
        time : '100 hour',
        num : 20,
        max : 50
      },...
    ]
*/
  require(dirname(__FILE__).'/../../../../../wp-load.php');
  define(MAX_NUMBER_OF_CLASSES_IN_A_PAGE,25);
  $list = array();
  //set default velue if they have no value in _GET
  $page_index = $_GET['page_pos']?$_GET['page_pos']:0;
  $sec_type = $_GET['sec_type'];
  /*========== you code below ==========*/
  if ($sec_type) {
    $args = array(
      'numberposts'     => MAX_NUMBER_OF_CLASSES_IN_A_PAGE,
      'offset'           => $page_index*MAX_NUMBER_OF_CLASSES_IN_A_PAGE,
      'category'    => $sec_type,
      'orderby'          => 'post_date',
      'order'            => 'DESC',
      'post_type'        => 'post',
      'post_status'      => 'publish',
      'suppress_filters' => true 
    );
    $class_list = get_posts($args);
    if ($class_list) {
      for ($i=0;$i<count($class_list);$i++) {
        $element = json_decode($class_list[$i]->post_content);
        $element->id = $class_list[$i]->ID;
        array_push($list,$element);
      }
    }
    if ($page_index == 0) {
      $tmp = get_category($sec_type);
      if ($tmp && $tmp->count>0) {
        $list[0]->sum = ceil($tmp->count/MAX_NUMBER_OF_CLASSES_IN_A_PAGE);
      }
    }
  }
  /*========== you code above ==========*/
  echo json_encode($list);
?>
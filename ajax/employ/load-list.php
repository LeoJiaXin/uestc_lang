<?php
  require(dirname(__FILE__).'/../../../../../wp-load.php');
  define(MAX_NUMBER_OF_EMPLOYS_IN_A_PAGE,25);
  $list = array();
  $page_index = $_GET['page_pos']?$_GET['page_pos']:0;
  $sec_type = $_GET['sec_type'];
  if ($sec_type) {
    $args = array(
      'numberposts'     => MAX_NUMBER_OF_EMPLOYS_IN_A_PAGE,
      'offset'           => $page_index*MAX_NUMBER_OF_EMPLOYS_IN_A_PAGE,
      'category'    => $sec_type,
      'orderby'          => 'post_date',
      'order'            => 'DESC',
      'post_type'        => 'post',
      'post_status'      => 'publish',
      'suppress_filters' => true 
    );
    $employ_list = get_posts($args);
    if ($employ_list) {
      for ($i=0;$i<count($employ_list);$i++) {
        $element = json_decode($employ_list[$i]->post_content);
        $element->id = $employ_list[$i]->ID;
        unset($element->img);
        unset($element->description);
        array_push($list,$element);
      }
    }
    if ($page_index == 0) {
      $tmp = get_category($sec_type);
      if ($tmp && $tmp->count>0) {
        $list[0]->sum = ceil($tmp->count/MAX_NUMBER_OF_EMPLOYS_IN_A_PAGE);
      }
    }
  }
  echo json_encode($list);
  ?>
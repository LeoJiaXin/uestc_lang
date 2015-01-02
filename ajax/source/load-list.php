<?php
/*
    [
      {
        id : 1,
        name : 'source-name',
        size : '100MB',
        hot : 20,
        upload : '2014.12.20'
      },...
    ]
*/
  require(dirname(__FILE__).'/../../../../../wp-load.php');
  define(MAX_NUMBER_OF_SOURCES_IN_A_PAGE,25);
  $list = array();
  $page_index = $_GET['page_pos']?$_GET['page_pos']:0;
  $sec_type = $_GET['sec_type'];
  /*========== you code below ==========*/

  if ($sec_type) {
    $args = array(
      'numberposts'     => MAX_NUMBER_OF_SOURCES_IN_A_PAGE,
      'offset'           => $page_index*MAX_NUMBER_OF_SOURCES_IN_A_PAGE,
      'category'    => $sec_type,
      'orderby'          => 'post_date',
      'order'            => 'DESC',
      'post_type'        => 'post',
      'post_status'      => 'publish',
      'suppress_filters' => true 
    );
    $source_list = get_posts($args);
    if ($source_list) {
      for ($i=0;$i<count($source_list);$i++) {
        $element = json_decode($source_list[$i]->post_content);
        $element->id = $source_list[$i]->ID;
        array_push($list,$element);
      }
    }
    if ($page_index == 0) {
      $tmp = get_category($sec_type);
      if ($tmp && $tmp->count>0) {
        $list[0]->sum = ceil($tmp->count/MAX_NUMBER_OF_SOURCES_IN_A_PAGE);
      }
    }
  }

  /*========== you code above ==========*/
  echo json_encode($list);
?>
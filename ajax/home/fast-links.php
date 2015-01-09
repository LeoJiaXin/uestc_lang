<?php

  require(dirname(__FILE__).'/../../../../../wp-load.php');
  define(MAX_LINKS,12);
  class obj{}
  $data = new obj;
  $data->fast = array();
  $root_cat_id = get_cat_ID('course');
  $cat_arg = array(
    'child_of' => $root_cat_id,
    'orderby' => 'name',
    'hide_empty' => false
  );
  $cats = get_categories($cat_arg);
  $pIds = array();
  $link_parent_name = array('abc1','abc2','abc3','abc4','abc4');
  $link_img = array('c1n','c2n','c3n','c4n','c5n');
  $link_img_select = array('c1s','c2s','c3s','c4s','c5s');
  $j=1;
  for ($i=0;$i<count($cats);$i++) {
    if ($cats[$i]->parent == $root_cat_id && $cats[$i]->name != 'e') {
      $ele = new obj;
      $ele->parent = $cats[$i]->slug;
      if ($j<5) {
        $ele->parent_name = $link_parent_name[$j];
        $ele->img = $link_img[$j];
        $ele->img_s = $link_img_select[$j];
        $ele->top_img_index = $j+1;
        $ele->child_img_index = 1;
        $j=$j+1;
      }
      $ele->child = array();
      $pIds[$cats[$i]->term_id] = $ele;
      array_push($data->fast,$ele);
    }
  }
  for ($i=0;$i<count($cats);$i++) {
    if ($pIds[$cats[$i]->parent]) {
      $ele = new obj;
      $ele->id = $cats[$i]->term_id;
      $ele->name = $cats[$i]->slug;
      $ele->img = 'c'.$pIds[$cats[$i]->parent]->top_img_index.$pIds[$cats[$i]->parent]->child_img_index;
      $pIds[$cats[$i]->parent]->child_img_index = $pIds[$cats[$i]->parent]->child_img_index+1;
      array_push($pIds[$cats[$i]->parent]->child,$ele);
    }
  }

  //extra
  $exam = new obj;
  $exam->parent_name = $link_parent_name[0];
  $exam->img = $link_img[0];
  $exam->img_s = $link_img_select[0];
  $exam->child = array();
  $exam_child = new obj;
  $exam_child->name = 'aaaa';
  $exam_child->img = 'c11';
  $exam_child->link = 'exam';
  array_push($exam->child, $exam_child);
  array_unshift($data->fast, $exam);
  echo json_encode($data);
?>
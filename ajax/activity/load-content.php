<?php
  require(dirname(__FILE__).'/../../../../../wp-load.php');
  require(dirname(__FILE__).'/../common/getViews.php');
  class obj{}   
  $id = $_GET['id'];
  if ($id) {
    $data = get_post($id);
    if ($data) {
      $source = json_decode($data->post_content);
      if ($source) {
        setPostViews($id);
        $source->id = $data->ID;
        echo json_encode($source);
        exit;
      }
    }
  }
  $source = new obj;
  $source->state = "failed";
  echo json_encode($source);
?>
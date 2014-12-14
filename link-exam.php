<?php
/*
Template Name:exam
*/
?>
<?php get_header(); ?>
<div id="main-full">
  <div id="content-full">
   <div class="background-sign">
    <div class="sign-wrapper">
      <p class="sign-title"></p>
      <form action="#">
        <div class="form-row">
          <label for="email"></label>
          <input type="text" id="email">
        </div>
        <div class="form-row">
          <label for="name"></label>
          <input type="text" id="name">
        </div>
        <div class="form-row">
          <label for="citizenid"></label>
          <input type="text" id="citizenid">
        </div>
        <div class="form-row">
          <label for="studentid"></label>
          <input type="text" id="studentid">
        </div>
        <div class="form-row">
          <label for="phone"></label>
          <input type="text" id="phone">
        </div>
        <div class="form-row">
          <input type="checkbox" id="want-doc" value="do you want document">
        </div>
        <div class="form-row">
          <input type="submit" value="sign">
        </div>
      </form>
    </div>
  </div>
  </div>
</div>
<?php get_footer(); ?>
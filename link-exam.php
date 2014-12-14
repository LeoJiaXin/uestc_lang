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
      <p class="sign-title">IELTS 雅思模拟考试</p>
      <form action="#">
        <div class="form-row">
          <label for="email">email</label>
          <input type="text" id="email">
        </div>
        <div class="form-row">
          <label for="name">name</label>
          <input type="text" id="name">
        </div>
        <div class="form-row">
          <label for="citizenid">citizenid</label>
          <input type="text" id="citizenid">
        </div>
        <div class="form-row">
          <label for="studentid">studentid</label>
          <input type="text" id="studentid">
        </div>
        <div class="form-row">
          <label for="phone">phone</label>
          <input type="text" id="phone">
        </div>
        <div class="form-row">
          <input type="checkbox" id="want-doc" >
          <label for="want-doc">want document</label>
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
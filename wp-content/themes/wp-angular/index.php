<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package _tk
 */

get_header();
?>
    <!-- MAIN CONTENT -->

    <div class="container">
    <!-- THIS IS WHERE WE WILL INJECT OUR CONTENT ============================== -->
    Index Level

        <div ui-view></div>
    </div>
<?php /** get_sidebar(); **/ ?>
<?php get_footer(); ?>

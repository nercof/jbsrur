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
    <div ui-view="header"></div>
    <div ui-view="nav-section"></div>
    <div ui-view="search-form"></div>
    <div ui-view="content"></div>
    <div ui-view="social-section"></div>
    <div ui-view="suc-section"></div>
    <div ui-view="second-footer"></div>
    <div ui-view="main-footer"></div>
<?php /** get_sidebar(); **/ ?>
<?php get_footer(); ?>

<?php
/**
 * The Header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package _tk
 */
?><!DOCTYPE html>
<html <?php language_attributes();?> ng-app="jbsrurApp">
<head>

    <base href="/">
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="format-detection" content="telephone=no">
	<title><?php wp_title( '|', true, 'right' ); ?></title>
	<base href="<?php $url_info = parse_url( home_url() ); echo trailingslashit( $url_info['path'] ); ?>">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyDrl-z2weSfa5LQl34kkacL2ucsPhrNrgU"
type="text/javascript"></script>
    <?php wp_head(); ?>
<!-- Inicio: Incorporamos los script_name -->
<!-- JS (load angular, ui-router, and our custom js file) -->
<!-- Fin: -->
</head>

<body <?php body_class(); ?>>
	<?php do_action( 'before' ); ?>

<header id="masthead" class="site-header" role="banner">
<?php // substitute the class "container-fluid" below if you want a wider content area ?>
	<div class="container">
		<div class="row">
			<div class="site-header-inner col-sm-12">
				<div class="site-branding">
				</div>
			</div>
		</div>
	</div><!-- .container -->
</header><!-- #masthead -->

<nav class="site-navigation">
<?php // substitute the class "container-fluid" below if you want a wider content area ?>
	<div class="container">
		<div class="row">
			<div class="site-navigation-inner col-sm-12">
				<div class="navbar navbar-default" id="jbsrur-nav">
						<div class="navbar-header">
							<!-- .navbar-toggle is used as the toggle for collapsed navbar content -->
							<button data-target="#navbar-collapse" data-toggle="collapse" class="navbar-toggle" type="button">
								<span class="sr-only">Toggle navigation </span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
							</button>

							<!-- Your site title as branding in the menu -->
							<a href="http://www.jbsrur.com.ar/#/" class="navbar-brand logo"></a>
						</div>

						<!-- The WordPress Menu goes here -->
						<div class="collapse navbar-collapse" id="navbar-collapse" ng-controller="menuHeaderController" >
							<ul class="nav navbar-nav" id="main-menu">
								<li class="menu-item menu-item-type-custom menu-item-object-custom" ng-repeat="item in items"
								ng-class="{ 'menu-item-has-children': item.children, 'dropdown': item.children }">
									<a title="{{item.title}}" ui-sref="{{item.state}}" class="menu-item" ng-if="!item.children && !item.search">{{item.title}}
										<i class="fa {{item.icon}}" ng-if="item.icon"></i>
									</a>
									<a title="{{item.title}}"  class="menu-item search" ng-if="item.search" ng-click="openSearch()">{{item.title}}
										<i class="fa {{item.icon}}" ng-if="item.icon"></i>
									</a>
									<a title="{{item.title}}" class="menu-item" ng-if="item.children"
									data-toggle="dropdown" class="dropdown-toggle" aria-haspopup="true">
										{{item.title}}
										<span class="caret"></span>
									</a>
									<ul role="menu" class=" dropdown-menu" ng-if="item.children">
											<li class="menu-item menu-item-type-custom menu-item-object-custom" ng-repeat="child in item.children">
												<a ui-sref="{{child.state}}" class="sub-menu-item" title="{{child.title}}" >{{child.title}}</a>
											</li>
									</ul>
								</li>
							</ul>
						</div>
				</div><!-- .navbar -->
			</div>
		</div>
	</div><!-- .container -->
</nav><!-- .site-navigation -->

<div class="main-content">
<?php // substitute the class "container-fluid" below if you want a wider content area ?>
	<div>
		<div>
			<div id="content" class="main-content-inner col-xs-12">

<?php
/**
* The template for displaying the footer.
*
* Contains the closing of the id=main div and all content after
*
* @package _tk
*/
?>
</div><!-- close .*-inner (main-content or sidebar, depending if sidebar is used) -->
</div><!-- close .row -->
</div><!-- close .container -->
</div><!-- close .main-content -->

<footer id="colophon" class="site-footer" role="contentinfo">
	<?php // substitute the class "container-fluid" below if you want a wider content area ?>
	<div class="container">
		<div class="row">
			<div class="site-footer-inner col-sm-12 col-xs-12 col" ng-controller="mainFooterController as vm">
				<div class="col-sm-6 col-xs-12" id="mainFooter">
					<p>{{vm.title}}</p>
					<p>{{vm.subtitle}}</p>
					<a href="mailto:">{{vm.email}}</a>
				</div>
				<div class="col-sm-6 col-xs-12" id="secondFooter" ng-repeat="link in vm.links">
					
					{{link}}

				</div>
			</div>
		</div>
	</div><!-- close .container -->
</footer><!-- close #colophon -->

<?php wp_footer(); ?>

</body>
</html>

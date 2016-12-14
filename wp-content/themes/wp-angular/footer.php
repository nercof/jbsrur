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
<div ui-view="sub-footer" />
</div><!-- close .row -->
</div><!-- close .container -->
</div><!-- close .main-content -->

<footer id="colophon" class="site-footer bg-red" role="contentinfo">
	<?php // substitute the class "container-fluid" below if you want a wider content area ?>
	<div class="container" id="mainFooter">
		<div class="col-sm-12">
			<div class="site-footer-inner row" ng-controller="mainFooterController as vm">
				<div class="col-sm-6 col-xs-12 left">
					<p class="title">{{vm.title}}</p>
					<p class="subtitle">{{vm.subtitle}}</p>
					<a href="{{vm.fb}}"><i class="typcn typcn-social-twitter"></i></a>
					<a href="{{vm.twitter}}"><i class="typcn typcn-social-facebook"></i></a>
					<a href="mailto:{{vm.email}}"><i class="typcn typcn-mail"></i></a>
					</p>
				</div>
				<div class="col-sm-6 col-xs-12 right">
					<ul class="dashed-list">
						<li ng-repeat="link in vm.links">
							<a href='{{link.url}}'>{{link.name}}</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	 </div><!-- close .container -->
</footer><!-- close #colophon -->

<?php wp_footer(); ?>

</body>
</html>

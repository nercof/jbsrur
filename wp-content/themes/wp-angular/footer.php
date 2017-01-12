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
					<div ng-repeat="link in vm.social" class="links">
						<a href="{{link.url}}">
							<i class="{{link.title}}"></i>
						</a>
					</div>
				</div>
				<div class="col-sm-6 col-xs-12 right">
					<ul class="dashed-list" ng-if="vm.items">
						<li ng-repeat="item in vm.items">
							<a href='{{item.url}}'>{{item.title}}</a>
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

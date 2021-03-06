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
							<a href='{{item.urlFooter}}'>{{item.title}}</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	 </div><!-- close .container -->
</footer><!-- close #colophon -->

<?php wp_footer(); ?>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-2086731-1', 'auto');
  ga('send', 'pageview');

</script>
</body>
</html>

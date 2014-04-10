### Installation
angular-breadcrumb requires ui-router in minimal version *0.2.0* (when the method `$state.get` was added).

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/ncuillery/angular-breadcrumb/master/dist/angular-breadcrumb.min.js
[max]: https://raw.github.com/ncuillery/angular-breadcrumb/master/dist/angular-breadcrumb.js

Or download it with bower : open a terminal and run 
```
bower install angular-breadcrumb
```

Include the js your web page:

```html
<script src="[...]angular-breadcrumb[.min].js"></script>
```

Add dependency to your app module:
```js
'ncy-angular-breadcrumb'
```

The module is now installed. It exposes the `$breadcrumb` service and the `ncy-breadcrumb` directive.

### Configuration
Configure the ui-router.

Define a `ncyBreadcrumbLabel` property to each states
```js
$stateProvider.state('home', {
  url: '/home',
  templateUrl: 'views/home.html',
  controller: 'HomeCtrl',
  data: {
    ncyBreadcrumbLabel: 'Home page'
  }
})
```
Note : the property `ncyBreadcrumbLabel` can contains bindings which are evaluated against the current state controller. For example, this state's config :
```js
$stateProvider.state('home', {
  url: '/home',
  templateUrl: 'views/home.html',
  controller: function($scope) {
    $scope.foo='bar';
  },
  data: {
    ncyBreadcrumbLabel: 'State {{foo}}'
  }
})
```
will produces `State bar`. 

### Activation
Use the directive `ncy-breadcrumb`
```html
<div ncy-breadcrumb></div>
```
Let the magic begin !

See the (future) reference page for all the configuration options.
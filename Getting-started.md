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
Configure the ui-router (see [the ui-router project](https://github.com/angular-ui/ui-router)).

Define a `ncyBreadcrumb.label` property to each states
```js
$stateProvider.state('home', {
  url: '/home',
  templateUrl: 'views/home.html',
  controller: 'HomeCtrl',
  ncyBreadcrumb: {
    label: 'Home page'
  }
})
```

### Activation
Use the directive `ncy-breadcrumb`
```html
<div ncy-breadcrumb></div>
```
Let the magic begin !

See the API reference page for all the configuration options :
- [Global configuration](API-Reference#provider-breadcrumbprovider)
- [State-specific configuration](API-Reference#provider-stateprovider-external)
This page presents the different ways to use the templating system.

## Predefined templates
The directive loads 2 predefined templates which can be accessed by their name in the $breadcrumbProvider configuration. For example :
```js
myAppModule.config(function($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
      template: 'bootstrap2'
    });
  });
```
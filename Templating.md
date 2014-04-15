This page presents the different ways to use the templating system.

## Predefined templates
The directive loads 2 predefined templates which can be accessed by their name in the `$breadcrumbProvider` configuration. For example :
```js
myAppModule.config(function($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
      template: 'bootstrap2'
    });
  });
```
### Template 'bootstrap2'
```html
<ul class="breadcrumb">
  <li ng-repeat="step in steps | limitTo:(steps.length-1)">
    <a href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a> 
    <span class="divider">/</span>
  </li>
  <li ng-repeat="step in steps | limitTo:-1" class="active">
    <span>{{step.ncyBreadcrumbLabel}}</span>
  </li>
</ul>
```
This template displays a list (ul/li) of links separate with slash character '/', expect for the last step which is a simple span.
### Template 'bootstrap3' (default)
```html
<ol class="breadcrumb">
  <li ng-repeat="step in steps | limitTo:(steps.length-1)">
    <a href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a>
  </li>
  <li ng-repeat="step in steps | limitTo:-1" class="active">
    <span>{{step.ncyBreadcrumbLabel}}</span>
  </li>
</ol>
```
The same as above expect the `ol` element and no more separators (moved in CSS).

## Custom template
The property `template` of the `$breadcrumbProvider` accepts HTML templates too. This inline declaration is not the proper method for templating but can be used for short and fast templates. For example :
```js
myAppModule.config(function($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
      template: '<div>My app<span ng-repeat="step in steps"> > {{step.ncyBreadcrumbLabel}}</span></div>'
    });
  });
```

## External template

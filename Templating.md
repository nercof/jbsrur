This page presents the different ways to use the templating system.

Whatever the type of template (predefined, custom or external), the unique variable accessible (attached to the directive's scope) in templates is the array `steps`.
The objects in array are the state objects from the ui-router configuration. These objects are extended with two properties :

| Property           | Description                                                                                                                                         |
|--------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| ncyBreadcrumbLabel | Contains the interpolated value from the property of the same name in the state object. It allows to display a human-readable label for the steps.  |
| ncyBreadcrumbLink  | Contains the URL to reach the step. Useful to display a back link for each steps in the breadcrumb.                                                 |

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
  <li ng-repeat="step in steps" ng-switch="$last || !!step.abstract" ng-class="{active: $last}">
    <a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a>
    <span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span>
    <span class="divider" ng-hide="$last">/</span>
  </li>
</ul>
```
This template displays a list (ul/li) of links separate with slash character '/', expect for the last step which is a simple span.
### Template 'bootstrap3' (default)
```html
<ol class="breadcrumb">
  <li ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract">
    <a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a>
    <span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span>
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
The property `templateUrl` of the `$breadcrumbProvider` defined an external template. It is directly bounded to the `templateUrl` of the DDO ([Directive Definition Object](http://docs.angularjs.org/api/ng/service/$compile)).
```js
myAppModule.config(function($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
      templateUrl: 'templates/breadcrumb.html'
    });
  });
```

### Examples
In external template, all the power of AngularJS is available. For example, it allows HTML in `ncyBreadcrumbLabel` by using [ngBindHtml](https://docs.angularjs.org/api/ng/directive/ngBindHtml) directive. Here is the 'bootstrap3' template with HTML binding:
```html
<ol class="breadcrumb">
    <li ng-repeat="step in steps | limitTo:(steps.length-1)">
        <a href="{{step.ncyBreadcrumbLink}}" ng-bind-html="step.ncyBreadcrumbLabel"></a>
    </li>
    <li ng-repeat="step in steps | limitTo:-1" class="active">
        <span ng-bind-html="step.ncyBreadcrumbLabel"></span>
    </li>
</ol>
```
**WARNING** : See the usage of `ngBindHtml` requires additional dependencies. See the [documentation] (https://docs.angularjs.org/api/ng/directive/ngBindHtml) for details.

Then, the property `ncyBreadcrumbLabel` can contain HTML, like: 
```js
$stateProvider.state('search', {
  [...]
  data: {
    ncyBreadcrumbLabel: '<span class="glyphicon glyphicon-search"></span> Search'
  }
})
```
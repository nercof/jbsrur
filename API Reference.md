## Provider $breadcrumbProvider
### Description
Provider that returns an instance of $breadcrumb service. It contains the global configuration of the module.

### Options

| Property        | Default      | Details                                                                                                                                                                                                                           |
|-----------------|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| prefixStateName | null         | Contains an existing state's name (usually the home page of the app). If defined, the state is the first step of the breadcrumb, whatever the current state. Not necessary if all states are children of a root "homepage" state. It can be defined with a state's name or a function returning a state's name. It accepts url params with the same syntax as the UI-router [uiSref](http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.directive:ui-sref) directive. |
| template        | 'bootstrap3' | Contains a predefined template's name (see the [template page](https://github.com/ncuillery/angular-breadcrumb/wiki/Templating) for the list) or HTML for a custom template. This property is ignored if `templateUrl` is defined.                                                                   |
| templateUrl     | null         | Contains the path to a template file. This property takes precedence over the `template` property.                                                                                                                                |
| includeAbstract | false        | If true, abstract states are included in the breadcrumb. This option has a lower priority than the state-specific option `skip`                                                                                                   |

See the template page for more information about template.

### Methods
**setOptions**

Setter for options defined in a module.config block. For example :
```js
myAppModule.config(function($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
      prefixStateName: 'home',
      template: 'bootstrap2'
    });
  })
```

## Service $breadcrumb
### Description
This service is responsible for access to $state and for directive configuration.

### Methods
**getStatesChain**

Returns the state chain to the current state (i.e. all the steps of the breadcrumb). It's an array of state object enriched with the module-specific property `ncyBreadcrumbLink` (the href for the breadcrumb step).

**getLastStep**

Return the last step of the breadcrumb, generally the one relative to the current state, expect if it is configured as skipped (the method returns its parent). As `getStatesChain`, the state object is enriched with `ncyBreadcrumbLink`.

## Directive ncyBreadcrumb
### Description
The directive asks for the state chain from the $breadcrumb service and displays the corresponding breadcrumb.

### Usage
```html
<div ncy-breadcrumb></div>
```
The directive does not require attribute value. The configuration is done by the $breadcrumbProvider.

## Directive ncyBreadcrumbLast
### Description
The directive renders the last step of the breadcrumb (generally the current state). If the last state is configured as skipped, the directive displays the previous step of the breadcrumb (if it exists).

### Usage
```html
<span ncy-breadcrumb-last></span>
```
The directive can have an optional attribute value: the template of the directive. As the AngularJS directive [ngBindTemplate](https://docs.angularjs.org/api/ng/directive/ngBindTemplate), it is useful when the HTML element can't accept child element (like `title` or `option`):
```html
<title ncy-breadcrumb-last="Sample app: {{ncyBreadcrumbLabel}}"></title>
```

## Provider $stateProvider (external)
### Description
The UI-Router's [$stateProvider](http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.$stateProvider) contains
the "state-specific" configuration. It is added to each state object under the `ncyBreadcrumb` key :
```js
$stateProvider.state('home', {
  url: '/home',
  templateUrl: 'views/home.html',
  controller: 'HomeCtrl',
  ncyBreadcrumb: {
    label: 'Home page' // angular-breadcrumb's configuration
  }
})
```

All the properties listed below are optional but the main one `label` is strongly recommended in each state
definition (except the abstract states).

### State options
**label**

Contains the label for the step in the breadcrumb. The state name is used if not defined.

The property `ncyBreadcrumbLabel` can contains bindings which are evaluated against the scope of the current state controller.
For example, this state's config :
```js
$stateProvider.state('home', {
  url: '/home',
  templateUrl: 'views/home.html',
  controller: function($scope) {
    $scope.foo='bar';
  },
  ncyBreadcrumb: {
    label: 'State {{foo}}'
  }
})
```
... will produces `State bar`.

**parent**

Overrides the parent state (only for the breadcrumb).

It is useful when 2 states are not parent in states configuration but must be parent in the breadcrumb.
For example, in [UI-Router sample](http://angular-ui.github.com/ui-router/sample/): contact.list and contact.detail are
configured as siblings but must be parent/child in breadcrumb :
contact.list > contact.detail

To do that, the state contact.detail must defined the property `parent`:
```js
$stateProvider.state('contact.detail', {
  url: '/{contactId:[0-9]{1,4}}',
  views: [...],
  ncyBreadcrumb: {
    parent: 'contacts.list' // Override the parent state (only for the breadcrumb).
  }
})
```

This property can be defined with a function returning the name of the parent state. The function can accept a scope as first argument: it is the scope of the current state controller (the same used for labels interpolation):
```js
$stateProvider.state('contact.detail', {
  url: '/{contactId:[0-9]{1,4}}',
  views: [...],
  ncyBreadcrumb: {
    parent: function($scope) {
      return $scope.cameFromUnrelatedState ? 'unrelated.state' : 'contact.list';
    }
  }
})
```

Both declarations (string or function) accept url params. The syntax is the same as the UI-router [uiSref](http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.directive:ui-sref) directive :
```js
$stateProvider.state('product.detail', {
  url: '/{productId}',
  views: [...],
  ncyBreadcrumb: {
    parent: 'category.list({cat: 'product'})'
  }
})
```

**skip**

When defined to `true`, the state is never included in the chain of states and never appears in the breadcrumb. It is useful when a state doesn't interfere with the main browsing (side panel, modal, ...).

```js
$stateProvider.state('contact.detail.picture', {
  url: '/img{imgId}',
  template: [...],
  ncyBreadcrumb: {
    skip: true // Never display this state in breadcrumb.
  }
})

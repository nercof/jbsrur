## Provider $breadcrumbProvider
### Description
Provider that returns an instance of $breadcrumb service. It contains the global configuration of the module.

### Options

| Property        | Default      | Details                                                                                                                                                                                                                           |
|-----------------|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| prefixStateName | null         | Contains an existing state's name (usually the home page of the app). If defined, the state is the first step of the breadcrumb, whatever the current state. Not necessary if all states are children of a root "homepage" state. |
| template        | 'bootstrap3' | Contains a predefined template's name (see the template page for the list) or HTML for a custom template. This property is ignored if `templateUrl` is defined.                                                             |
| templateUrl     | null         | Contains the path to a template file. This property takes precedence over the `template` property.                                                                                                                               |

See the (future) template page for more information about template.

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

## Directive ncyBreadcrumb
### Description
The directive asks for the state chain from the $breadcrumb service and displays the corresponding breadcrumb.

### Usage
```html
<div ncy-breadcrumb></div>
```
The directive does not require attribute value. The configuration is done by the $breadcrumbProvider.

## Provider $stateProvider (external)
### Description
The UI-Router's [$stateProvider](http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.$stateProvider) contains
the "state-specific" configuration. The state definition allows the user to define
[customs properties](https://github.com/angular-ui/ui-router/wiki#attach-custom-data-to-state-objects) under the `data` key :
```js
$stateProvider.state('home', {
  url: '/home',
  templateUrl: 'views/home.html',
  controller: 'HomeCtrl',
  data: {
    ncyBreadcrumbLabel: 'Home page' // angular-breadcrumb's configuration
  }
})
```

All the properties listed below are optional but the main one `ncyBreadcrumbLabel` is strongly recommended in each state
definition (except the abstract states).

### State options
**ncyBreadcrumbLabel**

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
  data: {
    ncyBreadcrumbLabel: 'State {{foo}}'
  }
})
```
... will produces `State bar`.

Every states that can be displayed in the breadcrumb *must* defined this property. If not, a state [inherit the property from his parent](https://github.com/angular-ui/ui-router/wiki/Nested-States-%26-Nested-Views#inherited-custom-data). It results a breadcrumb including 2 states with the same label...

**ncyBreadcrumbParent** (0.2.0)

Overrides the parent state (only for the breadcrumb).

It is useful when 2 states are not parent in states configuration but must be parent in the breadcrumb.
For example, in [UI-Router sample](http://angular-ui.github.com/ui-router/sample/): contact.list and contact.detail are
configured as siblings but must be parent/child in breadcrumb :
contact.list > contact.detail

To do that, the state contact.detail must defined the property `ncyBreadcrumbParent`:
```js
$stateProvider.state('contact.detail', {
  url: '/{contactId:[0-9]{1,4}}',
  views: [...],
  data: {
    ncyBreadcrumbParent: 'contacts.list' // Override the parent state (only for the breadcrumb).
  }
})
```

**ncyBreadcrumbSkip** (0.2.0)

When defined to `true`, the state is never included in the chain of states and never appears in the breadcrumb. It is useful when a state doesn't interfere with the main browsing (side panel, modal, ...).

```js
$stateProvider.state('contact.detail.picture', {
  url: '/img{imgId}',
  template: [...],
  data: {
    ncyBreadcrumbSkip: true // Never display this state in breadcrumb.
  }
})

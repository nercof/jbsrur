## Provider $breadcrumbProvider
### Description
Provider that returns an instance of $breadcrumb service.

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


## Installation
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

The module is now installed and active. It exposes the `$breadcrumb` service and the `ncy-breadcrumb` directive.

## Configuration
Use the directive `ncy-breadcrumb`
```html
<div ncy-breadcrumb></div>
```
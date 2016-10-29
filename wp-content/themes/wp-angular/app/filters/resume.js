(function() {
    'use strict';

    angular
        .module('app.core')
        .filter('resume', resume);

    function resume() {
        return resumeItem

        function resumeItem(item, query) {
            var index = ('' + item).search(query);
            if ( index >= 0 ){
                item = ( '' + item ).slice( index, index + 80 )+'...';
            } else {
                item = ( '' + item ).slice( 0, 80 )+'...';
            }
            return item;
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('tokkoController', tokkoController);

    //tokkoController.$inject = ['$scope', 'tokkoService'];

    /* @ngInject */
    function tokkoController($scope, tokkoService) {
        var vm = this;
        vm.tokko_key = tokkoService.TOKKO_KEY;
        
        activate(tokkoService);

        function activate(tokkoService) {
         
            console.log('TokkoController -_-');
            console.log(tokkoService.TOKKO_KEY);
        }
    }
})();

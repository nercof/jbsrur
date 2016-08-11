(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('tokkoController', function ($scope, tokkoFactory, tokkoService) {
        console.log('tokkoController');
        var vm = this;
        vm.tokko_key = tokkoService.TOKKO_KEY;
        vm.test = 'TEST';

        console.log('key' + vm.tokko_key);

        vm.tokko_state = [];

        tokkoFactory.getState().then(function(response){
            vm.tokko_state = response.items;
        });
        vm.tokko_state = tokkoFactory.listStates.items;


        console.log(vm.tokko_key);
        console.log(vm.test);

        activate(tokkoService);

        function activate(tokkoService){}
    });
})();

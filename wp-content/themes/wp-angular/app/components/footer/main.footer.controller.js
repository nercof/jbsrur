(function() {
    'use strict';

    angular
    .module('app.core')
    .controller('mainFooterController', mainFooterController);

    mainFooterController.$inject = ['$state', '$stateParams', 'tokkoFactory', '$scope', '$rootScope', 'menuFactory'];

    /**
    * mainFooterController: <comment>
    *  - @view: main-footer
    */
    function mainFooterController($state, $stateParams, tokkoFactory, $scope, $rootScope, menuFactory) {
        var vm = this;
        var arraySocial = ['typcn typcn-social-twitter', 'typcn typcn-social-facebook', 'typcn typcn-at'];
        vm.title = false;
        vm.email = false;
        vm.fb = false;
        vm.twitter = false;
        vm.subtitle = false;
        vm.links = [];

        create();

        /**
        * create()
        *
        */
        function create() {
            vm.title = "JB SRUR";
            vm.subtitle = "La inmobiliaria de Córdoba";
            vm.email = "info@jbsrur.com.ar";
            vm.fb = "";
            vm.twitter = "";

            menuFactory.getFormatMenu(20).then(function(response){
                    vm.items = response.items;
            });
            menuFactory.getFormatMenu(19).then(function(response){
                    vm.social = _.filter(response.items, function(item){ return arraySocial.indexOf(item.title) >= 0; });
            });
        }
    }
})();

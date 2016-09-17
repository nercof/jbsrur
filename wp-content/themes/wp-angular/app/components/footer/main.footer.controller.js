(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('mainFooterController', mainFooterController);

    mainFooterController.$inject = ['$state', '$stateParams', 'tokkoFactory', '$scope', '$rootScope'];

    /**
     * mainFooterController: <comment>
     *  - @view: main-footer
     */
    function mainFooterController($state, $stateParams, tokkoFactory, $scope, $rootScope) {
        var vm = this;

        create();
        
        /**
         * create() 
         *
         */
        function create() {}
    }
})();
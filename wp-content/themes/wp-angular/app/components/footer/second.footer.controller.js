(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('secondFooterController', secondFooterController);

    secondFooterController.$inject = ['$state', '$stateParams', 'tokkoFactory', '$scope', '$rootScope'];

    /**
     * secondFooterController: <comment>
     *  - @view: second-footer
     */
    function secondFooterController($state, $stateParams, tokkoFactory, $scope, $rootScope) {
        var vm = this;

        create();
        
        /**
         * create() 
         *
         */
        function create() {}
    }
})();

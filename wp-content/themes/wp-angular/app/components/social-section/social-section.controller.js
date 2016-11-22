(function() {
    'use strict';

    angular
    .module('app.core')
    .controller('socialSectionController', socialSectionController);

    socialSectionController.$inject = ['menuFactory', '_', 'resourceFactory'];

    /* @ngInject */
    function socialSectionController(menuFactory, _, resourceFactory) {
        console.log("<< socialSectionController >>");
        var vm = this;

        activate();

        function activate() {
            getMenuItems();
        }

        function getMenuItems() {
            menuFactory.getHeader(19).then(function(response){
                vm.items = response.items;
                console.log(vm.items);
                setIcons();
            });
        }

        function setIcons() {
            _.each(vm.items, function (item) {
                item.icon = item.title;
            });
        }
    }
})();

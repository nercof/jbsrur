(function() {
    'use strict';

    angular
    .module('app.core')
    .controller('tokkoResultController', tokkoResultController);

    function tokkoResultController( $scope, tokkoFactory, tokkoService, NgMap,
        resourceFactory, $stateParams, $state) {
            var vm = this;
            vm.data = {}
            vm.cache = {}
            vm.propiedades = {};
            $scope.current = $state.current
            vm.state = true

            // Activamos
            activate(vm);

            function activate(vm) {
                // Recive paramas views tokko-input.
                vm.data = $stateParams.data;
                vm.cache = $stateParams.cache;
                vm.data = $stateParams.data;
                if ($state.current.name != 'propiedad') {
                    vm.state = false;
                }

                // Bandera para ocultar el resultado de propiedades
                // Call factory to search Tokko properties.
                tokkoFactory.getProperties(vm.data).then(function(response) {
                    vm.propiedades = response.objects;
                });
            }
            // Re-direct to fullDetails
            vm.fullDetails = function(prop){
                console.log('Re-direct to fullDetails');
                //$state.go('detalle', {data: prop , id:prop.id});
            }
        }
    })();

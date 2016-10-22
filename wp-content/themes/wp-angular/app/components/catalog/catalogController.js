(function() {
    'use strict';

    angular
    .module('app.core')
    .controller('catalogController', catalogController);

    /**
    * catalogController: Gestión sobre el listado de propiedades en tokko.
    *  - @view: tokko-search-result
    */
    function catalogController($scope, tokkoFactory, tokkoService, NgMap,
        resourceFactory, $stateParams, $state, $localStorage) {
            console.log('<< Loading catalogController >>');
            var vm = this;

            vm.title_view = '';
            vm.barriosXzona = {};
            vm.allProperties = {};

            // Empleadas para la paginacion de propiedades.
            // @see: https://angular-ui.github.io/bootstrap/
            // @see: http://stackoverflow.com/questions/34775157/angular-ui-bootstrap-pagination-ng-model-not-updating
            vm.totalItems = false;
            vm.currentPage = 1;
            vm.itemsPerPage = 16;
            vm.properties = {};

            // controla el estado de la consulta.
            vm.error = false;
            vm.spinner = true;

            // Activamos
            activate(vm);

            /**
            * activate():
            *
            * << @Comment >>
            */
            function activate(vm) {
                // Título de la vista
                vm.title_view = $stateParams.title_view;

                // @TODO: comment this, it's only for test btree
                vm.barriosXzona = resourceFactory.query({
                    id: 'barrios_cba.json'
                },
                function(data) {
                    vm.barrios = data.to.barrios;
                });

                // Filtramos por tipo de Operacion
                vm.allProperties = _.filter($localStorage.prop_cache, function(prop) {
                    return _.some(prop.operations, function(oper) {
                        return oper.operation_type == $stateParams.type;
                    });
                });

                if(_.isEmpty(vm.allProperties)){
                    vm.error = true;
                }
                vm.totalItems = vm.allProperties.length;
                vm.spinner = false;

                // Iniciamos las propiedades filtradas para la paginacion inicial.
                vm.properties = vm.allProperties.slice(0 * vm.itemsPerPage, 1 * vm.itemsPerPage);

            } // fin activate()

            /**
            * Setea lista propiedades x pagina
            * El listado de propiedades depende del parametro page pasado.
            *
            * @param {int} page - Pagina actual
            */
            vm.setPagingData = function (page) {
                vm.properties =  vm.allProperties.slice((page - 1) * vm.itemsPerPage, page * vm.itemsPerPage);
            }

            /**
            * Funcion guia para cambiar la pagina seleccionada.
            *
            */
            vm.pageChanged = function(){
                vm.setPagingData(vm.currentPage);
            }
        } // Fin controller
    })();

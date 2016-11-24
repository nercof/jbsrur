(function() {
    'use strict';

    angular
    .module('app.core')
    .controller('emprendimientoController', emprendimientoController);

    /**
    * emprendimientoController: Gestión sobre el listado de propiedades en tokko.
    *  - @view: tokko-search-result
    */
    function emprendimientoController($scope, tokkoFactory, tokkoService, NgMap,
        resourceFactory, typeFactory, $stateParams, $state, $localStorage, STATE) {
            var vm = this;

            vm.title_view = '';
            vm.allDevelopments = [];
            vm.nemprendimientos = STATE.NE;

            // $storage support
            $scope.$storage = $localStorage;

            // Empleadas para la paginacion de propiedades.
            vm.totalItems = false;
            vm.currentPage = 1;
            vm.itemsPerPage = 6;

            // Controla el estado de la consulta.
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

                // Filtramos por tipo de Operacion
                if (_.isEmpty($scope.$storage.developments)) {
                    getDevelopments().then(function (data){
                        vm.allDevelopments = data;
                        
                        // Determinamos category:
                        filter_category($stateParams.category);

                        if (_.isEmpty(vm.allDevelopments)) {
                            vm.error = true;
                        }
                        else{
                            $scope.$storage.developments = vm.allDevelopments;
                            _short_description();

                            // Variables auxiliares para el paginador.
                            vm.totalItems = vm.allDevelopments.length;
                            vm.spinner = false;

                            // Iniciamos las propiedades filtradas para la paginacion inicial.
                            vm.developments = vm.allDevelopments.slice(0 * vm.itemsPerPage, 1 * vm.itemsPerPage);
                        }
                    });
                }
                else {
                    vm.allDevelopments = $scope.$storage.developments;

                    // Determinamos category:{Nuestros-Otros emprendimientos}
                    filter_category($stateParams.category);

                    _short_description();

                    // Variables auxiliares para el paginador.
                    vm.totalItems = vm.allDevelopments.length;
                    vm.spinner = false;

                    // Iniciamos las propiedades filtradas para la paginacion inicial.
                    vm.developments = vm.allDevelopments.slice(0 * vm.itemsPerPage, 1 * vm.itemsPerPage);
                }
            } // fin activate()

            /*
            * Filtramos por Tipo de Emprendimientos.
            * @param {int} category - id Categoria de emprendimiento
            */
            function filter_category(category) {
                vm.allDevelopments = _.filter(vm.allDevelopments, function (development) {
                    // Array categories
                    return _.each(development.categories, function(cat){
                        return category == cat;
                    });
                });
            }

            /**
            * Acorta la descripcion para mostrar solo los primeros 80 caracteres.
            *
            */
            function _short_description() {
                _.each(vm.allDevelopments, function (development) {
                    development.shortDescription = development.content.rendered.slice(0, 120) + '...';
                });
            }

            /**
            * Obtener los <emprendimientos> desde la API de Tokko
            * @param {} page - <description>
            */
            function getDevelopments() {
                return typeFactory.getEmprendimientos()
                .then(
                    function(data){
                        return data;
                    }
                );
            }

            /**
            * Setea lista propiedades x pagina
            * El listado de propiedades depende del parametro page pasado.
            *
            * @param {int} page - Pagina actual
            */
            vm.setPagingData = function(page) {
                vm.developments = vm.allDevelopments.slice((page - 1) * vm.itemsPerPage, page * vm.itemsPerPage);
            }

            /**
            * Funcion guia para cambiar la pagina seleccionada.
            *
            */
            vm.pageChanged = function() {
                vm.setPagingData(vm.currentPage);
            }
        } // Fin controller
    })();

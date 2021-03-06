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
        resourceFactory, typeFactory, mediaFactory, $stateParams, $state, $localStorage, STATE) {
            var vm = this;

            vm.title_view = '';
            vm.allDevelopments = [];
            vm.urlEmprendimientos = $state.current.name;

            // $storage support
            $scope.$storage = $localStorage;

            // Empleadas para la paginacion de propiedades.
            vm.totalItems = 0;
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
                getDevelopments().then(function (data){
                    vm.allDevelopments = data;
                    // Determinamos category:
                    filter_category($stateParams.category);

                    if (_.isEmpty(vm.developments)) {
                        vm.error = true;
                    }
                    else{
                        // Cargar la url de la imagen
                        setImages();
                        _short_description();

                        // Variables auxiliares para el paginador.

                        vm.spinner = false;

                        // Iniciamos las propiedades filtradas para la paginacion inicial.
                        vm.totalItems = vm.developments.length;
                        //vm.developments = vm.allDevelopments.slice(0 * vm.itemsPerPage, 1 * vm.itemsPerPage);
                    }
                });
            } // fin activate()

            /**
            * Permite mapear el id de imagen con la url del BE.
            */
            function setImages() {
                var medias = [];

                // Recorremos las sucursales y obtenemos los id.media
                _.each(vm.allDevelopments, function (development) {
                    // Buscamos las imagenes en WP
                    mediaFactory.getMedia(development.featured_media).then(function(data){
                        development.image = data.source_url;
                    });

                    // Buscamos la imagen de portada
                    development.portada = development["wpcf-portada"];
                });
            }

            /*
            * Filtramos por Tipo de Emprendimientos.
            * @param {int} category - id Categoria de emprendimiento
            */
            function filter_category(category) {

                vm.developments = _.filter(vm.allDevelopments, function (development) {
                // Array categories
                    return development.categories.indexOf(category) >= 0;
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

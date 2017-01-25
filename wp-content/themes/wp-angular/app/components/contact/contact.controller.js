(function() {
    'use strict';

    angular
    .module('app.core')
    .controller('contactController', contactController);

    contactController.$inject = ['_', 'typeFactory'];

    /* @ngInject */
    function contactController(_ , typeFactory) {
        var vm = this;

        activate();

        function activate() {
            typeFactory.getPostByCategoryName("contacto").then(
                function(data) {
                    // slug: "formulario-de-contacto"
                    vm.contact_form = _.find(data, {slug:"contacto"});
                    angular.element('#jbsrur_contact_form').append(vm.contact_form.content.rendered);
                    angular.element('#jbsrur_contact_form form').attr("action", "/contacto/#wpcf7-f533-p563-o1");
                    angular.element('#jbsrur_contact_form form').attr("name", "contactForm");
                    angular.element('#jbsrur_contact_form input[type="email"]').attr("ng-model", "contactForm.email");
                });
        }
    }
})();

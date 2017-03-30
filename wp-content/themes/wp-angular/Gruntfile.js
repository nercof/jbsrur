module.exports = function(grunt) {
    // Configuración de Grunt.js
    grunt.initConfig({
        // Configuración para proyectos y tareas.
        concat: {
        	libs: {
        		src: ['node_modules/angular/angular.js',
        		 'node_modules/angular-ui-router/release/angular-ui-router.js',
        		 'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
        		 'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
        		 'node_modules/underscore/underscore.js',
        		 'node_modules/ngmap/build/scripts/ng-map.js',
        		 'node_modules/angular-resource/angular-resource.js',
        		 'node_modules/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.js',
        		 'node_modules/ngstorage/ngStorage.js',
                 'node_modules/angular-breadcrumb/dist/angular-breadcrumb.js',
        		 'app/services/dirPagination.js'
                 ],
        		dest: 'build/libs.js'
        	},
            app: {
                src: ['app/app.js',
                 'app/app.core.js',
                 'app/app.conf.js',
                 'app/app.routes.js',
                 'app/app.factories.js',
                 'app/app.services.js'],
                dest: 'build/app.js'
            }
        },
        uglify: {
        	libs: {
        		src: 'build/libs.js',
        		dest: 'build/libs.min.js'
        	},
            app: {
                src: 'build/app.js',
                dest: 'build/app.min.js'
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['concat', 'uglify']);
};
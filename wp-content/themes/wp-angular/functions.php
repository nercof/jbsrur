<?php
/**
* _tk functions and definitions
*
* @package _tk
*/

/**
* Set the content width based on the theme's design and stylesheet.
*/
if ( ! isset( $content_width ) )
$content_width = 750; /* pixels */

if ( ! function_exists( '_tk_setup' ) ) :
    /**
    * Set up theme defaults and register support for various WordPress features.
    *
    * Note that this function is hooked into the after_setup_theme hook, which runs
    * before the init hook. The init hook is too late for some features, such as indicating
    * support post thumbnails.
    */
    function _tk_setup() {
        global $cap, $content_width;

        // Add html5 behavior for some theme elements
        add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ) );

        // This theme styles the visual editor with editor-style.css to match the theme style.
        add_editor_style();

        /**
        * Add default posts and comments RSS feed links to head
        */
        add_theme_support( 'automatic-feed-links' );

        /**
        * Enable support for Post Thumbnails on posts and pages
        *
        * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
        */
        add_theme_support( 'post-thumbnails' );

        function register_recipes_post_type() {
            $args = array( 'public' => true, 'label' => 'Recipes' );
            register_post_type( 'recipe', $args );
        }
        add_action( 'init', 'register_recipes_post_type' );

        /**
        * Enable support for Post Formats
        */
        add_theme_support( 'post-formats', array( 'aside', 'image', 'video', 'quote', 'link', 'recipe' ) );

        /**
        * Rename format in order to change to custom format
        *
        */

        function rename_post_formats( $safe_text ) {
            if ( $safe_text == 'Aside' )
            return 'Tip';

            return $safe_text;
        }

        add_filter( 'esc_html', 'rename_post_formats' );

        //rename Aside in posts list table
        function live_rename_formats() {
            global $current_screen;

            if ( $current_screen->id == 'edit-post' ) { ?>
                <script type="text/javascript">
                jQuery('document').ready(function() {

                    jQuery("span.post-state-format").each(function() {
                        if ( jQuery(this).text() == "Aside" )
                        jQuery(this).text("Tip");
                    });

                });
                </script>
                <?php }
            }
            add_action('admin_head', 'live_rename_formats');



            /**
            * Setup the WordPress core custom background feature.
            */
            add_theme_support( 'custom-background', apply_filters( '_tk_custom_background_args', array(
                'default-color' => 'ffffff',
                'default-image' => '',
            ) ) );

            /**
            * Make theme available for translation
            * Translations can be filed in the /languages/ directory
            * If you're building a theme based on _tk, use a find and replace
            * to change '_tk' to the name of your theme in all the template files
            */
            load_theme_textdomain( '_tk', get_template_directory() . '/languages' );

            /**
            * This theme uses wp_nav_menu() in one location.
            */
            register_nav_menus( array(
                'primary'  => __( 'Header bottom menu', '_tk' ),
                ) );

            }
        endif; // _tk_setup
        add_action( 'after_setup_theme', '_tk_setup' );

        /**
        * Register widgetized area and update sidebar with default widgets
        */
        function _tk_widgets_init() {
            register_sidebar( array(
                'name'          => __( 'Sidebar', '_tk' ),
                'id'            => 'sidebar-1',
                'before_widget' => '<aside id="%1$s" class="widget %2$s">',
                'after_widget'  => '</aside>',
                'before_title'  => '<h3 class="widget-title">',
                'after_title'   => '</h3>',
                ) );
            }
            add_action( 'widgets_init', '_tk_widgets_init' );

            /**
            * Enqueue scripts and styles
            */
            function _tk_scripts() {

                // Import the necessary TK Bootstrap WP CSS additions
                wp_enqueue_style( '_tk-bootstrap-wp', get_template_directory_uri() . '/includes/css/bootstrap-wp.css' );

                // load bootstrap css
                wp_enqueue_style( '_tk-bootstrap', get_template_directory_uri() . '/includes/resources/bootstrap/css/bootstrap.min.css' );

                // load Font Awesome css
                wp_enqueue_style( '_tk-font-awesome', get_template_directory_uri() . '/includes/css/font-awesome.min.css', false, '4.1.0' );
                // load arquitecture-font
                wp_enqueue_style( '_tk-arquitecture-font', get_template_directory_uri() . '/includes/css/arquitecture-font.css');
                // load _tk styles
                wp_enqueue_style( '_tk-style', get_stylesheet_uri() );

                // load bootstrap js
                wp_enqueue_script('_tk-bootstrapjs', get_template_directory_uri().'/includes/resources/bootstrap/js/bootstrap.min.js', array('jquery') );

                // load bootstrap wp js
                wp_enqueue_script( '_tk-bootstrapwp', get_template_directory_uri() . '/includes/js/bootstrap-wp.js', array('jquery') );

                //Load angular
                wp_enqueue_script('angularjs', get_template_directory_uri() .'/node_modules/angular/angular.min.js');

                wp_enqueue_script(
                'angular-ui-router',
                get_template_directory_uri() .'/node_modules/angular-ui-router/release/angular-ui-router.js');

                wp_enqueue_script(
                'angular-ui-bt',
                get_template_directory_uri() .'/node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js');

                wp_enqueue_script(
                'angular-ui-bt-tpls',
                get_template_directory_uri() .'/node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js');

                wp_enqueue_script(
                'underscore',
                get_template_directory_uri() .'/node_modules/underscore/underscore-min.js');

                wp_enqueue_script(
                'ng-map',
                get_template_directory_uri() .'/node_modules/ngmap/build/scripts/ng-map.js');

                wp_enqueue_script(
                'angular-resource',
                get_template_directory_uri() .'/node_modules/angular-resource/angular-resource.js');

                wp_enqueue_script(
                'ngstorage',
                get_template_directory_uri() .'/node_modules/ngstorage/ngStorage.js');

                wp_enqueue_script(
                'app',
                get_stylesheet_directory_uri() . '/app/app.js',
                array( 'angularjs', 'angular-ui-router', 'underscore',  'ng-map',
                'angular-resource', 'ngstorage', 'angular-ui-bt', 'angular-ui-bt-tpls'));

                wp_enqueue_script(
                'routes',
                get_stylesheet_directory_uri() . '/app/app.routes.js',
                array( 'app' ));

                wp_enqueue_script(
                'core',
                get_stylesheet_directory_uri() . '/app/app.core.js',
                array( 'app' ));

                wp_enqueue_script(
                'config',
                get_stylesheet_directory_uri() . '/app/app.conf.js',
                array( 'app' ));

                wp_enqueue_script(
                'menu-header',
                get_stylesheet_directory_uri() . '/app/components/menu-header/menu-header.controller.js',
                array( 'core' ));

                wp_enqueue_script(
                'main',
                get_stylesheet_directory_uri() . '/app/components/main/main.controller.js',
                array( 'core' ));

                wp_enqueue_script(
                'tokko',
                get_stylesheet_directory_uri() . '/app/components/tokko/tokko.controller.js',
                array( 'core' ));

                wp_enqueue_script(
                'slider',
                get_stylesheet_directory_uri() . '/app/components/slider/slider.controller.js',
                array( 'core', 'factories' ));

                wp_enqueue_script(
                'tokkoResult',
                get_stylesheet_directory_uri() . '/app/components/tokko/tokko.result.controller.js',
                array( 'core', 'factories' ));

                wp_enqueue_script(
                'tokkoDetails',
                get_stylesheet_directory_uri() . '/app/components/tokko/tokko.details.controller.js',
                array( 'core', 'factories' ));

                wp_enqueue_script(
                'tokko.developments',
                get_stylesheet_directory_uri() . '/app/components/tokko/developments/tokko.developments.controllers.js',
                array( 'core', 'factories'));

                wp_enqueue_script(
                'tokko.developments.details',
                get_stylesheet_directory_uri() . '/app/components/tokko/developments/tokko.developments.details.controllers.js',
                array( 'core', 'factories'));

                wp_enqueue_script(
                'secondFooter',
                get_stylesheet_directory_uri() . '/app/components/footer/second.footer.controller.js',
                array( 'core', 'factories'));

                wp_enqueue_script(
                'mainFooter',
                get_stylesheet_directory_uri() . '/app/components/footer/main.footer.controller.js',
                array( 'core', 'factories'));

                wp_enqueue_script(
                'novedades',
                get_stylesheet_directory_uri() . '/app/components/novedades/novedades.controller.js',
                array( 'core', 'factories'));

                wp_enqueue_script(
                'catalog',
                get_stylesheet_directory_uri() . '/app/components/catalog/catalogController.js',
                array( 'core', 'factories'));

                wp_enqueue_script(
                'nav-section',
                get_stylesheet_directory_uri() . '/app/components/nav-section/nav-section.controller.js',
                array( 'core', 'factories'));

                wp_enqueue_script(
                'to_trust',
                get_stylesheet_directory_uri() . '/app/filters/to_trust.js',
                array( 'core', 'factories' ));

                wp_enqueue_script(
                'resume',
                get_stylesheet_directory_uri() . '/app/filters/resume.js',
                array( 'core', 'factories' ));

                wp_enqueue_script(
                'save_storage',
                get_stylesheet_directory_uri() . '/app/filters/save_model.js',
                array( 'core', 'factories' ));

                wp_enqueue_script(
                'services',
                get_stylesheet_directory_uri() . '/app/app.services.js',
                array( 'app' ));

                wp_enqueue_script(
                'wp-service',
                get_stylesheet_directory_uri() . '/app/services/wp.service.js',
                array( 'services' ));

                wp_enqueue_script(
                'tokko-service',
                get_stylesheet_directory_uri() . '/app/services/tokko.service.js',
                array( 'services' ));

                wp_enqueue_script(
                'factories',
                get_stylesheet_directory_uri() . '/app/app.factories.js',
                array( 'app' ));

                wp_enqueue_script(
                'menuFactory',
                get_stylesheet_directory_uri() . '/app/factories/menu.factory.js',
                array( 'factories', 'wp-service' ));

                wp_enqueue_script(
                'typeFactory',
                get_stylesheet_directory_uri() . '/app/factories/type.factory.js',
                array( 'factories', 'wp-service' ));

                wp_enqueue_script(
                'mediaFactory',
                get_stylesheet_directory_uri() . '/app/factories/media.factory.js',
                array( 'factories', 'wp-service' ));

                wp_enqueue_script(
                'tokkoFactory',
                get_stylesheet_directory_uri() . '/app/factories/tokko.factory.js',
                array( 'factories', 'wp-service' ));

                wp_enqueue_script(
                'resourceFactory',
                get_stylesheet_directory_uri() . '/app/factories/resource.factory.js',
                array( 'factories', 'tokko-service' , 'tokkoFactory'));

                wp_enqueue_script( '_tk-skip-link-focus-fix', get_template_directory_uri() . '/includes/js/skip-link-focus-fix.js', array(), '20130115', true );


                // With get_stylesheet_directory_uri()
                wp_localize_script('app', 'localized',
                array(
                    'views' => get_template_directory_uri() . '/app/views/',
                    'tokko' => get_template_directory_uri() . '/app/views/tokko-search/'
                    )
                );

                if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
                    wp_enqueue_script( 'comment-reply' );
                }

                if ( is_singular() && wp_attachment_is_image() ) {
                    wp_enqueue_script( '_tk-keyboard-image-navigation', get_template_directory_uri() . '/includes/js/keyboard-image-navigation.js', array( 'jquery' ), '20120202' );
                }

            }
            add_action( 'wp_enqueue_scripts', '_tk_scripts' );

            /**
            * Implement the Custom Header feature.
            */
            require get_template_directory() . '/includes/custom-header.php';

            /**
            * Custom template tags for this theme.
            */
            require get_template_directory() . '/includes/template-tags.php';

            /**
            * Custom functions that act independently of the theme templates.
            */
            require get_template_directory() . '/includes/extras.php';

            /**
            * Customizer additions.
            */
            require get_template_directory() . '/includes/customizer.php';

            /**
            * Load Jetpack compatibility file.
            */
            require get_template_directory() . '/includes/jetpack.php';

            /**
            * Load custom WordPress nav walker.
            */
            require get_template_directory() . '/includes/bootstrap-wp-navwalker.php';

            /**
            * Adds WooCommerce support
            */
            add_action( 'after_setup_theme', 'woocommerce_support' );
            function woocommerce_support() {
                add_theme_support( 'woocommerce' );
            }

            add_action( 'rest_api_init', 'register_wpcf_custom_fields' );
            function register_wpcf_custom_fields() {
                $custom_fields = array(
                    'novedad' => ['wpcf-destacada', 'wpcf-encabezado', 'wpcf-tipo-de-novedad'],
                    'emprendimiento' => ['wpcf-latitud-y-longitud', 'wpcf-imagen-galeria-0', 'wpcf-sucursal', 'wpcf-codigo-de-referencia'],
                    'sucursal' => ['wpcf-latitud-y-longitud', 'wpcf-telefono', 'wpcf-direccion', 'wpcf-email', 'wpcf-galeria-0']
                );
                foreach ($custom_fields as $custom_type => $fields) {
                    foreach ($fields as $key => $field) {
                        register_rest_field( $custom_type,
                            $field,
                            array(
                                'get_callback'    => 'wpcf_get_field',
                                'update_callback' => null,
                                'schema'          => null,
                            )
                        );
                    }
                }
            }

            /**
             * Get the value of the "wpcf-destacada" field
             *
             * @param array $object Details of current post.
             * @param string $field_name Name of field.
             * @param WP_REST_Request $request Current request
             *
             * @return mixed
             */
            function wpcf_get_field( $object, $field_name, $request ) {
                return get_post_meta( $object[ 'id' ], $field_name, true );
            }

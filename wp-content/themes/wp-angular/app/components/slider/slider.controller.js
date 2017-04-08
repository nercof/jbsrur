(function() {
    'use strict';

    angular
    .module('app.core')
    .controller('sliderController', sliderController);


    function sliderController($scope, typeFactory, mediaFactory) {
        typeFactory.getPostByCategory(7).then(function(posts){

            // Declaramos la variable.
            var mediasIds = [], i, self=this;
            var orderSlide = [];
            var orden = '';
            var post = {};

            mediasIds = getMediasIds(posts);

            $scope.posts = posts;
            $scope.medias = [];
            $scope.spinner = true;

            _.each(mediasIds, function (mediasId, i) {
                mediaFactory.getMedia(mediasId).then(function (data) {
                    var actived = (i == 0 ? true : false );
                    var slider = {};
                    // Datos para el Slider
                    slider.url = data.guid.rendered;
                    slider.active = actived,
                    slider.featured_media = data.id;

                    // Leemos el post relacionado al Slider.
                    post = getContentPost(slider.featured_media, posts);
                    slider.caption = post.content.rendered
                    slider.link = post['wpcf-link'];

                    // Gestionamos ordenamiento del Slider
                    slider.orden = slider.url.split('Slider-');
                    slider.orden = slider.orden[1].split('.');
                    slider.orden = slider.orden[0];
                    $scope.medias.push(slider);
                    if (mediasIds.length == $scope.medias.length)
                    {
                        $scope.spinner = false;
                    }
                });
            });
        });


        /**
        * Ordena por numero de la url de Slider{XX}.jpg
        * slug: "{XX}-slidehome"
        * title.rendered: "{XX}-SlideHome"
        * @param {}
        */
        function sortByName(medias, posts){
            // Declaramos la variable.
            var orderSlide = [];
            var orden = '';
            var post = {};

            _.each(medias, function(media){
                orden = media.url.split('Slider-');
                orden = orden[1].split('.');
                post = getContentPost(media.featured_media, posts);
                media.caption = post.content.rendered
                media.link = post['wpcf-link'];
                media.orden = orden[0];
            });
            orderSlide = _.sortBy(medias, 'orden');
            return orderSlide;
        }

        /*
        * Permite asociar los post con el media para obtener el contenido a
        * visualizar con el caption.
        *
        */
        function getContentPost(featured_media, posts){
            var caption;
            //caption = _.find(posts, function(post){
            return _.find(posts, function(post){
                return post.featured_media == featured_media;
            });

            //return caption.content.rendered;
        }

        function getMediasIds(posts){
            var ids = [];

            _.each(posts, function(post){
                ids.push(post.featured_media);
            });
            return ids;
        }

        function parseMedias(medias) {
            var parsedMedias = [];
            for (var i = 0; i < medias.length; i++) {
                var actived = (i == 0 ? true : false );

                parsedMedias.push({ url: medias[i].guid.rendered,
                    active: actived,
                    featured_media: medias[i].id
                })
            }
            return parsedMedias;
        }
    }
})();

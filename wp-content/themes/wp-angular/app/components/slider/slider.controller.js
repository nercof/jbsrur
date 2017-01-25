(function() {
    'use strict';

    angular
    .module('app.core')
    .controller('sliderController', sliderController);


    function sliderController($scope, typeFactory, mediaFactory) {
        typeFactory.getPostByCategory(7).then(function(posts){

            var mediasIds = [], i, self=this;
            var orderSlide = [];
            mediasIds = getMediasIds(posts);
            $scope.medias = mediaFactory.getMediasByIds(mediasIds).then(function(medias){
                $scope.medias = parseMedias(medias);
                // Ordenando medias por nombre.
                $scope.medias = sortByName($scope.medias, posts);                
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

            _.each(medias, function(media){
                orden = media.url.split('Slider-');
                orden = orden[1].split('.');
                media.caption = getContentPost(media.featured_media, posts);
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
            caption = _.find(posts, function(post){
                return post.featured_media == featured_media;
            });

            return caption.content.rendered;
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

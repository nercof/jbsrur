(function() {
    'use strict';

    angular
    .module('app.core')
    .controller('sliderController', sliderController);


    function sliderController($scope, typeFactory, mediaFactory) {
        typeFactory.getPostByCategory(7).then(function(posts){
            var mediasIds = [], i, self=this;
            mediasIds = getMediasIds(posts);
            $scope.medias = mediaFactory.getMediasByIds(mediasIds).then(function(medias){
                $scope.medias = parseMedias(medias);
            });
        });

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
                parsedMedias.push({url: medias[i].guid.rendered, active: actived})

            }
            return parsedMedias;
        }
    }
})();

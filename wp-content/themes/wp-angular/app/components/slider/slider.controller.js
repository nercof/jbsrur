(function() {
    'use strict';

    angular
    .module('app.core')
    .controller('sliderController', sliderController);


    function sliderController($scope, postFactory, mediaFactory) {

        postFactory.getPostByCategory(7).then(function(posts){
            var mediasIds = [], i, self=this;
            mediasIds = getMediasIds(posts);
            mediaFactory.getMediasByIds(mediasIds).then(function(medias){
                $scope.medias = parseMedias(medias);
                console.log('slider', $scope.medias);
            });
            console.log('urls3',$scope.medias);
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
                console.log(i, medias);
                var actived = (i == 0 ? true : false );
                console.log(actived)
                parsedMedias.push({url: medias[i].guid.rendered, active: actived})

            }
            return parsedMedias;
        }
    }
})();

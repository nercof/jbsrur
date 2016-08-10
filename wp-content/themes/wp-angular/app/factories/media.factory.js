'use strict';
;(function(){
  angular
  .module('app.factories')
  .factory('mediaFactory', dataFactory)
  .constant('MEDIA_TAG', 'media');

  function dataFactory(wordpressService, MEDIA_TAG, BASE_WP_URL){

    var data = {
      'listMedias':  listMedias,
      'getMedia': getMedia
    }

    function listMedias() {
      return getPosts("").then(function(data){
        return data;
      });
    }
    function getMedia(id) {
      return getMedias(id).then(function(data){
        return data;
      });
    }
    function getMedias(id) {
      return wordpressService.getRequest(BASE_WP_URL, MEDIA_TAG, id);
    }

    return data;
 }
}());

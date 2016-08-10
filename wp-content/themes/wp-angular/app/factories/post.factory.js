'use strict';
;(function(){
  angular
  .module('app.factories')
  .factory('postFactory', dataFactory)
  .constant('POST_TAG', 'posts');

  function dataFactory(wordpressService, POST_TAG, BASE_WP_URL, _){

    var data = {
      'listPosts':  listPosts,
      'getPost': getPost
    }

    function listPosts() {
      return getPosts("").then(function(data){
        return data;
      });
    }
    function getPost(id) {
      return getPosts(id).then(function(data){
        return data;
      });
    }
    function getPosts(id) {
      return wordpressService.getRequest(BASE_WP_URL, POST_TAG, id);
    }
    return data;
 }
}());

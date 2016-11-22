'use strict';;
(function() {
  angular
    .module('app.factories')
    .factory('typeFactory', dataFactory)
    .constant('POST_TAG', 'posts')
    .constant('POST_CAT', '?filter[category_name]=')
    .constant('EMP_TAG', 'emprendimiento')
    .constant('SUC_TAG', 'sucursal');

  function dataFactory(wordpressService, POST_TAG, BASE_WP_URL, _, POST_CAT, EMP_TAG, SUC_TAG) {

    var data = {
      'listPosts': listPosts,
      'getPost': getPost,
      'getPostByCategory': getPostByCategory,
      'getPostByCategoryName': getPostByCategoryName,
      'getEmprendimientos': getEmprendimientos,
      'getPostsByContentType': getPostsByContentType,
      'getSucursales': getSucursales,
    }

    function getEmprendimientos() {
      return wordpressService.getRequest(BASE_WP_URL, EMP_TAG, "");
    }

    function getSucursales() {
      return wordpressService.getRequest(BASE_WP_URL, SUC_TAG, "");
    }

    function getPostsByContentType(typeUri) {
      return wordpressService.getRequest(BASE_WP_URL, typeUri, "");
    }

    function listPosts() {
      return getPosts("").then(function(data) {
        return data;
      });
    }

    function getPost(id) {
      return getPosts(id).then(function(data) {
        return data;
      });
    }

    function getPosts(id) {
      return wordpressService.getRequest(BASE_WP_URL, POST_TAG, id);
    }

    function getPostByCategory(idCategory) {

      return listPosts().then(function(data) {
        return filterByCategory(idCategory, data);
      });
    }

    function filterByCategory(id, data) {
      var postFiltered = _.filter(data, function(post) {
        return post.categories.indexOf(id) >= 0;
      });
      return postFiltered;
    }

    /**
     * getPostByCategoryName(pName) devuelve los post by category = pName
     *
     */
    function getPostByCategoryName(pName) {
      return filterPostByCategoryName(pName).then(function(data) {
        return data;
      });
    }

    /**
     * filterPostByCategoryName(pName) Consume el servicio WP para leer los post
     * by category=pName
     *
     * API: wp-json/wp/v2/posts?filter[category_name]=pName
     */
    function filterPostByCategoryName(pName, pCloud) {
      // Arma url
      var tag = POST_CAT + pName;

      return wordpressService.getRequest(BASE_WP_URL, POST_TAG + tag, "");
    }

    return data;
  }
}());

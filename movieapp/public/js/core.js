var app = angular.module('app', ['ngResource']);

app.factory('resources', function($resource, $location) {
  var url = $location.absUrl().split('/');
  var movieID = url[url.length - 1];

  var factory = {};

  factory.routes = {
    movieAPI: $resource('/movies/:action', {}, {
      fetch: {method: 'GET', params: {title: '@title', action: 'search'}, isArray: false },
      details: {method: 'GET', params: {id: movieID, action: 'details'}, isArray: false },
      boxoffice: {method: 'GET', params: {action: 'boxoffice'}, isArray: false },
      review: {method: 'GET', params: {id: '@id', action: 'review'}, isArray: false }
    })
  };

  return factory;
});

app.controller('movieController', function($scope, resources) {

  $scope.searchMovies = function() {
    resources.routes.movieAPI.fetch({title: $scope.title}, function done(response) {
      if (response.movies.length > 0)
        $scope.movies = { main: response.movies.shift(0), alternatives: response.movies };
      else 
        $scope.movies = response.movies;
    });
  };

  $scope.toggleCast = function() {
    if ($scope.displayCast) {
      $scope.castBtnText = '+ show cast';
      $scope.displayCast = false;
    }
    else {
      $scope.castBtnText = '- hide cast';
      $scope.displayCast = true;
    }
  };

  $scope.toggleReview = function(id) {
    if ($scope.displayReview) {
      console.log('display')
      $scope.reviewBtnText = '+ show review';
      $scope.displayReview = false;
    }
    else {
      console.log('hide')
      if (!$scope.reviews) {
        resources.routes.movieAPI.review({id: id}, function done(response) {
          $scope.reviews = response.reviews;
        });
      }
      // handle buttons
      $scope.reviewBtnText = '- hide review';
      $scope.displayReview = true;
    }
  };

});

app.controller('movieDetailController', function($scope, resources) {

  function init() {
    resources.routes.movieAPI.details(function done(response) {
        $scope.movie = response;
    });
  }
  init();

});

app.controller('boxOfficeController', function($scope, resources) {

  function init() {
    resources.routes.movieAPI.boxoffice(function done(response) {
        $scope.movies = response.movies;
    });
  }
  init();

});
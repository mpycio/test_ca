'use strict';

angular.module('myApp.home', ['ngRoute', 'ui.router'])

  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app.home', {
        url: 'home',
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
      })
  }])

  .controller('HomeCtrl', [function() {

  }]);
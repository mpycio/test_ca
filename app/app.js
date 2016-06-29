'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ui.router',

  'myApp.home',
  'myApp.carousel'
])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        abstract: true,
        url: '/',
        template: '<section class="app" ui-view></section>'
      });
    $urlRouterProvider.otherwise('/home');
  }]);

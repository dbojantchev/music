var espApp = angular.module('musicapp', ['datatables', 'ui.router','ui.bootstrap']);

    $('#container').show();

    espApp.config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/views/catalog.html'
            })
            .state('catalog', {
                url: '/catalog',
                templateUrl: '/views/catalog.html'
            });
    });



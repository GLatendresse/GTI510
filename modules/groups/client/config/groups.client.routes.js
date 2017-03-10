(function () {
  'use strict';

  angular
    .module('groups.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('groups', {
        abstract: true,
        url: '',
        template: '<ui-view/>'
      })
      .state('groups.create', {
        url: '/creategroup',
        templateUrl: '/modules/groups/client/views/create-group.client.view.html',
        controller: 'CreateGroupController',
        controllerAs: 'vm'
      });
  }
}());

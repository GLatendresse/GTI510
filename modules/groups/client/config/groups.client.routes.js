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
      })
      .state('listGroups', {
        url: '/groups',
        templateUrl: '/modules/groups/client/views/list-groups.client.view.html',
        controller: 'ListGroupsController',
        controllerAs: 'vm'
      })
      .state('groupDetails', {
        url: '/groups/:groupId',
        templateUrl: '/modules/groups/client/views/group-details.client.view.html',
        controller: 'GroupDetailsController',
        controllerAs: 'vm'
      });
  }
}());

(function () {
  'use strict';

  angular
    .module('groups')
    .controller('GroupDetailsController', GroupDetailsController);

  GroupDetailsController.$inject = ['UsersService', 'Authentication', '$http', '$stateParams'];

  function GroupDetailsController(UsersService, Authentication, $http, $stateParams) {
    var vm = this;
    var users;
    var currentUser;
    UsersService.query(function (data) {
      var res = $http.get('/api/groups/');
      res.success(function(groupsData, status, headers, config) {
        vm.group = groupsData.find(function(item) {
          return item._id === $stateParams.groupId;
        });
        users = data;
        currentUser = users.find(function(item) {
          return item.email === Authentication.user.email;
        });
        vm.users = users.filter(function(item) {
          return vm.group.userIds.includes(item._id) && item._id !== currentUser._id;
        });
      });
    });
  }
}());

(function () {
  'use strict';

  angular
    .module('groups')
    .controller('ListGroupsController', ListGroupsController);

  ListGroupsController.$inject = ['UsersService', 'Authentication', '$http'];

  function ListGroupsController(UsersService, Authentication, $http) {
    var vm = this;
    var users;
    var currentUser;
    UsersService.query(function (data) {
      users = data;
      currentUser = users.find(function(item) {
        return item.email === Authentication.user.email;
      });
      var res = $http.get('/api/groups');
      res.success(function(data, status, headers, config) {
        vm.groups = data.filter(function(g) {
          return g.userIds.includes(currentUser._id);
        });
      });
    });
  }
}());

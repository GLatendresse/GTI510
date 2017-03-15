(function () {
  'use strict';

  angular
    .module('groups')
    .controller('CreateGroupController', CreateGroupController);

  CreateGroupController.$inject = ['UsersService', 'Authentication', '$http', '$window'];

  function CreateGroupController(UsersService, Authentication, $http, $window) {
    var vm = this;
    var users;
    var currentUser;
    UsersService.query(function (data) {

      function isCurrentUser(item) {
        return item.email === Authentication.user.email;
      }

      function isNotCurrentUser(item) {
        return !(isCurrentUser(item));
      }
      users = data;
      currentUser = users.find(isCurrentUser);
      vm.users = users.filter(isNotCurrentUser);
    });

    vm.createGroup = function() {
      var usersId = [currentUser._id];
      for (var user of vm.users) {
        if (user.selected) {
          usersId.push(user._id);
        }
      }
      var groupName = vm.groupName;
      var group = {
        name: groupName,
        userIds: usersId
      };
      var res = $http.post('/api/groups', group);
      res.success(function(data, status, headers, config) {
        alert('success');
        $window.location.href = '/groups/' + data._id;
      });
      res.error(function(data, status, headers, config) {
        alert('failure message: ' + JSON.stringify({ data: data }));
      });
    };
  }
}());

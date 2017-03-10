(function () {
  'use strict';

  angular
    .module('groups')
    .controller('CreateGroupController', CreateGroupController);

  CreateGroupController.$inject = ['UsersService', '$http'];

  function CreateGroupController(UsersService, $http) {
    var vm = this;
    vm.users = UsersService.query();
    vm.createGroup = function() {
      var usersId = [];
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
      });
      res.error(function(data, status, headers, config) {
      	alert( 'failure message: ' + JSON.stringify({ data: data }));
      });
    };

    vm.createGroup = function() {
      var usersId = [];
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
      });
      res.error(function(data, status, headers, config) {
      	alert( 'failure message: ' + JSON.stringify({ data: data }));
      });
    };

    vm.getGroups = function() {
      var res = $http.get('/api/groups');
      res.success(function(data, status, headers, config) {
        vm.groups = data;
      });
    };
  }
}());

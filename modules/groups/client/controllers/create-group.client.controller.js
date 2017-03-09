(function () {
  'use strict';

  angular
    .module('articles')
    .controller('ArticlesListController', CreateGroupController);

  CreateGroupController.$inject = ['AdminService'];

  function CreateGroupController(AdminService) {
    var vm = this;

    vm.users = AdminService.query();
  }
}());

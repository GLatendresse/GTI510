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

    var computeBalances = function() {
      var baseUserBalance = 0;
      var userDebitedTransactions = vm.transactions.filter(function(t) {
        return t.userId === currentUser._id && t.refundedUserId == null;
      });
      for (var userDebitedTransaction of userDebitedTransactions) {
        baseUserBalance -= userDebitedTransaction.amount * (1 / users.length);
      }
      for (var user of vm.users) {
        var userBalance = baseUserBalance;
        var userRefundedTransactions = vm.transactions.filter(function(t) {
          return t.refundedUserId === user._id && t.userId === currentUser._id;
        });
        for (var userRefundedTransaction of userRefundedTransactions) {
          userBalance -= userRefundedTransaction.amount;
        }
        var currentUserRefundedTransactions = vm.transactions.filter(function(t) {
          return t.userId === user._id && t.refundedUserId === currentUser._id;
        });
        for (var currentUserRefundedTransaction of currentUserRefundedTransactions) {
          userBalance += currentUserRefundedTransaction.amount;
        }
        var userCreditedTransactions = vm.transactions.filter(function(t) {
          return t.userId === user._id && t.refundedUserId == null;
        });
        for (var userCreditedTransaction of userCreditedTransactions) {
          var creditedAmount = userCreditedTransaction.amount * (1 / users.length);
          userBalance += creditedAmount;
        }
        user.balance = userBalance;
      }
    };

    var fetchTransactions = function() {
      var res = $http.get('/api/transactions');
      res.success(function(data, status, headers, config) {
        vm.transactions = data.filter(function(t) {
          return t.groupId === vm.group._id;
        });
        for (var transaction of vm.transactions) {
          transaction.user = users.find(function(u) {
            return u._id === transaction.userId;
          });
        }
        computeBalances();
      });
    };

    UsersService.query(function (data) {
      var res = $http.get('/api/groups/');
      res.success(function(groupsData, status, headers, config) {
        vm.group = groupsData.find(function(item) {
          return item._id === $stateParams.groupId;
        });
        users = data.filter(function(item) {
          return vm.group.userIds.includes(item._id);
        });
        currentUser = users.find(function(item) {
          return item.email === Authentication.user.email;
        });
        vm.users = users.filter(function(item) {
          return item._id !== currentUser._id;
        });
        vm.selectableUsers = users;
        vm.expenseUser = currentUser;
        fetchTransactions();
      });
    });

    vm.createExpense = function() {
      var transaction = {
        amount: vm.newExpenseAmount,
        name: vm.newExpenseName,
        userId: vm.expenseUser._id,
        groupId: vm.group._id
      };
      var res = $http.post('/api/transactions', transaction);
      res.success(function(data, status, headers, config) {
        alert('success');
        fetchTransactions();
      });
      res.error(function(data, status, headers, config) {
        alert('failure message: ' + JSON.stringify({ data: data }));
      });
    };

    vm.refund = function(user) {
      var transaction = {
        amount: user.balance,
        name: 'Remboursement à ' + user.username,
        userId: currentUser._id,
        refundedUserId: user._id,
        groupId: vm.group._id
      };
      var res = $http.post('/api/transactions', transaction);
      res.success(function(data, status, headers, config) {
        alert('success');
        fetchTransactions();
      });
      res.error(function(data, status, headers, config) {
        alert('failure message: ' + JSON.stringify({ data: data }));
      });
    };
  }
}());

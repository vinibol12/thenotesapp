angular.module('theNotesApp')
    .controller('loginCtrl', ['$scope','Auth', '$state', function($scope, Auth, $state ){

        $scope.login = function() {
            Auth.login($scope.user).then(function () {
                $state.go('home');
            });
        };

    }])
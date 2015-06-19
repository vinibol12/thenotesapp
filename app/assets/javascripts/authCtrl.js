angular.module('theNotesApp')
    .controller('authCtrl',['$scope', '$state', 'Auth',  function($scope, $state, Auth) {

        if(Auth.isAuthenticated()) {
            $state.go('home');
        };
        $scope.login = function() {
            Auth.login($scope.user).then(function () {
                $state.go('home');
            });
        };
        $scope.register = function() {
            Auth.register($scope.user).then(function () {

                $state.go('home');
            });
        };
    }])
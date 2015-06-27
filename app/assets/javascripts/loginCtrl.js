angular.module('theNotesApp')
    .controller('loginCtrl', ['$scope','Auth', '$state', '$http', function($scope, Auth, $state, $http ){

        $scope.login = function() {
            Auth.login($scope.user).then(function () {
                $state.go('home');
            },
                function (error) {
                    alert('Your email or password are incorrect')
                });
        };

    }])

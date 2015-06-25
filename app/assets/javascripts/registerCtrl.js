angular.module('theNotesApp')
    .controller('registerCtrl', ['$scope','Auth', '$state', function($scope, Auth, $state ){



        $scope.register = function() {
            Auth.register($scope.user).then(function () {

                $state.go('home');
            });
        };



    }])
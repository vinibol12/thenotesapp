angular.module('theNotesApp')
    .controller('welcomeCtrl', ['$scope', 'Auth', '$state', function($scope, Auth, $state){

        //Avoids authenticated user rendering landing page.
        if (Auth.isAuthenticated) {
            $state.go('home');
        }

        $scope.showLogin = false;
        $scope.showRegister = false;


        $scope.loginButton = function(){

            $scope.showLogin = true;
            $scope.showRegister = false;


        };
        $scope.registerButton = function(){

            $scope.showRegister = true;
            $scope.showLogin = false;


        };



    }]);

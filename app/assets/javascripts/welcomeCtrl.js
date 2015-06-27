angular.module('theNotesApp')
    .controller('welcomeCtrl', ['$scope', 'Auth', '$state', function($scope, Auth, $state){

        //Avoids authenticated user rendering landing page.
        if (Auth.isAuthenticated) {
            $state.go('home');
        }

        $scope.loginForm =  false;
        $scope.registerForm = false;

        //$scope.loginButton = function(){
        //    $scope.loginForm.active = !$scope.loginForm.active;
        //    $scope.registerForm = { active: false};
        //
        //};
        //$scope.registerButton = function(){
        //    $scope.registerForm.active = !$scope.registerForm.active;
        //    $scope.loginForm = { active: false};
        //
        //
        //};



    }]);

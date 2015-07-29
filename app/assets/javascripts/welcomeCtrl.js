angular.module('theNotesApp')
    .controller('welcomeCtrl', ['$scope', 'Auth', '$state', '$http', function($scope, Auth, $state, $http){

        //Avoids authenticated user rendering landing page.
        if (Auth.isAuthenticated) {
            $http.get('/notes.json').success(function(data){
                $scope.notes = data;
                var arraySize = $scope.notes.length-1;
                var lastNote = $scope.notes[arraySize];
                $state.go('notes', lastNote)
            });

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

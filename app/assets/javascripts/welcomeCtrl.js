angular.module('theNotesApp')
    .controller('welcomeCtrl', ['$scope', 'Auth', '$state', '$http', 'notesFactory', function($scope, Auth, $state, $http, notesService){

        //Avoids authenticated user rendering landing page and redirects to last created note state.
        if (Auth.isAuthenticated) {
            $http.get('/notes.json').success(function(data){
                $scope.notes = data;
                if( $scope.notes.length === 0){
                    notesService.create({
                            title: 'Untitled',
                            body: ''
                        }
                    ).success(function(note){
                            $state.go('notes', note)
                        });
                }
                else {
                    var arraySize = $scope.notes.length-1;
                    var lastNote = $scope.notes[arraySize];
                    $state.go('notes', lastNote);
                }
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

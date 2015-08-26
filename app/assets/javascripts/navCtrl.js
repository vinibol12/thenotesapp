angular.module('theNotesApp')
    .controller('navCtrl', ['$scope', 'Auth', '$state', 'notesFactory', function($scope, auth, $state, notesService) {
        $scope.signedIn = auth.isAuthenticated;
        $scope.logout = auth.logout;

        $scope.notesState = function(){return $state.is('notes')}


        $scope.addNote = function() {
            notesService.create({
                    title: 'Untitled',
                    body: ''
                }
            ).success(function(note){
                $state.go('notes', note)
            });
        };


        // When the controller loads the function below is executed and the currentUser returned promise is set as
        //the value of $scope.user

        if(auth.isAuthenticated) {
            auth.currentUser().then(function(user) {
                $scope.user = user;
            }, function(error) {

            });

        }

        $scope.$on('devise:new-registration', function(event, user){
            $scope.user = user;
        });
        $scope.$on('devise:login', function (event, user){
            $scope.user = user;

        });
        $scope.$on('devise:logout', function (event, user){
            $scope.user = {};
            $state.go('welcome');
            $scope.clear();
        });
    }]);
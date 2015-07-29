angular.module('theNotesApp')
    .controller('navCtrl', ['$scope', 'Auth', '$state', function($scope, auth, $state) {
        $scope.signedIn = auth.isAuthenticated;
        $scope.logout = auth.logout;

        $scope.notesState = function(){return $state.is('notes')}



        //notesService.getAll().then(function(res){
        //
        //    $scope.cleanArrayOfNotes = res.data;
        //});
        //
        //console.log($scope.cleanArrayOfNotes)


        // When the controller loads the function below is executed and the currentUser returned promise is set as
        //the value of $scope.user

        if(auth.isAuthenticated) {
            auth.currentUser().then(function(user) {
                $scope.user = user;
            }, function(error) {

            })

        };

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
    }])
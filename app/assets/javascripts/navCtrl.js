angular.module('theNotesApp')
    .controller('navCtrl', ['$scope', 'Auth', '$state', function($scope, auth, $state) {
        $scope.signedIn = auth.isAuthenticated();
        $scope.logout = auth.logout;

        // When the controller loads the function below is executed and the currentUser returned promise is set as
        //the value of $scope.user


        auth.currentUser().then(function(user) {
            $scope.user = user;
        }, function() {
            console.log("no session available.")
        });


        if(auth.isAuthenticated()) {
            $state.go('home')

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
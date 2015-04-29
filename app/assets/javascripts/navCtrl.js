angular.module('theNotesApp')
    .controller('navCtrl', ['$scope', 'Auth', '$state', 'notesFactory', function($scope, Auth, $state, notesService) {
        $scope.signedIn = Auth.isAuthenticated;
        $scope.logout = Auth.logout;
        Auth.currentUser().then(function(user) {
            $scope.user = user;
        });
        $scope.$on('devise:new-registration', function(event, user){
            $scope.user = user;
        });
        $scope.$on('devise:login', function (event, user){
            $scope.user = user;
        });
        $scope.$on('devise:logout', function (event, user){
            $scope.user = {};
            notesService.getAll();
            $state.go('welcome')


        });
    }])
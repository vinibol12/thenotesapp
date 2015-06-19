angular.module('theNotesApp')
    .controller('navCtrl', ['$scope', 'Auth', '$state', 'notesFactory', 'Flash', function($scope, Auth, $state, notesService, Flash) {
        $scope.signedIn = Auth.isAuthenticated;
        $scope.logout = Auth.logout;

        $scope.successAlert = function() {
            var message = '<strong> Well done!</strong>  You successfully read this important alert message.';
            Flash.create('success', message, 'custom-class');
            // First argument (success) is the type of the flash alert
            // Second argument (message) is the message displays in the flash alert
            // You can inclide html as message (not just text)
            // Third argument (custom-class) is the custom class for the perticular flash alert
        };

        // When the controller loads the function below is executed and the currentUser returned promise is set as
        //the value of $scope.user
        Auth.currentUser().then(function(user) {
            $scope.user = user;
        });
        if(Auth.isAuthenticated()) {
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
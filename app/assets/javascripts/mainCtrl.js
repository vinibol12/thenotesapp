angular.module('theNotesApp')
    .controller('mainCtrl',['$scope', 'notesFactory', '$interval', '$state', function($scope, notesService, $interval, $state){

        var notes = notesService.notesObjectInService;

        $scope.notes = notes;
        notesService.getAll();


        var contentChanged = false;

        $scope.$watchGroup(['title', 'body'], function(newValue, oldValue) {
            if (newValue !== oldValue && $state.is('home')) {
                contentChanged = true;
            }
        });

        function checkForChangeAndSave() {
            if(contentChanged) {
                addNote();
                contentChanged = false;
            }
        }

        $interval(checkForChangeAndSave, 5000);

        function addNote(){
            if ($scope.title === "" ) {
                return;
            }
            notesService.create({
                title: $scope.title,
                body:$scope.body
            });

        };
        $scope.$watch(function() { return notesService.newNote; }, function(newVa, oldVa) {
            if (newVa !== oldVa) {
                $state.go('notes', newVa)
            }
        }, true);
    }])

    //read GOF factory pattern
    //a factory is a factory of objects
    //when a factory is injected the injected element is the result of the factory, what it returns,
    //while when you inject a controller the controller itself is injected

angular.module('theNotesApp')
    .controller('notesCtrl', [
        '$scope',
        'notesFactory',
        'note',
        '$stateParams',
        '$state',
        'Flash',
        '$interval',
        '$http',
        function($scope, notesService, note, $stateParams, $state, Flash, $interval, $http) {
            notesService.getAll()
            $scope.note = note;
            $scope.title = note.title;
            $scope.body = note.body;
            $scope.notes = notesService.notesObjectInService


            var contentChanged = false;

            $scope.$watchGroup(['title', 'body'], function(newValue, oldValue) {
                if (newValue !== oldValue) {
                    contentChanged = true;
                }
            });

            function checkForChangeAndSave() {
                if(contentChanged) {
                    updateNote();
                    contentChanged = false;
                }
            }

            $interval(checkForChangeAndSave, 5000);


            function updatedNotice() {
                var message = 'Updating your note!';
                Flash.create('success', message, 'custom-class');
            };
            function updateNote() {
                notesService.update($stateParams.id, {title: $scope.title, body: $scope.body});
                notesService.getAll();
                updatedNotice();
            };

            function deletedNotice() {
                var message = '<strong> Success!!</strong>  Your note has been deleted!';
                Flash.create('success', message, 'custom-class');
            };


            $scope.deleteNote = function(note) {
                notesService.delete(note.id)
                    $http.get('/notes.json').success(function(data){
                        $scope.notes = data;
                        var arraySize = $scope.notes.length-1;
                        var lastNote = $scope.notes[arraySize];
                        $state.go('notes', lastNote)
                        deletedNotice();
                    });
                $state.go('');
                notesService.getAll();
            };
        }])


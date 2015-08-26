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
        'Auth',
        function($scope, notesService, note, $stateParams, $state, Flash, $interval, $http, Auth) {

            if (Auth.isAuthenticated() === false) {
                $state.go('welcome')
            }

            notesService.getAll();
            $scope.note = note;
            $scope.title = note.title;
            $scope.body = note.body;
            $scope.notes = notesService.notesObjectInService;

            var noteCreationDateAndTime = note.created_at.split("T");
            var noteCreationTime = noteCreationDateAndTime[1].split(".");
            var contentChanged = false;

            $scope.noteCreationTime = noteCreationTime[0];
            $scope.noteCreationDate = noteCreationDateAndTime[0];

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
            function updatedNotice() {
                var message = 'Updating your note!';
                Flash.create('success', message, 'custom-class');
            }
            function updateNote() {
                notesService.update($stateParams.id, {title: $scope.title, body: $scope.body});
                notesService.getAll();
                updatedNotice();
            }
            function deletedNotice() {
                var message = '<strong> Success!!</strong>  Your note has been deleted!';
                Flash.create('success', message, 'custom-class');
            }

            $interval(checkForChangeAndSave, 5000);

            $scope.deleteNote = function(note) {
                notesService.delete(note.id);
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
                                var arraySize = $scope.notes.length - 1;
                                var lastNote = $scope.notes[arraySize];
                                $state.go('notes', lastNote);
                            }
                        deletedNotice();
                    });
                notesService.getAll();
            };
        }]);


angular.module('theNotesApp')
    .controller('notesCtrl', [
        '$scope',
        'notesFactory',
        'note',
        '$stateParams', function($scope, notesService, note, $stateParams) {
            $scope.note = note;
            $scope.title = note.title;
            $scope.body = note.body;
            $scope.updateNote = function() {
                notesService.update($stateParams.id, {title: $scope.title, body: $scope.body});
                notesService.getAll();
            };

            $scope.deleteNote = function(note) {
                notesService.delete(note.id);
                notesService.getAll();
            };

        }])
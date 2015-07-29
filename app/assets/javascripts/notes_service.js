angular.module('theNotesApp')
.factory('notesFactory',['$http', function($http){

    var notesService = {notesObjectInService: [], newNote: null, note: null};


    notesService.getAll = function() {
        return $http.get('/notes.json').success(function(data){
            angular.copy(data, notesService.notesObjectInService);
        })
    };
    notesService.create = function(note) {
        return $http.post('/notes.json', note).success(function(data){
            notesService.notesObjectInService.push(data);
            notesService.newNote = data;
        })
    };
    notesService.update = function(id, note) {
        return $http.put('/notes/' + id + '.json', note).success(function(data) {
            notesService.notesObjectInService.push(data);
                    })
    };
    notesService.get= function(id) {
        return $http.get('/notes/'+ id + '.json').then(function(res) {
            return res.data;
        })
    };
    notesService.delete= function(id) {
        return $http.delete('/notes/'+ id + '.json').success(function(res) {
            return res.data;
        })
    };

    return notesService;

}])


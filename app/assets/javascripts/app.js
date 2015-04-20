function NotesProvider(){
    this.$get= angular.noop
}
angular.module('theNotesApp2',['ui.router'])
     .config(['$stateProvider',
              '$urlRouterProvider',
              function($stateProvider, $urlRouterProvider){
                  $stateProvider
                      .state('home', {
                          url: '/home',
                          //the templateUrl value is the id for the routing
                          templateUrl: '/home.html',
                          controller: 'mainCtrl',
                          resolve: {
                              notePromise: ['notesFactory', function(notesFactory) {
                                  return notesFactory.getAll();
                              }]
                          }
                      })
                      .state('navbar',{
                          url: '/navbar',
                          templateUrl: '/navbar.html',
                          controller: 'mainCtrl'
                      })
                      .state('notes',{
                          url: '/notes/{id}',
                          templateUrl: '/notes.html',
                          controller: 'notesCtrl',
                          resolve: {
                              note: [ '$stateParams', 'notesFactory', function($stateParams , notesFactory){
                                 return  notesFactory.get($stateParams.id);
                          }]}
                      });
                  $urlRouterProvider.otherwise('home');
              }
     ])
     //read GOF factory pattern
     //a factory is a factory of objects
    //when a factory is injected the injected element is the result of the factory, what it returns,
    //while when you inject a controller the controller itself is injected
     .factory('notesFactory',['$http', function($http){

        var notesService = {notesObjectInService: []};

        notesService.getAll = function() {
             return $http.get('/notes.json').success(function(data){
                 angular.copy(data, notesService.notesObjectInService);
             })
        };
        notesService.create = function(note) {
            return $http.post('/notes.json', note).success(function(data){
                notesService.notesObjectInService.push(data);
            })
        };
        notesService.update = function(id, note) {
            return $http.put('/notes/' + id + '.json', note).success(function(data) {
                notesService.notesObjectInService.push(data)
            })
        };
        notesService.get= function(id) {
            return $http.get('/notes/'+ id + '.json').then(function(res) {
                return res.data;
            })
        };

        return notesService;
     }])

    .controller('mainCtrl',['$scope', 'notesFactory', function($scope, notesService){
        $scope.notes = notesService.notesObjectInService;

        $scope.addNote = function(){
             if ($scope.title === "" ) {
                 return;
             }
             notesService.create({
                 title: $scope.title,
                 body:$scope.body
             });
             $scope.title= '';
             $scope.body= '';
         };
     }])

    .controller('notesCtrl', [
        '$scope',
        'notesFactory',
        'note',
        '$stateParams', function(
            $scope,
            notesService,
            note,
            $stateParams) {
                $scope.note = note;
                $scope.title = note.title;
                $scope.body = note.body;
                $scope.updateNote = function() {
                    notesService.update($stateParams.id, {title: $scope.title, body: $scope.body});
                    notesService.getAll();
                }
     }])


angular.module('theNotesApp', ['ui.router', 'templates', 'Devise', 'flash', 'ngAnimate'])
     .config(['$stateProvider',
              '$urlRouterProvider',
              function($stateProvider, $urlRouterProvider){
                  $stateProvider
                      .state('welcome', {
                          url:'/welcome',
                          templateUrl: 'welcome.html',
                          controller: 'navCtrl'
                      })
                      .state('home', {
                          url: '/home',
                          //the templateUrl value is the id for the routing
                          templateUrl: 'home.html',
                          controller: 'mainCtrl',
                          resolve: {
                              notePromise: ['notesFactory', function(notesService) {
                                  return notesService.getAll();
                              }]
                           }
                      })
                      .state('notes', {
                          url: '/note/{id}',
                          templateUrl: 'note.html',
                          controller: 'notesCtrl',
                          resolve: {
                              note: ['$stateParams', 'notesFactory', function ($stateParams, notesService) {
                                  return notesService.get($stateParams.id);
                              }]
                          }
                      })
                  $urlRouterProvider.otherwise('welcome');
              }
     ])
    //Directive that loads the facebook like and share buttons even  when templates change
    .directive('fbLike', [
        '$window', '$rootScope', function ($window, $rootScope) {
            return {
                restrict: 'A',
                scope: {
                    fbLike: '=?'
                },
                link: function (scope, element, attrs) {
                    if (!$window.FB) {
                        // Load Facebook SDK if not already loaded
                        $.getScript('//connect.facebook.net/en_US/sdk.js', function () {
                            $window.FB.init({
                                appId: $rootScope.facebookAppId,
                                xfbml: true,
                                version: 'v2.0'
                            });
                            renderLikeButton();
                        });
                    } else {
                        renderLikeButton();
                    }

                    var watchAdded = false;
                    function renderLikeButton() {
                        if (!!attrs.fbLike && !scope.fbLike && !watchAdded) {
                            // wait for data if it hasn't loaded yet
                            watchAdded = true;
                            var unbindWatch = scope.$watch('fbLike', function (newValue, oldValue) {
                                if (newValue) {
                                    renderLikeButton();

                                    // only need to run once
                                    unbindWatch();
                                }

                            });
                            return;
                        } else {
                            element.html('<div class="fb-like"' + (!!scope.fbLike ? ' data-href="' + scope.fbLike + '"' : '') + '  data-action="like" data-show-faces="true" data-share="true"></div>');
                            $window.FB.XFBML.parse(element.parent()[0]);
                        }
                    }
                }
            };
        }
    ]);







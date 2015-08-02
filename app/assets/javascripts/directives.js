angular.module('theNotesApp')
    .directive('ngReallyClick', [function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('click', function() {
                    var message = attrs.ngReallyMessage;
                    if (message && confirm(message)) {
                        scope.$apply(attrs.ngReallyClick);
                    }
                });
            }
        }
    }])
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


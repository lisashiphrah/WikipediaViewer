var app = angular.module('WikiApp', ['ngAnimate']);

//Angular controller for search
app.controller('WikiController', function($scope, $http, $timeout) {
  var form = $('form');
  var close = $('#newSearch');
  var input = $('input');
  
  $scope.results = [];
  
  close.on('click', function() {
    form.toggleClass('open');
    
    if (!form.hasClass('open') && $scope.searchTxt !== '' && typeof $scope.searchTxt !== 'undefined') {
      $scope.searchTxt = '';
    } 
    $scope.results = [];
    $scope.$apply();
  })

  $scope.search = function() {
    $scope.results = [];
    var title = input.val();
    var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    var cb = '&callback=JSON_CALLBACK';
    var page = 'https://en.wikipedia.org/?curid=';
    
    $http.jsonp(api + title + cb)
    .success(function(data) {
      var results = data.query.pages;
      angular.forEach(results, function(v,k)  {
        $scope.results.push({title: v.title, body: v.extract, page: page + v.pageid})
      })
    });
  }
});
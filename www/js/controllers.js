angular.module('starter.controllers', ['firebase'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
    $scope.loginData = {};
    $scope.itemData = {};
    $scope.Loggedin = false;

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('user : '+$scope.loginData.username);
    console.log('user : '+$scope.loginData.password);
    console.log('Doing login', $scope.loginData);
    if (($scope.loginData.username == "NAME") && ($scope.loginData.password == "PASSWORD")){
      $scope.Loggedin = true;
      console.log('Logged in = ', $scope.Loggedin);

    }

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})


.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Postcode Passion', id: 1 },
    { title: 'Prizes Galour', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})


  .factory("Items", function($firebaseArray) {
    var itemsRef = new Firebase("https://lovalamppost.firebaseio.com");
    return $firebaseArray(itemsRef);
  })


.controller('SearchCtrl', function($scope, Items, $ionicModal, $timeout) {
    $scope.itemList = Items;

    //$scope.addItem = function() {
    //  var name = prompt("What do you need to buy?");
    //  if (name) {
    //    $scope.itemList.$add({"Ref":45453,"Status":1,"comment":"Working fine","lat":52.984756,"long":-1.808753});
    //}

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/AddItem.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeadditem = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.additem = function () {
      $scope.modal.show();
    };

    $scope.insertItem2List = function () {
      $scope.itemList.$add(
        {
          'Ref': $scope.itemData.usr,
          'Status': $scope.itemData.status,
          'comment': $scope.itemData.comment,
          'lat': $scope.itemData.lat,
          'long': $scope.itemData.long
        })

      $scope.modal.hide();
    };
  })

.controller('PlaylistCtrl', function($scope, $stateParams) {
    console.log("Hello Sailor");
})


.controller('AuthCtrl', [
  '$scope', '$rootScope', '$firebaseAuth', function($scope, $rootScope, $firebaseAuth) {
    var ref = new Firebase('https://lovalamppost.firebaseio.com/users/');
    $rootScope.auth = $firebaseAuth(ref);

    $scope.signIn = function () {
      $rootScope.auth.$login('password', {
        email: $scope.loginData.email,
        password: $scope.loginData.password
      }).then(function(user) {
        $rootScope.alert.message = '';
      }, function(error) {
        if (error = 'INVALID_EMAIL') {
          console.log('email invalid or not signed up — trying to sign you up!');
          $scope.signUp();
        } else if (error = 'INVALID_PASSWORD') {
          console.log('wrong password!');
        } else {
          console.log(error);
        }
      });
    };

    $scope.signUp = function() {
      $rootScope.auth.$createUser($scope.email, $scope.password, function(error, user) {
        if (!error) {
          $rootScope.alert.message = '';
        } else {
          $rootScope.alert.class = 'danger';
          $rootScope.alert.message = 'The username and password combination you entered is invalid.';
        }
      });
    }
  }
])

.controller('AlertCtrl', [
  '$scope', '$rootScope', function($scope, $rootScope) {
    $rootScope.alert = {};
  }
])


.factory("gdb", function (){
  var neo4j = require("neo4j");
  var db = new neo4j.GraphDatabase("http://CivicBase:NhrBKsP5ULtZopafC7a9@civicbase.sb04.stations.graphenedb.com:24789");

  db.cypherQuery("match (n:PERSON) return n", function(err, result){
    if(err) throw err;
    console.log(result.data); // delivers an array of query results
    console.log(result.columns); // delivers an array of names of objects getting returned
  });

})

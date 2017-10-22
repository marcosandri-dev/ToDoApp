
var app = angular.module("toDo", ["ngRoute"]);
	
	//Routing

	app.config(function($routeProvider) {
		$routeProvider.when("/users/:userid", {
										templateUrl : "templates/user.html",
										controller : "ListToDo"
									})
									.when("/users/:userid/archive", {
										templateUrl : "templates/archive.html",
										controller : "ArchiveToDo"
									})
									.when("/login", {
										templateUrl : "templates/login.html"
									})
									.when("/sobad", {
										templateUrl : "templates/sobad.html"
									})
									.otherwise({redirectTo: "/login"});
	}); 
	
	var list = {};







	//Services

	app.service("ToDoList", function($http, $route, $routeParams) {

		//This works for the queries, not for the view
		var user = $routeParams.userid;

		//Loads the list
  	this.load = function(type){
  		return $http.post('includes/visualizzatodo.php', {type:type, user:user}).then(function (response){
  			list = response.data;
  			//alert(list + " load");
  		}); 
  		//return list;
  	}

  	//Reloads the list
  	this.reload = function(){
  		$route.reload();
  	}

  	//DEBUG/TESTING
  	this.prova = function(){
  		alert(list + " prova");
  	}

  	this.addToDo = function(toDo) {
			
			var data = {
				toDoText: toDo,
				giorno: moment().format('L'),
				user:user
			};
			return $http.post('includes/inserttodo.php', JSON.stringify(data)).then(function (response) {
				//alert(response.data);
				//alert(list + " load");
			});

		}

		//after the ToDo is sent, pushes it into our global list
		this.pushLast = function(){
    	//Push the last inserted element into our list
			$http.post('includes/visualizzatodo.php', {type:"getLast", user:user}).then(function (response){
  			if (list){
  				list.push(response.data[0]);
  			} else {
  				$route.reload(); //workaround
  			}
  			//alert(response.data[0].ID);
  		}); 
  	}

  	this.editToDo = function(ID, toDo){
  		var data = {
				toDoText: toDo,
				ID: ID,
				type: "todo"
			};
			return $http.post('includes/edittodo.php', JSON.stringify(data)).then(function (response) {
				//alert(response.data);
				//alert(list + " load");
			});
  	}


  	this.deleteToDo = function(ID) {
  		var data = {
				ID: ID
			};
			return $http.post('includes/deletetodo.php', JSON.stringify(data)).then(function (response) {
				//alert("K");
			});
  	}

  	this.checkToDo = function(ID) {
  		var data = {
				ID: ID,
				type: "checkbox"
			};
			$http.post('includes/edittodo.php', JSON.stringify(data));
  	}

	})







	//Controllers 

	//Input Controller
	app.controller('InsertToDo', function($scope, ToDoList){
		$scope.add = function(){
			ToDoList.addToDo($scope.toDoText).then(function (result) {
				ToDoList.pushLast();
			});
			$scope.toDoText = null;
		};
		
	})

	//List Controller
	app.controller("ListToDo", function ($scope, ToDoList) {
		
		//Loads and instantiates the list
		ToDoList.load("getAll").then(function (result){
			$scope.todos = list;
		});

		$scope.todos = list;

		//alert($scope.todos.length);

		//Delete an element from the list
		$scope.delete = function(ID, todo){	
			ToDoList.deleteToDo(ID).then(function (result){
			list.splice(list.indexOf(todo),1);
			});
		}

		$scope.editText = function(ID, todo){
			ToDoList.editToDo(ID, todo).then(function (result){
				ToDoList.reload();
			});
		}

		$scope.prova = function(daFare){
			alert(daFare);
		} 

		

		//Complete the TODOS
		$scope.archive = function(){
			var completedToDos = 0;
			for (var i=0; i<list.length; i++){
				if (list[i].checkin == 1){
					ToDoList.checkToDo(list[i].ID);
					completedToDos++;
				}
			}
			if (completedToDos != 0){
				alert("Congratulations you've completed " + completedToDos + " ToDo(s)!")
			} else {
				alert("No ToDos checked...");
			}
			ToDoList.reload();
		}

		//TESTING
		$scope.test = function(){
			ToDoList.prova();
		}

	});

	//Archive Controller
	app.controller("ArchiveToDo", function ($scope, ToDoList) {
		//Loads and instantiates the archive
		ToDoList.load("getArchive").then(function (result){
			$scope.archive = list;
		});

	});

	//Button Controller
	app.controller("Buttons", function ($scope, $routeParams) {
		$scope.user = $routeParams.userid;
	});

	//Login Controller
	app.controller("Login", function ($scope, $location) {
		//Enter function
		$scope.enter = function(username) {
			$location.path('users/' + username);
		}
	});









//Jquery / Vanilla Javascript section

function giveFocus(){
	$(".getFocus").delay(1000).focus();
}

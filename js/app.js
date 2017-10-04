
var app = angular.module("toDo", [])

	function reload2($scope, lista){
		//$scope.todos = lista;
		//alert(lista);
	}
	
	var list = {};

	app.service("ToDoList", function($http) {

		//Loads the list
  	this.load = function(){
  		return $http.post('includes/visualizzatodo.php', {type:"getAll"}).then(function (response){
  			list = response.data;
  			//alert(list + " load");
  		}); 
  		//return list;
  	}

  	//DEBUG/TESTING
  	this.prova = function(){
  		alert(list + " prova");
  	}

  	this.addToDo = function(toDo) {
			
			var data = {
				toDoText: toDo,
				giorno: moment().format('L')
			};
			return $http.post('includes/inserttodo.php', JSON.stringify(data)).then(function (response) {
				//alert(response.data);
				//alert(list + " load");
			});

		}

		//after the ToDo is sent, pushes it into our global list
		this.pushLast = function(){
    	//Push the last inserted element into our list
			$http.post('includes/visualizzatodo.php', {type:"getLast"}).then(function (response){
  			list.push(response.data[0]);
  			//alert(response.data[0].ID);
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

	})

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
	app.controller("ListToDo", function ($scope, ToDoList){
		
		//Loads and initaliazes the list
		ToDoList.load().then(function (result){
			$scope.todos = list;
		});

		//Delete an element from the list
		$scope.delete = function(ID, todo){	
			ToDoList.deleteToDo(ID).then(function (result){
				/*ToDoList.load().then(function (result){
					$scope.todos = list;
				});*/
			list.splice(list.indexOf(todo),1);
			});
		}

		//TESTING
		$scope.reload = function(){
			alert(list + " ProvaController");
			ToDoList.prova();
		}

	});




	//.service("toDoList", function ($http, $q) {

		//var deferred = $q.defer();

		//Insert a ToDo
	/*	this.addToDo = function(toDo) {
			var data = {
				toDoText: toDo,
				giorno: moment().format('L')
			};
			return $http.post('includes/inserttodo.php', JSON.stringify(data)).then(function (response) {
				deferred.resolve(response.data);
				return deferred.promise;
			});
		} */

		//Prints all the ToDos
	/*	this.printToDo = function(){
			//var list = [];
			return $http.get('includes/visualizzatodo.php').then(function(response) {
				deferred.resolve(response.data);
				return deferred.promise;
			});
		}
		//Edit a Todo
		//Delete a ToDo
		//Check the ToDo
		//Archive the ToDos
	})*/


/*.controller('ToDoController', function ($scope, $http){
	

	//Init
	$scope.toDoText = null;

	//Prints all the Todos
	$scope.listToDo = function(){
		$http.get('includes/visualizzatodo.php').then(function(response) {
      $scope.todos = response.data;
		});
	};

	$scope.listToDo(); //This is not nice, how to automatically call the function? 

	//Just for testing.
	$scope.prova = function(){
		var b = moment().format('MM/DD/YYYY');
	};

	//Horrible function, for testing&commit sake.
	$scope.deleteToDo = function(ID){
		var data = {
			ID: ID
		};
		$http.post('includes/deletetodo.php', JSON.stringify(data)).then(function (response) {
			if (response.data){
				$scope.listToDo(); //This is not nice, how to automatically call the function? 
			}
		}, function (response) {
			$scope.msg = "Not Working";
		});
	}

	//Inserts a new todo
	$scope.postdata = function(toDoText) {

		var data = {
			toDoText: toDoText,
			giorno: moment().format('L')
		};
		//alert(JSON.stringify(data)); //DEBUG

		$http.post('includes/inserttodo.php', JSON.stringify(data)).then(function (response) {
			if (response.data){
				//$scope.msg = response.data; //DEBUG
				$scope.listToDo(); //This is not nice, how to automatically call the function? 
				$scope.toDoText = null; //I think that's ok...
			}
		}, function (response) {
			$scope.msg = "Not Working";
		});
	};

	//Changes the checked status
	$scope.checked = function(ID, checkin){
		alert("boh");
		var data = {
			ID: ID,
			checkin: checkin
		};

		if (data.checkin == 0){
			data.checkin = 1;
			alert("SI");
		} else {
			data.checkin = 0;
			alert("NO");
		}

		$http.post('includes/edittodo.php', JSON.stringify(data)).then(function (response){
			if (response.data){
				alert("gratz!");
			}
		});
	};

	$scope.checked2 = function(checkin){
			alert("change");
	};


});*/
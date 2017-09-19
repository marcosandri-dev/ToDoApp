
angular.module('toDo', [])

.controller('ToDoController', function ($scope, $http){
	
	//Init
	$scope.toDoText = null;

	$scope.listToDo = function(){
		$http.get('includes/visualizzatodo.php').then(function(response) {
      $scope.todos = response.data;
		});
	};

	$scope.listToDo();

	//Horrible function, for testing&commit sake.
	$scope.deleteToDo = function(ID){
		var data = {
			ID: ID
		};

		$http.post('includes/deletetodo.php', JSON.stringify(data)).then(function (response) {
			if (response.data){
				$scope.listToDo();
			}
		}, function (response) {
			$scope.msg = "Not Working";
		});
	}

	$scope.postdata = function(toDoText) {
		var data = {
			toDoText: toDoText
		};
		//alert(JSON.stringify(data)); //DEBUG

		//Call the services
		$http.post('includes/inserttodo.php', JSON.stringify(data)).then(function (response) {
			if (response.data){
				$scope.msg = response.data;
				$scope.listToDo();
				$scope.toDoText = null;
			}
		}, function (response) {
			$scope.msg = "Not Working";
		});
	};
});
(function(){
	var app = angular.module('toDo', []);

	//Controller for the visualization of the ToDos
	app.controller('ListToDo', function ($scope, $http){
		$http.get('includes/visualizzatodo.php').then(function(response) {
      $scope.todos = response.data;
    });
	});
	
	//Controller for adding a new ToDo
	app.controller('SendToDo', function($scope, $http) {
		$scope.toDoText = null; //Init
		$scope.postdata = function(toDoText) {

			var data = {
				toDoText: toDoText
			};
			//alert(JSON.stringify(data)); //DEBUG
			
			//Call the services
			$http.post('includes/inserttodo.php', JSON.stringify(data)).then(function (response) {
				if (response.data){
					$scope.msg = response.data;
				}
			}, function (response) {
				$scope.msg = "Not Working";
			});
		};
	});
})();
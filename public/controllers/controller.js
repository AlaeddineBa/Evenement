function AppCtrl($scope, $http){
	console.log("Hello Word frm Conroller");

var refresh = function(){
	$http.get('/evenementlist').success(function(response){
		console.log("I got the date I requested");
		console.log("ID"+ response.id);
		$scope.evenementlist = response;
		$scope.evenement = "";
	});
};
	refresh();
	$scope.addEvenement = function() {
		console.log($scope.evenement);
		$http.post('/evenementlist', $scope.evenement).success(function(response){
			console.log(response);
			refresh();
		});
	};

	$scope.removeEvenement = function(id) {
		console.log(id);
		$http.delete('/evenementlist/' +id).success(function(response){
			refresh();
		});
	};
	
	$scope.editEvenement = function(id) {
		console.log(id);
		$http.get('/evenementlist/' +id).success(function(response){
		$scope.evenement = response;
		});
	};

	$scope.update = function() {
		console.log($scope.evenement._id);
		$http.put('/evenementlist/' +$scope.evenement._id, $scope.evenement).success(function(response){
			refresh();
		});
	};

	
}
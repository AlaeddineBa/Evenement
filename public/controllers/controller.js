
var app = angular.module('app',['naif.base64']); 

app.controller('AppCtrl',function($scope, $http){
	$('.datepicker').datepicker({
    			language: "fr",
    			autoclose: true
			});
	$('.datepicker').on('changeDate', function() {
    $scope.event.date = $('.datepicker').val();
  });

	$scope.logoPick = 'css/img/pic.png';
	$scope.evenementlist = [];
	$scope.event = {};
	$scope.pick = '';

	$scope.opened = false;



	var refresh = function(){
		$http.get('/getEventList')
		.then(function successCallback(response) {
	    	$scope.evenementlist = response.data;
	    	$scope.event = "";
	    	$scope.logoPick = 'css/img/pic.png';
	    },function error(err){
	    	console.log(err);
		  });
	  ;
	};

	refresh();

	$scope.onLoad = function(e, reader, file, fileList, fileOjects, fileObj){
		$scope.event.base64 = fileObj.base64;
		$scope.logoPick = 'data:image/png;base64,'+fileObj.base64;
		$scope.pick = fileObj.base64;
	}

	
	$scope.addEvent = function(event) {  
		if(Object.keys($scope.event).length < 3){
			alert('SVP remplisez tous les champs');
			return false;
		}
		if($scope.event.base64 == undefined || $scope.event.base64 == null ||
				$scope.event.base64 == '' ){
			alert('SVP Choisisez un logo');
			return false;
		}
	var title = event.title;
  	var desc = event.desc;
  	var date = event.date;
  	var type = event.type;
  	$scope.evenementlist.push({'title':title,'desc':desc,'date':date, 'type':type, 'base64':$scope.pick});
		$http.post('/addEventList',event)
		.then(function successCallback(response) {
			refresh();
	    },function error(err){
	    	console.log(err);
		  });
	  ;
	};

	$scope.removeEvent = function(id,index) {
		$http.delete('/delEventList/' +id).success(function(response){
			refresh();
		});
	};
	
	$scope.editEvent = function(event) {
		$scope.logoPick = 'data:image/png;base64,'+event.base64;
		$scope.event = event;
	};

	$scope.updateEvent = function(event) {
		$http.put('/updateEvent/' +event._id,event).success(function(response){
			refresh();
		});
	};

	
});
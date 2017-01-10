﻿angular.module('toDoList', [])
.controller('ListCtrl', function($scope){

    $scope.items = localStorage.getItem('entries') ? 
    angular.fromJson(localStorage.getItem('entries')) : 
    [
      { text: 'Buy chocolate', done: false, date: "2016-12-12", priority: 'High'},
      { text: 'Pay bills', done: false, date: "2016-12-16", priority: 'High'},
      { text: 'Visit granpa', done: false, date: "2016-12-09", priority: 'Low'},
      { text: 'Call mom', done: false, date: "2016-12-16", priority: 'Medium'}
    ];

    $scope.$watch('items', function() {
    	localStorage.setItem('entries', angular.toJson($scope.items));
    }, true);

    $scope.addItem = function () {
        if($scope.itemText && $scope.itemDate && $scope.priority) {
        	var newEntry = {
        		text: $scope.itemText, 
        		done: false, 
        		date: $scope.itemDate,
                priority: $scope.priority
        	}; 

            $scope.items.push(newEntry);
        }
       $scope.itemText = '';
       $scope.itemDate = '';
       $scope.priority = '';
    };
 
    $scope.customFilter = function(value) {
        return !value.done || value.priority
    }

    $scope.remain = function () {
        var count = 0;
        angular.forEach($scope.items, function(item) {
            count += item.done;
        });

        return $scope.items.length - count;
    }

    $scope.checkDeadline = function(item) {
        console.log(item.date);
    }

    $scope.removeItem = function(item) {
        $scope.items.splice($scope.items.indexOf(item), 1); 
    }

    $scope.changeItem = function(item) {
    	var editedItem = prompt('Do you want to change this item?', $scope.items[$scope.items.indexOf(item)].text);
    	if(editedItem) {
    		$scope.items[$scope.items.indexOf(item)].text = editedItem;
    	}
    }


})
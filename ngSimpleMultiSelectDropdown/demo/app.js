(function () {
    'use strict';
    var app = angular.module('ngMultiSelectDropdownDemoApp', ['simpleMultiSelectDropdown']);
    app.controller('ngMultiSelectDropdownCtrl', ['$scope', function ($scope) {
        $scope.cities = [
            {
                name: "Los Angeles",
                code: "LA"
            },
            {
                name: "San Francisco",
                code: "SFO"
            },
            {
                name: "New York",
                code: "NYC"
            },
            {
                name: "Chicago",
                code: "CHG"
            },
            {
                name: "Newark",
                code: "EWR"
            },
            {
                name: "Atlanta",
                code: "ATL"
            },
            {
                name: "Seattle",
                code: "SEATAC"
            },
            {
                name: "Brisbane",
                code: "BRB"
            }
        ]
    }]);
})();
/*! ng Simple Multi Select Dropdown - v1.0.0 - 2016-04-17
* Copyright (c) 2016 ; Licensed  */
(function () {
    'use strict'
    angular.module('simpleMultiSelectDropdown', []);
})();
angular.module('simpleMultiSelectDropdown').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/templates/multiSelectDropdown.html',
    "<div class=\"multiple-select-wrapper\"><div class=\"selected-items-box\" tabindex=\"0\"><span ng-show=\"(dropdownItems | filter: getSelectedItemsOnly).length > maxItemsDisplayed && !selectAllDropdownItems\" title=\"See more items..\">{{(dropdownItems | filter: getSelectedItemsOnly).length}} selected</span> <span class=\"dropdown-icon\"></span><ul class=\"items-list\" ng-show=\"(dropdownItems | filter: getSelectedItemsOnly).length <= maxItemsDisplayed && !selectAllDropdownItems\"><li ng-repeat=\"dropdownItem in dropdownItems | filter: getSelectedItemsOnly| limitTo: maxItemsDisplayed\">{{dropdownItem[displayField]}}{{$last ? '' : ', '}}</li></ul><span ng-show=\"(dropdownItems | filter: getSelectedItemsOnly).length === 0 && dropdownItems.length > 0 && !selectAllDropdownItems\" title=\"{{selectText}}\">{{selectText}}</span> <span ng-show=\"dropdownItems.length === 0\" title=\"{{noItemsText}}\">{{noItemsText}}</span> <span ng-show=\"dropdownItems.length > 0 && selectAllDropdownItems\" title=\"{{allText}}\">{{allText}}</span></div><div class=\"list\"><ul class=\"items-list\"><li ng-show=\"dropdownItems.length > 0 && showAll\" ng-class=\"{'items-list-selected' : currentIndex === 0}\"><input id=\"filterDiv\" type=\"checkbox\" ng-model=\"selectAllDropdownItems\" ng-click=\"selectAll()\"><span style=\"padding:0px 0px 0px 5px\">All</span></li><li ng-repeat=\"dropdownItem in dropdownItems\" ng-class=\"{'items-list-selected' : $index == currentIndex - 1 }\"><input type=\"checkbox\" ng-model=\"dropdownItem.selected\" ng-click=\"checkBoxChecked(dropdownItem.selected)\"> <span>{{dropdownItem[displayField]}}</span></li></ul></div></div>"
  );

}]);

(function () {
    'use strict'
    var simpleMultiSelectDropdown = angular.module('simpleMultiSelectDropdown');
    simpleMultiSelectDropdown.directive('ngSimpleMultiSelectDropdown', ['$document', function ($document) {
        return {
            restrict: 'EA',
            scope: {
                "dropdownItems": "=",
                "displayField": "@",
                "noItemsText": "@",
                "selectAllDropdownItems": "=",
                "selectText": "@",
                "allText": "@",
                "showAll": "=",
                "maxItemsDisplayed": "@"
            },
            templateUrl: 'src/templates/multiSelectDropdown.html',
            replace: true,
            link: function ($scope, elem, attrs, ngModelCtrl) {
                $scope.currentIndex = -1;
                var expanded = false;
                var selectedItemBox = elem[0].querySelector('.selected-items-box');
                var multiSelectWrapper = elem[0].querySelector('.multiple-select-wrapper .list');
                var multiSelectWrapperCheckBoxList = elem[0].querySelector('.multiple-select-wrapper .list .items-list');
                $(selectedItemBox).bind('click', function (e) {
                    e.stopPropagation();
                    slideDown();
                });

                $(multiSelectWrapper).bind('click', function (e) {
                    e.stopPropagation();
                });

                $scope.getSelectedItemsOnly = function (item) {
                    return item.selected;
                };

                $scope.selectAll = function () {
                    angular.forEach($scope.dropdownItems, function (dropdownItem, key) {
                        dropdownItem.selected = $scope.selectAllDropdownItems;
                    });
                    if ($scope.selectAllDropdownItems) {
                        $(multiSelectWrapper).slideUp();
                        expanded = false;
                        $(selectedItemBox).focus();
                    }
                }

                $scope.checkBoxChecked = function (selected) {
                    if (!selected && $scope.selectAllDropdownItems) {
                        $scope.selectAllDropdownItems = false;
                    }
                    else if (selected && !$scope.selectAllDropdownItems) {
                        var selectAll = true;
                        for (var count = 0; count < $scope.dropdownItems.length; count++) {
                            if ($scope.dropdownItems[count] && !$scope.dropdownItems[count].selected) {
                                selectAll = false;
                                break;
                            }
                        }
                        $scope.selectAllDropdownItems = selectAll;
                    }
                }

                $scope.$on('$destroy', function () {
                    elem.off('keydown');
                    elem.off('keyup');
                    $document.unbind('click', documentClick);
                    $(selectedItemBox).unbind('click');
                    $(multiSelectWrapper).unbind('click');
                });

                elem.on("keydown", function (event) {
                    if (event.which === 40 && !expanded) {
                        slideDown();
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    else if (event.which === 40 && expanded) {
                        if ($scope.dropdownItems && ($scope.currentIndex) < $scope.dropdownItems.length) {
                            $scope.currentIndex++;
                            $scope.$apply();
                        }
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    else if (event.which == 38 && expanded) {
                        if ($scope.currentIndex >= 1) {
                            $scope.currentIndex--;
                            $scope.$apply();
                        }
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    else if (event.which === 32) {
                        event.preventDefault();
                        event.stopPropagation();
                        if ($scope.currentIndex === 0 && expanded) {
                            $scope.selectAllDropdownItems = !$scope.selectAllDropdownItems;
                            $scope.selectAll();
                            $scope.$apply();
                        }
                        else {
                            if ($scope.dropdownItems &&
                                $scope.dropdownItems[$scope.currentIndex - 1]) {
                                var item = $scope.dropdownItems[$scope.currentIndex - 1];
                                item.selected = !item.selected;
                                $scope.checkBoxChecked(item.selected);
                                $scope.$apply();
                            }
                        }
                    }
                    else if (event.which === 9) {
                        if (expanded) {
                            slideUp();
                            event.preventDefault();
                            event.stopPropagation();
                        }
                    }
                    else if (event.which === 13) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                });

                elem.on("keyup", function (event) {
                    if (event.which === 27) {
                        if (expanded) {
                            slideUp();
                            event.preventDefault();
                            event.stopPropagation();
                        }
                    }
                });

                function slideDown() {
                    $(multiSelectWrapper).toggle('slideDown');
                    expanded = true;
                    $document.bind('click', documentClick);
                }

                function slideUp() {
                    $(multiSelectWrapper).slideUp();
                    expanded = false;
                    $scope.currentIndex = -1;
                    $document.unbind('click', documentClick);
                }

                function documentClick() {
                    slideUp();
                }
            }
        };
    }]);
})();
angular.module('simpleMultiSelectDropdown').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/templates/multiSelectDropdown.html',
    "<div class=\"multiple-select-wrapper\"><div class=\"selected-items-box\" tabindex=\"0\"><span ng-show=\"(dropdownItems | filter: getSelectedItemsOnly).length > maxItemsDisplayed && !selectAllDropdownItems\" title=\"See more items..\">{{(dropdownItems | filter: getSelectedItemsOnly).length}} selected</span> <span class=\"dropdown-icon\"></span><ul class=\"items-list\" ng-show=\"(dropdownItems | filter: getSelectedItemsOnly).length <= maxItemsDisplayed && !selectAllDropdownItems\"><li ng-repeat=\"dropdownItem in dropdownItems | filter: getSelectedItemsOnly| limitTo: maxItemsDisplayed\">{{dropdownItem[displayField]}}{{$last ? '' : ', '}}</li></ul><span ng-show=\"(dropdownItems | filter: getSelectedItemsOnly).length === 0 && dropdownItems.length > 0 && !selectAllDropdownItems\" title=\"{{selectText}}\">{{selectText}}</span> <span ng-show=\"dropdownItems.length === 0\" title=\"{{noItemsText}}\">{{noItemsText}}</span> <span ng-show=\"dropdownItems.length > 0 && selectAllDropdownItems\" title=\"{{allText}}\">{{allText}}</span></div><div class=\"list\"><ul class=\"items-list\"><li ng-show=\"dropdownItems.length > 0 && showAll\" ng-class=\"{'items-list-selected' : currentIndex === 0}\"><input id=\"filterDiv\" type=\"checkbox\" ng-model=\"selectAllDropdownItems\" ng-click=\"selectAll()\"><span style=\"padding:0px 0px 0px 5px\">All</span></li><li ng-repeat=\"dropdownItem in dropdownItems\" ng-class=\"{'items-list-selected' : $index == currentIndex - 1 }\"><input type=\"checkbox\" ng-model=\"dropdownItem.selected\" ng-click=\"checkBoxChecked(dropdownItem.selected)\"> <span>{{dropdownItem[displayField]}}</span></li></ul></div></div>"
  );

}]);

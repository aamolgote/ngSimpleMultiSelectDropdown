(function () {
    'use strict'
    var simpleMultiSelectDropdown = angular.module('simpleMultiSelectDropdown');
    simpleMultiSelectDropdown.directive('multiSelectDropdown', ['$document', function ($document) {
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
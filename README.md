# ngSimpleMultiSelectDropdown
ngSimpleMultiSelectDropdown is a light weight angular directive for simple multi select down 

See demo page over [here](http://ngsimplemultiselectdropdown.azurewebsites.net/demo/index.html)

Features
* Simple built using jQuery abstracted with angular directive
* Select all, deselect all items feature, down arrow key expands, esc collapses. 
* Light weight compared to what is available
* Customizable
* .....

### Version
1.0.0

### Installation
Manual: download latest from [here](https://github.com/aamolgote/ngSimpleMultiSelectDropdown)

### Using ngSimpleMultiSelectDropdown

Include jQuery and angular
```html
 <script src="scripts/jquery-2.2.3.js"></script>
 <script src="scripts/angular.js"></script>
```
Include ngSimpleMultiSelectDropdown js file and CSS
```html
<link href="styles/ngSimpleMultiSelectDropdown.css" rel="stylesheet" />
<script src="scripts/ngSimpleMultiSelectDropdown.min.js"></script>
```
You can use the directive like shown below, 
```html
 <ng-simple-multi-select-dropdown 
       dropdown-items="cities" 
       tabindex="-1" 
       display-field="name"
       show-all="true" 
       no-items-text="No Cities to select.." 
       select-text="Select Cities" 
       all-text="All"
       max-items-displayed="6"
       select-all-dropdown-items="selectAllCities" >
</ng-simple-multi-select-dropdown>
```
* dropdown-items - this is scope item which will array of objects, in the sample it is cities
  ```javascript
  $scope.cities = [
              {
                  name: "Los Angeles",
                  code: "LA"
              },
              {
                  name: "San Francisco",
                  code: "SFO"
              }
          ]
	```
 * display-field - This is property within object that needs to be used for displaying text in the drop down.
 * show-all - This add All checkbox which will select all items.
 * no-tems-text - If the array bound to the drop is empty then this is message which will show in the dropdown text and drop down will not expand.
 * select-text - Text which gets displayed by default when not items are selected.
 * all-text - Text when all items have been selected.
 *max-items-displayed - This is number till which drop down will show comma seperated text of selected items beyond this number it will show # of Items selecyed. For.e.g if it is 3 if we select 1,2, or 3 cities it will show text like this "New York, San Franciso, Chicago", beyond 3 it will show 4 Selected.
* select-all-dropdown-items - scope varibale which will be set to true or false if all items are selected.

To get selected items, directive appends .selected property to the objects is the array assigned, for in $scope.cities array for city array item it adds .selected attribute with true or false value.
```javascript
[
  {
    "name": "San Francisco",
    "code": "SFO",
    "selected": true
  },
  {
    "name": "New York",
    "code": "NYC",
    "selected": true
  }
]
```

// get Angular
var app = angular.element(document.body);
var injector = angular.element(document.body).injector();

// get Module
const module = angular.injector().get("moduleName");

var rootscope = angular.element(document.body).scope();

var editor = angular.element(document.getElementsByClassName("container")[0]);

// Editor:
// angular.element(document.getElementsByClassName('container')[0]).injector().modules


var missionScope = angular.element(document.getElementsByClassName("container")[0]).scope();
editScope.selectedCategoryID

const createNewCategory(name: string): number {
    missionScope

    var newCategory = {
        id: missionScope.categoryContent.length,
        name: categoryName,
        missions: [],
        collapse: false,
        sortCriteria: 'initial'
    };
    missionScope.categoryContent.push(newCategory);
    storeCategoryContent(missionScope.categoryContent);

    return newCategory.id;
}
/**
 * Created by Sergey on 26.11.2015.
 */
var evernote = angular.module("evernote", []);

evernote.factory("data", function () {
    var data = {};
    data.notes = [];
    data.notes[0] = {id: "0", title: "Пропылисосить кота", checked: false};
    data.notes[1] = {id: "1", title: "Погладить шнурки", checked: true};
    data.short = "All";
    data.shortvars = ['All', 'Active', 'Completed'];
    return data;
});

evernote.controller("EvernoteController", function($scope, data){
    $scope.data = data;

    $scope.deleteNote = function (index) {
        data.notes.splice(index, 1);
    };

    $scope.addNote = function () {
        data.notes.push({
            id: $scope.data.notes.length + 1,
            title: $scope.noteName,
            checked: false
        });
        $scope.noteName = "";
    };

    $scope.checkNote = function(index){
        data.notes[index].checked = data.notes[index].checked ? false : true ;
    };

    $scope.select = function(item) {
        data.short = item;
    };

    $scope.isActive = function(item) {
        if(data.short === item)
            return "b-form__button_select_short";
        else  return "";
    };

    $scope.selectShortFilter = function(item){
        switch (data.short){
            case "All":
                return item.id >= 0;
            case "Active":
                return item.checked == false;
            case "Completed":
                return item.checked == true;
            default: return true;
        }
    };

});
evernote.filter('checkstatus', function(){
     return function(input){
         return input ? 'b-form__status_done': '';
     };
 });


angular.module('RDash')
    .controller('UserCtrl', ['$scope','$state', UserCtrl]);


function UserCtrl($scope, $state) {

    $scope.showAlert = true;
    $scope.closeAlert = function() {
       $scope.showAlert = false;
    };


    $scope.listshow = true;
    $scope.list= '收起';


    $.ajax({
        // url: baseUrl +'/User/',
        url: 'http://120.77.42.242:8080/Entity/Ufaf878cb8ec3/ParkingLot/Users',
        method: 'GET',
        async: false,
        success: function (data) {
            if (data.Users) {
                $scope.rowCollection = data.Users;
                $scope.usernum =  $scope.rowCollection.length;
                console.log($scope.rowCollection);
                // alert('success!');
            }
        }
    });



    $scope.changeViews = function () {
        $scope.listshow=!$scope.listshow;
        if ($scope.listshow) {
            $scope.list= '收起';
        }
        else {
            $scope.list= '显示';
        }

    };


    $scope.deleteUser = function (row) {

        var r = confirm("确认删除？");
        if (r === true) {
            console.log('delete');

            $.ajax({
                url: 'http://120.77.42.242:8080/Entity/Ufaf878cb8ec3/ParkingLot/Users' +row.id,
                method: 'DELETE',
                async: false,
                success: function (data) {
                    alert(' delete success');
                    if (data.message) {
                        console.log(data);
                        alert('success!');
                    }
                }
            }).done(function () {
                // $state.reload();
                var index = $scope.rowCollection.indexOf(row);
                if (index !== -1) {
                    $scope.rowCollection.splice(index, 1);
                }
                //刷新页面  window.location.reload();
            })
        }
        else {
            console.log('cancel');
        }
    };

    $scope.search = function () {
        // alert(baseUrl);
        $.ajax({
            url: 'http://120.77.42.242:8080/Entity/Ufaf878cb8ec3/ParkingLot/Users',
            method: 'GET',
            async: false,
            success: function (data) {
                    if (data.Users) {
                        $scope.rowCollection = data.Users;
                        console.log($scope.rowCollection);
                        alert('success!');
                }
            }
        });
    }

    $scope.createUser = function () {
        var data = {

            "phonenum": $scope.create.phonenum,
            "password": $scope.create.password,
            "carid": $scope.create.carid,
            "state": 0
        }
        console.log(data);
        if( !data.phonenum || !data.password ||!data.carid){
            alert('关键信息为空！');
        }
        else{

            $.ajax({
                // url: baseUrl +'/User/',
                url: 'http://120.77.42.242:8080/Entity/Ufaf878cb8ec3/ParkingLot/Users',
                method: 'POST',
                async: false,
                data: JSON.stringify(data),
                // headers: {'Content-Type': 'application/json'},
                contentType: 'application/json',
                success: function (data) {
                    if (data) {
                        console.log(data);
                        alert('create user success!');
                        $state.go('user');
                    }
                }
            });
        }
    }

}
/**
 * Created by lulifei on 16/12/16.
 */
angular.module('RDash')
    .controller('AddUserCtrl' , ['$scope', '$state', AddUserCtrl]);

function AddUserCtrl($scope, $state) {

    $scope.createUser = function () {
        var data = {

            "phonenum": $scope.create.phonenum,
            "password": $scope.create.password,
            "carid": $scope.create.carid,
            "state": 0
        }
        console.log(data);
        if(!data.phonenum || !data.password ||!data.carid){
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
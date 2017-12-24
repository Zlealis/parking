/**
 * Created by lulifei on 16/12/9.
 */
angular.module('RDash')
    .controller('EditLotCtrl', ['$scope','$state','$stateParams', EditLotCtrl]);

function EditLotCtrl($scope,$state,$stateParams) {
    $scope.editLot={};
    $scope.myid = $stateParams.id;
    console.log($scope.myid);
    if($scope.myid !== 0){
        console.log("1");
        $.ajax({
            // url: baseUrl +'/User/',
            url: 'http://120.77.42.242:8080/Entity/Ufaf878cb8ec3/ParkingLot/Park/' + $scope.myid,
            method: 'GET',
            async: false,
            success: function (data) {
                console.log(data);
                $scope.editLot = data;
                console.log('success!');
            }
        });
        $scope.imgsrc="http://120.77.42.242:8080/file/Ufaf878cb8ec3/ParkingLot/Park/"+$scope.myid;

    }


    $scope.save = function() {
        if (!$scope.editLot || !$scope.editLot.total || !$scope.editLot.price
            ||!$scope.editLot.decrip) {
            alert('关键信息不能为空！');
        }
        else {

            var data = {
                "id": parseInt($scope.myid),
                // "longitude": parseFloat($scope.editLot.longitude),
                // "latitude": parseFloat($scope.editLot.latitude),
                "address": $scope.editLot.address,
                "name": $scope.editLot.name,
                "total": parseInt($scope.editLot.total),
                "price": parseInt($scope.editLot.price),
                // "xpos": parseInt($scope.editLot.xpos),
                // "ypos": parseInt($scope.editLot.ypos),
                "decrip": $scope.editLot.decrip
            };

            $.ajax({
                url: 'http://120.77.42.242:8080/Entity/Ufaf878cb8ec3/ParkingLot/Park/' + $scope.myid,
                method: 'PUT',
                data: JSON.stringify(data),
                contentType: 'application/json',
                async: false,
                success: function (data) {
                    $scope.editLot = data;
                    console.log(data);
                    alert('update success!');
                    $state.go('lot');
                }
            })
        }
    }

    $scope.updateImg = function () {
        var url = "http://120.77.42.242:8080/Entity/Ufaf878cb8ec3/ParkingLot/Park/" + $scope.myid;
        //console.log(url);
        var files = $(":file")[0].files;
        var formData = new FormData();
        formData.append("file", files[0]);

        $.ajax({
            url: url,
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (data) {
                alert('success!');
                console.log(data);
            }
        })
        $scope.imgsrc="http://120.77.42.242:8080/file/Ufaf878cb8ec3/ParkingLot/Park/"+$scope.myid;
    }


}
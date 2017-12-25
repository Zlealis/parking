
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
        if($scope.editLot.total!==$scope.editLot.left){
            alert("还有车在，不能修改停车场信息");
            state.go('lot');
        }
    }
    console.log($scope.editLot);





    $scope.save = function() {
        if (!$scope.editLot.name || !$scope.editLot.total || !$scope.editLot.price
            ||!$scope.editLot.pbase||!$scope.editLot.decrip) {
            alert('关键信息不能为空！');
        }
        else {
            var s=$scope.editLot.pbase.split('+');
            var pbase;
            var temp;
            var count=0;
            for (var i = 0; i < s.length; i++) {
                temp = parseInt(s[i], 2);
                countTotal(temp);
                if (i == 0) {
                    pbase = temp.toString(16);
                } else {
                    pbase = pbase + "+" + temp.toString(16);
                }
            }

            function countTotal(n) {
                n=(n&0X55555555)+((n>>1)&0x55555555);
                n=(n&0X33333333)+((n>>2)&0x33333333);
                n=(n&0X0f0f0f0f)+((n>>4)&0x0f0f0f0f);
                n=(n&0X00ff00ff)+((n>>8)&0x00ff00ff);
                n=(n&0X0000ffff)+((n>>16)&0x0000ffff);
                count+=n;
            }
            $scope.editLot.total=count;
            var data = {
                "id": parseInt($scope.myid),
                // "longitude": parseFloat($scope.editLot.longitude),
                // "latitude": parseFloat($scope.editLot.latitude),
                // "xpos": parseInt($scope.editLot.xpos),
                // "ypos": parseInt($scope.editLot.ypos),
                "address": $scope.editLot.address,
                "name": $scope.editLot.name,
                "total": parseInt($scope.editLot.total),
                "left": parseInt($scope.editLot.total),
                "price": parseInt($scope.editLot.price),
                "pbase": pbase,
                "pstate": pbase,
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
                $state.go('editLot',{id:$stateParams.id});
            }
        })

    }


}
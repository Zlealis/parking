
angular.module('RDash')
    .controller('LotCtrl', ['$scope','$state', LotCtrl]);

function LotCtrl($scope,$state) {
    // $scope.listshow = false;
    // $scope.listMessage = '显示';

    $scope.listshow = true;
    $scope.listMessage = '收起';
    $.ajax({
        // url: baseUrl +'/User/',
        url: 'http://120.77.42.242:8080/Entity/Ufaf878cb8ec3/ParkingLot/Park1',
        method: 'GET',
        async: false,
        success: function (data) {
            if (data.Park1) {
                $scope.rowCollection = data.Park1;
                $scope.lotnum = $scope.rowCollection.length;
                console.log($scope.rowCollection);
            }
        }
    });

    $scope.changeView = function () {
        $scope.listshow = !$scope.listshow;
        if ($scope.listshow) {
            $scope.listMessage = '收起';
        }
        else {
            $scope.listMessage = '显示';
        }

    };

    $scope.editLot =function(row){
        console.log(row.id);
        $state.go('editLot',{id:row.id},{reload:true});
    };


    // $scope.lotCode = function (row) {
    //     console.log(row.id);
    //     $state.go('qrCode',{id:row.id});
    // }
    //
    // $scope.createEntry = function (row) {
    //     console.log(row.id);
    //     $state.go('entry',{id:row.id});
    // }


    $scope.manage = function(row){
        $state.go('space',{id:row.id});
    };


    $scope.search = function () {
        $scope.listshow = true;
        $scope.listMessage = '收起';
        // alert(baseUrl);
        $.ajax({
            // url: baseUrl +'/User/',
            url: 'http://120.77.42.242:8080/Entity/Ufaf878cb8ec3/ParkingLot/Park1',
            method: 'GET',
            async: false,
            success: function (data) {
                if (data.Park1) {

                    $scope.rowCollection = data.Park1;
                    console.log($scope.rowCollection);
                    alert('success!');
                }
            }
        });
    };

    $scope.deleteLot = function (row) {

        var txt;
        var r = confirm("确认删除？");
        if (r == true) {
            console.log('delete');

            $.ajax({
                url: 'http://120.77.42.242:8080/Entity/Ufaf878cb8ec3/ParkingLot/Park1/' + row.id,
                method: 'DELETE',
                async: false,
                success: function (data) {
                    alert('delete success');
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

    }
}



angular.module('RDash')
    .controller('OrderCtrl', ['$scope', OrderCtrl]);

function OrderCtrl($scope) {
    $scope.listshow = true;
    $scope.listMessage = '收起';
    $.ajax({

        url: 'http://120.77.42.242:8080/Entity/Ufaf878cb8ec3/ParkingLot/Parkorder/',
        method: 'GET',
        async: false,
        success: function (data) {
            if (data.Parkorder) {
                $scope.rowCollection = data.Parkorder;
                $scope.ordernum = $scope.rowCollection.length;
                console.log($scope.rowCollection);
                /*if($scope.rowCollection){
                    $scope.rowCollection.forEach(function(row){
                        // $scope.userid = list
                        row.start = parseDate(new Date(Date.parse(row.start)));
                        if(row.leave == null){
                            row.leave = "尚未离开";
                        }
                        else{
                            row.leave = parseDate(new Date(Date.parse(row.leave)));
                        }*/

                    /*})
                }*/
                // alert('success!');
            }
        }
    });


    $scope.changeView= function () {
        $scope.listshow = !$scope.listshow;
        if ($scope.listshow) {
            $scope.listMessage = '收起';
        }
        else {
            $scope.listMessage = '显示';
        }

    };


    $scope.search = function () {
        // alert(baseUrl);
        $.ajax({
            // url: baseUrl +'/User/',
            url: 'http://120.77.42.242:8080/Entity/Ufaf878cb8ec3/ParkingLot/Parkorder/',
            method: 'GET',
            async: false,
            success: function (data) {
                if (data.Parkorder) {
                    $scope.rowCollection = data.Parkorder;
                    console.log($scope.rowCollection);
                    /*if($scope.rowCollection){
                        $scope.rowCollection.forEach(function(row){
                            // $scope.userid = list
                            row.start = parseDate(new Date(Date.parse(row.start)));
                            if(row.leave == null){
                                row.leave = "尚未离开";
                            }
                            else{
                                row.leave = parseDate(new Date(Date.parse(row.leave)));
                            }
                        })
                    }*/
                    alert('success!');
                }
            }
        });
    };

    /*function parseDate(d) {
            // var   year=d.getYear();
            var   month = d.getMonth()+1;
            var   date = d.getDate();
            var   hour = d.getHours();
            var   minute = d.getMinutes();
            var   second = d.getSeconds();
            return   "2017-"+ month+"-"+ date + "   "+ hour+ ":" + minute+ ":" + second;

    }*/

}
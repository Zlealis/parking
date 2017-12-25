/**
 * Created by lulifei on 16/12/4.
 */

angular.module('RDash')
    .controller('SpaceCtrl', ['$scope','$state','$stateParams', SpaceCtrl]);

function SpaceCtrl($scope,$state,$stateParams) {
    $scope.row={};
    $scope.parkid = $stateParams.id;
    var i=0,j=0;
    var pbase=null,pstate=null;
    $scope.listshow = true;
    $scope.listMessage = '收起';
    // alert(baseUrl);
    if($scope.parkid !== 0)
    {
        $.ajax({
            // url: baseUrl +'/User/',
            url: 'http://120.77.42.242:8080/Entity/Ufaf878cb8ec3/ParkingLot/?Park.parkid='+ $scope.parkid,
            method: 'GET',
            async: false,
            success: function (data) {
                if (data) {
                    pbase=data.pbase;
                    pstate=data.pstate;
                    // console.log($scope.rowCollection);
                    // alert('success!');
                }
            }
        });
    }
    if(pbase!==null&&pstate!==null){
        var pb=pbase.split('+');
        var ps=pstate.split('+');
        // pb.lenth 一定等于ps.length
        var length=0;
        for(i=0;i<pb.length;i++){
            if(parseInt(pb[i],2).length>length) {
                length = parseInt(pb[i],2).length;
            }
        }
        compare();
    }

    function compare() {

        for(i=0;i<pb.length;i++){
            for(j=0;j<length;j++){
                if((pb[i]&(1<<j))!==0){
                    $scope.row.xpos=i;
                    $scope.row.ypos=j;
                    if((pb[i]&(1<<j))!==0){
                        $scope.row.isfull=false;
                    }else {
                        $scope.row.isfull=true;
                    }
                    $scope.rowCollection.append($scope.row);
                }
            }
        }
    }

    $scope.changeState=function (x,y) {
        ps[x]=ps[x]^(1<<y);







    }


    $scope.changeView = function () {
        $scope.listshow = !$scope.listshow;
        if ($scope.listshow) {
            $scope.listMessage = '收起';
        }
        else {
            $scope.listMessage = '显示';
        }

    };




    $scope.search = function () {
        $scope.listshow = true;
        $scope.listMessage = '收起';
        // alert(baseUrl);
        $.ajax({
            // url: baseUrl +'/User/',
            url: 'http://120.77.42.242:8080/Entity/Ufaf878cb8ec3/ParkingLot/Park/?Parkspace.parkid='+ $scope.parkid,
            method: 'GET',
            async: false,
            success: function (data) {
                if (data.Parkspace) {
                    $scope.rowCollection = data.Parkspace;
                    console.log($scope.rowCollection);
                    alert('success!');
                }
            }
        });
    };



}
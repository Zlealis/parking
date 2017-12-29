
angular.module('RDash')
    .controller('SpaceCtrl', ['$scope','$state','$stateParams', SpaceCtrl]);

function SpaceCtrl($scope,$state,$stateParams) {
    $scope.row={};
    $scope.rowCollection=[];

    $scope.parkid = $stateParams.id;
    console.log("a");
    var i=0,j=0;
    var datatemp=null;
    var pbase=null,pstate=null;
    $scope.listshow = true;
    $scope.listMessage = '收起';
    // alert(baseUrl);
    if($scope.parkid !== 0)
    {
        $.ajax({
            // url: baseUrl +'/User/',
            // url: 'http://120.77.42.242:8080/Entity/Ufaf878cb8ec3/ParkingLot/?Park1.id='+ $scope.parkid,
            url: 'http://120.77.42.242:8080/Entity/Ufaf878cb8ec3/ParkingLot/Park1/'+ $scope.parkid,
            method: 'GET',
            async: false,
            success: function (data) {
                if (data) {
                    $scope.total=data.total;
                    $scope.left=data.left;
                    datatemp=data;
                    pbase=data.pbase;
                    pstate=data.pstate;
                    console.log('success!');
                }
            }
        });
    }

    if(pbase.length>0&&pstate.length>0){
        var pb=pbase.split('+');
        var ps=pstate.split('+');

        // console.log("pb   "+pb+" ps   "+ps+"   pstate"+pstate);
        // pb.lenth 一定等于ps.length
        var length=0;//最长行的长度，即最多有多少列
        for(i=0;i<pb.length;i++){
            pb[i]=parseInt(pb[i],10).toString(2);
            ps[i]=parseInt(ps[i],10).toString(2);
            // console.log("ps 1   "+ps);
            if(pb[i].length>length) {
                length = pb[i].length;
            }
        }
        console.log("before compare"+length);
        // for (i=0;i<pb.length;i++){
        //     pb[i]=PrefixInteger(pb[i],length);
        // }
        compare();
    }


    /**
     * @return {string}
     */
    function PrefixInteger(num, length) {
        return (Array(length).join('0')+ num).slice(-length);
    }

    function compare() {
        var idtemp=0;
        for(i=0;i<pb.length;i++){//行
            // for(j=0;j<length;j++){//列
            for(j=length-1;j>=0;j--){//列
                if((pb[i]&(1<<j))!==0){//选出所有1的即所有车位
                    //车位坐标
                    var rowtemp=[];
                    // $scope.row.id++;
                    // $scope.row.xpos=i+1;
                    // $scope.row.ypos=length-j;
                    // console.log(i+" "+j);
                    // console.log($scope.row.id+" "+$scope.row.xpos+" "+$scope.row.ypos);
                    // //车位状态
                    // if(((ps[i]&(1<<j))^(pb[i]^(1<<j))!==0)){
                    //     $scope.row.isfull=true;
                    // }else {
                    //     $scope.row.isfull=false;
                    // }
                    // $scope.rowCollection.push($scope.row);
                    // console.log( $scope.rowCollection);
                    rowtemp.id=++idtemp;
                    rowtemp.xpos=i+1;
                    rowtemp.ypos=length-j;
                    // console.log(i+" or"+j);
                    // console.log(rowtemp.id+" "+rowtemp.xpos+" "+rowtemp.ypos);
                    //车位状态
                    //console.log((pb[i]&(1<<j))^(ps[i]&(1<<j)));
                    if(((pb[i]&(1<<j))^(ps[i]&(1<<j)))!==0){
                        rowtemp.isfull=true;
                    }else {
                        rowtemp.isfull=false;
                    }
                    $scope.rowCollection.push(rowtemp);
                    //console.log( $scope.rowCollection);
                }

            }
        }
    }

    var result="";
    $scope.changeState=function (x,y) {
        x=x-1;
        y=length-y;
        console.log("ps"+ps);
        console.log(x+" xy "+y);
        console.log("psx "+ps[x]);
        console.log("psx "+(1<<y));
        console.log("psx "+(parseInt( ps[x],2)^(1<<y)));
        ((parseInt(ps[x],2)&(1<<y))!==0)?datatemp.left--:datatemp.left++;
        ps[x]=(parseInt(ps[x],2)^(1<<y)).toString(2);//颠倒状态

        console.log("a"+ps[x]);
        console.log(ps);
        save();
    };

    function save(){
        console.log(ps[0].toString(16));
        console.log(parseInt(ps[0],2).toString(16));
        result=parseInt(ps[0],2).toString(16);
        console.log(result);
        for(i=1;i<ps.length;i++){
            result=result + "+"+ parseInt(ps[i],2).toString(16);
            console.log("result"+result);
        }

        var data = {
            "id": parseInt(datatemp.id),
            "address": datatemp.address,
            "name": datatemp.name,
            "total": parseInt(datatemp.total),
            "left": parseInt(datatemp.left),
            "price": parseInt(datatemp.price),
            "pbase": pbase,
            "pstate": result,//只更新这个
            "decrip": datatemp.decrip
        };
        console.log(pbase+" "+result);
        $.ajax({
            url: 'http://120.77.42.242:8080/Entity/Ufaf878cb8ec3/ParkingLot/Park1/' + $scope.parkid,
            method: 'PUT',
            data: JSON.stringify(data),
            contentType: 'application/json',
            async: false,
            success: function (data) {
                console.log(data);
                alert('update success!');
                // $state.go('space', {id: $scope.parkid});
                console.log($scope.parkid);
                console.log(data.id);
                $state.go('space',{id:data.id},{reload:true});
            }
        })
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




    // $scope.search = function () {
    //     $scope.listshow = true;
    //     $scope.listMessage = '收起';
    //     // alert(baseUrl);
    //     $.ajax({
    //         // url: baseUrl +'/User/',
    //         url: 'http://120.77.42.242:8080/Entity/Ufaf878cb8ec3/ParkingLot/Park/?Parkspace.parkid='+ $scope.parkid,
    //         method: 'GET',
    //         async: false,
    //         success: function (data) {
    //             if (data.Parkspace) {
    //                 $scope.rowCollection = data.Parkspace;
    //                 console.log($scope.rowCollection);
    //                 alert('success!');
    //             }
    //         }
    //     });
    // };



}
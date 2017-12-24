angular.module('RDash', ['ui.router','ui.bootstrap','smart-table'])
    .constant('baseUrl','http://120.77.42.242:8080/Entity/Ufaf878cb8ec3/ParkingLot/')
    .constant('baiduUrl','http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&output=json&ak=GtbQBreby2AvEG84if8G7uQHStQ8WykU')
    .constant('bmapUrl','http://api.map.baidu.com/staticimage/v2?ak=GtbQBreby2AvEG84if8G7uQHStQ8WykU');
//     .filter("unique", unique());
//
// function unique() {
//         return function (arr, field) {
//             var o = {}, i, l = arr.length, r = [];
//             for(i=0; i<l;i+=1) {
//                 o[arr[i][field]] = arr[i];
//             }
//             for(i in o) {
//                 r.push(o[i]);
//             }
//             return r;
//         };
//     }
    // .filter("myImageUrl", function(bmapUrl){
    //     return function(input){
    //         // var words = input.split(' ');
    //         return bmapUrl  + '&center=' + input.uu +','+ input.ii;
    //         // return bmapUrl  + '&center=' + input;
    //     }
    // });
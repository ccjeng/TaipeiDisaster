
(function(){

var app = angular.module('app', []);

app.controller('GetDisasterSummary', ['$scope', '$http', function($scope, $http) {

    $scope.orderByField = 'CaseTime';
    $scope.reverseSort = true;


    var mapOptions = {
        zoom: 13,
        center: new google.maps.LatLng(25.037525,121.563782),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];

    var infoWindow = new google.maps.InfoWindow();
/*
    var draw_heatmap = function(info) {
        var heatMapData = new google.maps.MVCArray(info);
        var heatmap = new google.maps.visualization.HeatmapLayer({ data: heatMapData });
        heatmap.setMap($scope.map);
    };
*/
    var createMarker = function (data){
      
        var pinColor = (data.CaseComplete === "true") ? "80e516" : "FE7569";
        var pinImage; 
        var word;

        switch(data.PName) {
          case '路樹災情':
              word='樹';
              break;
          case '民生、基礎設施災情':
              word='民';
              break;
          case '建物毀損':
              word='建';
              break;
          case '廣告招牌災情':
              word='廣';
              break;
          case '積淹水災情':
              word='水';
              break;
          case '其他災情':
              word='其';
              break;
          case '環境污染':
              word='污';
              break;
          case '土石災情':
              word='土';
              break;
          case '道路、隧道災情':
              word='路';
              break;
          case '鐵路、高鐵及捷運災情':
              word='運';
              break;  
          case '車輛及交通事故':
              word='車';
              break;                                   
          default:
              word='危';              
        };

        if(data.CaseComplete === "true"){
            word = "復";
            pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_spin&chld=0.7|0|"+ pinColor +"|15|b|"+word);
        } else {
            pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_spin&chld=0.7|20|"+ pinColor +"|15|b|"+word);
        }

        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(data.Wgs84Y, data.Wgs84X),
            title: data.PName + ' - '+ data.Name,
            pid: data['-diffgr:id'].toLowerCase(),
            icon: pinImage,
            pinColor: pinColor
        });

        marker.content = '<div class="infoWindowContent">發生時間：' + data.CaseTime
          + '</br>災情地點：' + data.CaseLocationDescription
          + '</br>災情描述：' + data.CaseDescription 
          + '</div>';

        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h3>' + marker.title + '</h3>' + marker.content );
            infoWindow.open($scope.map, marker);
        });
        
        $scope.markers.push(marker);
        
    };
/*
    var cleanMarker = function() {
        var markers = $scope.markers;
        for (var i = 0; i < markers.length; i++) { markers[i].setMap(null); }
        $scope.markers = [];
    };
*/
    $scope.total = {
      '路樹災情': 0,
      '民生、基礎設施災情': 0,
      '建物毀損': 0,
      '廣告招牌災情': 0,
      '積淹水災情': 0,
      '其他災情': 0,
      '環境污染': 0,
      '土石災情': 0,
      '道路、隧道災情': 0,
      '水利設施災情': 0,
      '鐵路、高鐵及捷運災情': 0,
      '車輛及交通事故': 0
    };

    $scope.doneTotal = {
      '路樹災情': 0,
      '民生、基礎設施災情': 0,
      '建物毀損': 0,
      '廣告招牌災情': 0,
      '積淹水災情': 0,
      '其他災情': 0,
      '環境污染': 0,
      '土石災情': 0,
      '道路、隧道災情': 0,
      '水利設施災情': 0,
      '鐵路、高鐵及捷運災情': 0,
      '車輛及交通事故': 0
    };

    //$scope.listDistrict = ['中正區','大同區','中山區','松山區','大安區','萬華區','信義區','士林區','北投區','內湖區','南港區','文山區'];

    //$http.get('http://tonyq.org/kptaipei/GetDisasterSummary-20150808.php')
    //$http.get('./data/GetDisasterSummary.json')

    $http.get('https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json')        
    .success(function(data, status, headers, config) {
      d = data.DataSet['diffgr:diffgram'].NewDataSet['CASE_SUMMARY'];

      $scope.dataTime = data.DataSet['-date'];

      console.log(d);

      $scope.cases = d;

/*
    var locationCoords = [];

    d.map(function(p){
      locationCoords.push( new google.maps.LatLng(p.Wgs84Y, p.Wgs84X) );
    });

    draw_heatmap(locationCoords);
*/

      var caseDone = 0, caseInProgress = 0, caseRate = 0.00;

      for (i = 0; i < d.length; i++){
        createMarker(d[i]);
      
        if (d[i].CaseComplete==='true') {
            caseDone = caseDone + 1;
  
            if (d[i].PName==='路樹災情') {
              $scope.doneTotal['路樹災情'] += 1;
            }
            if (d[i].PName==='民生、基礎設施災情') {
              $scope.doneTotal['民生、基礎設施災情'] += 1;
            }
            if (d[i].PName==='建物毀損') {
              $scope.doneTotal['建物毀損'] += 1;
            }
            if (d[i].PName==='廣告招牌災情') {
              $scope.doneTotal['廣告招牌災情'] += 1;
            }
            if (d[i].PName==='積淹水災情') {
              $scope.doneTotal['積淹水災情'] += 1;
            }
            if (d[i].PName==='其他災情') {
              $scope.doneTotal['其他災情'] += 1;
            }
            if (d[i].PName==='土石災情') {
              $scope.doneTotal['土石災情'] += 1;
            }
            if (d[i].PName==='道路、隧道災情') {
              $scope.doneTotal['道路、隧道災情'] += 1;
            }
            if (d[i].PName==='水利設施災害') {
              $scope.doneTotal['水利設施災情'] += 1;
            }
            if (d[i].PName==='鐵路、高鐵及捷運災情') {
              $scope.doneTotal['鐵路、高鐵及捷運災情'] += 1;
            }
            if (d[i].PName==='車輛及交通事故') {
              $scope.doneTotal['車輛及交通事故'] += 1;
            }
        }else {
            caseInProgress = caseInProgress + 1;
        }

        if (d[i].PName==='路樹災情') {
          $scope.total['路樹災情'] += 1;
        }
        if (d[i].PName==='民生、基礎設施災情') {
          $scope.total['民生、基礎設施災情'] += 1;
        }
        if (d[i].PName==='建物毀損') {
          $scope.total['建物毀損'] += 1;
        }
        if (d[i].PName==='廣告招牌災情') {
          $scope.total['廣告招牌災情'] += 1;
        }
        if (d[i].PName==='積淹水災情') {
          $scope.total['積淹水災情'] += 1;
        }
        if (d[i].PName==='其他災情') {
          $scope.total['其他災情'] += 1;
        }
        if (d[i].PName==='土石災情') {
          $scope.total['土石災情'] += 1;
        }
        if (d[i].PName==='道路、隧道災情') {
          $scope.total['道路、隧道災情'] += 1;
        }
        if (d[i].PName==='水利設施災害') {
          $scope.total['水利設施災情'] += 1;
        }
        if (d[i].PName==='鐵路、高鐵及捷運災情') {
          $scope.total['鐵路、高鐵及捷運災情'] += 1;
        }
        if (d[i].PName==='車輛及交通事故') {
          $scope.total['車輛及交通事故'] += 1;
        }
    

      }

        caseRate = 100 * caseDone / (caseDone + caseInProgress);

        $scope.caseDone = caseDone;
        $scope.caseInProgress = caseInProgress;
        $scope.caseRate = caseRate.toFixed(2);

         var mc = new MarkerClusterer($scope.map, $scope.markers, {gridSize: 80, maxZoom: 16});
      })


    .error(function(data, status, headers, config) {
      // log error
      console.log('http error');
    });

    //http://jsfiddle.net/pc7Uu/854/
    $scope.itemClicked = function (e, index) {
        //e.preventDefault();
        google.maps.event.trigger($scope.markers[index], 'click');
    };


}]);


})();


function isEmpty(str) {
    return ((typeof str == 'undefined')|| !str || 0 === str.length);
}

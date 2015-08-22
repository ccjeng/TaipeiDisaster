
(function(){

var app = angular.module('app', []);

app.controller('GetDisasterSummary', ['$scope', '$http', function($scope, $http) {

    $scope.orderByField = 'CaseTime';
    $scope.reverseSort = true;


    var mapOptions = {
        zoom: 16,
        center: new google.maps.LatLng(25.0504416, 121.5414189),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];

    var infoWindow = new google.maps.InfoWindow();

    var createMarker = function (info){
      
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.Wgs84Y, info.Wgs84X),
            title: info.PName + ' - '+ info.Name,
        });


        marker.content = '<div class="infoWindowContent">發生時間：' + (isEmpty(d[i].CaseTime) ? '' : info.CaseTime)
          + '</br>災情地點：' + info.CaseLocationDescription
          + '</br>災情描述：' + info.CaseDescription 
          + '</div>';
        
        if (info.CaseComplete==='true') {
          marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
        }

        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h3>' + marker.title + '</h3>' + marker.content );
            infoWindow.open($scope.map, marker);
        });
        
        $scope.markers.push(marker);
        
    };

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

    $scope.listDistrict = ['中正區','大同區','中山區','松山區','大安區','萬華區','信義區','士林區','北投區','內湖區','南港區','文山區'];

    //$http.get('http://tonyq.org/kptaipei/GetDisasterSummary-20150808.php')
    $http.get('https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json')    
    //$http.get('./data/GetDisasterSummary.json')
    
    .success(function(data, status, headers, config) {
      //console.log('call json');

      //d = data.DataSet['diffgr:diffgram'].NewDataSet['CASE_SUMMARY'];
      d = data.DataSet['diffgr:diffgram'].NewDataSet['CASE_SUMMARY'];
      //console.log(d);

      $scope.cases = d;

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

      caseRate = 100 * caseDone / (caseDone + caseInProgress)

      $scope.caseDone = caseDone;
      $scope.caseInProgress = caseInProgress;
      $scope.caseRate = caseRate.toFixed(2);

      })


    .error(function(data, status, headers, config) {
      // log error
      console.log('http error');
    });

    //http://jsfiddle.net/pc7Uu/854/
    $scope.openInfoWindow = function(e, selectedMarker){
        //e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
        console.log(selectedMarker);
    }

}]);


})();

function isEmpty(str) {
    return ((typeof str == 'undefined')|| !str || 0 === str.length);
}


(function(){

var app = angular.module('app', []);

app.controller('GetDisasterSummary', ['$scope', '$http', function($scope, $http) {

    $scope.orderByField = 'CaseTime';
    $scope.reverseSort = true;

    var mapOptions = {
        zoom: 13,
        center: new google.maps.LatLng(25.0504416, 121.5414189),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];

    var infoWindow = new google.maps.InfoWindow();

    var createMarker = function (info){
        

        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.Wgs84Y[0], info.Wgs84X[0]),
            title: info.CaseLocationDescription[0],
        });
        marker.content = '<div class="infoWindowContent">' + info.CaseTime[0] + '</br>' + info.CaseDescription[0] + '</div>';
        
        if (info.CaseComplete[0]==='true') {
          marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
        }

        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h3>' + marker.title + '</h3>' + marker.content );
            //infoWindow.setContent(marker.content);
            infoWindow.open($scope.map, marker);
        });
        
        $scope.markers.push(marker);
        
    }  
    

    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }

    $http.get('https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json')
    .success(function(data, status, headers, config) {
      console.log('call json');

      d = data.DataSet['diffgr:diffgram'][0].NewDataSet[0]['CASE_SUMMARY'];
      $scope.cases = d; //data.DataSet['diffgr:diffgram'][0].NewDataSet[0]['CASE_SUMMARY'];

      
      for (i = 0; i < d.length; i++){
        createMarker(d[i]);
      }

    })
    .error(function(data, status, headers, config) {
      // log error
      console.log('http error');
    });




}]);

})();


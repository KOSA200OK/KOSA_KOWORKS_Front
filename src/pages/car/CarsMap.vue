<template>
    <div id="map"></div>
</template>
<script>

export default {
    name: 'CarsMap',
    props: ["c"],
    data(){
            return{
                map : null,
                infowindow: null,
                selectedMarker : null
            }
    },
    mounted() {
        if(window.kakao && window.kakao.maps){
            this.initMap()
        }else{
            const script = document.createElement('script')
            script.onload = () => kakao.maps.load(this.initMap)
            script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=29851ed52e7ebaeb6c86e255a49612e0&autoload=false" 
            document.head.appendChild(script)
        }
    },
    methods: {
        initMap(){
            console.log('initMap')
            var container = document.getElementById('map')
		    var options = {
                center: new kakao.maps.LatLng(37.4951092, 127.122443),  
                level: 7   
		    }
 
		    this.map = new kakao.maps.Map(container, options)   

            console.log('맵 생성')

            for (var i = 0; i < this.c.length; i ++) {
                console.log(i+': '+this.c[i].id)
    
                // 마커 이미지의 이미지 크기 입니다
                // var imageSize = new kakao.maps.Size(24, 35); 
                
                // 마커 이미지를 생성합니다    
                // var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 

                var latlng  = new kakao.maps.LatLng(this.c[i].latitude, this.c[i].longitude)
                console.log('위도 :'+this.c[i].latitude+' 경도 :'+this.c[i].longitude)

                this.createMarker(latlng, this.c[i].carNo)
                
                // // 마커를 생성합니다
                // var marker = new kakao.maps.Marker({
                //     map: this.map, // 마커를 표시할 지도
                //     position: latlng, // 마커를 표시할 위치
                //     title : this.c[i].carNo, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                //     // image : markerImage // 마커 이미지 
                // });
                // console.log('마커 생성')

                // marker.setMap(this.map)
                // console.log('마커 세팅')

                // // 클로저를 사용하여 클릭 이벤트 핸들러를 정의합니다.
                // // 이렇게 함으로써 각 마커에 대한 고유한 정보에 액세스할 수 있습니다.
                // const markerClickHandler = ((car) => {
                //     return () => {
                //         // 이미 열린 infowindow가 있다면 닫아줍니다.
                //         if (this.infowindow) {
                //         this.infowindow.close();
                //         }

                //         this.infowindow = new kakao.maps.InfoWindow({
                //             content: car.carNo // 인포윈도우에 표시할 내용
                //         });

                //         this.infowindow.open(this.map, marker);
                //     };
                // })(this.c[i]);

                // // 마커에 클릭 이벤트를 등록합니다.
                // kakao.maps.event.addListener(marker, 'click', markerClickHandler);
            }
        },
        createMarker(position,title){
            var marker = new kakao.maps.Marker({
                map: this.map, // 마커를 표시할 지도
                position: position, // 마커를 표시할 위치
                title : title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                        // image : markerImage // 마커 이미지 
            });
            console.log('마커 생성')

            marker.setMap(this.map)
            console.log('마커 세팅')

            kakao.maps.event.addListener(marker, 'click', () => {
                if (this.selectedMarker && this.selectedMarker !== marker) {
                    this.infowindow.close(); 
                }

                this.infowindow = new kakao.maps.InfoWindow({
                    content: `<div class="custom-infowindow">${title}</div>`
                }); 
                this.infowindow.open(this.map, marker)

                this.selectedMarker = marker;
            });
        }
    },
}
</script>
<style scoped>
 #map{
    width:800px;
    height:400px;
    margin-left : 15%;
    margin-bottom: 5%;
    border-radius: 20px;
    border : solid 2px #50798b34;
    box-shadow: 0 5px 30px #d3d1d1;
 }
 .custom-infowindow{
    border : solid 1px #009EA8;
    padding : 10px;
 }
</style>

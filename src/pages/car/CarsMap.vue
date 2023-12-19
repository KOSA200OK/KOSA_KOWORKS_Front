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
                overlay: null,
                selectedMarker : null,
                markers: []
            }
    },
    watch : {
		c: {
            handler(newValue, oldValue) {
                this.recreateMarkers()
                // console.log('ㅎㅎ')
            },
            deep: true
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
            this.markers.push(marker)

            kakao.maps.event.addListener(marker, 'click', () => {
                if (this.selectedMarker && this.selectedMarker !== marker) {
                    // this.infowindow.close(); 
                    this.overlay.setMap(null);
                }
                var content = document.createElement('div');
                content.className = 'bubble';
                content.innerHTML = title;
                // 마커 위에 커스텀오버레이를 표시합니다
                // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
                this.overlay = new kakao.maps.CustomOverlay({
                    content: content,//`<div class="bubble">${title}</div>`,
                    map: this.map,
                    position: marker.getPosition()       
                });

                this.overlay.setMap(this.map);

                // this.infowindow = new kakao.maps.InfoWindow({
                //     content: `<div class="custom-infowindow">${title}</div>`
                // }); 
                // this.infowindow.open(this.map, marker)

                this.selectedMarker = marker;
            });
        },
        recreateMarkers() {
            console.log('시작했어')
            // 이전 마커들을 모두 제거
            for(var m of this.markers){
                m.setMap(null)
            }
            console.log('삭제했어')

            for (var i = 0; i < this.c.length; i ++) {
                console.log(i+': '+this.c[i].id)
    
                var latlng  = new kakao.maps.LatLng(this.c[i].latitude, this.c[i].longitude)
                console.log('위도 :'+this.c[i].latitude+' 경도 :'+this.c[i].longitude)

                this.createMarker(latlng, this.c[i].carNo)
            }

            console.log('세팅했어')
        }
    },
}
</script>
<style>
 #map{
    width:800px;
    height:400px;
    margin-bottom: 5%;
    border-radius: 20px;
    border : solid 2px #50798b34;
    box-shadow: 0 5px 30px #d3d1d1;
 }
 .custom-infowindow{
    border : solid 1px #009EA8;
    padding : 10px;
 }
 .bubble {
    text-align: center;
    font-size : 15px;
    font-weight: 700;
    color : rgb(255, 255, 255);
    /* text-shadow: 1px 1px 1px #ff9500; */
    padding-top : 5px;
    position:relative; 
    margin: 50px;
    width:80px; 
    height:30px;
    background:#f3b42d; 
    border-radius: 30px;
    bottom: 50px;
    box-shadow: 0 10px 20px rgba(0, 11, 48, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    box-shadow:  inset 0 3px 8px #fdf8f5;
    /* inset 0 0 20px */

    animation: bubble 0.7s ease-in 0s infinite alternate; 
    margin-top: 0;
}

.bubble:after {
    border-top:10px solid #f3b42d; 
    border-left: 10px solid transparent; 
    border-right: 10px solid transparent; 
    border-bottom: 0px solid transparent; 
    content:""; 
    position:absolute;
    top:30px;
    left:30px;  
}
@keyframes bubble {
	0% {margin-top: 0px;} /* 처음 위치 */
	100% {margin-top: 10px;} /* 마지막 위치 */
}
</style>

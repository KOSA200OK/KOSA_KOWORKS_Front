<template>
    <div id="map"></div>
</template>
<script>

export default {
    name: 'CarsMap',
    data(){
            return{
                map : null
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
            var container = document.getElementById('map')
		    var options = {
                center: new kakao.maps.LatLng(37.4951092, 127.122443),  
                level: 7   
		    }
 
		    this.map = new kakao.maps.Map(container, options)   

            var markerPosition  = new kakao.maps.LatLng(37.4951092, 127.122443)

            var marker = new kakao.maps.Marker({
                position: markerPosition
            });

            marker.setMap(this.map);

            // for (var i = 0; i < positions.length; i ++) {
    
            //     // 마커 이미지의 이미지 크기 입니다
            //     var imageSize = new kakao.maps.Size(24, 35); 
                
            //     // 마커 이미지를 생성합니다    
            //     var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
                
            //     // 마커를 생성합니다
            //     var marker = new kakao.maps.Marker({
            //         map: map, // 마커를 표시할 지도
            //         position: positions[i].latlng, // 마커를 표시할 위치
            //         title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            //         image : markerImage // 마커 이미지 
            //     });
            // }
        }
    },
}
</script>
<style scoped>
 #map{
    width:700px;
    height:400px;
    margin-left : 15%;
    margin-bottom: 10%;
    border-radius: 20px;
 }
</style>

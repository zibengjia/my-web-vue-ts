<template>
  <div id="container"></div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import { points, _renderClusterMarker, _renderMarker } from '@/utils/AMap/mapPoints'
const key = import.meta.env.VITE_AMAP_KEY

let map: AMap.Map | null = null
onMounted(() => {
  AMapLoader.load({
    key: key, // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.ToolBar', 'AMap.ControlBar', 'AMap.Scale', 'AMap.MapType', 'AMap.Geolocation', 'AMap.MarkerCluster'],
  })
    .then((AMap) => {
      map = new AMap.Map('container', {
        viewMode: '3D', // 是否为3D地图模式
        pitch: 69, // 俯仰角度，默认0，取值范围 0 ~ 83
        rotation: 160, // 旋转角度，默认0，取值范围 0 ~ 360
        zoom: 17, // 初始化地图级别
        center: [112.944534, 28.178917], // 初始化地图中心点位置
        animationEnable: true, // 是否开启动画
        mapStyle: 'amap://styles/normal', // 设置地图的显示样式
      })
      const toolBar = new AMap.ToolBar({
        position: {
          right: '20px',
          bottom: '60px',
        },
      })
      const controlBar = new AMap.ControlBar({
        showZoomBar: true,
        showControlButton: true,
        position: {
          right: '10px',
          top: '10px',
        },
      })
      const scale = new AMap.Scale({
        position: {
          Left: '10px',
          bottom: '25px',
        },
      })
      const mapType = new AMap.MapType({
        defaultType: 0,
        showRoad: true,
        position: {
          right: '60px',
          bottom: '120px',
        },
      })
      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, // 是否使用高精度定位，默认:true
        timeout: 10000, // 超过10秒后停止定位，默认：无穷大
        buttonPosition: 'RB', // 定位按钮的停靠位置
      })

      const cluster = new AMap.MarkerCluster(map, points, {
        gridSize: 80,
        renderClusterMarker: _renderClusterMarker, //上述步骤的自定义聚合点样式
        renderMarker: _renderMarker, //上述步骤的自定义非聚合点样式
      })
      map!.addControl(toolBar)
      map!.addControl(controlBar)
      map!.addControl(scale)
      map!.addControl(mapType)
      map!.addControl(geolocation)
    })
    .catch((e) => {
      console.log(e)
    })
})

onUnmounted(() => {
  map?.destroy()
})
</script>

<style scoped lang="scss">
#container {
  width: 100%;
  height: 100vh;
  padding: 0;
  margin: 0;
}
</style>

<template>
  <div id="container"></div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import { points } from '@/utils/AMap/mapPoints'
const key = import.meta.env.VITE_AMAP_KEY

// 声明全局 window 类型
declare global {
  interface Window {
    closeInfoWindow: () => void
  }
}

const animationTime = 2500 // 动画时间(毫秒)
// 动画队列方案
const animationQueue = [
  { delay: 500, action: () => map?.setPitch(36, false, animationTime) }, //设置俯仰角度
  { delay: 0, action: () => map?.setRotation(16, false, animationTime) }, //设置旋转角度
  { delay: 0, action: () => map?.setZoom(5.6, false, animationTime) }, //设置缩放级别
  { delay: 0, action: () => map?.setCenter([112.55, 28.11], false, animationTime) }, //设置中心点(三亚)
]

const runAnimationQueue = async (queue: typeof animationQueue) => {
  for (const { delay, action } of queue) {
    await new Promise((resolve) => setTimeout(resolve, delay))
    action()
  }
}

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
        pitch: 0, // 俯仰角度，默认0，取值范围 0 ~ 83
        rotation: 0, // 旋转角度，默认0，取值范围 0 ~ 360
        zoom: 3, // 初始化地图级别
        center: [112.17, 3.58], // 初始化地图中心点位置(曾母暗沙)
        animationEnable: true, // 是否开启动画
        mapStyle: 'amap://styles/normal', // 设置地图的显示样式
        showIndoorMap: false, // 是否显示室内地图
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
        showRoad: false,
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
      const infoWindow = new AMap.InfoWindow({
        isCustom: true, //使用自定义窗体
        offset: new AMap.Pixel(0, -30),
      })

      const count = points.length
      //自定义聚合点样式
      const _renderClusterMarker = (context: any) => {
        var factor = Math.pow(context.count / count, 1 / 18)
        var div = document.createElement('div')
        var Hue = 180 - factor * 180
        var bgColor = 'hsla(' + Hue + ',100%,40%,0.7)'
        var fontColor = 'hsla(' + Hue + ',100%,90%,1)'
        var borderColor = 'hsla(' + Hue + ',100%,40%,1)'
        var shadowColor = 'hsla(' + Hue + ',100%,90%,1)'
        div.style.backgroundColor = bgColor
        var size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20)
        div.style.width = div.style.height = size + 'px'
        div.style.border = 'solid 1px ' + borderColor
        div.style.borderRadius = size / 2 + 'px'
        div.style.boxShadow = '0 0 5px ' + shadowColor
        div.innerHTML = context.count
        div.style.lineHeight = size + 'px'
        div.style.color = fontColor
        div.style.fontSize = '14px'
        div.style.textAlign = 'center'
        context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2))
        context.marker.setContent(div)
        // 自定义点击事件
        context.marker.on('click', function (e: { lnglat: any }) {
          console.log(e)
          var curZoom = map!.getZoom()
          if (curZoom < 20) {
            curZoom += 1
          }
          map!.setZoomAndCenter(curZoom, e.lnglat, false, 1000)
        })
      }
      //自定义非聚合点样式
      const _renderMarker = (context: any) => {
        const data = context.data[0]

        //自定义点标记样式
        var content = '<div style="background-color: hsla(180, 100%, 50%, 0.3); height: 2rem; width: 2rem; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 3px;"></div>'
        var offset = new AMap.Pixel(-9, -9)
        context.marker.setContent(content)
        context.marker.setOffset(offset)

        context.marker.on('click', (e: any) => {
          const targetZoom = 18.4
          // 点击时放大地图并定位到点
          let curZoom = map!.getZoom()
          if (curZoom < targetZoom) {
            curZoom = targetZoom
          }
          map!.setZoomAndCenter(curZoom, context.marker.getPosition())
          // 添加点击事件，显示信息窗口
          // 获取经纬度
          let lng, lat
          if (data.lnglat && typeof data.lnglat.lng === 'number') {
            // 处理 AMap.LngLat 对象格式
            lng = data.lnglat.lng
            lat = data.lnglat.lat
          } else {
            // 使用事件中的经纬度
            lng = e.lnglat.lng
            lat = e.lnglat.lat
          }

          // 创建信息窗口内容
          const infoContent = `
            <div class="custom-info-window">
              <div class="info-header">
                <h3>位置信息</h3>
              </div>
              <div class="info-body">
                <p>经度: ${lng.toFixed(6)}</p>
                <p>纬度: ${lat.toFixed(6)}</p>
                ${data.url ? `<p>URL: <a href="${data.url}" target="_blank">${data.url}</a></p>` : ''}
              </div>
              <div class="info-footer">
                <button onclick="closeInfoWindow()">关闭</button>
              </div>
            </div>
          `
          if (map!.getZoom() >= targetZoom) {
            // 设置信息窗口内容并打开
            infoWindow.setContent(infoContent)
            infoWindow.open(map, e.lnglat)
          }
        })
      }

      // 关闭信息窗口的全局函数
      window.closeInfoWindow = () => {
        infoWindow.close()
      }

      const cluster = new AMap.MarkerCluster(map, points, {
        gridSize: 120, // 聚合网格像素大小
        style: {},
        renderClusterMarker: _renderClusterMarker, //上述步骤的自定义聚合点样式
        renderMarker: _renderMarker, //上述步骤的自定义非聚合点样式
      })
      map!.setDefaultCursor('grab')
      map!.addControl(toolBar)
      map!.addControl(controlBar)
      map!.addControl(scale)
      map!.addControl(mapType)
      map!.addControl(geolocation)
      map!.on('complete', () => {
        runAnimationQueue(animationQueue)
      })
    })
    .catch((e) => {
      console.log(e)
    })
})

onUnmounted(() => {
  map?.destroy()
})
</script>

<style lang="scss">
#container {
  width: 100%;
  height: 100vh;
  padding: 0;
  margin: 0;
}

/* 信息窗口样式 */
.custom-info-window {
  width: 250px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  .info-header {
    background-color: #1890ff;
    color: white;
    padding: 10px 15px;

    h3 {
      margin: 0;
      font-size: 16px;
    }
  }

  .info-body {
    padding: 15px;

    p {
      margin: 8px 0;
      font-size: 14px;
      line-height: 1.5;

      a {
        color: #1890ff;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .info-footer {
    padding: 10px 15px;
    background-color: #f5f5f5;
    text-align: right;

    button {
      background-color: #1890ff;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 6px 12px;
      cursor: pointer;
      font-size: 14px;

      &:hover {
        background-color: #40a9ff;
      }
    }
  }
}
</style>

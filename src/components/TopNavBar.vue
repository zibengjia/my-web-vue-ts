import { loginRoutes } from '../router/routes/loginRoutes';
<template>
  <div class="wrapper">
    <div class="liquidGlass-wrapper dock">
      <div class="liquidGlass-effect"></div>
      <div class="liquidGlass-tint"></div>
      <div class="liquidGlass-shine"></div>
      <div class="liquidGlass-text navbar">
        <!-- 左侧logo-->
        <div class="navbar-logo">logo</div>
        <!--左侧导航内容-->
        <div class="navbar-left">left</div>

        <!-- 右侧操作按钮 -->
        <div class="navbar-right">right</div>
      </div>
    </div>
  </div>
  <svg style="display: none">
    <filter
      id="glass-distortion"
      x="0%"
      y="0%"
      width="100%"
      height="100%"
      filterUnits="objectBoundingBox"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.01 0.01"
        numOctaves="1"
        seed="5"
        result="turbulence"
      />
      <!-- Seeds: 14, 17,  -->

      <feComponentTransfer in="turbulence" result="mapped">
        <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
        <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
        <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
      </feComponentTransfer>

      <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />

      <feSpecularLighting
        in="softMap"
        surfaceScale="5"
        specularConstant="1"
        specularExponent="100"
        lighting-color="white"
        result="specLight"
      >
        <fePointLight x="-200" y="-200" z="300" />
      </feSpecularLighting>

      <feComposite
        in="specLight"
        operator="arithmetic"
        k1="0"
        k2="1"
        k3="1"
        k4="0"
        result="litImage"
      />

      <feDisplacementMap
        in="SourceGraphic"
        in2="softMap"
        scale="150"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </svg>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
/* LIQUID GLASS STYLES */

.liquidGlass-wrapper {
  position: relative;
  display: flex;
  font-weight: 600;
  overflow: hidden;

  box-shadow:
    0 6px 6px rgba(0, 0, 0, 0.2),
    0 0 20px rgba(0, 0, 0, 0.1);

  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
}

.liquidGlass-effect {
  position: absolute;
  z-index: 0;
  inset: 0;

  backdrop-filter: blur(3px);
  filter: url(#glass-distortion);
  overflow: hidden;
}

.liquidGlass-tint {
  z-index: 1;
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.5);
}

.liquidGlass-shine {
  position: absolute;
  inset: 0;
  z-index: 2;

  overflow: hidden;

  box-shadow:
    inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5),
    inset -1px -1px 1px 1px rgba(255, 255, 255, 0.5);
}

.liquidGlass-text {
  z-index: 3;
  font-size: 2rem;
}
.navbar {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
}
.navbar-logo {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-weight: bold;
  font-size: 1.2rem;
  margin-right: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-left {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: transparent;
  border-radius: 0;
}

.wrapper {
  width: 100%;
  display: flex;
  position: fixed;
  top: 20px;
  left: 0;
  right: 0;
  padding: 0 1rem;
  z-index: 1000;
}

/* NOTE: You need to duplicate styles onto the child `div`s (`> div`) so that the glass wrapper and all the layers are affected in the same way.  */
.dock {
  width: 100%;
  height: 4rem;
  margin: 0 auto;
  max-width: 1200px;
}
.dock,
.dock > div {
  border-radius: 1rem;
}

.dock:hover {
  padding: 0.4rem;
  border-radius: 1.2rem;
}

.dock:hover > div {
  border-radius: 1.2rem;
}
</style>

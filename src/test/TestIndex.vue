<template>
  <div class="container1">
    <div class="container2">
      <div class="wrapper1">
        <div class="wrapper2">
          <MdPreview :id="id" :modelValue="text" />
          <MdCatalog :editorId="id" :scrollElement="scrollElement" />
        </div>
      </div>
    </div>
  </div>
</template>

<!-- .wrapper1 {
  position: relative;
  height: 80vh;
  overflow: hidden;
}
.wrapper2 {
  height: 100%;
  position: relative;
  overflow: auto;
} -->

<script setup lang="ts">
import { ref } from 'vue'
import { MdPreview, MdCatalog } from 'md-editor-v3'
// preview.css相比style.css少了编辑器那部分样式
import 'md-editor-v3/lib/preview.css'

const id = 'preview-only'

const scrollElement = '.wrapper2'

const text = ref(`
---
title: 默认模块
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.30"

---

# 默认模块

Base URLs:

# Authentication

# 用户认证接口

## POST 用户注册

POST /register

用户注册
注册新用户

> Body 请求参数



### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[UserRegisterPO](#schemauserregisterpo)| 否 |none|

> 返回示例

> 500 Response



### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|none|[ResultUserVO](#schemaresultuservo)|

## POST 用户登录

POST /login



---
title: 默认模块
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.30"

---

# 默认模块

Base URLs:

# Authentication

# 用户认证接口

## POST 用户注册

POST /register

用户注册
注册新用户

> Body 请求参数



### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[UserRegisterPO](#schemauserregisterpo)| 否 |none|

> 返回示例

> 500 Response



### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|none|[ResultUserVO](#schemaresultuservo)|

## POST 用户登录

POST /login

`)
</script>
<style scoped lang="scss">
.container1 {
  height: 100vh;
  width: 100vw;
  opacity: 0.9;
  overflow: hidden;
  animation: fadeIn 1s ease-in-out;
}
.container2 {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
}
.wrapper1 {
  position: relative;
  height: 80vh;
  overflow: hidden;
}
.wrapper2 {
  height: 100%;
  position: relative;
  overflow: auto;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

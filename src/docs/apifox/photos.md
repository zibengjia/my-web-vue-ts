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

# 照片接口

## GET 获取所有照片

GET /photos/all

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "",
  "data": [
    {
      "photoId": "",
      "photoUrl": "",
      "thumbnailUrl": "",
      "lat": "",
      "lng": "",
      "createDateTime": "",
      "maker": ""
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResultListPhotoVO](#schemaresultlistphotovo)|

## GET 获取照片列表（分页）

GET /photos

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 是 |页码|
|pageSize|query|integer| 是 |每页数量|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "",
  "data": [
    {
      "photoId": "",
      "photoUrl": "",
      "thumbnailUrl": "",
      "lat": "",
      "lng": "",
      "createDateTime": "",
      "maker": ""
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResultListPhotoVO](#schemaresultlistphotovo)|

## POST 添加新照片

POST /photos

> Body 请求参数

```json
{
  "photoName": "string",
  "photoUrl": "string",
  "thumbnailName": "string",
  "thumbnailUrl": "string",
  "exif": "string",
  "maker": "string",
  "lat": "string",
  "lng": "string",
  "createDateTime": "string",
  "updateDateTime": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[PhotoPO](#schemaphotopo)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "",
  "data": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResultString](#schemaresultstring)|

## GET 根据ID获取照片详情

GET /photos/{photoId}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|photoId|path|string| 是 |照片ID|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "",
  "data": {
    "photoId": "",
    "photoName": "",
    "photoUrl": "",
    "thumbnailName": "",
    "thumbnailUrl": "",
    "exif": "",
    "maker": "",
    "lat": "",
    "lng": "",
    "createDateTime": "",
    "updateDateTime": ""
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResultPhotoDTO](#schemaresultphotodto)|

## PUT 更新照片信息

PUT /photos/{photoId}

> Body 请求参数

```json
{
  "photoId": "string",
  "photoName": "string",
  "photoUrl": "string",
  "thumbnailName": "string",
  "thumbnailUrl": "string",
  "exif": "string",
  "maker": "string",
  "lat": "string",
  "lng": "string",
  "createDateTime": "string",
  "updateDateTime": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|photoId|path|string| 是 |照片ID|
|body|body|[PhotoDTO](#schemaphotodto)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "",
  "data": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResultString](#schemaresultstring)|

## DELETE 删除照片

DELETE /photos/{photoId}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|photoId|path|string| 是 |照片ID|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "",
  "data": ""
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResultString](#schemaresultstring)|

# 数据模型

<h2 id="tocS_PhotoVO">PhotoVO</h2>

<a id="schemaphotovo"></a>
<a id="schema_PhotoVO"></a>
<a id="tocSphotovo"></a>
<a id="tocsphotovo"></a>

```json
{
  "photoId": "string",
  "photoUrl": "string",
  "thumbnailUrl": "string",
  "lat": "string",
  "lng": "string",
  "createDateTime": "string",
  "maker": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|photoId|string|false|none||none|
|photoUrl|string|false|none||none|
|thumbnailUrl|string|false|none||none|
|lat|string|false|none||none|
|lng|string|false|none||none|
|createDateTime|string|false|none||none|
|maker|string|false|none||none|

<h2 id="tocS_ResultListPhotoVO">ResultListPhotoVO</h2>

<a id="schemaresultlistphotovo"></a>
<a id="schema_ResultListPhotoVO"></a>
<a id="tocSresultlistphotovo"></a>
<a id="tocsresultlistphotovo"></a>

```json
{
  "code": 0,
  "message": "string",
  "data": [
    {
      "photoId": "string",
      "photoUrl": "string",
      "thumbnailUrl": "string",
      "lat": "string",
      "lng": "string",
      "createDateTime": "string",
      "maker": "string"
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||状态码(0为成功,1为失败)|
|message|string|false|none||提示信息|
|data|[[PhotoVO](#schemaphotovo)]|false|none||json数据|

<h2 id="tocS_PhotoDTO">PhotoDTO</h2>

<a id="schemaphotodto"></a>
<a id="schema_PhotoDTO"></a>
<a id="tocSphotodto"></a>
<a id="tocsphotodto"></a>

```json
{
  "photoId": "string",
  "photoName": "string",
  "photoUrl": "string",
  "thumbnailName": "string",
  "thumbnailUrl": "string",
  "exif": "string",
  "maker": "string",
  "lat": "string",
  "lng": "string",
  "createDateTime": "string",
  "updateDateTime": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|photoId|string|false|none||数据库映射字段|
|photoName|string|false|none||图片名称|
|photoUrl|string|false|none||图片地址|
|thumbnailName|string|false|none||缩略图名称|
|thumbnailUrl|string|false|none||缩略图地址|
|exif|string|false|none||照片EXIF信息|
|maker|string|false|none||照片制造商信息|
|lat|string|false|none||照片拍摄地点纬度|
|lng|string|false|none||照片拍摄地点经度|
|createDateTime|string|false|none||记录拍摄时间|
|updateDateTime|string|false|none||记录上传时间|

<h2 id="tocS_ResultPhotoDTO">ResultPhotoDTO</h2>

<a id="schemaresultphotodto"></a>
<a id="schema_ResultPhotoDTO"></a>
<a id="tocSresultphotodto"></a>
<a id="tocsresultphotodto"></a>

```json
{
  "code": 0,
  "message": "string",
  "data": {
    "photoId": "string",
    "photoName": "string",
    "photoUrl": "string",
    "thumbnailName": "string",
    "thumbnailUrl": "string",
    "exif": "string",
    "maker": "string",
    "lat": "string",
    "lng": "string",
    "createDateTime": "string",
    "updateDateTime": "string"
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||状态码(0为成功,1为失败)|
|message|string|false|none||提示信息|
|data|[PhotoDTO](#schemaphotodto)|false|none||json数据|

<h2 id="tocS_ResultString">ResultString</h2>

<a id="schemaresultstring"></a>
<a id="schema_ResultString"></a>
<a id="tocSresultstring"></a>
<a id="tocsresultstring"></a>

```json
{
  "code": 0,
  "message": "string",
  "data": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||状态码(0为成功,1为失败)|
|message|string|false|none||提示信息|
|data|string|false|none||json数据|

<h2 id="tocS_PhotoPO">PhotoPO</h2>

<a id="schemaphotopo"></a>
<a id="schema_PhotoPO"></a>
<a id="tocSphotopo"></a>
<a id="tocsphotopo"></a>

```json
{
  "photoName": "string",
  "photoUrl": "string",
  "thumbnailName": "string",
  "thumbnailUrl": "string",
  "exif": "string",
  "maker": "string",
  "lat": "string",
  "lng": "string",
  "createDateTime": "string",
  "updateDateTime": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|photoName|string|false|none||none|
|photoUrl|string|false|none||none|
|thumbnailName|string|false|none||none|
|thumbnailUrl|string|false|none||none|
|exif|string|false|none||none|
|maker|string|false|none||none|
|lat|string|false|none||none|
|lng|string|false|none||none|
|createDateTime|string|false|none||none|
|updateDateTime|string|false|none||none|


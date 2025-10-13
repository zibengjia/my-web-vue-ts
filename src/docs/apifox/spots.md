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

# 景点接口

## GET 获取所有景点

GET /spots/all

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "",
  "data": [
    {
      "spotId": 0,
      "spotName": "",
      "spotDesc": ""
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResultListSpotDTO](#schemaresultlistspotdto)|

## GET 获取景点列表（分页）

GET /spots

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
      "spotId": 0,
      "spotName": "",
      "spotDesc": ""
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResultListSpotDTO](#schemaresultlistspotdto)|

## POST 添加景点

POST /spots

> Body 请求参数

```json
{
  "spotName": "string",
  "spotDesc": "string",
  "spotPic": "string",
  "travelTime": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[SpotPO](#schemaspotpo)| 否 |none|

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

## GET 根据ID获取景点详情

GET /spots/{spotId}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|spotId|path|integer| 是 |景点ID|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "",
  "data": {
    "spotId": 0,
    "spotName": "",
    "spotDesc": ""
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResultSpotDTO](#schemaresultspotdto)|

## PUT 更新景点信息

PUT /spots/{spotId}

> Body 请求参数

```json
{
  "spotName": "string",
  "spotDesc": "string",
  "spotPic": "string",
  "travelTime": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|spotId|path|integer| 是 |景点ID|
|body|body|[SpotPO](#schemaspotpo)| 否 |none|

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

## DELETE 删除景点

DELETE /spots/{spotId}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|spotId|path|integer| 是 |景点ID|

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

<h2 id="tocS_SpotDTO">SpotDTO</h2>

<a id="schemaspotdto"></a>
<a id="schema_SpotDTO"></a>
<a id="tocSspotdto"></a>
<a id="tocsspotdto"></a>

```json
{
  "spotId": 0,
  "spotName": "string",
  "spotDesc": "string",
  "spotPic": "string",
  "travelTime": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|spotId|integer(int64)|false|none||景点ID|
|spotName|string|false|none||景点名称|
|spotDesc|string|false|none||景点描述|
|spotPic|string|false|none||景点图片|
|travelTime|string|false|none||旅游时间|

<h2 id="tocS_ResultListSpotDTO">ResultListSpotDTO</h2>

<a id="schemaresultlistspotdto"></a>
<a id="schema_ResultListSpotDTO"></a>
<a id="tocSresultlistspotdto"></a>
<a id="tocsresultlistspotdto"></a>

```json
{
  "code": 0,
  "message": "string",
  "data": [
    {
      "spotId": 0,
      "spotName": "string",
      "spotDesc": "string",
      "spotPic": "string",
      "travelTime": "string"
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||状态码(0为成功,1为失败)|
|message|string|false|none||提示信息|
|data|[[SpotDTO](#schemaspotdto)]|false|none||json数据|

<h2 id="tocS_ResultSpotDTO">ResultSpotDTO</h2>

<a id="schemaresultspotdto"></a>
<a id="schema_ResultSpotDTO"></a>
<a id="tocSresultspotdto"></a>
<a id="tocsresultspotdto"></a>

```json
{
  "code": 0,
  "message": "string",
  "data": {
    "spotId": 0,
    "spotName": "string",
    "spotDesc": "string",
    "spotPic": "string",
    "travelTime": "string"
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||状态码(0为成功,1为失败)|
|message|string|false|none||提示信息|
|data|[SpotDTO](#schemaspotdto)|false|none||json数据|

<h2 id="tocS_SpotPO">SpotPO</h2>

<a id="schemaspotpo"></a>
<a id="schema_SpotPO"></a>
<a id="tocSspotpo"></a>
<a id="tocsspotpo"></a>

```json
{
  "spotName": "string",
  "spotDesc": "string",
  "spotPic": "string",
  "travelTime": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|spotName|string|false|none||景点名称|
|spotDesc|string|false|none||景点描述|
|spotPic|string|false|none||景点图片(缩略图)|
|travelTime|string|false|none||旅游时间|


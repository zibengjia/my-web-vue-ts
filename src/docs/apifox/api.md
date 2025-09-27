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

```json
{
  "username": "string",
  "password": "string",
  "email": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[UserRegisterPO](#schemauserregisterpo)| 否 |none|

> 返回示例

> 500 Response

```json
{
  "code": 0,
  "message": "",
  "data": {
    "username": "",
    "password": "",
    "token": ""
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|none|[ResultUserVO](#schemaresultuservo)|

## POST 用户登录

POST /login

用户登录
验证用户登录信息

> Body 请求参数

```json
{
  "username": "newuser",
  "password": "password123"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|[UserPO](#schemauserpo)| 否 |none|

> 返回示例

> 500 Response

```json
{
  "code": 0,
  "message": "",
  "data": {
    "username": "",
    "password": "",
    "token": ""
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|none|[ResultUserVO](#schemaresultuservo)|

# 文章接口

## GET articlesPage

GET /articles

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 是 |none|
|pageSize|query|integer| 是 |none|
|tag|query|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "",
  "data": [
    {
      "articleId": 0,
      "title": "",
      "tags": [
        ""
      ],
      "wordCount": 0,
      "createTime": "",
      "contentPre": ""
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResultListArticlePageVO](#schemaresultlistarticlepagevo)|

## GET articleDetail

GET /articles/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|integer| 是 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "",
  "data": {
    "articleId": 0,
    "title": "",
    "tags": [
      ""
    ],
    "wordCount": 0,
    "createTime": "",
    "contentMd": ""
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[ResultArticleDetailVO](#schemaresultarticledetailvo)|

# 数据模型

<h2 id="tocS_UserVO">UserVO</h2>

<a id="schemauservo"></a>
<a id="schema_UserVO"></a>
<a id="tocSuservo"></a>
<a id="tocsuservo"></a>

```json
{
  "username": "string",
  "password": "string",
  "token": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|username|string|false|none||none|
|password|string|false|none||none|
|token|string|false|none||none|

<h2 id="tocS_ResultUserVO">ResultUserVO</h2>

<a id="schemaresultuservo"></a>
<a id="schema_ResultUserVO"></a>
<a id="tocSresultuservo"></a>
<a id="tocsresultuservo"></a>

```json
{
  "code": 0,
  "message": "string",
  "data": {
    "username": "string",
    "password": "string",
    "token": "string"
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||状态码(0为成功,1为失败)|
|message|string|false|none||提示信息|
|data|[UserVO](#schemauservo)|false|none||json数据|

<h2 id="tocS_UserPO">UserPO</h2>

<a id="schemauserpo"></a>
<a id="schema_UserPO"></a>
<a id="tocSuserpo"></a>
<a id="tocsuserpo"></a>

```json
{
  "username": "string",
  "password": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|username|string|false|none||none|
|password|string|false|none||none|

<h2 id="tocS_UserRegisterPO">UserRegisterPO</h2>

<a id="schemauserregisterpo"></a>
<a id="schema_UserRegisterPO"></a>
<a id="tocSuserregisterpo"></a>
<a id="tocsuserregisterpo"></a>

```json
{
  "username": "string",
  "password": "string",
  "email": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|username|string|false|none||none|
|password|string|false|none||none|
|email|string|false|none||none|

<h2 id="tocS_ArticlePageVO">ArticlePageVO</h2>

<a id="schemaarticlepagevo"></a>
<a id="schema_ArticlePageVO"></a>
<a id="tocSarticlepagevo"></a>
<a id="tocsarticlepagevo"></a>

```json
{
  "articleId": 0,
  "title": "string",
  "tags": [
    "string"
  ],
  "wordCount": 0,
  "createTime": "string",
  "contentPre": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|articleId|integer(int64)|false|none||none|
|title|string|false|none||none|
|tags|[string]|false|none||none|
|wordCount|integer|false|none||none|
|createTime|string|false|none||none|
|contentPre|string|false|none||none|

<h2 id="tocS_ResultListArticlePageVO">ResultListArticlePageVO</h2>

<a id="schemaresultlistarticlepagevo"></a>
<a id="schema_ResultListArticlePageVO"></a>
<a id="tocSresultlistarticlepagevo"></a>
<a id="tocsresultlistarticlepagevo"></a>

```json
{
  "code": 0,
  "message": "string",
  "data": [
    {
      "articleId": 0,
      "title": "string",
      "tags": [
        "string"
      ],
      "wordCount": 0,
      "createTime": "string",
      "contentPre": "string"
    }
  ]
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||状态码(0为成功,1为失败)|
|message|string|false|none||提示信息|
|data|[[ArticlePageVO](#schemaarticlepagevo)]|false|none||json数据|

<h2 id="tocS_ArticleDetailVO">ArticleDetailVO</h2>

<a id="schemaarticledetailvo"></a>
<a id="schema_ArticleDetailVO"></a>
<a id="tocSarticledetailvo"></a>
<a id="tocsarticledetailvo"></a>

```json
{
  "articleId": 0,
  "title": "string",
  "tags": [
    "string"
  ],
  "wordCount": 0,
  "createTime": "string",
  "contentMd": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|articleId|integer(int64)|false|none||none|
|title|string|false|none||none|
|tags|[string]|false|none||none|
|wordCount|integer|false|none||none|
|createTime|string|false|none||none|
|contentMd|string|false|none||none|

<h2 id="tocS_ResultArticleDetailVO">ResultArticleDetailVO</h2>

<a id="schemaresultarticledetailvo"></a>
<a id="schema_ResultArticleDetailVO"></a>
<a id="tocSresultarticledetailvo"></a>
<a id="tocsresultarticledetailvo"></a>

```json
{
  "code": 0,
  "message": "string",
  "data": {
    "articleId": 0,
    "title": "string",
    "tags": [
      "string"
    ],
    "wordCount": 0,
    "createTime": "string",
    "contentMd": "string"
  }
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|code|integer|false|none||状态码(0为成功,1为失败)|
|message|string|false|none||提示信息|
|data|[ArticleDetailVO](#schemaarticledetailvo)|false|none||json数据|


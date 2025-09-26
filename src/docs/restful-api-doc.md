# RESTful API 对接文档 - 获取文章

## 1. 概述

本文档描述了用于获取文章信息的 RESTful API 接口规范。

## 2. 基础 URL

基础URL读取环境配置：

开发环境:

```
/api
```

生产环境:

```
http://117.72.187.152:80
```

## 3. 认证方式

仅 admin 下的接口需要通过 Bearer Token 进行认证：

```
Authorization: Bearer <your_token>
```

## 4. 响应格式

所有响应都遵循以下格式：

```json
{
  "code": 0,
  "message": "success",
  "data": {}
}
```

其中 code 为 0 表示成功，1 表示失败。

## 5. 错误响应格式

所有错误响应都遵循以下格式：

```json
{
  "code": 1,
  "message": "文章未找到"
}
```

## 5. 获取文章列表

### 接口地址

```
GET /articles
```

### 请求参数

| 参数名   | 类型    | 必填 | 描述                          |
| -------- | ------- | ---- | ----------------------------- |
| page     | integer | 否   | 页码，默认为 1                |
| size     | integer | 否   | 每页数量，默认为 10，最大 100 |
| tag      | string  | 否   | 按标签筛选                    |
| category | string  | 否   | 按分类筛选                    |

### 请求示例

```
GET /articles?page=1&size=10&tag=前端
```

### 响应示例

```json
{
  "code": 0,
  "data": {
    "items": [
      {
        "id": 1,
        "title": "给你的博客内容添加密码保护",
        "tags": ["前端", "Vue", "JavaScript"],
        "date": "2025-09-22",
        "wordCount": 1400,
        "contentOverview": "在编写博客文章时，我们可能会遇到一些敏感内容，比如个人隐私、商业机密等，这些内容我们希望只有特定读者才能访问。",
        "category": "技术分享"
      }
    ],
    "pagination": {
      "page": 1,
      "size": 10,
      "total": 100,
      "totalPages": 10
    }
  },
  "message": "success"
}
```

## 6. 获取单篇文章

### 接口地址

```
GET /articles/{id}
```

### 请求参数

| 参数名 | 类型    | 必填 | 描述   |
| ------ | ------- | ---- | ------ |
| id     | integer | 是   | 文章ID |

### 请求示例

```
GET /articles/1
```

### 响应示例

```json
{
  "code": 0,
  "data": {
    "id": 1,
    "title": "给你的博客内容添加密码保护",
    "tags": ["前端", "Vue", "JavaScript"],
    "date": "2025-09-22",
    "wordCount": 1400,
    "content": "# 文章主标题\n\n## 写在前面\n\n在此处简要介绍文章的**背景**、写作动机或核心观点，吸引读者继续阅读。\n\n- **相关背景**：[可选，添加相关文章或资源链接]()\n- **预计阅读时间**：X分钟\n\n---\n\n## 正文内容\n\n### 一、背景与问题\n\n阐述相关技术背景、当前遇到的痛点或需要解决的核心问题。\n\n### 二、核心原理或方案\n\n详细展开您要讲解的技术原理、解决方案或实践经验。\n这是加粗的重点语句，这是*斜体*的术语。\n\n#### 关键步骤或子要点\n\n- **要点一**：详细说明。\n- **要点二**：详细说明。\n  - 嵌套子项：使用Tab键或四个空格进行缩进。\n- **要点三**：详细说明。",
    "category": "技术分享"
  },
  "message": "success"
}
```

## 7. 搜索文章

### 接口地址

```
GET /articles/search
```

### 请求参数

| 参数名  | 类型    | 必填 | 描述                |
| ------- | ------- | ---- | ------------------- |
| keyword | string  | 是   | 搜索关键词          |
| page    | integer | 否   | 页码，默认为 1      |
| size    | integer | 否   | 每页数量，默认为 10 |

### 请求示例

```
GET /articles/search?keyword=博客&page=1&size=10
```

### 响应示例

```json
{
  "code": 0,
  "data": {
    "items": [
      {
        "id": 1,
        "title": "给你的博客内容添加密码保护",
        "tags": ["前端", "Vue", "JavaScript"],
        "date": "2025-09-22",
        "wordCount": 1400,
        "contentOverview": "在编写博客文章时，我们可能会遇到一些敏感内容，比如个人隐私、商业机密等，这些内容我们希望只有特定读者才能访问。",
        "category": "技术分享"
      }
    ],
    "pagination": {
      "page": 1,
      "size": 10,
      "total": 1,
      "totalPages": 1
    }
  },
  "message": "success"
}
```

## 8. 响应状态码

| 状态码 | 描述                           |
| ------ | ------------------------------ |
| 200    | 请求成功                       |
| 400    | 请求参数错误                   |
| 401    | 未认证 (仅适用于 admin 接口)   |
| 403    | 权限不足 (仅适用于 admin 接口) |
| 404    | 资源未找到                     |
| 500    | 服务器内部错误                 |

## 9. 数据模型

### Article 模型

| 字段            | 类型    | 描述                        |
| --------------- | ------- | --------------------------- |
| id              | integer | 文章唯一标识                |
| title           | string  | 文章标题                    |
| tags            | array   | 文章标签列表                |
| date            | string  | 发布日期 (YYYY-MM-DD)       |
| wordCount       | integer | 文章字数                    |
| contentOverview | string  | 文章概览                    |
| content         | string  | 文章完整内容 (Markdown格式) |
| category        | string  | 文章分类                    |

## 10. 示例代码

### JavaScript (Fetch API)

```javascript
// 获取文章列表
async function getArticles(page = 1, size = 10) {
  const baseUrl = import.meta.env.VITE_API_URL || ''
  const response = await fetch(`${baseUrl}/articles?page=${page}&size=${size}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.json()
}

// 获取单篇文章
async function getArticle(id) {
  const baseUrl = import.meta.env.VITE_API_URL || ''
  const response = await fetch(`${baseUrl}/articles/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.json()
}

// 获取需要认证的admin接口示例
async function adminOperation() {
  const baseUrl = import.meta.env.VITE_API_URL || ''
  const response = await fetch(`${baseUrl}/admin/articles`, {
    headers: {
      Authorization: 'Bearer your_token_here',
      'Content-Type': 'application/json',
    },
  })
  return response.json()
}
```

### Python (requests)

```python
import requests

BASE_URL = "https://api.example.com/v1"
HEADERS = {
    "Authorization": "Bearer your_token_here",
    "Content-Type": "application/json"
}

# 获取文章列表
def get_articles(page=1, size=10):
    response = requests.get(
        f"{BASE_URL}/articles",
        params={"page": page, "size": size},
        headers=HEADERS
    )
    return response.json()

# 获取单篇文章
def get_article(article_id):
    response = requests.get(
        f"{BASE_URL}/articles/{article_id}",
        headers=HEADERS
    )
    return response.json()
```

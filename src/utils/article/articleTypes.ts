// 文章分页列表项类型
export interface ArticlePageItem {
  contentMd: string | undefined
  articleId: number
  title: string
  tags: string[]
  wordCount: number
  createTime: string
  contentPre: string
}

// 文章详情类型
export interface ArticleDetail {
  articleId: number
  title: string
  tags: string[]
  wordCount: number
  createTime: string
  contentMd: string
}

// API响应结果类型
export interface ApiResult<T> {
  code: number
  message: string
  data: T
}

// 文章分页列表响应类型
export type ArticlePageResult = ApiResult<ArticlePageItem[]>

// 文章详情响应类型
export type ArticleDetailResult = ApiResult<ArticleDetail>

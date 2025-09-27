import request from '@/utils/request/request'
import type { ArticlePageResult, ArticleDetailResult } from './articleTypes'

/**
 * 获取文章分页列表
 * @param page 页码
 * @param pageSize 每页数量
 * @param tag 标签筛选
 * @returns 文章分页列表
 */
export const getArticles = (page: number, pageSize: number, tag?: string) => {
  return request.get<ArticlePageResult>('/articles', {
    params: {
      page,
      pageSize,
      tag,
    },
  })
}

/**
 * 获取文章详情
 * @param id 文章ID
 * @returns 文章详情
 */
export const getArticleDetail = (id: number) => {
  return request.get<ArticleDetailResult>(`/articles/${id}`)
}
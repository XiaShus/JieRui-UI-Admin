import request from '@/utils/request'

// 创建大屏分组
export function createDesignGroup(data) {
  return request({
    url: '/visual/design-group/create',
    method: 'post',
    data: data
  })
}

// 更新大屏分组
export function updateDesignGroup(data) {
  return request({
    url: '/visual/design-group/update',
    method: 'put',
    data: data
  })
}

// 删除大屏分组
export function deleteDesignGroup(id) {
  return request({
    url: '/visual/design-group/delete?id=' + id,
    method: 'delete'
  })
}

// 获得大屏分组
export function getDesignGroup(id) {
  return request({
    url: '/visual/design-group/get?id=' + id,
    method: 'get'
  })
}

// 获得大屏分组分页
export function getDesignGroupPage(query) {
  return request({
    url: '/visual/design-group/page',
    method: 'get',
    params: query
  })
}

// 导出大屏分组 Excel
export function exportDesignGroupExcel(query) {
  return request({
    url: '/visual/design-group/export-excel',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

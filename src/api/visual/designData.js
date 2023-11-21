import request from '@/utils/request'

// 创建大屏数据
export function createDesignData(data) {
  return request({
    url: '/visual/design-data/create',
    method: 'post',
    data: data
  })
}

// 更新大屏数据
export function updateDesignData(data) {
  return request({
    url: '/visual/design-data/update',
    method: 'put',
    data: data
  })
}

// 删除大屏数据
export function deleteDesignData(id) {
  return request({
    url: '/visual/design-data/delete?id=' + id,
    method: 'delete'
  })
}

// 获得大屏数据
export function getDesignData(id) {
  return request({
    url: '/visual/design-data/get?id=' + id,
    method: 'get'
  })
}

// 获得大屏数据分页
export function getDesignDataPage(query) {
  return request({
    url: '/visual/design-data/page',
    method: 'get',
    params: query
  })
}

// 导出大屏数据 Excel
export function exportDesignDataExcel(query) {
  return request({
    url: '/visual/design-data/export-excel',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

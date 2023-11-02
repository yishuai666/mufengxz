import request from '@/utils/request.js'

// api管理
    // home组件 左侧表格数据获取
export function getTableData(params) {
    return request({
        url: '/home/getTableData',
        method: 'get',
        data: params,
        // mock: true
    })
}
export function getCountData() {
    return request({
        url: '/home/getCountData',
        method: 'get',
        // mock: true
    })
}
export function getChartData() {
    return request({
        url: '/home/getChartData',
        method: 'get',
        // mock: true
    })
}
export function getUserData(params) {
    return request({
        url: '/user/getUser',
        method: 'get',
        // 这个mock如果是true的话 用的就是线上fastmock的数据
        // mock: false,
        data: params
        // data:{total: 0,page: 1,}
    })
}
export function addUser(params) {
    return request({
        url: '/user/add',
        method: 'post',
        // 这个mock如果是true的话 用的就是线上fastmock的数据
        // mock: false,
        data: params
        // data:{total: 0,page: 1,}
    })
}
export function editUser(params) {
    return request({
        url: '/user/edit',
        method: 'post',
        // 这个mock如果是true的话 用的就是线上fastmock的数据
        // mock: false,
        data: params
    })
}
export function deleteUser(params) {
    return request({
        url: '/user/delete',
        method: 'get',
        // 这个mock如果是true的话 用的就是线上fastmock的数据
        // mock: false,
        data: params
    })
}
    // 根据用户的用户名不同 返回不一样的菜单列表
export function getMenu(params) {
    return request({
        url: '/permission/getMenu',
        method: 'post',
        // 这个mock如果是true的话 用的就是线上fastmock的数据
        // mock: false,
        data: params
    })
}
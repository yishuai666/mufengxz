import request from '@/utils/request.js'

export function login(username, password) {
    return request({
        url: '/admin/acl/login',
        method: 'post',
        data: {
            username,
            password
        }
    })
}
// 获取用户信息
export function getInfo(token) {
    return request({
        url: '/admin/acl/index/info',
        method: 'get',
        params: { token }
    })

}
// 获取菜单权限数据
export function getMenus() {
    return request({
        url: '/admin/acl/index/menu',
        method: 'get'
    })
}
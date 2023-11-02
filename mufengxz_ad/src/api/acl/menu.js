import request from '@/utils/request.js'

const api_name = '/admin/acl/permission'
// api管理
export default {
    //获取菜单列表
    getPageList(page, limit, searchObj) {
        return request({
            url: `${api_name}/${page}/${limit}`,
            method: 'get',
            params: searchObj // url查询字符串或表单键值对
        })
    },
    getNestedTreeList() {
        return request({
            url: `${api_name}`,
            method: 'get'
        })
    },
    removeById(id) {
        return request({
            url: `${api_name}/remove/${id}`,
            method: "delete"
        })
    },
    save(menu) {
        return request({
            url: `${api_name}/save`,
            method: "post",
            data: menu
        })
    },
    update(menu) {
        return request({
            url: `${api_name}/update`,
            method: "put",
            data: menu
        })
    },
    toAssign(roleId) {
        return request({
            url: `${api_name}/toAssign/${roleId}`,
            method: 'get'
        })
    },
    doAssign(roleId, permissionId) {
        return request({
            url: `${api_name}/doAssign`,
            method: "post",
            params: {roleId, permissionId}
        })
    }
}
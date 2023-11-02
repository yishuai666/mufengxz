import request from '@/utils/request.js'

const api_name = '/admin/acl/role'
// api管理
export default {
    //获取角色列表
    getPageList(page, limit, searchObj) {
        return request({
            url: `${api_name}/${page}/${limit}`,
            method: 'get',
            params: searchObj // url查询字符串或表单键值对
        })
    },
    //根据id查询角色
    getById(id) {
        return request({
            url: `${api_name}/get/${id}`,
            method: 'get'
        })
    },
    //新增角色
    save(role) {
        return request({
            url: `${api_name}/save`,
            method: 'post',
            data: role
        })
    },
    //修改角色
    updateById(role) {
        return request({
            url: `${api_name}/update`,
            method: 'put',
            data: role
        })
    },
    //授权
    getAssign(roleId){
        return request({
            url: `${api_name}/toAssign/${roleId}`,
            method: 'get'
        })
    },
    //删除角色
    removeById(id){
        return request({
            url: `${api_name}/remove/${id}`,
            method: 'delete'
        })
    },
    //批量删除角色
    removeRows(idList){
        return request({
            url: `${api_name}/batchRemove`,
            method: 'delete',
            data:idList
        })
    }

}
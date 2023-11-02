import request from '@/utils/request.js'

const api_name = '/admin/acl/user'
// api管理
export default {
    //获取用户列表
    getPageList(page, limit, searchObj) {
        return request({
            url: `${api_name}/${page}/${limit}`,
            method: 'get',
            params: searchObj // url查询字符串或表单键值对
        })
    },
    //用户登录
    login(username, password) {
        return request({
            url: '/admin/acl/login',
            method: 'post',
            data: {
                username,
                password
            }
        })
    },
    //保存用户
    save(user) {
        return request({
            url: `${api_name}/save`,
            method: 'post',
            data: user
        })
    },
    //修改用户
    updateById(user) {
        return request({
            url: `${api_name}/update`,
            method: 'put',
            data: user
        })
    },
    //根据id删除用户
    removeById(id){
        return request({
            url: `${api_name}/remove/${id}`,
            method: 'delete'
        })
    },
    //批量删除用户
    removeRows(idList){
        return request({
            url: `${api_name}/batchRemove`,
            method: 'delete',
            data:idList
        })
    }

}
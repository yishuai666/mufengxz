import { defineStore } from 'pinia';
import { login as apiLogin, getInfo as apiGetInfo, getMenus as apiGetMenus } from "@/api/user/login.js"
import router from '@/router'
// import { getToken, setToken, removeToken } from '@/utils/auth'


export const useUserStore = defineStore('user', {
    state:  () => ({

        token: "",
        avatar: "",
        name: "",
        buttons: [],
        roles: [],
        menus: [],
        menu: [],
        hasRoute: false
    }),
    getters: {

    },
    actions: {
        //登录
        login(loginData) {
            const username = loginData.username.trim()
            return new Promise((resolve, reject) => {
                apiLogin(username, loginData.password).then(response => {
                    const data = response.data
                    this.setToken(data.token)
                    this.getInfo(this.token, reject)
                    this.getMenus()
                    console.log("menus： ", this.menus)
                    console.log("menu： ", this.menu)
                    /*if (this.menu.length > 0) {
                        this.menu.forEach((item) => {
                            // console.log('item :>> ', item)
                            router.addRoute('main', item)
                        })
                    }*/
                    resolve()
                },
                ).catch(error => {
                    reject(error)
                })

            })
        },


        // 获取用户信息
        getInfo(token, reject) {
            apiGetInfo(this.token).then(response => {
                // debugger
                // console.log(response)
                const data = response.data
                // setToken(data.token)
                this.avatar = data.avatar
                this.name = data.name
                const buttonAuthList = []
                data.permissionValueList.forEach(button => {
                    buttonAuthList.push(button)
                })
                this.buttons = buttonAuthList
                if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                    this.roles = data.roles
                } else {
                    reject('getInfo: roles must be a non-null array !')
                }
                // this.roles = data.roles
            })
        },
        //获取用户菜单
        getMenus() {
            apiGetMenus().then(response => {
                // debugger
                this.menus = response.data.permissionList
                this.menu = response.data.menuList
            })
        },
        changeRouteStatus(flag) {
            this.hasRoute = flag
        },

        setToken(token) {
            this.token = token
            sessionStorage.setItem("token", token)
        },

        logout() {
            sessionStorage.removeItem('user')
            router.push('/login')
        }


    },
    // 开启数据持久化
    persist: true

})

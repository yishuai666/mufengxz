import { defineStore } from 'pinia';
import router from "@/router";

export const useSysStore = defineStore('sys', {
    state:  () => ({
        isCollapse: true,
        currentMenu: null,
        tabsList: [
            {
                path: '/home',
                name: '首页',
                icon: 'home'
            }
        ],

    }),


    getters: {

    },
    actions: {
        updateIsCollapse() {
            this.isCollapse = !this.isCollapse
        },
        selectMenu(val) {
            // 判断
            // val.name == 'home' ? (state.currentMenu = null) : (state.currentMenu = val)
            if (val.name == '首页') {
                this.currentMenu = null
            } else {
                this.currentMenu = val
                let result = this.tabsList.findIndex(item => item.name === val.name)
                result == -1 ? this.tabsList.push(val) : ''
            }
        },
        closeTab(val) {
            let res = this.tabsList.findIndex(item => item.name === val.name)
            this.tabsList.splice(res, 1)

        },


    },
    // 开启数据持久化
    persist: true

})
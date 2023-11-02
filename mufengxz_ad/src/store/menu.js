import { defineStore } from 'pinia';


export const useMenuStore = defineStore('menu', {
    state:  () => {
        return {
            isCollapse : false
        }

    },
    getters: {

    },
    actions: {
        changeCollapse() {
            this.isCollapse = !this.isCollapse
        },
    },
    // 开启数据持久化
    persist: true

})

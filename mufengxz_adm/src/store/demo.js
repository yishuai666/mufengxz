import { defineStore } from 'pinia';


export const useDemoStore = defineStore('demo', {
    state:  () => ({
        demo: ''
    }),
    getters: {

    },
    actions: {
        demo(demo) {
            this.demo = demo
        },
    },
    // 开启数据持久化
    persist: true

})

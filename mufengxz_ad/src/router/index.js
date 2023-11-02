import { createRouter, createWebHistory } from 'vue-router'

import Layout from '@/views/layout/layout.vue'



const routes = [
    {
        path: '/',
        name: '主页',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: '首页',
                component: () => import('@/views/home/home.vue')
            },
            {
                path: '/acl',
                name: '权限管理',
                component: () => import('@/views/acl/index.vue'),
                children: [
                    {
                        path: 'user/list',
                        name: '用户管理',
                        component: () => import('@/views/acl/user/list.vue'),

                    },
                    {
                        path: 'role/list',
                        name: '角色管理',
                        component: () => import('@/views/acl/role/list.vue'),
                    },
                    {
                        path: 'menu/list',
                        name: '菜单管理',
                        component: () => import('@/views/acl/menu/list.vue'),
                    }
                ]
            },
        ]
    },
    {
        path: '/login',
        name: '登录',
        component: () => import('@/views/login/login.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})



export default router
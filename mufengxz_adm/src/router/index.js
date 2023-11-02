import { createRouter, createWebHistory } from 'vue-router'
import { useSysStore } from '@/store/sys.js'
import { useUserStore } from '@/store/user.js'
import { getMenus } from "@/api/user/login";
import Layout from '@/layout/layout.vue'



const routes = [
    {
        path: '/',
        name: '主页',
        component: () => import('@/layout/layout.vue'),
        redirect: '/home',
        children:[
            {
                path: '/home',
                name: '首页',
                component: () => import('@/views/home/home.vue')
            }
            ,
            {
                path: '/user',
                name: '用户管理',
                component: () => import('@/views/user/user.vue')
            },
            {
                path: '/other',
                name: '其他',
                children: [
                    {
                        path: '/page1',
                        name: '页面1',
                        component: () => import('@/views/404.vue')
                    },
                    {
                        path: '/page2',
                        name: '页面2',
                        component: () => import('@/views/404.vue')
                    },
                ]
            },
        ],
    },
    {
        path: '/test',
        name: '测试',
        component: () => import('@/layout/layout.vue'),
        redirect: '/test1',
        children: [
            {
                path: '/test1',
                name: '测试',
                component: () => import('@/views/test/test1.vue'),
            }
        ],
    },
    {
        path: '/login',
        name: 'login',
        label: '登录',
        component: () => import('@/views/login/login.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const whiteList = ['/login', '/404']

router.beforeEach((to, from, next) => {
    // const sysStore = useSysStore()
    const userStore = useUserStore()
    let token = window.sessionStorage.getItem("token")

    // 注意：在beforeEach中调用pinia存储的菜单状态是为了避免` Did you forget to install pinia?`这个bug

    // console.log('hasRoute', useMean.hasRoute)
    // console.log(to.path)
    if (whiteList.includes(to.path)) {
        // console.log("白名单")
        return next()
    }
    if (!token) {
        // console.log("未登录")
        return next({ path: "/login", query: { redirect: to.path } })

    }
    if (to.path === '/' || to.path === '') {
        return next({ path: '/' })
    }
    // if (userStore.menus && userStore.menus.length > 0) {
    //     loadMenu(to, next)
    //     return next()
    // }
    return next()
    // addRouter(to, next)
})

async function addRouter(to, next) {
    const userStore = useUserStore()
    let res = await getMenus()
    // .then(response => {
    // userStore.menus = response.data.permissionList})
    userStore.menus = res.data.permissionList
    const list = res.data.permissionList
    console.log("list：",list)
    // 动态添加路由
    list.forEach(menuItem => {
        const route = {
            path: menuItem.path,
            name: menuItem.name,
            component: () => import(`./views/${menuItem.component}.vue`),
        };

        // 动态添加子路由
        if (menuItem.children && menuItem.children.length > 0) {
            route.children = menuItem.children.map(child => ({
                path: child.path,
                name: child.name,
                component: () => import(`./views/${child.component}.vue`),
            }));
            // console.log("cRoute:", route)
        }
        // console.log("fRoute:", route)
        // 使用 addRoute 方法添加路由
        router.addRoute(route);
    });
    next();
    // next ({...to, replace: true})

}

export default router
<template>
  <el-aside  :width="sysStore.isCollapse ? '180px' : '64px'">
    <el-menu
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        :collapse="!sysStore.isCollapse"
        :collapse-transition="false"
        router
    >
      <h3 v-show="sysStore.isCollapse">后台管理</h3>
      <h3 v-show="!sysStore.isCollapse">后台</h3>
      <el-menu-item
          :index="item.path"
          v-for="(item, index) in noChildren()"
          :key="index"
          @click="clickMenu(item)"
      >
        <component class="icons" :is="item.icon"></component>
        <span>{{ item.name }}</span>
      </el-menu-item>
      <el-sub-menu
          :index="item.path"
          v-for="item in hasChildren()"
          :key="item.path"
      >
        <template #title>
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
              :index="subItem.path"
              v-for="subItem in item.children"
              :key="subItem.path"
              @click="clickMenu(subItem)"
          >
            <component class="icons" :is="subItem.icon"></component>
            <span>{{ subItem.name }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup>
  import { useUserStore } from "@/store/user.js";
  import { useSysStore } from "@/store/sys.js";
  import { useRouter } from "vue-router";

  const userStore = useUserStore()
  const sysStore = useSysStore()
  const router = useRouter()
  const list = [
    {
      path: "/home",
      name: "首页",
      icon: "Home",
    },
    {
      path: "/user",
      name: "用户管理",
      icon: "user",
    },
    {
      name: "其他",
      icon: "location",
      path: "/other",
      children: [
        {
          path: "page1",
          name: "页面1",
          icon: "setting",
        },
        {
          path: "page2",
          name: "页面2",
          icon: "setting",
        },
      ],
    },
    {
      name: "测试",
      icon: "test",
      path: "/test",
      children: [
        {
          path: "test1",
          name: "测试页面1",
          icon: "test",
        },
      ]
    }
  ];
  const asyncList = userStore.menu;
  // console.log("asyncList：",asyncList)
  // console.log("asyncList:",asyncList)
  const noChildren = () => {
    return list.filter((item) => !item.children);
  };

  const hasChildren = () => {
    return list.filter((item) => item.children);
  };


  /*function hasOneShowingChild(children, parent) {
    const showingChildren = children.filter(item => {
      if (item.hidden) {
        return false
      } else {
        // Temp set(will be used if only has one showing child)
        this.onlyOneChild = item
        return true
      }
    })

    // When there is only one child router, the child router is displayed by default
    if (showingChildren.length === 1) {
      return true
    }

    // Show parent if there are no child router to display
    if (showingChildren.length === 0) {
      this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
      return true
    }

    return false
  }

  function resolvePath(routePath) {
    if (isExternalLink(routePath)) {
      return routePath
    }
    return path.resolve(this.basePath, routePath)
  }

  function isExternalLink(routePath) {
    return isExternal(routePath)
  }*/



  const clickMenu = (item) => {
    router.push(item.path)
    sysStore.selectMenu(item)
  }




</script>

<style lang="scss" scoped>
.icons {
  width: 18px;
  height: 18px;
}
.el-menu {
  border-right: none;
  h3 {
    line-height: 60px;
    color: #fff;
    text-align: center;
  }
}
</style>
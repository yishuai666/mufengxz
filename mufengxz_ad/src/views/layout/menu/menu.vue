<script setup>
  import { useMenuStore } from '@/store/menu'

  const menuStore = useMenuStore();

  const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
  }
  const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
  }
</script>

<template>
  <el-menu
      active-text-color="#ffd04b"
      background-color="#112f50"
      class="el-menu-vertical-demo"
      :default-active="$route.path" router
      :collapse="menuStore.isCollapse"
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
  >
    <el-menu-item class="title">
      <template #title>
        <span>沐风小站后台管理系统</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/">
      <el-icon><Menu /></el-icon>
      <template #title>
        <span>首页</span>
      </template>
    </el-menu-item>
    <el-sub-menu index="/acl">
      <template #title>
        <el-icon><Lock /></el-icon>
        <span>权限管理</span>
      </template>
      <el-menu-item index="/acl/user/list">
        <el-icon><User /></el-icon>
        <span>用户管理</span>
      </el-menu-item>
      <el-menu-item index="/acl/role/list">
        <el-icon><Avatar /></el-icon>
        <span>角色管理</span>
      </el-menu-item>
      <el-menu-item index="/acl/menu/list">
        <el-icon><Menu /></el-icon>
        <span>菜单管理</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped lang="scss">
  .el-menu{
    border-right: none;
  }
  .title{
    height: 50px;
  }
  .el-menu .is-active {
    background: #1e78bf !important;
    color: #fff !important;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

</style>
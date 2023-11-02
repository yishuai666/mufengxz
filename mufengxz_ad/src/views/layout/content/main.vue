<script setup>
  import { useMenuStore } from '@/store/menu'

  const menuStore = useMenuStore();
  //菜单折叠
  const changeCollapse = () => {
    menuStore.changeCollapse()
  }
</script>

<template>
  <!--  1.顶部菜单区域  -->
  <div class="header">
    <el-row>
      <el-col :span="4">
        <el-icon v-if="!menuStore.isCollapse" class="el-icon fold" @click="changeCollapse" disabled ><Fold /></el-icon>
        <el-icon v-else class="el-icon expand" @click="changeCollapse" disabled ><Expand /></el-icon>
      </el-col>
      <el-col :span="20">
        <div class="right">
          22
        </div>
      </el-col>
    </el-row>

  </div>
  <!--  2.路由出口  -->
  <div class="wrapper">
    <router-view />
  </div>

</template>

<style scoped lang="scss">
  .header{
    background: #1e78bf;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    color: #fff;
    .el-icon{
      height: 50px;
      line-height: 50px;
      font-size: 22px;
      cursor: pointer;
    }
    .right{
      text-align: right;
      padding-right: 20px;
    }
  }
  .wrapper{
    padding: 10px;
  }
</style>
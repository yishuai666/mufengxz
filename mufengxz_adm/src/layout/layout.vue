<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <Aside />
      <el-container>
        <Header />
        <Tab />
        <el-main class="right-main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script setup>
  import Header from '@/layout/header/header.vue'
  import Aside from '@/layout/aside/aside.vue'
  import Tab from '@/layout/tab/tab.vue'

</script>

<style lang="scss" scoped>
  .el-container {
    flex-wrap: wrap;
    align-items: flex-start;
    height: 100%;
  }

  .common-layout {
    .lay-container {
      flex-wrap: nowrap;

      .right-main {
        height: calc(100% - 124px) !important;
      }
    }

    height: 100%;

    & > .el-container {
      height: 100%;

      & > .el-aside {
        height: 100%;
        background: #545c64;
      }
    }
  }
</style>


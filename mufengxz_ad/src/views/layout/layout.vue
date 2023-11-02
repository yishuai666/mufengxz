<script setup>
  import Menu from '@/views/layout/menu/menu.vue'
  import Content from '@/views/layout/content/main.vue'
  import { useMenuStore } from '@/store/menu'

  const menuStore = useMenuStore();
</script>

<template>
  <div class="menu">
    <Menu />
  </div>
  <div class="content" :class="{isClose : menuStore.isCollapse}">
    <Content />
  </div>

</template>

<style scoped lang="scss">
  .menu{
    //width: 200px;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: #112f50;
  }
  .content{
    padding-left: 200px;
  }
  .isClose{
    padding-left: 64px;
  }
</style>
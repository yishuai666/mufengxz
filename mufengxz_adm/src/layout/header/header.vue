<template>
  <el-header>
    <div class="l-content">
      <!-- 图标的展示 -->
      <el-button size="small" plain @click="handleCollapse">
        <el-icon :size="20">
          <Menu />
        </el-icon>
      </el-button>
      <el-breadcrumb separator="/" class="bread">

        <!-- 首页是一定存在的所以直接写死 -->
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>

        <el-breadcrumb-item :to="current.path" v-if="current">{{
            current.label
          }}</el-breadcrumb-item>
      </el-breadcrumb>

    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img :src="getImageUrl('user')" alt="" class="user" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLoginOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

  </el-header>


</template>
<script setup>
  import { useSysStore} from "@/store/sys";
  import { useRouter } from 'vue-router'
  import { computed } from 'vue'

  const sysStore = useSysStore()
  const router = useRouter()

  let handleCollapse = () => {

    sysStore.updateIsCollapse()
  };
  let getImageUrl = (user) => {
    // console.log(import.meta.url);
    // console.log(new URL("../assets/images/user.png", import.meta.url));
    return new URL(`../../assets/img/${user}.png`, import.meta.url).href;
  };
  // let userImg = require("../assets/images/user.png");
  const current = computed(() => {
    return sysStore.currentMenu;
  });
</script>

<style lang="scss" scoped>
  header {
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 100%;
   background: #333
  }
  .r-content {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .l-content {
    display: flex;
    align-items: center;
    .el-button {
      margin-right: 20px;
    }
    h3 {
      color: #fff;
    }
  }

  :deep(.bread span) {
    color: #fff !important;
    cursor: pointer !important;
  }
</style>
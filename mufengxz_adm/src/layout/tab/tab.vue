<template>
  <div class="tags">
    <el-tag
      :key="tag.name"
      v-for="(tag, index) in tags"
      :closable="tag.name !== '首页'"
      :disable-transitions="false"
      :effect="route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
    >
      {{ tag.name }}
    </el-tag>
  </div>
</template>

<script setup>
  import { useSysStore } from "@/store/sys";
  import { useRouter, useRoute } from 'vue-router'

  const route = useRoute();
  const router = useRouter();
  const sysStore = useSysStore()

  const tags = sysStore.tabsList;
  // console.log("tags:",tags)
  // console.log("tags:",tags.map(item => item.name))
  const changeMenu = (item) => {
    router.push({ name: item.name });
  };
  const handleClose = (tag, index) => {
    let length = tags.length - 1;
    sysStore.closeTab(tag);
    // 做第一个判断
    if (tag.name !== route.name) {
      return;
    }

    if (index === length) {
      router.push({
        name: tags[index - 1].name,
      });
    } else {
      router.push({
        name: tags[index].name,
      });
    }
  };

</script>

<style scoped>
.tags {
  padding: 0 0 0 20px;
  width: 100%;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
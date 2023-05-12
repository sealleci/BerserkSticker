<script setup lang="ts">
import MyAside from '@/components/MyAside.vue';
</script>

<template>
  <div class="app__container">
    <aside>
      <my-aside></my-aside>
    </aside>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped lang="less">
@import (reference) "@/less/general.less";

.app__container {
  position: relative;
  height: 100%;
  width: 100%;
}

main {
  background-color: @white;
  height: 100%;
  width: 100%;
}
</style>

<script setup lang="ts">
import MyAside from '@/components/MyAside.vue'
import MyStage from '@/components/MyStage.vue'
import { onMounted } from 'vue'
onMounted(() => {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)

  window.addEventListener('resize', () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
  })

  window.addEventListener('touchmove', (event) => {
    const touch1 = event.touches[0]
    const touch2 = event.touches[1]

    if (touch1 && touch2) {
      event.preventDefault()
    }
  }, { passive: false })
})
</script>

<template>
  <div class="app__container">
    <aside>
      <my-aside></my-aside>
    </aside>
    <main>
      <my-stage></my-stage>
    </main>
  </div>
</template>

<style scoped lang="less">
@import (reference) "@/less/general.less";

.app__container {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

main {
  background-color: @white;
  height: 100%;
  width: 100%;
}
</style>

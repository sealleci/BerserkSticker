<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MyAside from '@/components/MyAside.vue'
import MyStage from '@/components/MyStage.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ImgB1 from '@/assets/img/b1.png'
import ImgB2 from '@/assets/img/b2.png'
import ImgB3 from '@/assets/img/b3.png'
import ImgR1 from '@/assets/img/r1.png'
import ImgS1 from '@/assets/img/s1.jpg'
import ImgS2 from '@/assets/img/s2.jpg'
import ImgS3 from '@/assets/img/s3.jpg'

const isLoading = ref<boolean>(true)

async function preloadImages(imageFileList: string[]) {
  const promises = imageFileList.map((src) => {
    return new Promise((resolve, reject) => {
      const img = new Image()

      img.src = src
      img.onload = resolve
      img.onerror = reject
    })
  })

  await Promise.all(promises)
  isLoading.value = false
}

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

  preloadImages([
    ImgB1,
    ImgB2,
    ImgB3,
    ImgR1,
    ImgS1,
    ImgS2,
    ImgS3
  ]).catch(console.error)
})
</script>

<template>
  <div class="app__container">
    <template v-if="isLoading">
      <LoadingSpinner />
    </template>
    <template v-else>
      <aside>
        <my-aside></my-aside>
      </aside>
      <main>
        <my-stage></my-stage>
      </main>
    </template>
  </div>
</template>

<style scoped lang="less">
@import (reference) "@/less/general.less";

.app__container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

main {
  background-color: @white;
  height: 100%;
  width: 100%;
}
</style>

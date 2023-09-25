<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MyAside from '@/components/MyAside.vue'
import MyStage from '@/components/MyStage.vue'
import img_b1 from '@/assets/img/b1.png'
import img_b2 from '@/assets/img/b2.png'
import img_b3 from '@/assets/img/b3.png'
import img_r1 from '@/assets/img/r1.png'
import img_s1 from '@/assets/img/s1.jpg'
import img_s2 from '@/assets/img/s2.jpg'
import img_s3 from '@/assets/img/s3.jpg'

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
    img_b1,
    img_b2,
    img_b3,
    img_r1,
    img_s1,
    img_s2,
    img_s3
  ]).catch(console.error)
})
</script>

<template>
  <div class="app__container">
    <template v-if="isLoading">
      <div className="loading_spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
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
  height: 100%;
  width: 100%;
  overflow: hidden;
}

main {
  background-color: @white;
  height: 100%;
  width: 100%;
}

@keyframes spinner_rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loading_spinner {
  @diameter: 80px;

  display: block;
  position: relative;
  width: @diameter;
  height: calc(var(--vh, 1vh) * 100);
  padding-top: calc(calc(var(--vh, 1vh) * 50) - @diameter / 2);
  background-color: transparent;

  div {
    animation: spinner_rotate 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 40px 40px;

    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: rgb(154, 102, 184);
      margin: -4px 0 0 -4px;
    }

    &:nth-child(1) {
      animation-delay: -0.036s;

      &::after {
        top: 63px;
        left: 63px;
      }
    }

    &:nth-child(2) {
      animation-delay: -0.072s;

      &::after {
        top: 68px;
        left: 56px;
      }
    }

    &:nth-child(3) {
      animation-delay: -0.108s;

      &::after {
        top: 71px;
        left: 48px;
      }
    }

    &:nth-child(4) {
      animation-delay: -0.144s;

      &::after {
        top: 72px;
        left: 40px;
      }
    }

    &:nth-child(5) {
      animation-delay: -0.18s;

      &::after {
        top: 71px;
        left: 32px;
      }
    }

    &:nth-child(6) {
      animation-delay: -0.216s;

      &::after {
        top: 68px;
        left: 24px;
      }
    }

    &:nth-child(7) {
      animation-delay: -0.252s;

      &::after {
        top: 63px;
        left: 17px;
      }
    }

    &:nth-child(8) {
      animation-delay: -0.288s;

      &::after {
        top: 56px;
        left: 12px;
      }
    }
  }
}
</style>

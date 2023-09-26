<script  lang="ts" setup>
defineProps<{
    name: string
    title: string
}>()
</script>

<template>
    <div class="my_tab_item">
        <slot></slot>
    </div>
</template>

<style lang="less" scoped>
.my_tab_item {
    width: 100%;
}
</style>
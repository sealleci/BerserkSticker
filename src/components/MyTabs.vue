<script lang="ts" setup>
import { useSlots, onMounted } from 'vue'
import type { VNode } from 'vue'

const slots = useSlots()
const props = defineProps<{
    modelValue: string
}>()
const emits = defineEmits<{
    (emit_name: 'click', name: string): void
    (emit_name: 'update:modelValue', value: string): void
}>()
const tab_node_list: VNode[] = slots.default ? slots.default().filter(x => (x.type as any).__name === 'MyTabItem') : []
const tab_name_list: string[] = tab_node_list.map(x => x.props ? x.props.name as string : '')
const tab_title_list: string[] = tab_node_list.map(x => x.props ? x.props.title as string : '')

function handleClick(name: string) {
    emits('click', name)
    emits('update:modelValue', name)
}

onMounted(() => {
    if (props.modelValue === '') {
        emits('click', tab_name_list[0])
        emits('update:modelValue', tab_name_list[0])
    }
})
</script>

<template>
    <div class="my_tabs">
        <div class="my_tabs__nav">
            <div class="my_tabs__nav__scroll_bar">
                <div v-for="(title, index) in tab_title_list" :key="index"
                    :class="modelValue === tab_name_list[index] ? 'my_tabs__nav__title my_tabs__nav__title--active' : 'my_tabs__nav__title'"
                    @click="handleClick(tab_name_list[index])">
                    {{ title }}
                </div>
            </div>
        </div>
        <div class="my_tabs__container">
            <template v-for="(item, index) in tab_node_list" :key="index">
                <component :is="item" v-show="modelValue === tab_name_list[index]" />
            </template>
        </div>
    </div>
</template>

<style lang="less" scoped>
@import (reference) "@/less/general.less";

.my_tabs {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;

    &__nav {
        flex-shrink: 0;
        width: 100%;
        height: 1.75rem;
        border-bottom: 1px solid @grey--light;

        &__scroll_bar {
            display: flex;
            flex-direction: row;
            justify-content: safe center;
            align-items: center;
            width: 100%;
            height: 100%;
            overflow-x: scroll;
            scrollbar-width: none !important;

            &::-webkit-scrollbar {
                display: none;
            }
        }

        &__title {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            height: 100%;
            padding: 0 .75rem;
            color: rgba(black, .5);
            font-size: .8rem;


            &::after {
                @elm_height: .25rem;

                content: '';
                position: absolute;
                display: none;
                width: 80%;
                bottom: 0;
                height: @elm_height;
                border-radius: @elm_height;
                background-color: @theme_color;
            }

            &.my_tabs__nav__title--active {
                color: @theme_color;

                &::after {
                    display: block;

                }
            }
        }
    }

    &__container {
        width: 100%;
        flex-grow: 1;
        padding: .5rem .5rem;
        overflow-y: auto;
        box-sizing: border-box;
    }
}
</style>
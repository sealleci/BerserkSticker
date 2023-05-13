<script lang="ts" setup>
import { IconScissor } from '@opentiny/vue-icon';
import { computed, onMounted } from 'vue';
import {
    DragEvent,
    DraggableArea,
    DraggableElement,
    MoveEvent,
    ResizeEvent,
    StencilPreview
} from 'vue-advanced-cropper';

const ScissorIcon = IconScissor()
const props = defineProps<
    {
        image: unknown
        coordinates: unknown
        transitions: {
            enabled: boolean
            timingFunction: string
            time: number
        }
        stencilCoordinates: {
            height: number
            width: number
            left: number
            top: number
        }
    }
>()
const emits = defineEmits<{
    (emit_name: 'move', move_event: MoveEvent): void
    (emit_name: 'move-end'): void
    (emit_name: 'resize', resize_event: ResizeEvent): void
    (emit_name: 'resize-end'): void
}>()
const style = computed(() => {
    const { height, width, left, top } = props.stencilCoordinates!
    const style_result = {
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate(${left}px, ${top}px)`,
        transition: 'none'
    }

    if (props.transitions && props.transitions.enabled) {
        style_result.transition = `${props.transitions.time}ms ${props.transitions.timingFunction}`
    }

    return style_result
})

function onMove(move_event: MoveEvent) {
    emits('move', move_event)
}

function onMoveEnd() {
    emits('move-end')
}

function onResize(drag_event: DragEvent) {
    const shift = drag_event.shift()
    const resize_offset = shift.left

    emits(
        'resize',
        new ResizeEvent(
            {
                left: resize_offset,
                right: resize_offset,
                top: resize_offset,
                bottom: resize_offset,
            },
            {
                preserveRatio: true
            }
        )
    )
}

function onResizeEnd() {
    emits('resize-end');
}

onMounted(() => {
})
</script>

<template>
    <div class="circle_stencil" :style="style">
        <draggable-element class="circle_stencil__handler" @drag="onResize" @drag-end="onResizeEnd">
            <scissor-icon></scissor-icon>
        </draggable-element>
        <draggable-area @move="onMove" @move-end="onMoveEnd" class="circle_stencil__crop_area">
            <stencil-preview class="circle_stencil__preview" :image="image" :coordinates="coordinates"
                :width="stencilCoordinates!.width" :height="stencilCoordinates!.height" :transitions="transitions" />
        </draggable-area>
    </div>
</template>

<style lang="less">
@import (reference) '@/less/general.less';

.circle_stencil {
    position: relative;
    border: 2px dashed white;
    border-radius: 50%;
    box-sizing: border-box;
    cursor: move;

    &__handler {
        @handler__size: 2.5rem;

        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: calc(85.36% - @handler__size / 2);
        top: calc(14.64% - @handler__size / 2);
        width: @handler__size;
        height: @handler__size;
        background-color: @theme_color;
        border: 2px dashed white;
        border-radius: 50%;
        box-sizing: border-box;
        opacity: .9;
        cursor: ne-resize;
        z-index: 1;


        svg {
            @icon__size: 1.5rem;

            height: @icon__size;
            width: @icon__size;
            fill: white;
            transform: rotate(90deg);
        }
    }

    &__preview {
        border-radius: 50%;
        overflow: hidden;
    }
}
</style>

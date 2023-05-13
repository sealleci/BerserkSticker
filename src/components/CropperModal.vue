<script setup lang="ts">
import CropperStencil from '@/components/CropperStencil.vue'
import {
    Button,
    Modal
} from '@opentiny/vue'
import { IconClose } from '@opentiny/vue-icon'
import { Ref, onMounted, ref, toRefs, watch } from 'vue'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

const CloseIcon = IconClose()
const cropper_instance: Ref<InstanceType<typeof Cropper>> = ref(null!)
const props = defineProps<{
    avatarDataUrl: string,
    isModalShow: boolean
}>()
const emits = defineEmits<{
    (event_name: 'passAvatar', data_url: string): void,
    (event_name: 'closeModal'): void
}>()
const { isModalShow } = toRefs(props)
const is_modal_show_local: Ref<boolean> = ref(false)

function crop() {
    const canvas = cropper_instance.value.getResult().canvas
    if (!canvas) { return }

    emits('passAvatar', canvas.toDataURL())
    emits('closeModal')
}

onMounted(() => {
    window.addEventListener('resize', () => {
        const cur_width = document.body.clientWidth

        document.querySelector<HTMLElement>('.tiny-modal__box')?.style.setProperty('left', `calc(${cur_width >= 1008 ? 30 : cur_width >= 641 ? 20 : 10}vw + .5rem)`)
    })
})

watch(isModalShow, (new_value) => {
    is_modal_show_local.value = new_value
})
</script>
<template>
    <modal class="cropper_modal" v-model="is_modal_show_local" :showHeader="false">
        <div class="cropper_modal__row cropper_modal__row--first">
            <div class="cropper_modal__close_button" @click="emits('closeModal')">
                <close-icon></close-icon>
            </div>
        </div>
        <cropper class="cropper" ref="cropper_instance" :src="avatarDataUrl" :stencilProps="{
            aspectRatio: 1 / 1
        }" :stencilComponent="CropperStencil" />
        <div class="cropper_modal__row cropper_modal__row--last">
            <Button class="crop_button" @click="crop" round>Crop</Button>
        </div>
    </modal>
</template>
<style scoped lang="less">
@import (reference) "@/less/general.less";

@modal__margin__top: 1rem;
@modal__width--small: 80vw - @modal__margin__top;
@modal__width--middle: 60vw - @modal__margin__top;
@modal__width--large: 40vw - @modal__margin__top;

.tiny-modal {
    :deep(&__box) {
        top: @modal__margin__top !important;
        height: calc(var(--vh, 1vh) * 100 - @modal__margin__top * 2);
        border: none !important;
        box-shadow: none !important;
        background-color: transparent;

        @media @screen--large {
            width: calc(@modal__width--large);
        }

        @media @screen--middle {
            width: calc(@modal__width--middle);
        }

        @media @screen--small {
            width: calc(@modal__width--small);
        }
    }

    :deep(&__body) {
        padding: 0;
    }

    :deep(&__content) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
}

.cropper_modal {
    &__row {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;

        &--first {
            justify-content: flex-end;
        }

        &--last {
            justify-content: center;
        }
    }

    &__close_button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 2.5rem;
        width: 2.5rem;
        border-radius: 50%;
        background-color: @black;
        cursor: pointer;
        transition: background-color @animation__duration--short;

        &:hover {
            background-color: @theme_color--dark;
        }

        svg {
            height: 1.5rem;
            width: 1.5rem;
            fill: @white;
        }
    }
}

.cropper {
    position: relative;
    margin: 1rem 0;

    @media @screen--large {
        width: calc(@modal__width--large);
        height: calc(@modal__width--large);
    }

    @media @screen--middle {
        width: calc(@modal__width--middle);
        height: calc(@modal__width--middle);
    }

    @media @screen--small {
        width: calc(@modal__width--small);
        height: calc(@modal__width--small);
    }
}

.crop_button {
    height: 2.5rem;
    width: 40%;
    color: white;
    background-color: @theme_color;
    font-size: 1.5rem;
    border: none;
    cursor: pointer;
    transition: background-color @animation__duration--short;

    &:hover {
        background-color: @theme_color--dark;
    }
}
</style>

<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue'
import Konva from 'konva'
import { Button as TinyButton, Collapse, CollapseItem } from '@opentiny/vue'
import { IconChevronLeft, IconMinscreenLeft, IconPlus, IconSave, IconUpload, IconUpO, IconDownO } from '@opentiny/vue-icon'
import { ShapeNode, useKonvaNodeStore } from '@/store/konva_node.ts'
import { getShape } from '@/utils/shape.ts'
import CropperModal from '@/components/CropperModal.vue'
import MyTabs from '@/components/MyTabs.vue'
import MyTabItem from '@/components/MyTabItem.vue'
import img_b1 from '@/assets/img/b1.png'
import img_b2 from '@/assets/img/b2.png'
import img_b3 from '@/assets/img/b3.png'
import img_r1 from '@/assets/img/r1.png'
import img_s1 from '@/assets/img/s1.jpg'
import img_s2 from '@/assets/img/s2.jpg'
import img_s3 from '@/assets/img/s3.jpg'
import 'vue-advanced-cropper/dist/style.css'

type OperationItem = {
    name: string
    icon: any
    handler: () => void
}

class GeneralItem<T = string> {
    public value: T
    public index: number

    constructor(index: number, value: T) {
        this.index = index
        this.value = value
    }
}

class GeneralList<T = string> {
    public data: GeneralItem<T>[]
    private counter: number

    constructor(default_data: T[] = []) {
        this.data = []
        this.counter = 0

        if (default_data.length > 0) {
            this.data = default_data.map((item) => {
                this.counter += 1
                return new GeneralItem(this.counter, item)
            })
        }
    }

    push(value: T) {
        this.counter += 1
        this.data.push(new GeneralItem<T>(this.counter, value))
    }

    access(index: number): T {
        return this.data[index].value
    }

    remove(index: number) {
        for (let i = 0; i < this.data.length; i += 1) {
            if (this.data[i].index === index) {
                this.data.splice(i, 1)
                return
            }
        }
    }
}

const konva_node_store = useKonvaNodeStore()
const ChevronLeftIcon = IconChevronLeft()
const UploadIcon = IconUpload()
const UpIcon = IconUpO()
const DownIcon = IconDownO()
const PlusIcon = IconPlus()
const SaveIcon = IconSave()
const MinscreenLeftIcon = IconMinscreenLeft()
let is_aside_open: boolean = false
const is_small_screen = ref(false)
const active_collapse_item_list: Ref<string[]> = ref(['templates'])
const active_tab_item: Ref<string> = ref('templates')
const is_modal_show = ref(false)
const avatar_list = ref(new GeneralList([img_r1]))
const avatar_data_url: Ref<string> = ref('')
const shape_color_list: string[] = [
    '#DD5353',
    '#FFD95A',
    '#62CDFF',
    '#03C988',
    '#FFABAB',
    '#9A208C',
    '#20262E',
    '#F0F0F0'
]
const shape_type_list: ShapeNode['type'][] = [
    'star',
    'heart',
    'seven',
    'fire',
    'moon',
    'halo'
]
const shape_list = shape_type_list.map(
    type => ({
        type,
        image: ref('')
    })
)
const selected_shape_node_color: Ref<ShapeNode['color']> = ref(shape_color_list[0])
const selected_shape_node_type: Ref<ShapeNode['type']> = ref('')
const operation_list: OperationItem[] = [
    {
        name: 'Save',
        icon: SaveIcon,
        handler: triggerSaveImage
    },
    {
        name: 'Relocate',
        icon: MinscreenLeftIcon,
        handler: triggerRelocate
    },
    {
        name: 'Move to Top',
        icon: UpIcon,
        handler: () => triggerChangeZIndex(true)
    },
    {
        name: 'Move to Bottom',
        icon: DownIcon,
        handler: () => triggerChangeZIndex(false)
    }
]
const BACKGROUND_FILE_NAME_LIST: string[] = [
    img_b1,
    img_b2,
    img_b3,
    img_s1,
    img_s2,
    img_s3
]
const background_list = ref(
    new GeneralList<string>(BACKGROUND_FILE_NAME_LIST)
)

function toggleAside() {
    if (!is_aside_open) {
        document.querySelector('.aside')!.classList.add('aside--collapsed')
        document.querySelector('.collapse_button')!.classList.add('collapse_button--reversed')
        is_aside_open = true
    } else {
        document.querySelector('.aside')!.classList.remove('aside--collapsed')
        document.querySelector('.collapse_button')!.classList.remove('collapse_button--reversed')
        is_aside_open = false
    }
}

function clickCollapseItem(active_items: string[]) {
    if (active_items.length !== 0) {
        active_tab_item.value = active_items[0]
    }
}

function clickTabItem(name: string) {
    active_collapse_item_list.value = [name]
}

function uploadBackground(payload: Event) {
    if (!payload.target) { return }

    const input = payload.target as HTMLInputElement

    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = e => {
            if (!e.target) { return }



            const data_url = e.target.result as string

            if (!data_url.startsWith('data:')) { return }

            const img = new Image()

            img.onload = () => {
                background_list.value.push(data_url)
                input.value = ''
            }
            img.onerror = () => {
                console.log('Background image error.')
            }
            img.src = data_url
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function uploadAvatar(payload: Event) {
    if (!payload.target) { return }

    const input = payload.target as HTMLInputElement

    if (input.files && input.files[0]) {
        const reader = new FileReader()

        reader.onload = (e) => {
            if (!e.target) { return }

            const data_url = e.target.result as string

            if (!data_url.startsWith('data:')) { return }

            const img = new Image()

            img.onload = () => {
                avatar_data_url.value = data_url
                input.value = ''
                is_modal_show.value = true
            }
            img.onerror = () => {
                console.log('Avatar image error.')
            }
            img.src = data_url
        }
        reader.readAsDataURL(input.files[0])
    }
}

function passAvatar(data_url: string) {
    avatar_list.value.push(data_url)
}

function closeModal() {
    is_modal_show.value = false
    avatar_data_url.value = ''
}

function triggerReplaceBackgroundNode(data_url: string) {
    konva_node_store.background_node = data_url
}

function triggerAddAvatarNode(data_url: string) {
    konva_node_store.avatar_node = data_url
}

function triggerAddShapeNode(type: ShapeNode['type']) {
    selected_shape_node_type.value = type
    konva_node_store.shape_node = {
        type: selected_shape_node_type.value,
        color: selected_shape_node_color.value
    }
    konva_node_store.is_trigger_add_shape_node = true
}

function triggerSaveImage() {
    konva_node_store.is_trigger_save_image = true
}

function triggerRelocate() {
    konva_node_store.is_trigger_relocate = true
}

function triggerChangeZIndex(is_to_top: boolean) {
    konva_node_store.is_to_top = is_to_top
    konva_node_store.is_trigger_change_z_index = true
}

function updateShapePreviews() {
    const SIZE: number = 48
    const default_circle = new Konva.Circle({
        radius: SIZE / 2,
        fill: selected_shape_node_color.value
    })

    for (const shape_item of shape_list) {
        let shape: Konva.Shape | null = getShape(shape_item.type, selected_shape_node_color.value, SIZE)

        if (shape) {
            shape_item.image.value = shape.toDataURL()
        } else {
            shape_item.image.value = default_circle.toDataURL()
        }
    }
}

function changeShapeColor(value: string) {
    selected_shape_node_color.value = value
    updateShapePreviews()

    konva_node_store.changed_color = value
    konva_node_store.is_trigger_change_color = true
}

onMounted(() => {
    const SMALL_SCREEN_THRESHOLD: number = 640
    is_small_screen.value = document.body.clientWidth <= SMALL_SCREEN_THRESHOLD

    window.addEventListener('resize', () => {
        const cur_width = document.body.clientWidth
        is_small_screen.value = cur_width <= SMALL_SCREEN_THRESHOLD
    })

    updateShapePreviews()
})
</script>

<template>
    <div class="aside">
        <div class="aside__container">
            <collapse v-model="active_collapse_item_list" v-if="!is_small_screen" @change="clickCollapseItem">
                <collapse-item title="Templates" name="templates">
                    <label class="upload_button">
                        <input type="file" accept="image/*" @change="uploadBackground">
                        <upload-icon></upload-icon>
                    </label>
                    <div class="general_list background_list">
                        <tiny-button class="general_list__item background_list__item background_list__item--middle"
                            v-for="(item, index) in background_list.data" :key="index"
                            @click="triggerReplaceBackgroundNode(item.value)">
                            <img :src="item.value" />
                            <span>Meta</span>
                        </tiny-button>
                    </div>
                </collapse-item>
                <collapse-item title="Avatars" name="avatars">
                    <label class="upload_button">
                        <input type="file" accept="image/*" @change="uploadAvatar">
                        <upload-icon></upload-icon>
                    </label>
                    <div class="general_list avatar_list">
                        <tiny-button class="general_list__item avatar_list__item avatar_list__item--middle"
                            v-for="(item, index) in avatar_list.data" :key="index"
                            @click="triggerAddAvatarNode(item.value)">
                            <img :src="item.value" />
                            <span>777</span>
                            <plus-icon></plus-icon>
                        </tiny-button>
                    </div>
                </collapse-item>
                <collapse-item title="Shapes" name="shapes">
                    <div class="general_list shape_color_list">
                        <div class="shape_color_list__row">
                            <tiny-button class="general_list__item shape_color_list__item" circle
                                v-for="(item, index) in shape_color_list.slice(0, 4)" :key="index"
                                @click="changeShapeColor(item)" :style="{ backgroundColor: item }">
                            </tiny-button>
                        </div>
                        <div class="shape_color_list__row">
                            <tiny-button class="general_list__item shape_color_list__item" circle
                                v-for="(item, index) in shape_color_list.slice(4)" :key="index"
                                @click="changeShapeColor(item)" :style="{ backgroundColor: item }">
                            </tiny-button>
                        </div>
                    </div>
                    <div class="general_list shape_list">
                        <tiny-button class="general_list__item shape_list__item shape_list__item--middle"
                            v-for="(item, index) in shape_list" :key="index"
                            @click="triggerAddShapeNode(item.type as ShapeNode['type'])">
                            <img :src="item.image.value" />
                            <span>{{ item.type.charAt(0).toUpperCase() + item.type.slice(1) }}</span>
                            <plus-icon></plus-icon>
                        </tiny-button>
                    </div>
                </collapse-item>
                <collapse-item title="Operations" name="operations">
                    <tiny-button class="general_list__item operation_list__item" v-for="(item, index) in operation_list"
                        :key="index" @click="item.handler">
                        <span>{{ item.name }}</span>
                        <component :is="item.icon"></component>
                    </tiny-button>
                </collapse-item>
            </collapse>
            <my-tabs v-model="active_tab_item" @click="clickTabItem" v-else>
                <my-tab-item title="Templates" name="templates">
                    <label class="upload_button">
                        <input type="file" accept="image/*" @change="uploadBackground">
                        <upload-icon></upload-icon>
                    </label>
                    <div class="general_list background_list">
                        <tiny-button v-for="(item, index) in background_list.data" :key="index"
                            class="general_list__item background_list__item"
                            @click="triggerReplaceBackgroundNode(item.value)">
                            <img :src="item.value" />
                            <span>Meta</span>
                        </tiny-button>
                    </div>
                </my-tab-item>
                <my-tab-item title="Avatars" name="avatars">
                    <label class="upload_button">
                        <input type="file" accept="image/*" @change="uploadAvatar">
                        <upload-icon></upload-icon>
                    </label>
                    <div class="general_list avatar_list">
                        <tiny-button class="general_list__item avatar_list__item"
                            v-for="(item, index) in avatar_list.data" :key="index"
                            @click="triggerAddAvatarNode(item.value)">
                            <img :src="item.value" />
                            <span>777</span>
                            <plus-icon></plus-icon>
                        </tiny-button>
                    </div>
                </my-tab-item>
                <my-tab-item title="Shapes" name="shapes">
                    <div class="general_list shape_color_list">
                        <div class="shape_color_list__row">
                            <tiny-button class="general_list__item shape_color_list__item" circle
                                v-for="(item, index) in shape_color_list.slice(0, 4)" :key="index"
                                @click="changeShapeColor(item)" :style="{ backgroundColor: item }">
                            </tiny-button>
                        </div>
                        <div class="shape_color_list__row">
                            <tiny-button class="general_list__item shape_color_list__item" circle
                                v-for="(item, index) in shape_color_list.slice(4)" :key="index"
                                @click="changeShapeColor(item)" :style="{ backgroundColor: item }">
                            </tiny-button>
                        </div>
                    </div>
                    <div class="general_list shape_list">
                        <tiny-button class="general_list__item shape_list__item" v-for="(item, index) in shape_list"
                            :key="index" @click="triggerAddShapeNode(item.type as ShapeNode['type'])">
                            <img :src="item.image.value" />
                            <span>{{ item.type.charAt(0).toUpperCase() + item.type.slice(1) }}</span>
                            <plus-icon></plus-icon>
                        </tiny-button>
                    </div>
                </my-tab-item>
                <my-tab-item title="Operations" name="operations">
                    <div class="general_list operation_list">
                        <tiny-button class="general_list__item operation_list__item operation_list__item--mobile"
                            v-for="(item, index) in operation_list" :key="index" @click="item.handler">
                            <span>{{ item.name }}</span>
                            <component :is="item.icon"></component>
                        </tiny-button>
                    </div>
                </my-tab-item>
            </my-tabs>
        </div>
        <div class="collapse_button" @click="toggleAside">
            <chevron-left-icon></chevron-left-icon>
        </div>
        <cropper-modal :isModalShow="is_modal_show" :avatarDataUrl="avatar_data_url" @passAvatar="passAvatar"
            @closeModal="closeModal">
        </cropper-modal>
    </div>
</template>

<style scoped lang="less">
@import (reference) "@/less/general.less";

@collapse_icon__radius: 1.25rem;
@aside__width: 15rem;
@aside__height: calc(var(--vh) * 45);
@tab__nav__height: 2.5rem;
@general_list__margin__top: .25rem;
@row_button__height: 2.5rem;
@mobile_font_size: .8rem;

.my_scrollbar() {
    &::-webkit-scrollbar {
        width: 12px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 2rem;
        background-color: @white;
        box-shadow: inset 0 0 1px @black;
    }

    &::-webkit-scrollbar-track {
        background-color: rgba(0, 0, 0, .05);
        border-radius: 2rem;
        box-shadow: inset 1px 1px 4px rgba(0, 0, 0, .1);
    }
}

.aside {
    position: absolute;
    top: 0;
    left: 0;
    width: @aside__width;
    height: 100%;
    padding-right: @collapse_icon__radius;
    background-color: @white;
    box-shadow: 2px 0px 4px rgba(0, 0, 0, .1);
    z-index: 100;
    transition: left @animation__duration, top @animation__duration;

    @media @screen--small {
        width: 100vw;
        height: @aside__height;
        top: calc(100% - @aside__height - @collapse_icon__radius);
        padding-right: 0;
        padding-top: @collapse_icon__radius;
        box-shadow: 0px -2px 4px rgba(0, 0, 0, .1);
    }

    &__container {
        .my_scrollbar();

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;

        @media @screen--small {
            height: 100%;
            flex-direction: row;
            overflow-x: auto;
            overflow-y: hidden;
        }
    }

    &--collapsed {
        left: calc(-1 * @aside__width);
        top: 0;

        @media @screen--small {
            left: 0;
            top: calc(100% - @collapse_icon__radius);
        }
    }
}

.collapse_button {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: calc(50% - @collapse_icon__radius);
    right: calc(-1 * @collapse_icon__radius);
    height: calc(2 * @collapse_icon__radius);
    width: calc(2 * @collapse_icon__radius);
    background-color: @white;
    border: 2px solid rgba(0, 0, 0, .05);
    border-radius: 50%;
    box-sizing: border-box;
    cursor: pointer;
    transition: top @animation__duration;

    svg {
        height: 1.5rem;
        width: 1.5rem;
        fill: @black;
        transition: transform .5s;

        @media @screen--small {
            transform: rotateZ(270deg);
        }
    }

    &--reversed {
        svg {
            transform: rotateZ(180deg);

            @media @screen--small {
                transform: rotateZ(90deg);
            }
        }
    }

    @media @screen--small {
        top: calc(-1 * @collapse_icon__radius);
        right: calc(50% - @collapse_icon__radius);
    }
}

.tiny-collapse {
    width: 100%;

    &-item {
        border: none;

        :deep(&>div:first-child) {
            border-bottom: 1px solid @grey--light;
            box-sizing: border-box;
            user-select: none;

            .tiny-collapse-item__header {
                height: 3rem;
                padding: 0 0 0 .5rem;
                color: @grey;
                font-size: 1rem;
                background-color: @white;

                svg {
                    fill: @grey;
                }

                &.is-active {
                    color: @theme_color;

                    svg {
                        fill: @theme_color;
                    }
                }
            }
        }

        :deep(&__wrap) {
            background-color: @white;
        }

        :deep(&__content) {
            padding: calc(@general_list__margin__top * 2);
            border: none;
        }
    }
}

.tiny-tabs {
    width: 100%;
    height: 100%;

    :deep(&__nav-wrap) {
        &::after {
            background-color: transparent !important;
        }
    }

    :deep(&__nav-scroll) {
        display: flex;
        flex-direction: row;
        justify-content: center;
        height: @tab__nav__height;
        padding: 0;
        border-bottom: 1px solid @grey--light;
        box-sizing: border-box;

        .tiny-tabs__active-bar {
            display: none;
        }
    }

    :deep(&__nav) {
        height: 100%;
        overflow-x: scroll;
        overflow-y: hidden;
        scrollbar-width: none;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    :deep(&__item) {
        flex-shrink: 0;
        height: 100%;
        margin: 0 1rem !important;
        color: @grey;
        box-sizing: border-box;

        &.is-active {
            color: @theme_color;
            border-bottom: none !important;

            &::after {
                content: '';
                position: absolute;
                display: block;
                bottom: 0;
                width: 100%;
                height: 3px;
                background-color: @theme_color;
                border-radius: 1rem;
            }
        }

        &__title {
            font-size: @mobile_font_size;
            user-select: none;
        }
    }

    :deep(&__content) {
        max-height: calc(@aside__height - @tab__nav__height);
        padding: calc(@general_list__margin__top * 2);
        overflow-y: auto;

        .my_scrollbar();
    }
}

.row_button() {
    display: flex;
    align-items: center;
    justify-content: center;
    height: @row_button__height;
    width: 100%;
    border: 1px solid @grey--light;
    border-radius: 1rem;
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color @animation__duration--short;

    &:hover {
        background-color: rgba(0, 0, 0, .03);
    }

    input {
        display: none;
    }

    svg {
        height: 1.25rem;
        width: 1.25rem;
        fill: @black;
    }
}

.upload_button {
    .row_button();
}

.general_list {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: @general_list__margin__top;

    &__item {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        margin: @general_list__margin__top 0;
        padding: 0;
        border: 1px solid @grey--light;
        background-color: @white;
        transition: background-color @animation__duration--short;

        &:hover {
            background-color: rgba(0, 0, 0, .03);
        }

        img {
            user-select: none;
            margin: 0;
        }

        span {
            color: @black;
            font-size: 1rem;
            line-height: 1rem;
        }
    }
}

.shape_color_list {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 0;
    min-height: @row_button__height;
    outline: 1px solid @grey--light;
    border-radius: 1rem;

    &__row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    &__item {
        border: 1px solid @grey--light;
        margin: .3rem .6rem;
    }
}

.background_list {
    flex-direction: row;
    flex-wrap: wrap;

    &__item {
        flex-direction: column;
        justify-content: center;
        width: 48%;
        height: fit-content;
        border-radius: 1rem;

        &.background_list__item--middle {
            width: 100%;

            img {
                height: 8rem;
            }

            span {
                font-size: 1rem;
            }
        }

        img {
            height: 6rem;
        }

        span {
            margin: .25rem 0;
            font-size: @mobile_font_size;
        }
    }
}

.avatar_list,
.shape_list {
    flex-direction: row;
    flex-wrap: wrap;

    &__item {
        @avatar_item__height: 2.25rem;
        @avatar_item__padding: 4px;
        @icon_item__diameter: 1.55rem;

        flex-direction: row;
        justify-content: space-between;
        width: 48%;
        height: calc(@avatar_item__height + @avatar_item__padding * 2);
        padding: @avatar_item__padding;
        border-radius: @avatar_item__height;
        box-sizing: border-box;

        &.avatar_list__item--middle,
        &.shape_list__item--middle {
            width: 100%;

            span {
                font-size: 1rem;
            }

            svg {
                height: @avatar_item__height;
                width: @avatar_item__height;
            }
        }

        img {
            flex-shrink: 0;
            height: @avatar_item__height;
            width: @avatar_item__height;
            border-radius: 50%;
        }

        span {
            font-size: @mobile_font_size;
        }

        svg {
            flex-shrink: 0;
            height: @icon_item__diameter;
            width: @icon_item__diameter;
            fill: @grey;
            transform: scale(.6);
        }
    }
}

.operation_list {
    flex-direction: column;
    margin-top: 0;

    &__item {
        .row_button();

        justify-content: space-between;
        padding: 0 1rem;

        &:first-child {
            margin-top: 0;
        }

        span {
            margin-right: .5rem;
            color: @black;
            font-size: 1rem;
            line-height: 1rem;
        }

        &.operation_list__item--mobile {
            span {
                font-size: @mobile_font_size;
            }
        }
    }
}
</style>

<script setup lang="ts">
import { Ref, onMounted, onUnmounted, ref, watch } from 'vue'
import Konva from 'konva'
import { useKonvaNodeStore } from '@/store/konva_node.ts'
import { getShape } from '@/utils/shape.ts'

type Coordinate = { x: number, y: number }

class IncrementingId {
    private id: number

    constructor() {
        this.id = 0
    }

    public get(): number {
        this.id += 1
        return this.id - 1
    }
}

const konva_node_store = useKonvaNodeStore()
const stage: Ref<Konva.Stage> = ref(null!)
const layer: Ref<Konva.Layer> = ref(null!)
const transformer: Ref<Konva.Transformer> = ref(null!)
const remove_button: Ref<Konva.Circle> = ref(null!)
const remove_button_line: Ref<Konva.Line> = ref(null!)
const avatar_node_id = new IncrementingId()
const shape_node_id = new IncrementingId()
const save_id = new IncrementingId()
const background_image = new window.Image()
const BACKGROUND_IMAGE_NAME = 'background'
const REMOVE_BUTTON_RADIUS: number = 10
const SMALL_SCREEN_WIDTH: number = 640
const INIT_PADDING: number = 40
let selected_node_name: string = ''
let last_center: Coordinate | null = null
let last_dist: number = 0
let is_shape_scaling: boolean = false

function getDistance(p1: Coordinate, p2: Coordinate): number {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function getCenter(p1: Coordinate, p2: Coordinate): Coordinate {
    return {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2
    }
}

function updateRemoveButtonPosition() {
    remove_button.value.x(transformer.value.width())
    remove_button_line.value.x(transformer.value.width() - REMOVE_BUTTON_RADIUS)
}

function scaleForWheel(event: Konva.KonvaEventObject<WheelEvent>) {
    const SCALE_PROC: number = 1.2
    const pointer = stage.value.getPointerPosition()!
    const relative_pointer: Coordinate = {
        x: pointer.x - stage.value.getAbsolutePosition().x,
        y: pointer.y - stage.value.getAbsolutePosition().y
    }
    let is_zoom_in = true

    if (event.evt.deltaY < 0) {
        stage.value.scale(
            {
                x: stage.value.scale()!.x * SCALE_PROC,
                y: stage.value.scale()!.y * SCALE_PROC,
            }
        )
    } else {
        stage.value.scale(
            {
                x: stage.value.scale()!.x / SCALE_PROC,
                y: stage.value.scale()!.y / SCALE_PROC,
            }
        )
        is_zoom_in = false
    }

    stage.value.absolutePosition({
        x: stage.value.getAbsolutePosition().x - relative_pointer.x * ((is_zoom_in ? SCALE_PROC : 1.0 / SCALE_PROC) - 1.0),
        y: stage.value.getAbsolutePosition().y - relative_pointer.y * ((is_zoom_in ? SCALE_PROC : 1.0 / SCALE_PROC) - 1.0)
    })

    updateRemoveButtonPosition()
}

function scaleForTouch(event: Konva.KonvaEventObject<TouchEvent>) {
    if (is_shape_scaling) { return }

    const touch1 = event.evt.touches[0]
    const touch2 = event.evt.touches[1]

    if (touch1 && touch2) {
        if (stage.value.isDragging()) {
            stage.value.stopDrag()
        }

        const p1: Coordinate = {
            x: touch1.clientX,
            y: touch1.clientY
        }
        const p2: Coordinate = {
            x: touch2.clientX,
            y: touch2.clientY
        }
        const new_center = getCenter(p1, p2)
        const cur_dist = getDistance(p1, p2)

        if (!last_center) {
            last_center = getCenter(p1, p2)
            return
        }

        if (last_dist === 0) {
            last_dist = cur_dist
        }

        const scale_proc = stage.value.scale()!.x * (cur_dist / last_dist)
        const cur_scale: number = scale_proc / stage.value.scale()!.x
        const relative_center: Coordinate = {
            x: (new_center.x - stage.value.getAbsolutePosition().x),
            y: (new_center.y - stage.value.getAbsolutePosition().y)
        }

        stage.value.scale({
            x: scale_proc,
            y: scale_proc
        })

        const diff_position: Coordinate = {
            x: new_center.x - last_center.x,
            y: new_center.y - last_center.y
        }
        const new_pos: Coordinate = {
            x: stage.value.absolutePosition().x - relative_center.x * (cur_scale - 1.0) + diff_position.x,
            y: stage.value.absolutePosition().y - relative_center.y * (cur_scale - 1.0) + diff_position.y,
        }

        stage.value.absolutePosition(new_pos)

        last_dist = cur_dist
        last_center = new_center

        updateRemoveButtonPosition()
    }
}

function scaleForTouchEnd() {
    last_dist = 0
    last_center = null
}

function updateStageSize() {
    stage.value.width(document.body.offsetWidth)
    stage.value.height(document.body.offsetHeight)
}

function updateTransformer() {
    const transformer_node = transformer.value.getNode()
    const selected_node = stage.value.findOne(`.${selected_node_name}`)

    transformer.value.moveToTop()

    if (selected_node === transformer_node) {
        return
    }

    if (selected_node) {
        transformer.value.nodes([selected_node])
    } else {
        transformer.value.nodes([])
    }

    updateRemoveButtonPosition()
}

function selectNode(event: Konva.KonvaEventObject<MouseEvent | TouchEvent>) {
    if (event.target === stage.value) {
        selected_node_name = ''
        is_shape_scaling = false
        updateTransformer()
        return
    }

    if (event.target.parent && event.target.parent.className === 'Transformer') {
        is_shape_scaling = false
        return
    }

    const name = event.target.name()

    if (name === BACKGROUND_IMAGE_NAME) {
        selected_node_name = ''
        is_shape_scaling = false
    } else {
        selected_node_name = name
    }

    updateTransformer()
}

function removeNode() {
    const selected_node = stage.value.findOne(`.${selected_node_name}`)

    if (selected_node) {
        selected_node.destroy()
        transformer.value.nodes([])
    }
}

function replaceBackgroundNode(date_url: string) {
    background_image.src = date_url
    layer.value.draw()
}

function touchMoveOnShape(event: Konva.KonvaEventObject<TouchEvent>) {
    const touch1 = event.evt.touches[0]
    const touch2 = event.evt.touches[1]

    if (touch1 && touch2) {
        is_shape_scaling = true
        if (stage.value.isDragging()) {
            stage.value.stopDrag()
        }
    }
}

function touchEndOnShape() {
    is_shape_scaling = false
}

function addAvatarNode(date_url: string) {
    const avatar_image = new window.Image()
    avatar_image.src = date_url
    const new_avatar_node = new Konva.Circle({
        x: (background_image.width - avatar_image.width) / 2,
        y: (background_image.height - avatar_image.height) / 2,
        radius: avatar_image.width / 2,
        fillPatternImage: avatar_image,
        fillPatternRepeat: 'no-repeat',
        fillPatternOffsetX: avatar_image.width / 2,
        fillPatternOffsetY: avatar_image.height / 2,
        draggable: true,
        name: `avatar_${avatar_node_id.get()}`,
        offsetX: - avatar_image.width / 2,
        offsetY: - avatar_image.height / 2
    })

    new_avatar_node.on('touchmove', touchMoveOnShape)
    new_avatar_node.on('touchend', touchEndOnShape)

    layer.value.add(
        new_avatar_node
    )
    // transformer.value.nodes([new_avatar_node])
    // updateRemoveButtonPosition()
    selected_node_name = new_avatar_node.name()
    updateTransformer()
}

function addShapeNode() {
    const SIZE: number = 100
    let new_shape_node: Konva.Shape | null = getShape(konva_node_store.shape_node.type, konva_node_store.shape_node.color, SIZE, `shape_${shape_node_id.get()}`)

    if (new_shape_node) {
        new_shape_node.position({
            x: background_image.width / 2 - SIZE,
            y: background_image.height / 2 - SIZE
        })
        new_shape_node.on('touchmove', touchMoveOnShape)
        new_shape_node.on('touchend', touchEndOnShape)

        layer.value.add(new_shape_node)
        // transformer.value.nodes([new_shape_node])
        // updateRemoveButtonPosition()
        selected_node_name = new_shape_node.name()
        updateTransformer()
    }
}

function saveImage() {
    const stage_node = stage.value.clone() as Konva.Stage
    const layer_node = stage_node.getLayers()[0] as Konva.Layer
    const transformer_node = stage_node.findOne('Transformer')
    const link = document.createElement('a')
    let min_x: number = 0
    let min_y: number = 0
    let max_x: number = 0
    let max_y: number = 0

    stage_node.scale({
        x: 1.0,
        y: 1.0
    })
    transformer_node?.destroy()

    for (let i = 0; i < layer_node.children!.length; i += 1) {
        const top_left_x: number = layer_node.children![i].absolutePosition().x
        const top_left_y: number = layer_node.children![i].absolutePosition().y
        const bottom_right_x: number = layer_node.children![i].absolutePosition().x + layer_node.children![i].width()
        const bottom_right_y: number = layer_node.children![i].absolutePosition().y + layer_node.children![i].height()

        if (i === 0) {
            min_x = top_left_x
            min_y = top_left_y
            max_x = bottom_right_x
            max_y = bottom_right_y
        } else {
            min_x = Math.min(min_x, top_left_x)
            min_y = Math.min(min_y, top_left_y)
            max_x = Math.max(max_x, bottom_right_x)
            max_y = Math.max(max_y, bottom_right_y)
        }
    }

    link.download = `berserk${'7'.repeat(save_id.get() + 1)}meta.png`
    link.href = stage_node.toDataURL({
        x: min_x,
        y: min_y,
        width: max_x - min_x,
        height: max_y - min_y
    })

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

function relocate() {
    stage.value.position({
        x: document.body.clientWidth > SMALL_SCREEN_WIDTH ? (document.querySelector<HTMLElement>('.aside')?.offsetWidth ?? 0) + INIT_PADDING : 0,
        y: document.body.clientWidth > SMALL_SCREEN_WIDTH ? INIT_PADDING : 0
    })
    stage.value.scale({
        x: 1.0,
        y: 1.0
    })
}

function changeZIndex(is_to_top: boolean) {
    if (selected_node_name === '') { return }

    const selected_node = stage.value.findOne(`.${selected_node_name}`)

    if (selected_node) {
        if (is_to_top) {
            selected_node.moveToTop()
        } else {
            const background_node = stage.value.findOne(`.${BACKGROUND_IMAGE_NAME}`)

            if (background_node) {
                selected_node.moveToBottom()
                background_node.moveToBottom()
            }
        }
    }

    updateTransformer()
}

function changeColor(color: string) {
    if (selected_node_name === '' || color === '') { return }

    const selected_node = stage.value.findOne(`.${selected_node_name}`)

    if (selected_node) {
        selected_node.setAttr('fill', color)
    }
}

onMounted(() => {
    const STROKE_WIDTH: number = 1
    const RED_COLOR: string = '#E76161'

    Konva.hitOnDragEnabled = true

    stage.value = new Konva.Stage(
        {
            container: 'stage',
            width: document.body.offsetWidth,
            height: document.body.offsetHeight,
            draggable: true
        }
    )
    layer.value = new Konva.Layer()
    transformer.value = new Konva.Transformer({
        centeredScaling: true,
        keepRatio: true
    })
    remove_button.value = new Konva.Circle({
        y: -50,
        radius: REMOVE_BUTTON_RADIUS,
        stroke: RED_COLOR,
        fill: 'white',
        strokeWidth: STROKE_WIDTH
    })
    remove_button_line.value = new Konva.Line({
        y: -50,
        points: [0, 0, REMOVE_BUTTON_RADIUS * 2, 0],
        stroke: RED_COLOR,
        strokeWidth: STROKE_WIDTH + 1
    })

    if (document.body.offsetWidth > SMALL_SCREEN_WIDTH) {
        stage.value.x((document.querySelector<HTMLElement>('.aside')?.offsetWidth ?? 0) + INIT_PADDING)
        stage.value.y(INIT_PADDING)
    }

    stage.value.on('wheel', scaleForWheel)
    stage.value.on('touchmove', scaleForTouch)
    stage.value.on('touchend', scaleForTouchEnd)
    stage.value.on('mousedown', selectNode)
    stage.value.on('touchstart', selectNode)
    transformer.value.on('transform', () => {
        updateRemoveButtonPosition()
    })
    remove_button.value.on('mouseenter', () => {
        stage.value.container().style.cursor = 'pointer'
    })
    remove_button.value.on('mouseleave', () => {
        stage.value.container().style.cursor = 'default'
    })
    remove_button.value.on('click', removeNode)
    remove_button.value.on('touchend', removeNode)
    remove_button_line.value.on('mouseenter', () => {
        stage.value.container().style.cursor = 'pointer'
    })
    remove_button_line.value.on('mouseleave', () => {
        stage.value.container().style.cursor = 'default'
    })
    remove_button_line.value.on('click', removeNode)
    remove_button_line.value.on('touchend', removeNode)

    transformer.value.add(remove_button.value)
    transformer.value.add(remove_button_line.value)
    layer.value.add(
        new Konva.Image({
            image: background_image,
            name: BACKGROUND_IMAGE_NAME
        })
    )
    layer.value.add(transformer.value)
    stage.value.add(layer.value)

    window.addEventListener('resize', updateStageSize)
})

onUnmounted(() => { window.removeEventListener('resize', updateStageSize) })

watch(() => konva_node_store.avatar_node, () => {
    if (konva_node_store.avatar_node && konva_node_store.avatar_node !== '') {
        addAvatarNode(konva_node_store.avatar_node)
        konva_node_store.avatar_node = ''
    }
})

watch(() => konva_node_store.is_trigger_add_shape_node, () => {
    if (konva_node_store.is_trigger_add_shape_node) {
        addShapeNode()
        konva_node_store.is_trigger_add_shape_node = false
    }
})

watch(() => konva_node_store.background_node, () => {
    if (konva_node_store.background_node && konva_node_store.background_node !== '') {
        replaceBackgroundNode(konva_node_store.background_node)
        konva_node_store.background_node = ''
    }
})

watch(() => konva_node_store.is_trigger_save_image, () => {
    if (konva_node_store.is_trigger_save_image) {
        saveImage()
        konva_node_store.is_trigger_save_image = false
    }
})

watch(() => konva_node_store.is_trigger_relocate, () => {
    if (konva_node_store.is_trigger_relocate) {
        relocate()
        konva_node_store.is_trigger_relocate = false
    }
})

watch(() => konva_node_store.is_trigger_change_z_index, () => {
    if (konva_node_store.is_trigger_change_z_index) {
        changeZIndex(konva_node_store.is_to_top)
        konva_node_store.is_trigger_change_z_index = false
    }
})

watch(() => konva_node_store.is_trigger_change_color, () => {
    if (konva_node_store.is_trigger_change_color) {
        changeColor(konva_node_store.changed_color)
        konva_node_store.is_trigger_change_color = false
    }
})
</script>

<template>
    <div id="stage">
    </div>
</template>

<style scoped lang="less">
#stage {
    overflow: hidden;
}
</style>

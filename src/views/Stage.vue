<script setup lang="ts">
import { useKonvaNodeStore } from '@/store/konva_node'
import { getShape } from '@/utils/shape'
import Konva from 'konva'
import { Ref, onMounted, onUnmounted, ref, watch } from 'vue'

type MyCoordinate = { x: number, y: number }

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
let last_dist: number = 0
let selected_node_name: string = ''

function getDistance(p1: MyCoordinate, p2: MyCoordinate): number {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function updateRemoveButtonPosition() {
    remove_button.value.x(transformer.value.width())
    remove_button_line.value.x(transformer.value.width() - REMOVE_BUTTON_RADIUS)
}

function scaleForWheel(event: Konva.KonvaEventObject<WheelEvent>) {
    const stage_node = stage.value.getStage()!
    const SCALE_PROC: number = 1.2
    const pointer = stage_node.getPointerPosition()!
    const relative_pointer: MyCoordinate = {
        x: pointer.x - stage_node.getAbsolutePosition().x,
        y: pointer.y - stage_node.getAbsolutePosition().y
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

    stage_node.absolutePosition({
        x: stage_node.getAbsolutePosition().x - relative_pointer.x * ((is_zoom_in ? SCALE_PROC : 1.0 / SCALE_PROC) - 1.0),
        y: stage_node.getAbsolutePosition().y - relative_pointer.y * ((is_zoom_in ? SCALE_PROC : 1.0 / SCALE_PROC) - 1.0)
    })

    updateRemoveButtonPosition()
}

function scaleForTouch(event: Konva.KonvaEventObject<TouchEvent>) {
    const touch1 = event.evt.touches[0]
    const touch2 = event.evt.touches[1]

    if (touch1 && touch2) {
        const cur_dist = getDistance(
            {
                x: touch1.clientX,
                y: touch1.clientY,
            },
            {
                x: touch2.clientX,
                y: touch2.clientY,
            }
        )
        const scale_proc = (stage.value.scale()!.x * cur_dist) / last_dist

        stage.value.scale({
            x: scale_proc,
            y: scale_proc
        })
        last_dist = cur_dist

        updateRemoveButtonPosition()
    }
}

function scaleForTouchEnd() {
    last_dist = 0
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
        updateTransformer()
        return
    }

    if (event.target.parent && event.target.parent.className === 'Transformer') {
        return
    }

    const name = event.target.name()

    if (name === BACKGROUND_IMAGE_NAME) {
        selected_node_name = ''
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

function addAvatarNode(date_url: string) {
    const avatar_image = new window.Image()
    avatar_image.src = date_url
    const new_avatar_node = new Konva.Circle({
        x: -avatar_image.width,
        y: -avatar_image.height,
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

    layer.value.add(
        new_avatar_node
    )
    transformer.value.nodes([new_avatar_node])
}

function addShapeNode() {
    const SIZE: number = 100
    let new_shape_node: Konva.Shape | null = getShape(konva_node_store.shape_node.type, konva_node_store.shape_node.color, SIZE, `shape_${shape_node_id.get()}`)

    if (new_shape_node) {
        new_shape_node.position({
            x: -SIZE * 2,
            y: -SIZE * 2
        })
        layer.value.add(new_shape_node)
        transformer.value.nodes([new_shape_node])
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
    transformer_node.destroy()

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

onMounted(() => {
    const STROKE_WIDTH: number = 1

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
        stroke: '#E76161',
        fill: 'white',
        strokeWidth: STROKE_WIDTH
    })
    remove_button_line.value = new Konva.Line({
        y: -50,
        points: [0, 0, REMOVE_BUTTON_RADIUS * 2, 0],
        stroke: '#E76161',
        strokeWidth: STROKE_WIDTH + 1
    })

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
    if (konva_node_store.avatar_node && konva_node_store.avatar_node != '') {
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
    if (konva_node_store.background_node && konva_node_store.background_node != '') {
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
</script>

<template>
    <div id="stage">
    </div>
</template>

<style scoped lang="less">
.stage {
    overflow: hidden;
}
</style>

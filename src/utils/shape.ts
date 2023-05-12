import { ShapeNode } from '@/store/konva_node'
import Konva from 'konva'

/**
 * Get a shape from the given type, color and size.
 * @param type - The type of shape. Including `star`, `heart`, `seven`, `fire`, `moon` and `halo`.
 */
function getShape(type: ShapeNode['type'], color: string, size: number, id: string = ''): Konva.Shape | null {
    const STROKE_COLOR: string = '#393646'
    const STROKE_WIDTH: number = 2

    switch (type) {
        case 'star':
            return new Konva.Star({
                numPoints: 5,
                outerRadius: size,
                innerRadius: size / 2,
                fill: color,
                stroke: STROKE_COLOR,
                strokeWidth: STROKE_WIDTH,
                draggable: true,
                name: id,
                offsetX: -size,
                offsetY: -size
            })
        case 'heart':
            return new Konva.Shape({
                width: size * 2,
                height: size * 2,
                fill: color,
                stroke: STROKE_COLOR,
                strokeWidth: STROKE_WIDTH,
                draggable: true,
                name: id,
                sceneFunc: (context, shape) => {
                    const SIZE_PROC: number = size / 18
                    let angle = 0
                    let cur_x = 0
                    let cur_y = 0

                    context.beginPath()
                    context.translate(size, size / 1.05)
                    context.scale(1, -1)

                    for (let i = 0; i < 20; i += 0.25) {
                        angle = i / Math.PI
                        cur_x = SIZE_PROC * (16 * Math.sin(angle) ** 3)
                        cur_y = SIZE_PROC * (13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle))
                        context.lineTo(cur_x, cur_y)
                    }

                    context.closePath()
                    context.fillStrokeShape(shape)
                }
            })
        case 'seven':
            return new Konva.Text({
                text: '7',
                width: size * 2,
                height: size * 2,
                fontSize: size * 2,
                fill: color,
                stroke: STROKE_COLOR,
                strokeWidth: STROKE_WIDTH,
                draggable: true,
                name: id,
                fontFamily: 'sans-serif',
                align: 'center',
                padding: size / 4
            })
        case 'fire':
            return new Konva.Shape({
                width: size * 2,
                height: size * 2,
                fill: color,
                stroke: STROKE_COLOR,
                strokeWidth: STROKE_WIDTH,
                draggable: true,
                name: id,
                sceneFunc: (context, shape) => {
                    const LENGTH: number = size * 2

                    context.beginPath()
                    context.moveTo(LENGTH / 2, 0)

                    context.quadraticCurveTo(LENGTH * 7 / 16, LENGTH / 2, LENGTH * 3 / 8, LENGTH / 2)
                    context.quadraticCurveTo(LENGTH * 5 / 16, LENGTH / 2, LENGTH / 4, LENGTH / 4)
                    context.quadraticCurveTo(LENGTH / 8, LENGTH * 5 / 8, LENGTH / 8, LENGTH * 3 / 4)

                    context.quadraticCurveTo(LENGTH / 8, LENGTH * 15 / 16, LENGTH / 2, LENGTH)
                    context.quadraticCurveTo(LENGTH * 7 / 8, LENGTH * 15 / 16, LENGTH * 7 / 8, LENGTH * 3 / 4)

                    context.quadraticCurveTo(LENGTH * 7 / 8, LENGTH * 5 / 8, LENGTH * 3 / 4, LENGTH / 4)
                    context.quadraticCurveTo(LENGTH * 11 / 16, LENGTH / 2, LENGTH * 5 / 8, LENGTH / 2)
                    context.quadraticCurveTo(LENGTH * 9 / 16, LENGTH / 2, LENGTH / 2, 0)

                    context.closePath()
                    context.fillStrokeShape(shape)
                }
            })
        case 'moon':
            return new Konva.Shape({
                width: size * 2,
                height: size * 2,
                fill: color,
                stroke: STROKE_COLOR,
                strokeWidth: STROKE_WIDTH,
                draggable: true,
                name: id,
                sceneFunc: (context, shape) => {
                    const SQRT_2_DIV_2: number = Math.sqrt(2) / 2
                    const RADIUS: number = size

                    context.beginPath()

                    for (let i = Math.PI / 4; i <= Math.PI * 7 / 4; i += 0.1) {
                        context.lineTo(
                            RADIUS * (1 + Math.cos(i)),
                            RADIUS * (1 - Math.sin(i))
                        )
                    }

                    for (let i = Math.PI * 3 / 2; i >= Math.PI / 2; i -= 0.1) {
                        context.lineTo(
                            (SQRT_2_DIV_2 + 1 + SQRT_2_DIV_2 * Math.cos(i)) * RADIUS,
                            RADIUS * (1 - SQRT_2_DIV_2 * Math.sin(i))
                        )
                    }

                    context.closePath()
                    context.fillStrokeShape(shape)
                }
            })
        case 'halo':
            return new Konva.Ring({
                outerRadius: size,
                innerRadius: size / 2,
                fill: color,
                stroke: STROKE_COLOR,
                strokeWidth: STROKE_WIDTH,
                draggable: true,
                name: id,
                offsetX: -size,
                offsetY: -size
            })
        default:
            break
    }

    return null
}

export { getShape }

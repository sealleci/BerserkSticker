import { defineStore } from 'pinia'

export type ShapeNode = {
    type: 'star' | 'heart' | 'seven' | 'fire' | 'moon' | 'halo' | ''
    color: string
}

interface KonvaNodeState {
    avatar_node: string
    background_node: string
    shape_node: ShapeNode
    is_trigger_add_shape_node: boolean
    is_trigger_save_image: boolean
    is_trigger_relocate: boolean
    is_trigger_change_z_index: boolean
    is_to_top: boolean,
    is_trigger_change_color: boolean
    changed_color: string
}

export const useKonvaNodeStore = defineStore(
    'konva_node',
    {
        state: (): KonvaNodeState => ({
            avatar_node: '',
            background_node: '',
            shape_node: {
                type: '',
                color: ''
            },
            is_trigger_add_shape_node: false,
            is_trigger_save_image: false,
            is_trigger_relocate: false,
            is_trigger_change_z_index: false,
            is_to_top: false,
            is_trigger_change_color: false,
            changed_color: ''
        })
    }
)

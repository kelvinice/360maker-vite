export interface DataModel {
    scenes: Scene[];
    setting: SettingModel;
    shortcuts: Shortcut[];
}

export interface Scene{
    id?: string
    name: string
    path: string
    description?: string
    markers: Marker[]
}

export interface MarkerData {
    type: string;
}

export interface MarkerDataLink extends MarkerData {
    url: string;
    text: string;
}

export interface MarkerDataImageSlider extends MarkerData {
    images: string[];
}

export interface Marker {
    id?: string
    type: string
    name: string
    location: {
        latitude: number
        longitude: number
    }
    targetSceneId?: string
    mediaPath?: string
    description?: string
    url?: string

    tooltip?: string
    size?: number
    customIcon?: string
    disableClick?: boolean
    backgroundColor?: string
    borderRadius?: number
    data?: MarkerData[];
}

export interface SettingModel {
    initialScene: string
    defaultMarkerSize: number
}

export interface ShortcutSceneMetadata {
    name: string
    sceneId: string
}

export interface Shortcut {
    id?: string
    name: string
    sceneId?: string
    children?: ShortcutSceneMetadata[]
}
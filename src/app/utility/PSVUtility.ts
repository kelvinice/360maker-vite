import {Marker, Scene} from "../models/DataModel";
import {Global} from "../data/Global";

export const updateMarkerOnCurrentScene = (data: Marker, scenes: Scene[], setScene: any) => {
    const scene = scenes.find((scene) => scene.id === Global.currentScene.id);
    if (scene) {
        //set marker in scene
        scene.markers = scene.markers.map((marker) => {
            if (marker.id === data.id) {
                return data;
            }
            return marker;
        });
    }
    const newSceneObject = [...scenes];
    setScene(newSceneObject);
    Global.currentScene = newSceneObject.find((scene) => scene.id === Global.currentScene.id) ?? Global.currentScene;
}
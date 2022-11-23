import {Viewer} from "photo-sphere-viewer";
import {Scene, SettingModel} from "../models/DataModel";

export class Global{
    public static viewer: Viewer;
    public static currentScene: Scene;
    public static firstLoad = true;
    public static setting: SettingModel;
}
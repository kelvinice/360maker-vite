import {atomWithStorage} from "jotai/utils";
import {JotaiConstant} from "../constants/JotaiConstant";
import {Marker, Scene, SettingModel, Shortcut} from "../models/DataModel";
import {atom} from "jotai";
import {MouseState} from "../constants/MouseState";

export const dataScenesAtom = atomWithStorage<Scene[]|undefined>(JotaiConstant.scenes, undefined);
export const settingsAtom = atomWithStorage<SettingModel|undefined>(JotaiConstant.setting, undefined);
export const shortcutsAtom = atomWithStorage<Shortcut[]|undefined>(JotaiConstant.shortcuts, undefined);
export const mouseStateAtom = atom<MouseState>(MouseState.Cursor);
// export const currentSceneAtom = atom<Scene|undefined>(undefined);
export const sceneHistoryAtom = atom<Scene[]>([]);
export const markerToCopyAtom = atom<Marker|undefined>(undefined);
export const isEditorAtom = atom<boolean>(false);
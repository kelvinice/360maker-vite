import ViewSceneModal from "../core/scenes/view/ViewSceneModal";
import AddSceneModal from "../core/scenes/add/AddSceneModal";
import ConfigMarkerModal from "../core/markers/modal/ConfigMarkerModal";
import React from "react";
import SettingModal from "../core/settings/modal/SettingModal";
import { useMenu } from "../providers/MenuProvider";
import RenderStuffModal from "./ui/modal/RenderStuffModal";
import DataImportModal from "./data/DataImportModal";
import ViewVideoModal from "./media/ViewVideoModal";
import ViewImageModal from "./media/ViewImageModal";
import ViewShortcutModal from "../core/shortcuts/view/ViewShortcutModal";
import ManageShortcutModal from "../core/shortcuts/manage/ManageShortcutModal";
import ViewCustomMarkerModal from "./custom-marker/ViewCustomMarkerModal";

const ModalWrapper = () => {
    const {markerToConfig, VRSceneToView} = useMenu();

    return (
        <>
            {VRSceneToView && <RenderStuffModal/>}
            <ViewSceneModal />
            <AddSceneModal />
            {markerToConfig && <ConfigMarkerModal />}
            <ViewShortcutModal />
            <ManageShortcutModal />
            <SettingModal />
            <DataImportModal />
            <ViewCustomMarkerModal />
            <ViewVideoModal />
            <ViewImageModal />
        </>
    )
}

export default ModalWrapper;
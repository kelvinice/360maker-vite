import React, {useState} from 'react'
import {ChildButton, FloatingMenu, MainButton} from "react-floating-button-menu";
import {Close, Add, Save, CloudUpload, AddAPhoto, Mouse, Settings, Bookmarks} from "@material-ui/icons";
import {useMenu} from "../../../providers/MenuProvider";
import {DataModel} from "../../../models/DataModel";
import {useAtom} from "jotai";
import {dataScenesAtom, settingsAtom, shortcutsAtom} from "../../../atoms/DataAtom";

export const FloatingButton = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {setModalViewScene, setModalSetting, setMarkerNavigationOpen, setModalImport, setModalShortcut} = useMenu();
    const [scenes,] = useAtom(dataScenesAtom);
    const [setting,] = useAtom(settingsAtom);
    const [shortcuts,] = useAtom(shortcutsAtom);

    const mainSize = 56;
    const childSize = 40;
    const buttonBackgroundColor = "#1266f1";

    const exportData = async () => {
        const data: DataModel = {
            scenes: scenes,
            setting: setting,
            shortcuts: shortcuts,
        } as DataModel;
        const json = JSON.stringify(data);
        const blob = new Blob([json], {type: "application/json"});
        const href = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = href;
        link.download = "data.json";
        document.body.appendChild(link);
        link.click();
    }

    return (
    <FloatingMenu
    slideSpeed={500}
    spacing={8}
    isOpen={isOpen}
    // @ts-ignore
    direction={"down"}
    className={"text-white ripple ripple-surface ripple-surface-light p-2"}
  >
    <MainButton
        iconResting={<Add htmlColor={"white"} />}
        iconActive={<Close htmlColor={"white"} />}
        onClick={() => setIsOpen(!isOpen)}
        size={mainSize}
        background={buttonBackgroundColor}
        />
        <ChildButton
            icon={<AddAPhoto />}
            size={childSize}
            onClick={() => setModalViewScene(true)}
            background={buttonBackgroundColor}
        />
        <ChildButton
            icon={<Bookmarks />}
            size={childSize}
            onClick={() => setModalShortcut(true)}
            background={buttonBackgroundColor}
        />
        <ChildButton
            icon={<Mouse />}
            size={childSize}
            onClick={() => setMarkerNavigationOpen(true)}
            background={buttonBackgroundColor}
        />
        <ChildButton
            icon={<Settings />}
            size={childSize}
            onClick={() => setModalSetting(true)}
            background={buttonBackgroundColor}
        />
        <ChildButton
            icon={<CloudUpload />}
            size={childSize}
            onClick={() => setModalImport(true)}
            background={buttonBackgroundColor}
        />
        <ChildButton
            icon={<Save />}
            size={childSize}
            onClick={() => exportData()}
            background={buttonBackgroundColor}
        />

    </FloatingMenu>
  )
}

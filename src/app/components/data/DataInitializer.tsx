import React, {FC, useEffect, useState} from "react";
import {WithChildren} from "../../types/WithChildren";
import {useAtom} from "jotai";
import {dataScenesAtom, isEditorAtom, settingsAtom, shortcutsAtom} from "../../atoms/DataAtom";
import {getURLParameter, tryParseJSON} from "../../utility/Utility";
import {initialDataScene, initialDataSetting, initialDataShortcut} from "../../data/InitialData";
import FileManagement from "../../core/files/FileManagement";

const DataInitializer:FC<WithChildren> = ({children}) => {
    const [ready, setReady] = useState(false);
    const [scene, setScene] = useAtom(dataScenesAtom);
    const [setting, setSetting] = useAtom(settingsAtom);
    const [, setShortcuts] = useAtom(shortcutsAtom);
    const [, setIsEditorMode] = useAtom(isEditorAtom);
    let firstLoad = true;

    const init = async () => {
        const edit = getURLParameter("edit");
        const is_dev:boolean = edit === "1";
        const dataPath = "data.json";
        setIsEditorMode(is_dev);
        if(is_dev && scene && setting){
            return;
        }

        if(!dataPath){
            setScene(initialDataScene);
            setSetting(initialDataSetting);
            setShortcuts(initialDataShortcut);
            return;
        }
        try {
            const res = await FileManagement.readFile(dataPath);
            const file = await res.text();
            if(res.status === 200){
                const data = tryParseJSON(file);
                if(!data){
                    throw new Error("Invalid JSON");
                }
                setScene(data.scenes);
                setSetting(data.setting);
                data.shortcuts ? setShortcuts(data.shortcuts) : setShortcuts(initialDataShortcut);
            }
        }catch (e) {
            console.error(e);
            setReady(true);
        }
    }

    useEffect(() => {
        if(!scene || !setting)
            return;
        setReady(true);
    }, [scene, setting]);

    useEffect(() => {
        if (firstLoad && !ready) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            firstLoad = false;
            init().then();
        }
    }, []);

    return (
        <>
            {ready && children}
        </>
    )
}

export default DataInitializer;
import React from 'react';

import clsx from "clsx";
import {MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBDropdown, MDBBtn} from "mdb-react-ui-kit";
import {useAtom} from "jotai";
import {dataScenesAtom, shortcutsAtom} from "../../atoms/DataAtom";
import {changeScene} from "../../core/PhotoSphereViewer";
import toast from "react-hot-toast";

const ShortcutWrapper = () => {
    const [shortcuts, ] = useAtom(shortcutsAtom);
    const [scenes, ] = useAtom(dataScenesAtom);

    if(!shortcuts) return <></>;

    const handleChangeScene = (sceneId: string) => {
        const scene = scenes?.find(scene => scene.id === sceneId);
        if(scene) changeScene(scene);
        else toast.error("Scene not found");
    }

    return (
        <div className="w-100 overflow-auto d-flex mx-3" >
            {
                shortcuts.map((shortcut, index) => (
                    shortcut.children && shortcut.children.length > 0 ? (
                        <MDBDropdown key={index} className={clsx({
                            "ms-auto": index === 0,
                            "me-auto": index === shortcuts.length - 1,
                        }, "position-static")} dropup={true}>
                            <MDBDropdownToggle className={clsx("p-2 rounded-1 btn btn-lg btn-info text-nowrap m-1")}>
                                {shortcut.name}
                            </MDBDropdownToggle>
                            <MDBDropdownMenu className="overflow-auto bg-white" style={{maxHeight:"500px"}}>
                                {
                                    shortcut.children.map((child, index) => (
                                        <MDBDropdownItem link key={index} className={"flat-a m-1"}>
                                            <MDBBtn rippleRadius={100} rippleUnbound onClick={()=>handleChangeScene(child.sceneId)} className="p-2 rounded-1 btn btn-lg btn-info text-wrap w-100">
                                                {child.name}
                                            </MDBBtn>
                                        </MDBDropdownItem>
                                    ))
                                }
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    ) : (
                        <MDBBtn rippleRadius={100} rippleUnbound type="button" onClick={()=>handleChangeScene(shortcut.sceneId as string)} data-mdb-ripple-color="light" className={clsx({
                            "ms-auto": index === 0,
                            "me-auto": index === shortcuts.length - 1,
                        }, "p-2 rounded-1 btn btn-lg btn-info text-nowrap m-1")} key={index}>
                            {shortcut.name}
                        </MDBBtn>

                    )
                ))
            }
        </div>
    );
};

export default ShortcutWrapper;
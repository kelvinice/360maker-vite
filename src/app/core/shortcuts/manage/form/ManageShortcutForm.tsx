import React, {useEffect, useState} from 'react';
import {MDBBtn, MDBModalBody, MDBModalFooter} from "mdb-react-ui-kit";
import {useForm} from "react-hook-form";
import {Shortcut, ShortcutSceneMetadata} from "../../../../models/DataModel";
import {dataScenesAtom, shortcutsAtom} from "../../../../atoms/DataAtom";
import {useAtom} from "jotai";
import Select from "react-select";
import {generateUUID, isNullUndefinedOrEmpty} from "../../../../utility/Utility";
import toast from "react-hot-toast";
import {useMenu} from "../../../../providers/MenuProvider";

const ManageShortcutForm = () => {
    const {register, handleSubmit, reset, formState: {errors}, setValue, watch} = useForm<Shortcut>();
    const [scenes,] = useAtom(dataScenesAtom);
    const [shortcuts, setShortcuts] = useAtom(shortcutsAtom);
    const [children, setChildren] = useState<ShortcutSceneMetadata[]>([]);
    const {setShortcutIdToManage, shortcutIdToManage} = useMenu();

    const validate = (data: Shortcut) => {
        if (isNullUndefinedOrEmpty(data.sceneId) && children.length === 0) {
            toast.error("Please select a scene");
            return false;
        }
        if (isNullUndefinedOrEmpty(data.name)) {
            toast.error("Please enter a name");
            return false;
        }
        for (const child of children) {
            if (isNullUndefinedOrEmpty(child.sceneId)) {
                toast.error("Please select a scene for all children");
                return false;
            }
            if(isNullUndefinedOrEmpty(child.name)) {
                toast.error("Please enter a name for all children");
                return false;
            }
            const scene = scenes?.find((scene) => scene.id === child.sceneId);
            if (scene === undefined) {
                toast.error(`"Scene of child ${child.name} not found"`);
                return false;
            }
        }
        return true;
    }

    const changeChildPosition = (index: number, direction: "up" | "down") => {
        const newChildren = [...children];
        const child = newChildren[index];
        newChildren.splice(index, 1);
        if (direction === "up") {
            newChildren.splice(index - 1, 0, child);
        } else {
            newChildren.splice(index + 1, 0, child);
        }
        setChildren(newChildren);
    }

    useEffect(() => {
        reset({});
        if (shortcutIdToManage === null || shortcuts === undefined)
            return;
        const shortcut = shortcuts?.find((shortcut) => shortcut.id === shortcutIdToManage);

        if (shortcut === undefined) {
            reset({});
            setChildren([]);
            return;
        }

        reset(shortcut);
        setChildren(shortcut.children || []);
    }, [shortcuts, shortcutIdToManage]);

    const submit = (data: Shortcut) => {
        if(!shortcuts || !validate(data)) {
            return;
        }

        const shortcut: Shortcut = {
            id: generateUUID(),
            name: data.name,
            sceneId: data.sceneId,
            children: children
        }
        if(shortcutIdToManage === "") {
            setShortcuts([...shortcuts, shortcut]);
        }else{
            const index = shortcuts.findIndex((shortcut) => shortcut.id === shortcutIdToManage);
            const newShortcuts = [...shortcuts];
            newShortcuts[index] = shortcut;
            setShortcuts(newShortcuts);
        }
        reset();
        setChildren([]);
        setShortcutIdToManage(null);
        toast.success("Shortcut created");
    }

    const addChildren = () => {
        setChildren([...children, {sceneId: generateUUID(), name: ""}]);
    }

    const removeChildren = (index: number) => {
        const newChildren = [...children];
        newChildren.splice(index, 1);
        setChildren(newChildren);
    }

    const handleChildrenChange = (index: number, value: any) => {
        const newChildren = [...children];
        newChildren[index] = value;
        setChildren(newChildren);
    }

    if(!scenes || shortcutIdToManage === null || (shortcutIdToManage !== "" && watch("id") === undefined))
        return <></>


    return (
        <>
            <MDBModalBody>
                <form>
                    <div className="form-group mb-2">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" placeholder="Enter name" {...register("name", {required: true})}/>
                        {
                            errors.name && <div className="text-danger">This field is required</div>
                        }
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="path">Scene</label>
                        <Select className="form-control" id="sceneId" isDisabled={children.length > 0}
                                options={scenes?.map((scene) => ({value: scene.id as string, label: scene.name}))}
                                defaultValue={{
                                    value: scenes?.find((scene) => scene.id === watch('sceneId'))?.id,
                                    label: scenes?.find((scene) => scene.id === watch('sceneId'))?.name
                                }}
                                onChange={(e) => {
                                    setValue("sceneId", e?.value as string);
                                }}
                        />
                        {
                            children.length > 0 && <div className="text-info">You can't change the scene if the shortcut have children, this shortcut will automatically converted into drop menu.</div>
                        }
                    </div>


                </form>
                <div className="mt-3">
                    <h5>Children</h5>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Scene</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            children.map((child, index) => (
                                <tr key={index}>
                                    <td>{
                                        <input type="text" className="form-control" id="name" placeholder="Enter name" value={children[index].name} onChange={
                                            (e) => {
                                                handleChildrenChange(index, {...children[index], name: e.target.value});
                                            }
                                        }/>
                                    }</td>
                                    <td>{
                                        <Select className="form-control" id="sceneId"
                                            options={scenes?.map((scene) => ({value: scene.id as string, label: scene.name}))}
                                            defaultValue={{
                                                value: child.sceneId,
                                                label: scenes?.find((scene) => scene.id === child.sceneId)?.name
                                            }}
                                            onChange={(e) => {
                                                handleChildrenChange(index, {...children[index], sceneId: e?.value as string});
                                            }}
                                        />
                                    }</td>
                                    <td>
                                        <div className={"d-flex gap-1"}>
                                            <MDBBtn color="danger" className={"fs-6"} onClick={() => removeChildren(index)}>
                                                <i className="fas fa-trash"/>
                                            </MDBBtn>
                                            <MDBBtn color="warning" className={"fs-6"} onClick={() => changeChildPosition(index, "up")} disabled={index === 0}>
                                                <i className="fas fa-arrow-up"/>
                                            </MDBBtn>
                                            <MDBBtn color="warning" className={"fs-6"} onClick={() => changeChildPosition(index, "down")} disabled={index === children.length - 1}>
                                                <i className="fas fa-arrow-down"/>
                                            </MDBBtn>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    <MDBBtn color="secondary" onClick={addChildren}>Add Child</MDBBtn>
                </div>
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color="primary" onClick={handleSubmit(submit)}>Save</MDBBtn>
            </MDBModalFooter>
        </>
    );
};

export default ManageShortcutForm;

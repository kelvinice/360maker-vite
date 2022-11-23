import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {MDBBtn, MDBModalBody, MDBModalFooter} from "mdb-react-ui-kit";
import {Scene} from "../../../../models/DataModel";
import {useAtom} from "jotai";
import {dataScenesAtom} from "../../../../atoms/DataAtom";
import toast from "react-hot-toast";
import {useMenu} from "../../../../providers/MenuProvider";
import {generateUUID} from "../../../../utility/Utility";

const ManageSceneModalForm = () => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm<Scene>();
    const {setSceneToManage, sceneToManage} = useMenu();
    const [scenes, setScenes] = useAtom(dataScenesAtom);

    useEffect(() => {
        reset({});
        if(!scenes || sceneToManage === null) {
            return;
        }
        const scene = scenes.find(scene => scene.id === sceneToManage);
        if(scene) {
            reset(scene);
        }
    }, [reset, sceneToManage, scenes]);

    const submit = (data: Scene) => {
        if(sceneToManage === null)
            return;
        if(sceneToManage === ""){
            data.id = generateUUID();
            data.markers = [];
            if(scenes)
                setScenes([...scenes, data]);
            toast.success("Scene added");
        }else{
            if(scenes)
                setScenes(scenes.map(scene => scene.id === sceneToManage ? data : scene));
            toast.success("Scene updated");
        }

        setSceneToManage(null);
        reset();
    }

    if(sceneToManage === null){
        return <></>;
    }

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
                        <label htmlFor="path">Path</label>
                        <input type="text" className="form-control" id="path" placeholder="Enter path" {...register("path", {required: true})}/>
                        {
                            errors.path && <div className="text-danger">This field is required</div>
                        }
                    </div>
                </form>
            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn onClick={handleSubmit(submit)}>Save changes</MDBBtn>
            </MDBModalFooter>
        </>
    );
};

export default ManageSceneModalForm;
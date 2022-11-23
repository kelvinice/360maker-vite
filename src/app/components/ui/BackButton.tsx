import React from 'react';
import {ArrowBack} from "@material-ui/icons";
import {MDBBtn} from "mdb-react-ui-kit";
import {useAtom} from "jotai";
import {sceneHistoryAtom} from "../../atoms/DataAtom";
import {changeScene} from "../../core/PhotoSphereViewer";

const BackButton = () => {
    const [sceneHistory, setSceneHistory] = useAtom(sceneHistoryAtom);

    const changeSceneToPreviousScene = () => {
        const lastScene = sceneHistory.pop();
        if(lastScene) {
            changeScene(lastScene);
            setSceneHistory([...sceneHistory]);
        }
    }

    return (
        <>
            {sceneHistory.length > 0 &&
                <MDBBtn className="m-2 btn btn-success btn-lg rounded-circle opacity-50 d-flex justify-content-center align-items-center" style={{width:"50px", height:"50px"}}
                        onClick={()=>changeSceneToPreviousScene()}>
                    <ArrowBack  />
                </MDBBtn>
            }
        </>
    );
};

export default BackButton;
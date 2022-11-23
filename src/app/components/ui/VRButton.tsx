import React from 'react';
import {Global} from "../../data/Global";
import {MDBBtn} from "mdb-react-ui-kit";

const VrButton = () => {
    const openLinkInNewTab = (url: string) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null;
    }

    return (
        <MDBBtn className="m-2 btn btn-secondary btn-lg rounded-circle opacity-50 d-flex justify-content-center align-items-center" style={{width:"50px", height:"50px"}}
                onClick={()=>openLinkInNewTab(`/vr/vr.php?url=${Global.currentScene.path}`)}>
            <i className="fa fa-vr-cardboard" style={{fontSize:"20px"}}/>
        </MDBBtn>
    );
};

export default VrButton;
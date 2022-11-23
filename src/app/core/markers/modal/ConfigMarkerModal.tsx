import React from 'react';
import {
    MDBBtn, MDBModal,
    MDBModalContent,
    MDBModalDialog,
    MDBModalHeader,
    MDBModalTitle
} from "mdb-react-ui-kit";
import {useMenu} from "../../../providers/MenuProvider";
import MarkerConfigParent from "./parent/MarkerConfigParent";

const ConfigMarkerModal = () => {
    const {markerToConfig, setMarkerToConfig} = useMenu();

    return (
        <>
            <MDBModal staticBackdrop show={markerToConfig !== null} tabIndex='-1'>
                <MDBModalDialog size={"lg"}>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Marker</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={()=>setMarkerToConfig(null)}></MDBBtn>
                        </MDBModalHeader>
                        <MarkerConfigParent/>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
};

export default ConfigMarkerModal;
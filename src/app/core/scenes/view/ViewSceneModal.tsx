import React from 'react';
import {useMenu} from "../../../providers/MenuProvider";
import {
    MDBBtn,
    MDBModal, MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle
} from "mdb-react-ui-kit";
import ViewSceneTable from "./table/ViewSceneTable";

const ViewSceneModal = () => {
    const {setModalViewScene, modalViewScene, setSceneToManage, sceneToManage} = useMenu();

    const toggleShow = () => {
        setModalViewScene(!modalViewScene);
    }

    return (
        <>
            <MDBModal staticBackdrop show={modalViewScene && sceneToManage === null} tabIndex='-1'>
                <MDBModalDialog size={"xl"} scrollable={true}>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Scene</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <ViewSceneTable />
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='primary' onClick={()=>setSceneToManage("")}>Add Scene</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

        </>
    );
};

export default ViewSceneModal;
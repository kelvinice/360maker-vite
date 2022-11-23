import React from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog, MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle
} from "mdb-react-ui-kit";
import {useMenu} from "../../../providers/MenuProvider";
import ViewShortcutTable from "./table/ViewShortcutTable";

const ViewShortcutModal = () => {
    const {modalShortcut, setModalShortcut, setShortcutIdToManage, shortcutIdToManage} = useMenu();

    return (
        <>
            <MDBModal staticBackdrop show={modalShortcut && shortcutIdToManage === null} tabIndex='-1'>
                <MDBModalDialog size={"lg"} scrollable={true}>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Shortcut</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={()=>setModalShortcut(false)}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <ViewShortcutTable />
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='primary' onClick={()=>setShortcutIdToManage("")}>Add Shortcut</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
};

export default ViewShortcutModal;
import React from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalContent,
    MDBModalDialog,
    MDBModalHeader,
    MDBModalTitle
} from "mdb-react-ui-kit";
import {useMenu} from "../../../providers/MenuProvider";
import ManageShortcutForm from "./form/ManageShortcutForm";

const ManageShortcutModal = () => {
    const {shortcutIdToManage, setShortcutIdToManage} = useMenu();

    return (
        <MDBModal staticBackdrop show={shortcutIdToManage !== null} tabIndex='-1'>
            <MDBModalDialog size={"xl"}>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Manage Shortcut</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={()=>setShortcutIdToManage(null)}></MDBBtn>
                    </MDBModalHeader>
                    <ManageShortcutForm />
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
};

export default ManageShortcutModal;
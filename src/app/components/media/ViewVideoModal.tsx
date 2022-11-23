import React from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalHeader,
    MDBModalTitle
} from "mdb-react-ui-kit";
import {useMenu} from "../../providers/MenuProvider";

const ViewVideoModal = () => {
    const {videoToView, setVideoToView}= useMenu();

    return (
        <>
            {
                videoToView &&
                <MDBModal staticBackdrop={true} show={true} tabIndex='-1'>
                    <MDBModalDialog size={"lg"}>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>Media</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={()=>setVideoToView(null)}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>
                                <video width="100%" height="100%" controls autoPlay={true} >
                                    <source src={videoToView} type="video/mp4" />
                                </video>
                            </MDBModalBody>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
            }
        </>
    );
};

export default ViewVideoModal;

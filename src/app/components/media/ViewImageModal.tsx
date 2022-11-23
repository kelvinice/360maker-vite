import React from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalHeader,
    MDBModalTitle, MDBRipple
} from "mdb-react-ui-kit";
import {useMenu} from "../../providers/MenuProvider";
import LazyImage from "../lazy-image/LazyImage";

const ViewVideoModal = () => {
    const {imageToView, setImageToView}= useMenu();

    return (
        <>
            <MDBModal staticBackdrop={true} show={imageToView !== null} tabIndex='-1'>
                <MDBModalDialog size={"lg"}>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Media</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={()=>setImageToView(null)}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            {
                                imageToView && <MDBRipple rippleTag='span' rippleColor="light" className={"w-100"} rippleDuration={1500}>
                                    <LazyImage src={imageToView} alt={imageToView} width={"100%"} height={"500px"} />
                                </MDBRipple>
                            }
                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
};

export default ViewVideoModal;

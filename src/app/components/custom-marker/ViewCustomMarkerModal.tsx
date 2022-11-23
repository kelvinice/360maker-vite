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
import {CustomMarkerDataType} from "../../core/markers/modal/custom-marker/Models";
import ButtonLinkCustomMarkerData from "./button-link/ButtonLinkCustomMarkerData";
import {MarkerData} from "../../models/DataModel";
import ImageSliderCustomMarkerData from "./image-slider/ImageSliderCustomMarkerData";

export interface CustomMarkerDataProps {
    markerData: MarkerData;
}

const ViewCustomMarkerModal = () => {
    const {customMarkerToView, setCustomMarkerToView} = useMenu();

    return (
        <MDBModal staticBackdrop show={customMarkerToView !== null && customMarkerToView.data && customMarkerToView.data.length > 0} tabIndex="-1">
            <MDBModalDialog className="modal-dialog-centered modal-lg"
                role="document">
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>{customMarkerToView?.tooltip}</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={()=>setCustomMarkerToView(null)}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                        {
                            customMarkerToView?.data?.map((item, index) => {
                                return (
                                    <div key={index} className="mb-2">
                                        {item.type === CustomMarkerDataType.buttonLink.code && <ButtonLinkCustomMarkerData markerData={item}/>}
                                        {item.type === CustomMarkerDataType.slideImage.code && <ImageSliderCustomMarkerData markerData={item}/>}
                                    </div>
                                )
                            })
                        }
                    </MDBModalBody>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
};

export default ViewCustomMarkerModal;
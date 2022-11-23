import React, {FC} from 'react';
import {MarkerDataLink} from "../../../models/DataModel";
import {CustomMarkerDataProps} from "../ViewCustomMarkerModal";
import {MDBBtn} from "mdb-react-ui-kit";

const ButtonLinkCustomMarkerData: FC<CustomMarkerDataProps> = ({markerData}) => {
    const data = markerData as MarkerDataLink;

    return (
        <div className="d-flex justify-content-center">
            <MDBBtn href={data.url} target="_blank" color="primary" size={"lg"}>{data.text}</MDBBtn>
        </div>
    );
};

export default ButtonLinkCustomMarkerData;
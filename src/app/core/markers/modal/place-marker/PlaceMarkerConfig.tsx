import React, {FC} from 'react';
import PlaceConfigMarkerForm from "./form/PlaceConfigMarkerForm";
import {ConfigMarkerModalChildProps} from "../parent/MarkerConfigParent";

const PlaceMarkerConfig: FC<ConfigMarkerModalChildProps> = ({props}) => {
    return (
        <>
            <PlaceConfigMarkerForm props={props} />
        </>
    );
};

export default PlaceMarkerConfig;
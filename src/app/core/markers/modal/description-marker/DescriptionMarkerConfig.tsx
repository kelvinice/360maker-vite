import React, {FC} from 'react';
import DescriptionConfigMarkerForm from "./form/DescriptionConfigMarkerForm";
import {ConfigMarkerModalChildProps} from "../parent/MarkerConfigParent";

const DescriptionMarkerConfig: FC<ConfigMarkerModalChildProps> = ({props}) => {

    return (
        <>
            <DescriptionConfigMarkerForm props={props} />
        </>
    );
};

export default DescriptionMarkerConfig;
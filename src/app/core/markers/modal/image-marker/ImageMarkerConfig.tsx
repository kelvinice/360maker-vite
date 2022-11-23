import React, {FC} from 'react';
import ImageConfigMarkerForm from "./form/ImageConfigMarkerForm";
import {ConfigMarkerModalChildProps} from "../parent/MarkerConfigParent";

const ImageMarkerConfig: FC<ConfigMarkerModalChildProps> = ({props}) => {
    return (
        <>
            <ImageConfigMarkerForm props={props} />
        </>
    );
};

export default ImageMarkerConfig;
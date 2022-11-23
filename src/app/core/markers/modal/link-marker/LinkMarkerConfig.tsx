import React, {FC} from 'react';
import {ConfigMarkerModalChildProps} from "../parent/MarkerConfigParent";
import LinkMarkerConfigForm from "./form/LinkMarkerConfigForm";

const LinkMarkerConfig: FC<ConfigMarkerModalChildProps> = ({props}) => {
    return (
        <>
            <LinkMarkerConfigForm props={props} />
        </>
    );
};

export default LinkMarkerConfig;
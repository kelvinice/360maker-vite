import React, {FC} from 'react';
import {ConfigMarkerModalChildProps} from "../parent/MarkerConfigParent";
import GeneralMarkerSettingForm from "./form/GeneralMarkerSettingForm";

const GeneralMarkerSetting: FC<ConfigMarkerModalChildProps> = ({props}) => {
    return (
        <>
            <GeneralMarkerSettingForm props={props} />
        </>
    );
};

export default GeneralMarkerSetting;
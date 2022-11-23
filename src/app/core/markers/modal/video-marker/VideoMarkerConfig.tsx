import React, {FC} from 'react';
import VideoConfigMarkerForm from "./form/VideoConfigMarkerForm";
import {ConfigMarkerModalChildProps} from "../parent/MarkerConfigParent";

const VideoMarkerConfig: FC<ConfigMarkerModalChildProps> = ({props}) => {
    return (
        <>
            <VideoConfigMarkerForm props={props} />
        </>
    );
};

export default VideoMarkerConfig;
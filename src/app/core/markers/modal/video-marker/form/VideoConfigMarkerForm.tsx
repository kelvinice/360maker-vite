import React, {FC} from 'react';
import {ConfigMarkerModalChildProps} from "../../parent/MarkerConfigParent";

const VideoConfigMarkerForm: FC<ConfigMarkerModalChildProps> = ({props}) => {
    return (
        <form>
            <div className="form-group mb-3">
                <label htmlFor="targetSceneId" className="fw-bold">Media Path</label>
                <input type="text" className="form-control" id="mediaPath" {...props.register("mediaPath")} />
            </div>
        </form>
    );
};

export default VideoConfigMarkerForm;
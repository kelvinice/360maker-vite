import React, {FC} from 'react';
import {ConfigMarkerModalChildProps} from "../../parent/MarkerConfigParent";

const LinkMarkerConfigForm: FC<ConfigMarkerModalChildProps> = ({props}) => {
    return (
        <form>
            <div className="form-group mb-3">
                <label htmlFor="url" className="fw-bold">URL</label>
                <input type="text" className="form-control" id="url" {...props.register("url")} />
            </div>
        </form>
    );
};

export default LinkMarkerConfigForm;
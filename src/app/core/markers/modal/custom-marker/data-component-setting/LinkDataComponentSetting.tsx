import React, {FC, useEffect} from 'react';
import {CustomMarkerConfigProps} from "../CustomMarkerConfig";
import {MarkerDataLink} from "../../../../../models/DataModel";

const LinkDataComponentSetting: FC<CustomMarkerConfigProps> = ({props}) => {
    const data = props.markerData as MarkerDataLink;


    
    useEffect(() => {
        if (data.url === undefined || data.url=== null) {
            props.changeMarkerDataOnIndex(props.index, {...data, url: "", text: ""} as MarkerDataLink);
        }
    },  [data]);

    if(data.url === undefined){
        return null;
    }

    return (
        <div className={"form-group"}>
            <div className={"input-group"}>
                <label className={"input-group-text"}>URL</label>
                <input type={"text"} className={"form-control"} placeholder={"URL"} value={data.url}
                   onChange={(e)=>props.changeMarkerDataOnIndex(props.index, {...data, url: e.target.value} as MarkerDataLink)}
                />
            </div>
            <div className={"input-group"}>
                <label className={"input-group-text"}>Text</label>
                <input type={"text"} className={"form-control"} placeholder={"Text"} value={data.text}
                     onChange={(e)=>props.changeMarkerDataOnIndex(props.index, {...data, text: e.target.value} as MarkerDataLink)}
                />
            </div>
        </div>
    );
};

export default LinkDataComponentSetting;
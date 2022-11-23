import React, {FC} from 'react';
import {useAtom} from "jotai";
import {dataScenesAtom} from "../../../../../atoms/DataAtom";
import { useMenu } from '../../../../../providers/MenuProvider';
import Select from 'react-select';
import {ConfigMarkerModalChildProps} from "../../parent/MarkerConfigParent";

const PlaceConfigMarkerForm: FC<ConfigMarkerModalChildProps> = ({props}) => {
    const [scenes] = useAtom(dataScenesAtom);
    const {markerToConfig} = useMenu();

    return (
        <form>
            <div className="form-group mb-3">
                <label htmlFor="targetSceneId" className="fw-bold">Target Scene</label>
                <Select className="form-control" id="targetSceneId"
                    options={scenes?.map((scene) => ({value: scene.id, label: scene.name}))}
                    defaultValue={{
                        value: markerToConfig?.targetSceneId, 
                        label: scenes?.find((scene) => scene.id === markerToConfig?.targetSceneId)?.name
                    }}
                    onChange={(e) => {
                        props.setValue("targetSceneId", e?.value as string);
                    }}
                    />
            </div>
        </form>
    );
};

export default PlaceConfigMarkerForm;
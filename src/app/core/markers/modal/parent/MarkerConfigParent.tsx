import React, {useEffect, useState} from 'react';
import {useAtom} from "jotai";
import {dataScenesAtom} from "../../../../atoms/DataAtom";
import {useForm, UseFormHandleSubmit, UseFormRegister, UseFormSetValue, UseFormWatch} from "react-hook-form";
import {Marker} from "../../../../models/DataModel";
import {useMenu} from "../../../../providers/MenuProvider";
import {Global} from "../../../../data/Global";
import {updateMarkerOnCurrentScene} from "../../../../utility/PSVUtility";
import toast from "react-hot-toast";
import {MarkerType} from "../../../../constants/MarkerType";
import PlaceMarkerConfig from "../place-marker/PlaceMarkerConfig";
import VideoMarkerConfig from "../video-marker/VideoMarkerConfig";
import ImageMarkerConfig from "../image-marker/ImageMarkerConfig";
import DescriptionMarkerConfig from "../description-marker/DescriptionMarkerConfig";
import {MarkersPlugin} from "photo-sphere-viewer/dist/plugins/markers";
import {
    MDBBtn, MDBIcon,
    MDBModalBody,
    MDBModalFooter,
    MDBTabs,
    MDBTabsContent,
    MDBTabsItem, MDBTabsLink,
    MDBTabsPane
} from "mdb-react-ui-kit";
import GeneralMarkerSetting from "../general-setting/GeneralMarkerSetting";
import MarkerIconByType from "../../../../utility/MarkerIconByType";
import LinkMarkerConfig from "../link-marker/LinkMarkerConfig";
import CustomMarkerConfig from "../custom-marker/CustomMarkerConfig";

export interface ConfigMarkerModalProps {
    register:  UseFormRegister<Marker>,
    handleSubmit: UseFormHandleSubmit<Marker>,
    setValue: UseFormSetValue<Marker>,
    watch: UseFormWatch<Marker>,
}

export interface ConfigMarkerModalChildProps {
    props: ConfigMarkerModalProps
}

const MarkerConfigParent = () => {
    const [scenes, setScene] = useAtom(dataScenesAtom);
    const {register, handleSubmit, setValue, reset, watch}= useForm<Marker>();
    const {markerToConfig, setMarkerToConfig} = useMenu();
    const [iconsActive, setIconsActive] = useState('tab1');

    useEffect(() => {
        if (markerToConfig) {
            reset(markerToConfig);
        }
    }, [markerToConfig]);

    const submit = (data: Marker) => {
        if(!scenes)
            return;
        const scene = scenes?.find((scene) => scene.id === Global.currentScene.id);
        const marker = scene?.markers.find((marker) => marker.id === markerToConfig?.id);

        if (marker) {
            updateMarkerOnCurrentScene(data, scenes, setScene);
            const markersPlugin = Global.viewer.getPlugin(MarkersPlugin);
            if(markersPlugin && data.id) {
                const contextMarker = markersPlugin.getMarker(data.id);
                const size = data.size ? data.size : Global.setting.defaultMarkerSize;
                if(contextMarker) {
                    const properties = {
                        ...contextMarker.config,
                        tooltip: data.tooltip,
                        width: size,
                        height: size,
                        image: data.customIcon ? data.customIcon : MarkerIconByType(data.type),
                        style: {
                            backgroundColor: data.backgroundColor || "transparent",
                            borderRadius: `${data.borderRadius}%` || "0%",
                        }
                    };
                    markersPlugin.updateMarker(properties);
                }
            }
            toast.success("Marker Config saved");
            setMarkerToConfig(null);
        }else{
            toast.error("Marker Config failed");
        }
    }

    const props = {register, handleSubmit, setValue, watch};

    const renderMarkerConfig = () => {
        switch (markerToConfig?.type) {
            case MarkerType.PLACE:
                return <PlaceMarkerConfig props={props} />
            case MarkerType.VIDEO:
                return <VideoMarkerConfig props={props} />
            case MarkerType.IMAGE:
                return <ImageMarkerConfig props={props} />
            case MarkerType.DESCRIPTION:
                return <DescriptionMarkerConfig props={props} />
            case MarkerType.LINK:
                return <LinkMarkerConfig props={props} />
            case MarkerType.CUSTOM:
                return <CustomMarkerConfig props={props} />
            default:
                return <></>
        }
    }

    const handleIconsClick = (value: string) => {
        if (value === iconsActive) {
            return;
        }
        setIconsActive(value);
    };

    if(watch('id') === undefined){
        return <></>;
    }


    return (
        <>
            <MDBModalBody>
                <MDBTabs justify className='mb-3'>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleIconsClick('tab1')} active={iconsActive === 'tab1'}>
                            <MDBIcon fas icon='map-marker-alt' className='me-2' /> Marker data
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleIconsClick('tab2')} active={iconsActive === 'tab2'}>
                            <MDBIcon fas icon='ellipsis-h' className='me-2' /> General
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>

                <MDBTabsContent>
                    <MDBTabsPane show={iconsActive === 'tab1'}>{renderMarkerConfig()}</MDBTabsPane>
                    <MDBTabsPane show={iconsActive === 'tab2'}><GeneralMarkerSetting props={props}/></MDBTabsPane>
                </MDBTabsContent>

            </MDBModalBody>
            <MDBModalFooter>
                <MDBBtn color='primary' onClick={handleSubmit(submit)}>Save Config</MDBBtn>
            </MDBModalFooter>
        </>
    );
};

export default MarkerConfigParent;
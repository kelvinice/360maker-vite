import React, {FC, useEffect} from 'react';
import {ConfigMarkerModalChildProps} from "../parent/MarkerConfigParent";
import {MarkerData} from "../../../../models/DataModel";
import {CustomMarkerDataType} from "./Models";
import LinkDataComponentSetting from "./data-component-setting/LinkDataComponentSetting";
import SlideImageComponentSetting from "./data-component-setting/SlideImageComponentSetting";

type MarkerComponentSetting = {
    markerData: MarkerData,
    changeMarkerDataOnIndex: (index: number, data: MarkerData) => void,
    index: number
}

export type CustomMarkerConfigProps  = {
    props: MarkerComponentSetting
}

const CustomMarkerConfig: FC<ConfigMarkerModalChildProps> = ({props}) => {
    const [markerData, setMarkerData] = React.useState<MarkerData[]>();
    const initialMarkerData = props.watch("data");
    const options = Object.keys(CustomMarkerDataType).map((key: any) => {
        // @ts-ignore
        const obj = CustomMarkerDataType[key];
        return {value: obj.code, label: obj.name}
    });

    useEffect(() => {
        if (initialMarkerData) {
            setMarkerData(initialMarkerData);
        }else{
            setMarkerData([]);
        }
    }, [initialMarkerData]);

    const changeMarkerTypeOnIndex = (index: number, value: string) => {
        const newMarkerData = markerData?.map((marker, i) => {
            if (i === index) {
                return {...marker, type: value};
            }
            return marker;
        });
        setMarkerData(newMarkerData);
        props.setValue("data", newMarkerData);
    }

    const changeMarkerDataOnIndex = (index: number, data: MarkerData) => {
        const newMarkerData = markerData?.map((marker, i) => {
            if (i === index) {
                return data;
            }
            return marker;
        });
        setMarkerData(newMarkerData);
        props.setValue("data", newMarkerData);
    }

    const removeMarkerDataOnIndex = (index: number) => {
        const newMarkerData = markerData?.filter((marker, i) => {
            return i !== index;
        });
        setMarkerData(newMarkerData);
        props.setValue("data", newMarkerData);
    }

    const swapPosition = (index: number, direction: string) => {
        const newMarkerData = markerData?.map((marker, i) => {
            if (direction === "up" && i === index - 1) {
                return markerData[index];
            } else if (direction === "down" && i === index + 1) {
                return markerData[index];
            } else if (i === index) {
                return markerData[direction === "up" ? index - 1 : index + 1];
            }
            return marker;
        });
        setMarkerData(newMarkerData);
        props.setValue("data", newMarkerData);
    }

    const renderMarkerData = (data: MarkerData, index: number) => {
        if(!markerData)return null;
        const props: MarkerComponentSetting = {
            markerData: data,
            changeMarkerDataOnIndex: changeMarkerDataOnIndex,
            index: index
        }
        return <div className={"pb-1 mb-2 border-bottom border-light border-5"}>
            <div className="d-flex justify-content-between">
                <div className="form-group">
                    <select className="form-control" id="markerData" name="markerData" value={data.type} onChange={(e)=>{changeMarkerTypeOnIndex(index, e.target.value)}}>
                        <option value={""}>Select Marker Type</option>
                        {options.map((option, index) => {
                            return <option key={index} value={option.value}>{option.label}</option>
                        })}
                    </select>
                </div>
                <div className="d-flex gap-2">
                    <button className="btn btn-danger" onClick={()=>{removeMarkerDataOnIndex(index)}}>
                        <i className="fa fa-trash"/>
                    </button>
                    <button className="btn btn-warning" onClick={()=>{swapPosition(index, "up")}} disabled={index === 0}>
                        <i className="fa fa-arrow-up"/>
                    </button>
                    <button className="btn btn-warning" onClick={()=>{swapPosition(index, "down")}} disabled={index === markerData.length - 1}>
                        <i className="fa fa-arrow-down"/>
                    </button>
                </div>
            </div>

            <div className="pt-2">
                { data.type === CustomMarkerDataType.buttonLink.code && <LinkDataComponentSetting props={props} /> }
                { data.type === CustomMarkerDataType.slideImage.code && <SlideImageComponentSetting props={props} /> }
            </div>

        </div>
    }

    const addMarkerData = () => {
        setMarkerData([...markerData || [], {type: ""} as MarkerData]);
    }

    if(!markerData){
        return <></>;
    }

    return (
        <>
            {
                markerData.map((data, index) => {
                    return (
                        <div key={index}>
                            {renderMarkerData(data, index)}
                        </div>
                    )
                })
            }
            <button className="btn btn-primary" onClick={()=>addMarkerData()}>Add Data</button>
        </>
    );
}

export default CustomMarkerConfig;
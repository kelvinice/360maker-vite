import React, {FC, useEffect} from 'react';
import {CustomMarkerConfigProps} from "../CustomMarkerConfig";
import {MarkerDataImageSlider} from "../../../../../models/DataModel";

const SlideImageComponentSetting: FC<CustomMarkerConfigProps> = ({props}) => {
    const data = props.markerData as MarkerDataImageSlider;

    useEffect(() => {
        if (data.images === undefined || data.images=== null) {
            props.changeMarkerDataOnIndex(props.index, {...data, images: []} as MarkerDataImageSlider);
        }
    });

    if(data.images === undefined){
        return null;
    }

    const addImage = () => {
        props.changeMarkerDataOnIndex(props.index, {...data, images: [...data.images, ""]} as MarkerDataImageSlider);
    }

    const removeImage = (index: number) => {
        props.changeMarkerDataOnIndex(props.index, {...data, images: data.images.filter((image, i) => i !== index)} as MarkerDataImageSlider);
    }

    const swapIndex = (index: number, isUp: boolean) => {
        const newIndex = isUp ? index - 1 : index + 1;
        props.changeMarkerDataOnIndex(props.index, {...data, images: data.images.map((image, i) => {
            if(i === index){
                return data.images[newIndex];
            }
            if(i === newIndex){
                return data.images[index];
            }
            return image;
        })} as MarkerDataImageSlider);
    }

    return (
        <>
            <div className={"form-group"}>
                {
                    data.images.map((image, index) => {
                        return (
                            <div className={"input-group mb-1"} key={index}>
                                <input type={"text"} className={"form-control"} placeholder={"Image URL"} value={image}
                                       onChange={(e) => {
                                           const newImages = data.images.map((img, i) => {
                                               if (i === index) {
                                                   return e.target.value;
                                               }
                                               return img;
                                           });
                                           props.changeMarkerDataOnIndex(props.index, {...data, images: newImages} as MarkerDataImageSlider);
                                       }}
                                />
                                <button className={"btn btn-danger"} type={"button"}
                                        onClick={() => removeImage(index)}>
                                    <i className={"fas fa-trash-alt"}/>
                                </button>
                                <button className={"btn btn-warning"} type={"button"}
                                        onClick={() => swapIndex(index, true)} disabled={index === 0}>
                                    <i className={"fas fa-arrow-up"}/>
                                </button>
                                <button className={"btn btn-warning"} type={"button"}
                                        onClick={() => swapIndex(index, false)} disabled={index === data.images.length - 1}>
                                    <i className={"fas fa-arrow-down"}/>
                                </button>
                            </div>
                        );
                    })
                }
            </div>
            <div className={"m-2"}>
                <button className={"btn btn-success"} onClick={()=>{addImage()}}>
                    <i className={"fa fa-plus"}/>
                </button>
            </div>
        </>
    );
};

export default SlideImageComponentSetting;
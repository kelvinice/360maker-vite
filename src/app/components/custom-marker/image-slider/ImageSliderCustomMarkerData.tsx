import React, {FC} from 'react';
import {CustomMarkerDataProps} from "../ViewCustomMarkerModal";
import {MarkerDataImageSlider} from "../../../models/DataModel";
import {MDBCarousel, MDBCarouselItem} from "mdb-react-ui-kit";

const ImageSliderCustomMarkerData: FC<CustomMarkerDataProps> = ({markerData}) => {
    const data = markerData as MarkerDataImageSlider;

    return (
        <MDBCarousel showIndicators={true} showControls={true} dark={true}>
            {
                data.images.map((image, index) => {
                    return (
                        <MDBCarouselItem className='w-100 d-block' itemId={index + 1} key={index} src={image}>
                        </MDBCarouselItem>
                    );
                })
            }
        </MDBCarousel>
    );
};

export default ImageSliderCustomMarkerData;
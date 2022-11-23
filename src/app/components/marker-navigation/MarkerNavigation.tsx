import React, {ReactNode, useCallback} from 'react';
import Draggable from "react-draggable";
import {Chat, Close, Image, Mouse, OpenWith, Settings, Videocam, Delete, PinDropSharp, LocationSearching, Link, Widgets} from '@material-ui/icons'
import {useMenu} from "../../providers/MenuProvider";
import {useAtom} from "jotai";
import {markerToCopyAtom, mouseStateAtom} from "../../atoms/DataAtom";
import clsx from "clsx";
import {MouseState} from "../../constants/MouseState";
import {MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBDropdown, MDBBtn} from "mdb-react-ui-kit";
import {useAtomCallback} from "jotai/utils";


const MouseStateButton = (props: { targetMouseState: MouseState, color : string, children: ReactNode, text?: string, className?: string, tooltip?: string, disabled?: boolean }) => {
    const [mouseState, setMouseState] = useAtom(mouseStateAtom);
    return (
        <div className={props.className || ""}>
            <MDBBtn
                data-toggle="tooltip" title={props.tooltip}
                disabled={props.disabled}
                className={clsx({
                    "active": props.targetMouseState === mouseState,
                }, `btn btn-sm btn-${props.color} d-flex align-item-center w-100 h-100`)} onClick={()=>setMouseState(props.targetMouseState)}>
                <div className="d-flex align-items-center">
                    {props.children}
                    {props.text && <span className="ms-2 fw-bold">{props.text}</span>}
                </div>
            </MDBBtn>
        </div>
    )
}

const MarkerNavigation = () => {
    const {setMarkerNavigationOpen} = useMenu();
    const nodeRef = React.useRef(null);
    const [mouseState] = useAtom(mouseStateAtom);
    const [markerToCopy, ] = useAtom(markerToCopyAtom);

    const markers = [
        {
            icon: <LocationSearching />,
            text: "Place Marker",
            targetMouseState: MouseState.MarkerPlace,
        },
        {
            icon: <Image />,
            text: "Image Marker",
            targetMouseState: MouseState.MarkerImage,
        },
        {
            icon: <Videocam />,
            text: "Video Marker",
            targetMouseState: MouseState.MarkerVideo,
        },
        {
            icon: <Chat />,
            text: "Text Marker",
            targetMouseState: MouseState.MarkerDescription,
        },
        {
            icon: <Link />,
            text: "Link Marker",
            targetMouseState: MouseState.MarkerLink,
        },
        {
            icon: <Widgets />,
            text: "Custom Marker",
            targetMouseState: MouseState.MarkerCustom,
        }

    ]

    const getMouseState = useAtomCallback(useCallback((get) => {
        return get(mouseStateAtom);
    }, [mouseState]));

    const currentMarker = markers.find(marker => marker.targetMouseState === getMouseState());

    return (
        <Draggable handle=".btn-drag" nodeRef={nodeRef} >
            <div className="bg-white rounded-3 p-2 shadow-5-strong" ref={nodeRef}
                 style={{zIndex: "1000", top: 0, left: 0, position: "absolute"}}>
                <div className="d-flex gap-2">
                    <button className="btn bg-light btn-sm btn-drag" data-toggle="tooltip" title="Drag Navigation">
                        <OpenWith/>
                    </button>

                    <div className="border border-dark border-1 h-auto"/>

                    <MouseStateButton color="info" tooltip="Select marker" targetMouseState={MouseState.Cursor} children={<Mouse/>}/>
                    <MouseStateButton color="info" tooltip="Setting marker" targetMouseState={MouseState.Setting} children={<Settings/>}/>
                    <MouseStateButton color="info" tooltip="Delete marker" targetMouseState={MouseState.Delete} children={<Delete />}/>
                    <MouseStateButton color="info" tooltip="Copy marker" targetMouseState={MouseState.Copy} children={<i className="fa fa-copy fs-5 d-flex justify-content-center align-items-center" style={{height:"24px", width:"24px"}}/>}/>
                    <MouseStateButton color="info" tooltip="Paste marker" disabled={!markerToCopy} targetMouseState={MouseState.Paste} children={<i className="fa fa-paste fs-5 d-flex justify-content-center align-items-center" style={{height:"24px", width:"24px"}}/>}/>

                    <MDBDropdown group data-toggle="tooltip" title="Marker selection">
                        <MDBDropdownToggle className={clsx({
                            "active": markers.find(marker => marker.targetMouseState === getMouseState()) !== undefined,
                        }, "btn btn-sm")}>
                            {
                                !currentMarker ? <PinDropSharp /> : currentMarker.icon
                            }
                        </MDBDropdownToggle>
                        <MDBDropdownMenu style={{minWidth:0}} >
                            {
                                markers.map((marker, index) => (
                                    <MDBDropdownItem link key={index} className="flat-a">
                                        <MouseStateButton text={marker.text} color="primary" targetMouseState={marker.targetMouseState} children={marker.icon}
                                            className="p-1"
                                        />
                                    </MDBDropdownItem>
                                ))
                            }
                        </MDBDropdownMenu>
                    </MDBDropdown>


                    <div className="border border-dark border-1 h-auto"/>

                    <MDBBtn className="btn btn-danger btn-sm" onClick={() => setMarkerNavigationOpen(false)} data-toggle="tooltip" title="Close Navigation">
                        <Close/>
                    </MDBBtn>
                </div>

            </div>
        </Draggable>
    );
};

export default MarkerNavigation;
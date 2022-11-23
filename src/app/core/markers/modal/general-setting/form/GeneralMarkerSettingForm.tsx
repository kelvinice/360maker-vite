import React, {FC} from 'react';
import {ConfigMarkerModalChildProps} from "../../parent/MarkerConfigParent";
import {MDBInputGroup, MDBBtn, MDBSwitch} from "mdb-react-ui-kit";

const GeneralMarkerSettingForm: FC<ConfigMarkerModalChildProps> = ({props}) => {
    const deleteValueOnAttribute = (attribute: any) => {
        props.setValue(attribute, undefined);
    }

    return (
        <form className={"d-flex flex-column gap-2"}>
            <MDBInputGroup textBefore={"Tooltip"}>
                <input type="text" className="form-control" id="tooltip" {...props.register("tooltip")} />
            </MDBInputGroup>
            <MDBInputGroup textBefore={"Marker size"}>
                <input type="number" className="form-control" {...props.register("size")} placeholder={"Using marker size default value"} />
                <MDBBtn type="button" color="secondary" onClick={()=>deleteValueOnAttribute("size")}><i className={"fa fa-trash"}/></MDBBtn>
            </MDBInputGroup>
            <MDBInputGroup textBefore={"Custom icon"}>
                <input type="text" className="form-control" {...props.register("customIcon")} placeholder={"Using marker icon default value"} />
                <MDBBtn type="button" color="secondary" onClick={()=>deleteValueOnAttribute("customIcon")}><i className={"fa fa-trash"}/></MDBBtn>
            </MDBInputGroup>
            <MDBInputGroup>
                <MDBSwitch checked={props.watch('backgroundColor') !== undefined} label='Enable background color'
                           onChange={(e)=>props.setValue('backgroundColor', e.target.checked ? "#ffffff" : undefined)} />
            </MDBInputGroup>
            {
                props.watch('backgroundColor') !== undefined &&
                <MDBInputGroup textBefore={"Background color"}>
                    <input type="color" className="form-control" {...props.register("backgroundColor")} placeholder={"Using marker background color default value"} />
                    <div className="rounded-end p-1 border border-1">
                        {props.watch("backgroundColor")}
                    </div>
                </MDBInputGroup>
            }
            <MDBInputGroup textBefore={"Border radius"}>
                <input type="number" className="form-control" {...props.register("borderRadius")} placeholder={"Using marker border radius default value"} />
                <MDBBtn type="button" color="secondary" onClick={()=>deleteValueOnAttribute("borderRadius")}><i className={"fa fa-trash"}/></MDBBtn>
            </MDBInputGroup>

            <MDBInputGroup>
                <MDBSwitch checked={props.watch('disableClick') || false} label='Disable click' onChange={(e)=>props.setValue('disableClick', e.target.checked)} />
            </MDBInputGroup>
        </form>
    );
};

export default GeneralMarkerSettingForm;
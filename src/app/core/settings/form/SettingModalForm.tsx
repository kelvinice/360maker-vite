import React, {FC, useEffect} from 'react';
import {
    FormState,
    UseFormGetValues,
    UseFormRegister,
    UseFormReset,
    UseFormSetValue,
    UseFormWatch
} from "react-hook-form";
import {useAtom} from "jotai";
import {dataScenesAtom, settingsAtom} from "../../../atoms/DataAtom";
import {SettingModel} from "../../../models/DataModel";
import {MDBInputGroup} from "mdb-react-ui-kit";

export type SettingModalProps = {
    register: UseFormRegister<SettingModel>,
    setValue: UseFormSetValue<SettingModel>,
    getValues: UseFormGetValues<SettingModel>,
    formState: FormState<SettingModel>
    reset: UseFormReset<SettingModel>
    watch: UseFormWatch<SettingModel>
}

export interface SettingModalChildProps {
    props: SettingModalProps
}

const SettingModalForm:FC<SettingModalChildProps> = ({props}) => {
    const [scenes,] = useAtom(dataScenesAtom);
    const [setting,] = useAtom(settingsAtom);
    const errors = props.formState.errors;

    useEffect(() => {
        if(!setting) return;
        props.reset(setting);
    }, [setting]);

    if(scenes && scenes.length === 0) return <></>;

    if(!setting) return <></>;

    return (
        <>
            <form >
                <div className="form-group">
                    <div className="input-group">
                        <label className="form-label input-group-text" htmlFor="initialScene">Initial Scene</label>
                        <select className="form-control" id="initialScene" {...props.register("initialScene", {required: true})}>
                            {
                                scenes?.map(scene => (
                                    <option key={scene.id} value={scene.id}>{scene.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    {
                        errors.initialScene && <div className="alert alert-danger">{errors.initialScene.message}</div>
                    }
                </div>
                <div className="form-group">
                    <MDBInputGroup textBefore='Default marker size' className={"w-100"}>
                        <input type="number" className="form-control"
                            {...props.register("defaultMarkerSize", {required: true, valueAsNumber: true})} />
                    </MDBInputGroup>
                    {
                        errors.defaultMarkerSize && <div className="alert alert-danger">{errors.defaultMarkerSize?.message}</div>
                    }
                </div>
            </form>
        </>
    );
};

export default SettingModalForm;
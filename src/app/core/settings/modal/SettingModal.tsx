import React from 'react';
import {useMenu} from "../../../providers/MenuProvider";
import {
    MDBBtn, MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalFooter,
    MDBModalHeader,
    MDBModalTitle
} from "mdb-react-ui-kit";
import SettingModalForm, {SettingModalProps} from "../form/SettingModalForm";
import {useForm} from "react-hook-form";
import {useAtom} from "jotai";
import {settingsAtom} from "../../../atoms/DataAtom";
import toast from "react-hot-toast";
import {SettingModel} from "../../../models/DataModel";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
    initialScene: yup.string().required().label("Initial Scene"),
    defaultMarkerSize: yup.number().required().min(1).label("Default marker size"),
}).required();

const SettingModal = () => {
    const {setModalSetting, modalSetting} = useMenu();
    const {register, handleSubmit, setValue, getValues, formState, reset, watch} = useForm<SettingModel>({
        resolver: yupResolver(schema)
    });
    const [, setSetting] = useAtom(settingsAtom);

    const submit = (data: SettingModel) => {
        setSetting(data);
        toast.success("Setting saved");
        setModalSetting(false);
    }

    const props:SettingModalProps = {
        register,
        setValue,
        getValues,
        formState,
        reset,
        watch,
    }

    return (
        <>
            <MDBModal staticBackdrop show={modalSetting} tabIndex='-1'>
                <MDBModalDialog size={"lg"}>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Setting</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={()=>setModalSetting(false)}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <SettingModalForm props={props} />
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='primary' onClick={()=>{
                                handleSubmit(submit)()
                            }}>Save Setting</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

        </>
    );
};

export default SettingModal;
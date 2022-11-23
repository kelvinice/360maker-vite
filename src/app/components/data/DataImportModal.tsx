import React from 'react';
import {MDBModal} from "mdb-react-ui-kit";
import {useMenu} from "../../providers/MenuProvider";
import {useForm} from "react-hook-form";
import {DataModel} from "../../models/DataModel";
import toast from "react-hot-toast";
import {useAtom} from "jotai";
import {dataScenesAtom, settingsAtom} from "../../atoms/DataAtom";

interface DataImportFormProps {
    file: File[];
}

const DataImportModal = () => {
    const {modalImport, setModalImport} = useMenu();
    const {register, formState:{errors}, handleSubmit} = useForm<DataImportFormProps>();
    const [, setScene] = useAtom(dataScenesAtom);
    const [, setSetting] = useAtom(settingsAtom);

    const submit = async (data: DataImportFormProps) => {
        try{
            if(data.file.length > 0) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const result = e.target?.result;
                    if(result) {
                        const data: DataModel = JSON.parse(result.toString());
                        setScene(data.scenes);
                        setSetting(data.setting);
                        toast.success("Data imported!");
                        setModalImport(false);
                    }
                }
                reader.readAsText(data.file[0]);
            }
        }
        catch (e) {
            toast.error("Error importing data");
        }
    }

    return (
        <>
            <MDBModal staticBackdrop show={modalImport} tabIndex='-1'>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Import Data</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>setModalImport(false)}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label htmlFor="file" className="form-label">File</label>
                                    <input type="file" className="form-control" id="file" {...register("file")} />
                                    {errors.file && <div className="invalid-feedback">{errors.file.message}</div>}
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={()=>setModalImport(false)}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit(submit)}>Save changes</button>
                        </div>
                    </div>
                </div>
            </MDBModal>
        </>

    );
};

export default DataImportModal;
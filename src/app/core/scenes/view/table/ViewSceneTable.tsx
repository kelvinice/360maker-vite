import React, {useEffect, useState} from 'react';
import {useAtom} from "jotai";
import {dataScenesAtom} from "../../../../atoms/DataAtom";
import {SweetAlert} from "../../../../constants/SweetAlert";
import toast from "react-hot-toast";
import {Scene} from "../../../../models/DataModel";
import {changeScene} from "../../../PhotoSphereViewer";
import {useMenu} from "../../../../providers/MenuProvider";
import clsx from "clsx";
import {digitCount, leadingZeros} from "../../../../utility/Utility";

const ViewSceneTable = () => {
    const [scenes, setScenes] = useAtom(dataScenesAtom);
    const [search, setSearch] = useState<string>("");
    const {setSceneToManage} = useMenu();
    const [page, setPage] = useState<number>(1);
    const itemPerPage = 7;

    const deleteScene = (id: string) => {
        SweetAlert.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                if(!scenes)
                    return;
                setScenes(scenes.filter((scene) => scene.id !== id));
                toast.success("Scene deleted");
            }
        })
    }

    const handleView = (scene: Scene) => {
        changeScene(scene);
    }

    const handleSwapScenePosition = (scene: Scene, direction: "up" | "down") => {
        if(!scenes)
            return;
        const index = scenes.findIndex((s) => s.id === scene.id);
        if(direction === "up"){
            if(index === 0)
                return;
            const temp = scenes[index];
            scenes[index] = scenes[index - 1];
            scenes[index - 1] = temp;
        }else{
            if(index === scenes.length - 1)
                return;
            const temp = scenes[index];
            scenes[index] = scenes[index + 1];
            scenes[index + 1] = temp;
        }
        setScenes([...scenes]);
    }

    const changePage = (page: number) => {
        setPage(page);
    }

    const copyLink = (scene: Scene) => {
        const location = window.location;
        navigator.clipboard.writeText(location.origin + location.pathname + "?scene=" + scene.id);
        toast.success("Link copied");
    }

    useEffect(() => {
        setPage(1);
    }, [search]);

    const scenesToDisplay = (scenes || []).filter((scene) => scene.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div>
            <div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Search scene" aria-label="Search scene" value={search} onChange={(e) => setSearch(e.target.value)}/>
                </div>
            </div>

            <table className="table table-striped table-responsive table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col" className={"w-100"}>Name</th>
                    <th scope="col" className={"w-100"}>Path</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    scenes && scenes.filter((scene) => scene.name.toLowerCase().includes(search.toLowerCase())).slice((page - 1) * itemPerPage, page * itemPerPage).map((scene, index) => (
                        <tr className="align-middle" key={scene.id}>
                            <th scope="row">{leadingZeros((page - 1) * itemPerPage + index + 1, digitCount(scenesToDisplay.length))}</th>
                            <td>{scene.name}</td>
                            <td>{scene.path}</td>
                            <td>
                                <div className="d-flex flex-row">
                                    <button className="btn btn-danger fs-6" onClick={() => deleteScene(scene.id as string)}>
                                        <i className="fa fa-trash"/>
                                    </button>
                                    <button className="btn btn-primary ms-2 fs-6" onClick={()=>setSceneToManage(scene.id as string)}>
                                        <i className="fa fa-edit"/>
                                    </button>
                                    <button className="btn btn-success ms-2 fs-6" onClick={() => handleView(scene)}>
                                        <i className="fa fa-eye"/>
                                    </button>
                                    <button className="btn btn-info ms-2 fs-6" onClick={() => copyLink(scene)}>
                                        <i className="fa fa-link"/>
                                    </button>
                                    <button className="btn btn-warning ms-2 fs-6" disabled={(page - 1) * itemPerPage + index === 0 || search !== ""} onClick={() => handleSwapScenePosition(scene, "up")}>
                                        <i className="fa fa-arrow-up"/>
                                    </button>
                                    <button className="btn btn-warning ms-2 fs-6" disabled={(page - 1) * itemPerPage + index + 1 === scenesToDisplay.length || search !== ""} onClick={() => handleSwapScenePosition(scene, "down")}>
                                        <i className="fa fa-arrow-down"/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item">
                            <button className="page-link" onClick={() => changePage(page - 1)} disabled={page === 1}>Previous</button>
                        </li>
                        {
                            scenes && Array.from(Array(Math.ceil(scenesToDisplay.length / itemPerPage)).keys()).map((index) => (
                                <li className={clsx({
                                    "active": page === index + 1,
                                }, "page-item")} key={index}>
                                    <button className="page-link" onClick={() => changePage(index + 1)}>{index + 1}</button>
                                </li>
                            ))
                        }
                        <li className="page-item">
                            <button className="page-link" onClick={() => changePage(page + 1)} disabled={page === Math.ceil(scenesToDisplay.length / itemPerPage)}>Next</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default ViewSceneTable;
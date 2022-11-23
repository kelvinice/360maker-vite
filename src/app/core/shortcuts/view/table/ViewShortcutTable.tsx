import React, {useState} from 'react';
import {useAtom} from "jotai";
import {dataScenesAtom, shortcutsAtom} from "../../../../atoms/DataAtom";
import Swal from "sweetalert2";
import clsx from "clsx";
import {Shortcut} from "../../../../models/DataModel";
import {useMenu} from "../../../../providers/MenuProvider";
import {MDBBtn} from "mdb-react-ui-kit";

const ViewShortcutTable = () => {
    const [shortcuts, setShortcuts] = useAtom(shortcutsAtom);
    const [scenes, ] = useAtom(dataScenesAtom);
    const [page, setPage] = useState<number>(1);
    const itemPerPage = 7;
    const maxPage = Math.ceil((shortcuts || []).length / itemPerPage);
    const {setShortcutIdToManage} = useMenu();

    const deleteShortcut = (id: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                if(!shortcuts)
                    return;
                setShortcuts(shortcuts.filter((shortcut) => shortcut.id !== id));
            }
        });
    }

    const handleSwapShortcutPosition = (shortcut: Shortcut, direction: "up" | "down") => {
        if(!shortcuts)
            return;
        const index = shortcuts.findIndex((s) => s.id === shortcut.id);
        if(direction === "up"){
            if(index === 0)
                return;
            const temp = shortcuts[index];
            shortcuts[index] = shortcuts[index - 1];
            shortcuts[index - 1] = temp;
        }else{
            if(index === shortcuts.length - 1)
                return;
            const temp = shortcuts[index];
            shortcuts[index] = shortcuts[index + 1];
            shortcuts[index + 1] = temp;
        }
        setShortcuts([...shortcuts]);
    }

    const changePage = (page: number) => {
        if(page < 1 || page > maxPage)
            return;
        setPage(page);
    }

    if(!shortcuts || !scenes)
        return <></>;

    return (
        <div>
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col" className={"w-100"}>Name</th>
                    <th scope="col" className={"w-100"}>Scene</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {shortcuts.slice((page - 1) * itemPerPage, page * itemPerPage).map((shortcut, index) => {
                    const scene = scenes.find((scene) => scene.id === shortcut.sceneId);
                    return (
                        <tr className="align-middle" key={shortcut.id}>
                            <td>{shortcut.name}</td>
                            <td>{
                                (shortcut.children || []).length > 0 ?
                                    <span className="badge bg-success">Shortcut Group</span> :
                                    scene?.name
                            }</td>
                            <td>
                                <div className={"d-flex gap-2"}>
                                    <MDBBtn className="btn btn-danger fs-6" onClick={() => deleteShortcut(shortcut.id as string)}>
                                        <i className="fas fa-trash"/>
                                    </MDBBtn>
                                    <MDBBtn className="btn btn-primary fs-6" onClick={() => setShortcutIdToManage(shortcut.id as string)}>
                                        <i className="fas fa-edit"/>
                                    </MDBBtn>
                                    <MDBBtn className="btn btn-warning fs-6" onClick={() => handleSwapShortcutPosition(shortcut, "up")}
                                            disabled={index === 0}>
                                        <i className="fas fa-arrow-up"/>
                                    </MDBBtn>
                                    <MDBBtn className="btn btn-warning fs-6" onClick={() => handleSwapShortcutPosition(shortcut, "down")}
                                            disabled={index === shortcuts.length - 1}>
                                        <i className="fas fa-arrow-down"/>
                                    </MDBBtn>
                                </div>
                            </td>
                        </tr>
                    )
                }
                )}
                </tbody>
            </table>
            <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item">
                            <button className="page-link" onClick={() => changePage(page - 1)} disabled={page === 1}>Previous</button>
                        </li>
                        {
                            scenes && Array.from(Array(Math.ceil(shortcuts.length / itemPerPage)).keys()).map((index) => (
                                <li className={clsx({
                                    "active": page === index + 1,
                                }, "page-item")} key={index}>
                                    <button className="page-link" onClick={() => changePage(index + 1)}>{index + 1}</button>
                                </li>
                            ))
                        }
                        <li className="page-item">
                            <button className="page-link" onClick={() => changePage(page + 1)} disabled={page === maxPage}>Next</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default ViewShortcutTable;
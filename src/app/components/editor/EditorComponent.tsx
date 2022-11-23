import React, {FC} from 'react';
import {useAtom} from "jotai";
import {isEditorAtom} from "../../atoms/DataAtom";
import {WithChildren} from "../../types/WithChildren";

const EditorComponent: FC<WithChildren> = ({children}) => {
    const [isEditor] = useAtom(isEditorAtom);
    return (
        <>
            {isEditor && children}
        </>
    );
};

export default EditorComponent;
import './styles/App.css';
import './styles/photo-sphere-viewer.min.css';
import './styles/markers.min.css';

import React from 'react';
import PhotoSphereViewer from "./core/PhotoSphereViewer";
import {FloatingButton} from "./components/side-menu/floating-button/FloatingButton";
import {MenuProvider, useMenu} from "./providers/MenuProvider";
import {Toaster} from "react-hot-toast";
import ModalWrapper from "./components/ModalWrapper";
import MarkerNavigation from "./components/marker-navigation/MarkerNavigation";
import VRButton from "./components/ui/VRButton";
import ShortcutWrapper from "./components/shortcut/ShortcutWrapper";
import BackButton from "./components/ui/BackButton";
import DataInitializer from "./components/data/DataInitializer";
import EditorComponent from "./components/editor/EditorComponent";

const App = () => {
    const {MarkerNavigationOpen} = useMenu();

    return (
        <div className="App">
            <PhotoSphereViewer />
            <EditorComponent>
                <div className="ui-menu top-0 end-0">
                    <FloatingButton />
                </div>
            </EditorComponent>
            <div className="ui-menu start-0 top-50">
                <BackButton />
            </div>
            <div className="ui-menu end-0 top-50">
                <VRButton />
            </div>
            <div className="ui-menu start-0 bottom-0 d-flex mb-5 w-100">
                <ShortcutWrapper />
            </div>
            {
                MarkerNavigationOpen &&
                <EditorComponent>
                    <MarkerNavigation />
                </EditorComponent>
            }
            <ModalWrapper />
        </div>
    );
}

const AppWrapper = () => {
    return (
        <DataInitializer>
            <MenuProvider>
                <App />
                <Toaster />
            </MenuProvider>
        </DataInitializer>
    );
}

export default AppWrapper;

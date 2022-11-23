import React from 'react'
import {useMenu} from "../../../providers/MenuProvider";

export const RenderStuffModal = () => {
    const {VRSceneToView} = useMenu();

  return (
    <div>
        <iframe width="1200" height="700" title="someTitle" scrolling="no" src="https://competition.binus.ac.id/vr/i/i004.jpg"></iframe>
    </div>
  )
}

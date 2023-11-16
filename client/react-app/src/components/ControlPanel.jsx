import react, {useState} from 'react'
import ControlPanelButton from './ControlPanelButton'

export default function ControlPanel( { setShowPanels } ) {

    return (
        <div>
            <div className='controlPanelButtonContainer'>
                <ControlPanelButton habitType='social' color='bluePanelButton' icon='' setShowPanels={setShowPanels}/>
            </div>

            <div className='controlPanelButtonContainer'>
                <ControlPanelButton habitType='academic' color='greenPanelButton' icon='' setShowPanels={setShowPanels}/>
            </div>

            <div className='controlPanelButtonContainer'>
                <ControlPanelButton habitType='personal' color='redPanelButton' icon='' setShowPanels={setShowPanels}/>
            </div>

            <div className='controlPanelButtonContainer'>
                <ControlPanelButton habitType='all' color='grayPanelButton' icon='' setShowPanels={setShowPanels}/>
            </div>
        </div>
    );
}


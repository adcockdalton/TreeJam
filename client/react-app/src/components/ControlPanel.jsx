import react, {useState} from 'react';
import ControlPanelButton from './ControlPanelButton';
import academics from './images/academics.png'

export default function ControlPanel( { setShowPanels } ) {

    return (
        <div className='controlPanelContainer'>
            <div className='controlPanelButtonContainer'>
                <ControlPanelButton habitType='social' color='bluePanelButton' icon='academics' setShowPanels={setShowPanels}/>
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


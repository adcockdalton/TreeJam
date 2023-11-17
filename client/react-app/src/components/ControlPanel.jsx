import react, {useState} from 'react';
import ControlPanelButton from './ControlPanelButton';
import academics from '../images/academics.png'
import personal from '../images/personal.png'
import social from '../images/social.png'
import catalog from '../images/catalog.png'

export default function ControlPanel( { setShowPanels } ) {

    return (
        <div className='controlPanelContainer'>
            <div className='controlPanelButtonContainer'>
                <ControlPanelButton habitType='social' color='bluePanelButton' icon={social} setShowPanels={setShowPanels}/>
            </div>

            <div className='controlPanelButtonContainer'>
                <ControlPanelButton habitType='academic' color='greenPanelButton' icon={academics} setShowPanels={setShowPanels}/>
            </div>

            <div className='controlPanelButtonContainer'>
                <ControlPanelButton habitType='personal' color='redPanelButton' icon={personal} setShowPanels={setShowPanels}/>
            </div>

            <div className='controlPanelButtonContainer'>
                <ControlPanelButton habitType='all' color='grayPanelButton' icon={catalog} setShowPanels={setShowPanels}/>
            </div>
        </div>
    );
}


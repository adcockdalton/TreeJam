import react, {useState} from 'react'
import ControlPanelButton from './ControlPanelButton'

export default function ControlPanel( { filterHabitList } ) {

    return (
        <div>
            <div className='controlPanelButtonContainer'>
                <ControlPanelButton habitType='social' color='bluePanelButton' icon='' filterHabitList={filterHabitList}/>
            </div>

            <div className='controlPanelButtonContainer'>
                <ControlPanelButton habitType='academic' color='greenPanelButton' icon='' filterHabitList={filterHabitList}/>
            </div>

            <div className='controlPanelButtonContainer'>
                <ControlPanelButton habitType='personal' color='redPanelButton' icon='' filterHabitList={filterHabitList}/>
            </div>

            <div className='controlPanelButtonContainer'>
                <ControlPanelButton habitType='all' color='grayPanelButton' icon='' filterHabitList={filterHabitList}/>
            </div>
        </div>
    );
}


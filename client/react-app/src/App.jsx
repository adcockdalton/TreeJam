import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import './index.css';
import HabitList from './components/Habitlist';
import SuggestionList from './components/SuggestionList';
import UserStatsList from './components/UserStatsList';
import ControlPanel from './components/ControlPanel';
import deadTree from './images/deadTree.svg';
import TextGenerator from './components/TextGenerator';
import anteater from './images/anteater-removebg-preview.png'


// fetch data from the user
function GetDataTest() {
  const [data, setData] = useState({})

  useEffect(() => {
    fetch("/test")
    .then(res => res.json())
    .then(data => setData(data))
  }, [])

  return (
    <div>{data.message}</div>
  )
}

//core of the user-facing interface
function App() {
  const [showPanels, setShowPanels] = useState(true)
  const [currentHabits, setCurrentHabits] = useState()

  useEffect(() => { // call database to get current habits and store in state on first render
    async function getHabits() {
      const response = await fetch("http://localhost:3001/current-habits", {
        method: "GET",
      })
      const data = await response.json()

      console.log(data[0])
      setCurrentHabits(data[0])
      
    }
    getHabits()

  }, [])

  return (
    <div className='rootAppContainer'>
      
      <div className='SuggestionList'> 
        <SuggestionList /> 
      </div>

      {/* center panel */}
      <div className="centerPanel">
          <div className='TreeContainer'>  
            <img src= {deadTree} />
          </div>

          <div className='bottomPanelContainer'> 
            <ControlPanel setShowPanels={setShowPanels}/> 
          </div>
      </div>
      
      {/* right panel */}
      <div className='ButtonContainer'>
          <div className='ShrinkButtonContainer'>
          </div>

          {/* top right navigation panel */}
          <div className='createHabitContainer'>

            <div className='userProfile'>
              <img src= {anteater}/>
            </div>

            <div className='createHabitButton'>
                +  
            </div>
          </div>

      <div className='UserStats'> 
        <UserStatsList statsData={{'empty': 'for now'}}/>
      </div>
      
      { // only render habit list if we got our habit data 
        currentHabits ? <div className='HabitList'> <HabitList currentHabitData={currentHabits}/> </div> : <div className='HabitList'> </div>
      }
      {/* <div className='HabitList'> <HabitList currentHabitData={currentHabitData}/> </div> */}
    </div>
    </div>
      
  )
}

export default App

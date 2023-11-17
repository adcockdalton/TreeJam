import react, { useState, useRef, useEffect } from 'react'
import './App.css'
import './index.css'
import Habit from './components/Habit'
import HabitList from './components/Habitlist'
import SuggestionList from './components/SuggestionList'
import UserStatsList from './components/UserStatsList'
import ControlPanel from './components/ControlPanel'
import deadTree from './images/deadTree.svg'

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
  
  const currentHabitData = {
    "social":{
      "daily":[
        {
          "title":"hang out with jake",
          "description":"socializing is fun"
        },
        {
          "title":"text friends",
          "description":"texting is fun"
        }
        ],
      "weekly":[
        {
          "title":"call grandparents",
          "description":"catch up is nice",
          "day":"Tuesday"
        }
      ]
    },

    "academic":{
      "daily":[
        {
          "title":"study for 6b",
          "description":"do the readings"
        }
        ],
      "weekly":[
        {
          "title":"review spanish",
          "description":"need to stay fluent",
          "day":"Wednesday"
        }
      ]
    },

    "personal":{
      "daily":[
        {
          "title":"hang out with jake",
          "description":"socializing is fun"
        },
        {
          "title":"text friends",
          "description":"texting is fun"
        }
        ],
      "weekly":[
        {
          "title":"call grandparents",
          "description":"catch up is nice",
          "day":"Wednesday"
        }
      ]
    }
  }

  return (
    <div className='rootAppContainer'>
      <div className='SuggestionList'> <SuggestionList /> </div>
      
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
              <img src="academics.png"/>
            </div>
            <div className='createHabitButton'>
            </div>
          </div>

      <div className='UserStats'> 
        <UserStatsList statsData={{'empty': 'for now'}}/>
      </div>
      <div className='HabitList'> <HabitList currentHabitData={currentHabitData}/> </div>
    </div>
    </div>
      
  )
}

export default App

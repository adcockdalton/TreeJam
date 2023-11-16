import react, { useState, useRef, useEffect } from 'react'
import './App.css'
import Habit from './components/Habit'
import HabitList from './components/Habitlist'
import SuggestionList from './components/SuggestionList'

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
  const [count, setCount] = useState(0)
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
    <>
      <div className='LeftPanels'> 
        <div className='SuggestionList'>      
          <SuggestionList />
        </div>

        <div className='YourStats'>

        </div>

      </div>

      <div>



      </div>

      <div>



      </div>
      <HabitList currentHabitData={currentHabitData}/>
      {/* currentHabitData will be retrieved from MongoDB database, where all the user's habits (daily/weekly, etc...) are stored  */}
      <Habit/>
    </>
  )
}

export default App

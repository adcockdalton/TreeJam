import react, { useState, useRef, useEffect } from 'react'
import './App.css'
import Habit from './components/Habit'
import Habitlist from './components/Habitlist'

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

  return (
    <>
      <HabitList currentHabitData={currentHabitData}/>
      {/* currentHabitData will be retrieved from MongoDB database, where all the user's habits (daily/weekly, etc...) are stored  */}
      <Habit/>
    </>
  )
}

export default App

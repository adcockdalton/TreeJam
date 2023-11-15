import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function HabitList( {currentHabitData }) {
  const [currentHabits, setCurrentHabits] = useState(currentHabitData)
  // if the data for today's habits is changed (either by user adding/deleting the )
  // tasks shown, then the list will re-render to reflect that change. 

  const socialHabits = currentHabits['social'].map((habit) => {
    return <Habit title={habit['title']} frequency={habit['frequency']} description={habit['description']} setCurrentHabits={setCurrentHabits}> </Habit>
  })

  const academicHabits = currentHabits['academic'].map((habit) => {
    return <Habit title={habit['title']} frequency={habit['frequency']} description={habit['description']} setCurrentHabits={setCurrentHabits}> </Habit>
  })

  const personalHabits = currentHabits['personal'].map((habit) => {
    return <Habit title={habit['title']} frequency={habit['frequency']} description={habit['description']} setCurrentHabits={setCurrentHabits}> </Habit>
  })

  return (
    <div>
      <div> Social {socialHabits}</div>
      <div> Academic {academicHabits}</div>
      <div> Personal {personalHabits}</div>
    </div>

  )

}

function Habit({title, frequency, description, setCurrentHabits }) {
  const [title, setTitle] = useState(title)
  const [frequency, setFrequency] = useState(frequency)
  const [description, setDescription] = useState(description)
  const [editMode, setEditMode] = useState(false) // controls whether the pop-up modal for editing the tasks in the list is being displayed currently or not

  return (
    <div>
      <div>
        {/* <button> </button> */}
        {/* button for checking off if the task was completed */}
        
      </div>
      <div> 
        {/* div containing the task name and frequency */}
          <div>
            {title}
          </div>
          <div>
            {frequency} 
            {/* formatted in the tag-like display with css */}
          </div>
      </div>
      <div> 
        {/* <button> </button> */}
        {/* right-arrow button for expanding into pop up modal to edit task */}
        {/* button changes the editMode state to True, causing the pop up  */}
        {/* modal to appear where task can be edited.  */}

        {/* pop up modal will be in another react component */}
        {/* {editMode == true ? <PopUpModal title={title}, etc../> : <>} */}
        {/* above displays Pop up modal if the edit mode state is true  */}
      </div>
    </div>
  )
  
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HabitList currentHabitData={currentHabitData}/>
      {/* currentHabitData will be retrieved from MongoDB database, where all the user's habits (daily/weekly, etc...) are stored  */}
      
    </>
  )
}

export default App

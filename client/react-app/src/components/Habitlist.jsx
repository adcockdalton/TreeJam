import react, {useState} from 'react'
import Habit from './Habit'


function HabitList( {currentHabitData }) {
    const [currentHabits, setCurrentHabits] = useState(currentHabitData)
    // if the data for today's habits is changed (either by user adding/deleting the )
    // tasks shown, then the list will re-render to reflect that change. 
   
    const socialDailyHabits = currentHabits['social']['daily'].map((habit) => {
      return <Habit key={habit['title']} propTitle={habit['title']} propFrequency={habit['frequency']} propDescription={habit['description']} setCurrentHabits={setCurrentHabits}> </Habit>
    })
  
    const academicDailyHabits = currentHabits['academic']['daily'].map((habit) => {
      return <Habit key={habit['title']} propTitle={habit['title']} propFrequency={habit['frequency']} propDescription={habit['description']} setCurrentHabits={setCurrentHabits}> </Habit>
    })
  
    const personalDailyHabits = currentHabits['personal']['daily'].map((habit) => {
      return <Habit key={habit['title']} propTitle={habit['title']} propFrequency={habit['frequency']} propDescription={habit['description']} setCurrentHabits={setCurrentHabits}> </Habit>
    })
  
    return (
      <div>
        <div> Social {socialDailyHabits}</div>
        <div> Academic {academicDailyHabits}</div>
        <div> Personal {personalDailyHabits}</div>
      </div>
  
    )
  
  }

export default HabitList
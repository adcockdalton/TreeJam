import react, {useState} from 'react'

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

export default Habitlist
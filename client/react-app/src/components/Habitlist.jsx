import react, {useState, useEffect} from 'react'
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
    
    const socialWeeklyHabits = currentHabits['social']['weekly'].map((habit) => {
      return <Habit key={habit['title']} propTitle={habit['title']} propFrequency={habit['day']} propDescription={habit['description']} setCurrentHabits={setCurrentHabits}> </Habit>
    })
  
    const academicWeeklyabits = currentHabits['academic']['weekly'].map((habit) => {
      return <Habit key={habit['title']} propTitle={habit['title']} propFrequency={habit['day']} propDescription={habit['description']} setCurrentHabits={setCurrentHabits}> </Habit>
    })
  
    const personalWeeklyHabits = currentHabits['personal']['weekly'].map((habit) => {
      return <Habit key={habit['title']} propTitle={habit['title']} propFrequency={habit['day']} propDescription={habit['description']} setCurrentHabits={setCurrentHabits}> </Habit>
    })


//   titles for each category in right side panel
    return (
      <div className='habitCategory' >
        <div className="Title">Today's Habits</div>
        <div> 
            <h2>Social</h2> 
            {/* contain all habits in a div to add margin */}
            <div className='habitContain'>
                {socialDailyHabits}
            </div>
            <div className='habitContain'>
            {socialWeeklyHabits}
            </div>
            
        </div>
        <div> 
            <h2>Academic</h2> 
            <div className='habitContain'>
                {academicDailyHabits}
            </div>

            <div className='habitContain'>
            {academicWeeklyabits}
            </div>
        
        </div>
        <div> 
            <h2>Personal</h2> 
            <div className='habitContain'>
                {personalDailyHabits}
            </div>

            <div className='habitContain'>
            {personalWeeklyHabits}
            </div>
            
        </div>
      </div>
  
    )
  
  }

export default HabitList
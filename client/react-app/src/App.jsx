import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import './index.css';
import HabitList from './components/Habitlist';
import SuggestionList from './components/SuggestionList';
import UserStatsList from './components/UserStatsList';
import ControlPanel from './components/ControlPanel';
import deadTree from './images/deadTree.svg';
import TextGenerator from './components/TextGenerator';
import anteater from './images/anteater-removebg-preview.png'
import settings from './images/settings.png'
import Chart from 'chart.js/auto'
import academicsIcon from './images/academicsIcon.png'
import socialIcon from './images/socialIcon.png'
import personalIcon from './images/personalIcon.png'
import magic from './images/magic.png'


import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl, 
  FormLabel,
  Button,
  Input
} from '@chakra-ui/react'


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

async function fetchSummary(text) {
  try {
    const response = await fetch('http://localhost:3001/summarize-text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: text })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error fetching summary:', error);
    return ''; // or a default error message
  }
}
// Function to call your API endpoint
// async function fetchSummary(text) {
//   try {
//     // const response = await axios.post('/summarize-text', { prompt: text });
//     const response = await axios.post('http://localhost:3001/summarize-text', { prompt: text });

//     console.log(response)
//     return response.data.response;
//   } catch (error) {
//     console.error('Error fetching summary:', error);
//     return ''; // or a default error message
//   }
// }

//core of the user-facing interface
function App() {
  const [showPanels, setShowPanels] = useState(true)
  const [currentHabits, setCurrentHabits] = useState()
  const [summary, setSummary] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialModalRef = useRef(null)
  const finalModalRef = useRef(null)

  const habitNameRef = useRef(null)
  const habitTypeRef = useRef(null)
  const habitFrequencyRef = useRef(null)
  const habitDescriptionRef = useRef(null)

  useEffect(() => { // call database to get current habits and store in state on first render
    async function getHabits() {
      const response = await fetch("http://localhost:3001/current-habits", {
        method: "GET",
      })
      const data = await response.json()

      console.log(data[0])
      console.log(typeof data[0])
      let donutChart;
      setChart(data[0], donutChart)
      setCurrentHabits(data[0])
      
    }

    function setChart(data, donutChart) {
      if (donutChart != undefined){
        donutChart.destroy()
      }
      const numSocialHabits = data['social']['daily'].length + data['social']['weekly'].length
      const numAcademicHabits = data['academic']['daily'].length + data['academic']['weekly'].length
      const numPersonalHabits = data['personal']['daily'].length + data['personal']['weekly'].length

      const chartData = {
        datasets: [{
          data: [numSocialHabits, numAcademicHabits, numPersonalHabits],
          backgroundColor: [
            'rgb(122, 200, 255)',
            'rgb(137, 211, 126)',
            'rgb(255, 148, 148)',
          ],
          borderColor: 'rgb(122, 200, 255)'
        }
      ],

        labels: [
          'Social',
          'Academic',
          'Personal'
        ]
      }
      const config = {
        type: 'doughnut',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right'
            }
          }
        }
      }
      
      const chartContext = document.getElementById('chart')//.getContext('2d')
      donutChart = new Chart(chartContext, config)
      donutChart.update()
    }
    getHabits()

  }, [])

  const [suggestions, setSuggestions] = useState({
    social: {
        'suggestionDescription': 'hang out with friends'
    },
    academic: {
        'suggestionDescription': 'study for ics 6b'
    },
    personal: {
        'suggestionDescription': 'do yoga and meditate'
    }
});

useEffect(() => {
  const textToSummarize = 'Summarize the user recent activity: Ashley studied 3 hours for the ics 6b exam, did 2 reps of yoga stretching, and went to a party with friends.';
  fetchSummary(textToSummarize).then(fetchedSummary => {
      console.log("Fetched Summary:", fetchedSummary); // Debug log
      setSuggestions(prev => {
          const updatedSuggestions = { ...prev, personal: { 'suggestionDescription': fetchedSummary } };
          console.log("Updated Suggestions:", updatedSuggestions); // Debug log
          return updatedSuggestions;
      });
  });
}, []);

  async function addHabit(event) {
    event.preventDefault();
    const newHabitName = habitNameRef.current.value
    const newHabitType = habitTypeRef.current.value
    const newHabitFrequency = habitFrequencyRef.current.value
    const newHabitDescription = habitDescriptionRef.current.value

    const requestBody = JSON.stringify({
      'title': newHabitName,
      'habitType': newHabitType,
      'frequency': newHabitFrequency,
      'description': newHabitDescription
    })

    let myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: requestBody
    }
    const response = await fetch('http://localhost:3001/add-habit', requestOptions) 
    const data = await response.json()
    console.log(data)
    setCurrentHabits(data)
    alert('submitted!')
  }

  return (
    <div className='rootAppContainer'>

      
      <div className="leftPanel">
        {/* ai genereated summary */}
        <div className='SuggestionList'> 
          <SuggestionList suggestions={suggestions} />
        </div>

        {/* user stats */}
        <div className='UserStats'> 
          <canvas id='chart'> </canvas>
        </div>
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
          


          {/* top right navigation panel */}
          <div className='createHabitContainer'>
            <div className="settingsContain">
              <img src = {settings}/>
            </div>
            
            <div className='userProfile'>
              <img src= {anteater}/>
            </div>

            <div className='createHabitButton' onClick={onOpen}>
                +  
                <Modal initialFocusRef={initialModalRef} finalFocusRef={finalModalRef} isOpen={isOpen} onClose={onClose}>
                  
                  <div className='modalContent'>
                    <div className="topModalContain">
                        <div className='Title'>Create your account</div>
                        <div className='close' onClick={onClose}>
                          X
                        </div>
                    </div>
                    
                    <div className='modalBody'>
                      <form id='new-habit-form'
                        
                        onSubmit={addHabit}>
                        <div className="inputFormContain">
                        <div className='inputForm'>
                          <div className="sub-title">What is your goal?</div>
                          <input ref={habitNameRef} placeholder='ex: get an A on 6B exam...' />
                        </div>

                        <div className='inputForm'>
                          <div className="sub-title">Habit type</div>
                            <select ref={habitTypeRef} className='dropDown'>
                              <option>
                                <div className="optionContain">
                                  <img src={socialIcon}/>
                                  <p>💬  social</p>
                                </div>
                            
                              </option>
                              <option>📖  academic</option>
                              <option>💗  personal</option>
                            </select>
                        </div>

                        <div className='inputForm'>
                        <div className="sub-title">Timeframe</div>
                          {/* ``pscyh trick */}
                          <div className="pyschContain">

                            <div className="topPsychContain">
                              <img src={magic}/>
                              <div className="sub-title">Psychology Trick</div>
                            </div>
                      
                            <p>We recommend that you schedule your study habits in an exponential
                               interval based on the forgetting curve. Start with daily and move to weekly.
                            </p>
                          </div>
                          <select ref={habitFrequencyRef} className='dropDown'>
                            <option>daily</option>
                            <option>weekly</option>
                          </select>
                        </div>

                        <div className='inputForm Long'>
                          <div className="sub-title">Why do you want to achieve this goal?</div>
                          <textarea type = "text" ref={habitDescriptionRef} placeholder='ex: I want to land a job at Meta...' />
                        </div>

                        </div>
                      

                      </form>

                      <button type="submit" form="new-habit-form">
                        Save
                      </button>
                     </div>
                  </div>
                  <div className="overlay"></div>
                </Modal>

            </div>
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

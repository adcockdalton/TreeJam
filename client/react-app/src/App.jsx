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
import settings from './images/settings.png'
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




//core of the user-facing interface
function App() {
  const [showPanels, setShowPanels] = useState(true)
  const [currentHabits, setCurrentHabits] = useState()
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
      setCurrentHabits(data[0])
      
    }
    getHabits()

  }, [])

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
          <SuggestionList /> 
        </div>

        {/* user stats */}
        <div className='UserStats'> 
        <UserStatsList statsData={{'empty': 'for now'}}/>
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
          <div className='ShrinkButtonContainer'>
          </div>

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
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Create your account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <form id='new-habit-form'
                        onSubmit={addHabit}>

                        <FormControl>
                          <FormLabel>Habit Name</FormLabel>
                          <Input ref={habitNameRef} placeholder='Habit name' />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Habit Type</FormLabel>
                          <select ref={habitTypeRef}>
                            <option>social</option>
                            <option>academic</option>
                            <option>personal</option>
                          </select>
                        </FormControl>

                        <FormControl mt={4}>
                          <FormLabel>Frequency</FormLabel>
                          <select ref={habitFrequencyRef}>
                            <option>daily</option>
                            <option>weekly</option>
                          </select>
                        </FormControl>

                        <FormControl mt={4}>
                          <FormLabel>Description</FormLabel>
                          <Input ref={habitDescriptionRef} placeholder='Description' />
                        </FormControl>

                      </form>
                    
                     </ModalBody>

                    <ModalFooter>
                      <Button type="submit" form="new-habit-form" colorScheme='blue' mr={3}>
                        Save
                      </Button>
                      <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                  </ModalContent>
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

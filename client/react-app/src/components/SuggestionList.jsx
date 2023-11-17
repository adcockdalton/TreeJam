import react, {useState} from 'react'
import Suggestion from './Suggestion'
import academicsIcon from '../images/academicsIcon.png'
import socialIcon from '../images/socialIcon.png'
import personalIcon from '../images/personalIcon.png'
import magic from '../images/magic.png'


export default function SuggestionList( { formattedSuggestions } ) {

    // this is dummy data for how the AI generated suggestions look like 
    const dummySuggestionData = {
        social: {
            'suggestionDescription' : 'hang out with friends'
        },

        academic: {
            'suggestionDescription' : 'study for ics 6b'
        },
        
        personal: {
            'suggestionDescription' : 'do yoga and meditate'
        }

    }

    return (
        <>  
            <div className='fullSuggestionContainer'>
                <div className="upperTextContain">
                    <div className="AIgen">
                        <img src={magic}/>
                        <p>AI-generated</p>
                    </div>
                    <div className='Title'>Your Day in a Nutshell</div>
                </div>
            
                <Suggestion habitType="Social" icon = {socialIcon}suggestionDescription={dummySuggestionData['social']['suggestionDescription']} />
                <Suggestion habitType="Academic" icon = {academicsIcon} suggestionDescription={dummySuggestionData['academic']['suggestionDescription']} />
                <Suggestion habitType="Personal" icon = {personalIcon}suggestionDescription={dummySuggestionData['personal']['suggestionDescription']} />
            </div>

        </>
    );
}


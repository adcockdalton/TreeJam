import react, {useState} from 'react'

export default function Suggestion( {habitType, suggestionDescription } ) {

    return (

        <div className='suggestionRoot'>
            <div className='suggestionIcon'>
                {/* icon for the social/academic/personal suggestion goes here  */}
            </div>

            <div className='suggestionContainer'>
                <div className='suggestionTitle'>
                    <div className='sub-title'> {habitType} </div>  
                </div>
                <div className='suggestionDescription'>
                    <p> {suggestionDescription} </p>
                </div>
            </div>
        </div>
    );
}


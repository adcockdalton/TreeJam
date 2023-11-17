import react, {useState} from 'react'

export default function Suggestion( {habitType, icon, suggestionDescription } ) {

    return (

        <div className='suggestionRoot'>
            {/* icon */}
            <div className='suggestionIcon'>
                <img src={icon}/>
            </div>
            {/* core generated info */}
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


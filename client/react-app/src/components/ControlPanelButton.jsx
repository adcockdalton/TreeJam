import react, {useState} from 'react'

export default function ControlPanel( { habitType, color, icon, filterHabitList } ) {

    return (
        <div className={`controlPanel ${color}`}> 
        {/* color is a prop specifying the color of the button. a 
        css class will be written with the same classname as color
        so coloring will be applied properly.  */}
            <button onClick={filterHabitList(habitType)}> 
            {/* filterHabitList() function will take in a string specifying the 
            habit type (ex: 'academic') and then change global state, causing 
            only certain habit types to be displayed  */}
            
                <svg> 
                    <body>
                        {/* paste svg body code here for the button icon */}
                    </body>
                </svg>
            </button>
        </div>
    );
}


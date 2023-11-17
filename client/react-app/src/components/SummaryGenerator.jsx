import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Your component
export default function SuggestionList() {
    const [summary, setSummary] = useState('');

    useEffect(() => {
        //dummy data
        const textToSummarize = 'Summarize the user recent activity: Ashley studied 3 hours for the ics 6b exam, did 2 reps of yoga stretching, and went to a party with friends.';
        fetchSummary(textToSummarize).then(fetchedSummary => {
            setSummary(fetchedSummary);
        });
    }, []); // Empty dependency array to run only once on mount

    return (
        <div>
            {summary ? <p>Summary: {summary}</p> : <p>Loading summary...</p>}
        </div>
    );
}
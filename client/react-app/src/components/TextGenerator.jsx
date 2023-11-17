import React, { useState } from 'react';

function TextGenerator() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const fetchGeneratedText = async (userPrompt) => {
    try {
      const response = await fetch('/generate-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userPrompt }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.response;  // Assuming the backend sends the response in this format
    } catch (error) {
      console.error('Error fetching data: ', error);
      return 'Failed to generate text'; // Return an error message or handle it as needed
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const generatedText = await fetchGeneratedText(prompt);
    setResponse(generatedText);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={userInput} 
          onChange={(e) => setUserInput(e.target.value)} 
        />
        <button type="submit">Generate Text</button>
      </form>
      <p>Generated Text: {apiResponse}</p>
    </div>
  );
}

export default TextGenerator;